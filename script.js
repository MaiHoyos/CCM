// ===== Countdown Timer =====
function initCountdown() {
  const targetDate = new Date('2027-06-08T08:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== Tab Navigation =====
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');
      
      // Scroll to top of main content smoothly
      document.querySelector('.main-content').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== Header Scroll Effect =====
function initHeaderEffect() {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// ===== Intersection Observer for Animations =====
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.section-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });
}

// ===== Initialize All =====
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initTabs();
  initSmoothScroll();
  initHeaderEffect();
  
  // Small delay to ensure CSS is loaded before animation observer
  setTimeout(() => {
    document.querySelectorAll('.section-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }, 100);
});
