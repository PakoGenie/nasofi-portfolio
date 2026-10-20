/**
 * MCKENZO & CO. (mcknzo.co) — MODERN INTERACTION & ACCESSIBILITY ENGINE
 * Complies with modern-web-guidance:
 * - Respects prefers-reduced-motion
 * - Native <dialog> accessibility and focus management
 * - ARIA live status announcements
 * - Lenis Smooth Momentum Physics
 * - GSAP ScrollTrigger reveals with compositor-only properties
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Initialize Vector Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scrolling (Only if reduced motion is false)
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

  // 3. GSAP Entrance & Counter Animations
  if (typeof gsap !== 'undefined') {
    if (!prefersReducedMotion) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      heroTl.from('.hero-badge', { opacity: 0, y: -20, delay: 0.15 })
            .from('.hero-title', { opacity: 0, y: 30 }, '-=0.6')
            .from('.hero-subtitle', { opacity: 0, y: 25 }, '-=0.7')
            .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.7')
            .from('.ribbon-card', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.6');

      if (typeof ScrollTrigger !== 'undefined') {
        // Animated Numbers Counter
        gsap.utils.toArray('.counter').forEach((counterEl) => {
          const target = parseFloat(counterEl.getAttribute('data-target'));
          const isDecimal = counterEl.getAttribute('data-decimal') === '1';

          ScrollTrigger.create({
            trigger: counterEl,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              gsap.to(counterEl, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: isDecimal ? 0.1 : 1 }
              });
            }
          });
        });

        // Stagger Practice Boxes
        gsap.utils.toArray('.practice-box').forEach((box, i) => {
          gsap.from(box, {
            scrollTrigger: {
              trigger: box,
              start: 'top 88%',
              once: true
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            delay: (i % 4) * 0.1,
            ease: 'power2.out'
          });
        });
      }
    } else {
      // Immediate Static Counters for Reduced Motion
      document.querySelectorAll('.counter').forEach(el => {
        el.innerText = el.getAttribute('data-target');
      });
    }
  }

  // 4. Interactive Project Diagnostic Engine
  initDiagnosticEngine();

  // 5. References Filter
  initReferencesFilter();

  // 6. RFP & Consultation Modals
  initRFPDialog();

  // 7. General Contact Form
  initContactForm();

  // 8. Mobile Navigation Drawer
  initMobileDrawer();

  // 9. Language Switcher
  initLanguageSwitcher();
});

/**
 * Interactive ESG & Project Feasibility Diagnostic Engine
 */
function initDiagnosticEngine() {
  const step1 = document.getElementById('diagStep1');
  const step2 = document.getElementById('diagStep2');
  const step3 = document.getElementById('diagStep3');
  const stepSuccess = document.getElementById('diagStepSuccess');

  const btnNext1 = document.getElementById('btnDiagNext1');
  const btnNext2 = document.getElementById('btnDiagNext2');
  const btnBack2 = document.getElementById('btnDiagBack2');
  const btnBack3 = document.getElementById('btnDiagBack3');
  const btnReset = document.getElementById('btnResetDiag');
  const form = document.getElementById('diagForm');

  const stepNodes = document.querySelectorAll('.diag-step-node');
  const bar1 = document.getElementById('diagBar1');
  const bar2 = document.getElementById('diagBar2');

  function setStep(stepNum) {
    [step1, step2, step3, stepSuccess].forEach(s => s && s.classList.remove('active'));

    stepNodes.forEach((node, idx) => {
      const num = idx + 1;
      node.classList.remove('active', 'completed');
      if (num === stepNum) {
        node.classList.add('active');
        node.setAttribute('aria-current', 'step');
      } else if (num < stepNum) {
        node.classList.add('completed');
        node.removeAttribute('aria-current');
      } else {
        node.removeAttribute('aria-current');
      }
    });

    if (bar1) bar1.classList.toggle('active', stepNum > 1);
    if (bar2) bar2.classList.toggle('active', stepNum > 2);

    if (stepNum === 1 && step1) step1.classList.add('active');
    if (stepNum === 2 && step2) step2.classList.add('active');
    if (stepNum === 3 && step3) step3.classList.add('active');
    if (stepNum === 4 && stepSuccess) stepSuccess.classList.add('active');

    // Announce to screen readers
    announceAria(`Étape ${stepNum} du diagnostic de projet affichée.`);
  }

  if (btnNext1) btnNext1.addEventListener('click', () => setStep(2));
  if (btnBack2) btnBack2.addEventListener('click', () => setStep(1));
  if (btnNext2) btnNext2.addEventListener('click', () => setStep(3));
  if (btnBack3) btnBack3.addEventListener('click', () => setStep(2));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const sector = document.querySelector('input[name="diagSector"]:checked')?.value || 'Énergies Renouvelables';

      // Generate realistic reference ID
      const randRef = 'MKZ-2026-' + Math.floor(1000 + Math.random() * 9000);
      const codeEl = document.getElementById('diagRefCode');
      if (codeEl) codeEl.textContent = randRef;

      // Update summary pillar
      const pillarEl = document.getElementById('summaryPillar');
      if (pillarEl) {
        if (sector.includes('Énergies')) {
          pillarEl.textContent = "Études d'Impact EIES & Modélisation Micro-Climatique";
        } else if (sector.includes('Industrie')) {
          pillarEl.textContent = "Plan de Gestion Environnementale (PGES) & Audit Rejets";
        } else if (sector.includes('Infrastructures')) {
          pillarEl.textContent = "Assistance à Maîtrise d'Ouvrage (AMO) & VRD";
        } else {
          pillarEl.textContent = "Schéma Directeur Hydraulique & Valorisation des Eaux";
        }
      }

      setStep(4);
      showToast(`Dossier #${randRef} enregistré. Un consultant sénior vous contactera sous 24h.`);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      form.reset();
      setStep(1);
    });
  }
}

