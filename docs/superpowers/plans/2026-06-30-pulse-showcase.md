# PULSE (51st Project) Implementation Plan

> **For agentic workers:** Build task-by-task. This is a static front-end with
> no test runner, so each task's "verify" step is manual: open the page in a
> browser and confirm the listed features work and each hover chip links to the
> right `project-N.html`. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cohesive fictional product site, "PULSE", under `pulse/`, where all 50 mini-projects are rebuilt inline as real features, each with a hover chip linking back to its source project.

**Architecture:** Four static pages (landing, signup, app, 404) sharing one brand stylesheet and a shared JS core (hover-chip system, theme toggle, nav, toasts, ripple, loader). Each page also has a small page-specific JS file for its widgets. Vanilla HTML/CSS/JS, no frameworks, no build step.

**Tech Stack:** HTML5, CSS3 (custom properties, grid/flex), vanilla ES6 JS. External: GitHub API (team), PokéAPI (integrations), picsum (imagery) — same services the source projects used.

## Global Constraints

- Lives under `pulse/`; pure static; served by existing GitHub Pages.
- Every page includes `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />`.
- No frameworks, no bundlers. Vanilla only. Match repo code style.
- All 50 projects featured, each rebuilt inline (no iframes), each with exactly one canonical hover chip (`data-project`, `data-name`).
- Responsive to mobile. No console errors. No dead asset URLs.
- Brand: PULSE; reuse the homepage mesh-gradient; Space Grotesk; light default + dark toggle.

## File Structure

```
pulse/
  index.html          landing
  signup.html         sign-up flow
  app.html            dashboard
  404.html            easter-egg page
  pulse.css           shared brand + theme + component styles
  pulse.js            shared core: chip system, theme, nav, toast, ripple, loader
  pulse-landing.js    landing widgets (hero typing, slider, carousel, counter, quiz, pricing, FAQ, team, etc.)
  pulse-signup.js     wizard, password gen/strength, OTP
  pulse-app.js        dashboard widgets (todo, dnd, notes, water, clock, filter, feeds, draw, sounds, picker, shortcuts)
  pulse-404.js        hoverboard, catch-the-insect, dad joke
```

Refinement vs spec: split page JS into per-page files (keeps each file focused
and reliable to edit). `pulse.css` may import the existing Google Fonts.

---

### Task 1: Shell — brand, theme, and the hover-chip system

**Files:**
- Create: `pulse/pulse.css`, `pulse/pulse.js`
- Modify: `index.html` (add the "#51 · Bonus — PULSE" link)

