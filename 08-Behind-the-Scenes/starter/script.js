'use strict';
/**
 * An high-level overview of JavaScript
 * JavaScript is a high-level, prototype-based object oriented multi-paradigm
 * interpreted or just-in-time compiled, dynamic single-threaded, garbage
 * collected programming language with first-class functions and a non-blocking
 * event loop concurrency model.
 *
 * 1. High-level - Developers do not have to worry about manually managing
 * resources.
 *
 * 2. Garbage collected - One of the powerful tools that takes memory management
 * away from developers. An algorithm inside the JavaScript engine, which
 * automatically removes old, unused objects from the computer memory.
 *
 * 3. Interpreted/JIT compiled - JavaScript is an abstraction over machine code
 * which eventually gets translated to machine code via either compiling or
 * interpreting inside the JavaScript engine.
 *
 * 4. Multi-paradigm - A pardigm is an approach and mindset of structuring code,
 * which will direct our coding style and technique.
 * Three popular paradigms are:
 * a. Procedural programming - linear way of writing programs.
 * b. Object-oriented programming (OOP)
 * c. Functional programming (FP)
 *
 * Many languages are either procedural, or object-oriented or functional but
 * JavaScript does all of it. JavaScript is really flexible and versatile.
 *
 * 5. Prototype-based, object-oriented approach - Almost everything in JavaScript
 * is an object except primitive values such as numbers, strings, boolean etc.
 * Have you ever wondered why we can create an array and then use the push method
 * on it, for example?
 * Well, it is because of prototypal inheritance. Basically, we create arrays
 * from an array blueprint, which is like a template and this is called the prototype.
 * This prototype contains all the array methods and the arrays that we create in
 * our code then inherits the methods from the blueprint.
 *
 * 6. First-class functions - functions are simply treated as variables. We can pass
 * them into other functions, and return them from functions. This allows us to use
 * the functional programming.
 *
 * 7. Dynamic - Dynamic simply means dynamically-typed language. We don't assign any
 * data types to variables. Instead they only become known when JavaScript engine
 * executes our code. Data type of variables can automatically be changed. JavaScript
 * with types can be achieved with TypeScript.
 *
 * 8. Single-threaded - Concurrency model is a fancy term for how JavaScript engine
 * handles multiple tasks happening at the same time. We need this because JavaScript
 * itself runs in a single thread. A thread is a set of instructions that is executed
 * in the computer's CPU. Basically a thread is where our code is executed in a
 * machine's processor.
 *
 * What about a long-running task? it would block the single thread. This is where we
 * need a non-blocking behavior. To achive this, we need the event loop.
 *
 * 9. Non-blocking event loop - An event loop takes a long running tasks, executes
 * them in the background, and puts them in the main thread once they are finished.
 *
 * JS Engine - A JavaScript engine is simply a computer program that executes
 * JavaScript code.
 * Any JS Engine always contains a call stack and a heap. A call stack is where our
 * program is executed using an execution context.
 * An heap is an unstructured memory pool which stores all the objects that our
 * application needs.
 *
 * How the code is compiled to a machine code?
 * Compilation - Entire code is converted into machine code at once, and written to
 * a binary file that can be executed by a computer.
 *
 * Interpretation - Interpreter runs through the source code and executes it line by
 * line. The code is read and executed all at the same time. Offcourse the source code
 * needs to be converted into a machine code still.
 *
 * JavaScript used to be an interpreted language but the problem is that they were
 * much, much slower than compiled languages. With modern JavaScript and fully fledged
 * web applications that we built and use today low performance is completely not
 * acceptable.
 *
 * So instead of a simple interpretation, JavaScript engine uses a mix between compilation
 * and interpretation called Just-In-Time compilation.
 *
 * Just-In-Time compilation - This approach basically compiles the entire code into
 * machine code at once and then executes it right away. We still have the ahead of time
 * compilatation to machine code without a portable file to execute and the execution
 * happens immediately after a compilation which is perfect for JavaScript.
 *
 * Modern Just-In-Time compilation of JavaScript:
 * 1. When a piece of JavaScript code enters the engine, the first step is to parse the
 * code which essentially means to read the code. During the parsing process, the code
 * is parsed into a data structure called Abstract Syntax Tree or AST. This works by first
 * splitting up each line of code into pieces that are meaningful to the language like the
 * const or function keywords, and then saving all these pieces into the tree in a
 * structured way. This step also checks if there are any syntax errors and the resulting
 * tree will later be used to generate the machine code. The AST tree has nothing to do
 * with the DOM tree.
 *
 * 2. Next step is compilation which takes the generated AST and compiles it into machine
 * code. This machine code then gets executed right away because remember, modern
 * JavaScript engine use just-in-time compilation. And remember execution happens in the
 * JavaScript engine's call stack.
 *
 * JavaScript engines actually have some pretty clever optimization strategies. What they
 * do is to create a very unoptimized version of machine code in the beginning just so that
 * it can start executing as fast as possible. Then in the background, this code is being
 * optimized and recompiled during the already running program execution. This can be done
 * most of the times and after each optimization the unoptimized code is simply swept for
 * the new more optimized code without ever stopping execution of course. This process
 * is what makes modern engines such as the V8 so fast and all this parsing, compilation
 * and optimization happens in some special threads inside the engine that we cannot access
 * from our code completely separate from the main thread that is basically running into call
 * stack executing our own code.
 *
 * However, the engine alone is not enough. In order to work properly, we also need access to the web
 * APIs so that's everything related to the DOM or timers or even the console log that we
 * use all the time. So essentially web APIs are functionalities provided to the engine, but
 * which are actually not part of the JavaScript language itself. JavaScript simply gets access to
 * these APIs through the global window object. But it still makes sense that the web APIs are also
 * part of the runtime, because again a runtime is just like a box that contains all the JavaScript
 * related stuff that we need.
 *
 * Next a typical JavaScript runtime also includes a so called callback queue. This is a data
 * structure that contains all the callback functions that are ready to be executed. For example,
 * we attach event handler functions to DOM elements like a button to react to certain events.
 * These event handler functions are also called callback functions. As the event happens,
 * for example, a click, the callback function will be called and here is how that actually works
 * behind the scenes. The first thing that actually happens after the event is that the callback
 * function is put into the callback queue. When the stack is empty the callback function is passed
 * to the stack so that it can be executed. This happens by something called the event loop.
 *
 * Event loop is essential for non-blocking concurrency model.
 *
 * Basically, the event loop takes callback functions from the callback queue and puts them in the
 * call stack so that they can be executed. The event loop is how JavaScript's non-blocking
 * concurrency model is implemented? Well, here is an overview of how that works. It's also important
 * to remember that JavaScript can exist outside of browsers, for example, in NodeJS. So here is
 * what the NodeJS runtime looks like. It's pretty similar, but since we don't have a browser of
 * course, we can't have the Web APIs because it's the browser who provides these. Instead we have
 * multiple C++ bindings and a so called thread pool.
 */
