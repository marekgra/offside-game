// Each situation = a "flip book". Positions are in metres.
// t = time in seconds. The game blends smoothly between the "photos".
const situations = [
  {
    id: 1,
    duration: 5,
    passTime: 2,          // the moment the pass is played
    receiver: 1,          // which player gets the pass (position in the players list below, starting from 0)
    answer: "offside",
    explanation: "When the pass was played, the blue attacker was closer to the goal than the second-last defender, and he received the ball.",

    players: [
      // Attacker with the ball (passer)
      { team: "att", keys: [ {t:0, x:50, y:34}, {t:2, x:55, y:34}, {t:5, x:60, y:36} ] },
      // Attacker in an offside position (receiver)
      { team: "att", keys: [ {t:0, x:82, y:22}, {t:2, x:85, y:20}, {t:3.5, x:88, y:20}, {t:5, x:92, y:24} ] },
      // Other attacker
      { team: "att", keys: [ {t:0, x:68, y:45}, {t:5, x:74, y:45} ] },
      // Defenders
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:5, x:82, y:30} ] },
      { team: "def", keys: [ {t:0, x:78, y:50}, {t:5, x:80, y:44} ] },
      // Goalkeeper
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:32} ] },
    ],

    ball: [ {t:0, x:50, y:34}, {t:2, x:55, y:34}, {t:3.5, x:88, y:20}, {t:5, x:91, y:24} ],
  },
  {
    id: 2,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "onside",
    explanation: "When the pass was played, the receiver was well behind the second-last defender, so he was in an onside position.",

    players: [
      { team: "att", keys: [ {t:0, x:50, y:34}, {t:2, x:55, y:34}, {t:5, x:60, y:34} ] },
      { team: "att", keys: [ {t:0, x:64, y:20}, {t:2, x:68, y:22}, {t:3.5, x:75, y:24}, {t:5, x:80, y:24} ] },
      { team: "att", keys: [ {t:0, x:66, y:46}, {t:5, x:72, y:44} ] },
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:5, x:80, y:32} ] },
      { team: "def", keys: [ {t:0, x:78, y:50}, {t:5, x:79, y:46} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:33} ] },
    ],

    ball: [ {t:0, x:50, y:34}, {t:2, x:55, y:34}, {t:3.5, x:75, y:24}, {t:5, x:80.5, y:24} ],
  },
  {
    id: 3,
    duration: 5,
    passTime: 2,
    receiver: 1,
        answer: "offside",
    explanation: "When the pass was played, the receiver was slightly ahead of the second-last defender. Even a small difference counts, so he was offside.",
    
    players: [
      { team: "att", keys: [ {t:0, x:52, y:36}, {t:2, x:57, y:36}, {t:5, x:62, y:38} ] },
      { team: "att", keys: [ {t:0, x:77, y:20}, {t:2, x:81, y:22}, {t:3.5, x:84, y:22}, {t:5, x:89, y:25} ] },
      { team: "att", keys: [ {t:0, x:70, y:48}, {t:5, x:76, y:44} ] },
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:2, x:80, y:34}, {t:5, x:80, y:30} ] },
      { team: "def", keys: [ {t:0, x:77, y:50}, {t:5, x:78, y:46} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:33} ] },
    ],

    ball: [ {t:0, x:52, y:36}, {t:2, x:57, y:36}, {t:3.5, x:84, y:22}, {t:5, x:89, y:25} ],
  },
  {
    // A) Close onside: receiver is just behind the line
    id: 4,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "onside",
    explanation: "When the pass was played, the receiver was just behind the second-last defender. It was close, but he was still onside.",

    players: [
      { team: "att", keys: [ {t:0, x:53, y:34}, {t:2, x:58, y:34}, {t:5, x:63, y:36} ] },
      { team: "att", keys: [ {t:0, x:75, y:46}, {t:2, x:79, y:44}, {t:3.5, x:84, y:40}, {t:5, x:89, y:38} ] },
      { team: "att", keys: [ {t:0, x:68, y:20}, {t:5, x:74, y:22} ] },
      { team: "def", keys: [ {t:0, x:80, y:30}, {t:2, x:80, y:30}, {t:5, x:81, y:32} ] },
      { team: "def", keys: [ {t:0, x:77, y:18}, {t:5, x:78, y:22} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:36} ] },
    ],

    ball: [ {t:0, x:53, y:34}, {t:2, x:58, y:34}, {t:3.5, x:84, y:40}, {t:5, x:89, y:38} ],
  },
  {
    // B) Own half: ahead of all defenders, but still in his own half
    id: 5,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "onside",
    explanation: "When the pass was played, the receiver was still in his own half. You can't be offside in your own half, even if you are ahead of every defender.",

    players: [
      { team: "att", keys: [ {t:0, x:30, y:34}, {t:2, x:35, y:34}, {t:5, x:40, y:34} ] },
      { team: "att", keys: [ {t:0, x:44, y:26}, {t:2, x:48, y:27}, {t:3.5, x:60, y:28}, {t:5, x:68, y:28} ] },
      { team: "att", keys: [ {t:0, x:36, y:48}, {t:5, x:44, y:46} ] },
      { team: "def", keys: [ {t:0, x:44, y:30}, {t:2, x:44, y:30}, {t:5, x:56, y:29} ] },
      { team: "def", keys: [ {t:0, x:40, y:42}, {t:2, x:41, y:41}, {t:5, x:52, y:38} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:33} ] },
    ],

    ball: [ {t:0, x:30, y:34}, {t:2, x:35, y:34}, {t:3.5, x:60, y:28}, {t:5, x:68, y:28} ],
  },
  {
    // C) In an offside position, but not involved in play
    id: 6,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "onside",
    explanation: "One blue player was in an offside position, but he did not touch the ball or interfere with a defender, and the pass went to a teammate who was onside. Being in an offside position is not an offence by itself.",

    players: [
      { team: "att", keys: [ {t:0, x:53, y:34}, {t:2, x:58, y:34}, {t:5, x:63, y:36} ] },
      { team: "att", keys: [ {t:0, x:70, y:42}, {t:2, x:75, y:41}, {t:3.5, x:79, y:40}, {t:5, x:86, y:37} ] },
      { team: "att", keys: [ {t:0, x:87, y:8}, {t:2, x:88, y:8}, {t:5, x:88, y:9} ] },
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:5, x:79, y:38} ] },
      { team: "def", keys: [ {t:0, x:78, y:50}, {t:5, x:77, y:44} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:34} ] },
    ],

    ball: [ {t:0, x:53, y:34}, {t:2, x:58, y:34}, {t:3.5, x:79, y:40}, {t:5, x:86, y:37} ],
  },
];