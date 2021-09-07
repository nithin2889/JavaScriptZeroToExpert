let js = "amazing";
console.log(40 + 8 + 23 - 10);

/**
 * There are 7 primitive data types.
 * -> Number - Floating point numbers. Used for decimals and integers. All numbers are simply of
 * type number.
 * -> String - Sequence of characters. Used for text.
 * -> Boolean - Logical type that can only be true or false. Use for taking decisions.
 * -> Undefined - Value taken by a variable which is not yet defined (empty value).
 * -> Null - Also means empty value.
 * -> Symbol (ES2015) - Value that is unique and cannot be changed.
 * -> BigInt (ES2020) - Larger integers that the Numbers type cannot hold.
 *
 * JavaScript has dynamic typing - We do not have to manually define the data type of the value
 * stored in a variable. Instead, data types are determined automatically.
 *
 * The distinction between value and a variable is that the value has a type, unlike a variable.
 *
 * When you create a variable and not define it, the value is undefined. Also, the type is also
 * undefined.
 * Ex:
 * let year;
 * console.log(year); // prints undefined
 * console.log(typeof year); // prints undefined
 *
 * console.log(typeof null); // returns object which is a bug. However it is not corrected due to
 * legacy reasons. Null is not an object and should have returned null just like it returns
 * undefined for console.log(typeof year) in the above example.
 *
 * Type Conversion - Type conversion is when we explicitly convert from one type to another.
 * Type Coercion - Type conversion is when JavaScript implicitly converts from one type to another.
 *
 * Type Conversion:
 * Ex:
 * const inputYear = '1989';
 * console.log(Number(inputYear), inputYear);
 * console.log(Number(inputYear) + 18);
 *
 * console.log(Number('Nithin')); // NaN
 * console.log(typeof NaN); // number
 * console.log(String(23), 23); // converts number to a string
 *
 * Type Coercion: Happens whenever an operator is dealing with 2 values that have different types.
 * JavaScript will internally convert one of the value to match the other value so that operation
 * can be executed.
 * Ex:
 * console.log('I am ' + 32 + ' years old');
 * Here the '+' operator triggers Type Coercion.
 *
 * console.log('23' + '10' + 3); // 23103
 * console.log('23' - '10' - 3); // 10
 * console.log('23' * '2'); // 46
 * console.log('20' / '10'); // 2
 * console.log('23' > '19'); // true
 * Here the '-', '*', '/', '>' operators trigger an opposite conversion. That is, from string to
 * numbers.
 *
 * Truthy and Falsy values:
 * Falsy values are not exactly false but will become false when we try to convert them into boolean.
 *
 * The 5 falsy values in JavaScript:
 * 1. 0 - any number that is not 0 will be converted to true when we try to convert them to boolean
 * 2. '' - any string that is not empty string will be converted to true when we try to convert them to boolean.
 * 3. undefined
 * 4. null
 * 5. NaN
 * All these will be converted to false when we try to convert them to boolean. However, JavaScript * will do implicit conversion.
 *
 * When exactly does JavaScript do Type Coercion to booleans?
 * It happens in 2 scenarios.
 * 1. Logical operators
 * 2. Logical context while using if-else statements
 *
 * No matter what we put inside the if condition, if it is not a boolean, JavaScript will try
 * to convert it into a boolean by using the truthy falsy concept.
 *
 * const money = 0;
 * if (money)
 *  console.log('Dont spend it all!');
 * else
 *  console.log('You should get a job!');
 *
 * Any number other than 0 will be a truthy value.
 *
 * Equality operators (== vs ===)
 * === operator returns a boolean value. This is a strict equality as it doesn't perform Type Coercion.
 * Checks for both value and reference. For ex: '18' === 18, returns false
 * == operator is a loose equality and performs Type Coercion. For ex: '18' == 18, returns true
 *
 * Using prompt() function we can get a value from any webpage.
 */
