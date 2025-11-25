const scrollButtons = document.querySelectorAll('[data-target]');
const backToTopButton = document.getElementById('backToTop');

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => smoothScrollTo(button.dataset.target));
});

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card--visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -200px 0px' }
);

document.querySelectorAll('.card').forEach((section) => {
  section.classList.add('card--hidden');
  observer.observe(section);
});

const style = document.createElement('style');
style.innerHTML = `
  .card { transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease; }
  .card--hidden { opacity: 0; transform: translateY(24px); }
  .card--visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
