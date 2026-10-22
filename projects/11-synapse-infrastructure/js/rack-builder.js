/**
 * SYNAPSE IT MAROC — Configurateur de Baie Informatique PME (12U, 24U, 42U)
 * Conçu pour les PME marocaines : bureaux, usines, cabinets médicaux, fiduciaires et commerces.
 * Prix en Dirhams Marocains (MAD), calculs de consommation, postes couverts et autonomie électrique.
 */

class RackBuilder {
  constructor() {
    this.totalU = 24; // Default to 24U (standard PME floor rack)
    this.slots = new Array(this.totalU).fill(null);

    // Matériel informatique adapté aux réalités des PME marocaines
    this.catalog = [
      {
        id: 'sw-cisco-poe-24',
        name: 'Switch 24 Ports Gigabit PoE+ Cisco Business',
        category: 'Réseau',
        uSize: 1,
        powerWatts: 180,
        btu: 614,
        weightKg: 3.8,
        priceMad: 12500,
        color: '#0284c7',
        badge: '24 Ports PoE+',
        ports: 'Alimente téléphones IP, caméras et bornes Wi-Fi sans prise murale'
      },
      {
        id: 'fw-fortigate-60f',
        name: 'Pare-Feu & Routeur VPN Fortinet FortiGate 60F',
        category: 'Sécurité & VPN',
        uSize: 1,
        powerWatts: 45,
        btu: 153,
        weightKg: 2.1,
        priceMad: 9800,
        color: '#dc2626',
        badge: 'Télétravail Sécurisé',
        ports: 'VPN sécurisé pour les dirigeants, blocage des virus et filtrage web'
      },
      {
        id: 'srv-dell-poweredge',
        name: 'Serveur de Gestion Dell PowerEdge R350 (Sage / ERP / Fichiers)',
        category: 'Serveur',
        uSize: 1,
        powerWatts: 250,
        btu: 853,
        weightKg: 13.5,
        priceMad: 24500,
        color: '#2563eb',
        badge: 'Disques Miroir RAID',
        ports: 'Intel Xeon, 64 Go RAM, 4x disques SAS en miroir anti-panne'
      },
      {
        id: 'nas-synology-pme',
        name: 'Serveur NAS Synology 4 Baies (Sauvegarde Automatique)',
        category: 'Sauvegarde & Stockage',
        uSize: 1,
        powerWatts: 60,
        btu: 204,
        weightKg: 4.8,
        priceMad: 14200,
        color: '#d97706',
        badge: 'Anti-Ransomware',
        ports: 'Sauvegarde chaque soir tous les PC de vos employés. Données cryptées sécurisées'
      },
      {
        id: 'ups-apc-smart-pme',
        name: 'Onduleur APC Smart-UPS 1500VA (Protection Électrique)',
        category: 'Protection Électrique',
        uSize: 2,
        powerWatts: 80,
        btu: 270,
        weightKg: 26.0,
        priceMad: 8500,
        color: '#15803d',
        badge: 'Autonomie 45 min',
        ports: 'Protège vos serveurs des coupures de courant et des surtensions Lydec/Amendis'
      },
      {
        id: 'pp-brassage-cat6',
        name: 'Panneau de Brassage Cat6 24 Ports RJ45',
        category: 'Câblage',
        uSize: 1,
        powerWatts: 0,
        btu: 0,
        weightKg: 1.6,
        priceMad: 1450,
        color: '#475569',
        badge: 'Câblage Organisé',
        ports: 'Repérage clair de chaque prise réseau du bureau'
      },
      {
        id: 'nvr-cameras-hikvision',
        name: 'Enregistreur Vidéosurveillance NVR IP 8 Caméras HD',
        category: 'Sécurité Locaux',
        uSize: 1,
        powerWatts: 50,
        btu: 170,
        weightKg: 3.2,
        priceMad: 8900,
        color: '#9333ea',
        badge: 'Vision Smartphone',
        ports: 'Enregistrement 30 jours et visionnage en direct depuis votre téléphone'
      },
      {
        id: 'passe-cable-organiseur',
        name: 'Passe-Câbles Horizontal avec Balai Antipoussière',
        category: 'Accessoire Baie',
        uSize: 1,
        powerWatts: 0,
        btu: 0,
        weightKg: 0.9,
        priceMad: 450,
        color: '#334155',
        badge: 'Finition Pro',
        ports: 'Fini les câbles emmêlés : baie propre et fermée à clé'
      }
    ];

    this.selectedItem = this.catalog[0];
    this.rackContainer = document.getElementById('rackSlotsContainer');
    this.initCatalogUI();
    this.loadPreset('pme-standard');
    this.bindEvents();
  }

