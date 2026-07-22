(() => {
  const mount = document.querySelector("[data-global-footer-mount]");
  if (!mount || mount.dataset.globalFooterMounted === "true" || mount.querySelector(":scope > footer.site-footer")) return;

  const arrowIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>`;

  const footerLink = (href, label) => `
    <li><a href="${href}">${label}<span aria-hidden="true">${arrowIcon}</span></a></li>`;

  const footerTemplate = `
    <footer class="site-footer" aria-label="Site footer" data-esteem-footer-version="premium-1">
      <div class="esteem-footer-shell">
        <div class="esteem-footer-grid">
          <section class="esteem-footer-brand" aria-labelledby="global-footer-brand-title">
            <a class="esteem-footer-logo" href="/" aria-label="Esteem Energy home">
              <img src="/assets/esteem%20energy%20logo.png" alt="Esteem Energy">
            </a>
            <h2 class="esteem-footer-heading" id="global-footer-brand-title">Smarter solar for the places you call home.</h2>
            <p>Helping Australian homes and businesses reduce electricity bills with premium solar panel systems, battery storage solutions, and professional installations nationwide.</p>
            <div class="esteem-footer-social" aria-label="Social media">
              <a href="https://twitter.com/EsteemEnergynsw" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m5 4 14 16M19 4 5 20" fill="none" stroke="currentColor" stroke-width="1.7"></path></svg>
              </a>
              <a href="https://www.facebook.com/esteemenergyaustralia/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V1h-3c-3.7 0-5 2.2-5 5v3H7v4h3v8" fill="none" stroke="currentColor" stroke-width="1.7"></path></svg>
              </a>
              <a href="https://www.instagram.com/esteemenergy/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.7"></rect><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.7"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor"></circle></svg>
              </a>
              <a href="https://www.linkedin.com/company/esteem-energy/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.7"></rect><path d="M7 10v7M7 7v.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path><path d="M11 17v-4c0-1.7 1-3 3-3s3 1.3 3 3v4M11 10v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path></svg>
              </a>
              <a href="https://www.youtube.com/@Esteemenergyau" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M3 8s.3-2.2 1.3-3.1c1.2-1.3 2.6-1.3 3.2-1.4C9.6 3.4 12 3.4 12 3.4s2.4 0 4.5.1c.6.1 2 .1 3.2 1.4C20.7 5.8 21 8 21 8S21.3 10.2 21.3 12.4v2.1c0 2.2-.3 4.4-.3 4.4s-.3 2.2-1.3 3.1c-1.2 1.3-2.6 1.3-3.2 1.4-4.5.3-9 .3-9 .3s-3.6 0-4.7-.3c-.6-.1-2-.1-3.2-1.4C2.3 20.8 2 18.6 2 18.6S1.7 16.4 1.7 14.2v-2.1C1.7 10.2 2 8 3 8Z" fill="none" stroke="currentColor" stroke-width="1.7"></path><path d="m10 15 5-3-5-3v6Z" fill="currentColor"></path></svg>
              </a>
            </div>
          </section>

          <nav class="esteem-footer-column" aria-labelledby="global-footer-company-title">
            <h2 class="esteem-footer-heading" id="global-footer-company-title">Company</h2>
            <ul class="esteem-footer-links">
              ${footerLink("/about/", "About Us")}
              ${footerLink("/contact-us/", "Contact Us")}
              ${footerLink("/about/#choose-title", "Why Choose Us")}
            </ul>
          </nav>

          <nav class="esteem-footer-column" aria-labelledby="global-footer-services-title">
            <h2 class="esteem-footer-heading" id="global-footer-services-title">Solar Services</h2>
            <ul class="esteem-footer-links">
              ${footerLink("/products/#solar-equipment", "Solar Panels")}
              ${footerLink("/battery-storage/", "Solar Batteries")}
              ${footerLink("/products/#solar-equipment", "Solar Inverters")}
              ${footerLink("/residential-solar/", "Residential Solar")}
              ${footerLink("/installation/", "Solar Installation")}
            </ul>
          </nav>

          <nav class="esteem-footer-column" aria-labelledby="global-footer-help-title">
            <h2 class="esteem-footer-heading" id="global-footer-help-title">Helpful Links</h2>
            <ul class="esteem-footer-links">
              ${footerLink("/#faqs", "FAQs")}
              ${footerLink("/blogs/", "Blog")}
              ${footerLink("/contact-us/", "Get a Quote")}
              ${footerLink("/pricing/", "View Pricing")}
            </ul>
          </nav>

          <section class="esteem-footer-contact" aria-labelledby="global-footer-contact-title">
            <h2 class="esteem-footer-heading" id="global-footer-contact-title">Contact Us</h2>
            <a class="esteem-footer-contact-link" href="tel:1300220354">
              <span class="esteem-footer-contact-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h3l1.5 4-2 1.5a13 13 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.3 19 5 12.7 5 5c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path></svg>
              </span>
              <span>1300 220 354</span>
            </a>
            <a class="esteem-footer-contact-link" href="mailto:info@esteemenergy.com.au">
              <span class="esteem-footer-contact-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="1.7"></path><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7"></path></svg>
              </span>
              <span>info@esteemenergy.com.au</span>
            </a>
            <p class="esteem-footer-address">
              <span class="esteem-footer-contact-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.7"></path><circle cx="12" cy="10" r="2.1" fill="none" stroke="currentColor" stroke-width="1.7"></circle></svg>
              </span>
              <span>4, 187 Targo Rd<br>Girraween, NSW 2145</span>
            </p>
            <a class="esteem-footer-cta" href="/contact-us/">Get a Free Solar Quote <span aria-hidden="true">${arrowIcon}</span></a>
          </section>
        </div>
        <div class="esteem-footer-bottom">
          <p>© ${new Date().getFullYear()} Esteem Energy. All rights reserved.</p>
          <p>ABN: 71 650 302 088 · ACN: 650 302 088 · ECL-373036C</p>
        </div>
      </div>
    </footer>`;

  const template = document.createElement("template");
  template.innerHTML = footerTemplate.trim();
  const footer = template.content.firstElementChild;
  if (!(footer instanceof HTMLElement)) return;

  mount.replaceChildren(footer);
  mount.dataset.globalFooterMounted = "true";

  const staticReference = document.querySelector("[data-global-footer-static-reference]");
  if (staticReference && staticReference !== footer) {
    staticReference.hidden = true;
    staticReference.setAttribute("aria-hidden", "true");
  }
})();
