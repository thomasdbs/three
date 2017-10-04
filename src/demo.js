import * as THREE from 'three';
import Stats from 'stats.js';
import './main.css';
import threeOrbitControls from './utils/OrbitControls';

// attach orbit controls to THREE
const OrbitControls = threeOrbitControls(THREE);

// stats
const stats = new Stats();
document.body.appendChild(stats.domElement);

// scene, renderer, camera, mesh (geometry + material)
const renderer = new THREE.WebGLRenderer({
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// enbale the drawing of shadows
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Scene
const scene = new THREE.Scene();

//Groupes
const terrain = new THREE.Group();
const onix = new THREE.Group();
const onixTete = new THREE.Group();
const onixHautCorps = new THREE.Group();
const onixMilieuCorps = new THREE.Group();
const onixBasCorps = new THREE.Group();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 5, -60);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// axis helper
// const axisHelper = new THREE.AxisHelper(100);
// scene.add(axisHelper);

//Lumiere ambiante
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

//Lumiere1
const spotLight = new THREE.SpotLight(0x88aa88);
spotLight.angle = 60 * (Math.PI / 180);
spotLight.position.set(20, 60, 0);
spotLight.castShadow = true;
spotLight.distance = 200;
spotLight.decay = 2;
spotLight.penumbra = 0.9;
scene.add(spotLight);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);




//Materiaux
const materialEau = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0x007cda,
    side: THREE.DoubleSide,
});

const materialRocher = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0xffefd5,
    side: THREE.DoubleSide,
});

const materialTerre = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0xe9c9b1,
    side: THREE.DoubleSide,
});

const materialCaillou = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0x7e5835,
    side: THREE.DoubleSide,
});

const materialOnix = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0xa9a9a9,
    side: THREE.DoubleSide,
});

const materialOnixOeil = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0xffffff,
    side: THREE.DoubleSide,
});

const materialOnixPupille = new THREE.MeshPhongMaterial({
    emissive: 0x000000,
    specular: 0x888888,
    color: 0x000000,
    side: THREE.DoubleSide,
});

//Eau
const geometryEau = new THREE.PlaneGeometry(150, 150, 32, 32);
geometryEau.vertices.forEach(v => {
	if (Math.random() > 0.5) v.z -= Math.random() * 2;
});
geometryEau.computeFaceNormals();
geometryEau.computeVertexNormals();
const eau = new THREE.Mesh(geometryEau, materialEau);
eau.rotation.x = Math.PI / 2;
eau.receiveShadow = true;

//Rocher
const geometryRocher = new THREE.SphereGeometry(3.5,3,5,0,3,0,3.1);
const rocher = new THREE.Mesh(geometryRocher, materialRocher);
rocher.rotation.x = -Math.PI / 2;
rocher.position.z = -50;
rocher.receiveShadow = true;

//Terre
const geometryTerre = new THREE.BoxGeometry(90,5,60,30,30,30);
geometryTerre.vertices.forEach(v => {
	if (Math.random() > 0.5) v.z -= Math.random() * 2;
});
geometryTerre.computeFaceNormals();
geometryTerre.computeVertexNormals();
const terre = new THREE.Mesh(geometryTerre, materialTerre);
terre.position.set(30,0,46);
terre.receiveShadow = true;

//Petits cailloux
const geometryPetitCaillou = new THREE.DodecahedronGeometry(2,0);
const petitCaillou1 = new THREE.Mesh(geometryPetitCaillou, materialCaillou);
petitCaillou1.position.set(0,2,40);
petitCaillou1.receiveShadow = true;
const petitCaillou2 = new THREE.Mesh(geometryPetitCaillou, materialCaillou);
petitCaillou2.position.set(65,2,20);
petitCaillou2.receiveShadow = true;

//Gros caillou
const geometryGrosCaillou = new THREE.DodecahedronGeometry(4,0);
const grosCaillou = new THREE.Mesh(geometryGrosCaillou, materialCaillou);
grosCaillou.position.set(30,2,60);
grosCaillou.receiveShadow = true;

//Montagne
const geometryMontagne = new THREE.ConeGeometry(26,25,7,7,true,0,2.5);
const montagne = new THREE.Mesh(geometryMontagne, materialCaillou);
geometryMontagne.vertices.forEach(v => {
	if (Math.random() > 0.5) v.z -= Math.random() * 2;
});
montagne.position.set(70,10,63);
montagne.rotation.y = 165 * (Math.PI / 180);
montagne.receiveShadow = true;

//Onix1
const NUM_ONIX1 = 6;
for (var i = 0; i < NUM_ONIX1; i++) {
    const geometryOnix = new THREE.DodecahedronGeometry(0.8+i/10,0);
    const onix1 = new THREE.Mesh(geometryOnix, materialOnix);
    onix1.position.set(22+i*0.6,3.5,42-i*1.3);
    onix1.receiveShadow = true;
    onixBasCorps.add(onix1);
}

