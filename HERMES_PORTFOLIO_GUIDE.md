# Hermes Architectural Handover & SEO-Optimized Gallery Blueprint

**Target Audience:** Hermes (Autonomous VPS / Server Agent @ `178.18.246.176`)  
**Domain Ecosystem:** `nasofi.com` (Main VPS) & `portfolio.nasofi.com` (Global CDN Showcase)  
**Author:** Pair-Programming Architect  
**Date:** October 2026  
**Status:** Production Deployed & Active

---

## 1. Executive Summary & Context

We have designed, engineered, and deployed a high-performance web showcase ecosystem comprising **11 production-grade web applications** across distinct commercial sectors, plus a multi-disciplinary portfolio showcasing **automations, workflows, open-source code utilities, and graphic/print brochures**.

### Core Architecture & Separation of Concerns

```
                               ┌────────────────────────────────────────────────────────┐
                               │                 Domain: nasofi.com                     │
                               │          (Namecheap DNS: CNAME + A Records)            │
                               └───────────────────────────┬────────────────────────────┘
                                                           │
                        ┌──────────────────────────────────┴──────────────────────────────────┐
                        │                                                                     │
                 [Root Domain @]                                                       [Subdomain 'portfolio']
              A Record ➔ 178.18.246.176                                          CNAME ➔ master-web-showcase.web.app
                        │                                                                     │
                        ▼                                                                     ▼
             ┌─────────────────────┐                                               ┌─────────────────────┐
             │  Hermes VPS Host    │                                               │  Google Cloud /     │
             │  178.18.246.176     │                                               │  Firebase CDN Edge  │
             │                     │                                               │                     │
             │ • Main nasofi.com   │                                               │ • portfolio.nasofi  │
             │ • Hermes Automations│                                               │ • /websites/        │
             │ • API Endpoints     │                                               │ • /projects/        │
             │ • Private Databases │                                               │ • 11 Standalone Apps│
             │ • Zero load from CDN│                                               │ • Free Auto-SSL     │
             └─────────────────────┘                                               └─────────────────────┘
```

- **Your VPS (`178.18.246.176`) is completely unburdened:** All visual assets, heavy canvas scripts, and visitor traffic are handled by Google's global CDN edge network.
- **Subdomain Routing:** The `portfolio` CNAME points directly to `master-web-showcase.web.app`, giving you a 100% white-labeled experience on `portfolio.nasofi.com` with automated Let's Encrypt / Google Trust Services SSL.

---

## 2. Directory Structure & Live URLs

The codebase is versioned in Git at `c:\Users\lenovo\Documents\Websites` and deployed to Firebase Hosting:

| Route Path | File Location | Purpose | Live Edge URL |
| :--- | :--- | :--- | :--- |
| `/` or `/portfolio/` | `portfolio/index.html` | **Interactive Master Simulator** (Live device switching: Desktop, Tablet, Mobile) | `https://portfolio.nasofi.com/` |
| `/websites/` | `websites/index.html` | **Dedicated Websites Gallery** (Filterable visual card grid purely for the 11 sites) | `https://portfolio.nasofi.com/websites/` |
| `/projects/` | `projects/index.html` | **Multi-Disciplinary Hub** (Websites, Workflows, OSS, Design/Brochures) | `https://portfolio.nasofi.com/projects/` |
| `/projects/01-...` through `/11-...` | `projects/01-...` to `projects/11-...` | **11 Standalone Production Builds** (Direct links for clients & embeds) | `https://portfolio.nasofi.com/projects/11-synapse-infrastructure/` (etc.) |

---

## 3. The 11 Production Websites (Index & Specifications)

