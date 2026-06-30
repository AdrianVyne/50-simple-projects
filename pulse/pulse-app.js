/* PULSE dashboard widgets. Each card maps to a source project (see chips). */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* ---- Rotating navigation (3) ---- */
  const rotate = $("#p-rotate");
  rotate && rotate.addEventListener("click", () => document.body.classList.toggle("show-nav"));
  $$(".p-rotnav a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("show-nav")));

  /* ---- Netflix slide-out (45) ---- */
  const nf = $("#p-netflix");
  $(".p-netflix-open") && $(".p-netflix-open").addEventListener("click", () => nf.classList.add("open"));
  nf && $(".p-netflix__close", nf).addEventListener("click", () => nf.classList.remove("open"));
  nf && nf.addEventListener("click", (e) => { if (e.target === nf) nf.classList.remove("open"); });
  $$(".p-netflix a").forEach((a) => a.addEventListener("click", () => nf.classList.remove("open")));

  /* ---- Keyboard shortcuts + Event KeyCodes (10) ---- */
  const modal = $("#p-shortcuts");
  const openModal = () => modal.classList.add("open");
  const closeModal = () => modal.classList.remove("open");
  $("#p-shortcuts-btn") && $("#p-shortcuts-btn").addEventListener("click", openModal);
  modal && $(".p-modal__close", modal).addEventListener("click", closeModal);
  modal && modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (modal && modal.classList.contains("open")) {
      $("#p-keyout").innerHTML = `<b>${e.key === " " ? "Space" : e.key}</b> · code <b>${e.keyCode}</b> · ${e.code}`;
    }
    if (typing) return;
    if (e.key === "?") openModal();
    if (e.key === "Escape") closeModal();
    if (e.key.toLowerCase() === "t") location.hash = "#w-tasks";
  });

  /* ---- Todo (49) ---- */
  (function todo() {
    const input = $(".p-todo-input"), list = $(".p-todo-list");
    if (!input) return;
    const add = (text) => {
      const li = document.createElement("li");
      li.textContent = text;
      li.addEventListener("click", () => li.classList.toggle("done"));
      li.addEventListener("contextmenu", (e) => { e.preventDefault(); li.remove(); });
      list.appendChild(li);
    };
    ["Review pull request", "Water the plants 🌿", "Plan sprint"].forEach(add);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value.trim()) { add(input.value.trim()); input.value = ""; }
    });
  })();

  /* ---- Drag & drop (21) ---- */
  (function dnd() {
    const cols = $$(".p-dnd__col");
    if (!cols.length) return;
    const items = ["Design review", "Fix login bug", "Write changelog", "Ship v2"];
    items.forEach((t, i) => {
      const el = document.createElement("div");
      el.className = "p-dnd__item";
      el.textContent = t;
      el.draggable = true;
      el.addEventListener("dragstart", () => el.classList.add("dragging"));
      el.addEventListener("dragend", () => el.classList.remove("dragging"));
      cols[i < 2 ? 0 : 1].appendChild(el);
    });
    cols.forEach((col) => {
      col.addEventListener("dragover", (e) => { e.preventDefault(); col.classList.add("over"); });
      col.addEventListener("dragleave", () => col.classList.remove("over"));
      col.addEventListener("drop", () => {
        col.classList.remove("over");
        const dragging = $(".dragging");
        if (dragging) col.appendChild(dragging);
      });
    });
  })();

  /* ---- Notes (33) ---- */
  (function notes() {
    const ta = $(".p-note"), status = $("#p-note-status");
    if (!ta) return;
    ta.value = localStorage.getItem("pulse-note") || "";
    let t;
    ta.addEventListener("input", () => {
      status.textContent = "Saving…";
      clearTimeout(t);
      t = setTimeout(() => {
        localStorage.setItem("pulse-note", ta.value);
        status.textContent = "Saved locally";
      }, 400);
    });
  })();

  /* ---- Hydration (15) ---- */
  (function water() {
    const cups = $("#p-water-cups"), big = $("#p-water-big");
    if (!cups) return;
    const total = 8;
    for (let i = 0; i < total; i++) {
      const c = document.createElement("button");
      c.className = "p-cup";
      c.dataset.idx = i;
      c.addEventListener("click", () => {
        const idx = +c.dataset.idx;
        const filled = $$(".p-cup", cups).filter((x) => x.classList.contains("full")).length;
        const fillTo = idx + 1 === filled ? idx : idx + 1;
        $$(".p-cup", cups).forEach((x, j) => x.classList.toggle("full", j < fillTo));
        big.textContent = Math.round((fillTo / total) * 100) + "%";
      });
      cups.appendChild(c);
    }
  })();

  /* ---- Clock (19) ---- */
  (function clock() {
    const el = $("#p-clock"), date = $("#p-clock-date");
    if (!el) return;
    const tick = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, "0");
      el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
      date.textContent = d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    };
    tick(); setInterval(tick, 1000);
  })();

  /* ---- Live user filter (42) ---- */
  (function filter() {
    const input = $(".p-filter-input"), list = $(".p-filter-list");
    if (!input) return;
    const team = [
      ["Avery Stone", "Design"], ["Noah Kim", "Engineering"], ["Mia García", "Product"],
      ["Liam Patel", "Growth"], ["Zoe Müller", "Support"], ["Ethan Cole", "Data"],
    ];
    team.forEach(([n, r]) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${n}</strong><small>${r}</small>`;
      list.appendChild(li);
    });
    input.addEventListener("input", () => {
      const q = input.value.toLowerCase();
      $$("li", list).forEach((li) => (li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none"));
    });
  })();

  /* ---- Decide for me (12) ---- */
  (function picker() {
    const ta = $(".p-pick-input"), btn = $(".p-pick-btn"), out = $(".p-pick-out");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const opts = ta.value.split("\n").map((s) => s.trim()).filter(Boolean);
      if (!opts.length) return;
      out.textContent = "🎲 " + opts[Math.floor(Math.random() * opts.length)];
    });
  })();

  /* ---- Discover feed / Movie App (17) with skeletons (24) ---- */
  (function discover() {
    const wrap = $(".p-discover");
    if (!wrap) return;
    for (let i = 0; i < 4; i++) {
      const s = document.createElement("div");
      s.className = "p-disc__card p-skeleton";
      s.style.height = "200px";
      wrap.appendChild(s);
    }
    const data = [
      ["Deep Focus", "9.1", "A documentary on the science of attention."],
      ["The Standup", "8.4", "A startup races to ship before the demo."],
      ["Night Shift", "7.8", "Designers who only work after midnight."],
      ["Open Source", "8.9", "The people quietly running the internet."],
    ];
    setTimeout(() => {
      wrap.innerHTML = "";
      data.forEach((m, i) => {
        const card = document.createElement("div");
        card.className = "p-disc__card";
        card.innerHTML = `
          <img src="https://picsum.photos/seed/pulse-disc${i}/300/200" alt="">
          <div class="p-disc__info"><span>${m[0]}</span><b class="${+m[1] >= 8.5 ? "good" : "ok"}">${m[1]}</b></div>
          <div class="p-disc__over">${m[2]}</div>`;
        wrap.appendChild(card);
      });
    }, 1200);
  })();

  /* ---- Integrations / Pokedex via PokéAPI (37) ---- */
  (function integrations() {
    const wrap = $(".p-integrations");
    if (!wrap) return;
    const fallback = ["slack", "github", "figma", "notion", "linear", "zoom", "stripe", "gmail"];
    const render = (names) => {
      wrap.innerHTML = "";
      names.slice(0, 8).forEach((n) => {
        const el = document.createElement("div");
        el.className = "p-int";
        el.innerHTML = `<span class="p-int__dot"></span>${n}`;
        wrap.appendChild(el);
      });
    };
    fetch("https://pokeapi.co/api/v2/pokemon?limit=8")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => render(d.results.map((x) => x.name)))
      .catch(() => render(fallback));
  })();

  /* ---- Inspiration gallery / Random Image Feed (48) ---- */
  (function gallery() {
    const wrap = $(".p-gallery");
    if (!wrap) return;
    for (let i = 0; i < 9; i++) {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = `https://picsum.photos/seed/pulse-g${i}-${Math.floor(Math.random() * 9999)}/240/240`;
      wrap.appendChild(img);
    }
  })();

  /* ---- Whiteboard / Drawing (22) ---- */
  (function draw() {
    const canvas = $(".p-draw");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let drawing = false;
    const color = $(".p-draw-color"), size = $(".p-draw-size");
    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const start = (e) => { drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    const move = (e) => {
      if (!drawing) return;
      e.preventDefault();
      const p = pos(e);
      ctx.strokeStyle = color.value;
      ctx.lineWidth = size.value;
      ctx.lineCap = "round";
      ctx.lineTo(p.x, p.y); ctx.stroke();
    };
    const end = () => (drawing = false);
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
    $(".p-draw-clear").addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  })();

  /* ---- Focus sounds (8) via WebAudio ---- */
  (function sounds() {
    const wrap = $(".p-sounds");
    if (!wrap) return;
    const pads = [["Rain", 220], ["Waves", 180], ["Hum", 140], ["Ping", 660], ["Wind", 300], ["Bell", 880]];
    let actx;
    pads.forEach(([name, freq]) => {
      const b = document.createElement("button");
      b.className = "p-pad";
      b.textContent = name;
      b.addEventListener("click", () => {
        actx = actx || new (window.AudioContext || window.webkitAudioContext)();
        const o = actx.createOscillator(), g = actx.createGain();
        o.frequency.value = freq;
        o.type = "sine";
        g.gain.value = 0.0001;
        o.connect(g); g.connect(actx.destination);
        const t = actx.currentTime;
        g.gain.exponentialRampToValueAtTime(0.2, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        o.start(t); o.stop(t + 0.7);
      });
      wrap.appendChild(b);
    });
  })();
})();
