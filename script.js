// Mobile navigation toggle
const toggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".nav-menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// Dark Mode Toggle
const themeToggle = document.querySelector(".theme-toggle-slider");
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

// Function to get system theme preference
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const theme = savedTheme || getSystemTheme();
  setTheme(theme);
}

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

// Initialize theme
initTheme();

// ============================================
// LANGUAGE SWITCHER
// ============================================

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.aboutUs": "About Us",
    "nav.ourMission": "Our Mission",
    "nav.ourProducts": "Our Products",
    "nav.ourMachines": "Our Machines",
    "nav.ourProcedures": "How It Works",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact Us",

    // Hero Section
    "hero.title1": "Your Partner in Printing and",
    "hero.title2": "Powerful Promotions",
    "hero.subtitle":
      "Delivering high-quality printing and promotional solutions that help your business make a lasting impression. From business cards to banners, we turn your ideas into results that speak for your brand.",
    "hero.cta": "Get Started",

    // About Section
    "about.title1": "Why Choose",
    "about.title2": "?",
    "about.subtitle":
      "Our mission is to empower brands through reliable, creative, and affordable printing solutions",
    "about.card1.title": "Best Service",
    "about.card1.text":
      "Understanding your unique printing needs through dedicated consultation and personalized service",
    "about.card2.title": "Best Price",
    "about.card2.text":
      "Comprehensive printing solutions tailored to your specifications with competitive pricing",
    "about.card3.title": "Top-Quality Printing",
    "about.card3.text":
      "On-time delivery with guaranteed quality that exceeds expectations every single time",

    // Services Section
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive printing solutions for all your needs",
    "services.item1.title": "Large Format Printing",
    "services.item1.text":
      "High-quality banners, posters, and signage for impactful visual communication",
    "services.item2.title": "Digital Textile Printing",
    "services.item2.text":
      "Vibrant fabric printing for fashion, home decor, and promotional materials",
    "services.item3.title": "UV Printing",
    "services.item3.text":
      "Direct-to-substrate printing on virtually any material with stunning results",
    "services.item4.title": "Photo Printing",
    "services.item4.text":
      "Professional-grade photo reproduction with exceptional color accuracy",
    "services.item5.title": "Commercial Printing",
    "services.item5.text":
      "Business cards, brochures, and marketing materials that make an impression",
    "services.item6.title": "Custom Solutions",
    "services.item6.text":
      "Specialized printing services designed to meet your unique requirements",

    // Machines Section
    "machines.title": "State-of-the-Art Equipment",
    "machines.subtitle": "Industry-leading technology for superior results",

    // Procedures Section
    "procedures.title": "How It Works",
    "procedures.subtitle":
      "Provide your artwork or let our design team create one for you. We'll send a digital proof for your review before printing begins.",

    // Procedures Section
    "procedures.title": "How It Works",
    "procedures.subtitle":
      "Provide your artwork or let our design team create one for you. We'll send a digital proof for your review before printing begins.",
    "procedures.step1.title": "Place Order",
    "procedures.step1.description":
      "Contact our team to share\nyour printing needs",
    "procedures.step2.title": "Confirm Pricing",
    "procedures.step2.description":
      "Quotation with transparent pricing\nand turnaround time",
    "procedures.step3.title": "Design & Proofing",
    "procedures.step3.description":
      "We will give a digital proof for your\nreview before printing begins",
    "procedures.step4.title": "Delivery or Pick up",
    "procedures.step4.description":
      "Receive order on time via delivery partners,\nor pick it up directly from our store",

    // Testimonials Section
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Trusted by businesses across industries",
    "testimonials.rating": "Based on Google Reviews",
    "testimonials.cta": "Leave a Review",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to bring your vision to life? Contact us today",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hours": "Hours",
    "contact.hoursText": "Monday - Saturday: 8AM - 8PM\nSunday: 9AM - 8PM",
    "contact.form.name": "Your Name *",
    "contact.form.email": "Your Email (optional)",
    "contact.form.phone": "Phone Number *",
    "contact.form.message":
      "Tell us about your project.\nWe can collaborate on Canva too. *",
    "contact.form.fileLinks":
      "Link to your files/design (Google Drive, Canva, Dropbox, etc. - optional)",
    "contact.form.submit": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.success":
      "✓ Message sent successfully! We'll get back to you soon.",
    "contact.form.error":
      "✗ Failed to send message. Please try again or contact us directly via Whatsapp button.",
    "contact.form.required":
      "Please fill in all required fields (marked with *)",
    "contact.form.notConfigured":
      "⚠️ EmailJS is not configured yet. Please follow the setup guide.",
    "contact.form.rateLimit": "Please wait a moment before sending again",
    "contact.form.fileLimit": "Total attachments must be 7 MB or less",
    "contact.form.spamDetected":
      "Submission blocked. Please try again in a moment.",

    // Footer
    "footer.tagline":
      "Professional digital printing solutions in Cikarang, Bekasi since 2023",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.copyright": "© 2024 gemiprint. All rights reserved.",
    "footer.link.home": "Home",
    "footer.link.about": "About",
    "footer.link.services": "Services",
    "footer.link.equipment": "Equipment",
    "footer.service.largeFormat": "Large Format",
    "footer.service.textile": "Textile Printing",
    "footer.service.uv": "UV Printing",
    "footer.service.photo": "Photo Printing",
  },
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang Kami",
    "nav.aboutUs": "Tentang Kami",
    "nav.ourMission": "Misi Kami",
    "nav.ourProducts": "Produk Kami",
    "nav.ourMachines": "Mesin Kami",
    "nav.ourProcedures": "Prosedur Kami",
    "nav.testimonials": "Testimoni",
    "nav.contact": "Hubungi Kami",

    // Hero Section
    "hero.title1": "Mitra Anda dalam Percetakan dan",
    "hero.title2": "Promosi yang Efektif",
    "hero.subtitle":
      "Memberikan solusi percetakan dan promosi berkualitas tinggi yang membantu bisnis Anda membuat kesan yang tahan lama dan mengesankan. Dari kartu nama hingga spanduk, kami mengubah ide Anda menjadi hasil yang berbicara untuk brand Anda.",
    "hero.cta": "Order Sekarang",

    // About Section
    "about.title1": "Mengapa Memilih",
    "about.title2": "?",
    "about.subtitle":
      "Misi kami adalah memberdayakan brand melalui solusi percetakan yang andal, kreatif, dan terjangkau",
    "about.card1.title": "Layanan Terbaik",
    "about.card1.text":
      "Memahami kebutuhan percetakan unik Anda melalui konsultasi khusus dan layanan personal",
    "about.card2.title": "Harga Terbaik",
    "about.card2.text":
      "Solusi percetakan lengkap yang disesuaikan dengan spesifikasi Anda dengan harga kompetitif",
    "about.card3.title": "Kualitas Premium",
    "about.card3.text":
      "Pengiriman tepat waktu dengan kualitas terjamin yang melebihi ekspektasi setiap saat",

    // Services Section
    "services.title": "Produk dan Layanan Kami",
    "services.subtitle": "Solusi percetakan lengkap untuk semua kebutuhan Anda",
    "services.item1.title": "Cetak Format Besar",
    "services.item1.text":
      "Spanduk, poster, dan signage berkualitas tinggi untuk komunikasi visual yang berdampak",
    "services.item2.title": "Cetak Tekstil Digital",
    "services.item2.text":
      "Cetak kain yang vibrant untuk fashion, dekorasi rumah, dan materi promosi",
    "services.item3.title": "Cetak UV",
    "services.item3.text":
      "Cetak langsung ke berbagai material dengan hasil yang memukau",
    "services.item4.title": "Cetak Foto",
    "services.item4.text":
      "Reproduksi foto berkelas profesional dengan akurasi warna yang luar biasa",
    "services.item5.title": "Cetak Komersial",
    "services.item5.text":
      "Kartu nama, brosur, dan materi marketing yang membuat kesan",
    "services.item6.title": "Solusi Custom",
    "services.item6.text":
      "Layanan percetakan khusus yang dirancang untuk memenuhi kebutuhan unik Anda",

    // Machines Section
    "machines.title": "Peralatan yang Canggih",
    "machines.subtitle": "Teknologi terdepan untuk hasil yang superior",

    // Procedures Section
    "procedures.title": "Cara Kerja Kami",
    "procedures.subtitle":
      "Berikan desain Anda atau biarkan tim desain kami membuatkannya untuk Anda. Kami akan mengirimkan proof digital untuk direview sebelum proses cetak dimulai.",
    "procedures.step1.title": "Buat Pesanan",
    "procedures.step1.description":
      "Hubungi tim kami untuk memenuhi\nkebutuhan cetakan Anda",
    "procedures.step2.title": "Konfirmasi Harga",
    "procedures.step2.description":
      "Penawaran dengan harga transparan\ndan waktu penyelesaian yang jelas",
    "procedures.step3.title": "Desain & Proofing",
    "procedures.step3.description":
      "Kami akan memberikan proof digital\nuntuk Anda tinjau sebelum cetak dimulai",
    "procedures.step4.title": "Pengiriman atau Pengambilan",
    "procedures.step4.description":
      "Terima pesanan tepat waktu via delivery\natau ambil langsung dari toko kami",

    // Testimonials Section
    "testimonials.title": "Apa Kata Klien Kami",
    "testimonials.subtitle": "Dipercaya oleh bisnis di berbagai industri",
    "testimonials.rating": "Berdasarkan Google Reviews",
    "testimonials.cta": "Tulis Review",

    // Contact Section
    "contact.title": "Hubungi Kami",
    "contact.subtitle": "Siap mewujudkan visi Anda? Hubungi kami hari ini",
    "contact.address": "Alamat",
    "contact.phone": "Telepon",
    "contact.email": "Email",
    "contact.hours": "Jam Buka",
    "contact.hoursText": "Senin - Sabtu: 08.00 - 20.00\nMinggu: 09.00 - 20.00",
    "contact.form.name": "Nama Anda *",
    "contact.form.email": "Email Anda (opsional)",
    "contact.form.phone": "Nomor Telepon *",
    "contact.form.message":
      "Ceritakan tentang proyek Anda.\nKami juga bisa kolaborasi di Canva. *",
    "contact.form.fileLinks":
      "Link file/desain Anda (Google Drive, Canva, Dropbox, dsb. - opsional)",
    "contact.form.submit": "Kirim Pesan",
    "contact.form.sending": "Mengirim...",
    "contact.form.success":
      "✓ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
    "contact.form.error":
      "✗ Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung melalui tombol Whatsapp.",
    "contact.form.required":
      "Mohon isi semua kolom yang wajib (ditandai dengan *)",
    "contact.form.notConfigured":
      "⚠️ EmailJS belum dikonfigurasi. Silakan ikuti panduan setup.",
    "contact.form.rateLimit": "Mohon tunggu sebentar sebelum mengirim lagi",
    "contact.form.fileLimit": "Total lampiran maksimal 7 MB",
    "contact.form.spamDetected":
      "Pengiriman diblokir. Silakan coba lagi nanti.",

    // Footer
    "footer.tagline":
      "Solusi percetakan digital profesional di Cikarang, Bekasi sejak 2023",
    "footer.quickLinks": "Tautan Cepat",
    "footer.services": "Layanan",
    "footer.contact": "Kontak",
    "footer.copyright": "© 2024 gemiprint. Hak cipta dilindungi.",
    "footer.link.home": "Beranda",
    "footer.link.about": "Tentang",
    "footer.link.services": "Layanan",
    "footer.link.equipment": "Peralatan",
    "footer.service.largeFormat": "Format Besar",
    "footer.service.textile": "Cetak Tekstil",
    "footer.service.uv": "Cetak UV",
    "footer.service.photo": "Cetak Foto",
  },
};

