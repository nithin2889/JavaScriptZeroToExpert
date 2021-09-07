'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/**
 * Asynchronous JavaScript, AJAX and APIs:
 * Synchronous code is the code that gets executed line by line.
 * Thread of execution is part of execution context which does actually execute the code
 * in the computer's processor. Each line waits for previous line to finish. This can create
 * problems when one line of code takes a long time to run. Ex: alert() - blocks the code
 * execution until we click the OK button.
 *
 * Asynchronous code is executed after a task that runs in the "background" finishes. Ex,
 * setTimeout() function. Here, the main code is not blocked and execution does not wait
 * for the asynchronous timer to finish its work. This is the main difference between a
 * synchronous and asynchronous code.
 *
 * Another example would be setting the `src` attribute of the image and this is essentially
 * loading an image in the background while the rest of the code can keep running. This makes
 * sense if we image there is a huge image, we wouldn't want our entire code to wait for the
 * image to load. Once the image has finished loading, a load event would automatically be
 * emitted by JavaScript which we can listen to in order to act on it.
 *
 * Asynchronours behavior of a task like loading of an image or running a timer is what decides
 * the asynchronous state.
 */
// Example:
// const img = document.querySelector('.dog');
// img.src = 'dog.jpg';
// img.addEventListener('load', function () {
//   img.classList.add('fadeIn');
// });
// p.style.width = '300px';
/////////////////////////////////////////////
/**
 * AJAX: AJAX stands for Asynchronous JavaScript And XML, and allows us to communicate with the
 * remote web servers asynchronously.
 *
 * API: API stand for Application Programming Interface. Now, API is basically a piece of software
 * that can be used by another piece of software in order to basically allow applications to talk
 * to each other and exchange information.
 *
 * In web development, there are countless number of APIs like DOM API, Geolocation API, and also
 * Own class API where we make some methods available as a public interface. So these can be viewed
 * as a self-contained encapsulated pieces of software that other pieces of software interact with.
 *
 * The API that when we use AJAX can be called as "Online" APIs. An Online API is essentially an
 * application running on web server that retrieves the data from some database and then sends it
 * back to the client. When building applications in practice we call these online APIs, APIs.
 *
 * We can build our own web APIs but that requires back-end development. E.g: NodeJS or use third-party
 * APIs.
 *
 * API data format: XML is a data format which was used extensively previously. However, these days
 * basically no APIs uses XML data anymore. Most APIs these days use the JSON data format today because
 * it is basically just a JavaScript object but converted to a string.
 *
 * Our very first AJAX call using XMLHttpRequest:
 */
