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

  // ============================================================
  // STAT COUNTERS ANIMATION
  // ============================================================
  const counters = document.querySelectorAll(".esteem-stat-counter");
  if (counters.length) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";

      if (isNaN(target) || prefersReducedMotion) {
        el.textContent = `${prefix}${target}${suffix}`;
        return;
      }

      const duration = 1500;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);

        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      counters.forEach((counter) => counterObserver.observe(counter));
    } else {
      counters.forEach((counter) => animateCounter(counter));
    }
  }
});
