---
agent: "ui-architect"
description: "When: you need a new component in Figma, with variables, variants, and states"
---

## Input — how the request arrives

This prompt can be started in two ways:

**A) From an HTML audit** (`/audit-html-components`)
List 2 of the report already has the components to build, with detected states, planned variants, and whether they have internal grid/flex. Use that list as the base — do not re-inventory from scratch. Jump straight to the step of checking existence in the library (`search_design_system`).

**B) Direct request** (without a prior audit)
The agent asks about purpose, context, states, and variants before proceeding — see the questions at the end of this section.

---

## Before creating

Always verify:
1. Read the tokens folder (see `AGENTS.md`) to know the available variables
2. Search the library for a similar existing component (`search_design_system`)
3. Search the existing Text Styles in the library (`search_design_system` with query `heading body label`) — **never set typography without applying a system Text Style**
4. If the component exists → extend it, do not create a new one from scratch
5. If it does not exist → confirm with the UX Lead before proceeding

Ask if it is not clear:
- What is the purpose of the component? (not the name, the function)
- In which contexts is it used?
- What states does it need?
- Are there planned variants (size, hierarchy, mode)?

---

## Figma construction conventions

### Naming

- **Naming convention:** the one defined in `AGENTS.md` → «Figma conventions». If it is not defined, **ask** which to use before creating; do not assume one.
- **Variants:** as component properties, not separate names
- **Inner layers:** descriptive name of the role (`label`, `icon-left`, `state-layer`, `container`), with the same convention
- **Never:** Layer 1, Frame 42, Group 7 — name everything from the start

### Auto-layout — always

- Every component uses Auto-layout. No absolute positioning.
- Define: direction, gap, horizontal/vertical padding, alignment
- Use `Hug` so the component adapts to its content
- Use `Fill` on elements that must expand within the parent

### Variables — no hardcoded values

Every color, spacing, and radius value must be bound to a Figma variable:

| Property | Variable to use |
|-----------|----------------|
| Background color | Background or interactive color variable from `semantic/` |
| Text color | Text color variable from `semantic/` (fill of the TEXT node — see Typography section) |
| Border color | Border color variable from `semantic/` |
| Inner padding | Spacing variable from `foundations/` |
| Gap between elements | Spacing variable from `foundations/` |
| Border radius | Radius variable from `foundations/` |
| Shadow | System Effect Style (not a variable) |

If the value you need has no variable → **do not hardcode**. Report it as a missing token. If the variable must be created, use `/create-figma-tokens` (scope and description validated by the human).

> ⚠️ **Typography is NOT tokenized with color variables alone.** It requires two distinct mechanisms. See next section.

---

### Typography — Text Style + color variable

Typography in a component **always requires two independent steps**:

**Step 1 → Text Style:** controls family, size, weight, line-height **and letter-spacing** (family, size, and weight bound to variables; line-height and letter-spacing explicit in the style, never as variables).  
**Step 2 → Color variable:** controls the fill of the text node.

Never set `fontSize`, `fontName`, or `lineHeight` as loose properties — the text stays hardcoded even if it has a color variable applied.

#### Workflow to create a text node

1. Find the appropriate Text Style with `getLocalTextStylesAsync()` or `search_design_system`.
2. Apply `textNode.textStyleId = style.id`.
3. Bind the semantic color variable to the fill.

```javascript
const styles = await figma.getLocalTextStylesAsync();
let style = styles.find(s => s.name === 'heading/h3');
if (!style) style = await figma.importStyleByKeyAsync(STYLE_KEY);

const varColor = figma.variables.getVariableById(COLOR_VARIABLE_ID);

textNode.textStyleId = style.id;
textNode.fills = [figma.variables.setBoundVariableForPaint(
	textNode.fills[0], 'color', varColor
)];
```

Do not set `fontSize`, `fontName`, or `lineHeight` as loose properties, nor use a literal color in the fill.

If the Text Style you need does not exist → **report it as missing**. Do not create a new one without coordinating with the UX Lead.

### Variants and component properties

Use **Component Properties** for everything that varies:

| Type of variation | Use |
|-------------------|------|
| Visual appearance (primary/secondary/ghost) | Variant property |
| Size (sm/md/lg) | Variant property |
| State (default/hover/focus/disabled/error) | Variant property |
| With/without icon | Boolean property |
| Editable text | Text property |
| Swappable icon | Instance swap property |

### Required states

Every interactive component must have these state variants:

- `default` — rest
- `hover` — cursor over
- `focus` — keyboard navigation (visible focus ring)
- `disabled` — non-interactive, reduced opacity, cursor not-allowed
- `error` — when it applies to the component's context

For non-interactive (visual only) components: at minimum `default`.

### Interactive Components

Enable **Interactive Components** in Figma to connect the states:
- `default` → hover (on hover)
- `hover` → pressed (on mouse down)
- `default` → focus (on keyboard focus)

This allows prototypes in Figma to have real visual feedback.

---

## Recommended component structure

```
BaseComponent/
├── _Base (internal component, if there is shared logic)
├── Default/
│   ├── container (auto-layout)
│   │   ├── icon-left (optional, boolean property)
│   │   ├── label (text property)
│   │   └── icon-right (optional, boolean property)
├── Hover/ (same structure, state variables applied)
├── Focus/ (+ visible focus ring)
├── Disabled/ (opacity or disabled state variables)
└── Error/ (if applicable)
```

---

## Documentation inside Figma

### Component description (properties panel)

Always complete it on the master component:
```
What it does: [one line]
When to use it: [usage context]
When NOT to use it: [alternative if any]
```

### Variant property annotations

Each property must have a self-explanatory name:
- ✅ `State` / `Size` / `Variant` / `Has Icon`
- ❌ `Property 1` / `Boolean 1`

---

## Expected output when finished

Report:
1. Name of the created component and its location in the library
2. Variants created (list of component properties and their values)
3. Text Styles applied (which style was used on each text node)
4. Variables bound (color, spacing, radius)
5. States covered
6. Missing tokens or Text Styles detected
7. If an exception to the system was created → document it in the decisions folder (see `AGENTS.md`)

### Pre-delivery verification checklist

Before considering the component done, verify with `get_variable_defs`:

- [ ] All TEXT nodes have a `textStyleId` applied (no loose typographic properties)
- [ ] All TEXT nodes have a text color variable bound in their fill
- [ ] Background and border colors use semantic variables (no hardcoded hex)
- [ ] Paddings and gaps use spacing variables
- [ ] Border radius uses radius variables
- [ ] New variables or styles created have a scope (not `ALL_SCOPES`) and a description validated by the human
- [ ] All inner layers have a descriptive name, following the project convention
- [ ] The ComponentSet has its `description` completed with What it does / When / When NOT
- [ ] `get_variable_defs` shows Text Styles as `Font(family: "font/family/...", size: font/size/...)` — not as loose numeric values
