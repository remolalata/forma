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

## Assets

Photos are downloaded from [Unsplash](https://unsplash.com) and served locally under `public/images`, with explicit image dimensions, optimized sizes, and lazy loading below the hero. Unsplash photography is covered by the [Unsplash License](https://unsplash.com/license).

- Hero and Form Journal: [source photograph](https://images.unsplash.com/photo-1487958449943-2429e8be8625).
- Mono Architecture: [photograph by Yaosheng Zheng](https://unsplash.com/photos/pQOqQpweE98).
- Still Living: [source photograph](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0).
- Olive Wellness artwork: original HTML/CSS composition.
- DM Sans: [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/dmsans), licensed under the SIL Open Font License. A copy is included at `public/fonts/OFL.txt`.

## Accessibility

Semantic landmarks and headings, a skip link, visible focus indicators, native buttons, labeled inputs, descriptive image alternatives, accessible toggle states, native modal focus containment, and reduced motion styles support keyboard and assistive technology use. Layouts adapt from narrow mobile screens to wide desktop viewports.
