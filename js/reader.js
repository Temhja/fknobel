/* ============================================
   FK NOBEL — Catalog Reader
   ============================================ */

(function () {
  'use strict';

  const stage = document.querySelector('.pages-stack');
  if (!stage) return;

  const pages = Array.from(stage.querySelectorAll('.page'));
  const total = pages.length;

  const counterCurrent = document.querySelector('[data-page-current]');
  const counterTotal = document.querySelector('[data-page-total]');
  const upBtns = document.querySelectorAll('[data-page-prev]');
  const downBtns = document.querySelectorAll('[data-page-next]');

  let currentIdx = 0;

  if (counterTotal) counterTotal.textContent = String(total).padStart(2, '0');

  /* Track visible page */
  if ('IntersectionObserver' in window) {
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target, entry.intersectionRatio);
          else visible.delete(entry.target);
        });
        let best = null, bestRatio = 0;
        visible.forEach((ratio, el) => {
          if (ratio > bestRatio) { bestRatio = ratio; best = el; }
        });
        if (best) {
          const idx = pages.indexOf(best);
          if (idx !== -1 && idx !== currentIdx) {
            currentIdx = idx;
            updateUI();
          }
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    pages.forEach((p) => io.observe(p));
  }

  function updateUI() {
    if (counterCurrent) counterCurrent.textContent = String(currentIdx + 1).padStart(2, '0');
    upBtns.forEach((b) => { b.disabled = currentIdx === 0; });
    downBtns.forEach((b) => { b.disabled = currentIdx === total - 1; });
  }

  function jumpTo(idx) {
    if (idx < 0 || idx >= total) return;
    pages[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  upBtns.forEach((b) => b.addEventListener('click', () => jumpTo(currentIdx - 1)));
  downBtns.forEach((b) => b.addEventListener('click', () => jumpTo(currentIdx + 1)));

  /* Keyboard navigation */
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, button, a')) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      jumpTo(currentIdx + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      jumpTo(currentIdx - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      jumpTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      jumpTo(total - 1);
    }
  });

  /* Image error fallback — show placeholder if JPG missing */
  pages.forEach((page, i) => {
    const img = page.querySelector('img');
    if (!img) return;
    img.addEventListener('error', () => {
      const num = String(i + 1).padStart(2, '0');
      img.outerHTML = `
        <div class="page-placeholder">
          <div class="ph-num">${num}</div>
          <div class="ph-label">صفحة ${num}</div>
          <div class="ph-hint">${img.getAttribute('src')}</div>
        </div>
      `;
    });
  });

  updateUI();
})();
