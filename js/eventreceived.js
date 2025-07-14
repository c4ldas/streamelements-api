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
