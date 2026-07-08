# Development Standards

This document defines how Creator OS should be developed.

## Technical Direction

Version 0.1 should remain lightweight and usable.

Version 0.1 technology:

- HTML
- CSS
- JavaScript
- localStorage

Current project files:

```text
index.html
styles.css
app.js
assets/sylr-brand-icon.jpg
```

There is no package manager, bundler, framework, build script, database, or backend in the current repository.

Version 0.5 direction:

- Supabase
- Authentication
- Cloud Sync

Version 1.0 direction:

- Multi-user
- Teams
- Cloud-first

Future versions may migrate to React and cloud architecture only after Version 0.1 is actively used.

## Documentation-First Rule

Before implementing new features:

1. Update the relevant specification or roadmap document.
2. Record the product decision if the feature changes scope.
3. Record reasoning if there is a meaningful tradeoff.
4. Implement only the documented scope.

## Change Control

Application code changes should be scoped and intentional.

For future code changes:

- Do not rename files without documenting why.
- Do not remove existing functionality without recording the decision.
- Keep app behavior aligned with the master specification.
- Do not introduce dependencies unless the engineering guide is updated.
- Validate desktop and mobile behavior after UI changes.

## Static Site Deployment Standard

For GitHub Pages static deployment, the minimum files are:

```text
index.html
styles.css
app.js
.nojekyll
assets/sylr-brand-icon.jpg
```

Recommended GitHub Pages settings:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

## Quality Checks

Before handoff:

- Open `index.html` locally.
- Confirm no console errors.
- Confirm all image assets load.
- Confirm all six status columns render.
- Confirm Duplicate Template creates a new episode.
- Confirm mobile layout does not overflow.

## Data Handling

Current state:

- Episode data is seeded in `app.js`.
- Edits are currently in-memory only.

Version 0.1 standard:

- Persist creator data using localStorage.
- Preserve the lightweight static app architecture.
- Do not add Supabase, authentication, or cloud sync until Version 0.5 work begins.
- Use the documented `creatorOS.*` localStorage keys.
- Include reset, export, and import local data.

Version 0.1 localStorage keys:

```text
creatorOS.workspaces
creatorOS.series
creatorOS.episodes
creatorOS.assets
creatorOS.templates
creatorOS.settings
creatorOS.promptHistory
creatorOS.version
```

## Module Development Standard

The following are core modules and are not placeholders:

- Dashboard
- Daily Mission
- Workspaces
- Series
- Episodes
- Media Center
- Asset Library
- Calendar
- Templates
- Settings

Future modules:

- AI Director
- Analytics
- Automation
- Integrations

Engineering must extend modules instead of rebuilding the app from scratch.

## Version 0.1 Module Scope

- Dashboard: usable daily overview.
- Daily Mission: daily checklist, streak/progress, current focus.
- Workspaces: create/edit/switch workspaces.
- Series: create/edit series under a workspace.
- Episodes: create/edit episodes, statuses, priority, right-side editor, basic views.
- Media Center / Asset Library: manual asset/link/note saving and attaching to episodes.
- Calendar: basic scheduled episode view.
- Templates: basic reusable content templates.
- Settings: reset/export/import local data, basic app settings.

## Entrypoint Standard

`index.html` is the only active app entry.

`sylr-mini-series-studio.html` is a legacy backup/export and should not be maintained going forward.

## Navigation Standard

Version 0.1 uses single-page app behavior inside `index.html`.

Modules should behave like tabs/sections, not separate pages.
