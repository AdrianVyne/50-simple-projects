# 50 Projects in 50 Days — HTML, CSS & JavaScript

My run through the Udemy course **[50 Projects in 50 Days](https://www.udemy.com/course/50-projects-50-days/)** — 50 small, self-contained builds in plain HTML, CSS, and JavaScript. I customized each one with my own images, styling, and tweaks instead of copying the lessons verbatim, then tied them all together with a custom home page and a bonus 51st project.

No frameworks, no build step — just vanilla HTML, CSS, and JS.

## The project wall

The home page (`index.html`) isn't a plain list of links. Every tile is the **actual project running live**, rendered as a scaled-down `iframe` that lazy-loads as it scrolls into view. Hover to focus a tile, click to open the full project.

## Bonus — PULSE (#51)

[`pulse/`](pulse/) is a 51st project built on top of the other 50: a full fake product/landing site where every interactive feature is hand-stitched from one of the projects on the wall (the sticky nav, hidden search, animated menu, kinetic loader, FAQ accordion, and more). Hover any piece and it tells you which project it came from.

## Live site

**[adrianvyne.github.io/50-simple-projects](https://adrianvyne.github.io/50-simple-projects/)**

This is a personal learning repo, so every page ships with `noindex` — it's deliberately kept out of search engines.

## Repo structure

```
index.html        # the live-preview project wall (home page)
css/              # per-project styles + shared home.css / back-home.css
js/               # per-project scripts + home.js (builds the wall)
html/             # the 50 projects (project-1.html … project-50.html)
                  #   + "create 50 html files.bat" that scaffolds them
imgs/             # images and the favicon
sounds/           # audio for the sound-board project
pulse/            # the bonus 51st project (landing, app, signup, 404)
```

Each project shares a consistent reskin and a common "← All Projects" button to get back to the wall.

## The 50 projects

<details>
<summary>Full list</summary>

| # | Project | # | Project |
|---|---------|---|---------|
| 1 | Expanding Cards | 26 | Vertical Slider |
| 2 | Progress Steps | 27 | Toast Notification |
| 3 | Rotating Navigation | 28 | Github Profiles |
| 4 | Hidden Search | 29 | Double Click Heart |
| 5 | Blurry Loading | 30 | Auto Text Effect |
| 6 | Scroll Animation | 31 | Password Generator |
| 7 | Form Input Wave | 32 | Good, Cheap, Fast |
| 8 | Sound Board | 33 | Notes App |
| 9 | Dad Jokes | 34 | Animated Countdown |
| 10 | Event KeyCodes | 35 | Image Carousel |
| 11 | FAQ | 36 | Hoverboard |
| 12 | Random Choice Picker | 37 | Pokedex |
| 13 | Animated Navigation | 38 | Mobile Tab Navigation |
| 14 | Increment Counter | 39 | Password Strength |
| 15 | Drink Water | 40 | 3D Boxes Background |
| 16 | Split Landing Page | 41 | Verify Account |
| 17 | Movie App | 42 | Live User Filter |
| 18 | Background Slider | 43 | Feedback UI |
| 19 | Theme Clock | 44 | Custom Range Slider |
| 20 | Button Ripple Effect | 45 | Netflix Mobile Nav |
| 21 | Drag N Drop | 46 | Quiz App |
| 22 | Drawing App | 47 | Testimonial Box |
| 23 | Kinetic Loader | 48 | Random Image Feed |
| 24 | Content Placeholder | 49 | Todo List |
| 25 | Sticky Navigation | 50 | Catch The Insect |

</details>

:pencil: :computer: :fire:
