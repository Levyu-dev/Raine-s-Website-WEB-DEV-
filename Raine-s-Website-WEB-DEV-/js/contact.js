(function () {

  const form = document.querySelector('.contact-form-card form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showStatus(message, isError, field) {
    status.textContent = message;
    status.className = 'form-status ' + (isError ? 'error' : 'success');
    if (field) {
      field.focus();
    }
  }

  function todayString() {
    const now = new Date();
    return now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameField = document.getElementById('name');
    const ageField = document.getElementById('Age');
    const emailField = document.getElementById('email');
    const dateField = document.getElementById('date-time');
    const timeField = document.getElementById('time');
    const messageField = document.getElementById('message');

    const name = nameField.value.trim();
    const age = parseInt(ageField.value, 10);
    const rating = form.querySelector('input[name="rating"]:checked');

    if (name.length < 2) {
      showStatus('Please enter your full name.', true, nameField);
      return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
      showStatus('Please enter a valid age (1-120).', true, ageField);
      return;
    }
    if (!emailPattern.test(emailField.value.trim())) {
      showStatus('Please enter a valid email address.', true, emailField);
      return;
    }
    if (!rating) {
      showStatus('Please rate your experience.', true);
      return;
    }
    if (!dateField.value || !timeField.value) {
      showStatus('Please choose the date and time of your visit.', true, dateField);
      return;
    }
    if (dateField.value > todayString()) {
      showStatus('The date of service cannot be in the future.', true, dateField);
      return;
    }
    if (messageField.value.trim().length < 10) {
      showStatus('Please write at least 10 characters in Suggestions.', true, messageField);
      return;
    }

    showStatus('Thank you, ' + name + '! This is a demo form, so your message was NOT actually sent. To reach us, call +63 960 863 6821 or message us on Facebook.', false);
    form.reset();
  });

})();