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

  const icon = (name) => {
    const paths = {
      mail: '<path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7"/>',
      phone: '<path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.3 19 5 12.7 5 5c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
      pin: '<path d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"/>',
      arrow: '<path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
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

  const applyContactData = () => {
    updateContactPage();
  };

  applyContactData();
  window.addEventListener("load", applyContactData, { once: true });
  document.addEventListener("framer:pageview", applyContactData);

  const main = document.getElementById("main");
  if (main) {
    const observer = new MutationObserver(applyContactData);
    observer.observe(main, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }
})();
