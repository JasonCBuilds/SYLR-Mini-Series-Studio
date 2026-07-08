# Creator OS Constitution

## Purpose

Creator OS is the parent platform and commercial product.

The existing S.Y.L.R. Mini-Series Studio is a Workspace inside Creator OS. It is a lightweight, static web app that helps manage short-form video episodes for the S.Y.L.R. brand, which stands for Start Young Live Rich. The current workspace supports a founder mini-series about building a brand while working full-time and launching FuelzUS.

This document defines the product principles that should guide future decisions before new features are added.

## Product Identity

- Product name: Creator OS
- Product role: Parent platform and commercial product
- Current workspace name: S.Y.L.R. Mini-Series Studio
- Brand context: S.Y.L.R. / Start Young Live Rich
- Current operating focus: short-form video episode planning and content workflow management
- Current founder story context: building S.Y.L.R. while working full-time and launching FuelzUS

Inside Creator OS, users create and manage Workspaces. A Workspace may contain multiple Series.

S.Y.L.R. Mini-Series Studio is not the platform. It exists as a Workspace inside Creator OS.

## Target Customers

Version 1 targets:

- Solo Creators
- Entrepreneurs
- Small Businesses
- Startups
- Personal Brands

Enterprise and agencies are future roadmap items.

## Core Principles

1. Documentation is the source of truth.
   Product, design, engineering, and AI decisions must be documented before or alongside implementation.

2. Do not invent features.
   New functionality must be grounded in founder decisions, explicit product needs, or documented roadmap items.

3. Preserve the creator workflow.
   The product exists to help creators organize episodes, scripts, hooks, captions, platforms, posting status, and production readiness.

4. Keep the operating system practical.
   Creator OS should remain useful for real content planning, not become a decorative dashboard.

5. Respect brand clarity.
   The current brand language is black, white, luxury streetwear-inspired, and tied to founder discipline, wealth-building, and execution.

6. Make future growth deliberate.
   Any expansion beyond the current episode dashboard must be documented in the roadmap and decision logs.

## Current Product Boundaries

The current product includes:

- A dashboard for short-form video episodes
- Status columns: Idea, Scripted, Filming, Editing, Ready, Posted
- Episode fields:
  - Title
  - Episode number
  - Hook
  - Script
  - Voiceover
  - Shot list
  - Caption
  - Hashtags
  - Product tie-in
  - Platform
  - Status
  - Scheduled post date
- A duplicate episode template action
- Sample founder mini-series episodes
- Local static HTML/CSS/JavaScript implementation
- Brand image asset used as favicon, app icon, sidebar brand icon, and dashboard brand icon

## Core Modules

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

## Data Direction

Version 0.1:

- HTML
- CSS
- JavaScript
- localStorage

Version 0.1 supports multiple Workspaces. S.Y.L.R. Mini-Series Studio is the default seeded Workspace. A Workspace may contain multiple Series, and each Series may contain multiple Episodes.

Version 0.5:

- Supabase
- Authentication
- Cloud Sync

Version 1.0:

- Multi-user
- Teams
- Cloud-first

## AI Principle

AI assists.

Creators decide.

AI must never automatically publish, delete, overwrite, or make irreversible creator decisions.

Version 0.1 AI is template/simulated only. Real AI API integration moves to Version 0.5. No API keys should be stored in frontend code.

## Version 0.1 Use Gate

Version 0.1 is actively used only when all of the following are true:

- Jason uses it for at least 7 days.
- At least 10 real episodes are created.
- At least 3 Workspaces or Series are tested.
- At least 10 assets, links, or notes are saved.
- At least 3 pieces of content are moved through the workflow toward posting.

React/cloud migration is not allowed until Version 0.1 is actively used and real workflow pain points are identified.

## Brand Voice

Creator OS should communicate in a professional, educational, founder-focused, optimistic, and practical tone.

Avoid hype, clickbait, exaggerated claims, and unnecessary complexity.

Workspace-specific brand voices are configured independently inside each Workspace.
