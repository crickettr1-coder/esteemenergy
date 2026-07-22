(() => {
  const scriptUrl = document.currentScript?.src || window.location.href;
  const logoUrl = new URL("/assests/esteem%20energy%20logo.png", scriptUrl).href;

  const replaceLogo = (link, placement) => {
    if (link.querySelector(".esteem-energy-logo")) return;
    const image = document.createElement("img");
    image.className = `esteem-energy-logo esteem-energy-logo--${placement}`;
    image.src = logoUrl;
    image.alt = "Esteem Energy";
    image.decoding = "async";
    link.classList.add("esteem-energy-logo-link");
    link.replaceChildren(image);
  };

  const updateLogos = () => {
    document.querySelectorAll(".site-brand a, .framer-yi202p-container a, .solaris-brand a")
      .forEach((link) => replaceLogo(link, "header"));
    document.querySelectorAll('a[name="Company Logo"]')
      .forEach((link) => replaceLogo(link, "footer"));
  };

  updateLogos();
  document.addEventListener("framer:pageview", updateLogos);

  const main = document.getElementById("main");
  if (main) {
    const observer = new MutationObserver(updateLogos);
    observer.observe(main, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 10000);
  }
})();
