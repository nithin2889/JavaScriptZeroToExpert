'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/**
 * How the DOM is organized internally?
 * DOM - DOM is basically the interface between JavaScript and the browser,
 * or more specifically the HTMl documents that are rendered in and by the
 * browser.
 * We can create, modify and delete elements, set styles, classes and attri
 * -butes and listen and respond to events. In practice this works because
 * the DOM tree generates from any HTML document. DOM tree is a tree like
 * structure made out of nodes with which we can interact. DOM is a very
 * complex API using which we can programmatically interact with the DOM.
 * In practice, that means the DOM contains a ton of methods and properties
 * that we use to interact with the DOM tree such as the querySelector,
 * addEventListener, createElement, innerHTML, textContent, children properties
 * etc.
 *
 * In a DOM, there are different types of nodes - some nodes are HTML elements
 * but others are just text.
 *
 * 1. Every single node in the DOM tree is of the type, Node.
 * 2. Each node is represented in JavaScript by an object. This object gets access
 * to special node methods and properties such as text content, child nodes,
 * parent nodes, clone nodes and many others.
 * 3. There are different types of Nodes and these Node types have a couple
 * of child types so to say. These types are:
 * a. Element Node Type - <p>, <html>, <body> and this type of Node gives each HTML element
 * access to a ton of useful properties such as innerHTML, classListm children or parent
 * element. The Element type has internally an HTMLElement child type and that Element
 * type itself has exactly one child type for each HTML element that exists in the HTML.
 * So we have special type for buttons, images, for links and so on. This is important
 * because each of these HTML elements can have different unique properties. For ex,
 * and image element has `src` attribute in HTML which no other element has and so on.
 * Therefore different types of HTML elements were created in the DOM API.
 * b. Text Node Type - the actual text
 * c. Comment Node Type - JavaScript comment <!-- -->
 *
 * What makes all this work is something called as inheritance. What is inheritance?
 *
 * EventTarget (parent of all)
 *  |-----------|
 * Node       Window
 *  |
 * Element
 *  |
 * HTMLElement
 *  |----------------------------|
 * HTMLButtonElement .... HTMLDivElement (one different type of HTMLElement per HTML element...)
 *
 * Node has the following useful methods:
 * 1. .textContent
 * 2. .childNodes
 * 3. .parentNode
 * 4. .cloneNode
 *
 * Inheritance means all the child types will also get access to the methods and
 * properties of all their parent node types. For ex, an HTMLElement will get access
 * to everything from the element type like innerHTML, closest, or classList. In addition
 * it will also get access to everything from the Node type because that is also its
 * parent type.
 *
 * Element Type has the following useful methods:
 * 1. .innerHTML
 * 2. .classList
 * 3. .children
 * 4. .parentElement
 * 5. .append()
 * 6. .remove()
 * 7. .insertAdjacentHTML()
 * 8. .querySelector()
 * 9. .closest()
 * 10. .matches()
 * 11. .scrollIntoView()
 * 12. .setAttribute()
 *
 * Basically, this is how the DOM API is broken down into different types of Nodes.
 *
 * d. Document Node Type - `document` which we use all the time in DOM manipulation is
 * in fact just another type of node.
 *
 * Document type contains the following important methods:
 * 1. .querySelector()
 * 2. .createElement()
 * 3. .getElementById()
 *
 * NOTE: querySelector() is available on both Document and Element types.
 *
 * The DOM API actually needs a way of allowing all the Node types to listen to events. We
 * usually listen for events by calling the addEventListener() method on an Element or the
 * Document. This works because there is a special type of Node called `EventTarget` which
 * is a parent of both the Node type and the Window (global object) Node type.
 *
 * EventTarget type contains the following important methods:
 * 1. addEventListener()
 * 2. removeEventListener()
 *
 * Thanks to inheritance, we can call addEventListener() on every single Node types in the DOM API.
 *
 * We never create the EventTarget object manually. It is just an abstract type. We do not
 * use it in practice.
 *
 * In a nutshell, this is how the DOM API works and is structured behind the scenes.
 *
 * Selecting, Creating and Deleting Elements:
 * A special way of selecting an entire document of any web page is by using `document.documentElement`.
 * Just document is not enough to select the document element. This will select the entire HTML
 * document.
 */
// Selecting elements
console.log(document.documentElement);
console.log(document.head); // selects head
console.log(document.body); // selects entire body

