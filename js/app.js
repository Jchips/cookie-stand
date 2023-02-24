'use strict';

window.addEventListener('load', init);

function init() {
  let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

  // seattle location
  let seattle = {
    location: 'seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerCustomer: 6.3,
    customersPerHour() {
      let randomCustomersArray = customersPerHour(hours, this.minCustomers, this.maxCustomers);
      return randomCustomersArray;
    },
    calculateCookies() {
      let array = calculateCookies(hours, this.customersPerHour(), this.avgCookiesPerCustomer);
      return array;
    },
  };

  // tokyo location
  let tokyo = {
    location: 'tokyo',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerCustomer: 1.2,
    customersPerHour() {
      let randomCustomersArray = customersPerHour(hours, this.minCustomers, this.maxCustomers);
      return randomCustomersArray;
    },
    calculateCookies() {
      let array = calculateCookies(hours, this.customersPerHour(), this.avgCookiesPerCustomer);
      return array;
    },
  };

  // Dubai location
  let dubai = {
    location: 'dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerCustomer: 3.7,
    customersPerHour() {
      let randomCustomersArray = customersPerHour(hours, this.minCustomers, this.maxCustomers);
      return randomCustomersArray;
    },
    calculateCookies() {
      let array = calculateCookies(hours, this.customersPerHour(), this.avgCookiesPerCustomer);
      return array;
    },
  };

  // Paris location
  let paris = {
    location: 'paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerCustomer: 2.3,
    customersPerHour() {
      let randomCustomersArray = customersPerHour(hours, this.minCustomers, this.maxCustomers);
      return randomCustomersArray;
    },
    calculateCookies() {
      let array = calculateCookies(hours, this.customersPerHour(), this.avgCookiesPerCustomer);
      return array;
    },
  };

  // Lima location
  let lima = {
    location: 'lima',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerCustomer: 4.6,
    customersPerHour() {
      let randomCustomersArray = customersPerHour(hours, this.minCustomers, this.maxCustomers);
      return randomCustomersArray;
    },
    calculateCookies() {
      let array = calculateCookies(hours, this.customersPerHour(), this.avgCookiesPerCustomer);
      return array;
    },
  };

  displayHours(seattle);
  displayHours(tokyo);
  displayHours(dubai);
  displayHours(paris);
  displayHours(lima);
}

// calculates random number of customers (in between the min and max)
// Got code from mdn web docs
function randomCustomerNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// multplies the (random) number of customers with the average # of customers per hour
function multiply(customerNum, avgCookiesPerCustomer) {
  let cookiesSold = customerNum * avgCookiesPerCustomer;
  return Math.ceil(cookiesSold);
}

/**
 * Calculates how many (random) customers there are per hour
 * @param {array} hours - all the hours throughout the cookie stand work day
 * @param {number} minCustomers - the min number of customers at location
 * @param {number} maxCustomers - the max number of customers at location
 * @returns {array} - returns array of random amount of customers per hour
 */
function customersPerHour(hours, minCustomers, maxCustomers) {
  let randomCustomersArray = [];
  let num;
  for (let i = 0; i < hours.length; i++) {
    num = randomCustomerNum(minCustomers, maxCustomers);
    randomCustomersArray.push(num);
  }
  return randomCustomersArray;
}

// displays cookies per hour list on the sales pages (DOM manipulation)
function displayHours(location) {
  let array = location.calculateCookies()[0];
  let section = document.getElementById(location.location);
  let h2 = document.createElement('h2');
  h2.textContent = location.location;
  h2.style.textTransform = 'capitalize';
  section.appendChild(h2);
  let ul = document.createElement('ul');
  for(let i = 0; i < array.length; i++) {
    let li = document.createElement('li');
    li.textContent = array[i];
    ul.appendChild(li);
  }
  let li = document.createElement('li');
  li.textContent = `total: ${location.calculateCookies()[1]} cookies`;
  ul.appendChild(li);
  section.appendChild(ul);
}

/**
 * Calculates how many cookies are sold per hour
 * @param {array} hours - array of all the hours throughout the cookie stand work day
 * @param {customersPerHour} array - The amount of customers each hour
 * @param {avgCookiesPerCustomer} number - the average cookies customers get per hour
 * @returns {array} - Returns the list of cookies sold per hour and the total amount of cookies sold that day
 */
function calculateCookies(hours, customersPerHour, avgCookiesPerCustomer) {
  let cookiesSoldPerHour = [];
  let totalCookies = 0;
  for (let i = 0; i < hours.length; i++) {
    let cookiesEachHour = multiply(customersPerHour[i], avgCookiesPerCustomer);
    totalCookies += cookiesEachHour; // calculates the total number of cookies sold each hr
    cookiesSoldPerHour.push(`${hours[i]}: ${cookiesEachHour} cookies`);
  }
  return [cookiesSoldPerHour, totalCookies];
}
