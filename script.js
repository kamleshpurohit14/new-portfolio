// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navList.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- NAV ACTIVE ON SCROLL ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNav() {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const hrefId = link.getAttribute("href").slice(1);
    if (hrefId === currentId) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

// ---- SCROLL REVEAL ----
const animatedEls = document.querySelectorAll("[data-animate]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  animatedEls.forEach((el) => el.classList.add("in-view"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  animatedEls.forEach((el) => observer.observe(el));
} else {
  animatedEls.forEach((el) => el.classList.add("in-view"));
}
