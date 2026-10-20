/**
 * ASOFI (asofi.ma) — INTERACTION, EXPORT SIMULATOR & ACCESSIBILITY ENGINE
 * Compliant with modern-web-guidance:
 * - Container-query compatible DOM
 * - prefers-reduced-motion detection
 * - Top-layer <dialog> management
 * - Live B2B shipping volume calculation
 * - Dynamic product technical spec slide-over drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Initialize Lucide Vector Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scrolling
  let lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 3. GSAP Animations & Counters
  if (typeof gsap !== 'undefined') {
    if (!prefersReducedMotion) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      heroTl.from('.hero-badge', { opacity: 0, y: -20, delay: 0.15 })
            .from('.hero-title', { opacity: 0, y: 30 }, '-=0.6')
            .from('.hero-subtitle', { opacity: 0, y: 25 }, '-=0.7')
            .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.7')
            .from('.ribbon-card', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.6');

      if (typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.counter').forEach((counterEl) => {
          const target = parseFloat(counterEl.getAttribute('data-target'));
          ScrollTrigger.create({
            trigger: counterEl,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              gsap.to(counterEl, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 }
              });
            }
          });
        });
      }
    } else {
      document.querySelectorAll('.counter').forEach(el => {
        el.innerText = el.getAttribute('data-target');
      });
    }
  }

  // 4. Product Catalog Filters
  initProductFilters();

  // 5. B2B Export Volume & Freight Simulator
  initExportSimulator();

  // 6. Product Technical Specification Drawer
  initSpecDrawer();

  // 7. Sample Request Dialog (<dialog>)
  initSampleDialog();

  // 8. Contact Form
  initContactForm();

  // 9. Mobile Menu Drawer
  initMobileDrawer();

  // 10. Language Switcher Notice
  initLanguageSwitcher();
});

/**
 * Product Catalog Filtering
 */
function initProductFilters() {
  const buttons = document.querySelectorAll('.product-filter-group .filter-btn');
  const cards = document.querySelectorAll('.product-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.fromTo(card, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.35 });
          }
        } else {
          card.style.display = 'none';
        }
      });

      announceAria(`Filtre : ${btn.innerText}. Affichage mis à jour.`);
    });
  });
}

/**
 * B2B Export Simulator
 */