// other way to select the head and body
const header = document.querySelector('.header');
document.querySelector('.body');

// selects all the elements with a class named 'section'
const allSections = document.querySelectorAll('.section');
// This returns a NodeList and an element in the NodeList cannot be deleted from it.
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
/**
 * getElementsByTagName returns an HTMLCollection because an HTMLCollection is so called
 * live collection. That means if the DOM changes (delete an HTML from the DOM) then this
 * collection is also immediately updated. The same does not happen with a NodeList,
 */
console.log(allButtons);

const allClasses = document.getElementsByClassName('btn');
/**
 * getElementByClassName() is similar to getElementsById() and getElementsByTagName() and this
 * returns a live HTML collection as well.
 */
console.log(allClasses);

// Creating elements
/**
 * We can create HTML elements using the insertAdjacentHTML() function. The other way to
 * create an HTML element is createElement() which returns the DOM element which we can
 * save somewhere. All this is, is a DOM element that we can now use to do something on it
 * but it is not yet on the DOM itself.
 */
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // adds message as the first child of header
header.append(message); // adds message as the last child of header
/**
 * To insert multiple copies of the same element we actually would have to first copy the first
 * element
 */
// header.append(message.cloneNode(true));

// before and after methods - will add the element as a subling before or after the heading element.
// header.before(message);
// header.after(message);

// Deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // message.remove()
  // OR use the old school way of removing the element by traversing the DOM
  message.parentElement.removeChild(message); // DOM traversing
});

/**
 * Styles, Attributes and Classes:
 * The styles we set as shown below will be set as an inline styles. We cannot read the values
 * which are hidden or which do not exist. If in case, we need to see the styles applied then
 * we can use the getComputedStyle() method.
 */
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

/**
 * In order to change the custom CSS properties we can use the setProperty() method.
 */
// document.documentElement.style.setProperty('--color-primary', 'orangered');

/**
 * Attributes: Only standard attributes can be queried as shown below and if we try
 * to add our own custom attributes, then JavaScript will not add them to the object
 * automatically. However, we can use getAttribute() method to get the custom attributes.
 */
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// how to fetch a non-standard/custom attribute
console.log(logo.getAttribute('designer'));

// We can also set an attribute on any element using setAttribute()
logo.setAttribute('company', 'Bankist');

// Absolute URL
console.log(logo.src);
// Relative URL
console.log(logo.getAttribute('src'));

/**
 * Finally, there are special type of attributes called Data Attributes that starts with
 * the word `data`. For ex, data-version-number
 * What's special about these attributes are now these attributes are stored as part of the
 * dataset object. We use these data attributes when we want to store data in user interface
 * or HTML code.
 */
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('a', 'b');
logo.classList.remove('a', 'b');
console.log(logo.classList.toggle('a')); // returns a boolean if present
console.log(logo.classList.contains('a')); // returns a boolean if present

/**
 * Smooth scrolling: There are 2 ways to accomplish this.
 * 1. Old school method: Manually calculating the co-ordinates and page offset
 * values to scroll to a specific position.
 */
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  // get the co-ordinates of the element you want to scroll to.
  const s1coords = section1.getBoundingClientRect();
  /**
   * From this, we get a DOMRect object containing the x, y positions, width
   * and height of the element along with other properties.
   *
   * One more important thing to note here is that the getBoundingClientRect()
   * is relative to the visible view port.
   */
  console.log(s1coords);

  /**
   * The scroll position - the page X and page Y offsets provide us the data
   * as to how much pixels we have scrolled from the edge of the view port.
   */
  console.log(
    'Current scroll (X/Y) - ',
    window.pageXOffset,
    window.pageYOffset
  );

  /**
   * The Viewport height and width can be found as shown below.
   */
  console.log('Client Height - ', document.documentElement.clientHeight);
  console.log('Client Width - ', document.documentElement.clientWidth);

  // Scrolling to specific co-ordinates. scrollTo() is a global function
  // available on the window object which takes the left position and a
  // top position.
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  /**
   * To make the scroll smooth, we need to pass in an object to scrollTo
   * with a behavior property.
   */
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  /**
   * 2. Modern way to scroll: Simply take the section to scroll to and then
   * call the scrollToView by passing an object with a behavior property set
   * to smooth. Works only on modern browsers.
   */
  section1.scrollIntoView({ behavior: 'smooth' });
});