/**
 * Scope is a place in our code where variables are declared. When we say variables, the exact
 * same thing is true for functions as well because functions are just values that are stored
 * in variables.
 *
 * Scoping asks the question "Where do the variables live?" or  "Where can we access a certain variable,
 * and where not?"
 *
 * There are 3 types of scope:
 * 1. Global Scope - This is for top level code variables that are declared outside of any function
 * or block. These variables will be accessible everywhere in our program (functions and all blocks).
 *
 * 2. Function Scope - Each and every function creates a scope and the variables that are created
 * inside that function are only accessible inside that function. Also called as LOCAL SCOPE opposed
 * to the Global Scope.
 * Function declarations, function expressions, and arrow functions all create their own scope.
 *
 * 3. Block Scope - Traditionally, only functions were used to create scopes in JavaScript. Starting ES6,
 * blocks also create scopes now. From blocks, we mean everything that is between a pair of curly
 * braces (if statement or a loop). However, the block scope is only applicable to variables declared
 * with `let` and `const`. The variables created using let and const are restricted to block in which
 * they were created. That's why we say let and const variables are block scoped. If we declare a variable
 * using `var` in a block, then that variable would actually still be accessible outside of the block,
 * and would be scoped to the closest function scope or to the global scope. Hence we say `var` is function
 * scoped. Another thing to note is if a function is declared inside a block, then that it is only
 * accessible inside the block.
 *
 * To reiterate, `let`, and `const` variables as well as functions are block scoped.
 */

const myName = 'Nithin';

function first() {
  const age = 32;

  if (age >= 30) {
    const decade = 3;
    var millenial = true;
  }

  function second() {
    const job = 'teacher';
    console.log(`${myName} is a ${age}-old ${job}`);
  }
  second();
}
first();

