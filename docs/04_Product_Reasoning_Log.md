# Product Reasoning Log

This log captures the reasoning behind product direction and tradeoffs. It should explain why decisions were made, not just what was decided.

## Current Reasoning

### Why Start With an Episode Dashboard

The founder request centered on managing short-form video episodes. A dashboard with status columns directly maps to a production workflow:

- Idea: concept exists but is not yet written
- Scripted: episode has a written structure
- Filming: episode is ready for capture or in capture
- Editing: footage/content is in post-production
- Ready: episode is prepared to post
- Posted: episode has been published

This is a practical first surface because it gives the creator operational visibility without needing accounts, backend systems, or complex integrations.

### Why Use Structured Episode Fields

The requested fields cover both creative and operational needs:

- Hook, script, voiceover, shot list: production planning
- Caption, hashtags, platform, scheduled post date: publishing readiness
- Product tie-in: commercial or brand alignment
- Status: production workflow
- Episode number and title: series structure

Together, these fields make each content idea more production-ready than a simple notes list.

### Why Seed Founder/FuelzUS Episodes

The sample episodes make the product immediately understandable in the founder's real context: building S.Y.L.R., working full-time, and launching FuelzUS. This avoids a generic demo and keeps the app grounded in the actual brand narrative.

### Why Keep Version 0.1 Lightweight

Version 0.1 should remain HTML, CSS, JavaScript, and localStorage. This is appropriate for the first stage because:

- It can be opened locally.
- It can be deployed to GitHub Pages.
- It has no dependency install or server setup.
- It keeps the initial product easy to inspect and modify.
- It lets the founder actively use the product before heavier architecture is introduced.

The prior tradeoff was that data did not persist beyond the current browser session. The finalized Version 0.1 persistence decision is localStorage.

Future versions may migrate to React and cloud architecture only after Version 0.1 is actively used.

### Why Create Documentation Now

The founder explicitly requested no new features until the repository becomes self-documenting. This is important because Creator OS is being positioned as a commercial software project, and commercial software requires:

- Clear product scope
- Decision history
- Design standards
- Development standards
- AI usage boundaries
- Roadmap discipline

### Why Creator OS Uses Workspaces

Creator OS is the parent platform and commercial product. Users create and manage Workspaces so each creator, brand, business, startup, or personal brand can organize its own content system.

S.Y.L.R. Mini-Series Studio is the first documented Workspace. It is not the whole platform. It may contain multiple Series inside Creator OS.

### Why Core Modules Are Not Placeholders

Dashboard, Daily Mission, Workspaces, Series, Episodes, Media Center, Asset Library, Calendar, Templates, and Settings are core modules because they represent the operational foundation for creators managing content systems.

Not every core module needs to be fully implemented at once, but future work should extend these modules instead of treating them as decorative navigation.

### Why AI Assists But Does Not Decide

Creator OS should help creators move faster while protecting creator control. AI can generate hooks, scripts, captions, CTA suggestions, hashtag suggestions, thumbnail ideas, B-roll suggestions, and prompt history in Version 0.1.

AI must not automatically publish, delete, overwrite, or make irreversible creator decisions because those actions belong to the creator.

### Why Version 0.1 Uses Simulated AI

Version 0.1 AI is template/simulated only. This allows Creator OS to test AI-assisted creator workflows without introducing live API dependencies, backend architecture, authentication, or unsafe frontend API-key handling.

AI UI should exist in Version 0.1, but outputs should be generated from templates and saved manually. Real AI API integration moves to Version 0.5, and no API keys should be stored in frontend code.

### Why Version 0.1 Requires an Active Use Gate

React/cloud migration is not allowed until Version 0.1 is actively used and real workflow pain points are identified. This protects the product from premature complexity.

Version 0.1 is actively used only after:

- Jason uses it for at least 7 days.
- At least 10 real episodes are created.
- At least 3 Workspaces or Series are tested.
- At least 10 assets, links, or notes are saved.
- At least 3 pieces of content are moved through the workflow toward posting.

### Why the Dashboard Acts as Mission Control

The Dashboard should answer the creator's most immediate operating questions:

- What Workspace am I in?
- What Series am I working on?
- What should I do next?
- What is the current Series health?
- What is blocked or missing?
- What is coming up?

Individual modules should remain the primary place to edit information. This keeps the Dashboard overview-first and prevents it from becoming a large form that creates more decisions than it removes.

### Why Creator OS Uses Overview -> Drill Down -> Edit

Creator OS should reduce decisions, not create them. The interaction pattern is:

```text
Overview -> Drill Down -> Edit
```

Overview surfaces summarize what matters. Drill-down actions take the creator to the relevant module, filtered view, or episode editor. Editing happens in the dedicated module or right-side panel where the existing workflow already lives.

### Why Major Objects Need a Lifecycle

Creator OS stores real creator planning work. A record should not feel like it disappeared after the creator archives it. Workspaces, Series, Episodes, Assets, and Templates need a predictable lifecycle:

```text
Active -> Archived -> Restored or Deleted
```

For Version 0.1, archive and delete actions should be confirmed and mostly soft-delete oriented so data remains safer in localStorage. Archived records should have visible views where the creator can restore, duplicate, or delete them.

### Why Lifecycle Controls Stay Out of the Dashboard

The Dashboard remains Mission Control. It should answer questions about focus, health, blockers, and upcoming work. Lifecycle controls belong in Workspaces, Series, Episodes, Assets, Templates, or the episode editor because those are the places where records are edited and managed.

This preserves the existing interaction principle:

```text
Overview -> Drill Down -> Edit
```

## Known Tradeoffs

- Version 0.1 stays lightweight and easier to use, but does not yet include cloud sync.
- Version 0.5 introduces Supabase, authentication, and cloud sync, which adds power and complexity.
- Version 1.0 introduces multi-user, teams, and cloud-first behavior, which requires stronger product and engineering foundations.
- S.Y.L.R. is the first Workspace example, while Creator OS must also serve Solo Creators, Entrepreneurs, Small Businesses, Startups, and Personal Brands.
- The single-file HTML export is useful for sharing, but the GitHub Pages app should use `index.html`, `styles.css`, `app.js`, and `assets`.
- `sylr-mini-series-studio.html` is now legacy backup/export only and should not be maintained as the active app.
