import * as THREE from "three"

/***********
 ** SCENE **
 ************/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('purple')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize( window.innerWidth, window.innerHeight )

/**************
 ** MESHES **
 **************/
//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh (sphereGeometry, sphereMaterial)

scene.add(testSphere)

const boxGeometry = new THREE.BoxGeometry(1)
const boxMaterial = new THREE.MeshNormalMaterial()
const testBox = new THREE.Mesh (boxGeometry, boxMaterial)

scene.add(testBox)

/******************* 
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate testSphere
    console.log(elapsedTime)
    testSphere.position.y = Math.sin(elapsedTime)

    //Animate testBox
    console.log(elapsedTime)
    testBox.position.x = Math.cos(elapsedTime)
    testBox.position.y = Math.sin(elapsedTime)
    
    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()