const markerSelection = document.querySelector(".js-marker-selection");
const newGameBtnGroup = document.querySelector(".js-new-game-button-group");

class Player {
  wins = 0;
  losses = 0;
  constructor(name, nameShort, marker) {
    this.name = name;
    this.nameShort = nameShort;
    this.marker = marker;
  }

  updateWins() {
    this.wins++;
    console.log("I have " + this.wins + " win(s)!");
  }
  updateLosses() {
    this.losses++;
    console.log("I have " + this.losses + " losse(s)!");
  }
  // getPlayerMarker() {
  //   markerSelection.addEventListener("click", (e) => {
  //     this.marker = e.target.attributes.data.value;
  //     return console.log(this);
  //   });
  // }
}

class GameStats {
  boardArr = [];
  xWins = 0;
  ties = 0;
  oWins = 0;
  order = [];
  turnToggle = 0;

  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  setOrder() {
    this.player1.marker === "x"
      ? (this.order = [this.player1, this.player2])
      : (this.order = [this.player2, this.player1]);

    this.order[0].turnToggle = 1;
    this.getOrder();
    return this.order;
  }

  getOrder() {
    console.log(
      this.order[0].name +
        " goes first because they have marker " +
        this.order[0].marker
    );
    console.log(
      this.order[1].name +
        " goes second because they have marker " +
        this.order[1].marker
    );
  }
  getTurn() {
    console.log("it is " + this.order[this.turnToggle].name + "'s turn");
    return this.order[this.turnToggle];
  }

  playTurn() {
    this.getTurn();
    const gameBoardTiles = document.querySelectorAll(".tile");

    gameBoardTiles.forEach((tile) => {
      tile.addEventListener("click", (e) => {
        if (tile.getAttribute("data-state") === "") {
          let activePlayer = this.order[this.turnToggle];
          let activeMarker = activePlayer.marker;
          const placedIcon = document.createElement("div");
          placedIcon.classList.add(
            "icon",
            "game-board__place-icon",
            `game-board__place-icon--${activeMarker}`
          );

          console.log("activePlayer: " + activePlayer.nameShort);
          console.log(e.target);
          e.target.attributes[0].value = activePlayer.marker;
          console.log(e.target);
          e.target.appendChild(placedIcon);

          console.log(
            activePlayer.name + " placed marker: " + activePlayer.marker
          );
          console.log("turn toggle: " + this.turnToggle);

          this.turnToggle === 0 ? this.turnToggle++ : this.turnToggle--;
          console.log("turn toggle: " + this.turnToggle);
          this.updateBoard();
          this.checkWinner();
          this.getTurn();
        }
      });
    });
  }

  setScore() {}

  getScore() {
    return (scoreArr = [this.xWins, this.ties, this.oWins]);
  }

  updateBoard() {
    const gameBoardTiles = document.querySelectorAll(".tile");
    return (this.boardArr = [
      gameBoardTiles[0].getAttribute("data-state"),
      gameBoardTiles[1].getAttribute("data-state"),
      gameBoardTiles[2].getAttribute("data-state"),
      gameBoardTiles[3].getAttribute("data-state"),
      gameBoardTiles[4].getAttribute("data-state"),
      gameBoardTiles[5].getAttribute("data-state"),
      gameBoardTiles[6].getAttribute("data-state"),
      gameBoardTiles[7].getAttribute("data-state"),
      gameBoardTiles[8].getAttribute("data-state"),
    ]);
  }
  checkWinner() {
    let tempArr = [];
    let winCheckX = ["x", "x", "x"];
    let winCheckO = ["o", "o", "o"];
    var BreakException = {};
    const equals = (a, b) =>
      a.length === b.length && a.every((v, i) => v === b[i]);
    let winningKeys = [
      { key: [0, 3, 6] },
      { key: [1, 4, 7] },
      { key: [2, 5, 8] },
      { key: [0, 1, 2] },
      { key: [3, 4, 5] },
      { key: [6, 7, 8] },
      { key: [0, 4, 8] },
      { key: [2, 4, 6] },
      ,
    ];
    console.log(this.boardArr);
    winningKeys.forEach((item) => {
      console.log(item.key);
      item.key.forEach((keyNum) => {
        console.log("keyNum");
        console.log(keyNum);
        console.log("this.boardArr[keyNum]) Value from board");
        let boardNum = this.boardArr[keyNum];
        tempArr.push(boardNum);
        console.log("Pushed " + boardNum + " to tempArr");
      });
      console.log("tempArr");
      console.log(tempArr);
      console.log(winCheckO);
      console.log(winCheckX);
      if (equals(tempArr, winCheckX)) {
        tempArr = [];
        alert("X WINNER FOUND");
        throw BreakException;
      } else if (equals(tempArr, winCheckO)) {
        tempArr = [];
        alert("O WINNER FOUND");
        throw BreakException;
      } else if (this.boardArr) {
      } else {
        tempArr = [];
        this.playTurn();
        console.log("nope");
      }
    });
  }

