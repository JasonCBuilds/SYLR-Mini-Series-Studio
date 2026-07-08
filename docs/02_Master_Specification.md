# Creator OS Master Specification

## Current Version

This specification reflects the current repository state as of the documentation foundation pass.

Current implementation:

- Static HTML/CSS/JavaScript
- Active app entry: `index.html`
- Styles: `styles.css`
- Logic and seeded content: `app.js`
- Brand asset: `assets/sylr-brand-icon.jpg`
- Legacy backup/export: `sylr-mini-series-studio.html`

`index.html` is the only active app entry. `sylr-mini-series-studio.html` should be treated as a legacy backup/export and should not be maintained going forward.

## Product Summary

Creator OS is the parent platform and commercial product.

S.Y.L.R. Mini-Series Studio is a Workspace inside Creator OS. The current workspace is a short-form content planning dashboard for managing founder-led video episodes from idea through posting.

The dashboard is designed for a creator/founder workflow where content moves through a production pipeline and each episode has structured creative metadata.

## Current User

Known user context:

Version 1 targets:

- Solo Creators
- Entrepreneurs
- Small Businesses
- Startups
- Personal Brands

The current workspace is configured around a founder/operator working on S.Y.L.R., also launching or operating FuelzUS, and needing a practical way to organize short-form episode production.

Enterprise and agencies are future roadmap items.

## Current Information Architecture

The current app shell includes:

- Sidebar brand area
- Navigation labels:
  - Dashboard
  - Episodes
  - Templates
  - Calendar
- Main dashboard header
- Duplicate Template action
- Mobile selected-episode summary
- Status board
- Episode editor/inspector

The following are core Creator OS modules and are not placeholders:

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

Implementation note: Version 0.1 should not fully implement every advanced module. Version 0.1 should create usable foundations first, with the priority being daily use and consistency. Future work should extend the existing app architecture rather than rebuilding it.

## Version 0.1 Minimum Module Scope

- Dashboard: usable daily overview.
- Daily Mission: daily checklist, streak/progress, current focus.
- Workspaces: create/edit/switch workspaces.
- Series: create/edit series under a workspace.
- Episodes: create/edit episodes, statuses, priority, right-side editor, basic views.
- Media Center / Asset Library: manual asset/link/note saving and attaching to episodes.
- Calendar: basic scheduled episode view.
- Templates: basic reusable content templates.
- Settings: reset/export/import local data, basic app settings.

## Routing and Navigation

Version 0.1 uses single-page app behavior inside `index.html`.

Modules should behave like tabs/sections, not separate pages.

## Current Data Model

Version 0.1 supports multiple Workspaces.

S.Y.L.R. Mini-Series Studio should be the default seeded Workspace.

Series can contain multiple Episodes in Version 0.1.

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

Allowed statuses:

```text
Idea
Scripted
Filming
Editing
Ready
Posted
```

Current platform options:

```text
TikTok
Instagram
YouTube Shorts
LinkedIn
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

## Current Behaviors

- Episodes are displayed in status columns.
- Selecting an episode populates the inspector/editor.
- Editing form fields updates local in-memory episode state.
- Duplicate Template creates a new episode based on the template object.
- Add Episode buttons duplicate the template into the clicked status column.
- Save Draft shows a local toast message.
- Update Episode submits the form and shows a local toast message.

## Persistence Roadmap

Version 0.1:

- HTML
- CSS
- JavaScript
- localStorage

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

Version 0.1 must include reset, export, and import local data.

Version 0.5:

- Supabase
- Authentication
- Cloud Sync

Version 1.0:

- Multi-user
- Teams
- Cloud-first

Current implementation note: the existing code still uses in-memory browser state. Version 0.1 development should add localStorage persistence without changing the lightweight static architecture.

## Current Deployment Intent

Known deployment direction:

- The user created a GitHub repository.
- GitHub Pages is the intended hosting target.
- The project is suitable for static GitHub Pages deployment from branch root.

Recommended deployment files:

```text
index.html
styles.css
app.js
.nojekyll
assets/sylr-brand-icon.jpg
```

## Product Scope Decisions

- Creator OS is the parent platform and commercial product.
- Users create and manage Workspaces.
- S.Y.L.R. Mini-Series Studio exists as a Workspace inside Creator OS.
- A Workspace may contain multiple Series.
- Version 0.1 supports multiple Workspaces.
- Series can contain multiple Episodes in Version 0.1.
- Version 0.1 should remain lightweight and usable.
- Future versions may migrate to React and cloud architecture only after Version 0.1 is actively used.

## Version 0.1 AI Scope

AI in Version 0.1 should be template/simulated only.

No live API is used in Version 0.1.

AI UI should exist, but outputs should be generated from templates and saved manually.

Real AI API integration moves to Version 0.5.

No API keys should be stored in frontend code.

Version 0.1 AI capabilities:

- Hook generation
- Script generation
- Caption generation
- CTA suggestions
- Hashtag suggestions
- Thumbnail ideas
- B-roll suggestions
- Prompt history
