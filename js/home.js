/* =========================================================
   Home page grid builder.
   Each tile is a live, scaled-down iframe of the real project,
   lazy-loaded as it nears the viewport. Vanilla JS, no jQuery.
   ========================================================= */

const PROJECTS = [
  { n: 1,  name: "Expanding Cards",            desc: "Click panels to expand with a smooth flex slide." },
  { n: 2,  name: "Progress Steps",             desc: "A stepper that fills as you move next and back." },
  { n: 3,  name: "Rotating Navigation",        desc: "The whole page rotates to reveal a side menu." },
  { n: 4,  name: "Hidden Search",              desc: "An icon expands into a sliding search bar." },
  { n: 5,  name: "Blurry Loading",             desc: "An image sharpens as the percentage counts up." },
  { n: 6,  name: "Scroll Animation",           desc: "Boxes slide in from alternating sides on scroll." },
  { n: 7,  name: "Form Input Wave",            desc: "Labels wave up letter by letter on focus." },
  { n: 8,  name: "Sound Board",                desc: "Tap buttons to trigger sound effects." },
  { n: 9,  name: "Dad Jokes",                  desc: "Pulls a random dad joke from an API." },
  { n: 10, name: "Event KeyCodes",             desc: "Press any key to see its JavaScript keycode." },
  { n: 11, name: "FAQ",                        desc: "Accordion questions that expand on click." },
  { n: 12, name: "Random Choice Picker",       desc: "Type options and it picks one at random." },
  { n: 13, name: "Animated Navigation",        desc: "A navbar that animates as you toggle it." },
  { n: 14, name: "Increment Counter",          desc: "Numbers tick up to their target value." },
  { n: 15, name: "Drink Water",                desc: "Fill cups to track your daily water intake." },
  { n: 16, name: "Split Landing Page",         desc: "Two halves expand as you hover each side." },
  { n: 17, name: "Movie App",                  desc: "Search and browse movies with ratings from an API." },
  { n: 18, name: "Background Slider",          desc: "A slideshow where the background follows along." },
  { n: 19, name: "Theme Clock",                desc: "An analog clock with a light and dark toggle." },
  { n: 20, name: "Button Ripple Effect",       desc: "A material-style ripple on every click." },
  { n: 21, name: "Drag N Drop",                desc: "Drag an item between drop zones." },
  { n: 22, name: "Drawing App",                desc: "A canvas sketchpad with size and color controls." },
  { n: 23, name: "Kinetic Loader",             desc: "A pure-CSS animated loading spinner." },
  { n: 24, name: "Content Placeholder",        desc: "A skeleton shimmer that swaps in real content." },
  { n: 25, name: "Sticky Navigation",          desc: "A navbar that sticks and shrinks on scroll." },
  { n: 26, name: "Vertical Slider",            desc: "A full-screen vertical sliding carousel." },
  { n: 27, name: "Toast Notification",         desc: "Click to spawn stacking toast messages." },
  { n: 28, name: "Github Profiles",            desc: "Search a username and pull their GitHub profile." },
  { n: 29, name: "Double Click Heart",         desc: "Double-tap to drop Instagram-style hearts." },
  { n: 30, name: "Auto Text Effect",           desc: "Typewriter text that types itself out." },
  { n: 31, name: "Password Generator",         desc: "Build a random password with custom options." },
  { n: 32, name: "Good, Cheap, Fast",          desc: "Pick two and the third switches off." },
  { n: 33, name: "Notes App",                  desc: "Add, edit, and delete notes saved in your browser." },
  { n: 34, name: "Animated Countdown",         desc: "Numbers animate down from three to launch." },
  { n: 35, name: "Image Carousel",             desc: "An auto-rotating slideshow with dots and arrows." },
  { n: 36, name: "Hoverboard",                 desc: "A grid of squares that glow under your cursor." },
  { n: 37, name: "Pokedex",                    desc: "Fetches and lists Pokémon from the PokeAPI." },
  { n: 38, name: "Mobile Tab Navigation",      desc: "An app-style bottom tab switcher." },
  { n: 39, name: "Password Strength",          desc: "The background blurs by password strength." },
  { n: 40, name: "3D Boxes Background",        desc: "A grid that assembles into a 3D image." },
  { n: 41, name: "Verify Account",             desc: "A one-box-per-digit verification code UI." },
  { n: 42, name: "Live User Filter",           desc: "Filter a live user list as you type." },
  { n: 43, name: "Feedback UI",                desc: "An emoji feedback rating widget." },
  { n: 44, name: "Custom Range Slider",        desc: "A styled range slider that shows its value." },
  { n: 45, name: "Netflix Mobile Nav",         desc: "A Netflix-style expanding mobile menu." },
  { n: 46, name: "Quiz App",                   desc: "A multiple-choice quiz that tracks your score." },
  { n: 47, name: "Testimonial Box",            desc: "Auto-rotating testimonial cards." },
  { n: 48, name: "Random Image Feed",          desc: "A grid of random images from an API." },
  { n: 49, name: "Todo List",                  desc: "Add tasks, click to complete, right-click to remove." },
  { n: 50, name: "Catch The Insect",           desc: "A timed click game catching bugs." },
];

// rotate the hover-glow through the palette so the wall feels alive
const GLOWS = ["#ff2e97", "#7b2ff7", "#2bd2ff", "#ff8a3d"];
const VIRTUAL_W = 1280; // must match --tile-virtual-w in home.css

const grid = document.getElementById("grid");

const tiles = PROJECTS.map((p, i) => {
  const a = document.createElement("a");
  a.className = "tile";
  a.href = `html/project-${p.n}.html`;
  a.style.setProperty("--glow", GLOWS[i % GLOWS.length]);
  a.setAttribute("aria-label", `Project ${p.n}: ${p.name}`);

  a.innerHTML = `
    <div class="tile__skeleton">LOADING</div>
    <iframe class="tile__frame" title="${p.name} preview" loading="lazy"
            scrolling="no" tabindex="-1" aria-hidden="true"
            sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
    <span class="tile__num">${String(p.n).padStart(2, "0")}</span>
    <div class="tile__meta">
      <h2 class="tile__name">${p.name}</h2>
      <p class="tile__desc">${p.desc}</p>
      <span class="tile__cta">Open project &rarr;</span>
    </div>`;

  const frame = a.querySelector(".tile__frame");
  frame.dataset.src = `html/project-${p.n}.html`;
  frame.addEventListener("load", () => {
    if (frame.src) a.classList.add("is-loaded");
  });

  grid.appendChild(a);
  return a;
});

/* ---- keep each live preview scaled to fit its tile ---- */
function rescale() {
  const first = tiles[0];
  if (!first) return;
  const w = first.clientWidth;
  if (w > 0) grid.style.setProperty("--scale", (w / VIRTUAL_W).toFixed(4));
}
rescale();
if ("ResizeObserver" in window) {
  new ResizeObserver(rescale).observe(grid);
} else {
  window.addEventListener("resize", rescale);
}

/* ---- only load a preview when it's about to be seen ---- */
function loadFrame(tile) {
  const frame = tile.querySelector(".tile__frame");
  if (frame && !frame.src && frame.dataset.src) frame.src = frame.dataset.src;
}

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadFrame(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "600px 0px" });
  tiles.forEach((t) => io.observe(t));
} else {
  tiles.forEach(loadFrame); // old browsers: just load them all
}

/* ---- footer ---- */
const foot = document.createElement("footer");
foot.className = "foot";
foot.innerHTML = "50 Projects in 50 Days &middot; built with plain HTML, CSS &amp; JavaScript";
document.body.appendChild(foot);
