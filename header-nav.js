(() => {
  const menuLabels = [
    "About", "Pricing", "Products",
    "Gallery", "Blogs", "Reviews", "Contact",
  ];

  const mobileMenuLabels = [
    "Home", "About", "Packages", "Products",
    "Gallery", "Blogs", "Reviews", "Contact",
  ];

  const menuRoutes = Object.freeze({
    Home: "/",
    About: "/about",
    Packages: "/packages",
    Pricing: "/pricing",
    Gallery: "/our-gallery/",
    Blogs: "/blogs",
    Reviews: "/reviews/",
    Contact: "/contact",
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
    document.querySelectorAll("footer .framer-by8pig").forEach((list) => {
      let pricingLink = [...list.querySelectorAll("a")]
        .find((link) => /^(packages|pricing)$/i.test(link.textContent.trim()));

      list.querySelectorAll("a").forEach((link) => {
        if (!/^about(?: us)?$/i.test(link.textContent.trim())) return;
        link.href = "/about";
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

      pricingLink.href = "/pricing";
      const pricingLabel = pricingLink.querySelector("p") || pricingLink;
      if (pricingLabel.textContent.trim() !== "Pricing") pricingLabel.textContent = "Pricing";
      if (currentPath() === "/pricing") pricingLink.setAttribute("aria-current", "page");
      else pricingLink.removeAttribute("aria-current");
    });
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
    const originalHeader = document.querySelector(".framer-efto20-container");
    const originalLogo = originalHeader?.querySelector(".framer-yi202p-container");
    if (!originalHeader || !originalLogo || document.querySelector(".solaris-site-header")) return;

    const header = document.createElement("header");
    header.className = "solaris-site-header";
    header.setAttribute("aria-label", "Site header");

    const inner = document.createElement("div");
    inner.className = "solaris-header-inner";

    const brand = document.createElement("div");
    brand.className = "solaris-brand";
    brand.append(originalLogo.cloneNode(true));
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
    mobileMenuLabels.forEach((label) => mobileMenu.append(makeItem(label, true)));
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

    const desktopViewport = window.matchMedia("(min-width: 1025px)");
    const closeOnDesktop = (event) => {
      if (event.matches) closeMenu();
    };
    if (typeof desktopViewport.addEventListener === "function") desktopViewport.addEventListener("change", closeOnDesktop);
    else desktopViewport.addListener(closeOnDesktop);

    inner.append(brand, desktopNav, cta, toggle, mobileMenu);
    header.append(inner);
    document.body.prepend(header);
    document.body.classList.add("header-upgraded");
    updateFooterNavigationLinks();

    const updateScrollState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 28);
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeader, { once: true });
  } else {
    initHeader();
  }
  document.addEventListener("framer:pageview", updateFooterNavigationLinks);
})();
