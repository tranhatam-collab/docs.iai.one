(function () {
  "use strict";

  const docs = window.IAIDocs;
  if (!docs) return;

  const pageIndex = docs.pages.map((page) => ({
    ...page,
    haystack: [page.title, page.shortTitle, page.description, ...(page.keywords || [])].join(" ").toLowerCase()
  }));

  const modal = document.createElement("div");
  modal.className = "search-modal";
  modal.innerHTML = `
    <div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <div class="search-panel-header">
        <input class="search-input" id="search-input" type="search" placeholder="Search flows, API, deployment, security..." autocomplete="off" />
        <button class="search-close" type="button" data-search-close aria-label="Close search">Close</button>
      </div>
      <div class="footer-meta" id="search-title">Search is fully local. No external analytics, no external scripts.</div>
      <div class="search-results" data-search-results></div>
      <p class="search-empty" data-search-empty hidden>No matching page found.</p>
    </div>
  `;

  document.body.append(modal);

  const input = modal.querySelector("#search-input");
  const results = modal.querySelector("[data-search-results]");
  const empty = modal.querySelector("[data-search-empty]");

  function rank(query, page) {
    if (!query) return 1;
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    let score = 0;
    for (const token of tokens) {
      if (page.title.toLowerCase().includes(token)) score += 6;
      if (page.shortTitle.toLowerCase().includes(token)) score += 4;
      if (page.description.toLowerCase().includes(token)) score += 2;
      if (page.haystack.includes(token)) score += 1;
    }
    return score;
  }

  function render(query = "") {
    const ranked = pageIndex
      .map((page) => ({ page, score: rank(query, page) }))
      .filter(({ score }) => (query ? score > 0 : true))
      .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title))
      .slice(0, 10);

    if (!ranked.length) {
      results.innerHTML = "";
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    results.innerHTML = ranked
      .map(
        ({ page }) => `
          <a class="search-result" href="${page.path}">
            <div class="search-result-top">
              <strong>${page.title}</strong>
              <kbd>${page.category}</kbd>
            </div>
            <p>${page.description}</p>
          </a>
        `
      )
      .join("");
  }

  function openSearch() {
    document.body.classList.add("is-search-open");
    render(input.value);
    setTimeout(() => input.focus(), 0);
  }

  function closeSearch() {
    document.body.classList.remove("is-search-open");
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-search-open]")) {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.target.closest("[data-search-close]")) {
      closeSearch();
      return;
    }

    if (event.target === modal) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : "";
    const isTextField = /INPUT|TEXTAREA|SELECT/.test(activeTag);

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
      return;
    }

    if (!isTextField && event.key === "/") {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === "Escape") {
      closeSearch();
    }
  });

  input.addEventListener("input", () => {
    render(input.value);
  });

  render("");
})();
