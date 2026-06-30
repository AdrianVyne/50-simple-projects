/* PULSE 404: Hoverboard (36), Catch The Insect (50), Dad Jokes (9). */
(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);

  /* ---- Hoverboard background (36) ---- */
  (function hoverboard() {
    const board = $(".p-hoverboard");
    if (!board) return;
    const colors = ["#ff2e97", "#7b2ff7", "#2bd2ff", "#ff8a3d", "#4ade80"];
    const build = () => {
      board.innerHTML = "";
      const size = 32;
      const cols = Math.ceil(window.innerWidth / size);
      const rows = Math.ceil(window.innerHeight / size);
      board.style.setProperty("--cols", cols);
      for (let i = 0; i < cols * rows; i++) {
        const sq = document.createElement("div");
        sq.className = "p-hb";
        sq.addEventListener("mouseenter", () => {
          const c = colors[Math.floor(Math.random() * colors.length)];
          sq.style.background = c;
          sq.style.boxShadow = `0 0 14px ${c}`;
          sq.style.transition = "none";
          requestAnimationFrame(() => {
            sq.style.transition = "background 1.6s ease, box-shadow 1.6s ease";
            sq.style.background = "";
            sq.style.boxShadow = "";
          });
        });
        board.appendChild(sq);
      }
    };
    build();
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(build, 200); });
  })();

  /* ---- Catch The Insect (50) ---- */
  (function game() {
    const root = $(".p-buggame");
    if (!root) return;
    const timeEl = $("#p-bug-time"), scoreEl = $("#p-bug-score"), startBtn = $(".p-bug-start");
    const bugs = ["🪰", "🦟", "🕷️", "🪳", "🐜"];
    let score = 0, secs = 0, running = false, spawnT, clockT;

    function spawn() {
      const bug = document.createElement("button");
      bug.className = "p-bug";
      bug.textContent = bugs[Math.floor(Math.random() * bugs.length)];
      bug.style.left = Math.random() * (window.innerWidth - 60) + "px";
      bug.style.top = 80 + Math.random() * (window.innerHeight - 200) + "px";
      bug.style.fontSize = 24 + Math.random() * 22 + "px";
      bug.addEventListener("click", () => {
        score++; scoreEl.textContent = score;
        bug.classList.add("squashed");
        setTimeout(() => bug.remove(), 200);
      });
      root.appendChild(bug);
      setTimeout(() => bug.remove(), 2200);
    }

    function start() {
      if (running) { stop(); return; }
      running = true;
      score = 0; secs = 0;
      scoreEl.textContent = 0; timeEl.textContent = 0;
      startBtn.textContent = "Stop";
      spawnT = setInterval(spawn, 700);
      clockT = setInterval(() => { secs++; timeEl.textContent = secs; }, 1000);
    }
    function stop() {
      running = false;
      startBtn.textContent = "Start the swarm";
      clearInterval(spawnT); clearInterval(clockT);
      document.querySelectorAll(".p-bug").forEach((b) => b.remove());
      if (score > 0) window.pulseToast(`You squashed ${score} bugs in ${secs}s 🐛`, "success");
    }
    startBtn.addEventListener("click", start);
  })();

  /* ---- Dad Jokes (9) ---- */
  (function jokes() {
    const out = $("#p-joke"), btn = $("#p-joke-btn");
    if (!out) return;
    const fallback = [
      "Why don't skeletons fight each other? They don't have the guts.",
      "I only know 25 letters of the alphabet. I don't know y.",
      "What do you call fake spaghetti? An impasta.",
      "I'm reading a book on anti-gravity. It's impossible to put down.",
    ];
    async function load() {
      out.textContent = "…";
      try {
        const res = await fetch("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
        if (!res.ok) throw 0;
        const d = await res.json();
        out.textContent = d.joke;
      } catch (_) {
        out.textContent = fallback[Math.floor(Math.random() * fallback.length)];
      }
    }
    btn.addEventListener("click", load);
    load();
  })();
})();
