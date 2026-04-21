# Design System Specification: The High-Contrast Editor

## 1. Overview & Creative North Star
This design system is built upon the "High-Contrast Editor" philosophy. While it draws inspiration from the functional clarity of global video platforms, it elevates the experience through an editorial lens. We are moving away from the "generic web" look of boxed-in grids and 1px borders toward a layout that feels like a premium digital broadsheet.

**Creative North Star: The Cinematic Minimalist**
Our goal is to create a UI that acts as a silent stage for high-impact content. By utilizing aggressive white space, bold typographic scales, and a surgical application of "YouTube Red," we create an environment that feels authoritative, modern, and intentionally premium. We prioritize breathing room over containment, allowing content to bleed into the layout rather than being trapped within it.

---

## 2. Colors
Our palette is a sophisticated evolution of high-contrast neutrals anchored by a visceral, high-energy red.

*   **Primary Focus:** The `primary` (#bc0100) and `primary_container` (#eb0000) are reserved for moments of high intent—CTAs, live indicators, and critical brand touchpoints.
*   **The "No-Line" Rule:** To achieve a high-end feel, **do not use 1px solid borders to section off the UI.** Boundaries must be defined solely through background color shifts. For example, a sidebar should be defined by `surface_container_low` sitting against a `surface` background, never by a stroke.
*   **Surface Hierarchy & Nesting:** Use the `surface_container` tiers to create organic depth. 
    *   `surface`: The base canvas.
    *   `surface_container_low`: Used for large secondary areas (e.g., sidebars or secondary feeds).
    *   `surface_container_highest`: Reserved for active "hero" elements or cards that need immediate focus.
*   **The "Glass & Gradient" Rule:** Floating elements (like navigation bars or video overlays) must use a semi-transparent `surface` color with a `backdrop-blur` (minimum 12px) to feel integrated rather than "pasted."
*   **Signature Textures:** For primary action buttons or hero backgrounds, avoid flat color. Use a subtle linear gradient from `primary` (#bc0100) to `primary_container` (#eb0000) at a 135-degree angle. This adds "soul" and depth to the brand's signature red.

---

## 3. Typography
We use **Inter** as our sole typeface, relying on extreme weight contrast and size variance to establish hierarchy.

*   **Display & Headline:** Use bold weights (700+) for all `display` and `headline` levels. This mimics editorial headlines and provides the "High-Contrast" punch required.
*   **Body:** `body-lg` (1rem) is the standard for readability. Keep tracking tight and line-heights generous (1.5x) to ensure the "Modern Minimalist" feel.
*   **Labels:** Use `label-md` or `label-sm` in `on_surface_variant` (#603e39) for metadata to ensure it recedes, allowing the primary content to shine.

---

## 4. Elevation & Depth
In this design system, depth is a result of **Tonal Layering**, not structural decoration.

*   **The Layering Principle:** Stack containers to create hierarchy. A `surface_container_lowest` card placed on a `surface_container_low` section creates a natural, soft lift.
*   **Ambient Shadows:** When an element must float (e.g., a dropdown or a modal), use a "Long Shadow." 
    *   *Blur:* 40px - 60px.
    *   *Opacity:* 4% to 8% of the `on_surface` color. 
    *   *Color:* Tint the shadow with a hint of the primary red to make it feel natural to the environment.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. A 100% opaque border is a failure of the design system's minimalist intent.
*   **Glassmorphism:** Use `surface` at 80% opacity with a blur effect for any UI that sits "above" the content (e.g., a floating search bar).

---

## 5. Components

### Buttons
*   **Primary:** Subtle gradient (`primary` to `primary_container`), white text, `md` (0.75rem) roundedness. No border.
*   **Secondary:** `surface_container_high` background with `on_surface` text. High contrast, no border.
*   **Tertiary:** Bold `primary` text, no background. Used for low-emphasis actions like "Cancel" or "Show More."

### Cards & Content Lists
*   **Constraint:** Forbid the use of divider lines.
*   **Execution:** Separate list items using 16px to 24px of vertical white space. For cards, use a background shift to `surface_container_low` to define the hit area.

### Input Fields
*   **State:** Use `surface_container_highest` for the input background to provide a clear target. 
*   **Active State:** Instead of a heavy border, use a 2px `primary` underline or a `primary` "Ghost Border" to signal focus.

### Chips (Filters)
*   **Unselected:** `surface_container_high` with `label-md` typography.
*   **Selected:** `primary` background with `on_primary` text. This provides the high-contrast "pop" that defines the brand.

### Additional Component: The "Active Player" HUD
For video or media controls, use a `surface_dim` background at 60% opacity. The progress bar should use the `primary` to `primary_container` signature gradient to ensure the brand's "Red" identity is always at the center of the user's focus.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme white space. If a layout feels "full," it is likely too crowded for this system.
*   **Do** use color to guide the eye. The `primary` red should act as a beacon.
*   **Do** rely on the `surface` tokens to create separation.

### Don't
*   **Don't** use 1px lines to separate content sections.
*   **Don't** use generic gray shadows. All shadows must be ambient and low-opacity.
*   **Don't** use rounded-full (pill shapes) for everything; stick to the defined `md` (0.75rem) or `lg` (1rem) for a more professional, architectural look.
*   **Don't** use pure black (#000000). Use `on_surface` (#1c1b1b) to maintain a premium, editorial feel.