# Forma — Independent Design Studio

A responsive homepage for a fictional design studio, built with React 19, TypeScript, and Vite. The editorial layout uses locally hosted DM Sans, optimized Unsplash photography, a consistent charcoal and lime palette, and reusable UI components.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run build       # TypeScript checks and production build
npm run preview     # Preview the production build
npm run format      # Format source files
npm run format:check
```

## Content and components

- `src/data/content.json`: navigation, project filters, and service descriptions.
- `src/data/projects.json`: mock projects, image paths, categories, and case study content.
- `src/components/ui.tsx`: reusable buttons, brand mark, icons, and section headings.
- `src/components/Modal.tsx`: native accessible dialog with Escape support, focus restoration, and background scroll locking.
- `src/App.tsx`: homepage sections and client-side interactions.
- `src/index.css`: design tokens, locally hosted font, global styles, and reduced motion support.
- `src/App.css`: component styles and responsive layouts.

The project filters, expanded collection, case study dialogs, service accordion, and mobile navigation run entirely in the browser. The inquiry form uses native validation and saves one inquiry to browser local storage under `forma-inquiry`. It never sends data. The UI explicitly identifies the site and projects as concepts.

No backend, database, API calls, or external runtime assets are required. All mock data is imported from JSON at build time.

## Visual screenshots in GitHub Actions

The workflow at `.github/workflows/visual-ux-screenshots.yml` captures screenshots when a non-draft pull request from this repository is opened, updated with new commits, reopened, or marked ready for review. Adding the `ai-ux-review` label also captures screenshots. Other label events skip both jobs, and draft and fork PRs are excluded. Manual `workflow_dispatch` runs still capture screenshots.

The separate `trigger-grok` job sends a review request only when `ai-ux-review` is added and screenshot capture, verification of all four PNGs, and artifact upload succeed. Ordinary pushes do not request AI reviews, even if the PR already has the label. Routine runs, AI-review label runs, and unrelated label runs use separate concurrency groups. To request another AI review after a later change, remove and re-add the label.

Configure the repository secrets `GROK_BOT_WEBHOOK_URL` and `GROK_BOT_WEBHOOK_KEY` before requesting an AI review. They are passed only to the webhook step in the separate job, which does not check out or execute application code. The bot receives the PR metadata, head SHA, workflow run URL, and `ux-screenshots` artifact name; it needs its own access to download the artifact. The webhook request times out after 15 seconds and fails on a non-success HTTP status.

CI checks out the PR's head commit, installs dependencies, validates the build, and installs Chromium. Playwright captures the hosted master baseline at `https://forma-mu-beige.vercel.app/` and the hosted PR preview at `https://forma-git-dev-remo-antonio-lalatas-projects.vercel.app/`. Both versions use identical desktop (1440 × 900) and mobile (375 × 812) sizes. Download the `ux-screenshots` artifact from the workflow run.

Both hosted URLs must be reachable and contain the versions you want to compare. The workflow does not start a local server or poll GitHub Deployment records. Commit and push the updated files to your PR branch to start a new run; there is no need to merge the workflow into the default branch first for PR runs. The optional **Run workflow** button is available after the workflow is on the default branch.

To run the same checks locally:

```sh
npx playwright install chromium
npm run build
npx playwright test tests/visual-review.spec.ts
```

The output separates the master baseline from the PR under review:

```text
screenshots/
├── master/
│   ├── desktop.png
│   └── mobile.png
└── pr/
    ├── desktop.png
    └── mobile.png
```

The provided URLs are the defaults. To override them explicitly:

```sh
MASTER_URL="https://forma-mu-beige.vercel.app/" \
PR_URL="https://forma-git-dev-remo-antonio-lalatas-projects.vercel.app/" \
npx playwright test tests/visual-review.spec.ts
```

`MASTER_URL` overrides the baseline URL. `PR_URL` (or the existing `PREVIEW_URL` alias) overrides the PR URL. These branch/domain URLs capture whatever is currently deployed there; the supplied PR URL follows the `dev` branch. Ensure the intended Vercel preview is ready before reviewing its screenshots, and override `PR_URL` for another PR branch. The test requires the homepage heading to render, so authentication or error pages fail instead of becoming screenshot artifacts.

## Assets

Photos are downloaded from [Unsplash](https://unsplash.com) and served locally under `public/images`, with explicit image dimensions, optimized sizes, and lazy loading below the hero. Unsplash photography is covered by the [Unsplash License](https://unsplash.com/license).

- Hero and Form Journal: [source photograph](https://images.unsplash.com/photo-1487958449943-2429e8be8625).
- Mono Architecture: [photograph by Yaosheng Zheng](https://unsplash.com/photos/pQOqQpweE98).
- Still Living: [source photograph](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0).
- Olive Wellness artwork: original HTML/CSS composition.
- DM Sans: [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/dmsans), licensed under the SIL Open Font License. A copy is included at `public/fonts/OFL.txt`.

## Accessibility

Semantic landmarks and headings, a skip link, visible focus indicators, native buttons, labeled inputs, descriptive image alternatives, accessible toggle states, native modal focus containment, and reduced motion styles support keyboard and assistive technology use. Layouts adapt from narrow mobile screens to wide desktop viewports.
