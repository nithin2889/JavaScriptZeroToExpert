'use strict';
/**
 * Object-Oriented Programming: OOP is a programming paradigm based on the concept
 * of objects.
 * We use object to model (describe) real-world or abstract features.
 * Objects may contain data (properties) and behavior (methods). By using objects, we
 * pack data and the corresponding behavior into one block.
 * Objects are building blocks of applications, and interact with one another.
 * Interactions happen through a public interface (API): methods that the code outside
 * of the object can access and use to communicate with the object.
 *
 * Classes and instances (traditional OOP):
 * In traditional OOP to generate objects programmatically, we use classes. Class is a
 * blueprint which can then be used to create objects.
 *
 * Class is really just a plan and the plan doesn't contain the real world data just yet.
 * On the other hand, we have the behavior that is associated with the data. In this case,
 * they are the methods inside the class.
 *
 * To create an object we will have to pass the real data and then create an object.
 * For ex, new User('Nithin');
 * Now, from the class, we can create many such instances. This process of creating many
 * such instances is called instantiation.
 * These instances off course can have different data in them but they all share the
 * same functionality (methods).
 *
 * The 4 fundamental OOP principles:
 * How do we actually design classes? How do we model real-world data into classes?
 *
 * 1. Abstraction - Basically means to ignore or to hide details that don't matter. This
 * allows us to get an overview perspective of whatever it is that we are implementing
 * instead of messing with details that don't really matter.
 *
 * 2. Encapsulation - Basically means to keep some properties and methods private making
 * them accessible only within the class and only expose some of the methods as a public
 * interface which we call API. By doing this, we prevent external code to accidentally
 * manpulate this internal state.
 *
 * 3. Inheritance - In OOP, when we have 2 classes that are closely related, like USER
 * and ADMIN, we can have one class inherit from the other making all properties and
 * methods of a certain class available to a child class, forming a hierarchical
 * relationship between classes. This allows us to reuse common logic and to model real
 * world relationships.
 *
 * 4. Polymorphism - In OOP, this means a child class can override a method that it
 * inherited from a parent class.
 *
 * OOP in JavaScript:
 * How does OOP work in JavaScript?
 * In JavaScript, we have something called as a Prototype and all objects in JavaScript
 * are linked to a certain prototype object. So we say, each object has a prototype.
 *
 * PROTOTYPAL INHERITANCE: The prototype object contains methods and properties that all
 * object linked to that prototype can access and use. This behavior is called as Prototypal
 * Inheritance.
 *
 * ***NOTE***:
 * This inheritance is very different from the inheritance we know in OOP.
 * But in this case, it is basically an instance inheriting from a class.
 *
 * PROTOTYPE (CLASS)
 *    ^
 *    |
 *  OBJECT
 *
 * Objects delegate behavior to the linked prototype object and behavior is just another
 * term for methods here. So besides prototypal inheritance we also call this mechanism
 * as Delegation. This is also a reason why the arrow is pointing upwards because technically
 * objects delegate their behavior to the prototype. However, in traditional OOP with classes,
 * the behavior or the methods are actually copied from the class to the object which is
 * completely different.
 *
 * For ex: We are able to use map function on arrays because of prototypal inheritance.
 * const num = [1, 2, 3];
 * num.map(n => n * 2); => this means num is linked to the prototype in turn having access to
 * all the methods that are defined on array.prototype object. In a sense, our array inherits
 * map() method or you can the array delegated the behavior of mapping to its prototype.
 *
 * According to the MDN documentation => Array.prototype.map()
 *
 * Array.prototype.map is the prototype object of all the arrays that we create in JavaScript.
 *
 * How do we create prototypes? How do we link objects to prototypes? How can we create new
 * objects, without having classes from which we can instantiate objects?
 * In JavaScript, we have 3 ways to implement prototypal inheritance:
 * 1. Constructor functions
 * Technique to create objects from a function.
 *
 * 2. ES6 classes
 * More modern alternative to constructor function syntax. Behind the scenes works just like
 * constructor functions.
 *
 * 3. Object.create()
 * Easiest and most straightforward way of linking an object to a prototype object. However,
 * not used as the other methods.
 *
 * Constructor Functions and the new operator:
 * Using constructor functions we can build an object using a function. A constructor function
 * is completely normal function.
 *
 * The only difference between a regular function and a constructor function is that we call
 * the constructor function with the `new` operator.
 *
 * NOTE: An arrow function will not work as a function constructor because it doesn't have
 * its own `this` keyword and only function declarations and expressions work.
 */