**Produces (used by every later task):**
- CSS custom properties + utility classes for cards, buttons (`.p-btn` with ripple), chips, toasts, skeletons.
- `pulse.js` global behaviors, auto-initialized on `DOMContentLoaded`:
  - Hover-chip: delegated handler; any `[data-project][data-name]` element shows chip `⬢ #N · <name> →` on hover/focus, linking to `../html/project-N.html` (target=_blank). (Credits projects: **20** ripple via `.p-btn`, **27** toast, **24** skeleton, **23** loader, **25/13/4** nav, **19** theme — chips attached where each is first used.)
  - `pulseToast(msg, type)` → Toast Notification (#27).
  - Ripple on `.p-btn` click → Button Ripple (#20).
  - Theme toggle (light/dark via `data-theme` on `<html>`) → paired with Theme Clock (#19) on dashboard.
  - Kinetic loader overlay that fades out on load → Kinetic Loader (#23).
  - Skeleton helper (`.p-skeleton` shimmer) → Content Placeholder (#24).

- [ ] **Step 1:** Write `pulse/pulse.css` — reset, brand tokens (mesh gradient, Space Grotesk), theme variables for light/dark, and shared components: `.p-nav`, `.p-btn`(+ripple), `.p-chip`, `.p-toast`, `.p-skeleton`, `.p-card`, loader overlay.
- [ ] **Step 2:** Write `pulse/pulse.js` — chip system, `pulseToast`, ripple, theme toggle, loader fade, skeleton helper; auto-init.
- [ ] **Step 3:** Add a distinct "#51 · Bonus — PULSE" link/card on the main `index.html` homepage (above or beside the grid), linking to `pulse/index.html`.
- [ ] **Step 4 (verify):** Open `pulse/index.html` stub — loader fades, theme toggles, a test `.p-btn` ripples, a test chip links correctly, a toast fires. Homepage shows the #51 link.

---

### Task 2: Landing — `pulse/index.html` + `pulse/pulse-landing.js`

**Files:** Create `pulse/index.html`, `pulse/pulse-landing.js`. Uses Task 1.

**Features (each with its canonical chip):** Sticky Nav (25), Animated mobile menu (13), Hidden Search (4), Split hero (16), Typing headline (30), Background slider (18), Hero CTA ripple (20), Scroll-reveal (6), Expanding cards (1), Blurry-loading images (5), Screenshot carousel (35), Vertical story slider (26), Stats counter (14), 3D-boxes divider (40), Testimonials (47), Double-tap heart (29), Pricing range slider (44), Good/Cheap/Fast (32), Plan quiz (46), Countdown banner (34), FAQ (11), Team via GitHub API (28), Newsletter form wave (7), Subscribe toast (27), Feedback widget (43), loader (23) + skeletons (24).

- [ ] **Step 1:** Build `index.html` structure: nav, hero, features, social proof, pricing, quiz, FAQ, team, footer — each feature block tagged `data-project`/`data-name`.
- [ ] **Step 2:** Build `pulse-landing.js`: typing effect, slider, carousel, IntersectionObserver scroll-reveal + counter, quiz logic, pricing slider/labels, FAQ accordion, GitHub team fetch (graceful fallback), newsletter→toast.
- [ ] **Step 3:** Add landing-specific CSS to `pulse.css`.
- [ ] **Step 4 (verify):** Open page; scroll through; confirm every feature animates/works and each chip links to the matching project. Responsive check at mobile width.

---

### Task 3: Sign-up — `pulse/signup.html` + `pulse/pulse-signup.js`

**Files:** Create both. Uses Task 1.

**Features:** Progress Steps (2), Form Wave fields (7-style), Password Generator (31), Password Strength reactive background (39), Verify Account OTP (41). Buttons ripple (20), success toast (27).

- [ ] **Step 1:** `signup.html`: 3-step wizard (Account → Password → Verify), each step tagged.
- [ ] **Step 2:** `pulse-signup.js`: step navigation + progress fill, password strength meter driving a background blur/hue, generate-password button, OTP auto-advance inputs, final success → toast + link to `app.html`.
- [ ] **Step 3:** Signup CSS into `pulse.css`.
- [ ] **Step 4 (verify):** Walk the wizard end-to-end; chips link correctly; mobile check.

---

### Task 4: Dashboard — `pulse/app.html` + `pulse/pulse-app.js`

**Files:** Create both. Uses Task 1.

**Features:** Netflix mobile menu (45), Rotating desktop side-nav (3), Mobile tab bar (38), Skeletons on load (24), Todo (49), Drag-n-drop board (21), Notes (33), Hydration (15), Clock + dark mode (19), Team live-filter (42), Discover feed / Movie App (17), Integrations / Pokedex via PokéAPI (37), Inspiration gallery / Random Image Feed (48), Whiteboard / Drawing (22), Focus sounds (8), Decide-for-me picker (12), Keyboard-shortcuts modal (10).

- [ ] **Step 1:** `app.html`: app chrome (side nav, top bar, mobile tab bar) + a widget grid; each widget a tagged `.p-card`.
- [ ] **Step 2:** `pulse-app.js`: implement each widget's behavior; skeletons show then resolve; PokéAPI + picsum fetches with graceful fallback; canvas whiteboard; soundboard (WebAudio beeps or reuse repo sounds); shortcuts modal via keydown.
- [ ] **Step 3:** Dashboard CSS into `pulse.css`.
- [ ] **Step 4 (verify):** Each widget works; chips correct; mobile tab nav + slide-out menu work; no console errors.

---

### Task 5: 404 — `pulse/404.html` + `pulse/pulse-404.js`

**Files:** Create both. Uses Task 1.

**Features:** Hoverboard background (36), Catch-the-Insect game (50), Dad Jokes (9).

- [ ] **Step 1:** `404.html`: "lost" message, the game container, a "tell me a joke" button, hoverboard grid background — each tagged.
- [ ] **Step 2:** `pulse-404.js`: hoverboard random-color hover, the timed insect-catch game, Dad-Jokes API fetch with fallback.
- [ ] **Step 3:** 404 CSS into `pulse.css`.
- [ ] **Step 4 (verify):** Game plays, joke loads, hoverboard reacts; chips correct.

---

### Task 6: Final pass — noindex, polish, verify all 50

**Files:** All `pulse/*.html`.

- [ ] **Step 1:** Confirm `noindex` meta on all four pages.
- [ ] **Step 2:** Grep that exactly the project numbers 1–50 appear once each across `data-project` attributes (every project credited).
- [ ] **Step 3:** Click-through all four pages: no console errors, no dead images, chips all resolve, responsive at mobile.
- [ ] **Step 4:** Hand off to user to test before any commit.

## Self-Review

- **Spec coverage:** All 50 placements from the spec map to Tasks 2–5; shell behaviors (20/27/24/23/19/25/13/4) covered in Task 1; homepage link in Task 1. ✔
- **Placeholders:** None — each task lists concrete features, files, and verification.
- **Consistency:** Shared names (`pulseToast`, `.p-btn`, `.p-chip`, `.p-card`, `.p-skeleton`, `data-project`/`data-name`) used consistently across tasks.
