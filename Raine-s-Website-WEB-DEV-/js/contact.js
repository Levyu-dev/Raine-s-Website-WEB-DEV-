// 1. Find the form
const form = document.querySelector('.contact-form-card form');

// 2. Run this when the form is submitted
form.addEventListener('submit', function (event) {

  // 3. Stop the page from reloading
  event.preventDefault();

  // 4. Read what the user typed
  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('Age').value);
  const password = document.getElementById('password').value;

  // 5. Check the values
  if (name.length < 2) {
    alert('Please enter your full name.');
    return;
  }

  if (isNaN(age) || age < 1 || age > 120) {
    alert('Please enter a valid age (1-120).');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters.');
    return;
  }

  // 6. All good!
  alert('Thank you, ' + name + '! We received your message.');
  form.reset();
});