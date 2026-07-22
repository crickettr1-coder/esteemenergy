(() => {
  const CONTACT = Object.freeze({
    phone: "1300 220 354",
    phoneHref: "tel:1300220354",
    email: "info@esteemenergy.com.au",
    emailHref: "mailto:info@esteemenergy.com.au",
    openingHours: "Mon – Sat: 9:00 AM – 6:30 PM",
    offices: Object.freeze({
      nsw: Object.freeze({
        title: "Head Office (NSW)",
        lines: Object.freeze(["4, 187 Targo Rd", "Girraween, NSW 2145"]),
        address: "4, 187 Targo Rd, Girraween, NSW 2145",
      }),
      wa: Object.freeze({
        title: "W.A Office",
        lines: Object.freeze(["202/37 Barrack St", "Perth, WA 6000"]),
        address: "202/37 Barrack St, Perth, WA 6000",
      }),
    }),
    abn: "71 650 302 088",
    acn: "650 302 088",
    ecl: "ECL-373036C",
    description: "Helping Australian homes and businesses reduce electricity bills with premium solar panel systems, battery storage solutions, and professional installations nationwide.",
    acknowledgement: "Esteem Energy acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of the land and pays respect to Elders past, present and emerging.",
    copyright: "© 2026 Esteem Energy | ABN: 71 650 302 088 | ACN: 650 302 088 | ECL-373036C",
  });

  window.ESTEEM_CONTACT_DATA = CONTACT;

  const footerLogoUrl = "/assests/esteem%20energy%20logo.png";

  const icon = (name) => {
    const paths = {
      mail: '<path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7"/>',
      phone: '<path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.3 19 5 12.7 5 5c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
      pin: '<path d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"/>',
      arrow: '<path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  };

  const footerLink = (href, label) => `<li><a href="${href}">${label}<span aria-hidden="true">${icon("arrow")}</span></a></li>`;

  const renderFooter = (footer) => {
    if (!footer || footer.dataset.esteemFooterVersion === "premium-1") return;
    footer.dataset.esteemFooterVersion = "premium-1";
    footer.innerHTML = `
      <div class="esteem-footer-shell">
        <div class="footer-grid esteem-footer-grid">
          <section class="esteem-footer-brand" aria-labelledby="footer-brand-title">
            <a class="esteem-footer-logo" href="/" aria-label="Esteem Energy home"><img src="${footerLogoUrl}" alt="Esteem Energy"></a>
            <h2 id="footer-brand-title">Smarter energy for the places you call home.</h2>
            <p class="footer-description">${CONTACT.description}</p>
          </section>
          <nav class="site-footer-nav esteem-footer-column" aria-labelledby="footer-company-title">
            <h2 id="footer-company-title">Company</h2>
            <ul>${footerLink("/about/", "About Us")}${footerLink("/contact-us/", "Contact Us")}${footerLink("/about/#choose-title", "Why Choose Us")}</ul>
          </nav>
          <nav class="site-footer-nav esteem-footer-column" aria-labelledby="footer-services-title">
            <h2 id="footer-services-title">Solar services</h2>
            <ul>${footerLink("/products/#solar-equipment", "Solar Panels")}${footerLink("/battery-storage/", "Solar Batteries")}${footerLink("/products/#solar-equipment", "Solar Inverters")}${footerLink("/residential-solar/", "Residential Solar")}${footerLink("/installation/", "Solar Installation")}</ul>
          </nav>
          <nav class="site-footer-nav esteem-footer-column" aria-labelledby="footer-help-title">
            <h2 id="footer-help-title">Helpful links</h2>
            <ul>${footerLink("/pricing/", "Solar Rebates")}${footerLink("/#faqs", "FAQs")}${footerLink("/blogs/", "Blog")}${footerLink("/contact-us/", "Get a Quote")}</ul>
          </nav>
          <section class="footer-contact esteem-footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact us</h2>
            <a class="footer-phone esteem-footer-contact-link" href="${CONTACT.phoneHref}"><span class="esteem-footer-contact-icon">${icon("phone")}</span><span>${CONTACT.phone}</span></a>
            <a class="footer-email esteem-footer-contact-link" href="${CONTACT.emailHref}"><span class="esteem-footer-contact-icon">${icon("mail")}</span><span>${CONTACT.email}</span></a>
            <p class="esteem-footer-address"><span class="esteem-footer-contact-icon">${icon("pin")}</span><span>${CONTACT.offices.nsw.lines.join("<br>")}</span></p>
            <a class="esteem-footer-cta" href="/contact-us/">Talk to our team <span aria-hidden="true">${icon("arrow")}</span></a>
          </section>
        </div>
        <div class="footer-legal esteem-footer-bottom">
          <p>© ${new Date().getFullYear()} Esteem Energy. All rights reserved.</p>
          <p>ABN: ${CONTACT.abn} · ACN: ${CONTACT.acn} · ${CONTACT.ecl}</p>
        </div>
      </div>`;
  };

  const mapsUrl = (address) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const updateText = (element, text) => {
    if (element && element.textContent.trim() !== text) element.textContent = text;
  };

  const updateHtml = (element, html, marker) => {
    if (!element || element.dataset.esteemContent === marker) return;
    element.innerHTML = html;
    element.dataset.esteemContent = marker;
  };

  const locationIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/>
      <circle cx="12" cy="10" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"/>
    </svg>`;

  const ensureFooterOffice = (list, office, marker) => {
    if (!list) return;
    let row = list.querySelector(`[data-esteem-office="${marker}"]`);
    if (!row) {
      row = document.createElement("div");
      row.className = "esteem-footer-contact-row esteem-footer-office-row";
      row.dataset.esteemOffice = marker;
      list.append(row);
    }
    updateHtml(row, `
      <span class="esteem-footer-contact-icon">${locationIcon}</span>
      <span class="esteem-footer-contact-copy">
        <span class="esteem-footer-contact-label">${office.title}</span>
        <a href="${mapsUrl(office.address)}" target="_blank" rel="noopener">${office.lines.join("<br>")}</a>
      </span>`, `${marker}-office`);
  };

  const updateFooter = (footer) => {
    const description = footer.querySelector(".footer-description p, .framer-1fujns7 p");
    updateText(description, CONTACT.description);

    const phoneBlock = footer.querySelector(".footer-phone .framer-18bz7kj, .framer-1top3uf .framer-18bz7kj");
    updateHtml(phoneBlock, `
      <p class="framer-text framer-styles-preset-1oj9t8m">
        <span class="esteem-footer-contact-label">Call Us</span>
        <a class="framer-text framer-styles-preset-3jgbai" href="${CONTACT.phoneHref}">${CONTACT.phone}</a>
      </p>`, "phone");

    const emailBlock = footer.querySelector(".footer-email .framer-1yowo8r, .framer-n9us4s .framer-1yowo8r");
    updateHtml(emailBlock, `
      <p class="framer-text framer-styles-preset-1oj9t8m">
        <span class="esteem-footer-contact-label">Email Us</span>
        <a class="framer-text framer-styles-preset-3jgbai" href="${CONTACT.emailHref}">${CONTACT.email}</a>
      </p>`, "email");

    const oldAddress = footer.querySelector(".framer-lzww49");
    if (oldAddress && oldAddress.style.display !== "none") {
      oldAddress.style.display = "none";
      oldAddress.setAttribute("aria-hidden", "true");
    }

    const contactList = footer.querySelector(".footer-contact .framer-vm55zi, .framer-vm55zi");
    ensureFooterOffice(contactList, CONTACT.offices.nsw, "nsw");
    ensureFooterOffice(contactList, CONTACT.offices.wa, "wa");

    const legal = footer.querySelector(".footer-legal, .framer-vixlb5");
    if (legal) {
      legal.classList.add("esteem-footer-legal");
      updateHtml(legal, `
        <div class="esteem-footer-legal-copy">
          <p class="esteem-footer-acknowledgement">${CONTACT.acknowledgement}</p>
          <p class="esteem-footer-copyright">${CONTACT.copyright}</p>
        </div>`, "legal-2026");
    }
  };

  const updateOfficeCard = (card, office, marker) => {
    if (!card) return;
    const title = card.querySelector(".framer-19q1vpp h3");
    const description = card.querySelector(".framer-1cvembh p");
    const action = card.querySelector(".framer-15tuwnd p");
    const url = mapsUrl(office.address);
    updateText(title, office.title);
    updateHtml(description,
      `<a class="esteem-contact-card-link" href="${url}" target="_blank" rel="noopener">${office.lines.join("<br>")}</a>`,
      `${marker}-address`);
    updateHtml(action,
      `<a class="framer-text framer-styles-preset-3jgbai" href="${url}" target="_blank" rel="noopener">View in Google Maps</a>`,
      `${marker}-map`);
  };

  const updateContactPage = () => {
    const form = document.querySelector('form.solar-lead-form, form[data-framer-name="Contact Form"]');
    if (!form) return;

    const map = document.querySelector(".framer-wwlhx2-container iframe");
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.offices.nsw.address)}&z=15&output=embed`;
    if (map && map.src !== mapSrc) {
      map.src = mapSrc;
      map.title = "Esteem Energy Head Office (NSW) map";
    }

    updateOfficeCard(document.querySelector(".framer-17k25ka-container"), CONTACT.offices.nsw, "nsw");
    updateOfficeCard(document.querySelector(".framer-13rpzn8-container"), CONTACT.offices.wa, "wa");

    const contactCard = document.querySelector(".framer-19h44sr-container");
    if (contactCard) {
      updateText(contactCard.querySelector(".framer-19q1vpp h3"), "Contact & Opening Hours");
      updateHtml(contactCard.querySelector(".framer-1cvembh p"), `
        <span class="esteem-contact-card-details">
          <a href="${CONTACT.phoneHref}">${CONTACT.phone}</a>
          <a href="${CONTACT.emailHref}">${CONTACT.email}</a>
        </span>`, "contact-details");
      updateHtml(contactCard.querySelector(".framer-15tuwnd p"),
        `<span>${CONTACT.openingHours}</span>`, "opening-hours");
    }
  };

  const ensureSharedFooter = () => {
    if (document.querySelector('meta[http-equiv="refresh"]')) return null;

    let footer = document.querySelector("footer");
    if (footer) return footer;

    footer = document.createElement("footer");
    footer.className = "site-footer framer-UEkM5 esteem-site-footer";
    footer.setAttribute("aria-label", "Site footer");

    const content = document.querySelector("main, #main");
    if (content) content.insertAdjacentElement("afterend", footer);
    else document.body.append(footer);

    return footer;
  };

  const applyContactData = () => {
    ensureSharedFooter();
    document.querySelectorAll("footer").forEach(renderFooter);
    updateContactPage();
  };

  applyContactData();
  document.addEventListener("framer:pageview", applyContactData);

  const main = document.getElementById("main");
  if (main) {
    const observer = new MutationObserver(applyContactData);
    observer.observe(main, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }
})();
