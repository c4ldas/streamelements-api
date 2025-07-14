
// Copy button
document.querySelectorAll('.code-header button').forEach(button => {
  button.addEventListener('click', () => {
    const codeContainer = button.closest('.code-container');
    const codeElement = codeContainer.querySelector('code');
    const textToCopy = codeElement.textContent.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  });
});


// Expandable blocks
document.querySelectorAll('.expandable').forEach(section => {
  const toggle = section.querySelector('.expand-toggle');
  const content = section.querySelector('.expand-content');
  const icon = toggle.querySelector('.icon');
  const text = toggle.querySelector('.label');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    if (!isOpen) {
      toggle.setAttribute('aria-expanded', 'true');
      content.hidden = false;
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
      //icon.textContent = '🔽';
      text.textContent = 'Click to collapse';
    } else {
      toggle.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = content.scrollHeight + 'px'; // set current height
      content.offsetHeight; // force reflow
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
      icon.textContent = '▶️';
      text.textContent = 'Click to expand';
      setTimeout(() => {
        content.hidden = true;
      }, 500);
    }
  });
});
