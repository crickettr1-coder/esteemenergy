(() => {
  const setText = (selector, text) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.textContent.trim() !== text) element.textContent = text;
    });
  };

  const updateContextualCtas = () => {
    // Deliberately excludes the custom header and the hero's Primary Button.
    setText("#faqs .framer-1anms0j-container a.framer-WMYoJ p", "Ask a Solar Expert");
    setText("footer .framer-1hepv0y-container a.framer-WMYoJ p", "Get a Free Solar Quote");
    document.querySelectorAll("footer .framer-1hepv0y-container a.framer-WMYoJ").forEach((cta) => {
      cta.classList.add("esteem-footer-quote-cta");
      cta.closest(".framer-1hepv0y-container")?.classList.add("esteem-footer-quote-wrap");
    });
  };

  const setItemState = (item, open, questionText) => {
    const trigger = item.querySelector(".framer-kiabgh");
    item.classList.toggle("is-open", open);
    item.setAttribute("data-framer-name", open ? "Open" : "Closed");
    trigger?.setAttribute("aria-expanded", String(open));
    if (trigger && questionText) {
      trigger.setAttribute("aria-label", `${open ? "Hide" : "Show"} answer: ${questionText}`);
    }
  };

  const initializeAccordion = (accordion) => {
    const items = [...accordion.querySelectorAll(":scope > div > .framer-3KJtR")];
    if (!items.length) return;

    items.forEach((item, index) => {
      if (item.dataset.esteemFaqReady === "true") return;

      const trigger = item.querySelector(".framer-kiabgh");
      const question = item.querySelector(".framer-m1lqsr p");
      const answer = item.querySelector(".framer-1fiznb2");
      if (!trigger || !question || !answer) return;

      const instance = Math.random().toString(36).slice(2, 9);
      const questionId = `esteem-faq-question-${instance}`;
      const answerId = `esteem-faq-answer-${instance}`;

      item.dataset.esteemFaqReady = "true";
      item.classList.add("esteem-faq-item");
      item.removeAttribute("tabindex");
      question.id = questionId;
      answer.id = answerId;
      answer.setAttribute("role", "region");
      answer.setAttribute("aria-labelledby", questionId);
      trigger.setAttribute("aria-controls", answerId);
      trigger.setAttribute("aria-label", `Show answer: ${question.textContent.trim()}`);

      const toggle = () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((other) => {
          const otherQuestion = other.querySelector(".framer-m1lqsr p")?.textContent.trim() || "";
          setItemState(other, other === item && willOpen, otherQuestion);
        });
      };

      const isSemantic = trigger.tagName === "BUTTON" || trigger.tagName === "A";
      if (!isSemantic) {
        trigger.setAttribute("role", "button");
        if (!trigger.hasAttribute("tabindex")) {
          trigger.setAttribute("tabindex", "0");
        }

        trigger.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
        });
      }

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        toggle();
      });

      setItemState(item, index === 0, question.textContent.trim());
    });
  };

  const initializeFaqs = () => {
    setText("#faqs .framer-1s1ohwv h2", "Your Questions, Answered");
    setText(
      "#faqs .framer-1jsb5es p",
      "Find answers to common questions about solar systems, savings, installation, performance, and ongoing support."
    );
    document.querySelectorAll("#faqs .framer-SqIAO").forEach(initializeAccordion);
  };

  const getFaqItems = () =>
    [...document.querySelectorAll("#faqs .framer-3KJtR")].filter(
      (item) => item.querySelector(".framer-kiabgh") && item.querySelector(".framer-1fiznb2")
    );

  const toggleFaqItem = (item) => {
    const willOpen = !item.classList.contains("is-open");
    getFaqItems().forEach((other) => {
      const question = other.querySelector(".framer-m1lqsr p")?.textContent.trim() || "";
      setItemState(other, other === item && willOpen, question);
    });
  };

  // Framer rehydrates this area after deferred scripts have run, which can replace
  // element-level listeners. Capture events at the document instead so the FAQ
  // remains reliable after that rehydration.
  document.addEventListener(
    "click",
    (event) => {
      const trigger = event.target.closest?.("#faqs .framer-kiabgh");
      if (!trigger) return;

      const item = trigger.closest(".framer-3KJtR");
      if (!item) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      toggleFaqItem(item);
    },
    true
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      const trigger = event.target.closest?.("#faqs .framer-kiabgh");
      if (!trigger) return;

      const item = trigger.closest(".framer-3KJtR");
      if (!item) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      toggleFaqItem(item);
    },
    true
  );

  // Static Custom Accordion Event Listener
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".esteem-faq-trigger");
    if (!trigger) return;
    event.preventDefault();
    const item = trigger.closest(".esteem-faq-item");
    if (!item) return;
    const isAlreadyOpen = item.classList.contains("is-open");
    
    // Close all other items in this accordion box
    const box = item.closest(".esteem-faq-box");
    if (box) {
      box.querySelectorAll(".esteem-faq-item").forEach(other => {
        other.classList.remove("is-open");
        other.querySelector(".esteem-faq-trigger")?.setAttribute("aria-expanded", "false");
        const content = other.querySelector(".esteem-faq-content");
        if (content) {
          content.setAttribute("aria-hidden", "true");
          content.style.maxHeight = null;
          content.style.opacity = "0";
        }
      });
    }
    
    // Toggle current item
    if (!isAlreadyOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      const content = item.querySelector(".esteem-faq-content");
      if (content) {
        content.setAttribute("aria-hidden", "false");
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
      }
    }
  });

  const applyFixes = () => {
    updateContextualCtas();
    initializeFaqs();
  };

  applyFixes();
  document.addEventListener("framer:pageview", applyFixes);

  const main = document.getElementById("main");
  if (main) {
    const observer = new MutationObserver(applyFixes);
    observer.observe(main, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }
})();
