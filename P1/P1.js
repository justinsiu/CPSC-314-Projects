// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this! 
var normalMaterial = new THREE.MeshNormalMaterial();

// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

// GEOMETRY
var torsoGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,8,0, 0,0,0,1);
torsoGeometry.applyMatrix(non_uniform_scale);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set     

var headGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,3,1.5, 0,0,0,1);
headGeometry.applyMatrix(non_uniform_scale);

var noseGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(1.5,0,0,0, 0,1,0,0, 0,0,1,0.5, 0,0,0,1);
noseGeometry.applyMatrix(non_uniform_scale);

var tailGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(0.5,0,0,0, 0,0.5,0,0, 0,0,8,-4, 0,0,0,1);
tailGeometry.applyMatrix(non_uniform_scale);

var legGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(1,0,0,0, 0,2,0,0, 0,0,1,0, 0,0,0,1);
legGeometry.applyMatrix(non_uniform_scale);

var pawGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(2,0,0,0, 0,0.5,0,-.25, 0,0,2,0.5, 0,0,0,1);
pawGeometry.applyMatrix(non_uniform_scale);

var clawGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(0.25,0,0,0, 0,0.25,0,0, 0,0,1,0.5, 0,0,0,1);
clawGeometry.applyMatrix(non_uniform_scale);

var tentLGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(0.125,0,0,0, 0,0.125,0,0, 0,0,1,0.5, 0,0,0,1);
tentLGeometry.applyMatrix(non_uniform_scale);

var tentSGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(0.125,0,0,0, 0,0.125,0,0, 0,0,0.5,0.25, 0,0,0,1);
tentSGeometry.applyMatrix(non_uniform_scale);

// MATRICES
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);
var torsoFinalMatrix = torsoMatrix;


// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the TorsoMatrix values, what changes in the render? Why?

var originMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);


var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0.5, 0,0,1,4, 0,0,0,1);
var headFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-0.5, 0,0,1,3, 0,0,0,1);
var noseFinalMatrix = new THREE.Matrix4().multiplyMatrices(headFinalMatrix,noseMatrix);


var tentSL1Matrix = new THREE.Matrix4().set(1,0,0,-0.125, 0,1,0,0.5, 0,0,1,1, 0,0,0,1);
var tentSL1FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSL1Matrix);
var tentSL2Matrix = new THREE.Matrix4().set(-1,0,0,-0.125, 0,-1,0,-0.5, 0,0,1,1, 0,0,0,1);
var tentSL2FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSL2Matrix);

var tentLL1Matrix = new THREE.Matrix4().set(1,0,0,-0.375, 0,1,0,0.5, 0,0,1,1, 0,0,0,1)
var tentLL1FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL1Matrix);
var tentLL2Matrix = new THREE.Matrix4().set(-1,0,0,-0.375, 0,-1,0,-0.5, 0,0,1,1, 0,0,0,1);
var tentLL2FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL2Matrix);
var tentLL3Matrix = new THREE.Matrix4().set(1,0,0,-0.625, 0,1,0,0.5, 0,0,1,1, 0,0,0,1)
var tentLL3FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL3Matrix);
var tentLL4Matrix = new THREE.Matrix4().set(-1,0,0,-0.625, 0,-1,0,-0.5, 0,0,1,1, 0,0,0,1);
var tentLL4FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL4Matrix);
var tentLL5Matrix = new THREE.Matrix4().set(0,-1,0,-0.75, 1,0,0,0.375, 0,0,1,1, 0,0,0,1);
var tentLL5FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL5Matrix);
var tentLL6Matrix = new THREE.Matrix4().set(0,-1,0,-0.75, 1,0,0,0.1875, 0,0,1,1, 0,0,0,1);
var tentLL6FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL6Matrix);
var tentLL7Matrix = new THREE.Matrix4().set(0,-1,0,-0.75, 1,0,0,0, 0,0,1,1, 0,0,0,1);
var tentLL7FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL7Matrix);
var tentLL8Matrix = new THREE.Matrix4().set(0,-1,0,-0.75, 1,0,0,-0.1875, 0,0,1,1, 0,0,0,1);
var tentLL8FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL8Matrix);
var tentLL9Matrix = new THREE.Matrix4().set(0,-1,0,-0.75, 1,0,0,-0.375, 0,0,1,1, 0,0,0,1);
var tentLL9FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL9Matrix);


var tentSR1Matrix = new THREE.Matrix4().set(1,0,0,0.125, 0,1,0,0.5, 0,0,1,1, 0,0,0,1);
var tentSR1FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSR1Matrix);
var tentSR2Matrix = new THREE.Matrix4().set(-1,0,0,0.125, 0,-1,0,-0.5, 0,0,1,1, 0,0,0,1);
var tentSR2FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSR2Matrix);

