import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Layers, Maximize2, Shield, Sparkles, Sliders, ArrowUpRight } from 'lucide-react';

export interface BoothPlaceholder {
  id: string;
  name: string;
  sector: string;
  position: [number, number, number];
  rotationY: number;
  tolerance: string;
  equipmentCount: number;
  highlightColor?: string;
  companyId?: string;
}

const DEFAULT_BOOTHS: BoothPlaceholder[] = [
  {
    id: 'booth-1',
    name: 'Vanguard Precision Machining',
    sector: '5-AXIS CNC MILLING',
    position: [0, 0, 9.5],
    rotationY: Math.PI,
    tolerance: '±0.002 mm',
    equipmentCount: 12,
    highlightColor: '#FF6B00',
    companyId: 'vanguard-cnc',
  },
  {
    id: 'booth-2',
    name: 'Krupp-Vander Industrial',
    sector: 'HEAVY AUTOMATION PRESSES',
    position: [8.2, 0, 4.8],
    rotationY: (4 * Math.PI) / 3,
    tolerance: '0.010 mm',
    equipmentCount: 18,
    highlightColor: '#FF6B00',
    companyId: 'krupp-vander',
  },
  {
    id: 'booth-3',
    name: 'Titanium Forge & Advanced Metals',
    sector: 'SUPERALLOY FORGING',
    position: [8.2, 0, -4.8],
    rotationY: (5 * Math.PI) / 3,
    tolerance: 'NADCAP Heat Treat',
    equipmentCount: 15,
    highlightColor: '#FF6B00',
    companyId: 'titan-metallics',
  },
  {
    id: 'booth-4',
    name: 'Aegis Bio-Surgical Implants',
    sector: 'CLEANROOM MEDICAL IMPLANTS',
    position: [0, 0, -9.5],
    rotationY: 0,
    tolerance: '0.001 mm sphericity',
    equipmentCount: 8,
    highlightColor: '#38BDF8',
    companyId: 'aegis-bio',
  },
  {
    id: 'booth-5',
    name: 'Hyperion E-Mobility Powertrains',
    sector: 'EV STATORS & ROTORS',
    position: [-8.2, 0, -4.8],
    rotationY: Math.PI / 3,
    tolerance: '24,000 RPM G0.4',
    equipmentCount: 14,
    highlightColor: '#FF6B00',
    companyId: 'hyperion-ev',
  },
  {
    id: 'booth-6',
    name: 'OptoPulse Industrial Telemetry',
    sector: 'HARSH-ENVIRONMENT SENSORS',
    position: [-8.2, 0, 4.8],
    rotationY: (2 * Math.PI) / 3,
    tolerance: 'IP69K / ATEX Zone 0',
    equipmentCount: 10,
    highlightColor: '#FF6B00',
    companyId: 'optopulse-tech',
  },
];

interface BoothMeshProps {
  booth: BoothPlaceholder;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: () => void;
}