  setRackSize(totalU) {
    this.totalU = totalU;
    this.slots = new Array(this.totalU).fill(null);
    if (totalU === 12) {
      this.loadPreset('tpe-compact');
    } else if (totalU === 24) {
      this.loadPreset('pme-standard');
    } else {
      this.loadPreset('grande-pme');
    }
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
          <span>${item.badge}</span>
          <span class="palette-price">${item.priceMad.toLocaleString()} MAD</span>
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

    if (presetType === 'tpe-compact') {
      // Coffret Mural 12U pour petite structure (5 à 15 postes)
      this.totalU = 12;
      this.slots = new Array(12).fill(null);
      this.placeItem(12, 'fw-fortigate-60f');
      this.placeItem(11, 'sw-cisco-poe-24');
      this.placeItem(10, 'pp-brassage-cat6');
      this.placeItem(9, 'passe-cable-organiseur');
      this.placeItem(8, 'nas-synology-pme');
      this.placeItem(2, 'ups-apc-smart-pme'); // 2U onduleur at bottom
    } else if (presetType === 'pme-standard') {
      // Baie d'étage 24U PME (15 à 50 postes avec serveur de gestion)
      this.totalU = 24;
      this.slots = new Array(24).fill(null);
      this.placeItem(24, 'fw-fortigate-60f');
      this.placeItem(23, 'sw-cisco-poe-24');
      this.placeItem(22, 'pp-brassage-cat6');
      this.placeItem(21, 'passe-cable-organiseur');
      this.placeItem(19, 'srv-dell-poweredge');
      this.placeItem(17, 'nas-synology-pme');
      this.placeItem(15, 'nvr-cameras-hikvision');
      this.placeItem(2, 'ups-apc-smart-pme');
    } else if (presetType === 'grande-pme') {
      // Baie 42U Entreprise / Usine / Clinique (50 à 150 postes)
      this.totalU = 42;
      this.slots = new Array(42).fill(null);
      this.placeItem(42, 'fw-fortigate-60f');
      this.placeItem(41, 'sw-cisco-poe-24');
      this.placeItem(40, 'sw-cisco-poe-24');
      this.placeItem(39, 'pp-brassage-cat6');
      this.placeItem(38, 'pp-brassage-cat6');
      this.placeItem(37, 'passe-cable-organiseur');
      this.placeItem(35, 'srv-dell-poweredge');
      this.placeItem(34, 'srv-dell-poweredge'); // 2ème serveur redondant
      this.placeItem(32, 'nas-synology-pme');
      this.placeItem(30, 'nvr-cameras-hikvision');
      this.placeItem(4, 'ups-apc-smart-pme');
      this.placeItem(2, 'ups-apc-smart-pme');
    } else if (presetType === 'clear') {
      this.slots.fill(null);
    }

    this.render();
    this.updateTelemetry();
  }

