/**
 * VILLA SOLSTICE - Monolithic Cliffside Architectural Showcase
 * Interactive Daylight-to-Dusk Simulation, Blueprint Explorer & Wealth Modeling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. Lenis Smooth Inertial Scrolling
  let lenis = null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis scroll skipped:', e);
    }
  }

  // 3. Interactive Daylight-to-Dusk Solar Simulation Engine
  const timeSlider = document.getElementById('timeSlider');
  const solarTimeText = document.getElementById('solarTimeText');
  const solarTelemetryBadge = document.getElementById('solarTelemetryBadge');
  const villaDayImg = document.getElementById('villaDayImg');
  const villaDuskImg = document.getElementById('villaDuskImg');
  const lightingOverlay = document.getElementById('lightingOverlay');
  const ambientSunsetGlow = document.getElementById('ambientSunsetGlow');
  const timePresetBtns = document.querySelectorAll('.time-preset-btn');

  function updateSolarSimulation(value) {
    const val = parseFloat(value);

    // Calculate time interpolation (0 = 06:00, 50 = 14:00, 80 = 19:00, 100 = 24:00)
    let hour = 6 + (val / 100) * 18;
    let hh = Math.floor(hour);
    let mm = Math.floor((hour % 1) * 60);
    let timeStr = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;

    // Dusk crossfade threshold (around 65% = 18:00)
    let duskAlpha = 0;
    if (val > 55) {
      duskAlpha = Math.min(1, (val - 55) / 25);
    }

    if (villaDuskImg) villaDuskImg.style.opacity = duskAlpha.toString();
    if (villaDayImg) villaDayImg.style.opacity = (1 - duskAlpha * 0.95).toString();

    // Atmosphere color overlay & Telemetry
    if (val < 25) {
      // Dawn Mist
      if (solarTimeText) solarTimeText.textContent = `${timeStr} — Dawn Mist & Soft Horizon`;
      if (solarTelemetryBadge) solarTelemetryBadge.textContent = 'SUN ELEVATION: 12° • COLOR TEMP: 4200K DAWN';
      if (lightingOverlay) lightingOverlay.style.background = 'radial-gradient(circle at 60% 70%, rgba(251, 191, 36, 0.12) 0%, rgba(30, 41, 59, 0.3) 100%)';
      if (ambientSunsetGlow) ambientSunsetGlow.style.opacity = '0.05';
    } else if (val < 65) {
      // High Noon / Daylight
      if (solarTimeText) solarTimeText.textContent = `${timeStr} — Mediterranean High Noon (Radiant Sun)`;
      if (solarTelemetryBadge) solarTelemetryBadge.textContent = 'SUN ELEVATION: 68° • COLOR TEMP: 5600K DAYLIGHT';
      if (lightingOverlay) lightingOverlay.style.background = 'none';
      if (ambientSunsetGlow) ambientSunsetGlow.style.opacity = '0.08';
    } else if (val < 85) {
      // Golden Hour Sunset
      if (solarTimeText) solarTimeText.textContent = `${timeStr} — Golden Hour Sunset (Architectural Illumination)`;
      if (solarTelemetryBadge) solarTelemetryBadge.textContent = 'SUN ELEVATION: 8° • COLOR TEMP: 2800K GOLDEN HOUR';
      if (lightingOverlay) lightingOverlay.style.background = 'radial-gradient(circle at 75% 65%, rgba(245, 158, 11, 0.25) 0%, rgba(7, 10, 16, 0.4) 100%)';
      if (ambientSunsetGlow) ambientSunsetGlow.style.opacity = '0.22';
    } else {
      // Midnight Moonlit
      if (solarTimeText) solarTimeText.textContent = `${timeStr} — Midnight Horizon & Poolside Luminescence`;
      if (solarTelemetryBadge) solarTelemetryBadge.textContent = 'LUNAR ILLUMINATION • POOL UNDERWATER AMBIENCE ACTIVE';
      if (lightingOverlay) lightingOverlay.style.background = 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(4, 6, 10, 0.65) 100%)';
      if (ambientSunsetGlow) ambientSunsetGlow.style.opacity = '0.04';
    }
  }

  if (timeSlider) {
    timeSlider.addEventListener('input', (e) => {
      updateSolarSimulation(e.target.value);
      timePresetBtns.forEach((b) => b.classList.remove('active'));
    });
  }

  timePresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      timePresetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetVal = parseFloat(btn.getAttribute('data-val'));
      if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.to(timeSlider, {
          value: targetVal,
          duration: 0.65,
          ease: 'power2.out',
          onUpdate: () => updateSolarSimulation(timeSlider.value),
        });
      } else {
        timeSlider.value = targetVal;
        updateSolarSimulation(targetVal);
      }
    });
  });

  // 4. Interactive 3D Parallax Tilt on Lighting Stage
  const lightingFrame = document.getElementById('lightingFrame');
  if (lightingFrame && !prefersReducedMotion) {
    lightingFrame.addEventListener('mousemove', (e) => {
      const rect = lightingFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - y) / centerY) * 4;
      const rotateY = ((x - centerX) / centerX) * 6;

      villaDayImg.style.transform = `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      villaDuskImg.style.transform = `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    lightingFrame.addEventListener('mouseleave', () => {
      villaDayImg.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
      villaDuskImg.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 5. Interactive Architectural Blueprints & Dynamic Room Inspector
  const levelTabBtns = document.querySelectorAll('.level-tab-btn');
  const activeLevelArea = document.getElementById('activeLevelArea');
  const blueprintFloorPlan = document.getElementById('blueprintFloorPlan');
  const hotspotGroups = document.querySelectorAll('.hotspot-group');

  const inspectorImg = document.getElementById('inspectorImg');
  const inspectorBadge = document.getElementById('inspectorBadge');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorSqft = document.getElementById('inspectorSqft');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorCeiling = document.getElementById('inspectorCeiling');
  const inspectorFinishes = document.getElementById('inspectorFinishes');
  const inspectorGlazing = document.getElementById('inspectorGlazing');

  const ROOM_DATA = {
    salon: {
      badge: 'TIER 01 • SPATIAL NODE 01',
      title: 'The Double-Height Grand Salon',
      sqft: '2,450 SQ FT',
      img: 'assets/grand-salon.jpg',
      desc: 'Frameless floor-to-ceiling Schuco motorized structural glass panels slide flush into recessed travertine walls, dissolving all boundaries between the vast hearth salon and the sea-breeze terrace.',
      ceiling: '11.2 Metres (Double-Height)',
      finishes: 'Bookmatched Navona Travertine, Burnt Cedar',
      glazing: 'Acoustic Laminated Triple-Glazed Solar Low-E',
    },
    pool: {
      badge: 'TIER 01 • SPATIAL NODE 02',
      title: 'Cantilevered Heated Infinity Pool',
      sqft: '28 METRES LENGTH',
      img: 'assets/infinity-pool.jpg',
      desc: 'Suspended 12 metres out over the rock face, featuring zero-edge glass viewing portals down into the subterranean spa and volcanic stone submerged daybeds.',
      ceiling: 'Open Horizon Sky',
      finishes: 'Black Basalt Tile, Monolithic Glass Wall',
      glazing: '120mm Structural Acrylic Submerged Portholes',
    },
    dining: {
      badge: 'TIER 01 • SPATIAL NODE 03',
      title: 'Covered Al-Fresco Dining Loggia',
      sqft: '1,100 SQ FT',
      img: 'assets/architectural-detail.jpg',
      desc: 'A sheltered stone colonnade designed to seat 24 dinner guests with panoramic views of the illuminated Monaco peninsula and yacht harbor.',
      ceiling: '4.5 Metres with Radiant Overhead Heaters',
      finishes: 'Hand-Fluted Bronze, Honed Navona Stone',
      glazing: 'Automated Wind-Resistant Dropdown Bronze Mesh',
    },
    kitchen: {
      badge: 'TIER 01 • SPATIAL NODE 04',
      title: 'Master Chef Catering & Show Kitchen',
      sqft: '850 SQ FT',
      img: 'assets/wine-vault.jpg',
      desc: 'Equipped with bespoke Molteni French cooking suites, sub-zero refrigeration banks, direct subterranean dumbwaiter access to the wine vault, and butler pantry.',
      ceiling: '3.8 Metres',
      finishes: 'Nero Marquina Quartzite, Brushed Steel',
      glazing: 'UV-Shielded Acoustic Glazing',
    },
    master: {
      badge: 'TIER 02 • SPATIAL NODE 05',
      title: "The Owner's Horizon Sanctuary",
      sqft: '2,100 SQ FT',
      img: 'assets/master-sanctuary.jpg',
      desc: 'The entire southern wing of Tier 02 is dedicated to the primary suite with private wrap-around terrace, dual dressing galleries, and automated blackout shutters.',
      ceiling: '4.2 Metres',
      finishes: 'Acoustic Suede Wall Panels, White Oak',
      glazing: 'Schuco Motorized 180° Curved Corner Glass',
    },
    spa: {
      badge: 'TIER 02 • SPATIAL NODE 06',
      title: 'Monolithic Roman Travertine Spa',
      sqft: '1,250 SQ FT',
      img: 'assets/marble-spa.jpg',
      desc: 'Carved out of a single monolithic block of Roman travertine. Features private steam hammam, Finnish sauna, and hydrotherapy shower looking over the Mediterranean.',
      ceiling: '3.6 Metres',
      finishes: 'Bookmatched Navona Travertine, Teak Slats',
      glazing: 'Heated Anti-Fog Privacy Electrochromic Glass',
    },
  };

  function updateInspector(spotKey) {
    if (!ROOM_DATA[spotKey]) return;
    const room = ROOM_DATA[spotKey];

    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.to(inspectorImg, {
        opacity: 0.3,
        duration: 0.2,
        onComplete: () => {
          inspectorImg.src = room.img;
          gsap.to(inspectorImg, { opacity: 1, duration: 0.35 });
        },
      });
    } else {
      inspectorImg.src = room.img;
    }

    if (inspectorBadge) inspectorBadge.textContent = room.badge;
    if (inspectorTitle) inspectorTitle.textContent = room.title;
    if (inspectorSqft) inspectorSqft.textContent = room.sqft;
    if (inspectorDesc) inspectorDesc.textContent = room.desc;
    if (inspectorCeiling) inspectorCeiling.textContent = room.ceiling;
    if (inspectorFinishes) inspectorFinishes.textContent = room.finishes;
    if (inspectorGlazing) inspectorGlazing.textContent = room.glazing;
  }

  hotspotGroups.forEach((group) => {
    group.addEventListener('click', () => {
      const spot = group.getAttribute('data-spot');
      updateInspector(spot);
    });
  });

  levelTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      levelTabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const level = btn.getAttribute('data-level');
      if (level === '1') {
        if (activeLevelArea) activeLevelArea.textContent = 'TOTAL FLOOR AREA: 6,400 SQ FT • 11.2M CEILINGS';
        updateInspector('salon');
      } else if (level === '2') {
        if (activeLevelArea) activeLevelArea.textContent = 'TOTAL FLOOR AREA: 4,800 SQ FT • PRIVATE MASTER WING';
        updateInspector('master');
      } else {
        if (activeLevelArea) activeLevelArea.textContent = 'TOTAL FLOOR AREA: 3,000 SQ FT • HELIPAD & OBSERVATORY';
        updateInspector('dining');
      }
    });
  });

  // 6. Private Wealth Acquisition Calculator
  const downPaymentSlider = document.getElementById('downPaymentSlider');
  const downPaymentText = document.getElementById('downPaymentText');
  const interestSlider = document.getElementById('interestSlider');
  const interestRateText = document.getElementById('interestRateText');
  const termPills = document.querySelectorAll('.term-pill');
  const monthlyOutlayFigure = document.getElementById('monthlyOutlayFigure');
  const loanPrincipalFigure = document.getElementById('loanPrincipalFigure');
  const appreciationTenYears = document.getElementById('appreciationTenYears');

  const PURCHASE_PRICE = 28500000; // $28.5M USD
  let currentDownPct = 30;
  let currentRate = 4.25;
  let currentYears = 20;

  function recalculateWealthModel() {
    const downAmount = PURCHASE_PRICE * (currentDownPct / 100);
    const principal = PURCHASE_PRICE - downAmount;

    if (downPaymentText) {
      downPaymentText.textContent = `${currentDownPct}% ($${downAmount.toLocaleString()} USD)`;
    }
    if (interestRateText) {
      interestRateText.textContent = `${currentRate.toFixed(2)}% p.a.`;
    }
    if (loanPrincipalFigure) {
      loanPrincipalFigure.textContent = `$${principal.toLocaleString()} USD`;
    }

    // Monthly Amortization Calculation
    let monthlyOutlay = 0;
    if (principal > 0) {
      const monthlyRate = currentRate / 100 / 12;
      const numPayments = currentYears * 12;
      monthlyOutlay = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    if (monthlyOutlayFigure) {
      if (currentDownPct === 100) {
        monthlyOutlayFigure.textContent = '$0 / mo (All-Cash Settlement)';
      } else {
        monthlyOutlayFigure.textContent = `$${Math.round(monthlyOutlay).toLocaleString()} / mo`;
      }
    }

    // 10-Yr Capital Appreciation Model (+50% over 10 yrs on prime Cap d'Antibes prime waterfront)
    const appreciation = Math.round(PURCHASE_PRICE * 0.5);
    if (appreciationTenYears) {
      appreciationTenYears.textContent = `+$${appreciation.toLocaleString()} USD`;
    }
  }

  if (downPaymentSlider) {
    downPaymentSlider.addEventListener('input', (e) => {
      currentDownPct = parseInt(e.target.value, 10);
      recalculateWealthModel();
    });
  }

  if (interestSlider) {
    interestSlider.addEventListener('input', (e) => {
      currentRate = parseFloat(e.target.value);
      recalculateWealthModel();
    });
  }

  termPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      termPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentYears = parseInt(pill.getAttribute('data-years'), 10);
      recalculateWealthModel();
    });
  });

  // 7. Accessible Confidential Viewing Modal (<dialog id="viewingModal">)
  const viewingModal = document.getElementById('viewingModal');
  const btnCloseViewingModal = document.getElementById('btnCloseViewingModal');
  const confirmedModal = document.getElementById('confirmedModal');
  const btnCloseConfirmed = document.getElementById('btnCloseConfirmed');
  const viewingForm = document.getElementById('viewingForm');
  const confirmPrincipalName = document.getElementById('confirmPrincipalName');

  const triggerViewingBtns = [
    document.getElementById('btnHeaderBook'),
    document.getElementById('btnMobileBook'),
    document.getElementById('btnRequestViewing'),
    document.getElementById('btnBottomViewing'),
  ].filter(Boolean);

  function openViewingDialog() {
    if (!viewingModal) return;
    viewingModal.showModal();
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function closeViewingDialog() {
    if (viewingModal && viewingModal.open) {
      viewingModal.close();
    }
  }

  triggerViewingBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openViewingDialog();
    });
  });

  if (btnCloseViewingModal) {
    btnCloseViewingModal.addEventListener('click', closeViewingDialog);
  }

  if (viewingModal) {
    viewingModal.addEventListener('click', (event) => {
      const rect = viewingModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) closeViewingDialog();
    });
  }

  if (viewingForm) {
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const principalName = document.getElementById('vName')?.value || 'Lord Alistair Vance';
      if (confirmPrincipalName) confirmPrincipalName.textContent = principalName;

      closeViewingDialog();
      if (confirmedModal) {
        confirmedModal.showModal();
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }
      }
      viewingForm.reset();
    });
  }

  if (btnCloseConfirmed) {
    btnCloseConfirmed.addEventListener('click', () => {
      if (confirmedModal) confirmedModal.close();
    });
  }

  // 8. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const btnCloseMobileDrawer = document.getElementById('btnCloseMobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileDrawer(open) {
    if (!mobileDrawer) return;
    if (open) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn && mobileDrawer) mobileMenuBtn.addEventListener('click', () => toggleMobileDrawer(true));
  if (btnCloseMobileDrawer) btnCloseMobileDrawer.addEventListener('click', () => toggleMobileDrawer(false));
  mobileNavLinks.forEach((link) => link.addEventListener('click', () => toggleMobileDrawer(false)));

  // 9. GSAP ScrollTrigger Entrance Revelations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-delay')) || 0;
      gsap.fromTo(
        el,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // 10. Sticky Header Scrolled State
  const siteHeader = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Initial calculation
  recalculateWealthModel();
});