// Language switching functionality
let currentLang = localStorage.getItem("language") || "id"; // Default to Indonesian

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);
  document.documentElement.setAttribute("lang", lang === "id" ? "id" : "en");

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = translations[lang][key];

    if (translation) {
      // Handle multiline text (for textareas)
      if (
        element.tagName === "TEXTAREA" ||
        element.hasAttribute("placeholder")
      ) {
        if (element.hasAttribute("placeholder")) {
          element.placeholder = translation.replace(/\\n/g, "\n");
        } else {
          element.textContent = translation.replace(/\\n/g, "\n");
        }
      } else if (element.tagName === "P" && translation.includes("\n")) {
        // Handle line breaks in paragraphs by converting to <br>
        element.innerHTML = translation.replace(/\n/g, "<br>");
      } else {
        element.textContent = translation;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translation = translations[lang][key];
    if (translation) {
      element.placeholder = translation.replace(/\\n/g, "\n");
    }
  });

  // Update title attributes (for tooltips/hover)
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    const translation = translations[lang][key];
    if (translation) {
      element.title = translation;
    }
  });

  // Update language toggle button
  const langToggle = document.querySelector(".lang-active");
  if (langToggle) {
    langToggle.textContent = lang.toUpperCase();
  }

  // Update form validation messages
  updateFormValidationLanguage(lang);
}

