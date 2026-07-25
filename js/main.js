// Main shared JavaScript for header, theme toggle, mobile nav, scroll progress, and back-to-top behavior.

const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const scrollProgress = document.getElementById('scroll-progress');
const backTop = document.getElementById('back-top');
const pageLoader = document.getElementById('page-loader');

function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

function manageNavbar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-link');

  navAnchors.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function bindMobileNavigation() {
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

function bindBackToTop() {
  if (backTop) {
    backTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initLoader() {
  window.addEventListener('load', () => {
    if (pageLoader) pageLoader.style.display = 'none';
  });
}

function setupStickyHeader() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateScrollProgress();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  manageNavbar();
  bindMobileNavigation();
  bindBackToTop();
  setupStickyHeader();
  initLoader();
  updateScrollProgress();

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
