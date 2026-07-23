(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Normalize FAQs layout dynamically
  const normalizeFAQs = () => {
    const postContent = document.querySelector(".post-content");
    if (!postContent) return;

    let inFaq = false;
    Array.from(postContent.children).forEach((el) => {
      // Check if it is the FAQ section title
      if (el.tagName === "H2" && /faq|frequently asked/i.test(el.textContent)) {
        inFaq = true;
        el.classList.add("faq-section-title");
      } else if (el.tagName === "H2") {
        inFaq = false;
      }

      // Questions can be H3 tags in FAQ section or any A tag with tabindex="0"
      const isQuestion = (inFaq && el.tagName === "H3") || 
                         (el.tagName === "A" && el.getAttribute("tabindex") === "0");

      if (isQuestion) {
        el.classList.add("faq-question");
        // Clean prefix like "1. ", "Q1. ", "Q. " etc.
        let text = el.textContent.trim();
        text = text.replace(/^(?:Q\d*[:.]?|\d+[:.]?)\s*/i, "");
        el.textContent = text;

        // Find the next non-empty sibling node (the answer)
        let next = el.nextSibling;
        while (next && next.nodeType === 3 && !next.textContent.trim()) {
          next = next.nextSibling;
        }

        if (next) {
          if (next.nodeType === 1) {
            next.classList.add("faq-answer");
          } else if (next.nodeType === 3) {
            const p = document.createElement("p");
            p.className = "faq-answer";
            p.textContent = next.textContent.trim();
            next.parentNode.replaceChild(p, next);
          }
        }
      }
    });
  };
 
  // Remove footer explore links dynamically
  const removeExploreLinks = () => {
    const postContent = document.querySelector(".post-content");
    if (!postContent) return;

    const paragraphs = Array.from(postContent.querySelectorAll("p"));
    let sizesP = null;
    let productsP = null;
    let relatedP = null;
    let relatedHeaderP = null;

    paragraphs.forEach((p) => {
      const html = p.innerHTML || "";
      const text = p.textContent || "";
      if (/Solar Panel System Sizes/i.test(html) || /Solar Panel System Sizes/i.test(text)) {
        sizesP = p;
      } else if (/Solar Products/i.test(html) || /Solar Products/i.test(text)) {
        productsP = p;
      } else if (/Related Blogs|Related Posts/i.test(html) || /Related Blogs|Related Posts/i.test(text)) {
        if (p.querySelector("a")) {
          relatedP = p;
        } else {
          relatedHeaderP = p;
          // check if next sibling is a paragraph with links
          let next = p.nextElementSibling;
          if (next && next.tagName === "P" && next.querySelector("a")) {
            relatedP = next;
          }
        }
      }
    });

    // Remove the old elements
    if (sizesP) sizesP.remove();
    if (productsP) productsP.remove();
    if (relatedP) relatedP.remove();
    if (relatedHeaderP) relatedHeaderP.remove();
  };

  const pool = [
    {
      url: "/why-solar-panels-are-not-worth-it/",
      img: "/assests/blog-images/why-solar-panels-are-not-worth-it/featured.jpg",
      tag: "Panels and Inverters",
      title: "Why Solar Panels Are Not Worth It: Exploring the Truth Behind the Investment",
      excerpt: "Explore the real costs, maintenance, and return on investment to see if solar panels are truly worth it for your Australian home.",
      readTime: "5 min read"
    },
    {
      url: "/fronius-inverter-review/",
      img: "/assests/blog-images/fronius-inverter-review/featured.jpg",
      tag: "Panels and Inverters",
      title: "Fronius Inverter Review: Is It Worth the Premium Price?",
      excerpt: "Read our comprehensive Fronius inverter review to learn about performance, durability, costs, and whether it's the right choice.",
      readTime: "6 min read"
    },
    {
      url: "/solar-inverter-replacement/",
      img: "/assests/blog-images/solar-inverter-replacement/featured.jpg",
      tag: "Maintenance",
      title: "Solar Inverter Replacement: Cost & When to Replace",
      excerpt: "Find out when to replace your solar inverter, how much it costs, and signs that your current inverter might be failing.",
      readTime: "5 min read"
    },
    {
      url: "/canadian-solar-panels-review/",
      img: "/assests/blog-images/canadian-solar-panels-review/featured.avif",
      tag: "Panels and Inverters",
      title: "Canadian Solar Panels Review: Cost vs Value",
      excerpt: "Check out our review of Canadian Solar panels, covering their efficiency, model lines, pricing, and warranty terms in Australia.",
      readTime: "5 min read"
    },
    {
      url: "/saj-inverter-review/",
      img: "/assests/blog-images/saj-inverter-review/featured.jpg",
      tag: "Panels and Inverters",
      title: "SAJ Inverter Review: Budget-Friendly Solar Solution",
      excerpt: "Is SAJ the right budget inverter for your solar system? Read our hands-on review of SAJ inverters' reliability and features.",
      readTime: "5 min read"
    },
    {
      url: "/advantages-of-solar-energy/",
      img: "/assests/blog-images/advantages-of-solar-energy/featured.jpg",
      tag: "Solar Systems",
      title: "Advantages of Solar Energy: Environmental & Financial Benefits",
      excerpt: "Discover the top financial and environmental advantages of switching to solar power for homeowners in Australia.",
      readTime: "4 min read"
    },
    {
      url: "/solar-panel-cleaning/",
      img: "/assests/blog-images/solar-panel-cleaning/featured.webp",
      tag: "Maintenance",
      title: "Do Solar Panels Need Cleaning? Cost, Benefits & Methods",
      excerpt: "Learn if solar panels need cleaning, how much it costs, and the best methods to maintain maximum solar system efficiency.",
      readTime: "5 min read"
    },
    {
      url: "/is-a-solar-battery-worth-it/",
      img: "/assests/blog-images/is-a-solar-battery-worth-it/featured.jpg",
      tag: "Solar Savings",
      title: "Is a Solar Battery Worth It in Australia?",
      excerpt: "Analyze the costs, payback period, and advantages of adding battery storage to your home solar panel system.",
      readTime: "6 min read"
    },
    {
      url: "/german-made-solar-panels/",
      img: "/assests/blog-images/german-made-solar-panels/featured.jpg",
      tag: "Panels and Inverters",
      title: "German-Made Solar Panels: Premium Quality & Performance",
      excerpt: "Are German solar panels worth the extra cost? Review the top German solar panel brands, warranties, and efficiency.",
      readTime: "5 min read"
    },
    {
      url: "/biggest-solar-farm-in-australia/",
      img: "/assests/blog-images/biggest-solar-farm-in-australia/featured.jpg",
      tag: "Solar Systems",
      title: "Biggest Solar Farm in Australia: Leading the Renewable Shift",
      excerpt: "Explore the largest solar farms in Australia, their generation capacities, and their impact on the national electricity market.",
      readTime: "6 min read"
    }
  ];

  // Ensure Recommended Guides block exists with 4 columns
  const ensureRecommendedGuidesExists = () => {
    const finalSection = document.querySelector(".post-final");
    if (!finalSection) return;

    // Remove existing block to prevent duplicates
    document.querySelectorAll(".post-read-next").forEach((el) => el.remove());

    const currentPath = window.location.pathname;

    // Filter out the current article to avoid self-recommendation
    const filteredPool = pool.filter(item => {
      const slug = item.url.replace(/^\/|\/$/g, "");
      return !currentPath.includes(slug);
    });

    // Shuffle the pool dynamically
    const shuffled = [...filteredPool].sort(() => 0.5 - Math.random());

    // Select 4 articles
    const selected = shuffled.slice(0, 4);

    const nextSection = document.createElement("section");
    nextSection.className = "post-read-next";

    let cardsHtml = "";
    selected.forEach(article => {
      cardsHtml += `
          <article class="blog-card">
            <div class="blog-card-visual" style="aspect-ratio:1.8;">
              <img src="${article.img}" alt="${article.title}">
            </div>
            <div class="blog-card-content">
              <div class="blog-card-meta">
                <span class="post-tag">${article.tag}</span>
                <span>${article.readTime}</span>
              </div>
              <h3>
                <a href="${article.url}">${article.title}</a>
              </h3>
              <p class="blog-card-excerpt">${article.excerpt}</p>
              <a class="blog-read-link" href="${article.url}">
                <span>Read Article</span>
                <span class="blog-read-arrow">→</span>
              </a>
            </div>
          </article>
      `;
    });

    nextSection.innerHTML = `
      <div class="post-read-next-container">
        <h2>Recommended Guides</h2>
        <div class="post-read-next-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    finalSection.parentNode.insertBefore(nextSection, finalSection);
  };

  // Dynamic Table of Contents generation
  const generateTOC = () => {
    const postPage = document.querySelector(".post-page");
    const postContent = document.querySelector(".post-content");
    if (!postPage || !postContent) return;

    // Find all H2 headings inside .post-content
    const headings = Array.from(postContent.querySelectorAll("h2"));
    if (headings.length === 0) return;

    // Create the sidebar aside element
    const sidebar = document.createElement("aside");
    sidebar.className = "post-sidebar";

    const tocTitle = document.createElement("h3");
    tocTitle.className = "toc-title";
    tocTitle.textContent = "Table of Contents";
    sidebar.appendChild(tocTitle);

    const tocList = document.createElement("ul");
    tocList.className = "toc-list";

    headings.forEach((heading, index) => {
      let id = heading.id;
      if (!id) {
        id = `heading-${index + 1}`;
        heading.id = id;
      }

      const tocItem = document.createElement("li");
      tocItem.className = "toc-item";

      const tocLink = document.createElement("a");
      tocLink.className = "toc-link";
      tocLink.href = `#${id}`;
      tocLink.textContent = heading.textContent.trim();

      tocItem.appendChild(tocLink);
      tocList.appendChild(tocItem);
    });

    sidebar.appendChild(tocList);

    // Create layout wrapper to keep sidebar constrained next to content only
    const layoutWrapper = document.createElement("div");
    layoutWrapper.className = "post-layout-wrapper";

    postContent.parentNode.insertBefore(layoutWrapper, postContent);
    layoutWrapper.appendChild(sidebar);
    layoutWrapper.appendChild(postContent);

    // Active state tracker (scrollspy)
    if ("IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        rootMargin: "-15% 0px -75% 0px",
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll(".toc-link").forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("is-active");
              } else {
                link.classList.remove("is-active");
              }
            });
          }
        });
      }, observerOptions);

      headings.forEach((heading) => observer.observe(heading));
    }
  };

  // Run on page load
  normalizeFAQs();
  removeExploreLinks();
  generateTOC();
  ensureRecommendedGuidesExists();

  // Scroll Reveal Animations
  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  revealItems.forEach((item) => {
    const delay = Number(item.dataset.revealDelay || 0);
    item.style.setProperty("--reveal-delay", `${delay * 90}ms`);
  });

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }
})();