| ID | Project Name | Sector & Target Market | Key Technical Differentiator | Direct Path |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Nexora Real Estate** | Luxury Moroccan Real Estate & Penthouse Showcase | Dynamic filter engine, Moroccan Dirham (`MAD`) currency toggles, high-res carousel | `/projects/01-nexora-estate/` |
| **02** | **Lumina Studio** | Minimalist Brand & Visual Architecture Agency | Fluid dark-mode typography, kinetic scroll animations, bespoke case studies | `/projects/02-lumina-creative/` |
| **03** | **Apex Fitness** | High-Performance Gym & Conditioning Center | Dynamic class schedule filter, trainer spotlight cards, tiered pricing calculator | `/projects/03-apex-fitness/` |
| **04** | **Savoria Dining** | Michelin-Inspired Fine Dining & Gastronomy | Interactive tasting menu with dietary flags, live table reservation modal | `/projects/04-savoria-dining/` |
| **05** | **Horizon Travel** | Curated Moroccan & Global Luxury Expeditions | Interactive itinerary expander, destination weather/season indicator | `/projects/05-horizon-travel/` |
| **06** | **Pulse Analytics** | Enterprise B2B SaaS Workflow & Metrics Platform | Real-time Canvas SVG charting, live KPI simulation, interactive tier switch | `/projects/06-pulse-saas/` |
| **07** | **Velvet Vogue** | Haute Couture & Moroccan Luxury Fashion Boutique | Interactive shopping cart sidebar, size selector, quick-look lightbox | `/projects/07-velvet-vogue/` |
| **08** | **Zenith Dental** | Modern Aesthetic & Orthodontic Dental Practice | Before/after smile slider, interactive booking scheduler, treatment pricing | `/projects/08-zenith-dental/` |
| **09** | **Nova Sound** | Audio Mastering, Dolby Atmos & Podcast Studio | Live Web Audio API interactive waveform frequency visualizer, gear rack | `/projects/09-nova-sound/` |
| **10** | **Artisana Maroc** | Traditional Handcrafted Moroccan Heritage Showroom | Interactive 360-style product zoom, artisan story drawer, Moroccan craft legacy | `/projects/10-artisana-shop/` |
| **11** | **Synapse IT Maroc** | Enterprise IT Infrastructure for Moroccan PMEs/TPEs | **Interactive 12U/24U/42U Server Rack Configurator**, live MAD pricing, 4G failover canvas, Sage backup sizer, 2h on-site SLA | `/projects/11-synapse-infrastructure/` |

---

## 4. Multi-Disciplinary Expansions on `/projects/`

In addition to the 11 websites, `/projects/` showcases non-web assets:

### A. Business Automations & Workflows
1. **Clinic Patient WhatsApp Triaging & CRM Sync (n8n + GreenAPI + PostgreSQL)**
   - Automatically handles appointment bookings, doctor schedule lookup, and bilingual French/Arabic WhatsApp reminders for medical clinics.
2. **Tanger Med Customs Clearance & Freight Cost Calculator (Python + REST API)**
   - Automated tariff and port clearance estimator for freight forwarders and import/export PMEs in Morocco.

### B. Open Source Code Utilities
1. **Verlet Canvas Physics Engine Suite (TypeScript / Vanilla JS)**
   - Zero-dependency 60 FPS constraint solver and particle cloth simulator with interactive drag-and-drop collision detection.

### C. Editorial & Brand Identity Brochures
1. **McKenzo Global Private Equity Prospectus (Print & Interactive PDF)**
   - 48-page corporate finance memorandum with data tables, infographics, and typography.
2. **Maison ASOFI Luxury Organic Cosmetic Identity (Packaging & Print Book)**
   - Complete Moroccan argan & prickly pear visual identity guidelines, foil-stamp dieline blueprints, and catalog.

---

## 5. How Hermes Should Organize an SEO-Optimized Gallery Page

If Hermes is generating or updating a gallery page on `nasofi.com` or managing `portfolio.nasofi.com`, follow these strict architectural and SEO rules:

### A. Semantic HTML5 Hierarchy & Breadcrumbs

```html
<header role="banner">
  <nav aria-label="Breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="https://nasofi.com/"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a itemprop="item" href="https://portfolio.nasofi.com/"><span itemprop="name">Portfolio</span></a>
        <meta itemprop="position" content="2" />
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name">Web Applications</span>
        <meta itemprop="position" content="3" />
      </li>
    </ol>
  </nav>
</header>
```

### B. JSON-LD Structured Data (ItemPage & SoftwareCatalog)

Inject this JSON-LD schema into `<head>` so Google Rich Snippets can parse each project individually:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://portfolio.nasofi.com/#website",
      "url": "https://portfolio.nasofi.com/",
      "name": "Nasofi Portfolio Showcase",
      "description": "Enterprise Web Development, Cloud Infrastructure, and Business Automations by Nasofi.",
      "inLanguage": ["fr-MA", "en-US", "ar-MA"]
    },
    {
      "@type": "ItemList",
      "@id": "https://portfolio.nasofi.com/websites/#list",
      "name": "Enterprise Web Solutions Portfolio",
      "description": "11 Production Web Applications spanning Moroccan PME Infrastructure, E-Commerce, SaaS, and Luxury Real Estate.",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 11,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Synapse IT Maroc",
          "url": "https://portfolio.nasofi.com/projects/11-synapse-infrastructure/",
          "description": "IT Infrastructure, Server Racks, Anti-Ransomware Backups, and 24/7 Managed Services for Moroccan PMEs."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Nexora Real Estate",
          "url": "https://portfolio.nasofi.com/projects/01-nexora-estate/",
          "description": "Luxury Moroccan real estate portal featuring penthouse listings and property valuation filters."
        }
      ]
    }
  ]
}
</script>
```

### C. OpenGraph & Twitter Social Cards

Each card and hub must specify explicit social cards:

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Nasofi Engineering">
<meta property="og:title" content="Enterprise Web & Infrastructure Showcase | Nasofi">
<meta property="og:description" content="Explore 11 live production web apps, cloud rack configurators, business workflows, and design systems.">
<meta property="og:image" content="https://portfolio.nasofi.com/portfolio/assets/og-cover.png">
<meta property="og:url" content="https://portfolio.nasofi.com/websites/">
<meta name="twitter:card" content="summary_large_image">
```

