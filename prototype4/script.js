import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/***********
 * SETUP *
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight 
}
// Resizing
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPizelRatio(Math.min(window.devicePixelRatio, 2))
})


/***********
 ** SCENE **
 ************/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 12, -20)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize( sizes.width, sizes.height )

// Controls
const controls = new OrbitControls( camera, canvas)
controls.enableDamping = true

/**************
 *** LIGHTS ***
 **************/
// Directional Lights
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/**************
 ** MESHES **
 **************/
// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, color) =>
{
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //Position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    // Randomize cube rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI

    // Add cube to scene
    scene.add(cube)
}

//drawCube(0, 'red')
//drawCube(5, 'blue')

/*********
 ** UI **
 *********/
// UI
const ui = new dat.GUI()

/******************
** TEXT ANALYSIS **
*******************/
// SourceText
const sourceText = "In a land far, far away, there lived a grumpy little troll named Thud. She lived on one of the moons of Saturn. The reason why she was so grumpy was because no one else lived on that moon so she was always lonely on this moon. One day, a space shuttle landed on that moon and out came a astronaut. This astronaut was shocked to see another living creature so far out into space. The troll was now happy and she and the astronaut lived on that moon happily."

// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = () =>
{
    // Strip periods and downcase sourceText
    parsedText =  sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === term){
            // convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
            // call drawCube function 100 times using converted height value
            for (let a = 0; a< 100; a++)
            {
                drawCube(height, color)
            }
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText("troll", "green")
findSearchTermInTokenizedText("astronaut", "white")
findSearchTermInTokenizedText("happy", "black")
findSearchTermInTokenizedText("grumpy", "yellow")

/******************* 
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()