function updateFormValidationLanguage(lang) {
  // Set custom validation messages for required fields
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const emailInput = document.getElementById("email");

  const requiredMsg =
    lang === "id" ? "Mohon isi kolom ini" : "Please fill out this field";
  const emailInvalidMsg =
    lang === "id"
      ? "Mohon masukkan alamat email yang valid"
      : "Please enter a valid email address";

  // Reset custom validity
  if (nameInput) nameInput.setCustomValidity("");
  if (phoneInput) phoneInput.setCustomValidity("");
  if (messageInput) messageInput.setCustomValidity("");
  if (emailInput) emailInput.setCustomValidity("");

  // Helper function to handle invalid event
  const handleInvalid = function () {
    if (this.validity.valueMissing) {
      this.setCustomValidity(requiredMsg);
    } else if (this.type === "email" && this.validity.typeMismatch) {
      this.setCustomValidity(emailInvalidMsg);
    }
  };

  const handleInput = function () {
    this.setCustomValidity("");
  };

  // Set up validation on invalid event
  [nameInput, phoneInput, messageInput, emailInput].forEach((input) => {
    if (input) {
      // Remove old event listeners if they exist
      input.removeEventListener("invalid", input._handleInvalid);
      input.removeEventListener("input", input._handleInput);

      // Store references to the handlers
      input._handleInvalid = handleInvalid.bind(input);
      input._handleInput = handleInput.bind(input);

      // Add new event listeners
      input.addEventListener("invalid", input._handleInvalid);
      input.addEventListener("input", input._handleInput);

      // Initialize message immediately so hover shows localized text
      if (input.required && !input.value) {
        input.setCustomValidity(requiredMsg);
        input.title = requiredMsg; // also set title so simple hover uses localized text
      } else if (
        input.type === "email" &&
        input.value &&
        input.validity.typeMismatch
      ) {
        input.setCustomValidity(emailInvalidMsg);
        input.title = emailInvalidMsg;
      } else {
        input.setCustomValidity("");
        input.removeAttribute("title");
      }
    }
  });
}

