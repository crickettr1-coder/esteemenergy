(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Normalize FAQs layout dynamically
  const normalizeFAQs = () => {
    const postContent = document.querySelector(".post-content");
    if (!postContent) return;

    let inFaq = false;
    Array.from(postContent.children).forEach((el) => {
      // Check if it is the FAQ section title
      if (el.tagName === "H2" && /faq|frequently asked/i.test(el.textContent)) {
        inFaq = true;
        el.classList.add("faq-section-title");
      } else if (el.tagName === "H2") {
        inFaq = false;
      }

      // Questions can be H3 tags in FAQ section or any A tag with tabindex="0"
      const isQuestion = (inFaq && el.tagName === "H3") || 
                         (el.tagName === "A" && el.getAttribute("tabindex") === "0");

      if (isQuestion) {
        el.classList.add("faq-question");
        // Clean prefix like "1. ", "Q1. ", "Q. " etc.
        let text = el.textContent.trim();
        text = text.replace(/^(?:Q\d*[:.]?|\d+[:.]?)\s*/i, "");
        el.textContent = text;

        // Find the next non-empty sibling node (the answer)
        let next = el.nextSibling;
        while (next && next.nodeType === 3 && !next.textContent.trim()) {
          next = next.nextSibling;
        }

        if (next) {
          if (next.nodeType === 1) {
            next.classList.add("faq-answer");
          } else if (next.nodeType === 3) {
            const p = document.createElement("p");
            p.className = "faq-answer";
            p.textContent = next.textContent.trim();
            next.parentNode.replaceChild(p, next);
          }
        }
      }
    });
  };

  // Ensure Recommended Guides block exists with 4 columns
  const ensureRecommendedGuidesExists = () => {
    const finalSection = document.querySelector(".post-final");
    if (!finalSection) return;

    // Remove existing block to prevent duplicates
    document.querySelectorAll(".post-read-next").forEach((el) => el.remove());

    const nextSection = document.createElement("section");
    nextSection.className = "post-read-next";
    nextSection.innerHTML = `
      <div class="post-read-next-container">
        <h2>Recommended Guides</h2>
        <div class="post-read-next-grid">
          <article class="blog-card">
            <div class="blog-card-visual" style="aspect-ratio:1.8;">
              <img src="/assests/blog-images/how-much-electricity-can-a-6-6-kw-solar-system-produce/featured.png" alt="Understanding Solar System Output">
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta">
                <span class="post-tag">Solar Systems</span>
                <span>5 min read</span>
              </div>
              <h3>
                <a href="/how-much-electricity-can-a-6-6-kw-solar-system-produce/">Understanding Solar System Output & Generation</a>
              </h3>
              <p class="blog-card-excerpt">Explore the expected output ranges, seasonal variations and geographic performance of solar in Australia.</p>
              <a class="blog-read-link" href="/how-much-electricity-can-a-6-6-kw-solar-system-produce/">
                <span>Read Article</span>
                <span class="blog-read-arrow">→</span>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-card-visual" style="aspect-ratio:1.8;">
              <img src="/assests/about/modern-home-solar-panels.webp" alt="Rooftop solar panel installation on home">
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta">
                <span class="post-tag">Solar Systems</span>
                <span>6 min read</span>
              </div>
              <h3>
                <a href="/how-to-choose-the-right-solar-system-size/">How to Choose the Right Solar System Size for Your Home</a>
              </h3>
              <p class="blog-card-excerpt">Learn how household energy use, roof space, and future needs influence the right solar system size.</p>
              <a class="blog-read-link" href="/how-to-choose-the-right-solar-system-size/">
                <span>Read Article</span>
                <span class="blog-read-arrow">→</span>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-card-visual" style="aspect-ratio:1.8;">
              <img src="/assests/blog-images/solar-panel-installation-guide/featured.png" alt="Solar panel installation process">
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta">
                <span class="post-tag">Installation</span>
                <span>7 min read</span>
              </div>
              <h3>
                <a href="/solar-panel-installation-guide/">Essential Questions to Ask Before Installing Solar</a>
              </h3>
              <p class="blog-card-excerpt">What to expect during installation, how to prepare your roof, and how to verify CEC-accredited work.</p>
              <a class="blog-read-link" href="/solar-panel-installation-guide/">
                <span>Read Article</span>
                <span class="blog-read-arrow">→</span>
              </a>
            </div>
          </article>

          <article class="blog-card">
            <div class="blog-card-visual" style="aspect-ratio:1.8;">
              <img src="/assests/blogs/energy-monitoring.jpg" alt="Customer tracking energy output on app">
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta">
                <span class="post-tag">Solar Savings</span>
                <span>5 min read</span>
              </div>
              <h3>
                <a href="/solar-panels-vs-electricity-bills-savings/">Solar Panels vs Bills: Understanding Savings</a>
              </h3>
              <p class="blog-card-excerpt">How solar displacement reduces your quarterly bills and key factors that maximize your return.</p>
              <a class="blog-read-link" href="/solar-panels-vs-electricity-bills-savings/">
                <span>Read Article</span>
                <span class="blog-read-arrow">→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    `;

    finalSection.parentNode.insertBefore(nextSection, finalSection);
  };

  // Run on page load
  normalizeFAQs();
  ensureRecommendedGuidesExists();

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
})();
