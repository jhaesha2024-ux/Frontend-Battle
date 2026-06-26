Core Feature Requirements
Feature 1: Matrix-Driven Pricing & Performance-Isolated Currency Switcher
Feature 2: Bento-to-Accordion Wrapper with State Persistence
→ Live deploymentlink
→ Demo Video (drive link not exceeding 100MB)
SVGs:It contains some basic UI elements which should be used while building. You cannot use
any external resources.
→
Font list: Stricttypography parameters specifying two primary fontfamilies to configure via
CSS/Head layers.
→
→ Color palette: Pre-defined hex codes outlining the exact aesthetic constraints.
demo.mp4: A compressed screen recording detailing the structural layout motion expected
forthis build.
→
The Blueprint: A pricing tier componentthattoggles between Monthly and Annual billing
cycles across three currencies: INR (₹), USD ($), and EUR (€).
→
The Data Logic: You must compute the final values dynamically using a multi-dimensional
configuration object/matrix thatfactors in a base tier rate, a flat 20% annual discount
multiplier, and regionaltariff variables.
→
The Blueprint: Presentthe core features via a modernBento-Grid layout on desktop. On
mobile viewports,this component mustrefactor into a fluid,touch-optimized Accordion list.
The Context Lock Constraint:If a user is actively hovering over or interacting with a specific
bento-node on desktop and abruptly resizes the browser window pastthe mobile breakpoint,
your application must programmatically transferthat exact active index context overto the
mobile Accordion state, ensuring the corresponding panel is open smoothly upon layout
transition.
→
→ Use 3D Frameworks: Libraries like three.js are fully permitted to enhance visual components.
Deploy Anywhere: Any cloud deployment platform can be used (Vercel, Netlify, GitHub Pages,
etc.) as long as a working live link is provided.
→
Replicate Motion Progressively:Implementthe transitions, layout animations, and microinteractions demonstrated in reference_showcase.mp4 as closely as your architecture
permits to score maximum points.
→
Incorporate Utility CSS: Tailwind CSS,Bootstrap, or pure custom CSS variables are completely
welcome.
→
Do Not Use External UI or Animation Component Libraries: You are strictly barred from
installing or using pre-built components or runtime animation engines (e.g., Shadcn, Radix,
HeadlessUI, Framer Motion)for Feature 2. All structures and transitions must be written from
scratch.
→
Do Not Trigger Global Re-renders: Changing the currency dropdown or billing toggle must not
re-renderthe parent component or surrounding layout blocks. You cannot allow global state
reflows; updates must be strictly isolated to the localized DOM text nodes containing the price
strings.
→
Do Not Use Runtime CSS-in-JS Animation Engines: All motion sequences must utilize
hardware-accelerated, native CSS Transitions/Animations orthe optimized native Web
Animations API (WAAPI).
→
Do Not Exceed Performance Caps: The initial loading sequence and entry animations must not
block semantic HTML
Entrance & Motion Constraints
Phase 1 Scoring Matrix (100 Points Total)
1. Logic, Architecture & State Isolation (40 Points)
2. SEO Optimization & Semantic HTML Structure (30 Points)
3. UI/UX Usability & Motion Matching (30 Points)
→ Micro-interactions (Hovers/Toggles):150ms – 200ms using an ease-out curve.
→ Structural Layout Reflows: 300ms – 400ms using an ease-in-out curve.
Feature 1 Completion (15 pts): Dynamic multi-currency pricing calculation using a multidimensional matrix without hardcoded UI values.
→
The Re-render & State Isolation Guardrail(15 pts): Strict evaluation via Chrome DevTools. Full
points are awarded only if changing the billing cycle or currency isolates state updates to the
targeted text nodes. Points will be docked instantly if global components reflow.
→
Feature 2 Completion & Zero-Dependency Rule (10 pts): ResponsiveBento-to-Accordion
view transition with automatic index contexttracking on window resize. The presence of
banned external libraries results in an automatic 0/10 forthis section.
→
Semantic DOM Layout (15 pts): Clean markup utilizing appropriate semantic tags (<main>,
<header>, <section>, etc.) over deep, non-semantic <div> nesting.
→
SEO Hygiene & Metadata (10 pts): Correct use of standard meta headers, Open Graph (OG)
tags, accessible image attributes, and crawlable text nodes.
→
Loading Sequence Performance (5 pts): Complete execution ofthe initial loader and entry
orchestration within the strict 500ms threshold without delaying Time to Interactive (TTI).
→
Asset Compliance & Design Polish (15 pts): Meaningful, complete integration of all asset
categories from asset_package.zip (SVG Pack, Fontlist, Color Palette). Missing or unused
assets will incur heavy point deductions.
→
Breakpoint Fluidity (10 pts): Clean, flawless layout adaptation across mobile,tablet, and
desktop viewports without horizontal clipping or overlapping typography.
→
Motion Accuracy (5 pts): Polish of hover states, easing configurations, and structural
replication accuracy from the provided demo.mp4.
Evaluation Warning: Codebases thattrigger excessive layoutthrashing, component mount-
flashing, or unnecessary globalre-renders under Chrome DevTools performance tracking will
be heavily penalized. Structure your state carefully.
Disqualification Criteria
Your submission will be immediately disqualified and excluded from evaluation ifit
meets any ofthe following conditions:
Invalid or Broken Repository Link: Providing a broken, non-existent, or private GitHub
repository link that prevents the evaluation team from auditing your source code.
!
Deployment Failures (404 / 500 Errors): Submitting a live hosted link thatresolves to
a 404 Not Found, 500 Internal Server Error, orfails to build/load entirely during the
evaluation window.
!
Plagiarism & Code Duplication: Submitting codebases that match another
contestant's repository, utilizing identicalforks, or lifting complete, unmodified
boilerplates.
!
Empty or Mock Repositories: Submitting a repository that only contains placeholder
configuration templates without actualfeature source code.
!
Banned Component Libraries: The presence of pre-built UI or animation libraries
(e.g., Radix, Shadcn, Tailwind UI, Framer Motion) in your dependency configuration for
the core components.
!
Hardcoded Feature Metrics: Hardcoding the structural values forthe currency and
billing engine instead of mapping a dynamic multi-dimensional configuration matrix.

1. JetBrains Mono (For Headers or Code Blocks)
This is a beautiful, highly precise monospaced font designed specifically for developers. It gives your
landing page titles, countdown timers, and track categories that authentic "built by coders" tech
aesthetic.
Link: JetBrains Mono on Google Fonts
2. Inter (For Body Text and UI Elements)
Inter is an incredibly clean, geometric sans-serif font engineered specifically for computer screens. It
has exceptional legibility at small sizes, making it perfect for your hackathon’s rules, schedules, FAQs,
and registration forms.
Link: Inter on Google Fonts