/**
 * Types of events and events handler:
 * An event is a signal that is generated by a certain DOM node. Then we can
 * listen for these events in our code using event listeners.
 *
 * 1. mouseenter - this is little bit like a hover event in CSS which fires
 * whenever a mouse enters a certain element.
 */
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', () =>
//   console.log('addEventListener: Great! You are hovering on the heading')
// );

/**
 * Another way of attaching an event listener to an element is by using the
 * on-event property on the element.
 * For each of the event there is an onevent property.
 * Ex:
 * mouseenter - onmouseeneter
 * click - onclick
 * mousedown - onmousedown
 */
// h1.onmouseenter = () =>
//   console.log(
//     'addEventListener: Great! You are hovering on the heading using event properties'
//   );

/**
 * we can also remove the function once we are done listening to it.
 */
const alertH1 = function (e) {
  console.log(
    'addEventListener: Great! You are hovering on the heading using event properties'
  );
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

/**
 * Finally, there is a third type of handling an event listener and that is by using
 * an HTML attribute. Here, we describe the action we want in the HTML element itself.
 */

/**
 * Event Propogation: Bubbling and Capturing
 * Assume the below DOM structure.
 *
 *  DOCUMENT
 *     |
 *    HTML
 *     |
 *    BODY
 *     |
 *   SECTION
 *     |
 *  PARAGRAPH
 *     |
 * ANCHOR LINK
 *
 * EVENT PHASES:
 * PHASE 1 - CAPTURING PHASE
 * PHASE 2 - TARGET PHASE
 * PHASE 3 - BUBBLING PHASE
 *
 * Let's now say, the click happens on the anchor link element and as we already know,
 * the DOM then generates a click event right away. However, this event is not generated
 * at the target element (anchor link). Instead, the event is actually generated at the
 * root of the document or at the very top of the DOM tree. From there, a so-called
 * CAPTURING PHASE happens where the event then travels all the way down from the document
 * root to the target element. As the event travels down the tree, it will pass through
 * every single parent element of the target element.
 *
 * As soon as the target reaches the target, the TARGET PHASE begins, where events can be
 * handled right at the target. As we already know, we do that with event listeners as
 * shown below.
 */
// document
//   .querySelector('a')
//   .addEventListener('click', () => alert('You clicked me🤴'));
/**
 * As soon as the event occurs, the target element runs the attached callback function.
 * Now, after reaching the target, the event then actually travels all the way up to the
 * document route again in the so-called BUBBLING PHASE. So we say, the events bubble up
 * from the target to the document root. Just like in the capturing phase, the event passes
 * through all its parent elements and not through any sibling elements.
 *
 * It is as if the event also happened in each of the parent element. If the event was also
 * attached to any one of the parent element then we would have also handled it in those
 * parent element before it can pass through the DOM tree.
 *
 * By default, we can handle events only in TARGET and BUBBLING PHASES. However, we can set
 * up event listeners in a way that they listen to events in the CAPTURING PHASE instead.
 */

/**
 * Event Propogation:
 * Just explained above, same thing happens. When we click on the nav__links then only its
 * background color changes, but the color on nav__link keeps unchanged because nav__links
 * is the parent element and from it, the event only bubbles up to its parent elements.
 *
 * If in case, you click on the nav__link, then the background color of both nav_links and nav
 * changes since nav__link is the child of both nav__links and nav.
 *
 * Event Target (e.target):
 * Target is essentially the place where the event originated or first occurred. So this is
 * where the event (click) happened and it is not the element on which the event handler is
 * attached.
 * The parameter `e` that each of the event handler function receives is exactly the same and
 * this due to event bubbling. The event originates when we click on the nav__link but then
 * it bubbles up to its parent element nav__links and from there to its parent which is nav
 * and so on it will travel further up in the DOM tree and then we can handle the event in
 * all of the parent elements as shown below.
 *
 * Besides the e.target there is also e.currentTarget and the currentTarget is indeed on
 * which the event handler is attached.
 * So, if we look closely then the currentTarget and the `this` keyword are one and the same
 * because the `this` keyword is also the one pointing to the element on which the event
 * handler is attached to.
 *
 * stopPropogation:
 * We can even stop the event propogation using stopPropogation() to stop the event bubbling
 * to parent elements.
 */
// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// const navLink = document.querySelector('.nav__link').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);

//     // stop propogation - not a good idea.
//     // e.stopPropagation();
//   },
//   true
// );

// const navLinks = document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);
//   },
//   true
// );

// const nav = document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);
//   },
//   true
// );

/**
 * CAPTURING PHASE: Events are captured when they come down from the document
 * root all the way to the target but our add event listeners are listening to
 * these events only during the bubbling phase but not during the capturing
 * phase which is the default behavior of the addEventListener() method that's
 * because the capturing phase is usually irrelevant for us. However, the
 * bubbling phase can be very useful for something called Event Delegation.
 *
 * If we want to catch events during the capturing phase, we can define a
 * third parameter called useCapture parameter in the addEventListener function
 * which is a boolean value. If set to true, the event handler will no longer
 * listen to bubbling events, but instead to capturing events. In case of
 * capturing events the direction of events will be - NAV -> CONTAINER -> LINK
 *
 * Event Delegation - We use event bubbling behavior to implement something known
 * as event delegation.
 */

/**
 * Page navigation without using event delegation to see the problem in the way we
 * have been using so far.
 */
// document.querySelectorAll('.nav__link').forEach(node =>
//   node.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // relative URL. Using instead of this.href
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );
/**
 * Here, as we click on the links, it will scroll to the specific section mentioned
 * in the anchor tag. We basically need to prevent this from happening using the
 * preventDefault() method. The href attribute can be used to, select the element on
 * the DOM that we want to scroll to based on this. If we think about this, it looks
 * pretty much similar to an ID.
 *
 * The above logic is inefficient because we are adding the same callback function
 * to each of the three elements which is unnecessary as the elements count increases.
 * The better solution is to use Event Delegation.
 *
 * In event delegation, we use the fact that the events bubble up and we do that by
 * putting the event listener on a common parent of all the elements we are interested
 * in. In our example, it is the container nav__links that is around the links.
 *
 * So once the event generates and bubbles up, we can catch that event in the common
 * parent and handle it there because we also know where the event actually originated
 * by looking at the event.target property.
 */
