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
}

class GameStats {
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
    this.player1.marker === "X"
      ? (this.order = [this.player1, this.player2])
      : (this.order = [this.player2, this.player1]);

    this.order[0].turnToggle = 1;
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
    this.getOrder();
    const activePlayer = this.order[this.turnToggle];
    console.log(activePlayer.name + " placed marker: " + activePlayer.marker);

    this.turnToggle === 0 ? this.turnToggle++ : this.turnToggle--;
  }

  setScore() {}

  getScore() {
    return (scoreArr = [this.xWins, this.ties, this.oWins]);
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

function game() {
  const player1 = new Player("Player 1", "P1", "O");
  const player2 = new Player("Player 2", "P2", "X");
  const testStats = new GameStats(player1, player2);
  testStats.setOrder();
  testStats.playTurn();
  console.log(testStats);

  testStats.playTurn();
  console.log(testStats);
  testStats.playTurn();
}

game();