/**
 * The `new` operator is a special function which will call the person function. When we do so,
 * behind the scenes:
 * 1. A new empty object {} is created.
 * 2. Then the function is called and inside the function the `this` keyword in the execution
 * context will be set to the newly created object.
 * 3. This newly created object is linked to a prototype.
 * 4. The object that was created in the beginning is then automatically returned from the
 * constructor function. At this point, the object no longer needs to be empty.
 *
 * Since at the end of the function, the `this` keyword will basically be returned. So whatever
 * we add to the empty object will then be returned from the function as shown below.
 * This returned object will be the object that we are trying to build here (Person).
 */
const Person = function (firstName, birthYear) {
  // Since `this` keyword is an empty Person object. We are setting the values on the object by
  // creating properties on it as shown below.

  // firstName and birthYear are the instance properties. The properties firstName and birthYear
  // will be available on all the instances that are created through this constructor function.
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const nithin = new Person('Nithin', 1989);
console.log(nithin);
// Here, we can say `nithin` is the instance of Person.
console.log(nithin instanceof Person); // true

/**
 * What if we wanted to add methods to our objects?
 */
const AnotherPerson = function (firstName, birthYear) {
  // Since `this` keyword is an empty Person object. We are setting the values on the object by
  // creating properties on it as shown below.

  // firstName and birthYear are the instance properties. The properties firstName and birthYear
  // will be available on all the instances that are created through this construction function.
  this.firstName = firstName;
  this.birthYear = birthYear;
  // NEVER DO THIS INSIDE CONSTRUCTOR FUNCTION because if we create tens of thousands of instances
  // using constructor function, then each of the object would carry around this function.
  // To solve this we are going to use prototypes and prototypal inheritance.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

/**
 * PROTOTYPES:
 * Firstly, each and every function in JavaScript automatically has a property called `prototype`
 * and that includes, of course, constructor functions.
 * Every object that's created by a certain constructor function will get access to all the methods
 * and properties that we define on the constructor's prototype property.
 */
// Prototype property of the constructor function
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
/**
 * As already mentioned, each object created by the Person constructor function will now get access
 * to all the methods of this prototype prototype.
 */
console.log(nithin);
console.log(Person.prototype);
nithin.calcAge();
console.log(nithin.__proto__);
/**
 * Because of prototypal inheritance there exists only one copy of the calcAge() function. The
 * prototype of `nithin` object is essentially the prototype property of the constructor function
 * as shown below. A subtle difference to note here is that the `prototype` is not an object on the
 * Person object but instead, it is what's gonna be used as the prototype of all the objects that are
 * created with the Person constructor function.
 */
console.log(nithin.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(nithin)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false
/**
 * From the behind the scene 3rd step which links the empty new object to the prototype. This step
 * creates the __proto__ property and sets its value to the prototype property of the function being
 * called which is nothing but => console.log(nithin.__proto__ === Person.prototype);
 *
 * Now, we can also set properties on the prototype and not just methods. Properties will be set
 * in the __proto__ property of all the objects that are created with the Person constuctor function.
 */
Person.prototype.species = 'Homo Sapiens';
console.log(nithin.species);
/**
 * The species property is not an own property of `nithin`. Own properties are only the ones
 * that are declared directly on the object itself.
 *
 * In JavaScript, we have a way to check that using `hasOwnProperty` method. The property
 * __proto__ will always point to an object's prototype.
 * i.e., __proto__: Person.prototype
 */
console.log(nithin.hasOwnProperty('firstName')); // true
console.log(nithin.hasOwnProperty('birthYear')); // true
console.log(nithin.hasOwnProperty('species')); // false
console.log(Person.prototype);
/**
 * This is basically how it works with constructor functions and ES6 classes, but not with the
 * Object.create() syntax.
 *
 * When we try to call the calcAge() function on `nithin` object, JavaScript won't find it as it
 * is not there. When this is the case, JavaScript will look into its prototype. That's how it works
 * behind the scenes. The behavior is nothing but prototypal inheritance or delegation. The `nithin`
 * object just inherited the calcAge() method from its prototype or in other words it delegated the
 * calcAge() functionality to its prototype. The method calcAge() is not attached to the object we
 * create using the new keyword and this is essential for code performance.
 *
 * Now the fact that `nithin` object is connected to a prototype and the ability of looking up
 * methods and properties in a prototype is what we call the Prototype Chain.
 *
 * Prototype Chain:
 * Since all objects in JavaScript have a prototype. Therefore, Person.prototype is a prototype
 * itself and must also have a prototype and the prototype of Person.prototype is Object.prototype.
 *
 * Why? Person.prototype is just a simple object which means that it has been built by the built-in
 * Object Constructor Function.
 *
 * Object Constructor Function is a function that is called behind the
 * scenes whenever we create an object literal ({} - a shortcut to write a new Object()). These
 * entire series of links between objects, linked through prototypes is what is called the
 * Prototype Chain (similar to Scope Chain). Object.prototype is the top of the chain which means
 * its prototype is null. That is, its __proto__ property simply points to null which then marks
 * the end of the prototype chain.
 *
 * So in a scope chain, whenever JavaScript cannot find a certain variable in a certain scope, it
 * looks up into the next scope in the scope chain and tries to find the variable there. On the
 * other hand, in a prototype chain, whenever JavaScript cannot find a certain property or
 * method in a certain object, JavaScript is going to look up into the next prototype in the
 * prototype chain and see if it can find it.
 *
 * Another type of method look up is with hasOwnProperty() on the `nithin` object. Just like in the
 * previous slide, JavaScript is going to start by trying to find the called method on the object
 * itself. It cannot find the hasOwnProperty method on `nithin`. It will then look into its prototype
 * which is Person.prototype. Now, JavaScript will not find hasOwnProperty() in there since we did not
 * define any method there, then it moves one level up in the prototype chain, that is Object.prototype.
 * Object.prototype does actually contain a bunch of built-in methods and hasOwnProperty is one of
 * them and calls it as if it had been defined directly on `nithin` object. So it simply inherited the
 * method from Object.prototype through the prototype chain.
 *
 * Prototypal Inheritance on built-in objects such as arrays:
 *
 */
console.log(nithin.__proto__); // Person.prototype
console.log(nithin.__proto__.__proto__); // top of the prototype chain (Object.prototype)
console.log(nithin.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor); // will point to Person constructor itself.

/**
 * Coming to the prototype object of the arrays, we will be able to find all the methods that
 * we want in the prototype object.
 */
const arr = [3, 6, 6, 4, 5, 9, 6, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
/**
 * The prototype property of the constructor (Array.prototype) is gonna be the prototype of all
 * the object created by that constructor. So just like an object literal shorthand ({}) using
 * the shorthand array creation ([]) is the same as using new Array. When we create an array using
 * the shorthand it is indeed created by the Array constructor behind the scenes.
 *
 * Just like object, array also has some in-built methods. Prototypal inheritance is really a
 * mechanism for reusing code. All the built-in methods have to exist only once somewhere in the
 * JavaScript engine and then all the arrays in our code get access to the functions through the
 * prototype chain and prototypal inheritance.
 */
console.log(arr.__proto__.__proto__);
/* Now, we know arrays inherit all their methods from its prototype. Using this knowledge we can
 * extend the functionality of arrays even further. All we need to do is to add any new method to
 * the array prototype and all the arrays will inherit it.
 */
// method to print the unique array items.
Array.prototype.unique = function () {
  return [...new Set(this)]; // `this` keyword is the array on which the method will be called.
};
console.log('UNIQUE ITEMS: ', arr.unique()); // However this is not a good idea.

const h1 = document.querySelector('h1');
/**
 * This h1 element's prototype object will be HTMLHeadingElement constructor function which
 * inturn will be an HTMLElement constructor function, which will then be Element constructor
 * function, which will next be Node, EventTarget and then finally Object.
 *
 * These HTMLHeadingElement, HTMLElement, Element, Node, EventTarget and Object are different
 * constructor functions which inturn contain a lot of in-built methods. This is a huge prototype
 * chain with 6 levels deep.
 */

/**
 * ES6 Classes:
 * ES6 Classes allow us to do the exact same thing discussed above but using a nicer and more
 * modern syntax. These classes are just a syntactic sugar and are not the same as the ones in
 * other languages like C++ and Java. They implement prototypal inheritance behind the scenes
 * that makes more sense to people coming from other programming languages.
 *
 * Just like in functions, we also have class expressions. This is because classes are just a
 * special type of functions.
 */
// Class expression
// const PersonCL = class {}

/**
 * Class declaration:
 * The constructor function will be called immediately whenever we create an object of the class.
 * Again, we use the `new` keyword here and therefore just like before, the `this` keyword inside
 * the constructor will be set to the newly created empty object. On this empty object, we can set
 * the properties which will finally return a new object.
 *
 * We all the methods we write outside of the constructor function will be on the prototype of the
 * objects and not on the object themselves just like in prototypal inheritance.
 */
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototype property.
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  // Getter function
  get age() {
    return 2037 - this.birthYear;
  }
}
const me = new PersonCL('Nithin', 1989);
console.log(me);
/**
 * Output will be:
 * birthYear: 1989
 * firstName: "Nithin"
 * __proto__:
 *  calcAge: ƒ calcAge()
 *  constructor: class PersonCL
 *  __proto__: Object
 *
 * So using the class syntax, we don't have to manually mess with the prototype property. So, it is
 * true that class just hides the true nature of prototypal inheritance in JavaScript.
 *
 * Couple more important points about classes:
 * 1. Classes are NOT hoisted, even if they are class declarations. Function declarations are hoisted
 * which means we can use them before they are declared in the code..
 * 2. Just like functions, classes are first-class citizens - meaning we can pass them to a function
 * and return from functions because they are special kind of functions behind the scenes.
 * 3. Body of a class are always executed in strict mode even if we did not activate them.
 *
 * Getters and Setters:
 * Every object in JavaScript can have getters and setters properties. We call these special properties
 * as Accessor Properties while the more normal properties are called as Data Properties.
 */
const account = {
  owner: 'Nithin',
  movements: [200, 123, 212, 423],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};
console.log(account.latest);
/**
 * Getter function: We do not call the function as we do with the regular function. This can be
 * very useful when we want to read something as a property but still want to do some
 * calculations before.
 *
 * Setter function: any setter function needs to have exactly one parameter. It is not mandatory
 * to specify a setter when we have a getter for the same property. In this case, property latest.
 * Just a getter or just a setter would be enough. We cannot call the setter function just like we
 * call any regular function. Since it is a property, we can set it just like we set any other
 * property.
 */
account.latest = 500;
console.log(account.movements);
/**
 * Now, however, classes do also have getters and setters, and they do indeed work in the exact
 * same way. So getter is just like regular method that we set on a prototype and setter will be
 * set as a property in the object.
 *
 * Getters and setters can be very useful for data validation. The way it work is, whenever
 * we set the full name here, the setter function is going to be executed.
 *
 * If we try to execute this code, it will fail with a weird error because both the constructor
 * and the setter function are trying to set the exact same property name. As a workaround, we can
 * create a new property name with an underscore (_fullName). When we do this we are creating a
 * new variable. To access the old firstName value we can create a getter method.
 */
class PersonValidationCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance method - gets added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}
const newMe = new PersonValidationCL('Nithin Prasad', 1989);
console.log(newMe);
/**
 * Static methods:
 * Let's take an example of the built in Array.from() method. The from() method is a static
 * method attached to the Array constructor and not to the prototype property of the constructor.
 * So, all arrays do not inherit this method. Hence, we cannot use the from() method on an array.
 *
 * The method is attached to Array constructor and this is because simply that the developers
 * know that it is related to Arrays.
 *
 * Examples of static methods attached to the constructor:
 * 1. Array.from() - Available only on Array constructors and not on all arrays.
 * 2. Number.parseFloat() - Available only on Number constructors and not on all numbers.
 */
// creating a very simple custom static function.
PersonCL.hey = function () {
  console.log('Hey there👋!');
  console.log(this); // this refers to the constructor function since that is the object calling the method.
};
PersonCL.hey(); // works!
// nithin.hey(); // fails!! because it is simply not available on the prototype of the `nithin` object.

/**
 * Static inside a class
 */
class PersonStatic {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method - should be called on the constructor function.
  static hey() {
    console.log('Hey there, static from a class👋!');
    console.log(this);
  }
}
PersonStatic.hey(); // `this` will point to the whole class.

/**
 * Object.create() - Third way of implementing prototypal inheritance or delegation.
 * With Object.create() there is still prototypal inheritance involved. However, there
 * are no prototype properties involved and also no contructor functions and new operator.
 *
 * We use Object.create() to manually set the prototype of an object to any other object
 * that we want. If we can set the prototype to any object, we can create an object that we
 * want to be the prototype of all the person objects.
 *
 * Recreating Person class from the previous example:
 * Now, all we need to do is to actuallycreate a Person object with PersonProto object
 * as the prototype using Object.create().
 */
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
/**
 * The `steve` object here will be an empty object linked to this PersonProto object which
 * will be its prototype.
 */
const steve = Object.create(PersonProto);
steve.name = 'Steven';
steve.birthYear = 1989;
steve.calcAge();
steve.init('', 20);
/**
 * The only difference between Object.create() here is that we did not need any constructor
 * function and also no prototype property at all to achieve the exact same thing.
 */
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1972);
sarah.calcAge(); // Here the `this` keyword points to sarah since we call the calcAge() function
// explicitly and has nothing to do with the constructor functions.

/**
 * Inheritance between "classes" using Constructor Functions:
 * This is real inheritance between classes and not just prototypal inheritance between instances
 * and a prototype property.
 *
 * In this example, we will create Student (child) class and make it inherit from the Person (parent)
 * class.
 *
 * In order to make this code reusable, we can use the call() method and pass the `this` reference
 * to it since in a regular function call, the `this` keyword will be undefined.
 */
const PersonInheritance = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
PersonInheritance.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  /**
   * The `this` keyword would be an empty object that is being created by the `new` operator.
   */
  Person.call(this, firstName, birthYear);
  this.course = course;
};
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I am pursuing ${this.course}`);
};
const mike = new Student('Mike', 2000, 'Maths');
mike.introduce();

/**
 * Inheritance between classes using ES6 classes:
 *
 */
class PersonES6Inheritance {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there, static from a class👋!');
  }
}
/**
 * Two things we need to inherit from the parent class are:
 * 1. `extends` keyword
 * 2. super()
 */
class StudentES6Inheritance extends PersonES6Inheritance {
  constructor(fullName, birthYear, course) {
    // This avoids us the usage of .call() function as super() is the constructor
    // function of the parent class. Needs to be the first line of constructor.
    super(fullName, birthYear);
    this.course = course;
    /**
     * If the course variable was not present then we wouldn't need the constructor
     * function at all since we are inheriting from the parent class.
     *
     * If we do not need any new properties, then you don't even need to bother
     * writing a constructor method in child class
     */
  }

  // overriding calcAge() - this appears first in the prototype chain and it is essentially
  // overriding the method coming from the Parent class.
  calcAge() {
    console.log(`I am ${
      2037 - this.birthYear
    } years old, but as a student I feel more like
    ${2037 - this.birthYear + 10}`);
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I am pursuing ${this.course}`);
  }
}
const nithinSt = new StudentES6Inheritance(
  'Nithin Prasad',
  1989,
  'Computer Science'
);
nithinSt.introduce();
nithinSt.calcAge();
/**
 * In `nithinSt` object, the prototype object will point to `PersonES6Inheritance`
 * class. In the prototypes prototype, all instance methods, static methods, getter
 * and setter method etc. will be set up automatically by the `extends` keyword.
 *
 * Encapsulation: Protected properties and methods
 * There are 2 big reasons why we need encapsulation and data privacy
 * 1. Prevent code from outside of the class to accidentally manipulate our data inside
 * the class.
 * 2. When we expose only a small interface, then we can change all the other internal
 * methods with more confidence.
 *
 * JavaScript classes do not support real data privacy and encapsulation. As a convention,
 * we can add an underscore (_) right before the property. Since this is not truly private
 * we call it protected.
 *
 * To give access to the movements array from the outside then we would have to implement
 * a public method for that.
 */
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected properties
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Nithin', 'EUR', 111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1._approveLoan(1000);

// correct way of accessing the _movements
console.log(acc1.getMovements());
console.log(acc1._pin);

/**
 * Encapsulation: Private class fields and methods
 * There are 4 different kinds of fields and methods.
 * 1. public field
 * 2. public method
 * 3. private field
 * 4. private method
 *
 * Public Fields: Field is a property that will be on all instances. That's why
 * we can also call this a public instance field.
 */
