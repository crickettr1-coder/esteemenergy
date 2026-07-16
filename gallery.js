(() => {
  const cards = [...document.querySelectorAll(".gallery-card")];
  const filters = [...document.querySelectorAll(".media-filter")];
  filters.forEach((filter) => filter.addEventListener("click", () => {
    filters.forEach((item) => { item.classList.toggle("is-active", item === filter); item.setAttribute("aria-pressed", item === filter ? "true" : "false"); });
    const category = filter.dataset.filter;
    cards.forEach((card) => { card.hidden = category !== "all" && card.dataset.category !== category; });
  }));
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;
  const image = lightbox.querySelector("img");
  const close = lightbox.querySelector(".lightbox-close");
  let index = 0;
  const open = (next) => { index = next; const card = cards[index]; image.src = card.dataset.image; image.alt = card.dataset.alt; lightbox.hidden = false; close.focus(); document.body.style.overflow = "hidden"; };
  const hide = () => { lightbox.hidden = true; document.body.style.overflow = ""; };
  cards.forEach((card, i) => card.querySelector("button").addEventListener("click", () => open(i)));
  close.addEventListener("click", hide);
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) hide(); });
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => open((index - 1 + cards.length) % cards.length));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => open((index + 1) % cards.length));
  document.addEventListener("keydown", (event) => { if (lightbox.hidden) return; if (event.key === "Escape") hide(); if (event.key === "ArrowLeft") open((index - 1 + cards.length) % cards.length); if (event.key === "ArrowRight") open((index + 1) % cards.length); });
})();
