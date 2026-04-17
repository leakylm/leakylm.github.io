/* ─── Lightbox ──────────────────────────────────────────────── */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lightbox-img');
const lbCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('[data-lightbox]').forEach(wrap => {
  wrap.addEventListener('click', () => {
    lbImg.src = wrap.querySelector('img').src;
    lbImg.alt = wrap.querySelector('img').alt;
    lbCaption.innerHTML = wrap.dataset.caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ─── Nav Scrollspy ─────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── Animated Stat Counters ────────────────────────────────── */
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let current  = 0;
    const step   = Math.ceil(target / 30);
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 40);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

/* ─── DataTables ────────────────────────────────────────────── */
$(document).ready(function () {
  $('#matrix-table').DataTable({
    paging: false,
    searching: false,
    info: false,
    order: [],
    columnDefs: [{ orderable: false, targets: [3, 4, 5, 6, 7] }]
  });

  $('#conditions-table').DataTable({
    paging: false,
    searching: false,
    info: false,
    order: [],
    columnDefs: [{ orderable: false, targets: [1, 2, 3, 4] }]
  });
});
