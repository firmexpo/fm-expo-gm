'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Sparkles, ArrowRight, RotateCcw, ChevronRight, Play, Pause } from 'lucide-react';

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
  isOrangeBooth?: boolean;
  hasSideWall?: boolean;
}

// Exactly matches the radial layout, perspectives and details from the user's reference image
const DEFAULT_BOOTHS: BoothPlaceholder[] = [
  {
    id: 'booth-orange-right',
    name: 'FIRMEXPO ORANGE STAGE',
    sector: 'ADVANCED METALS & ALLOY STAGE',
    position: [9.2, 0, -1.8],
    rotationY: -Math.PI / 2,
    tolerance: 'NADCAP / ISO 9001',
    equipmentCount: 16,
    highlightColor: '#FF6B00',
    companyId: 'titan-metallics',
    isOrangeBooth: true,
  },
  {
    id: 'booth-back-left',
    name: 'TITANIUM FORGE & ADVANCED METALS',
    sector: 'SUPERALLOY FORGING',
    position: [-3.2, 0, -8.8],
    rotationY: 0,
    tolerance: 'NADCAP Heat Treat',
    equipmentCount: 15,
    highlightColor: '#FF6B00',
    companyId: 'titan-metallics',
  },
  {
    id: 'booth-back-right',
    name: 'CRITICAL PRECISION SURGICAL',
    sector: 'CLEANROOM MEDICAL IMPLANTS',
    position: [5.2, 0, -8.2],
    rotationY: 0,
    tolerance: '0.001 mm sphericity',
    equipmentCount: 8,
    highlightColor: '#38BDF8',
    companyId: 'aegis-bio',
  },
  {
    id: 'booth-foreground-right',
    name: 'KRUPP-VANDER INDUSTRIAL',
    sector: 'HEAVY AUTOMATION PRESSES',
    position: [3.4, 0, 6.8],
    rotationY: Math.PI + 0.18,
    tolerance: '0.010 mm',
    equipmentCount: 18,
    highlightColor: '#FF6B00',
    companyId: 'krupp-vander',
    hasSideWall: true,
  },
  {
    id: 'booth-foreground-left',
    name: 'HYPERION E-MOBILITY POWERTRAINS',
    sector: 'EV STATORS & ROTORS',
    position: [-7.6, 0, 4.4],
    rotationY: (2.4 * Math.PI) / 3,
    tolerance: '24,000 RPM G0.4',
    equipmentCount: 14,
    highlightColor: '#FF6B00',
    companyId: 'hyperion-ev',
    hasSideWall: true,
  },
  {
    id: 'booth-far-left',
    name: 'VANGUARD CNC MACHINING',
    sector: '5-AXIS SIMULTANEOUS MILLING',
    position: [-9.4, 0, -2.8],
    rotationY: Math.PI / 2.3,
    tolerance: '±0.002 mm',
    equipmentCount: 12,
    highlightColor: '#FF6B00',
    companyId: 'vanguard-cnc',
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
    if (beaconRef.current) {
      beaconRef.current.rotation.y += delta * 1.5;
    }
  });

  // Dedicated styling for the distinctive glowing orange booth on the right
  if (booth.isOrangeBooth) {
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
        {/* Base Platform */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.0, 0.3, 3.0]} />
          <meshStandardMaterial color="#0A0F16" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bright Orange Platform Rim Line */}
        <lineSegments position={[0, 0.301, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(4.0, 0.01, 3.0)]} />
          <lineBasicMaterial color="#FF6B00" linewidth={2} />
        </lineSegments>

        {/* L-Shaped Glowing Solid Orange Back Wall */}
        <mesh position={[0, 1.6, -1.35]} castShadow>
          <boxGeometry args={[3.8, 2.5, 0.18]} />
          <meshStandardMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.65}
            metalness={0.2}
            roughness={0.1}
          />
        </mesh>

        {/* Floating Orange Canopy Bar Overhead */}
        <mesh position={[0, 3.05, -0.7]}>
          <boxGeometry args={[0.9, 0.16, 0.4]} />
          <meshStandardMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.85}
          />
        </mesh>

        {/* Typography Inscription on the Orange Wall */}
        <Text
          position={[0, 2.35, -1.22]}
          fontSize={0.17}
          color="#0B1118"
          anchorX="center"
          anchorY="middle"
        >
          FIRMEXPO ORANGE STAGE
        </Text>
        <Text
          position={[0, 1.95, -1.22]}
          fontSize={0.11}
          color="#1A2533"
          anchorX="center"
          anchorY="middle"
        >
          {booth.sector}
        </Text>
        <Text
          position={[0, 1.55, -1.22]}
          fontSize={0.12}
          color="#0B1118"
          anchorX="center"
          anchorY="middle"
        >
          {`TOLERANCE: ${booth.tolerance}`}
        </Text>

        {/* Dark Pedestal for Precision Component */}
        <mesh position={[0, 0.45, 0.3]} castShadow>
          <cylinderGeometry args={[0.65, 0.75, 0.35, 32]} />
          <meshStandardMaterial color="#0E1622" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Glowing Orange Torus Component on Display */}
        <mesh ref={beaconRef} position={[0, 0.95, 0.3]} castShadow>
          <torusGeometry args={[0.38, 0.12, 16, 32]} />
          <meshStandardMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.15}
          />
        </mesh>

        {/* Orange Point Light casting glow onto the floor and pedestal */}
        <pointLight position={[0, 2.0, 0.2]} intensity={3.5} distance={7} color="#FF6B00" />
      </group>
    );
  }

  // Standard high-spec exhibition booth
  const baseColor = isSelected ? '#1E2F44' : isHovered ? '#162230' : '#0B1118';
  const borderColor = isSelected ? '#FF6B00' : isHovered ? '#FF6B00' : '#1E2B3A';
  const screenBackdrop = isSelected ? '#1A293B' : isHovered ? '#14202C' : '#080E16';

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
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Side Profile Wall for L-shape Booth Architecture (as seen in image) */}
      {booth.hasSideWall && (
        <mesh position={[1.85, 1.4, 0.05]} castShadow>
          <boxGeometry args={[0.15, 2.1, 2.7]} />
          <meshStandardMaterial color="#0A1018" metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {/* Screen Glowing Active Perimeter */}
      <lineSegments position={[0, 1.6, -1.25]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.7, 2.4, 0.05)]} />
        <lineBasicMaterial color={isHovered || isSelected ? '#FF6B00' : '#1F2E40'} />
      </lineSegments>

      {/* 3D Typography on the Exhibition Back Screen */}
      <Text
        position={[0, 2.3, -1.23]}
        fontSize={0.17}
        color={isHovered || isSelected ? '#FFFFFF' : '#E2E8F0'}
        anchorX="center"
        anchorY="middle"
      >
        {booth.name.toUpperCase()}
      </Text>

      <Text
        position={[0, 1.95, -1.23]}
        fontSize={0.11}
        color={booth.highlightColor || '#FF6B00'}
        anchorX="center"
        anchorY="middle"
      >
        {booth.sector}
      </Text>

      <Text
        position={[0, 1.6, -1.23]}
        fontSize={0.13}
        color="#CBD5E1"
        anchorX="center"
        anchorY="middle"
      >
        {`TOLERANCE: ${booth.tolerance}`}
      </Text>

      <Text
        position={[0, 1.25, -1.23]}
        fontSize={0.10}
        color="#64748B"
        anchorX="center"
        anchorY="middle"
      >
        800 × 600 STAGE SPEC
      </Text>

      {/* Center Equipment Stage Pedestal */}
      <mesh position={[0, 0.5, 0.3]} castShadow>
        <cylinderGeometry args={[0.65, 0.75, 0.4, 32]} />
        <meshStandardMaterial
          color={isHovered ? '#1E2B3A' : '#121B26'}
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
        <torusGeometry args={[0.36, 0.11, 16, 32]} />
        <meshStandardMaterial
          color={isHovered || isSelected ? '#FF6B00' : '#CBD5E1'}
          metalness={0.92}
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
          intensity={3.0}
          distance={6}
          color="#FF6B00"
        />
      )}
    </group>
  );
};

