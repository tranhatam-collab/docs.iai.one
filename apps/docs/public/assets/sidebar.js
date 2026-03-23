(function () {
  "use strict";

  const docs = window.IAIDocs;
  const mount = document.querySelector("[data-sidebar]");
  const currentPageId = document.body.dataset.page;

  if (!docs || !mount) return;

  const pageMap = new Map(docs.pages.map((page) => [page.id, page]));

  const navHtml = docs.nav
    .map((group) => {
      const links = group.pageIds
        .map((pageId) => {
          const page = pageMap.get(pageId);
          if (!page) return "";
          const activeClass = page.id === currentPageId ? " is-active" : "";
          return `
            <a class="sidebar-link${activeClass}" href="${page.path}">
              <span>${page.shortTitle}</span>
              <small>${page.description}</small>
            </a>
          `;
        })
        .join("");

      return `
        <section class="sidebar-group">
          <h2>${group.title}</h2>
          <div class="sidebar-links">${links}</div>
        </section>
      `;
    })
    .join("");

  const ecosystemHtml = docs.ecosystemLinks
    .map(
      (link) => `
        <a class="utility-link" href="${link.href}" target="_blank" rel="noreferrer">
          <strong>${link.label}</strong>
          <span>${link.description}</span>
        </a>
      `
    )
    .join("");

  mount.innerHTML = `
    <div class="docs-sidebar-inner">
      <a class="docs-brand" href="/">
        <div class="docs-brand-row">
          <span class="docs-brand-mark" aria-hidden="true"></span>
          <div class="docs-brand-title">
            <strong>${docs.siteName}</strong>
            <span>Knowledge hub for the IAI stack</span>
          </div>
        </div>
        <p>OpenAI-level docs shell for architecture, workflows, communication, operator surfaces, and deployment.</p>
      </a>

      <button class="docs-search-button" type="button" data-search-open aria-label="Search documentation">
        <strong>Search docs</strong>
        <kbd>⌘K</kbd>
      </button>

      ${navHtml}

      <section class="sidebar-card">
        <div class="mini-title">Ecosystem</div>
        <div class="utility-list">${ecosystemHtml}</div>
      </section>
    </div>
  `;
})();
