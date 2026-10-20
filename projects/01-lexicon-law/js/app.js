/**
 * VANGUARD & STERLING — CLIENT INTERACTION & ANIMATION ENGINE
 * Powers Lenis smooth scroll, GSAP ScrollTrigger reveals,
 * interactive 3-step Case Evaluation Wizard, dynamic settlement filters,
 * and partner scheduling modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scrolling
  let lenis;
  if (typeof Lenis !== 'undefined') {
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

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 3. GSAP Animations & ScrollTriggers
  if (typeof gsap !== 'undefined') {
    // Hero Entrance Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTl.from('.hero-badge', { opacity: 0, y: -20, delay: 0.2 })
          .from('.hero-title', { opacity: 0, y: 30 }, '-=0.6')
          .from('.hero-subtitle', { opacity: 0, y: 25 }, '-=0.7')
          .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.7')
          .from('.trust-item', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.6');

    // Stats Section Counter Animation
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('[data-gsap="stat-counter"]').forEach((card) => {
        const numberEl = card.querySelector('.stat-number');
        if (!numberEl) return;
        const targetVal = parseFloat(numberEl.getAttribute('data-target'));

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(numberEl, {
              innerText: targetVal,
              duration: 2,
              ease: 'power2.out',
              snap: { innerText: targetVal % 1 === 0 ? 1 : 0.1 },
            });
          }
        });
      });

      // Stagger Fade-ins for Practice Cards & Settlements
      gsap.utils.toArray('.practice-card').forEach((el, index) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: (index % 3) * 0.15,
          ease: 'power2.out'
        });
      });
    }
  }

  // 4. Interactive 3-Step Case Evaluation Wizard
  initCaseEvaluationWizard();

  // 5. Notable Settlements Category Filter
  initSettlementFilters();

  // 6. Practice Area Slide-Over Drawer
  initPracticeAreaDrawer();

  // 7. Consultation Booking Dialog (<dialog>)
  initConsultationDialog();

  // 8. FAQ Accordion
  initFaqAccordion();

  // 9. Mobile Drawer Menu
  initMobileDrawer();
});

/**
 * Interactive 3-Step Case Evaluation Wizard
 */
function initCaseEvaluationWizard() {
  const wizard = document.getElementById('caseWizard');
  if (!wizard) return;

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const stepSuccess = document.getElementById('stepSuccess');

  const btnNext1 = document.getElementById('btnNext1');
  const btnNext2 = document.getElementById('btnNext2');
  const btnBack2 = document.getElementById('btnBack2');
  const btnBack3 = document.getElementById('btnBack3');
  const btnResetWizard = document.getElementById('btnResetWizard');
  const evalForm = document.getElementById('evaluationForm');

  const stepIndicators = wizard.querySelectorAll('.step-indicator');
  const stepLine1 = document.getElementById('stepLine1');
  const stepLine2 = document.getElementById('stepLine2');

  const damagesRange = document.getElementById('damagesRange');
  const damagesDisplay = document.getElementById('damagesDisplay');

  const damageTiers = [
    'Under $100,000',
    '$100,000 - $500,000',
    '$500,000 - $1,500,000',
    '$1,500,000 - $10,000,000',
    '$10,000,000+ (Complex / Class Action)'
  ];

  // Range Slider Value Listener
  if (damagesRange && damagesDisplay) {
    damagesRange.addEventListener('input', (e) => {
      const idx = parseInt(e.target.value, 10) - 1;
      damagesDisplay.textContent = damageTiers[idx] || '$500,000 - $1,500,000';
    });
  }

  function goToStep(stepNum) {
    // Hide all steps
    [step1, step2, step3, stepSuccess].forEach(s => s && s.classList.remove('active'));

    // Reset Stepper visuals
    stepIndicators.forEach((ind, i) => {
      const stepIndex = i + 1;
      ind.classList.remove('active', 'completed');
      if (stepIndex === stepNum) {
        ind.classList.add('active');
      } else if (stepIndex < stepNum) {
        ind.classList.add('completed');
      }
    });

    if (stepLine1) {
      stepLine1.classList.toggle('active', stepNum > 1);
    }
    if (stepLine2) {
      stepLine2.classList.toggle('active', stepNum > 2);
    }

    if (stepNum === 1) step1.classList.add('active');
    if (stepNum === 2) step2.classList.add('active');
    if (stepNum === 3) step3.classList.add('active');
    if (stepNum === 4) stepSuccess.classList.add('active');

    // Smooth scroll to top of wizard on step change
    const wizardTop = wizard.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: wizardTop, behavior: 'smooth' });
  }

  if (btnNext1) btnNext1.addEventListener('click', () => goToStep(2));
  if (btnBack2) btnBack2.addEventListener('click', () => goToStep(1));
  if (btnNext2) btnNext2.addEventListener('click', () => goToStep(3));
  if (btnBack3) btnBack3.addEventListener('click', () => goToStep(2));

  // Form Submission
  if (evalForm) {
    evalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('evalName')?.value || 'Valued Client';
      const category = document.querySelector('input[name="caseCategory"]:checked')?.value || 'Commercial Litigation';
      const damages = damagesDisplay?.textContent || '$1M+';

      // Generate realistic reference code
      const randRef = 'VS-2026-' + Math.floor(1000 + Math.random() * 9000);
      const codeEl = document.getElementById('confirmationCode');
      if (codeEl) codeEl.textContent = randRef;

      // Advance to Success screen
      goToStep(4);

      // Trigger Confetti or celebratory indicator
      showNotification(`Case file #${randRef} dispatched directly to Senior Litigation Counsel.`);
    });
  }

  // Reset Wizard
  if (btnResetWizard) {
    btnResetWizard.addEventListener('click', () => {
      evalForm.reset();
      if (damagesRange) damagesRange.value = 3;
      if (damagesDisplay) damagesDisplay.textContent = damageTiers[2];
      goToStep(1);
    });
  }
}

