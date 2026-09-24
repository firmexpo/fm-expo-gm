import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Compass, Eye, ShieldCheck } from 'lucide-react';

interface ComponentModel3DProps {
  modelType: 'cnc-blisk' | 'titanium-ring' | 'surgical-implant' | 'stamping-die';
  title?: string;
  tolerance?: string;
  material?: string;
  className?: string;
}

export const ComponentModel3D: React.FC<ComponentModel3DProps> = ({
  modelType,
  title = 'Engineered Production Component',
  tolerance = '±0.002 mm',
  material = 'Titanium Grade 5',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c131d);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 3.5, 30, Math.PI / 3, 0.2);
    spotLight.position.set(5, 8, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const orangeAccent = new THREE.DirectionalLight(0xff6b00, 2.2);
    orangeAccent.position.set(-6, -2, 4);
    scene.add(orangeAccent);

    // Component Mesh Group
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // Build realistic geometry based on modelType
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: wireframeMode,
    });

    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      metalness: 0.6,
      roughness: 0.2,
      wireframe: wireframeMode,
    });

    if (modelType === 'cnc-blisk') {
      // 5-Axis Blisk Hub + 18 Impeller Blades
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.1, 0.8, 32), metalMat);
      hub.castShadow = true;
      group.add(hub);

      // Center Bore
      const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.85, 32), orangeMat);
      group.add(bore);

      // Blades
      const bladeGeo = new THREE.BoxGeometry(0.08, 0.7, 0.55);
      for (let i = 0; i < 16; i++) {
        const blade = new THREE.Mesh(bladeGeo, metalMat);
        const angle = (i / 16) * Math.PI * 2;
        blade.position.set(Math.sin(angle) * 1.35, 0, Math.cos(angle) * 1.35);
        blade.rotation.y = angle + 0.5;
        blade.rotation.z = 0.2;
        blade.castShadow = true;
        group.add(blade);
      }
    } else if (modelType === 'titanium-ring') {
      // Aerospace Rolled Ring
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.45, 24, 64), metalMat);
      ring.castShadow = true;
      group.add(ring);

      const flange = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.08, 16, 64), orangeMat);
      group.add(flange);
    } else if (modelType === 'surgical-implant') {
      // Bio-Surgical Spinal Cage
      const core = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 1.4, 6), metalMat);
      core.castShadow = true;
      group.add(core);

      // Porous lattice simulated ribs
      for (let y = -0.5; y <= 0.5; y += 0.25) {
        const rib = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.05, 12, 6), orangeMat);
        rib.rotation.x = Math.PI / 2;
        rib.position.y = y;
        group.add(rib);
      }
    } else {
      // Stamping Die / Tooling
      const block = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 1.8), metalMat);
      block.castShadow = true;
      group.add(block);

      const punch1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 24), orangeMat);
      punch1.position.set(-0.6, 0.6, 0);
      group.add(punch1);

      const punch2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 24), orangeMat);
      punch2.position.set(0.6, 0.6, 0);
      group.add(punch2);
    }

    // Grid Floor
    const grid = new THREE.GridHelper(6, 12, 0xff6b00, 0x1e2b38);
    grid.position.y = -1.2;
    scene.add(grid);

    // Mouse drag rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshGroupRef.current) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      meshGroupRef.current.rotation.y += dx * 0.01;
      meshGroupRef.current.rotation.x += dy * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelType, wireframeMode, isRotating]);

  return (
    <div className={`relative w-full aspect-[4/3] bg-[#0c131d] border border-[#223142] overflow-hidden select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Spec Header */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono pointer-events-none">
        <span className="text-[#FF6B00] font-semibold bg-[#0B1118]/80 px-2 py-0.5 rounded border border-[#1E293B]">
          {material}
        </span>
        <span className="text-slate-400 bg-[#0B1118]/80 px-2 py-0.5 rounded border border-[#1E293B]">
          {tolerance}
        </span>
      </div>

      {/* Action Controls */}
      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 text-[10px] font-mono">
        <button
          type="button"
          onClick={() => setWireframeMode((prev) => !prev)}
          className={`px-2 py-1 rounded border transition-colors cursor-pointer ${
            wireframeMode
              ? 'bg-[#FF6B00] text-white border-[#FF6B00]'
              : 'bg-[#0B1118]/90 text-slate-300 border-[#223142] hover:text-white'
          }`}
        >
          {wireframeMode ? 'Solid' : 'CAD Wireframe'}
        </button>
        <button
          type="button"
          onClick={() => setIsRotating((prev) => !prev)}
          className="p-1 bg-[#0B1118]/90 text-slate-300 hover:text-white border border-[#223142] rounded transition-colors cursor-pointer"
          title="Toggle Rotation"
        >
          <RotateCw className="w-3 h-3" />
        </button>
      </div>

      {/* Bottom Title Bar */}
      <div className="absolute bottom-2.5 left-2.5 text-xs text-white font-semibold font-mono pointer-events-none truncate max-w-[190px]">
        {title}
      </div>
    </div>
  );
};