// It is a 2 step process
// 1. add event listener to a common parent.
// 2. Determine what element originated the event.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy to find the proper nav link. Instead of `this` we need to
  // use the e.target as it points to the place where the event originated.
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // relative URL. Using instead of this.href
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/**
 * NOTE: One important use case of event delegation is when we are working with elements
 * that are not yet on the page at runtime. Example, dynamically added buttons.
 */
/**
 * DOM traversal: This is basically walking through the DOM. Sometimes we need to select
 * an element relative to a certain other element.
 */
const h1el = document.querySelector('h1');

// 1. Going Downwards:
// To select only the children elements of h1 element.
console.log(h1el.querySelectorAll('.highlight'));

// To select only the direct children - gives us every single node of every single type
// there exists.
console.log(h1el.childNodes);

// Only h1 direct children
console.log(h1el.children);

// To get the first child element
console.log(h1el.firstElementChild);
h1el.firstElementChild.style.color = 'white';

// To get the last child element
h1el.lastElementChild.style.color = 'orangered';

// 2. Going Upwards
// To select the direct parents
console.log(h1el.parentNode);

// Another similar property to parentNode
console.log(h1el.parentElement);

// In case of multiple parent elements we can find the closest parent element
// think of closest() as the opposite of querySelector. Both receive a query
// string as an input but querySelector() finds children no matter how deep
// the element is in the DOM. While the closest() method finds the parent no
// matter how far up in the DOM.
h1el.closest('.header').style.background = 'var(--gradient-secondary)';

// 3. Going Sideways: For some reason, we can only access the direct siblings
// (previous and next) in JavaScript.
console.log(h1el.previousElementSibling);
console.log(h1el.nextElementSibling);

// Just like before we also have the same properties for nodes.
console.log(h1el.previousSibling);
console.log(h1el.nextSibling);

// To find all the children of a particular parent
console.log(h1el.parentElement.children);

/**
 * Lifecycle DOM Events
 * 1. DOMContentLoaded - Event that triggers as soon as only HTML and JavaScript
 * are loaded and no external resources and images are considered. Equivalent of
 * this event in jQuery is `onload`.
 *
 * 2. load event - Event that triggers on the window object as soon as not only the
 * HTML is parsed, but also all the images and external resources like CSS are also
 * loaded.
 *
 * 3. beforeunload event - This event is created immediately when a user is about to
 * leave a page.
 */

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log('Page fully unloaded', e);
//   // In order to display a leaving confirmation, we need to set the return value
//   // on the event to an empty string
//   e.returnValue = '';
// });
