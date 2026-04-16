/* ═══════════════════════════════════════════════════════════════
   script.js — Aleksei Mora Portfolio
   Handles: mobile menu, book flip toggle, smooth-scroll close
═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Mobile menu ─────────────────────────────────────────── */
  const menuBtn   = document.getElementById("mobile-menu-btn");
  const menuClose = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (menuBtn)   menuBtn.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);

  /* Close menu when any nav link inside it is clicked */
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ── Book flip toggle (click / tap) ─────────────────────── */
  const book = document.getElementById("book");

  if (book) {
    /* Toggle on click */
    book.addEventListener("click", function () {
      book.classList.toggle("is-flipped");
    });

    /* Also support keyboard Enter / Space for accessibility */
    book.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        book.classList.toggle("is-flipped");
      }
    });
  }

  /* ── Offset smooth-scroll for fixed nav ─────────────────── */
  /*
   * The nav bar is ~88px tall. When anchor links fire, the browser
   * would hide the section heading under the bar. We correct for
   * this by intercepting every in-page anchor click.
   */
  const NAV_HEIGHT = 88; // px — adjust if you change nav padding

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      if (!targetId) return; // bare "#" — skip

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const top =
        target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT;

      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