// Old school way of doing AJAX calls. We will get to know how AJAX calls used to be handled with events and callback functions.
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // We cannot just get the response stored into a variable from ajax.send() just yet since the response is not there yet. This is being done asynchronously in the background while the rest of the code keeps running.
  request.send();
  // We need to register a callback on the request object for the load event.

  request.addEventListener('load', function () {
    // `this` keyword here is the `request` object
    const [data] = JSON.parse(this.responseText);

    const html = `<article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000000
        ).toFixed(1)} billion people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
// getCountry('pakistan');
// getCountry('germany');
// getCountry('usa');

/**
 * Now, if we wanted these requests to be made in a specific pre-defined order, then we would
 * actually chain the requests which means to make the second request only after the first
 * request has finished. This leads us to callback hell.
 *
 * Callback Hell: One callback function inside another is nothing but callback hell.
 * This happens for all asynchronous tasks which are handled by callbacks and not just AJAX calls.
 * Ex: setTimeout() function.
 * This makes our code hard to understand and difficult to reason about and will have more bugs
 * to deal with.
 */

const renderCountry = function (data, neighbour = '') {
  const html = `<article class="country ${neighbour}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // We cannot just get the response stored into a variable from ajax.send() just yet since the response is not there yet. This is being done asynchronously in the background while the rest of the code keeps running.
  request.send();
  // We need to register a callback on the request object for the load event.

  request.addEventListener('load', function () {
    // `this` keyword here is the `request` object
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const [neighbour] = data.borders;
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};
// getCountryAndNeighbour('iceland');

/**
 * Promises and the Fetch API:
 * A promise is that is an object that is used basically as a placeholder for the
 * future result of an asynchronous operation.
 * OR
 * A promise is a container for an asynchronously delivered value.
 * OR
 * A promise is a container for a future value.
 *
 * Analogy: A promise is just like a lottery ticket. When we buy a lottery ticket
 * then essentially we buy some amount of money in the future if I guess the
 * correct outcome. The lottery draw will determine whether I will get the money or
 * not happens asynchronously. In case, I did get the correct outcome, then I will
 * receive my money because I have my lottery ticket which is the promise that I
 * bought.
 *
 * Advantage of using a promise:
 * 1. We no longer need to rely on events and callbacks passed into asynchronous
 * functions to handle asynchronous results. Events and callbacks can sometimes cause
 * unpredictable results which is a big win using promises already.
 * 2. Even better, we can chain promises for a sequence of asynchronous operations
 * instead of nesting which allows us to escape the callback hell.
 *
 * Since promises work with asynchronous operations, they are time sensitive. They
 * change over time and so promises can be in different states. This is what we call
 * the lifecycle of a promise.
 *
 * Lifecycle of a promise:
 * 1. Pending: In the very beginning, we say that the promise is pending before any value resulting
 * from the asynchronous task is available. During this time, the asynchronous task is still
 * doing its work in the background.
 *
 * 2. Settled: When the task finally finishes, we say the promise is settled and there are two
 * different types of settled promises.
 * a. Fulfilled - A promise that is successfully resulted in a value just as we expect it.
 * b. Rejected - A promise that has some error during the asynchronous task.
 *
 * A promise is only settled once and so from there the state would remain unchanged forever.
 *
 * The fetch() function builds the promise and returns it for us to be consumed
 */
const fetchRequest = fetch('https://restcountries.eu/rest/v2/name/usa');
console.log(fetchRequest);
/**
 * Consuming Promises returned by the fetch function:
 * The fetch function returns a promise which should be handled as part of the then() method.
 * To handle the fulfilled state of the promise we use the then() method that is available
 * on all promises. We pass a callback function into the then() method will be called as soon
 * as the result is available.
 *
 * From the response, we need the body attribute of the response which is basically a ReadableStream
 * which doesn't display any data. In order to read any data from the body, we need to call the
 * json() method on the response. The json() method is available on all the response objects
 * that is coming from the fetch() function.
 *
 * The json() function is also an asynchronous function that returns a promise itself. So what we
 * do is to return the response and handle it as part of another then() method.
 *
 * There is also finally() method and the callback that we pass in here will always be called
 * whatever happens (rejected or fulfilled) with the promise. We can use finally to start the
 * spinner when an asynchronous operation starts and stop it once the operation completes.
 *
 * The .finally() only works because the .catch() method also returns a promise.
 */

// const getCountryPromise = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`${response.status}: Country ${country}, not found!`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`${response.status}: Country ${country}, not found!`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(error => {
//       console.error(`Error: ${error}💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// getCountryPromise('india');

/**
 * Handle rejected promises:
 * The only way in which the fetch promise rejects is when the user loses his internet
 * connection.
 *
 * There are 2 ways to handle the rejection
 * 1. To pass a second callback function into the then method.
 * 2. By adding a catch method globally. This will handle all the errors no matter where
 * they appear in the chain.
 */
// btn.addEventListener('click', function () {
//   getCountryPromise('australia');
// });
/**
 * Throwing errors manually:
 * The .fetch() promise only rejects when there is no internet connection, but with errors like
 * 404, 500 which are not real error, the fetch() promise will still get fulfilled. So there is no
 * rejection and our catch() handler cannot pick the error.
 *
 * Ex: If the country we pass to the fetch() promise doesn't exist in such a case the promise will
 * not reject and needs to be rejected manually.
 *
 * We create new error by using again, this constructor function, basically, passing in a message,
 * which is going to be the error message, then we use the throw keyword which will immediately
 * terminate the current function. By doing this in any .then() method the promise will immediately
 * reject which will then propogate to the .catch() handler.
 */
// refactored code
const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${response.status}: ${errorMsg}`);
    return response.json();
  });
};

const getCountryPromise = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbouring country found!');

      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.error(`Error: ${error}💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryPromise('australia');
});
/**
 * Asynchronous code behind the scenes: The Event Loop
 * JavaScript runtime is basically a container which includes all the different pieces
 * that are necessary to execute JavaScript code.
 *
 * The heart of every JavaScript runtime is the engine which is were our code is executed
 * and objects are stored in memory. JavaScript has only one thread of execution which can
 * do only one thing at a time. There is absolutely no multi-tasking happening.
 *
 * Next, we have Web API environment. These are the APIs provided to the engine, but are
 * not part of the JavaScript language itself. Things like DOM, timers, the fetch API,
 * geolocation API, so on and so forth.
 *
 * Next, there is a Callback Queue which is a data structure that holds all the ready to
 * be executed callback functions that are attached to some events that has occurred. Whenever
 * the callstack is empty, the event loop takes the callbacks from the callback queue and
 * puts them in the callstack so that they can be executed.
 *
 * The event loop is the essential piece which makes the asynchronous behavior possible in
 * JavaScript. Event Loop is the reason why we can have a non-blocking concurrency model in
 * JavaScript.
 *
 * A concurrency model is simply how a language handles multiple things happening at the same
 * time.
 *
 * How does event loop work?
 * It is in the Web APIs environment where the asynchronous tasks related to the DOM will run.
 * The same is true for timers, AJAX calls and really all other asynchronous tasks. If an image
 * was loading synchronously it will be loading in the execution context there by blocking the
 * execution of the rest of the code.
 *
 * When we are loading an image, JavaScript will emit load event which will be registered in
 * the Web API environment. Same is true with the fetch API. Finally, when we use the .then()
 * method on the promise returned by the fetch function, this also registers a callback in the
 * web API environment so that we can react to the future resolved value of the promise.
 *
 * Basically, we are assuming that an image is loading and data is being fetched asynchronously
 * behind the scenes. Now, let's say the image has finished loading and the load event is emitted
 * on that image. What happens next, is that the callback for this event is put into callback
 * queue. Callback queue is an ordered list of all the callback functions that are in line
 * to be executed. Just like a todo list.
 *
 * Now, the event loop looks into the call stack and determines whether it is empty or not except
 * off course for the global context. If the call stack is indeed empty, then it will take the
 * first callback from the callback queue and put it on the callstack to be executed. This is
 * called an event loop tick. We say there was an event loop tick each time the event loop takes
 * a callback from the callback queue. So we can say that the event loop does the orchestration
 * of this entire JavaScript runtime.
 *
 * Now, we still have the fetch() function getting data from the AJAX call in the background. With
 * promises, things work in a slightly different way. Now, assume the data has finally arrived and
 * the fetch is done. The promises method like then() registered in the Web API environment will
 * not go into the callback queue. They have a special queue for themselves which is the so called
 * microtasks queue. What special is they have priority over the callback queue. At the end of an
 * event loop tick, the event loop will check if there are any callbacks in the microtasks queue.
 * If there are any callbacks, then it will run all of them before it will run any more callbacks
 * from the callback queue. By the way, we call these callbacks from promises, microtasks and hence
 * the name microtasks queue.
 */
// Example code:
console.log('Test Start');
setTimeout(() => console.log('0 second timer'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));
Promise.resolve('Resolved Promise 2').then(res => {
  // for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});
console.log('Test End');
/**
 * output:
 * Test Start
 * Test End
 * Resolved Promise 1
 * Resolved Promise 2 // takes some time to complete since it is on microtasks queue.
 * 0 second timer // won't execute until the microtasks queue callbacks complete their execution.
 *
 * This is because, all top level code executes first and then event loop checks the microtasks
 * queue for any promise related callbacks, giving it a priority over the regular callback queue.
 */
/**
 * Building a simple promise:
 * We can create a promise using the promise constructor which usually takes an executor function
 * with two parameters - resolve and reject functions.
 *
 * In order to resolve a promise, we use the resolve() function which will fulfill the promise.
 */
const lotteryEx = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve('You won the lottery! Congratulations!');
  } else {
    reject('You lost your money! Sorry!');
  }
});
lotteryEx.then(res => console.log(res)).catch(err => console.error(err));