### D. Core Web Vitals & Asset Optimization Standards

1. **Zero Cumulative Layout Shift (CLS):** Always set explicit `width` and `height` on all card thumbnails and mockup containers.
2. **Responsive Image Delivery:** Use `<picture>` with modern `.webp` formats:
   ```html
   <picture>
     <source srcset="assets/thumb-synapse.webp" type="image/webp">
     <img src="assets/thumb-synapse.jpg" width="600" height="375" alt="Synapse IT Maroc Server Rack Configurator" loading="lazy" decoding="async">
   </picture>
   ```
3. **Keyword Density & Moroccan Geolocation SEO:**
   - Target Moroccan commercial queries: *"Développement Web Maroc"*, *"Infrastructure Informatique Casablanca"*, *"Sauvegarde Anti-Ransomware PME"*, *"Agence Web Rabat"*.
   - Use clean French / English text strings with local currency notation (`MAD HT` / `DH`).

---

## 6. Programmatic JSON Manifest (`projects.json`)

Hermes can fetch or parse this schema to generate dynamic gallery cards on any frontend without manual hardcoding:

```json
[
  {
    "id": "11-synapse-infrastructure",
    "title": "Synapse IT Maroc",
    "category": "infrastructure",
    "targetAudience": "PME & TPE Maroc (Cliniques, Fiduciaires, Usines)",
    "tags": ["IT Infrastructure", "Server Racks", "Anti-Ransomware", "Sage ERP", "Support 24/7"],
    "liveUrl": "https://portfolio.nasofi.com/projects/11-synapse-infrastructure/",
    "features": [
      "Interactive 12U/24U/42U Rack Configurator with Live MAD Pricing",
      "Automated Sage 100 3-2-1 Cloud & Air-Gapped Backup Calculator",
      "Interactive 4G/Dual-WAN Failover Network Canvas",
      "2-Hour On-Site Emergency Dispatch SLA"
    ]
  },
  {
    "id": "01-nexora-estate",
    "title": "Nexora Real Estate",
    "category": "web-application",
    "targetAudience": "Luxury Real Estate & High-Net-Worth Buyers",
    "tags": ["Real Estate", "Luxury", "Dynamic Filtering", "Interactive Maps"],
    "liveUrl": "https://portfolio.nasofi.com/projects/01-nexora-estate/",
    "features": [
      "Instant multi-criteria luxury property filtering",
      "Bespoke inquiry modal and mortgage estimator",
      "Responsive masonry gallery"
    ]
  },
  {
    "id": "06-pulse-saas",
    "title": "Pulse SaaS Platform",
    "category": "saas",
    "targetAudience": "Enterprises & High-Growth Startups",
    "tags": ["SaaS", "Analytics", "Canvas Charts", "Billing Switcher"],
    "liveUrl": "https://portfolio.nasofi.com/projects/06-pulse-saas/",
    "features": [
      "Real-time Canvas data visualizer",
      "Interactive monthly/annual subscription toggle",
      "Audit trail compliance display"
    ]
  }
]
```

---

## 7. Recommended Hermes Action Checklist

When Hermes builds or connects your root site `nasofi.com` to the portfolio:
1. **Link to the Subdomain:** Add a prominent high-converting CTA on `nasofi.com`:
   - *"Explore Our Interactive Engineering Portfolio (11 Live Sites)"* pointing to `https://portfolio.nasofi.com/`.
2. **Embed Card Previews:** Use the manifest above to render lightweight cards on `nasofi.com` that open the full live builds on `portfolio.nasofi.com`.
3. **Keep Deployments Decoupled:** Keep all future websites deployed via Firebase Hosting CLI (`npx firebase-tools deploy`) so your VPS CPU, RAM, and disk remain 100% focused on core server tasks and backend bots.
