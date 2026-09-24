import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Eye, Box, Sliders } from 'lucide-react';

interface Stage3DProps {
  activeSector?: string;
  onSelectBooth?: (sector: string) => void;
  className?: string;
}

export const Stage3DCanvas: React.FC<Stage3DProps> = ({
  activeSector,
  onSelectBooth,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [selectedPavilion, setSelectedPavilion] = useState<string>('CNC Machining');
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  // References to interact with Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsState = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    rotX: 0.35,
    rotY: -0.6,
    targetRotX: 0.35,
    targetRotY: -0.6,
    zoom: 26,
    targetZoom: 26,
  });

  const boothMeshes = useRef<{ [key: string]: THREE.Group }>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x080D14);
    scene.fog = new THREE.FogExp2(0x080D14, 0.022);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 150);
    camera.position.set(0, 14, 26);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting: Solid architectural industrial lighting (no gradients)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Main Stage Key Light (focused industrial daylight white)
    const keySpot = new THREE.SpotLight(0xffffff, 2.8, 60, Math.PI / 4, 0.2, 1.2);
    keySpot.position.set(15, 25, 20);
    keySpot.castShadow = true;
    keySpot.shadow.mapSize.width = 2048;
    keySpot.shadow.mapSize.height = 2048;
    keySpot.shadow.bias = -0.0008;
    scene.add(keySpot);

    // FirmExpo Signature Vivid Orange Stage Light
    const orangeFill = new THREE.SpotLight(0xff6b00, 4.2, 45, Math.PI / 3, 0.4, 1.5);
    orangeFill.position.set(-14, 18, 12);
    scene.add(orangeFill);

    // Crisp Blue Architectural Rim
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    rimLight.position.set(0, 12, -22);
    scene.add(rimLight);

    // 5. Conventional Hall Floor & Architectural Stage Grid
    const stageRoot = new THREE.Group();
    scene.add(stageRoot);

    // Polished Concrete / Stage Base
    const floorGeo = new THREE.CylinderGeometry(18, 19, 0.8, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0e1722,
      roughness: 0.35,
      metalness: 0.65,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.4;
    floorMesh.receiveShadow = true;
    stageRoot.add(floorMesh);

    // Circular Stage Rims (Solid Orange Trim & Dark Slate Chamfer)
    const rimGeo = new THREE.TorusGeometry(18.05, 0.08, 16, 96);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.01;
    stageRoot.add(rimMesh);

    // Architectural Ground Grid
    const gridHelper = new THREE.GridHelper(32, 32, 0xff6b00, 0x1e2d3e);
    gridHelper.position.y = 0.02;
    stageRoot.add(gridHelper);

    // 6. Central Iconic "FirmExpo" Monolith Monument
    const monumentGroup = new THREE.Group();
    monumentGroup.position.set(0, 0, 0);
    stageRoot.add(monumentGroup);

    // Monolith Base Plinth
    const plinthGeo = new THREE.BoxGeometry(4.8, 0.6, 4.8);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x162230, roughness: 0.2, metalness: 0.8 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.3;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    monumentGroup.add(plinth);

    // Monolith Central Pylon
    const pylonGeo = new THREE.BoxGeometry(2.4, 4.6, 2.4);
    const pylonMat = new THREE.MeshStandardMaterial({ color: 0x0b1118, roughness: 0.15, metalness: 0.9 });
    const pylon = new THREE.Mesh(pylonGeo, pylonMat);
    pylon.position.y = 2.9;
    pylon.castShadow = true;
    monumentGroup.add(pylon);

    // FirmExpo Angular Cantilever Canopy on Pylon (Matching the Logo)
    const canopyGeo = new THREE.BoxGeometry(2.6, 0.35, 3.6);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.7 });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 5.3, 0.5);
    canopy.castShadow = true;
    monumentGroup.add(canopy);

    // Vibrant Orange Stage Angle inside Pylon
    const orangeAngleGeo = new THREE.BoxGeometry(1.2, 2.2, 0.4);
    const orangeAngleMat = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      roughness: 0.1,
      metalness: 0.2,
      emissive: 0x331500,
    });
    const orangeAngle = new THREE.Mesh(orangeAngleGeo, orangeAngleMat);
    orangeAngle.position.set(0, 3.4, 1.25);
    monumentGroup.add(orangeAngle);

    // Precision Rotating Core Ring around Monolith
    const coreRingGeo = new THREE.TorusGeometry(3.2, 0.06, 16, 64);
    const coreRingMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    coreRing.rotation.x = Math.PI / 2;
    coreRing.position.y = 2.2;
    monumentGroup.add(coreRing);

    // 7. Surrounding Sector Booth Platforms (6 Real-World Sectors)
    const sectors = [
      { name: 'CNC Machining', angle: 0, color: 0xff6b00, shape: 'machining' },
      { name: 'Industrial Machinery', angle: (Math.PI / 3) * 1, color: 0xffffff, shape: 'press' },
      { name: 'Steel & Metals', angle: (Math.PI / 3) * 2, color: 0xff6b00, shape: 'forge' },
      { name: 'Medical Equipment', angle: (Math.PI / 3) * 3, color: 0x38bdf8, shape: 'cleanroom' },
      { name: 'Automotive', angle: (Math.PI / 3) * 4, color: 0xffffff, shape: 'powertrain' },
      { name: 'Electronics', angle: (Math.PI / 3) * 5, color: 0xff6b00, shape: 'telemetry' },
    ];

    const boothMeshesMap: { [key: string]: THREE.Group } = {};

    sectors.forEach((sec) => {
      const radius = 10.5;
      const x = Math.sin(sec.angle) * radius;
      const z = Math.cos(sec.angle) * radius;

      const boothGroup = new THREE.Group();
      boothGroup.position.set(x, 0, z);
      boothGroup.rotation.y = sec.angle + Math.PI; // Face center
      boothGroup.userData = { sectorName: sec.name };

      // Booth Stage Platform (800x600 ratio base: 4.8 x 3.6m)
      const baseGeo = new THREE.BoxGeometry(4.8, 0.35, 3.6);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x111a24,
        roughness: 0.3,
        metalness: 0.8,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.18;
      base.castShadow = true;
      base.receiveShadow = true;
      boothGroup.add(base);

      // Edge outline
      const edgeGeo = new THREE.EdgesGeometry(baseGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x2e4258, linewidth: 1 });
      const edgeLine = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLine.position.y = 0.18;
      boothGroup.add(edgeLine);

      // Back Digital Display Screen (800x600 Proportion)
      const screenBackGeo = new THREE.BoxGeometry(4.2, 2.8, 0.2);
      const screenBackMat = new THREE.MeshStandardMaterial({ color: 0x080d14, metalness: 0.9, roughness: 0.1 });
      const screenBack = new THREE.Mesh(screenBackGeo, screenBackMat);
      screenBack.position.set(0, 1.8, -1.5);
      screenBack.castShadow = true;
      boothGroup.add(screenBack);

      // Front Display Screen Surface with illuminated outline
      const screenFaceGeo = new THREE.PlaneGeometry(4.0, 2.6);
      const screenFaceMat = new THREE.MeshBasicMaterial({ color: 0x131f2d });
      const screenFace = new THREE.Mesh(screenFaceGeo, screenFaceMat);
      screenFace.position.set(0, 1.8, -1.39);
      boothGroup.add(screenFace);

      // Screen Border Line
      const screenBorderGeo = new THREE.EdgesGeometry(screenBackGeo);
      const screenBorderMat = new THREE.LineBasicMaterial({ color: 0xff6b00 });
      const screenBorder = new THREE.LineSegments(screenBorderGeo, screenBorderMat);
      screenBorder.position.set(0, 1.8, -1.5);
      boothGroup.add(screenBorder);

      // Industrial Equipment Miniature Model in Booth
      const equipGroup = new THREE.Group();
      equipGroup.position.set(0, 0.4, 0.3);

      if (sec.shape === 'machining') {
        // 5-Axis CNC Milling Center Model
        const cncBody = new THREE.Mesh(
          new THREE.BoxGeometry(2.0, 1.6, 1.6),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 })
        );
        cncBody.position.y = 0.8;
        cncBody.castShadow = true;
        equipGroup.add(cncBody);

        const cncWindow = new THREE.Mesh(
          new THREE.PlaneGeometry(1.2, 0.9),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        cncWindow.position.set(0, 0.9, 0.81);
        equipGroup.add(cncWindow);

        // Precision Spindle
        const spindle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.7, 16),
          new THREE.MeshStandardMaterial({ color: 0xff6b00, metalness: 0.9, roughness: 0.1 })
        );
        spindle.position.set(0, 1.9, 0);
        equipGroup.add(spindle);
      } else if (sec.shape === 'press') {
        // Heavy Stamping Press Pillars & Crosshead
        const pillarGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.4, 16);
        const pillarMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
        [-0.8, 0.8].forEach((px) => {
          [-0.6, 0.6].forEach((pz) => {
            const p = new THREE.Mesh(pillarGeo, pillarMat);
            p.position.set(px, 1.2, pz);
            p.castShadow = true;
            equipGroup.add(p);
          });
        });
        const crown = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 0.6, 1.6),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 })
        );
        crown.position.y = 2.4;
        crown.castShadow = true;
        equipGroup.add(crown);
      } else if (sec.shape === 'cleanroom') {
        // Medical Laser / Cleanroom Optical Chamber
        const medGeo = new THREE.CylinderGeometry(0.8, 0.9, 1.8, 32);
        const medMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.1, metalness: 0.8 });
        const medMesh = new THREE.Mesh(medGeo, medMat);
        medMesh.position.y = 0.9;
        medMesh.castShadow = true;
        equipGroup.add(medMesh);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.95, 0.04, 16, 32),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 1.2;
        equipGroup.add(ring);
      } else {
        // Precision Fabricated Assembly / Robotic Component
        const rotor = new THREE.Mesh(
          new THREE.TorusGeometry(0.8, 0.28, 16, 32),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 })
        );
        rotor.rotation.x = Math.PI / 2.5;
        rotor.position.y = 1.1;
        rotor.castShadow = true;
        equipGroup.add(rotor);

        const shaft = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.2, 1.8, 16),
          new THREE.MeshStandardMaterial({ color: 0xff6b00, metalness: 0.8 })
        );
        shaft.position.y = 1.1;
        equipGroup.add(shaft);
      }

      boothGroup.add(equipGroup);

      // Overhead Spot fixture
      const fixtureGeo = new THREE.BoxGeometry(0.4, 0.1, 0.3);
      const fixture = new THREE.Mesh(fixtureGeo, new THREE.MeshBasicMaterial({ color: 0xff6b00 }));
      fixture.position.set(0, 3.2, -0.6);
      boothGroup.add(fixture);

      stageRoot.add(boothGroup);
      boothMeshesMap[sec.name] = boothGroup;
    });

    boothMeshes.current = boothMeshesMap;

    // 8. Overhead Exhibition Girders & Architectural Trusses
    const trussGroup = new THREE.Group();
    const trussMat = new THREE.LineBasicMaterial({ color: 0x1e2d3e });
    for (let r = 8; r <= 16; r += 4) {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let a = 0; a <= Math.PI * 2; a += 0.1) {
        points.push(new THREE.Vector3(Math.cos(a) * r, 8, Math.sin(a) * r));
      }
      ringGeo.setFromPoints(points);
      const line = new THREE.Line(ringGeo, trussMat);
      trussGroup.add(line);
    }
    stageRoot.add(trussGroup);

    // 9. Mouse & Raycaster Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e: MouseEvent) => {
      controlsState.current.isDragging = true;
      controlsState.current.prevX = e.clientX;
      controlsState.current.prevY = e.clientY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (controlsState.current.isDragging) {
        const deltaX = e.clientX - controlsState.current.prevX;
        const deltaY = e.clientY - controlsState.current.prevY;
        controlsState.current.targetRotY += deltaX * 0.006;
        controlsState.current.targetRotX = Math.max(
          0.1,
          Math.min(0.9, controlsState.current.targetRotX + deltaY * 0.004)
        );
        controlsState.current.prevX = e.clientX;
        controlsState.current.prevY = e.clientY;
      }

      // Hover Raycast
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stageRoot.children, true);

      if (intersects.length > 0) {
        let foundBooth: string | null = null;
        let curr: THREE.Object3D | null = intersects[0].object;
        while (curr && curr !== stageRoot) {
          if (curr.userData && curr.userData.sectorName) {
            foundBooth = curr.userData.sectorName;
            break;
          }
          curr = curr.parent;
        }
        setHoveredObject(foundBooth);
      } else {
        setHoveredObject(null);
      }
    };

    const handlePointerUp = () => {
      controlsState.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      controlsState.current.targetZoom = Math.max(
        14,
        Math.min(38, controlsState.current.targetZoom + e.deltaY * 0.02)
      );
    };

    const handleClick = () => {
      if (hoveredObject) {
        setSelectedPavilion(hoveredObject);
        if (onSelectBooth) {
          onSelectBooth(hoveredObject);
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('click', handleClick);

    // Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera interpolation
      controlsState.current.rotX += (controlsState.current.targetRotX - controlsState.current.rotX) * 0.08;
      controlsState.current.rotY += (controlsState.current.targetRotY - controlsState.current.rotY) * 0.08;
      controlsState.current.zoom += (controlsState.current.targetZoom - controlsState.current.zoom) * 0.08;

      if (isRotating && !controlsState.current.isDragging) {
        controlsState.current.targetRotY += delta * 0.15;
      }

      const dist = controlsState.current.zoom;
      const rX = controlsState.current.rotX;
      const rY = controlsState.current.rotY;

      camera.position.x = Math.sin(rY) * Math.cos(rX) * dist;
      camera.position.y = Math.sin(rX) * dist + 2.0;
      camera.position.z = Math.cos(rY) * Math.cos(rX) * dist;
      camera.lookAt(0, 2.5, 0);

      // Core Monolith Ring Animation
      coreRing.rotation.z += delta * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isRotating, onSelectBooth]);

  // Jump camera when sector is selected externally
  useEffect(() => {
    if (activeSector && boothMeshes.current[activeSector]) {
      setSelectedPavilion(activeSector);
      // Smoothly rotate toward that booth
      const targetBooth = boothMeshes.current[activeSector];
      const targetAngle = Math.atan2(targetBooth.position.x, targetBooth.position.z);
      controlsState.current.targetRotY = targetAngle - Math.PI;
    }
  }, [activeSector]);

  return (
    <div className={`relative w-full h-full bg-[#080D14] select-none ${className}`}>
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD: Real-time 3D Conventional Pavilion Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none text-xs font-mono">
        <div className="flex items-center gap-2 bg-[#0B1118]/85 border border-[#223142] px-3 py-1.5 backdrop-blur-xs rounded pointer-events-auto">
          <Box className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span className="text-white font-bold">THREE.JS CONVENTIONAL ENGINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">INTERACTIVE 360° FLOOR</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            className={`px-3 py-1.5 border rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
              isRotating
                ? 'bg-[#182330] border-[#FF6B00] text-[#FF6B00] font-semibold'
                : 'bg-[#0B1118]/85 border-[#223142] text-slate-300 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Orbit: Auto' : 'Orbit: Paused'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Status / Selection Bar */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-xs font-mono">
        <div className="bg-[#0B1118]/90 border border-[#223142] px-3.5 py-2 backdrop-blur-xs rounded pointer-events-auto">
          <div className="text-[10px] text-slate-400 uppercase">Selected Pavilion Stage:</div>
          <div className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
            <span className="w-2 h-2 bg-[#FF6B00] rounded-none shrink-0" />
            <span>{hoveredObject || selectedPavilion}</span>
            {hoveredObject && (
              <span className="text-[10px] text-[#FF6B00] font-semibold">(Click to focus)</span>
            )}
          </div>
        </div>

        <div className="bg-[#0B1118]/90 border border-[#223142] px-3 py-2 text-slate-400 text-[11px] rounded pointer-events-auto hidden sm:flex items-center gap-3">
          <span>DRAG: ORBIT</span>
          <span aria-hidden="true">·</span>
          <span>SCROLL: ZOOM STAGE</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-200">800×600 BOOTH FOOTPRINTS</span>
        </div>
      </div>
    </div>
  );
};