/**
 * Consuming promises with Async/Await:
 * Start by creating an async function using the keyword `async` right in front of the function.
 * This function will then keep running in the background while performing the code that is inside
 * of it. When this function is done, it automatically returns a promise.
 *
 * What is important to note here is that inside of this async function, we can have one or more
 * await statements. Await essentially stops the execution of the code until the promise is
 * fulfilled.
 *
 * Isn't stopping the code, blocking the exectuion?
 * No, in this case. Because stopping execution in an async function is not a problem because this
 * function is running in the background. Therefore it is not blocking the main thread of execution.
 *
 * Async/Await is simply the syntactic sugar over the .then() method in Promises.
 */
// const whereAmI = async function (country) {
//   // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res));
//   // EQUIVALENT TO
//   const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };
// whereAmI('switzerland');
// console.log('FIRST');

/**
 * Error handling with Async/Await:
 * With Async/Await, we cannot use the .catch() method that we used before because
 * we cannot really attach it anywhere. Instead we use the try-catch statement.
 *
 *
 */
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
    // Reject promise returned from Async function
    // throw err;
  }
};
// btn.addEventListener('click', whereAmI);
/**
 * Returning values from async functions:
 * Whenever we return something from a async/await function, we are returned with
 * a promise since async function always returns a promise. JavaScript has simply
 * no way of knowing yet there is a string here that we want since the function is
 * still running behind the scene without blocking the main thread of execution.
 *
 * Now, the value that we return from an async function, the string, will become
 * the fulfilled value of the promise that is returned by the function.
 *
 * In order to access the returned promise, as before we use the .then() method to
 * get the fulfilled value of the promise.
 */