function initExportSimulator() {
  const palletRange = document.getElementById('palletRange');
  const palletDisplay = document.getElementById('palletCountDisplay');
  const productSelect = document.getElementById('simProductType');
  const incotermSelect = document.getElementById('simIncoterm');

  const unitsEl = document.getElementById('unitsEstimate');
  const weightEl = document.getElementById('weightEstimate');
  const freightEl = document.getElementById('freightType');
  const leadTimeEl = document.getElementById('leadTime');
  const btnProforma = document.getElementById('btnRequestProforma');

  if (!palletRange) return;

  function recalculate() {
    const pallets = parseInt(palletRange.value, 10);
    if (palletDisplay) {
      palletDisplay.textContent = `${pallets} Palette${pallets > 1 ? 's' : ''}`;
    }

    const productType = productSelect ? productSelect.value : 'huile';
    const incoterm = incotermSelect ? incotermSelect.value : 'FOB';

    // Unit Calculation per pallet
    let unitsPerPallet = 960; // 960 bottles per pallet standard
    let weightPerPallet = 820; // 820 kg per pallet

    if (productType === 'olives') {
      unitsPerPallet = 1200; // bocaux
      weightPerPallet = 900;
    } else if (productType === 'citrons') {
      unitsPerPallet = 80; // Seaux de 10kg
      weightPerPallet = 850;
    } else if (productType === 'harissa') {
      unitsPerPallet = 1800; // pots 200g
      weightPerPallet = 750;
    }

    const totalUnits = (pallets * unitsPerPallet).toLocaleString('fr-FR');
    const totalWeight = (pallets * weightPerPallet).toLocaleString('fr-FR');
    const totalWeightTons = ((pallets * weightPerPallet) / 1000).toFixed(1);

    if (unitsEl) unitsEl.textContent = `~${totalUnits} Unités`;
    if (weightEl) weightEl.textContent = `~${totalWeight} kg (${totalWeightTons} Tonnes)`;

    // Freight container recommendation
    if (freightEl) {
      if (pallets <= 4) {
        freightEl.textContent = 'Groupage Maritime LCL ou Camionnage Frigo Régional';
      } else if (pallets <= 10) {
        freightEl.textContent = 'Conteneur Dédié 20ft FCL (Capacité Optimale)';
      } else {
        freightEl.textContent = 'Grand Conteneur Maritime 40ft FCL High Cube';
      }
    }

    // Lead times by destination
    if (leadTimeEl) {
      if (incoterm === 'EXW') {
        leadTimeEl.textContent = 'Mise à disposition usine sous 48h';
      } else if (incoterm === 'FOB') {
        leadTimeEl.textContent = '3 à 5 jours jusqu\'au port d\'embarquement (Tanger Med)';
      } else if (incoterm === 'CIF-EU') {
        leadTimeEl.textContent = '5 à 8 jours maritimes vers ports européens (Marseille, Gênes)';
      } else if (incoterm === 'CIF-US') {
        leadTimeEl.textContent = '12 à 15 jours maritimes vers côte Est (New York / Montréal)';
      } else {
        leadTimeEl.textContent = '14 à 18 jours maritimes vers les Émirats / Golfe';
      }
    }
  }

  palletRange.addEventListener('input', recalculate);
  if (productSelect) productSelect.addEventListener('change', recalculate);
  if (incotermSelect) incotermSelect.addEventListener('change', recalculate);

  if (btnProforma) {
    btnProforma.addEventListener('click', () => {
      const pallets = palletRange.value;
      const product = productSelect.options[productSelect.selectedIndex].text;
      showToast(`Simulation export (${pallets} pal. de ${product}) transmise au bureau export.`);
      const sampleDialog = document.getElementById('sampleDialog');
      if (sampleDialog) sampleDialog.showModal();
    });
  }

  recalculate();
}

/**
 * Product Technical Specification Slide-Over Drawer
 */
