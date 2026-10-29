// Each situation = a "flip book". Positions are in metres.
// t = time in seconds. The game blends smoothly between the "photos".
const situations = [
  {
    id: 1,
    duration: 5,
    passTime: 2,          // the moment the pass is played
    receiver: 1,          // which player gets the pass (position in the players list below, starting from 0)
    answer: "offside",
    explanation: "W momencie podania niebieski zawodnik był bliżej bramki niż przedostatni przeciwnik i otrzymał piłkę. To spalony.",
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
    explanation: "W momencie podania zawodnik, który otrzymał piłkę, był daleko za przedostatnim przeciwnikiem, więc nie był na spalonym.",
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
    explanation: "W momencie podania zawodnik był nieco przed przedostatnim przeciwnikiem. Nawet niewielka różnica się liczy, więc to spalony.",    
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
    explanation: "W momencie podania zawodnik był tuż za przedostatnim przeciwnikiem. Było blisko, ale spalonego nie było.",
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
    explanation: "W momencie podania zawodnik był jeszcze na własnej połowie. Na własnej połowie nie można być na spalonym, nawet jeśli jest się przed wszystkimi obrońcami.",
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
    explanation: "Jeden z niebieskich zawodników był na pozycji spalonej, ale nie dotknął piłki i nie przeszkadzał rywalom, a podanie trafiło do kolegi, który spalonego nie miał. Sama pozycja spalona nie jest przewinieniem.",
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
    {
    // 7) Just past the halfway line: offside (the opposite of situation 5)
    id: 7,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "offside",
    explanation: "W momencie podania zawodnik był już na połowie rywali i bliżej ich bramki niż wszyscy obrońcy. To spalony.",

    players: [
      { team: "att", keys: [ {t:0, x:36, y:34}, {t:2, x:41, y:34}, {t:5, x:46, y:36} ] },
      { team: "att", keys: [ {t:0, x:50, y:24}, {t:2, x:55, y:26}, {t:3.5, x:66, y:28}, {t:5, x:74, y:28} ] },
      { team: "att", keys: [ {t:0, x:38, y:48}, {t:5, x:44, y:46} ] },
      { team: "def", keys: [ {t:0, x:50, y:30}, {t:2, x:50, y:30}, {t:5, x:60, y:29} ] },
      { team: "def", keys: [ {t:0, x:46, y:44}, {t:2, x:47, y:43}, {t:5, x:56, y:40} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:34} ] },
    ],

    ball: [ {t:0, x:36, y:34}, {t:2, x:41, y:34}, {t:3.5, x:66, y:28}, {t:5, x:74, y:28} ],
  },
  {
    // 8) Two attackers near the line, the ball goes to the offside one
    id: 8,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "offside",
    explanation: "Piłkę dostał zawodnik, który w momencie podania był nieco przed przedostatnim przeciwnikiem. Jego kolega po drugiej stronie boiska był na pozycji dozwolonej, ale to nie on otrzymał piłkę. To spalony.",

    players: [
      { team: "att", keys: [ {t:0, x:53, y:34}, {t:2, x:58, y:34}, {t:5, x:63, y:34} ] },
      { team: "att", keys: [ {t:0, x:77, y:16}, {t:2, x:81.5, y:18}, {t:3.5, x:85, y:22}, {t:5, x:90, y:25} ] },
      { team: "att", keys: [ {t:0, x:74, y:52}, {t:2, x:79, y:50}, {t:5, x:84, y:46} ] },
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:2, x:80, y:34}, {t:5, x:80, y:36} ] },
      { team: "def", keys: [ {t:0, x:76, y:42}, {t:5, x:77, y:40} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:34} ] },
    ],

    ball: [ {t:0, x:53, y:34}, {t:2, x:58, y:34}, {t:3.5, x:85, y:22}, {t:5, x:90, y:25} ],
  },
  {
    // 9) Ahead of one defender, but two opponents are still nearer the goal line
    id: 9,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "onside",
    explanation: "Zawodnik minął jednego obrońcę, ale w chwili podania miał przed sobą jeszcze dwóch przeciwników: obrońcę i bramkarza. Wystarczy, że dwaj przeciwnicy są bliżej bramki, więc spalonego nie było.",

    players: [
      { team: "att", keys: [ {t:0, x:52, y:34}, {t:2, x:57, y:34}, {t:5, x:62, y:34} ] },
      { team: "att", keys: [ {t:0, x:77, y:38}, {t:2, x:83, y:36}, {t:3.5, x:86, y:36}, {t:5, x:90, y:34} ] },
      { team: "att", keys: [ {t:0, x:70, y:18}, {t:5, x:76, y:16} ] },
      { team: "def", keys: [ {t:0, x:85, y:22}, {t:2, x:85, y:22}, {t:5, x:86, y:26} ] },
      { team: "def", keys: [ {t:0, x:80, y:46}, {t:2, x:80, y:46}, {t:5, x:81, y:42} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:33} ] },
    ],

    ball: [ {t:0, x:52, y:34}, {t:2, x:57, y:34}, {t:3.5, x:86, y:36}, {t:5, x:90, y:34} ],
  },
  {
    // 10) Goalkeeper out of his goal: he is NOT the last defender
    id: 10,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "offside",
    explanation: "Bramkarz wybiegł z bramki, więc przedostatnim przeciwnikiem jest jeden z obrońców, a w momencie podania zawodnik był od niego bliżej bramki rywali. To spalony.",

    players: [
      { team: "att", keys: [ {t:0, x:52, y:34}, {t:2, x:57, y:34}, {t:5, x:62, y:36} ] },
      { team: "att", keys: [ {t:0, x:74, y:24}, {t:2, x:79, y:26}, {t:3.5, x:83, y:28}, {t:5, x:87, y:28} ] },
      { team: "att", keys: [ {t:0, x:66, y:18}, {t:5, x:72, y:18} ] },
      { team: "def", keys: [ {t:0, x:80, y:36}, {t:2, x:80, y:36}, {t:5, x:81, y:34} ] },
      { team: "def", keys: [ {t:0, x:76, y:48}, {t:5, x:77, y:46} ] },
      { team: "gk",  keys: [ {t:0, x:64, y:44}, {t:2, x:63, y:44}, {t:5, x:66, y:44} ] },
    ],

    ball: [ {t:0, x:52, y:34}, {t:2, x:57, y:34}, {t:3.5, x:83, y:28}, {t:5, x:87, y:28} ],
  },
  {
    // 11) Offside at the moment of the pass, then he runs back and receives the ball
    id: 11,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "offside",
    explanation: "W momencie podania zawodnik stał przed przedostatnim przeciwnikiem. To, że potem cofnął się i przyjął piłkę za linią obrońców, nie ma znaczenia, bo liczy się dokładny moment podania. To spalony.",

    players: [
      { team: "att", keys: [ {t:0, x:54, y:34}, {t:2, x:59, y:34}, {t:5, x:64, y:36} ] },
      { team: "att", keys: [ {t:0, x:83, y:24}, {t:2, x:84, y:24}, {t:3.5, x:76, y:27}, {t:5, x:74, y:30} ] },
      { team: "att", keys: [ {t:0, x:68, y:46}, {t:5, x:72, y:44} ] },
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:2, x:80, y:34}, {t:5, x:79, y:32} ] },
      { team: "def", keys: [ {t:0, x:78, y:48}, {t:5, x:77, y:44} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:33} ] },
    ],

    ball: [ {t:0, x:54, y:34}, {t:2, x:59, y:34}, {t:3.5, x:76, y:27}, {t:5, x:74, y:30} ],
  },
  {
    // 12) One player in an offside position drops back and takes no part, the ball goes to an onside teammate
    id: 12,
    duration: 5,
    passTime: 2,
    receiver: 1,
    answer: "onside",
    explanation: "Jeden z niebieskich zawodników był na pozycji spalonej, ale cofnął się i nie wziął udziału w akcji. Piłka trafiła do kolegi, który nie był na spalonym, więc spalonego nie było.",

    players: [
      { team: "att", keys: [ {t:0, x:52, y:34}, {t:2, x:57, y:34}, {t:5, x:62, y:36} ] },
      { team: "att", keys: [ {t:0, x:68, y:46}, {t:2, x:73, y:44}, {t:3.5, x:78, y:42}, {t:5, x:84, y:40} ] },
      { team: "att", keys: [ {t:0, x:86, y:10}, {t:2, x:86, y:12}, {t:3.5, x:80, y:17}, {t:5, x:74, y:22} ] },
      { team: "def", keys: [ {t:0, x:80, y:34}, {t:5, x:80, y:36} ] },
      { team: "def", keys: [ {t:0, x:77, y:50}, {t:5, x:78, y:46} ] },
      { team: "gk",  keys: [ {t:0, x:101, y:34}, {t:5, x:101, y:33} ] },
    ],

    ball: [ {t:0, x:52, y:34}, {t:2, x:57, y:34}, {t:3.5, x:78, y:42}, {t:5, x:84, y:40} ],
  },
];