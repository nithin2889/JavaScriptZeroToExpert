// strict mode needs to be activated and should be at the beginning of the file.
'use strict';
/**
 * Firstly, strict mode forbids us to do certain things and secondly, it creates
 * visible errors in the developer console which in other cases JavaScript fails
 * silently.
 */

/**
 * Another thing that strict mode does is to introduce a short list of variable
 * names that are reserved for features that might be added to the language a bit
 * later.
 */
// These below reserved words won't work.
// const interface = 'Audio';
// const private = 2213;

// Function declaration
function calcAge1(birthYear) {
  return 2037 - birthYear;
}
const age1 = calcAge1(1991);

// Function expression
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);

/**
 * The main difference between a function declaration and a function expression is
 * in a function declaration, we can call it before they are defined in the code.
 *
 * One difference between an arrow function and normal function is that in an arrow
 * function, we do not get a this keyword.
 */

// Array declarations
const years1 = [1989, 1990];
console.log(years1);

const years2 = new Array({ year1: 1989, year2: 1990 });
console.log(years2);

/**
 * Basic array methods
 * 1. push() - pushes an element to the end of the array. Returns back the length of the array.
 * 2. unshift() - adds an element to the beginning of an array. Returns back the length of the array.
 * 3. pop() - removes the last element from the array. Returns the popped/removed element.
 * 4. shift() - removes the first element from an array. Returns the popped/removed element.
 * 5. indexOf() - returns the index value of the element being passed. Returns -1 if the element is not present.
 * 6. includes() - returns a boolean value true if an element is present in the array otherwise returns false. Uses a strict equality operator (===).
 *
 */

/**
 * Object methods
 * The object that calls the function present inside it will have the `this` reference. Using the
 * keyword we can access the properties that are needed to calculate some value as shown below.
 *
 * Also, we can add new attributes to the object for future calculations.
 */
const nithin = {
  firstName: 'Nithin',
  lastName: 'Prasad',
  birthYear: 1989,
  job: 'Engineer',
  hasDriversLicense: true,
  // calcAge: function () {
  //   return 2021 - this.birthYear;
  // },
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },
};
// console.log(nithin.calcAge());
console.log(nithin.age);