const BoothMesh: React.FC<BoothMeshProps> = ({
  booth,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetY = isHovered || isSelected ? 0.35 : 0;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.12;
    }
    if (beaconRef.current && (isHovered || isSelected)) {
      beaconRef.current.rotation.y += delta * 2;
    }
  });

  const baseColor = isSelected ? '#1E2F44' : isHovered ? '#192638' : '#111A24';
  const borderColor = isSelected ? '#FF6B00' : isHovered ? '#FF6B00' : '#223142';
  const screenBackdrop = isSelected ? '#FF6B00' : isHovered ? '#1B2B3E' : '#0B1118';

  return (
    <group
      ref={groupRef}
      position={booth.position}
      rotation={[0, booth.rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* 800x600 Ratio Physical Stage Platform (4.0m x 3.0m) */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 0.3, 3.0]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Platform Highlight Perimeter Line */}
      <lineSegments position={[0, 0.301, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.0, 0.01, 3.0)]} />
        <lineBasicMaterial color={borderColor} linewidth={2} />
      </lineSegments>

      {/* Standard 800x600 Proportion Digital Back Wall */}
      <mesh position={[0, 1.6, -1.35]} castShadow>
        <boxGeometry args={[3.8, 2.5, 0.18]} />
        <meshStandardMaterial
          color={screenBackdrop}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Screen Glowing Active Perimeter */}
      <lineSegments position={[0, 1.6, -1.25]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.7, 2.4, 0.05)]} />
        <lineBasicMaterial color={isHovered || isSelected ? '#FF6B00' : '#2A3C52'} />
      </lineSegments>

      {/* 3D Typography on the Exhibition Back Screen */}
      <Text
        position={[0, 2.3, -1.23]}
        fontSize={0.2}
        color={isHovered || isSelected ? '#FFFFFF' : '#94A3B8'}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2"
      >
        {booth.name.toUpperCase()}
      </Text>

      <Text
        position={[0, 1.95, -1.23]}
        fontSize={0.12}
        color={booth.highlightColor || '#FF6B00'}
        anchorX="center"
        anchorY="middle"
      >
        {booth.sector}
      </Text>

      <Text
        position={[0, 1.6, -1.23]}
        fontSize={0.14}
        color="#CBD5E1"
        anchorX="center"
        anchorY="middle"
      >
        {`TOLERANCE: ${booth.tolerance}`}
      </Text>

      <Text
        position={[0, 1.25, -1.23]}
        fontSize={0.11}
        color="#64748B"
        anchorX="center"
        anchorY="middle"
      >
        800 × 600 STAGE SPEC
      </Text>

      {/* Center Equipment Stage Pedestal */}
      <mesh position={[0, 0.5, 0.3]} castShadow>
        <cylinderGeometry args={[0.7, 0.8, 0.4, 32]} />
        <meshStandardMaterial
          color={isHovered ? '#1E2B3A' : '#151F2B'}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Rotating Precision Machine Component on Display */}
      <mesh
        ref={beaconRef}
        position={[0, 0.95, 0.3]}
        castShadow
      >
        <torusGeometry args={[0.35, 0.12, 16, 32]} />
        <meshStandardMaterial
          color={isHovered || isSelected ? '#FF6B00' : '#94A3B8'}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Spotlight Rig Overhead */}
      <mesh position={[0, 3.1, -0.6]}>
        <boxGeometry args={[0.6, 0.12, 0.3]} />
        <meshBasicMaterial color={isHovered || isSelected ? '#FF6B00' : '#2A3C52'} />
      </mesh>

      {/* Active Light Pillar on Hover */}
      {(isHovered || isSelected) && (
        <pointLight
          position={[0, 2.2, 0.3]}
          intensity={3.5}
          distance={6}
          color="#FF6B00"
        />
      )}
    </group>
  );
};

// Floor, Central Monument and Scene Environment
const FloorAndCentralMonument: React.FC = () => {
  const centralRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (centralRingRef.current) {
      centralRingRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group>
      {/* Polished Industrial Hall Floor */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[16, 17, 0.4, 64]} />
        <meshStandardMaterial
          color="#0B1118"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Concentric Precision Ground Guides */}
      <gridHelper args={[30, 30, '#FF6B00', '#1C2938']} position={[0, 0.01, 0]} />

      {/* Solid Orange Outer Ring Boundary */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[15.8, 16.0, 64]} />
        <meshBasicMaterial color="#FF6B00" />
      </mesh>

      {/* Central FirmExpo Landmark Pylon */}
      <group position={[0, 0, 0]}>
        {/* Pylon Base */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.7, 3.6]} />
          <meshStandardMaterial color="#162230" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Monolith Pillar */}
        <mesh position={[0, 2.6, 0]} castShadow>
          <boxGeometry args={[1.8, 4.0, 1.8]} />
          <meshStandardMaterial color="#0B1118" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* FirmExpo Logo Architectural Cantilever Canopy (White Top Arch) */}
        <mesh position={[0, 4.6, 0.4]} castShadow>
          <boxGeometry args={[2.2, 0.3, 2.8]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Solid Vivid Orange Stage Wedge */}
        <mesh position={[0, 3.1, 0.95]}>
          <boxGeometry args={[0.9, 1.8, 0.2]} />
          <meshStandardMaterial color="#FF6B00" emissive="#331500" metalness={0.3} roughness={0.1} />
        </mesh>

        {/* Kinetic Rotating Stage Ring */}
        <mesh ref={centralRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.2, 0]}>
          <torusGeometry args={[2.4, 0.05, 16, 64]} />
          <meshBasicMaterial color="#FF6B00" />
        </mesh>
      </group>
    </group>
  );
};