// Initialize language on page load
function initLanguage() {
  setLanguage(currentLang);
}

// Language toggle button
const languageToggle = document.querySelector(".language-toggle");
if (languageToggle) {
  languageToggle.disabled = false;
  languageToggle.removeAttribute("title");
  languageToggle.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "id" : "en";
    setLanguage(newLang);
  });
}

// Initialize language after DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguage);
} else {
  initLanguage();
}

// ============================================
// END LANGUAGE SWITCHER
// ============================================

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

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials after setup
const EMAILJS_PUBLIC_KEY = "MdXueZks3wC8injWx"; // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = "service_3kl45sr"; // e.g., "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_sc6ym8r"; // e.g., "template_xyz456"

// reCAPTCHA v3 Configuration (optional but recommended)
// Create a site key at https://www.google.com/recaptcha/admin
// Leave empty to disable reCAPTCHA
const RECAPTCHA_SITE_KEY = "6LflefsrAAAAADkwKgWWW3fPt68V_jM6EfCbGBVe"; // e.g., "6Lc...your_site_key..." or leave "" to disable

let recaptchaScriptLoading = null;
function ensureRecaptchaLoaded() {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve();
  if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
    return new Promise((resolve) => window.grecaptcha.ready(resolve));
  }
  if (!recaptchaScriptLoading) {
    recaptchaScriptLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
        RECAPTCHA_SITE_KEY
      )}`;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(resolve);
        } else {
          resolve();
        }
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return recaptchaScriptLoading;
}

// Initialize EmailJS
if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// EmailJS form handler
const form = document.querySelector(".contact-form");
// Timestamp to prevent instant-bot submissions
const formLoadTs = Date.now();
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoader = submitBtn.querySelector(".btn-loader");
    const statusMsg = form.querySelector(".form-status");

    // Get form values
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const fileLinks = document.getElementById("file_links")?.value.trim();

    // Basic bot honeypot (optional hidden input with id="website")
    const honeypot = document.getElementById("website");
    if (honeypot && honeypot.value) {
      statusMsg.textContent =
        translations[currentLang]["contact.form.spamDetected"];
      statusMsg.style.color = "var(--red)";
      return;
    }

    // Validate required fields (email is optional)
    if (!name || !phone || !message) {
      statusMsg.textContent =
        translations[currentLang]["contact.form.required"];
      statusMsg.style.color = "var(--red)";
      return;
    }

    // Gentle slowdown: require at least 3s on page before first submit
    if (Date.now() - formLoadTs < 3000) {
      statusMsg.textContent =
        translations[currentLang]["contact.form.rateLimit"];
      statusMsg.style.color = "#ff9800";
      return;
    }

    // Client-side rate limiting: 60s between submissions per device
    const lastSubmit = Number(
      localStorage.getItem("gp_contact_last_submit") || "0"
    );
    if (Date.now() - lastSubmit < 60 * 1000) {
      statusMsg.textContent =
        translations[currentLang]["contact.form.rateLimit"];
      statusMsg.style.color = "#ff9800";
      return;
    }

    // Check if EmailJS is configured (non-empty)
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      statusMsg.textContent =
        translations[currentLang]["contact.form.notConfigured"];
      statusMsg.style.color = "#ff9800";
      console.error("EmailJS not configured. Update credentials in script.js");
      return;
    }

    // Disable button and show loading
    submitBtn.disabled = true;
    btnText.style.display = "none";
    btnLoader.style.display = "inline";
    statusMsg.textContent = "";

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: name,
        reply_to: email,
        phone: phone,
        message: message,
        file_links: fileLinks || "Tidak ada link file",
        to_email: "cs@gemiprint.com",
        subject: `New inquiry from ${name} (${phone})`,
      };

      // Acquire reCAPTCHA v3 token if configured
      if (RECAPTCHA_SITE_KEY) {
        try {
          await ensureRecaptchaLoaded();
          if (window.grecaptcha && window.grecaptcha.execute) {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: "contact_form",
            });
            templateParams["g-recaptcha-response"] = token;
          }
        } catch (rcErr) {
          console.warn("reCAPTCHA failed to load or execute", rcErr);
        }
      }

      // Send email via EmailJS (simple send, no file uploads)
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", response);

      // Show success message
      statusMsg.textContent = translations[currentLang]["contact.form.success"];
      statusMsg.style.color = "var(--green)";

      // Record successful submission time (rate limiting)
      localStorage.setItem("gp_contact_last_submit", String(Date.now()));

      // Reset form
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      statusMsg.textContent = translations[currentLang]["contact.form.error"];
      statusMsg.style.color = "var(--red)";
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      btnText.style.display = "inline";
      btnLoader.style.display = "none";
    }
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
  // Skip ALL active state changes during click-based navigation
  if (isNavigatingViaClick) {
    return;
  }

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
        addRipple(activeItem);
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

    // Mark that we're navigating via click (BEFORE scrolling starts)
    isNavigatingViaClick = true;
    clickTargetSection = targetHref;

    // Apply ripple ONLY to source (current active icon) and destination (target)
    if (currentActive && currentActive !== targetItem) {
      addRipple(currentActive);
    }
    addRipple(targetItem);

    // Immediately set destination as active (remove from all others)
    quickNavItems.forEach((item) => item.classList.remove("active"));
    targetItem.classList.add("active");

    // Scroll to target
    const targetSection = document.querySelector(targetHref);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Reset flag after scroll animation completes (increased timeout for slow scroll)
    setTimeout(() => {
      isNavigatingViaClick = false;
      clickTargetSection = null;
    }, 1500);
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

// Mouse edge detection - show sidebar when mouse is near right edge
let mouseHideTimeout;
window.addEventListener(
  "mousemove",
  (e) => {
    const rightEdgeThreshold = 80; // pixels from right edge
    const distanceFromRight = window.innerWidth - e.clientX;

    if (distanceFromRight <= rightEdgeThreshold) {
      // Mouse is near right edge - show sidebar
      quickNav.classList.remove("hide-on-scroll");

      // Clear any pending hide timeout
      clearTimeout(mouseHideTimeout);
    } else {
      // Mouse moved away from right edge - hide after delay (only on mobile)
      if (window.innerWidth <= 768) {
        clearTimeout(mouseHideTimeout);
        mouseHideTimeout = setTimeout(() => {
          quickNav.classList.add("hide-on-scroll");
        }, 1500);
      }
    }
  },
  { passive: true }
);

// Machines Carousel Navigation
const machineSlides = document.querySelectorAll(".machine-card");
const machineNavBtns = document.querySelectorAll(".machine-nav-btn");
const machinesSlider = document.querySelector(".machines-slider");
const machinePaginationDots = document.querySelectorAll(
  ".machines-pagination .pagination-dot"
);

function updateMachinePagination(activeNumber) {
  machinePaginationDots.forEach((dot) => {
    const dotTarget = parseInt(dot.getAttribute("data-target"));
    if (dotTarget === activeNumber) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function showMachineSlide(targetMachine) {
  machineSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  const targetSlide = document.querySelector(
    `.machine-card[data-machine="${targetMachine}"]`
  );
  if (targetSlide) {
    targetSlide.classList.add("active");
    updateMachinePagination(targetMachine);
  }
}

function getCurrentMachineNumber() {
  const activeSlide = document.querySelector(".machine-card.active");
  return activeSlide ? parseInt(activeSlide.getAttribute("data-machine")) : 1;
}

function getTotalMachines() {
  return machineSlides.length;
}

function navigateToNextMachine() {
  const current = getCurrentMachineNumber();
  const total = getTotalMachines();
  const next = current < total ? current + 1 : current;
  if (next !== current) {
    showMachineSlide(next);
  }
}

function navigateToPreviousMachine() {
  const current = getCurrentMachineNumber();
  const prev = current > 1 ? current - 1 : current;
  if (prev !== current) {
    showMachineSlide(prev);
  }
}

machineNavBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetMachine = parseInt(btn.getAttribute("data-target"));
    showMachineSlide(targetMachine);
  });
});

// Add click handlers for machine pagination dots
machinePaginationDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = parseInt(dot.getAttribute("data-target"));
    showMachineSlide(target);
  });
});

// Add swipe/touch support for machines carousel
if (machinesSlider) {
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const swipeThreshold = 50; // minimum distance to be considered a swipe

  machinesSlider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  machinesSlider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          // Swipe right - go to previous
          navigateToPreviousMachine();
        } else {
          // Swipe left - go to next
          navigateToNextMachine();
        }
      }
    }
  }
}

// Procedures Carousel Navigation
const procedureSlides = document.querySelectorAll(".procedure-card");
const procedureNavBtns = document.querySelectorAll(".procedure-nav-btn");
const proceduresSlider = document.querySelector(".procedures-slider");
const procedurePaginationDots = document.querySelectorAll(
  ".procedures-pagination .pagination-dot"
);

function showProcedureSlide(targetProcedure) {
  procedureSlides.forEach((slide) => {
    slide.classList.remove(
      "active",
      "peek-bottom",
      "peek-bottom-2",
      "peek-top",
      "peek-top-2"
    );
  });

  const targetSlide = document.querySelector(
    `.procedure-card[data-procedure="${targetProcedure}"]`
  );
  if (targetSlide) {
    targetSlide.classList.add("active");
  }

  // Add stacking effect - cards peek from behind
  const current = targetProcedure;

  // Show cards that peek from bottom (next cards)
  if (current === 1) {
    // Step 1 active: step 2 peeks from bottom, step 3 peeks behind step 2
    const step2 = document.querySelector('.procedure-card[data-procedure="2"]');
    const step3 = document.querySelector('.procedure-card[data-procedure="3"]');
    if (step2) step2.classList.add("peek-bottom");
    if (step3) step3.classList.add("peek-bottom-2");
  } else if (current === 2) {
    // Step 2 active: step 1 peeks from top, step 3 peeks from bottom
    const step1 = document.querySelector('.procedure-card[data-procedure="1"]');
    const step3 = document.querySelector('.procedure-card[data-procedure="3"]');
    if (step1) step1.classList.add("peek-top");
    if (step3) step3.classList.add("peek-bottom");
  } else if (current === 3) {
    // Step 3 active: step 2 peeks from top, step 4 peeks from bottom
    const step2 = document.querySelector('.procedure-card[data-procedure="2"]');
    const step4 = document.querySelector('.procedure-card[data-procedure="4"]');
    if (step2) step2.classList.add("peek-top");
    if (step4) step4.classList.add("peek-bottom");
  } else if (current === 4) {
    // Step 4 active: step 3 peeks from top, step 2 peeks behind step 3
    const step3 = document.querySelector('.procedure-card[data-procedure="3"]');
    const step2 = document.querySelector('.procedure-card[data-procedure="2"]');
    if (step3) step3.classList.add("peek-top");
    if (step2) step2.classList.add("peek-top-2");
  }

  // Update pagination dots
  procedurePaginationDots.forEach((dot) => {
    dot.classList.remove("active");
  });
  const activeDot = document.querySelector(
    `.procedures-pagination .pagination-dot[data-target="${targetProcedure}"]`
  );
  if (activeDot) {
    activeDot.classList.add("active");
  }
}

function getCurrentProcedureNumber() {
  const activeSlide = document.querySelector(".procedure-card.active");
  return activeSlide ? parseInt(activeSlide.getAttribute("data-procedure")) : 1;
}

function getTotalProcedures() {
  return procedureSlides.length;
}

function navigateToNextProcedure() {
  const current = getCurrentProcedureNumber();
  const total = getTotalProcedures();
  const next = current < total ? current + 1 : current;
  if (next !== current) {
    showProcedureSlide(next);
  }
}

function navigateToPreviousProcedure() {
  const current = getCurrentProcedureNumber();
  const prev = current > 1 ? current - 1 : current;
  if (prev !== current) {
    showProcedureSlide(prev);
  }
}

procedureNavBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetProcedure = parseInt(btn.getAttribute("data-target"));
    showProcedureSlide(targetProcedure);
  });
});

// Pagination dots for procedures
procedurePaginationDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetProcedure = parseInt(dot.getAttribute("data-target"));
    showProcedureSlide(targetProcedure);
  });
});

// Add swipe/touch support for procedures carousel
if (proceduresSlider) {
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const swipeThreshold = 50;

  proceduresSlider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  proceduresSlider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleProcedureSwipe();
    },
    { passive: true }
  );

  function handleProcedureSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          // Swipe right - go to previous
          navigateToPreviousProcedure();
        } else {
          // Swipe left - go to next
          navigateToNextProcedure();
        }
      }
    }
  }
}

// -----------------------------
// Google Reviews - Dynamic Cards
// -----------------------------
(function () {
  const grid = document.querySelector(".reviews-grid");
  if (!grid) return;

  // Fallback fakes (4) that will always be included with real reviews
  /** @type {{name:string, text:string, rating:number, date:string}[]} */
  const fallbackFakes = [
    {
      name: "Ahmad Ridwan",
      text: "Pelayanan sangat baik, hasil cetakan berkualitas tinggi. Sangat merekomendasikan untuk kebutuhan printing bisnis!",
      rating: 5,
      date: "2 months ago",
    },
    {
      name: "Siti Nurjanah",
      text: "Cepat, rapi, dan harga terjangkau. Tim yang profesional dan responsif. Pasti akan kembali lagi!",
      rating: 5,
      date: "3 months ago",
    },
    {
      name: "Budi Santoso",
      text: "Mesin printing yang modern dan hasil yang memuaskan. Recommended banget untuk percetakan di Cikarang!",
      rating: 5,
      date: "4 months ago",
    },
    {
      name: "Rina Wulandari",
      text: "Order spanduk urgent dikerjakan super cepat dan hasilnya bagus. Terima kasih tim gemiprint!",
      rating: 5,
      date: "1 month ago",
    },
  ];

  // Larger fallback set (used only if no external data at all)
  const fallbackAll = [
    ...fallbackFakes,
    {
      name: "Andi Pratama",
      text: "Desain dibantuin sampai pas, hasil cetak warnanya keluar banget. Mantap pelayanannya.",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      name: "Novi Lestari",
      text: "Kartu nama dan brosur rapi, bahan berkualitas. Harganya juga bersahabat untuk UMKM.",
      rating: 5,
      date: "5 weeks ago",
    },
    {
      name: "Hendra Gunawan",
      text: "Timnya komunikatif, revisi cepat. Hasil sablon kaos halus dan tidak mudah pudar.",
      rating: 5,
      date: "6 weeks ago",
    },
    {
      name: "Maya Sari",
      text: "Percetakan paling lengkap di Cikarang. Dari stiker sampai banner semua dikerjakan rapi.",
      rating: 5,
      date: "2 months ago",
    },
    {
      name: "Fajar Kurniawan",
      text: "Pengerjaan tepat waktu, packing aman. Highly recommended untuk kebutuhan event perusahaan.",
      rating: 5,
      date: "3 weeks ago",
    },
    {
      name: "Dewi Anggraini",
      text: "Sangat terbantu dengan layanan konsultasinya. Hasil cetak foto tajam dan warnanya akurat.",
      rating: 5,
      date: "1 week ago",
    },
    {
      name: "Yusuf Rahman",
      text: "Harga masuk akal, kualitas di atas ekspektasi. Fast response dan ramah.",
      rating: 5,
      date: "2 months ago",
    },
    {
      name: "Lia Kartika",
      text: "Cetak undangan cepat dan rapi, finishing emasnya elegan. Keluarga puas semua.",
      rating: 5,
      date: "4 weeks ago",
    },
  ];

  /** @returns {Promise<{
   *  name:string, text:string, rating:number, date:string
   * }[]>} */
  async function loadExternalReviews() {
    try {
      const res = await fetch("reviews.json", { cache: "no-store" });
      if (!res.ok) return [];
      const data = await res.json();
      if (!Array.isArray(data)) return [];
      // keep only entries that have a name and some text (skip star-only if empty)
      return data.filter(
        (r) =>
          r &&
          typeof r.name === "string" &&
          r.name.trim() &&
          typeof r.text === "string" &&
          r.text.trim()
      );
    } catch (_) {
      return [];
    }
  }

  // Utility
  const starString = (n) => "\u2B50".repeat(Math.max(0, Math.min(5, n)));
  const googleSvg =
    '<svg class="google-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">\
<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>\
<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>\
<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>\
<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>\
</svg>';

  function createCard(idx) {
    const t = dataset[idx];
    const el = document.createElement("div");
    el.className = "review-card";
    el.setAttribute("role", "article");
    el.setAttribute("tabindex", "0");
    el.dataset.index = String(idx);
    const initial = (t.name || "?").trim().charAt(0).toUpperCase();
    el.innerHTML = `
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${initial}</div>
          <div>
            <h4 class="reviewer-name">${t.name}</h4>
            <div class="review-stars">${starString(t.rating)}</div>
          </div>
        </div>
        ${googleSvg}
      </div>
      <div class="review-text">
        <div class="review-text-inner">${t.text}</div>
      </div>
      <span class="review-date">${t.date}</span>
    `;

    // Check if text overflows and add class for animation
    setTimeout(() => {
      const textEl = el.querySelector(".review-text");
      const innerEl = el.querySelector(".review-text-inner");
      if (textEl && innerEl) {
        // Check if content height exceeds container height
        if (innerEl.scrollHeight > textEl.clientHeight) {
          innerEl.classList.add("has-overflow");
        }
      }
    }, 100);

    return el;
  }

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w > 1024) return 3; // desktop
    if (w > 768) return 4; // tablet
    return 2; // mobile
  }

  // State
  let dataset = fallbackAll.slice(); // default until external loads
  let visibleIdx = []; // indices into dataset currently shown
  let hiddenIdx = []; // remaining indices pool
  let swapIntervalId = null;
  const swapLocks = new Set();

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function initPools(count) {
    const all = Array.from({ length: dataset.length }, (_, i) => i);
    shuffle(all);
    visibleIdx = all.slice(0, count);
    hiddenIdx = all.slice(count);
  }

  function attachClick(el, position) {
    el.addEventListener("click", () => {
      swapAt(position);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        swapAt(position);
      }
    });
  }

  function renderInitial() {
    grid.innerHTML = "";
    visibleIdx.forEach((idx, pos) => {
      const card = createCard(idx);
      attachClick(card, pos);
      grid.appendChild(card);
    });
  }

  function swapAt(position) {
    if (swapLocks.has(position)) return; // prevent overlapping animations on same slot
    if (!hiddenIdx.length) return; // nothing to swap with
    const card = grid.children[position];
    if (!card) return;

    swapLocks.add(position);

    // Choose a random hidden index different from current
    const hiddenPick = hiddenIdx[Math.floor(Math.random() * hiddenIdx.length)];
    const oldIdx = visibleIdx[position];

    // Animate out
    card.classList.add("fade-out");

    const finalize = () => {
      // Replace node with new content
      const newCard = createCard(hiddenPick);
      newCard.classList.add("fade-in-start");
      attachClick(newCard, position);
      grid.replaceChild(newCard, card);
      requestAnimationFrame(() => {
        newCard.classList.add("fade-in");
        // Clean up classes after transition
        setTimeout(() => {
          newCard.classList.remove("fade-in-start", "fade-in");
          swapLocks.delete(position);
        }, 320);
      });

      // Update pools
      // remove hiddenPick from hiddenIdx
      const hp = hiddenIdx.indexOf(hiddenPick);
      if (hp !== -1) hiddenIdx.splice(hp, 1);
      // old visible moves to hidden pool
      hiddenIdx.push(oldIdx);
      visibleIdx[position] = hiddenPick;
    };

    // When transition ends or after timeout, finalize
    const onEnd = () => {
      card.removeEventListener("transitionend", onEnd);
      finalize();
    };
    card.addEventListener("transitionend", onEnd);
    // Safety timeout in case transitionend doesn't fire
    setTimeout(onEnd, 320);
  }

  function ensureInterval() {
    if (swapIntervalId) clearInterval(swapIntervalId);
    swapIntervalId = setInterval(() => {
      const count = visibleIdx.length;
      if (!count || !hiddenIdx.length) return;
      // try up to 3 times to find an unlocked position
      for (let i = 0; i < 3; i++) {
        const pos = Math.floor(Math.random() * count);
        if (!swapLocks.has(pos)) {
          swapAt(pos);
          break;
        }
      }
    }, 6000);
  }

  // Handle resize - adjust visible count and DOM accordingly
  let resizeTimer;
  function onResize() {
    const needed = getVisibleCount();
    const current = visibleIdx.length;
    if (needed === current) return;

    if (needed > current) {
      // Add more cards from hidden pool
      const toAdd = Math.min(needed - current, hiddenIdx.length);
      for (let i = 0; i < toAdd; i++) {
        const pick = hiddenIdx.shift();
        if (pick == null) break;
        const pos = visibleIdx.length; // append at end
        visibleIdx.push(pick);
        const card = createCard(pick);
        attachClick(card, pos);
        // animate in
        card.classList.add("fade-in-start");
        grid.appendChild(card);
        requestAnimationFrame(() => card.classList.add("fade-in"));
        setTimeout(
          () => card.classList.remove("fade-in-start", "fade-in"),
          320
        );
      }
    } else {
      // Remove extra cards and return to hidden pool
      const toRemove = current - needed;
      for (let i = 0; i < toRemove; i++) {
        const pos = visibleIdx.length - 1; // remove from end
        const idx = visibleIdx.pop();
        if (idx != null) hiddenIdx.push(idx);
        const card = grid.children[pos];
        if (card) {
          card.classList.add("fade-out");
          const cleanup = () => {
            card.removeEventListener("transitionend", cleanup);
            card.remove();
          };
          card.addEventListener("transitionend", cleanup);
          setTimeout(cleanup, 320);
        }
      }
    }
    ensureInterval();
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(onResize, 150);
  });

  // Init: attempt to load real reviews, then combine with 4 fakes
  (async () => {
    const real = await loadExternalReviews();
    if (real.length) {
      dataset = [...real, ...fallbackFakes];
    } else {
      dataset = fallbackAll.slice();
    }
    initPools(getVisibleCount());
    renderInitial();
    ensureInterval();
  })();
})();
