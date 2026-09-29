import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildUavAndEngineScene, ModelComponents } from '../../utils/threeEngineUavModels';

export type ModelMode = 'uav' | 'engine' | 'integrated';

export const DigitalTwin3DView: React.FC = () => {
  const [modelMode, setModelMode] = useState<ModelMode>('integrated');
  const [activeSubsystem, setActiveSubsystem] = useState<string>('cyl3');
  const [cameraAngle, setCameraAngle] = useState<'iso' | 'top' | 'front' | 'side' | 'engine_close' | 'exploded'>('iso');
  const [renderLayer, setRenderLayer] = useState<'solid' | 'wire' | 'thermal' | 'vectors'>('solid');
  const [explodedPercent, setExplodedPercent] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelsRef = useRef<ModelComponents | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Subsystem physical metadata and diagnostics dictionary
  const subsystemsInfo: {
    [key: string]: {
      name: string;
      modelCategory: 'Airframe' | 'Engine Core';
      status: string;
      statusColor: 'amber' | 'green' | 'blue';
      temp: string;
      pressure: string;
      vibration: string;
      note: string;
      details: string[];
    };
  } = {
    cyl3: {
      name: 'Cylinder 03 (Port Bank - Hotspot)',
      modelCategory: 'Engine Core',
      status: 'THERMAL EXCURSION ALERT',
      statusColor: 'amber',
      temp: 'CHT: 154°C · EGT: 885°C',
      pressure: 'P-Max: 84.2 BAR (Peak -12%)',
      vibration: 'Kurtosis: 4.82 @ 6.8 kHz',
      note: 'Exhaust valve seating velocity deviated by 14%. Micro-fretting detected on bronze seat insert.',
      details: [
        'Valve Stem Diameter: 6.962 mm (Tolerance 6.950 - 7.000 mm)',
        'Thermal Expansion: +0.038 mm Delta @ FL195',
        'PINN Surrogate Residual: +6.19% (Exceeds 2.0% Nominal Band)',
        'Recommended CBM Action: Top-end valve seat lap & guide replacement (118 FLT HRS RUL)',
      ],
    },
    cyl1: {
      name: 'Cylinder 01 (Port Bank)',
      modelCategory: 'Engine Core',
      status: 'NOMINAL PERFORMANCE',
      statusColor: 'green',
      temp: 'CHT: 138°C · EGT: 820°C',
      pressure: 'P-Max: 96.4 BAR (Optimal)',
      vibration: 'Kurtosis: 2.10 (Baseline)',
      note: 'Combustion chamber seal within MIL-STD aero tolerances. Thermal gradient uniform.',
      details: [
        'Valve Clearance: Cold 0.15 mm / Hot 0.22 mm',
        'Compression Ratio: 9.0:1 Dynamic',
        'PINN Residual: +0.22% (High Confidence)',
        'Remaining Useful Life: >800 FLT HRS',
      ],
    },
    cyl2: {
      name: 'Cylinder 02 (Starboard Bank)',
      modelCategory: 'Engine Core',
      status: 'NOMINAL PERFORMANCE',
      statusColor: 'green',
      temp: 'CHT: 142°C · EGT: 830°C',
      pressure: 'P-Max: 95.8 BAR (Optimal)',
      vibration: 'Kurtosis: 2.15 (Baseline)',
      note: 'Crankshaft journal bearing hydro-film stable. Clean combustion stroke.',
      details: [
        'Valve Clearance: Cold 0.16 mm / Hot 0.22 mm',
        'Compression Ratio: 9.0:1 Dynamic',
        'PINN Residual: +0.21% (High Confidence)',
        'Remaining Useful Life: >800 FLT HRS',
      ],
    },
    cyl4: {
      name: 'Cylinder 04 (Starboard Bank)',
      modelCategory: 'Engine Core',
      status: 'NOMINAL PERFORMANCE',
      statusColor: 'green',
      temp: 'CHT: 139°C · EGT: 825°C',
      pressure: 'P-Max: 96.1 BAR (Optimal)',
      vibration: 'Kurtosis: 2.08 (Baseline)',
      note: 'Even fuel mixture distribution. Sensor telemetry fully reconciled.',
      details: [
        'Valve Clearance: Cold 0.15 mm / Hot 0.21 mm',
        'Compression Ratio: 9.0:1 Dynamic',
        'PINN Residual: +0.36% (High Confidence)',
        'Remaining Useful Life: >800 FLT HRS',
      ],
    },
    turbo: {
      name: 'Garrett Aero Turbocharger Assembly',
      modelCategory: 'Engine Core',
      status: 'OPERATING NORMAL',
      statusColor: 'green',
      temp: 'Turbine In: 840°C · Compressor Out: 95°C',
      pressure: 'Boost: +1.32 BAR · PR: 1.84',
      vibration: 'Shaft Vib: 0.18 mm/s RMS (132k RPM)',
      note: 'Hydrodynamic film stiffness nominal. Wastegate duty cycle active at 42%.',
      details: [
        'Rotor Shaft Speed: 132,000 RPM',
        'Compressor Surge Margin: +18.4%',
        'Bearing Radial Clearance: 0.018 mm',
        'Projected RUL: 640 FLT HRS',
      ],
    },
    crankcase: {
      name: 'Crankcase & Dry Sump Scavenge',
      modelCategory: 'Engine Core',
      status: 'OPTIMAL LUBRICATION',
      statusColor: 'green',
      temp: 'Oil Gallery: 98.2°C',
      pressure: 'Oil Pressure: 4.20 BAR',
      vibration: 'Main Bearings: 0.22 mm/s',
      note: 'Dry sump scavenge pump drawing clean pressure. Oil dielectric constant 2.38 εr.',
      details: [
        'Oil Pump Flow Rate: 18.5 L/min',
        'Spectrometry Iron (Fe): <5 PPM',
        'Total Acid Number (TAN): 1.18 mg/g',
        'Filter Differential Pressure: 0.22 BAR',
      ],
    },
    gearbox: {
      name: 'Propeller Reduction Gearbox (PRGU)',
      modelCategory: 'Engine Core',
      status: 'GEAR MESH NOMINAL',
      statusColor: 'green',
      temp: 'Case Temp: 82.4°C',
      pressure: 'Reduction Ratio: 1:2.54',
      vibration: 'Mesh Frequency: 1.15 mm/s',
      note: 'Torsional overload slip clutch engaged. Zero mechanical backlash detected.',
      details: [
        'Input Engine RPM: 5,800 RPM',
        'Output Propeller RPM: 2,283 RPM',
        'Clutch Slipper Spring Tension: Nominal 740 Nm',
        'Inspection Window: 350 FLT HRS',
      ],
    },
    fuselage: {
      name: 'UAV-704 Airframe & Primary Structure',
      modelCategory: 'Airframe',
      status: 'AERODYNAMIC INTEGRITY OK',
      statusColor: 'blue',
      temp: 'Skin Temp: -18.4°C @ FL195',
      pressure: 'Dynamic Pressure (Q): 4.12 kPa',
      vibration: 'Airframe G-RMS: 0.12g',
      note: 'Carbon-bismaleimide composite structure with lightning strike protection mesh.',
      details: [
        'Maximum Takeoff Weight (MTOW): 1,150 kg',
        'Wing Aspect Ratio: 18.2 (High-Efficiency Loiter)',
        'Operating Ceiling: FL260 (8,000 m)',
        'Payload Capacity: 280 kg Sensor Pods',
      ],
    },
    propeller: {
      name: 'Variable-Pitch Constant Speed Propeller',
      modelCategory: 'Airframe',
      status: 'GOVERNOR ACTIVE',
      statusColor: 'green',
      temp: 'Hub Hub Temp: 48°C',
      pressure: 'Governor Hydraulic: 18.5 BAR',
      vibration: '1P Balance: 0.08 IPS',
      note: 'Pusher configuration 3-blade carbon fiber with electro-thermal de-ice boots.',
      details: [
        'Propeller Diameter: 1.75 m (3 Blades)',
        'Governed Speed: 2,280 RPM',
        'Blade Pitch Range: 18° to 46° Beta',
        'Feathering Mechanism: Hydraulic Fail-Safe Safe',
      ],
    },
    turret: {
      name: 'EO/IR High-Definition Sensor Gimbal',
      modelCategory: 'Airframe',
      status: 'SURVEILLANCE TRACKING',
      statusColor: 'blue',
      temp: 'Cryo-Cooler: 77 K (MWIR Sensor)',
      pressure: 'Hermetic Nitrogen Fill: 1.05 ATM',
      vibration: 'Gimbal Jitter: < 5 µrad',
      note: 'Multi-spectral HD daylight electro-optical and cooled medium-wave thermal infrared.',
      details: [
        'Azimuth Coverage: 360° Continuous Slip Ring',
        'Elevation Range: +20° to -105° NADIR',
        'Laser Rangefinder: 1,550 nm Eye-Safe',
        'Inertial Stabilization: 4-Axis Gyro Platform',
      ],
    },
    wing_port: {
      name: 'Port Wing & Integral Fuel Cell',
      modelCategory: 'Airframe',
      status: 'FUEL PRESSURE BALANCED',
      statusColor: 'green',
      temp: 'Fuel Temp: -4.2°C',
      pressure: 'Fuel Tank Pressure: +0.08 BAR',
      vibration: 'Bending Mode: 2.8 Hz',
      note: 'Self-sealing crashworthy wet wing fuel cell supplying Rotax continuous injection rail.',
      details: [
        'Usable Fuel Capacity: 140 L AVGAS 100LL',
        'Transfer Pump Flow: 42 L/hr (Dual Redundant)',
        'Aileron Servo Actuator: 28V DC Brushless',
        'Pitot-Static Heated Mast: Operational',
      ],
    },
  };

  const currentInfo = subsystemsInfo[activeSubsystem] || subsystemsInfo.cyl3;

  // Initialize Three.js WebGL Canvas
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0b1726);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(9, 6, 9);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 30;
    controls.minDistance = 2;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    blueRimLight.position.set(-10, -5, -10);
    scene.add(blueRimLight);

    const bottomBounceLight = new THREE.DirectionalLight(0x1e3a8a, 0.6);
    bottomBounceLight.position.set(0, -10, 0);
    scene.add(bottomBounceLight);

    // Ground Grid & Holographic Pedestal
    const gridHelper = new THREE.GridHelper(24, 24, 0x1d4ed8, 0x1e293b);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // Load Procedural Aerospace Models
    const models = buildUavAndEngineScene();
    modelsRef.current = models;
    scene.add(models.root);

    // Raycasting for interactive 3D component clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(models.interactiveObjects, true);

      if (intersects.length > 0) {
        let hitObj: THREE.Object3D | null = intersects[0].object;
        while (hitObj && !hitObj.userData?.id && hitObj.parent && hitObj.parent !== scene) {
          hitObj = hitObj.parent;
        }
        if (hitObj && hitObj.userData?.id) {
          const selectedId = hitObj.userData.id;
          setActiveSubsystem(selectedId);
          setToastMessage(`Selected 3D Subsystem: ${hitObj.userData.label || selectedId}`);
          setTimeout(() => setToastMessage(null), 2500);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Spin propeller smoothly
      if (models.animatableParts.propeller) {
        models.animatableParts.propeller.rotation.z += delta * 18;
      }

      // Pulse cylinder 3 hot spot material
      if (models.cylinders.cyl3) {
        const pulse = 0.5 + 0.5 * Math.sin(elapsedTime * 6);
        const cyl3Head = models.cylinders.cyl3.getObjectByName('engine_cyl3') as THREE.Mesh;
        if (cyl3Head && (cyl3Head.material as THREE.MeshStandardMaterial).emissive) {
          ((cyl3Head.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + pulse * 0.6);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  // Update Model Display Mode (UAV Airframe vs Rotax Engine vs Integrated X-Ray)
  useEffect(() => {
    if (!modelsRef.current || !controlsRef.current || !cameraRef.current) return;
    const { uavGroup, engineGroup, fuselageCover } = modelsRef.current;

    if (modelMode === 'uav') {
      // Show full UAV, opaque fuselage, engine inside
      uavGroup.visible = true;
      engineGroup.visible = true;
      engineGroup.position.set(0, 0.05, -1.8);
      engineGroup.scale.set(1.0, 1.0, 1.0);
      (fuselageCover.material as THREE.MeshStandardMaterial).transparent = false;
      (fuselageCover.material as THREE.MeshStandardMaterial).opacity = 1.0;
      (fuselageCover.material as THREE.MeshStandardMaterial).wireframe = false;

      // Adjust camera to frame full aircraft
      cameraRef.current.position.set(10, 6, 10);
      controlsRef.current.target.set(0, 0, 0);
    } else if (modelMode === 'engine') {
      // Hide UAV airframe, bring Rotax Engine to origin and scale up for precision inspection
      uavGroup.visible = false;
      engineGroup.visible = true;
      engineGroup.position.set(0, 0, 0);
      engineGroup.scale.set(2.2, 2.2, 2.2);

      // Frame camera tight on Rotax engine
      cameraRef.current.position.set(4, 3, 4);
      controlsRef.current.target.set(0, 0, 0);
    } else if (modelMode === 'integrated') {
      // Integrated X-Ray: UAV airframe with translucent cowling/fuselage, engine highlighted inside
      uavGroup.visible = true;
      engineGroup.visible = true;
      engineGroup.position.set(0, 0.05, -1.8);
      engineGroup.scale.set(1.0, 1.0, 1.0);

      (fuselageCover.material as THREE.MeshStandardMaterial).transparent = true;
      (fuselageCover.material as THREE.MeshStandardMaterial).opacity = 0.35;
      (fuselageCover.material as THREE.MeshStandardMaterial).wireframe = renderLayer === 'wire';

      cameraRef.current.position.set(6, 4, 3);
      controlsRef.current.target.set(0, 0, -1.5);
    }
  }, [modelMode, renderLayer]);

  // Update Exploded Disassembly Amount
  useEffect(() => {
    if (!modelsRef.current) return;
    const factor = explodedPercent / 100;
    modelsRef.current.explodedMeshMap.forEach((item) => {
      const offset = item.explodeDir.clone().multiplyScalar(item.maxDistance * factor);
      item.mesh.position.copy(item.origPos).add(offset);
    });
  }, [explodedPercent]);

  // Update Render Layer (Solid / Wireframe / Thermal IR / Vectors)
  useEffect(() => {
    if (!modelsRef.current || !sceneRef.current) return;
    const { root } = modelsRef.current;

    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;

        if (renderLayer === 'wire') {
          mat.wireframe = true;
          if (mesh.userData?.isAlert) {
            mat.color.setHex(0xf59e0b);
          } else {
            mat.color.setHex(0x60a5fa);
          }
        } else if (renderLayer === 'thermal') {
          mat.wireframe = false;
          // Thermal color map
          if (mesh.name.includes('cyl3') || mesh.userData?.id === 'cyl3') {
            mat.color.setHex(0xef4444); // 154°C Red hot
            mat.emissive.setHex(0xd97706);
            mat.emissiveIntensity = 0.8;
          } else if (mesh.name.includes('turbo') || mesh.userData?.id === 'turbo') {
            mat.color.setHex(0xf97316); // 840°C Orange
            mat.emissive.setHex(0xc2410c);
            mat.emissiveIntensity = 0.5;
          } else if (mesh.name.includes('cyl')) {
            mat.color.setHex(0x10b981); // 138-142°C Nominal green
            mat.emissive.setHex(0x047857);
            mat.emissiveIntensity = 0.2;
          } else {
            mat.color.setHex(0x1e3a8a); // Cold fuselage skin (-18°C)
            mat.emissive.setHex(0x0284c7);
            mat.emissiveIntensity = 0.1;
          }
        } else {
          // Solid PBR
          mat.wireframe = false;
          if (mesh.userData?.isAlert) {
            mat.color.setHex(0xf59e0b);
            mat.emissive.setHex(0xd97706);
            mat.emissiveIntensity = 0.5;
          } else if (mesh.name.includes('wing') || mesh.name.includes('fuselage')) {
            mat.color.setHex(0xe2e8f0);
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          } else if (mesh.name.includes('engine') || mesh.name.includes('crankcase')) {
            mat.color.setHex(0x94a3b8);
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          }
        }
      }
    });
  }, [renderLayer]);

  // Handle Camera Presets
  const setCameraPreset = (preset: typeof cameraAngle) => {
    setCameraAngle(preset);
    if (!cameraRef.current || !controlsRef.current) return;
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;

    if (preset === 'iso') {
      cam.position.set(9, 6, 9);
      ctrl.target.set(0, 0, 0);
    } else if (preset === 'top') {
      cam.position.set(0, 16, 0);
      ctrl.target.set(0, 0, 0);
    } else if (preset === 'front') {
      cam.position.set(0, 0.5, 12);
      ctrl.target.set(0, 0, 0);
    } else if (preset === 'side') {
      cam.position.set(-14, 1.5, 0);
      ctrl.target.set(0, 0, 0);
    } else if (preset === 'engine_close') {
      cam.position.set(-3.5, 2.0, -1.2);
      ctrl.target.set(0, 0, -1.8);
      setActiveSubsystem('cyl3');
    } else if (preset === 'exploded') {
      setExplodedPercent(65);
      cam.position.set(7, 6, 7);
      ctrl.target.set(0, 0, 0);
    }
    ctrl.update();
  };

  // Toggle Auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 2.0;
    }
  }, [autoRotate]);

  return (
    <div className="flex flex-col w-full px-4 lg:px-6 py-4 max-w-7xl mx-auto space-y-4">
      {/* Toast feedback notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0f233d] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#1b64da] flex items-center gap-2 text-sm animate-fade-in">
          <span className="material-symbols-outlined text-[#10b981] text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Model Selector Bar: UAV Airframe vs Rotax Engine vs Integrated X-Ray */}
      <section className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1b64da] animate-ping"></span>
            <h1 className="font-bold text-[16px] text-[#0f233d] uppercase tracking-wide">
              Aerospace 3D Digital Twin Models
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#ebf3ff] text-[#0037b0] font-mono text-[10px] font-bold">
              WEBGL REALTIME
            </span>
          </div>
          <p className="font-mono text-[11px] text-[#4d5f7c] mt-0.5">
            Interactive 3D geometry for Tactical MALE UAV-704 and Rotax 915 iSA Boxer Propulsion Core
          </p>
        </div>

        {/* Primary 3D Model Switcher */}
        <div className="flex items-center bg-[#eff4ff] p-1.5 rounded-xl border border-[#dce9ff] shadow-inner">
          <button
            onClick={() => {
              setModelMode('uav');
              setToastMessage('Switched to Full 3D UAV Airframe Model (UAV-704)');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all ${
              modelMode === 'uav'
                ? 'bg-[#1d4ed8] text-white shadow-md'
                : 'text-[#4d5f7c] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">flight</span>
            <span>UAV Airframe</span>
          </button>

          <button
            onClick={() => {
              setModelMode('engine');
              setToastMessage('Switched to Standalone Rotax 915 iSA Engine 3D Model');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all ${
              modelMode === 'engine'
                ? 'bg-[#1d4ed8] text-white shadow-md'
                : 'text-[#4d5f7c] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>Rotax 915 Engine Core</span>
          </button>

          <button
            onClick={() => {
              setModelMode('integrated');
              setToastMessage('Switched to Integrated Cutaway (UAV with Engine In-Situ)');
              setTimeout(() => setToastMessage(null), 2500);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-all ${
              modelMode === 'integrated'
                ? 'bg-[#1d4ed8] text-white shadow-md'
                : 'text-[#4d5f7c] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
            <span>X-Ray Cutaway</span>
          </button>
        </div>
      </section>

      {/* 3D Viewport Controls & Shader Filter Toolbar */}
      <section className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-3 flex flex-wrap items-center justify-between gap-3">
        {/* Camera Perspectives */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold mr-1">Camera:</span>
          {[
            { id: 'iso', label: 'Isometric' },
            { id: 'top', label: 'Planform (Top)' },
            { id: 'front', label: 'Front' },
            { id: 'side', label: 'Profile' },
            { id: 'engine_close', label: 'Cyl 3 Zoom' },
          ].map((cam) => (
            <button
              key={cam.id}
              onClick={() => setCameraPreset(cam.id as any)}
              className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase transition-all ${
                cameraAngle === cam.id
                  ? 'bg-[#0037b0] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#4d5f7c] hover:bg-[#dce9ff]'
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>

        {/* Visual Shader Overlays */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold mr-1">Layer:</span>
          {[
            { id: 'solid', label: 'PBR Solid', icon: 'view_in_ar' },
            { id: 'thermal', label: 'Thermal IR', icon: 'thermostat' },
            { id: 'wire', label: 'CAD Wireframe', icon: 'grid_3x3' },
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => {
                setRenderLayer(layer.id as any);
                setToastMessage(`Shader Mode: ${layer.label}`);
                setTimeout(() => setToastMessage(null), 2000);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase transition-all ${
                renderLayer === layer.id
                  ? 'bg-[#1b64da] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#4d5f7c] hover:bg-[#dce9ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">{layer.icon}</span>
              <span>{layer.label}</span>
            </button>
          ))}

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase transition-all ml-1 ${
              autoRotate ? 'bg-[#10b981] text-white' : 'bg-[#eff4ff] text-[#4d5f7c] hover:bg-[#dce9ff]'
            }`}
            title="Toggle 360° Orbit Auto-Rotation"
          >
            <span className="material-symbols-outlined text-[13px]">rotate_right</span>
            <span>{autoRotate ? 'Rotating' : 'Turntable'}</span>
          </button>
        </div>
      </section>

      {/* Main 3D Canvas Stage (Col 8) + Subsystem Inspector (Col 4) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {/* Left 3D Canvas Viewport */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between space-y-3">
          {/* Top Bar inside Viewport */}
          <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#0f233d] font-bold uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#1b64da]">3d_rotation</span>
                Interactive WebGL 3D Canvas
              </span>
              <span className="text-[10px] text-[#4d5f7c] font-mono">
                (Click & Drag to Rotate · Scroll to Zoom · Click Part to Inspect)
              </span>
            </div>

            {/* Exploded Disassembly Slider */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold">Explode Mesh:</span>
              <input
                type="range"
                min={0}
                max={100}
                value={explodedPercent}
                onChange={(e) => setExplodedPercent(parseInt(e.target.value, 10))}
                className="w-24 accent-[#1d4ed8] cursor-pointer bg-[#eff4ff] h-1.5 rounded-lg"
              />
              <span className="font-mono text-[10px] text-[#0037b0] font-bold w-7 text-right">
                {explodedPercent}%
              </span>
            </div>
          </div>

          {/* Real Three.js Canvas Container */}
          <div className="relative w-full h-[460px] rounded-xl overflow-hidden border border-[#dce9ff] shadow-inner bg-[#0b1726]">
            {/* The canvas attaches here */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* In-Canvas HUD Telemetry Overlay */}
            <div className="absolute top-3 left-3 pointer-events-none font-mono text-[10px] text-white/70 space-y-1 bg-[#0b1726]/75 p-2 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span className="font-bold text-white">MODEL: {modelMode.toUpperCase()}</span>
              </div>
              <div>SHADING: {renderLayer.toUpperCase()} · 60 FPS</div>
              <div>AIRFRAME: UAV-704 · PROPULSION: ROTAX 915 iSA</div>
              {activeSubsystem === 'cyl3' && (
                <div className="text-[#f59e0b] font-bold flex items-center gap-1">
                  <span>HOTSPOT: CYL 3 (154°C CHT / 885°C EGT)</span>
                </div>
              )}
            </div>

            {/* Interactive Quick-Pick Badges in Canvas Corner */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-md">
              <span className="text-[10px] font-mono text-white/60 self-center mr-1">Hotspots:</span>
              {[
                { id: 'cyl3', label: 'Cyl 3 Hotspot', alert: true },
                { id: 'turbo', label: 'Turbo Core', alert: false },
                { id: 'propeller', label: 'Propeller', alert: false },
                { id: 'fuselage', label: 'Fuselage', alert: false },
                { id: 'turret', label: 'FLIR Turret', alert: false },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    setActiveSubsystem(btn.id);
                    if (btn.id === 'cyl3' || btn.id === 'turbo') {
                      setModelMode('engine');
                    }
                  }}
                  className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold transition-all ${
                    activeSubsystem === btn.id
                      ? btn.alert
                        ? 'bg-[#f59e0b] text-white shadow-sm ring-1 ring-white'
                        : 'bg-[#1b64da] text-white shadow-sm ring-1 ring-white'
                      : 'bg-black/50 text-white/80 hover:bg-black/70 backdrop-blur-sm'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Right Reset Camera Button */}
            <button
              onClick={() => setCameraPreset('iso')}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/75 text-white/90 font-mono text-[10px] px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10 flex items-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">center_focus_strong</span>
              <span>Center View</span>
            </button>
          </div>

          {/* Subsystem Direct Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-mono text-[10px] text-[#4d5f7c] font-bold uppercase mr-1">
              Select Subsystem:
            </span>
            {[
              { id: 'cyl3', label: 'Cyl 3 (Alert)', alert: true },
              { id: 'cyl1', label: 'Cyl 1' },
              { id: 'cyl2', label: 'Cyl 2' },
              { id: 'cyl4', label: 'Cyl 4' },
              { id: 'turbo', label: 'Turbocharger' },
              { id: 'crankcase', label: 'Crankcase & Sump' },
              { id: 'gearbox', label: 'PRGU Gearbox' },
              { id: 'fuselage', label: 'Airframe' },
              { id: 'propeller', label: 'Propeller' },
              { id: 'turret', label: 'FLIR Turret' },
              { id: 'wing_port', label: 'Port Wing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubsystem(tab.id);
                  if (tab.id.startsWith('cyl') || tab.id === 'turbo' || tab.id === 'crankcase' || tab.id === 'gearbox') {
                    if (modelMode === 'uav') setModelMode('integrated');
                  } else {
                    if (modelMode === 'engine') setModelMode('uav');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all border ${
                  activeSubsystem === tab.id
                    ? tab.alert
                      ? 'bg-[#f59e0b] text-white border-[#f59e0b] shadow-sm'
                      : 'bg-[#1d4ed8] text-white border-[#1d4ed8] shadow-sm'
                    : 'bg-[#eff4ff] text-[#4d5f7c] border-[#dce9ff] hover:bg-[#dce9ff]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Subsystem Inspection Inspector Panel (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 lg:p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1b64da] text-[20px]">biotech</span>
                <h3 className="font-bold text-[14px] text-[#0f233d] uppercase tracking-wide">
                  Subsystem Inspector
                </h3>
              </div>
              <span
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                  currentInfo.statusColor === 'amber'
                    ? 'bg-[#fffbeb] text-[#d97706] animate-pulse'
                    : currentInfo.statusColor === 'blue'
                    ? 'bg-[#ebf3ff] text-[#0037b0]'
                    : 'bg-[#eafaf1] text-[#004f35]'
                }`}
              >
                {currentInfo.status}
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#f1f5f9] text-[#475569] font-mono text-[9px] uppercase font-bold">
                    {currentInfo.modelCategory}
                  </span>
                  <h4 className="font-bold text-[15px] text-[#0f233d]">{currentInfo.name}</h4>
                </div>
                <p className="text-[12px] text-[#434655] mt-1.5 leading-relaxed">{currentInfo.note}</p>
              </div>

              {/* Physical Telemetry Cards */}
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
                  <span className="text-[#4d5f7c]">Thermal Profile:</span>
                  <span className="font-bold text-[#0f233d]">{currentInfo.temp}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
                  <span className="text-[#4d5f7c]">Pressure / Dynamics:</span>
                  <span className="font-bold text-[#0f233d]">{currentInfo.pressure}</span>
                </div>
                <div className="p-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
                  <span className="text-[#4d5f7c]">Vibration FFT Spectrum:</span>
                  <span className="font-bold text-[#0f233d]">{currentInfo.vibration}</span>
                </div>
              </div>

              {/* Precision Tolerances and Maintenance Parameters */}
              <div className="pt-2 border-t border-[#e2e8f0]">
                <span className="font-mono text-[10px] text-[#4d5f7c] uppercase font-bold tracking-wider block mb-2">
                  Precision Engineering Tolerances & Specs
                </span>
                <div className="space-y-1.5 text-[11px] text-[#434655]">
                  {currentInfo.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#10b981] text-[15px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] text-[#4d5f7c] uppercase font-bold block">
                CBM Logistics Dispatch
              </span>
              <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">
                Transfer {currentInfo.name.split(' ')[0]} to Overhaul Queue
              </span>
            </div>
            <button
              onClick={() => {
                setToastMessage(`Telemetric diagnostics for ${currentInfo.name} transferred to Depot Queue`);
                setTimeout(() => setToastMessage(null), 2500);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#1d4ed8] hover:bg-[#0037b0] text-white font-mono text-[11px] font-bold shadow-sm transition-colors"
            >
              Queue Depot
            </button>
          </div>
        </div>
      </section>

      {/* Engine Architecture & UAV Specifications Quick Guide */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* UAV Specifications Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ebf3ff] text-[#0037b0] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">flight</span>
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-[#0f233d]">Tactical MALE UAV-704 Airframe</h3>
              <p className="text-[11px] text-[#4d5f7c]">Medium-Altitude Long-Endurance ISR Platform</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-[11px]">
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Wingspan</span>
              <span className="font-bold text-[#0f233d]">14.8 m (High Aspect)</span>
            </div>
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Max Takeoff Weight</span>
              <span className="font-bold text-[#0f233d]">1,150 kg MTOW</span>
            </div>
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Service Ceiling</span>
              <span className="font-bold text-[#0f233d]">FL260 (8,000 m)</span>
            </div>
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Mission Endurance</span>
              <span className="font-bold text-[#0f233d]">24+ Flight Hours</span>
            </div>
          </div>
        </div>

        {/* Rotax Engine Architecture Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ebf3ff] text-[#0037b0] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">settings</span>
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-[#0f233d]">Rotax 915 iSA Boxer Propulsion Core</h3>
              <p className="text-[11px] text-[#4d5f7c]">Turbocharged FADEC-Controlled Aero Piston Engine</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 font-mono text-[11px]">
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Configuration</span>
              <span className="font-bold text-[#0f233d]">4-Cyl Horizontally Opposed</span>
            </div>
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Power Rating</span>
              <span className="font-bold text-[#0f233d]">141 HP (105 kW) @ 5,800 RPM</span>
            </div>
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Forced Induction</span>
              <span className="font-bold text-[#0f233d]">Garrett Turbo w/ Intercooler</span>
            </div>
            <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              <span className="text-[#64748b] block text-[9px] uppercase">Injection & Ignition</span>
              <span className="font-bold text-[#0f233d]">Dual Redundant FADEC EFI</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
