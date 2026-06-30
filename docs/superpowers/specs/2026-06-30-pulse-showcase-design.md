# PULSE — The 51st Project (Design Spec)

**Date:** 2026-06-30
**Status:** Approved design, pre-implementation

## Goal

Build a bonus "51st project": one cohesive, real-feeling product website for a
fictional all-in-one app called **PULSE**, where every visible feature is
hand-rebuilt from one of the 50 mini-projects in this repo. A hover "chip"
on each feature reveals which project it came from and links back to that
project's page. The result reads as a genuine product site, but doubles as a
guided tour of all 50 builds.

## Constraints & Non-Goals

- **Lives in this repo** as static pages under `pulse/`, served by the same
  GitHub Pages. No backend, no build step, no frameworks — vanilla HTML/CSS/JS,
  matching the rest of the repo.
- **All 50 projects** are featured, each rebuilt **inline** (native markup/CSS/JS
  in the PULSE pages — no iframes), each with exactly one canonical hover chip.
- **`noindex`** on every PULSE page (consistent with the rest of the site).
- **Responsive** down to mobile.
- Delivered in **one pass**, then handed over for a single test.
- External services are used only where the source project already did
  (e.g. GitHub API for team, PokéAPI for the integrations catalog, picsum for
  imagery). Auth/sign-up is a front-end simulation — no real accounts.

## File Structure

```
pulse/
  index.html     landing page
  signup.html    sign-up flow
  app.html       logged-in dashboard
  404.html       easter-egg "lost" page
  pulse.css      shared brand styling (gradient brand, dark/light theme)
  pulse.js       shared behavior + the hover-chip system
```

Linked from the main homepage (`index.html`) as a distinct **"#51 · Bonus —
PULSE"** entry, set apart from the project grid.

## The Hover-Chip System (`pulse.js`)

- Any feature is marked up with `data-project="N"` and `data-name="..."`.
- On `mouseenter`, a floating chip appears near the cursor/element reading
  **`⬢ #N · <Name> →`**; clicking it opens `../html/project-N.html` in a new tab.
- The chip is keyboard-accessible (focusable wrapper, chip shown on focus too).
- A single delegated handler powers all 50 — add a feature by adding the two
  data attributes, nothing else.
- Default state is a clean site; chips only appear on hover/focus.

## Brand & Visual Direction

- **PULSE**: modern SaaS aesthetic. Reuse the vibrant animated mesh-gradient
  from the homepage hero for brand continuity; clean type (Space Grotesk),
  generous spacing, rounded cards, soft shadows.
- **Theme**: light by default with a dark-mode toggle (credited to Theme Clock).

## Canonical Project Placement (all 50, each once)

### Landing — `pulse/index.html`
| # | Project | Used as |
|---|---------|---------|
| 23 | Kinetic Loader | Initial page loader |
| 25 | Sticky Navigation | Sticky top navbar |
| 13 | Animated Navigation | Animated mobile menu toggle |
| 4 | Hidden Search | Search icon that expands in the nav |
| 16 | Split Landing | Split hero ("For teams / For solo") |
| 30 | Auto Text Effect | Typing hero headline |
| 18 | Background Slider | Rotating hero background |
| 20 | Button Ripple | Primary hero CTA ripple |
| 6 | Scroll Animation | Sections reveal on scroll |
| 1 | Expanding Cards | "Explore features" image cards |
| 5 | Blurry Loading | Feature images sharpen as they load |
| 35 | Image Carousel | Product screenshots carousel |
| 26 | Vertical Slider | Fullscreen story/feature section |
| 14 | Increment Counter | Stats band ("12,480 tasks today") |
| 40 | 3D Boxes Background | Decorative animated section divider |
| 47 | Testimonial Box | Testimonials |
| 29 | Double Click Heart | Double-tap-to-love a testimonial image |
| 44 | Custom Range Slider | Pricing team-size slider |
| 32 | Good, Cheap, Fast | Pricing "pick two" interaction |
| 46 | Quiz App | "Which plan is right for you?" quiz |
| 34 | Animated Countdown | Launch-sale countdown banner |
| 11 | FAQ | FAQ accordion |
| 28 | GitHub Profiles | "Meet the team" (GitHub API) |
| 7 | Form Input Wave | Newsletter form fields |
| 27 | Toast Notification | "Subscribed!" toast on submit |
| 43 | Feedback UI | "How was this page?" footer widget |

### Sign-up — `pulse/signup.html`
| # | Project | Used as |
|---|---------|---------|
| 2 | Progress Steps | Multi-step wizard indicator |
| 39 | Password Strength | Background reacts to password strength |
| 31 | Password Generator | "Suggest a strong password" |
| 41 | Verify Account | OTP code entry step |

### Dashboard — `pulse/app.html`
| # | Project | Used as |
|---|---------|---------|
| 45 | Netflix Mobile Nav | Mobile slide-out menu |
| 3 | Rotating Navigation | Desktop side-menu reveal |
| 38 | Mobile Tab Navigation | App-style bottom tab bar |
| 24 | Content Placeholder | Skeletons while widgets load |
| 49 | Todo List | "My Tasks" widget |
| 21 | Drag N Drop | Task board (move between columns) |
| 33 | Notes App | "Quick Notes" widget |
| 15 | Drink Water | "Hydration" habit widget |
| 19 | Theme Clock | Clock widget + dark-mode toggle |
| 42 | Live User Filter | Team directory search |
| 17 | Movie App | "Discover" content feed |
| 37 | Pokedex | "Integrations" catalog (PokéAPI) |
| 48 | Random Image Feed | "Inspiration" gallery |
| 22 | Drawing App | "Whiteboard" tool |
| 8 | Sound Board | "Focus sounds" widget |
| 12 | Random Choice Picker | "Decide for me" tool |
| 10 | Event KeyCodes | Keyboard-shortcuts helper modal |

### 404 — `pulse/404.html`
| # | Project | Used as |
|---|---------|---------|
| 36 | Hoverboard | Interactive background |
| 50 | Catch The Insect | The "you're lost" game |
| 9 | Dad Jokes | A joke to soften the 404 |

**Total: 26 + 4 + 17 + 3 = 50 — every project placed exactly once.**

## Internal Build Order (still delivered in one pass)

1. **Shell**: `pulse.css` brand + theme, `pulse.js` hover-chip system, shared nav/footer, homepage "#51" link.
2. **Landing** (`index.html`) — the bulk of the marketing techniques.
3. **Sign-up** (`signup.html`).
4. **Dashboard** (`app.html`).
5. **404** (`404.html`).

## Success Criteria

- All four pages render and are responsive.
- All 50 features present and working; each shows its hover chip linking to the
  correct `project-N.html`.
- Looks like a real product, not a demo gallery, with chips hidden until hover.
- `noindex` on every page; no console errors; no dead asset URLs.
- Linked from the main homepage.

## Open Risks

- A few features depend on external services (GitHub API, PokéAPI, picsum) and
  degrade gracefully offline.
- The home button pattern (top-left pill) from the 50 projects is **not** used
  here; PULSE has its own real nav. Back-to-homepage is via the nav/footer.
