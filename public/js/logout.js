const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired'); // Debugging

  const logoutButton = document.querySelector('#logout-nav');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  } else {
    console.error('logout form element not found');
  }
});
