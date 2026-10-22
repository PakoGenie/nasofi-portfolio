/**
 * Synapse Infrastructure — Main Application Controller
 * Handles catalog filtering, dynamic BOM drawer, currency conversion, 24/7 NOC dispatch, and dialog events.
 */

class SynapseApp {
  constructor() {
    this.currency = 'USD';
    this.currencyRate = 1.0;
    this.currencySymbol = '$';
    this.bomItems = [];

    this.initCatalog();
    this.initBomDrawer();
    this.initNocModal();
    this.initCurrencySwitcher();
    this.initNavigation();
    this.initPreloadBOM();
  }

  initCatalog() {
    this.catalogData = [
      {
        id: 'cat-dell-r760',
        name: 'Dell PowerEdge R760 2U Rackmount Server',
        category: 'servers',
        categoryLabel: 'Compute',
        desc: 'Dual 4th/5th Gen Intel Xeon Scalable up to 64 cores/socket, 32 DDR5 DIMMs (8TB max), 24x NVMe U.2/U.3 bays, redundant 1400W Titanium PSUs.',
        priceUsd: 14800,
        leadTime: 'In Stock (Ships in 24h)',
        img: 'assets/server-poweredge.jpg',
        specs: ['2x Xeon Gold 6430', '256GB ECC DDR5', '8x 3.84TB NVMe Gen4', 'Dual 25GbE SFP28']
      },
      {
        id: 'cat-sm-hgx-h100',
        name: 'Supermicro HGX H100 8-GPU AI Cluster SuperServer',
        category: 'servers',
        categoryLabel: 'AI / HPC',
        desc: 'Turnkey high-density GPU computing for LLM fine-tuning and inference. 8x NVIDIA H100 SXM5 80GB with 3.2 Tbps NVLink interconnect.',
        priceUsd: 89000,
        leadTime: '3 Days Deployment',
        img: 'assets/server-gpu-ai.jpg',
        specs: ['8x NVIDIA H100 80GB SXM5', 'Dual AMD EPYC 9654 96-Core', '1.5TB DDR5', '8x 400G OSFP ConnectX-7']
      },
      {
        id: 'cat-arista-7050x3',
        name: 'Arista 7050X3 32-Port 100G Spine/Leaf Switch',
        category: 'networking',
        categoryLabel: 'Networking',
        desc: 'Wire-speed Layer 2/3 switching with 32x 100GbE QSFP28 ports, sub-800ns latency, dynamic buffer architecture, and EOS telemetry.',
        priceUsd: 8400,
        leadTime: 'In Stock',
        img: 'assets/switch-arista.jpg',
        specs: ['32x 100GbE QSFP28', '6.4 Tbps Switching Capacity', 'Sub-800ns Port-to-Port', 'Dual Hot-Swap PSUs']
      },
      {
        id: 'cat-fortigate-600f',
        name: 'Fortinet FortiGate 600F Enterprise Next-Gen Firewall',
        category: 'networking',
        categoryLabel: 'Security',
        desc: 'Ultra-low latency hardware-accelerated SPU security processing with 140 Gbps firewall throughput, 11 Gbps Threat Protection, and Zero-Trust enforcement.',
        priceUsd: 9200,
        leadTime: 'In Stock',
        img: 'assets/firewall-fortinet.jpg',
        specs: ['140 Gbps FW Throughput', '11 Gbps Threat Protection', '4x 25GE SFP28', 'Zero-Trust ZTNA Built-in']
      },
      {
        id: 'cat-truenas-san',
        name: 'TrueNAS Enterprise Dual-Controller All-Flash NVMe SAN',
        category: 'storage',
        categoryLabel: 'Storage / SAN',
        desc: 'Active-Active dual controller high-availability SAN storage array with 24x NVMe U.3 bays, ZFS enterprise data integrity, and 1.2M random read IOPS.',
        priceUsd: 26500,
        leadTime: 'Pre-Configured',
        img: 'assets/storage-san-truenas.jpg',
        specs: ['24x 7.68TB NVMe U.3 (184TB)', 'Dual Active-Active Controllers', '4x 100GbE NVMe-oF / RoCE', 'ZFS Self-Healing Scrub']
      },
      {
        id: 'cat-synology-fs6400',
        name: 'Synology FlashStation FS6400 24-Bay All-Flash NAS',
        category: 'storage',
        categoryLabel: 'Storage / NAS',
        desc: 'Dual Intel Xeon Silver 8-core CPUs, expandable up to 72 drives, over 240,000 iSCSI 4K random write IOPS, and native Hyper Backup integration.',
        priceUsd: 11200,
        leadTime: 'In Stock',
        img: 'assets/storage-nas-synology.jpg',
        specs: ['Dual Xeon Silver 4110', '64GB ECC DDR4 (expandable 512GB)', '24x 2.5" SATA/SAS SSD bays', 'Dual 10GBASE-T Ports']
      },
      {
        id: 'cat-apc-smartups-6k',
        name: 'APC Smart-UPS On-Line 6000VA Lithium-Ion 3U',
        category: 'power',
        categoryLabel: 'Power / UPS',
        desc: 'Zero transfer time double-conversion online UPS with long-life Lithium-ion battery technology, network management card, and unity power factor (6kW).',
        priceUsd: 6900,
        leadTime: 'In Stock',
        img: 'assets/ups-apc.jpg',
        specs: ['6000VA / 6000W Output', 'Lithium-Ion 8-10yr Battery', 'Zero Transfer Time Online', 'Switched Outlet Groups']
      },
      {
        id: 'cat-fiber-trunk-om4',
        name: 'MTP/MPO 24-Fiber OM4 Trunk & Ultra-Low Loss Patch Panels',
        category: 'cabling',
        categoryLabel: 'Structured Cabling',
        desc: 'Precision pre-terminated factory-certified OM4 multimode MTP/LC breakout trunking with Panduit patch distribution panels and 0.15dB insertion loss.',
        priceUsd: 840,
        leadTime: 'Custom Lengths',
        img: 'assets/fiber-patch-panel.jpg',
        specs: ['OM4 50/125um Laser-Optimized', 'MTP-24 to 12x LC Duplex Breakout', '0.15dB Max Insertion Loss', 'LSZH Low Smoke Zero Halogen']
      },
      {
        id: 'cat-cat6a-shielded-pack',
        name: 'Enterprise Cat6A F/UTP 10GbE Cabling & Management Spool',
        category: 'cabling',
        categoryLabel: 'Structured Cabling',
        desc: '500MHz verified 10GBASE-T solid copper shielded cabling bundles with custom colored strain-relief boots and 48-port angled patch panels.',
        priceUsd: 520,
        leadTime: 'In Stock',
        img: 'assets/cabling-datacenter.jpg',
        specs: ['Cat6A 10GBASE-T Certified', '500MHz Bandwidth Tested', 'Snagless Strain Relief Boots', 'Flame Retardant CMR/CMP']
      }
    ];

    this.renderCatalog('all');
    this.bindCatalogFilters();
  }

