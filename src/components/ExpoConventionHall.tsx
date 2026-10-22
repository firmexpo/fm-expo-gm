'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Volume2,
  VolumeX,
  Users,
  Compass,
  FileText,
  CreditCard,
  Send,
  Eye,
  RotateCw,
  Box,
  CheckCircle2,
  Calendar,
  Layers,
  X,
  ShoppingBag,
  Download,
  ChevronRight,
  ChevronLeft,
  Tv,
} from 'lucide-react';

interface ExpoConventionHallProps {
  initialBoothId?: string;
  onExit?: () => void;
  isStandalonePage?: boolean;
}

// Industrial products displayed on the trade show plinth
interface ExpoProduct {
  id: string;
  name: string;
  category: string;
  material: string;
  tolerance: string;
  surfaceFinish: string;
  leadTime: string;
  description: string;
  specs: { label: string; value: string }[];
  modelType: 'impeller' | 'valve' | 'implant' | 'spindle';
}

const EXPO_PRODUCTS: ExpoProduct[] = [
  {
    id: 'inconel-impeller',
    name: '5-Axis Inconel 718 Turbine Impeller',
    category: 'Aerospace & Turbomachinery',
    material: 'Inconel 718 Superalloy',
    tolerance: '±0.0025 mm (2.5 µm)',
    surfaceFinish: 'Ra 0.2 µm Mirror Polish',
    leadTime: '12 business days',
    description: 'Monolithic integrally bladed rotor (Blisk) milled on DMG MORI 5-axis simultaneous CNC. Engineered for high-temperature extreme rotational stress up to 48,000 RPM.',
    specs: [
      { label: 'Blade Thickness', value: '0.42 mm leading edge' },
      { label: 'Runout Tolerance', value: '< 0.0018 mm TIR' },
      { label: 'Dynamic Balance', value: 'ISO 1940-1 Grade G 1.0' },
      { label: 'Inspection', value: 'Zeiss CMM Zeiss Prismo (Scan 100%)' },
    ],
    modelType: 'impeller',
  },
  {
    id: 'hydraulic-manifold',
    name: 'Hardened Tool-Steel Valve Manifold Block',
    category: 'Fluid Power & Heavy Automation',
    material: 'AISI 4140 Quenched & Tempered',
    tolerance: '±0.005 mm bore alignment',
    surfaceFinish: 'Ra 0.4 µm internal chambers',
    leadTime: '8 business days',
    description: 'Multi-cavity hydraulic control block rated to 450 Bar operating pressure. Deep-hole gun-drilled cross channels with zero-burr micro-deburring.',
    specs: [
      { label: 'Burst Pressure', value: '> 1,200 Bar Proof Tested' },
      { label: 'Spool Bore Cylindricity', value: '0.002 mm along 180 mm' },
      { label: 'Coating', value: 'Electroless Nickel 25 µm' },
      { label: 'Leakage Rate', value: '< 0.01 cc/min at 350 Bar' },
    ],
    modelType: 'valve',
  },
  {
    id: 'medical-implant',
    name: 'Surgical Titanium Spinal Fusion Cage',
    category: 'Medical Device & Orthopedics',
    material: 'Ti-6Al-4V ELI (ASTM F136)',
    tolerance: '±0.003 mm precision tooth mesh',
    surfaceFinish: 'Ra 0.8 µm porous bone-interface',
    leadTime: '10 business days',
    description: 'Class III surgical orthopedic implant featuring bio-mimetic trabecular micro-lattice mesh for accelerated osteointegration. Cleanroom washed and packed in ISO Class 7.',
    specs: [
      { label: 'Biocompatibility', value: 'ISO 10993 certified' },
      { label: 'Cleanliness Assay', value: 'ASTM F2847 particle test' },
      { label: 'Traceability', value: 'Laser UDI micro-matrix code' },
      { label: 'Sterility Barrier', value: 'Double Tyvek blister pack' },
    ],
    modelType: 'implant',
  },
  {
    id: 'spindle-quill',
    name: 'Ultra-High-Speed Precision Spindle Quill',
    category: 'Machine Tool Subsystems',
    material: 'Nitride Hardened 38CrMoAlA',
    tolerance: '±0.001 mm bearing seats',
    surfaceFinish: 'Ra 0.1 µm superfinished',
    leadTime: '14 business days',
    description: 'Core shaft for 24,000 RPM motorized milling spindle with ceramic hybrid angular contact bearing raceways and internal cooling channels.',
    specs: [
      { label: 'Core Hardness', value: 'HRC 62-64 Nitrided' },
      { label: 'Radial Runout', value: '< 0.0008 mm' },
      { label: 'Taper Standard', value: 'HSK-E40 Dynamic Spec' },
      { label: 'Thermal Drift', value: '< 2.1 µm across 8 hr run' },
    ],
    modelType: 'spindle',
  },
];

// Hall 1 Exhibitors for the interactive floor map
const HALL_EXHIBITORS = [
  { id: 'A-104', name: 'NovaPrecision Manufacturing', sector: 'CNC & Aerospace Machining', boothType: '12×8m Island (Featured Demo)', color: '#FF6B00', isCurrent: true, x: 44, y: 38, width: 22, height: 18 },
  { id: 'A-101', name: 'Apex Precision Gears', sector: 'High-Torque Gearboxes', boothType: '8×6m Corner', color: '#38BDF8', isCurrent: false, x: 14, y: 16, width: 18, height: 14 },
  { id: 'A-108', name: 'MicroMatrix Swiss Turning', sector: 'Micro-Sensors & Watchmaking', boothType: '6×4m Inline', color: '#A855F7', isCurrent: false, x: 74, y: 16, width: 16, height: 14 },
  { id: 'B-201', name: 'Titan Heavy Forging & Die', sector: 'Open-Die Drop Forgings', boothType: '12×10m Heavy Stand', color: '#EAB308', isCurrent: false, x: 14, y: 68, width: 26, height: 20 },
  { id: 'B-205', name: 'Vulcan Hydraulic Power', sector: 'Proportional Fluid Valves', boothType: '8×8m Peninsula', color: '#10B981', isCurrent: false, x: 48, y: 68, width: 18, height: 20 },
  { id: 'C-302', name: 'BioMed Cleanroom Implants', sector: 'ISO Class 7 Medical Tech', boothType: '10×8m Clean Booth', color: '#F43F5E', isCurrent: false, x: 72, y: 68, width: 18, height: 20 },
];

