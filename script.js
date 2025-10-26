document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileDropdownToggle = document.querySelector(
    ".mobile-dropdown-toggle"
  );
  const mobileDropdownContent = document.querySelector(
    ".mobile-dropdown-content"
  );

  // Create overlay for mobile menu
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Hamburger menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Close mobile menu when clicking overlay
  overlay.addEventListener("click", function () {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Mobile dropdown toggle
  if (mobileDropdownToggle && mobileDropdownContent) {
    mobileDropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      mobileDropdownContent.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking navigation links
  const mobileNavLinks = document.querySelectorAll(
    ".mobile-nav-link, .mobile-sub-link"
  );
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (!this.classList.contains("mobile-dropdown-toggle")) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Smooth scrolling for anchor links
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 60; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