var tentLR1Matrix = new THREE.Matrix4().set(1,0,0,0.375, 0,1,0,0.5, 0,0,1,1, 0,0,0,1)
var tentLR1FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR1Matrix);
var tentLR2Matrix = new THREE.Matrix4().set(-1,0,0,0.375, 0,-1,0,-0.5, 0,0,1,1, 0,0,0,1);
var tentLR2FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR2Matrix);
var tentLR3Matrix = new THREE.Matrix4().set(1,0,0,0.625, 0,1,0,0.5, 0,0,1,1, 0,0,0,1)
var tentLR3FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR3Matrix);
var tentLR4Matrix = new THREE.Matrix4().set(-1,0,0,0.625, 0,-1,0,-0.5, 0,0,1,1, 0,0,0,1);
var tentLR4FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR4Matrix);
var tentLR5Matrix = new THREE.Matrix4().set(0,1,0,0.75, -1,0,0,0.375, 0,0,1,1, 0,0,0,1);
var tentLR5FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR5Matrix);
var tentLR6Matrix = new THREE.Matrix4().set(0,1,0,0.75, -1,0,0,0.1875, 0,0,1,1, 0,0,0,1);
var tentLR6FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR6Matrix);
var tentLR7Matrix = new THREE.Matrix4().set(0,1,0,0.75, -1,0,0,0, 0,0,1,1, 0,0,0,1);
var tentLR7FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR7Matrix);
var tentLR8Matrix = new THREE.Matrix4().set(0,1,0,0.75, -1,0,0,-0.1875, 0,0,1,1, 0,0,0,1);
var tentLR8FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR8Matrix);
var tentLR9Matrix = new THREE.Matrix4().set(0,1,0,0.75, -1,0,0,-0.375, 0,0,1,1, 0,0,0,1);
var tentLR9FinalMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR9Matrix);


var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-2, 0,0,1,-4, 0,0,0,1);
var tailFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);


var legFLMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
var legFLFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legFLMatrix);
var pawFLMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-1, 0,0,1,0, 0,0,0,1);
var pawFLFinalMatrix = new THREE.Matrix4().multiplyMatrices(legFLFinalMatrix,pawFLMatrix);
var clawFL1Matrix = new THREE.Matrix4().set(1,0,0,-1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawFL1FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFLFinalMatrix, clawFL1Matrix);
var clawFL2Matrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawFL2FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFLFinalMatrix, clawFL2Matrix);
var clawFL3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawFL3FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFLFinalMatrix, clawFL3Matrix);
var clawFL4Matrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawFL4FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFLFinalMatrix, clawFL4Matrix);
var clawFL5Matrix = new THREE.Matrix4().set(1,0,0,1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawFL5FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFLFinalMatrix, clawFL5Matrix);


var legFRMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
var legFRFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legFRMatrix);
var pawFRMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-1, 0,0,1,0, 0,0,0,1);
var pawFRFinalMatrix = new THREE.Matrix4().multiplyMatrices(legFRFinalMatrix,pawFRMatrix);
var clawFR1Matrix = new THREE.Matrix4().set(1,0,0,-1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawFR1FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFRFinalMatrix, clawFR1Matrix);
var clawFR2Matrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawFR2FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFRFinalMatrix, clawFR2Matrix);
var clawFR3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawFR3FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFRFinalMatrix, clawFR3Matrix);
var clawFR4Matrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawFR4FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFRFinalMatrix, clawFR4Matrix);
var clawFR5Matrix = new THREE.Matrix4().set(1,0,0,1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawFR5FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawFRFinalMatrix, clawFR5Matrix);


var legRLMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
var legRLFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legRLMatrix);
var pawRLMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-1, 0,0,1,0, 0,0,0,1);
var pawRLFinalMatrix = new THREE.Matrix4().multiplyMatrices(legRLFinalMatrix,pawRLMatrix);
var clawRL1Matrix = new THREE.Matrix4().set(1,0,0,-1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawRL1FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRLFinalMatrix, clawRL1Matrix);
var clawRL2Matrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawRL2FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRLFinalMatrix, clawRL2Matrix);
var clawRL3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawRL3FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRLFinalMatrix, clawRL3Matrix);
var clawRL4Matrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawRL4FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRLFinalMatrix, clawRL4Matrix);
var clawRL5Matrix = new THREE.Matrix4().set(1,0,0,1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawRL5FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRLFinalMatrix, clawRL5Matrix);


var legRRMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
var legRRFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legRRMatrix);
var pawRRMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-1, 0,0,1,0, 0,0,0,1);
var pawRRFinalMatrix = new THREE.Matrix4().multiplyMatrices(legRRFinalMatrix,pawRRMatrix);
var clawRR1Matrix = new THREE.Matrix4().set(1,0,0,-1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawRR1FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRRFinalMatrix, clawRR1Matrix);
var clawRR2Matrix = new THREE.Matrix4().set(1,0,0,-0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawRR2FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRRFinalMatrix, clawRR2Matrix);
var clawRR3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawRR3FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRRFinalMatrix, clawRR3Matrix);
var clawRR4Matrix = new THREE.Matrix4().set(1,0,0,0.5, 0,1,0,-.25, 0,0,1,1.5, 0,0,0,1);
var clawRR4FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRRFinalMatrix, clawRR4Matrix);
var clawRR5Matrix = new THREE.Matrix4().set(1,0,0,1.125, 0,1,0,-.25, 0,0,1,1, 0,0,0,1);
var clawRR5FinalMatrix = new THREE.Matrix4().multiplyMatrices(pawRRFinalMatrix, clawRR5Matrix);


// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
torso.setMatrix(torsoMatrix);
scene.add(torso);

// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.

var head = new THREE.Mesh(headGeometry,normalMaterial);
head.setMatrix(headFinalMatrix);
scene.add(head);

var nose = new THREE.Mesh(noseGeometry,normalMaterial);
nose.setMatrix(noseFinalMatrix);
scene.add(nose);

var tentSL1 = new THREE.Mesh(tentSGeometry,normalMaterial);
tentSL1.setMatrix(tentSL1FinalMatrix);
scene.add(tentSL1);
var tentSL2 = new THREE.Mesh(tentSGeometry,normalMaterial);
tentSL2.setMatrix(tentSL2FinalMatrix);
scene.add(tentSL2);