console.log('1: Will get location');
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: finished getting the location'));
// to write the above function using only async/await we can use IIFE.
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (error) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: finished getting the location');
})();
/**
 * Running promises in parallel:
 * The three network calls need not wait for the others complete. We need to run
 * all the three network in parallel in turn saving loading time. We can achieve
 * this using the Promise.all() combinator function. It is called a combinator
 * function because it allows us to combine multiple promises.
 *
 * This will take an array of promises and returns a new promise which will then
 * run all the promises in the array at the same time.
 *
 * One thing to note here is that if one of the promises rejects, the whole
 * Promise.all() rejects as well. So we can say, Promise.all short-circuits when
 * one promise rejects.
 */
const getThreeCountries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};
getThreeCountries('portugal', 'canada', 'tanzania');

/**
 * Other promise combinators: race, allSettled and any
 * 1. Promise.race() - just like other combinators, receives an array of
 * promises and it also returns a promise. This Promise.race() is settled as
 * soon as one of the input promises settles. Settled simply means a value
 * is available but it doesn't matter if the promise got rejected or fulfilled.
 * Basically, the first settled promise wins the race.
 *
 * All the promises inside the array race against each other like in a real
 * race. Now, if the winning promise is then a fulfilled promise, then the
 * fulfillment value of this whole race promise is going to be the fulfillment
 * value of the winning promise.
 *
 * Simply put the promise fulfillment value will be the fastest of the promises
 * passed in the array. Here, we get only one result and not an array of results
 * of all the promises.
 *
 * Now, a promise that gets rejected can actually also win the race. So, we can
 * say that Promise.race() short circuits whenever one of the promises gets settled.
 */
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();
/**
 * 2. Promise.allSettled() - This takes in an array of promises again, and it will
 * simply return an array of all the settled promises no matter if the promises
 * got rejected or not. So, it is similar to Promise.all in regard that it also
 * returns an array of all the results, however, the difference is that the Promise
 * .all() short circuits as soon as one of the promise rejects, but Promise.allSettled()
 * simply never short circuits. It returns all the results of all the promises.
 */
Promise.allSettled([
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 3'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
/**
 * OUTPUT:
 */
//  0:
//  status: "fulfilled"
//  value: "Success 1"
//  __proto__: Object
//  1:
//  reason: "Error 1"
//  status: "rejected"
//  __proto__: Object
//  2:
//  status: "fulfilled"
//  value: "Success 3"

/**
 * 3. Promise.any() - This is even more modern. It is ES2021. This again takes in
 * an array of multiple promises and this one will then return the first fulfilled
 * promise and it will simply ignore the rejected promises.
 * This is very similar to Promise.race() with a difference that rejected promises
 * are ignored.
 */
Promise.any([
  Promise.resolve('Promise.any Success 1'),
  Promise.reject('Promise.any Error 1'),
  Promise.resolve('Promise.any Success 3'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
