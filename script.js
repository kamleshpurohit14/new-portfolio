var progressBars = document.querySelectorAll(".skill-progress > div");
var skillsContainer = document.getElementById('skills-container');
var animationDone = false;

function initialiseBars() {
  for (var bar of progressBars) {
    bar.style.width = 0 + '%';
  }
}

initialiseBars();

function fillBars() {
  for (let bar of progressBars) {
    let currentWidth = 0;
    let targetWidth = parseInt(bar.getAttribute('data-bar-width'));
    let interval = setInterval(function () {
      if (currentWidth >= targetWidth) {
        clearInterval(interval);
        return;
      }
      currentWidth++;
      bar.style.width = currentWidth + '%';
    }, 5);
  }
}

function checkScroll() {
  var coordinates = skillsContainer.getBoundingClientRect();
  if (!animationDone && coordinates.top <= window.innerHeight) {
    animationDone = true;
    fillBars();
  } else if (coordinates.top > window.innerHeight) {
    animationDone = false;
    initialiseBars();
  }
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// ---- NAV ACTIVE ON SCROLL ----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNav() {
  let currentId = "";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    const hrefId = link.getAttribute("href").slice(1);
    if (hrefId === currentId) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);
