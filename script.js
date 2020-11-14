'use strict';

// DONE : function for switch player
// DONE : fix current and total (on hold) score
// DONE : More comments
// DONE : Optimize hold eventListener
// DONE : If players wins
// TODO : New game button

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Switch to the next player
const switchPlayer = function (activePlayer) {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  return activePlayer;
};

//Update the player score, reset the current
const updateScore = function (activePlayer) {
  scores[activePlayer] += currentScore;
  console.log(scores[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random number
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1 : if true , switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    //Switch to next player and reset current score
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = switchPlayer(activePlayer);
  }
});

btnHold.addEventListener('click', function () {
  // Update player score and reset current score.
  updateScore(activePlayer);

  //Check if he wins ( score >= 100)
  if (scores[activePlayer] > 99) {
    document.getElementById(`name--${activePlayer}`).textContent = 'WINNER';
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.getElementById(`name--${activePlayer}`).textContent = 'LOSER';

    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    diceEl.classList.add('hidden');
    //Else switch the player
  } else activePlayer = switchPlayer(activePlayer);
});

//New game button
btnNew.addEventListener('click', function () {
  //Reseting current score for new game
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //Reseting scores and names for both players
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  //Setting active player to 'Player 1' (0) if is not already
  if (activePlayer !== 0) {
    activePlayer = switchPlayer(activePlayer);
  }
  // Show the buttons to play
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
});
