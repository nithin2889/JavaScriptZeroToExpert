// Exporting module
console.log('Exporting module');

/**
 * All top level variables are scope to the current module will be private and
 * will not be available outside the module until we explicitly export them.
 *
 * In ES modules, there are 2 types of exports.
 * 1. Named exports -  Simplest of the exports because all we have to do is to
 * put export keyword in front of anything that we might want to export.
 * When we import we need to use the exact name we exported it with.
 *
 * 2. Default exports - We usually use the default exports when we want to export
 * only one thing per module. As we can see below there is no name involved here.
 * When we are importing it we can give it any name we want and use it in the
 * imported module.
 * If we wanted, we could mix both named and default exports in one single import
 * statement.
 */
const shippingCost = 10;
const cart = [];

// Named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
};

const totalPrice = 222;
const totalQuantity = 23;

/**
 * We can also import multiple things from a module as shown below. This is just
 * like exporting an object from a module.
 */
export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart.`);
}
