---
agent: "ui-architect"
description: "When: you want to compare screens or sections and detect visual inconsistencies between them"
---

# Consistency audit — between screens or sections

## Nodes to compare
- File key: `${input:figmaFileKey}`
- Node A: `${input:nodeA}` (ID — name)
- Node B: `${input:nodeB}` (ID — name)
- Node C: `${input:nodeC:none}` (ID — name, if applicable)

## What to do

1. Read each node in Figma via MCP
2. Compare the same visual elements across nodes
3. Identify inconsistencies

## What to look for specifically

- Same component with different values on different screens
- Text Styles applied by hand instead of using the library styles
- Outdated components that do not match the current version
- Local styles that should be in the system

## Report format

| Element | Node A | Node B | Consistent? | Fix |
|----------|--------|--------|---------------|------------|

## At the end

- List of inconsistencies to unify with the correct value
- Components that need updating to the current library version

Prioritization:
- 🔴 Breaks the system — fix before handoff
- 🟡 Inconsistency — fix before the next iteration
- 🟢 Improvement — nice to have
