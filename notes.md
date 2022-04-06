# Functional Requirements

## Style Guide

### Colors

--dark-teal: rgb(49, 195, 189);
--teal: rgb(101, 233, 228);
--dark-orange: rgb(242, 177, 55);
--orange: rgb(255, 200, 96);
--neutral-700: rgb(26, 42, 51);
--neutral-600: rgb(31, 54, 65);
--neutral-300: rgb(168, 191, 201);
--neutral-200: rgb(219, 232, 237);

### Typography

h1: Outfit Bold / 40px / 2.5px kerning
h2: Outfit Bold / 24px / 1.5px kerning
h3: Outfit Bold / 20px / 1.25px kerning
h3: Outfit Bold / 16px / 1px kerning
body: Outfit Medium / 14px / 0.8px kerning

## Gameplay

- two player game
- Player 1 chooses mark
  - New Game (vs CPU)
  - New Game (vs Player)
- New Game Begins
  - X goes first, O goes second
  - Alternate between markers
  - First player to get winning combination wins
  - If winning combination is not possible, it is a tie
  - Result is displayed
    - Two options:
      - Quit
        - go to home screen
      - Next round/play again
  - Misc items on screen during game
    - Turn indicator displaying marker
    - Overall stats during session (wins per marker/player, ties)
    - Restart Game icon
      - No, cancel / resume current game, do nothing
      - Yes, restart, clear board

## Game Logic and Flow

- Player constructor ()
- Player 1
- Player 2
- CPU

- Classes
  - Player
    - name
    - marker
    - wins
    - losses
    - Methods
      - play turn
      - update wins
      - update losses

### Placing a Marker

- if square is empty, place marker on click
- if adjacent squares match, check for winner
- no winner, next player repeats

### Winning Index Combinations in Array

- Vertical: 0,3,6 | 1,4,7 | 2,5,8
- Horizontal: 0,1,2 | 3,4,5 | 6,7,8
- Diagonal: 0,4,8 | 2,4,6
- Whichever marker is within these indexs will be declared winner
- Update potential winning combinations as game continues

### Classes Tracker

CPU
game-board**phrase--you-lost
game-board**phrase--you-won

Player
game-board**phrase--p1-wins
game-board**phrase--p2-wins

Both
game-board\_\_phrase--tied

Restart
game-board\_\_phrase--restart

You can read the board matrix in one object, not sepearte objects

This is the entire updateBoard
row1:[value,value,value]
row2:[value,value,value]
row3:[value,value,value]
