-- ANBE Nigeria Limited — Seed Data
-- Run: wrangler d1 execute anbe-db --file=./migrations/0002_seed.sql
-- Or remote: wrangler d1 execute anbe-db --remote --file=./migrations/0002_seed.sql

-- ── Blog Posts ────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO blog_posts (slug, title, excerpt, content, category, image, read_time, published) VALUES
(
  'smokeless-flare-design',
  'The Engineering Case for Smokeless Flare Systems',
  'Nigeria''s Department of Petroleum Resources has tightened flare performance requirements significantly over the past decade. Meeting those standards demands a clear understanding of combustion efficiency, steam injection ratios, and gas composition variability.',
  json_array(
    'A smokeless flare is not simply a flare that produces less visible smoke — it is a combustion system engineered to achieve a destruction and removal efficiency (DRE) consistently above 98% across the full range of operating gas flow rates the facility is likely to see. For producers in the Niger Delta, where associated gas compositions can shift substantially depending on reservoir pressure and water cut, that variability is the core engineering challenge.',
    'The principal technical levers in smokeless flare design are tip geometry, momentum mixing, and assist media selection. Multi-point ground flares and enclosed combustors offer the highest efficiency but carry significant footprint and cost penalties. For the majority of ANBE''s clients, a properly engineered elevated single-point flare with a high-momentum steam ring or air-assisted tip achieves the required performance within a realistic capital envelope.',
    'Nigeria''s Gas Flaring (Prevention of Waste and Pollution) Regulations 2018 and the associated DPR Flare Manual impose specific monitoring and reporting obligations on operators. ANBE''s engineering team incorporates regulatory compliance checkpoints into every flare design review, ensuring that the as-built system satisfies the documentation and monitoring requirements the operator will face at first-pass inspection.'
  ),
  'Engineering',
  '/industrial-1.jpg',
  '5 min read',
  1
),
(
  'pipeline-integrity-niger-delta',
  'Pipeline Integrity Management in the Niger Delta',
  'Maintaining pipeline integrity in the Niger Delta is an exercise in managing multiple, simultaneous degradation mechanisms across terrain that can change from dry-season laterite to swamp within a kilometre.',
  json_array(
    'External corrosion in swamp and tidal creek environments is driven by the interaction of anaerobic bacteria, high chloride soils, and the absence of reliable cathodic protection continuity across buried coating defects. Inline inspection (ILI) using magnetic flux leakage tools is the industry standard for trunk pipelines above 8 inches nominal bore, but the swamp terrain that covers large parts of Rivers, Bayelsa, and Delta states creates practical access constraints.',
    'Third-party interference — from artisanal refining operations, illegal hot-tap connections, and mechanical damage during land clearance — represents the fastest-growing integrity threat across the Niger Delta corridor. The engineering response is twofold: route hardening through burial depth increases and concrete slab protection at high-risk crossings, and surveillance frequency increases using a combination of foot patrol, boat patrol, and aerial survey.',
    'Pipeline repair in swamp terrain requires a different execution methodology from land-based repairs. Floating equipment, dewatered isolation of the repair span, and access by barge or shallow-draft vessel are standard requirements. ANBE has developed a repeatable mobilisation template for swamp repairs that covers diver survey, isolation valve operation, coating reinstatement, and reinstatement of the pipeline corridor to pre-disturbance condition.'
  ),
  'Field Work',
  '/industrial-5.jpg',
  '6 min read',
  1
),
(
  'indigenous-engineering-capacity',
  'Building Indigenous Engineering Capacity in Nigeria',
  'The question of local content in Nigeria''s oil and gas sector has shifted from a regulatory compliance issue to a genuine strategic priority for operators.',
  json_array(
    'ANBE Nigeria Limited was founded with the explicit goal of demonstrating that indigenous technical talent could meet international engineering standards in a sector that had, for decades, treated expatriate expertise as the default for technically demanding scopes. Our engineers progress through a structured competency framework that maps against the technical requirements of each service line.',
    'Practical equipment exposure is the element most often missing from graduate engineering development in Nigeria. ANBE addresses this through a structured placement programme at our Port Harcourt fabrication workshop, where graduate engineers spend at least three months working alongside experienced fabricators before moving to site roles.',
    'The long-term value of indigenous capacity building extends beyond any individual company''s balance sheet. ANBE''s alumni now hold technical leadership roles at operators, other contractors, and regulatory bodies across the Niger Delta region. That diffusion of competency is the most durable contribution an indigenous engineering company can make to Nigeria''s oil and gas sector.'
  ),
  'Company',
  '/group.jpg',
  '4 min read',
  1
),
(
  'hse-permit-to-work',
  'Why Permit-to-Work Systems Save Lives on Oil & Gas Sites',
  'The permit-to-work system is the single most important administrative control on an oil and gas construction or maintenance site.',
  json_array(
    'A permit-to-work (PTW) system is not a form. It is a structured authorisation process that ensures hazardous work is only carried out after the hazards have been identified, the controls have been implemented, and the people doing the work understand both. ANBE''s PTW procedure is aligned with the Energy Institute''s Model Permit-to-Work framework.',
    'Toolbox talks are the field-level expression of the PTW system. ANBE''s HSE team trains site supervisors to run toolbox talks that focus on the specific hazards of the task in front of them that day — not a generic recitation of general site rules. A supervisor preparing a toolbox talk for a hot-work permit should be discussing the specific gas reading from that morning''s atmospheric monitoring.',
    'The most dangerous indicator on any oil and gas site is not a single unsafe act — it is a culture where permit shortcuts are normalised. ANBE''s approach to maintaining PTW discipline includes monthly PTW compliance audits by an independent HSE officer, stop-work authority training for all field personnel, and a non-punitive close-call reporting process.'
  ),
  'Safety',
  '/industrial-8.jpg',
  '5 min read',
  1
),
(
  'fabrication-workshop-expansion',
  'ANBE Expands Port Harcourt Fabrication Workshop',
  'ANBE Nigeria Limited has completed the expansion of its Port Harcourt fabrication facility, adding a dedicated skid fabrication bay with increased crane capacity and a new pressure testing station.',
  json_array(
    'The expansion adds approximately 800 square metres of covered workshop space to the existing facility, bringing total covered floor area to over 2,400 square metres. The new bay is equipped with a 10-tonne overhead crane — double the capacity of the original facility — which enables in-house handling of fully assembled skid packages up to the point of load-out for site delivery.',
    'The new pressure testing station has been constructed to ASME B31.3 hydrostatic test requirements, with an isolated test zone, certified test pumps, and pressure recorders with calibration certificates traceable to national standards. The station can accommodate piping spools, vessels, and skid packages up to a test pressure of 350 bar.',
    'The workshop expansion reflects ANBE''s strategic intent to grow its share of fabrication and procurement contracts that have historically been placed with international fabricators due to capacity constraints among Nigerian fabricators. Bringing fabrication fully in-house reduces lead times, simplifies quality oversight, and removes foreign exchange exposure.'
  ),
  'Fabrication',
  '/industrial-3.jpg',
  '4 min read',
  1
),
(
  'epc-contracting-nigeria',
  'EPC Contracting in Nigeria''s Oil & Gas Sector: Trends and Opportunities',
  'The structure of EPC contracting in Nigeria''s oil and gas sector is undergoing a meaningful shift. International contractors who dominated the market are reassessing their Nigeria strategies.',
  json_array(
    'The withdrawal or restructuring of several international EPC contractors from Nigeria''s upstream market over the past five years has been driven by a combination of factors: the prolonged oil price environment, community and security challenges in the Niger Delta, and the structural difficulty of generating acceptable returns under the overhead cost structures of large international firms.',
    'For indigenous contractors, the opportunity is real but the barriers to entry are significant. True EPC capability requires not just technical competence in individual disciplines but the project management systems, procurement infrastructure, and financial capacity to carry a project from front-end engineering through mechanical completion and handover.',
    'The medium-term outlook for indigenous EPC contractors in Nigeria is positive, driven by three converging factors: progressive divestment of IOC assets to indigenous producers, Nigeria''s deepwater and gas monetisation projects, and regulatory evolution under the Petroleum Industry Act 2021 that has created clearer frameworks for project sanctioning.'
  ),
  'Industry',
  '/industrial-10.jpg',
  '7 min read',
  1
);

