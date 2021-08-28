'use strict';
/**
 * A Closer look at functions:
 * Default Parameters:
 * By having default parameters we do not have to pass them in manually
 * in case we don't want to change the default.
 *
 * What's more useful is that we can use the values of the other parameters
 * that were set before it in ES6.
 */

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 99 * numPassengers
) {
  // ES5 way of setting default values
  // numPassengers = numPassengers || 1;
  // price = price || 99;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH234');
createBooking('LH234', 2, 199);
createBooking('LH234', 5);
createBooking('LH234', 10);
createBooking('LH234', undefined, 10);

/**
 * How exactly passing arguments into functions work?
 *
 */
const flight = 'HG82312';
const nithin = {
  name: 'Nithin P',
  passport: 'L81241DK',
};
// Let's change the number of the flight
const checkIn = function (flightNum, passenger) {
  flightNum = 'YU1221';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 'L81241DK') {
    console.log('Checked In!');
  } else {
    console.log('Wrong passport!');
  }
};
checkIn(flight, nithin);
console.log(flight);
console.log(nithin);
/**
 * Here, the flight number is a string primitive value and as we passed that
 * value into the function then it is basically a copy of that original value.
 * This would be exactly the same as writing
 * => const flightNum = flight
 *
 * However, when we passed the object names `nithin` to the function and in
 * that function it is called passenger and we changed that passenger object
 * here. Here, the original object will also be affected by that change.
 * Because, when we pass just the reference type to the function what is
 * copied is really just the reference to the object in the memory heap.
 * This would be exactly the same as writing
 * => const passenger = nithin
 *
 * In summary, passing a reference type to a function is really just the same
 * as creating a copy as shown below outside of a function.
 * const flightNum = flight
 *
 * And when we pass an object to a function it is really just the same
 * as creating a copy of an object as shown below.
 * const passenger = nithin
 *
 * So whatever we change in the copy will also change in the original. Hence we
 * need to be careful before mutating an object in large code bases as it can
 * have unforeseeable consequences.
 *
 * In programming there are two terms that are used all the time when dealing
 * with functions, which is "pass by value", and "pass by reference". JavaScript
 * does not have passing by reference only passing by value.
 *
 * In C++, you can pass a reference to any value instead of the value itself.
 * This works even with primitives so you could pass a reference to the value
 * and then the original value outside of the function would be changed. This
 * is called as passing by reference. But JavaScript doesn't have passing by
 * reference. As we already saw above, for objects we do pass in a reference,
 * the memory address of the object. However, that reference itself is still
 * a value. It is simply a value that contains a memory address. So basically,
 * we pass a reference to the function but we do not pass by reference and this
 * is an important distinction.
 *
 * First-Class and Higher-Order Functions:
 * JavaScript's fundamental property is the fact that it has first-class
 * functions. This enables us to write higher-order functions.
 *
 * JavaScript is a language that has first-class functions which in technical
 * terms means that functions are so-called first citizens. In practice, that
 * means that functions are simply treated as values. JavaScript works this
 * way because functions are really just another type of objects in JavaScript.
 * And since objects are values, functions are values too and since functions
 * are values there are a bunch of interesting things that we can do with them
 * like storing them in variables or object properties, passing functions as
 * arguments into other functions (when we have the add event listener function
 * where we clearly passed the function as a value), we can also return a function
 * from another function.
 *
 * Just like there are methods inside many objects, like array methods, there are
 * also function methods - the methods that we can call on functions. For ex:
 * bind, call etc.
 *
 * Now, having functions as first-class citizens makes it possible for us to use
 * and write higher-order functions.
 *
 * Higher-Order Function:
 * 1. A higher-order function is either a function that receives another function
 * as an argument, or a function that returns a new function, or both.
 * For ex: A function receiving another function would be the addEventListener
 * function.
 */

// const greet = () => console.log('Hey Nithin!');
// btnClose.addEventListener('click', greet);