  /*
  set order
  initiate play
  check for winning combination
		if winning combination is not possible, stop and assign a tie
		display result
		if winning combination is available, alternate turns
	result
		*/
}

function newPlayerGame() {
  // DOM Elements
  const p1Marker = markerSelection.querySelector(
    ".new-game-menu__button--light"
  ).attributes.data.value;
  const p2Marker = markerSelection.querySelector(".new-game-menu__button--dark")
    .attributes.data.value;

  const scoreboard = document.querySelector(".js-score-tracker");

  // Create Players
  const player1 = new Player("Player 1", "P1", p1Marker);
  const player2 = new Player("Player 2", "P2", p2Marker);
  const testStats = new GameStats(player1, player2);

  // Gameplay

  testStats.setOrder();
  testStats.playTurn();
  // testStats.updateBoard();
  // testStats.playTurn();

  // Tile Injector
  // general icon, outline icon,
  const outlineIconO = document
    .createElement("div")
    .classList.add(
      "icon",
      "game-board__hover-icon",
      "game-board__hover-icon--o"
    );
  const outlineIconX = document
    .createElement("div")
    .classList.add(
      "icon",
      "game-board__hover-icon",
      "game-board__hover-icon--x"
    );
  const placedIconO = document
    .createElement("div")
    .classList.add(
      "icon",
      "game-board__place-icon",
      "game-board__place-icon--o"
    );
  const placedIconX = document
    .createElement("div")
    .classList.add(
      "icon",
      "game-board__place-icon",
      "game-board__place-icon--x"
    );
  // hover state

  // clicked state
  // win state

  // testStats.playTurn();
  // console.log(testStats);
  // testStats.playTurn();

  // Edit Scoreboard
  scoreboard.children[0].children[0].textContent =
    player1.marker + " (" + player1.nameShort + ")";
  scoreboard.children[0].children[1].textContent = testStats.xWins;
  scoreboard.children[1].children[0].textContent = "Ties";
  scoreboard.children[1].children[1].textContent = testStats.ties;
  scoreboard.children[2].children[0].textContent =
    player2.marker + " (" + player2.nameShort + ")";
  scoreboard.children[2].children[1].textContent = testStats.oWins;

  // console.log("testStats");
  // console.log(testStats);
  // console.log("testStats updated");
  // console.log(testStats);
  // console.log(player1);
  // console.log(player2);

  // console.log("new player game created");

  // testStats.playTurn();
  // console.log(testStats);
  // testStats.playTurn();
}

function newCpuGame() {
  const p1Marker = markerSelection.querySelector(
    ".new-game-menu__button--light"
  ).attributes.data.value;
  const p2Marker = markerSelection.querySelector(".new-game-menu__button--dark")
    .attributes.data.value;
  const player1 = new Player("Player 1", "P1", p1Marker);
  const cpu = new Player("Player 2", "CPU", p2Marker);
  const testStats = new GameStats(player1, cpu);
  console.log("testStats");
  console.log(testStats);
  testStats.setOrder();
  console.log("testStats updated");
  console.log(testStats);
  console.log(player1);
  console.log(cpu);

  console.log("new cpu game created");

  // testStats.playTurn();
  // console.log(testStats);
  // testStats.playTurn();
}

const newGameMenuEl = document.querySelector(".new-game-menu");
const GameBoardEl = document.querySelector(".game-board");
newGameBtnGroup.childNodes[3].addEventListener("click", () => {
  newPlayerGame();
  newGameMenuEl.classList.toggle("hidden");
  GameBoardEl.classList.toggle("hidden");
});
newGameBtnGroup.childNodes[1].addEventListener("click", () => {
  newCpuGame();
  newGameMenuEl.classList.toggle("hidden");
  GameBoardEl.classList.toggle("hidden");
});
/* REMOVE WHEN DONE */
newGameBtnGroup.childNodes[3].click();
/* REMOVE WHEN DONE */

markerSelection.addEventListener("click", () => {
  markerSelection.childNodes[1].classList.toggle(
    "new-game-menu__button--light"
  );
  markerSelection.childNodes[1].classList.toggle("new-game-menu__button--dark");
  markerSelection.childNodes[3].classList.toggle(
    "new-game-menu__button--light"
  );
  markerSelection.childNodes[3].classList.toggle("new-game-menu__button--dark");
  // .classList.toggle("new-game-menu__button--light");
  // e.target.classList.toggle("new-game-menu__button--dark");
});
