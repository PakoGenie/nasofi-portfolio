/**
 * MCKENZO & CO. (mckenzo.co) — BUREAU D'ÉTUDES GÉNÉRALES & STRATÉGIE
 * Direction : M. SALHI Anass | Béni Mellal, Maroc
 * Trilingual Interactive Engine (FR | AR | EN), RTL Support,
 * Native <dialog> Modals, Subsidies Simulator & Tanger Med Matrix
 */

// Global state
let currentLang = 'fr';
let lastFocusedElement = null;

// --- TRILINGUAL DICTIONARY ---
const i18nData = {
  fr: {
    // Document Meta
    "meta_title": "McKenzo & Co. | Bureau d'Études Générales, Ingénierie & Stratégie Industrielle au Maroc",
    "meta_desc": "Cabinet McKenzo & Co SARL — Bureau d'études générales agréé (Capital 100 000 MAD). Direction M. SALHI Anass. Primes Charte TPME 30%, PACT'Transmission 90%, Tanger Med et dossiers bancables Tamwilcom.",

    // Top Bar & Slogan
    "top_slogan": "De l'idée au financement, de l'usine à la transmission : un seul partenaire.",
    "top_badge": "Bureau d'études générales agréé • Capital 100 000 MAD",
    "top_contact": "+212 808 598 465",
    "top_email": "contact@mckenzo.ma",
    "top_lang_label": "Langue :",
    
    // Header & Nav
    "nav_cabinet": "Le Cabinet",
    "nav_flagships": "4 Offres Phares",
    "nav_poles": "5 Pôles d'Expertise",
    "nav_lifecycle": "Parcours A-Z",
    "nav_tangermed": "Tanger Med",
    "nav_simulator": "Simulateur d'Aides",
    "nav_credentials": "Accréditations",
    "nav_call_btn": "Appel 15 Min Gratuit",
    "nav_sim_btn": "Calculer mes Primes",

    // Hero Section
    "hero_badge": "Bureau d'Études Générales Agréé — Direction M. SALHI Anass",
    "hero_title_1": "L'Ingénierie Financière, Industrielle & Stratégique",
    "hero_title_2": "au Service de l'Investisseur au Maroc.",
    "hero_subtitle": "Du montage de subventions (Charte TPME jusqu'à 30%, Maroc PME) aux études de faisabilité bancables signées par nos ingénieurs, de l'implantation à Tanger Med à l'évaluation certifiée avec nos experts judiciaires.",
    "hero_cta_booking": "Réserver un Diagnostic 15 Min (Gratuit)",
    "hero_cta_simulator": "Simulateur d'Aides à l'Investissement",
    "hero_cta_tanger": "Découvrir l'Offre Tanger Med",

    // Hero Ribbon Stats
    "stat_capital_val": "100 000",
    "stat_capital_unit": "MAD",
    "stat_capital_label": "Capital Social Enregistré",
    "stat_capital_sub": "SARL agréée bureau d'études",
    
    "stat_subsidy_val": "30%",
    "stat_subsidy_unit": "Capex",
    "stat_subsidy_label": "Prime Charte TPME",
    "stat_subsidy_sub": "Projets de 1 à 50 MDH",

    "stat_transmission_val": "90%",
    "stat_transmission_unit": "Financé",
    "stat_transmission_label": "PACT'Transmission",
    "stat_transmission_sub": "Maroc PME (Plafond 1 MDH)",

    "stat_partner_val": "Cour d'Appel",
    "stat_partner_unit": "",
    "stat_partner_label": "Cabinet Cherkaoui",
    "stat_partner_sub": "Expert judiciaire assermenté",

    // 4 Flagship Offers
    "flagship_tag": "Offres Phares Subventionnées",
    "flagship_title": "4 Dispositifs Stratégiques pour Financer & Accélérer Vos Projets",
    "flagship_sub": "McKenzo & Co. package, certifie et dépose vos dossiers auprès des guichets uniques CRI, Maroc PME et Tamwilcom avec un engagement de résultat.",

    "flag_1_badge": "Charte TPME",
    "flag_1_title": "Primes à l'Investissement Nouvelle Charte",
    "flag_1_metric": "Jusqu'à 30%",
    "flag_1_metric_sub": "de subvention directe sur Capex",
    "flag_1_desc": "Prise en charge intégrale du montage technico-financier et dépôt au Guichet Unique des CRI pour des projets de 1 à 50 MDH. Primes territoriales, d'emploi et de transition verte.",
    "flag_1_f1": "Étude technico-économique signée par ingénieur",
    "flag_1_f2": "Business plan bancable sur 5 à 7 ans",
    "flag_1_f3": "Suivi d'instruction jusqu'à conventionnement",

    "flag_2_badge": "Cession & Reprise",
    "flag_2_title": "Transmission d'Entreprise — PACT'Transmission",
    "flag_2_metric": "90% Pris en charge",
    "flag_2_metric_sub": "par Maroc PME (Plafond 1 MDH)",
    "flag_2_desc": "Diagnostic de transmissibilité, valorisation financière multicritères avec le Cabinet Cherkaoui assermenté, et recherche de repreneurs/investisseurs.",
    "flag_2_f1": "Évaluation financière certifiée (DCF, comparables)",
    "flag_2_f2": "Dossier de subvention Maroc PME à 90%",
    "flag_2_f3": "Accompagnement négociation et closing",

    "flag_3_badge": "Conseil Financé",
    "flag_3_title": "Assistance Technique & Qualité Maroc PME",
    "flag_3_metric": "80% à 90%",
    "flag_3_metric_sub": "de subvention sur honoraires",
    "flag_3_desc": "Missions d'audit opérationnel, restructuration industrielle, préparation aux certifications ISO 9001 / 22000 / ONSSA et transformation digitale.",
    "flag_3_f1": "80% subventionné pour PME, 90% pour TPE",
    "flag_3_f2": "Optimisation des flux et supply chain",
    "flag_3_f3": "Feuille de route industrie du futur",

    "flag_4_badge": "Export Europe",
    "flag_4_title": "Diagnostic Carbone CBAM / MACF",
    "flag_4_metric": "80% à 90%",
    "flag_4_metric_sub": "financé via appui vert",
    "flag_4_desc": "Audit d'émissions GES, calcul de l'empreinte carbone produit selon les normes européennes MACF et plan d'action de décarbonation pour exportateurs vers l'UE.",
    "flag_4_f1": "Bilan carbone Scope 1, 2 et 3",
    "flag_4_f2": "Conformité réglementaire européenne CBAM",
    "flag_4_f3": "Dossiers d'efficacité énergétique et solaire",

    "flag_cta": "Tester mon éligibilité",

    // Simulator
    "sim_tag": "Simulateur Interactif Officiel",
    "sim_title": "Estimez Vos Primes & Subventions Non Remboursables",
    "sim_sub": "Configurez les paramètres de votre entreprise et découvrez instantanément le volume d'aides de l'État mobilisables (Charte TPME, Maroc PME, Tamwilcom).",
    "sim_inv_label": "Montant Total de l'Investissement (Capex) :",
    "sim_tick_1": "1 MDH (Seuil TPME)",
    "sim_tick_2": "25 MDH",
    "sim_tick_3": "50 MDH (Plafond TPME)",
    "sim_tick_4": "100 MDH",
    
    "sim_size_label": "Catégorie de l'Entreprise :",
    "sim_tpe": "TPE (< 10 MDH CA)",
    "sim_tpe_sub": "Subvention max 90%",
    "sim_pme": "PME (10 à 200 MDH CA)",
    "sim_pme_sub": "Subvention max 80%",
    "sim_ge": "Grande Entreprise (> 200 MDH)",
    "sim_ge_sub": "Charte Grands Projets",

    "sim_zone_label": "Zone d'Implantation Territoriale :",
    "sim_zone_a": "Territoire Catégorie A (Prioritaire)",
    "sim_zone_a_sub": "Béni Mellal, Kénitra, Tanger Med, etc. (+10% prime)",
    "sim_zone_b": "Territoire Catégorie B (Standard)",
    "sim_zone_b_sub": "Casablanca, Rabat (taux standard)",

    "sim_type_label": "Type d'Opération Stratégique :",
    "sim_type_new": "Nouvelle Unité Industrielle",
    "sim_type_new_sub": "Création complète d'usine",
    "sim_type_mod": "Extension & Modernisation",
    "sim_type_mod_sub": "Nouveaux équipements",
    "sim_type_trans": "Transmission / Reprise (PACT')",
    "sim_type_trans_sub": "Cession d'entreprise",
    "sim_type_green": "Décarbonation & Audit CBAM",
    "sim_type_green_sub": "Transition verte",
    "sim_type_mre": "Investisseur MRE (MDM Invest)",
    "sim_type_mre_sub": "Marocains du Monde +10%",

    "sim_res_total_label": "Total des Primes & Subventions Estimées",
    "sim_res_charte": "Prime Charte de l'Investissement (CRI) :",
    "sim_res_pme": "Assistance Technique Maroc PME :",
    "sim_res_pact": "Subvention PACT'Transmission :",
    "sim_res_mre": "Prime Non Remboursable MDM Invest :",
    "sim_res_tamwil": "Couverture Garantie Tamwilcom :",
    "sim_res_note": "* Estimations fournies selon les critères officiels de la Nouvelle Charte de l'Investissement et les circulaires Maroc PME en vigueur. Validation définitive sous réserve d'audit d'éligibilité par McKenzo & Co.",
    "sim_btn_dossier": "Réserver l'Appel 15 Min pour Valider Mon Dossier",

    // The 5 Poles
    "poles_tag": "Nos Pôles d'Excellence",
    "poles_title": "5 Pôles d'Expertise Pluridisciplinaire",
    "poles_sub": "Une équipe de haut niveau réunissant ingénieurs industriels, experts judiciaires assermentés, analystes financiers et spécialistes de l'IA appliquée.",

    "p1_badge": "Ingénierie Financière",
    "p1_num": "PÔLE 01",
    "p1_title": "Financement & Études de Projets Bancables",
    "p1_desc": "Montage complet de dossiers de financement pour banques et organismes publics. Nos études technico-économiques sont signées par des ingénieurs industriels garantissant le déblocage des fonds.",
    "p1_f1": "Business plans 5 à 7 ans conformes comités de crédit",
    "p1_f2": "Dossiers de garantie Tamwilcom (Damane Istitmar / Express)",
    "p1_f3": "Guichet Unique CRI (Charte TPME 30%), GO Siyaha, FDA",
    "p1_f4": "Offre MRE : MDM Invest 10% non remboursable & MDM Tamwil",
    "p1_cta": "Étudier mon dossier de financement",

    "p2_badge": "Alliance Judiciaire",
    "p2_num": "PÔLE 02",
    "p2_title": "Expertise, Évaluation & Transmission",
    "p2_desc": "En partenariat officiel avec le Cabinet d'expertise Ahmed Cherkaoui (expert judiciaire assermenté près la Cour d'appel). Conventions bancaires actives avec BMCI, CFG Bank et Bank Al Youssr.",
    "p2_f1": "Évaluation immobilière, foncière et valeur de garantie",
    "p2_f2": "Valorisation de fonds de commerce et parts (DCF, comparables)",
    "p2_f3": "PACT'Transmission : diagnostic et cession pris en charge à 90%",
    "p2_f4": "Dépôt de brevets et marques OMPIC (subventionné à 80%)",
    "p2_cta": "Voir la convention Cabinet Cherkaoui",

    "p3_badge": "Territoire & Impact",
    "p3_num": "PÔLE 03",
    "p3_title": "Développement Territorial & Suivi-Évaluation",
    "p3_desc": "Études d'impact socio-économique, enquêtes de terrain rigoureuses et accompagnement des politiques publiques et bailleurs internationaux (UE, BAD, Banque Mondiale).",
    "p3_f1": "Évaluation et diagnostic de programmes INDH",
    "p3_f2": "Enquêtes quantitatives et qualitatives sur le terrain",
    "p3_f3": "Structuration et mise à niveau des coopératives et GIE",
    "p3_f4": "Plans de développement communal et régional (PDR / PAC)",
    "p3_cta": "Consulter nos méthodologies d'évaluation",

    "p4_badge": "Industrie 4.0",
    "p4_num": "PÔLE 04",
    "p4_title": "Performance Industrielle & Transition Écologique",
    "p4_desc": "Aménagement d'ateliers, optimisation des flux de fabrication, supply chain lean et préparation aux exigences de décarbonation internationales.",
    "p4_f1": "Layout d'usine, postes de travail et ergonomie",
    "p4_f2": "Préparation aux certifications : ISO 9001, 22000, ONSSA, HACCP",
    "p4_f3": "Diagnostic carbone CBAM / MACF pour exportateurs vers l'UE",
    "p4_f4": "Assistance à Maîtrise d'Ouvrage (AMO) technique et délais",
    "p4_cta": "Demander un audit usine",

    "p5_badge": "Digital & IA",
    "p5_num": "PÔLE 05",
    "p5_title": "Data, IA Appliquée & Digitalisation Industrielle",
    "p5_desc": "Conception de tableaux de bord décisionnels et déploiement d'algorithmes prédictifs pour optimiser la rentabilité opérationnelle des PME et TPME.",
    "p5_f1": "Tableaux de bord BI exécutifs (Power BI / solutions sur-mesure)",
    "p5_f2": "IA de prévision de la demande, scoring client et stocks",
    "p5_f3": "Automatisation des processus administratifs et comptables",
    "p5_f4": "Feuilles de route de transformation digitale subventionnées",
    "p5_cta": "Explorer les cas d'usage IA",

    // Lifecycle Explorer
    "life_tag": "Offre Intégrée Exclusive",
    "life_title": "L'Investisseur Industriel de A à Z : 7 Phases Clés",
    "life_sub": "Un accompagnement de bout en bout où McKenzo sécurise chaque étape réglementaire, financière, technique et opérationnelle de votre projet.",
    "life_deliv_title": "Livrables Contractuels Clés :",
    "life_cta_plan": "Planifier cette phase avec nos ingénieurs",
    "life_meta_partner": "Interlocuteurs Clés :",
    "life_meta_grant": "Dispositif Mobilisable :",
    "life_meta_engagement": "Engagement McKenzo :",
    "life_meta_engagement_val": "Dossier conforme et sécurisé",

    // Tanger Med Section
    "tanger_tag": "Plateforme Logistique Mondiale",
    "tanger_title": "Implantation en Zone Franche : Tanger Med vs Zone Classique",
    "tanger_sub": "1er port de Méditerranée et d'Afrique, Tanger Med offre des avantages fiscaux et logistiques déterminants. McKenzo & Co. guide votre installation et vos demandes de licences.",
    "tanger_banner_h": "Tanger Med & Zones Franches d'Exportation",
    "tanger_banner_p": "Hub d'excellence pour l'automobile, l'aéronautique, le textile et la logistique internationale.",
    "tanger_calc_title": "Votre Chiffre d'Affaires Export Prévisionnel :",
    "tanger_calc_sub": "Ajustez pour simuler l'économie fiscale sur l'Impôt sur les Sociétés (IS) :",
    "tanger_savings_label": "Économie IS sur 5 ans :",
    "tanger_th_criteria": "Critères Clés",
    "tanger_th_free": "Tanger Med & Zones Franches (TAC, TFZ)",
    "tanger_th_classic": "Zone Industrielle Classique",
    "tanger_badge_win": "Avantage Majeur",
    "tanger_badge_exempt": "100% Exonéré",
    "tanger_badge_years": "15 Ans",
    "tanger_badge_direct": "Liaison Directe",
    "tanger_badge_express": "TMSA Express",
    "tanger_crit_1": "Impôt sur les Sociétés (IS)",
    "tanger_crit_1_free": "0% pendant 5 ans, puis 15% à taux fixe",
    "tanger_crit_1_classic": "20% à 35% selon barème standard",
    "tanger_crit_2": "Droits de Douane & TVA",
    "tanger_crit_2_free": "Exonération totale à 100% sur machines & intrants",
    "tanger_crit_2_classic": "Droits de douane (2.5% à 40%) + 20% TVA",
    "tanger_crit_3": "Taxe Professionnelle (TP)",
    "tanger_crit_3_free": "Exonération pendant 15 années consécutives",
    "tanger_crit_3_classic": "Exonération limitée à 5 ans",
    "tanger_crit_4": "Délai Transit Portuaire vers l'UE",
    "tanger_crit_4_free": "24h à 48h direct vers les ports européens",
    "tanger_crit_4_classic": "Rupture de charge et formalités intérieures",
    "tanger_crit_5": "Guichet Unique Administratif",
    "tanger_crit_5_free": "Guichet Unique TMSA & CRI dédié",
    "tanger_crit_5_classic": "Circuits administratifs multi-organismes",
    "tanger_note": "* McKenzo & Co. prend en charge la rédaction du business plan d'agrément en zone franche et l'interface avec Tanger Med Special Agency (TMSA).",
    "tanger_cta_btn": "Étudier mon projet d'implantation à Tanger Med",

    // Tanger Med Showcase
    "tm_proj_tag": "Références Industrielles",
    "tm_proj_title": "Projets & Interventions de Référence — Tanger Med & Zones Franches",
    "tm_proj_sub": "Exemples d'unités industrielles accompagnées par McKenzo & Co. dans les écosystèmes d'exportation les plus exigeants.",
    "tm_p1_badge": "Tanger Automotive City (TAC)",
    "tm_p1_title": "Câblerie Automobile & Faisceaux Électriques",
    "tm_p1_capex": "Capex : 42 MDH • Prime Charte : 12,6 MDH (30%)",
    "tm_p1_desc": "Montage de la subvention Charte TPME 30%, étude technico-économique d'aménagement Lean, et dossier de crédit bancaire BMCI avec garantie Tamwilcom Damane Istitmar.",
    "tm_p2_badge": "Zone Franche Logistique Medhub",
    "tm_p2_title": "Plateforme Agro-alimentaire & Chaîne de Froid",
    "tm_p2_capex": "Capex : 28,5 MDH • Exonération 100% TVA/Douane",
    "tm_p2_desc": "Agrément sanitaire ONSSA, certification HACCP/ISO 22000, calcul d'empreinte carbone CBAM pour l'export UE, et franchise douanière sur les équipements importés.",
    "tm_p3_badge": "Tanger Free Zone (TFZ)",
    "tm_p3_title": "Plasturgie Technique & Packaging Éco-conçu",
    "tm_p3_capex": "Capex : 18 MDH • Appui Vert Maroc PME 90%",
    "tm_p3_desc": "Audit d'efficacité énergétique, intégration d'algorithmes d'IA prédictive pour la gestion des stocks de matière première, et subvention Maroc PME sur honoraires.",
    "tm_notice": "Galerie de chantiers en cours d'enrichissement photographique — Dossiers et réalisations accompagnés par McKenzo & Co SARL.",

    // Credentials & Direction
    "cred_tag": "Direction & Garanties Juridiques",
    "cred_title": "Une Équipe Expérimentée, des Accréditations Officielles",
    "cred_sub": "Transparence totale, rigueur scientifique et partenariats judiciaires et bancaires de premier plan.",
    "salhi_name": "M. SALHI Anass",
    "salhi_role": "Directeur Général & Ingénieur Industriel",
    "salhi_bio": "Dirige McKenzo & Co. avec une vision résolument axée sur la bancabilité des projets industriels et l'accès effectif aux mécanismes de subventions marocains. Coordonne une équipe pluridisciplinaire d'ingénieurs et de financiers.",
    "cred_guarantee_1": "Zéro chiffre de complaisance : modélisations financières robustes défendues devant les comités de crédit.",
    "cred_guarantee_2": "Dossiers complets dès le premier dépôt pour respecter les délais des guichets uniques CRI.",
    "cred_guarantee_3": "Clause de confidentialité et secret des affaires rigoureusement protégés.",
    "cred_partner1_name": "Cabinet Cherkaoui",
    "cred_partner1_desc": "Expert judiciaire assermenté",
    "cred_partner2_name": "BMCI Groupe BNP Paribas",
    "cred_partner2_desc": "Convention active PME",
    "cred_partner3_name": "Tamwilcom",
    "cred_partner3_desc": "Garantie Damane Istitmar",
    "cred_partner4_name": "Maroc PME",
    "cred_partner4_desc": "Prise en charge 80-90%",

    // Legal Registry Card
    "legal_table_title": "Fiche d'Identité Juridique Officielle",
    "legal_th_name": "Dénomination Légale",
    "legal_th_status": "Statut & Objet",
    "legal_val_status": "Bureau d'études générales",
    "legal_th_capital": "Capital Social",
    "legal_val_capital": "100 000 MAD (Entièrement libéré)",
    "legal_th_ice": "Identifiant Commun (ICE)",
    "legal_th_rc": "Registre de Commerce (RC)",
    "legal_val_rc": "11429 (Béni Mellal)",
    "legal_th_if": "Identifiant Fiscal (IF)",
    "legal_th_patente": "Numéro de Patente",
    "legal_th_direction": "Direction Générale",
    "legal_th_headquarters": "Siège Social",
    "legal_val_headquarters": "343 Bd Mohamed V, 1er ét, Bureau n°1, Béni Mellal (23040)",
    "legal_th_reach": "Couverture Nationale",
    "legal_val_reach": "Casablanca, Tanger Med, Rabat, Marrakech, Kénitra, Agadir",
    "legal_btn_dossier": "Consulter le Dossier d'Accréditation Complet",

    // Sectors
    "sec_tag": "Écosystèmes Cibles",
    "sec_title": "Secteurs Industriels Accompagnés au Maroc",
    "sec_sub": "Une expertise sectorielle pointue adaptée aux chaînes de valeur prioritaires du Royaume.",
    "sec_1_t": "Agro-alimentaire & Valorisation",
    "sec_1_p": "Unités de transformation, conformité ONSSA, conservation frigorifique, certification HACCP et ISO 22000.",
    "sec_2_t": "Plasturgie & Packaging",
    "sec_2_p": "Emballage industriel, injection plastique, recyclage, optimisation énergétique et décarbonation.",
    "sec_3_t": "Automobile & Sous-traitance",
    "sec_3_p": "Écosystèmes Tanger Med, Tanger Automotive City et Atlantic Free Zone Kénitra. Lean manufacturing.",
    "sec_4_t": "Textile & Confection Technique",
    "sec_4_p": "Unités d'exportation vers l'Europe, traçabilité carbone CBAM, rationalisation des flux de coupe et couture.",
    "sec_5_t": "Logistique & Entrepôts Frigorifiques",
    "sec_5_p": "Plateformes multimodales, zones sous douane, gestion des stocks par IA et schémas directeurs VRD.",
    "sec_6_t": "Immobilier d'Entreprise & Tourisme",
    "sec_6_p": "Valorisation de parcs industriels, programmes hôteliers éligibles GO Siyaha, due diligence foncière.",

    // Free 15-Minute Diagnostic Call Section
    "diag_tag": "Diagnostic Gratuit & Sans Engagement",
    "diag_title": "Un Appel de 15 Minutes pour Valider l'Éligibilité de Votre Projet",
    "diag_sub": "Échangez directement avec un associé sénior. En 15 minutes, nous évaluons vos plafonds de subventions (Charte TPME, PACT'Transmission) et la faisabilité bancaire de votre opération.",
    "diag_b1_t": "Diagnostic Chiffré Immédiat",
    "diag_b1_p": "Calcul précis de la prime d'investissement (10% à 30%) et des aides Maroc PME mobilisables.",
    "diag_b2_t": "Audit de Bancabilité Tamwilcom",
    "diag_b2_p": "Revue des garanties requises et sélection de la convention bancaire la plus favorable (BMCI, CFG, etc.).",
    "diag_b3_t": "Feuille de Route & Calendrier",
    "diag_b3_p": "Planning des démarches auprès du CRI et des banques pour un déblocage sous 60 à 90 jours.",
    "diag_btn_phone": "Ligne Directe : +212 808 598 465",

    // Booking Form
    "form_name": "Votre Nom & Prénom *",
    "form_comp": "Raison Sociale / Projet *",
    "form_phone": "Numéro de Téléphone *",
    "form_email": "Courriel Professionnel *",
    "form_obj": "Objectif Prioritaire *",
    "form_obj_1": "Prime à l'investissement Charte TPME (jusqu'à 30%)",
    "form_obj_2": "Transmission d'entreprise PACT'Transmission (90% subventionné)",
    "form_obj_3": "Assistance technique & ISO Maroc PME (80-90%)",
    "form_obj_4": "Audit Carbone CBAM / Export UE",
    "form_obj_5": "Implantation industrielle Tanger Med & Zones Franches",
    "form_obj_6": "Montage de crédit bancaire garanti Tamwilcom",
    "form_btn": "Réserver Mon Entretien Téléphonique Gratuit",

    // Placeholders
    "ph_name": "ex: Karim Tazi",
    "ph_comp": "ex: Atlas Packaging SA",
    "ph_phone": "+212 600 00 00 00",
    "ph_email": "direction@entreprise.ma",

    // Footer
    "footer_desc": "McKenzo & Co SARL — Bureau d'études générales agréé. Partenaire unique de l'investisseur industriel au Maroc, de l'idée au financement, de l'usine à la transmission.",
    "footer_col1_title": "Dispositifs & Aides",
    "footer_item_charte": "Prime Charte TPME (jusqu'à 30%)",
    "footer_item_pact": "PACT'Transmission (90% Maroc PME)",
    "footer_item_pme": "Assistance Technique Maroc PME (80-90%)",
    "footer_item_cbam": "Audit Carbone CBAM & Décarbonation",
    "footer_item_mre": "MDM Invest 10% (Offre MRE)",
    "footer_item_tamwil": "Garanties Crédit Tamwilcom",

    "footer_col2_title": "Pôles Stratégiques",
    "footer_pole_fin": "Ingénierie de Financement",
    "footer_pole_eval": "Expertise & Évaluation Cherkaoui",
    "footer_pole_terr": "Développement Territorial INDH",
    "footer_pole_ind": "Performance Industrielle & Layout",
    "footer_pole_ai": "Data & IA Appliquée à l'Industrie",
    "footer_pole_tanger": "Implantation Tanger Med & TAC",

    "footer_col3_title": "Siège & Couverture",
    "footer_reach_hq": "Siège :",
    "footer_reach_phone": "Tél direct :",
    "footer_reach_email": "Email officiel :",
    "footer_reach_geo": "Couverture :",
    "footer_btn_accred": "Accréditations Officielles",
    "footer_legal_copy": "© 2026 McKenzo & Co SARL. Tous droits réservés. Bureau d'études générales agréé (Capital 100 000 MAD).",
    "footer_domain": "Site officiel : www.mckenzo.co • contact@mckenzo.ma",
    "footer_link_legal": "Mentions Légales & ICE",
    "footer_link_conventions": "Conventions Partenaires (BMCI)",
    "footer_link_sim": "Simulateur Réglementaire",

    // Modals
    "modal_book_title": "Réserver Votre Appel Diagnostic de 15 Min",
    "modal_book_desc": "Échange direct avec M. SALHI Anass ou un directeur d'études sénior. Gratuit et sans engagement.",
    "modal_cred_tag": "Accréditations Institutionnelles",
    "modal_cred_title": "Dossier d'Accréditations & Conventions Officielles",
    "modal_cred_desc": "Identité juridique complète, convention judiciaire Ahmed Cherkaoui et conventions bancaires BMCI.",
    "modal_cred_sec1_title": "1. Partenariat Judiciaire Assermenté",
    "modal_cred_sec1_desc": "Convention exclusive avec le Cabinet d'expertise Ahmed Cherkaoui, expert judiciaire assermenté près la Cour d'appel de Béni Mellal, spécialisé en évaluation immobilière, foncière et des fonds de commerce.",
    "modal_cred_sec2_title": "2. Partenariats Bancaires Actifs",
    "modal_cred_sec2_desc": "Convention de partenariat actif avec la BMCI (Groupe BNP Paribas) pour l'ingénierie financière des TPME et l'octroi des crédits d'investissement. Conventions et relations de place avec CFG Bank et Bank Al Youssr.",
    "modal_cred_sec3_title": "3. Enregistrements au Registre du Commerce",
    "modal_cred_btn_close": "Fermer le Dossier"
  },

  ar: {
    // Document Meta
    "meta_title": "ماكينزو وشركاه | مكتب الدراسات العامة والهندسة الصناعية والتمويل بالمغرب",
    "meta_desc": "شركة ماكينزو آند كو ذ.م.م — مكتب دراسات عامة معتمد (رأس المال 100 000 درهم). إدارة السيد أنس الصالحي. منح ميثاق الاستثمار حتى 30%، مخطط التفويت 90%، مواكبة طنجة المتوسط وتمويلكم.",

    // Top Bar & Slogan
    "top_slogan": "من الفكرة إلى التمويل، ومن المصنع إلى التفويت: شريككم الموحد.",
    "top_badge": "مكتب دراسات عامة معتمد • رأس المال 100 000 درهم",
    "top_contact": "+212 808 598 465",
    "top_email": "contact@mckenzo.ma",
    "top_lang_label": "اللغة :",
    
    // Header & Nav
    "nav_cabinet": "المكتب والخبرة",
    "nav_flagships": "4 عروض استراتيجية",
    "nav_poles": "5 أقطاب تخصصية",
    "nav_lifecycle": "مسار المستثمر أ-ي",
    "nav_tangermed": "طنجة المتوسط",
    "nav_simulator": "محاكي المنح",
    "nav_credentials": "الاعتمادات القانونية",
    "nav_call_btn": "اتصال 15 دقيقة مجاناً",
    "nav_sim_btn": "حساب منح مشروعي",

    // Hero Section
    "hero_badge": "مكتب دراسات عامة معتمد — إدارة السيد أنس الصالحي",
    "hero_title_1": "الهندسة المالية، الصناعية والاستراتيجية",
    "hero_title_2": "في خدمة المستثمر الصناعي بالمغرب.",
    "hero_subtitle": "من إعداد ملفات المنح الحكومية (ميثاق الاستثمار حتى 30%، مغرب المقاولات) إلى دراسات الجدوى البنكية المعتمدة الموقعة من مهندسينا، ومن الاستقرار بطنجة المتوسط إلى التقييم القضائي المحلف.",
    "hero_cta_booking": "حجز اتصال تشخيصي 15 دقيقة (مجاناً)",
    "hero_cta_simulator": "محاكي منح الاستثمار",
    "hero_cta_tanger": "استكشاف عرض طنجة المتوسط",

    // Hero Ribbon Stats
    "stat_capital_val": "100 000",
    "stat_capital_unit": "درهم",
    "stat_capital_label": "رأس المال المسجل",
    "stat_capital_sub": "شركة ذات مسؤولية محدودة معتمدة",

    "stat_subsidy_val": "30%",
    "stat_subsidy_unit": "من الاستثمار",
    "stat_subsidy_label": "منحة ميثاق الاستثمار",
    "stat_subsidy_sub": "للمشاريع بين 1 و 50 مليون درهم",

    "stat_transmission_val": "90%",
    "stat_transmission_unit": "ممولة",
    "stat_transmission_label": "مخطط PACT'Transmission",
    "stat_transmission_sub": "مغرب المقاولات (سقف 1 مليون درهم)",

    "stat_partner_val": "محكمة الاستئناف",
    "stat_partner_unit": "",
    "stat_partner_label": "مكتب الخبير الشرقاوي",
    "stat_partner_sub": "خبير قضائي محلف",

    // 4 Flagship Offers
    "flagship_tag": "العروض الاستراتيجية المدعومة",
    "flagship_title": "4 برامج كبرى لتمويل وتسريع مشاريعكم الاستثمارية",
    "flagship_sub": "يتولى مكتب ماكينزو آند كو إعداد وتصديق وإيداع ملفاتكم لدى المراكز الجهوية للاستثمار ومغرب المقاولات ومؤسسة تمويلكم مع الالتزام بالنتيجة.",

    "flag_1_badge": "ميثاق المقاولات TPME",
    "flag_1_title": "منح الاستثمار — الميثاق الجديد",
    "flag_1_metric": "تصل إلى 30%",
    "flag_1_metric_sub": "منحة مالية مباشرة غير قابلة للاسترداد",
    "flag_1_desc": "إعداد شامل للملف التقني والمالي وإيداعه بالشباك الوحيد للمراكز الجهوية للاستثمار (CRI) للمشاريع بين 1 و 50 مليون درهم. منح ترابية ومنح تشغيل وتنمية خضراء.",
    "flag_1_f1": "دراسة جدوى تقنية واقتصادية موقعة من مهندس صناعي",
    "flag_1_f2": "مخطط أعمال بنكي محكم على 5 إلى 7 سنوات",
    "flag_1_f3": "مواكبة وتتبع الملف حتى توقيع اتفاقية الاستثمار",

    "flag_2_badge": "التفويت ونقل الملكية",
    "flag_2_title": "تفويت ونقل المقاولات — PACT'Transmission",
    "flag_2_metric": "تغطية 90%",
    "flag_2_metric_sub": "من طرف مغرب المقاولات (سقف 1 مليون درهم)",
    "flag_2_desc": "تشخيص قابلية التفويت، تقييم مالي متعدد المعايير بشراكة مع مكتب الخبير الشرقاوي المحلف، والبحث عن مشترين أو مستثمرين مؤهلين.",
    "flag_2_f1": "تقييم مالي معتمد (التدفقات النقدية DCF، المقارنة السوقية)",
    "flag_2_f2": "إعداد ملف الدعم بنسبة 90% لدى Maroc PME",
    "flag_2_f3": "مرافقة قانونية ومالية حتى إتمام الصفقة",

    "flag_3_badge": "استشارة ممولة",
    "flag_3_title": "المساعدة التقنية والجودة — Maroc PME",
    "flag_3_metric": "80% إلى 90%",
    "flag_3_metric_sub": "دعم مالي لأتعاب الاستشارة",
    "flag_3_desc": "مهام التدقيق العملياتي، إعادة الهيكلة الصناعية، التأهيل لشهادات المطابقة ISO 9001 / 22000 و ONSSA والتحول الرقمي الصناعي.",
    "flag_3_f1": "دعم 80% للمقاولات المتوسطة و 90% للمقاولات الصغرى",
    "flag_3_f2": "تحسين تدفقات الإنتاج وسلسلة الإمداد",
    "flag_3_f3": "مخطط مصنع المستقبل والأتمتة",

    "flag_4_badge": "التصدير للاتحاد الأوروبي",
    "flag_4_title": "التدقيق الكربوني CBAM / آلية تعديل الكربون",
    "flag_4_metric": "80% إلى 90%",
    "flag_4_metric_sub": "تمويل متاح عبر آليات الدعم الأخضر",
    "flag_4_desc": "حساب البصمة الكربونية للمنتجات وفق المعايير الأوروبية الإلزامية وخارطة طريق لإزالة الكربون للمقاولات المصدرة نحو الاتحاد الأوروبي.",
    "flag_4_f1": "قياس انبعاثات الغازات الدفيئة (النطاق 1 و 2 و 3)",
    "flag_4_f2": "الامتثال التام للوائح آلية تعديل الكربون الأوروبية",
    "flag_4_f3": "ملفات التمويل لمشاريع الطاقة الشمسية والنجاعة الطاقية",

    "flag_cta": "فحص أهليتي للدعم",

    // Simulator
    "sim_tag": "محاكي تفاعلي رسمي",
    "sim_title": "احسب قيمة المنح والدعم غير القابل للاسترداد لمشروعك",
    "sim_sub": "حدد معطيات مشروعك الاستثماري واكتشف فوراً حجم الدعم المالي العمومي المتاح (ميثاق الاستثمار، مغرب المقاولات، تمويلكم).",
    "sim_inv_label": "المبلغ الإجمالي للاستثمار (Capex):",
    "sim_tick_1": "1 مليون درهم (عتبة TPME)",
    "sim_tick_2": "25 مليون درهم",
    "sim_tick_3": "50 مليون درهم (سقف TPME)",
    "sim_tick_4": "100 مليون درهم",

    "sim_size_label": "فئة وحجم المقاولة:",
    "sim_tpe": "مقاولة صغيرة جداً (أقل من 10 مليون درهم رقم أعمال)",
    "sim_tpe_sub": "دعم يصل إلى 90%",
    "sim_pme": "مقاولة صغرى أو متوسطة (10 إلى 200 مليون درهم)",
    "sim_pme_sub": "دعم يصل إلى 80%",
    "sim_ge": "مقاولة كبرى (أكثر من 200 مليون درهم)",
    "sim_ge_sub": "ميثاق المشاريع الكبرى",

    "sim_zone_label": "منطقة التوطين والاستقرار الترابي:",
    "sim_zone_a": "المنطقة أ (ذات الأولوية الترابية)",
    "sim_zone_a_sub": "بني ملال، القنيطرة، مناطق طنجة الحرة (+10% منحة ترابية)",
    "sim_zone_b": "المنطقة ب (المعيارية)",
    "sim_zone_b_sub": "محور الدار البيضاء، الرباط (النسبة العادية)",

    "sim_type_label": "نوع العملية الاستثمارية:",
    "sim_type_new": "وحدة صناعية جديدة",
    "sim_type_new_sub": "إنشاء مصنع جديد بالكامل",
    "sim_type_mod": "توسعة وتحديث الإنتاج",
    "sim_type_mod_sub": "شراء خطوط إنتاج جديدة",
    "sim_type_trans": "نقل وتفويت مقاولة (PACT')",
    "sim_type_trans_sub": "شراء أو تفويت مقاولة قائمة",
    "sim_type_green": "إزالة الكربون وتدقيق CBAM",
    "sim_type_green_sub": "الانتقال الإيكولوجي والطاقي",
    "sim_type_mre": "مغاربة العالم (MDM Invest)",
    "sim_type_mre_sub": "استثمار الجالية المغربية بالخارج +10%",

    "sim_res_total_label": "إجمالي المنح والدعم المالي التقديري",
    "sim_res_charte": "منحة ميثاق الاستثمار (CRI):",
    "sim_res_pme": "المساعدة التقنية مغرب المقاولات:",
    "sim_res_pact": "دعم مخطط PACT'Transmission:",
    "sim_res_mre": "منحة MDM Invest المباشرة للمغتربين:",
    "sim_res_tamwil": "نسبة ضمان مؤسسة تمويلكم:",
    "sim_res_note": "* التقديرات مبنية على المعايير الرسمية لميثاق الاستثمار الجديد ومذكرات مغرب المقاولات. التأكيد النهائي مشروط بتدقيق الأهلية من طرف خبراء ماكينزو آند كو.",
    "sim_btn_dossier": "حجز اتصال 15 دقيقة لمصادقة ملف الاستثمار",

    // The 5 Poles
    "poles_tag": "أقطاب التميز",
    "poles_title": "5 أقطاب للخبرة المتعددة التخصصات",
    "poles_sub": "فريق رفيع المستوى يجمع مهندسين صناعيين، خبراء قضائيين محلفين، محللين ماليين وخبراء في الذكاء الاصطناعي التطبيقي.",

    "p1_badge": "الهندسة المالية",
    "p1_num": "القطب 01",
    "p1_title": "تمويل المشاريع والدراسات البنكية المعتمدة",
    "p1_desc": "إعداد ملفات التمويل الكاملة الموجهة للبنوك والهيئات العمومية. دراساتنا التقنية والاقتصادية موقعة من مهندسين صناعيين لضمان الإفراج عن القروض.",
    "p1_f1": "مخططات أعمال لـ 5 إلى 7 سنوات مطابقة للجان الائتمان",
    "p1_f2": "ملفات ضمان تمويلكم (Damane Istitmar / Damane Express)",
    "p1_f3": "الشباك الوحيد CRI (منح حتى 30%)، GO Siyaha وصندوق التنمية الفلاحية",
    "p1_f4": "عرض مغاربة العالم : منحة MDM Invest بنسبة 10% وتمويل MDM Tamwil",
    "p1_cta": "دراسة ملف التمويل الخاص بي",

    "p2_badge": "التحالف القضائي",
    "p2_num": "القطب 02",
    "p2_title": "الخبرة والتقييم وتفويت المقاولات",
    "p2_desc": "بشراكة رسمية مع مكتب الخبير أحمد الشرقاوي (خبير قضائي محلف لدى محكمة الاستئناف). اتفاقيات بنكية فعالة مع BMCI وبنك CFG وبنك اليسر.",
    "p2_f1": "التقييم العقاري والصناعي وتحديد قيمة الضمان البنكي",
    "p2_f2": "تقييم الأصول التجارية والحصص الاجتماعية (طريقة DCF والمقارنة)",
    "p2_f3": "مخطط PACT'Transmission: تشخيص وتفويت ممول بنسبة 90%",
    "p2_f4": "تسجيل براءات الاختراع والعلامات لدى OMPIC (دعم 80%)",
    "p2_cta": "الاطلاع على اتفاقية مكتب الشرقاوي",

    "p3_badge": "التنمية الميدانية",
    "p3_num": "القطب 03",
    "p3_title": "التنمية الترابية والتتبع والتقييم",
    "p3_desc": "دراسات الأثر السوسيو-اقتصادي، مسوح ميدانية دقيقة ومواكبة السياسات العمومية والجهات المانحة الدولية (الاتحاد الأوروبي، البنك الإفريقي، البنك الدولي).",
    "p3_f1": "تقييم وتشخيص برامج المبادرة الوطنية للتنمية البشرية INDH",
    "p3_f2": "مسوح ميدانية كمية ونوعية ذات موثوقية عالية",
    "p3_f3": "هيكلة وتأهيل التعاونيات ومجموعات النفع الاقتصادي GIE",
    "p3_f4": "مخططات التنمية الجماعية والجهوية (PDR / PAC)",
    "p3_cta": "الاطلاع على مناهج التقييم الترابي",

    "p4_badge": "الصناعة 4.0",
    "p4_num": "القطب 04",
    "p4_title": "الأداء الصناعي والانتقال البيئي",
    "p4_desc": "تصميم مخططات المصانع، تحسين تدفقات الإنتاج وسلاسل الإمداد الرشيقة والتأهيل لمعايير إزالة الكربون الدولية.",
    "p4_f1": "تخطيط المصنع Layout وهندسة بيئة العمل في الورشات",
    "p4_f2": "التأهيل لشهادات الجودة: ISO 9001، 22000، ONSSA، HACCP",
    "p4_f3": "التدقيق الكربوني CBAM / MACF للمصدرين نحو الاتحاد الأوروبي",
    "p4_f4": "المساعدة في إدارة المشاريع (AMO) للمتابعة التقنية والجدول الزمني",
    "p4_cta": "طلب تدقيق وتخطيط المصنع",

    "p5_badge": "الرقمنة والذكاء الاصطناعي",
    "p5_num": "القطب 05",
    "p5_title": "البيانات والذكاء الاصطناعي والتحول الرقمي",
    "p5_desc": "تصميم لوحات القيادة التنفيذية ونشر خوارزميات التنبؤ لتحسين المردودية التشغيلية للمقاولات الصغرى والمتوسطة.",
    "p5_f1": "لوحات تحكم ذكاء الأعمال (Power BI وحلول مخصصة)",
    "p5_f2": "ذكاء اصطناعي للتنبؤ بالطلب والتقييم الائتماني وإدارة المخزون",
    "p5_f3": "أتمتة العمليات الإدارية والمحاسبية الروتينية",
    "p5_f4": "خرائط طريق التحول الرقمي المدعومة حكومياً",
    "p5_cta": "استكشاف تطبيقات الذكاء الاصطناعي",

    // Lifecycle Explorer
    "life_tag": "عرض متكامل استثنائي",
    "life_title": "المستثمر الصناعي من الألف إلى الياء: 7 مراحل حاسمة",
    "life_sub": "مواكبة شاملة ومتواصلة يضمن فيها مكتب ماكينزو تأمين كل مرحلة قانونية ومالية وتقنية وعملياتية لمشروعكم.",
    "life_deliv_title": "المخرجات والوثائق التعاقدية الأساسية:",
    "life_cta_plan": "تخطيط هذه المرحلة مع مهندسينا",
    "life_meta_partner": "المخاطبون الرسميون:",
    "life_meta_grant": "الآلية المتاحة:",
    "life_meta_engagement": "التزام مكتب ماكينزو:",
    "life_meta_engagement_val": "ملف مستوفٍ ومؤمّن بالكامل",

    // Tanger Med Section
    "tanger_tag": "منصة لوجستية عالمية",
    "tanger_title": "الاستقرار في المنطقة الحرة: طنجة المتوسط مقارنة بالمناطق الكلاسيكية",
    "tanger_sub": "باعتباره الميناء الأول في البحر الأبيض المتوسط وإفريقيا، يوفر طنجة المتوسط مزايا ضريبية ولوجستية حاسمة. يرافقكم مكتب ماكينزو في كافة التراخيص.",
    "tanger_banner_h": "طنجة المتوسط والمناطق الحرة للتصدير",
    "tanger_banner_p": "قطب التميز العالمي لصناعة السيارات والطيران والنسيج والخدمات اللوجستية الدولية.",
    "tanger_calc_title": "رقم الأعمال التصديري التقديري سنوياً:",
    "tanger_calc_sub": "اضبط المحاكي لتقدير الوفر الضريبي على الضريبة على الشركات (IS):",
    "tanger_savings_label": "الوفر الضريبي في 5 سنوات:",
    "tanger_th_criteria": "المعايير المحددة",
    "tanger_th_free": "طنجة المتوسط والمناطق الحرة (TAC, TFZ)",
    "tanger_th_classic": "المنطقة الصناعية الكلاسيكية",
    "tanger_badge_win": "ميزة كبرى",
    "tanger_badge_exempt": "معفى بنسبة 100%",
    "tanger_badge_years": "15 سنة",
    "tanger_badge_direct": "ربط بحري مباشر",
    "tanger_badge_express": "شباك TMSA السريع",
    "tanger_crit_1": "الضريبة على الشركات (IS)",
    "tanger_crit_1_free": "0% لمدة 5 سنوات، ثم 15% بسعر ثابت مضمون",
    "tanger_crit_1_classic": "20% إلى 35% حسب السعر التصاعدي العادي",
    "tanger_crit_2": "الرسوم الجمركية والضريبة على القيمة المضافة",
    "tanger_crit_2_free": "إعفاء كامل بنسبة 100% على الآلات والمواد الأولية",
    "tanger_crit_2_classic": "رسوم جمركية (2.5% إلى 40%) + 20% ضريبة ق.م",
    "tanger_crit_3": "الرسم المهني (Taxe Professionnelle)",
    "tanger_crit_3_free": "إعفاء تام لمدة 15 سنة متتالية",
    "tanger_crit_3_classic": "إعفاء محدود لـ 5 سنوات فقط",
    "tanger_crit_4": "مدة العبور المينائي نحو أوروبا",
    "tanger_crit_4_free": "24 إلى 48 ساعة مباشرة نحو الموانئ الأوروبية",
    "tanger_crit_4_classic": "إجراءات شحن داخلية إضافية وتأخير زمني",
    "tanger_crit_5": "الشباك الإداري الموحد",
    "tanger_crit_5_free": "شباك موحد لدى TMSA والمركز الجهوي للاستثمار",
    "tanger_crit_5_classic": "مساطر متعددة ومعقدة بين عدة إدارات",
    "tanger_note": "* يتولى مكتب ماكينزو آند كو صياغة مخطط الأعمال للحصول على رخصة المنطقة الحرة والتنسيق مع الوكالة الخاصة طنجة المتوسط (TMSA).",
    "tanger_cta_btn": "دراسة مشروع استقراري بطنجة المتوسط",

    // Tanger Med Showcase
    "tm_proj_tag": "مشاريع وتدخلات مرجعية",
    "tm_proj_title": "مشاريع وتدخلات رائدة — طنجة المتوسط والمناطق الحرة",
    "tm_proj_sub": "نماذج لوحدات صناعية واكبها مكتب ماكينزو في أكثر المنظومات التصديرية تنافسية بالمغرب.",
    "tm_p1_badge": "مدينة طنجة لصناعة السيارات (TAC)",
    "tm_p1_title": "صناعة كابلات وضفائر السيارات",
    "tm_p1_capex": "الاستثمار: 42 مليون درهم • منحة الميثاق: 12.6 مليون درهم (30%)",
    "tm_p1_desc": "إعداد ملف منحة ميثاق الاستثمار 30%، دراسة الجدوى التقنية لتهيئة الورشة وفق منهجية Lean، وملف القرض البنكي لدى BMCI بضمان تمويلكم.",
    "tm_p2_badge": "المنطقة اللوجستية الحرة Medhub",
    "tm_p2_title": "منصة للصناعات الغذائية والتبريد للتصدير",
    "tm_p2_capex": "الاستثمار: 28.5 مليون درهم • إعفاء 100% من الرسوم والضريبة",
    "tm_p2_desc": "الحصول على ترخيص ONSSA الصحي، شهادات HACCP و ISO 22000، حساب البصمة الكربونية CBAM للتصدير الأوروبي، والإعفاء الجمركي التام على الآلات.",
    "tm_p3_badge": "المنطقة الحرة لطنجة (TFZ)",
    "tm_p3_title": "صناعة البلاستيك التقني والتغليف الإيكولوجي",
    "tm_p3_capex": "الاستثمار: 18 مليون درهم • دعم الدعامة الخضراء 90%",
    "tm_p3_desc": "تدقيق النجاعة الطاقية، دمج خوارزميات الذكاء الاصطناعي للتنبؤ بمخزون المواد الأولية، ودعم مغرب المقاولات لأتعاب الاستشارة.",
    "tm_notice": "معرض صور المشاريع قيد التحيين والإثراء — ملفات ومشاريع صناعية بإشراف ومواكبة مكتب ماكينزو آند كو.",

    // Credentials & Direction
    "cred_tag": "الإدارة والضمانات القانونية",
    "cred_title": "فريق ذو خبرة عريقة واعتمادات رسمية موثوقة",
    "cred_sub": "شفافية مطلقة، دقة علمية وشراكات قضائية وبنكية رائدة.",
    "salhi_name": "السيد أنس الصالحي (M. SALHI Anass)",
    "salhi_role": "المدير العام ومهندس صناعي",
    "salhi_bio": "يقود مكتب ماكينزو برؤية تركز على الجدوى البنكية للمشاريع الصناعية والولوج الفعلي لآليات الدعم الحكومي المغربية. ينسق فريقاً متعدد التخصصات من المهندسين والماليين.",
    "cred_guarantee_1": "أرقام حقيقية بلا مجاملة: نماذج مالية متينة مجربة بنجاح أمام لجان الائتمان البنكية.",
    "cred_guarantee_2": "ملفات كاملة من الإيداع الأول لتفادي التعطيل ورفض اللجان الجهوية للاستثمار.",
    "cred_guarantee_3": "سرية مهنية مطلقة واتفاقيات عدم إفشاء (NDA) لحماية أسرار الأعمال والابتكارات.",
    "cred_partner1_name": "مكتب الخبير الشرقاوي",
    "cred_partner1_desc": "خبير قضائي محلف لدى محكمة الاستئناف",
    "cred_partner2_name": "BMCI مجموعة BNP Paribas",
    "cred_partner2_desc": "اتفاقية شراكة نشطة لتمويل المقاولات",
    "cred_partner3_name": "مؤسسة تمويلكم",
    "cred_partner3_desc": "ضمان استثمار للقروض البنكية",
    "cred_partner4_name": "مغرب المقاولات",
    "cred_partner4_desc": "تغطية مالية بنسبة 80-90%",

    // Legal Registry Card
    "legal_table_title": "بطاقة الهوية القانونية الرسمية",
    "legal_th_name": "التسمية القانونية",
    "legal_th_status": "الشكل القانوني والنشاط",
    "legal_val_status": "مكتب الدراسات العامة والاستشارات",
    "legal_th_capital": "رأس المال",
    "legal_val_capital": "100 000 درهم (محرر بالكامل)",
    "legal_th_ice": "الرقم التعريفي الموحد (ICE)",
    "legal_th_rc": "السجل التجاري (RC)",
    "legal_val_rc": "11429 (بني ملال)",
    "legal_th_if": "الرقم الضريبي (IF)",
    "legal_th_patente": "رقم الضريبة المهنية (Patente)",
    "legal_th_direction": "الإدارة العامة",
    "legal_th_headquarters": "المقر الاجتماعي",
    "legal_val_headquarters": "343 شارع محمد الخامس، الطابق 1، مكتب رقم 1، بني ملال",
    "legal_th_reach": "التغطية الجغرافية",
    "legal_val_reach": "الدار البيضاء، طنجة المتوسط، الرباط، مراكش، القنيطرة، أكادير",
    "legal_btn_dossier": "الاطلاع على ملف الاعتمادات الكامل",

    // Sectors
    "sec_tag": "القطاعات ذات الأولوية",
    "sec_title": "القطاعات الصناعية التي نواكبها في المغرب",
    "sec_sub": "خبرة قطاعية متعمقة متماشية مع سلاسل القيمة الاستراتيجية للمملكة.",
    "sec_1_t": "الصناعات الغذائية والتثمين الفلاحي",
    "sec_1_p": "وحدات التحويل، مطابقة معايير ONSSA، التبريد الصناعي، شهادات HACCP و ISO 22000.",
    "sec_2_t": "صناعة البلاستيك والتغليف",
    "sec_2_p": "التغليف الصناعي، حقن البلاستيك، إعادة التدوير، النجاعة الطاقية وإزالة الكربون.",
    "sec_3_t": "صناعة السيارات والمناولين",
    "sec_3_p": "منظومات طنجة المتوسط، طنجة أوتوموتيف سيتي والمنطقة الحرة بالقنيطرة. التصنيع الرشيق Lean.",
    "sec_4_t": "النسيج والملابس التقنية",
    "sec_4_p": "وحدات التصدير لأوروبا، التتبع الكربوني CBAM، وعقلنة تدفقات الفصالة والخياطة.",
    "sec_5_t": "اللوجستيك والمستودعات الجمركية",
    "sec_5_p": "المنصات المتعددة الوسائط، المستودعات تحت المراقبة الجمركية، إدارة المخزون بالذكاء الاصطناعي.",
    "sec_6_t": "العقار الصناعي والسياحة",
    "sec_6_p": "تثمين المناطق الصناعية، المشاريع الفندقية المؤهلة لبرنامج GO Siyaha، والتدقيق العقاري.",

    // Free 15-Minute Diagnostic Call Section
    "diag_tag": "استشارة مجانية وبدون أي التزام",
    "diag_title": "اتصال استشاري لمدة 15 دقيقة لتحديد أهلية مشروعك للدعم",
    "diag_sub": "تحدث مباشرة مع شريك خبير. في 15 دقيقة فقط، نقيم سقف المنح التي يحق لك الاستفادة منها (ميثاق الاستثمار، PACT'Transmission) وإمكانية التمويل البنكي لمشروعك.",
    "diag_b1_t": "تشخيص مالي فوري بالأرقام",
    "diag_b1_p": "حساب دقيق لمنحة الاستثمار (10% إلى 30%) ودعم مغرب المقاولات المتاح لمشروعك.",
    "diag_b2_t": "تدقيق القابلية البنكية وضمان تمويلكم",
    "diag_b2_p": "مراجعة الضمانات المطلوبة واختيار الاتفاقية البنكية الأنسب (BMCI، CFG، إلخ).",
    "diag_b3_t": "خارطة طريق وجدول زمني محدد",
    "diag_b3_p": "برمجة الخطوات العملية لدى المراكز الجهوية والبنوك للإفراج عن التمويل خلال 60 إلى 90 يوماً.",
    "diag_btn_phone": "الخط المباشر : +212 808 598 465",

    // Booking Form
    "form_name": "الاسم الكامل والصفة *",
    "form_comp": "اسم المقاولة / المشروع *",
    "form_phone": "رقم الهاتف المباشر *",
    "form_email": "البريد الإلكتروني المهني *",
    "form_obj": "الهدف الاستراتيجي ذو الأولوية *",
    "form_obj_1": "منحة ميثاق الاستثمار للمقاولات الصغرى والمتوسطة (حتى 30%)",
    "form_obj_2": "تفويت ونقل المقاولات PACT'Transmission (دعم 90%)",
    "form_obj_3": "المساعدة التقنية وشهادات ISO من Maroc PME (دعم 80-90%)",
    "form_obj_4": "التدقيق الكربوني CBAM للتصدير نحو الاتحاد الأوروبي",
    "form_obj_5": "الاستقرار الصناعي بطنجة المتوسط والمناطق الحرة",
    "form_obj_6": "تمويل بنكي مضمون من مؤسسة تمويلكم",
    "form_btn": "حجز موعد الاتصال الاستشاري المجاني",

    // Placeholders
    "ph_name": "مثال: كريم التازي / عثمان بنجلون",
    "ph_comp": "مثال: أطلس للتغليف ش.م / حامل مشروع",
    "ph_phone": "+212 600 00 00 00",
    "ph_email": "direction@entreprise.ma",

    // Footer
    "footer_desc": "شركة ماكينزو آند كو (McKenzo & Co SARL) — مكتب دراسات عامة معتمد. الشريك الموحد للمستثمر الصناعي بالمغرب، من الفكرة إلى التمويل، ومن المصنع إلى التفويت.",
    "footer_col1_title": "البرامج والمنح الحكومية",
    "footer_item_charte": "منحة ميثاق الاستثمار (حتى 30%)",
    "footer_item_pact": "مخطط PACT'Transmission (دعم 90%)",
    "footer_item_pme": "المساعدة التقنية و ISO (دعم 80-90%)",
    "footer_item_cbam": "التدقيق الكربوني CBAM وإزالة الكربون",
    "footer_item_mre": "برنامج مغاربة العالم MDM Invest 10%",
    "footer_item_tamwil": "ضمانات القروض البنكية تمويلكم",

    "footer_col2_title": "أقطاب الخبرة الاستراتيجية",
    "footer_pole_fin": "هندسة التمويل والمشاريع",
    "footer_pole_eval": "الخبرة القضائية والتقييم الشرقاوي",
    "footer_pole_terr": "التنمية الترابية وبرامج INDH",
    "footer_pole_ind": "الأداء الصناعي وتخطيط المصانع",
    "footer_pole_ai": "البيانات والذكاء الاصطناعي الصناعي",
    "footer_pole_tanger": "الاستقرار بطنجة المتوسط TAC",

    "footer_col3_title": "المقر والتغطية الوطنية",
    "footer_reach_hq": "المقر :",
    "footer_reach_phone": "الهاتف المباشر :",
    "footer_reach_email": "البريد الإلكتروني :",
    "footer_reach_geo": "التغطية :",
    "footer_btn_accred": "الاعتمادات الرسمية",
    "footer_legal_copy": "© 2026 شركة ماكينزو آند كو ذ.م.م. جميع الحقوق محفوظة. مكتب دراسات عامة معتمد (رأس المال 100 000 درهم).",
    "footer_domain": "الموقع الرسمي: www.mckenzo.co • contact@mckenzo.ma",
    "footer_link_legal": "البيانات القانونية و ICE",
    "footer_link_conventions": "الاتفاقيات البنكية (BMCI)",
    "footer_link_sim": "المحاكي الرسمي للمنح",

    // Modals
    "modal_book_title": "حجز استشارة 15 دقيقة مجانية لدراسة الأهلية",
    "modal_book_desc": "حوار مباشر مع السيد أنس الصالحي أو أحد مدراء الدراسات الكبار. مجاناً وبدون أي التزام.",
    "modal_cred_tag": "الاعتمادات المؤسساتية",
    "modal_cred_title": "ملف الاعتمادات القانونية والشراكات الرسمية",
    "modal_cred_desc": "الهوية القانونية الكاملة، الشراكة القضائية مع الخبير الشرقاوي والاتفاقيات البنكية مع BMCI.",
    "modal_cred_sec1_title": "1. الشراكة القضائية المحلفة",
    "modal_cred_sec1_desc": "اتفاقية حصرية مع مكتب الخبير أحمد الشرقاوي، خبير قضائي محلف لدى محكمة الاستئناف ببني ملال، متخصص في التقييم العقاري وتثمين الأصول التجارية والنزاعات المالية.",
    "modal_cred_sec2_title": "2. الشراكات البنكية الفعالة",
    "modal_cred_sec2_desc": "اتفاقية شراكة نشطة مع البنك المغربي للتجارة والصناعة BMCI (مجموعة BNP Paribas) لتمويل المقاولات، وشراكات مهنية مع CFG Bank وبنك اليسر.",
    "modal_cred_sec3_title": "3. التقييد بالسجل التجاري والهوية الضريبية",
    "modal_cred_btn_close": "إغلاق الملف"
  },

  en: {
    // Document Meta
    "meta_title": "McKenzo & Co. | Industrial Engineering, Project Financing & Strategy in Morocco",
    "meta_desc": "McKenzo & Co SARL — Accredited General Engineering & Consulting Firm (Capital 100,000 MAD). Managing Director M. SALHI Anass. Investment Charter 30%, PACT'Transmission 90%, Tanger Med Free Zone & bankable files.",

    // Top Bar & Slogan
    "top_slogan": "From inception to funding, from factory floor to succession: your single partner.",
    "top_badge": "Accredited General Consulting Office • Capital 100,000 MAD",
    "top_contact": "+212 808 598 465",
    "top_email": "contact@mckenzo.ma",
    "top_lang_label": "Language:",

    // Header & Nav
    "nav_cabinet": "The Firm",
    "nav_flagships": "4 Flagship Offers",
    "nav_poles": "5 Service Poles",
    "nav_lifecycle": "A-Z Pathway",
    "nav_tangermed": "Tanger Med",
    "nav_simulator": "Subsidies Simulator",
    "nav_credentials": "Credentials",
    "nav_call_btn": "Free 15-Min Call",
    "nav_sim_btn": "Calculate Grants",

    // Hero Section
    "hero_badge": "Accredited General Engineering Firm — Managing Director M. SALHI Anass",
    "hero_title_1": "Financial, Industrial & Strategic Engineering",
    "hero_title_2": "Empowering Industrial Investors in Morocco.",
    "hero_subtitle": "From investment grant packaging (Investment Charter up to 30%, Maroc PME) to bankable feasibility studies signed by our industrial engineers, from Tanger Med Free Zone setup to sworn judicial appraisals.",
    "hero_cta_booking": "Book a Free 15-Min Diagnostic Call",
    "hero_cta_simulator": "Investment Grant Simulator",
    "hero_cta_tanger": "Explore Tanger Med Free Zone Offer",

    // Hero Ribbon Stats
    "stat_capital_val": "100,000",
    "stat_capital_unit": "MAD",
    "stat_capital_label": "Registered Capital",
    "stat_capital_sub": "Accredited engineering SARL",

    "stat_subsidy_val": "30%",
    "stat_subsidy_unit": "Capex",
    "stat_subsidy_label": "Investment Charter Grant",
    "stat_subsidy_sub": "Projects from 1 to 50M MAD",

    "stat_transmission_val": "90%",
    "stat_transmission_unit": "Covered",
    "stat_transmission_label": "PACT'Transmission Plan",
    "stat_transmission_sub": "Maroc PME (1M MAD Cap)",

    "stat_partner_val": "Court of Appeal",
    "stat_partner_unit": "",
    "stat_partner_label": "Cabinet Cherkaoui",
    "stat_partner_sub": "Sworn judicial expert",

    // 4 Flagship Offers
    "flagship_tag": "Subsidized Strategic Programs",
    "flagship_title": "4 Flagship Schemes to Finance & Accelerate Your Industrial Projects",
    "flagship_sub": "McKenzo & Co. packages, certifies, and submits your dossiers to CRI single windows, Maroc PME, and Tamwilcom with a commitment to results.",

    "flag_1_badge": "Charter TPME",
    "flag_1_title": "Investment Grants — New Investment Charter",
    "flag_1_metric": "Up to 30%",
    "flag_1_metric_sub": "direct non-reimbursable grant on Capex",
    "flag_1_desc": "Comprehensive packaging and single-window filing at Regional Investment Centers (CRI) for projects from 1 to 50M MAD. Territorial bonuses, job creation and green transition primes.",
    "flag_1_f1": "Technico-economic feasibility study signed by engineer",
    "flag_1_f2": "Bank-ready 5 to 7 year financial forecast",
    "flag_1_f3": "Full processing follow-up until subsidy convention",

    "flag_2_badge": "M&A & Succession",
    "flag_2_title": "Business Transfer & Succession — PACT'Transmission",
    "flag_2_metric": "90% Subsidized",
    "flag_2_metric_sub": "by Maroc PME (1M MAD cap)",
    "flag_2_desc": "Transferability audit, multicriteria financial valuation with sworn expert Cabinet Cherkaoui, and buyer/investor matchmaking.",
    "flag_2_f1": "Certified valuation report (DCF, market comparables)",
    "flag_2_f2": "Maroc PME 90% subsidy filing",
    "flag_2_f3": "Negotiation and deal closing assistance",

    "flag_3_badge": "Funded Advisory",
    "flag_3_title": "Technical Assistance & Quality — Maroc PME",
    "flag_3_metric": "80% to 90%",
    "flag_3_metric_sub": "subsidy on advisory fees",
    "flag_3_desc": "Operational audit missions, industrial restructuring, preparation for ISO 9001 / 22000 / ONSSA compliance and digital transformation.",
    "flag_3_f1": "80% subsidized for SMEs, 90% for micro-enterprises",
    "flag_3_f2": "Manufacturing workflow and supply chain optimization",
    "flag_3_f3": "Industry of the future and automation roadmap",

    "flag_4_badge": "EU Export",
    "flag_4_title": "CBAM Carbon Footprint Diagnostic",
    "flag_4_metric": "80% to 90%",
    "flag_4_metric_sub": "financed via green funds",
    "flag_4_desc": "GHG emissions audit, product carbon footprint calculations per mandatory EU CBAM standards, and decarbonation roadmap for EU exporters.",
    "flag_4_f1": "Scope 1, 2, and 3 greenhouse gas assessment",
    "flag_4_f2": "Full compliance with European CBAM regulations",
    "flag_4_f3": "Photovoltaic solar and energy efficiency grant dossiers",

    "flag_cta": "Check My Eligibility",

    // Simulator
    "sim_tag": "Official Interactive Simulator",
    "sim_title": "Estimate Your Non-Reimbursable Grants & Subsidies",
    "sim_sub": "Set your investment parameters and instantly calculate public financial support (Investment Charter, Maroc PME, Tamwilcom).",
    "sim_inv_label": "Total Investment Amount (Capex):",
    "sim_tick_1": "1M MAD (SME Threshold)",
    "sim_tick_2": "25M MAD",
    "sim_tick_3": "50M MAD (SME Cap)",
    "sim_tick_4": "100M MAD",

    "sim_size_label": "Enterprise Category:",
    "sim_tpe": "Micro Enterprise (< 10M MAD Turnover)",
    "sim_tpe_sub": "Subsidy up to 90%",
    "sim_pme": "SME (10 to 200M MAD Turnover)",
    "sim_pme_sub": "Subsidy up to 80%",
    "sim_ge": "Large Corporate (> 200M MAD)",
    "sim_ge_sub": "Strategic Projects Charter",

    "sim_zone_label": "Territorial Location Tier:",
    "sim_zone_a": "Category A Territory (Priority Tier)",
    "sim_zone_a_sub": "Béni Mellal, Kénitra, Tanger Med Free Zones (+10% prime)",
    "sim_zone_b": "Category B Territory (Standard)",
    "sim_zone_b_sub": "Casablanca, Rabat (Standard rate)",

    "sim_type_label": "Strategic Operation Type:",
    "sim_type_new": "New Manufacturing Unit",
    "sim_type_new_sub": "Turnkey plant construction",
    "sim_type_mod": "Extension & Modernization",
    "sim_type_mod_sub": "New production machinery",
    "sim_type_trans": "Business Transfer / Buyout (PACT')",
    "sim_type_trans_sub": "Enterprise succession",
    "sim_type_green": "Decarbonation & CBAM Audit",
    "sim_type_green_sub": "Green ecological transition",
    "sim_type_mre": "Expat Investor (MDM Invest)",
    "sim_type_mre_sub": "Moroccans of the World +10%",

    "sim_res_total_label": "Total Estimated Grants & Subsidies",
    "sim_res_charte": "Investment Charter Prime (CRI):",
    "sim_res_pme": "Maroc PME Technical Assistance:",
    "sim_res_pact": "PACT'Transmission Subsidy:",
    "sim_res_mre": "MDM Invest Non-Reimbursable Grant:",
    "sim_res_tamwil": "Tamwilcom Bank Guarantee Coverage:",
    "sim_res_note": "* Estimates calculated based on official criteria of the Moroccan Investment Charter and Maroc PME circulars. Final validation subject to formal eligibility review by McKenzo & Co.",
    "sim_btn_dossier": "Book 15-Min Call to Validate My Grant File",

    // The 5 Poles
    "poles_tag": "Core Service Poles",
    "poles_title": "5 Multidisciplinary Engineering & Strategy Poles",
    "poles_sub": "A senior team combining industrial engineers, sworn judicial experts, corporate financiers, and applied AI specialists.",

    "p1_badge": "Financial Engineering",
    "p1_num": "POLE 01",
    "p1_title": "Project Financing & Bankable Studies",
    "p1_desc": "End-to-end financing dossier preparation for commercial banks and public funds. Our technico-economic feasibility studies are signed by industrial engineers ensuring bank credit committee approvals.",
    "p1_f1": "Bankable 5 to 7 year business plans compliant with credit standards",
    "p1_f2": "Tamwilcom loan guarantee dossiers (Damane Istitmar / Express)",
    "p1_f3": "CRI Single Window (Investment Charter 30%), GO Siyaha, FDA",
    "p1_f4": "Expat Offer: MDM Invest 10% non-reimbursable grant & MDM Tamwil",
    "p1_cta": "Analyze my financing dossier",

    "p2_badge": "Judicial Alliance",
    "p2_num": "POLE 02",
    "p2_title": "Valuation, Real Estate & Business Succession",
    "p2_desc": "In exclusive formal partnership with Cabinet Ahmed Cherkaoui (sworn judicial expert at the Court of Appeal). Active banking conventions with BMCI, CFG Bank, and Bank Al Youssr.",
    "p2_f1": "Industrial land and property valuation, collateral value reports",
    "p2_f2": "Business goodwill and share valuation (DCF, market comparables)",
    "p2_f3": "PACT'Transmission: 90% subsidized diagnostic and transfer",
    "p2_f4": "OMPIC trademark and patent filing (subsidized at 80%)",
    "p2_cta": "Review Cabinet Cherkaoui agreement",

    "p3_badge": "Territory & Impact",
    "p3_num": "POLE 03",
    "p3_title": "Territorial Development & Monitoring-Evaluation",
    "p3_desc": "Socio-economic impact assessments, rigorous field surveys, and program evaluation for public authorities and international donors (EU, AfDB, World Bank).",
    "p3_f1": "Evaluation and diagnostic of INDH national human development programs",
    "p3_f2": "High-reliability quantitative and qualitative field surveys",
    "p3_f3": "Structuring and upgrading of regional cooperatives and EIGs",
    "p3_f4": "Municipal and regional development plans (PDR / PAC)",
    "p3_cta": "Review evaluation methodologies",

    "p4_badge": "Industry 4.0",
    "p4_num": "POLE 04",
    "p4_title": "Industrial Performance & Green Transition",
    "p4_desc": "Factory shop-floor layout, production flow balancing, lean supply chain optimization, and preparation for international decarbonation standards.",
    "p4_f1": "Plant layout, workstation ergonomics and material flows",
    "p4_f2": "Quality certifications: ISO 9001, 22000, ONSSA, HACCP",
    "p4_f3": "Carbon footprint and CBAM audits for EU-destined exporters",
    "p4_f4": "Technical Project Owner Assistance (AMO) for budget and schedule",
    "p4_cta": "Request factory layout audit",

    "p5_badge": "Digital & AI",
    "p5_num": "POLE 05",
    "p5_title": "Data, Applied AI & Industrial Digitalization",
    "p5_desc": "Design of executive business intelligence dashboards and deployment of predictive algorithms to optimize operational profitability for SMEs.",
    "p5_f1": "Executive BI dashboards (Power BI & tailored architectures)",
    "p5_f2": "AI for demand forecasting, customer scoring and inventory",
    "p5_f3": "Administrative and accounting workflow process automation",
    "p5_f4": "Government-subsidized digital transformation roadmaps",
    "p5_cta": "Explore applied AI use-cases",

    // Lifecycle Explorer
    "life_tag": "Exclusive Integrated Pathway",
    "life_title": "The Industrial Investor from A to Z: 7 Critical Phases",
    "life_sub": "Comprehensive end-to-end guidance where McKenzo secures every regulatory, financial, engineering, and operational milestone of your project.",
    "life_deliv_title": "Key Contractual Deliverables:",
    "life_cta_plan": "Plan this phase with our engineers",
    "life_meta_partner": "Key Stakeholders:",
    "life_meta_grant": "Mobilizable Program:",
    "life_meta_engagement": "McKenzo Commitment:",
    "life_meta_engagement_val": "Fully compliant and secured file",

    // Tanger Med Section
    "tanger_tag": "Global Logistics Platform",
    "tanger_title": "Free Zone Setup: Tanger Med vs Classic Industrial Zones",
    "tanger_sub": "#1 container port in the Mediterranean and Africa, Tanger Med offers decisive tax and logistical advantages. McKenzo & Co. navigates your permits and licenses.",
    "tanger_banner_h": "Tanger Med & Export Free Zones",
    "tanger_banner_p": "Global manufacturing hub for automotive, aerospace, technical textiles, and international logistics.",
    "tanger_calc_title": "Your Projected Annual Export Turnover:",
    "tanger_calc_sub": "Adjust to simulate Corporate Income Tax (IS) savings:",
    "tanger_savings_label": "5-Year Tax Savings:",
    "tanger_th_criteria": "Key Criteria",
    "tanger_th_free": "Tanger Med & Free Zones (TAC, TFZ)",
    "tanger_th_classic": "Classic Industrial Zone",
    "tanger_badge_win": "Major Advantage",
    "tanger_badge_exempt": "100% Exempt",
    "tanger_badge_years": "15 Years",
    "tanger_badge_direct": "Direct Link",
    "tanger_badge_express": "TMSA Fast-Track",
    "tanger_crit_1": "Corporate Income Tax (IS)",
    "tanger_crit_1_free": "0% for 5 years, then 15% guaranteed flat rate",
    "tanger_crit_1_classic": "20% to 35% progressive standard schedule",
    "tanger_crit_2": "Customs Duties & Import VAT",
    "tanger_crit_2_free": "100% total exemption on machinery & raw materials",
    "tanger_crit_2_classic": "Customs tariffs (2.5% to 40%) + 20% VAT",
    "tanger_crit_3": "Business Tax (Taxe Professionnelle)",
    "tanger_crit_3_free": "Complete exemption for 15 consecutive years",
    "tanger_crit_3_classic": "Limited exemption capped at 5 years",
    "tanger_crit_4": "Port Transit Time to the EU",
    "tanger_crit_4_free": "24h to 48h direct shipping to major European ports",
    "tanger_crit_4_classic": "Inland transit transshipment and clearance delays",
    "tanger_crit_5": "Administrative Single Window",
    "tanger_crit_5_free": "Dedicated TMSA & CRI fast-track processing",
    "tanger_crit_5_classic": "Multi-agency bureaucratic procedures",
    "tanger_note": "* McKenzo & Co. manages the Free Zone license business plan drafting and direct interface with Tanger Med Special Agency (TMSA).",
    "tanger_cta_btn": "Plan my industrial setup in Tanger Med",

    // Tanger Med Showcase
    "tm_proj_tag": "Industrial Track Record",
    "tm_proj_title": "Flagship Industrial Projects — Tanger Med & Free Zones",
    "tm_proj_sub": "Selected industrial plants accompanied by McKenzo & Co. across Morocco's most competitive export hubs.",
    "tm_p1_badge": "Tanger Automotive City (TAC)",
    "tm_p1_title": "Automotive Wiring Systems & Harnesses",
    "tm_p1_capex": "Capex: 42M MAD • Charter Grant: 12.6M MAD (30%)",
    "tm_p1_desc": "Packaging of 30% Investment Charter grant, Lean shop-floor layout engineering, and BMCI bank credit dossier with Tamwilcom Damane Istitmar guarantee.",
    "tm_p2_badge": "Medhub Logistics Free Zone",
    "tm_p2_title": "Agri-Food & Cold-Chain Export Platform",
    "tm_p2_capex": "Capex: 28.5M MAD • 100% Customs & VAT Exemption",
    "tm_p2_desc": "ONSSA sanitary approval, HACCP/ISO 22000 certifications, CBAM carbon audit for EU export, and full customs exemption on imported equipment.",
    "tm_p3_badge": "Tanger Free Zone (TFZ)",
    "tm_p3_title": "Technical Plastics & Eco-Packaging",
    "tm_p3_capex": "Capex: 18M MAD • Green Support Maroc PME 90%",
    "tm_p3_desc": "Energy efficiency audit, predictive AI algorithms for raw material inventory forecasting, and Maroc PME consulting subsidy.",
    "tm_notice": "Site photographic gallery currently being updated with live operational documentation — Industrial projects accompanied by McKenzo & Co SARL.",

    // Credentials & Direction
    "cred_tag": "Corporate Governance & Accreditations",
    "cred_title": "Experienced Leadership, Verified Legal Accreditations",
    "cred_sub": "Total institutional transparency, engineering rigor, and premier judicial and banking alliances.",
    "salhi_name": "M. SALHI Anass",
    "salhi_role": "Managing Director & Industrial Engineer",
    "salhi_bio": "Leads McKenzo & Co. with an uncompromising commitment to project bankability and unlocking Moroccan state subsidies. Coordinates a multidisciplinary team of engineers and senior financiers.",
    "cred_guarantee_1": "Zero complacency metrics: robust, stress-tested financial models presented before bank credit committees.",
    "cred_guarantee_2": "Complete dossiers upon initial submission to guarantee CRI single-window approval timelines.",
    "cred_guarantee_3": "Strict non-disclosure agreements (NDA) safeguarding intellectual property and trade secrets.",
    "cred_partner1_name": "Cabinet Cherkaoui",
    "cred_partner1_desc": "Sworn judicial expert at the Court of Appeal",
    "cred_partner2_name": "BMCI BNP Paribas Group",
    "cred_partner2_desc": "Active SME banking convention",
    "cred_partner3_name": "Tamwilcom",
    "cred_partner3_desc": "Damane Istitmar credit guarantee",
    "cred_partner4_name": "Maroc PME",
    "cred_partner4_desc": "80-90% subsidized consulting",

    // Legal Registry Card
    "legal_table_title": "Official Legal Registry File",
    "legal_th_name": "Corporate Name",
    "legal_th_status": "Legal Status & Activity",
    "legal_val_status": "General consulting & engineering office",
    "legal_th_capital": "Share Capital",
    "legal_val_capital": "100,000 MAD (Fully paid up)",
    "legal_th_ice": "Common Enterprise Identifier (ICE)",
    "legal_th_rc": "Commercial Register (RC)",
    "legal_val_rc": "11429 (Béni Mellal)",
    "legal_th_if": "Tax Identification Number (IF)",
    "legal_th_patente": "Business License (Patente)",
    "legal_th_direction": "Executive Leadership",
    "legal_th_headquarters": "Headquarters",
    "legal_val_headquarters": "343 Bd Mohamed V, 1st Fl, Office 1, Béni Mellal (23040)",
    "legal_th_reach": "National Reach",
    "legal_val_reach": "Casablanca, Tanger Med, Rabat, Marrakech, Kénitra, Agadir",
    "legal_btn_dossier": "View Complete Accreditations Dossier",

    // Sectors
    "sec_tag": "Strategic Ecosystems",
    "sec_title": "Target Industrial Sectors Accompanied in Morocco",
    "sec_sub": "Deep sectorial expertise tailored to the Kingdom's highest-priority industrial value chains.",
    "sec_1_t": "Agri-Food Processing & Cold-Chain",
    "sec_1_p": "Transformation units, ONSSA compliance, refrigeration facilities, HACCP and ISO 22000 certification.",
    "sec_2_t": "Plastics & Industrial Packaging",
    "sec_2_p": "Industrial packaging, plastic injection molding, recycling, energy efficiency and industrial decarbonation.",
    "sec_3_t": "Automotive & Tier-1 Subcontracting",
    "sec_3_p": "Tanger Med, Tanger Automotive City and Atlantic Free Zone Kénitra clusters. Lean manufacturing.",
    "sec_4_t": "Technical Textiles & Garments",
    "sec_4_p": "Export-oriented garment units, CBAM carbon traceability, cutting and sewing floor flow rationalization.",
    "sec_5_t": "Logistics & Multimodal Hubs",
    "sec_5_p": "Dry ports, bonded warehousing, predictive AI inventory management, and master site layouts.",
    "sec_6_t": "Industrial Real Estate & Tourism",
    "sec_6_p": "Industrial park valuation, hotel projects eligible for GO Siyaha subsidies, and land due diligence.",

    // Free 15-Minute Diagnostic Call Section
    "diag_tag": "Free & Confidential Consultation",
    "diag_title": "A 15-Minute Advisory Call to Verify Your Project's Grant Eligibility",
    "diag_sub": "Speak directly with a senior partner. In 15 minutes, we evaluate your maximum subsidy envelopes (Investment Charter, PACT'Transmission) and banking feasibility.",
    "diag_b1_t": "Instant Numerical Diagnostic",
    "diag_b1_p": "Accurate calculation of your direct investment grant (10% to 30%) and Maroc PME support programs.",
    "diag_b2_t": "Tamwilcom Bankability Audit",
    "diag_b2_p": "Review of collateral requirements and selection of the most favorable bank convention (BMCI, CFG, etc.).",
    "diag_b3_t": "Roadmap & Timeline",
    "diag_b3_p": "Action schedule with CRI and commercial banks targeting loan disbursement within 60 to 90 days.",
    "diag_btn_phone": "Direct Line: +212 808 598 465",

    // Booking Form
    "form_name": "Full Name & Title *",
    "form_comp": "Company / Project Name *",
    "form_phone": "Direct Phone Number *",
    "form_email": "Corporate Email *",
    "form_obj": "Primary Objective *",
    "form_obj_1": "Investment Charter SME Grant (up to 30%)",
    "form_obj_2": "Business Transfer PACT'Transmission (90% Subsidized)",
    "form_obj_3": "Maroc PME Technical Advisory & ISO (80-90%)",
    "form_obj_4": "CBAM Carbon Footprint Audit / EU Export",
    "form_obj_5": "Tanger Med & Free Zones Industrial Setup",
    "form_obj_6": "Bank Loan Packaging with Tamwilcom Guarantee",
    "form_btn": "Book My Free Phone Consultation",

    // Placeholders
    "ph_name": "e.g., Karim Tazi / John Smith",
    "ph_comp": "e.g., Atlas Packaging Ltd / Project Sponsor",
    "ph_phone": "+212 600 00 00 00",
    "ph_email": "director@company.com",

    // Footer
    "footer_desc": "McKenzo & Co SARL — Accredited General Consulting Office. Unified partner for industrial investors in Morocco, from concept to financing, from factory floor to succession.",
    "footer_col1_title": "State Programs & Subsidies",
    "footer_item_charte": "Charter Investment Grant (up to 30%)",
    "footer_item_pact": "PACT'Transmission (90% Maroc PME)",
    "footer_item_pme": "Maroc PME Technical Advisory (80-90%)",
    "footer_item_cbam": "CBAM Carbon Audit & Decarbonation",
    "footer_item_mre": "MDM Invest 10% (Moroccans Abroad)",
    "footer_item_tamwil": "Tamwilcom Loan Guarantee Programs",

    "footer_col2_title": "Strategic Poles",
    "footer_pole_fin": "Financial Engineering",
    "footer_pole_eval": "Judicial Valuation & Succession",
    "footer_pole_terr": "Territorial Development & INDH",
    "footer_pole_ind": "Industrial Layout & Performance",
    "footer_pole_ai": "Industrial Data & Applied AI",
    "footer_pole_tanger": "Tanger Med & Free Zones Setup",

    "footer_col3_title": "Headquarters & Reach",
    "footer_reach_hq": "Headquarters:",
    "footer_reach_phone": "Direct Phone:",
    "footer_reach_email": "Official Email:",
    "footer_reach_geo": "Coverage:",
    "footer_btn_accred": "Official Accreditations",
    "footer_legal_copy": "© 2026 McKenzo & Co SARL. All rights reserved. Accredited Engineering Firm (Capital 100,000 MAD).",
    "footer_domain": "Official Site: www.mckenzo.co • contact@mckenzo.ma",
    "footer_link_legal": "Legal Notices & ICE",
    "footer_link_conventions": "Banking Conventions (BMCI)",
    "footer_link_sim": "Regulatory Simulator",

    // Modals
    "modal_book_title": "Book Your Free 15-Minute Eligibility Diagnostic",
    "modal_book_desc": "Direct consultation with Managing Director M. SALHI Anass or a senior project director.",
    "modal_cred_tag": "Institutional Accreditations",
    "modal_cred_title": "Official Accreditations & Partnerships Dossier",
    "modal_cred_desc": "Complete corporate registry, sworn judicial partnership with Cabinet Cherkaoui, and BMCI bank convention.",
    "modal_cred_sec1_title": "1. Sworn Judicial Partnership",
    "modal_cred_sec1_desc": "Exclusive agreement with Cabinet Ahmed Cherkaoui, sworn judicial expert at the Court of Appeal of Béni Mellal, specialized in commercial property, real estate and goodwill valuation.",
    "modal_cred_sec2_title": "2. Active Banking Conventions",
    "modal_cred_sec2_desc": "Active banking partnership convention with BMCI (BNP Paribas Group) for SME financial engineering and investment credits. Strong banking relationships with CFG Bank and Bank Al Youssr.",
    "modal_cred_sec3_title": "3. Commercial Register & Tax Records",
    "modal_cred_btn_close": "Close Dossier"
  }
};

