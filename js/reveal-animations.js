(() => {
  const root = document.documentElement;
  const statsGrid = document.querySelector(".stats-grid, [data-framer-name=\"Stat Cards\"]");
  if (statsGrid) {
    statsGrid.classList.add("stats-grid");
    statsGrid.setAttribute("data-esteem-reveal", "");
    statsGrid.setAttribute("data-esteem-reveal-delay", "0");
    statsGrid.style.removeProperty("will-change");
    statsGrid.style.removeProperty("opacity");
    statsGrid.style.removeProperty("transform");
  }

  const elements = [...document.querySelectorAll("[data-esteem-reveal]")];
  if (!elements.length) return;

  root.classList.add("esteem-reveal-ready");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const reveal = (element) => {
    element.style.setProperty("--esteem-reveal-delay", `${Number(element.dataset.esteemRevealDelay || 0) * 100}ms`);
    element.classList.add("is-esteem-revealed");
  };

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

  elements.forEach((element) => observer.observe(element));
})();
