// Simple Café Website - Main JavaScript File
// This file contains all interactive features for the café website
// All features use vanilla JavaScript with progressive enhancement

// Wait for DOM to be fully loaded before initializing features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features with proper error handling
  // Each init function checks for element existence before attaching listeners
  
  // Mobile navigation toggle (hamburger menu)
  initNavigation();
  
  // Scroll-triggered animations for about page sections
  initScrollReveal();
  
  // Menu category filtering on menu page
  initMenuFilter();
  
  // Contact form validation with error messages
  initFormValidation();
  
  // Button click ripple effect for visual feedback
  initRippleEffect();
  
  console.log('Simple Café website loaded successfully');
});

// Navigation Controller - Mobile menu toggle functionality
// Handles hamburger menu icon clicks to show/hide mobile navigation
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  // Check elements exist before adding listeners (prevents errors on pages without nav)
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      // Toggle 'active' class to show/hide mobile menu
      navLinks.classList.toggle('active');
      // Animate hamburger icon to X shape
      hamburger.classList.toggle('active');
    });
  }
}

// Menu Filter Controller - Filter menu items by category
// Allows users to filter menu items by clicking category buttons (All, Breakfast, Lunch, Drinks & Desserts)
function initMenuFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  
  // Check if elements exist (menu page specific feature)
  if (filterButtons.length === 0 || menuItems.length === 0) {
    return;
  }
  
  // Add click handlers to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      // Update active button styling (remove from all, add to clicked)
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter menu items by data-category attribute
      // Show items matching selected category, or all items if 'all' is selected
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
// Validates name, email, and message fields before submission
// Displays inline error messages for invalid fields
function initFormValidation() {
  const form = document.getElementById('contactForm');
  
  // Check if form exists (contact page specific feature)
  if (!form) {
    return;
  }
  
  // Add submit event listener
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form field values and trim whitespace
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
    
    // If all fields are valid, show success alert and reset form
    if (isValid) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    }
  });
}

// Helper function to validate email format using regex
// Checks for basic email pattern: text@text.text
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to show error message
// Displays error text below the invalid field in red
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Helper function to clear error message
// Hides error text when field becomes valid
function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

// Scroll Reveal Controller - Animate elements when they enter viewport
// Adds fade-in and slide-up animations to elements with 'reveal' class
// Used primarily on the about page for progressive content display
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  // Function to check element position and reveal when in viewport
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150; // Trigger animation 150px before element reaches bottom of viewport
      
      // Add 'active' class when element is within reveal point
      // This triggers CSS transition for opacity and transform
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Add scroll event listener to check on scroll
  window.addEventListener('scroll', revealOnScroll);
  
  // Initial check on page load (for elements already in viewport)
  revealOnScroll();
}

// Button Ripple Effect Controller - Create ripple animation on button clicks
// Adds a visual ripple effect that emanates from the click position
// Provides tactile feedback for button interactions
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  // Add click handler to each button with 'btn' class
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple span element dynamically
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      // Calculate ripple size and position based on button dimensions and click location
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height); // Use larger dimension for full coverage
      const x = e.clientX - rect.left - size / 2; // Center ripple on click X coordinate
      const y = e.clientY - rect.top - size / 2;  // Center ripple on click Y coordinate
      
      // Apply calculated size and position to ripple element
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      // Add ripple to button DOM
      this.appendChild(ripple);
      
      // Remove ripple after animation completes (600ms matches CSS animation duration)
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
