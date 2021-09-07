'use strict';

/**
 * Destructuring is an ES6 feature and is basically a way of unpacking values from
 * an array or an object into separate variables.
 */
// Old way of breaking down things and storing in variables.
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// ES6 way with the original array not being affected
const [aa, bb, cc] = arr;
console.log(aa, bb, cc);

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    time = '20:00',
    address,
    starterIndex = 1,
    mainIndex = 0,
  }) {
    console.log(
      `Order received!
      ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]} to be 
      delivered at ${time} to ${address}, `
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your order with delicious ${ing1} ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/**
 * If in any case we would only want to destructure elements in the middle of the array
 * then we would just leave a hole in the destructuring operator.
 */
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

/**
 * To swap the two values
 */
// old way by using a temporary variables
// const temp = main;
// main = secondary;
// secondary = temp;

// new way by using the destructuring operator
[main, secondary] = [secondary, main];
console.log(main, secondary);

/**
 * Another trick with destructuring is that we can have a function return an array and
 * then we can immediately destruct the result into different variables. This allows us
 * to return multiple values from a function.
 */
const [starter, mains] = restaurant.order(3, 2);
console.log(starter, mains);

/**
 * In case of nested arrays
 */
const nested = [2, 4, [5, 6]];
const [firstElement, , secondArray] = nested;
console.log(firstElement, secondArray);

// Nested destructuring every single element
const [one, two, [three, four]] = nested;
console.log(one, two, three, four);

/**
 * Setting default values for the variables when we are extracting values. This might
 * come in handy when an array is smaller than we think and try to unpack the array in
 * positions that don't even exist.
 */
// without default values
const [p, q, r] = [8, 9];
console.log(p, q, r); // 8, 9, undefined

// using default values
const [pp = 1, qq = 2, rr = 3] = [8, 9];
console.log(pp, qq, rr);

/**
 * Object destructuring - For destructuring objects we use {}. Next, you need
 * to give the variable names that you would like to retrieve from the object.
 * Now, since in an object the order of elements does not matter, we do not
 * need to skip elements like we did in an array.
 */
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

/**
 * What if we wanted different names from the proerty names?
 * Of course we still need to reference the property names like we did before,
 * otherwise JavaScript has no way of knowing what we actually want.
 */
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

/**
 * We can also specify default values to the variables in case they do not
 * have any values in the object same way we did for arrays.
 */
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

/**
 * Mutating/Swapping variables while destructuring objects.
 */
let aaa = 111;
let bbb = 222;
const obj = {
  aaa: 23,
  bbb: 7,
  ccc: 14,
};
/**
 * Need to mutate the values of aaa and bbb to 23 and 7. If we try something like
 * we did to arrays then we will get a SyntaxError: Unexpected token '='
 */
/**
 * Cannot do something like this. The reason for that is when we start a line with
 * curly braces then JavaScript expects a code block.
 */
// {aaa, bbb} = obj;
/**
 * The trick here to solve this is to wrap the above code in a parenthesis
 */
({ aaa, bbb } = obj);
console.log(aaa, bbb); // 23, 7

/**
 * Nested Objects: To retrieve the opening hours on a Friday can be done by something
 * like this. We can further make use of the destructuring as shown and even provide
 * alias names as shown below.
 */
const {
  fri: { open: op, close: cl },
} = openingHours;
console.log(op, cl);

/**
 * We can pass an object to a function and destructure right away in the function. The
 * great thing about this is that the properties and the index do not have to match the
 * order in which we do destructuring.
 */
restaurant.orderDelivery({
  time: '14:30',
  address: 'Via del Sole, 21',
  starterIndex: 2,
  mainIndex: 2,
});

/**
 * Spread operator (...) - We use the spread operator to basically expand an array into all
 * its elements. Basically it unpacks all the elements at once.
 */
const existingArr = [7, 8, 9];
// old way of doing it.
const badNewArr = [existingArr[0], existingArr[1], existingArr[2], 10];
console.log(badNewArr);
// ES6 way of doing it using a spread operator
const goodNewArr = [...existingArr, 10];
/**
 * Here, the spread operator will help us to log individual elements of the array rather than
 * printing the array as a whole.
 */
console.log(...goodNewArr);

/**
 * With spread operator it is like taking all the elements out of the array and writing them
 * manually. JavaScript will individually represent in the new array. So we can use the spread
 * operator whenever we would otherwise write multiple values separated by commas.
 *
 * Spread operator is very similar to the destructuring. The big difference is that the spread
 * operator takes all the elements from the array and it also doesn't create new variables.
 * As a consequence we can only use it in places where we otherwise write values separated by
 * commas.
 *
 * Two important use cases of spread operator
 * 1. Create shallow copies of arrays
 * 2. Merge two arrays or more together
 */
// Copying array
const mainMenuCopy = [...restaurant.mainMenu];
console.log('Shallow copy of main menu: ', mainMenuCopy);

// Merge arrays
const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log('Complete restaurant menu: ', wholeMenu);

/**
 * Not only the spread operators work on arrays, but on all iterables.
 *
 * What is an iterable?
 * There are different iterables in JavaScript like arrays, strings, maps, or sets, but not
 * objects. So basically, most of the in-built data structures are iterables except objects.
 *
 * Since strings are iterables, we can use the spread operator on strings as well.
 */

const str = 'Nithin';
const letters = [...str, ' ', 'P'];
console.log(letters);
/**
 * Just like we unpacked an array we did the same thing with a string. Just keep in mind that
 * we can still only use the spread operator when building an array, or when we pass values
 * into a function.
 */
// This below code doesn't work because it doesn't expect multiple values separated by commas.
// console.log(`${...str}`); // Unexpected token ...
const ingredients = [
  // prompt("Let's make some pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];
restaurant.orderPasta(...ingredients);
// This is similar to saying `restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);`

/**
 * Since ES2018, the spread operator also works on objects even though objects are not iterable.
 */
const newRestaurant = { ...restaurant, founder: 'Nithin', inception: 1990 };
console.log('New restaurant: ', newRestaurant);

/**
 * We can do the shallow copy on objects just like we did on arrays.
 */
const restaurantCopy = { ...restaurant };
restaurantCopy.founder = 'Nithin';
restaurantCopy.inception = 2000;
console.log('Restaurant shallow copy: ', restaurantCopy);

/**
 * Rest pattern and parameters: The Rest pattern looks exactly like the spread operator but
 * it does the opposite of the spread operator depending on where they are used.
 *
 * The rest pattern uses the exact same syntax, however, to collect multiple elements and
 * condense them into an array. That is really the opposite of the spread operator.
 *
 * The spread operator is to unpack an array while the rest pattern is to pack elements into
 * an array. The spread operator is written on the right hand side of the assignment operator
 * while the rest syntax is used on the left hand side of the assignment operator.
 */
const restArray = [1, 2, 3, 4, 5];
const [restA, restB, ...others] = restArray;
console.log(restA, restB, ...others);
/**
 * It is called the rest pattern because it will take the remaining elements of the array
 * and then put them into a new array. This rest collects the elements that are unused in
 * the destructuring assignment.
 *
 * One thing to note here is the rest syntax collects all the array elements after the last
 * variable since it does not include any skipped elements. For this reason the rest pattern
 * always must be the last in the destructuring assignment because otherwise JavaScript will
 * not know until when it should collect the rest of the array elements.
 *
 * If we try to use the rest pattern in the middle of the destructuring assignment, then we
 * will get a syntax error. For the same reason there can only be one rest pattern in any
 * destructuring assignment.
 */
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

/**
 * Works the same way in objects where the remaining elements will be collected into an object
 * instead of an array.
 */
const { sat: saturday, ...weekdays } = restaurant.openingHours;
console.log(saturday, weekdays);

/**
 * Rest arguments:
 * We can also pass the rest pattern as parameter to a function which can then be called as
 * rest arguments.
 */
const add = function (...numbers) {
  let sum = 0;
  numbers.forEach(number => (sum += number));
  console.log(sum);
};

add(2, 4);
add(5, 6, 7);
add(1, 2, 3, 5, 7, 8, 9);

/**
 * Here we are taking all the numbers of the array and then spreading them here. This proves
 * that spread is opposite of rest.
 * By doing this out function can accept both arrays and single values.
 */
const x = [21, 3, 4];
add(...x);

// Ex: 2
restaurant.orderPizza('chicken', 'onions', 'pepparoni', 'spinach');

/**
 * The Nullish Coalescing Opearator (??):
 * It is an operator introduced in ES2020. This operator works with the concept of nullish
 * values (null and undefined only) instead of falsy values (0, '', undefined, null).
 */
restaurant.numGuests = 0; // 0 is falsy value so it prints 10.
const guestsOld = restaurant.numGuests || 10;
console.log(guestsOld);

restaurant.numGuests = null;
// since nullish coalesce operator looks for null or undefined, and indeed the value of
// numGuests is null, it prints 10.
const guestsNew = restaurant.numGuests ?? 10;
console.log(guestsNew);

/**
 * for-of loop: Introduced in ES6.
 * We can still use `continue` or `break` keywords as part of for-of loop.
 */
const newMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// Read it as `for an item of the menu`.
for (const item of newMenu) {
  console.log(item);
}

/**
 * Getting the current index out of a for-of loop is a bit of a pain but we can do it
 * using entries() which is an Array Iterator which gives us the index along with the
 * actual item.
 */
for (const [i, el] of newMenu.entries()) {
  console.log(`${i}: ${el}`);
}

/**
 * Enhanced object literals
 * ES6 introduced three ways which make it easier to write object literals.
 *
 * 1. First enhancement is about using a property name is exactly same as the variable
 * name from which we are getting a new object we can just use the object name by having
 * the property name.
 */

const myNewOpeningHours = {
  fri: {
    open: 9,
    close: 20,
  },
  sat: {
    open: 8,
    close: 24,
  },
  sun: {
    open: 9,
    close: 24,
  },
};

const myNewRestaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    time = '20:00',
    address,
    starterIndex = 1,
    mainIndex = 0,
  }) {
    console.log(
      `Order received!
      ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]} to be 
      delivered at ${time} to ${address}, `
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your order with delicious ${ing1} ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },

  // ES6 enhanced object literal
  myNewOpeningHours,
};
console.log(myNewRestaurant);

/**
 * 2. Second enhancement is about writing methods. We no longer have to create
 * a property and then set it to a function expression.
 */
const myAnotherNewRestaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ time = '20:00', address, starterIndex = 1, mainIndex = 0 }) {
    console.log(
      `Order received!
      ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]} to be 
      delivered at ${time} to ${address}, `
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your order with delicious ${ing1} ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredients, ...otherIngredients) {
    console.log(mainIngredients);
    console.log(otherIngredients);
  },

  // ES6 enhanced object literal
  myNewOpeningHours,
};
console.log(myAnotherNewRestaurant);

