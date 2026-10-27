# Hermes Architecture & Production Handover (Verified & Reconciled)

**Target Audience:** Hermes (Autonomous VPS / Server Agent @ `178.18.246.176`)  
**Domain Ecosystem:** `nasofi.com` (Main VPS Astro Site) & `portfolio.nasofi.com` (Global CDN Showcase)  
**Author:** Pair-Programming Architect & Nabil Asofi (`NASOFI`)  
**Status:** All Routes Verified & Deployed | HTTP 200 Confirmed | SSL Active Until Jan 2027  
**Date:** October 2026 (Reconciled Production Record)

---

## 1. Response to Hermes Review & Critical Discrepancies Resolved

Hermes's read-only audit was **100% accurate** and highlighted critical issues that have now been fixed:

1. **Project Directory & Identity Alignment:**
   - The previous draft had placeholder names (Nexora, Lumina Studio, Apex...). 
   - **Corrected:** All records, schemas, and documents now reference the **real 11 projects** actually running on disk and in the live gallery (`01-lexicon-law` through `11-synapse-infrastructure`).
2. **Public Identity Reconciled:**
   - The legacy template author *"Austin Vance"* has been **completely removed**.
   - The site, metadata, schema, and colophons now identify **NABIL ASOFI / NASOFI** with initials **NA**.
3. **SEO Foundation Deployed:**
   - `/robots.txt` $\rightarrow$ Live, allows all, links to sitemap.
   - `/sitemap.xml` $\rightarrow$ Live, indexable, lists all 14 routes.
   - Canonical tags $\rightarrow$ Injected on `/`, `/portfolio/`, `/websites/`, and `/projects/`.
   - Open Graph & Twitter Cards $\rightarrow$ Added with high-res preview image.
   - JSON-LD Structured Data $\rightarrow$ Injected (`@type: WebSite`, `@type: ItemList`, `@type: CollectionPage`).
   - Image Layout Shift (CLS) $\rightarrow$ Explicit `width="600" height="375"` and `loading="lazy"` added to all project thumbnails.
4. **Complete `projects.json` Manifest:**
   - Full JSON API feed containing all 11 real projects, 2 workflows, 1 OSS engine, and 2 design brochures deployed to `https://portfolio.nasofi.com/projects.json`.
5. **Separation of Concerns (Why Firebase CDN instead of VPS build):**
   - The main personal brand site `nasofi.com` remains on your VPS (`178.18.246.176`).
   - The portfolio `portfolio.nasofi.com` is hosted on **Firebase Hosting CDN** to offload all heavy visual assets, canvas renderers, and traffic spikes away from the VPS RAM and CPU.
   - See Section 4 below on how Hermes can synchronize source files or add a Git remote.

---

## 2. Verified Live Production Index (All 11 Applications)

Every single URL below returns **HTTP 200 OK** on `https://portfolio.nasofi.com/`:

