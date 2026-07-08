# AI Standards

This document defines how AI should be used in Creator OS planning, documentation, and future implementation.

## Current AI Role

AI has been used to:

- Build the initial static app from founder instructions
- Help create sample founder mini-series content
- Add the supplied S.Y.L.R. brand image as an app asset
- Establish this documentation foundation

## AI Operating Principles

1. Do not invent product features.
   If a feature is not requested or documented, AI must mark it as a proposal and wait for founder approval.

2. Preserve founder intent.
   S.Y.L.R., Start Young Live Rich, founder discipline, full-time work, and FuelzUS context should not be generalized away without founder approval.

3. Distinguish facts from assumptions.
   Known facts should be documented plainly. Missing decisions should be labeled TODO.

4. Keep documentation and code aligned.
   AI-generated implementation should follow the master specification and update docs when the product changes.

5. Avoid silent scope expansion.
   AI should not add accounts, cloud sync, analytics, publishing, monetization, or irreversible automation unless they are approved.

6. AI assists.
   Creators decide.

7. AI must never automatically publish, delete, overwrite, or make irreversible creator decisions.

## Version 0.1 AI Scope

AI in Version 0.1 is template/simulated only.

No live API is used in Version 0.1.

AI UI should exist, but outputs should be generated from templates and saved manually.

Real AI API integration moves to Version 0.5.

No API keys should be stored in frontend code.

Approved Version 0.1 AI capabilities:

- Hook generation
- Script generation
- Caption generation
- CTA suggestions
- Hashtag suggestions
- Thumbnail ideas
- B-roll suggestions
- Prompt history

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

## AI Content Standards

For episode content, AI-generated copy should:

- Fit the S.Y.L.R. tone
- Be practical, direct, and founder-led
- Avoid fake claims
- Avoid pretending an event happened unless founder-provided
- Keep FuelzUS references grounded in known context

## AI Engineering Standards

When AI changes code in the future, it should:

- Read the existing app before editing
- Preserve existing behavior unless asked to change it
- Keep edits scoped
- Verify the app locally
- Report what changed and what was not tested

## AI Safety Boundaries

AI outputs are assistance, not final authority.

AI must not:

- Automatically publish content
- Delete creator work
- Overwrite creator work without explicit confirmation
- Make irreversible creator decisions
- Claim events, performance, partnerships, revenue, or outcomes that were not founder-provided

Prompt history is approved for Version 0.1. Generated outputs should remain editable by the creator.
