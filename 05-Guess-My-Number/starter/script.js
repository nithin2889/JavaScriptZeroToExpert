'use strict';

/**
 * What's the DOM and DOM manipulation?
 * Document Object Model - Structured representation of HTML documents. It allows JavaScript to access
 * HTML elements and styles to manipulate them.
 *
 * DOM is the connection point between the HTML document and JavaScript code.
 *
 * Special object `document` is the entry point to the DOM. Example: document.querySelector().
 * Since JavaScript is just a dialect and all these DOM related stuffs are not part of ECMAScript.
 *
 * DOM methods and properties are all part of the Web APIs. Web APIs are the library which the browsers
 * implement and that we can access via our JavaScript code. Web APIs are also written in JavaScript
 * and are automatically available for us to use.
 *
 * In case of an event listener, JavaScript engine will listen for events and as soon as any event
 * occurs, the callback function will be executed.
 */

// Random number between 1 and 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  // If use doesn't enter anything, the value will be 0 and 0 is a falsy value. We invert the guess
  // to make it true.
  if (!guess) {
    displayMessage('❌ No number!');
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');

    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score -= 1;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('🔴 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }

  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     displayMessage('📈 Too high!');
  //     score -= 1;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     displayMessage('🔴 You lost the game!');
  //     document.querySelector('.score').textContent = 0;
  //   }
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     displayMessage('📉 Too low!');
  //     score -= 1;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     displayMessage('🔴 You lost the game!');
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
