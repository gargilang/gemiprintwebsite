// Mobile navigation toggle
const toggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".nav-menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// Smooth scroll for internal links
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  const el = document.querySelector(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    menu && menu.classList.remove("open");
  }
});

// Simple form handler
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */ (
      document.getElementById("name")
    )?.value.trim();
    const email = /** @type {HTMLInputElement} */ (
      document.getElementById("email")
    )?.value.trim();
    const message = /** @type {HTMLTextAreaElement} */ (
      document.getElementById("message")
    )?.value.trim();
    if (!name || !email || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }
    alert("Thank you! Your message has been sent.");
    form.reset();
  });
}

// Quick Navigation - Active State Detection
const quickNavItems = document.querySelectorAll(
  ".quick-nav-item:not(.quick-nav-whatsapp)"
);
const sections = document.querySelectorAll("section[id]");
let isNavigatingViaClick = false;
let clickTargetSection = null;

function addRipple(el) {
  if (!el) return;
  el.classList.add("ripple");
  setTimeout(() => el.classList.remove("ripple"), 450);
}

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100; // offset untuk navbar

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Find current active before removing
      const currentActive = document.querySelector(".quick-nav-item.active");

      // Remove active from all
      quickNavItems.forEach((item) => item.classList.remove("active"));

      // Add active to current section's nav item
      const activeItem = document.querySelector(
        `.quick-nav-item[href="#${sectionId}"]`
      );
      if (activeItem && !activeItem.classList.contains("quick-nav-whatsapp")) {
        activeItem.classList.add("active");

        // Only apply ripple during natural scroll (NOT during click navigation)
        if (!isNavigatingViaClick) {
          addRipple(activeItem);
        }
      }
    }
  });
}

// Handle click on sidebar icons
quickNavItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentActive = document.querySelector(".quick-nav-item.active");
    const targetItem = e.currentTarget;
    const targetHref = targetItem.getAttribute("href");

    // Mark that we're navigating via click
    isNavigatingViaClick = true;
    clickTargetSection = targetHref;

    // Apply ripple ONLY to source (current active icon) and destination (target)
    if (currentActive && currentActive !== targetItem) {
      addRipple(currentActive);
    }
    addRipple(targetItem);

    // Scroll to target
    const targetSection = document.querySelector(targetHref);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Reset flag after scroll animation completes
    setTimeout(() => {
      isNavigatingViaClick = false;
      clickTargetSection = null;
    }, 800);
  });
});

// Update on scroll with throttling for performance
let scrollTimeout;
let lastScrollTop = 0;
let scrollHideTimeout;
const quickNav = document.querySelector(".quick-nav");

window.addEventListener(
  "scroll",
  () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      updateActiveNav();
    }, 10);

    // Auto-hide sidebar when idle (mobile only)
    if (window.innerWidth <= 768) {
      // Show navigation when scrolling (user is navigating)
      quickNav.classList.remove("hide-on-scroll");
      
      // Hide after user stops scrolling (idle = reading, hide for 1.5s)
      clearTimeout(scrollHideTimeout);
      scrollHideTimeout = setTimeout(() => {
        quickNav.classList.add("hide-on-scroll");
      }, 1500);
    } else {
      // Always show on tablet/desktop
      quickNav.classList.remove("hide-on-scroll");
    }
  },
  { passive: true }
);

// Initial check
updateActiveNav();

// Initially hide on mobile after 1.5 seconds (user starts reading)
if (window.innerWidth <= 768) {
  setTimeout(() => {
    quickNav.classList.add("hide-on-scroll");
  }, 1500);
}

// Handle window resize - ensure sidebar visible on larger screens
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    quickNav.classList.remove("hide-on-scroll");
  }
});

// Machines Carousel Navigation
const machineSlides = document.querySelectorAll(".machine-slide");
const machineNavBtns = document.querySelectorAll(".machine-nav-btn");

function showMachineSlide(targetMachine) {
  machineSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  const targetSlide = document.querySelector(
    `.machine-slide[data-machine="${targetMachine}"]`
  );
  if (targetSlide) {
    targetSlide.classList.add("active");
  }
}

machineNavBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetMachine = btn.getAttribute("data-target");
    showMachineSlide(targetMachine);
  });
});

// Testimonials Auto-Slider with Quick Rubber Effect
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
let currentTestimonialIndex = 0;

function showNextTestimonial() {
  // Remove active from current
  testimonialSlides[currentTestimonialIndex].classList.remove("active");
  
  // Move to next slide (loop back to 0 if at end)
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
  
  // Add active to next (triggers rubber animation)
  testimonialSlides[currentTestimonialIndex].classList.add("active");
}

// Auto-advance every 4 seconds
if (testimonialSlides.length > 0) {
  setInterval(showNextTestimonial, 4000);
}