/**
 * Verdicts & Settlements Category Filtering
 */
function initSettlementFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.settlement-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.35 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Practice Area Deep-Dive Slide-Over Drawer
 */
const practiceData = {
  'Commercial & Corporate Litigation': {
    lead: 'Marcus Sterling, Esq.',
    statutes: 'Securities Exchange Act § 10(b), Uniform Commercial Code Art. 2, Delaware General Corporation Law',
    summary: 'Our commercial litigation practice handles enterprise disputes where exposure exceeds eight figures. We routinely defeat aggressive motions to dismiss and drive cases toward advantageous jury verdicts.',
    cases: [
      { amount: '$64.5M', name: 'Energy Consortium Joint Venture Breach', court: 'SDNY Federal Jury Verdict' },
      { amount: '$15.6M', name: 'Private Equity General Partner Disgorgement', court: 'Delaware Chancery Court' }
    ]
  },
  'Catastrophic Personal Injury & Mass Tort': {
    lead: 'Elena Vance, Esq.',
    statutes: 'Restatement (Third) of Torts, Federal Motor Carrier Safety Regulations, Federal Employers Liability Act',
    summary: 'When negligence causes life-altering harm or wrongful death, we marshal forensic engineers, life-care planners, and medical specialists to secure complete restitution for families.',
    cases: [
      { amount: '$38.2M', name: 'Commercial Trucking Fleet Defective Brake Settlement', court: 'California Superior' },
      { amount: '$19.4M', name: 'Refinery Crane Collapse Jury Verdict', court: 'Texas District Court' }
    ]
  },
  'Intellectual Property & Trade Secrets': {
    lead: 'Sophia Kensington, Esq.',
    statutes: 'Defend Trade Secrets Act (DTSA), 35 U.S.C. § 271, ITC Section 337 Tariff Act of 1930',
    summary: 'We defend groundbreaking technological innovations across high-tech, AI, and biotech sectors against competitor infringement and corporate espionage.',
    cases: [
      { amount: '$27.8M', name: 'High-Frequency FinTech Algorithm Theft', court: 'AAA Commercial Panel' },
      { amount: '$12.9M', name: 'Biosensor Medical Device Royalty Injunction', court: 'Federal Circuit' }
    ]
  },
  'White-Collar & Government Investigations': {
    lead: 'David Thorne, Esq.',
    statutes: 'Foreign Corrupt Practices Act (FCPA), 18 U.S.C. § 1341 (Mail/Wire Fraud), False Claims Act (Qui Tam)',
    summary: 'Staffed by former federal prosecutors who understand how regulatory agencies build charges. We provide stealth crisis mitigation and vigorous defense against subpoenas.',
    cases: [
      { amount: 'Dismissed', name: 'Special Purpose Acquisition (SPAC) SEC Investigation', court: 'Full Case Closure' },
      { amount: 'Declined', name: 'Healthcare System Medicare Fraud Subpoena', court: 'DOJ Non-Prosecution' }
    ]
  },
  'Executive Compensation & Whistleblower': {
    lead: 'Marcus Sterling, Esq.',
    statutes: 'Dodd-Frank Wall Street Reform Act, Sarbanes-Oxley § 806, IRC § 409A Golden Parachute Rules',
    summary: 'Representing Fortune 500 CEOs, chief medical officers, and senior founders in high-stakes exits, severance enforcement, and protected disclosures.',
    cases: [
      { amount: '$18.5M', name: 'Silicon Valley Unicorn CFO Unvested Equity Recovery', court: 'JAMS Arbitration' },
      { amount: '$9.2M', name: 'Pharma Whistleblower Settlement & Relator Share', court: 'EDNY' }
    ]
  },
  'Commercial Real Estate & Land Use': {
    lead: 'David Thorne, Esq.',
    statutes: 'Commercial Landlord-Tenant Act, Environmental Quality Act (CEQA/SEQRA), Condemnation / Eminent Domain',
    summary: 'Defending billion-dollar property portfolios, complex mezzanine foreclosures, and contested municipal zoning entitlements.',
    cases: [
      { amount: '$45M Injunction', name: 'Manhattan Mixed-Use Skyscraper Construction Halt Defeated', court: 'NY Supreme Commercial' },
      { amount: '$22M Award', name: 'Commercial Transit Hub Condemnation Valuation', court: 'State Appellate' }
    ]
  }
};

