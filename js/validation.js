// Contact form validation with JavaScript user feedback.

const contactForm = document.getElementById('contact-form');

function showError(input, message) {
  const errorField = input.parentElement.querySelector('.error-message');
  errorField.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const errorField = input.parentElement.querySelector('.error-message');
  errorField.textContent = '';
  input.setAttribute('aria-invalid', 'false');
}

function validateField(input, rules) {
  const value = input.value.trim();

  if (rules.required && !value) {
    showError(input, 'This field is required.');
    return false;
  }

  if (rules.email && !/^\S+@\S+\.\S+$/.test(value)) {
    showError(input, 'Enter a valid email address.');
    return false;
  }

  if (rules.minLength && value.length < rules.minLength) {
    showError(input, 'Please enter at least 5 characters.');
    return false;
  }

  clearError(input);
  return true;
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const successText = document.getElementById('form-success');

    const isNameValid = validateField(name, { required: true, minLength: 2 });
    const isEmailValid = validateField(email, { required: true, email: true });
    const isSubjectValid = validateField(subject, { required: true, minLength: 5 });
    const isMessageValid = validateField(message, { required: true, minLength: 10 });

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      successText.textContent = 'Thank you! Your message has been submitted successfully.';
      contactForm.reset();
    }
  });
}