// Floor, Central Monument and Scene Environment matching image.png
const FloorAndCentralMonument: React.FC = () => {
  const centralRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (centralRingRef.current) {
      centralRingRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group>
      {/* Polished Industrial Hall Floor (Deep Dark Stage Cylinder) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <cylinderGeometry args={[16.2, 16.6, 0.4, 96]} />
        <meshStandardMaterial
          color="#070C14"
          roughness={0.4}
          metalness={0.65}
        />
      </mesh>

      {/* Concentric Precision Ground Grid */}
      <gridHelper args={[32, 32, '#FF6B00', '#14202E']} position={[0, 0.015, 0]} />

      {/* Solid Vibrant Orange Outer Ring Boundary - Signature Stage Edge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, 0]}>
        <ringGeometry args={[15.8, 16.05, 96]} />
        <meshBasicMaterial color="#FF6B00" />
      </mesh>

      {/* Prominent Orange Cross-Axes passing through the center (as seen in image) */}
      <lineSegments position={[0, 0.028, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([
                -15.8, 0, 0,    15.8, 0, 0,
                 0, 0, -15.8,   0, 0, 15.8,
              ]),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FF6B00" linewidth={2} />
      </lineSegments>

      {/* Floor outline marker around the Orange Booth (as seen in image on right) */}
      <lineSegments position={[9.2, 0.029, -1.8]}>
        <edgesGeometry args={[new THREE.BoxGeometry(4.4, 0.01, 3.4)]} />
        <lineBasicMaterial color="#FF6B00" linewidth={2} />
      </lineSegments>

      {/* Central FirmExpo Landmark Pylon */}
      <group position={[0, 0, 0]}>
        {/* Pylon Base */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.5, 3.8]} />
          <meshStandardMaterial color="#121B26" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Monolith Pillar */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <boxGeometry args={[2.2, 4.0, 2.2]} />
          <meshStandardMaterial color="#060A10" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* FirmExpo Logo Architectural Cantilever Canopy (White Top Arch) */}
        <mesh position={[0, 4.65, 0.4]} castShadow>
          <boxGeometry args={[2.5, 0.32, 3.2]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Solid Vivid Orange Vertical Stage Wedge on right side of pylon */}
        <mesh position={[0.7, 3.0, 1.12]}>
          <boxGeometry args={[0.7, 2.0, 0.15]} />
          <meshStandardMaterial
            color="#FF6B00"
            emissive="#FF6B00"
            emissiveIntensity={0.6}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>

        {/* Kinetic Rotating Glowing Stage Ring around Center Pillar */}
        <mesh ref={centralRingRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.2, 0]}>
          <torusGeometry args={[2.5, 0.06, 16, 64]} />
          <meshBasicMaterial color="#FF6B00" />
        </mesh>

        {/* Center Orange Point Light */}
        <pointLight position={[0, 2.5, 0]} intensity={2.2} distance={14} color="#FF6B00" />
      </group>
    </group>
  );
};

