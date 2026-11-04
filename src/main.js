document.documentElement.classList.add('js');

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  const label = button.querySelector('.copy-label');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.code);
      label.textContent = 'Copied';
      button.classList.add('is-copied');
    } catch {
      label.textContent = 'Press Ctrl+C';
    }
    setTimeout(() => {
      label.textContent = 'Copy';
      button.classList.remove('is-copied');
    }, 2000);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