| No. | Project Slug | Commercial Brand & Title | Sector & Classification | Live Edge URL |
| :---: | :--- | :--- | :--- | :--- |
| **11** | `11-synapse-infrastructure` | **SYNAPSE IT MAROC** | Moroccan PME Enterprise IT, 12U–42U Racks, Anti-Ransomware, Sage 100 | [`/projects/11-synapse-infrastructure/`](https://portfolio.nasofi.com/projects/11-synapse-infrastructure/) |
| **08** | `08-lumina-dermatology` | **Lumina Derma-OS** | Clinical Aesthetic Dermatology, Laser Surgery, Before/After Slider | [`/projects/08-lumina-dermatology/`](https://portfolio.nasofi.com/projects/08-lumina-dermatology/) |
| **01** | `01-lexicon-law` | **Vanguard & Sterling LLP** | Elite Corporate Advisory & Cross-Border M&A Law Practice | [`/projects/01-lexicon-law/`](https://portfolio.nasofi.com/projects/01-lexicon-law/) |
| **02** | `02-mckenzo-consulting` | **McKenzo & Co.** | Global Strategic Management Consulting & Private Equity Advisory | [`/projects/02-mckenzo-consulting/`](https://portfolio.nasofi.com/projects/02-mckenzo-consulting/) |
| **03** | `03-asofi-terroir` | **Maison ASOFI** | Single-Estate Organic Moroccan Terroir, Olive Oils & Botanical Cosmetics | [`/projects/03-asofi-terroir/`](https://portfolio.nasofi.com/projects/03-asofi-terroir/) |
| **04** | `04-pacific-dental-concierge` | **Aussie Smile Holidays** | Luxury Dental Tourism Concierge: Sydney to Bali with Savings Sizer | [`/projects/04-pacific-dental-concierge/`](https://portfolio.nasofi.com/projects/04-pacific-dental-concierge/) |
| **05** | `05-aether-headphones` | **AETHER 01 Titanium** | Audiophile Planar Magnetic Wireless Headphones Product Launch | [`/projects/05-aether-headphones/`](https://portfolio.nasofi.com/projects/05-aether-headphones/) |
| **06** | `06-strada-espresso` | **STRADA MONOLITH** | Custom Commercial Dual-Boiler Espresso Machine Configurator | [`/projects/06-strada-espresso/`](https://portfolio.nasofi.com/projects/06-strada-espresso/) |
| **07** | `07-solstice-real-estate` | **VILLA SOLSTICE** | Ultra-Luxury Mediterranean Architectural Compound with Lighting Sim | [`/projects/07-solstice-real-estate/`](https://portfolio.nasofi.com/projects/07-solstice-real-estate/) |
| **09** | `09-archivist-journal` | **ARCHIVIST Journal** | Digital Monograph of Brutalist Architecture & Mid-Century Typography | [`/projects/09-archivist-journal/`](https://portfolio.nasofi.com/projects/09-archivist-journal/) |
| **10** | `10-nexus-terminal` | **NEXUS PRIME Terminal** | Institutional Hardware Cryptographic Vault & Air-Gapped Key Custody | [`/projects/10-nexus-terminal/`](https://portfolio.nasofi.com/projects/10-nexus-terminal/) |

---

## 3. The 3 Hub Routes

| Route | Source Location | Purpose |
| :--- | :--- | :--- |
| **`https://portfolio.nasofi.com/`** | `portfolio/index.html` | **Interactive Master Simulator** (Live viewport switcher: Desktop, Tablet, Mobile) |
| **`https://portfolio.nasofi.com/websites/`** | `websites/index.html` | **Dedicated Websites Gallery** (Filterable visual card grid strictly for the 11 sites) |
| **`https://portfolio.nasofi.com/projects/`** | `projects/index.html` | **Multi-Disciplinary Hub** (Websites, Workflows, OSS Physics Engine, Brochures) |

---

## 4. Multi-Disciplinary Expansions on `/projects/`

In addition to the 11 web applications, `/projects/` showcases non-web assets:
- **Workflows & Automations:**
  - `wf-clinic-whatsapp`: Medical Clinic WhatsApp Triaging & CRM Sync (n8n + GreenAPI + PostgreSQL)
  - `wf-tangermed-freight`: Tanger Med Automated Customs & Freight Cost Sizer (Python 3.12 + FastAPI)
- **Open Source:**
  - `oss-verlet-physics`: Verlet Canvas Physics Engine Suite (TypeScript / Vanilla Canvas 60 FPS)
- **Editorial & Print:**
  - `des-mckenzo-prospectus`: McKenzo Global Private Equity Prospectus (48-Page Print Memorandum & PDF)
  - `des-asofi-identity`: Maison ASOFI Luxury Brand Identity & Packaging Dielines

---

## 5. Integrating with `nasofi.com` (Hermes Implementation Guide)

Hermes can safely integrate the portfolio into the main `nasofi.com` Astro site without heavy lifting:

### Option A: Clean Featured Card & CTA (Recommended)
Add a tasteful, restrained section on `nasofi.com` linking to the CDN:
```html
<section class="portfolio-callout">
  <h2>Selected Client Works &amp; Engineering Showcase</h2>
  <p>Explore 11 live production builds across enterprise infrastructure, luxury e-commerce, and SaaS.</p>
  <div class="actions">
    <a href="https://portfolio.nasofi.com/" class="btn-primary" target="_blank" rel="noopener">
      Open Interactive Portfolio ↗
    </a>
    <a href="https://portfolio.nasofi.com/websites/" class="btn-secondary" target="_blank" rel="noopener">
      Browse All 11 Websites ↗
    </a>
  </div>
</section>
```

### Option B: Dynamic Grid via `projects.json`
Hermes can fetch `https://portfolio.nasofi.com/projects.json` at build time in Astro (`fetch('https://portfolio.nasofi.com/projects.json')`) to automatically render teaser cards with live URLs, badges, and features.

---

## 6. Git & Source Synchronization for Hermes

The authoritative repository currently lives on Nabil's local workstation at:
`C:\Users\lenovo\Documents\Websites` (tracked with local Git).

To give Hermes direct repository access on the VPS:
1. **GitHub / Git Remote:** We can add a private GitHub remote (`git remote add origin git@github.com:...`), push the branch, and let Hermes clone it to `/srv/nasofi/showcase-portfolio` on the VPS.
2. **Direct SSH Git Remote:** Hermes can accept a push from this workstation over SSH directly into a bare repository on the VPS (`178.18.246.176`).

Either approach will give Hermes full read-only or read-write access to the exact source files and deployment configs (`firebase.json`, `.firebaserc`).
