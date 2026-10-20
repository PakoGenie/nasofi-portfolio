/**
 * Aussie Smile Holidays - Pacific Dental Tourism Concierge
 * High-Converting Interactive Engine & Savings Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scroll
  let lenisInstance = null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    try {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis initialization skipped:', e);
    }
  }

  // 3. Interactive Australian Dental Savings Calculator
  const calcTreatment = document.getElementById('calcTreatment');
  const calcDeparture = document.getElementById('calcDeparture');
  const calcDestination = document.getElementById('calcDestination');
  const auDentistPriceEl = document.getElementById('auDentistPrice');
  const packagePriceEl = document.getElementById('packagePrice');
  const savingsAmountEl = document.getElementById('savingsAmount');
  const savingsNoteEl = document.querySelector('.savings-note');

  // Treatment Benchmark Matrix (AUD)
  const PRICING_DATA = {
    allon4: {
      name: 'All-on-4® Dental Implants (Full Arch)',
      auAvg: 38000,
      packageBase: 11900,
    },
    allon6: {
      name: 'All-on-6® Dental Implants (Both Arches)',
      auAvg: 58000,
      packageBase: 17800,
    },
    veneers: {
      name: 'Full Set Porcelain Veneers (16-20 Teeth)',
      auAvg: 30000,
      packageBase: 8900,
    },
    crowns: {
      name: 'Multiple Zirconia Crowns & Bridges (6-10 Teeth)',
      auAvg: 22000,
      packageBase: 7200,
    },
    single: {
      name: 'Single / Double Titanium Implant with Crown',
      auAvg: 6500,
      packageBase: 2100,
    },
  };

  // City flight adjustment deltas (AUD)
  const FLIGHT_DELTAS = {
    SYD: 0,
    MEL: 0,
    BNE: 50,
    PER: -150, // Perth closer to Bali/Phuket
    ADL: 80,
  };

  // Destination accommodation luxury tier
  const DESTINATION_DELTAS = {
    bali: 0,      // Seminyak Luxury Resort
    phuket: 150,  // Laguna Beachfront Retreat
    bangkok: -100 // Executive Medical City
  };

  function formatAUD(amount) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(amount) + ' AUD';
  }

  function animateNumberChange(element, startVal, endVal, prefix = '$', suffix = ' AUD') {
    if (prefersReducedMotion) {
      element.textContent = `${prefix}${endVal.toLocaleString('en-AU')}${suffix}`;
      return;
    }

    const duration = 500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (endVal - startVal) * easeProgress);

      element.textContent = `${prefix}${current.toLocaleString('en-AU')}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  let currentAuCost = 38000;
  let currentPkgCost = 11900;
  let currentSavings = 26100;

  function recalculateSavings() {
    const treatmentKey = calcTreatment?.value || 'allon4';
    const departureKey = calcDeparture?.value || 'MEL';
    const destinationKey = calcDestination?.value || 'bali';

    const treatment = PRICING_DATA[treatmentKey] || PRICING_DATA.allon4;
    const flightDelta = FLIGHT_DELTAS[departureKey] || 0;
    const destDelta = DESTINATION_DELTAS[destinationKey] || 0;

    const auCost = treatment.auAvg;
    const pkgCost = treatment.packageBase + flightDelta + destDelta;
    const savings = auCost - pkgCost;
    const percentSaved = Math.round((savings / auCost) * 100);

    if (auDentistPriceEl) {
      animateNumberChange(auDentistPriceEl, currentAuCost, auCost);
    }
    if (packagePriceEl) {
      animateNumberChange(packagePriceEl, currentPkgCost, pkgCost);
    }
    if (savingsAmountEl) {
      animateNumberChange(savingsAmountEl, currentSavings, savings);
    }

    if (savingsNoteEl) {
      savingsNoteEl.innerHTML = `You save <strong>${percentSaved}%</strong> and get a 5-star tropical holiday included for free!`;
    }

    currentAuCost = auCost;
    currentPkgCost = pkgCost;
    currentSavings = savings;
  }

  if (calcTreatment && calcDeparture && calcDestination) {
    calcTreatment.addEventListener('change', recalculateSavings);
    calcDeparture.addEventListener('change', recalculateSavings);
    calcDestination.addEventListener('change', recalculateSavings);
  }

  // 4. Hero Animated Counters
  const counterElements = document.querySelectorAll('.counter');
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            let count = 0;
            const step = Math.max(1, Math.floor(target / 60));
            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                el.textContent = target.toLocaleString('en-AU');
                clearInterval(timer);
              } else {
                el.textContent = count.toLocaleString('en-AU');
              }
            }, 25);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    counterElements.forEach((el) => observer.observe(el));
  }

  // 5. Accessible Top-Layer <dialog> Modal
  const planModal = document.getElementById('planModal');
  const btnClosePlanModal = document.getElementById('btnClosePlanModal');
  const triggerModalBtns = [
    document.getElementById('btnOpenPlanModal'),
    document.getElementById('btnHeroFreePlan'),
    document.getElementById('btnClaimQuote'),
    document.getElementById('btnCtaGetPlan'),
    document.getElementById('btnMobileQuote'),
    document.getElementById('btnFloatingQuote'),
  ].filter(Boolean);

  function openAssessmentModal(defaultTreatment) {
    if (!planModal) return;

    if (defaultTreatment) {
      const qTreatmentSelect = document.getElementById('qTreatment');
      if (qTreatmentSelect) {
        // Find matching option
        for (let i = 0; i < qTreatmentSelect.options.length; i++) {
          if (qTreatmentSelect.options[i].value.toLowerCase().includes(defaultTreatment.toLowerCase())) {
            qTreatmentSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    // Sync departure if user picked one in calculator
    if (calcDeparture) {
      const qDeparture = document.getElementById('qDeparture');
      if (qDeparture) {
        const cityVal = calcDeparture.options[calcDeparture.selectedIndex]?.text;
        for (let i = 0; i < qDeparture.options.length; i++) {
          if (qDeparture.options[i].text.includes(calcDeparture.value)) {
            qDeparture.selectedIndex = i;
            break;
          }
        }
      }
    }

    planModal.showModal();
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function closeAssessmentModal() {
    if (planModal && planModal.open) {
      planModal.close();
    }
  }

  triggerModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If clicking from calculator claim button, sync the selected treatment
      const currentTreatmentName = calcTreatment ? calcTreatment.options[calcTreatment.selectedIndex].text : '';
      openAssessmentModal(currentTreatmentName);
    });
  });

  if (btnClosePlanModal) {
    btnClosePlanModal.addEventListener('click', closeAssessmentModal);
  }

  // Close modal when clicking on backdrop
  if (planModal) {
    planModal.addEventListener('click', (event) => {
      const rect = planModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeAssessmentModal();
      }
    });
  }

  // 6. Dental Quote Form Submission & Toast Notification
  const dentalQuoteForm = document.getElementById('dentalQuoteForm');

  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notice');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="icon-sm text-cyan" aria-hidden="true"></i>
      <div>
        <strong>Assessment Request Received</strong>
        <p class="text-xs text-muted">${message}</p>
      </div>
    `;

    document.body.appendChild(toast);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  if (dentalQuoteForm) {
    dentalQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('qName')?.value || 'Valued Patient';
      const patientPhone = document.getElementById('qPhone')?.value || '';
      const chosenTreatment = document.getElementById('qTreatment')?.value || 'Dental Vacation';

      closeAssessmentModal();
      showToast(
        `G'day ${patientName}! Your itemised flight & ${chosenTreatment} quote is being prepared for ${patientPhone}. Our Aussie coordinator will contact you shortly.`,
        'success'
      );

      dentalQuoteForm.reset();
    });
  }

  // 7. Mobile Drawer Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const btnCloseMobileDrawer = document.getElementById('btnCloseMobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(open) {
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

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  }

  if (btnCloseMobileDrawer) {
    btnCloseMobileDrawer.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // 8. GSAP ScrollTrigger Entrance Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const fadeUpElements = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeUpElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-delay')) || 0;
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  // 9. Sticky Header Blur Shadow on Scroll
  const siteHeader = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });
});
