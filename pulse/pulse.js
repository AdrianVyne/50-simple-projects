/* =========================================================
   PULSE — shared core behaviors, used by every page.
   - Hover-chip credit system (the signature touch)
   - Button ripple (Project 20)
   - Toasts (Project 27)
   - Theme toggle (paired with Theme Clock, Project 19)
   - Kinetic loader fade (Project 23)
   - Shared nav: sticky state, hidden search (4), mobile menu (13)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Hover-chip credit system ----------
     Any element with data-project="N" data-name="..." shows a chip
     linking to ../html/project-N.html on hover or keyboard focus. */
  const chip = document.createElement("a");
  chip.className = "p-chip";
  chip.target = "_blank";
  chip.rel = "noopener";
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(chip));

  let overEl = false;
  let overChip = false;
  let hideTimer = null;

  function placeChip(el) {
    const n = el.getAttribute("data-project");
    const name = el.getAttribute("data-name") || "";
    chip.textContent = `⬢ #${n} · ${name} →`;
    chip.href = `../html/project-${n}.html`;
    chip.style.display = "inline-flex";
    const r = el.getBoundingClientRect();
    const top = window.scrollY + r.top - chip.offsetHeight - 6;
    let left = window.scrollX + r.left + 10;
    // keep within the viewport horizontally
    const maxLeft = window.scrollX + document.documentElement.clientWidth - chip.offsetWidth - 8;
    if (left > maxLeft) left = maxLeft;
    chip.style.top = Math.max(window.scrollY + 4, top) + "px";
    chip.style.left = left + "px";
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!overEl && !overChip) chip.style.display = "none";
    }, 140);
  }

  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest && e.target.closest("[data-project]");
    if (el) {
      overEl = true;
      placeChip(el);
    }
  });
  document.addEventListener("mouseout", (e) => {
    const el = e.target.closest && e.target.closest("[data-project]");
    if (el) {
      overEl = false;
      scheduleHide();
    }
  });
  chip.addEventListener("mouseenter", () => { overChip = true; });
  chip.addEventListener("mouseleave", () => { overChip = false; scheduleHide(); });

  // keyboard accessibility
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest && e.target.closest("[data-project]");
    if (el) { overEl = true; placeChip(el); }
  });
  document.addEventListener("focusout", (e) => {
    const el = e.target.closest && e.target.closest("[data-project]");
    if (el) { overEl = false; scheduleHide(); }
  });

  /* ---------- Button ripple (Project 20) ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".p-btn");
    if (!btn) return;
    const span = document.createElement("span");
    span.className = "p-ripple";
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    span.style.width = span.style.height = size + "px";
    span.style.left = e.clientX - r.left + "px";
    span.style.top = e.clientY - r.top + "px";
    btn.appendChild(span);
    setTimeout(() => span.remove(), 600);
  });

  /* ---------- Toasts (Project 27) ---------- */
  window.pulseToast = function (msg, type) {
    let host = document.getElementById("p-toasts");
    if (!host) {
      host = document.createElement("div");
      host.id = "p-toasts";
      document.body.appendChild(host);
    }
    const t = document.createElement("div");
    t.className = "p-toast" + (type ? " " + type : "");
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => {
      t.classList.add("leaving");
      setTimeout(() => t.remove(), 300);
    }, 3000);
  };

  /* ---------- Theme toggle (with Theme Clock, Project 19) ---------- */
  const saved = localStorage.getItem("pulse-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);
  window.pulseToggleTheme = function () {
    const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("pulse-theme", next);
    return next;
  };
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-theme-toggle]")) window.pulseToggleTheme();
  });

  /* ---------- Kinetic loader fade (Project 23) ---------- */
  window.addEventListener("load", () => {
    const loader = document.querySelector(".p-loader");
    if (loader) setTimeout(() => loader.classList.add("is-hidden"), 350);
  });

  /* ---------- Shared nav behaviors ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".p-nav");
    if (nav) {
      const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // hidden search (Project 4)
    const search = document.querySelector(".p-search");
    if (search) {
      const toggle = search.querySelector("[data-search-toggle]");
      const input = search.querySelector("input");
      if (toggle) {
        toggle.addEventListener("click", () => {
          search.classList.toggle("open");
          if (search.classList.contains("open") && input) input.focus();
        });
      }
    }

    // animated mobile menu (Project 13)
    const burger = document.querySelector(".p-burger");
    const mobile = document.querySelector(".p-mobile-links");
    if (burger && mobile) {
      burger.addEventListener("click", () => mobile.classList.toggle("open"));
      mobile.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => mobile.classList.remove("open"))
      );
    }
  });
})();
