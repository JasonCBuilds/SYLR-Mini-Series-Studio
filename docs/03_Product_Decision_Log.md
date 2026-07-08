# Product Decision Log

This log records product decisions already made or implied by explicit founder requests. It should be updated whenever a product decision is made.

## Decisions

### 001 - Start as S.Y.L.R. Mini-Series Studio

- Decision: Build a simple web app called S.Y.L.R. Mini-Series Studio.
- Source: Founder request.
- Rationale: The first product surface should directly support S.Y.L.R. short-form episode management.
- Status: Implemented.

### 002 - Use Episode Pipeline Statuses

- Decision: Use the status columns Idea, Scripted, Filming, Editing, Ready, Posted.
- Source: Founder request.
- Rationale: These stages match the short-form video production workflow.
- Status: Implemented.

### 003 - Track Complete Episode Metadata

- Decision: The episode dashboard must include title, episode number, hook, script, voiceover, shot list, caption, hashtags, product tie-in, platform, status, and scheduled post date.
- Source: Founder request.
- Rationale: These fields capture the creative and operational details needed to produce and post content.
- Status: Implemented.

### 004 - Include Founder Mini-Series Sample Episodes

- Decision: Seed the app with sample episodes about building a brand while working full-time and launching FuelzUS.
- Source: Founder request.
- Rationale: Sample content should reflect the real founder narrative and make the tool usable immediately.
- Status: Implemented.

### 005 - Use Clean Luxury Streetwear Visual Direction

- Decision: Use a clean black, white, and luxury streetwear-inspired design.
- Source: Founder request.
- Rationale: The visual style should feel aligned with S.Y.L.R.
- Status: Implemented.

### 006 - Use Supplied S.Y.L.R. Image as Brand Asset

- Decision: Use the supplied S.Y.L.R. image as the app icon, favicon, and dashboard brand icon.
- Source: Founder request.
- Rationale: The app should reflect the actual brand icon and carry it through the browser and dashboard.
- Status: Implemented.

### 007 - Transition Toward Creator OS

- Decision: Transition the project into a professionally documented commercial software project called Creator OS.
- Source: Founder request.
- Rationale: The repository needs a durable documentation foundation before feature expansion.
- Status: Documentation in progress.

### 008 - Documentation Before New Features

- Decision: Establish documentation foundation before implementing new features.
- Source: Founder request.
- Rationale: The repository should become self-documenting and documentation should become the permanent source of truth.
- Status: Implemented by `/docs`.

### 009 - Creator OS Is the Parent Platform

- Decision: Creator OS is the parent platform and commercial product.
- Source: Founder review.
- Rationale: The product needs a scalable architecture where individual creator systems live inside Workspaces.
- Status: Finalized.

### 010 - Users Manage Workspaces

- Decision: Inside Creator OS, users create and manage Workspaces.
- Source: Founder review.
- Rationale: Workspaces separate brands, projects, or operating systems while preserving a common platform model.
- Status: Finalized.

### 011 - S.Y.L.R. Mini-Series Studio Is a Workspace

- Decision: S.Y.L.R. Mini-Series Studio is not the platform. It exists as a Workspace, and may contain multiple Series, inside Creator OS.
- Source: Founder review.
- Rationale: S.Y.L.R. is the first real workspace example, not the whole product.
- Status: Finalized.

### 012 - Versioned Persistence Direction

- Decision: Version 0.1 uses HTML, CSS, JavaScript, and localStorage. Version 0.5 adds Supabase, Authentication, and Cloud Sync. Version 1.0 becomes multi-user, team-capable, and cloud-first.
- Source: Founder review.
- Rationale: Creator OS should remain lightweight and usable before migrating to heavier architecture.
- Status: Finalized.

### 013 - Core Modules

- Decision: Dashboard, Daily Mission, Workspaces, Series, Episodes, Media Center, Asset Library, Calendar, Templates, and Settings are core modules, not placeholders.
- Source: Founder review.
- Rationale: These modules define the product surface for Creator OS.
- Status: Finalized.

### 014 - Future Modules

- Decision: AI Director, Analytics, Automation, and Integrations are future modules.
- Source: Founder review.
- Rationale: These areas are important but should follow after the core product foundation.
- Status: Finalized.

### 015 - Creator OS Brand Voice

- Decision: Creator OS communicates in a professional, educational, founder-focused, optimistic, and practical tone. It avoids hype, clickbait, exaggerated claims, and unnecessary complexity.
- Source: Founder review.
- Rationale: The product should feel trustworthy, useful, and founder-aligned.
- Status: Finalized.

### 016 - Workspace-Specific Brand Voice

- Decision: Workspace-specific brand voices are configured independently inside each Workspace.
- Source: Founder review.
- Rationale: Creator OS needs a consistent platform voice while letting each Workspace preserve its own brand identity.
- Status: Finalized.

### 017 - AI Assists, Creators Decide

- Decision: AI assists, but creators decide. AI must never automatically publish, delete, overwrite, or make irreversible creator decisions.
- Source: Founder review.
- Rationale: AI should accelerate creative work without taking final authority from the creator.
- Status: Finalized.

### 018 - Version 0.1 AI Capabilities

- Decision: Version 0.1 AI capabilities include hook generation, script generation, caption generation, CTA suggestions, hashtag suggestions, thumbnail ideas, B-roll suggestions, and prompt history.
- Source: Founder review.
- Rationale: Initial AI scope should support content creation without irreversible actions.
- Status: Finalized.

### 019 - Technical Direction

- Decision: Version 0.1 remains lightweight with HTML, CSS, JavaScript, and localStorage. Future versions may migrate to React and cloud architecture only after Version 0.1 is actively used.
- Source: Founder review.
- Rationale: Prove usage before adding architectural complexity.
- Status: Finalized.

