/**
 * AUSTIN VANCE | Master Portfolio Hub & Interactive Device Simulator
 * Client Engine: Responsive Viewport Modes, Iframe Controller, Category Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Interactive Device Viewport Mode Switcher (Desktop / Tablet / Mobile)
  const vpButtons = document.querySelectorAll('.vp-btn');
  const frameWrap = document.getElementById('deviceFrameWrap');

  // Default to desktop mode
  if (frameWrap) {
    frameWrap.className = 'device-frame-wrap vp-desktop';
  }

  vpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      vpButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-vp') || 'desktop';
      if (frameWrap) {
        frameWrap.className = `device-frame-wrap vp-${mode}`;
      }
    });
  });

  // 3. Iframe Project Controller & URL Sync
  const simSelect = document.getElementById('simProjectSelect');
  const simIframe = document.getElementById('simIframe');
  const chromeUrlText = document.getElementById('chromeUrlText');
  const simExternalLink = document.getElementById('simExternalLink');
  const simReloadBtn = document.getElementById('simReloadBtn');

  function loadProjectInSimulator(url) {
    if (!url) return;

    if (simIframe) {
      simIframe.style.opacity = '0.3';
      simIframe.src = url;
      simIframe.onload = () => {
        simIframe.style.opacity = '1';
      };
    }

    if (chromeUrlText) {
      chromeUrlText.textContent = `http://localhost:3000${url}`;
    }

    if (simExternalLink) {
      simExternalLink.href = url;
    }

    if (simSelect && simSelect.value !== url) {
      simSelect.value = url;
    }
  }

  if (simSelect) {
    simSelect.addEventListener('change', () => {
      loadProjectInSimulator(simSelect.value);
    });
  }

  if (simReloadBtn && simIframe) {
    simReloadBtn.addEventListener('click', () => {
      simIframe.style.opacity = '0.3';
      simIframe.src = simIframe.src;
      if (window.gsap) {
        gsap.fromTo(simReloadBtn, { rotate: 0 }, { rotate: 360, duration: 0.5 });
      }
    });
  }

  // 4. "Test in Simulator" Card Actions
  document.querySelectorAll('.btn-load-sim').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (!url) return;

      loadProjectInSimulator(url);

      const simSection = document.getElementById('simulator');
      if (simSection) {
        simSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Category Filtering
  const filterChips = document.querySelectorAll('.project-filter-tabs .filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          if (window.gsap) {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
