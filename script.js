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
    const t = testimonials[idx];
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
      <p class="review-text">${t.text}</p>
      <span class="review-date">${t.date}</span>
    `;
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