/** And usually we say that the function that is passed in is the
 * callback function and that's because the callback function will be called
 * later by the higher-order function.
 * Here, the addEventListener higher-order function will call the greet
 * function later as soon as the click event happens.
 * It's like the greet function saying, "Hey there, don't greet me yet,
 * but call me back once you are ready".
 */
/**
 * 2. A function that returns another function
 */
function count() {
  let counter = 0;
  return function () {
    counter++;
  };
}
/**
 * There seems to be some confusion between an higher-order functions
 * and first-class functions. Some people believe they are all the same
 * but actually they mean different things. So, first-class functions
 * is just a feature that a programming language either has or does not
 * have. All it means is that all functions are values. There are no
 * first class functions in practice. It is just a concept.
 *
 * There are however higher-order functions in practice, which are
 * possible because the language supports first-class functions.
 */

/**
 * Functions accepting callback functions:
 */
// a function to replace all spaces in a word.
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...otherWords] = str.split(' ');
  return [firstWord.toUpperCase(), ...otherWords].join(' ');
};

// higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
/**
 * notice how we are passing in the function value itself. It is really
 * just a value. We are not calling the function here and it will be
 * the transformer function that will be calling the function.
 *
 * Since functions even have methods and besides methods, functions can
 * even have properties and one of them is the `name` property. This property
 * can be used on any function that we have in JavaScript.
 */
const high5 = () => console.log('👋');
document.body.addEventListener('click', high5);
// Here addEventListener is the higher-order function which will call high5
// function later when the click event takes place. Callback functions are
// very common in JavaScript and it uses it all the time.

/**
 * Why are callback functions used so much and why are they useful?
 * 1. Easy to split up our code into more reusable and interconnected parts
 * as shown in the above example.
 * 2. Callback functions allow us to create abstraction by hiding some code
 * implementation because we don't really care about all that detail. For ex,
 * here the transformer function does not care how the string is transformed
 * at all. Here the transformer function delegates the string transformation
 * to other lower level functions (upperFirstWord and oneWord). So in one
 * word, transformer function operates at high level of abstraction leaving
 * the low level details to this low level functions.
 */

/**
 * Functions returning functions:
 */
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Nithin');
greeterHey('Akhila');

// using an arrow function
const greetArrow = greetingArrow => nameArrow =>
  console.log(`${greetingArrow} ${nameArrow}`);
const greeterArrowHey = greetArrow('Hello from arrow - ');
greeterArrowHey('Nithin');
greeterArrowHey('Akhila');

/**
 * The greeting still comes from the greet function and in case if you are
 * wondering why that actually works, it is because of something called a
 * closure.
 */
/**
 * The other way of calling the function greet. Here, greet itself is a function
 * so it can be called as a function as shown below.
 */
greet('Hello')('Nithin');

/**
 * The call and apply methods
 */
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {},
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book('238', 'Nithin');
lufthansa.book('564', 'Akhila');
console.log(lufthansa);

// The `this` keyword points to lufthansa since that is the object the function is
// being called. What if lufthansa come up with a new airlines?

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
// copy the book method from lufthansa and store it as a regular function.
const book = lufthansa.book;

// but the below call will fail since there is no `this` keyword in a regular function.
// This is not a method inside an object anymore. It is a regular function.
// book('431', 'Adelina'); // this does NOT work!

/**
 * Then how do we tell JavaScript that we want to create a booking on the new Eurowings
 * or Lufthansa airline?
 * Well, basically we need to tell JavaScript explictly what the `this` keyword here
 * should be like. If we want to book a lufthansa flight the `this` should point to
 * Lufthansa and if we want to book a Eurowings flight the `this` keyword should point
 * to Eurowings object.
 *
 * To accomplish this, there are 3 function methods:
 * 1. call
 * 2. apply
 * 3. bind
 *
 * call() method:
 * Since function is just an object and objects can have methods and therefore, functions
 * can have methods too and call() method is one of them.
 *
 * The first argument in call() will be exactly what we want the `this` keyword to point
 * to and next as usual the rest of the arguments.
 */
