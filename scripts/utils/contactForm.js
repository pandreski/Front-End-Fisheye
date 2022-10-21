// DOM Elements
const modalForm = document.querySelector('.modal form');
const modalSuccessMessage = document.querySelector('.modal .confirmation');

function displayModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
  document.body.setAttribute('aria-hidden', 'true');
  document.body.setAttribute('data-modal-open', 'true');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('form input').focus();

  modal.addEventListener('keyup', handleKeyNavModal);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  document.body.setAttribute('aria-hidden', 'false');
  document.body.setAttribute('data-modal-open', 'false');
  modal.setAttribute('aria-hidden', 'true');
  modalForm.style.display = 'block';
  modalSuccessMessage.style.display = 'none';
  modal.removeEventListener('keyup', handleKeyNavModal);

  // Set a timeout to avoid global keyup listener to be fired twice.
  setTimeout(() => {
    document.querySelector('.contact_button').focus();
  }, 250);
}

function handleKeyNavModal(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
  }
}

/**
 * Set given error (message) to a node element (elem)
 * 
 * @param {Node} elem 
 * @param {String} message 
 */
function setErrorMessage(elem, message) {
  const errorMessageNode = `<span id="${elem.id}_err" class="error-message">${message}</span>`;
  elem.parentNode.insertAdjacentHTML('beforeend', errorMessageNode);
}

/**
 * Reset all error messages from previous submissions
 */
function resetErrorMessages() {
  const inputErrors = document.querySelectorAll('form .form-error');
  const errorMessageNodes = document.querySelectorAll('form .error-message');
  inputErrors.forEach((input) => {
    input.classList.remove('form-error');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedBy');
  });
  errorMessageNodes.forEach((node) => node.parentNode.removeChild(node));
}

/**
 * Validate form data on submit
 */
function validate() {
  let state = true;
  const regex_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const firstname = document.forms['contact-form']['firstname'];
  const lastname = document.forms['contact-form']['lastname'];
  const email = document.forms['contact-form']['email'];
  const message = document.forms['contact-form']['message'];

  resetErrorMessages();

  // check firstname field
  if (firstname.value.length < 2) {
    firstname.classList.add('form-error');
    firstname.setAttribute('aria-invalid', 'true');
    firstname.setAttribute('aria-describedBy', firstname.id + '_err');
    firstname.value.length === 0
      ? setErrorMessage(firstname, 'Veuillez renseigner votre prénom.')
      : setErrorMessage(firstname, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    state = false;
  }

  // check lastname field
  if (lastname.value.length < 2) {
    lastname.classList.add('form-error');
    lastname.setAttribute('aria-invalid', 'true');
    lastname.setAttribute('aria-describedBy', lastname.id + '_err');
    lastname.value.length === 0
      ? setErrorMessage(lastname, 'Veuillez renseigner votre nom.')
      : setErrorMessage(lastname, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    state = false;
  }

  // check email field
  if (email.value.length > 0) {
    if (!(email.value.match(regex_email))) {
      email.classList.add('form-error');
      email.setAttribute('aria-invalid', 'true');
      email.setAttribute('aria-describedBy', email.id + '_err');
      setErrorMessage(email, 'L\'adresse e-mail n\'est pas valide.');
      state = false;
    }
  } else {
    email.classList.add('form-error');
    email.setAttribute('aria-invalid', 'true');
    email.setAttribute('aria-describedBy', email.id + '_err');
    setErrorMessage(email, 'Votre adresse email est requise.');
    state = false;
  }

  // check message field
  if (message.value.length === 0) {
    message.classList.add('form-error');
    message.setAttribute('aria-invalid', 'true');
    message.setAttribute('aria-describedBy', message.id + '_err');
    setErrorMessage(message, 'Veuillez ajouter un message.')
    state = false;
  }

  // In case of success, hide form, display success message and reset all fields to get ready for a new submission.
  if (state) {
    modalForm.style.display = 'none';
    modalSuccessMessage.style.display = 'block';
    modalForm.reset();
  }

  return state;
}

modalForm.querySelector('button[type="submit"]').addEventListener('click', validate);
