const loginForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const signupForm = async (event) => {
  try {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log('Submitting signup form with data:', {
      name,
      username,
      password,
    });

    if (name && username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
        console.log('this didnt work');
      }
    }
  } catch (err) {
    console.err('error in signupForm: ', err);
  }
};

// document.querySelector('.login-form').addEventListener('submit', loginForm);

// document.querySelector('.signup-form').addEventListener('submit', signupForm);

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired'); // Debugging

  const signupFormElement = document.querySelector('.signup-form');
  if (signupFormElement) {
    signupFormElement.addEventListener('submit', signupForm);
  } else {
    console.error('Signup form element not found');
  }
});

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelector('.login-form').addEventListener('submit', loginForm);
//   document.querySelector('.signup-form').addEventListener('submit', signupForm);
// });