var tentLL1 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL1.setMatrix(tentLL1FinalMatrix);
scene.add(tentLL1);
var tentLL2 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL2.setMatrix(tentLL2FinalMatrix);
scene.add(tentLL2);
var tentLL3 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL3.setMatrix(tentLL3FinalMatrix);
scene.add(tentLL3);
var tentLL4 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL4.setMatrix(tentLL4FinalMatrix);
scene.add(tentLL4);
var tentLL5 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL5.setMatrix(tentLL5FinalMatrix);
scene.add(tentLL5);
var tentLL6 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL6.setMatrix(tentLL6FinalMatrix);
scene.add(tentLL6);
var tentLL7 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL7.setMatrix(tentLL7FinalMatrix);
scene.add(tentLL7);
var tentLL8 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL8.setMatrix(tentLL8FinalMatrix);
scene.add(tentLL8);
var tentLL9 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLL9.setMatrix(tentLL9FinalMatrix);
scene.add(tentLL9);

var tentSR1 = new THREE.Mesh(tentSGeometry,normalMaterial);
tentSR1.setMatrix(tentSR1FinalMatrix);
scene.add(tentSR1);
var tentSR2 = new THREE.Mesh(tentSGeometry,normalMaterial);
tentSR2.setMatrix(tentSR2FinalMatrix);
scene.add(tentSR2);

var tentLR1 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR1.setMatrix(tentLR1FinalMatrix);
scene.add(tentLR1);
var tentLR2 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR2.setMatrix(tentLR2FinalMatrix);
scene.add(tentLR2);
var tentLR3 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR3.setMatrix(tentLR3FinalMatrix);
scene.add(tentLR3);
var tentLR4 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR4.setMatrix(tentLR4FinalMatrix);
scene.add(tentLR4);
var tentLR5 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR5.setMatrix(tentLR5FinalMatrix);
scene.add(tentLR5);
var tentLR6 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR6.setMatrix(tentLR6FinalMatrix);
scene.add(tentLR6);
var tentLR7 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR7.setMatrix(tentLR7FinalMatrix);
scene.add(tentLR7);
var tentLR8 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR8.setMatrix(tentLR8FinalMatrix);
scene.add(tentLR8);
var tentLR9 = new THREE.Mesh(tentLGeometry,normalMaterial);
tentLR9.setMatrix(tentLR9FinalMatrix);
scene.add(tentLR9);

var tail = new THREE.Mesh(tailGeometry,normalMaterial);
tail.setMatrix(tailFinalMatrix);
scene.add(tail);

var legFL = new THREE.Mesh(legGeometry,normalMaterial);
legFL.setMatrix(legFLFinalMatrix);
scene.add(legFL);
var pawFL = new THREE.Mesh(pawGeometry,normalMaterial);
pawFL.setMatrix(pawFLFinalMatrix);
scene.add(pawFL);
var clawFL1 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFL1.setMatrix(clawFL1FinalMatrix);
scene.add(clawFL1);
var clawFL2 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFL2.setMatrix(clawFL2FinalMatrix);
scene.add(clawFL2);
var clawFL3 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFL3.setMatrix(clawFL3FinalMatrix);
scene.add(clawFL3);
var clawFL4 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFL4.setMatrix(clawFL4FinalMatrix);
scene.add(clawFL4);
var clawFL5 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFL5.setMatrix(clawFL5FinalMatrix);
scene.add(clawFL5);

var legFR = new THREE.Mesh(legGeometry,normalMaterial);
legFR.setMatrix(legFRFinalMatrix);
scene.add(legFR);
var pawFR = new THREE.Mesh(pawGeometry,normalMaterial);
pawFR.setMatrix(pawFRFinalMatrix);
scene.add(pawFR);
var clawFR1 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFR1.setMatrix(clawFR1FinalMatrix);
scene.add(clawFR1);
var clawFR2 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFR2.setMatrix(clawFR2FinalMatrix);
scene.add(clawFR2);
var clawFR3 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFR3.setMatrix(clawFR3FinalMatrix);
scene.add(clawFR3);
var clawFR4 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFR4.setMatrix(clawFR4FinalMatrix);
scene.add(clawFR4);
var clawFR5 = new THREE.Mesh(clawGeometry,normalMaterial);
clawFR5.setMatrix(clawFR5FinalMatrix);
scene.add(clawFR5);

var legRL = new THREE.Mesh(legGeometry,normalMaterial);
legRL.setMatrix(legRLFinalMatrix);
scene.add(legRL);
var pawRL = new THREE.Mesh(pawGeometry,normalMaterial);
pawRL.setMatrix(pawRLFinalMatrix);
scene.add(pawRL);
var clawRL1 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRL1.setMatrix(clawRL1FinalMatrix);
scene.add(clawRL1);
var clawRL2 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRL2.setMatrix(clawRL2FinalMatrix);
scene.add(clawRL2);
var clawRL3 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRL3.setMatrix(clawRL3FinalMatrix);
scene.add(clawRL3);
var clawRL4 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRL4.setMatrix(clawRL4FinalMatrix);
scene.add(clawRL4);
var clawRL5 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRL5.setMatrix(clawRL5FinalMatrix);
scene.add(clawRL5);

