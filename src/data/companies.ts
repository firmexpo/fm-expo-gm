export interface ProductionCapability {
  name: string;
  detail: string;
  metric: string;
}

export interface ProductionProduct {
  id: string;
  name: string;
  category: string;
  spec: string;
  tolerance: string;
  material: string;
  imageSrc?: string;
}

export interface ProductionCompany {
  id: string;
  name: string;
  tagline: string;
  sector: 'CNC Machining' | 'Industrial Machinery' | 'Steel & Metals' | 'Medical Equipment' | 'Automotive' | 'Electronics';
  location: string;
  facilitySize: string;
  workforce: string;
  certifications: string[];
  capabilities: ProductionCapability[];
  equipment: string[];
  keyProducts: ProductionProduct[];
  imageSrc?: string;
  overview: string;
  ambition: string;
  established: number;
}

export const PRODUCTION_COMPANIES: ProductionCompany[] = [
  {
    id: 'vanguard-cnc',
    name: 'Vanguard Precision Machining',
    tagline: '5-Axis Simultaneous Aerospace & Energy Milling',
    sector: 'CNC Machining',
    location: 'Stuttgart, Germany & Greenville, SC',
    facilitySize: '85,000 sq ft',
    workforce: '140 Specialists',
    certifications: ['ISO 9001:2015', 'AS9100D', 'ITAR Compliant'],
    established: 1998,
    overview: 'Specialized in ultra-critical geometric tolerances for aerospace flight hardware, turbomachinery impellers, and cryogenic energy valve manifolds.',
    ambition: 'Expanding high-speed multi-axis cell capacity to 50 automated production nodes by Q4 2027.',
    capabilities: [
      { name: '5-Axis Milling', detail: 'Hermle C42 & Mazak Variaxis cells', metric: '±0.002 mm tolerance' },
      { name: 'Wire EDM & Sinker', detail: 'AgieCharmilles CUT P 550 Pro', metric: 'Ra 0.08 µm finish' },
      { name: 'High-Temperature Alloys', detail: 'Inconel 718, Titanium Grade 5, Hastelloy', metric: '100% Traceability' },
    ],
    equipment: [
      'Hermle C42 Dynamic 5-Axis (x4)',
      'Mazak Integrex i-400 Multi-Tasking (x3)',
      'Zeiss PRISMO Ultra High-Precision CMM',
      'AgieCharmilles Wire EDM',
    ],
    keyProducts: [
      {
        id: 'p1',
        name: 'Monolithic Titanium Blisk Rotor',
        category: 'Aerospace Propulsion',
        spec: 'Diameter 480 mm / 32 Blades',
        tolerance: '±0.003 mm',
        material: 'Ti-6Al-4V Grade 5',
      },
      {
        id: 'p2',
        name: 'Cryogenic Valve Manifold Block',
        category: 'Clean Energy & Liquefaction',
        spec: 'Operating Pressure 650 Bar',
        tolerance: '±0.005 mm',
        material: 'Inconel 625',
      },
    ],
  },
  {
    id: 'krupp-vander',
    name: 'Krupp-Vander Industrial Systems',
    tagline: 'Heavy Industrial Machinery, Presses & Robotic Cells',
    sector: 'Industrial Machinery',
    location: 'Linz, Austria & Detroit, MI',
    facilitySize: '160,000 sq ft',
    workforce: '290 Engineers & Builders',
    certifications: ['ISO 9001', 'CE Machinery Directive', 'UL 508A'],
    established: 1984,
    overview: 'Designers and builders of automated hydraulic stamping presses, heavy composite molding cells, and integrated transfer robotics for high-volume OEMs.',
    ambition: 'Pioneering zero-hydraulic servo-electric heavy presses up to 2,500 metric tons with 40% reduced energy footprint.',
    capabilities: [
      { name: 'Servo Press Systems', detail: 'Continuous stroke programmable force', metric: 'Up to 3,000 Tons' },
      { name: 'Robotic Integration', detail: 'Multi-arm automated de-stacking', metric: '0.4s cycle time' },
      { name: 'Heavy Frame Fabrication', detail: 'Stress-relieved welded machine beds', metric: 'Single piece 60T' },
    ],
    equipment: [
      'PAMA Speedram 2000 CNC Floor Borer',
      'Waldrich Coburg Portal Milling Machine',
      '60-Ton Overhead Crane Bays',
      'Automated Plasma Beveling Cells',
    ],
    keyProducts: [
      {
        id: 'p3',
        name: 'OmniServo 1600T Stamping Cell',
        category: 'Automotive Press Lines',
        spec: 'Stroke 800 mm / 40 SPM',
        tolerance: '±0.010 mm parallelism',
        material: 'Forged Cast Steel Bed',
      },
      {
        id: 'p4',
        name: 'High-Tonnage Composite Molding Press',
        category: 'Structural Carbon Forming',
        spec: 'Heated Platen 3000 x 2000 mm',
        tolerance: '±0.5°C thermal uniformity',
        material: 'Alloy Tool Steel Plates',
      },
    ],
  },
  {
    id: 'aegis-bio',
    name: 'Aegis Bio-Surgical Implants',
    tagline: 'Micron-Tolerance Medical & Orthopedic Manufacturing',
    sector: 'Medical Equipment',
    location: 'Neuchâtel, Switzerland',
    facilitySize: '45,000 sq ft (ISO Class 7 Cleanrooms)',
    workforce: '95 Bio-Machinists',
    certifications: ['ISO 13485:2016', 'FDA 21 CFR 820', 'CE MDR Annex IX'],
    established: 2007,
    overview: 'Manufacturer of custom spinal fixation cages, porous titanium acetabular cups, and high-precision neurosurgical endoscopic instruments.',
    ambition: 'Scaling direct additive-subtractive hybrid production for patient-matched surgical implants with same-day dispatch.',
    capabilities: [
      { name: 'Swiss Micro-Turning', detail: 'Citizen & Tornos 10-axis lathes', metric: 'Ø 0.8 mm to 25 mm' },
      { name: 'Selective Laser Melting', detail: 'Medical-grade porous 3D titanium', metric: '65% controlled porosity' },
      { name: 'Passivation & Electropolish', detail: 'ASTM F86 automated processing lines', metric: 'Zero residue surface' },
    ],
    equipment: [
      'Citizen Cincom L20 XII (x6)',
      'EOS M 290 Titanium Cleanroom 3D Printer',
      'Keyence Optical CMM & Laser Profilometers',
      'Automated Ultrasonic Multi-Stage Wash Line',
    ],
    keyProducts: [
      {
        id: 'p5',
        name: 'Trabecular Porous Hip Acetabular Cup',
        category: 'Orthopedic Implants',
        spec: 'Diameter 44 - 66 mm',
        tolerance: '±0.001 mm sphericity',
        material: 'Ti-6Al-4V ELI (ASTM F136)',
      },
      {
        id: 'p6',
        name: 'Expandable Minimally Invasive Spine Cage',
        category: 'Neurosurgery',
        spec: 'Continuous Height Expansion 9 - 15 mm',
        tolerance: 'Micro-locking tooth pitch ±0.002 mm',
        material: 'Medical PEEK & Titanium',
      },
    ],
  },
  {
    id: 'titan-metallics',
    name: 'Titanium Forge & Advanced Metals',
    tagline: 'Engineered Forgings, Superalloys & Structural Fabrication',
    sector: 'Steel & Metals',
    location: 'Sheffield, United Kingdom & Pittsburgh, PA',
    facilitySize: '210,000 sq ft',
    workforce: '340 Metallurgists & Technicians',
    certifications: ['ISO 9001', 'AS9100D', 'NADCAP Heat Treat & NDT'],
    established: 1968,
    overview: 'Specialist open-die and closed-die forging, vacuum induction melting, and precision heavy ring rolling for marine, defense, and power generation.',
    ambition: 'Establishing the first 100% green-hydrogen powered superalloy remelting plant by 2028.',
    capabilities: [
      { name: 'Radial Forging', detail: 'Continuous billet consolidation', metric: 'Bars up to Ø 550 mm' },
      { name: 'Seamless Ring Rolling', detail: 'Aerospace casing & turbine rings', metric: 'Diameters up to 4,200 mm' },
      { name: 'Vacuum Heat Treatment', detail: 'Quenching in controlled inert gas', metric: '±3°C uniform zone' },
    ],
    equipment: [
      '5,000-Ton Open Die Hydraulic Press',
      'Wagner-Banning Seamless Ring Rolling Mill',
      'NADCAP Qualified Ipsen Vacuum Furnaces',
      'Immersion Ultrasonic Testing Tank',
    ],
    keyProducts: [
      {
        id: 'p7',
        name: 'Turbine Fan Case Forged Ring',
        category: 'Aviation Turbines',
        spec: 'Diameter 2,400 mm / Weight 1,850 kg',
        tolerance: '±0.8 mm forged allowance',
        material: 'Waspaloy / Nickel Base',
      },
      {
        id: 'p8',
        name: 'Offshore Subsea Forged Drill Risers',
        category: 'Deepwater Marine',
        spec: 'Length 12 m / Wall Thickness 45 mm',
        tolerance: 'Yield Strength 690 MPa',
        material: 'F22 Forged Alloy Steel',
      },
    ],
  },
  {
    id: 'hyperion-ev',
    name: 'Hyperion E-Mobility Powertrains',
    tagline: 'High-Power Electric Drive Stators, Rotors & Inverters',
    sector: 'Automotive',
    location: 'Turin, Italy & Fremont, CA',
    facilitySize: '120,000 sq ft',
    workforce: '210 Powertrain Engineers',
    certifications: ['IATF 16949:2016', 'ISO 26262 ASIL-D', 'ISO 14001'],
    established: 2014,
    overview: 'Tier-1 manufacturer of hairpin wound electric motor stators, continuous cast rotor shafts, and liquid-cooled 800V silicon-carbide power inverters.',
    ambition: 'Delivering next-generation axial-flux drive units achieving 18 kW/kg gravimetric power density.',
    capabilities: [
      { name: 'Hairpin Stator Winding', detail: 'Automated copper bar forming & CNC laser strip', metric: '98.5% slot fill factor' },
      { name: 'Dynamic Rotor Balancing', detail: 'High-speed test cell validation', metric: 'G 0.4 balance grade at 24,000 RPM' },
      { name: 'Silicon Carbide Packaging', detail: 'Direct liquid-cooled sintering', metric: '800V Architecture' },
    ],
    equipment: [
      'Aumann Automated Hairpin Production Line',
      'Schuler High-Speed Lamination Blanking Press',
      'Schenck High-Speed Dynamic Balancing Benches',
      'Automated End-of-Line Dyno Test Cells',
    ],
    keyProducts: [
      {
        id: 'p9',
        name: 'Dual-Inverter Integrated E-Axle Stator',
        category: 'EV Powertrains',
        spec: 'Continuous Power 320 kW / 97.4% Efficiency',
        tolerance: 'Coaxial runout < 0.008 mm',
        material: 'Grain-Oriented Silicon Steel & OFHC Copper',
      },
      {
        id: 'p10',
        name: 'High-Speed Carbon-Sleeved Rotor',
        category: 'Motorsports & Hypercars',
        spec: 'Speed Limit 28,000 RPM / Peak Torque 650 Nm',
        tolerance: 'Concentricity 0.004 mm',
        material: 'Filament-Wound Carbon Fiber & NdFeB',
      },
    ],
  },
  {
    id: 'optopulse-tech',
    name: 'OptoPulse Industrial Telemetry',
    tagline: 'Ruggedized Harsh-Environment Sensors & Edge Controllers',
    sector: 'Electronics',
    location: 'Eindhoven, Netherlands & Austin, TX',
    facilitySize: '60,000 sq ft',
    workforce: '115 Hardware Engineers',
    certifications: ['ISO 9001', 'ATEX Zone 0 / IECEx', 'IPC-A-610 Class 3'],
    established: 2011,
    overview: 'Designer and SMT fabricator of explosion-proof vibration transducers, multi-axis optical encoders, and hardened gigabit industrial Ethernet edge switches.',
    ambition: 'Enabling real-time predictive failure telemetry on rotating heavy machinery across 10,000 continuous operating hours.',
    capabilities: [
      { name: 'SMT High-Speed Assembly', detail: 'Yamaha 01005 component placement', metric: '90,000 CPH' },
      { name: 'Potting & Environmental Encapsulation', detail: 'Automated 2-part polyurethane dispensing', metric: 'IP69K Submersible' },
      { name: 'Full Automated Optical Inspection (AOI)', detail: '3D solder paste & component coplanarity', metric: '0 PPM Escape Rate' },
    ],
    equipment: [
      'Yamaha YSM20R SMT Line with Nitrogen Reflow',
      'Koh Young 3D SPI & AOI Inspection Stations',
      'Cincinnati Sub-Zero Thermal Shock Test Chambers',
      'ATEX Certified Gas Explosion Test Chamber',
    ],
    keyProducts: [
      {
        id: 'p11',
        name: 'Tri-Axial Hazardous-Location Vibration Sensor',
        category: 'Industrial IoT',
        spec: 'Frequency Range 0.5 Hz - 18 kHz / Temp -50°C to +150°C',
        tolerance: 'Linearity ±0.5%',
        material: '316L Stainless Steel Welded Enclosure',
      },
      {
        id: 'p12',
        name: 'Absolute Optical Rotary Ring Encoder',
        category: 'Precision Robotics',
        spec: 'Resolution 26-bit (67M counts/rev)',
        tolerance: 'Accuracy ±5 arcseconds',
        material: 'Anodized Aircraft Aluminum Housing',
      },
    ],
  },
];