// --- LIFECYCLE 7 PHASES DATA ---
const lifecyclePhases = [
  {
    num: "00",
    id: "phase0",
    title: { 
      fr: "Phase 0 : Foncier & Choix du Site", 
      ar: "المرحلة 0: الوعاء العقاري واختيار الموقع", 
      en: "Phase 0: Land Due Diligence & Site Selection" 
    },
    lead: {
      fr: "Due diligence foncière, vérification cadastrale ANCFCC, note d'urbanisme et comparaison stratégique : Zone Franche d'Exportation (Tanger Med, TFZ, TAC, Kénitra) vs Zone Industrielle Classique.",
      ar: "تدقيق عقاري وقانوني لدى المحافظة العقارية ANCFCC، مذكرة التعمير والمقارنة الاستراتيجية بين المناطق الحرة (طنجة المتوسط، القنيطرة) والمناطق الصناعية الكلاسيكية.",
      en: "Land due diligence, ANCFCC cadastral verification, urban planning clearance, and strategic comparison: Export Free Zone (Tanger Med, TAC, TFZ, Kénitra) vs Classic Industrial Zone."
    },
    deliverables: {
      fr: ["Rapport de due diligence foncière & conformité ANCFCC", "Arbitrage fiscal & logistique Zone Franche vs Classique", "Assistance au dépôt du dossier d'attribution foncière CRI"],
      ar: ["تقرير التدقيق العقاري ومطابقة المحافظة العقارية", "دراسة المقارنة الضريبية واللوجستية بين المناطق الحرة والعادية", "إيداع ملف تخصيص العقار الصناعي لدى المركز الجهوي للاستثمار"],
      en: ["Land due diligence & cadastral compliance report", "Tax and logistics arbitrage: Free Zone vs Classic Zone", "CRI industrial land allocation filing support"]
    },
    partner: {
      fr: "CRI & ANCFCC",
      ar: "المركز الجهوي للاستثمار والمحافظة العقارية",
      en: "CRI & ANCFCC Cadastre"
    },
    grant: {
      fr: "Guichet Unique Foncier",
      ar: "الشباك الوحيد للعقار الصناعي",
      en: "Industrial Land Single Window"
    },
    image: "assets/tanger-med.jpg"
  },
  {
    num: "01",
    id: "phase1",
    title: { 
      fr: "Phase 1 : Études & Financement", 
      ar: "المرحلة 1: الدراسات والتمويل البنكي", 
      en: "Phase 1: Feasibility & Bank Financing" 
    },
    lead: {
      fr: "Étude technico-économique signée par ingénieur industriel, business plan bancable sur 5 à 7 ans, montage de la prime d'investissement Charte TPME (jusqu'à 30%) et garantie Tamwilcom.",
      ar: "دراسة جدوى تقنية واقتصادية موقعة من مهندس صناعي، مخطط أعمال لـ 5 إلى 7 سنوات، إعداد ملف منحة ميثاق الاستثمار (حتى 30%) وضمان تمويلكم.",
      en: "Technico-economic feasibility study signed by industrial engineer, bankable 5-7 year business plan, Investment Charter grant packaging (up to 30%), and Tamwilcom credit guarantee."
    },
    deliverables: {
      fr: ["Dossier technico-économique certifié", "Business plan bancable testé au stress-test", "Dépôt CRI guichet unique Charte TPME & accord Tamwilcom"],
      ar: ["ملف تقني واقتصادي مصادق عليه رسمياً", "مخطط أعمال مالي مجرب ضد تقلبات السوق", "إيداع ملف منحة ميثاق الاستثمار وموافقة تمويلكم"],
      en: ["Certified technico-economic feasibility file", "Stress-tested bankable financial business plan", "CRI Investment Charter single window filing & Tamwilcom approval"]
    },
    partner: {
      fr: "Banques Partenaires (BMCI) & Tamwilcom",
      ar: "البنوك الشريكة (BMCI) ومؤسسة تمويلكم",
      en: "Partner Banks (BMCI) & Tamwilcom"
    },
    grant: {
      fr: "Charte TPME jusqu'à 30%",
      ar: "ميثاق الاستثمار حتى 30%",
      en: "Investment Charter up to 30%"
    },
    image: "assets/business-plan-finance.jpg"
  },
  {
    num: "02",
    id: "phase2",
    title: { 
      fr: "Phase 2 : Construction & Aménagement", 
      ar: "المرحلة 2: البناء والتهيئة المعمارية", 
      en: "Phase 2: Construction & Civil Works (AMO)" 
    },
    lead: {
      fr: "Assistance à Maîtrise d'Ouvrage (AMO), pilotage technique et financier du chantier, vérification des attachements et validation des déblocages de tranches de crédit bancaire.",
      ar: "مساعدة صاحب المشروع (AMO)، الإشراف التقني والمالي على الورش، مراقبة تقدم الأشغال والمصادقة على صرف دفعات القرض البنكي.",
      en: "Project Owner Technical Assistance (AMO), on-site schedule and financial monitoring, work verification, and bank loan drawdown approvals."
    },
    deliverables: {
      fr: ["Planning directeur et contrôle des coûts VRD & génie civil", "Rapports d'avancement pour déblocage des tranches de crédit", "Contrôle de conformité aux normes sécuritaires et industrielles"],
      ar: ["جدول زمني ومراقبة تكاليف التهيئة والهندسة المدنية", "تقارير تقدم الأشغال الموجهة للبنوك للإفراج عن الدفعات", "مراقبة مطابقة معايير السلامة الصناعية المعمول بها"],
      en: ["Master schedule and civil engineering cost controls", "Progress reports for commercial bank loan disbursements", "Safety and industrial compliance supervision"]
    },
    partner: {
      fr: "Bureaux de Contrôle & Maîtres d'Œuvre",
      ar: "مكاتب المراقبة التقنية والمهندسون المعماريون",
      en: "Inspection Offices & Project Architects"
    },
    grant: {
      fr: "Crédit Moyen/Long Terme Débloqué",
      ar: "صرف دفعات القرض البنكي متوسط/طويل الأجل",
      en: "Bank Loan Tranche Disbursements"
    },
    image: "assets/hero-industrial.jpg"
  },
  {
    num: "03",
    id: "phase3",
    title: { 
      fr: "Phase 3 : Ligne de Production & Machines", 
      ar: "المرحلة 3: خطوط الإنتاج والآلات", 
      en: "Phase 3: Production Lines & Machinery" 
    },
    lead: {
      fr: "Cahier des charges des équipements, négociation fournisseurs, optimisation du layout usine, réception technique en usine et intégration logistique sous douane.",
      ar: "دفتر التحملات التقني للآلات، التفاوض مع الموردين، تحسين مخطط الورشة Layout، المعاينة التقنية والتخليص الجمركي بدون رسوم.",
      en: "Machinery specifications, supplier negotiations, shop-floor layout optimization, technical acceptance tests, and bonded customs clearance."
    },
    deliverables: {
      fr: ["Layout 2D/3D optimisé selon la démarche Lean", "Procès-verbaux de réception technique des équipements", "Dossier d'exonération douanière et TVA d'importation"],
      ar: ["مخطط ثنائي وثلاثي الأبعاد للمصنع وفق منهجية Lean", "محاضر الاستلام التقني للمعدات والآلات", "ملف الإعفاء الجمركي وضريبة القيمة المضافة للاستيراد"],
      en: ["Lean 2D/3D optimized factory shop-floor layout", "Machinery technical commissioning protocols", "Full customs tariff and import VAT exemption dossier"]
    },
    partner: {
      fr: "Fournisseurs & Douanes Marocaines",
      ar: "موردو المعدات وإدارة الجمارك المغربية",
      en: "Equipment Vendors & Moroccan Customs"
    },
    grant: {
      fr: "Exonération Douanes & TVA 100%",
      ar: "إعفاء جمركي وضريبي 100%",
      en: "100% Customs & VAT Exemption"
    },
    image: "assets/factory-layout.jpg"
  },
  {
    num: "04",
    id: "phase4",
    title: { 
      fr: "Phase 4 : Démarrage Opérationnel", 
      ar: "المرحلة 4: الانطلاق والتشغيل", 
      en: "Phase 4: Operational Ramp-Up" 
    },
    lead: {
      fr: "Rédaction des procédures opératoires (SOP), mise en place du contrôle de gestion et des coûts de revient, préparation aux certifications ISO 9001 / ONSSA et dashboards BI.",
      ar: "صياغة إجراءات العمل القياسية (SOP)، إرساء آليات مراقبة التسيير وحساب تكاليف الإنتاج، التأهيل لشواهد ISO 9001 و ONSSA وتثبيت لوحات القيادة.",
      en: "Standard operating procedures (SOP), cost accounting and unit cost calculations, preparation for ISO 9001 / ONSSA certifications, and executive BI dashboards."
    },
    deliverables: {
      fr: ["Manuel des procédures et cartographie des postes", "Outil de calcul du coût de revient unitaire", "Tableau de bord de pilotage de la production"],
      ar: ["دليل الإجراءات ودليل التوصيف الوظيفي للعمال", "أداة دقيقة لحساب كلفة الإنتاج للوحدة", "لوحة قيادة لمتابعة مؤشرات الأداء الصناعي"],
      en: ["Procedures manual and job ergonomics mapping", "Accurate unit cost accounting model", "Real-time production and performance dashboard"]
    },
    partner: {
      fr: "Organismes de Certification & ONSSA",
      ar: "هيئات الإشهاد والمكتب الوطني ONSSA",
      en: "Certification Bodies & ONSSA"
    },
    grant: {
      fr: "Assistance Maroc PME 80-90%",
      ar: "دعم مغرب المقاولات 80-90%",
      en: "Maroc PME Subsidy 80-90%"
    },
    image: "assets/industry-automotive.jpg"
  },
  {
    num: "05",
    id: "phase5",
    title: { 
      fr: "Phase 5 : Croissance, Décarbonation & CBAM", 
      ar: "المرحلة 5: النمو وإزالة الكربون CBAM", 
      en: "Phase 5: Growth, Decarbonation & CBAM" 
    },
    lead: {
      fr: "Audits d'optimisation continue subventionnés à 80-90% par Maroc PME, audit carbone Scope 1-2-3 pour exportateurs vers l'UE (CBAM) et IA prédictive des stocks.",
      ar: "تدقيقات التحسين المستمر المدعومة بنسبة 80-90% من مغرب المقاولات، التدقيق الكربوني للتصدير الأوروبي (CBAM) ونماذج الذكاء الاصطناعي للمخزون.",
      en: "Continuous improvement audits subsidized at 80-90% by Maroc PME, Scope 1-2-3 carbon audit for EU exporters (CBAM), and predictive AI inventory models."
    },
    deliverables: {
      fr: ["Bilan d'émissions de gaz à effet de serre (GES) certifié CBAM", "Plan d'actions de décarbonation et efficacité énergétique", "Modèle d'IA prédictive pour la gestion des stocks et de la demande"],
      ar: ["تقرير انبعاثات الكربون المعتمد وفق معايير CBAM الأوروبية", "خطة العمل للنجاعة الطاقية واستخدام الطاقة المتجددة", "نموذج ذكاء اصطناعي للتنبؤ بالطلب وإدارة المخازن"],
      en: ["Certified CBAM greenhouse gas emissions audit", "Industrial decarbonation and energy efficiency action plan", "Predictive AI model for demand and inventory management"]
    },
    partner: {
      fr: "Maroc PME & Bailleurs Verts",
      ar: "مغرب المقاولات وصناديق التمويل الأخضر",
      en: "Maroc PME & Green Funds"
    },
    grant: {
      fr: "Appui Vert & Décarbonation 80-90%",
      ar: "برنامج الدعم الأخضر والكربون 80-90%",
      en: "Green Transition Support 80-90%"
    },
    image: "assets/carbon-audit-cbam.jpg"
  },
  {
    num: "06",
    id: "phase6",
    title: { 
      fr: "Phase 6 : Transmission & Cession", 
      ar: "المرحلة 6: التقييم والتفويت PACT'", 
      en: "Phase 6: Valuation & Succession (PACT')" 
    },
    lead: {
      fr: "Évaluation certifiée par le Cabinet d'expertise Ahmed Cherkaoui assermenté près la Cour d'appel, dossier PACT'Transmission 90% financé par Maroc PME et négociation avec repreneurs.",
      ar: "تقييم مالي وقضائي معتمد من مكتب الخبير أحمد الشرقاوي المحلف لدى محكمة الاستئناف، ملف PACT'Transmission مغطى بنسبة 90% ومفاوضات البيع.",
      en: "Certified valuation by Cabinet Ahmed Cherkaoui (sworn judicial expert at the Court of Appeal), PACT'Transmission dossier 90% financed by Maroc PME, and buyer negotiations."
    },
    deliverables: {
      fr: ["Rapport officiel d'évaluation financière et foncière assermenté", "Dossier de subvention PACT'Transmission (plafond 1 MDH)", "Mémorandum d'information confidentiel pour repreneurs"],
      ar: ["تقرير رسمي ومحلف للتقييم المالي والعقاري للمقاولة", "ملف دعم PACT'Transmission لدى مغرب المقاولات (سقف 1 مليون درهم)", "مذكرة معلومات سرية للمشترين والمستثمرين المؤهلين"],
      en: ["Sworn judicial financial and real estate valuation report", "PACT'Transmission subsidy file (up to 1M MAD cap)", "Confidential information memorandum for potential buyers"]
    },
    partner: {
      fr: "Cabinet Ahmed Cherkaoui & Maroc PME",
      ar: "مكتب الخبير أحمد الشرقاوي ومغرب المقاولات",
      en: "Cabinet Cherkaoui & Maroc PME"
    },
    grant: {
      fr: "PACT'Transmission 90% (1 MDH)",
      ar: "مخطط PACT'Transmission بنسبة 90%",
      en: "PACT'Transmission 90% (1M Cap)"
    },
    image: "assets/expert-cherkaoui.jpg"
  }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Lenis Smooth Scrolling
  let lenis;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // 3. GSAP Entrance Animations
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    heroTl.from('.hero-badge', { opacity: 0, y: -20, delay: 0.1 })
          .from('.hero-title', { opacity: 0, y: 25 }, '-=0.6')
          .from('.hero-subtitle', { opacity: 0, y: 20 }, '-=0.6')
          .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.6')
          .from('.ribbon-card', { opacity: 0, y: 15, stagger: 0.08 }, '-=0.5');
  }

  // 4. Initialize Core Interactive Engines
  initLanguageEngine();
  initSubsidiesSimulator();
  initLifecycleExplorer();
  initTangerMedCalculator();
  initDialogs();
  initMobileDrawer();
  initDirectBookingForms();

  // Restore saved language if present
  const savedLang = localStorage.getItem('mckenzo_lang');
  if (savedLang && ['fr', 'ar', 'en'].includes(savedLang)) {
    setLanguage(savedLang);
  }
});