const geometryOnix2 = new THREE.DodecahedronGeometry(1.4,0);

const onix2 = new THREE.Mesh(geometryOnix2, materialOnix);
onix2.position.set(24,3.5,33.5);
onix2.receiveShadow = true;
const onix3 = new THREE.Mesh(geometryOnix2, materialOnix);
onix3.position.set(23,3.5,32);
onix3.receiveShadow = true;

const NUM_ONIX4 = 6;
for (var i = 0; i < NUM_ONIX4; i++) {
    const geometryOnix3 = new THREE.DodecahedronGeometry(1.5+i/10,0);
    const onix4 = new THREE.Mesh(geometryOnix3, materialOnix);
    onix4.position.set(23,3+i*1.8,32-i*1.8);
    onix4.receiveShadow = true;
    onixMilieuCorps.add(onix4);
}

const NUM_ONIX5 = 3;
for (var i = 0; i < NUM_ONIX5; i++) {
    const geometryOnix4 = new THREE.DodecahedronGeometry(2.1+i/10,0);
    const onix5 = new THREE.Mesh(geometryOnix4, materialOnix);
    onix5.position.set(23,13.5+i*0.8,20.5-i*2.2);
    onix5.receiveShadow = true;
    onixHautCorps.add(onix5);
}

const geometryOnix5 = new THREE.DodecahedronGeometry(2.3,0);
const onixCorne = new THREE.Mesh(geometryOnix5, materialOnix);
onixCorne.position.set(23,15,13);
onixCorne.receiveShadow = true;

const geometryOnix6 = new THREE.ConeGeometry(1,5,5);
const onixVisage = new THREE.Mesh(geometryOnix6, materialOnix);
onixVisage.position.set(23,17,13);
onixVisage.receiveShadow = true;

const geometryOnixOeil = new THREE.DodecahedronGeometry(0.5,0);
const onixOeilGauche = new THREE.Mesh(geometryOnixOeil, materialOnixOeil);
onixOeilGauche.position.set(22,15.2,11.8);
onixOeilGauche.receiveShadow = true;
const onixOeilDroit = new THREE.Mesh(geometryOnixOeil, materialOnixOeil);
onixOeilDroit.position.set(24,15.2,11.8);
onixOeilDroit.receiveShadow = true;

const geometryOnixPupille = new THREE.DodecahedronGeometry(0.1,0);
const onixPupilleGauche = new THREE.Mesh(geometryOnixPupille, materialOnixPupille);
onixPupilleGauche.position.set(21.8,15.1,11.4);
onixPupilleGauche.receiveShadow = true;
const onixPupilleDroite = new THREE.Mesh(geometryOnixPupille, materialOnixPupille);
onixPupilleDroite.position.set(24.2,15.1,11.4);
onixPupilleDroite.receiveShadow = true;

//Ajout au groupe
terrain.add(eau);
terrain.add(rocher);
terrain.add(terre);
terrain.add(petitCaillou1);
terrain.add(petitCaillou2);
terrain.add(grosCaillou);
terrain.add(montagne);
onixTete.add(onixVisage);
onixTete.add(onixOeilGauche);
onixTete.add(onixOeilDroit);
onixTete.add(onixPupilleDroite);
onixTete.add(onixPupilleGauche);
onixTete.add(onixCorne);
onix.add(onix2);
onix.add(onix3);
onix.add(onixTete);
onix.add(onixHautCorps);
onix.add(onixMilieuCorps);
onix.add(onixBasCorps);

//Ajout a la scene
scene.add(terrain);
scene.add(onix);


// let i = onixTete.position.x;
let rotation = 0;
let montee = 1;

const animate = timestamp => {
	stats.begin();

	if (montee==1) {
		onixTete.rotation.z += 0.04*(Math.PI/180);
		onixHautCorps.rotation.z += 0.02*(Math.PI/180);
		onixBasCorps.rotation.y += 0.004*(Math.PI/180);
		onixMilieuCorps.rotation.z += 0.02*(Math.PI/180);
		rotation+=0.02;
	}else{
		onixTete.rotation.z -= 0.04*(Math.PI/180);
		onixHautCorps.rotation.z -= 0.02*(Math.PI/180);
		onixBasCorps.rotation.y -= 0.004*(Math.PI/180);
		onixMilieuCorps.rotation.z -= 0.02*(Math.PI/180);
		rotation-=0.02;
	}
	if (rotation>=5) {
		montee=0;
	}else if (rotation<=0) {
		montee=1;
	}
	// if (rotation<=5 && montee==1) {
		// onixTete.rotation.z += 0.02*(Math.PI/180);
		// rotation+=0.02;
		// if(rotation==5) montee=0;

	// }else{
		// onixTete.rotation.z -= 0.02*(Math.PI/180);
		// rotation-=0.02;
		// if(rotation==0) montee=1;
	// }

	renderer.render(scene, camera);
	stats.end();
	requestAnimationFrame(animate);
};
animate();
