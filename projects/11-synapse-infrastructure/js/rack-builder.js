/**
 * Synapse Infrastructure — 42U Server Rack Configurator Engine
 * Precision 1U-slot hardware placement, power/thermal/weight analytics, and BOM export.
 */

class RackBuilder {
  constructor() {
    this.totalU = 42;
    this.slots = new Array(this.totalU).fill(null); // slots[0] is 1U (bottom), slots[41] is 42U (top)
    this.catalog = [
      {
        id: 'sw-arista-100g',
        name: 'Arista 7050X3 100G Switch',
        category: 'Network',
        uSize: 1,
        powerWatts: 280,
        btu: 955,
        weightKg: 8.5,
        priceUsd: 8400,
        color: '#0284c7',
        badge: '100GbE QSFP28',
        ports: '32x 100GbE QSFP28 / Dual AC PSU'
      },
      {
        id: 'fw-fortigate-600f',
        name: 'Fortinet FortiGate 600F Firewall',
        category: 'Security',
        uSize: 1,
        powerWatts: 210,
        btu: 716,
        weightKg: 7.2,
        priceUsd: 9200,
        color: '#dc2626',
        badge: '140 Gbps FW',
        ports: '4x 25GE SFP28, 4x 10GE SFP+, 18x GE'
      },
      {
        id: 'pp-fiber-om4',
        name: '24-Port OM4 Fiber Patch Panel',
        category: 'Cabling',
        uSize: 1,
        powerWatts: 0,
        btu: 0,
        weightKg: 2.1,
        priceUsd: 480,
        color: '#0d9488',
        badge: 'Ultra Low Loss',
        ports: '24x LC Duplex OM4 multimode'
      },
      {
        id: 'pp-cat6a-shielded',
        name: '24-Port Cat6A Shielded Patch Panel',
        category: 'Cabling',
        uSize: 1,
        powerWatts: 0,
        btu: 0,
        weightKg: 2.8,
        priceUsd: 360,
        color: '#475569',
        badge: '10GBASE-T',
        ports: '24x RJ45 Cat6A Shielded 500MHz'
      },
      {
        id: 'srv-dell-r760',
        name: 'Dell PowerEdge R760 2U Host',
        category: 'Compute',
        uSize: 2,
        powerWatts: 750,
        btu: 2559,
        weightKg: 24.5,
        priceUsd: 14800,
        color: '#2563eb',
        badge: 'Dual Xeon / 512GB',
        ports: '2x Intel Xeon Platinum 8468, 512GB DDR5, 8x NVMe'
      },
      {
        id: 'srv-ai-hgx-h100',
        name: 'Supermicro HGX H100 8-GPU AI Node',
        category: 'AI / HPC',
        uSize: 4,
        powerWatts: 2800,
        btu: 9553,
        weightKg: 48.0,
        priceUsd: 89000,
        color: '#7c3aed',
        badge: '8x SXM5 H100',
        ports: '8x NVIDIA H100 80GB, Dual EPYC 9654, 1.5TB DDR5'
      },
      {
        id: 'san-truenas-ha',
        name: 'TrueNAS Dual-Controller NVMe SAN',
        category: 'Storage',
        uSize: 2,
        powerWatts: 620,
        btu: 2115,
        weightKg: 28.0,
        priceUsd: 26500,
        color: '#d97706',
        badge: '1.2M IOPS HA',
        ports: '24x 7.68TB NVMe U.3, Dual Active-Active Active Controllers'
      },
      {
        id: 'nas-synology-ha',
        name: 'Synology Enterprise 24-Bay NAS',
        category: 'Storage',
        uSize: 4,
        powerWatts: 450,
        btu: 1535,
        weightKg: 32.0,
        priceUsd: 11200,
        color: '#b45309',
        badge: '24-Bay SAS/SATA',
        ports: '24x 18TB Enterprise SAS HDD, 10GbE SFP+'
      },
      {
        id: 'ups-apc-6000va',
        name: 'APC Smart-UPS On-Line 6000VA',
        category: 'Power',
        uSize: 3,
        powerWatts: 120, // Internal loss during normal online operation
        btu: 410,
        weightKg: 54.0,
        priceUsd: 6900,
        color: '#15803d',
        badge: 'Li-Ion 6kVA',
        ports: 'Hardwire 208/230V + L6-20R / L6-30R Outlets'
      },
      {
        id: 'mgmt-cable-duct',
        name: '1U Cable Management Duct',
        category: 'Accessory',
        uSize: 1,
        powerWatts: 0,
        btu: 0,
        weightKg: 1.5,
        priceUsd: 120,
        color: '#334155',
        badge: 'High-Density Finger',
        ports: 'Toolless horizontal pass-through'
      },
      {
        id: 'blanking-panel-1u',
        name: '1U Toolless Blanking Panel',
        category: 'Accessory',
        uSize: 1,
        powerWatts: 0,
        btu: 0,
        weightKg: 0.4,
        priceUsd: 35,
        color: '#1e293b',
        badge: 'Airflow Optimization',
        ports: 'Prevents hot/cold aisle bypass'
      }
    ];

    this.selectedItem = this.catalog[0];
    this.rackContainer = document.getElementById('rackSlotsContainer');
    this.initCatalogUI();
    this.loadPreset('enterprise');
    this.bindEvents();
  }

