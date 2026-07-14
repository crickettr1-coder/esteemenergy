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
  const parallaxItems = [...document.querySelectorAll(".blog-parallax img")];
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
      const offset = Math.max(-12, Math.min(12, distance * -14));
      image.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
    });
  };
  const requestParallax = () => {
    if (!frame) frame = requestAnimationFrame(updateParallax);
  };
  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax, { passive: true });

  // -------------------------------------------------------------
  // Search and Category Filtering System
  // -------------------------------------------------------------
  const searchInput = document.getElementById("blog-search");
  const clearBtn = document.getElementById("blog-search-clear");
  const filterBtns = document.querySelectorAll(".blog-filter-btn");
  const cards = document.querySelectorAll(".blog-grid .blog-card");
  const featuredCard = document.querySelector(".blog-featured");
  const emptyState = document.getElementById("blog-empty-state");

  let activeCategory = "All Articles";
  let searchQuery = "";

  const updateSearchAndFilters = () => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const title = card.getAttribute("data-title").toLowerCase();
      const summary = card.getAttribute("data-summary").toLowerCase();

      const matchesCategory = activeCategory === "All Articles" || category === activeCategory;
      const matchesSearch = searchQuery === "" || title.includes(searchQuery) || summary.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Hide or show featured article section if search is active
    if (searchQuery !== "" || activeCategory !== "All Articles") {
      if (featuredCard) featuredCard.style.display = "none";
    } else {
      if (featuredCard) featuredCard.style.display = "block";
    }

    // Toggle Empty State
    if (visibleCount === 0) {
      if (emptyState) emptyState.style.display = "flex";
    } else {
      if (emptyState) emptyState.style.display = "none";
    }
  };

  // Category selection handler
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeCategory = btn.getAttribute("data-category-filter");
      updateSearchAndFilters();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (searchQuery.length > 0) {
        if (clearBtn) clearBtn.style.display = "flex";
      } else {
        if (clearBtn) clearBtn.style.display = "none";
      }
      updateSearchAndFilters();
    });

    // Clear search handler
    clearBtn?.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearBtn.style.display = "none";
      searchInput.focus();
      updateSearchAndFilters();
    });
  }
})();
