/**
 * Synapse Infrastructure — Canvas Live Network Packet Flow & Failover Visualizer
 * High-performance 120fps hardware-accelerated 2D canvas simulation.
 */

class NetworkVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mode = 'normal'; // 'normal', 'failover', 'ddos'
    this.failedNodeId = null;
    this.particles = [];
    this.maxParticles = 65;
    this.telemetry = {
      throughput: 124.6,
      packetRate: 18.2,
      latency: 0.14,
      jitter: 0.02,
      activeLinks: 16,
      totalLinks: 16
    };
    this.animId = null;

    this.initNodes();
    this.initLinks();
    this.resize();
    this.bindEvents();
    this.start();
  }

  initNodes() {
    // Relative coordinates (0.0 to 1.0) for dynamic responsive canvas scaling
    this.nodes = [
      // Layer 0: WAN / ISPs
      { id: 'wan1', label: 'Tier-1 ISP A (100G)', layer: 0, xRel: 0.22, yRel: 0.12, type: 'wan', status: 'online' },
      { id: 'wan2', label: 'Tier-1 ISP B (100G)', layer: 0, xRel: 0.78, yRel: 0.12, type: 'wan', status: 'online' },

      // Layer 1: Edge Next-Gen Firewalls (Active-Standby HA)
      { id: 'fw1', label: 'FortiGate 600F (Primary)', layer: 1, xRel: 0.35, yRel: 0.28, type: 'firewall', status: 'online' },
      { id: 'fw2', label: 'FortiGate 600F (HA Backup)', layer: 1, xRel: 0.65, yRel: 0.28, type: 'firewall', status: 'standby' },

      // Layer 2: Core Spine Switches (400G / 100G Fabric)
      { id: 'spine1', label: 'Arista 7050X3 Spine-01', layer: 2, xRel: 0.32, yRel: 0.48, type: 'spine', status: 'online' },
      { id: 'spine2', label: 'Arista 7050X3 Spine-02', layer: 2, xRel: 0.68, yRel: 0.48, type: 'spine', status: 'online' },

      // Layer 3: Top-of-Rack Leaf Switches
      { id: 'leaf1', label: 'Leaf-01 (Compute A)', layer: 3, xRel: 0.18, yRel: 0.68, type: 'leaf', status: 'online' },
      { id: 'leaf2', label: 'Leaf-02 (Compute B)', layer: 3, xRel: 0.39, yRel: 0.68, type: 'leaf', status: 'online' },
      { id: 'leaf3', label: 'Leaf-03 (GPU / AI)', layer: 3, xRel: 0.61, yRel: 0.68, type: 'leaf', status: 'online' },
      { id: 'leaf4', label: 'Leaf-04 (Storage SAN)', layer: 3, xRel: 0.82, yRel: 0.68, type: 'leaf', status: 'online' },

      // Layer 4: Enterprise Workloads & All-Flash Storage
      { id: 'srv1', label: 'Dell R760 Host A', layer: 4, xRel: 0.18, yRel: 0.88, type: 'server', status: 'online' },
      { id: 'srv2', label: 'Dell R760 Host B', layer: 4, xRel: 0.39, yRel: 0.88, type: 'server', status: 'online' },
      { id: 'ai1', label: 'HGX H100 8-GPU Node', layer: 4, xRel: 0.61, yRel: 0.88, type: 'ai', status: 'online' },
      { id: 'san1', label: 'TrueNAS NVMe SAN', layer: 4, xRel: 0.82, yRel: 0.88, type: 'storage', status: 'online' }
    ];
  }

  initLinks() {
    this.links = [
      // WAN to Firewalls
      { from: 'wan1', to: 'fw1' },
      { from: 'wan1', to: 'fw2' },
      { from: 'wan2', to: 'fw1' },
      { from: 'wan2', to: 'fw2' },

      // Firewalls to Spines
      { from: 'fw1', to: 'spine1' },
      { from: 'fw1', to: 'spine2' },
      { from: 'fw2', to: 'spine1' },
      { from: 'fw2', to: 'spine2' },

      // Spine to Leaf Matrix (Full Bipartite Mesh)
      { from: 'spine1', to: 'leaf1' },
      { from: 'spine1', to: 'leaf2' },
      { from: 'spine1', to: 'leaf3' },
      { from: 'spine1', to: 'leaf4' },
      { from: 'spine2', to: 'leaf1' },
      { from: 'spine2', to: 'leaf2' },
      { from: 'spine2', to: 'leaf3' },
      { from: 'spine2', to: 'leaf4' },

      // Leaf to Endpoints
      { from: 'leaf1', to: 'srv1' },
      { from: 'leaf2', to: 'srv2' },
      { from: 'leaf3', to: 'ai1' },
      { from: 'leaf4', to: 'san1' }
    ];
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = Math.max(520, Math.min(680, window.innerHeight * 0.7));

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

    // Scenario Mode Buttons
    const btnNormal = document.getElementById('btnNetNormal');
    const btnFailover = document.getElementById('btnNetFailover');
    const btnDdos = document.getElementById('btnNetDdos');

    if (btnNormal) {
      btnNormal.addEventListener('click', () => this.setMode('normal'));
    }
    if (btnFailover) {
      btnFailover.addEventListener('click', () => this.setMode('failover'));
    }
    if (btnDdos) {
      btnDdos.addEventListener('click', () => this.setMode('ddos'));
    }

    // Interactive canvas click to fail/recover a node
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const node of this.nodes) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 22) {
          this.toggleNodeFailure(node.id);
          break;
        }
      }
    });
  }

  setMode(mode) {
    this.mode = mode;
    const buttons = [
      { id: 'btnNetNormal', mode: 'normal' },
      { id: 'btnNetFailover', mode: 'failover' },
      { id: 'btnNetDdos', mode: 'ddos' }
    ];
    buttons.forEach(b => {
      const el = document.getElementById(b.id);
      if (el) {
        if (b.mode === mode) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    const statusBanner = document.getElementById('netStatusBanner');
    if (mode === 'normal') {
      this.failedNodeId = null;
      this.nodes.forEach(n => {
        n.status = (n.id === 'fw2') ? 'standby' : 'online';
      });
      this.telemetry.throughput = 124.6;
      this.telemetry.latency = 0.14;
      this.telemetry.jitter = 0.02;
      this.telemetry.activeLinks = 16;
      this.maxParticles = 65;
      if (statusBanner) {
        statusBanner.innerHTML = `<span class="badge-status-dot online"></span> Fabric Healthy: 100GbE Spine-Leaf Active (0 Dropped Packets)`;
      }
    } else if (mode === 'failover') {
      this.failedNodeId = 'spine1';
      const node = this.nodes.find(n => n.id === 'spine1');
      if (node) node.status = 'failed';
      this.telemetry.throughput = 98.2;
      this.telemetry.latency = 0.22;
      this.telemetry.jitter = 0.05;
      this.telemetry.activeLinks = 12;
      this.maxParticles = 50;
      if (statusBanner) {
        statusBanner.innerHTML = `<span class="badge-status-dot warning"></span> Automated Failover Active: Spine-01 offline -> All traffic rerouted to Spine-02 in 8ms`;
      }
    } else if (mode === 'ddos') {
      this.failedNodeId = null;
      this.nodes.forEach(n => {
        n.status = (n.id === 'fw2') ? 'active-filtering' : 'online';
      });
      this.telemetry.throughput = 340.8;
      this.telemetry.latency = 0.48;
      this.telemetry.jitter = 0.12;
      this.telemetry.activeLinks = 16;
      this.maxParticles = 120;
      if (statusBanner) {
        statusBanner.innerHTML = `<span class="badge-status-dot alert"></span> DDoS Scrubbing Active: 216 Gbps syn-flood scrubbed at edge; internal fabric pristine`;
      }
    }
  }

  toggleNodeFailure(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (!node || node.type === 'wan') return;

    if (node.status === 'failed') {
      node.status = 'online';
      if (this.failedNodeId === nodeId) this.failedNodeId = null;
    } else {
      node.status = 'failed';
      this.failedNodeId = nodeId;
    }

    // Recalculate link count
    const active = this.links.filter(l => {
      const fromN = this.nodes.find(n => n.id === l.from);
      const toN = this.nodes.find(n => n.id === l.to);
      return fromN.status !== 'failed' && toN.status !== 'failed';
    }).length;
    this.telemetry.activeLinks = active;
  }

  createParticle() {
    // Pick a valid active path
    const validLinks = this.links.filter(l => {
      const fromN = this.nodes.find(n => n.id === l.from);
      const toN = this.nodes.find(n => n.id === l.to);
      return fromN && toN && fromN.status !== 'failed' && toN.status !== 'failed';
    });

    if (validLinks.length === 0) return null;
    const link = validLinks[Math.floor(Math.random() * validLinks.length)];
    const fromNode = this.nodes.find(n => n.id === link.from);
    const toNode = this.nodes.find(n => n.id === link.to);

    let color = '#00e5ff'; // Cyan default
    let size = 2.2;
    let speed = 0.008 + Math.random() * 0.007;

    if (this.mode === 'ddos' && Math.random() > 0.4) {
      color = '#ef4444'; // Red attack packet
      speed = 0.015 + Math.random() * 0.01;
      size = 3.0;
    } else if (toNode.type === 'storage' || fromNode.type === 'storage') {
      color = '#f59e0b'; // Gold NVMe-oF packet
    } else if (toNode.type === 'ai' || fromNode.type === 'ai') {
      color = '#a855f7'; // Violet AI / GPU packet
    }

    return {
      from: fromNode,
      to: toNode,
      progress: 0,
      speed: speed,
      color: color,
      size: size
    };
  }

  updateTelemetryHUD() {
    const tpEl = document.getElementById('hudThroughput');
    const prEl = document.getElementById('hudPacketRate');
    const latEl = document.getElementById('hudLatency');
    const linksEl = document.getElementById('hudActiveLinks');

    // Slight organic jitter
    const jitterFactor = (Math.random() - 0.5) * 0.4;
    const currentTp = (this.telemetry.throughput + jitterFactor).toFixed(1);
    const currentLat = (this.telemetry.latency + (Math.random() - 0.5) * 0.02).toFixed(2);

    if (tpEl) tpEl.textContent = `${currentTp} Gbps`;
    if (prEl) prEl.textContent = `${this.telemetry.packetRate} Mpps`;
    if (latEl) latEl.textContent = `${currentLat} ms`;
    if (linksEl) linksEl.textContent = `${this.telemetry.activeLinks} / ${this.telemetry.totalLinks}`;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Links
    this.links.forEach(link => {
      const fromNode = this.nodes.find(n => n.id === link.from);
      const toNode = this.nodes.find(n => n.id === link.to);
      if (!fromNode || !toNode) return;

      const isBroken = fromNode.status === 'failed' || toNode.status === 'failed';

      this.ctx.beginPath();
      this.ctx.moveTo(fromNode.x, fromNode.y);
      this.ctx.lineTo(toNode.x, toNode.y);

      if (isBroken) {
        this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([4, 4]);
      } else {
        this.ctx.strokeStyle = 'rgba(0, 229, 255, 0.18)';
        this.ctx.lineWidth = 1.5;
        this.ctx.setLineDash([]);
      }
      this.ctx.stroke();
    });

    // Reset dash
    this.ctx.setLineDash([]);

    // 2. Update & Draw Particles
    if (this.particles.length < this.maxParticles) {
      const newP = this.createParticle();
      if (newP) this.particles.push(newP);
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

      // Glow effect
      this.ctx.save();
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Draw Nodes
    this.nodes.forEach(node => {
      const isFailed = node.status === 'failed';
      const isStandby = node.status === 'standby';

      // Outer ring
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
      if (isFailed) {
        this.ctx.fillStyle = '#1e1014';
        this.ctx.strokeStyle = '#ef4444';
      } else if (isStandby) {
        this.ctx.fillStyle = '#0f172a';
        this.ctx.strokeStyle = '#64748b';
      } else {
        this.ctx.fillStyle = '#09131f';
        this.ctx.strokeStyle = '#00e5ff';
      }
      this.ctx.lineWidth = 2;
      this.ctx.fill();
      this.ctx.stroke();

      // Inner pulsating core
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = isFailed ? '#ef4444' : (isStandby ? '#94a3b8' : '#00ff88');
      this.ctx.fill();

      // Node label
      this.ctx.font = '10px "JetBrains Mono", Consolas, monospace';
      this.ctx.fillStyle = isFailed ? '#f87171' : '#e2e8f0';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(node.label, node.x, node.y + 26);
    });
  }

  start() {
    let lastHud = 0;
    const loop = (timestamp) => {
      this.draw();
      if (timestamp - lastHud > 600) {
        this.updateTelemetryHUD();
        lastHud = timestamp;
      }
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
