import 'regenerator-runtime/runtime';
import { displayMap } from './mapbox.js';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

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
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  updateSettings({ name, email }, 'data');
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
