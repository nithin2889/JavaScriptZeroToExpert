'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/**
 * Why arrays do have methods?
 * Methods are simply functions that we can call on objects. So they are functions
 * attached to objects.
 *
 * If arrays have methods then that means arrays themselves are also objects. So
 * arrays are objects and that they get access to special built in methods that we
 * can essentially see as tools for arrays.
 */
// 1. slice() - returns a new array without mutating the original array.
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // => 4 - 2 = 2 characters => c, d
console.log(arr.slice(-1));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2)); // starts from 1 and extracts everything except the last 2 elements
// we can use slice() method to create a shallow copy of any array. Call it without any arguments
console.log(arr.slice());
// or we can create a shallow copy using a spread operator
console.log([...arr]);

// 2. splice() - works almost the same as slice() but the fundamental difference is that
// it mutates the original array.
// Once the below function finishes executing, the original array will have only 2 elements.
// console.log(arr.splice(2));
// console.log(arr);
// This will delete the last element in the array.
arr.splice(-1);

// The second parameter is the delete count integer indicating the number of elements in the
// array to remove from the start. Once removed, it will return back the updated array.
arr.splice(1, 2);
console.log(arr);

/**
 * 3. Reverse: Reverses the array and this mutates the original array.
 */
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

/**
 * 4. Concat: used to concatenate two arrays. The other way to accomplish this would be to
 * use the spread operator.
 */
const letters = arr.concat(arr2);
console.log(letters);
const lettersSpread = [...arr, ...arr2];
console.log(lettersSpread);

/**
 * 5. Join:
 */
console.log(letters.join(' - '));

/**
 * Looping arrays - forEach:
 * forEach is a higher order function which requires a callback function in order
 * to tell it what to do. We give the forEach method instructions by giving it a
 * callback function.
 * forEach method not only passes the current element in each iteration in fact
 * it passes the index and the whole array that we are looping. Order should be
 * maintained at any cost (currentElement, currentIndex, array).
 *
 * One distinction between the for-of and the forEach loop is that we cannot use
 * the break and continue inside of a forEach loop.
 */
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('*****Using for-of loop*****');
// for (const movement of movements) {
for (const [idx, movement] of movements.entries()) {
  if (movement < 0) {
    console.log(`Movement ${idx + 1}: You withdrew ${Math.abs(movement)}`);
  } else {
    console.log(`Movement ${idx + 1}: You deposited ${movement}`);
  }
}

console.log('*****Using for-each loop*****');
movements.forEach((movement, idx, arr) =>
  movement < 0
    ? console.log(`Movement ${idx + 1}: You withdrew ${Math.abs(movement)}`)
    : console.log(`Movement ${idx + 1}: You deposited ${movement}`)
);