/**
 * Here, the console log inside the second() function are trying to use both
 * `myName` and `age` vairables which are both not declared inside the current scope.
 *
 * The secret here is that every scope has an access to all the variables from all
 * its outer scopes. Here, the second() function scope can access the age variable
 * from the first() function scope. Then this also means the first() function scope
 * can access variables that are in the global scope because that is the parent scope.
 * As a consequence of this, the second() function scope will also be able to access
 * the myName variable from the global scope because it has the access to the variables
 * from the first() function's scope.
 *
 * By the way, all this also applies to function arguments. This is essentially how
 * the scope chain works.
 *
 * In other words, if one scope needs to use a certain variable but cannot find in the
 * current scope, it will look up in the scope chain and see if it can find a variable
 * in one of the parent scopes. If it can, it will then use that variable. If it cannot,
 * then there will be an error. This process is called as Variable Lookup.
 *
 * What is extremely important to note is that this does not work the other way around.
 * That is, a certain scope will never, ever have access to the variables of an inner scope.
 * In this example, the first() scope will never get access to the job variable stored
 * in the second() scope. From a child function, we can access variables declared inside of
 * a parent scope but not the other way around.
 *
 * The block scope that is used in the above example works only for ES6 variable types - let
 * and const. In other words, we will not be able to access the `decade` variable outside
 * the scope since it is a const type of variable. However, the `millenial` variable can be
 * used outside the block scope (part of first() function scope).
 *
 * The scope chaining does of course apply for block scope as well and therefore in our
 * if block scope, we get access to all the variables from all its outer scopes (first() and
 * global scope).
 */

/**
 * Difference between a scope chain and call stack
 * VERY IMPORTANT TO NOTE: Scope chain is nothing but the order in which the functions are
 * written and not the order in which the functions are called. Also, thanks to scope chain,
 * all child functions get a copy of the variables from its parent scope.
 */
const a = 'Nithin';
first();

function first() {
  const b = 'Hello!';
  second();

  function second() {
    const c = 'Hi!';
    third();
  }
}

function third() {
  const d = 'Hey!';
  // Reference error: because both b and c cannot be found in the third() scope nor in the scope chain.
  // console.log(d + c + b + a);
}

/**
 * Hoisting - Makes some types of variables accessible/usable in the code before they are actually defined.
 * Behind the scenes, code is scanned from top to bottom for variable declarations, and for each variable,
 * a new property is created in the variable environment. This happens during the memory creation phase.
 *
 * 1. function declarations - It is hoisted. Inital value is the actual function and it is block scoped
 * in strict mode (ES6) otherwise they are function scoped.
 *
 * 2. var variables - It is hoisted. Initial value is undefined and it is function scoped.
 *
 * 3. let and const variables - They are technically hoisted but not in practice. They are uninitialized
 * initially. These variables are placed in a so-called Temporal Dead Zone (TDZ) meaning we cannot use
 * the variables at the beginning of the scope and the place where variables are declared. As a result,
 * if we try to use a let or const variables before they are declared we will get an error. Also, they
 * are block scoped and are only available in the block they are created.
 *
 * 4. function expressions and arrow functions - Hoisting depends on how these are created - whether
 * using a var or a const or let. One thing to keep in mind is that these functions are simply variables
 * and they behave the exact same way as the variables with regards to hoisting.
 *
 * If they are created using a var then they are hoisted to undefined. If they are created with let or const
 * then they are not usable before they are declared in the code because of the Temporal Dead Zone (TDZ).
 */

/**
 * Temporal Dead Zone, let and const:
 */
const myAnotherName = 'Nithin';

if (myAnotherName === 'Nithin') {
  // console.log(`Nithin is a ${job}`);
  const age = 2037 - 1989;
  console.log(age);
  /**
   * For the variable `job` the region above this line where the variable is defined, but cannot be used
   * in anyway. It is as if the variable did not even exist. If we try to access the variable while in the
   * TDZ as we have done here, then we get a `ReferenceError: cannot access 'job' before intiialization`
   */
  const job = 'Developer';
  // console.log(x);
}
/**
 * To recap, each and every let and const variable get their own TDZ that starts from at the beginning of
 * the scope until the line where it is defined. The variable is only safe to use after the TDZ.
 *
 * But what is the need for JavaScript to have a Temporal Dead Zone?
 * The main reason that the TDZ was introduced in ES6 is that it makes it way easier to avoid and catch
 * errors. Because using a variable that is set to undefined before it is actually declared can cause
 * serious bugs which might be hard to find.
 *
 * The second and a smaller reason why TDZ exists is to make the const variables actually work the way
 * they are supposed to. As we know, we cannot reassign const variables before we can use them.
 *
 * If hoisting creates so many problems then why does it exist in the first place?
 * The creator implemented hoisting so that we can use function declarations before we use them because
 * this is essential for some programming techniques such as mutual recursion. Some think that it makes
 * the code a lot more readable.
 *
 * One last difference between var, let and const is that when we create any variables using `var`
 * then it creates a property in the global window object.
 */
