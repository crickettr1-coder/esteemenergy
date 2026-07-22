(() => {
  const menuLabels = [
    "About", "Pricing", "Products",
    "Gallery", "Blogs", "Reviews", "Contact",
  ];

  const mobileMenuLabels = [
    "About", "Pricing", "Products",
    "Gallery", "Blogs", "Reviews", "Contact",
  ];

  const menuRoutes = Object.freeze({
    Home: "/",
    About: "/about/",
    Packages: "/packages/",
    Pricing: "/pricing/",
    Gallery: "/our-gallery/",
    Blogs: "/blogs/",
    Reviews: "/reviews/",
    Contact: "/contact-us/",
  });

  const productLinks = Object.freeze([
    ["6.6kW Solar System", "/6-6-kw-solar-system/"],
    ["10.5kW Solar System", "/10-5-kw-solar-system/"],
    ["13.2kW Solar System", "/13-2-kw-solar-system/"],
    ["19.5kW Solar System", "/19-5-kw-solar-system/"],
    ["Battery Storage", "/battery-storage/"],
    ["Residential Solar", "/residential-solar/"],
    ["Installation", "/installation/"],
  ]);

  const chevron = `
    <svg class="solaris-chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const arrow = `
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h9.2M9.8 5.6 13.2 9l-3.4 3.4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const currentPath = () => window.location.pathname.replace(/\/+$/, "") || "/";

  const markBlogPostPage = () => {
    const isBlogPost = Boolean(document.querySelector('script[src*="blog-post.js"]'))
      || currentPath().startsWith("/blogs/articles/");
    const isBlogListing = currentPath() === "/blogs";
    document.body.classList.toggle("blog-post-page", isBlogPost);
    document.body.classList.toggle("blog-listing-page", isBlogListing);
  };

  const makeItem = (label, mobile = false) => {
    const route = menuRoutes[label];
    if (label === "Products") {
      const wrapper = document.createElement("div");
      wrapper.className = `solaris-nav-dropdown${mobile ? " solaris-nav-dropdown--mobile" : ""}`;
      const menuId = `${mobile ? "mobile" : "desktop"}-products-menu`;
      const submenu = document.createElement("div");
      submenu.className = "solaris-products-menu";
      submenu.id = menuId;
      submenu.setAttribute("aria-label", "Solar products");
      const submenuLinks = mobile
        ? [["View All Products", "/products/"], ...productLinks]
        : productLinks;
      submenu.innerHTML = submenuLinks.map(([productLabel, productRoute]) =>
        `<a href="${productRoute}">${productLabel}</a>`).join("");
      const submenuLink = [...submenu.querySelectorAll("a")]
        .find((link) => currentPath() === link.getAttribute("href").replace(/\/+$/, ""));
      if (submenuLink) submenuLink.setAttribute("aria-current", "page");

      if (mobile) {
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", menuId);
        toggle.setAttribute("aria-label", "Toggle Products menu");
        toggle.className = "solaris-mobile-nav-item";
        toggle.innerHTML = `<span>${label}</span>${chevron}`;
        if (submenuLink) toggle.classList.add("is-active");
        toggle.addEventListener("click", () => {
          const isOpen = wrapper.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", String(isOpen));
        });
        wrapper.addEventListener("keydown", (event) => {
          if (event.key !== "Escape") return;
          wrapper.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        });
        wrapper.append(toggle, submenu);
      } else {
        const productsLink = document.createElement("a");
        productsLink.className = "solaris-nav-item solaris-products-link";
        productsLink.href = "/products/";
        productsLink.textContent = label;
        productsLink.addEventListener("click", (event) => {
          event.stopPropagation();
        });
        if (currentPath() === "/products") {
          productsLink.classList.add("is-active");
          productsLink.setAttribute("aria-current", "page");
        } else if (submenuLink) {
          productsLink.classList.add("is-active");
        }
        const productsChevron = document.createElement("span");
        productsChevron.className = "solaris-products-chevron";
        productsChevron.setAttribute("aria-hidden", "true");
        productsChevron.innerHTML = chevron;
        wrapper.append(productsLink, productsChevron, submenu);
      }
      return wrapper;
    }
    const item = document.createElement(route ? "a" : "button");
    if (route) {
      item.href = route;
      if (currentPath() === route.replace(/\/+$/, "")) {
        item.classList.add("is-active");
        item.setAttribute("aria-current", "page");
      }
    } else {
      item.type = "button";
      item.addEventListener("click", (event) => event.preventDefault());
    }
    item.classList.add(mobile ? "solaris-mobile-nav-item" : "solaris-nav-item");
    item.innerHTML = `<span>${label}</span>${label === "Products" ? chevron : ""}`;
    return item;
  };

  const updateFooterNavigationLinks = () => {
    document.querySelectorAll("footer .site-footer-nav, footer .framer-by8pig").forEach((list) => {
      let pricingLink = [...list.querySelectorAll("a")]
        .find((link) => /^(packages|pricing)$/i.test(link.textContent.trim()));

      list.querySelectorAll("a").forEach((link) => {
        if (!/^about(?: us)?$/i.test(link.textContent.trim())) return;
        link.href = "/about/";
        const label = link.querySelector("p") || link;
        if (label.textContent.trim() !== "About Us") label.textContent = "About Us";
        if (currentPath() === "/about") link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });

      if (!pricingLink) {
        pricingLink = document.createElement("a");
        pricingLink.className = "esteem-footer-pricing-link";
        pricingLink.textContent = "Pricing";
        const aboutLink = [...list.querySelectorAll("a")]
          .find((link) => /^about us$/i.test(link.textContent.trim()));
        const aboutItem = aboutLink?.parentElement;
        if (aboutItem && aboutItem !== list) aboutItem.insertAdjacentElement("afterend", pricingLink);
        else list.append(pricingLink);
      }

      pricingLink.href = "/pricing/";
      const pricingLabel = pricingLink.querySelector("p") || pricingLink;
      if (pricingLabel.textContent.trim() !== "Pricing") pricingLabel.textContent = "Pricing";
      if (currentPath() === "/pricing") pricingLink.setAttribute("aria-current", "page");
      else pricingLink.removeAttribute("aria-current");
    });
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

  const makeQuoteButton = (extraClass = "") => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `solaris-quote-cta ${extraClass}`.trim();
    button.setAttribute("data-open-quote-modal", "");
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", "solar-lead-dialog");
    button.innerHTML = `
      <span class="solaris-quote-fill" aria-hidden="true"></span>
      <span class="solaris-quote-label">Get Quote</span>
      <span class="solaris-quote-arrow">${arrow}</span>`;
    return button;
  };

  const initHeader = () => {
    const originalHeader = document.querySelector(".site-header-source, .framer-efto20-container");
    const originalLogo = originalHeader?.querySelector(".site-brand, .framer-yi202p-container")
      || document.querySelector(".site-brand, .framer-yi202p-container");
    if (document.querySelector(".solaris-site-header")) return;

    const header = document.createElement("header");
    header.className = "solaris-site-header site-header-source";
    header.setAttribute("aria-label", "Site header");

    const inner = document.createElement("div");
    inner.className = "solaris-header-inner";

    const brand = document.createElement("div");
    brand.className = "solaris-brand site-brand";
    if (originalLogo) {
      brand.append(originalLogo.cloneNode(true));
    } else {
      brand.innerHTML = '<a href="/" aria-label="Esteem Energy home"><span>Esteem Energy</span></a>';
    }
    const brandLink = brand.querySelector("a");
    if (brandLink) {
      brandLink.href = "/";
      brandLink.setAttribute("aria-label", "Esteem Energy home");
    }

    const desktopNav = document.createElement("nav");
    desktopNav.className = "solaris-nav";
    desktopNav.setAttribute("aria-label", "Visual menu options");
    menuLabels.forEach((label) => desktopNav.append(makeItem(label)));

    const cta = document.createElement("div");
    cta.className = "solaris-header-cta";
    cta.append(makeQuoteButton());

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "solaris-menu-toggle";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "solaris-mobile-menu");
    toggle.innerHTML = "<span></span><span></span>";

    const mobileMenu = document.createElement("nav");
    mobileMenu.className = "solaris-mobile-menu";
    mobileMenu.id = "solaris-mobile-menu";
    mobileMenu.setAttribute("aria-label", "Mobile visual menu options");
    (currentPath() === "/" ? menuLabels : mobileMenuLabels).forEach((label) => mobileMenu.append(makeItem(label, true)));
    mobileMenu.append(makeQuoteButton("solaris-mobile-quote"));

    const closeProducts = () => {
      mobileMenu.querySelectorAll(".solaris-nav-dropdown.is-open").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        dropdown.querySelector(".solaris-mobile-nav-item")?.setAttribute("aria-expanded", "false");
      });
    };

    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      mobileMenu.classList.remove("is-open");
      document.body.classList.remove("solaris-mobile-menu-open");
      closeProducts();
    };

    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
      mobileMenu.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("solaris-mobile-menu-open", willOpen);
    });

    mobileMenu.querySelector("[data-open-quote-modal]").addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    const desktopViewport = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = (event) => {
      if (event.matches) closeMenu();
    };
    if (typeof desktopViewport.addEventListener === "function") desktopViewport.addEventListener("change", closeOnDesktop);
    else desktopViewport.addListener(closeOnDesktop);

    inner.append(brand, desktopNav, cta, toggle, mobileMenu);
    header.append(inner);
    document.body.prepend(header);
    originalHeader?.remove();

    // Inject footer if missing (e.g., on content pages)
    if (!document.querySelector("footer")) {
      const footer = document.createElement("footer");
      footer.className = "site-footer framer-UEkM5";
      footer.setAttribute("aria-label", "Site footer");
      footer.innerHTML = `
        <div class="framer-1i9yief">
          <div class="footer-grid framer-4ecdkv">
            <div class="framer-jeyeg9">
              <div class="framer-1c3gdfr"><a name="Company Logo" href="/" aria-label="Esteem Energy home"><span>Esteem Energy</span></a></div>
              <div class="footer-description framer-1fujns7"><p>Helping Australian homes and businesses reduce electricity bills with premium solar panel systems, battery storage solutions, and professional installations nationwide.</p></div>
            </div>
            <div class="framer-1rsz38m">
              <div class="framer-32fdza">
                <h2>Quick Links</h2>
                <nav class="site-footer-nav framer-by8pig" aria-label="Footer navigation">
                  <a href="/">Home</a>
                  <a href="/about">About Us</a>
                  <a href="/contact-us/">Contact</a>
                </nav>
              </div>
              <div class="footer-contact framer-166c3sd">
                <h2>Contact Us</h2>
                <div class="framer-vm55zi">
                  <div class="footer-email framer-n9us4s">
                    <div class="framer-1yowo8r">
                      <p><a href="mailto:info@esteemenergy.com.au">info@esteemenergy.com.au</a></p>
                    </div>
                  </div>
                  <div class="footer-phone framer-1top3uf">
                    <div class="framer-18bz7kj">
                      <p><a href="tel:1300220354">1300 220 354</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="framer-c5fo9j"><div class="footer-legal framer-vixlb5"></div></div>
        </div>`;
      document.body.append(footer);
    }

    updateFooterNavigationLinks();
    normalizeLegacyPageLinks();
    normalizeCanonicalUrl();

    const updateScrollState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 28);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
  };

  let enhancementTimer;
  const runEnhancements = () => {
    markBlogPostPage();
    initHeader();
    if (!document.querySelector(".solaris-site-header")) {
      enhancementTimer = window.setTimeout(runEnhancements, 50);
      return;
    }
    updateFooterNavigationLinks();
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

/* Homepage hero migration: replace the exported Framer subtree with semantic markup. */
(() => {
  if (window.location.pathname !== "/") return;

  const hero = document.querySelector("#hero");
  if (!hero) return;

  const imageBase = "/assets/homepage/";
  hero.outerHTML = `
    <section class="esteem-hero home-hero" id="hero" aria-labelledby="esteem-hero-title">
      <picture class="esteem-hero__background" aria-hidden="true">
        <source media="(max-width: 809px)" srcset="${imageBase}Ss87WdLoqtNCvaghtqpXQxsznjk.png 1376w">
        <img src="${imageBase}Ss87WdLoqtNCvaghtqpXQxsznjk.png"
          srcset="${imageBase}Ss87WdLoqtNCvaghtqpXQxsznjk.png 1376w"
          sizes="100vw" width="1376" height="768" alt="" fetchpriority="high" decoding="async">
      </picture>
      <div class="esteem-hero__content hero-content">
        <div class="esteem-hero__main">
          <div class="esteem-hero__badge" aria-label="Trusted by Australian homeowners">
            <span class="esteem-hero__badge-label">Trusted</span>
            <span class="esteem-hero__badge-caption">by Australian homeowners</span>
          </div>
          <div class="esteem-hero__copy hero-copy">
            <h1 class="hero-title" id="esteem-hero-title">Solar energy that moves the world forward</h1>
            <p class="hero-description">Powering Australian homes and businesses with reliable solar solutions designed to reduce energy costs and support a cleaner future.</p>
          </div>
          <div class="esteem-hero__actions hero-actions">
            <button class="esteem-primary-cta" type="button" data-open-quote-modal aria-haspopup="dialog" aria-controls="solar-lead-dialog">
              <span class="esteem-cta-label">Get a Free Quote</span>
              <span class="esteem-cta-arrow" aria-hidden="true">→</span>
            </button>
            <a class="esteem-secondary-cta" href="tel:1300220354">
              <span>Talk to Our Solar Team</span>
              <span class="esteem-cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <figure class="esteem-hero__roofing hero-media">
          <img src="${imageBase}0fHDe2iBdq8jcNJtLJtaRz2EiXc.png"
            srcset="${imageBase}0fHDe2iBdq8jcNJtLJtaRz2EiXc.png 2794w"
            sizes="100vw" width="2794" height="1005" alt="Modern house with solar panels, large windows, and a parked car" decoding="async">
        </figure>
      </div>
      <div class="esteem-hero__noise hero-noise" aria-hidden="true"></div>
    </section>`;

  const cleanHero = document.querySelector(".esteem-hero");
  if (!cleanHero) return;
  requestAnimationFrame(() => cleanHero.classList.add("is-visible"));
})();

/* Remove only Framer variant/editor markers proven absent from CSS, JS, SVG, and accessibility hooks. */
(() => {
  if (window.location.pathname !== "/") return;

  const unusedFramerClasses = [
    "framer-v-1r6zuo6",
    "framer-v-ot39b8",
    "framer-v-1wutdf1",
    "framer-v-qeqjnn",
    "framer-v-bpmy6d",
    "framer-v-cqfbub",
    "framer-v-19hst88",
    "framer-v-1t3xj7z",
    "framer-v-1svph5",
    "framer-v-1hbx9k8",
    "framer-v-1o6fz0m",
    "framer-6jWyo",
    "framer-n0ccwk",
    "framer-v-n0ccwk",
    "framer-bmpgw8",
    "framer-13yxzio",
    "framer-19yaanm",
    "framer-1kflzx5",
    "framer-hcsc7",
    "framer-e50co",
    "framer-g7oZR",
    "framer-1um7t9d",
    "framer-j4ugry",
    "framer-jnuwbw"
  ];
  const unusedFramerAttributes = [
    "data-framer-font-css",
    "data-framer-css-ssr-minified",
    "data-framer-components",
    "data-framer-css",
    "data-framer-hydrate-v2",
    "data-framer-generated-page",
    "data-framer-html-style",
    "data-framer-layout-hint-center-x",
    "data-framer-root"
  ];
  const unusedFramerVariables = [
    "--framer-viewport-height",
    "--framer-blockquote-text-alignment",
    "--framer-font-variation-axes-preview",
    "--framer-blockquote-text-background-radius",
    "--framer-blockquote-text-background-corner-shape",
    "--framer-blockquote-text-background-padding",
    "--framer-blockquote-font-family-italic",
    "--framer-blockquote-font-style-italic",
    "--framer-blockquote-font-weight-italic",
    "--framer-blockquote-font-variation-axes-italic",
    "--framer-font-variation-axes-italic",
    "--framer-blockquote-font-family-bold-italic",
    "--framer-blockquote-font-style-bold-italic",
    "--framer-blockquote-font-weight-bold-italic",
    "--framer-blockquote-font-variation-axes-bold-italic",
    "--framer-font-variation-axes-bold-italic",
    "--framer-blockquote-paragraph-spacing",
    "--framer-custom-cursors"
  ];

  const cleanUnusedFramerArtifacts = () => {
    document.querySelectorAll("[class]").forEach((element) => {
      unusedFramerClasses.forEach((className) => element.classList.remove(className));
    });
    document.querySelectorAll("*").forEach((element) => {
      unusedFramerAttributes.forEach((attributeName) => element.removeAttribute(attributeName));
    });
    document.querySelectorAll("html, body, #main").forEach((element) => {
      unusedFramerVariables.forEach((variableName) => element.style.removeProperty(variableName));
    });
    document.querySelectorAll("style, link[rel=stylesheet]").forEach((sheetElement) => {
      try {
        const visitRules = (rules) => {
          Array.from(rules || []).forEach((rule) => {
            if (rule.style) unusedFramerVariables.forEach((variableName) => rule.style.removeProperty(variableName));
            if (rule.cssRules) visitRules(rule.cssRules);
          });
        };
        visitRules(sheetElement.sheet?.cssRules);
      } catch {
        /* Cross-origin stylesheets are left untouched. */
      }
    });
  };

  if (document.readyState === "complete") {
    cleanUnusedFramerArtifacts();
  } else {
    window.addEventListener("load", cleanUnusedFramerArtifacts, { once: true });
  }
})();
