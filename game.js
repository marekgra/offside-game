const canvas = document.getElementById("pitch");
const ctx = canvas.getContext("2d");

// Real pitch size in metres
const PITCH_W = 105;
const PITCH_H = 68;
const SCALE = 10;   // 1 metre = 10 pixels
const MARGIN = 30;  // empty space around the pitch (room for the goals)

// Goal size in metres
const GOAL_WIDTH = 7.32;
const GOAL_DEPTH = 2;
// Sizes in metres (drawn bigger than real so they're easy to see)
const PLAYER_R = 1.1;  // player radius
const BALL_R = 0.6;    // ball radius

// Convert metres to pixels
function px(metres) { return MARGIN + metres * SCALE; }

// Team colours
const COLORS = {
  att: "#2f6fed",  // attackers: blue
  def: "#e03b3b",  // defenders: red
  gk:  "#f5c518",  // goalkeeper: yellow
};

function drawGoal(side) {
  // side = "left" or "right"
  const top = (PITCH_H - GOAL_WIDTH) / 2;
  const x = side === "left" ? -GOAL_DEPTH : PITCH_W;

  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";  // see-through "net"
  ctx.fillRect(px(x), px(top), GOAL_DEPTH * SCALE, GOAL_WIDTH * SCALE);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeRect(px(x), px(top), GOAL_DEPTH * SCALE, GOAL_WIDTH * SCALE);
}

function drawPitch() {
  // Grass
  ctx.fillStyle = "#2e8b3d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  // Outer lines
  ctx.strokeRect(px(0), px(0), PITCH_W * SCALE, PITCH_H * SCALE);

  // Halfway line
  ctx.beginPath();
  ctx.moveTo(px(PITCH_W / 2), px(0));
  ctx.lineTo(px(PITCH_W / 2), px(PITCH_H));
  ctx.stroke();

  // Centre circle
  ctx.beginPath();
  ctx.arc(px(PITCH_W / 2), px(PITCH_H / 2), 9.15 * SCALE, 0, Math.PI * 2);
  ctx.stroke();

  // Penalty areas and goal areas
  const penTop = (PITCH_H - 40.32) / 2;
  const goalTop = (PITCH_H - 18.32) / 2;
  ctx.strokeRect(px(0), px(penTop), 16.5 * SCALE, 40.32 * SCALE);
  ctx.strokeRect(px(PITCH_W - 16.5), px(penTop), 16.5 * SCALE, 40.32 * SCALE);
  ctx.strokeRect(px(0), px(goalTop), 5.5 * SCALE, 18.32 * SCALE);
  ctx.strokeRect(px(PITCH_W - 5.5), px(goalTop), 5.5 * SCALE, 18.32 * SCALE);

  // Goals
  drawGoal("left");
  drawGoal("right");
}