// Variables
// console.log(me); // undefined
// console.log(job); // ReferenceError
// console.log(year); // ReferenceError

var mee = 'Nithin';
let job = 'Developer';
const year = 1989;

// Functions
// console.log(addDecl(2, 3)); // 5
// console.log(addExpr(2, 3)); // ReferenceError
// console.log(addArrow(2, 3)); // ReferenceError

// only function that can be used before declaration.
function addDecl(a, b) {
  return a + b;
}

// addExpr is not a function since addExpr is undefined
const addExpr = function (a, b) {
  return a + b;
};

// addArrow is not a function since addArrow is undefined
let addArrow = (a, b) => a + b;

/**
 * How the `this` keyword works?
 * It is a special variable that is created for every execution context (every function).
 * Takes the value of (points to) the "owner" of the function in which the `this` keyword
 * is used.
 *
 * In general terms, the `this` keyword always take the value of the owner of the function
 * in which the keyword is used. That is, it points to the owner of the function.
 *
 * `this` is not static. The `this` keyword depends on the way how a function is called,
 * and its value is only assigned when the function is actually called.
 */

/**
 * Types of function calls
 * 1. As a function attached to an object - When we call a method in an object, the `this`
 * keyword inside that method will simply point to the object on which the method is called.
 * In other words, it points to the object that is calling the method.
 */
// Ex:
const nithin = {
  name: 'Nithin',
  year: 1989,
  calcAge: function () {
    return 2037 - this.year;
  },
};
// object calling the method is `nithin`.
nithin.calcAge(); // 48

/**
 * 2. As a normal/regular function - The `this` keyword is not attached to any object or so to
 * say that there is no owner of this regular function. In this case, the `this` keyword will
 * simply be undefined. This is only valid for strict mode otherwise the `this` keyword will
 * point to the global object which in case of the browser is the `window` object.
 */
// Ex:
const calcAges = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined, because of strict mode but in sloppy mode it will be pointing
  // to the window object. The `this` keyword is the function's own keyword.
};
calcAges(1989);

/*
 * 3. As an arrow function - As arrow functions are not a way of calling a function, it is
 * an important way of function that we need to consider because arrow functions do not get
 * their own this keyword. If we use the `this` keyword then it will simply be the `this`
 * keyword of the surrounding function. In technical terms, this is called the
 * `lexical this keyword` because it gets picked up from the outer lexical scope.
 */
// Ex:
const calcAgesArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
  // Since arrow functions do not get their own `this` keyword it simply uses the lexical
  // `this` keyword of its parent scope. Just like the `window` object, JavaScript engine
  // also creates a `this` keyword. At the global level the `this` keyword points to the
  // `window` object.
};
calcAgesArrow(1989);

/*
 * 4. As an event listener - the `this` keyword will always point to the DOM element that the
 * handler function is attached to.
 *
 * What the `this` keyword is not.
 * 1. `this` will never point to the function in which we are using it.
 * 2. `this` will never point to the variable environment of the function.
 *
 * For the sake of completion, there are other ways in which we can call a function - using
 * the `new` keyword, using the `call`, `apply` and `bind` keywords.
 */

/**
 * Method borrowing - copying a function from one object to another.
 */
// Ex:
/**
 * Here the output would be 20 and this proves that the `this` keyword always point to the
 * object that is calling the method.
 */
const matilda = {
  year: 2017,
};
matilda.calcAge = nithin.calcAge;
matilda.calcAge();

/**
 * Regular functions vs. arrow functions
 * The common pitfalls of the `this` keyword when using in an arrow function is that the
 * `this` keyword is not present as part of the arrow functions. Any `this` keyword used
 * will point to its surrounding parent. The parent's scope of this greet method is the
 * global scope.
 */
