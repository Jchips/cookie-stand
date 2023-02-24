'use strict';

window.addEventListener('load', init);

function init() {
  let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

  let locations = [];

  // location class
  function Location(name, minCustomers, maxCustomers, avgCookiesPerCustomer) {
    this.name = name;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookiesPerCustomer = avgCookiesPerCustomer;
    this.cookiesPerHour = [];
    this.randomCustomersArray = [];
    this.totalCookies = 0;

    locations.push(this);
  }

  // method to get an array of random customers per hour
  Location.prototype.getCustomersPerHour = function() {
    let randomCustomersArray = customersPerHour(hours, this.minCustomers, this.maxCustomers);
    this.randomCustomersArray = randomCustomersArray;
  };

  // method to calcuate how many cookies are sold each hour and total amount of cookies sold that day
  Location.prototype.calculateCookiesPerHour = function() {
    let array = calculateCookies(hours, this.randomCustomersArray, this.avgCookiesPerCustomer);
    this.cookiesPerHour = array[0];
    this.totalCookies = array[1];
  };

  // method to upload location row to the table
  Location.prototype.render = function() {
    let table = document.getElementById('table');
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    let row = document.createElement('tr');
    tbody.appendChild(row);
    let locationName = document.createElement('td');
    locationName.textContent = this.name;
    row.appendChild(locationName);
    this.calculateCookiesPerHour();
    let data = this.cookiesPerHour;
    for (let i = 0; i < data.length; i++) {
      let td = document.createElement('td');
      td.textContent = data[i];
      row.appendChild(td);
    }
    let total = document.createElement('td');
    let totalCookies = this.totalCookies;
    total.textContent = totalCookies;
    row.appendChild(total);
  };

  let seattle = new Location('seattle', 23, 65, 6.3);
  let tokyo = new Location('tokyo', 3, 24, 1.2);
  let dubai = new Location('dubai', 11, 38, 3.7);
  let paris = new Location('paris', 20, 38, 2.3);
  let lima = new Location('lima', 2, 16, 4.6);
  displayCookiesTable(hours, locations);
}

// displays the full cookie data table on the page
function displayCookiesTable(hours, locations) {
  tableHeader(hours);
  for(let i = 0; i < locations.length; i++) {
    locations[i].getCustomersPerHour();
    locations[i].render();
  }
  tableFooter(hours, locations);
}

// displays the hours at the top of the table
function tableHeader(hours) {
  let table = document.getElementById('table');
  let thead = document.createElement('thead');
  table.appendChild(thead);
  let headRow = document.createElement('tr');
  thead.appendChild(headRow);
  let blank = document.createElement('th');
  headRow.appendChild(blank);
  for (let i = 0; i < hours.length; i++) {
    let th = document.createElement('th');
    th.textContent = hours[i];
    headRow.appendChild(th);
  }
  let locationTotal = document.createElement('th');
  locationTotal.textContent = 'Location total';
  headRow.appendChild(locationTotal);
  table.appendChild(thead);
}

// displays the total amount of cookies sold each hour at all locations and the daily total of sold cookies
function tableFooter(hours, locations) {
  let table = document.getElementById('table');
  let thead = document.createElement('thead');
  table.appendChild(thead);
  let headRow = document.createElement('tr');
  thead.appendChild(headRow);
  let totals = document.createElement('th');
  totals.textContent = 'Totals';
  headRow.appendChild(totals);
  for (let i = 0; i < hours.length; i++) {
    let hoursTotal = 0;
    let dailytotal = document.createElement('th');
    for (let j = 0; j < locations.length; j++) {
      hoursTotal += locations[j].cookiesPerHour[i];
    }
    dailytotal.textContent = hoursTotal;
    headRow.appendChild(dailytotal);
  }
  let allLocationsTotal = document.createElement('th');
  let cookiesTotal = 0;
  for (let i = 0; i < locations.length; i++) {
    cookiesTotal += locations[i].totalCookies;
  }
  allLocationsTotal.textContent = cookiesTotal;
  headRow.appendChild(allLocationsTotal);
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
    cookiesSoldPerHour.push(cookiesEachHour);
  }
  return [cookiesSoldPerHour, totalCookies];
}
