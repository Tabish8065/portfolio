# Mirza Tabish Hasan — Engineering Portfolio

> Software Engineer · Real-time systems · Production performance · Platform libraries · AI-native engineering

An engineering impact report rather than a template portfolio. Every section leads with problem and result; an **Engineer view** toggle expands the design, patterns, and trade-offs behind each case study.

**Live:** [tabish8065.github.io/portfolio](https://tabish8065.github.io/portfolio/)

## What's on the page

| Section | Purpose |
|---|---|
| Hero | Role, positioning, four headline metrics, live experience counter (since 19 Sep 2023) |
| 30-second read | Who, what I ship, how I work, and the engineering vocabulary from my work |
| Zenoti work | Real-time pipeline, API optimization, attachment contract, plan-tier features, streaming storage library, policy pipeline, distributed coordination |
| AI-native engineering | MCP-connected workflow, guardrails, and the engineering tools I built (observability dashboard, PR analyzer, API regression, E2E smoke) |
| Architecture and quality | Flutter architecture standard and layered testing framework |
| Cognizant | Automation, telemetry pipeline, Azure migration, performance |
| Projects, Journey, Capabilities, Contact | Supporting evidence and ways to reach me |

## Structure

```
portfolio/
├── index.html        # Semantic content, metadata, JSON-LD
├── styles.css        # Visual system, responsive layout, reduced-motion and print rules
├── script.js         # Nav, reveals, count-up, counter, depth toggle, cursor, canvas
└── assets/
    └── resume/
        └── Mirza-Tabish-Hasan-Resume.pdf   # add this file to enable resume buttons
```

No framework, no build step, no dependencies. Works when `index.html` is opened directly and on GitHub Pages.

## Behavior notes

- Content is fully visible without JavaScript; `<details>` panels work natively.
- `prefers-reduced-motion` disables the canvas, cursor, count-up, and reveal motion.
- The custom cursor is enabled only for precise pointers.
- The particle canvas scales density to the viewport, caps device-pixel ratio at 2, and pauses when the tab is hidden.
- Resume buttons stay hidden until `assets/resume/Mirza-Tabish-Hasan-Resume.pdf` is reachable over HTTP, so no broken links ship.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploy

GitHub Pages serves `main` from the repository root. Merge `work` into `main` to publish.

## Contact

- Email: [mirzatabish8065@gmail.com](mailto:mirzatabish8065@gmail.com)
- LinkedIn: [linkedin.com/in/hmirza8065](https://linkedin.com/in/hmirza8065)
- GitHub: [github.com/Tabish8065](https://github.com/Tabish8065)
