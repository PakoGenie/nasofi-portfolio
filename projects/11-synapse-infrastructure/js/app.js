/**
 * SYNAPSE IT MAROC — Contrôleur Principal PME
 * Gestion du catalogue matériel, panier devis (BOM), devis en Dirhams (MAD),
 * assistance technique d'urgence et navigation.
 */

class SynapseApp {
  constructor() {
    this.currency = 'MAD';
    this.currencyRate = 1.0;
    this.currencySymbol = 'MAD ';
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
        id: 'cat-dell-r350',
        name: 'Serveur d\'Entreprise Dell PowerEdge R350 Rack',
        category: 'servers',
        categoryLabel: 'Serveurs & Gestion',
        desc: 'Le serveur fiable par excellence pour héberger vos logiciels de gestion (Sage, Odoo, logiciels comptables, paie) et partager vos dossiers d\'équipe en toute sécurité.',
        priceMad: 24500,
        leadTime: 'En stock à Casablanca (Livré & Installé sous 48h)',
        img: 'assets/server-poweredge.jpg',
        specs: ['Intel Xeon E-2336 6-Cœurs', '64 Go RAM ECC extensible', '4x Disques SAS 2.4 To en miroir RAID', 'Garantie 3 ans Dell ProSupport sur site']
      },
      {
        id: 'cat-cisco-switch-24',
        name: 'Switch 24 Ports Gigabit PoE+ Cisco Business',
        category: 'networking',
        categoryLabel: 'Réseau & Switchs',
        desc: 'Relie tous les ordinateurs, imprimantes et téléphones de votre entreprise avec un débit Gigabit ultra-rapide. Alimente directement les bornes Wi-Fi et les caméras.',
        priceMad: 12500,
        leadTime: 'En stock',
        img: 'assets/switch-arista.jpg',
        specs: ['24 Ports Gigabit 1000 Mbps', 'Alimentation PoE+ intégrée (370W)', 'Silencieux et basse consommation', 'Garantie à vie Cisco']
      },
      {
        id: 'cat-fortigate-60f',
        name: 'Pare-Feu & Routeur VPN Fortinet FortiGate 60F',
        category: 'networking',
        categoryLabel: 'Sécurité & Télétravail',
        desc: 'La sécurité informatique indispensable pour toute PME : bloque les attaques de pirates, filtre les sites dangereux et permet aux dirigeants de télétravailler en toute sécurité.',
        priceMad: 9800,
        leadTime: 'En stock',
        img: 'assets/firewall-fortinet.jpg',
        specs: ['Télétravail VPN sécurisé inclus', 'Anti-Ransomware & Anti-Virus réseau', 'Priorité pour les réunions Teams/Zoom', 'Support technique réactif']
      },
      {
        id: 'cat-synology-ds923',
        name: 'Serveur NAS Synology 4 Baies (Sauvegarde Anti-Piratage)',
        category: 'storage',
        categoryLabel: 'Sauvegarde & NAS',
        desc: 'Sauvegarde automatiquement chaque soir tous les ordinateurs de votre entreprise. En cas de panne de PC ou de virus, retrouvez tous vos dossiers en 2 clics.',
        priceMad: 14200,
        leadTime: 'Pré-configuré prêt à l\'emploi',
        img: 'assets/storage-san-truenas.jpg',
        specs: ['4x Disques durs Western Digital Red Pro', 'Instantanés immuables anti-ransomware', 'Accès fichiers sécurisé à distance', 'Configuration clé en main incluse']
      },
      {
        id: 'cat-unifi-wifi6-pack',
        name: 'Pack 3 Bornes Wi-Fi Pro Plafonnier Ubiquiti UniFi 6',
        category: 'networking',
        categoryLabel: 'Wi-Fi Professionnel',
        desc: 'Fini le Wi-Fi qui coupe quand vous changez de bureau ! Couverture sans fil puissante et continue dans tous vos locaux, salles de réunion et entrepôts.',
        priceMad: 5800,
        leadTime: 'En stock',
        img: 'assets/fiber-patch-panel.jpg',
        specs: ['Technologie Wi-Fi 6 ultra-rapide', 'Réseau Invité sécurisé séparé', 'Plus de 150 smartphones & PC simultanés', 'Design discret au plafond']
      },
      {
        id: 'cat-apc-smartups-1500',
        name: 'Onduleur Parafoudre APC Smart-UPS 1500VA LCD',
        category: 'power',
        categoryLabel: 'Protection Électrique',
        desc: 'Protège votre serveur et votre connexion contre les coupures d\'électricité et les variations de tension. Vos salariés continuent de travailler sans perdre leurs devis.',
        priceMad: 8500,
        leadTime: 'En stock',
        img: 'assets/ups-apc.jpg',
        specs: ['Autonomie 45 minutes sur coupure', 'Régulateur de tension automatique (AVR)', 'Écran LCD avec état de batterie', 'Prises protégées parafoudre']
      },
      {
        id: 'cat-cablage-cat6-pack',
        name: 'Pack Câblage Réseau Cat6 Cuivre & Prises Murales Pro',
        category: 'cabling',
        categoryLabel: 'Câblage & Prises',
        desc: 'Installation et tirage de câbles réseau Cat6 certifiés 1 Giga/s. Finition esthétique en goulottes, plastrons muraux et certification de chaque prise avec rapport Fluke.',
        priceMad: 4200,
        leadTime: 'Intervention sur site',
        img: 'assets/cabling-datacenter.jpg',
        specs: ['Câble 100% Cuivre Cat6 blindé', 'Prises RJ45 Legrand / Panduit', 'Repérage numéroté pour chaque bureau', 'Zéro câble qui traîne au sol']
      },
      {
        id: 'cat-cameras-nvr-hikvision',
        name: 'Kit 8 Caméras IP Haute Définition + Enregistreur NVR',
        category: 'power',
        categoryLabel: 'Sécurité des Locaux',
        desc: 'Surveillez vos bureaux, caisses et entrepôts en direct sur votre smartphone (iPhone & Android). Vision nocturne nette et enregistrement automatique 30 jours.',
        priceMad: 8900,
        leadTime: 'En stock',
        img: 'assets/noc-center.jpg',
        specs: ['8 Caméras dôme/tube IP Full HD', 'Vision nocturne infrarouge 30m', 'Application smartphone gratuite', 'Enregistreur avec disque dur 4 To inclus']
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
              <span class="price-label">Prix Matériel Certifié</span>
              <span class="price-val">${this.formatPrice(item.priceMad)}</span>
            </div>
            <button type="button" class="btn-primary btn-add-bom" data-id="${item.id}">
              <span>Ajouter au Devis</span>
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
          btn.textContent = '✓ Ajouté au Devis';
          setTimeout(() => {
            btn.innerHTML = '<span>Ajouter au Devis</span>';
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
    const srv = this.catalogData.find(c => c.id === 'cat-dell-r350');
    const sw = this.catalogData.find(c => c.id === 'cat-cisco-switch-24');
    const fw = this.catalogData.find(c => c.id === 'cat-fortigate-60f');

    if (srv) this.bomItems.push({ item: srv, quantity: 1 });
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
          priceMad: product.priceMad || 0,
          category: product.category || 'Matériel'
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
            <p>Votre devis est actuellement vide.</p>
            <span>Sélectionnez du matériel dans le catalogue ou utilisez le configurateur de baie ci-dessus.</span>
          </div>
        `;
      } else {
        tableBody.innerHTML = this.bomItems.map(entry => `
          <div class="bom-line-item">
            <div class="bom-line-info">
              <span class="bom-line-title">${entry.item.name}</span>
              <span class="bom-line-rate">${this.formatPrice(entry.item.priceMad)} l'unité</span>
            </div>
            <div class="bom-line-qty">
              <button type="button" class="btn-qty-minus" data-id="${entry.item.id}">-</button>
              <span class="qty-display">${entry.quantity}</span>
              <button type="button" class="btn-qty-plus" data-id="${entry.item.id}">+</button>
            </div>
            <div class="bom-line-subtotal">
              ${this.formatPrice(entry.item.priceMad * entry.quantity)}
            </div>
            <button type="button" class="btn-remove-line" data-id="${entry.item.id}" title="Retirer">&times;</button>
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

    const hardwareSubtotal = this.bomItems.reduce((acc, curr) => acc + (curr.item.priceMad * curr.quantity), 0);
    
    // Services optionnels d'installation
    const optDeploy = document.getElementById('bomOptDeploy');
    const optCabling = document.getElementById('bomOptCabling');
    const optSla = document.getElementById('bomOptSla');

    let laborTotal = 0;
    if (optDeploy && optDeploy.checked) laborTotal += 2500;
    if (optCabling && optCabling.checked) laborTotal += 1800;
    if (optSla && optSla.checked) laborTotal += Math.round(hardwareSubtotal * 0.15);

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

    ['bomOptDeploy', 'bomOptCabling', 'bomOptSla'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => this.updateBomUI());
    });

    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) dialog.close();
      });
    }

    const rfqForm = document.getElementById('bomRfqForm');
    if (rfqForm) {
      rfqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const refNumber = 'DEV-SYN-' + Math.floor(10000 + Math.random() * 90000);
        alert(`Votre demande de devis est enregistrée avec succès !\n\nRéférence : ${refNumber}\nUn technicien conseil vous contacte sous 2 heures ouvrées pour convenir d'une visite technique gratuite dans vos locaux.`);
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
        if (!isInDialog) dialog.close();
      });
    }

    const nocForm = document.getElementById('nocTicketForm');
    if (nocForm) {
      nocForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Demande d'intervention urgente reçue !\n\nNotre équipe technique de permanence a été notifiée immédiatement. Un technicien vous rappelle dans les 10 minutes.`);
        if (dialog) dialog.close();
      });
    }
  }

  initCurrencySwitcher() {
    const select = document.getElementById('currencySelector');
    if (!select) return;

    select.addEventListener('change', () => {
      const val = select.value;
      this.currency = val;

      if (val === 'MAD') {
        this.currencyRate = 1.0;
        this.currencySymbol = 'MAD ';
      } else if (val === 'EUR') {
        this.currencyRate = 0.092; // 1 MAD = 0.092 EUR
        this.currencySymbol = '€';
      } else if (val === 'USD') {
        this.currencyRate = 0.098; // 1 MAD = 0.098 USD
        this.currencySymbol = '$';
      }

      this.renderCatalog(document.querySelector('.filter-tab-btn.active')?.dataset.filter || 'all');
      this.updateBomUI();
      if (window.rackBuilderInstance) {
        window.rackBuilderInstance.updateTelemetry();
      }
    });
  }

  formatPrice(madAmount) {
    if (this.currency === 'MAD') {
      return `${Math.round(madAmount).toLocaleString()} MAD HT`;
    }
    const converted = Math.round(madAmount * this.currencyRate);
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

// Bootstrap
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
