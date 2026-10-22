/**
 * SYNAPSE IT MAROC — Simulateur Réseau & Continuité d'Activité PME
 * Visualise de manière simple et intuitive le réseau d'une entreprise marocaine :
 * Connexion Fibre, Pare-Feu VPN, Réseau des bureaux, Wi-Fi, Serveur Sage et Sauvegardes.
 */

class NetworkVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mode = 'normal'; // 'normal', 'failover', 'security'
    this.particles = [];
    this.maxParticles = 40;
    this.animId = null;

    this.initNodes();
    this.initLinks();
    this.resize();
    this.bindEvents();
    this.start();
  }

  initNodes() {
    this.nodes = [
      // Niveau 1: Connexions Internet
      { id: 'wan_fibre', label: 'Fibre Optique Pro (Maroc Telecom / Orange)', xRel: 0.28, yRel: 0.12, type: 'wan', status: 'online' },
      { id: 'wan_4g', label: 'Ligne 4G/5G de Secours (Backup)', xRel: 0.72, yRel: 0.12, type: 'wan', status: 'standby' },

      // Niveau 2: Pare-Feu & Routeur Sécurisé
      { id: 'firewall', label: 'Routeur Pare-Feu Fortinet (Anti-Virus & VPN)', xRel: 0.50, yRel: 0.32, type: 'firewall', status: 'online' },

      // Niveau 3: Switch Réseau Central
      { id: 'switch_central', label: 'Switch Réseau Baie (24 Ports Gigabit)', xRel: 0.50, yRel: 0.54, type: 'switch', status: 'online' },

      // Niveau 4: Les services & bureaux de votre entreprise
      { id: 'srv_sage', label: 'Serveur Gestion (Sage / ERP)', xRel: 0.15, yRel: 0.82, type: 'server', status: 'online' },
      { id: 'nas_backup', label: 'NAS Sauvegarde Sécurisée', xRel: 0.32, yRel: 0.82, type: 'nas', status: 'online' },
      { id: 'bureaux_pc', label: 'Postes Bureaux & Comptabilité', xRel: 0.50, yRel: 0.82, type: 'workstations', status: 'online' },
      { id: 'wifi_pro', label: 'Bornes Wi-Fi Pro Plafonnier', xRel: 0.68, yRel: 0.82, type: 'wifi', status: 'online' },
      { id: 'remote_vpn', label: 'Télétravail Sécurisé (Direction / Domicile)', xRel: 0.85, yRel: 0.82, type: 'remote', status: 'online' }
    ];
  }

  initLinks() {
    this.links = [
      // Internet vers Pare-feu
      { from: 'wan_fibre', to: 'firewall' },
      { from: 'wan_4g', to: 'firewall' },

      // Pare-feu vers Switch
      { from: 'firewall', to: 'switch_central' },

      // Switch vers les équipements du bureau
      { from: 'switch_central', to: 'srv_sage' },
      { from: 'switch_central', to: 'nas_backup' },
      { from: 'switch_central', to: 'bureaux_pc' },
      { from: 'switch_central', to: 'wifi_pro' },

      // Pare-feu direct vers Télétravail via tunnel VPN crypté
      { from: 'firewall', to: 'remote_vpn' }
    ];
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = Math.max(480, Math.min(600, window.innerHeight * 0.65));

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.updateNodePositions();
  }

  updateNodePositions() {
    this.nodes.forEach(node => {
      node.x = node.xRel * this.width;
      node.y = node.yRel * this.height;
    });
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    const btnNormal = document.getElementById('btnNetNormal');
    const btnFailover = document.getElementById('btnNetFailover');
    const btnSecurity = document.getElementById('btnNetSecurity');

    if (btnNormal) btnNormal.addEventListener('click', () => this.setMode('normal'));
    if (btnFailover) btnFailover.addEventListener('click', () => this.setMode('failover'));
    if (btnSecurity) btnSecurity.addEventListener('click', () => this.setMode('security'));
  }

  setMode(mode) {
    this.mode = mode;
    const buttons = [
      { id: 'btnNetNormal', mode: 'normal' },
      { id: 'btnNetFailover', mode: 'failover' },
      { id: 'btnNetSecurity', mode: 'security' }
    ];

    buttons.forEach(b => {
      const el = document.getElementById(b.id);
      if (el) {
        if (b.mode === mode) el.classList.add('active');
        else el.classList.remove('active');
      }
    });

    const statusBanner = document.getElementById('netStatusBanner');
    const wanFibre = this.nodes.find(n => n.id === 'wan_fibre');
    const wan4g = this.nodes.find(n => n.id === 'wan_4g');

    if (mode === 'normal') {
      if (wanFibre) wanFibre.status = 'online';
      if (wan4g) wan4g.status = 'standby';
      if (statusBanner) {
        statusBanner.innerHTML = `<span class="badge-status-dot online"></span> Réseau en ordre : Ligne Fibre principale active. Vitesse optimale et télétravail sécurisé.`;
      }
      this.updateHud(185, '100% Opérationnel', 'Zéro Coupure', 'Tous les postes connectés');
    } else if (mode === 'failover') {
      if (wanFibre) wanFibre.status = 'failed';
      if (wan4g) wan4g.status = 'online';
      if (statusBanner) {
        statusBanner.innerHTML = `<span class="badge-status-dot warning"></span> Coupure Fibre simulée : Le routeur a basculé automatiquement sur la 4G de secours. Aucun salarié déconnecté !`;
      }
      this.updateHud(45, 'Secours 4G Actif', 'Bascule en 2 secondes', 'Continuité d\'activité garantie');
    } else if (mode === 'security') {
      if (wanFibre) wanFibre.status = 'online';
      if (wan4g) wan4g.status = 'standby';
      if (statusBanner) {
        statusBanner.innerHTML = `<span class="badge-status-dot alert"></span> Alerte Sécurité interceptée : Le pare-feu Fortinet a bloqué une pièce jointe frauduleuse (Ransomware neutralisé).`;
      }
      this.updateHud(180, '1 Menace Neutralisée', 'Données Sauvegardées', 'Serveur Sage Protégé');
    }
  }

  updateHud(speedMbps, statusText, failoverText, detailText) {
    const spEl = document.getElementById('hudThroughput');
    const stEl = document.getElementById('hudPacketRate');
    const latEl = document.getElementById('hudLatency');
    const lnkEl = document.getElementById('hudActiveLinks');

    if (spEl) spEl.textContent = `${speedMbps} Mbps`;
    if (stEl) stEl.textContent = statusText;
    if (latEl) latEl.textContent = failoverText;
    if (lnkEl) lnkEl.textContent = detailText;
  }

  createParticle() {
    const activeLinks = this.links.filter(l => {
      const fromN = this.nodes.find(n => n.id === l.from);
      const toN = this.nodes.find(n => n.id === l.to);
      return fromN && toN && fromN.status !== 'failed' && toN.status !== 'failed';
    });

    if (activeLinks.length === 0) return null;
    const link = activeLinks[Math.floor(Math.random() * activeLinks.length)];
    const fromN = this.nodes.find(n => n.id === link.from);
    const toN = this.nodes.find(n => n.id === link.to);

    let color = '#00e5ff';
    let size = 2.5;

    if (toN.type === 'nas' || fromN.type === 'nas') {
      color = '#10b981'; // Sauvegarde verte
    } else if (toN.type === 'server' || fromN.type === 'server') {
      color = '#f59e0b'; // Serveur Sage doré
    } else if (this.mode === 'security' && (fromN.type === 'wan' || toN.type === 'firewall')) {
      color = '#ef4444'; // Menace rouge bloquée
    }

    return {
      from: fromN,
      to: toN,
      progress: 0,
      speed: 0.012 + Math.random() * 0.008,
      color: color,
      size: size
    };
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Dessiner les liaisons
    this.links.forEach(link => {
      const fromN = this.nodes.find(n => n.id === link.from);
      const toN = this.nodes.find(n => n.id === link.to);
      if (!fromN || !toN) return;

      const isBroken = fromN.status === 'failed' || toN.status === 'failed';
      const isStandby = fromN.status === 'standby' || toN.status === 'standby';

      this.ctx.beginPath();
      this.ctx.moveTo(fromN.x, fromN.y);
      this.ctx.lineTo(toN.x, toN.y);

      if (isBroken) {
        this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
        this.ctx.lineWidth = 1.5;
        this.ctx.setLineDash([4, 4]);
      } else if (isStandby) {
        this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([2, 4]);
      } else {
        this.ctx.strokeStyle = 'rgba(0, 229, 255, 0.22)';
        this.ctx.lineWidth = 1.8;
        this.ctx.setLineDash([]);
      }
      this.ctx.stroke();
    });

    this.ctx.setLineDash([]);

    // 2. Particules de flux de données
    if (this.particles.length < this.maxParticles) {
      const p = this.createParticle();
      if (p) this.particles.push(p);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.progress += p.speed;

      if (p.progress >= 1 || p.from.status === 'failed' || p.to.status === 'failed') {
        this.particles.splice(i, 1);
        continue;
      }

      const px = p.from.x + (p.to.x - p.from.x) * p.progress;
      const py = p.from.y + (p.to.y - p.from.y) * p.progress;

      this.ctx.save();
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Dessiner les nœuds d'équipements
    this.nodes.forEach(node => {
      const isFailed = node.status === 'failed';
      const isStandby = node.status === 'standby';

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);

      if (isFailed) {
        this.ctx.fillStyle = '#2d1217';
        this.ctx.strokeStyle = '#ef4444';
      } else if (isStandby) {
        this.ctx.fillStyle = '#0f172a';
        this.ctx.strokeStyle = '#64748b';
      } else {
        this.ctx.fillStyle = '#0a1424';
        this.ctx.strokeStyle = '#00e5ff';
      }

      this.ctx.lineWidth = 2;
      this.ctx.fill();
      this.ctx.stroke();

      // Cœur lumineux
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
      this.ctx.fillStyle = isFailed ? '#ef4444' : (isStandby ? '#94a3b8' : '#10b981');
      this.ctx.fill();

      // Texte explicatif clair
      this.ctx.font = '11px "Inter", sans-serif';
      this.ctx.fillStyle = isFailed ? '#fca5a5' : '#e2e8f0';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.label, node.x, node.y + 28);
    });
  }

  start() {
    const loop = () => {
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

// Global initialization
window.NetworkVisualizer = NetworkVisualizer;
