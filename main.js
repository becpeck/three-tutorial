import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// needed to display in three
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// setup renderer, add to document
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create cube, add to scene
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material ); // meshes geometry with material
scene.add( cube );

// moves camera to (0,0,5) so it doesn't overlap with cube added at (0,0,0)
camera.position.z = 5;

// animate/render loop - renderer renders on each screen refresh
function animate() {
    requestAnimationFrame( animate );

    // changes/movements need to be called in animation loop
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // render scene with camera
    renderer.render( scene, camera );
}

// replaces animate() in case of WebGL-incompatible browser
if (WebGL.isWebGLAvailable()) {
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}
