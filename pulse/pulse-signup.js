/* PULSE sign-up flow: Progress Steps (2), Password Generator (31),
   Password Strength reactive background (39), Verify Account OTP (41). */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const panes = $$(".p-pane");
  const steps = $$(".p-step");
  const fill = $("#p-steps-fill");
  let cur = 0;

  function show(n) {
    cur = Math.max(0, Math.min(panes.length - 1, n));
    panes.forEach((p, i) => p.classList.toggle("active", i === cur));
    steps.forEach((s, i) => s.classList.toggle("active", i <= cur));
    fill.style.width = (cur / (panes.length - 1)) * 100 + "%";
  }
  show(0);

  function validatePane(n) {
    if (n === 0) {
      const inputs = $$("input", panes[0]);
      if (inputs.some((i) => !i.value.trim())) { window.pulseToast("Fill in both fields", "error"); return false; }
    }
    if (n === 1) {
      if (strength($("#p-pwd").value) < 2) { window.pulseToast("Pick a stronger password", "error"); return false; }
    }
    return true;
  }

  $$(".p-next").forEach((b) => b.addEventListener("click", () => { if (validatePane(cur)) show(cur + 1); }));
  $$(".p-prev").forEach((b) => b.addEventListener("click", () => show(cur - 1)));

  /* ---- Password strength (39) drives the reactive background ---- */
  const bg = $(".p-strengthbg");
  const bar = $("#p-pwd-bar");
  const label = $("#p-pwd-label");
  const pwd = $("#p-pwd");
  const levels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = ["#ff4d6d", "#ff8a3d", "#ffd166", "#4ade80", "#2bd2ff"];

  function strength(v) {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return Math.min(s, 4);
  }
  function refresh() {
    const s = strength(pwd.value);
    bar.style.width = (s / 4) * 100 + "%";
    bar.style.background = colors[s];
    label.textContent = pwd.value ? levels[s] : "Type or generate a password";
    if (bg) bg.style.filter = `blur(${20 - s * 5}px) saturate(${100 + s * 20}%)`;
  }
  if (pwd) { pwd.addEventListener("input", refresh); refresh(); }

  /* ---- Generate (31) ---- */
  $(".p-gen") && $(".p-gen").addEventListener("click", () => {
    const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&*";
    let out = "";
    for (let i = 0; i < 16; i++) out += chars[Math.floor(Math.random() * chars.length)];
    pwd.type = "text";
    pwd.value = out;
    refresh();
    navigator.clipboard && navigator.clipboard.writeText(out).catch(() => {});
    window.pulseToast("Strong password generated & copied", "success");
  });

  /* ---- OTP (41) ---- */
  const otp = $$(".p-otp input");
  otp.forEach((box, i) => {
    box.addEventListener("input", () => {
      box.value = box.value.replace(/\D/g, "");
      if (box.value && i < otp.length - 1) otp[i + 1].focus();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && i > 0) otp[i - 1].focus();
    });
  });

  /* ---- Finish ---- */
  $(".p-finish") && $(".p-finish").addEventListener("click", () => {
    if (otp.some((b) => !b.value)) return window.pulseToast("Enter the 4-digit code", "error");
    window.pulseToast("Welcome to PULSE! Redirecting…", "success");
    setTimeout(() => (window.location.href = "app.html"), 1100);
  });
})();
