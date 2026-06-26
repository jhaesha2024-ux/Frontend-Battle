# TODO - FB Round 1 site

## Plan confirmation steps
- [ ] Gather required demo/layout details (pixel-perfect requires transcript/shot list)
- [ ] Build full implementation per FB_Round_1.md (logic, bento→accordion, resize context transfer, isolated updates, semantic/SEO, motion constraints)
- [ ] Integrate provided SVG assets and fonts (JetBrains Mono + Inter) without external UI libraries
- [ ] Run local static build/lint checks (basic) and validate interactions

## Implementation checklist
- [ ] Create `index.html` with semantic structure + metadata/OG
- [ ] Create `styles.css` with CSS variables, layout, bento grid + accordion styles, motion easing (150–200ms hovers, 300–400ms structural)
- [ ] Create `app.js` implementing:
  - [ ] Multi-dimensional pricing matrix (monthly/annual, INR/USD/EUR, base rate + regional tariffs)
  - [ ] Currency dropdown + billing toggle
  - [ ] State isolation: update only localized price text nodes
  - [ ] Bento grid desktop nodes + hover/active index tracking
  - [ ] Mobile accordion refactor
  - [ ] Resize context transfer: keep active index open across breakpoint
- [ ] Wire in assets (SVG icons) in UI
- [ ] Verify no banned libraries (no runtime component libs)

## Validation
- [ ] Open in browser and manually test: currency switch, billing toggle, responsive breakpoint, hover/active transfer on resize

