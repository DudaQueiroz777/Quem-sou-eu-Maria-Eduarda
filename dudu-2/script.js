// ===================================
// MARIA EDUARDA — PORTFOLIO SCRIPT
// ===================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- Theme Toggle ----
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('me-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('me-theme', next);
});

// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Active Nav Link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
      });
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--accent)';
        activeLink.style.background = 'var(--accent-dim)';
      }
    }
  });
}, {
  threshold: 0.4
});
sections.forEach(s => sectionObserver.observe(s));

// ---- Contact Form Validation ----
const form = document.getElementById('contato-form');
const formSuccess = document.getElementById('form-success');

function showError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errorId);
  field.classList.add('error');
  err.textContent = msg;
}
function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errorId);
  field.classList.remove('error');
  err.textContent = '';
}

// Live validation
document.getElementById('form-nome').addEventListener('input', function() {
  if (this.value.trim().length >= 2) clearError('form-nome', 'err-nome');
});
document.getElementById('form-email').addEventListener('input', function() {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim())) clearError('form-email', 'err-email');
});
document.getElementById('form-mensagem').addEventListener('input', function() {
  if (this.value.trim().length >= 10) clearError('form-mensagem', 'err-mensagem');
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const nome = document.getElementById('form-nome').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const mensagem = document.getElementById('form-mensagem').value.trim();

  // Reset errors
  ['form-nome', 'form-email', 'form-mensagem'].forEach((id, i) => {
    clearError(id, ['err-nome', 'err-email', 'err-mensagem'][i]);
  });

  // Validate
  if (nome.length < 2) {
    showError('form-nome', 'err-nome', 'Por favor, insira seu nome completo.');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('form-email', 'err-email', 'Insira um e-mail válido.');
    valid = false;
  }
  if (mensagem.length < 10) {
    showError('form-mensagem', 'err-mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
    valid = false;
  }

  if (!valid) return;

  // Simulate submission
  const submitBtn = document.getElementById('form-submit');
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Enviando...';

  setTimeout(() => {
    form.reset();
    formSuccess.classList.add('show');
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Enviar Mensagem';

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

// ---- Smooth hover effect on project cards ----
document.querySelectorAll('.projeto-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ---- Scroll progress bar ----
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: var(--accent);
  z-index: 9999;
  width: 0%;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
});