book.call(eurowings, 23, 'Nithin');
console.log(eurowings);
/**
 * What happened here?
 * We did actually not call the book function ourselves. Instead, we called the call
 * method and it is then this call method which will call the book function with a
 * `this` keyword set to Eurowings object. This allows us to manually and explicitly
 * set the `this` keyword of any function that we want to call. Then the arguments
 * after the first arguments are simply the arguments of the original function.
 */

book.call(lufthansa, 241, 'Mary Cooper');

/**
 * apply() method:
 * The apply method does the same thing. The only difference however is that apply
 * does not receive a list of arguments after the `this` keyword but instead it
 * will take an array of the arguments. It will then take the elements from that
 * array and pass it into the function.
 */
const flightData = [582, 'George Orwell'];
book.apply(lufthansa, flightData);
console.log(lufthansa);

/**
 * We are no longer using apply method in JavaScript since we can use a better approach.
 * In modern JavaScript we always prefer to use the call method and then spread out the
 * arguments from an array.
 */
book.call(lufthansa, ...flightData);

/**
 * 3. bind() method:
 * Like the other two methods, bind() also allows us to manually set `this` keyword for
 * any function call. Now, the difference is that bind does not immediately call the
 * function instead it will return the new function where the `this` keyword is bound.
 * So it is set to whatever value we pass into bind.
 *
 * Here, we use the bind method to create a new function with the `this` keyword also
 * set to eurowings.
 */
const bookLH = book.bind(lufthansa);
const bookEW = book.bind(eurowings);
bookLH(81, 'Vitalik Buterin');
bookEW(99, 'Shytoshi Kusama');

/**
 * We can also call the bind method for specific airlines only.
 */
const bookLHRE34 = book.bind(lufthansa, 'RE34');
// The only argument left is the `name`. So we pass on that here. Specifying parts of
// the arguments beforehand is actually a common pattern called Partial Application.
// So it means a part of the arguments of the original function are already applied or set.
bookLHRE34('Martha Cooper');

// With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
/**
 * We will get a NaN for the above event listener and the reason for that is the `this`
 * keyword points to the element (document.querySelector('.buy')) on which that
 * handler (lufthansa.buyPlane) is attached to.
 *
 * If we just called lufthansa.buyPlane then the `this` keyword would be lufthansa.
 * However, in the event handler, the button element itself becomes the `this` keyword.
 * Here, we have manually defined the `this` keyword to point to the lufthansa object.
 */
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// If the VAT is 30% fixed always we can preset it using partial application pattern
// using a bind method. Also, if the method does not have a `this` keyword in it then
// we can pass null as the first parameter to bind method. Order of the arguments is
// very important.
const addVAT = addTax.bind(null, 0.3);
console.log(addVAT(200));

// Write the above example using function returning another function.
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.3);
console.log(addVAT2(200));

/**
 * Immediately Invoked Function Expressions (IIFE):
 * Sometimes we need a function that is only executed once and then never again. The
 * function should disappear right after it is called once.
 *
 * Here, we have tricked JavaScript to think that it is just an expression and we do
 * that by simply wrapping the whole function into a parenthesis and call it like a
 * function. This pattern is known as Immediately Invoked Function Expressions or IIFE
 * for short.
 */
(function () {
  const isPrivate = 23;
  console.log('This will never run again');
})();

// using an arrow function
(() => console.log('This arrow function will never run again'))();

/**
 * Why was this pattern created?
 * We know that functions create a scope and what is important here is that one scope
 * does not have access to variables from an inner scope. Therefore, we say all data
 * defined inside a scope is private. We also say that this data is encapsulated.
 * For ex: isPrivate is encapsulated inside of this function scope. Scopes are a good
 * tool to hide variables and this is the reason why IIFE were invented.
 *
 * Variables declared with let and const create their own scope inside a block. So in
 * modern JavaScript IIFE is no longer used if the purpose is to only to create a new
 * scope for data privacy. This can be achieved with a block. However, if you want to
 * execute a function only once then IIFE is the way even with the modern JavaScript.
 */

