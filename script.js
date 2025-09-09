// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('show');
  });
}

// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      links && links.classList.remove('show');
    }
  });
});

// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// CTA click tracking (console-based for static site)
document.querySelectorAll('.btn, .link').forEach(el => {
  el.addEventListener('click', () => {
    if (window && window.console) {
      console.log('CTA clicked:', el.textContent.trim());
    }
  });
});

// Proof of Work lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(src, alt, caption) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  if (lightboxCaption) lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.proof-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const href = item.getAttribute('href');
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption');
    if (href && img) openLightbox(href, img.alt, caption);
  });
});

lightbox && lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Netlify form submission: submit via fetch then redirect to thank-you
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formAction = contactForm.getAttribute('action') || '/thank-you.html';
    const formData = new FormData(contactForm);
    // Ensure form-name is included for Netlify
    if (!formData.get('form-name')) {
      const nameInput = contactForm.querySelector('input[name="form-name"]');
      if (nameInput && nameInput.value) {
        formData.append('form-name', nameInput.value);
      } else {
        formData.append('form-name', 'contact');
      }
    }
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => { window.location.assign(formAction); })
      .catch(err => {
        console.error('Form submit failed', err);
        alert('There was a problem sending your message. Please email me at tahir.adeleye@gmail.com.');
      });
  });
}


