// 1. Dynamic Typing Effect
const roles = [
  "B.Tech CSE",
  "Associate Software Engineer",
  "AI / ML Developer",
  "Open-Source Contributor"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typingText");

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1600; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// 2. Navbar Scroll Style & Active Link Highlight
const navbar = document.getElementById("navbar");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let currentSection = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
});

// 3. Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// 4. Project Category Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// 5. Contact Form Simulation & Toast
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Show toast
  toast.classList.add("show");
  contactForm.reset();

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
});

// 6. Reveal content as it enters the viewport
const revealElements = document.querySelectorAll(
  ".section-title, .about-card, .highlight-box, .skill-card, .project-card, .timeline-item, .contact-info, .contact-form"
);
const staggeredGroups = document.querySelectorAll(".highlight-box, .skill-card, .project-card, .timeline-item");

document.body.classList.add("motion-ready");
revealElements.forEach((element) => element.classList.add("reveal"));
staggeredGroups.forEach((element, index) => {
  element.style.transitionDelay = `${(index % 4) * 70}ms`;
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

// 7. Set Current Year in Footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
