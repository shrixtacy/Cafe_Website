// Simple Café Website - Main JavaScript File

// Wait for DOM to be fully loaded before initializing features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavigation();
  initScrollReveal();
  
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

// Menu Filter Controller - Will be implemented in Task 8
function initMenuFilter() {
  // Implementation will be added in Task 8
}

// Form Validation Controller - Will be implemented in Task 9
function initFormValidation() {
  // Implementation will be added in Task 9
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

// Button Ripple Effect Controller - Will be implemented in Task 10
function initRippleEffect() {
  // Implementation will be added in Task 10
}