  canPlaceItem(topSlotU, item) {
    const topIdx = topSlotU - 1;
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
    let idx = this.totalU - 1;

    while (idx >= 0) {
      const uNumber = idx + 1;
      const slot = this.slots[idx];

      if (slot === null) {
        html += `
          <div class="rack-slot empty" data-u="${uNumber}">
            <span class="slot-number">${uNumber}U</span>
            <div class="slot-content">
              <span class="slot-placeholder">Emplacement libre (Cliquez pour ajouter ${this.selectedItem ? this.selectedItem.name : 'un équipement'})</span>
            </div>
            <button type="button" class="btn-slot-mount" title="Ajouter à cet emplacement">+</button>
          </div>
        `;
        idx--;
      } else {
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
                <span class="hardware-power">${slot.priceMad.toLocaleString()} MAD</span>
                <button type="button" class="btn-remove-slot" data-inst="${instId}" title="Retirer de la baie">&times;</button>
              </div>
            </div>
          </div>
        `;
        idx -= uSize;
      }
    }

    this.rackContainer.innerHTML = html;
    this.bindSlotActions();
  }

  bindSlotActions() {
    this.rackContainer.querySelectorAll('.rack-slot.empty').forEach(el => {
      el.addEventListener('click', () => {
        const uNumber = parseInt(el.dataset.u, 10);
        if (this.selectedItem) {
          const success = this.placeItem(uNumber, this.selectedItem.id);
          if (success) {
            this.render();
            this.updateTelemetry();
          } else {
            alert(`Espace insuffisant pour cet équipement de ${this.selectedItem.uSize}U à l'emplacement ${uNumber}U.`);
          }
        }
      });
    });

    this.rackContainer.querySelectorAll('.btn-remove-slot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instId = btn.dataset.inst;
        this.removeItem(instId);
      });
    });
  }

  bindEvents() {
    const btnTpe = document.getElementById('presetTpe');
    const btnPme = document.getElementById('presetPme');
    const btnGrande = document.getElementById('presetGrandePme');
    const btnClear = document.getElementById('presetClear');

    if (btnTpe) btnTpe.addEventListener('click', () => this.loadPreset('tpe-compact'));
    if (btnPme) btnPme.addEventListener('click', () => this.loadPreset('pme-standard'));
    if (btnGrande) btnGrande.addEventListener('click', () => this.loadPreset('grande-pme'));
    if (btnClear) btnClear.addEventListener('click', () => this.loadPreset('clear'));

    const btnExport = document.getElementById('btnExportRackBom');
    if (btnExport) btnExport.addEventListener('click', () => this.exportBomCsv());

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
    let totalWeight = 0;
    let totalCapex = 0;

    for (let i = 0; i < this.totalU; i++) {
      const slot = this.slots[i];
      if (slot) {
        occupiedU++;
        if (slot.isHead) {
          totalWatts += slot.powerWatts;
          totalWeight += slot.weightKg;
          totalCapex += slot.priceMad;
        }
      }
    }

    // Estimate employee capacity based on mounted switches and servers
    let recommendedPostes = '5 à 15 postes';
    if (this.totalU === 12) {
      recommendedPostes = '5 à 15 collaborateurs';
    } else if (this.totalU === 24) {
      recommendedPostes = '15 à 45 collaborateurs';
    } else {
      recommendedPostes = '50 à 150 collaborateurs';
    }

    // Autonomy calculation: APC Smart-UPS battery capacity
    const upsCount = this.getUniqueHardwareList().filter(i => i.id === 'ups-apc-smart-pme').reduce((a, c) => a + c.count, 0);
    let autonomieMin = 0;
    if (upsCount > 0) {
      // 1000VA battery ~ 30-45 mins for typical PME load of 300W
      const load = Math.max(100, totalWatts);
      autonomieMin = Math.round((upsCount * 12000) / load);
      if (autonomieMin > 120) autonomieMin = 120;
    }

    const pct = Math.round((occupiedU / this.totalU) * 100);

    // Update UI elements
    const uCountEl = document.getElementById('rackOccupiedU');
    const uPercentEl = document.getElementById('rackOccupiedPercent');
    const uBarEl = document.getElementById('rackOccupancyBar');
    const wattsEl = document.getElementById('rackTotalWatts');
    const postesEl = document.getElementById('rackPostesRecommandes');
    const autoEl = document.getElementById('rackAutonomieSecours');
    const capexEl = document.getElementById('rackTotalCapex');

    if (uCountEl) uCountEl.textContent = `${occupiedU} / ${this.totalU}U occupés`;
    if (uPercentEl) uPercentEl.textContent = `${pct}% Rempli`;
    if (uBarEl) uBarEl.style.width = `${pct}%`;
    if (wattsEl) wattsEl.textContent = `${totalWatts} W (Très économique)`;
    if (postesEl) postesEl.textContent = recommendedPostes;
    if (autoEl) autoEl.textContent = upsCount > 0 ? `~${autonomieMin} min d'autonomie sans coupure` : 'Aucun onduleur (Risque de coupure)';
    if (capexEl) {
      capexEl.textContent = `${totalCapex.toLocaleString()} MAD HT`;
    }
  }

  exportBomCsv() {
    const list = this.getUniqueHardwareList();
    if (list.length === 0) {
      alert('Votre baie est actuellement vide. Choisissez un pack ou ajoutez du matériel.');
      return;
    }

    let csv = 'Désignation Matériel,Catégorie,Format (U),Quantité,Garantie,Prix Unitaire (MAD HT),Total (MAD HT)\n';
    let totalSum = 0;

    list.forEach(item => {
      const sub = item.priceMad * item.count;
      totalSum += sub;
      csv += `"${item.name}","${item.category}","${item.uSize}U",${item.count},"3 Ans Sur Site",${item.priceMad},${sub}\n`;
    });
    csv += `\n"TOTAL ESTIMATIF MATÉRIEL","","","",,"",${totalSum}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Devis_Baie_Informatique_PME_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Global initialization
window.RackBuilder = RackBuilder;
