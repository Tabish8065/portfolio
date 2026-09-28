# Mirza Tabish Hasan — Engineering Portfolio

> Software Engineer · Real-time systems · Production performance · Platform libraries · AI-native engineering

**Signal**: a portfolio that behaves like a live production system. Case-study diagrams draw themselves and carry data packets, a simulated event log streams from the systems described, and a site-wide **Reading as: Product / Engineer** toggle switches between outcomes and design detail.

**Live:** [tabish8065.github.io/portfolio](https://tabish8065.github.io/portfolio/) · Engineer view: [?view=engineer](https://tabish8065.github.io/portfolio/?view=engineer)

## What's on the page

| Section | Purpose |
|---|---|
| Hero | Role, positioning, live events terminal, uptime since 19 Sep 2023, four headline metrics with sparklines |
| 30-second read | Who, what I ship, how I work, and the terms from my work (each links to its case study) |
| Work at Zenoti | Real-time pipeline, API optimization, attachment contract, paid-plan feature explorer, streaming storage library, authorization pipeline demo, distributed coordination and a token-bucket demo |
| AI-native engineering | The 8-step reviewed workflow, six principles, and the engineering tools I built |
| Architecture and quality | Layered Flutter architecture and the layered testing framework |
| Cognizant | Event-driven automation, telemetry pipeline, Azure migration, legacy performance |
| Selected builds | AppPulse (with an illustrative health gauge) and other projects |
| Journey, Capabilities, Contact | Timeline, grouped skills, and ways to reach me |

## Structure

```
portfolio/
├── index.html   # Everything: content, metadata, JSON-LD, inline CSS and JS
└── README.md
```

No framework, no build step, no dependencies beyond Google Fonts (IBM Plex Mono and IBM Plex Sans). Works when `index.html` is opened directly and on GitHub Pages.

## Behavior notes

- `Ctrl/Cmd + K` or `/` opens the command palette, which also serves as mobile navigation.
- The Product / Engineer view persists in `localStorage` and can be set with `?view=engineer`.
- Content is fully visible without JavaScript: both views shown, diagrams drawn, all feature panels listed.
- `prefers-reduced-motion` shows every diagram complete and stops all loops; the clock keeps ticking.
- Looping animations pause when off-screen or when the tab is hidden.
- Demos and the dashboard and gauge panels are labelled as illustrations, not production data.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploy

GitHub Pages serves `main` from the repository root.

## Credits

The code for this site was generated with AI. The imagination, creative direction, and supervision are mine.

## Contact

- Email: [mirzatabish8065@gmail.com](mailto:mirzatabish8065@gmail.com)
- LinkedIn: [linkedin.com/in/hmirza8065](https://linkedin.com/in/hmirza8065)
- GitHub: [github.com/Tabish8065](https://github.com/Tabish8065)
