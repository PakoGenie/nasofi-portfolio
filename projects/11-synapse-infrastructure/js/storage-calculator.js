/**
 * Synapse Infrastructure — Enterprise Storage (NAS/SAN) IOPS & Capacity Sizer
 * Simulates enterprise flash/SAS arrays, RAID/ZFS topologies, and data reduction ratios.
 */

class StorageCalculator {
  constructor() {
    this.driveCountInput = document.getElementById('storageDriveCount');
    this.driveTypeSelect = document.getElementById('storageDriveType');
    this.raidSelect = document.getElementById('storageRaidType');
    this.dedupeSlider = document.getElementById('storageDedupeRatio');
    this.dedupeValDisplay = document.getElementById('storageDedupeVal');

    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    if (this.driveCountInput) {
      this.driveCountInput.addEventListener('input', () => this.calculate());
    }
    if (this.driveTypeSelect) {
      this.driveTypeSelect.addEventListener('change', () => this.calculate());
    }
    if (this.raidSelect) {
      this.raidSelect.addEventListener('change', () => this.calculate());
    }
    if (this.dedupeSlider) {
      this.dedupeSlider.addEventListener('input', () => {
        if (this.dedupeValDisplay) {
          this.dedupeValDisplay.textContent = `${parseFloat(this.dedupeSlider.value).toFixed(1)}x`;
        }
        this.calculate();
      });
    }

    // Quick drive count presets
    document.querySelectorAll('.btn-storage-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-storage-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const count = parseInt(btn.dataset.drives, 10);
        if (this.driveCountInput) {
          this.driveCountInput.value = count;
          this.calculate();
        }
      });
    });
  }

  calculate() {
    const numDrives = parseInt(this.driveCountInput ? this.driveCountInput.value : 24, 10);
    const driveType = this.driveTypeSelect ? this.driveTypeSelect.value : 'nvme-7.68';
    const raidType = this.raidSelect ? this.raidSelect.value : 'raid6';
    const dedupeRatio = parseFloat(this.dedupeSlider ? this.dedupeSlider.value : 1.8);

    // Drive specs
    let driveCapacityTB = 7.68;
    let driveReadIOPS = 120000;
    let driveWriteIOPS = 65000;
    let driveSpeedMB = 6800; // Gen4 NVMe sequential
    let isNvme = true;

    if (driveType === 'nvme-3.84') {
      driveCapacityTB = 3.84;
      driveReadIOPS = 100000;
      driveWriteIOPS = 55000;
      driveSpeedMB = 6500;
    } else if (driveType === 'nvme-7.68') {
      driveCapacityTB = 7.68;
      driveReadIOPS = 125000;
      driveWriteIOPS = 70000;
      driveSpeedMB = 7000;
    } else if (driveType === 'nvme-15.36') {
      driveCapacityTB = 15.36;
      driveReadIOPS = 140000;
      driveWriteIOPS = 80000;
      driveSpeedMB = 7200;
    } else if (driveType === 'sas-hdd-22') {
      driveCapacityTB = 22.0;
      driveReadIOPS = 450;
      driveWriteIOPS = 400;
      driveSpeedMB = 280;
      isNvme = false;
    }

    // Raw capacity
    const rawTB = numDrives * driveCapacityTB;

    // Usable capacity based on RAID topology
    let usableDrives = numDrives;
    let faultToleranceText = '2 Drives (Dual Parity)';
    let writePenalty = 6; // RAID 6 write penalty

    if (raidType === 'raid10') {
      usableDrives = numDrives / 2;
      faultToleranceText = '1 Drive per mirror pair (Up to 50% of array)';
      writePenalty = 2;
    } else if (raidType === 'raid6' || raidType === 'raidz2') {
      usableDrives = Math.max(1, numDrives - 2);
      faultToleranceText = 'Any 2 simultaneous drive failures';
      writePenalty = 6;
    } else if (raidType === 'raid60') {
      // 2 parity drives per 12-drive set
      const sets = Math.max(2, Math.floor(numDrives / 12));
      usableDrives = Math.max(1, numDrives - (sets * 2));
      faultToleranceText = '2 Drives per sub-array (Up to 4 drives total)';
      writePenalty = 6;
    }

    const usableTB = usableDrives * driveCapacityTB;
    const effectiveTB = usableTB * dedupeRatio;

    // IOPS calculations
    let totalReadIOPS = 0;
    let totalWriteIOPS = 0;
    let totalThroughputGB = 0;

    if (isNvme) {
      // Bus/Controller saturations
      const controllerLimitIOPS = 2800000; // Dual 100GbE RoCE / NVMe-oF limit
      const rawTotalRead = numDrives * driveReadIOPS;
      totalReadIOPS = Math.min(controllerLimitIOPS, Math.round(rawTotalRead * 0.85));

      const rawTotalWrite = (numDrives * driveWriteIOPS) / writePenalty;
      totalWriteIOPS = Math.min(1800000, Math.round(rawTotalWrite * 0.8));

      // 100GbE / PCIe Gen4 backbone limits throughput to ~48 GB/s
      totalThroughputGB = Math.min(48.5, ((usableDrives * driveSpeedMB) / 1000) * 0.75);
    } else {
      // SAS HDD calculations
      totalReadIOPS = Math.round(numDrives * driveReadIOPS * 0.9);
      totalWriteIOPS = Math.round((numDrives * driveWriteIOPS) / writePenalty);
      totalThroughputGB = Math.min(6.2, ((usableDrives * driveSpeedMB) / 1000) * 0.8);
    }

    // Format TB vs PB
    const formatCap = (tb) => {
      if (tb >= 1000) {
        return `${(tb / 1000).toFixed(2)} PB`;
      }
      return `${tb.toFixed(1)} TB`;
    };

    // Update DOM
    const rawEl = document.getElementById('storageRawCap');
    const usableEl = document.getElementById('storageUsableCap');
    const effEl = document.getElementById('storageEffectiveCap');
    const readIopsEl = document.getElementById('storageReadIOPS');
    const writeIopsEl = document.getElementById('storageWriteIOPS');
    const tpEl = document.getElementById('storageThroughput');
    const faultEl = document.getElementById('storageFaultTolerance');

    if (rawEl) rawEl.textContent = formatCap(rawTB);
    if (usableEl) usableEl.textContent = formatCap(usableTB);
    if (effEl) effEl.textContent = formatCap(effectiveTB);
    if (readIopsEl) readIopsEl.textContent = `${totalReadIOPS.toLocaleString()} IOPS`;
    if (writeIopsEl) writeIopsEl.textContent = `${totalWriteIOPS.toLocaleString()} IOPS`;
    if (tpEl) tpEl.textContent = `${totalThroughputGB.toFixed(1)} GB/s`;
    if (faultEl) faultEl.textContent = faultToleranceText;
  }
}

// Global initialization
window.StorageCalculator = StorageCalculator;
