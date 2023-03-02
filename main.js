import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30) 



const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh( geometry, material ) 

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set( 20, 20, 20 );

const ambientLight = new THREE.AmbientLight(0x333333);

scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
scene.add( pointLight, ambientLight );
const control = new OrbitControls(camera, renderer.domElement)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

const bruceTexture = new THREE.TextureLoader().load('bruce.jpg');
const bruce = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial( {map: bruceTexture }))
bruce.position.setX(10)
bruce.position.setY(15)
bruce.position.setZ(-2)
scene.add(bruce)

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon)

function animate() {
  requestAnimationFrame( animate ) ;
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  bruce.rotation.y += 0.01
  bruce.rotation.x += 0.003



  //control.update();

  renderer.render(scene, camera)
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)) // random from -100 to +100
  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)
animate()