function drawPlayer(p) {
  ctx.beginPath();
  ctx.arc(px(p.x), px(p.y), PLAYER_R * SCALE, 0, Math.PI * 2);
  ctx.fillStyle = COLORS[p.team];
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ---- Current situation and time ----
let situation = situations[0];
let currentIndex = 0;
let score = 0;
let gameOver = false;
let currentTime = 0;
let playing = false;
let lastFrame = null;

const playBtn = document.getElementById("playBtn");
const slider = document.getElementById("timeline");
const timeLabel = document.getElementById("timeLabel");

const offsideBtn = document.getElementById("offsideBtn");
const onsideBtn = document.getElementById("onsideBtn");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const statusEl = document.getElementById("status");

let finished = false;   // has the situation been watched to the end?
let answered = false;   // has the player answered?

// Finds the two "photos" around time t and blends between them
function positionAt(keys, t) {
  if (t <= keys[0].t) return { x: keys[0].x, y: keys[0].y };
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (t <= b.t) {
      const f = (t - a.t) / (b.t - a.t);
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last.x, y: last.y };
}

function drawBall(pos) {
  ctx.beginPath();
  ctx.arc(px(pos.x), px(pos.y), BALL_R * SCALE, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function updateControls() {
  slider.value = (currentTime / situation.duration) * 1000;
  timeLabel.textContent = currentTime.toFixed(1) + " / " + situation.duration.toFixed(1) + " s";
  playBtn.textContent = playing ? "⏸ Pause" : "▶ Play";
}

// The offside line at the moment of the pass
function getOffsideLine(sit) {
  const t = sit.passTime;
  const opponents = sit.players
    .filter(p => p.team !== "att")
    .map(p => positionAt(p.keys, t).x + PLAYER_R)   // right edge of each defender
    .sort((a, b) => b - a);
  const secondLast = opponents[1];
  const ballEdge = positionAt(sit.ball, t).x + BALL_R;
  return Math.max(secondLast, ballEdge, PITCH_W / 2);
}

function drawOffsideLine() {
  const x = getOffsideLine(situation);
  ctx.save();

  ctx.setLineDash([12, 8]);
  ctx.strokeStyle = "#ff9800";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px(x), px(0) - 4);
  ctx.lineTo(px(x), px(PITCH_H) + 4);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.fillStyle = "#ff9800";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("OFFSIDE LINE", px(x), MARGIN / 2);

  ctx.restore();
}

// White ring around the player who receives the pass
function drawReceiverRing(pos) {
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(px(pos.x), px(pos.y), (PLAYER_R + 0.8) * SCALE, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function updateAnswerButtons() {
  const canAnswer = finished && !answered;
  offsideBtn.disabled = !canAnswer;
  onsideBtn.disabled = !canAnswer;
}

function draw() {
  if (currentTime >= situation.duration) finished = true;

  drawPitch();

    situation.players.forEach(p => {
    const pos = positionAt(p.keys, currentTime);
    drawPlayer({ team: p.team, x: pos.x, y: pos.y });
  });
  drawBall(positionAt(situation.ball, currentTime));

  // After answering, show the line when the bar is near the pass moment
  if (answered && Math.abs(currentTime - situation.passTime) < 0.3) {
    drawOffsideLine();
  }

  updateControls();
  updateAnswerButtons();
}

function handleAnswer(choice) {
  answered = true;
  playing = false;
  currentTime = situation.passTime;   // jump to the moment of the pass

  const correct = choice === situation.answer;
  if (correct) score++;
  feedback.textContent = (correct ? "✅ Correct! " : "❌ Not quite. ") +
    situation.explanation + " Drag the timeline to look around.";
  feedback.className = correct ? "good" : "bad";

  nextBtn.hidden = false;
  nextBtn.textContent = currentIndex === situations.length - 1 ? "See result" : "Next situation →";
  updateStatus();
  draw();
}

function updateStatus() {
  statusEl.textContent = "Situation " + (currentIndex + 1) + " / " + situations.length +
    "  ·  Score: " + score;
}

// Resets everything and loads situation number i
function loadSituation(i) {
  currentIndex = i;
  situation = situations[i];
  currentTime = 0;
  playing = false;
  finished = false;
  answered = false;
  feedback.textContent = "";
  feedback.className = "";
  nextBtn.hidden = true;
  updateStatus();
  draw();
}

// Runs about 60 times per second while playing
function tick(now) {
  if (!playing) return;
  if (lastFrame !== null) currentTime += (now - lastFrame) / 1000;
  lastFrame = now;
  if (currentTime >= situation.duration) {
    currentTime = situation.duration;
    playing = false;
  }
  draw();
  if (playing) requestAnimationFrame(tick);
}

function play() {
  if (currentTime >= situation.duration) currentTime = 0;
  playing = true;
  lastFrame = null;
  requestAnimationFrame(tick);
  draw();
}

function pause() {
  playing = false;
  draw();
}

playBtn.addEventListener("click", () => (playing ? pause() : play()));

// Dragging the bar = flipping the pages by hand
slider.addEventListener("input", () => {
  playing = false;
  currentTime = (slider.value / 1000) * situation.duration;
  draw();
});

offsideBtn.addEventListener("click", () => handleAnswer("offside"));
onsideBtn.addEventListener("click", () => handleAnswer("onside"));

nextBtn.addEventListener("click", () => {
  if (gameOver) {                          // "Play again"
    gameOver = false;
    score = 0;
    loadSituation(0);
  } else if (currentIndex < situations.length - 1) {
    loadSituation(currentIndex + 1);
  } else {                                 // "See result"
    gameOver = true;
    feedback.textContent = "🏁 Finished! Your score: " + score + " / " + situations.length;
    feedback.className = "";
    nextBtn.textContent = "Play again";
  }
});

loadSituation(0);