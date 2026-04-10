
// 🔥 PERFECT THEME TOGGLE - FIXED FOR YOUR NAVBAR
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) {
        console.error('themeToggle element not found!');
        return;
    }
    
    // Load saved theme FIRST
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default light
    body.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (savedTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Theme Toggle Click
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        
        // Update icon
        if (icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Resume download (placeholder)
document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.textContent.includes('Download Resume') || link.textContent.includes('View Code')) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent.includes('Download Resume')) {
                alert('Resume download link would be here!\n(Replace with actual resume PDF link)');
            } else if (this.textContent.includes('View Code') || this.textContent.includes('Live Demo')) {
                alert('Project demo/link would be here!\n(Replace with actual GitHub/Live URLs)');
            }
        });
    }
});

// SAFE VERSION - No mobile refresh
$(document).ready(function() {
  // Your animations but MOBILE SAFE
  $('.animate').addClass('show');
  
  // Add mobile detection
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Desktop-only animations
    $(window).scroll(function() {
      $('.fade-in').each(function() {
        var top = $(this).offset().top;
        if ($(window).scrollTop() > top - 200) {
          $(this).addClass('active');
        }
      });
    });
  }
});


// FIX Z-INDEX ON CLICK
document.querySelector('.chat-toggle')?.addEventListener('click', function() {
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        // Reset z-index for all sections
        document.querySelectorAll('section, .container, .project-box').forEach(el => {
            el.style.zIndex = 'auto';
        });
    }, 100);
});