/**
 * 3. Third enhancement is that now we can compute property names of an object
 * dynamically instead of having to write them out manually and literally.
 */
const weekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const myNextNewOpeningHours = {
  [`day - ${weekday[0]}`]: {
    open: 10,
    close: 20,
  },
  [weekday[4]]: {
    open: 9,
    close: 20,
  },
  [weekday[5]]: {
    open: 8,
    close: 24,
  },
  [weekday[6]]: {
    open: 9,
    close: 24,
  },
};
console.log(myNextNewOpeningHours);

/**
 * Optional chaining (?.)
 * If we have no way of knowing if a particular data is present inside the object
 * or not, then we can use the optional chaining to avoid undefined errors.
 *
 * In order to avoid the mess of checking whether the data exists or not with an
 * if condition, we can use optional chaining to make the code more readable and
 * less messy.
 *
 * So if a certain property does not exist then undefined is returned immediately.
 */
/**
 * In the below code, only if the properties before the question mark exist then
 * the property after the question mark would be read. If not, then immediately
 * an undefined is returned.
 *
 * And "exists" here actually means the nullish concept we saw earlier. So a property
 * exists if it is not null and not undefined. If it is zero or an empty string then
 * it doesn't exist.
 *
 * We can have multiple optional chaining.
 */
console.log(restaurant.openingHours?.mon?.open); // undefined, since "mon" is not present