### 020 - Version 0.1 Creates Usable Foundations

- Decision: Version 0.1 should not fully implement every advanced module. It should create usable foundations first, with the priority being daily use and consistency.
- Source: Founder review.
- Rationale: Creator OS should become practically usable before deeper module expansion.
- Status: Finalized.

### 021 - Version 0.1 Minimum Module Scope

- Decision: Version 0.1 minimum scope includes Dashboard daily overview; Daily Mission checklist/streak/current focus; Workspaces create/edit/switch; Series create/edit under a Workspace; Episodes create/edit/statuses/priority/right-side editor/basic views; Media Center and Asset Library manual asset/link/note saving and episode attachment; Calendar scheduled episode view; Templates reusable content templates; Settings reset/export/import local data and basic app settings.
- Source: Founder review.
- Rationale: Each core module needs a practical foundation without overbuilding.
- Status: Finalized.

### 022 - Multiple Workspaces and Default Seed

- Decision: Version 0.1 supports multiple Workspaces. S.Y.L.R. Mini-Series Studio is the default seeded Workspace.
- Source: Founder review.
- Rationale: Creator OS must prove the Workspace model while preserving the existing S.Y.L.R. use case.
- Status: Finalized.

### 023 - Series and Episode Relationships

- Decision: Series can contain multiple Episodes in Version 0.1.
- Source: Founder review.
- Rationale: The product needs a durable hierarchy for organizing creator work.
- Status: Finalized.

### 024 - Version 0.1 Data Schemas

- Decision: Version 0.1 uses documented Workspace, Series, Episode, and Prompt History fields in the Master Specification.
- Source: Founder review.
- Rationale: Implementation should be consistent across modules and localStorage.
- Status: Finalized.

### 025 - localStorage Keys

- Decision: Version 0.1 uses `creatorOS.workspaces`, `creatorOS.series`, `creatorOS.episodes`, `creatorOS.assets`, `creatorOS.templates`, `creatorOS.settings`, `creatorOS.promptHistory`, and `creatorOS.version`.
- Source: Founder review.
- Rationale: Storage keys must be predictable and versioned before implementation begins.
- Status: Finalized.

### 026 - Local Data Controls

- Decision: Version 0.1 includes reset, export, and import local data.
- Source: Founder review.
- Rationale: Local-only data needs founder-controlled portability and recovery.
- Status: Finalized.

### 027 - Simulated AI in Version 0.1

- Decision: AI in Version 0.1 is template/simulated only. No live API is used. AI UI should exist, but outputs are generated from templates and saved manually.
- Source: Founder review.
- Rationale: Creator OS can test AI-assisted workflows without backend/API complexity or key risk.
- Status: Finalized.

### 028 - Real AI Moves to Version 0.5

- Decision: Real AI API integration moves to Version 0.5. No API keys should be stored in frontend code.
- Source: Founder review.
- Rationale: Live AI requires safer architecture than the Version 0.1 static frontend.
- Status: Finalized.

### 029 - Single-Page Module Navigation

- Decision: Routing/navigation uses single-page app behavior inside `index.html`; modules behave like tabs/sections, not separate pages.
- Source: Founder review.
- Rationale: Version 0.1 should remain lightweight and deployable as a static app.
- Status: Finalized.

### 030 - Active Entry Point

- Decision: `index.html` is the only active app entry. `sylr-mini-series-studio.html` is a legacy backup/export and should not be maintained going forward.
- Source: Founder review.
- Rationale: One active entry prevents drift and deployment confusion.
- Status: Finalized.

### 031 - Active Use Gate

- Decision: Version 0.1 is actively used only after Jason uses it for at least 7 days, creates at least 10 real episodes, tests at least 3 Workspaces or Series, saves at least 10 assets/links/notes, and moves at least 3 pieces of content through the workflow toward posting.
- Source: Founder review.
- Rationale: Migration should be based on real workflow evidence.
- Status: Finalized.

### 032 - React and Cloud Migration Gate

- Decision: React/cloud migration is not allowed until Version 0.1 is actively used and real workflow pain points are identified.
- Source: Founder review.
- Rationale: Avoid premature complexity.
- Status: Finalized.

### 033 - Dashboard Answers Questions

- Decision: The Dashboard answers questions. Individual modules edit information.
- Source: Founder review.
- Rationale: The Dashboard should act as Mission Control, helping the creator understand workspace context, series health, next action, blockers, and upcoming work without becoming a giant editable form.
- Status: Finalized.

### 034 - Overview to Drill Down to Edit

- Decision: Creator OS follows the interaction principle: Overview -> Drill Down -> Edit.
- Source: Founder review.
- Rationale: Creator OS should reduce decisions, not create them. Overview surfaces should make the next move clear, then route creators into the appropriate module or editor for changes.
- Status: Finalized.

### 035 - Recoverable Object Lifecycle

- Decision: Nothing should disappear without a clear place to recover or view it.
- Source: Founder review.
- Rationale: Creator OS is used for real creator work. Archive and delete actions must be visible, confirmed, and predictable so creator records do not feel lost.
- Status: Finalized.

### 036 - Major Objects Have Lifecycle Actions

- Decision: Workspaces, Series, Episodes, Assets, and Templates should support predictable active, archive, restore, duplicate, and delete behavior.
- Source: Founder review.
- Rationale: A consistent object lifecycle reduces confusion and makes v0.1 safer for daily use.
- Status: Finalized.

### 037 - Lifecycle Management Belongs in Modules

- Decision: Dashboard answers questions; individual modules edit and manage records.
- Source: Founder review.
- Rationale: Dashboard should remain Mission Control. Editing, archiving, deleting, restoring, and duplicating records belongs in the proper module or object panel.
- Status: Finalized.
