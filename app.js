(function () {
  "use strict";

  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
