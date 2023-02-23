'use strict';

window.addEventListener('load', init);
function init() {
  let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

  let seattle = {
    location: 'seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerCustomer: 6.3,
    customersPerHour() {
      let num = randomCustomerNum(this.minCustomers, this.maxCustomers);
      return num;
    },
    calculateCookies() {
      let cookiesSoldPerHour = [];
      let totalCookies = 0;
      for (let i = 0; i < hours.length; i++) {
        let cookiesEachHour = multiply(this.customersPerHour(), this.avgCookiesPerCustomer);
        totalCookies += cookiesEachHour;
        cookiesSoldPerHour.push(`${hours[i]}: ${cookiesEachHour} cookies`);
      }
      return [cookiesSoldPerHour, totalCookies];
    },
  };

  displayHours(seattle);

  let tokyo = {
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerCustomer: 1.2
  };

  let dubai = {
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerCustomer: 3.7
  };

  let paris = {
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerCustomer: 2.3
  };

  let lima = {
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerCustomer: 4.6
  };
}

// Got code from mdn web docs
function randomCustomerNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function multiply(customerNum, avgCookiesPerCustomer) {
  console.log(customerNum, avgCookiesPerCustomer);
  let cookiesSold = parseInt(customerNum) * parseFloat(avgCookiesPerCustomer);
  console.log('Cookies sold: ' + cookiesSold); // delete later
  return Math.ceil(cookiesSold);
}

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

// function calculateCookies(hours, customersPerHour, avgCookiesPerCustomer) {
//   let cookiesSoldPerHour = [];
//   let totalCookies = 0;
//   for (let i = 0; i < hours.length; i++) {
//     let cookiesEachHour = multiply(customersPerHour, avgCookiesPerCustomer);
//     totalCookies += cookiesEachHour;
//     cookiesSoldPerHour.push(`${hours[i]}: ${cookiesEachHour} cookies`);
//   }
//   console.log('cookies sold per hour: ' + cookiesSoldPerHour); // delete later
//   console.log('total: ' + totalCookies + ' cookies'); //delete later
//   return cookiesSoldPerHour;
// }
