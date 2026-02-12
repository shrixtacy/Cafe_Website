// Simple Café Website - Main JavaScript File

// Wait for DOM to be fully loaded before initializing features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavigation();
  initScrollReveal();
  initMenuFilter();
  initFormValidation();
  initRippleEffect();
  
  console.log('Simple Café website loaded successfully');
});

// Navigation Controller - Mobile menu toggle functionality
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  // Check elements exist before adding listeners
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// Menu Filter Controller - Filter menu items by category
function initMenuFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  
  // Check if elements exist (menu page specific)
  if (filterButtons.length === 0 || menuItems.length === 0) {
    return;
  }
  
  // Add click handlers to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      // Update active button styling
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter menu items by data-category attribute
      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Form Validation Controller - Validate contact form inputs
function initFormValidation() {
  const form = document.getElementById('contactForm');
  
  // Check if form exists (contact page specific)
  if (!form) {
    return;
  }
  
  // Add submit event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name (non-empty)
    if (name === '') {
      showError('nameError', 'Name is required');
      isValid = false;
    } else {
      clearError('nameError');
    }
    
    // Validate email (non-empty and valid format)
    if (email === '') {
      showError('emailError', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('emailError', 'Please enter a valid email');
      isValid = false;
    } else {
      clearError('emailError');
    }
    
    // Validate message (non-empty)
    if (message === '') {
      showError('messageError', 'Message is required');
      isValid = false;
    } else {
      clearError('messageError');
    }
    
    // If all fields are valid, show success and reset form
    if (isValid) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    }
  });
}

// Helper function to validate email format using regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Helper function to clear error message
function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

// Scroll Reveal Controller - Animate elements when they enter viewport
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  // Function to check and reveal elements
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      // Add 'active' class when element is within 150px of bottom of viewport
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Add scroll event listener
  window.addEventListener('scroll', revealOnScroll);
  
  // Initial check on page load
  revealOnScroll();
}

// Button Ripple Effect Controller - Create ripple animation on button clicks
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  // Add click handler to each button
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple span element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      // Get button dimensions and click position
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      // Position ripple at click coordinates
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      // Add ripple to button
      this.appendChild(ripple);
      
      // Remove ripple after animation completes (600ms)
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
