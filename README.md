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

The workflow at `.github/workflows/visual-ux-screenshots.yml` captures screenshots after Vercel emits `vercel.deployment.success` for a preview of the `forma` project. It reads the URL and commit SHA from that event and checks out the deployed commit. Production deployments and other Vercel projects are ignored. This runs for successful previews, including previews outside pull requests.

The workflow does not poll GitHub Deployment records. A successful `Vercel` commit status can exist without those records, which caused the previous wait step to time out.

To enable automatic captures:

1. Commit and push the updated workflow yourself, and merge it into the repository's default branch. GitHub only receives `repository_dispatch` workflows from that branch.
2. Trigger a new Vercel preview deployment. Existing deployments and reruns of the old screenshot workflow do not pick up this local change.
3. Open the new **Visual UX Screenshots** run and download its `ux-screenshots` artifact.

Once the workflow is available on the default branch, you can also choose **Actions → Visual UX Screenshots → Run workflow**. Supply the ready preview's HTTPS URL and its exact 40-character commit SHA. The manual option captures an existing preview without waiting for another deployment event.

The dispatch payload and trigger follow [Vercel's GitHub Actions guidance](https://vercel.com/docs/git/vercel-for-github#run-end-to-end-tests-after-a-deployment). GitHub Actions must be able to open the preview URL; a protected deployment may require Vercel's automation access configuration.

## Assets

Photos are downloaded from [Unsplash](https://unsplash.com) and served locally under `public/images`, with explicit image dimensions, optimized sizes, and lazy loading below the hero. Unsplash photography is covered by the [Unsplash License](https://unsplash.com/license).

- Hero and Form Journal: [source photograph](https://images.unsplash.com/photo-1487958449943-2429e8be8625).
- Mono Architecture: [photograph by Yaosheng Zheng](https://unsplash.com/photos/pQOqQpweE98).
- Still Living: [source photograph](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0).
- Olive Wellness artwork: original HTML/CSS composition.
- DM Sans: [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/dmsans), licensed under the SIL Open Font License. A copy is included at `public/fonts/OFL.txt`.

## Accessibility

Semantic landmarks and headings, a skip link, visible focus indicators, native buttons, labeled inputs, descriptive image alternatives, accessible toggle states, native modal focus containment, and reduced motion styles support keyboard and assistive technology use. Layouts adapt from narrow mobile screens to wide desktop viewports.