// Ex:
var firstName = 'Akhila';
const me = {
  firstName: 'Nithin',
  year: 1989,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
    const isMillennial = function () {
      // console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },
  greet: () => console.log(`Hey ${this.firstName}!`),
};
me.greet(); // Hey Akhila -> This is wrong because using a var there is a variable named
// firstName in the global scope.

/**
 * The big take away from this example is that as a best practice, you should never ever
 * use an arrow function as a method inside an object. If you have this rule of never
 * using an arrow function as a method, then you never have to think about which type of
 * function you should use. You should always use a normal/regular function to prevent
 * mistakes.
 *
 * One final pitfall of `this` keyword is when we have a function inside of a method
 */
// Ex:
me.calcAge();
/**
 * When we call the calcAge() function, we get a TypeError: Cannot read property 'year'
 * of undefined because isMillennial() is a regular function and in a regular function
 * call, the `this` keyword is undefined.
 *
 * One solution is to use an extra variable declared to refer to the `this` keyword and
 * use it to reference the surrounding object.
 */
// Ex:
const meee = {
  firstName: 'Nithin',
  year: 1989,
  calcAge: function () {
    // solution 1
    // const self = this;
    // console.log(self);
    // console.log(2037 - this.year);
    // const isMillennial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillennial();

    // solution 2
    /**
     * The solution for the above code is to use an arrow function since they do not
     * have a `this` keyword and will get it from their parent which is calcAge() method
     * in this case.
     */
    const isMillennial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },
  greet: () => console.log(`Hey ${this.firstName}!`),
};
meee.calcAge();

/**
 * Functions also get access to an `arguments` keyword. Just like `this` keyword,
 * `arguments` keyword is available only in the regular function. As part of the
 * arguments keyword we will get an array of parameters that we pass in.
 *
 * This `arguments` keyword is only available in a regular function includin both
 * function declaration and function expressions, but not in an arrow function.
 */
const additionExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
additionExpr(2, 5);

/**
 * Primitive types vs Objects/Reference Types and how they are stored in the memory
 * Consider the below example
 */
const myself = {
  name: 'Nithin',
  age: 31,
};

const friend = myself;
friend.age = 27;

console.log('Myself: ', myself);
console.log('Friend: ', friend);
/**
 * In the above example, both object's age will be 27 and that is a source of confusion.
 * There are 2 types of data types:
 * 1. Primitives - Number, String, Boolean, Undefined, Null, Symbol, BigInt
 * 2. Reference Types - Object literal, Array, Functions and many more.
 *
 * JS engine has 2 components
 * 1. Call Stack - where all the functions are executed and a place where all primitives
 * are stored.
 * 2. Heap - where the objects/reference types are stored in memory.
 *
 * In the above example, when an object is created it is stored in the heap memory and the
 * variable that is pointing to the object is stored on the call stack. The variable on
 * the stack references to the memory position at which the object is stored on the heap.
 * Hence the name Reference Types.
 *
 * Any variable we use to copy another object we are just simply pointing to the same memory
 * location in the heap. This is the exact reason why when we change a value of an attribute
 * changes for both the objects since both point to the same object in the memory. This is
 * the only reason why we are able to change properties in the friend object.
 *
 * However, what needs to be a constant is the value in the stack. In the stack, the value only
 * holds the reference which we are not actually changing. The only thing that we are changing
 * is the underlying object that is stored in the heap which has nothing to do with const or let.
 * The concept of not changing the value of a constant is applicable only for primitives and not
 * for reference types.
 *
 * What we can instead do is to copy one object into another so that we have a completely two
 * different objects. To do this, we could use a function called Object.assign() and what this
 * function does is to essentially merge two objects and then return a new one. Here, all the
 * properties of the object are really copied and the result would be a new object.
 */
const oldSelf = {
  firstName: 'Nithin',
  lastName: 'Prasad',
  age: 32,
  family: ['Adelina', 'Ariana'],
};
const newSelf = Object.assign({}, oldSelf);
newSelf.age = 30;
newSelf.family.push('Akhila');

console.log('oldSelf: ', oldSelf);
console.log('newSelf: ', newSelf);

/**
 * Here the object `newSelf` is indeed a real copy of the original object `oldSelf`. However,
 * there is a problem. Using the technique of Object.assign() only works on the first level.
 * In other words, if we have an object inside of another object, then the inner object will
 * still be the same. So we can say, Object.assign() will create a shallow copy and not a deep
 * clone which we would like to have.
 *
 * In order to achieve deep cloning we can use an external library called loadash using its
 * tools to deep clone an object.
 */
