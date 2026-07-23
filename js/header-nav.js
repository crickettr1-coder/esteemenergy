(() => {
  const currentPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

  const markBlogPostPage = () => {
    const isBlogPost = Boolean(document.querySelector('script[src*="blog-post.js"]'))
      || currentPath().startsWith("/blogs/articles/");
    const isBlogListing = currentPath() === "/blogs";
    document.body.classList.toggle("blog-post-page", isBlogPost);
    document.body.classList.toggle("blog-listing-page", isBlogListing);
  };

  const genuineTestimonials = Object.freeze([
    ["D Mann", "Very professional and friendly. Excellent quality product and great workmanship. The team was prompt and handled everything perfectly."],
    ["Singh I.", "Very professional work done by Esteem Energy. Overall was happy with the timely and efficient installation of solar panels and inverter."],
    ["Joma", "Clean work. Very helpful app to follow my usage. The team arrived exactly when verified and finished the job without any mess."],
    ["Nathan M.", "I couldn't be happier with the results. Even on cloudy days, the system is still generating a surprising amount of energy."],
  ]);

  const replaceExactText = (from, to) => {
    document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,span,li").forEach((element) => {
      if (element.textContent.trim() === from) element.textContent = to;
    });
  };

  const replaceContainingText = (from, to) => {
    document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,span,li").forEach((element) => {
      if (element.children.length === 0 && element.textContent.includes(from)) {
        element.textContent = element.textContent.replace(from, to);
      }
    });
  };

  const normalizeLegacyPageLinks = () => {
    const routeByHash = Object.freeze({
      "#about": "/about/",
      "#solution": "/products/",
      "#projects": "/our-gallery/",
      "#packages": "/pricing/",
      "#contact": "/contact-us/",
    });
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const hash = href.match(/#(?:about|solution|projects|packages|contact)$/i)?.[0]?.toLowerCase();
      if (!hash || !routeByHash[hash]) return;
      link.href = routeByHash[hash];
    });
  };

  const normalizeCanonicalUrl = () => {
    const path = currentPath() === "/" ? "/" : `${currentPath()}/`;
    const canonical = new URL(path, window.location.origin).href;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);
  };

  const stabilizeHomepageStats = () => {
    if (currentPath() !== "/") return;

    const values = new Map([
      ["Solar experience", "Experienced Team"],
      ["Australian solar projects", "Australia-Wide"],
      ["Panel warranty", "25 Years"],
    ]);

    document.querySelectorAll('.stats-label, [data-framer-name="Properties under management"]').forEach((labelContainer) => {
      const label = labelContainer.querySelector("p")?.textContent.trim();
      const value = values.get(label);
      const card = labelContainer.closest('.stats-card, [data-framer-name^="Stat Card"]');
      if (!value || !card) return;
      card.querySelectorAll(".stats-value p, .framer-1b4edkh-container p").forEach((element) => {
        element.textContent = value;
      });
    });
  };

  const cleanupTemplateContent = () => {
    document.querySelectorAll('.review-quote, [data-framer-name="Review Quote Text"] p').forEach((element, index) => {
      element.textContent = `“${genuineTestimonials[index % genuineTestimonials.length][1]}”`;
    });
    document.querySelectorAll('.review-author, [data-framer-name="User Name Label"] p').forEach((element, index) => {
      element.textContent = genuineTestimonials[index % genuineTestimonials.length][0];
    });

    replaceExactText("Have questions about Salesflow?", "Have questions about solar panels, batteries, installation or system sizing?");
    replaceExactText("Here are some of the most common queries to help you get started.", "Here are answers to common questions from Australian homeowners.");
    if (currentPath() !== "/") replaceExactText("by 500+ Homeowners", "for Australian homeowners");
    replaceExactText("Solar Industry Experience", "Solar experience");
    replaceExactText("Solar Projects Installed", "Australian solar projects");
    replaceExactText("Panel Performance Warranty", "Panel warranty");
    replaceExactText("Delivering reliable solar energy solutions with years of expertise in residential and commercial installations.", "Advice and installation planning for residential and commercial solar projects.");
    replaceExactText("Successfully installed solar systems powering homes and businesses with clean renewable energy solutions worldwide.", "Solar systems planned for Australian homes and businesses, subject to property and network requirements.");
    replaceExactText("High-quality solar panels designed to deliver long-term performance and sustainable energy production.", "Warranty terms depend on the selected equipment and quotation.");
    replaceExactText("Enjoy up to 70% savings on energy bills with solar panels and smart storage.", "Understand your potential energy savings with solar panels and smart storage.");
    replaceExactText("Professional installation completed by certified technicians.", "Professional installation planned around your property and system requirements.");
    replaceExactText("Certified solar technicians", "Professional solar installation");

    replaceExactText("Let’s Talk About Your Health Needs", "Let’s Talk About Your Solar Plans");
    replaceExactText("Contact us for appointments, inquiries, or support - our team is here to guide you every step of the way.", "Contact us about solar panels, battery storage, installation or support.");
    replaceContainingText("Health Needs", "Solar Plans");
    replaceContainingText("appointments, inquiries, or support", "solar panels, battery storage, installation or support");
    document.querySelectorAll('input[placeholder="John Carter"]').forEach((element) => { element.placeholder = "Your name"; });
    document.querySelectorAll('input[placeholder="+1 (555) 234-5678"]').forEach((element) => { element.placeholder = "Your phone number"; });
    document.querySelectorAll("input,textarea").forEach((element) => {
      if (!element.placeholder.includes("framer.com")) return;
      element.placeholder = element.tagName === "TEXTAREA" ? "Tell us about your solar plans" : "name@example.com";
    });

    document.querySelectorAll("#__framer-badge-container, .__framer-badge").forEach((element) => element.remove());
  };

  const stabilizeHomepageHero = () => {
    if (currentPath() !== "/") return;

    const badge = document.querySelector("#hero .esteem-hero__badge-caption");
    if (badge) badge.textContent = "by Australian homeowners";

    const paragraph = document.querySelector("#hero .hero-description, #hero .hero-copy p, #hero .esteem-hero__copy p");
    if (paragraph) paragraph.textContent = "Powering Australian homes and businesses with reliable solar solutions designed to reduce energy costs and support a cleaner future.";

    document.querySelectorAll('#hero .esteem-cta-arrow').forEach((arrowElement) => {
      arrowElement.textContent = "→";
      arrowElement.setAttribute("aria-hidden", "true");
    });
  };

  const initHomepageTestimonials = () => {
    if (currentPath() !== "/" || document.documentElement.dataset.testimonialsReady) return;

    const carousel = Array.from(document.querySelectorAll('.testimonials-carousel, [data-framer-name="Testimonials Carousel"]'))
      .find((element) => Array.from(element.querySelectorAll("div")).some((node) => /rotateY\(/.test(node.style.transform)));
    if (!carousel) return;

    const ring = Array.from(carousel.querySelectorAll("div"))
      .find((node) => /rotateY\(/.test(node.style.transform));
    if (!ring) return;

    document.documentElement.dataset.testimonialsReady = "true";
    carousel.classList.add("testimonials-carousel", "esteem-testimonial-autoplay");
    ring.classList.add("testimonials-track");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = carousel.querySelectorAll('.testimonial-card, [data-framer-name="Review Card"]');
    cards.forEach((card) => card.classList.add("testimonial-card"));
    const stepAngle = 360 / Math.max(cards.length, 1);
    const initialMatch = ring.style.transform.match(/rotateY\((-?[\d.]+)deg\)/);
    let angle = initialMatch ? Number(initialMatch[1]) : 0;
    let paused = false;
    let dragging = false;
    let lastX = 0;
    let resumeTimer = 0;
    let autoplayTimer = 0;

    const setAngle = (animate) => {
      ring.classList.toggle("is-testimonial-animating", animate && !reducedMotion.matches);
      ring.style.transform = `rotateY(${angle}deg)`;
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };

    const resume = (delay = 900) => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        paused = false;
      }, delay);
    };

    const advance = () => {
      if (paused || dragging || reducedMotion.matches) return;
      angle -= stepAngle;
      setAngle(true);
    };

    carousel.addEventListener("mouseenter", pause, { passive: true });
    carousel.addEventListener("mouseleave", () => resume(0), { passive: true });
    carousel.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      pause();
      lastX = event.clientX;
      ring.classList.remove("is-testimonial-animating");
      carousel.setPointerCapture?.(event.pointerId);
    }, { passive: true });
    carousel.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const delta = event.clientX - lastX;
      if (Math.abs(delta) > 0) {
        angle += delta * 0.45;
        setAngle(false);
        lastX = event.clientX;
      }
    }, { passive: true });
    const finishDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      if (event?.pointerId !== undefined) carousel.releasePointerCapture?.(event.pointerId);
      resume(1200);
    };
    carousel.addEventListener("pointerup", finishDrag, { passive: true });
    carousel.addEventListener("pointercancel", finishDrag, { passive: true });
    carousel.addEventListener("touchstart", pause, { passive: true });
    carousel.addEventListener("touchend", () => resume(1200), { passive: true });

    autoplayTimer = window.setInterval(advance, 4000);
    window.addEventListener("pagehide", () => {
      window.clearInterval(autoplayTimer);
      window.clearTimeout(resumeTimer);
    }, { once: true, passive: true });
  };

  const initHeaderBehavior = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const toggle = header.querySelector(".site-menu-toggle");
    const mobileMenu = header.querySelector(".site-mobile-menu");
    const mobileDropdownToggle = header.querySelector(".site-nav-dropdown--mobile .site-nav-dropdown-toggle");
    const mobileDropdown = header.querySelector(".site-nav-dropdown--mobile .site-products-menu");

    if (toggle && mobileMenu) {
      const closeMenu = () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        mobileMenu.classList.remove("is-open");
        document.body.classList.remove("site-mobile-menu-open");
        if (mobileDropdown) {
          mobileDropdown.style.display = "none";
          if (mobileDropdownToggle) mobileDropdownToggle.setAttribute("aria-expanded", "false");
        }
      };

      toggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        document.body.classList.toggle("site-mobile-menu-open", isOpen);
      });

      // Close menu on link clicks or lead modal trigger
      mobileMenu.querySelectorAll("a, button[data-open-quote-modal]").forEach((element) => {
        element.addEventListener("click", closeMenu);
      });

      // Escape key to close
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
      });

      // Outside click close
      document.addEventListener("click", (event) => {
        if (!header.contains(event.target)) {
          closeMenu();
        }
      });

      // Desktop viewport transition close
      const desktopViewport = window.matchMedia("(min-width: 1200px)");
      desktopViewport.addEventListener("change", (e) => {
        if (e.matches) closeMenu();
      });
    }

    // Mobile products dropdown toggle
    if (mobileDropdownToggle && mobileDropdown) {
      mobileDropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = mobileDropdown.style.display === "grid";
        mobileDropdown.style.display = isOpen ? "none" : "grid";
        mobileDropdownToggle.setAttribute("aria-expanded", String(!isOpen));
      });
    }

    // Scroll state trigger
    const updateScrollState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 28);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
  };

  const ensureHeaderExists = () => {
    let header = document.querySelector(".site-header");
    if (!header) {
      header = document.createElement("header");
      header.className = "site-header site-header-source";
      header.setAttribute("aria-label", "Site header");
      header.innerHTML = `
  <div class="site-header-inner">
    <div class="site-brand">
      <a href="/" aria-label="Esteem Energy home" class="esteem-energy-logo-link">
        <img class="esteem-energy-logo esteem-energy-logo--header" src="/assests/esteem%20energy%20logo.png" alt="Esteem Energy" decoding="async">
      </a>
    </div>
    
    <nav class="site-navigation" aria-label="Primary navigation">
      <div class="site-nav-list">
        <a class="site-nav-link site-nav-item" href="/">Home</a>
        <a class="site-nav-link site-nav-item" href="/about/">About</a>
        
        <div class="site-nav-dropdown">
          <a class="site-nav-link site-nav-item site-products-link" href="/products/">Products</a>
          <span class="site-nav-dropdown-toggle" aria-hidden="true">
            <svg class="solaris-chevron" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div class="site-products-menu" aria-label="Solar products">
            <a href="/products/">View All Products</a>
            <a href="/6-6-kw-solar-system/">6.6kW Solar System</a>
            <a href="/10-5-kw-solar-system/">10.5kW Solar System</a>
            <a href="/13-2-kw-solar-system/">13.2kW Solar System</a>
            <a href="/19-5-kw-solar-system/">19.5kW Solar System</a>
            <a href="/battery-storage/">Battery Storage</a>
            <a href="/residential-solar/">Residential Solar</a>
            <a href="/installation/">Installation</a>
          </div>
        </div>

        <a class="site-nav-link site-nav-item" href="/pricing/">Pricing</a>
        <a class="site-nav-link site-nav-item" href="/our-gallery/">Gallery</a>
        <a class="site-nav-link site-nav-item" href="/blogs/">Blogs</a>
        <a class="site-nav-link site-nav-item" href="/reviews/">Reviews</a>
        <a class="site-nav-link site-nav-item" href="/contact-us/">Contact</a>
      </div>
    </nav>
    
    <div class="site-header-cta">
      <button class="esteem-primary-cta" type="button" data-open-quote-modal aria-haspopup="dialog" aria-controls="solar-lead-dialog">
        <span class="esteem-cta-label">Free Consultation</span>
        <span class="esteem-cta-arrow" aria-hidden="true">→</span>
      </button>
    </div>
    
    <button class="site-menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="site-mobile-menu">
      <span></span><span></span>
    </button>
    
    <nav class="site-mobile-menu" id="site-mobile-menu" aria-label="Mobile primary navigation">
      <a class="site-nav-link site-nav-item" href="/">Home</a>
      <a class="site-nav-link site-nav-item" href="/about/">About</a>
      
      <div class="site-nav-dropdown site-nav-dropdown--mobile">
        <button class="site-nav-link site-nav-item site-nav-dropdown-toggle" type="button" aria-expanded="false" aria-controls="mobile-products-menu" aria-label="Toggle Products menu">
          <span>Products</span>
          <svg class="solaris-chevron" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="site-products-menu" id="mobile-products-menu" aria-label="Solar products">
          <a href="/products/">View All Products</a>
          <a href="/6-6-kw-solar-system/">6.6kW Solar System</a>
          <a href="/10-5-kw-solar-system/">10.5kW Solar System</a>
          <a href="/13-2-kw-solar-system/">13.2kW Solar System</a>
          <a href="/19-5-kw-solar-system/">19.5kW Solar System</a>
          <a href="/battery-storage/">Battery Storage</a>
          <a href="/residential-solar/">Residential Solar</a>
          <a href="/installation/">Installation</a>
        </div>
      </div>
      
      <a class="site-nav-link site-nav-item" href="/pricing/">Pricing</a>
      <a class="site-nav-link site-nav-item" href="/our-gallery/">Gallery</a>
      <a class="site-nav-link site-nav-item" href="/blogs/">Blogs</a>
      <a class="site-nav-link site-nav-item" href="/reviews/">Reviews</a>
      <a class="site-nav-link site-nav-item" href="/contact-us/">Contact</a>
      
      <button class="esteem-primary-cta site-mobile-quote" type="button" data-open-quote-modal aria-haspopup="dialog" aria-controls="solar-lead-dialog">
        <span class="esteem-cta-label">Free Consultation</span>
        <span class="esteem-cta-arrow" aria-hidden="true">→</span>
      </button>
    </nav>
  </div>`;
      document.body.prepend(header);
    }
  };

  let enhancementTimer;
  const runEnhancements = () => {
    ensureHeaderExists();
    markBlogPostPage();
    initHeaderBehavior();
    normalizeLegacyPageLinks();
    normalizeCanonicalUrl();
    stabilizeHomepageHero();
    initHomepageTestimonials();
    cleanupTemplateContent();
    stabilizeHomepageStats();
    window.setTimeout(() => {
      cleanupTemplateContent();
      stabilizeHomepageStats();
    }, 3000);
  };
  const scheduleEnhancements = () => {
    window.clearTimeout(enhancementTimer);
    enhancementTimer = window.setTimeout(runEnhancements, 0);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleEnhancements, { once: true });
  } else {
    scheduleEnhancements();
  }
  document.addEventListener("framer:pageview", () => {
    if (document.readyState === "complete") scheduleEnhancements();
  });
})();
