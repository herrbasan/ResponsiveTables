# ResponsiveTables

A playground for exploring responsive HTML table enhancement strategies that maintain accessibility while providing modern mobile-friendly layouts.

## Strategy

Instead of converting tables to non-semantic div structures, this approach preserves the native table semantics for screen readers while enhancing them with data attributes for responsive styling:

1. **Preserve Accessibility**: Keep the original `<table>`, `<tr>`, `<td>` structure intact for screen readers
2. **Enhancement via Data Attributes**: Add `data-label`, `data-cell-index`, and other attributes to cells
3. **CSS-Only Mobile Transformation**: Use CSS media queries to transform table display on mobile while keeping semantic HTML
4. **Flexible Layouts**: Support both card-style mobile layouts and specialized layouts like image grids

This maintains the best of both worlds: semantic HTML for accessibility and modern responsive design for user experience.

Demo: https://herrbasan.github.io/ResponsiveTables/