// Ex
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // Use case of optional chaining and the nullish coalesce operators together.
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${open}`);
}

/**
 * Optional chaining also works on methods. We can check whether a method is
 * present or not before calling it.
 */
console.log(restaurant.order?.(0, 2) ?? 'method does not exist');
console.log(restaurant.orderRisotto?.(0, 2) ?? 'method does not exist');

/**
 * Optional chaining even works on arrays.
 */
const users = [{ fName: 'Nithin', email: 'nithin2889@gmail.com' }];
console.log(users[0]?.fName ?? 'User does not exist!');
console.log(users[1]?.fName ?? 'User does not exist!');

/**
 * Looping objects: We have different options depending on what exactly we want
 * to loop over. We can loop over object property names, over the values or both
 * together.
 */
const properties = Object.keys(openingHours);
let st = `We are open ${properties.length} days: `;

// looping over property names or keys:
for (const day of properties) {
  st += ` ${day}`;
}
console.log(st);

/**
 * What if we wanted the property values themselves?
 */
const values = Object.values(openingHours);
console.log(values);

/**
 * To loop over the entire object we would need the entries (key and value pair
 * is an entry)
 */
const entries = Object.entries(openingHours);
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we are open at ${open} and close at ${close}`);
}

/**
 * Before ES6, JavaScript only had two data structures: Objects and Arrays.
 * In ES6, two more data structures were finally introduced - Sets and Maps.
 *
 * Set: Set is a collection of unique values. Meaning they can never have any
 * duplicates.
 * We use the new keyword to create a set and pass an iterable. Set can of course
 * hold different data types in it.
 *
 * The output kind of looks like an array with no key-value pairs but still
 * different from an array - one is it can hold only unique values and two,
 * the order of elements in the set is irrelevant.
 */