const productSpecsData = {
  'Picholine Marocaine': {
    title: "Huile d'Olive Vierge Extra — Réserve Picholine Marocaine",
    acidity: "0.18% max (Norme COI < 0.8%)",
    peroxide: "6.2 meq O2/kg",
    varieties: "100% Picholine Marocaine (Terroir Béni Mellal / Marrakech)",
    harvest: "Récolte précoce à la main en novembre. Extraction à froid < 25°C sous 4h.",
    tasting: "Nez vif d'herbe fraîche et d'artichaut cru. Bouche onctueuse avec une ardence noble poivrée en fin de dégustation.",
    packaging: "Bouteilles Marasca Verre Teinté UV 250ml / 500ml / 750ml • Bidons Métal Foodservice 5L • Fûts alimentaires 200L pour réembouteillage."
  },
  'Meslala Cassées': {
    title: "Olives Vertes Meslala Cassées Marinées au Sel Beldi",
    acidity: "pH 4.1 régulé",
    peroxide: "Sans oxydation",
    varieties: "Variété Meslala à pulpe généreuse",
    harvest: "Cueillies vertes en septembre, cassées traditionnellement pour pénétrer les arômes.",
    tasting: "Saveur fraîche, note d'ail pourpre, graines de coriandre et piment doux marocain. Texture ferme et croquante.",
    packaging: "Bocaux verre 370g • Seaux plastique hermétiques 5kg et 10kg • Fûts export 150kg saumure."
  },
  'Citrons Confits Beldi': {
    title: "Citrons Confits Beldi de Marrakech au Sel Marin",
    acidity: "Naturelle par saumure au sel de mer",
    peroxide: "N/A",
    varieties: "Citron Beldi (Doppio / Bergamote marocaine)",
    harvest: "Récolte d'hiver à pleine maturité jaune d'or.",
    tasting: "Écorce très fine, parfum d'agrumes concentré, texture fondante sans aucune amertume. Sel marin pur.",
    packaging: "Bocaux verre 500g • Seaux Foodservice 10kg pour professionnels de la restauration."
  },
  'Harissa Artisanale': {
    title: "Harissa Artisanale Fumée au Bois d'Olivier",
    acidity: "Équilibrée",
    peroxide: "N/A",
    varieties: "Piments rouges de plein champ séchés au soleil",
    harvest: "Cueillette d'été, fumage traditionnel doux au bois d'olivier séché.",
    tasting: "Chaleur gourmande et enveloppante (~25,000 SHU). Notes de carvi, coriandre moulue et huile d'olive vierge.",
    packaging: "Pots verre 200g et 380g • Seaux industriels 5kg pour sauces et traiteurs."
  },
  'Olives Noires Beldi': {
    title: "Olives Noires Beldi Tradition au Sel Sec",
    acidity: "Désamérisation naturelle",
    peroxide: "N/A",
    varieties: "Olives Beldi noires surmûries sur l'arbre",
    harvest: "Récolte tardive de décembre à janvier.",
    tasting: "Arôme boisé de sous-bois, texture délicatement plissée, salinité modérée. Enrobage léger à l'huile d'olive.",
    packaging: "Poches sous-vide 1kg • Seaux 10kg • Fûts vrac pour grossistes."
  },
  'Huile Bio ASOFI': {
    title: "Huile d'Olive Vierge Extra Bio Certifiée ECOCERT",
    acidity: "0.15% max",
    peroxide: "5.1 meq O2/kg",
    varieties: "Assemblage Terroir Bio (Picholine & Menara)",
    harvest: "Culture biologique certifiée sans intrant de synthèse.",
    tasting: "Fruité mûr équilibré, notes d'amande douce, de pomme mûre et de fleurs sauvages. Très douce au palais.",
    packaging: "Bouteilles verre noir UV 500ml • Bag-in-Box 3L avec robinet hermétique anti-oxydation."
  }
};

function initSpecDrawer() {
  const drawer = document.getElementById('specDrawer');
  const titleEl = document.getElementById('specDrawerTitle');
  const bodyEl = document.getElementById('specDrawerBody');
  const btnClose = document.getElementById('btnCloseSpecDrawer');

  if (!drawer || !titleEl || !bodyEl) return;

  document.querySelectorAll('[data-action="quick-spec"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const productKey = btn.getAttribute('data-product');
      const data = productSpecsData[productKey] || productSpecsData['Picholine Marocaine'];

      titleEl.textContent = productKey;
      bodyEl.innerHTML = `
        <div class="mb-4">
          <span class="text-xs uppercase text-gold font-bold tracking-wider">Fiche Technique Export</span>
          <h4 class="font-serif text-xl text-white mt-1">${data.title}</h4>
        </div>

        <div class="p-3 bg-canvas rounded border border-subtle mb-4">
          <div class="text-xs text-muted">Variété & Terroir :</div>
          <div class="text-sm font-semibold text-white mt-1">${data.varieties}</div>
        </div>

        <div class="grid grid-cols-2 gap-2 mb-4">
          <div class="p-3 bg-canvas rounded border border-subtle">
            <span class="text-xs text-muted block">Acidité / Paramètres :</span>
            <strong class="text-gold text-sm">${data.acidity}</strong>
          </div>
          <div class="p-3 bg-canvas rounded border border-subtle">
            <span class="text-xs text-muted block">Indice Peroxyde :</span>
            <strong class="text-white text-sm">${data.peroxide}</strong>
          </div>
        </div>

        <div class="mb-4">
          <strong class="text-xs uppercase text-gold block mb-1">Profil Organoleptique :</strong>
          <p class="text-sm text-secondary leading-relaxed">${data.tasting}</p>
        </div>

        <div class="mb-4">
          <strong class="text-xs uppercase text-gold block mb-1">Méthode de Récolte & Pressage :</strong>
          <p class="text-sm text-secondary leading-relaxed">${data.harvest}</p>
        </div>

        <div class="mb-6 p-3 bg-surface-elevated rounded border border-gold">
          <strong class="text-xs text-gold block mb-1">Conditionnements & Formats Disponibles :</strong>
          <p class="text-xs text-white">${data.packaging}</p>
        </div>

        <button class="btn btn-gold full-width" onclick="requestSampleForProduct('${productKey}')">
          Demander un Échantillon B2B de ce Produit
        </button>
      `;

      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      if (window.lucide) window.lucide.createIcons();
    });
  });

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  });
}

