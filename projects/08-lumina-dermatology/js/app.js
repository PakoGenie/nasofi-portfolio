/**
 * LUMINA DERMA-OS | Enterprise Dermatology Practice Intelligence Platform
 * Clinical Logic: EMR State, Facial Injection Mapping, Telemetry, and Post-Care Triage
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 3. Tab Navigation Engine
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      if (!targetTab) return;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      tabContents.forEach(tab => {
        if (tab.id === `tab-${targetTab}`) {
          tab.classList.add('active');
          if (window.gsap) {
            gsap.fromTo(tab, 
              { opacity: 0, y: 14 }, 
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            );
          }
        } else {
          tab.classList.remove('active');
        }
      });

      // Re-trigger icon updates in case newly revealed
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // 4. Interactive Facial Injection Mapping & Dosing Engine
  const zonePricing = {
    forehead: { name: 'Frontalis', units: 14, cost: 210, type: 'neurotoxin' },
    glabella: { name: 'Glabella', units: 20, cost: 300, type: 'neurotoxin' },
    crows: { name: "Crow's Feet", units: 24, cost: 360, type: 'neurotoxin' },
    lips: { name: 'Lips Vermilion', units: 0, cost: 750, type: 'filler' },
    cheeks: { name: 'Malar Vascular', units: 0, cost: 450, type: 'laser' }
  };

  const zoneState = {
    forehead: true,
    glabella: true,
    crows: true,
    lips: true,
    cheeks: true
  };

  const faceZones = document.querySelectorAll('.face-zone-group');
  const costDisplay = document.getElementById('protocolTotalCost');
  const unitsDisplay = document.getElementById('protocolTotalUnits');

  function updateFacialCalculations() {
    let totalCost = 0;
    let totalUnits = 0;

    Object.keys(zoneState).forEach(zone => {
      const isSelected = zoneState[zone];
      const doseRow = document.getElementById(`dose${zone.charAt(0).toUpperCase() + zone.slice(1)}`);

      if (doseRow) {
        if (isSelected) {
          doseRow.classList.remove('inactive');
          totalCost += zonePricing[zone].cost;
          totalUnits += zonePricing[zone].units;
        } else {
          doseRow.classList.add('inactive');
        }
      }
    });

    if (costDisplay) {
      costDisplay.textContent = `$${totalCost.toLocaleString()} USD`;
    }
    if (unitsDisplay) {
      unitsDisplay.textContent = `${totalUnits} Units`;
    }
  }

  faceZones.forEach(zoneElem => {
    zoneElem.addEventListener('click', () => {
      const zoneKey = zoneElem.getAttribute('data-zone');
      if (!zoneKey) return;

      zoneState[zoneKey] = !zoneState[zoneKey];

      // Match all SVG groups with this zone (e.g. bilateral crow's feet or cheeks)
      const matchingGroups = document.querySelectorAll(`.face-zone-group[data-zone="${zoneKey}"]`);
      matchingGroups.forEach(g => {
        if (zoneState[zoneKey]) {
          g.classList.add('active');
        } else {
          g.classList.remove('active');
        }
      });

      // Visual pulse
      if (window.gsap) {
        gsap.fromTo(matchingGroups, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
      }

      updateFacialCalculations();
    });
  });

  // Commit Treatment Plan Button
  const btnApplyPlan = document.getElementById('btnApplyTreatmentPlan');
  if (btnApplyPlan) {
    btnApplyPlan.addEventListener('click', () => {
      showToast('Treatment prescription committed to Elena Rostova (#LD-2026-9812). Ready for injector sign-off.');
    });
  }

  // 5. Patient Directory Filtering & Search
  const filterChips = document.querySelectorAll('.patient-filter-bar .filter-chip');
  const patientCards = document.querySelectorAll('.patient-card');
  const globalSearchInput = document.getElementById('globalSearchInput');

  function filterPatientList() {
    const activeChip = document.querySelector('.patient-filter-bar .filter-chip.active');
    const filterValue = activeChip ? activeChip.getAttribute('data-filter') : 'all';
    const query = globalSearchInput ? globalSearchInput.value.toLowerCase().trim() : '';

    patientCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      const textContent = card.innerText.toLowerCase();

      const matchesFilter = (filterValue === 'all') || categories.includes(filterValue);
      const matchesSearch = query === '' || textContent.includes(query);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterPatientList();
    });
  });

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', () => {
      // If typing, ensure we switch to patients tab if not already on it
      const patientsTabBtn = document.querySelector('.sidebar-nav .nav-item[data-tab="patients"]');
      if (globalSearchInput.value.trim().length > 1 && patientsTabBtn && !patientsTabBtn.classList.contains('active')) {
        patientsTabBtn.click();
      }
      filterPatientList();
    });
  }

  // 6. Patient Dossier Slide-Over Drawer (<dialog id="patientDossierModal">)
  const dossierModal = document.getElementById('patientDossierModal');
  const btnCloseDossier = document.getElementById('btnCloseDossier');
  const dossierAvatar = document.getElementById('dossierAvatar');
  const dossierName = document.getElementById('dossierName');
  const dossierMrn = document.getElementById('dossierMrn');
  const dossierFitzpatrick = document.getElementById('dossierFitzpatrick');

  const patientDatabase = {
    elena: {
      name: 'Elena Rostova',
      mrn: 'MRN: #LD-2026-9812 • Female • Age 34',
      fitzpatrick: 'Fitzpatrick Type II',
      img: 'assets/patient-profile.jpg'
    },
    marcus: {
      name: 'Marcus Sterling',
      mrn: 'MRN: #LD-2026-4410 • Male • Age 48',
      fitzpatrick: 'Fitzpatrick Type III',
      img: 'assets/doctor-consult.jpg'
    },
    chloe: {
      name: 'Chloe Davenport',
      mrn: 'MRN: #LD-2026-1184 • Female • Age 29',
      fitzpatrick: 'Fitzpatrick Type I',
      img: 'assets/lips-contour.jpg'
    },
    jonathan: {
      name: 'Dr. Jonathan Hayes',
      mrn: 'MRN: #LD-2026-7201 • Male • Age 52',
      fitzpatrick: 'Fitzpatrick Type IV',
      img: 'assets/skin-analysis.jpg'
    }
  };

  document.querySelectorAll('.btn-open-dossier').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientKey = btn.getAttribute('data-patient') || 'elena';
      const patient = patientDatabase[patientKey] || patientDatabase.elena;

      if (dossierAvatar) dossierAvatar.src = patient.img;
      if (dossierName) dossierName.textContent = patient.name;
      if (dossierMrn) dossierMrn.textContent = patient.mrn;
      if (dossierFitzpatrick) dossierFitzpatrick.textContent = patient.fitzpatrick;

      if (dossierModal) {
        dossierModal.showModal();
      }
    });
  });

  if (btnCloseDossier && dossierModal) {
    btnCloseDossier.addEventListener('click', () => {
      dossierModal.close();
    });
  }

  // Click outside to close dossier
  if (dossierModal) {
    dossierModal.addEventListener('click', (e) => {
      const rect = dossierModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        dossierModal.close();
      }
    });
  }

  // 7. New Patient Intake Modal (<dialog id="newPatientModal">)
  const newPatientModal = document.getElementById('newPatientModal');
  const btnOpenNewPatient = document.getElementById('btnOpenNewPatient');
  const btnAddNewPatientFromTab = document.getElementById('btnAddNewPatientFromTab');
  const btnCloseNewPatient = document.getElementById('btnCloseNewPatient');
  const newPatientForm = document.getElementById('newPatientForm');
  const sidebarPatientCount = document.getElementById('sidebarPatientCount');
  const patientsGrid = document.getElementById('patientsGrid');

  function openIntake() {
    if (newPatientModal) newPatientModal.showModal();
  }

  if (btnOpenNewPatient) btnOpenNewPatient.addEventListener('click', openIntake);
  if (btnAddNewPatientFromTab) btnAddNewPatientFromTab.addEventListener('click', openIntake);
  if (btnCloseNewPatient && newPatientModal) {
    btnCloseNewPatient.addEventListener('click', () => newPatientModal.close());
  }

  // Submit New Patient
  if (newPatientForm) {
    newPatientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('npName').value.trim();
      const dob = document.getElementById('npDob').value;
      const fitz = document.getElementById('npFitzpatrick').value;
      const goal = document.getElementById('npPrimaryConcern').value;
      const email = document.getElementById('npEmail').value.trim();

      const newMrn = `MRN: #LD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      // Create new card
      if (patientsGrid) {
        const article = document.createElement('article');
        article.className = 'patient-card';
        article.setAttribute('data-patient-id', 'new');
        article.setAttribute('data-category', 'laser botox vip');

        article.innerHTML = `
          <div class="patient-card-header flex-between mb-3">
            <div class="flex-align gap-3">
              <img src="assets/patient-profile.jpg" alt="${name}" class="patient-thumb">
              <div>
                <h3 class="patient-card-name text-white">${name}</h3>
                <span class="text-xs text-muted font-mono">${newMrn} • Registered Today</span>
              </div>
            </div>
            <span class="badge-fitzpatrick">${fitz.split('—')[0]}</span>
          </div>
          <div class="patient-tags-strip flex-align gap-1 mb-3">
            <span class="tag-pill tag-laser">${goal}</span>
            <span class="tag-pill tag-vip">New Intake</span>
          </div>
          <div class="patient-notes text-xs text-sub mb-3">
            "Initial consultation scheduled. Digital consent forms dispatched to ${email}. Pre-treatment clinical photographs pending."
          </div>
          <div class="patient-footer flex-between text-xs pt-3 border-t">
            <span class="text-muted">Next Session: <strong>Pending Scheduling</strong></span>
            <button class="btn btn-sm btn-outline-cyan btn-open-dossier">
              <span>View EMR Dossier</span>
              <i data-lucide="chevron-right" class="icon-xs" aria-hidden="true"></i>
            </button>
          </div>
        `;

        patientsGrid.prepend(article);
        if (window.lucide) window.lucide.createIcons();

        // Increment count
        if (sidebarPatientCount) {
          sidebarPatientCount.textContent = '1,421';
        }
      }

      newPatientForm.reset();
      newPatientModal.close();
      showToast(`Patient profile for ${name} registered successfully!`);
    });
  }

  // 8. Post-Care Triage Support Chat Engine
  const triageItems = document.querySelectorAll('.triage-item');
  const triageReplyInput = document.getElementById('triageReplyInput');
  const btnSendTriage = document.getElementById('btnSendTriage');
  const messagesArea = document.querySelector('.triage-messages-area');

  triageItems.forEach(item => {
    item.addEventListener('click', () => {
      triageItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  function sendTriageMessage() {
    if (!triageReplyInput || !messagesArea) return;
    const text = triageReplyInput.value.trim();
    if (!text) return;

    // Clinic Message
    const clinicMsg = document.createElement('div');
    clinicMsg.className = 'message-bubble clinic-msg mb-3';
    clinicMsg.innerHTML = `
      <div class="msg-meta text-xs text-cyan mb-1">Dr. Julian Vance, MD • Just now</div>
      <p class="text-xs text-white">${text}</p>
    `;
    messagesArea.appendChild(clinicMsg);
    triageReplyInput.value = '';
    messagesArea.scrollTop = messagesArea.scrollHeight;

    // Simulated Patient Acknowledgment after 1.8 seconds
    setTimeout(() => {
      const patientAck = document.createElement('div');
      patientAck.className = 'message-bubble patient-msg mb-3';
      patientAck.innerHTML = `
        <div class="msg-meta text-xs text-muted mb-1">Elena Rostova • Just now</div>
        <p class="text-xs text-white">"Thank you so much Dr. Vance! That puts my mind at ease, applying the recovery balm now."</p>
      `;
      messagesArea.appendChild(patientAck);
      messagesArea.scrollTop = messagesArea.scrollHeight;

      // Update badge
      const urgentBadge = document.getElementById('sidebarTriageCount');
      if (urgentBadge) {
        urgentBadge.textContent = '1 Urgent';
      }
    }, 1800);
  }

  if (btnSendTriage) {
    btnSendTriage.addEventListener('click', sendTriageMessage);
  }
  if (triageReplyInput) {
    triageReplyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendTriageMessage();
    });
  }

  // 9. Dashboard Filter Chips & Curve Animation
  const dashPeriodChips = document.querySelectorAll('.date-filter-group .filter-chip');
  const kpiRevenue = document.getElementById('kpiRevenueVal');

  const periodData = {
    today: { rev: '$24,850', laserD: 'M 0,190 Q 200,160 400,120 T 700,70 T 920,40' },
    '7d': { rev: '$162,400', laserD: 'M 0,220 Q 220,180 440,110 T 720,50 T 920,20' },
    '30d': { rev: '$684,200', laserD: 'M 0,200 Q 200,150 400,90 T 700,60 T 920,30' },
    quarter: { rev: '$2,140,000', laserD: 'M 0,210 Q 250,140 500,80 T 750,40 T 920,10' }
  };

  dashPeriodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dashPeriodChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const period = chip.getAttribute('data-period');
      const data = periodData[period];
      if (data && kpiRevenue) {
        kpiRevenue.textContent = data.rev;
      }
    });
  });

  // Quick Schedule Procedure Button
  const btnQuickSchedule = document.getElementById('btnQuickSchedule');
  if (btnQuickSchedule) {
    btnQuickSchedule.addEventListener('click', () => {
      const lasersTabBtn = document.querySelector('.sidebar-nav .nav-item[data-tab="lasers"]');
      if (lasersTabBtn) lasersTabBtn.click();
    });
  }

  // Print Clinical Summary handler
  const btnPrint = document.getElementById('btnPrintClinicalSummary');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // 10. WhatsApp Automated Follow-Up & Recall Engine
  const waPatientSelect = document.getElementById('waPatientSelect');
  const waTemplateSelect = document.getElementById('waTemplateSelect');
  const waMessageText = document.getElementById('waMessageText');
  const btnDispatchWaDirect = document.getElementById('btnDispatchWaDirect');
  const btnSimulateWaSend = document.getElementById('btnSimulateWaSend');
  const waBubbleLiveText = document.getElementById('waBubbleLiveText');
  const waBubblesViewport = document.getElementById('waBubblesViewport');
  const waMockInput = document.getElementById('waMockInput');
  const btnWaMiniSend = document.getElementById('btnWaMiniSend');

  const waTemplates = {
    'day1-laser': `Hello {name}, this is Dr. Julian Vance's clinical care team at Harley St. Laser Institute.\n\nChecking in on your skin 24 hours post-Sciton HALO laser. Warm erythema (sunburn sensation) is completely expected today.\n\nPlease remember:\n1. Spray chilled thermal water every 2 hours\n2. Generously apply your Cicalfate barrier balm\n3. Strict zero-sun exposure & broad-brim hat\n\nReply directly with a photo if you have any questions or concerns!`,
    'day3-peeling': `Hello {name}, Day 3 check-in from Harley St. Laser Institute!\n\nYou may notice MENDs (microscopic epidermal necrotic debris) feeling like sandpaper as damaged pigment sheds. Do NOT pick or scrub!\n\nKeep hydrating with hyaluronic serum and applying mineral SPF 50+. Call our nurse line if you experience unusual itching.`,
    'day14-botox': `Dear {name}, your Botox Cosmetic injection from 14 days ago has now reached full biochemical efficacy!\n\nPlease review your facial relaxation in the mirror. If you notice any corrugator asymmetry or need a complimentary touch-up pass, click here to schedule your review: https://lumina-derma.com/book-review`,
    'lip-swelling': `Hi {name}! Post-filler update from your injector Dr. Vance.\n\nMild edema and sensitivity on the vermilion border is normal for 48 hours. Apply cold compresses wrapped in clean gauze (10 min on / 10 min off). Avoid hot beverages and strenuous workouts today!`,
    'recall-90d': `Hello {name}, it has been 88 days since your last neurotoxin treatment. To maintain continuous wrinkle prevention and prevent dynamic line relapse, your recommended appointment window is this week.\n\nWould you like us to reserve your usual Thursday 2:00 PM slot with Dr. Vance? Reply YES to confirm.`
  };

  function updateWaComposer() {
    if (!waPatientSelect || !waTemplateSelect || !waMessageText) return;
    const selectedOption = waPatientSelect.options[waPatientSelect.selectedIndex];
    const patientName = selectedOption ? selectedOption.text.split('(')[0].trim() : 'Patient';
    const templateKey = waTemplateSelect.value;
    const rawTemplate = waTemplates[templateKey] || waTemplates['day1-laser'];
    const filledMessage = rawTemplate.replace(/{name}/g, patientName);

    waMessageText.value = filledMessage;
    if (waBubbleLiveText) {
      waBubbleLiveText.textContent = filledMessage.substring(0, 160) + '...';
    }
  }

  if (waPatientSelect) waPatientSelect.addEventListener('change', updateWaComposer);
  if (waTemplateSelect) waTemplateSelect.addEventListener('change', updateWaComposer);

  // Direct WhatsApp Web Trigger (wa.me)
  if (btnDispatchWaDirect) {
    btnDispatchWaDirect.addEventListener('click', () => {
      const selectedOption = waPatientSelect.options[waPatientSelect.selectedIndex];
      const phone = selectedOption ? selectedOption.getAttribute('data-phone').replace(/[^0-9]/g, '') : '447911123456';
      const text = encodeURIComponent(waMessageText.value);
      const waUrl = `https://wa.me/${phone}?text=${text}`;

      window.open(waUrl, '_blank');
      showToast(`WhatsApp link generated for ${selectedOption.text.split('(')[0].trim()} (${phone}).`);
    });
  }

  // Simulate Automated Dispatch in Phone Mockup
  function appendWaMessage(text, isClinic = true) {
    if (!waBubblesViewport) return;
    const bubble = document.createElement('div');
    bubble.className = `wa-bubble ${isClinic ? 'wa-clinic-bubble' : 'wa-patient-bubble'}`;
    bubble.innerHTML = `
      <p class="wa-text">${text}</p>
      <span class="wa-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${isClinic ? '<i data-lucide="check-check" class="icon-xs text-cyan inline"></i>' : ''}</span>
    `;
    waBubblesViewport.appendChild(bubble);
    waBubblesViewport.scrollTop = waBubblesViewport.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
  }

  if (btnSimulateWaSend) {
    btnSimulateWaSend.addEventListener('click', () => {
      const msg = waMessageText.value;
      appendWaMessage(msg, true);
      showToast('Automated WhatsApp protocol dispatched successfully via Cloud API.');

      // Simulated patient incoming response
      setTimeout(() => {
        appendWaMessage("Thank you so much team Lumina! That was so clear and helpful. Skin is cooling down nicely.", false);
      }, 2000);
    });
  }

  // Send from inside WhatsApp phone mockup input
  if (btnWaMiniSend && waMockInput) {
    function sendMini() {
      const val = waMockInput.value.trim();
      if (!val) return;
      appendWaMessage(val, true);
      waMockInput.value = '';
    }
    btnWaMiniSend.addEventListener('click', sendMini);
    waMockInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMini();
    });
  }

  // 1-Click WhatsApp Recalls from Table
  document.querySelectorAll('.btn-dispatch-single-recall').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      btn.textContent = 'Dispatched ✓';
      btn.style.background = '#10b981';
      showToast(`Automated 90-day retention recall sent via WhatsApp to ${name}.`);
    });
  });

  const btnBatchRecall = document.getElementById('btnBatchRecall');
  if (btnBatchRecall) {
    btnBatchRecall.addEventListener('click', () => {
      document.querySelectorAll('.btn-dispatch-single-recall').forEach(btn => {
        btn.textContent = 'Dispatched ✓';
        btn.style.background = '#10b981';
      });
      showToast('Batch WhatsApp retention messages dispatched to all 4 patients (+34% rebooking rate).');
    });
  }

  // 11. Interactive Before & After Split Slider in Patient Dossier
  const splitRangeInput = document.getElementById('splitRangeInput');
  const splitBeforeOverlay = document.getElementById('splitBeforeOverlay');
  const splitHandle = document.getElementById('splitHandle');

  if (splitRangeInput && splitBeforeOverlay && splitHandle) {
    splitRangeInput.addEventListener('input', () => {
      const val = splitRangeInput.value;
      splitBeforeOverlay.style.width = `${val}%`;
      splitHandle.style.left = `${val}%`;
    });
  }

  // 12. Digital Informed Consent Signature Pad (HTML5 Canvas)
  const sigCanvas = document.getElementById('consentSignaturePad');
  const btnClearSig = document.getElementById('btnClearSignature');
  const btnAdoptSig = document.getElementById('btnAdoptSignature');
  const sigHint = document.getElementById('sigHint');

  if (sigCanvas) {
    const sCtx = sigCanvas.getContext('2d');
    let isDrawing = false;

    function getCanvasPos(e) {
      const rect = sigCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    function startDraw(e) {
      isDrawing = true;
      if (sigHint) sigHint.style.display = 'none';
      const pos = getCanvasPos(e);
      sCtx.beginPath();
      sCtx.moveTo(pos.x, pos.y);
      sCtx.strokeStyle = '#38bdf8';
      sCtx.lineWidth = 2.5;
      sCtx.lineCap = 'round';
    }

    function draw(e) {
      if (!isDrawing) return;
      const pos = getCanvasPos(e);
      sCtx.lineTo(pos.x, pos.y);
      sCtx.stroke();
    }

    function endDraw() {
      isDrawing = false;
    }

    sigCanvas.addEventListener('mousedown', startDraw);
    sigCanvas.addEventListener('mousemove', draw);
    sigCanvas.addEventListener('mouseup', endDraw);
    sigCanvas.addEventListener('mouseleave', endDraw);

    sigCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e); }, { passive: false });
    sigCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); }, { passive: false });
    sigCanvas.addEventListener('touchend', endDraw);

    if (btnClearSig) {
      btnClearSig.addEventListener('click', () => {
        sCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
        if (sigHint) sigHint.style.display = 'block';
      });
    }

    if (btnAdoptSig) {
      btnAdoptSig.addEventListener('click', () => {
        showToast('Cryptographic signature verified and adopted into Elena Rostova (#LD-2026-9812) EMR file.');
      });
    }
  }

  // 13. Aesthetics Financing Calculator (Cherry / CareCredit 0% APR)
  const financeRange = document.getElementById('financeQuoteRange');
  const financeTotalQuote = document.getElementById('financeTotalQuote');
  const financeMonthlyVal = document.getElementById('financeMonthlyVal');
  const financeTermChips = document.querySelectorAll('[data-term]');
  let currentTerm = 12;

  function updateFinancing() {
    if (!financeRange || !financeTotalQuote || !financeMonthlyVal) return;
    const total = parseFloat(financeRange.value);
    financeTotalQuote.textContent = `$${total.toLocaleString()} USD`;
    const monthly = (total / currentTerm).toFixed(2);
    financeMonthlyVal.textContent = `$${monthly} / mo`;
  }

  if (financeRange) financeRange.addEventListener('input', updateFinancing);

  financeTermChips.forEach(chip => {
    chip.addEventListener('click', () => {
      financeTermChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTerm = parseInt(chip.getAttribute('data-term')) || 12;
      updateFinancing();
    });
  });

  const btnApproveFinancing = document.getElementById('btnApproveFinancing');
  if (btnApproveFinancing) {
    btnApproveFinancing.addEventListener('click', () => {
      showToast('Instant Pre-Approval Confirmed: $2,070 financed over 12 months at 0% APR via Cherry Health.');
    });
  }

  // 14. Global Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('luminaGlobalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'luminaGlobalToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #0c1322;
        border: 1px solid #38bdf8;
        color: #f8fafc;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 0.82rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8"></span> <span>${message}</span>`;
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 4000);
  }
});