const ordersSet = new Set([
  'Pasta',
  'Burger',
  'Pizza',
  'Pizza',
  'Risotto',
  'Bruschetta',
]);
console.log(ordersSet);

/**
 * Since strings are also iterables, we can pass them in a set.
 */
console.log(new Set('Nithin'));
// to print the number of elements in a set.
console.log(ordersSet.size);

// to check a certain element is in the set (similar to includes() method in arrays)
console.log(ordersSet.has('Risotto'));
console.log(ordersSet.has('Bread'));

// to add new elements to a set
ordersSet.add('Garlic bread sticks');
ordersSet.add('Garlic bread sticks');

// to delete elements from a set
ordersSet.delete('Burger');
console.log(ordersSet);

/**
 * There is no way to retrieve an element from a set since all the values are unique
 * and the order doesn't matter. All we need to know is whether a certain value is
 * present inside a set or not.
 *
 * If your goal is to store values in order and then retrieve it then the best use
 * case is to use an array.
 */

// to clear all the elements from a set
// ordersSet.clear();
// console.log(ordersSet);

// Sets are iterable and can be looped over a set
for (const orders of ordersSet) {
  console.log(orders);
}

// In a normal code base, the best use case is to remove the duplicate values of arrays
const staff = ['waiter', 'chef', 'manager', 'waiter', 'chef', 'waiter'];
// to convert a set to an array we can wrap the set inside an array and use the spread operator
const staffSet = [...new Set(staff)];
console.log(staffSet);

/**
 * Maps: Fundamentals
 * Map is a data structure that we can use to map values to keys. Data is stored in key-value
 * pairs in maps. Now, the big difference between objects and maps is that in maps, the keys
 * can have any data types. In objects, the keys are basically always strings.
 *
 * Calling the set() method doesn't only update the map that it is called on, but it also returns
 * the map.
 */
const restaurantMap = new Map();
restaurantMap.set('name', 'Classico Italiano');
restaurantMap.set(1, 'Firenze, Italy');
console.log(restaurantMap.set(2, 'Lisbon, Portugal')); // updates and returns the map with all changes

/**
 * we can also chain multiple set methods.
 */
restaurantMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

// read
console.log(restaurantMap.get('name'));
console.log(...restaurantMap.get('categories'));

const time = 21;
console.log(
  restaurantMap.get(
    time > restaurantMap.get('open') && time < restaurantMap.get('close')
  )
);

// to check for a certain key
console.log(restaurantMap.has(true));
console.log(restaurantMap.has('category'));

// to delete an entry
console.log(restaurantMap.delete(true));
console.log(restaurantMap);

/**
 * Comparing this to objects, we can also be able to delete properties from objects
 * using a delete operator. But this is a really slow process. Objects also has a
 * method called hasOwnProperty().
 */

// to get the size property
console.log(restaurantMap.size);

// to remove all the elements
// console.log(restaurantMap.clear());

/**
 * Another way of populating a map without using a set()
 */
