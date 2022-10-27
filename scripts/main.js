function handleKeyNav() {
  // Disable default 'Enter' keydown firing to avoid conflicts
  document.onkeydown = (e) => {
    if (e.key === 'Enter' && e.target.localName !== 'body') {
      e.stopPropagation();
      e.preventDefault();
    }
  };
  
  // Enable custom 'Enter' keyup firing for a better accessibility experience
  document.onkeyup = (e) => {
    if (e.key === 'Enter' && e.target.localName !== 'body') {
      e.stopPropagation();
      e.preventDefault();

      document.activeElement.dispatchEvent(new Event('click'));
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  handleKeyNav();
}, false);