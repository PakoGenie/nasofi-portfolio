# DESIGN.md — McKenzo & Co. (mckenzo.co)
**Design System & Aesthetic Specification**  
**Cabinet McKenzo & Co SARL — Bureau d'Études Générales & Stratégie Industrielle**  
*Direction : M. SALHI Anass | Siège : Béni Mellal, Maroc | Portée : Nationale & Tanger Med*

---

## 1. Aesthetic Stance: Sovereign Industrial Editorial ("L'Atelier Souverain")

McKenzo & Co. is not a generic digital consulting agency or a Silicon Valley SaaS startup. It is an **accredited Moroccan engineering bureau and sovereign industrial advisory firm** (Capital 100 000 MAD, RC 11429 Béni Mellal) handling factory blueprints, state subsidies (*Nouvelle Charte de l'Investissement*), family business succession (*PACT'Transmission*), bankable dossiers (*Tamwilcom, BMCI*), and Tanger Med port installations.

The visual direction rejects generic "AI templates" (no purple glow blobs, no 3 identical rounded cards in a row, no generic icons in gradient boxes). Instead, it adopts **Sovereign Industrial Editorial**:
- **Institutional Weight**: Heavy archival typographic headlines paired with sharp mono ledger metadata.
- **Physical Document Metaphor**: Bankable certificates, official stamp seals, tactile tabs, and state subsidy vouchers.
- **Deep Sovereign Surfaces**: Rich obsidian ink (`#060B14`) and navy stone (`#0E1626`), layered with warm limestone text (`#F5F2EB`), accented with bullion investment gold (`#D4AF37`) and Tanger Med maritime industrial emerald (`#059669`).
- **Precision Data Craft**: Financial calculations in tabular monospace, dirham breakdowns, and dynamic interactive subsidies calculation.

---

## 2. Color Token System (6-Token Palette)

```css
:root {
  /* Core 6-Token Hex Palette */
  --c-ink:             #060B14; /* Deep Sovereign Obsidian (Main Canvas) */
  --c-surface:         #0E1626; /* Deep Bureau Surface (Section Background) */
  --c-card:            #131F35; /* Tactile Card & Console Background */
  --c-card-hover:      #182744; /* Elevated Card State */
  --c-limestone:       #F5F2EB; /* Archival Paper White (Primary Headings & Text) */
  --c-sand:            #CBD5E1; /* Muted Secondary Parchment Text */
  --c-gold:            #D4AF37; /* Sovereign Bullion Gold (Charte & Primes) */
  --c-gold-hover:      #E5C158; /* Active Gold Glow */
  --c-emerald:         #059669; /* Tanger Med Industrial Trade Emerald */
  --c-emerald-glow:    rgba(5, 150, 105, 0.22);
  --c-border-subtle:   rgba(245, 242, 235, 0.09);
  --c-border-medium:   rgba(245, 242, 235, 0.16);
  --c-border-gold:     rgba(212, 175, 55, 0.35);
  --c-border-emerald:  rgba(5, 150, 105, 0.35);
}
```

---

## 3. Typography Hierarchy

| Role | Font Family | Weights / Optical Size | Usage |
| :--- | :--- | :--- | :--- |
| **Editorial Display** | `Newsreader` | 400, 600, Italic (opsz: 72) | Hero statements, institutional quotes, executive titles |
| **Structural Titles** | `Outfit` | 600, 700, 800 | Section headers, card titles, navigation |
| **Body & UI** | `Plus Jakarta Sans` | 400, 500, 600 | Explanatory text, form inputs, dialogs |
| **Financial / Ledger** | `JetBrains Mono` | 500, 700 (`tabular-nums`) | MAD amounts, percentages, ICE, RC, coordinates |
| **Arabic Typography** | `Cairo` / `Tajawal` | 600, 700, 800 | Full RTL Arabic mode for Moroccan business leaders |

---

## 4. 24-Hour Memorability Anchor

### "Le Grand Simulateur de Subventions & Faisabilité Industrielle (Charte 2026)"
An asymmetrical, interactive split console:
1. **Left (Input Controls)**:
   - Investment Capex Slider with dynamic MAD/MDH display (`1 MDH` to `150 MDH`).
   - Business Size Selector (TPE < 10 MDH vs. PME 10–50 MDH vs. Grande Entreprise).
   - Province / Zone Selector:
     - **Zone B (Prime Territoriale 10%)**: Béni Mellal, Fquih Ben Salah, Khouribga, El Jadida...
     - **Zone C (Prime Territoriale 15%)**: Azilal, Khenifra, Midelt, Tata, Zagora...
     - **Zone A (Prime Territoriale 0%)**: Axe Casa-Rabat.
   - Employment Threshold Switch (+10% Prime Emploi).
   - Sector Priority Switch (Agroalimentaire, Automobile, Décarbonation CBAM +5%).
2. **Right (Live Financial Ledger & Official Voucher)**:
   - Real-time animated tally of the total non-repayable grant: **Jusqu'à 30% d'aides de l'État**.
   - Breakdown of Primes: Prime Territoriale (MAD) + Prime Emploi (MAD) + Prime Métier d'Avenir (MAD).
   - Bankable Loan Portion (BMCI / Tamwilcom guarantee ratio: 60%).
   - Self-financing requirement (*Apport en Fonds Propres*).
   - Official certification seal and 1-click button to download/request a preliminary eligibility report.

---

## 5. Layout Architecture & Anti-Slop Upgrades

- **No generic 3-equal cards**:
  - The 4 flagship offerings (`#offres`) are restructured into a **2x2 Asymmetric Bento Ledger**:
    - Card 1 (Large Featured): *Nouvelle Charte de l'Investissement (30% Subventions)* with interactive badge and step-by-step milestones.
    - Card 2: *Transmission d'Entreprise PACT'Transmission (90% Pris en Charge)* with family enterprise succession metrics.
    - Card 3: *Tanger Med & TAC Feasibility & Land Allocation* with port coordinates and logistics connectivity.
    - Card 4: *Audit Carbone & Conformité CBAM Export UE* with EU decarbonization standards.
- **The 5 Expertise Poles (`#poles`)**:
  - Replaced from awkward grid rows into an **Interactive Tabbed Dossier System**:
    - Pôle 1: Ingénierie Industrielle & Agroalimentaire
    - Pôle 2: Montage Financier & Tamwilcom
    - Pôle 3: Expertise Judiciaire & Évaluation Foncier (Cabinet Cherkaoui)
    - Pôle 4: Décarbonation & Efficacité Énergétique
    - Pôle 5: Accompagnement Stratégique & Partenariats Bancaires (BMCI)
- **Zero CLS & Responsive Rigor**:
  - Explicit `width` and `height` on all media (`logo-mckenzo.svg`, `hero-industrial.jpg`, `tanger-med.jpg`, `cabinet-salhi.jpg`, `expert-cherkaoui.jpg`).
  - Native `<dialog>` elements for Booking and Legal dossier with clean backdrop-blur.
  - Full keyboard accessibility and WCAG AA contrast compliance (`#F5F2EB` on `#060B14` yields 17.5:1 contrast).