const question = new Map([
  ['question', 'Which is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct!🎉'],
  [false, 'Try again!'],
]);
console.log(question);
/**
 * The above array structure is exactly similat to the one that is returned
 * by Object.entries(). So this means we can easily convert an object to a map.
 */
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// iteration
console.log(question.get('question'));
for (const [key, val] of question) {
  if (typeof key === 'number') {
    console.log(`${key}: ${val}`);
  }
}
// const answer = Number(prompt('Your answer?'));
const answer = 3;
console.log(question.get(answer === question.get('correct')));

// converting map to an array
console.log([...question]);
// console.log(question.entries());
console.log(question.keys());
console.log(question.values());

/**
 * Working with Strings - Part 1
 */
const airline = 'TAP Air Portugal';
console.log('String is: ', airline);
// To get a character of a string at a certain position
console.log('Character at position 4: ', airline[4]);
console.log('Character at position 0: ', airline.charAt(0));
console.log('Character at position 1: ', airline.charAt(1));
console.log('Length of the string: ', airline.length);

// To get the position in which a certain letter is in a string
console.log('Index of P: ', airline.indexOf('P'));

// To get the last position in which a certain letter is in a string
console.log('Last index of r: ', airline.lastIndexOf('r'));

// To extract part of a string starting from a specific index
console.log(airline.slice(4));
/**
 * Starting from 4th index and not including 7th character. The length of the
 * extracted string is always going to be (end - beginning => 7 - 4 = 3 characters).
 */
console.log(airline.slice(4, 7));
console.log(airline.slice(airline.lastIndexOf('A')));

/**
 * check middle seat
 */
const checkMiddleSeat = function (seat) {
  // 11B or 23E => middle seats
  seat.slice(-1) === 'B' || seat.slice(-1) === 'E'
    ? console.log('Middle seat')
    : console.log('Not a middle seat');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

/**
 * Why do the primitive strings have methods on them? Shouldn't methods be available
 * only objects such as arrays?
 * Whenever we call a method on a string, JavaScript will automatically behind the
 * scenes convert the string primitive to a string object with the same content and then
 * on that object is where the methods are called. This process is called as boxing as it
 * basically takes our string and puts it in a box which is the object.
 */
// Ex: Whenever we call a method on a string, JavaScript will do something like below:
console.log(typeof new String('nithin')); // object
// Once the operation is completed, the object is converted back to a regular string
// primitive. All string methods return primitives.
console.log(typeof new String('nithin').slice(1)); // string

/**
 * Working with strings - part 2
 * Changing case of a string
 * 1. toLowerCase()
 * 2. toUpperCase()
 *
 * Trim whitespaces
 * 1. trim()
 * 2. trimStart()
 * 3. trimEnd()
 * 4. replace(old, new) - replacing parts of string
 * 5. replaceAll(old, new)
 */
let announcement = 'All passengers come to boarding door 23. Boarding door 23';
announcement = announcement.replaceAll('door', 'gate');
console.log(announcement);

let announcementRegex =
  'All passengers come to boarding door 23. Boarding door 23';
announcementRegex = announcementRegex.replace(/door/g, 'gate');
console.log(announcementRegex);

/**
 * Methods that return a boolean
 * 1. startsWith
 * 2. endsWith
 * 3. includes
 */

/**
 * Working with Strings - Part 3
 * 1. split() - allows us to split a string into multiple parts based on a
 * divider string.
 */
console.log('a+very+nice+string'.split('+'));
console.log('nithin akhila'.split(' '));

/**
 * 2. join() - join() is the opposite of split() method.
 */
const [fName, lName] = 'nithin prasad'.split(' ');
const newName = ['Mr.', fName, lName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // OR
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  return namesUpper.join(' ');
};
const capitalizedName = capitalizeName('nithin prasad');
console.log(capitalizedName);

/**
 * 3. padStart() - adding a number of characters to the beginning of the
 * string until the string has a certain desired length.
 */
const message = 'Go to gate 23';
// pads '+' to the beginning of the string to make the length of the string to 25.
console.log(message.padStart(25, '+'));

/**
 * 4. padEnd() - adding a number of characters to the end of the
 * string until the string has a certain desired length.
 */
console.log(message.padStart(25, '+').padEnd(30, '-'));

/**
 * 5. repeat() - allows us to repeat the same string multiple times.
 */
const msg2 = 'Bad weather... All departures delayed';
console.log(msg2.repeat(5));
