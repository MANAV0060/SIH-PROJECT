import * as THREE from 'three';

export interface ModelComponents {
  root: THREE.Group;
  uavGroup: THREE.Group;
  engineGroup: THREE.Group;
  propellerMesh: THREE.Group;
  cylinders: { [key: string]: THREE.Group };
  turboMesh: THREE.Group;
  fuselageCover: THREE.Mesh;
  animatableParts: {
    propeller: THREE.Group;
    turboImpeller?: THREE.Mesh;
  };
  explodedMeshMap: Array<{
    mesh: THREE.Object3D;
    origPos: THREE.Vector3;
    explodeDir: THREE.Vector3;
    maxDistance: number;
  }>;
  interactiveObjects: THREE.Object3D[];
}

/**
 * Creates an aerospace-grade procedural 3D model of:
 * 1) Tactical MALE UAV Airframe (AeroTwin UAV-704)
 * 2) Rotax 915 iSA Boxer Engine Core
 */
export function buildUavAndEngineScene(): ModelComponents {
  const root = new THREE.Group();
  const uavGroup = new THREE.Group();
  const engineGroup = new THREE.Group();
  root.add(uavGroup);
  root.add(engineGroup);

  const explodedMeshMap: ModelComponents['explodedMeshMap'] = [];
  const interactiveObjects: THREE.Object3D[] = [];
  const cylinders: { [key: string]: THREE.Group } = {};

  // Standard Materials
  const darkCarbonMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.35,
    metalness: 0.6,
  });

  const aeroWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.25,
    metalness: 0.2,
  });

  const aluminumAlloyMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.2,
    metalness: 0.85,
  });

  const bronzeGoldMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    roughness: 0.3,
    metalness: 0.7,
  });

  const titaniumBurnMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.4,
    metalness: 0.8,
  });

  const hotSpotAmberMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
    roughness: 0.3,
    metalness: 0.5,
  });

  const nominalGreenMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.4,
    metalness: 0.5,
  });

  const glassSensorMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    transmission: 0.85,
    thickness: 0.5,
    transparent: true,
    opacity: 0.85,
  });

  // ==========================================
  // 1. BUILD TACTICAL UAV AIRFRAME
  // ==========================================

  // Fuselage (Streamlined aerodynamic pod)
  // Main fuselage body
  const fuselageGeo = new THREE.CylinderGeometry(0.7, 0.45, 9.0, 24);
  fuselageGeo.rotateX(Math.PI / 2);
  const fuselage = new THREE.Mesh(fuselageGeo, aeroWhiteMat);
  fuselage.name = 'uav_fuselage';
  fuselage.userData = { id: 'fuselage', label: 'Fuselage & Primary Airframe' };
  uavGroup.add(fuselage);
  interactiveObjects.push(fuselage);

  // Nose Radome (Bulbous aerodynamic nose containing SATCOM / radar)
  const noseGeo = new THREE.SphereGeometry(0.7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  noseGeo.rotateX(Math.PI / 2);
  const nose = new THREE.Mesh(noseGeo, aeroWhiteMat);
  nose.position.set(0, 0.05, 4.5);
  nose.scale.set(1.0, 1.05, 1.4);
  uavGroup.add(nose);

  // SATCOM Upper Fairing hump
  const satcomGeo = new THREE.CylinderGeometry(0.35, 0.5, 3.2, 16);
  satcomGeo.rotateX(Math.PI / 2);
  const satcom = new THREE.Mesh(satcomGeo, aeroWhiteMat);
  satcom.position.set(0, 0.65, 1.8);
  satcom.scale.set(0.9, 0.6, 1.0);
  uavGroup.add(satcom);

  // Forward EO/IR Gimbal Turret (FLIR camera sphere)
  const turretGroup = new THREE.Group();
  turretGroup.position.set(0, -0.6, 3.8);
  const turretMount = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.2, 16), darkCarbonMat);
  const turretBall = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), darkCarbonMat);
  turretBall.position.set(0, -0.15, 0);
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), glassSensorMat);
  lens.rotateX(Math.PI / 2);
  lens.position.set(0, -0.15, 0.3);
  turretGroup.add(turretMount, turretBall, lens);
  turretGroup.name = 'uav_turret';
  turretGroup.userData = { id: 'turret', label: 'EO/IR Electro-Optical Sensor Gimbal' };
  uavGroup.add(turretGroup);
  interactiveObjects.push(turretBall);

  // Removable / Translucent Cowling cover for engine compartment inspection
  const cowlingGeo = new THREE.CylinderGeometry(0.65, 0.55, 3.0, 20, 1, false, -Math.PI / 2, Math.PI);
  cowlingGeo.rotateX(Math.PI / 2);
  const cowlingMat = aeroWhiteMat.clone();
  const cowling = new THREE.Mesh(cowlingGeo, cowlingMat);
  cowling.position.set(0, 0.05, -1.8);
  cowling.name = 'uav_cowling';
  cowling.userData = { id: 'cowling', label: 'Engine Nacelle Upper Cowling Panel' };
  uavGroup.add(cowling);
  interactiveObjects.push(cowling);

  explodedMeshMap.push({
    mesh: cowling,
    origPos: cowling.position.clone(),
    explodeDir: new THREE.Vector3(0, 1, 0),
    maxDistance: 1.8,
  });

  // Main High-Aspect-Ratio Aerodynamic Wings (Wingspan ~15m simulated)
  const wingSpan = 14.0;
  const wingChordRoot = 1.4;
  const wingChordTip = 0.55;
  const wingThickness = 0.12;

  const leftWingGeo = new THREE.BoxGeometry(wingSpan / 2, wingThickness, wingChordRoot);
  leftWingGeo.translate(-wingSpan / 4, 0, 0);
  const leftWing = new THREE.Mesh(leftWingGeo, aeroWhiteMat);
  leftWing.position.set(-0.35, 0.25, 0.4);
  leftWing.rotation.z = -0.025; // Slight dihedral
  leftWing.name = 'uav_wing_port';
  leftWing.userData = { id: 'wing_port', label: 'Port Main Wing (Integral Fuel Cell)' };
  uavGroup.add(leftWing);
  interactiveObjects.push(leftWing);

  // Port Winglet
  const portWinglet = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.7, 0.4), darkCarbonMat);
  portWinglet.position.set(-wingSpan / 2 - 0.35, 0.55, 0.4);
  portWinglet.rotation.z = -0.15;
  uavGroup.add(portWinglet);

  const rightWingGeo = new THREE.BoxGeometry(wingSpan / 2, wingThickness, wingChordRoot);
  rightWingGeo.translate(wingSpan / 4, 0, 0);
  const rightWing = new THREE.Mesh(rightWingGeo, aeroWhiteMat);
  rightWing.position.set(0.35, 0.25, 0.4);
  rightWing.rotation.z = 0.025; // Slight dihedral
  rightWing.name = 'uav_wing_stbd';
  rightWing.userData = { id: 'wing_stbd', label: 'Starboard Main Wing (Integral Fuel Cell)' };
  uavGroup.add(rightWing);
  interactiveObjects.push(rightWing);

  // Starboard Winglet
  const stbdWinglet = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.7, 0.4), darkCarbonMat);
  stbdWinglet.position.set(wingSpan / 2 + 0.35, 0.55, 0.4);
  stbdWinglet.rotation.z = 0.15;
  uavGroup.add(stbdWinglet);

  // V-Tail Empennage (Inverted V / V-Tail characteristic of MALE UAVs)
  const vTailAngle = Math.PI / 4;
  const tailLength = 2.4;
  const tailGeoL = new THREE.BoxGeometry(0.08, tailLength, 0.6);
  tailGeoL.translate(0, tailLength / 2, 0);

  const vTailPort = new THREE.Mesh(tailGeoL, darkCarbonMat);
  vTailPort.position.set(-0.25, 0.2, -4.1);
  vTailPort.rotation.z = vTailAngle;
  vTailPort.rotation.y = -0.05;
  uavGroup.add(vTailPort);

  const vTailStbd = new THREE.Mesh(tailGeoL, darkCarbonMat);
  vTailStbd.position.set(0.25, 0.2, -4.1);
  vTailStbd.rotation.z = -vTailAngle;
  vTailStbd.rotation.y = 0.05;
  uavGroup.add(vTailStbd);

  // Pusher Propeller Assembly at rear
  const propellerGroup = new THREE.Group();
  propellerGroup.position.set(0, 0.1, -4.65);

  const propSpinner = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.45, 16), aluminumAlloyMat);
  propSpinner.rotateX(-Math.PI / 2);
  propellerGroup.add(propSpinner);

  // 3 Propeller Blades
  for (let b = 0; b < 3; b++) {
    const bladeAngle = (b * Math.PI * 2) / 3;
    const bladeGeo = new THREE.BoxGeometry(0.08, 1.2, 0.04);
    bladeGeo.translate(0, 0.6, 0);
    const blade = new THREE.Mesh(bladeGeo, darkCarbonMat);
    blade.rotation.z = bladeAngle;
    blade.rotation.x = 0.15; // Blade pitch angle
    propellerGroup.add(blade);
  }
  propellerGroup.name = 'uav_propeller';
  propellerGroup.userData = { id: 'propeller', label: 'Aero Constant-Speed Variable Pitch Pusher Propeller' };
  uavGroup.add(propellerGroup);
  interactiveObjects.push(propSpinner);

  // Retractable Landing Gear (Tricycle)
  const gearMat = darkCarbonMat;
  // Nose gear
  const noseLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), gearMat);
  noseLeg.position.set(0, -0.9, 2.5);
  const noseWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.09, 16), darkCarbonMat);
  noseWheel.rotateZ(Math.PI / 2);
  noseWheel.position.set(0, -1.35, 2.5);
  uavGroup.add(noseLeg, noseWheel);

  // Main gear (left and right)
  const mainGearL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 12), gearMat);
  mainGearL.position.set(-0.7, -0.9, -0.2);
  mainGearL.rotation.z = -0.25;
  const mainWheelL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.11, 16), darkCarbonMat);
  mainWheelL.rotateZ(Math.PI / 2);
  mainWheelL.position.set(-0.95, -1.35, -0.2);
  uavGroup.add(mainGearL, mainWheelL);

  const mainGearR = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 12), gearMat);
  mainGearR.position.set(0.7, -0.9, -0.2);
  mainGearR.rotation.z = 0.25;
  const mainWheelR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.11, 16), darkCarbonMat);
  mainWheelR.rotateZ(Math.PI / 2);
  mainWheelR.position.set(0.95, -1.35, -0.2);
  uavGroup.add(mainGearR, mainWheelR);

  // ==========================================
  // 2. BUILD ROTAX 915 iSA PROPULSION CORE
  // ==========================================
  // Located in the engine bay of the UAV (or viewed standalone in Engine mode)
  // Coordinates are centered relative to engineGroup.

  // Central Crankcase Block
  const crankcaseGeo = new THREE.BoxGeometry(0.8, 0.65, 1.3);
  const crankcaseMesh = new THREE.Mesh(crankcaseGeo, aluminumAlloyMat);
  crankcaseMesh.position.set(0, 0, 0);
  crankcaseMesh.name = 'engine_crankcase';
  crankcaseMesh.userData = { id: 'crankcase', label: 'Crankcase, Dry Sump Scavenge & Oil Pump' };
  engineGroup.add(crankcaseMesh);
  interactiveObjects.push(crankcaseMesh);

  // Oil Sump / Filter Bottom
  const sumpGeo = new THREE.BoxGeometry(0.65, 0.22, 0.9);
  const sumpMesh = new THREE.Mesh(sumpGeo, darkCarbonMat);
  sumpMesh.position.set(0, -0.42, -0.05);
  engineGroup.add(sumpMesh);

  const oilFilter = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.35, 16), darkCarbonMat);
  oilFilter.rotateZ(Math.PI / 2);
  oilFilter.position.set(0.48, -0.38, 0.2);
  engineGroup.add(oilFilter);

  // Propeller Reduction Gearbox (PRGU) at rear
  const gearboxGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.55, 20);
  gearboxGeo.rotateX(Math.PI / 2);
  const gearbox = new THREE.Mesh(gearboxGeo, aluminumAlloyMat);
  gearbox.position.set(0, 0.12, -0.9);
  gearbox.name = 'engine_gearbox';
  gearbox.userData = { id: 'gearbox', label: 'Propeller Reduction Gearbox (Ratio 1:2.54)' };
  engineGroup.add(gearbox);
  interactiveObjects.push(gearbox);

  explodedMeshMap.push({
    mesh: gearbox,
    origPos: gearbox.position.clone(),
    explodeDir: new THREE.Vector3(0, 0, -1),
    maxDistance: 1.2,
  });

  // Helper to build a Boxer Cylinder Head Assembly with cooling fins & valve cover
  function createCylinder(id: string, label: string, isAlert: boolean, xSide: number, zOffset: number) {
    const cylGroup = new THREE.Group();
    cylGroup.position.set(xSide * 0.42, 0.05, zOffset);

    // Cylinder barrel with cooling fins
    const barrelRadius = 0.24;
    const barrelLength = 0.45;
    const barrelGeo = new THREE.CylinderGeometry(barrelRadius, barrelRadius, barrelLength, 20);
    barrelGeo.rotateZ(Math.PI / 2);
    const barrelMat = isAlert ? hotSpotAmberMat : aluminumAlloyMat;
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.set(xSide * barrelLength * 0.5, 0, 0);
    cylGroup.add(barrel);

    // 5 Cooling Rings / Fins
    for (let f = 0; f < 5; f++) {
      const finGeo = new THREE.CylinderGeometry(barrelRadius + 0.07, barrelRadius + 0.07, 0.02, 20);
      finGeo.rotateZ(Math.PI / 2);
      const finMat = isAlert ? hotSpotAmberMat : aluminumAlloyMat;
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(xSide * (0.08 + f * 0.08), 0, 0);
      cylGroup.add(fin);
    }

    // Cylinder Head & Valve Cover
    const headGeo = new THREE.BoxGeometry(0.24, 0.48, 0.48);
    const headMat = isAlert ? hotSpotAmberMat : (isAlert ? bronzeGoldMat : aluminumAlloyMat);
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(xSide * (barrelLength + 0.12), 0, 0);
    head.name = `engine_${id}`;
    head.userData = { id, label, isAlert };
    cylGroup.add(head);
    interactiveObjects.push(head);

    // Spark plug & lead
    const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.18, 10), titaniumBurnMat);
    plug.position.set(xSide * (barrelLength + 0.1), 0.26, 0);
    cylGroup.add(plug);

    // Intake & Exhaust Ports
    const runnerGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.35, 12);
    const runner = new THREE.Mesh(runnerGeo, titaniumBurnMat);
    runner.position.set(xSide * (barrelLength + 0.05), -0.22, 0.1);
    runner.rotateX(0.4);
    cylGroup.add(runner);

    engineGroup.add(cylGroup);
    cylinders[id] = cylGroup;

    explodedMeshMap.push({
      mesh: cylGroup,
      origPos: cylGroup.position.clone(),
      explodeDir: new THREE.Vector3(xSide, 0, 0),
      maxDistance: 1.5,
    });

    return cylGroup;
  }

  // Build the 4 Boxer Cylinders
  // Port Bank (Negative X)
  createCylinder('cyl1', 'Cylinder 01 (Port Bank)', false, -1, 0.28);
  createCylinder('cyl3', 'Cylinder 03 (Port Bank) - HOT SPOT ALERT', true, -1, -0.28);

  // Starboard Bank (Positive X)
  createCylinder('cyl2', 'Cylinder 02 (Starboard Bank)', false, 1, 0.28);
  createCylinder('cyl4', 'Cylinder 04 (Starboard Bank)', false, 1, -0.28);

  // Turbocharger Assembly (Garrett Aero Turbocharger, Mounted Top-Rear)
  const turboGroup = new THREE.Group();
  turboGroup.position.set(0, 0.48, 0.2);

  // Turbine Housing (Exhaust side - Dark Cast Iron)
  const turbineHousing = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.1, 16, 24, Math.PI * 1.8),
    titaniumBurnMat
  );
  turbineHousing.rotateY(Math.PI / 2);
  turbineHousing.position.set(-0.16, 0, 0);
  turboGroup.add(turbineHousing);

  // Compressor Housing (Induction air side - Polished Aluminum Alloy Scroll)
  const compressorHousing = new THREE.Mesh(
    new THREE.TorusGeometry(0.26, 0.11, 16, 24, Math.PI * 1.8),
    aluminumAlloyMat
  );
  compressorHousing.rotateY(Math.PI / 2);
  compressorHousing.position.set(0.16, 0, 0);
  turboGroup.add(compressorHousing);

  // Center Bearing Housing & Wastegate Actuator
  const centerCartridge = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.22, 16), darkCarbonMat);
  centerCartridge.rotateZ(Math.PI / 2);
  turboGroup.add(centerCartridge);

  const wastegate = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.25, 12), bronzeGoldMat);
  wastegate.position.set(0, 0.28, 0.15);
  wastegate.rotateX(Math.PI / 3);
  turboGroup.add(wastegate);

  turboGroup.name = 'engine_turbo';
  turboGroup.userData = { id: 'turbo', label: 'Garrett Aero Turbocharger Assembly' };
  engineGroup.add(turboGroup);
  interactiveObjects.push(turbineHousing, compressorHousing);

  explodedMeshMap.push({
    mesh: turboGroup,
    origPos: turboGroup.position.clone(),
    explodeDir: new THREE.Vector3(0, 1, 0),
    maxDistance: 1.4,
  });

  // Intercooler and Air Intake Plenum
  const intercoolerGeo = new THREE.BoxGeometry(0.7, 0.3, 0.25);
  const intercooler = new THREE.Mesh(intercoolerGeo, darkCarbonMat);
  intercooler.position.set(0, 0.42, -0.45);
  engineGroup.add(intercooler);

  // Exhaust Manifold Headers routing into Turbo
  const exhaustHeaderGeoL = new THREE.CylinderGeometry(0.045, 0.045, 0.8, 12);
  exhaustHeaderGeoL.rotateZ(0.6);
  const exhaustHeaderL = new THREE.Mesh(exhaustHeaderGeoL, titaniumBurnMat);
  exhaustHeaderL.position.set(-0.35, 0.18, 0.0);
  engineGroup.add(exhaustHeaderL);

  const exhaustHeaderGeoR = new THREE.CylinderGeometry(0.045, 0.045, 0.8, 12);
  exhaustHeaderGeoR.rotateZ(-0.6);
  const exhaustHeaderR = new THREE.Mesh(exhaustHeaderGeoR, titaniumBurnMat);
  exhaustHeaderR.position.set(0.35, 0.18, 0.0);
  engineGroup.add(exhaustHeaderR);

  // Position engineGroup inside the UAV rear bay by default
  engineGroup.position.set(0, 0.05, -1.8);
  engineGroup.scale.set(1.0, 1.0, 1.0);

  return {
    root,
    uavGroup,
    engineGroup,
    propellerMesh: propellerGroup,
    cylinders,
    turboMesh: turboGroup,
    fuselageCover: cowling,
    animatableParts: {
      propeller: propellerGroup,
    },
    explodedMeshMap,
    interactiveObjects,
  };
}