// --- TRILINGUAL & RTL ENGINE ---
function initLanguageEngine() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
}

function setLanguage(lang) {
  if (!i18nData[lang]) return;
  currentLang = lang;
  localStorage.setItem('mckenzo_lang', lang);

  // Update HTML attributes
  document.documentElement.lang = lang;
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('is-rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('is-rtl');
  }

  // Update all active buttons across top-bar, header, and mobile drawer
  document.querySelectorAll('.lang-btn').forEach(b => {
    const isActive = b.getAttribute('data-lang') === lang;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Apply translations to all DOM elements with data-i18n
  const dict = i18nData[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Apply placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Dynamic Page Title & Meta Description
  if (dict.meta_title) {
    document.title = dict.meta_title;
  }
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.meta_desc) {
    metaDesc.setAttribute('content', dict.meta_desc);
  }

  // Re-calculate interactive components in the selected language
  updateSimulatorResults();
  updateLifecycleView();
  updateTangerMedCalculations();

  // Refresh icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Accessible Toast announcement
  const msgs = {
    fr: "Langue mise à jour : Français.",
    ar: "تم تحديث اللغة : العربية (المغرب).",
    en: "Language updated: International English."
  };
  showToast(msgs[lang]);
}

// --- INTERACTIVE TOOL #1: SUBSIDIES SIMULATOR ENGINE ---
function initSubsidiesSimulator() {
  const slider = document.getElementById('simInvestSlider');
  const sliderVal = document.getElementById('simSliderVal');

  if (slider && sliderVal) {
    slider.addEventListener('input', () => {
      const val = parseFloat(slider.value);
      sliderVal.textContent = formatMDH(val);
      updateSimulatorResults();
    });
  }

  // Listen to all simulator radios
  document.querySelectorAll('.sim-pill input').forEach(input => {
    input.addEventListener('change', updateSimulatorResults);
  });

  // Initial calculation
  updateSimulatorResults();
}

function formatMAD(num) {
  const rounded = Math.round(num);
  if (currentLang === 'ar') {
    return rounded.toLocaleString('fr-FR') + ' درهم';
  } else if (currentLang === 'en') {
    return rounded.toLocaleString('en-US') + ' MAD';
  }
  return rounded.toLocaleString('fr-FR') + ' MAD';
}

function formatMDH(num) {
  if (currentLang === 'ar') {
    return num + ' مليون درهم';
  } else if (currentLang === 'en') {
    return num + 'M MAD';
  }
  return num + ' MDH';
}

function updateSimulatorResults() {
  const slider = document.getElementById('simInvestSlider');
  if (!slider) return;

  const capexMDH = parseFloat(slider.value) || 15;
  const capexMAD = capexMDH * 1000000;

  // Update slider label with current language format
  const sliderVal = document.getElementById('simSliderVal');
  if (sliderVal) {
    sliderVal.textContent = formatMDH(capexMDH);
  }

  const size = document.querySelector('input[name="simSize"]:checked')?.value || 'pme';
  const zone = document.querySelector('input[name="simZone"]:checked')?.value || 'zone_a';
  const type = document.querySelector('input[name="simType"]:checked')?.value || 'new';

  // Math calculation according to Moroccan Investment Charter & Maroc PME
  let charteRate = 0.10; // Base prime 10%
  if (zone === 'zone_a') {
    charteRate += 0.10; // +10% territorial bonus (Catégorie A e.g. Béni Mellal, Kénitra, Tanger Med)
  }
  if (type === 'new' || type === 'green') {
    charteRate += 0.05; // +5% employment / green transition bonus
  }
  if (size === 'tpe') {
    charteRate += 0.05; // +5% specific SME bonus
  }
  charteRate = Math.min(charteRate, 0.30); // Cap at 30% for TPME

  const charteAmount = capexMAD * charteRate;

  // Maroc PME Technical Assistance
  let pmeAmount = 0;
  if (size === 'tpe') {
    pmeAmount = 500000; // up to 90% of consulting/ISO audit
  } else if (size === 'pme') {
    pmeAmount = 800000; // up to 80% for PME
  } else {
    pmeAmount = 300000;
  }

  // PACT'Transmission Subsidy
  let pactAmount = 0;
  if (type === 'trans') {
    pactAmount = 900000; // 90% of up to 1 MDH valuation & transfer
  }

  // MRE Invest Prime (MDM Invest 10% non-reimbursable)
  let mreAmount = 0;
  if (type === 'mre') {
    mreAmount = Math.min(capexMAD * 0.10, 5000000); // 10% capped at 5 MDH
  }

  // Total Direct Non-Reimbursable Subsidies
  const grandTotal = charteAmount + (type === 'trans' ? pactAmount : pmeAmount) + mreAmount;

  const grandTotalEl = document.getElementById('simGrandTotal');
  if (grandTotalEl) {
    grandTotalEl.textContent = formatMAD(grandTotal);
  }

  const charteEl = document.getElementById('simResCharte');
  if (charteEl) {
    charteEl.textContent = `${formatMAD(charteAmount)} (${Math.round(charteRate * 100)}%)`;
  }

  const pmeEl = document.getElementById('simResPME');
  if (pmeEl) {
    pmeEl.textContent = formatMAD(pmeAmount);
  }

  const pactRow = document.getElementById('simRowPact');
  const pactEl = document.getElementById('simResPact');
  if (pactRow && pactEl) {
    if (type === 'trans') {
      pactRow.style.display = 'flex';
      pactEl.textContent = formatMAD(pactAmount);
    } else {
      pactRow.style.display = 'none';
    }
  }

  const mreRow = document.getElementById('simRowMre');
  const mreEl = document.getElementById('simResMre');
  if (mreRow && mreEl) {
    if (type === 'mre') {
      mreRow.style.display = 'flex';
      mreEl.textContent = formatMAD(mreAmount);
    } else {
      mreRow.style.display = 'none';
    }
  }

  const tamwilEl = document.getElementById('simResTamwil');
  if (tamwilEl) {
    const rate = size === 'tpe' ? "70%" : "60%";
    if (currentLang === 'ar') {
      tamwilEl.textContent = `${rate} (ضمان استثمار Damane Istitmar)`;
    } else if (currentLang === 'en') {
      tamwilEl.textContent = `${rate} (Damane Istitmar Guarantee)`;
    } else {
      tamwilEl.textContent = `${rate} (Damane Istitmar)`;
    }
  }
}

// --- INTERACTIVE TOOL #2: TANGER MED VS CLASSIC ZONE COMPARISON ---
function initTangerMedCalculator() {
  const slider = document.getElementById('tangerExportSlider');
  const valEl = document.getElementById('tangerExportVal');

  if (slider && valEl) {
    slider.addEventListener('input', () => {
      const val = parseFloat(slider.value);
      valEl.textContent = formatMDH(val);
      updateTangerMedCalculations();
    });
  }

  updateTangerMedCalculations();
}

function updateTangerMedCalculations() {
  const slider = document.getElementById('tangerExportSlider');
  if (!slider) return;

  const exportMDH = parseFloat(slider.value) || 25;
  const valEl = document.getElementById('tangerExportVal');
  if (valEl) {
    valEl.textContent = formatMDH(exportMDH);
  }

  // Estimated taxable profit at 15% margin
  const estimatedProfit = exportMDH * 1000000 * 0.15;

  // Classic zone tax: avg 25% IS = profit * 0.25
  const classicTax5Years = (estimatedProfit * 0.25) * 5;
  // Free zone tax: 0% for 5 years = 0
  const savings5Years = classicTax5Years;

  const savingsEl = document.getElementById('tangerEstimatedSavings');
  if (savingsEl) {
    savingsEl.textContent = formatMAD(savings5Years);
  }
}

// --- INTERACTIVE TOOL #3: 6-PHASE INDUSTRIAL LIFECYCLE EXPLORER ---
let currentPhaseIndex = 0;

function initLifecycleExplorer() {
  const navContainer = document.getElementById('lifecycleNav');
  if (!navContainer) return;

  navContainer.innerHTML = '';

  lifecyclePhases.forEach((phase, idx) => {
    const btn = document.createElement('button');
    btn.className = `phase-btn ${idx === 0 ? 'active' : ''}`;
    btn.setAttribute('data-phase-index', idx);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');

    const badgeText = currentLang === 'ar' ? `المرحلة ${phase.num}` : `PHASE ${phase.num}`;
    btn.innerHTML = `
      <span class="phase-btn-badge">${badgeText}</span>
      <strong class="phase-btn-title">${phase.title[currentLang] || phase.title.fr}</strong>
    `;

    btn.addEventListener('click', () => {
      currentPhaseIndex = idx;
      document.querySelectorAll('.phase-btn').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
        b.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      updateLifecycleView();
    });

    navContainer.appendChild(btn);
  });

  updateLifecycleView();
}

function updateLifecycleView() {
  const phase = lifecyclePhases[currentPhaseIndex];
  if (!phase) return;

  // Update nav buttons text and badges for active language
  document.querySelectorAll('.phase-btn').forEach((b, i) => {
    const p = lifecyclePhases[i];
    const badgeEl = b.querySelector('.phase-btn-badge');
    const titleEl = b.querySelector('.phase-btn-title');
    if (badgeEl && p) {
      badgeEl.textContent = currentLang === 'ar' ? `المرحلة ${p.num}` : `PHASE ${p.num}`;
    }
    if (titleEl && p) {
      titleEl.textContent = p.title[currentLang] || p.title.fr;
    }
  });

  const titleEl = document.getElementById('phaseDetailTitle');
  const leadEl = document.getElementById('phaseDetailLead');
  const delivList = document.getElementById('phaseDeliverablesList');
  const partnerEl = document.getElementById('phaseMetaPartner');
  const grantEl = document.getElementById('phaseMetaGrant');
  const imgEl = document.getElementById('phaseMediaImg');

  if (titleEl) titleEl.textContent = phase.title[currentLang] || phase.title.fr;
  if (leadEl) leadEl.textContent = phase.lead[currentLang] || phase.lead.fr;

  if (delivList) {
    delivList.innerHTML = '';
    const items = phase.deliverables[currentLang] || phase.deliverables.fr;
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<i data-lucide="check-circle" class="icon-xs text-emerald" aria-hidden="true"></i> <span>${item}</span>`;
      delivList.appendChild(li);
    });
  }

  if (partnerEl) {
    partnerEl.textContent = typeof phase.partner === 'object' ? (phase.partner[currentLang] || phase.partner.fr) : phase.partner;
  }
  if (grantEl) {
    grantEl.textContent = typeof phase.grant === 'object' ? (phase.grant[currentLang] || phase.grant.fr) : phase.grant;
  }
  if (imgEl) imgEl.src = phase.image;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- DIALOGS & TOP-LAYER MODALS ---
function initDialogs() {
  // Booking Dialog
  const bookingDialog = document.getElementById('bookingDialog');
  const openBookingBtns = document.querySelectorAll('[data-action="open-booking"]');
  const closeBookingBtn = document.getElementById('btnCloseBooking');

  if (bookingDialog) {
    openBookingBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        lastFocusedElement = document.activeElement;
        bookingDialog.showModal();
        const first = bookingDialog.querySelector('input');
        if (first) first.focus();
      });
    });

    if (closeBookingBtn) {
      closeBookingBtn.addEventListener('click', () => {
        bookingDialog.close();
      });
    }

    bookingDialog.addEventListener('close', () => {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    });

    bookingDialog.addEventListener('click', (e) => {
      const rect = bookingDialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        bookingDialog.close();
      }
    });
  }

  // Legal & Accreditation Dialog
  const legalDialog = document.getElementById('legalDialog');
  const openLegalBtns = document.querySelectorAll('[data-action="open-legal"]');
  const closeLegalBtn = document.getElementById('btnCloseLegal');
  const confirmCloseLegalBtn = document.getElementById('btnConfirmCloseLegal');

  if (legalDialog) {
    openLegalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        lastFocusedElement = document.activeElement;
        legalDialog.showModal();
      });
    });

    if (closeLegalBtn) {
      closeLegalBtn.addEventListener('click', () => {
        legalDialog.close();
      });
    }

    if (confirmCloseLegalBtn) {
      confirmCloseLegalBtn.addEventListener('click', () => {
        legalDialog.close();
      });
    }

    legalDialog.addEventListener('close', () => {
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    });

    legalDialog.addEventListener('click', (e) => {
      const rect = legalDialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        legalDialog.close();
      }
    });
  }
}

// --- DIRECT FORM HANDLERS ---
function initDirectBookingForms() {
  const form1 = document.getElementById('quickBookingForm');
  const formModal = document.getElementById('modalBookingForm');

  function handleBooking(e) {
    e.preventDefault();
    const ref = 'MCK-' + Math.floor(10000 + Math.random() * 90000);
    const dialog = document.getElementById('bookingDialog');
    if (dialog && dialog.open) {
      dialog.close();
    }

    const toastMsgs = {
      fr: `Demande #${ref} enregistrée. M. SALHI Anass et notre équipe vous contacteront à l'heure convenue.`,
      ar: `تم تسجيل طلبك رقم #${ref}. سيتصل بكم السيد أنس الصالحي وفريقنا في الموعد المحدد.`,
      en: `Request #${ref} booked. M. SALHI Anass and our senior team will call you as scheduled.`
    };

    showToast(toastMsgs[currentLang] || toastMsgs.fr);
    e.target.reset();
  }

  if (form1) form1.addEventListener('submit', handleBooking);
  if (formModal) formModal.addEventListener('submit', handleBooking);
}

// --- MOBILE NAVIGATION DRAWER ---
function initMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const btnOpen = document.getElementById('mobileMenuBtn');
  const btnClose = document.getElementById('btnCloseMobileDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      drawer.classList.add('open');
      btnOpen.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (btnOpen) btnOpen.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      if (btnOpen) btnOpen.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
}

// --- ACCESSIBLE TOAST NOTIFICATION ---
function showToast(msg) {
  const existing = document.getElementById('toastNotice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastNotice';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    inset-inline-end: 24px;
    z-index: 9999;
    background: #0B1934;
    border: 1px solid #10B981;
    box-shadow: 0 10px 35px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.35);
    color: #F8FAFC;
    padding: 14px 22px;
    border-radius: 10px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 460px;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  toast.innerHTML = `
    <span style="color: #34D399; font-size: 1.3rem; line-height: 1;">✓</span>
    <span style="line-height: 1.45;">${msg}</span>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}
