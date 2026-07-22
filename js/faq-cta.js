/* ============================================================
   SEMANTIC FAQ ACCORDION HANDLER
   Handles state management, click tracking, and ARIA updates.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const faqList = document.querySelector(".esteem-faq-list");
  if (!faqList) return;

  const items = faqList.querySelectorAll(".esteem-faq-item");
  items.forEach((item, index) => {
    const trigger = item.querySelector(".esteem-faq-trigger");
    const content = item.querySelector(".esteem-faq-content");
    
    // Configure initial ARIA state: open the first item by default
    if (index === 0) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      content.setAttribute("aria-hidden", "false");
    } else {
      trigger.setAttribute("aria-expanded", "false");
      content.setAttribute("aria-hidden", "true");
    }

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      
      // Close other items for a cleaner visual state (exclusive accordion style)
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-open");
          const otherTrigger = otherItem.querySelector(".esteem-faq-trigger");
          const otherContent = otherItem.querySelector(".esteem-faq-content");
          otherTrigger.setAttribute("aria-expanded", "false");
          otherContent.setAttribute("aria-hidden", "true");
        }
      });

      // Toggle targeted item
      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", !isOpen ? "true" : "false");
      content.setAttribute("aria-hidden", !isOpen ? "false" : "true");
    });
  });
});
