/**
 * STRADA MONOLITH - Precision Dual-Boiler Espresso Machine
 * Hyperframe Fluid Extraction Simulation, 3D Parallax & Mechanical Physics Engine
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
        duration: 1.15,
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

  // 3. Interactive 3D Parallax Machine Tilt on Hover
  const machineFrame = document.getElementById('machineGalleryFrame');
  const machineHeroImg = document.getElementById('machineMainImg');

  if (machineFrame && machineHeroImg && !prefersReducedMotion) {
    machineFrame.addEventListener('mousemove', (e) => {
      const rect = machineFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle mechanical tilt (-8deg to 8deg)
      const rotateX = ((centerY - y) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 10;

      machineHeroImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    machineFrame.addEventListener('mouseleave', () => {
      machineHeroImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 4. Bespoke Finish Selector Engine
  const FINISH_DATA = {
    stainless: {
      name: 'Brushed AISI 304 Stainless Steel',
      desc: 'Brushed AISI 304 Stainless Steel • Mirror Polished Group',
      img: 'assets/strada-stainless.jpg',
      pillClass: 'finish-stainless',
    },
    black: {
      name: 'Matte Cast Iron Obsidian Black',
      desc: 'Matte Cast Iron Obsidian Black • Textured PVD Panels',
      img: 'assets/strada-black.jpg',
      pillClass: 'finish-black',
    },
    walnut: {
      name: 'Raw Brass & Tuscan Walnut Accents',
      desc: 'Raw Brass Chassis • Handcrafted Solid Tuscan Walnut Handles',
      img: 'assets/strada-walnut.jpg',
      pillClass: 'finish-walnut',
    },
    white: {
      name: 'Arctic Matte White & Bleached Oak',
      desc: 'Arctic Matte White • Nordic Light Oak Touchpoints',
      img: 'assets/strada-white.jpg',
      pillClass: 'finish-white',
    },
  };

  let activeFinishKey = 'stainless';
  const finishCards = document.querySelectorAll('.finish-card');
  const thumbBtns = document.querySelectorAll('.thumb-btn');
  const machineFinishLabel = document.getElementById('machineFinishLabel');
  const activeFinishNameEl = document.getElementById('activeFinishName');
  const cartItemThumbnail = document.getElementById('cartItemThumbnail');
  const cartItemVariantLabel = document.getElementById('cartItemVariantLabel');
  const receiptItemName = document.getElementById('receiptItemName');

  function updateMachineFinish(finishKey) {
    if (!FINISH_DATA[finishKey]) return;
    activeFinishKey = finishKey;
    const data = FINISH_DATA[finishKey];

    // GSAP Cross-Dissolve Transition
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.to(machineHeroImg, {
        opacity: 0.35,
        scale: 0.97,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          machineHeroImg.src = data.img;
          gsap.to(machineHeroImg, {
            opacity: 1,
            scale: 1,
            duration: 0.38,
            ease: 'back.out(1.4)',
          });
        },
      });
    } else {
      machineHeroImg.src = data.img;
    }

    if (machineFinishLabel) {
      machineFinishLabel.innerHTML = `<span class="finish-dot ${data.pillClass}"></span><span>${data.desc}</span>`;
    }
    if (activeFinishNameEl) activeFinishNameEl.textContent = data.name;
    if (cartItemThumbnail) cartItemThumbnail.src = data.img;
    if (cartItemVariantLabel) cartItemVariantLabel.textContent = `Finish: ${data.name}`;
    if (receiptItemName) receiptItemName.textContent = `Strada Monolith (${data.name})`;

    finishCards.forEach((c) => {
      const isSel = c.getAttribute('data-finish') === finishKey;
      c.classList.toggle('active', isSel);
      c.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    thumbBtns.forEach((b) => {
      const isSel = b.getAttribute('data-finish') === finishKey;
      b.classList.toggle('active', isSel);
    });
  }

  finishCards.forEach((card) => {
    card.addEventListener('click', () => {
      updateMachineFinish(card.getAttribute('data-finish'));
    });
  });

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      updateMachineFinish(btn.getAttribute('data-finish'));
    });
  });

  // 5. Hyperframe Canvas: Fluid Golden Crema Extraction Simulator
  const canvas = document.getElementById('extractionCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const canvasSteam = document.getElementById('canvasSteam');

  let currentBarPressure = 0.0;
  let isExtracting = false;
  let extractionSeconds = 0;
  let extractionTimerId = null;
  let yieldGrams = 0.0;

  // Particle System for Fluid Crema Stream & Micro-Drops
  class CremaParticle {
    constructor(x, y, vx, vy, size, color, alpha) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.size = size;
      this.color = color;
      this.alpha = alpha;
      this.life = 1.0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.18; // gravity
      this.life -= 0.02;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * this.alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particles = [];
  const cremaColors = ['#f59e0b', '#d97706', '#92400e', '#78350f', '#fde68a'];

  function renderExtractionCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;

    // Draw Saturated 58.5mm Bottomless Portafilter Housing
    ctx.fillStyle = '#1e2636';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;

    // Portafilter Body Rim
    ctx.beginPath();
    ctx.roundRect(centerX - 95, 15, 190, 42, [8, 8, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Laser-Cut Competition Basket
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(centerX - 75, 57, 150, 18, [0, 0, 10, 10]);
    ctx.fill();
    ctx.stroke();

    // Coffee Puck Bed (Dark Espresso Grind)
    ctx.fillStyle = '#27170e';
    ctx.fillRect(centerX - 70, 58, 140, 14);

    // Glass Cup on Drip Tray
    const cupY = 240;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 50, cupY);
    ctx.lineTo(centerX - 42, cupY + 110);
    ctx.quadraticCurveTo(centerX, cupY + 118, centerX + 42, cupY + 110);
    ctx.lineTo(centerX + 50, cupY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Espresso Level inside Cup
    if (yieldGrams > 0) {
      const fillHeight = Math.min(85, (yieldGrams / 36) * 85);
      const topY = cupY + 108 - fillHeight;

      // Dark Espresso Liquid
      ctx.fillStyle = '#3b1d0c';
      ctx.fillRect(centerX - 38, topY, 76, fillHeight);

      // Creamy Golden Foam Cap (Crema)
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.ellipse(centerX, topY + 2, 38, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden Crema Swirls
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(centerX - 8, topY + 2, 18, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Active Flow Streams based on Bar Pressure
    if (currentBarPressure > 0.8) {
      const streamIntensity = Math.min(1, currentBarPressure / 9.0);

      if (currentBarPressure < 4.0) {
        // Pre-infusion slow drops
        if (Math.random() < 0.4) {
          particles.push(
            new CremaParticle(
              centerX + (Math.random() - 0.5) * 20,
              75,
              (Math.random() - 0.5) * 0.4,
              1.2 + Math.random(),
              4.5,
              '#92400e',
              0.9
            )
          );
        }
      } else {
        // Full 9-Bar Honey Stream
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.85)';
        ctx.lineWidth = 4 + streamIntensity * 3.5;
        ctx.beginPath();
        ctx.moveTo(centerX, 75);
        ctx.bezierCurveTo(
          centerX - 3, 140,
          centerX + 3, 180,
          centerX, cupY + 108 - Math.min(85, (yieldGrams / 36) * 85)
        );
        ctx.stroke();

        // High-velocity micro-particles
        for (let i = 0; i < 3; i++) {
          particles.push(
            new CremaParticle(
              centerX + (Math.random() - 0.5) * 8,
              76,
              (Math.random() - 0.5) * 1.2,
              2.5 + Math.random() * 3,
              2 + Math.random() * 2.5,
              cremaColors[Math.floor(Math.random() * cremaColors.length)],
              0.85
            )
          );
        }
      }
    }

    // Update & Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.life <= 0 || p.y > cupY + 110) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderExtractionCanvas);
  }

  requestAnimationFrame(renderExtractionCanvas);

  // 6. Mechanical Gauges Physics & Needle Deflection
  const brewNeedle = document.getElementById('brewNeedle');
  const brewGaugeValue = document.getElementById('brewGaugeValue');
  const tempNeedle = document.getElementById('tempNeedle');
  const tempGaugeValue = document.getElementById('tempGaugeValue');
  const paddleSlider = document.getElementById('paddleSlider');
  const paddleBarReadout = document.getElementById('paddleBarReadout');
  const simExtractionStateText = document.getElementById('simExtractionStateText');
  const cremaYieldText = document.getElementById('cremaYieldText');
  const shotTimerDisplay = document.getElementById('shotTimerDisplay');
  const flavorProfileText = document.getElementById('flavorProfileText');

  function setBarPressure(bars) {
    currentBarPressure = Math.max(0, Math.min(12, bars));

    // Convert 0 to 12 Bar into Needle Angle (-120deg at 0 Bar, +15deg at 9 Bar, +80deg at 12 Bar)
    const angle = -120 + (currentBarPressure / 12) * 200;

    // Realistic micro-jitter if pump is running at high pressure
    const jitter = currentBarPressure > 7.0 && isExtracting ? (Math.random() - 0.5) * 1.5 : 0;

    if (brewNeedle) {
      brewNeedle.style.transform = `rotate(${angle + jitter}deg)`;
    }

    if (brewGaugeValue) {
      brewGaugeValue.textContent = `${currentBarPressure.toFixed(1)} BAR`;
    }

    if (paddleBarReadout) {
      paddleBarReadout.textContent = `${currentBarPressure.toFixed(1)} BAR`;
    }

    if (paddleSlider && Math.abs(parseFloat(paddleSlider.value) - currentBarPressure) > 0.2) {
      paddleSlider.value = currentBarPressure;
    }

    // Thermal PID subtle oscillation
    if (tempNeedle && tempGaugeValue) {
      const tempDelta = (Math.random() - 0.5) * 0.15;
      const currentTemp = (93.4 + tempDelta).toFixed(1);
      tempGaugeValue.textContent = `${currentTemp}°C`;
      tempNeedle.style.transform = `rotate(${3 + tempDelta * 12}deg)`;
    }
  }

  if (paddleSlider) {
    paddleSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      setBarPressure(val);
      if (val === 0) {
        simExtractionStateText.textContent = 'Idle Standby';
      } else if (val < 4) {
        simExtractionStateText.textContent = 'Manual Pre-Infusion (Hydration Phase)';
      } else if (val <= 9.5) {
        simExtractionStateText.textContent = 'Peak 9.0 Bar Extraction (Golden Crema)';
      } else {
        simExtractionStateText.textContent = 'High-Pressure Resistance Override';
      }
    });
  }

  // Presets Pills
  const presetPills = document.querySelectorAll('.preset-pill');
  presetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      presetPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const targetBar = parseFloat(pill.getAttribute('data-bar'));
      const stateName = pill.getAttribute('data-state');
      if (simExtractionStateText) simExtractionStateText.textContent = stateName;

      // Smoothly tween bar pressure
      if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
        gsap.to({ b: currentBarPressure }, {
          b: targetBar,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: function () {
            setBarPressure(this.targets()[0].b);
          },
        });
      } else {
        setBarPressure(targetBar);
      }
    });
  });

  // 7. Automated 28-Second Extraction Sequence Simulation
  const btnToggleShot = document.getElementById('btnToggleShot');
  const shotIcon = document.getElementById('shotIcon');
  const shotBtnText = document.getElementById('shotBtnText');

  function stopExtractionSequence() {
    isExtracting = false;
    clearInterval(extractionTimerId);
    if (canvasSteam) canvasSteam.classList.remove('active');
    if (shotIcon) shotIcon.setAttribute('data-lucide', 'play');
    if (shotBtnText) shotBtnText.textContent = 'Pull Test Extraction (28s Profile)';
    setBarPressure(0.0);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function startExtractionSequence() {
    isExtracting = true;
    extractionSeconds = 0;
    yieldGrams = 0.0;
    if (canvasSteam) canvasSteam.classList.add('active');
    if (shotIcon) shotIcon.setAttribute('data-lucide', 'square');
    if (shotBtnText) shotBtnText.textContent = 'Stop Extraction';
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    const startTime = Date.now();

    extractionTimerId = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      extractionSeconds = elapsed;

      // Update Timer
      const secs = Math.floor(elapsed);
      const millis = Math.floor((elapsed % 1) * 10);
      if (shotTimerDisplay) {
        shotTimerDisplay.textContent = `00:${secs.toString().padStart(2, '0')}.${millis}s`;
      }

      // Automated Flow Profile Phases:
      if (elapsed < 5.0) {
        // Phase 1: Pre-infusion (3.2 Bar)
        setBarPressure(3.2);
        yieldGrams = elapsed * 0.8;
        if (simExtractionStateText) simExtractionStateText.textContent = 'Phase 1: Pre-Infusion Bed Blooming (3.2 Bar)';
      } else if (elapsed < 20.0) {
        // Phase 2: Peak Extraction (9.0 Bar)
        setBarPressure(9.0);
        yieldGrams = 4.0 + (elapsed - 5.0) * 1.8;
        if (simExtractionStateText) simExtractionStateText.textContent = 'Phase 2: Peak 9.0 Bar Flow (Golden Crema)';
      } else if (elapsed < 28.0) {
        // Phase 3: Pressure Tapering (6.0 Bar)
        const taperBar = 9.0 - ((elapsed - 20.0) / 8.0) * 3.0;
        setBarPressure(taperBar);
        yieldGrams = 31.0 + (elapsed - 20.0) * 0.62;
        if (simExtractionStateText) simExtractionStateText.textContent = 'Phase 3: Declining Pressure Taper (6.0 Bar)';
      } else {
        // Extraction Complete
        yieldGrams = 36.0;
        stopExtractionSequence();
        if (simExtractionStateText) simExtractionStateText.textContent = 'Extraction Complete • Balanced 1:2 Brew Ratio';
        if (flavorProfileText) flavorProfileText.textContent = 'Notes: Bergamot, Candied Orange, Velvety Cacao Crema';
      }

      if (cremaYieldText) {
        cremaYieldText.textContent = `Yield: ${yieldGrams.toFixed(1)}g`;
      }
    }, 50);
  }

  if (btnToggleShot) {
    btnToggleShot.addEventListener('click', () => {
      if (isExtracting) {
        stopExtractionSequence();
      } else {
        startExtractionSequence();
      }
    });
  }

  // 8. Barista Suite & Accessories Bundle Builder
  const bundleCheckboxes = document.querySelectorAll('.bundle-check');
  const bundleConfigTotal = document.getElementById('bundleConfigTotal');
  const bundleItemsCount = document.getElementById('bundleItemsCount');
  const cartAddonsContainer = document.getElementById('cartAddonsContainer');

  let selectedAccessories = [];

  function recalculateBundle() {
    let accessoriesSum = 0;
    selectedAccessories = [];

    bundleCheckboxes.forEach((chk) => {
      if (chk.checked) {
        const price = parseInt(chk.getAttribute('data-price'), 10) || 0;
        const name = chk.getAttribute('data-name');
        const itemKey = chk.getAttribute('data-item');
        accessoriesSum += price;
        selectedAccessories.push({ key: itemKey, name, price });
      }
    });

    const totalSystem = 4850 + accessoriesSum;
    if (bundleConfigTotal) bundleConfigTotal.textContent = `$${totalSystem.toLocaleString()} USD`;

    if (bundleItemsCount) {
      if (selectedAccessories.length === 0) {
        bundleItemsCount.textContent = '(Strada Monolith Machine)';
      } else {
        bundleItemsCount.textContent = `(Machine + ${selectedAccessories.length} Accessories)`;
      }
    }

    renderCartAddons();
    recalculateCartTotals();
  }

  bundleCheckboxes.forEach((chk) => chk.addEventListener('change', recalculateBundle));

  // 9. Slide-Out Pre-Order Drawer (<dialog id="cartDrawer">)
  const cartDrawer = document.getElementById('cartDrawer');
  const btnCloseCart = document.getElementById('btnCloseCart');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const btnReserveBuild = document.getElementById('btnReserveBuild');
  const btnInstantApplePay = document.getElementById('btnInstantApplePay');
  const btnBottomReserve = document.getElementById('btnBottomReserve');
  const btnMobileOrder = document.getElementById('btnMobileOrder');
  const btnBuyConfiguredBundle = document.getElementById('btnBuyConfiguredBundle');

  const cartCount = document.getElementById('cartCount');
  const cartNavTotal = document.getElementById('cartNavTotal');
  const cartDrawerItemCount = document.getElementById('cartDrawerItemCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartFinalTotal = document.getElementById('cartFinalTotal');
  const btnPayTotalText = document.getElementById('btnPayTotalText');

  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const machineQtyEl = document.getElementById('machineQty');
  const cartMachinePrice = document.getElementById('cartMachinePrice');
  const btnRemoveMachine = document.getElementById('btnRemoveMachine');
  const btnQuickAddTamper = document.getElementById('btnQuickAddTamper');

  let machineQuantity = 1;

  function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.showModal();
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartDrawer.open) {
      cartDrawer.close();
    }
  }

  function renderCartAddons() {
    if (!cartAddonsContainer) return;
    cartAddonsContainer.innerHTML = '';

    selectedAccessories.forEach((acc) => {
      const addonCard = document.createElement('div');
      addonCard.className = 'cart-item-card mb-2';
      addonCard.innerHTML = `
        <div class="cart-item-info flex-between">
          <div>
            <strong class="text-xs text-white block">${acc.name}</strong>
            <small class="text-xs text-gold">Master Barista Collection</small>
          </div>
          <div class="flex-align gap-3">
            <span class="font-mono text-xs text-white">$${acc.price} USD</span>
            <button class="cart-remove-btn" data-remove-acc="${acc.key}">&times;</button>
          </div>
        </div>
      `;
      cartAddonsContainer.appendChild(addonCard);

      addonCard.querySelector('[data-remove-acc]')?.addEventListener('click', () => {
        const chk = document.querySelector(`.bundle-check[data-item="${acc.key}"]`);
        if (chk) chk.checked = false;
        recalculateBundle();
      });
    });
  }

  function recalculateCartTotals() {
    const machineTotal = 4850 * machineQuantity;
    let addonsTotal = 0;
    selectedAccessories.forEach((a) => (addonsTotal += a.price));

    const grandTotal = machineTotal + addonsTotal;
    const totalItems = machineQuantity + selectedAccessories.length;

    if (cartCount) cartCount.textContent = totalItems;
    if (cartNavTotal) cartNavTotal.textContent = `$${grandTotal.toLocaleString()}`;
    if (cartDrawerItemCount) cartDrawerItemCount.textContent = totalItems;
    if (machineQtyEl) machineQtyEl.textContent = machineQuantity;
    if (cartMachinePrice) cartMachinePrice.textContent = `$${machineTotal.toLocaleString()} USD`;
    if (cartSubtotal) cartSubtotal.textContent = `$${grandTotal.toLocaleString()} USD`;
    if (cartFinalTotal) cartFinalTotal.textContent = `$${grandTotal.toLocaleString()} USD`;
    if (btnPayTotalText) btnPayTotalText.textContent = `$${grandTotal.toLocaleString()} USD`;

    const receiptTotal = document.getElementById('receiptTotal');
    if (receiptTotal) receiptTotal.textContent = `$${grandTotal.toLocaleString()} USD`;
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (machineQuantity > 1) {
        machineQuantity--;
        recalculateCartTotals();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      machineQuantity++;
      recalculateCartTotals();
    });
  }

  if (btnRemoveMachine) {
    btnRemoveMachine.addEventListener('click', () => {
      machineQuantity = 0;
      const itemCard = document.getElementById('cartMachineItem');
      if (itemCard) itemCard.style.display = 'none';
      recalculateCartTotals();
    });
  }

  if (btnQuickAddTamper) {
    btnQuickAddTamper.addEventListener('click', () => {
      const tamperCheck = document.querySelector('.bundle-check[data-item="tamper"]');
      if (tamperCheck) {
        tamperCheck.checked = true;
        recalculateBundle();
      }
    });
  }

  [
    cartTriggerBtn,
    btnReserveBuild,
    btnInstantApplePay,
    btnBottomReserve,
    btnMobileOrder,
    btnBuyConfiguredBundle,
  ].filter(Boolean).forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (machineQuantity === 0) {
        machineQuantity = 1;
        const itemCard = document.getElementById('cartMachineItem');
        if (itemCard) itemCard.style.display = 'flex';
      }
      recalculateCartTotals();
      openCartDrawer();
    });
  });

  if (btnCloseCart) btnCloseCart.addEventListener('click', closeCartDrawer);

  if (cartDrawer) {
    cartDrawer.addEventListener('click', (event) => {
      const rect = cartDrawer.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) closeCartDrawer();
    });
  }

  // 10. Confirmation Modal Simulation
  const successModal = document.getElementById('successModal');
  const btnCloseSuccess = document.getElementById('btnCloseSuccess');
  const btnApplePayExpress = document.getElementById('btnApplePayExpress');
  const btnStandardCheckout = document.getElementById('btnStandardCheckout');

  function completeOrderSimulation() {
    closeCartDrawer();
    if (successModal) {
      successModal.showModal();
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    }
  }

  if (btnApplePayExpress) btnApplePayExpress.addEventListener('click', completeOrderSimulation);
  if (btnStandardCheckout) btnStandardCheckout.addEventListener('click', completeOrderSimulation);
  if (btnCloseSuccess) {
    btnCloseSuccess.addEventListener('click', () => {
      if (successModal) successModal.close();
    });
  }

  // 11. Mobile Drawer Navigation
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
  mobileNavLinks.forEach((link) => link.addEventListener('click', () => toggleMobileDrawer(false));

  // 12. GSAP ScrollTrigger Entrance Revelations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    const fadeElements = document.querySelectorAll('[data-gsap="fade-up"]');
    fadeElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-delay')) || 0;
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
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

  // 13. Sticky Header Scrolled State
  const siteHeader = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Initial calculation
  recalculateCartTotals();
});
