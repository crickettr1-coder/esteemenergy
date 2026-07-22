/* ============================================================
   SCROLL REVEAL INTERSECTION OBSERVER
   Efficient IntersectionObserver tracking to reveal elements.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // stop observing once visible
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach((el) => {
    // For immediate page load items, trigger them directly
    if (el.classList.contains("reveal-nav") || 
        el.classList.contains("reveal-hero-content") || 
        el.classList.contains("reveal-hero-graphic")) {
      setTimeout(() => {
        el.classList.add("is-visible");
      }, 50);
    } else {
      observer.observe(el);
    }
  });
});
