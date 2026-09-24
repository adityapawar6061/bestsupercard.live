// ===== bestsupercard.live - Sports Rewards JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // Animated counter for stat items
  const statNumbers = document.querySelectorAll('.stat-item .number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const numStr = text.replace(/[^0-9]/g, '');
        const targetNum = parseInt(numStr);
        if (isNaN(targetNum)) return;
        
        let current = 0;
        const duration = 2000;
        const steps = 40;
        const increment = targetNum / steps;
        let step = 0;
        
        const timer = setInterval(() => {
          step++;
          current = Math.min(current + increment, targetNum);
          target.textContent = Math.round(current).toLocaleString() + (text.includes('+') ? '+' : '');
          if (step >= steps) {
            target.textContent = text;
            clearInterval(timer);
          }
        }, duration / steps);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // Rewards Calculator
  const slider = document.getElementById('spendSlider');
  const spendAmount = document.getElementById('spendAmount');
  const cashbackAmount = document.getElementById('cashbackAmount');
  const pointsAmount = document.getElementById('pointsAmount');

  if (slider) {
    function updateCalculator() {
      const val = parseInt(slider.value);
      if (spendAmount) spendAmount.textContent = '$' + val.toLocaleString();
      if (cashbackAmount) cashbackAmount.textContent = '$' + Math.round(val * 0.05).toLocaleString();
      if (pointsAmount) pointsAmount.textContent = (val * 2).toLocaleString();
    }
    slider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.btn-primary');
      if (submitBtn) {
        submitBtn.textContent = 'SCORE! Message Sent';
        submitBtn.style.pointerEvents = 'none';
        setTimeout(() => {
          submitBtn.textContent = 'SEND MESSAGE';
          submitBtn.style.pointerEvents = 'auto';
          this.reset();
        }, 3000);
      }
    });
  }
});
