function displayModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
  document.body.setAttribute('aria-hidden', 'true');
  document.body.setAttribute('data-modal-open', 'true');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('form input').focus();
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  document.body.setAttribute('aria-hidden', 'false');
  document.body.setAttribute('data-modal-open', 'false');
  modal.setAttribute('aria-hidden', 'true');
  document.querySelector('.contact_button').focus();
}
