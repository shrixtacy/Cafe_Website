// Simple Café Website - Main JavaScript File

// Wait for DOM to be fully loaded before initializing features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavigation();
  
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

// Scroll Reveal Controller - Will be implemented in Task 6
function initScrollReveal() {
  // Implementation will be added in Task 6
}

// Button Ripple Effect Controller - Will be implemented in Task 10
function initRippleEffect() {
  // Implementation will be added in Task 10
}
