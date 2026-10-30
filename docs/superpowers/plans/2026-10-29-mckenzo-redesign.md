# Implementation Plan: McKenzo & Co. (mckenzo.co) Sovereign Industrial Upgrade

**Project:** `projects/02-mckenzo-consulting`  
**Goal:** Upgrade the existing site from generic template patterns to the **Sovereign Industrial Editorial** standard, verify across 3 viewports (`1440px`, `768px`, `390px`), and deploy to Firebase & Git.  
**Stack:** Vanilla HTML5, CSS Variables, ES6+ JavaScript, Lenis Smooth Scroll, GSAP, Lucide Icons, Trilingual i18n Engine (FR, AR, EN).

---

## Task 1: Audit & Token Architecture Refinement (`style.css`)
- **Action**: Replace generic glow blobs and oversaturated tokens with the 6-token Sovereign Industrial palette (`--c-ink`, `--c-surface`, `--c-card`, `--c-limestone`, `--c-gold`, `--c-emerald`).
- **Files**: `projects/02-mckenzo-consulting/css/style.css`
- **Verification**: Ensure no CSS errors, check computed variables.

## Task 2: Bento Grid & Asymmetrical Layout Reconstruction (`index.html`)
- **Action**:
  1. Hero section refinement: elevate editorial headline typography (`Newsreader` display serif + `Outfit` bold), remove generic glow circles.
  2. Transform `#offres` into an authoritative 2x2 Bento Ledger with tactile stamp badges.
  3. Reconstruct `#poles` into an interactive tabbed dossier layout, eliminating orphaned cards.
  4. Elevate `#simulateur` into the standout 24-hour memorability anchor: a tactile dual-console with live dirham ticker and official eligibility voucher.
  5. Add explicit `width` and `height` to all images to eliminate CLS.
  6. Fix all encoding errors (e.g. `Mentions Légales`).
- **Files**: `projects/02-mckenzo-consulting/index.html`
- **Verification**: Validate HTML structure, zero dead buttons.

## Task 3: Interactive Console & Micro-Interactions Upgrade (`app.js`)
- **Action**:
  1. Enhance `initSubsidiesSimulator` with detailed breakdown calculations (Prime Territoriale Zone A/B/C, Prime Métier d'Avenir, Prime Emploi) and animated counter numbers.
  2. Implement interactive dossier switching for `#poles`.
  3. Ensure seamless language toggle (FR, AR, EN) across all new elements and dynamic calculation labels.
  4. Ensure tactile button press feedback and smooth cubic-bezier transitions (`--ease-spring`).
- **Files**: `projects/02-mckenzo-consulting/js/app.js`
- **Verification**: Test simulator slider calculations in node/browser.

## Task 4: Multi-Viewport Browser Inspection (`1440px` / `768px` / `390px`)
- **Action**:
  1. Serve locally and inspect rendered output across Desktop (`1440px`), Tablet (`768px`), and Mobile (`390px`).
  2. Verify:
     - Zero horizontal overflow (`overflow-x: hidden`).
     - Zero clipped text or overlapping buttons.
     - Full keyboard accessibility and dialog closing (`Escape` key, backdrop click).
- **Verification**: Run diagnostic script checking for viewport overflow and layout stability.

## Task 5: Firebase & Git Deployment (`verification-before-completion`)
- **Action**:
  1. Deploy to Firebase Hosting: `npx.cmd -y firebase-tools@latest deploy --only hosting`.
  2. Verify live URL `https://portfolio.nasofi.com/projects/02-mckenzo-consulting/` returns HTTP 200.
  3. Stage all changes, commit with `feat(ui): refine mckenzo.co with sovereign industrial design system and responsive polish`, and push to Git (`git push origin master`).
- **Verification**: Fresh HTTP header checks and clean git status.