-- ── Projects ──────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO projects (slug, title, client, category, description, location, duration, scope, image, published) VALUES
('smokeless-flare-retrofit', 'Smokeless Flare Stack Retrofit', 'Niger Delta Terminal', 'flare', 'Design and fabrication of a high turndown flare system to replace an ageing stack at an onshore export terminal, engineered to reduce visible smoke and improve combustion efficiency under variable gas rates.', 'Rivers State', '7 Months', 'Design & Fabrication', '/industrial-1.jpg', 1),
('trunkline-replacement', '18km Trunkline Replacement', 'Delta State Flowline', 'pipeline', 'Full pipeline construction and hydrotesting scope covering an 18-kilometre flowline, delivered with zero lost-time incidents across an 11-month construction programme.', 'Delta State', '11 Months', 'Construction', '/industrial-5.jpg', 1),
('remote-ignition-upgrade', 'Remote Ignition System Upgrade', 'Rivers State Facility', 'fabrication', 'Installation of a tropicalised remote ignition system across three flare points, reducing manual intervention and improving ignition reliability during the wet season.', 'Rivers State', '4 Months', 'Fabrication & Install', '/industrial-9.jpg', 1),
('tiein-row-reinstatement', 'Tie-In & Right-of-Way Reinstatement', 'Bayelsa Flowstation', 'pipeline', 'Emergency tie-in works and pipeline right-of-way restoration completed within a compressed shutdown window to minimise production downtime.', 'Bayelsa State', '6 Weeks', 'Construction & Repair', '/industrial-7.jpg', 1),
('vertical-flare-installation', 'Vertical Smokeless Flare Installation', 'Independent E&P Operator', 'flare', 'New-build vertical flare stack designed and installed for a marginal field development, commissioned ahead of first oil to meet regulatory gas-flaring standards.', 'Rivers State', '5 Months', 'Design, Procurement & Install', '/industrial-2.jpg', 1),
('combustion-equipment-overhaul', 'Combustion Equipment Overhaul', 'Onshore Processing Facility', 'maintenance', 'Scheduled maintenance of ignition assemblies and generator sets across a producing facility utility train, extending equipment service life.', 'Rivers State', 'Ongoing Contract', 'Equipment Maintenance', '/industrial-11.jpg', 1),
('separator-skid-package', 'Skid-Mounted Separator Package', 'Port Harcourt Workshop Client', 'fabrication', 'In-house fabrication and pressure testing of a skid-mounted separator package at ANBE Port Harcourt workshop ahead of site delivery.', 'Port Harcourt', '3 Months', 'Fabrication', '/industrial-3.jpg', 1),
('pipeline-integrity-repair', 'Pipeline Integrity Repair Programme', 'Rivers State Trunkline', 'pipeline', 'Multi-location pipeline repair and recoating programme following a routine integrity assessment across an operator trunkline network.', 'Rivers State', '8 Months', 'Repair & Recoating', '/industrial-4.jpg', 1),
('earthmoving-maintenance', 'Earth-Moving Fleet Maintenance Contract', 'Regional Field Operator', 'maintenance', 'Ongoing maintenance contract covering a fleet of earth-moving equipment supporting active field construction works.', 'Niger Delta', 'Ongoing Contract', 'Equipment Maintenance', '/industrial-6.jpg', 1);

