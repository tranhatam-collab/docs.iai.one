(function () {
  "use strict";

  const docs = window.IAIDocs;
  const topbar = document.querySelector(".docs-topbar");
  const outlineMount = document.querySelector("[data-outline]");
  const pageNavMount = document.querySelector("[data-page-nav]");
  const currentPageId = document.body.dataset.page;

  function updateTopbar() {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function bindSidebar() {
    const openButtons = document.querySelectorAll("[data-sidebar-toggle]");
    const closeButtons = document.querySelectorAll("[data-sidebar-close]");

    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        document.body.classList.add("is-sidebar-open");
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        document.body.classList.remove("is-sidebar-open");
      });
    });

    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("is-sidebar-open");
      });
    });
  }

  function bindCopyButtons() {
    document.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-button")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-button";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        const text = code ? code.innerText : pre.innerText;

        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "Copied";
          button.classList.add("is-copied");
          window.setTimeout(() => {
            button.textContent = "Copy";
            button.classList.remove("is-copied");
          }, 1400);
        } catch (error) {
          button.textContent = "Failed";
          window.setTimeout(() => {
            button.textContent = "Copy";
          }, 1400);
        }
      });

      pre.append(button);
    });
  }

  function renderOutline() {
    if (!outlineMount) return;

    const headings = [...document.querySelectorAll(".doc-content h2[id], .doc-content h3[id]")];
    if (!headings.length) {
      outlineMount.innerHTML = "";
      return;
    }

    outlineMount.innerHTML = `
      <div class="outline-card">
        <div class="mini-title">On This Page</div>
        <nav class="outline-links">
          ${headings
            .map((heading) => {
              const isSub = heading.tagName === "H3" ? " is-sub" : "";
              return `<a class="outline-link${isSub}" href="#${heading.id}" data-outline-link="${heading.id}">${heading.textContent}</a>`;
            })
            .join("")}
        </nav>
      </div>
    `;

    const outlineLinks = [...outlineMount.querySelectorAll("[data-outline-link]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;

        outlineLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.outlineLink === visible.target.id);
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1]
      }
    );

    headings.forEach((heading) => observer.observe(heading));
  }

  function renderPageNav() {
    if (!docs || !pageNavMount) return;

    const pages = docs.pages;
    const currentIndex = pages.findIndex((page) => page.id === currentPageId);
    if (currentIndex < 0) return;

    const prev = pages[currentIndex - 1];
    const next = pages[currentIndex + 1];
    const cards = [prev, next]
      .map((page, index) => {
        if (!page) return "";
        const label = index === 0 ? "Previous" : "Next";
        return `
          <a class="page-nav-card" href="${page.path}">
            <small>${label}</small>
            <strong>${page.title}</strong>
            <span>${page.description}</span>
          </a>
        `;
      })
      .filter(Boolean)
      .join("");

    pageNavMount.innerHTML = cards ? `<div class="page-nav">${cards}</div>` : "";
  }

  updateTopbar();
  bindSidebar();
  bindCopyButtons();
  renderOutline();
  renderPageNav();
  window.addEventListener("scroll", updateTopbar, { passive: true });
})();