export interface InteractiveStageProps {
  onSelectBooth?: (booth: BoothPlaceholder) => void;
  className?: string;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  onSelectBooth,
  className = '',
}) => {
  const [hoveredBoothId, setHoveredBoothId] = useState<string | null>(null);
  const [selectedBoothId, setSelectedBoothId] = useState<string>(DEFAULT_BOOTHS[0].id);

  const activeBooth =
    DEFAULT_BOOTHS.find((b) => b.id === (hoveredBoothId || selectedBoothId)) || DEFAULT_BOOTHS[0];

  const handleSelect = (booth: BoothPlaceholder) => {
    setSelectedBoothId(booth.id);
    if (onSelectBooth) {
      onSelectBooth(booth);
    }
  };

  return (
    <div className={`relative w-full aspect-[16/9] min-h-[460px] sm:min-h-[560px] bg-[#080D14] border border-[#223142] rounded-lg overflow-hidden select-none ${className}`}>
      
      {/* 3D R3F Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 15, 24], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Lights (Controlled architectural industrial lighting) */}
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[14, 25, 16]}
          intensity={2.6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
        />
        <pointLight position={[-12, 16, -10]} intensity={2.0} color="#FF6B00" />
        <directionalLight position={[0, 10, -20]} intensity={0.8} color="#38BDF8" />

        {/* Environment & Landmarks */}
        <FloorAndCentralMonument />

        {/* 6 Interactive Booth Placeholders */}
        {DEFAULT_BOOTHS.map((booth) => (
          <BoothMesh
            key={booth.id}
            booth={booth}
            isHovered={hoveredBoothId === booth.id}
            isSelected={selectedBoothId === booth.id}
            onHover={(hovered) => setHoveredBoothId(hovered ? booth.id : null)}
            onSelect={() => handleSelect(booth)}
          />
        ))}

        {/* Orbit Controls (constrained for clean exhibition viewing) */}
        <OrbitControls
          enablePan={false}
          minDistance={12}
          maxDistance={34}
          maxPolarAngle={Math.PI / 2.15}
          minPolarAngle={Math.PI / 8}
          autoRotate={!hoveredBoothId}
          autoRotateSpeed={0.6}
        />
      </Canvas>

      {/* Top HUD: R3F Engine Status */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#0B1118]/90 border border-[#223142] px-3.5 py-1.5 backdrop-blur-xs rounded pointer-events-auto">
          <Box className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-white font-bold">@REACT-THREE/FIBER & DREI</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">INTERACTIVE EXHIBITION STAGE</span>
        </div>

        <div className="bg-[#0B1118]/90 border border-[#223142] px-3 py-1.5 text-slate-300 text-[11px] rounded pointer-events-auto hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF6B00] rounded-none" />
          <span>HOVER BOOTH TO HIGHLIGHT</span>
        </div>
      </div>

      {/* Bottom Floating Metadata Card for Focused Booth */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none">
        <div className="bg-[#0B1118]/95 border border-[#223142] p-3.5 sm:px-4 sm:py-3 rounded-lg backdrop-blur-xs pointer-events-auto flex items-center justify-between sm:justify-start gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
              <span className="text-[#FF6B00] font-semibold">{activeBooth.sector}</span>
              <span aria-hidden="true">·</span>
              <span>800×600 STAGE</span>
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
              {activeBooth.name}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Tolerance: <span className="text-slate-200">{activeBooth.tolerance}</span> · Active Machine Park: {activeBooth.equipmentCount} Units
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelect(activeBooth)}
            className="px-3.5 py-2 text-xs font-mono uppercase bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 font-bold"
          >
            <span>Inspect Booth</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#0B1118]/90 border border-[#223142] px-3.5 py-2 rounded text-[11px] font-mono text-slate-400 pointer-events-auto hidden md:flex items-center gap-3 self-end">
          <span>DRAG: ORBIT 360°</span>
          <span aria-hidden="true">·</span>
          <span>SCROLL: ZOOM</span>
          <span aria-hidden="true">·</span>
          <span className="text-white">HOVER TO LIFT BOOTH</span>
        </div>
      </div>

    </div>
  );
};
