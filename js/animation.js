// Scroll reveal, typing animation, counter animation, and active section enhancement.

const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => observer.observe(element));
}

function initTypingAnimation() {
  const typingTarget = document.querySelector('.typing-text');
  if (!typingTarget) return;

  const words = typingTarget.dataset.words.split(',');
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (!deleting) {
      typingTarget.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1300);
        return;
      }
    } else {
      typingTarget.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeEffect, deleting ? 45 : 100);
  }

  typeEffect();
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1500;
      const startTime = performance.now();

      function animate(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = value;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(animate);
      observer.unobserve(counter);
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  initTypingAnimation();
  initCounters();
});