-- ── Services ──────────────────────────────────────────────────────────────
INSERT OR IGNORE INTO services (idx, title, description, features, image, sort_order) VALUES
('01 — DESIGN & ENGINEERING', 'Smokeless Flare & Ignition Systems', 'Design and fabrication of vertical and horizontal smokeless flares, high turndown flares, and tropicalised remote ignition systems.', '["Vertical & Horizontal Flares","High Turndown Design","Remote Ignition Systems","Tropicalised Components"]', '/industrial-1.jpg', 1),
('02 — CONSTRUCTION', 'Pipeline Construction & Repair', 'Full-scope pipeline construction, installation, and repair, including tie-ins, hydrotesting, and right-of-way reinstatement across any terrain.', '["New Pipeline Construction","Emergency Tie-ins","Hydrotesting","ROW Reinstatement"]', '/industrial-5.jpg', 2),
('03 — PROCUREMENT', 'Procurement & Stockpiling', 'Sourcing, quality verification, and stockpiling of materials and equipment for oil & gas facility construction with vendor management.', '["Material Sourcing","Quality Verification","Vendor Management","Stockpile Management"]', '/industrial-9.jpg', 3),
('04 — FABRICATION', 'Fabrication & Workshop Services', 'In-house fabrication of flare components, structural steel, and skid-mounted equipment at our Port Harcourt facility with full QA/QC inspection.', '["Flare Components","Structural Steel","Skid Fabrication","QA/QC Inspection"]', '/industrial-3.jpg', 4),
('05 — MAINTENANCE', 'Equipment Maintenance', 'Combustion equipment maintenance covering generators, earth-moving equipment, and flare ignition assemblies with 24/7 emergency response.', '["Preventive Maintenance","Emergency Response","Generator Overhaul","Ignition Assemblies"]', '/industrial-11.jpg', 5),
('06 — SUPPORT', '24/7 Technical Partner Support', 'Direct access to ANBE Technical Partners for specialist expertise across the full life cycle of a facility.', '["Round-the-Clock Support","Specialist Advisory","Field Response Teams","Life-cycle Management"]', '/industrial-7.jpg', 6);
