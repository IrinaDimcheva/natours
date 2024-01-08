import 'regenerator-runtime/runtime';
import { displayMap } from './mapbox.js';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe.js';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

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

userDataForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);
  // console.log(form);

  updateSettings(form, 'data');
});

userPasswordForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'Updating...';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  await updateSettings(
    { passwordCurrent, password, passwordConfirm },
    'password',
  );

  document.querySelector('.btn--save-password').textContent = 'Save password';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
});

bookBtn?.addEventListener('click', (e) => {
  e.target.textContent = 'Processing...';
  const { tourId } = e.target.dataset;
  bookTour(tourId);
});
