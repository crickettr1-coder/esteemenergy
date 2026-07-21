(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Scroll Reveal Animations
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  revealItems.forEach((item) => {
    const delay = Number(item.dataset.revealDelay || 0);
    item.style.setProperty("--reveal-delay", `${delay * 90}ms`);
  });

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Parallax Images
  const parallaxItems = [...document.querySelectorAll(".prod-parallax img")];
  let frame = 0;
  const updateParallax = () => {
    frame = 0;
    if (reducedMotion.matches || window.innerWidth < 768) {
      parallaxItems.forEach((image) => image.style.removeProperty("--parallax-y"));
      return;
    }
    const midpoint = window.innerHeight / 2;
    parallaxItems.forEach((image) => {
      const rect = image.parentElement.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - midpoint) / window.innerHeight;
      const offset = Math.max(-16, Math.min(16, distance * -18));
      image.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    });
  };
  const requestParallax = () => {
    if (!frame) frame = requestAnimationFrame(updateParallax);
  };
  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax, { passive: true });

  // Interactive Accordion (FAQs)
  const faqItems = document.querySelectorAll(".product-faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".product-faq-trigger");
    const content = item.querySelector(".product-faq-content");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      
      // Close all other accordion items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        otherItem.querySelector(".product-faq-trigger")?.setAttribute("aria-expanded", "false");
      });

      // Toggle state for current item
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Animated Chart Bars on Scroll
  const chartRows = document.querySelectorAll(".prod-chart-row");
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        chartObserver.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    chartRows.forEach((row) => chartObserver.observe(row));
  } else {
    chartRows.forEach((row) => row.classList.add("is-visible"));
  }
})();