export const ExpoConventionHall: React.FC<ExpoConventionHallProps> = ({
  onExit,
  isStandalonePage = false,
}) => {
  // Navigation tabs within the trade show hall
  const [activeTab, setActiveTab] = useState<'stand' | 'floorplan' | 'aisle' | 'schedule'>('stand');
  
  // Audio state (Web Audio API synth)
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  // Selected product on the booth display turntable
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const activeProduct = EXPO_PRODUCTS[selectedProductIndex];

  // 3D Turntable controls
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [is3DWireframe, setIs3DWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [calipersOverlay, setCalipersOverlay] = useState(true);

  // Trade show delegate kit
  const [toteBag, setToteBag] = useState<string[]>([
    'NovaPrecision 2026 Capabilities Catalog (PDF)',
    'ISO 9001:2015 & AS9100D Certificate Dossier',
  ]);
  const [showToteModal, setShowToteModal] = useState(false);
  const [badgeExpanded, setBadgeExpanded] = useState(false);

  // Booth interactive activities
  const [businessCardDropped, setBusinessCardDropped] = useState(false);
  const [videoScreenPlaying, setVideoScreenPlaying] = useState(true);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  
  // Interactive Booth Dialog with representatives
  const [chatLog, setChatLog] = useState<{ sender: 'rep' | 'visitor'; text: string; time: string }[]>([
    {
      sender: 'rep',
      text: 'Guten Tag! Welcome to NovaPrecision Booth #A-104. I am Alex Morgan, Managing Director. Are you looking for low-volume aerospace prototypes or high-volume precision turning?',
      time: '10:04 AM',
    },
  ]);
  const [quickQuestion, setQuickQuestion] = useState('');

  // Ticker announcements
  const [tickerIndex, setTickerIndex] = useState(0);
  const TICKER_MESSAGES = [
    'PA ANNOUNCEMENT: Live 5-Axis Inconel 718 machining demo underway at Booth A-104 (NovaPrecision)',
    'HALL 1 STATUS: 2,842 verified engineering delegates and procurement officers checked in',
    'EXHIBITOR NOTE: NovaPrecision announces AS9100D Revision D re-certification with zero non-conformances',
    'KEYNOTE ALERT: 14:00 CET — High-Feed Milling in Superalloys at the Central Hall 1 Auditorium',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio API chime & ambient sound
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pleasant two-tone convention hall announcement chime (523Hz C5 -> 659Hz E5)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.exponentialRampToValueAtTime(523.25, now + 0.3);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.32);
      osc2.frequency.exponentialRampToValueAtTime(659.25, now + 0.8);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.35);
      osc2.start(now + 0.32);
      osc2.stop(now + 1.2);
    } catch {
      // Audio autoplay gracefully handled
    }
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      playChime();
    } else {
      setSoundEnabled(false);
    }
  };

  // Three.js Render for the Trade Show Turntable Plinth
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a10);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.8, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Stage Lighting (Spotlight from overhead truss rig)
    const ambientLight = new THREE.AmbientLight(0xddeeff, 0.85);
    scene.add(ambientLight);

    const overheadSpot = new THREE.SpotLight(0xffffff, 4.5, 25, Math.PI / 4, 0.3);
    overheadSpot.position.set(0, 7, 3);
    overheadSpot.castShadow = true;
    scene.add(overheadSpot);

    const safetyOrangeKey = new THREE.DirectionalLight(0xff6b00, 2.5);
    safetyOrangeKey.position.set(-5, 3, 4);
    scene.add(safetyOrangeKey);

    const coldRimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    coldRimLight.position.set(5, 2, -4);
    scene.add(coldRimLight);

    // Trade Show Acrylic Plinth Base with glowing neon ring
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const plinthMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.4, 48), plinthMat);
    plinthMesh.position.y = -1.1;
    plinthMesh.receiveShadow = true;
    scene.add(plinthMesh);

    // Glowing orange rim ring
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1.61, 0.03, 16, 64), ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.9;
    scene.add(ringMesh);

    // Component Group
    const productGroup = new THREE.Group();
    scene.add(productGroup);

    // Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xd4d8df,
      metalness: 0.92,
      roughness: 0.22,
      wireframe: is3DWireframe,
    });

    const brassAccentMat = new THREE.MeshStandardMaterial({
      color: 0xff7b00,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: is3DWireframe,
    });

    // Build model by active type
    const modelType = activeProduct.modelType;
    if (modelType === 'impeller') {
      // 5-Axis Inconel Impeller Blisk
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, 0.9, 36), titaniumMat);
      hub.castShadow = true;
      productGroup.add(hub);

      const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.95, 24), brassAccentMat);
      productGroup.add(bore);

      for (let i = 0; i < 14; i++) {
        const bladeGeo = new THREE.BoxGeometry(0.06, 0.75, 0.6);
        const blade = new THREE.Mesh(bladeGeo, titaniumMat);
        const angle = (i / 14) * Math.PI * 2;
        blade.position.set(Math.sin(angle) * 1.1, 0, Math.cos(angle) * 1.1);
        blade.rotation.y = angle + 0.45;
        blade.rotation.z = 0.25;
        blade.castShadow = true;
        productGroup.add(blade);
      }
    } else if (modelType === 'valve') {
      // Hydraulic Manifold Block
      const block = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.2), titaniumMat);
      block.castShadow = true;
      productGroup.add(block);

      // Cavities and fittings
      for (let x = -0.5; x <= 0.5; x += 0.5) {
        const port = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.25, 24), brassAccentMat);
        port.position.set(x, 0, 0);
        productGroup.add(port);
      }
      for (let y = -0.3; y <= 0.3; y += 0.6) {
        const sidePort = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.65, 24), brassAccentMat);
        sidePort.rotation.z = Math.PI / 2;
        sidePort.position.set(0, y, 0);
        productGroup.add(sidePort);
      }
    } else if (modelType === 'implant') {
      // Medical Spinal Fusion Cage
      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.3, 24, 48), titaniumMat);
      outerRing.castShadow = true;
      productGroup.add(outerRing);

      const centralMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 2), brassAccentMat);
      productGroup.add(centralMesh);

      for (let i = 0; i < 8; i++) {
        const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 12), titaniumMat);
        const angle = (i / 8) * Math.PI;
        strut.rotation.z = angle;
        productGroup.add(strut);
      }
    } else {
      // Precision Spindle Quill Shaft
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2.4, 32), titaniumMat);
      shaft.castShadow = true;
      productGroup.add(shaft);

      const collar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.25, 32), brassAccentMat);
      collar1.position.y = 0.5;
      productGroup.add(collar1);

      const collar2 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.3, 32), titaniumMat);
      collar2.position.y = -0.4;
      productGroup.add(collar2);
    }

    productGroup.position.y = 0.2;

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating) {
        productGroup.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [selectedProductIndex, is3DWireframe, isRotating]);

  // Handle asking questions to booth representatives
  const handleSendQuestion = (text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      sender: 'visitor' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatLog((prev) => [...prev, userMsg]);
    setQuickQuestion('');

    if (soundEnabled) playChime();

    // Context-aware engineering answer
    setTimeout(() => {
      let reply = "Our 5-axis CNC machining centers hold tight tolerances down to ±0.0025 mm with full 3D Zeiss Prismo CMM metrology inspection reports included with each batch.";
      const lower = text.toLowerCase();
      if (lower.includes('lead') || lower.includes('time') || lower.includes('fast')) {
        reply = "Standard prototype runs ship in 5 to 8 business days; full production batches typically run 2 to 3 weeks depending on material pre-procurement (Inconel, PEEK, Titanium).";
      } else if (lower.includes('as9100') || lower.includes('iso') || lower.includes('cert')) {
        reply = "Yes, we are dual-certified ISO 9001:2015 and AS9100D (Aerospace & Defense). All raw billets include full mill heat-lot certs and 100% material traceability.";
      } else if (lower.includes('price') || lower.includes('quote') || lower.includes('cost')) {
        reply = "Drop your business card or submit a quick RFQ right at the counter! We provide formal fixed-price engineering quotes within 24 hours of receiving CAD/STEP drawings.";
      } else if (lower.includes('capacity') || lower.includes('machine') || lower.includes('equipment')) {
        reply = "Our clean facility in Baden-Württemberg operates 18 5-axis simultaneous CNC mills, 12 multi-spindle Swiss lathes, and 3 temperature-controlled metrology labs.";
      }

      setChatLog((prev) => [
        ...prev,
        {
          sender: 'rep',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  // Add document to attendee's Expo Tote Bag
  const handleTakeBrochure = (docName: string) => {
    if (!toteBag.includes(docName)) {
      setToteBag((prev) => [...prev, docName]);
    }
    setShowToteModal(true);
    if (soundEnabled) playChime();
  };

  // Drop digital business card into fishbowl
  const handleDropCard = () => {
    setBusinessCardDropped(true);
    if (soundEnabled) playChime();
    if (!toteBag.includes('Receipt: Official NovaPrecision Follow-up Request')) {
      setToteBag((prev) => [...prev, 'Receipt: Official NovaPrecision Follow-up Request']);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#04070D] text-slate-100 flex flex-col font-sans selection:bg-[#FF6B00] selection:text-white">
      
      {/* =========================================================================
          TOP EXPO CONVENTION BANNER & PA TICKER
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#090E17]/95 backdrop-blur-md border-b border-[#1E293B] shadow-xl">
        {/* Top Operational Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          
          {/* Expo Hall Identification */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="font-extrabold text-white tracking-wider uppercase">FIRMEXPO 2026</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 hidden sm:inline">CONVENTION CENTER · HALL 1</span>
            <span className="px-2 py-0.5 rounded bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 font-bold">
              BOOTH #A-104 (NOVAPRECISION)
            </span>
          </div>

          {/* Sound, Attendees & Exit Controls */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Live Attendee Counter */}
            <div className="hidden md:flex items-center gap-1.5 text-slate-300 bg-[#111A24] px-2.5 py-1 rounded border border-[#223142]">
              <Users className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>2,842 in Hall</span>
            </div>

            {/* PA Sound Atmosphere Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors cursor-pointer text-xs ${
                soundEnabled
                  ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]'
                  : 'bg-[#111A24] border-[#223142] text-slate-400 hover:text-slate-200'
              }`}
              title={soundEnabled ? 'PA Audio Active' : 'Enable Convention PA & Chime'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#FF6B00]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'PA Audio ON' : 'PA Audio OFF'}</span>
            </button>

            {/* Delegate Tote Bag Button */}
            <button
              type="button"
              onClick={() => setShowToteModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#162332] hover:bg-[#1E2E42] text-slate-200 border border-[#27384C] cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Expo Tote ({toteBag.length})</span>
            </button>

            {/* Return / Exit button */}
            {onExit ? (
              <button
                type="button"
                onClick={onExit}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#271E18] hover:bg-[#3D2C22] text-[#FFA057] border border-[#FF6B00]/50 font-semibold cursor-pointer"
              >
                <span>Exit Hall</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#271E18] hover:bg-[#3D2C22] text-[#FFA057] border border-[#FF6B00]/50 font-semibold"
              >
                <span>FirmExpo Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Live PA Announcement Ticker Strip */}
        <div className="bg-[#04080E] border-t border-[#162231] px-4 py-1.5 flex items-center gap-3 overflow-hidden text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-[#FF6B00] font-bold shrink-0 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
            CONVENTION PA:
          </div>
          <div className="truncate text-slate-300 animate-fadeIn">
            {TICKER_MESSAGES[tickerIndex]}
          </div>
          <div className="ml-auto hidden lg:flex items-center gap-4 text-slate-400 shrink-0">
            <span>BOOTH TEMP: 21.4°C</span>
            <span>AISLE TRAFFIC: HIGH</span>
            <span>TIME: 11:24 CET</span>
          </div>
        </div>

        {/* Expo Exploration Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#1C2836] flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 py-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('stand')}
              className={`px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'stand'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-[#121B26]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Booth Stand 3D (Walk-In)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('floorplan')}
              className={`px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'floorplan'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-[#121B26]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Hall 1 Floorplan (Map)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('aisle')}
              className={`px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'aisle'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-[#121B26]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aisle 100 Walkthrough</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className={`px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'schedule'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-[#121B26]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Live Demonstration Schedule</span>
            </button>
          </div>

          {/* Quick RFQ Action in tab bar */}
          <button
            type="button"
            onClick={() => setRfqModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
          >
            <Send className="w-3 h-3" />
            <span>Request Trade Show RFQ</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN EXPO ARENA VIEW
          ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* =====================================================================
            VIEW 1: BOOTH STAND 3D (WALK-IN TRADE SHOW BOOTH)
            ===================================================================== */}
        {activeTab === 'stand' && (
          <div className="space-y-8">
            
            {/* OVERHEAD EXPO TRUSS RIGGING & HANGING BANNER */}
            <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#0F1722] via-[#090F16] to-[#05080E] border border-[#223142] p-4 sm:p-6 shadow-2xl">
              
              {/* Background Truss Lattice Graphics */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#FF6B00 1px, transparent 1px), linear-gradient(to right, #1E293B 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Overhead Hanging Truss & Rotating Ring Banner */}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1C2836]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B00]">
                    <span className="px-2 py-0.5 bg-[#FF6B00]/20 rounded border border-[#FF6B00]/40 font-bold uppercase">
                      STAND #A-104
                    </span>
                    <span>·</span>
                    <span className="text-slate-300">12m × 8m ISLAND ARCHITECTURE</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      BOOTH LIVE NOW
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase flex items-center gap-3">
                    NovaPrecision Manufacturing
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    Specialized 5-axis aerospace machining, surgical micro-turning, and high-pressure valve manifold production. Audited ISO 9001:2015 & AS9100D facility.
                  </p>
                </div>

                {/* Booth Delegate Action Pod */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleDropCard}
                    disabled={businessCardDropped}
                    className={`px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                      businessCardDropped
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                        : 'bg-[#FF6B00] hover:bg-[#E55F00] text-white shadow-lg'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{businessCardDropped ? 'Card Dropped in Fishbowl ✓' : 'Drop Your Business Card'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRfqModalOpen(true)}
                    className="px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider bg-[#172230] hover:bg-[#202E3E] text-slate-100 border border-[#2D3F54] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#FF6B00]" />
                    <span>Request Quotation</span>
                  </button>
                </div>
              </div>

              {/* STAGE MAIN INTERACTION: 3D TURNTABLE PLINTH & TECHNICAL SPEC HUD */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
                
                {/* LEFT: 3D Interactive Component Turntable */}
                <div className="lg:col-span-7 flex flex-col bg-[#070B11] border border-[#1E2B3A] rounded-lg overflow-hidden shadow-inner">
                  {/* Turntable Top Controls */}
                  <div className="px-4 py-3 bg-[#0B121C] border-b border-[#1A2634] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-[#FF6B00]" />
                      <span className="text-white font-bold uppercase">PHYSICAL PLINTH INSPECTION</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsRotating(!isRotating)}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                          isRotating ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40' : 'bg-[#151F2C] text-slate-400'
                        }`}
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>{isRotating ? 'Auto-Rotate ON' : 'Paused'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIs3DWireframe(!is3DWireframe)}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                          is3DWireframe ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40' : 'bg-[#151F2C] text-slate-400'
                        }`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>CAD Wireframe</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCalipersOverlay(!calipersOverlay)}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                          calipersOverlay ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40' : 'bg-[#151F2C] text-slate-400'
                        }`}
                      >
                        <Compass className="w-3 h-3" />
                        <span>Micrometer HUD</span>
                      </button>
                    </div>
                  </div>

                  {/* 3D WebGL Canvas Viewport */}
                  <div className="relative flex-1 min-h-[380px] sm:min-h-[420px] w-full">
                    <div ref={canvasMountRef} className="w-full h-full absolute inset-0" />

                    {/* Calipers / Tolerancing Callout HUD */}
                    {calipersOverlay && (
                      <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="bg-[#0B131E]/90 border border-[#223246] p-2.5 rounded text-[11px] font-mono text-slate-300 space-y-0.5 backdrop-blur-xs">
                            <div className="text-[#FF6B00] font-bold">ZEISS PRISMO CMM SCAN:</div>
                            <div>DIMENSIONAL ERROR: +0.0004 mm</div>
                            <div>CIRCULARITY RUNOUT: 0.0012 mm</div>
                            <div>SURFACE ROUGHNESS: {activeProduct.surfaceFinish}</div>
                          </div>

                          <div className="bg-[#0B131E]/90 border border-[#223246] p-2.5 rounded text-[11px] font-mono text-right text-slate-300 backdrop-blur-xs">
                            <div className="text-emerald-400 font-bold">QA BATCH AUDIT: PASSED</div>
                            <div>ALLOY: {activeProduct.material}</div>
                            <div>TRACEABILITY LOT: #NP-2026-08A</div>
                          </div>
                        </div>

                        {/* Interactive Product Switcher Pedestal Buttons */}
                        <div className="pointer-events-auto bg-[#0A1017]/95 border border-[#1E2B3A] p-2 rounded-lg flex items-center gap-2 overflow-x-auto scrollbar-none backdrop-blur-xs">
                          {EXPO_PRODUCTS.map((prod, index) => (
                            <button
                              key={prod.id}
                              type="button"
                              onClick={() => setSelectedProductIndex(index)}
                              className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer text-left ${
                                selectedProductIndex === index
                                  ? 'bg-[#FF6B00] text-white font-bold shadow-md'
                                  : 'bg-[#121B24] text-slate-300 hover:text-white hover:bg-[#182330] border border-[#1F2C3A]'
                              }`}
                            >
                              <div className="text-[10px] opacity-75">PART 0{index + 1}</div>
                              <div className="truncate max-w-[150px]">{prod.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plinth Footnote */}
                  <div className="p-3 bg-[#0A1017] border-t border-[#1A2634] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>ROTATING 3D MODEL RENDERED IN REAL-TIME WEBGL</span>
                    <span className="text-[#FF6B00]">CLICK & DRAG TO INSPECT SURFACES</span>
                  </div>
                </div>

                {/* RIGHT: Technical Specifications & Machine Data */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-[#080E16] border border-[#1E2B3A] rounded-lg p-5 sm:p-6 space-y-6">
                  
                  {/* Selected Product Title & Highlights */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-wider">
                        {activeProduct.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold">
                        LEAD TIME: {activeProduct.leadTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeProduct.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeProduct.description}
                    </p>
                  </div>

                  {/* Critical Engineering Spec Matrix */}
                  <div className="space-y-2 bg-[#0C141F] border border-[#1D2B3B] p-4 rounded-lg">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold pb-2 border-b border-[#1A2736]">
                      Audited Machine Tolerances & Data
                    </div>
                    {activeProduct.specs.map((s, i) => (
                      <div key={i} className="flex items-baseline justify-between text-xs py-1">
                        <span className="text-slate-400">{s.label}:</span>
                        <span className="font-mono text-slate-100 font-semibold">{s.value}</span>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between text-xs pt-1 border-t border-[#1A2736]">
                      <span className="text-[#FF6B00] font-semibold">Specified Tolerance:</span>
                      <span className="font-mono text-[#FF6B00] font-bold">{activeProduct.tolerance}</span>
                    </div>
                  </div>

                  {/* Actions: Request Batch Quote / Take Spec Sheet */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setRfqModalOpen(true)}
                      className="w-full py-3 px-4 rounded bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>Request Batch Pricing for {activeProduct.name}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTakeBrochure(`Spec Sheet: ${activeProduct.name} (CAD Dossier)`)}
                      className="w-full py-2.5 px-4 rounded bg-[#121B26] hover:bg-[#182330] text-slate-200 border border-[#223142] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Take Component Spec PDF into Tote Bag</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>

            {/* =================================================================
                BOOTH FLOOR LEVEL: RECEPTION COUNTER, BROCHURE RACK, VIDEO WALL
                ================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT 6 COLS: VIRTUAL BOOTH RECEPTION & LIVE ENGINEERING DIALOG */}
              <div className="lg:col-span-7 bg-[#090F17] border border-[#1E293B] rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#1A2634]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        BOOTH RECEPTION · LIVE BOOTH REPRESENTATIVES
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">STAND #A-104</span>
                  </div>

                  {/* Rep Profiles Header */}
                  <div className="mt-4 flex items-center gap-4 p-3 bg-[#0F1722] border border-[#202E3E] rounded-lg">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-[#1E293B] border-2 border-[#FF6B00] flex items-center justify-center text-xs font-bold text-white">
                        AM
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#172230] border-2 border-slate-600 flex items-center justify-center text-xs font-bold text-[#FF6B00]">
                        TR
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Alex Morgan <span className="text-slate-400 font-normal">(Managing Director)</span> & Taylor Reed <span className="text-slate-400 font-normal">(Lead Eng)</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Available on stand for technical inquiries & contract manufacturing consults.
                      </div>
                    </div>
                  </div>

                  {/* Live Conversation Window */}
                  <div className="mt-4 bg-[#06090E] border border-[#182330] rounded-lg p-3 max-h-[220px] overflow-y-auto space-y-3 font-sans text-xs">
                    {chatLog.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'visitor' ? 'items-end' : 'items-start'}`}
                      >
                        <div className="text-[10px] font-mono text-slate-500 mb-0.5">
                          {msg.sender === 'visitor' ? 'YOU (DELEGATE)' : 'ALEX MORGAN (NOVAPRECISION)'} · {msg.time}
                        </div>
                        <div
                          className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                            msg.sender === 'visitor'
                              ? 'bg-[#FF6B00] text-white rounded-tr-none'
                              : 'bg-[#111A24] text-slate-200 border border-[#223142] rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Inquiries / Prompt Buttons */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">ASK TECHNICAL BOOTH QUESTIONS:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'What is your standard production lead time?',
                      'Can you machine AS9100D aerospace titanium?',
                      'What are your batch quantity minimums?',
                      'How do you inspect internal cross-holes?',
                    ].map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendQuestion(q)}
                        className="text-left px-2.5 py-1 rounded bg-[#101924] hover:bg-[#182432] text-slate-300 hover:text-white border border-[#202E3E] text-[11px] transition-colors cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Free text input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={quickQuestion}
                      onChange={(e) => setQuickQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion(quickQuestion)}
                      placeholder="Type a custom inquiry to the booth engineers..."
                      className="flex-1 bg-[#0A1017] border border-[#223142] rounded px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendQuestion(quickQuestion)}
                      className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded text-xs font-bold cursor-pointer transition-colors"
                    >
                      Ask
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT 5 COLS: LITERATURE RACK & 4K VIDEO WALL */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. TRADE SHOW LITERATURE RACK (FREE BROCHURES) */}
                <div className="bg-[#090F17] border border-[#1E293B] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1A2634]">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <FileText className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>LITERATURE & BROCHURE RACK</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">FREE SPEC DOWNLOADS</span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        title: '2026 Machine Lineup & Facility Equipment Specs',
                        pages: '16 Pages · PDF · DMG Mori, Hermle, Mazak',
                        tag: 'EQUIPMENT LINE CARD',
                      },
                      {
                        title: 'Precision Machining Tolerances & Quality Whitepaper',
                        pages: '24 Pages · PDF · CMM Metrology & ISO Specs',
                        tag: 'TECHNICAL WHITEPAPER',
                      },
                      {
                        title: 'ISO 9001:2015 & AS9100D Audited Accreditation Dossier',
                        pages: '8 Pages · Official Registrar Certificate',
                        tag: 'AUDIT COMPLIANCE',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#0E1520] border border-[#1E2B3A] rounded-lg flex items-center justify-between gap-3 hover:border-[#FF6B00]/60 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-[#FF6B00] uppercase font-bold">
                            {item.tag}
                          </span>
                          <div className="text-xs font-bold text-white">{item.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.pages}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleTakeBrochure(item.title)}
                          className="px-3 py-1.5 bg-[#172330] hover:bg-[#FF6B00] text-slate-200 hover:text-white rounded text-xs font-mono uppercase font-bold transition-colors cursor-pointer shrink-0"
                        >
                          Take
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. BOOTH 4K LED VIDEO WALL (CNC LIVE CUTTING STREAM) */}
                <div className="bg-[#090F17] border border-[#1E293B] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1A2634]">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                      <Tv className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>BOOTH 4K LED VIDEO DISPLAY</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoScreenPlaying(!videoScreenPlaying)}
                      className="text-[10px] font-mono text-[#FF6B00] hover:underline cursor-pointer"
                    >
                      {videoScreenPlaying ? 'PAUSE STREAM' : 'RESUME STREAM'}
                    </button>
                  </div>

                  {/* Video Screen Mockup with Real Manufacturing Imagery */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-[#202E3E]">
                    <img
                      src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=85"
                      alt="5-Axis CNC Machining Demo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded bg-red-600/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          LIVE WORKSHOP FEED
                        </span>
                        <span className="text-[10px] font-mono text-slate-300 bg-black/60 px-1.5 py-0.5 rounded">
                          DMG MORI 5-AXIS SIMULTANEOUS
                        </span>
                      </div>

                      <div className="text-xs text-white font-mono space-y-0.5">
                        <div className="font-bold">INCONEL 718 TURBINE ROTOR BLISK</div>
                        <div className="text-[10px] text-slate-300">SPINDLE: 14,200 RPM · FEED: 0.18 mm/rev · COOLANT: HIGH-PRESSURE AIR MIST</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* =====================================================================
            VIEW 2: HALL 1 FLOORPLAN (INTERACTIVE ARCHITECTURAL MAP)
            ===================================================================== */}
        {activeTab === 'floorplan' && (
          <div className="bg-[#080D15] border border-[#1E293B] rounded-xl p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A2634]">
              <div>
                <span className="text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-widest">
                  CONVENTION CENTER CAD DIRECTORY
                </span>
                <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                  Hall 1: Advanced Precision Engineering
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Click any exhibitor booth plot to inspect technical capabilities or navigate directly to their stand.
                </p>
              </div>

              {/* Map Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#FF6B00]" />
                  <span className="text-white">Current Stand (A-104)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#38BDF8]" />
                  <span className="text-slate-300">Other Exhibitors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#334155]" />
                  <span className="text-slate-400">Aisles & Lounges</span>
                </div>
              </div>
            </div>

            {/* Interactive Floorplan Canvas Grid */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#05090F] border-2 border-[#1B2838] rounded-xl overflow-hidden p-6">
              
              {/* Floor grid coordinate markings */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#203044 1px, transparent 1px), linear-gradient(to right, #203044 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Concourse Labels */}
              <div className="absolute top-2 left-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                ← NORTH ATRIUM & BUYER REGISTRATION
              </div>
              <div className="absolute bottom-2 right-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                SOUTH LOADING DOCK & FREIGHT GATES →
              </div>

              {/* Main Aisle A Strip */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-10 bg-[#0C141F] border-y border-[#182330] flex items-center justify-between px-6 pointer-events-none">
                <span className="text-[11px] font-mono text-[#FF6B00] font-bold tracking-widest">
                  AISLE 100 (MAIN BOULEVARD)
                </span>
                <span className="text-[11px] font-mono text-[#FF6B00] font-bold tracking-widest">
                  AISLE 100 (MAIN BOULEVARD)
                </span>
              </div>

              {/* Booth Plots */}
              {HALL_EXHIBITORS.map((booth) => (
                <div
                  key={booth.id}
                  onClick={() => {
                    if (booth.id === 'A-104') {
                      setActiveTab('stand');
                    } else {
                      alert(`Exhibitor ${booth.name} (${booth.id}) selected. NovaPrecision is the active live interactive demo.`);
                    }
                  }}
                  style={{
                    left: `${booth.x}%`,
                    top: `${booth.y}%`,
                    width: `${booth.width}%`,
                    height: `${booth.height}%`,
                  }}
                  className={`absolute rounded-lg p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer transition-all border ${
                    booth.isCurrent
                      ? 'bg-[#FF6B00]/20 border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.35)] scale-105 z-20'
                      : 'bg-[#0E1724] border-[#223348] hover:border-slate-300 hover:scale-102 z-10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        booth.isCurrent ? 'bg-[#FF6B00] text-white' : 'bg-[#182332] text-slate-300'
                      }`}
                    >
                      BOOTH {booth.id}
                    </span>
                    {booth.isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white truncate">{booth.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{booth.sector}</div>
                  </div>

                  <div className="text-[9px] font-mono text-slate-400 truncate">
                    {booth.boothType}
                  </div>
                </div>
              ))}

              {/* Emergency Exits and Restrooms */}
              <div className="absolute top-3 right-6 text-[10px] font-mono text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded bg-emerald-500/10">
                EXIT A1
              </div>
              <div className="absolute bottom-3 left-6 text-[10px] font-mono text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded bg-emerald-500/10">
                EXIT B4
              </div>
            </div>

            {/* Hall Navigation Actions */}
            <div className="p-4 bg-[#0A1017] border border-[#1A2634] rounded-lg flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="text-slate-300">
                Currently docked at <strong className="text-white">Booth A-104 (NovaPrecision Manufacturing)</strong>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('stand')}
                className="px-4 py-2 bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                Enter Stand #A-104 Now →
              </button>
            </div>

          </div>
        )}

        {/* =====================================================================
            VIEW 3: AISLE 100 WALKTHROUGH (FIRST PERSON PERSPECTIVE)
            ===================================================================== */}
        {activeTab === 'aisle' && (
          <div className="bg-[#080D15] border border-[#1E293B] rounded-xl p-6 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#1A2634]">
              <div>
                <span className="text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-widest">
                  FIRST-PERSON TRADE SHOW AISLE PERSPECTIVE
                </span>
                <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                  Walking Aisle 100: Engineering Boulevard
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">POSITION: STATION A-104</span>
            </div>

            {/* Simulated First-Person Aisle Viewport */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#223348] shadow-2xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85"
                alt="Trade show convention hall aisle"
                className="w-full h-full object-cover filter brightness-90 contrast-105"
              />

              {/* Overhead Directional Signs */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#090F17]/90 border border-[#2B3E54] px-6 py-2.5 rounded-lg shadow-2xl text-center backdrop-blur-md">
                <div className="text-[10px] font-mono text-[#FF6B00] font-bold tracking-widest uppercase">
                  OVERHEAD SIGNAGE // HALL 1
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                  ← BOOTH A-101 TO A-103 | BOOTH A-104 (NOVAPRECISION) | BOOTH A-105 TO A-110 →
                </div>
              </div>

              {/* Hotspot Floating Marker on NovaPrecision Stand */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="p-3 rounded-xl bg-[#090F17]/95 border-2 border-[#FF6B00] shadow-[0_0_30px_rgba(255,107,0,0.5)] text-center text-xs font-mono space-y-1">
                  <div className="text-[#FF6B00] font-bold uppercase tracking-wider">
                    ★ NOVAPRECISION (BOOTH A-104)
                  </div>
                  <div className="text-white font-bold text-sm">
                    5-Axis Precision & Aerospace Machining
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    12m × 8m Island Stand · Active Product Demos
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('stand')}
                    className="mt-2 w-full py-1.5 bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold rounded uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Step Inside Booth →
                  </button>
                </div>
              </div>

              {/* Aisle Nav Bar */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert('Moving down Aisle 100 towards Apex Precision (Booth A-101)')}
                  className="px-4 py-2 bg-[#090F17]/90 hover:bg-[#121B24] border border-[#2B3E54] text-white rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <ChevronLeft className="w-4 h-4 text-[#FF6B00]" />
                  <span>Walk Toward Booth A-101</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Moving down Aisle 100 towards MicroMatrix (Booth A-108)')}
                  className="px-4 py-2 bg-[#090F17]/90 hover:bg-[#121B24] border border-[#2B3E54] text-white rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <span>Walk Toward Booth A-108</span>
                  <ChevronRight className="w-4 h-4 text-[#FF6B00]" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* =====================================================================
            VIEW 4: LIVE DEMONSTRATION SCHEDULE
            ===================================================================== */}
        {activeTab === 'schedule' && (
          <div className="bg-[#080D15] border border-[#1E293B] rounded-xl p-6 space-y-6">
            
            <div className="pb-4 border-b border-[#1A2634]">
              <span className="text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-widest">
                LIVE ON-STAND SESSIONS & DEMONSTRATIONS
              </span>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                Booth A-104 Masterclass Schedule
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                All demonstrations take place live at the NovaPrecision booth plinth and machine simulation displays.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  time: '10:00 - 10:45 CET',
                  title: '5-Axis Inconel 718 High-Feed Machining Run',
                  speaker: 'Taylor Reed (Lead Machining Applications Specialist)',
                  description: 'Live cutting demonstration on DMG MORI 5-axis. Examining tool path deflection, trochoidal milling strategies, and vibration damping in superalloys.',
                  status: 'COMPLETED TODAY',
                  badge: 'LIVE CUT',
                },
                {
                  time: '12:30 - 13:15 CET',
                  title: 'Zeiss Prismo Sub-Micron CMM Metrology & Verification',
                  speaker: 'Dr. Frank Meier (Head of Quality & Metrology)',
                  description: 'Step-by-step walkthrough of automated coordinate metrology, scanning probe deflection compensation, and real-time SPC data export.',
                  status: 'STARTING IN 35 MIN',
                  badge: 'METROLOGY',
                },
                {
                  time: '15:00 - 15:45 CET',
                  title: 'AS9100D Aerospace Supply Chain Risk Mitigation Workshop',
                  speaker: 'Alex Morgan (Managing Director)',
                  description: 'Private buyer round-table: managing raw material heat-lot traceability, DFARS compliance, and single-source supplier redundancies.',
                  status: 'OPEN SEATS REMAINING',
                  badge: 'PROCUREMENT',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 bg-[#0C131D] border border-[#1E2B3A] rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#FF6B00]/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-mono font-bold uppercase">
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-300 font-bold">{item.time}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-emerald-400 font-mono">{item.status}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <div className="text-xs text-slate-400 font-mono">Led by: {item.speaker}</div>
                    <p className="text-xs text-slate-300 max-w-2xl pt-1">{item.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`Added "${item.title}" to your Expo Delegate Schedule!`);
                      if (soundEnabled) playChime();
                    }}
                    className="px-4 py-2 bg-[#172332] hover:bg-[#FF6B00] text-slate-200 hover:text-white rounded text-xs font-mono uppercase font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Add to Delegate Schedule
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* =========================================================================
          FLOATING DELEGATE LANYARD & BADGE (BOTTOM-RIGHT / TOP-RIGHT ACCESS)
          ========================================================================= */}
      <aside aria-label="Delegate pass badge" className="fixed bottom-4 right-4 z-40">
        <div
          onClick={() => setBadgeExpanded(!badgeExpanded)}
          className="bg-[#0B121C] border-2 border-[#FF6B00] rounded-xl p-3 shadow-2xl cursor-pointer hover:scale-105 transition-all text-xs font-mono max-w-[280px]"
        >
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E2B3A]">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              OFFICIAL DELEGATE BADGE
            </div>
            <span className="text-[10px] text-[#FF6B00] ml-auto">
              {badgeExpanded ? 'COLLAPSE' : 'EXPAND'}
            </span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#182330] flex items-center justify-center font-bold text-[#FF6B00] border border-[#2B3B4E]">
              VIP
            </div>
            <div>
              <div className="text-white font-bold leading-tight">Procurement Director</div>
              <div className="text-[10px] text-slate-400">FirmExpo Verified Buyer</div>
            </div>
          </div>

          {badgeExpanded && (
            <div className="mt-3 pt-2.5 border-t border-[#1E2B3A] space-y-1.5 text-[10px] text-slate-300">
              <div>RFID ID: <span className="text-slate-100">#EXP-2026-99482</span></div>
              <div>ACCESS: <span className="text-emerald-400 font-bold">ALL HALLS + VIP LOUNGE</span></div>
              <div>TOTE ITEMS: <span className="text-[#FF6B00] font-bold">{toteBag.length} saved</span></div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowToteModal(true);
                }}
                className="mt-2 w-full py-1.5 bg-[#FF6B00] text-white font-bold uppercase rounded text-center"
              >
                Open Expo Tote Bag
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          EXPO TOTE BAG / BRIEFCASE MODAL
          ========================================================================= */}
      <AnimatePresence>
        {showToteModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0B131E] border border-[#223142] rounded-xl max-w-lg w-full p-6 text-slate-200 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2836]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#FF6B00]" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    Your Expo Tote Bag & Literature
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowToteModal(false)}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-400">
                All technical catalogs, tolerances sheets, and business cards collected during your FirmExpo 2026 tour are safely stored here.
              </p>

              <div className="space-y-2 max-h-[260px] overflow-y-auto">
                {toteBag.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#111A25] border border-[#1F2C3A] rounded flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 shrink-0">READY</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#1C2836] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert('Exporting your FirmExpo 2026 digital briefcase package with all PDF documents & RFQ receipts.');
                    setShowToteModal(false);
                  }}
                  className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Briefcase (.ZIP / Dossier)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          TRADE SHOW RFQ / DIRECT QUOTE REQUEST MODAL
          ========================================================================= */}
      <AnimatePresence>
        {rfqModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0B131E] border border-[#223142] rounded-xl max-w-xl w-full p-6 text-slate-200 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2836]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#FF6B00] font-bold uppercase">
                    STAND #A-104 OFFICIAL TRADE SHOW SLIP
                  </span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    Direct RFQ to NovaPrecision
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRfqModalOpen(false);
                    setRfqSubmitted(false);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!rfqSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRfqSubmitted(true);
                    if (soundEnabled) playChime();
                    setToteBag((prev) => [...prev, `Official Trade Show RFQ Receipt (#NP-RFQ-7709)`]);
                  }}
                  className="space-y-4 text-xs font-mono"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">BUYER NAME *</label>
                      <input
                        required
                        type="text"
                        defaultValue="Procurement Director"
                        className="w-full bg-[#121B26] border border-[#223142] rounded p-2 text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">BUSINESS EMAIL *</label>
                      <input
                        required
                        type="email"
                        defaultValue="procurement@aeroglobal.example"
                        className="w-full bg-[#121B26] border border-[#223142] rounded p-2 text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">PART OR ALLOY REQUIREMENT</label>
                      <input
                        type="text"
                        defaultValue={activeProduct.name}
                        className="w-full bg-[#121B26] border border-[#223142] rounded p-2 text-white focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">TARGET BATCH QUANTITY</label>
                      <select className="w-full bg-[#121B26] border border-[#223142] rounded p-2 text-white focus:outline-none focus:border-[#FF6B00]">
                        <option>Prototype: 1 - 10 pieces</option>
                        <option>Pilot Batch: 50 - 250 pieces</option>
                        <option>Full Production: 500 - 5,000 / month</option>
                        <option>Long-Term Aerospace Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">TOLERANCE & INSPECTION NOTES</label>
                    <textarea
                      rows={3}
                      placeholder="Specify material grades (e.g. Inconel 718, Ti-6Al-4V), CMM requirements, or drawing numbers..."
                      defaultValue="Requesting fixed-price quote and AS9100D material verification report for initial qualification batch."
                      className="w-full bg-[#121B26] border border-[#223142] rounded p-2 text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Guaranteed response within 24h</span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold rounded uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Submit Trade Show RFQ
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase">
                    Trade Show RFQ Successfully Registered
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your quote request has been transmitted directly to Alex Morgan and the engineering estimation team at Booth A-104. A stamped receipt has been saved into your Expo Tote Bag.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRfqModalOpen(false)}
                    className="px-6 py-2 bg-[#172230] hover:bg-[#202E3E] text-white rounded text-xs font-mono uppercase font-bold"
                  >
                    Close & Return to Stand
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