window.requestSampleForProduct = function(productName) {
  const drawer = document.getElementById('specDrawer');
  if (drawer) drawer.classList.remove('open');

  const dialog = document.getElementById('sampleDialog');
  if (dialog) {
    dialog.showModal();
    showToast(`Produit présélectionné : ${productName}`);
  }
};

/**
 * Sample Request Dialog (<dialog>)
 */
function initSampleDialog() {
  const dialog = document.getElementById('sampleDialog');
  const btnOpen = document.getElementById('btnOpenSampleModal');
  const btnClose = document.getElementById('btnCloseSample');
  const form = document.getElementById('sampleForm');

  if (!dialog) return;

  function openDialog() {
    dialog.showModal();
    const firstInput = dialog.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  if (btnOpen) btnOpen.addEventListener('click', openDialog);

  const btnMobileSample = document.getElementById('btnMobileSample');
  if (btnMobileSample) {
    btnMobileSample.addEventListener('click', () => {
      const drawer = document.getElementById('mobileDrawer');
      if (drawer) drawer.classList.remove('open');
      openDialog();
    });
  }

  if (btnClose) btnClose.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (e) => {
    const dim = dialog.getBoundingClientRect();
    if (
      e.clientX < dim.left ||
      e.clientX > dim.right ||
      e.clientY < dim.top ||
      e.clientY > dim.bottom
    ) {
      dialog.close();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      dialog.close();
      showToast("Demande de coffret dégustation validée. Expédition DHL Express sous 48h.");
    });
  }
}

/**
 * General Contact Form
 */
function initContactForm() {
  const form = document.getElementById('exportInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    showToast("Votre demande d'offre export a été transmise à notre bureau des ventes internationales.");
  });
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const btnOpen = document.getElementById('mobileMenuBtn');
  const btnClose = document.getElementById('btnCloseMobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      drawer.classList.add('open');
      btnOpen.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (btnOpen) btnOpen.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (btnOpen) btnOpen.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
}

/**
 * Language Switcher
 */
function initLanguageSwitcher() {
  const btns = document.querySelectorAll('.lang-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const lang = btn.getAttribute('data-lang');
      if (lang === 'en') {
        showToast("English international export view active.");
      } else if (lang === 'ar') {
        showToast("تم تفعيل النسخة العربية الخاصة بالتصدير الدولي");
      } else {
        showToast("Version française activée.");
      }
    });
  });
}

/**
 * Accessibility ARIA Announcement
 */
function announceAria(message) {
  let liveRegion = document.getElementById('ariaLiveRegion');
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'ariaLiveRegion';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = message;
}

/**
 * Accessible Toast Notifications
 */
function showToast(msg) {
  const existing = document.getElementById('toastNotice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastNotice';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    background: #171F13;
    border: 1px solid #EAA838;
    box-shadow: 0 10px 35px rgba(0,0,0,0.8), 0 0 20px rgba(234, 168, 56, 0.35);
    color: #FAF8F5;
    padding: 14px 22px;
    border-radius: 8px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 440px;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  toast.innerHTML = `
    <span style="color: #EAA838; font-size: 1.25rem;">✓</span>
    <span style="line-height: 1.4;">${msg}</span>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}
