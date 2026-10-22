/**
 * SYNAPSE IT MAROC — Simulateur de Sauvegarde & Sécurité Anti-Ransomware PME
 * Calcule simplement la capacité de stockage NAS nécessaire, le niveau de protection et le budget.
 */

class StorageCalculator {
  constructor() {
    this.postesInput = document.getElementById('storageDriveCount');
    this.dataTypeSelect = document.getElementById('storageDriveType');
    this.protectionSelect = document.getElementById('storageRaidType');
    this.retentionSlider = document.getElementById('storageDedupeRatio');
    this.retentionValDisplay = document.getElementById('storageDedupeVal');

    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    if (this.postesInput) {
      this.postesInput.addEventListener('input', () => this.calculate());
    }
    if (this.dataTypeSelect) {
      this.dataTypeSelect.addEventListener('change', () => this.calculate());
    }
    if (this.protectionSelect) {
      this.protectionSelect.addEventListener('change', () => this.calculate());
    }
    if (this.retentionSlider) {
      this.retentionSlider.addEventListener('input', () => {
        if (this.retentionValDisplay) {
          const v = parseInt(this.retentionSlider.value, 10);
          this.retentionValDisplay.textContent = `${v} Jours d'historique`;
        }
        this.calculate();
      });
    }

    // Quick employee presets
    document.querySelectorAll('.btn-storage-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-storage-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const count = parseInt(btn.dataset.drives, 10);
        if (this.postesInput) {
          this.postesInput.value = count;
          this.calculate();
        }
      });
    });
  }

  calculate() {
    const nbPostes = parseInt(this.postesInput ? this.postesInput.value : 15, 10);
    const dataType = this.dataTypeSelect ? this.dataTypeSelect.value : 'office';
    const protectionLevel = this.protectionSelect ? this.protectionSelect.value : 'raid1';
    const retentionDays = parseInt(this.retentionSlider ? this.retentionSlider.value : 30, 10);

    // Estimation du volume moyen de données par poste
    let gbPerPoste = 80; // Bureautique standard (Word, Excel, Devis, Factures, Sage)
    let typeDescription = 'Documents bureautiques & comptables légers';

    if (dataType === 'office') {
      gbPerPoste = 90;
      typeDescription = 'Fichiers Word, Excel, PDF, Devis, Factures et bases Sage/ERP';
    } else if (dataType === 'plans') {
      gbPerPoste = 350;
      typeDescription = 'Plans d\'architectes, fichiers AutoCAD, photos de chantiers et gros PDF';
    } else if (dataType === 'medical') {
      gbPerPoste = 220;
      typeDescription = 'Dossiers patients, imageries médicales, fiches de consultation et ordonnances';
    } else if (dataType === 'creative') {
      gbPerPoste = 600;
      typeDescription = 'Fichiers graphiques Photoshop/Illustrator, vidéos de communication et catalogues';
    }

    const volumeBrutTB = (nbPostes * gbPerPoste * (1 + (retentionDays / 90))) / 1000;
    
    // Déterminer la taille utile recommandée (ex: 4 To, 8 To, 16 To, 32 To)
    let capaciteUtileTB = 4;
    let nbDisques = 2;
    let modeleNAS = 'NAS Synology 2 Baies (DS224+)';
    let prixEstimeMAD = 8900;

    if (volumeBrutTB <= 3.5) {
      capaciteUtileTB = 4;
      nbDisques = 2;
      modeleNAS = 'NAS Synology 2 Baies (DS224+)';
      prixEstimeMAD = 8900;
    } else if (volumeBrutTB <= 7.5) {
      capaciteUtileTB = 8;
      nbDisques = 4;
      modeleNAS = 'NAS Synology 4 Baies (DS923+)';
      prixEstimeMAD = 14500;
    } else if (volumeBrutTB <= 14) {
      capaciteUtileTB = 16;
      nbDisques = 4;
      modeleNAS = 'NAS Synology 4 Baies Pro (DS1522+)';
      prixEstimeMAD = 19800;
    } else {
      capaciteUtileTB = 32;
      nbDisques = 6;
      modeleNAS = 'NAS Synology Rack Pro (RS1221+)';
      prixEstimeMAD = 34000;
    }

    let garantieSecurite = 'Protection standard : Disques en miroir RAID 1 (zéro perte si 1 disque casse)';
    let repriseActivite = '< 30 minutes';

    if (protectionLevel === 'raid1') {
      garantieSecurite = 'Double disque miroir : Vos données continuent d\'exister sur le 2ème disque si le 1er casse.';
      repriseActivite = '< 30 minutes';
    } else if (protectionLevel === 'anti-ransomware') {
      garantieSecurite = 'Protection Anti-Ransomware : Instantanés immuables verrouillés. Les virus ne peuvent pas crypter vos sauvegardes.';
      repriseActivite = '< 15 minutes';
      prixEstimeMAD += 2500;
    } else if (protectionLevel === 'cloud-hybrid') {
      garantieSecurite = 'Protection Maximale 3-2-1 : Sauvegarde locale dans vos bureaux + Copie externe chiffrée sur le Cloud Marocain.';
      repriseActivite = '< 10 minutes';
      prixEstimeMAD += 4800;
    }

    // Mise à jour de l'affichage
    const rawEl = document.getElementById('storageRawCap');
    const usableEl = document.getElementById('storageUsableCap');
    const effEl = document.getElementById('storageEffectiveCap');
    const readIopsEl = document.getElementById('storageReadIOPS');
    const writeIopsEl = document.getElementById('storageWriteIOPS');
    const tpEl = document.getElementById('storageThroughput');
    const faultEl = document.getElementById('storageFaultTolerance');

    if (rawEl) rawEl.textContent = `${nbPostes} Collaborateurs`;
    if (usableEl) usableEl.textContent = `${capaciteUtileTB} To Utiles`;
    if (effEl) effEl.textContent = `${prixEstimeMAD.toLocaleString()} MAD HT`;
    if (readIopsEl) readIopsEl.textContent = modeleNAS;
    if (writeIopsEl) writeIopsEl.textContent = `${retentionDays} Jours de retour en arrière possible`;
    if (tpEl) tpEl.textContent = repriseActivite;
    if (faultEl) faultEl.textContent = garantieSecurite;
  }
}

// Global initialization
window.StorageCalculator = StorageCalculator;
