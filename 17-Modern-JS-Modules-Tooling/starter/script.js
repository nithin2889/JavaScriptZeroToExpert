/**
 * In today's JavaScript, we divide our project into multiple modules and
 * these modules can share data between them and make our code more organized
 * and maintainable. One great thing about modules is that we can also include
 * third-party modules into our own code. Developers today share their works
 * or packages on the NPM repository and then we can use these packages for
 * free in our own code.
 *
 * NPM has established itself as the go to repository for all kinds in modern
 * JavaScript development.
 *
 * NPM is both a repository in which packages live and a program that we use
 * on our computers to install and manage these packages.
 *
 * Assume we finished development of our application containing multiple
 * modules and some third-party modules as well. However, that is not the end
 * of the story. Instead, our project now needs to go through a build process
 * where one big final JavaScript bundle is built. That's the final file which
 * we will deploy to our web server for production. Basically, it is the
 * JavaScript file that will be sent to browsers in production.
 *
 * Build process can be something really complex but here we have only two
 * steps included.
 * 1. Bundling - Will bundle all our modules together into one big file. This is
 * a pretty complex process which can eliminate unused code and compress our code
 * as well. This step is super important for 2 big reasons.
 * a. Older browsers don't support modules at all. So code inside a module could
 * not be executed by any old browsers. Better for performance to send less files
 * to the browser due to the code compression.
 *
 * 2. Transpiling/Polyfilling: Basically converts all modern JavaScript syntax
 * and features back to old ES5 syntax so that even older broswers can understand
 * our code without breaking. This is usually done using a tool called Babel.
 *
 * After these two steps we end up with that final JavaScript bundle ready to be
 * deployed on a server for production. However, we do not do these build steps
 * manually. Instead we use a build tool and the most common build tools available
 * are probably Webpack and Parcel. These are called JavaScript bundlers because
 * as the name says they take our raw code and transform it into a JavaScript bundle.
 *
 * These development tools are also available on NPM. Just like packages we incliude
 * in our code, we also download and manage tools using NPM as well.
 *
 * An overview of modules in JavaScript:
 * A module is a reusable piece of code that encapsulates implementation details of
 * a certain part of our project. That sounds like a class or a function but the
 * difference is usually a standalone file, but that's not always the case.
 *
 * A module always contains some code but it can also have imports and exports. We
 * can export values out of a module. For example, simple values or even entire
 * functions and whatever we export from a module is called a Public API.
 *
 * Now, in the case of modules, this public API is actually consumed by importing
 * values into a module and these other modules from which we import are then called
 * dependencies of the importing module because the code that is in the module that
 * is importing cannot work without the code that it is importing from the external
 * module.
 *
 * Using module is useful in a way that engineers can work in isolation without even
 * understanding what the other engineers are doing.
 *
 * Modules make it easy to abstract our code. Basically, we can use modules to
 * implement the low-level code. Then the other modules which don't really care about
 * these low-level details can import these abstractions and use them.
 *
 * As of ES6, JavaScript has a native built-in module system. ES6 modules are modules
 * that are actually stored in files and each file is one module. There is exactly one
 * module per file.
 *
 * Difference between a script and an ES6 module:
 * 1. Top-level variables: All top-level variables in ES6 module are scoped to module.
 * Variables are private to modules by default. The only way we can access a variable
 * that is inside of a module is by exporting that value.
 * In scripts, all top-level variables are always global which can lead to global name
 * space pollution where multiple scripts try to declare variables with the same name
 * and then these variables collide.
 *
 * 2. Default mode: ES6 modules are always executed in strict mode while scripts on the
 * other hand are executed in "sloppy" mode by default.
 *
 * 3. Top-level `this` keyword: The `this` keyword is always undefined at the top-level
 * while in scripts the `this` keyword points at the window object.
 *
 * 4. Imports and exports: We can export and import values between multiple modules in
 * ES6 module. In regular scripts, importing and exporting values is just completely
 * impossible. The other important thing to know about the export and import is the fact
 * that they can only happen at the top-level. As you know, outside of any function or any
 * if block. Also, all imports are hoisted. So no, matter where in the code you are
 * importing values, it is like the import statement will be moved to the top of the
 * file.
 *
 * 5. HTML linking: In order to link a module to an HTML file, we need to use the script tag with
 * the `type` attribute set to `module` instead of just a plain script tag.
 *
 * 6. File downloading: In ES6 module this always happens in an asynchronous way. This
 * is true for a module loaded from HTML as well as for modules that are loaded by
 * importing one module into another. Regular scripts on the other hand are downloaded
 * by default in a blocking synchronous way unless we use the async or defer attributes
 * on the script tag.
 *
 * How ES6 modules imported behind the scenes?
 * When a piece of code is executed, the first step is to parse the code. Parsing basically
 * means to read the code without executing it. This is the moment the imports are
 * hoisted. The whole process of importing modules happens before the code in the main
 * module is actually executed.
 *
 * Ex: index.js
 * import { rand } from './math.js';
 * import { showDice } from './dom.js';
 * const dice = rand(1, 6, 2);
 * showDice(dice);
 *
 * In this example, index.js module imports the dom and math modules in a synchronous way.
 * What that means is only after all imported modules have been downloaded and executed,
 * the main index.js module will finally be executed.
 *
 * That is because if we only import and export values outside of any code that needs to
 * be executed, then the engine can know all the imports and exports during the parsing
 * phase.
 *
 * If we were allowed to import a module inside of function, then that function first have
 * to be executed before the import could happen. In that case, modules could not be imported
 * in a synchronous way. The importing module should have to be executed first.
 *
 * Why do we want to load the modules in a synchronous way?
 * Because this makes bundling and dead code elimination possible. So by knowing all
 * dependencies between modules before execution, bundlers like webpack and parcel can then
 * join multiple modules together and eliminate that code. This is the reason why we can
 * import or export outside of any code that needs to be executed.
 *
 * After the parsing process as figured out which module it needs to import, then these
 * modules are actually downloaded from the server. Downloading happens in an asynchronous
 * way. After modules are downloaded, they are parsed and then the modules exports are
 * linked to the imports of index.js. This connection is actually a live connection. The exports
 * are not copied to an import. Instead the imports are just a reference to the exported value
 * like a pointer.
 *
 * Next, the code in the imported modules is executed and with this the process of importing
 * modules is finally finished. Now, it is time for the importing module (index.js) to be finally
 * executed as well.
 */
/**
 * This below code will not work because when we want to connect a module to the HTML file, we
 * need to specify the type attribute as module.
 *
 * Here, the exporting module will be executed before any of the importing module. All imports
 * must happen in the top-level code otherwise we will get unexpected token error.
 *
 * We can export multiple things from a module using named exports which is the main use case
 * of named exports.
 *
 * We can also change the names of the imports and exports as well by using the keyword `as`.
 */
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// console.log('Importing module');

// addToCart('bread', 5);

// console.log('Price: ', price);
// console.log('Quantity: ', tq);

/**
 * We can import everything from a module by using a `*` which specifies all. This will create
 * a namespace for all of the values exported from that module.
 *
 * If we see here, the module shoppingCart.js is exporting a public API just like a class.
 */
// import * as ShoppingCart from './shoppingCart.js';

// add('Apples', 2);
// console.log('Importing module');

// ShoppingCart.addToCart('bread', 5);

// console.log('Price: ', ShoppingCart.totalPrice);
// console.log('Quantity: ', ShoppingCart.tq);

import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';

add('pizza', 3);
console.log('Importing module');

addToCart('bread', 5);

console.log('Price: ', price);
console.log('Quantity: ', tq);
