import 'regenerator-runtime/runtime';
import { displayMap } from './mapbox.js';
import { login, logout } from './login';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  // console.log(locations);
  displayMap(locations);
}

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

logoutBtn?.addEventListener('click', logout);
