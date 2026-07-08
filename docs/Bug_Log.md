# Bug Log

This log tracks confirmed Creator OS defects and expected behavior.

## BUG-001

- Module: Workspaces
- Severity: High
- Issue: Creating additional workspaces caused an earlier workspace named "first marketing" to disappear.
- Expected: Creating a new workspace must append to the workspace collection. Existing workspaces must never be overwritten unless explicitly edited or deleted.
- Status: Fixed in v0.1 foundation usability pass.

## BUG-002

- Module: Episode Panel
- Severity: Medium
- Issue: Clicking the X on the right-side episode panel does not close the panel.
- Expected: Clicking X closes the panel immediately.
- Status: Fixed in v0.1 foundation usability pass.

## BUG-003

- Module: Dashboard
- Severity: Medium
- Issue: Dashboard cards show basic information but do not clearly communicate next action, series health, blockers, or drill-down behavior.
- Expected: Dashboard should act as Mission Control and make the next action clear.
- Status: Fixed in v0.1 foundation usability pass.

## BUG-004

- Module: Episode Creation UX
- Severity: Medium
- Issue: When a workspace and series contain no episodes, there is no obvious way to create the first episode.
- Expected: First-time users should immediately see clear New Episode, Create First Episode, and Start Episode actions that create an Idea episode in the active Workspace and Series with the next suggested episode number.
- Status: Fixed in v0.1 episode creation usability pass.

## BUG-005

- Module: Object Lifecycle
- Severity: High
- Issue: No visible way to delete Workspaces, Series, Episodes, Assets, or Templates.
- Expected: Major objects should support Edit, Duplicate, Archive, and Delete actions with confirmation.
- Status: Fixed in v0.1 lifecycle pass.

## BUG-006

- Module: Archive
- Severity: High
- Issue: Archiving an episode removes it from the workflow, but there is no clear place to view, restore, duplicate, or permanently delete archived episodes.
- Expected: Archived items should have a visible Archived view.
- Status: Fixed in v0.1 lifecycle pass.

## BUG-007

- Module: Object Lifecycle
- Severity: Medium
- Issue: Objects do not yet follow a consistent lifecycle.
- Expected: Workspaces, Series, Episodes, Assets, and Templates should have predictable active/archive/delete behavior.
- Status: Fixed in v0.1 lifecycle pass.

## UX-001

- Module: Episode Editor
- Severity: Medium
- Issue: The right-side editor is becoming crowded.
- Expected: For now, document this only. Do not redesign the panel yet.
- Status: Documented. No editor redesign in this pass.
