(() => {
  const menuLabels = [
    "Home", "About", "Packages", "Products",
    "Gallery", "Blogs", "Reviews", "Contact",
  ];

  const chevron = `
    <svg class="solaris-chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const makeItem = (label, mobile = false) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = mobile ? "solaris-mobile-nav-item" : "solaris-nav-item";
    button.innerHTML = `<span>${label}</span>${label === "Products" ? chevron : ""}`;
    button.addEventListener("click", (event) => event.preventDefault());
    return button;
  };

  const initHeader = () => {
    const originalHeader = document.querySelector(".framer-efto20-container");
    const originalLogo = originalHeader?.querySelector(".framer-yi202p-container");
    const originalCta = originalHeader?.querySelector(".framer-mt5eyy-container");
    if (!originalHeader || !originalLogo || !originalCta) return;

    const header = document.createElement("header");
    header.className = "solaris-site-header";
    header.setAttribute("aria-label", "Site header");

    const inner = document.createElement("div");
    inner.className = "solaris-header-inner";

    const brand = document.createElement("div");
    brand.className = "solaris-brand";
    brand.append(originalLogo.cloneNode(true));

    const desktopNav = document.createElement("nav");
    desktopNav.className = "solaris-nav";
    desktopNav.setAttribute("aria-label", "Visual menu options");
    menuLabels.forEach((label) => desktopNav.append(makeItem(label)));

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "solaris-menu-toggle";
    toggle.setAttribute("aria-label", "Toggle menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span><span></span>";

    const cta = document.createElement("div");
    cta.className = "solaris-header-cta";
    cta.append(originalCta.cloneNode(true));

    const mobileMenu = document.createElement("nav");
    mobileMenu.className = "solaris-mobile-menu";
    mobileMenu.setAttribute("aria-label", "Mobile visual menu options");
    menuLabels.forEach((label) => mobileMenu.append(makeItem(label, true)));

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.classList.toggle("is-open", !isOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
    });

    inner.append(brand, desktopNav, toggle, cta, mobileMenu);
    header.append(inner);
    document.body.prepend(header);
    document.body.classList.add("header-upgraded");

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
})();