var legRR = new THREE.Mesh(legGeometry,normalMaterial);
legRR.setMatrix(legRRFinalMatrix);
scene.add(legRR);
var pawRR = new THREE.Mesh(pawGeometry,normalMaterial);
pawRR.setMatrix(pawRRFinalMatrix);
scene.add(pawRR);
var clawRR1 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRR1.setMatrix(clawRR1FinalMatrix);
scene.add(clawRR1);
var clawRR2 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRR2.setMatrix(clawRR2FinalMatrix);
scene.add(clawRR2);
var clawRR3 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRR3.setMatrix(clawRR3FinalMatrix);
scene.add(clawRR3);
var clawRR4 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRR4.setMatrix(clawRR4FinalMatrix);
scene.add(clawRR4);
var clawRR5 = new THREE.Mesh(clawGeometry,normalMaterial);
clawRR5.setMatrix(clawRR5FinalMatrix);
scene.add(clawRR5);

// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?
var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?
var jumpcut = false; // jumpcut 

// function init_animation()
// Initializes parameters and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

function updateBody() {
  switch(true)
  {
    case(key == "U" && animate):
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
                                            0, Math.cos(-p),-Math.sin(-p), 0, 
                                            0, Math.sin(-p), Math.cos(-p), 0,
                                            0,        0,         0,        1);

      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
      torso.setMatrix(torsoRotMatrix); 


      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,headMatrix);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      var tentSL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL1Matrix);
      tentSL1.setMatrix(tentSL1RotMatrix);
      var tentSL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL2Matrix);
      tentSL2.setMatrix(tentSL2RotMatrix);

      var tentLL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL1Matrix);
      tentLL1.setMatrix(tentLL1RotMatrix);
      var tentLL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL2Matrix);
      tentLL2.setMatrix(tentLL2RotMatrix);
      var tentLL3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL3Matrix);
      tentLL3.setMatrix(tentLL3RotMatrix);
      var tentLL4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL4Matrix);
      tentLL4.setMatrix(tentLL4RotMatrix);
      var tentLL5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL5Matrix);
      tentLL5.setMatrix(tentLL5RotMatrix);
      var tentLL6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL6Matrix);
      tentLL6.setMatrix(tentLL6RotMatrix);
      var tentLL7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL7Matrix);
      tentLL7.setMatrix(tentLL7RotMatrix);
      var tentLL8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL8Matrix);
      tentLL8.setMatrix(tentLL8RotMatrix);
      var tentLL9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL9Matrix);
      tentLL9.setMatrix(tentLL9RotMatrix);

      var tentSR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR1Matrix);
      tentSR1.setMatrix(tentSR1RotMatrix);
      var tentSR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR2Matrix);
      tentSR2.setMatrix(tentSR2RotMatrix);

      var tentLR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR1Matrix);
      tentLR1.setMatrix(tentLR1RotMatrix);
      var tentLR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR2Matrix);
      tentLR2.setMatrix(tentLR2RotMatrix);
      var tentLR3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR3Matrix);
      tentLR3.setMatrix(tentLR3RotMatrix);
      var tentLR4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR4Matrix);
      tentLR4.setMatrix(tentLR4RotMatrix);
      var tentLR5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR5Matrix);
      tentLR5.setMatrix(tentLR5RotMatrix);
      var tentLR6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR6Matrix);
      tentLR6.setMatrix(tentLR6RotMatrix);
      var tentLR7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR7Matrix);
      tentLR7.setMatrix(tentLR7RotMatrix);
      var tentLR8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR8Matrix);
      tentLR8.setMatrix(tentLR8RotMatrix);
      var tentLR9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR9Matrix);
      tentLR9.setMatrix(tentLR9RotMatrix);


      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tailMatrix);
      tail.setMatrix(tailRotMatrix);


      var legFLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFLMatrix);
      legFL.setMatrix(legFLRotMatrix);
      var pawFLRotMatrix = new THREE.Matrix4().multiplyMatrices(legFLRotMatrix,pawFLMatrix);
      pawFL.setMatrix(pawFLRotMatrix);
      var clawFL1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL1Matrix);
      clawFL1.setMatrix(clawFL1RotMatrix);
      var clawFL2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL2Matrix);
      clawFL2.setMatrix(clawFL2RotMatrix);
      var clawFL3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL3Matrix);
      clawFL3.setMatrix(clawFL3RotMatrix);
      var clawFL4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL4Matrix);
      clawFL4.setMatrix(clawFL4RotMatrix);
      var clawFL5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL5Matrix);
      clawFL5.setMatrix(clawFL5RotMatrix);


      var legFRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFRMatrix);
      legFR.setMatrix(legFRRotMatrix);
      var pawFRRotMatrix = new THREE.Matrix4().multiplyMatrices(legFRRotMatrix,pawFRMatrix);
      pawFR.setMatrix(pawFRRotMatrix);
      var clawFR1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR1Matrix);
      clawFR1.setMatrix(clawFR1RotMatrix);
      var clawFR2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR2Matrix);
      clawFR2.setMatrix(clawFR2RotMatrix);
      var clawFR3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR3Matrix);
      clawFR3.setMatrix(clawFR3RotMatrix);
      var clawFR4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR4Matrix);
      clawFR4.setMatrix(clawFR4RotMatrix);
      var clawFR5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR5Matrix);
      clawFR5.setMatrix(clawFR5RotMatrix);


      var legRLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRLMatrix);
      legRL.setMatrix(legRLRotMatrix);
      var pawRLRotMatrix = new THREE.Matrix4().multiplyMatrices(legRLRotMatrix,pawRLMatrix);
      pawRL.setMatrix(pawRLRotMatrix);
      var clawRL1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL1Matrix);
      clawRL1.setMatrix(clawRL1RotMatrix);
      var clawRL2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL2Matrix);
      clawRL2.setMatrix(clawRL2RotMatrix);
      var clawRL3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL3Matrix);
      clawRL3.setMatrix(clawRL3RotMatrix);
      var clawRL4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL4Matrix);
      clawRL4.setMatrix(clawRL4RotMatrix);
      var clawRL5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL5Matrix);
      clawRL5.setMatrix(clawRL5RotMatrix);


      var legRRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRRMatrix);
      legRR.setMatrix(legRRRotMatrix);
      var pawRRRotMatrix = new THREE.Matrix4().multiplyMatrices(legRRRotMatrix,pawRRMatrix);
      pawRR.setMatrix(pawRRRotMatrix);
      var clawRR1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR1Matrix);
      clawRR1.setMatrix(clawRR1RotMatrix);
      var clawRR2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR2Matrix);
      clawRR2.setMatrix(clawRR2RotMatrix);
      var clawRR3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR3Matrix);
      clawRR3.setMatrix(clawRR3RotMatrix);
      var clawRR4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR4Matrix);
      clawRR4.setMatrix(clawRR4RotMatrix);
      var clawRR5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR5Matrix);
      clawRR5.setMatrix(clawRR5RotMatrix);

    break

    // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
    // Note: Remember spacebar sets jumpcut/animate!
    case(key == "D" && animate): // Down motion
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,      0,            0,        0, 
                                            0,  Math.cos(-p), Math.sin(-p), 0, 
                                            0, -Math.sin(-p), Math.cos(-p), 0,
                                            0,      0,            0,        1);

      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
      torso.setMatrix(torsoRotMatrix); 

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,headMatrix);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      var tentSL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL1Matrix);
      tentSL1.setMatrix(tentSL1RotMatrix);
      var tentSL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL2Matrix);
      tentSL2.setMatrix(tentSL2RotMatrix);

      var tentLL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL1Matrix);
      tentLL1.setMatrix(tentLL1RotMatrix);
      var tentLL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL2Matrix);
      tentLL2.setMatrix(tentLL2RotMatrix);
      var tentLL3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL3Matrix);
      tentLL3.setMatrix(tentLL3RotMatrix);
      var tentLL4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL4Matrix);
      tentLL4.setMatrix(tentLL4RotMatrix);
      var tentLL5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL5Matrix);
      tentLL5.setMatrix(tentLL5RotMatrix);
      var tentLL6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL6Matrix);
      tentLL6.setMatrix(tentLL6RotMatrix);
      var tentLL7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL7Matrix);
      tentLL7.setMatrix(tentLL7RotMatrix);
      var tentLL8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL8Matrix);
      tentLL8.setMatrix(tentLL8RotMatrix);
      var tentLL9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL9Matrix);
      tentLL9.setMatrix(tentLL9RotMatrix);

      var tentSR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR1Matrix);
      tentSR1.setMatrix(tentSR1RotMatrix);
      var tentSR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR2Matrix);
      tentSR2.setMatrix(tentSR2RotMatrix);

      var tentLR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR1Matrix);
      tentLR1.setMatrix(tentLR1RotMatrix);
      var tentLR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR2Matrix);
      tentLR2.setMatrix(tentLR2RotMatrix);
      var tentLR3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR3Matrix);
      tentLR3.setMatrix(tentLR3RotMatrix);
      var tentLR4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR4Matrix);
      tentLR4.setMatrix(tentLR4RotMatrix);
      var tentLR5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR5Matrix);
      tentLR5.setMatrix(tentLR5RotMatrix);
      var tentLR6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR6Matrix);
      tentLR6.setMatrix(tentLR6RotMatrix);
      var tentLR7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR7Matrix);
      tentLR7.setMatrix(tentLR7RotMatrix);
      var tentLR8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR8Matrix);
      tentLR8.setMatrix(tentLR8RotMatrix);
      var tentLR9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR9Matrix);
      tentLR9.setMatrix(tentLR9RotMatrix);

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tailMatrix);
      tail.setMatrix(tailRotMatrix);

      var legFLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFLMatrix);
      legFL.setMatrix(legFLRotMatrix);
      var pawFLRotMatrix = new THREE.Matrix4().multiplyMatrices(legFLRotMatrix,pawFLMatrix);
      pawFL.setMatrix(pawFLRotMatrix);
      var clawFL1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL1Matrix);
      clawFL1.setMatrix(clawFL1RotMatrix);
      var clawFL2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL2Matrix);
      clawFL2.setMatrix(clawFL2RotMatrix);
      var clawFL3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL3Matrix);
      clawFL3.setMatrix(clawFL3RotMatrix);
      var clawFL4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL4Matrix);
      clawFL4.setMatrix(clawFL4RotMatrix);
      var clawFL5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL5Matrix);
      clawFL5.setMatrix(clawFL5RotMatrix);

      var legFRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFRMatrix);
      legFR.setMatrix(legFRRotMatrix);
      var pawFRRotMatrix = new THREE.Matrix4().multiplyMatrices(legFRRotMatrix,pawFRMatrix);
      pawFR.setMatrix(pawFRRotMatrix);
      var clawFR1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR1Matrix);
      clawFR1.setMatrix(clawFR1RotMatrix);
      var clawFR2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR2Matrix);
      clawFR2.setMatrix(clawFR2RotMatrix);
      var clawFR3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR3Matrix);
      clawFR3.setMatrix(clawFR3RotMatrix);
      var clawFR4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR4Matrix);
      clawFR4.setMatrix(clawFR4RotMatrix);
      var clawFR5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR5Matrix);
      clawFR5.setMatrix(clawFR5RotMatrix);

      var legRLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRLMatrix);
      legRL.setMatrix(legRLRotMatrix);
      var pawRLRotMatrix = new THREE.Matrix4().multiplyMatrices(legRLRotMatrix,pawRLMatrix);
      pawRL.setMatrix(pawRLRotMatrix);
      var clawRL1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL1Matrix);
      clawRL1.setMatrix(clawRL1RotMatrix);
      var clawRL2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL2Matrix);
      clawRL2.setMatrix(clawRL2RotMatrix);
      var clawRL3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL3Matrix);
      clawRL3.setMatrix(clawRL3RotMatrix);
      var clawRL4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL4Matrix);
      clawRL4.setMatrix(clawRL4RotMatrix);
      var clawRL5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRLRotMatrix,clawRL5Matrix);
      clawRL5.setMatrix(clawRL5RotMatrix);

      var legRRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRRMatrix);
      legRR.setMatrix(legRRRotMatrix);
      var pawRRRotMatrix = new THREE.Matrix4().multiplyMatrices(legRRRotMatrix,pawRRMatrix);
      pawRR.setMatrix(pawRRRotMatrix);
      var clawRR1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR1Matrix);
      clawRR1.setMatrix(clawRR1RotMatrix);
      var clawRR2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR2Matrix);
      clawRR2.setMatrix(clawRR2RotMatrix);
      var clawRR3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR3Matrix);
      clawRR3.setMatrix(clawRR3RotMatrix);
      var clawRR4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR4Matrix);
      clawRR4.setMatrix(clawRR4RotMatrix);
      var clawRR5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawRRRotMatrix,clawRR5Matrix);
      clawRR5.setMatrix(clawRR5RotMatrix);
    break

    case(key == "H" && animate): // Head turn Right
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateY = new THREE.Matrix4().set( Math.cos(-p), 0,  Math.sin(-p), 0, 
                                                 0,        1,      0,        0, 
                                            -Math.sin(-p), 0,  Math.cos(-p), 0,
                                                 0,        0,      0,        1);

      var rotateYNeg = new THREE.Matrix4().set( Math.cos(-p), 0, -Math.sin(-p), 0, 
                                                    0,        1,      0,        0, 
                                                Math.sin(-p), 0,  Math.cos(-p), 0,
                                                    0,        0,      0,        1);

      var setHeadMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(setHeadMatrix,rotateY);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      var tentSL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL1Matrix);
      tentSL1.setMatrix(tentSL1RotMatrix);
      var tentSL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL2Matrix);
      tentSL2.setMatrix(tentSL2RotMatrix);

      var tentLL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL1Matrix);
      tentLL1.setMatrix(tentLL1RotMatrix);
      var tentLL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL2Matrix);
      tentLL2.setMatrix(tentLL2RotMatrix);
      var tentLL3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL3Matrix);
      tentLL3.setMatrix(tentLL3RotMatrix);
      var tentLL4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL4Matrix);
      tentLL4.setMatrix(tentLL4RotMatrix);
      var tentLL5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL5Matrix);
      tentLL5.setMatrix(tentLL5RotMatrix);
      var tentLL6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL6Matrix);
      tentLL6.setMatrix(tentLL6RotMatrix);
      var tentLL7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL7Matrix);
      tentLL7.setMatrix(tentLL7RotMatrix);
      var tentLL8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL8Matrix);
      tentLL8.setMatrix(tentLL8RotMatrix);
      var tentLL9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL9Matrix);
      tentLL9.setMatrix(tentLL9RotMatrix);

      var tentSR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR1Matrix);
      tentSR1.setMatrix(tentSR1RotMatrix);
      var tentSR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR2Matrix);
      tentSR2.setMatrix(tentSR2RotMatrix);

      var tentLR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR1Matrix);
      tentLR1.setMatrix(tentLR1RotMatrix);
      var tentLR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR2Matrix);
      tentLR2.setMatrix(tentLR2RotMatrix);
      var tentLR3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR3Matrix);
      tentLR3.setMatrix(tentLR3RotMatrix);
      var tentLR4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR4Matrix);
      tentLR4.setMatrix(tentLR4RotMatrix);
      var tentLR5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR5Matrix);
      tentLR5.setMatrix(tentLR5RotMatrix);
      var tentLR6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR6Matrix);
      tentLR6.setMatrix(tentLR6RotMatrix);
      var tentLR7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR7Matrix);
      tentLR7.setMatrix(tentLR7RotMatrix);
      var tentLR8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR8Matrix);
      tentLR8.setMatrix(tentLR8RotMatrix);
      var tentLR9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR9Matrix);
      tentLR9.setMatrix(tentLR9RotMatrix);


      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(setTailMatrix,rotateYNeg);
      tail.setMatrix(tailRotMatrix);
    break

    case(key == "G" && animate): // Head turn Left
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateY = new THREE.Matrix4().set( Math.cos(-p), 0, -Math.sin(-p), 0, 
                                                 0,        1,      0,        0, 
                                             Math.sin(-p), 0,  Math.cos(-p), 0,
                                                 0,        0,      0,        1);

      var rotateYNeg = new THREE.Matrix4().set( Math.cos(-p), 0,  Math.sin(-p), 0, 
                                                 0,        1,      0,        0, 
                                              -Math.sin(-p), 0,  Math.cos(-p), 0,
                                                 0,        0,      0,        1);

      var setHeadMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(setHeadMatrix,rotateY);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      var tentSL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL1Matrix);
      tentSL1.setMatrix(tentSL1RotMatrix);
      var tentSL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSL2Matrix);
      tentSL2.setMatrix(tentSL2RotMatrix);

      var tentLL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL1Matrix);
      tentLL1.setMatrix(tentLL1RotMatrix);
      var tentLL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL2Matrix);
      tentLL2.setMatrix(tentLL2RotMatrix);
      var tentLL3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL3Matrix);
      tentLL3.setMatrix(tentLL3RotMatrix);
      var tentLL4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL4Matrix);
      tentLL4.setMatrix(tentLL4RotMatrix);
      var tentLL5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL5Matrix);
      tentLL5.setMatrix(tentLL5RotMatrix);
      var tentLL6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL6Matrix);
      tentLL6.setMatrix(tentLL6RotMatrix);
      var tentLL7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL7Matrix);
      tentLL7.setMatrix(tentLL7RotMatrix);
      var tentLL8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL8Matrix);
      tentLL8.setMatrix(tentLL8RotMatrix);
      var tentLL9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLL9Matrix);
      tentLL9.setMatrix(tentLL9RotMatrix);

      var tentSR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR1Matrix);
      tentSR1.setMatrix(tentSR1RotMatrix);
      var tentSR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentSR2Matrix);
      tentSR2.setMatrix(tentSR2RotMatrix);

      var tentLR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR1Matrix);
      tentLR1.setMatrix(tentLR1RotMatrix);
      var tentLR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR2Matrix);
      tentLR2.setMatrix(tentLR2RotMatrix);
      var tentLR3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR3Matrix);
      tentLR3.setMatrix(tentLR3RotMatrix);
      var tentLR4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR4Matrix);
      tentLR4.setMatrix(tentLR4RotMatrix);
      var tentLR5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR5Matrix);
      tentLR5.setMatrix(tentLR5RotMatrix);
      var tentLR6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR6Matrix);
      tentLR6.setMatrix(tentLR6RotMatrix);
      var tentLR7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR7Matrix);
      tentLR7.setMatrix(tentLR7RotMatrix);
      var tentLR8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR8Matrix);
      tentLR8.setMatrix(tentLR8RotMatrix);
      var tentLR9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseRotMatrix,tentLR9Matrix);
      tentLR9.setMatrix(tentLR9RotMatrix);

      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(setTailMatrix,rotateYNeg);
      tail.setMatrix(tailRotMatrix);
    break

    case(key == "T" && animate): // Tail turn right
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateY = new THREE.Matrix4().set(Math.cos(-p), 0, -Math.sin(-p), 0, 
                                                0,        1,      0,        0, 
                                            Math.sin(-p), 0,  Math.cos(-p), 0,
                                                0,        0,      0,        1);

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
      tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailRotMatrix,rotateY);
      tail.setMatrix(tailRotMatrix);

    break

    case(key == "V" && animate): // Tail turn left
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateY = new THREE.Matrix4().set( Math.cos(-p), 0, Math.sin(-p), 0, 
                                                 0,        1,     0,        0, 
                                            -Math.sin(-p), 0, Math.cos(-p), 0,
                                                 0,        0,     0,        1);

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
      tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailRotMatrix,rotateY);
      tail.setMatrix(tailRotMatrix);

    break

    case(key == "N" && animate): // Nose Fan
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateY = new THREE.Matrix4().set(1,     0,             0,        0, 
                                            0, Math.cos(-p), -Math.sin(-p), 0, 
                                            0, Math.sin(-p),  Math.cos(-p), 0,
                                            0,     0,             0,        1);

      var tentSL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSL1Matrix);
      tentSL1RotMatrix = new THREE.Matrix4().multiplyMatrices(tentSL1RotMatrix,rotateY);
      tentSL1.setMatrix(tentSL1RotMatrix);
      var tentSL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSL2Matrix);
      tentSL2RotMatrix = new THREE.Matrix4().multiplyMatrices(tentSL2RotMatrix,rotateY);
      tentSL2.setMatrix(tentSL2RotMatrix);

      var tentLL1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL1Matrix);
      tentLL1RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL1RotMatrix,rotateY);
      tentLL1.setMatrix(tentLL1RotMatrix);
      var tentLL2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL2Matrix);
      tentLL2RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL2RotMatrix,rotateY);
      tentLL2.setMatrix(tentLL2RotMatrix);
      var tentLL3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL3Matrix);
      tentLL3RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL3RotMatrix,rotateY);
      tentLL3.setMatrix(tentLL3RotMatrix);
      var tentLL4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL4Matrix);
      tentLL4RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL4RotMatrix,rotateY);
      tentLL4.setMatrix(tentLL4RotMatrix);
      var tentLL5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL5Matrix);
      tentLL5RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL5RotMatrix,rotateY);
      tentLL5.setMatrix(tentLL5RotMatrix);
      var tentLL6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL6Matrix);
      tentLL6RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL6RotMatrix,rotateY);
      tentLL6.setMatrix(tentLL6RotMatrix);
      var tentLL7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL7Matrix);
      tentLL7RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL7RotMatrix,rotateY);
      tentLL7.setMatrix(tentLL7RotMatrix);
      var tentLL8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL8Matrix);
      tentLL8RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL8RotMatrix,rotateY);
      tentLL8.setMatrix(tentLL8RotMatrix);
      var tentLL9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLL9Matrix);
      tentLL9RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLL9RotMatrix,rotateY);
      tentLL9.setMatrix(tentLL9RotMatrix);

      var tentSR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSR1Matrix);
      tentSR1RotMatrix = new THREE.Matrix4().multiplyMatrices(tentSR1RotMatrix,rotateY);
      tentSR1.setMatrix(tentSR1RotMatrix);
      var tentSR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentSR2Matrix);
      tentSR2RotMatrix = new THREE.Matrix4().multiplyMatrices(tentSR2RotMatrix,rotateY);
      tentSR2.setMatrix(tentSR2RotMatrix);

      var tentLR1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR1Matrix);
      tentLR1RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR1RotMatrix,rotateY);
      tentLR1.setMatrix(tentLR1RotMatrix);
      var tentLR2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR2Matrix);
      tentLR2RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR2RotMatrix,rotateY);
      tentLR2.setMatrix(tentLR2RotMatrix);
      var tentLR3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR3Matrix);
      tentLR3RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR3RotMatrix,rotateY);
      tentLR3.setMatrix(tentLR3RotMatrix);
      var tentLR4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR4Matrix);
      tentLR4RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR4RotMatrix,rotateY);
      tentLR4.setMatrix(tentLR4RotMatrix);
      var tentLR5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR5Matrix);
      tentLR5RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR5RotMatrix,rotateY);
      tentLR5.setMatrix(tentLR5RotMatrix);
      var tentLR6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR6Matrix);
      tentLR6RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR6RotMatrix,rotateY);
      tentLR6.setMatrix(tentLR6RotMatrix);
      var tentLR7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR7Matrix);
      tentLR7RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR7RotMatrix,rotateY);
      tentLR7.setMatrix(tentLR7RotMatrix);
      var tentLR8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR8Matrix);
      tentLR8RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR8RotMatrix,rotateY);
      tentLR8.setMatrix(tentLR8RotMatrix);
      var tentLR9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseFinalMatrix,tentLR9Matrix);
      tentLR9RotMatrix = new THREE.Matrix4().multiplyMatrices(tentLR9RotMatrix,rotateY);
      tentLR9.setMatrix(tentLR9RotMatrix);

    break

      case(key == "E" && animate): // Dig
      var time = clock.getElapsedTime(); // t seconds passed since the clock started.

      if (time > time_end){
        p = p1;
        animate = false;
        break;
      }

      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 

      var rotateZ = new THREE.Matrix4().set(1,      0,            0,        0, 
                                            0,  Math.cos(-p), Math.sin(-p), 0, 
                                            0, -Math.sin(-p), Math.cos(-p), 0,
                                            0,      0,            0,        1);

      var pawFLRotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLFinalMatrix,rotateZ);
      pawFL.setMatrix(pawFLRotMatrix);
      var clawFL1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL1Matrix);
      clawFL1RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFL1RotMatrix,rotateZ);
      clawFL1.setMatrix(clawFL1RotMatrix);
      var clawFL2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL2Matrix);
      clawFL2RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFL2RotMatrix,rotateZ);
      clawFL2.setMatrix(clawFL2RotMatrix);
      var clawFL3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL3Matrix);
      clawFL3RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFL3RotMatrix,rotateZ);
      clawFL3.setMatrix(clawFL3RotMatrix);
      var clawFL4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL4Matrix);
      clawFL4RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFL4RotMatrix,rotateZ);
      clawFL4.setMatrix(clawFL4RotMatrix);
      var clawFL5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFLRotMatrix,clawFL5Matrix);
      clawFL5RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFL5RotMatrix,rotateZ);
      clawFL5.setMatrix(clawFL5RotMatrix);

      var pawFRRotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRFinalMatrix,rotateZ);
      pawFR.setMatrix(pawFRRotMatrix);
      var clawFR1RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR1Matrix);
      clawFR1RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFR1RotMatrix,rotateZ);
      clawFR1.setMatrix(clawFR1RotMatrix);
      var clawFR2RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR2Matrix);
      clawFR2RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFR2RotMatrix,rotateZ);
      clawFR2.setMatrix(clawFR2RotMatrix);
      var clawFR3RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR3Matrix);
      clawFR3RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFR3RotMatrix,rotateZ);
      clawFR3.setMatrix(clawFR3RotMatrix);
      var clawFR4RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR4Matrix);
      clawFR4RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFR4RotMatrix,rotateZ);
      clawFR4.setMatrix(clawFR4RotMatrix);
      var clawFR5RotMatrix = new THREE.Matrix4().multiplyMatrices(pawFRRotMatrix,clawFR5Matrix);
      clawFR5RotMatrix = new THREE.Matrix4().multiplyMatrices(clawFR5RotMatrix,rotateZ);
      clawFR5.setMatrix(clawFR5RotMatrix);

      break;

    default:
      break;
  }
}

// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")} //body up
  else if(keyboard.eventMatches(event,"D")){
    (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "D")} //body down
  else if(keyboard.eventMatches(event,"H")){
    (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "H")} //head right
  else if(keyboard.eventMatches(event,"G")){
    (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "G")} //head left
  else if(keyboard.eventMatches(event,"T")){
    (key == "T")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "T")} //tail right
  else if(keyboard.eventMatches(event,"V")){
    (key == "V")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "V")} //tail left
  else if(keyboard.eventMatches(event,"N")){
    (key == "N")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/2,1), key = "N")} //nose fan
  else if(keyboard.eventMatches(event,"S")){
    (key == "S")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "S")} //swim
  else if(keyboard.eventMatches(event,"E")){
    (key == "E")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "E")} //dig




  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });

// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
  updateBody();

  requestAnimationFrame(update);
  renderer.render(scene,camera);
}

update();