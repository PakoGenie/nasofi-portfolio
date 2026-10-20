/**
 * ARCHIVIST | International Journal of Monolithic Architecture & Spatial Culture
 * Client Engine: Reading Progress, Multi-Theme System, Canvas Waveform Synthesizer,
 * Long-Form Reader Modal, Bookmarking & Order Workflows.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 3. Dynamic Reading Progress Bar
  const progressBar = document.getElementById('readingProgressBar');
  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal > 0 && progressBar) {
      const scrollPercent = (window.scrollY / scrollTotal) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
  }, { passive: true });

  // 4. Multi-Theme Switching (Paper, Dark, Sepia)
  const themeButtons = document.querySelectorAll('.theme-btn');
  const storedTheme = localStorage.getItem('archivist_theme') || 'paper';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('archivist_theme', theme);

    themeButtons.forEach(btn => {
      if (btn.getAttribute('data-set-theme') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  applyTheme(storedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-set-theme');
      if (targetTheme) applyTheme(targetTheme);
    });
  });

  // 5. Interactive Audio Article Waveform Canvas
  const canvas = document.getElementById('waveformCanvas');
  const btnMainPlay = document.getElementById('btnMainPlayToggle');
  const btnHeroPlay = document.getElementById('btnPlayHeroAudio');
  const heroPlayLabel = document.getElementById('heroPlayLabel');
  const playIconSvg = document.getElementById('playIconSvg');
  const timecodeDisplay = document.getElementById('timecodeDisplay');

  let isPlaying = false;
  let animFrameId = null;
  let elapsedSeconds = 134; // 02:14 starting time
  let timerInterval = null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function drawWaveform(time) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const barCount = 48;
    const barWidth = 4;
    const gap = (w - (barCount * barWidth)) / (barCount - 1);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const isSepia = document.documentElement.getAttribute('data-theme') === 'sepia';
    const barColor = isDark ? '#fbbf24' : (isSepia ? '#d4af37' : '#121316');

    for (let i = 0; i < barCount; i++) {
      let barHeight;
      if (isPlaying) {
        // dynamic rhythmic oscillation
        const wave = Math.sin(time * 0.005 + i * 0.3) * Math.cos(time * 0.003 - i * 0.15);
        barHeight = Math.max(6, Math.abs(wave) * 36 + Math.random() * 6);
      } else {
        // static architectural frequency silhouette
        const staticPattern = Math.sin(i * 0.22) * 16 + 18;
        barHeight = Math.max(4, staticPattern);
      }

      const x = i * (barWidth + gap);
      const y = (h - barHeight) / 2;

      ctx.fillStyle = barColor;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    if (isPlaying) {
      animFrameId = requestAnimationFrame(drawWaveform);
    }
  }

  // Draw initial static wave
  drawWaveform(0);

  function toggleAudioPlayback() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      if (btnMainPlay) {
        btnMainPlay.innerHTML = '<i data-lucide="pause" class="icon-md"></i>';
      }
      if (heroPlayLabel) heroPlayLabel.textContent = 'Pause Narration';
      if (window.lucide) window.lucide.createIcons();

      // Start canvas animation loop
      animFrameId = requestAnimationFrame(drawWaveform);

      // Start clock
      timerInterval = setInterval(() => {
        elapsedSeconds++;
        if (elapsedSeconds >= 760) elapsedSeconds = 0;
        if (timecodeDisplay) {
          timecodeDisplay.textContent = `${formatTime(elapsedSeconds)} / 12:40`;
        }
      }, 1000);
    } else {
      if (btnMainPlay) {
        btnMainPlay.innerHTML = '<i data-lucide="play" class="icon-md"></i>';
      }
      if (heroPlayLabel) heroPlayLabel.textContent = 'Listen to Narration (12:40)';
      if (window.lucide) window.lucide.createIcons();

      cancelAnimationFrame(animFrameId);
      clearInterval(timerInterval);
      drawWaveform(0);
    }
  }

  if (btnMainPlay) btnMainPlay.addEventListener('click', toggleAudioPlayback);
  if (btnHeroPlay) btnHeroPlay.addEventListener('click', toggleAudioPlayback);

  // Speed controls
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 6. 3D Mouse Parallax on Cover Hero Visual
  const heroWrapper = document.getElementById('heroImageWrapper');
  const heroCoverImg = document.getElementById('heroCoverImg');

  if (heroWrapper && heroCoverImg && window.matchMedia('(pointer: fine)').matches) {
    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = (y / (rect.height / 2)) * -6;
      const rotY = (x / (rect.width / 2)) * 6;

      heroWrapper.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroWrapper.addEventListener('mouseleave', () => {
      heroWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 7. Filterable Essays Grid
  const filterBtns = document.querySelectorAll('.filter-tab-group .filter-btn');
  const essayCards = document.querySelectorAll('.essay-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      essayCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          if (window.gsap) {
            gsap.fromTo(card, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Bookmarking System (with localStorage)
  let savedArticles = JSON.parse(localStorage.getItem('archivist_saved_articles') || '[]');
  const savedCountPill = document.getElementById('savedCountPill');

  function updateSavedPill() {
    if (savedCountPill) {
      savedCountPill.textContent = `${savedArticles.length} Saved`;
    }
    // Update button states
    document.querySelectorAll('[data-article-id]').forEach(btn => {
      const id = btn.getAttribute('data-article-id');
      if (savedArticles.includes(id)) {
        btn.classList.add('saved');
      } else {
        btn.classList.remove('saved');
      }
    });
  }

  updateSavedPill();

  document.querySelectorAll('.btn-bookmark, .card-bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-article-id');
      if (!id) return;

      if (savedArticles.includes(id)) {
        savedArticles = savedArticles.filter(item => item !== id);
        showJournalToast('Essay removed from your personal reading list.');
      } else {
        savedArticles.push(id);
        showJournalToast('Essay bookmarked to your offline reading list.');
      }

      localStorage.setItem('archivist_saved_articles', JSON.stringify(savedArticles));
      updateSavedPill();
    });
  });

  // 9. Long-Form Article Reader Dialog (<dialog id="articleReaderDialog">)
  const readerDialog = document.getElementById('articleReaderDialog');
  const btnCloseReader = document.getElementById('btnCloseReader');
  const readerContentArea = document.getElementById('readerContentArea');
  const readerArticleTitle = document.getElementById('readerArticleTitle');
  const readerArticleAuthor = document.getElementById('readerArticleAuthor');

  let currentFontSize = 1.15; // rem

  function openReader(title, author) {
    if (title && readerArticleTitle) readerArticleTitle.textContent = title;
    if (author && readerArticleAuthor) readerArticleAuthor.textContent = `By ${author}`;
    if (readerDialog) {
      readerDialog.showModal();
    }
  }

  const btnReadCoverStory = document.getElementById('btnReadCoverStory');
  if (btnReadCoverStory) {
    btnReadCoverStory.addEventListener('click', () => {
      openReader(
        'The Silence of Cast Concrete: The Spatial Poetics of Monolithic Enclosure',
        'Valentina Mori, Ph.D. — Illustrated by H. Richter'
      );
    });
  }

  document.querySelectorAll('.btn-read-article').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const author = btn.getAttribute('data-author');
      openReader(title, author);
    });
  });

  if (btnCloseReader && readerDialog) {
    btnCloseReader.addEventListener('click', () => readerDialog.close());
  }

  // Click outside to close reader
  if (readerDialog) {
    readerDialog.addEventListener('click', (e) => {
      const rect = readerDialog.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        readerDialog.close();
      }
    });
  }

  // Reader Text Zoom controls
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnZoomReset = document.getElementById('btnZoomReset');
  const readerBodyText = document.querySelector('.reader-body-text');

  if (btnZoomIn && readerBodyText) {
    btnZoomIn.addEventListener('click', () => {
      if (currentFontSize < 1.6) {
        currentFontSize += 0.1;
        readerBodyText.style.fontSize = `${currentFontSize}rem`;
      }
    });
  }

  if (btnZoomOut && readerBodyText) {
    btnZoomOut.addEventListener('click', () => {
      if (currentFontSize > 0.95) {
        currentFontSize -= 0.1;
        readerBodyText.style.fontSize = `${currentFontSize}rem`;
      }
    });
  }

  if (btnZoomReset && readerBodyText) {
    btnZoomReset.addEventListener('click', () => {
      currentFontSize = 1.15;
      readerBodyText.style.fontSize = `${currentFontSize}rem`;
    });
  }

  // Copy citation button
  const btnShareArticle = document.getElementById('btnShareArticle');
  if (btnShareArticle) {
    btnShareArticle.addEventListener('click', () => {
      navigator.clipboard.writeText('Mori, V. (2026). The Silence of Cast Concrete. ARCHIVIST, 18, 44–68.');
      showJournalToast('Bibliographic citation copied to clipboard (Chicago style).');
    });
  }

  // 10. Print Edition Order Dialog (<dialog id="subscriptionDialog">)
  const subscribeDialog = document.getElementById('subscriptionDialog');
  const btnOpenSubscribe = document.getElementById('btnOpenSubscribe');
  const btnOrderArchivalPrint = document.getElementById('btnOrderArchivalPrint');
  const btnCloseSubscribe = document.getElementById('btnCloseSubscribe');
  const orderForm = document.getElementById('orderForm');

  function openSubscribeModal() {
    if (subscribeDialog) subscribeDialog.showModal();
  }

  if (btnOpenSubscribe) btnOpenSubscribe.addEventListener('click', openSubscribeModal);
  if (btnOrderArchivalPrint) btnOrderArchivalPrint.addEventListener('click', openSubscribeModal);
  if (btnCloseSubscribe && subscribeDialog) {
    btnCloseSubscribe.addEventListener('click', () => subscribeDialog.close());
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('shipName').value.trim();
      const country = document.getElementById('shipCountry').value;
      const trackingCode = `DHL-ARC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      orderForm.reset();
      subscribeDialog.close();
      showJournalToast(`Thank you, ${name}. Copy № ${Math.floor(1 + Math.random() * 500)} reserved for ${country}. Dispatch ID: ${trackingCode}`);
    });
  }

  // 11. Toast System
  function showJournalToast(msg) {
    let toast = document.getElementById('archivistToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'archivistToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translate(-50%, 80px);
        background: var(--text-primary);
        color: var(--bg-primary);
        padding: 12px 24px;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.78rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 99999;
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
        pointer-events: none;
        max-width: 90vw;
        text-align: center;
      `;
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.style.transform = 'translate(-50%, 0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translate(-50%, 80px)';
      toast.style.opacity = '0';
    }, 4000);
  }
});
