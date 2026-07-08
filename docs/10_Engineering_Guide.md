# Engineering Guide

This guide explains how to work on the current Creator OS codebase.

## Repository Structure

Current structure:

```text
/
  index.html
  styles.css
  app.js
  sylr-mini-series-studio.html
  .nojekyll
  assets/
    sylr-brand-icon.jpg
  docs/
    01_Constitution.md
    02_Master_Specification.md
    03_Product_Decision_Log.md
    04_Product_Reasoning_Log.md
    05_Design_System.md
    06_Development_Standards.md
    07_AI_Standards.md
    08_Creator_Intelligence.md
    09_Roadmap.md
    10_Engineering_Guide.md
```

## Running Locally

Open:

```text
index.html
```

Local browser URL pattern:

```text
file:///C:/Users/jason/OneDrive/Documents/S.Y.L.R/index.html
```

No build command is currently required.

`index.html` is the only active app entry.

`sylr-mini-series-studio.html` is a legacy backup/export and should not be maintained going forward.

## Deployment

For GitHub Pages:

1. Upload or commit the static site files.
2. Confirm `index.html` is at repository root.
3. Confirm `assets/sylr-brand-icon.jpg` exists.
4. Confirm `.nojekyll` exists.
5. Use Pages settings:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

## Current App File Responsibilities

`index.html`

- Defines document structure
- Loads favicon/app icon
- Loads CSS and JavaScript
- Contains app shell, dashboard, status board container, and episode form

`styles.css`

- Defines design tokens
- Defines layout and responsive behavior
- Defines component styling

`app.js`

- Defines statuses
- Defines template episode
- Defines seeded episodes
- Renders status board
- Syncs selected episode to the form
- Handles duplicate template behavior
- Handles local toast messages

`assets/sylr-brand-icon.jpg`

- Primary current brand image

`sylr-mini-series-studio.html`

- Self-contained backup/export version of the app
- Should not be treated as the main GitHub Pages entry unless intentionally chosen

## Safe Editing Workflow

Before changing app code:

1. Read the relevant docs.
2. Update specification/roadmap if scope changes.
3. Make a small scoped edit.
4. Open the app locally.
5. Check for console errors.
6. Check desktop and mobile layout.
7. Confirm Duplicate Template still works.

## Known Technical Notes

- Version 0.1 persistence should use localStorage.
- The current app has no framework.
- The current app has no automated tests.
- Some old decorative glyphs in HTML appear encoded oddly, but are hidden by CSS where relevant.
- The app should work as a static site.

## Versioned Technical Direction

Version 0.1:

- HTML
- CSS
- JavaScript
- localStorage
- Lightweight and usable
- Multiple Workspaces
- S.Y.L.R. Mini-Series Studio as the default seeded Workspace
- Multiple Series per Workspace
- Multiple Episodes per Series

Version 0.5:

- Supabase
- Authentication
- Cloud Sync

Version 1.0:

- Multi-user
- Teams
- Cloud-first

Future versions may migrate to React and cloud architecture only after Version 0.1 is actively used.

## Module Architecture

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

Engineering should extend these modules instead of rebuilding the app.

## Version 0.1 Data Architecture

localStorage keys:

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

Workspace fields:

```text
id
name
description
logo
brandColors
tagline
mission
audience
brandVoice
platforms
defaultCTA
defaultHashtags
notes
createdAt
updatedAt
```

Series fields:

```text
id
workspaceId
name
description
status
primaryIntent
targetAudience
platforms
frequency
episodeStructure
notes
createdAt
updatedAt
```

Episode fields:

```text
id
workspaceId
seriesId
episodeNumber
title
status
priority
strategicImportance
contentType
sourceType
platforms
publishDate
publishTime
summary
tags
overview
creative
production
publishing
business
attachments
ai
history
createdAt
updatedAt
```

Prompt History fields:

```text
id
workspaceId
episodeId optional
promptType
input
output
createdAt
savedToEpisode boolean
```

## Version 0.1 AI Implementation

AI in Version 0.1 is template/simulated only.

No live API is used in Version 0.1.

AI UI should exist, but outputs should be generated from templates and saved manually.

Real AI API integration moves to Version 0.5.

No API keys should be stored in frontend code.

## Version 0.1 Active Use Gate

Version 0.1 is actively used only when all of the following are true:

- Jason uses it for at least 7 days.
- At least 10 real episodes are created.
- At least 3 Workspaces or Series are tested.
- At least 10 assets, links, or notes are saved.
- At least 3 pieces of content are moved through the workflow toward posting.

React/cloud migration is not allowed until Version 0.1 is actively used and real workflow pain points are identified.
