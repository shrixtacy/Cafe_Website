/* 
  BLOOM BREW CAFÉ
  Core Interactions - Premium Edition
*/

document.addEventListener('DOMContentLoaded', () => {

  // --- 0. Custom Cursor ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Dot follows instantly
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Outline follows with delay (using animate for smooth performance)
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for links and buttons
    const hoverables = document.querySelectorAll('a, button, .menu-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px'; // larger
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // subtle fill
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
      });
    });
  }

  // --- 1. Mobile & Navbar Interaction ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      // Animate links in
      if (navLinks.classList.contains('active')) {
        document.querySelectorAll('.nav-link').forEach((link, index) => {
          link.style.opacity = '0';
          link.style.transform = 'translateY(20px)';
          setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
          }, 100 * index + 300);
        });
      }
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Sticky Navbar transparency effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- 2. Advanced Scroll Reveal Animation ---

  // Text Reveal (Fade Up)
  const textReveals = document.querySelectorAll('.reveal-text, .reveal'); // Support old class

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  textReveals.forEach(el => textObserver.observe(el));

  // Image Reveal (Curtain Effect)
  const imgReveals = document.querySelectorAll('.reveal-img');

  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.2 }); // Trigger slightly later

  imgReveals.forEach(el => imgObserver.observe(el));


  // --- 3. Menu Filtering (If on Menu Page) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Advanced Fade Out/In
        menuItems.forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';

          setTimeout(() => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 50);
            } else {
              item.style.display = 'none';
            }
          }, 300); // Wait for fade out
        });
      });
    });
  }

  // --- 4. Simple Form Validation ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerText;

      btn.innerText = "Sending...";

      setTimeout(() => {
        btn.innerText = "Message Sent!";
        btn.style.backgroundColor = "var(--color-green-muted)";
        contactForm.reset();
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
        }, 3000);
      }, 1500);
    });
  }
});