/**
 * References / Case Studies Category Filter
 */
function initReferencesFilter() {
  const buttons = document.querySelectorAll('.ref-filter-btn');
  const cards = document.querySelectorAll('.ref-card');

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
            gsap.fromTo(card, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.35 });
          }
        } else {
          card.style.display = 'none';
        }
      });

      announceAria(`Filtre appliqué : ${btn.innerText}. ${document.querySelectorAll('.ref-card:not([style*="display: none"])').length} projets affichés.`);
    });
  });
}

/**
 * RFP & Dépôt de Terme de Référence (TDR) Dialog
 */
function initRFPDialog() {
  const dialog = document.getElementById('rfpDialog');
  const btnOpen = document.getElementById('btnOpenRFP');
  const btnClose = document.getElementById('btnCloseRFP');
  const form = document.getElementById('rfpForm');
  const deadlineInput = document.getElementById('rfpDeadline');

  if (!dialog) return;

  if (deadlineInput) {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    deadlineInput.value = future.toISOString().split('T')[0];
  }

  function openDialog() {
    dialog.showModal();
    const firstInput = dialog.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  if (btnOpen) btnOpen.addEventListener('click', openDialog);

  const btnMobileAudit = document.getElementById('btnMobileAudit');
  if (btnMobileAudit) {
    btnMobileAudit.addEventListener('click', () => {
      const drawer = document.getElementById('mobileDrawer');
      if (drawer) drawer.classList.remove('open');
      openDialog();
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => dialog.close());
  }

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
      showToast("Cahier des charges enregistré. Notre comité d'engagement formulera une proposition technique sous 48h.");
    });
  }

  // Explore practice buttons open RFP
  document.querySelectorAll('[data-action="explore-practice"]').forEach(btn => {
    btn.addEventListener('click', openDialog);
  });
}

/**
 * General Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    showToast("Votre message a été transmis à notre Direction des Études (Maroc & Sénégal). Nous revenons vers vous rapidement.");
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
        showToast("International English overview enabled. Bilingual documentation active.");
      } else {
        showToast("Version française activée.");
      }
    });
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
 * ARIA Live Region Helper for Accessible Announcements
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
 * Accessible Toast Notification
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
    background: #0D162B;
    border: 1px solid #10B981;
    box-shadow: 0 10px 35px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.35);
    color: #F8FAFC;
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
    <span style="color: #34D399; font-size: 1.25rem;">✓</span>
    <span style="line-height: 1.4;">${msg}</span>
  `;

  document.body.appendChild(toast);

  // Trigger animation
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
