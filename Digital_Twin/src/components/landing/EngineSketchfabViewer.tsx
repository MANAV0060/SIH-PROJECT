import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box, Sparkles, RefreshCw } from 'lucide-react';
import { buildUavAndEngineScene, ModelComponents } from '../../utils/threeEngineUavModels';

interface EngineSketchfabViewerProps {
  className?: string;
}

export function EngineSketchfabViewer({ className = '' }: EngineSketchfabViewerProps) {
  const [mode, setMode] = useState<'sketchfab' | 'native'>('sketchfab');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const modelsRef = useRef<ModelComponents | null>(null);

  // Monitor iframe load; if external Sketchfab network stalls for > 8s, offer native fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        setLoadTimedOut(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [iframeLoaded]);

  // Setup Three.js Native 3D Engine when mode is 'native'
  useEffect(() => {
    if (mode !== 'native') return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f18);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(3.2, 2.2, 3.4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxDistance = 12;
    controls.minDistance = 1.2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight2.position.set(-6, -3, -5);
    scene.add(dirLight2);

    const orangeAccent = new THREE.PointLight(0xf26522, 2.5, 8);
    orangeAccent.position.set(0, 1.5, 1);
    scene.add(orangeAccent);

    // Load Procedural Aero Piston Engine
    const modelScene = buildUavAndEngineScene();
    modelsRef.current = modelScene;
    // Hide airframe so only the aero engine core is showcased
    modelScene.uavGroup.visible = false;
    modelScene.engineGroup.visible = true;
    // Center the engine
    modelScene.engineGroup.position.set(0, 0, 0);
    scene.add(modelScene.root);

    // Subtle grid platform
    const grid = new THREE.GridHelper(6, 12, 0x1e293b, 0x0f172a);
    grid.position.y = -0.7;
    scene.add(grid);

    // Animation Loop
    let lastTime = performance.now();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Animate propeller & turbo
      if (modelScene.animatableParts.propeller) {
        modelScene.animatableParts.propeller.rotateY(dt * 15);
      }
      if (modelScene.animatableParts.turboImpeller) {
        modelScene.animatableParts.turboImpeller.rotateZ(dt * 30);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [mode]);

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-[#0a0f18] border border-gray-200/80 shadow-md group ${className}`}>
      {/* 3D Model Header Tag & Engine Switcher */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 bg-gray-950/85 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-gray-800 shadow-sm pointer-events-auto">
          <Box size={11} className="text-[#F26522]" />
          <span>3D AERO ENGINE</span>
        </div>

        {/* Instant Three.js / Sketchfab Toggle */}
        <div className="pointer-events-auto flex items-center gap-1 bg-gray-950/85 backdrop-blur-md p-0.5 rounded-full border border-gray-800 shadow-sm">
          <button
            onClick={() => setMode('sketchfab')}
            className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full transition-all ${
              mode === 'sketchfab'
                ? 'bg-[#F26522] text-white font-semibold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Sketchfab Vintage V-Type Engine"
          >
            V-Type
          </button>
          <button
            onClick={() => setMode('native')}
            className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
              mode === 'native'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Interactive WebGL Aero Piston Twin Engine (Instant 60FPS)"
          >
            <Sparkles size={9} />
            Native 3D
          </button>
        </div>
      </div>

      {/* Main 3D Viewport */}
      <div className="w-full aspect-[438/346] relative overflow-hidden bg-[#0a0f18]">
        {mode === 'sketchfab' ? (
          <div className="w-full h-full relative overflow-hidden">
            <iframe
              title="Aircraft V-Type Engine"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              src="https://sketchfab.com/models/8937d36836164c6b98aec590f1b39e2b/embed?autostart=1&preload=0&ui_theme=dark&ui_controls=0&ui_watermark=0&ui_infos=0&ui_stop=0&ui_hint=0&scrollwheel=0"
              className="w-[calc(100%+60px)] h-[calc(100%+104px)] -mt-[52px] -mb-[52px] -ml-[30px] block"
              onLoad={() => setIframeLoaded(true)}
            />

            {/* If external Sketchfab takes long, show friendly quick switch hint */}
            {!iframeLoaded && loadTimedOut && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/90 text-white p-4 text-center z-10">
                <p className="text-xs text-gray-300 mb-3">
                  External 3D asset is streaming from CloudFront.
                </p>
                <button
                  onClick={() => setMode('native')}
                  className="px-3 py-1.5 bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md transition-all"
                >
                  <RefreshCw size={12} className="animate-spin" />
                  Switch to Instant Native 3D Engine
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <div ref={mountRef} className="w-full h-full" />
            <div className="absolute bottom-2 right-2.5 z-10 pointer-events-none">
              <span className="text-[9px] font-mono text-gray-500 bg-gray-900/70 px-2 py-0.5 rounded border border-gray-800">
                Drag to Rotate • Scroll to Zoom
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Note: All circled attribution bars, watermark badges, and share/close buttons are completely removed */}
    </div>
  );
}
