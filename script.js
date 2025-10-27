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