  renderCatalog(filterCategory) {
    const grid = document.getElementById('catalogProductsGrid');
    if (!grid) return;

    const filtered = (filterCategory === 'all') 
      ? this.catalogData 
      : this.catalogData.filter(i => i.category === filterCategory);

    grid.innerHTML = filtered.map(item => `
      <article class="hardware-card" data-category="${item.category}">
        <div class="hardware-card-media">
          <img src="${item.img}" alt="${item.name}" loading="lazy" width="400" height="260">
          <span class="hardware-tag">${item.categoryLabel}</span>
          <span class="lead-time-pill">${item.leadTime}</span>
        </div>
        <div class="hardware-card-body">
          <h3 class="hardware-title">${item.name}</h3>
          <p class="hardware-desc">${item.desc}</p>
          <ul class="hardware-specs-list">
            ${item.specs.map(s => `<li><span class="spec-bullet"></span>${s}</li>`).join('')}
          </ul>
          <div class="hardware-card-footer">
            <div class="price-stack">
              <span class="price-label">Hardware Unit Price</span>
              <span class="price-val">${this.formatPrice(item.priceUsd)}</span>
            </div>
            <button type="button" class="btn-primary btn-add-bom" data-id="${item.id}">
              <span>Add to Project BOM</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.btn-add-bom').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = this.catalogData.find(c => c.id === id);
        if (item) {
          this.addToBom(item, 1);
          btn.textContent = '✓ Added to BOM';
          setTimeout(() => {
            btn.innerHTML = '<span>Add to Project BOM</span>';
          }, 1400);
        }
      });
    });
  }

  bindCatalogFilters() {
    const filterButtons = document.querySelectorAll('.filter-tab-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        this.renderCatalog(cat);
      });
    });
  }

  initPreloadBOM() {
    // Start with core sample items
    const srv = this.catalogData.find(c => c.id === 'cat-dell-r760');
    const sw = this.catalogData.find(c => c.id === 'cat-arista-7050x3');
    const fw = this.catalogData.find(c => c.id === 'cat-fortigate-600f');

    if (srv) this.bomItems.push({ item: srv, quantity: 2 });
    if (sw) this.bomItems.push({ item: sw, quantity: 1 });
    if (fw) this.bomItems.push({ item: fw, quantity: 1 });

    this.updateBomUI();
  }

  addToBom(product, qty = 1) {
    const existing = this.bomItems.find(b => b.item.id === product.id || b.item.name === product.name);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.bomItems.push({
        item: {
          id: product.id || 'custom_' + Math.random().toString(36).substring(2, 7),
          name: product.name,
          priceUsd: product.priceUsd,
          category: product.category || 'Hardware'
        },
        quantity: qty
      });
    }
    this.updateBomUI();
  }

  removeFromBom(productId) {
    this.bomItems = this.bomItems.filter(b => b.item.id !== productId);
    this.updateBomUI();
  }

  updateQuantity(productId, delta) {
    const entry = this.bomItems.find(b => b.item.id === productId);
    if (entry) {
      entry.quantity += delta;
      if (entry.quantity <= 0) {
        this.removeFromBom(productId);
        return;
      }
    }
    this.updateBomUI();
  }

  updateBomUI() {
    const badge = document.getElementById('bomCountBadge');
    const totalCount = this.bomItems.reduce((acc, curr) => acc + curr.quantity, 0);

    if (badge) {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    const tableBody = document.getElementById('bomItemsList');
    if (tableBody) {
      if (this.bomItems.length === 0) {
        tableBody.innerHTML = `
          <div class="empty-bom-state">
            <p>Your Project BOM is currently empty.</p>
            <span>Select hardware from the catalog or 42U Rack Configurator above.</span>
          </div>
        `;
      } else {
        tableBody.innerHTML = this.bomItems.map(entry => `
          <div class="bom-line-item">
            <div class="bom-line-info">
              <span class="bom-line-title">${entry.item.name}</span>
              <span class="bom-line-rate">${this.formatPrice(entry.item.priceUsd)} each</span>
            </div>
            <div class="bom-line-qty">
              <button type="button" class="btn-qty-minus" data-id="${entry.item.id}">-</button>
              <span class="qty-display">${entry.quantity}</span>
              <button type="button" class="btn-qty-plus" data-id="${entry.item.id}">+</button>
            </div>
            <div class="bom-line-subtotal">
              ${this.formatPrice(entry.item.priceUsd * entry.quantity)}
            </div>
            <button type="button" class="btn-remove-line" data-id="${entry.item.id}" title="Remove item">&times;</button>
          </div>
        `).join('');

        tableBody.querySelectorAll('.btn-qty-minus').forEach(btn => {
          btn.addEventListener('click', () => this.updateQuantity(btn.dataset.id, -1));
        });
        tableBody.querySelectorAll('.btn-qty-plus').forEach(btn => {
          btn.addEventListener('click', () => this.updateQuantity(btn.dataset.id, 1));
        });
        tableBody.querySelectorAll('.btn-remove-line').forEach(btn => {
          btn.addEventListener('click', () => this.removeFromBom(btn.dataset.id));
        });
      }
    }

    // Calculations
    const hardwareSubtotal = this.bomItems.reduce((acc, curr) => acc + (curr.item.priceUsd * curr.quantity), 0);
    
    // Labor add-ons
    const optDeploy = document.getElementById('bomOptDeploy');
    const optCabling = document.getElementById('bomOptCabling');
    const optSla = document.getElementById('bomOptSla');

    let laborTotal = 0;
    if (optDeploy && optDeploy.checked) laborTotal += 3500;
    if (optCabling && optCabling.checked) laborTotal += 1800;
    if (optSla && optSla.checked) laborTotal += Math.round(hardwareSubtotal * 0.18);

    const grandTotal = hardwareSubtotal + laborTotal;

    const subEl = document.getElementById('bomHardwareSubtotal');
    const laborEl = document.getElementById('bomLaborSubtotal');
    const grandEl = document.getElementById('bomGrandTotal');

    if (subEl) subEl.textContent = this.formatPrice(hardwareSubtotal);
    if (laborEl) laborEl.textContent = this.formatPrice(laborTotal);
    if (grandEl) grandEl.textContent = this.formatPrice(grandTotal);
  }

  initBomDrawer() {
    const dialog = document.getElementById('bomDrawer');
    const btnOpen = document.getElementById('btnOpenBomDrawer');
    const btnClose = document.getElementById('btnCloseBomDrawer');

    if (btnOpen && dialog) {
      btnOpen.addEventListener('click', () => this.openBomDrawer());
    }
    if (btnClose && dialog) {
      btnClose.addEventListener('click', () => dialog.close());
    }

    // Labor checkboxes change
    ['bomOptDeploy', 'bomOptCabling', 'bomOptSla'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => this.updateBomUI());
    });

    // Close when clicking outside modal backdrop
    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });
    }

    // RFQ Submit
    const rfqForm = document.getElementById('bomRfqForm');
    if (rfqForm) {
      rfqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const refNumber = 'SYN-BOM-' + Math.floor(100000 + Math.random() * 900000);
        alert(`BOM RFQ Submitted Successfully!\n\nReference: ${refNumber}\nAn Enterprise Infrastructure Solutions Architect will deliver your official stamped quote and SLA proposal within 2 hours.`);
        if (dialog) dialog.close();
      });
    }
  }

  openBomDrawer() {
    const dialog = document.getElementById('bomDrawer');
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  }

  initNocModal() {
    const dialog = document.getElementById('nocModal');
    const btnOpen = document.getElementById('btnOpenNocModal');
    const btnHeroNoc = document.getElementById('btnHeroNoc');
    const btnClose = document.getElementById('btnCloseNocModal');

    const openNoc = () => {
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
        this.startNocTimer();
      }
    };

    if (btnOpen) btnOpen.addEventListener('click', openNoc);
    if (btnHeroNoc) btnHeroNoc.addEventListener('click', openNoc);
    if (btnClose && dialog) btnClose.addEventListener('click', () => dialog.close());

    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });
    }

    const nocForm = document.getElementById('nocTicketForm');
    if (nocForm) {
      nocForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const ticketId = 'INC-' + Math.floor(1000000 + Math.random() * 9000000);
        alert(`CRITICAL TICKET DISPATCHED: ${ticketId}\n\nGuaranteed SLA Triage Active: An on-call Tier-3 Network/Systems Engineer has been paged. Hardware sparing courier on standby.`);
        if (dialog) dialog.close();
      });
    }
  }

  startNocTimer() {
    const timerEl = document.getElementById('nocSlaTimer');
    if (!timerEl) return;

    let seconds = 15 * 60; // 15:00
    if (this.nocInterval) clearInterval(this.nocInterval);

    this.nocInterval = setInterval(() => {
      seconds--;
      if (seconds < 0) seconds = 0;
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
    }, 1000);
  }

  initCurrencySwitcher() {
    const select = document.getElementById('currencySelector');
    if (!select) return;

    select.addEventListener('change', () => {
      const val = select.value;
      this.currency = val;

      if (val === 'USD') {
        this.currencyRate = 1.0;
        this.currencySymbol = '$';
      } else if (val === 'MAD') {
        this.currencyRate = 10.15; // 1 USD = 10.15 MAD
        this.currencySymbol = 'MAD ';
      } else if (val === 'EUR') {
        this.currencyRate = 0.92; // 1 USD = 0.92 EUR
        this.currencySymbol = '€';
      }

      this.renderCatalog(document.querySelector('.filter-tab-btn.active')?.dataset.filter || 'all');
      this.updateBomUI();
      if (window.rackBuilderInstance) {
        window.rackBuilderInstance.updateTelemetry();
      }
    });
  }

  formatPrice(usdAmount) {
    const converted = Math.round(usdAmount * this.currencyRate);
    if (this.currency === 'MAD') {
      return `${converted.toLocaleString()} MAD`;
    }
    return `${this.currencySymbol}${converted.toLocaleString()}`;
  }

  initNavigation() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Mobile nav toggle
    const toggle = document.getElementById('mobileNavToggle');
    const menu = document.getElementById('navLinks');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
      });
      menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('open'));
      });
    }
  }
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.SynapseApp = new SynapseApp();

  if (document.getElementById('networkCanvas') && window.NetworkVisualizer) {
    window.networkVisInstance = new window.NetworkVisualizer('networkCanvas');
  }

  if (document.getElementById('rackSlotsContainer') && window.RackBuilder) {
    window.rackBuilderInstance = new window.RackBuilder();
  }

  if (document.getElementById('storageDriveCount') && window.StorageCalculator) {
    window.storageCalcInstance = new window.StorageCalculator();
  }
});
