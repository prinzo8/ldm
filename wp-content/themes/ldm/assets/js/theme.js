(() => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<span></span>';
  document.body.appendChild(cursor);
  window.addEventListener('pointermove', (event) => { cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; }, { passive: true });
  window.addEventListener('pointerover', (event) => { cursor.classList.toggle('custom-cursor--hover', Boolean(event.target.closest('a, button'))); }, { passive: true });

  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('site-header--scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.product-card__image').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const image = trigger.querySelector('img');
      if (!image) return;
      event.preventDefault();
      const overlay = document.createElement('div');
      overlay.className = 'lightbox';
      overlay.innerHTML = `<button class="lightbox__close" aria-label="Fermer">×</button><figure class="lightbox__figure"><img src="${image.currentSrc || image.src}" alt="${image.alt}"><figcaption>${trigger.closest('.product-card').querySelector('h3')?.textContent || ''}</figcaption></figure>`;
      document.body.appendChild(overlay);
      const close = () => overlay.remove();
      overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target.closest('.lightbox__close')) close(); });
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
    });
  });
})();
