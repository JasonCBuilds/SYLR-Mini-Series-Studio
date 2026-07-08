# Design System

This document captures the current visual and interaction system for Creator OS / S.Y.L.R. Mini-Series Studio.

## Brand Direction

Current visual direction:

- Clean
- Black and white
- Luxury streetwear-inspired
- Premium, bold, founder-led
- Operational dashboard rather than marketing page

Creator OS brand voice:

- Professional
- Educational
- Founder-focused
- Optimistic
- Practical

Avoid:

- Hype
- Clickbait
- Exaggerated claims
- Unnecessary complexity

Workspace-specific brand voices are configured independently inside each Workspace.

## Current Brand Asset

Primary image asset:

```text
assets/sylr-brand-icon.jpg
```

Current uses:

- Browser favicon
- Apple touch icon
- Sidebar brand icon
- Dashboard header icon

## Color Tokens

Current CSS tokens:

```text
--black: #050505
--ink: #0a0a0a
--panel: #111111
--panel-2: #171717
--line: #343434
--line-soft: #242424
--white: #f8f8f4
--muted: #a8a8a0
--dim: #73736c
--gold: #d8a84d
--gold-2: #f0cb73
--success: #d7f2b4
```

## Typography

Current font stack:

```css
"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif
```

Current typography character:

- Bold condensed display feel
- Uppercase labels
- Tight editorial dashboard hierarchy
- High contrast text on dark background

## Layout System

Desktop:

- Sticky left sidebar
- Top dashboard bar
- Horizontal status board
- Right-side episode inspector

Tablet/narrow desktop:

- Sidebar remains but workspace stacks
- Inspector moves under board

Mobile:

- Sidebar becomes top brand/navigation area
- Navigation becomes horizontal scrolling row
- Board columns stack vertically
- Inspector appears below board

## Components

Current component families:

- Sidebar brand block
- Navigation buttons
- Dashboard header
- Duplicate Template button
- Mobile selected-episode summary
- Status columns
- Episode cards
- Episode editor form
- Toast notification

## Interaction Style

- Selected episode cards use gold outline/shadow.
- Primary actions use gold accent.
- Inputs use dark backgrounds with gold focus border.
- Toast confirms template duplication and draft/update events.

## Accessibility Notes

Current positives:

- Form fields are wrapped in labels.
- Primary app regions use `aria-label` in key areas.
- Buttons are native button elements.

Known limitations:

- Some decorative glyphs in current HTML appear to have encoding artifacts.
- The dashboard icon is decorative in the header and correctly marked `aria-hidden`.

## Platform and Workspace Branding

Creator OS is the parent platform and commercial product.

S.Y.L.R. Mini-Series Studio is a Workspace inside Creator OS, not the platform itself. The current colorful S.Y.L.R. image is the brand asset for the S.Y.L.R. Workspace.

Future Workspaces may use their own independent brand voices and assets while still following Creator OS product standards.

## Design Standards

- Preserve the current clean black, white, and luxury streetwear-inspired direction for the S.Y.L.R. Workspace.
- Keep interfaces practical and operational, not decorative.
- Extend current component families before introducing unrelated UI patterns.
- Preserve dark, high-contrast dashboard styling unless a documented design decision changes it.
- Maintain mobile-friendly layouts.
