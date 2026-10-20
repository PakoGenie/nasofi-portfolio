/**
 * AETHER 01 TITANIUM - Flagship One-Product Interactive DTC Engine
 * Advanced Kinetic Motion, 3D Product Tilt, SVG Audio Curve Morph & Express Checkout
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

  // 3. Interactive 3D Card Tilt on Product Showcase
  const galleryFrame = document.getElementById('productGalleryFrame');
  const heroImg = document.getElementById('productMainImg');

  if (galleryFrame && heroImg && !prefersReducedMotion) {
    galleryFrame.addEventListener('mousemove', (e) => {
      const rect = galleryFrame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-10deg to 10deg)
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 12;

      heroImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    });

    galleryFrame.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 4. Colorway Finish Selector Engine
  const FINISH_DATA = {
    black: {
      name: 'Matte Obsidian Black',
      desc: 'Matte Obsidian Black — PVD Grade 5 Titanium',
      img: 'assets/headphone-black.jpg',
      pillClass: 'finish-black',
    },
    silver: {
      name: 'Raw Beryllium Titanium',
      desc: 'Raw Beryllium Titanium — Brushed Aerospace Finish',
      img: 'assets/headphone-silver.jpg',
      pillClass: 'finish-silver',
    },
    cognac: {
      name: 'Heritage Cognac Leather',
      desc: 'Heritage Cognac Leather — Tuscan Lambskin & Bronze',
      img: 'assets/headphone-cognac.jpg',
      pillClass: 'finish-cognac',
    },
    white: {
      name: 'Alpine Frost Silver',
      desc: 'Alpine Frost Silver — Bead-Blasted Aluminum',
      img: 'assets/headphone-white.jpg',
      pillClass: 'finish-white',
    },
  };

  let activeFinishKey = 'black';
  const swatchCards = document.querySelectorAll('.swatch-card');
  const thumbBtns = document.querySelectorAll('.thumb-btn');
  const stageFinishLabel = document.getElementById('stageFinishLabel');
  const activeFinishNameEl = document.getElementById('activeFinishName');
  const cartItemThumbnail = document.getElementById('cartItemThumbnail');
  const cartItemVariantLabel = document.getElementById('cartItemVariantLabel');
  const receiptItemName = document.getElementById('receiptItemName');

  function updateProductFinish(finishKey) {
    if (!FINISH_DATA[finishKey]) return;
    activeFinishKey = finishKey;
    const data = FINISH_DATA[finishKey];

    // Animate Image Transition with GSAP if available
    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.to(heroImg, {
        opacity: 0.35,
        scale: 0.96,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          heroImg.src = data.img;
          gsap.to(heroImg, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'back.out(1.5)',
          });
        },
      });
    } else {
      heroImg.src = data.img;
    }

    // Update Stage Badge
    if (stageFinishLabel) {
      stageFinishLabel.innerHTML = `<span class="finish-dot ${data.pillClass}"></span><span>${data.desc}</span>`;
    }

    // Update Text Labels
    if (activeFinishNameEl) activeFinishNameEl.textContent = data.name;
    if (cartItemThumbnail) cartItemThumbnail.src = data.img;
    if (cartItemVariantLabel) cartItemVariantLabel.textContent = `Finish: ${data.name}`;
    if (receiptItemName) receiptItemName.textContent = `Aether 01 (${data.name})`;

    // Update Swatches UI
    swatchCards.forEach((s) => {
      const isSelected = s.getAttribute('data-finish') === finishKey;
      s.classList.toggle('active', isSelected);
      s.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });

    // Update Thumbs UI
    thumbBtns.forEach((t) => {
      const isSelected = t.getAttribute('data-finish') === finishKey;
      t.classList.toggle('active', isSelected);
    });
  }

  swatchCards.forEach((card) => {
    card.addEventListener('click', () => {
      const finishKey = card.getAttribute('data-finish');
      updateProductFinish(finishKey);
    });
  });

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const finishKey = btn.getAttribute('data-finish');
      updateProductFinish(finishKey);
    });
  });

  // 5. Interactive Acoustic EQ Frequency Curve Morphing
  const modePills = document.querySelectorAll('.mode-pill');
  const activeCurveTitle = document.getElementById('activeCurveTitle');
  const eqAreaPath = document.getElementById('eqAreaPath');
  const eqLinePath = document.getElementById('eqLinePath');

  const EQ_PRESETS = {
    studio: {
      title: 'Studio Flat Reference (Harman Target ±0.5dB)',
      lineD: 'M 0,160 Q 225,160 450,158 T 900,160',
      areaD: 'M 0,160 Q 225,160 450,158 T 900,160 L 900,320 L 0,320 Z',
      color: '#38bdf8',
    },
    bass: {
      title: 'Bass Dimension (+6dB Sub-Bass Warmth & Impact)',
      lineD: 'M 0,110 Q 180,125 320,155 T 900,160',
      areaD: 'M 0,110 Q 180,125 320,155 T 900,160 L 900,320 L 0,320 Z',
      color: '#f59e0b',
    },
    vocal: {
      title: 'Acoustic Air & Vocals (+4dB Presence & Holographic Staging)',
      lineD: 'M 0,168 Q 220,165 480,125 T 900,128',
      areaD: 'M 0,168 Q 220,165 480,125 T 900,128 L 900,320 L 0,320 Z',
      color: '#10b981',
    },
  };

  modePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const mode = pill.getAttribute('data-mode');
      if (!EQ_PRESETS[mode]) return;

      modePills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const preset = EQ_PRESETS[mode];
      if (activeCurveTitle) activeCurveTitle.textContent = preset.title;

      if (eqAreaPath && eqLinePath) {
        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
          gsap.to(eqLinePath, {
            attr: { d: preset.lineD, stroke: preset.color },
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(eqAreaPath, {
            attr: { d: preset.areaD },
            duration: 0.5,
            ease: 'power2.out',
          });
        } else {
          eqLinePath.setAttribute('d', preset.lineD);
          eqLinePath.setAttribute('stroke', preset.color);
          eqAreaPath.setAttribute('d', preset.areaD);
        }
      }
    });
  });

  // 6. Interactive Audio Player Simulator
  const btnToggleAudio = document.getElementById('btnToggleAudio');
  const audioPlayIcon = document.getElementById('audioPlayIcon');
  const audioPlaybackStatus = document.getElementById('audioPlaybackStatus');
  let isPlayingAudio = false;
  let audioContext = null;
  let audioOscillator = null;
  let audioGain = null;

  if (btnToggleAudio) {
    btnToggleAudio.addEventListener('click', () => {
      isPlayingAudio = !isPlayingAudio;

      if (isPlayingAudio) {
        btnToggleAudio.innerHTML = `<i data-lucide="pause" class="icon-sm" aria-hidden="true"></i>`;
        if (audioPlaybackStatus) {
          audioPlaybackStatus.textContent = 'Auditioning 24-bit / 96kHz Master: Studio Active';
          audioPlaybackStatus.classList.add('text-titanium');
        }

        // Web Audio Synthesizer Harmonic Tone Simulation
        try {
          if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (audioContext.state === 'suspended') {
            audioContext.resume();
          }

          audioOscillator = audioContext.createOscillator();
          audioGain = audioContext.createGain();

          audioOscillator.type = 'sine';
          audioOscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3 Warm note
          audioGain.gain.setValueAtTime(0.04, audioContext.currentTime); // Gentle soothing volume

          audioOscillator.connect(audioGain);
          audioGain.connect(audioContext.destination);
          audioOscillator.start();

          // Subtle harmonic frequency modulation
          audioOscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 1.2);
        } catch (e) {
          console.warn('AudioContext tone simulation fallback:', e);
        }
      } else {
        btnToggleAudio.innerHTML = `<i data-lucide="play" class="icon-sm" aria-hidden="true"></i>`;
        if (audioPlaybackStatus) {
          audioPlaybackStatus.textContent = 'Audio simulation paused. Click to audition sound profile';
          audioPlaybackStatus.classList.remove('text-titanium');
        }

        if (audioOscillator) {
          try {
            audioOscillator.stop();
            audioOscillator.disconnect();
          } catch (e) {}
        }
      }

      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    });
  }

  // 7. Active Noise Cancellation & Transparency Slider
  const ancSlider = document.getElementById('ancSlider');
  const ancModeLabel = document.getElementById('ancModeLabel');

  if (ancSlider && ancModeLabel) {
    ancSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val >= 80) {
        ancModeLabel.textContent = `Max Isolation (-42dB Damping)`;
        ancModeLabel.className = 'text-titanium font-semibold';
      } else if (val >= 35) {
        ancModeLabel.textContent = `Adaptive Balance (-22dB)`;
        ancModeLabel.className = 'text-amber font-semibold';
      } else {
        ancModeLabel.textContent = `Bionic Transparency (100% Ambient)`;
        ancModeLabel.className = 'text-emerald font-semibold';
      }
    });
  }

  // 8. Studio Accessory Bundle Builder Engine
  const bundleCheckboxes = document.querySelectorAll('.bundle-check');
  const bundleConfigTotal = document.getElementById('bundleConfigTotal');
  const bundleItemsCount = document.getElementById('bundleItemsCount');
  const btnBuyConfiguredBundle = document.getElementById('btnBuyConfiguredBundle');
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

    const totalSystem = 499 + accessoriesSum;
    if (bundleConfigTotal) bundleConfigTotal.textContent = `$${totalSystem} USD`;

    if (bundleItemsCount) {
      if (selectedAccessories.length === 0) {
        bundleItemsCount.textContent = '(Aether 01 Headphones)';
      } else {
        bundleItemsCount.textContent = `(Headphones + ${selectedAccessories.length} Accessories)`;
      }
    }

    renderCartAddons();
    recalculateCartTotals();
  }

  bundleCheckboxes.forEach((chk) => {
    chk.addEventListener('change', recalculateBundle);
  });

  // 9. Slide-Out Express Cart Drawer (<dialog id="cartDrawer">)
  const cartDrawer = document.getElementById('cartDrawer');
  const btnCloseCart = document.getElementById('btnCloseCart');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const btnAddToCart = document.getElementById('btnAddToCart');
  const btnInstantCheckout = document.getElementById('btnInstantCheckout');
  const btnBottomOrder = document.getElementById('btnBottomOrder');
  const btnMobileOrder = document.getElementById('btnMobileOrder');
  const cartCount = document.getElementById('cartCount');
  const cartNavTotal = document.getElementById('cartNavTotal');
  const cartDrawerItemCount = document.getElementById('cartDrawerItemCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartFinalTotal = document.getElementById('cartFinalTotal');
  const btnPayTotalText = document.getElementById('btnPayTotalText');

  // Quantity Stepper
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const headphoneQtyEl = document.getElementById('headphoneQty');
  const cartHeadphonePrice = document.getElementById('cartHeadphonePrice');
  const btnRemoveHeadphone = document.getElementById('btnRemoveHeadphone');
  const btnQuickAddStand = document.getElementById('btnQuickAddStand');

  let headphoneQuantity = 1;

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
            <small class="text-xs text-titanium">Studio Companion</small>
          </div>
          <div class="flex-align gap-3">
            <span class="font-mono text-xs text-white">$${acc.price} USD</span>
            <button class="cart-remove-btn" data-remove-acc="${acc.key}">&times;</button>
          </div>
        </div>
      `;
      cartAddonsContainer.appendChild(addonCard);

      addonCard.querySelector('[data-remove-acc]')?.addEventListener('click', () => {
        // Uncheck corresponding checkbox
        const chk = document.querySelector(`.bundle-check[data-item="${acc.key}"]`);
        if (chk) chk.checked = false;
        recalculateBundle();
      });
    });
  }

  function recalculateCartTotals() {
    const headphoneTotal = 499 * headphoneQuantity;
    let addonsTotal = 0;
    selectedAccessories.forEach((a) => (addonsTotal += a.price));

    const grandTotal = headphoneTotal + addonsTotal;
    const totalItems = headphoneQuantity + selectedAccessories.length;

    if (cartCount) cartCount.textContent = totalItems;
    if (cartNavTotal) cartNavTotal.textContent = `$${grandTotal}`;
    if (cartDrawerItemCount) cartDrawerItemCount.textContent = totalItems;
    if (headphoneQtyEl) headphoneQtyEl.textContent = headphoneQuantity;
    if (cartHeadphonePrice) cartHeadphonePrice.textContent = `$${headphoneTotal} USD`;
    if (cartSubtotal) cartSubtotal.textContent = `$${grandTotal} USD`;
    if (cartFinalTotal) cartFinalTotal.textContent = `$${grandTotal} USD`;
    if (btnPayTotalText) btnPayTotalText.textContent = `$${grandTotal} USD`;

    const receiptTotal = document.getElementById('receiptTotal');
    if (receiptTotal) receiptTotal.textContent = `$${grandTotal} USD`;
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (headphoneQuantity > 1) {
        headphoneQuantity--;
        recalculateCartTotals();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      headphoneQuantity++;
      recalculateCartTotals();
    });
  }

  if (btnRemoveHeadphone) {
    btnRemoveHeadphone.addEventListener('click', () => {
      headphoneQuantity = 0;
      const itemCard = document.getElementById('cartHeadphoneItem');
      if (itemCard) itemCard.style.display = 'none';
      recalculateCartTotals();
    });
  }

  if (btnQuickAddStand) {
    btnQuickAddStand.addEventListener('click', () => {
      const standCheck = document.querySelector('.bundle-check[data-item="stand"]');
      if (standCheck) {
        standCheck.checked = true;
        recalculateBundle();
      }
    });
  }

  // Open Cart Triggers
  [
    cartTriggerBtn,
    btnAddToCart,
    btnInstantCheckout,
    btnBottomOrder,
    btnMobileOrder,
    btnBuyConfiguredBundle,
  ].filter(Boolean).forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      // Ensure at least 1 headphone in cart
      if (headphoneQuantity === 0) {
        headphoneQuantity = 1;
        const itemCard = document.getElementById('cartHeadphoneItem');
        if (itemCard) itemCard.style.display = 'flex';
      }
      recalculateCartTotals();
      openCartDrawer();
    });
  });

  if (btnCloseCart) {
    btnCloseCart.addEventListener('click', closeCartDrawer);
  }

  // Close when clicking dialog backdrop
  if (cartDrawer) {
    cartDrawer.addEventListener('click', (event) => {
      const rect = cartDrawer.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeCartDrawer();
      }
    });
  }

  // 10. Express Checkout & Order Confirmation
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

  if (btnApplePayExpress) {
    btnApplePayExpress.addEventListener('click', completeOrderSimulation);
  }
  if (btnStandardCheckout) {
    btnStandardCheckout.addEventListener('click', completeOrderSimulation);
  }
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

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileDrawer(true));
  }
  if (btnCloseMobileDrawer) {
    btnCloseMobileDrawer.addEventListener('click', () => toggleMobileDrawer(false));
  }
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileDrawer(false));
  });

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

  // Initial cart calculations
  recalculateCartTotals();
});
