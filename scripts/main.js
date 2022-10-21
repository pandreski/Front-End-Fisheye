function handleKeyNav() {
  document.onkeyup = (e) => {
    if (e.key === 'Enter' && e.target.localName !== 'body') {
      e.preventDefault();
      document.activeElement.dispatchEvent(new Event('click'));
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  handleKeyNav();
}, false);