  initCatalogUI() {
    const list = document.getElementById('rackPaletteList');
    if (!list) return;

    list.innerHTML = this.catalog.map((item, idx) => `
      <div class="palette-item ${idx === 0 ? 'selected' : ''}" data-id="${item.id}">
        <div class="palette-header">
          <span class="palette-u-tag">${item.uSize}U</span>
          <span class="palette-name">${item.name}</span>
        </div>
        <div class="palette-meta">
          <span>${item.powerWatts > 0 ? item.powerWatts + 'W' : 'Passive'}</span>
          <span>${item.weightKg} kg</span>
          <span class="palette-price">$${item.priceUsd.toLocaleString()}</span>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        list.querySelectorAll('.palette-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        const id = el.dataset.id;
        this.selectedItem = this.catalog.find(c => c.id === id);
      });
    });
  }

  loadPreset(presetType) {
    this.slots.fill(null);

    if (presetType === 'enterprise') {
      // 42U: Arista 100G Switch
      this.placeItem(42, 'sw-arista-100g');
      // 41U: Fortinet Firewall
      this.placeItem(41, 'fw-fortigate-600f');
      // 40U: Cable duct
      this.placeItem(40, 'mgmt-cable-duct');
      // 39U: Fiber Patch Panel
      this.placeItem(39, 'pp-fiber-om4');
      // 38U: Cat6A Patch Panel
      this.placeItem(38, 'pp-cat6a-shielded');
      // 36U (2U): Dell R760 Host 1 (occupies 36 and 35)
      this.placeItem(36, 'srv-dell-r760');
      // 34U (2U): Dell R760 Host 2 (occupies 34 and 33)
      this.placeItem(34, 'srv-dell-r760');
      // 32U (2U): Dell R760 Host 3 (occupies 32 and 31)
      this.placeItem(32, 'srv-dell-r760');
      // 28U (2U): TrueNAS NVMe SAN (occupies 28 and 27)
      this.placeItem(28, 'san-truenas-ha');
      // 24U (4U): Synology NAS (occupies 24, 23, 22, 21)
      this.placeItem(24, 'nas-synology-ha');
      // 1U (3U): APC Smart-UPS at bottom (occupies 3, 2, 1)
      this.placeItem(3, 'ups-apc-6000va');
    } else if (presetType === 'ai') {
      // 42U: 100G Arista Switch
      this.placeItem(42, 'sw-arista-100g');
      // 41U: Fortinet Firewall
      this.placeItem(41, 'fw-fortigate-600f');
      // 40U: Fiber Patch Panel
      this.placeItem(40, 'pp-fiber-om4');
      // 36U (4U): Supermicro HGX H100 GPU Cluster
      this.placeItem(36, 'srv-ai-hgx-h100');
      // 30U (4U): Supermicro HGX H100 GPU Cluster 2
      this.placeItem(30, 'srv-ai-hgx-h100');
      // 24U (2U): TrueNAS NVMe SAN Ultra-High Throughput
      this.placeItem(24, 'san-truenas-ha');
      // 20U (2U): Dell R760 Head Node
      this.placeItem(20, 'srv-dell-r760');
      // 3U: Dual APC 6000VA UPS
      this.placeItem(3, 'ups-apc-6000va');
    } else if (presetType === 'clear') {
      // Empty rack
    }

    this.render();
    this.updateTelemetry();
  }

  canPlaceItem(topSlotU, item) {
    const topIdx = topSlotU - 1; // 0-based index
    const bottomIdx = topIdx - item.uSize + 1;
    if (bottomIdx < 0 || topIdx >= this.totalU) return false;

    for (let i = bottomIdx; i <= topIdx; i++) {
      if (this.slots[i] !== null) return false;
    }
    return true;
  }

  placeItem(topSlotU, itemId) {
    const item = this.catalog.find(c => c.id === itemId);
    if (!item) return false;

    if (!this.canPlaceItem(topSlotU, item)) return false;

    const topIdx = topSlotU - 1;
    const bottomIdx = topIdx - item.uSize + 1;
    const instanceId = 'inst_' + Math.random().toString(36).substring(2, 9);

    for (let i = bottomIdx; i <= topIdx; i++) {
      this.slots[i] = {
        ...item,
        instanceId: instanceId,
        isHead: (i === topIdx),
        slotNumber: i + 1
      };
    }
    return true;
  }

  removeItem(instanceId) {
    for (let i = 0; i < this.totalU; i++) {
      if (this.slots[i] && this.slots[i].instanceId === instanceId) {
        this.slots[i] = null;
      }
    }
    this.render();
    this.updateTelemetry();
  }

  render() {
    if (!this.rackContainer) return;

    let html = '';
    // Render from 42U (top) down to 1U (bottom)
    let idx = this.totalU - 1;

    while (idx >= 0) {
      const uNumber = idx + 1;
      const slot = this.slots[idx];

      if (slot === null) {
        // Empty slot
        html += `
          <div class="rack-slot empty" data-u="${uNumber}">
            <span class="slot-number">${uNumber}U</span>
            <div class="slot-content">
              <span class="slot-placeholder">Empty (Click to mount ${this.selectedItem ? this.selectedItem.name : 'hardware'})</span>
            </div>
            <button type="button" class="btn-slot-mount" title="Mount item">+</button>
          </div>
        `;
        idx--;
      } else {
        // Occupied slot - determine total height in U
        const uSize = slot.uSize;
        const instId = slot.instanceId;

        html += `
          <div class="rack-slot occupied" data-u="${uNumber}" style="--u-span: ${uSize}; border-left-color: ${slot.color};" data-instance="${instId}">
            <span class="slot-number">${uNumber}U</span>
            <div class="slot-hardware" style="background: linear-gradient(90deg, rgba(14,22,34,0.95), ${slot.color}15);">
              <div class="hardware-info">
                <span class="hardware-name">${slot.name}</span>
                <span class="hardware-spec">${slot.ports}</span>
              </div>
              <div class="hardware-meta">
                <span class="hardware-badge" style="background: ${slot.color}33; color: ${slot.color}; border: 1px solid ${slot.color}66;">${slot.badge}</span>
                <span class="hardware-power">${slot.powerWatts}W</span>
                <button type="button" class="btn-remove-slot" data-inst="${instId}" title="Remove from rack">&times;</button>
              </div>
            </div>
          </div>
        `;

        // Skip the lower spanned slots
        idx -= uSize;
      }
    }

    this.rackContainer.innerHTML = html;
    this.bindSlotActions();
  }

  bindSlotActions() {
    // Mount on empty slot click
    this.rackContainer.querySelectorAll('.rack-slot.empty').forEach(el => {
      el.addEventListener('click', (e) => {
        const uNumber = parseInt(el.dataset.u, 10);
        if (this.selectedItem) {
          const success = this.placeItem(uNumber, this.selectedItem.id);
          if (success) {
            this.render();
            this.updateTelemetry();
          } else {
            alert(`Not enough contiguous space for a ${this.selectedItem.uSize}U item starting at slot ${uNumber}U.`);
          }
        }
      });
    });

    // Remove buttons
    this.rackContainer.querySelectorAll('.btn-remove-slot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instId = btn.dataset.inst;
        this.removeItem(instId);
      });
    });
  }

  bindEvents() {
    // Preset buttons
    const btnEnterprise = document.getElementById('presetEnterprise');
    const btnAi = document.getElementById('presetAi');
    const btnClear = document.getElementById('presetClear');

    if (btnEnterprise) {
      btnEnterprise.addEventListener('click', () => this.loadPreset('enterprise'));
    }
    if (btnAi) {
      btnAi.addEventListener('click', () => this.loadPreset('ai'));
    }
    if (btnClear) {
      btnClear.addEventListener('click', () => this.loadPreset('clear'));
    }

    // Export BOM
    const btnExport = document.getElementById('btnExportRackBom');
    if (btnExport) {
      btnExport.addEventListener('click', () => this.exportBomCsv());
    }

    // Add Rack to Project BOM
    const btnAddAll = document.getElementById('btnAddRackToBom');
    if (btnAddAll) {
      btnAddAll.addEventListener('click', () => {
        const uniqueItems = this.getUniqueHardwareList();
        if (window.SynapseApp && uniqueItems.length > 0) {
          uniqueItems.forEach(item => {
            window.SynapseApp.addToBom(item, item.count);
          });
          window.SynapseApp.openBomDrawer();
        }
      });
    }
  }

  getUniqueHardwareList() {
    const map = new Map();
    for (let i = 0; i < this.totalU; i++) {
      const slot = this.slots[i];
      if (slot && slot.isHead) {
        if (map.has(slot.id)) {
          map.get(slot.id).count++;
        } else {
          map.set(slot.id, { ...slot, count: 1 });
        }
      }
    }
    return Array.from(map.values());
  }

  updateTelemetry() {
    let occupiedU = 0;
    let totalWatts = 0;
    let totalBtu = 0;
    let totalWeight = 0;
    let totalCapex = 0;

    for (let i = 0; i < this.totalU; i++) {
      const slot = this.slots[i];
      if (slot) {
        occupiedU++;
        if (slot.isHead) {
          totalWatts += slot.powerWatts;
          totalBtu += slot.btu;
          totalWeight += slot.weightKg;
          totalCapex += slot.priceUsd;
        }
      }
    }

    // Include rack frame baseline weight (120kg for 42U reinforced steel chassis)
    const staticWeight = 120 + totalWeight;
    const amps208V = (totalWatts / 208).toFixed(1);
    const requiredCfm = Math.round(totalBtu / 3.16); // Rule of thumb: CFM = BTU / (1.08 * 30F delta)

    // Update UI elements
    const uCountEl = document.getElementById('rackOccupiedU');
    const uPercentEl = document.getElementById('rackOccupiedPercent');
    const uBarEl = document.getElementById('rackOccupancyBar');
    const wattsEl = document.getElementById('rackTotalWatts');
    const ampsEl = document.getElementById('rackAmps');
    const btuEl = document.getElementById('rackTotalBtu');
    const cfmEl = document.getElementById('rackRequiredCfm');
    const weightEl = document.getElementById('rackTotalWeight');
    const capexEl = document.getElementById('rackTotalCapex');

    const pct = Math.round((occupiedU / this.totalU) * 100);

    if (uCountEl) uCountEl.textContent = `${occupiedU} / 42U`;
    if (uPercentEl) uPercentEl.textContent = `${pct}% Full`;
    if (uBarEl) uBarEl.style.width = `${pct}%`;
    if (wattsEl) wattsEl.textContent = `${totalWatts.toLocaleString()} W`;
    if (ampsEl) ampsEl.textContent = `${amps208V} A @ 208V`;
    if (btuEl) btuEl.textContent = `${totalBtu.toLocaleString()} BTU/hr`;
    if (cfmEl) cfmEl.textContent = `${requiredCfm.toLocaleString()} CFM`;
    if (weightEl) {
      weightEl.textContent = `${staticWeight.toFixed(1)} kg`;
      if (staticWeight > 1000) {
        weightEl.style.color = '#ef4444';
      } else {
        weightEl.style.color = 'inherit';
      }
    }
    if (capexEl) {
      const rate = window.SynapseApp ? window.SynapseApp.currencyRate : 1;
      const sym = window.SynapseApp ? window.SynapseApp.currencySymbol : '$';
      capexEl.textContent = `${sym}${Math.round(totalCapex * rate).toLocaleString()}`;
    }
  }

  exportBomCsv() {
    const list = this.getUniqueHardwareList();
    if (list.length === 0) {
      alert('Your 42U rack is currently empty. Mount hardware components first!');
      return;
    }

    let csv = 'Part Number / Name,Category,Form Factor,Quantity,Unit Power (W),Total Weight (kg),Unit Price (USD),Subtotal (USD)\n';
    let totalSum = 0;

    list.forEach(item => {
      const sub = item.priceUsd * item.count;
      totalSum += sub;
      csv += `"${item.name}","${item.category}","${item.uSize}U",${item.count},${item.powerWatts},${(item.weightKg * item.count).toFixed(1)},${item.priceUsd},${sub}\n`;
    });
    csv += `\n"TOTAL HARDWARE CAPEX","","","",,"",,${totalSum}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Synapse_42U_Rack_BOM_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Global initialization
window.RackBuilder = RackBuilder;