export interface InteractiveStageProps {
  onSelectBooth?: (booth: BoothPlaceholder) => void;
  onExploreDemo?: () => void;
  className?: string;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  onSelectBooth,
  onExploreDemo,
  className = '',
}) => {
  const [hoveredBoothId, setHoveredBoothId] = useState<string | null>(null);
  const [selectedBoothId, setSelectedBoothId] = useState<string>(DEFAULT_BOOTHS[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  const activeBooth =
    DEFAULT_BOOTHS.find((b) => b.id === (hoveredBoothId || selectedBoothId)) || DEFAULT_BOOTHS[0];

  const handleSelect = (booth: BoothPlaceholder) => {
    setSelectedBoothId(booth.id);
    if (onSelectBooth) {
      onSelectBooth(booth);
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative w-full h-[540px] sm:h-[640px] lg:h-[720px] bg-[#04070D] overflow-hidden select-none ${className}`}>
      
      {/* 3D R3F Canvas - Tuned to exact angle and composition of image.png */}
      <Canvas
        shadows
        camera={{ position: [0, 8.8, 27.2], fov: 38 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Ambient & Key Architectural Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[14, 25, 16]}
          intensity={2.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0005}
        />
        <pointLight position={[-12, 16, -10]} intensity={2.0} color="#FF6B00" />
        <directionalLight position={[0, 10, -20]} intensity={0.8} color="#38BDF8" />

        {/* Environment, Floor and Monolith */}
        <FloorAndCentralMonument />

        {/* Surrounding Booths Matching Reference Image */}
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

        {/* Orbit Controls with constrained angles for flawless exhibition viewing */}
        <OrbitControls
          ref={controlsRef}
          target={[0, 1.8, 0]}
          enablePan={false}
          minDistance={12}
          maxDistance={38}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 8}
          autoRotate={!hoveredBoothId && autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Top Floating Sleek HUD (Subtle and non-intrusive) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono z-10">
        <div className="flex items-center gap-2 bg-[#070C14]/90 border border-[#1E293B] px-3.5 py-1.5 backdrop-blur-md rounded pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
          <span className="text-white font-bold tracking-wider">FIRMEXPO 3D STAGE</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">LIVE 360° EXHIBITION</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {onExploreDemo && (
            <button
              type="button"
              onClick={onExploreDemo}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase bg-[#FF6B00] hover:bg-[#E55F00] text-white rounded transition-colors cursor-pointer shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Exhibition</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className="px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-[#070C14]/90 hover:bg-[#121B26] border border-[#1E293B] rounded transition-colors cursor-pointer hidden md:flex items-center gap-1.5"
            title={autoRotate ? 'Pause 360° Rotation' : 'Enable 360° Rotation'}
          >
            {autoRotate ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Pause 360°</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Play 360°</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            className="px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-[#070C14]/90 hover:bg-[#121B26] border border-[#1E293B] rounded transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
            title="Reset to default camera perspective"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Bottom Floating Status & Quick Action (Non-intrusive, allows stage to shine) */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none z-10">
        <div className="bg-[#070C14]/95 border border-[#1E293B] px-4 py-2.5 rounded-lg backdrop-blur-md pointer-events-auto flex items-center justify-between sm:justify-start gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
              <span className="text-[#FF6B00] font-semibold">{activeBooth.sector}</span>
              <span aria-hidden="true">·</span>
              <span>800×600 LAYOUT</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white tracking-tight mt-0.5">
              {activeBooth.name}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelect(activeBooth)}
            className="px-3 py-1.5 text-xs font-mono uppercase bg-[#172230] hover:bg-[#FF6B00] text-white rounded transition-colors flex items-center gap-1 cursor-pointer shrink-0 border border-[#2B3E54] hover:border-[#FF6B00]"
          >
            <span>Inspect Booth</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#070C14]/90 border border-[#1E293B] px-3.5 py-2 rounded text-[11px] font-mono text-slate-400 pointer-events-auto hidden md:flex items-center gap-3 self-end">
          <span>DRAG: ORBIT 360°</span>
          <span aria-hidden="true">·</span>
          <span>SCROLL: ZOOM</span>
          <span aria-hidden="true">·</span>
          <span className="text-white">CLICK BOOTH TO INSPECT</span>
        </div>
      </div>

    </div>
  );
};
