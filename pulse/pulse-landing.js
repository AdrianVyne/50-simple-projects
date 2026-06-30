/* PULSE landing-page widgets. Each maps to a source project (see chips). */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---- Auto text effect (30): typing headline ---- */
  (function typing() {
    const el = $(".p-type");
    if (!el) return;
    const words = ["focus", "plan your week", "build habits", "ship faster", "stay calm"];
    let w = 0, c = 0, deleting = false;
    (function tick() {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!deleting && c < word.length) c++;
      else if (deleting && c > 0) c--;
      else if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1400); }
      else { deleting = false; w = (w + 1) % words.length; }
      setTimeout(tick, deleting ? 45 : 90);
    })();
  })();

  /* ---- Background slider (18) ---- */
  (function heroSlider() {
    const slides = $$(".p-hero__slide");
    if (slides.length < 2) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, 4000);
  })();

  /* ---- Blurry loading (5) + carousel images (35) ---- */
  $$(".p-blur").forEach((img) => {
    const src = img.dataset.src;
    if (!src) return;
    if (img.tagName === "IMG") {
      const real = new Image();
      real.onload = () => { img.src = src; img.classList.add("loaded"); };
      real.src = src;
    } else {
      img.style.backgroundImage = `url('${src}')`;
      const real = new Image();
      real.onload = () => img.classList.add("loaded");
      real.src = src;
    }
  });

  /* ---- Scroll reveal (6) + counters (14) ---- */
  (function reveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if (e.target.classList.contains("p-stats")) startCounters(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    $$(".p-reveal, .p-stats").forEach((el) => io.observe(el));
  })();
  function startCounters(scope) {
    $$(".p-counter", scope).forEach((el) => {
      const target = +el.dataset.target;
      const dur = 1400, t0 = performance.now();
      (function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.floor(p * target).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }

  /* ---- Expanding cards (1) ---- */
  $$(".p-cards__panel").forEach((p) =>
    p.addEventListener("click", () => {
      $$(".p-cards__panel").forEach((x) => x.classList.remove("is-active"));
      p.classList.add("is-active");
    })
  );

  /* ---- Carousel (35) ---- */
  (function carousel() {
    const track = $(".p-carousel__track");
    if (!track) return;
    const slides = $$("img", track);
    let i = 0;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${i * 100}%)`;
    };
    $(".p-carousel__next").addEventListener("click", () => go(i + 1));
    $(".p-carousel__prev").addEventListener("click", () => go(i - 1));
    setInterval(() => go(i + 1), 5000);
  })();

  /* ---- Vertical slider (26) ---- */
  (function vslider() {
    const left = $(".p-vslider__left"), right = $(".p-vslider__right");
    if (!left || !right) return;
    const n = $$(".p-vslider__panel", left).length;
    let i = 0;
    const go = (d) => {
      i = (i + d + n) % n;
      left.style.transform = `translateY(-${i * 100}%)`;
      right.style.transform = `translateY(-${i * 100}%)`;
    };
    $(".p-vslider__down").addEventListener("click", () => go(1));
    $(".p-vslider__up").addEventListener("click", () => go(-1));
  })();

  /* ---- 3D boxes (40) ---- */
  (function boxes() {
    const wrap = $("#p-boxes");
    if (!wrap) return;
    for (let i = 0; i < 16; i++) {
      const b = document.createElement("div");
      b.className = "p-box";
      b.style.backgroundImage = "url('https://picsum.photos/seed/pulse-boxes/500/500')";
      const row = Math.floor(i / 4), col = i % 4;
      b.style.backgroundPosition = `${-(col * 125)}px ${-(row * 125)}px`;
      wrap.appendChild(b);
    }
    $(".p-boxes-toggle").addEventListener("click", () => wrap.classList.toggle("big"));
  })();

  /* ---- Double-click heart (29) ---- */
  (function heart() {
    const img = $(".p-testi__img");
    if (!img) return;
    img.addEventListener("dblclick", (e) => {
      const h = document.createElement("span");
      h.className = "p-heart";
      h.textContent = "♥";
      const r = img.getBoundingClientRect();
      h.style.left = e.clientX - r.left + "px";
      h.style.top = e.clientY - r.top + "px";
      img.appendChild(h);
      setTimeout(() => h.remove(), 700);
    });
  })();

  /* ---- Pricing range (44) ---- */
  (function pricing() {
    const range = $("#p-seatrange");
    if (!range) return;
    const seats = $("#p-seats"), price = $("#p-priceval");
    const update = () => {
      const n = +range.value;
      seats.textContent = n;
      price.textContent = (n * 9).toLocaleString();
    };
    range.addEventListener("input", update);
    update();
  })();

  /* ---- Good / Cheap / Fast (32) ---- */
  (function gcf() {
    const box = $(".p-gcf");
    if (!box) return;
    const boxes = $$("input[type=checkbox]", box), msg = $(".p-gcf__msg", box);
    const labels = { good: "Good", cheap: "Cheap", fast: "Fast" };
    boxes.forEach((cb) =>
      cb.addEventListener("change", () => {
        const checked = boxes.filter((b) => b.checked);
        if (checked.length >= 2) {
          boxes.forEach((b) => { if (!b.checked) b.disabled = true; });
          const off = boxes.find((b) => !b.checked);
          msg.textContent = off ? `Then it won't be ${labels[off.value].toLowerCase()}. We chose honesty.` : "";
        } else {
          boxes.forEach((b) => (b.disabled = false));
          msg.textContent = "Choose two options.";
        }
      })
    );
  })();

  /* ---- Quiz (46) ---- */
  (function quiz() {
    const root = $(".p-quiz");
    if (!root) return;
    const qs = [
      { q: "How big is your team?", a: [["Just me", "Solo"], ["2–10", "Team"], ["10+", "Business"]] },
      { q: "What matters most?", a: [["Simplicity", "Solo"], ["Collaboration", "Team"], ["Control & SSO", "Business"]] },
      { q: "Budget vibe?", a: [["Free-ish", "Solo"], ["Reasonable", "Team"], ["Whatever works", "Business"]] },
    ];
    let step = 0; const tally = {};
    function render() {
      if (step >= qs.length) {
        const plan = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
        root.innerHTML = `<div class="p-quiz__result"><p class="p-eyebrow">Your match</p><h3>${plan} plan</h3><a class="p-btn" href="signup.html">Start with ${plan} →</a></div>`;
        return;
      }
      const cur = qs[step];
      root.innerHTML = `<div class="p-quiz__bar"><span style="width:${(step / qs.length) * 100}%"></span></div>
        <h3>${cur.q}</h3><div class="p-quiz__opts"></div>`;
      const opts = $(".p-quiz__opts", root);
      cur.a.forEach(([label, key]) => {
        const b = document.createElement("button");
        b.className = "p-btn p-btn--ghost";
        b.textContent = label;
        b.addEventListener("click", () => { tally[key] = (tally[key] || 0) + 1; step++; render(); });
        opts.appendChild(b);
      });
    }
    render();
  })();

  /* ---- Countdown (34) ---- */
  (function countdown() {
    const d = $("#cd-d"); if (!d) return;
    const target = Date.now() + 3 * 864e5 + 5 * 36e5; // ~3 days out
    const pad = (n) => String(n).padStart(2, "0");
    (function tick() {
      let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      d.textContent = pad(Math.floor(s / 86400));
      $("#cd-h").textContent = pad(Math.floor((s % 86400) / 3600));
      $("#cd-m").textContent = pad(Math.floor((s % 3600) / 60));
      $("#cd-s").textContent = pad(s % 60);
      setTimeout(tick, 1000);
    })();
  })();

  /* ---- FAQ (11) ---- */
  (function faq() {
    const root = $(".p-faqs");
    if (!root) return;
    const items = [
      ["Is there a free plan?", "Yes — solo use is free forever, no card required."],
      ["Can I import from other apps?", "One-click import from Notion, Todoist, and CSV."],
      ["Do you have a mobile app?", "iOS and Android, plus a fast installable web app."],
      ["How is my data handled?", "Encrypted in transit and at rest; export anytime."],
    ];
    items.forEach(([q, a]) => {
      const el = document.createElement("div");
      el.className = "p-faq";
      el.innerHTML = `<button class="p-faq__q">${q}<span>+</span></button><div class="p-faq__a"><p>${a}</p></div>`;
      el.querySelector(".p-faq__q").addEventListener("click", () => el.classList.toggle("open"));
      root.appendChild(el);
    });
  })();

  /* ---- Team via GitHub API (28), graceful fallback ---- */
  (function team() {
    const root = $(".p-team");
    if (!root) return;
    const users = ["torvalds", "gaearon", "sindresorhus", "yyx990803"];
    const fallback = (u) => ({ login: u, name: u, avatar_url: `https://avatars.githubusercontent.com/${u}`, bio: "PULSE crew" });
    users.forEach(async (u) => {
      let data;
      try {
        const res = await fetch(`https://api.github.com/users/${u}`);
        data = res.ok ? await res.json() : fallback(u);
      } catch (_) { data = fallback(u); }
      const card = document.createElement("a");
      card.className = "p-card p-team__card";
      card.href = data.html_url || "#";
      card.target = "_blank"; card.rel = "noopener";
      card.innerHTML = `<img src="${data.avatar_url}" alt=""><h4>${data.name || data.login}</h4><small>${data.bio || "PULSE crew"}</small>`;
      root.appendChild(card);
    });
  })();

  /* ---- Newsletter form wave (7) + toast (27) ---- */
  (function news() {
    const form = $("#p-news-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = $$("input", form);
      if (inputs.some((i) => !i.value.trim())) return window.pulseToast("Please fill both fields", "error");
      form.reset();
      window.pulseToast("You're subscribed! 🎉", "success");
    });
  })();

  /* ---- Feedback (43) ---- */
  (function feedback() {
    const box = $(".p-feedback");
    if (!box) return;
    let chosen = null;
    $$("button[data-v]", box).forEach((b) =>
      b.addEventListener("click", () => {
        $$("button[data-v]", box).forEach((x) => x.classList.remove("sel"));
        b.classList.add("sel");
        chosen = b.dataset.v;
      })
    );
    $("#p-feedback-send").addEventListener("click", () => {
      if (!chosen) return window.pulseToast("Pick an emoji first", "error");
      window.pulseToast("Thanks for the feedback!", "success");
    });
  })();
})();