function initPracticeAreaDrawer() {
  const drawer = document.getElementById('practiceDrawer');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');

  if (!drawer || !drawerTitle || !drawerBody) return;

  document.querySelectorAll('[data-action="explore-practice"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-title');
      const data = practiceData[title] || practiceData['Commercial & Corporate Litigation'];

      drawerTitle.textContent = title;
      drawerBody.innerHTML = `
        <div class="mb-4">
          <span class="text-xs uppercase text-gold font-semibold tracking-wider">Practice Group Leader</span>
          <h4 class="font-serif text-lg text-main mt-1">${data.lead}</h4>
        </div>

        <p class="text-sm text-secondary mb-4 leading-relaxed">${data.summary}</p>

        <div class="mb-4 p-3 bg-darkest rounded border border-subtle">
          <strong class="text-xs text-muted block mb-1">Key Governing Statutes & Standards:</strong>
          <span class="text-xs font-mono text-gold">${data.statutes}</span>
        </div>

        <h5 class="font-serif text-sm text-gold uppercase tracking-wider mb-2">Featured Precedents & Verdicts</h5>
        <div class="flex flex-col gap-2 mb-6">
          ${data.cases.map(c => `
            <div class="p-3 bg-darkest rounded border border-subtle">
              <div class="text-gold font-bold text-lg">${c.amount}</div>
              <div class="text-sm font-semibold">${c.name}</div>
              <div class="text-xs text-muted mt-1">${c.court}</div>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-primary full-width" onclick="openConsultationFor('${data.lead}')">
          Request Consultation with ${data.lead.split(',')[0]}
        </button>
      `;

      drawer.classList.add('open');
      if (window.lucide) window.lucide.createIcons();
    });
  });

  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener('click', () => drawer.classList.remove('open'));
  }

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }
  });
}

/**
 * Partner Consultation Dialog (<dialog>)
 */
function initConsultationDialog() {
  const dialog = document.getElementById('consultationDialog');
  const btnOpen = document.getElementById('btnOpenConsultation');
  const btnClose = document.getElementById('btnCloseConsultation');
  const form = document.getElementById('consultationForm');
  const dateInput = document.getElementById('consultDate');

  if (!dialog) return;

  // Set min date to tomorrow
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      dialog.showModal();
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      dialog.close();
    });
  }

  // Close when clicking on backdrop
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  // Direct Lawyer Consultation Buttons
  document.querySelectorAll('[data-action="consult-attorney"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lawyer = btn.getAttribute('data-lawyer');
      window.openConsultationFor(lawyer);
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lawyer = document.getElementById('displayLawyer')?.value || 'Senior Partner';
      dialog.close();
      showNotification(`Consultation scheduled with ${lawyer}. Calendar invitation sent to your email.`);
    });
  }
}

// Global helper to open consultation modal for a specific attorney
window.openConsultationFor = function(lawyerName) {
  const dialog = document.getElementById('consultationDialog');
  const displayInput = document.getElementById('displayLawyer');
  const hiddenInput = document.getElementById('preferredLawyerInput');
  const drawer = document.getElementById('practiceDrawer');

  if (drawer) drawer.classList.remove('open');

  if (displayInput) displayInput.value = lawyerName;
  if (hiddenInput) hiddenInput.value = lawyerName;

  if (dialog) dialog.showModal();
};

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
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
    btnOpen.addEventListener('click', () => drawer.classList.add('open'));
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => drawer.classList.remove('open'));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

/**
 * Polished Toast Notification
 */
function showNotification(msg) {
  const existing = document.getElementById('toastNotification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastNotification';
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    background: #0F172A;
    border: 1px solid #C5A059;
    box-shadow: 0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(197, 160, 89, 0.3);
    color: #F8FAFC;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `;

  toast.innerHTML = `
    <span style="color: #10B981; font-size: 1.2rem;">✓</span>
    <span>${msg}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