/**
 * Closures:
 * Closures kind of bring concepts like execution context, call stack and scope chain
 * in a beautiful and almost magical way.
 *
 * Closure is not a feature that we explicitly use but it simply happens automatically.
 * In certain situations, we just need to recognize those situations.
 */
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers.`);
  };
};
const booker = secureBooking();
/**
 * Creating a Closure - Analysis:
 * 1. Our code here runs in the global execution context and in there we have only one
 * function called secureBooking function.
 * 2. When secureBooking() function is actually executed a new execution context is
 * created on top of the execution stack. Each execution context has a variable
 * environment which contains all its local variables. This variable environment is
 * also the scope of the function secure. The function scope will also get access to
 * all variables of the parent scope.
 * 3. Next, the global context also contains a variable called booker which stores the
 * function that is returned by the secureBooking() function.
 * 4. Once the secureBooking function returns, its execution context pops off the stack
 * and disappears.
 */
booker();
booker();
booker();
// output will be 3
/**
 * What this means is that the booker function was in fact able to increment the
 * passengerCount 3 times.
 *
 * But now if we think about this, how can the booker() function update this passengerCount
 * variable that is defined in the secureBooking() function that actually has already
 * finished executing? but the inner function is still able to access the passengerCount
 * variable that is inside the booker function. The booker still some how continues to
 * have access to the vriables that were present at the time that the function was created.
 * This is because of closure. Closure makes a function remember all the variables that
 * existed at the function's creation time. So here, secureFunction() is the birthplace
 * of the booker() function.
 *
 * What happens when we run the booker() function
 * 1. A new execution context is created and put on top of the call stack and the variable
 * environment of this context is empty simply because there are no variables declared in
 * this function.
 * What about the scope chain? Since booker() is in the global context it is simply a
 * child scope of the global scope. But now, how will booker() function access the passengerCount
 * variable?
 *
 * ***** VERY IMPORTANT *****
 * The secret here is, any function always has access to the variable environment of the
 * execution context in which the function was created. In case of booker(), it was born in the
 * execution context of secureBooking() function which is already popped off the stack
 * previously. Therefore the booker() function will get access to the variable environment
 * which contains the variable passengerCount variable and that is how the booker()
 * function will be able to read and manipulate the passengerCount variable and it is this
 * connection that we call as Closure.
 *
 * So closure is basically a variable environment attached to the function exactly as it
 * was at the time and place that the function was created. So in a sense the scope chain
 * was actually preserved through the closure. Even though the scope has already been
 * destroyed because the execution context is gone (secureBooking). So the variable
 * environment somehow keeps living somewhere in the JavaScript engine. Thanks to closure,
 * a function does not lose connection to variables that existed at the function's
 * birthplace.
 *
 * Now, when we run the booker() function it attempts to increase the passengerCount
 * variable. However, it is not present in the current scope. So JavaScript will immediately
 * look into the closure and see if it can find the variable there and it does this even
 * before looking at the scope chain. Even if there was a global passengerCount variable
 * in the global execution context set to some value, it would still first use the one
 * in the closure. So the closure basically has the priority over the scope chain. So after
 * increasing the passengerCount by 1, the execution context is popped off the stack and
 * so on.
 */
// In order to take a look at a closure in a console we can use console.dir.
console.dir(booker);
// The internal property Scopes is what the variable environment of the booker function and
// we will be able to see the closure that is coming from the secureBooking() function.
// NOTE: Whenever we see double brackets in a function, that means it is an internal
// property which we cannot access from our code.
// Also, you don't need to return a function from another function in order to create
// a closure as shown in the below example.

let f;
const g = () => {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
console.dir(f); // contains a in the closure for function f.
f(); // output will be 23 * 2 = 46
/**
 * This proves that the `f` function really closes over any variable of the execution
 * context in which it was defined.
 */
