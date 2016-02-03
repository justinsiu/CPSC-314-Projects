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
var non_uniform_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,2,1, 0,0,0,1);
noseGeometry.applyMatrix(non_uniform_scale);

var tailGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,8,4, 0,0,0,1);
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

// MATRICES
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);
var torsoFinalMatrix = torsoMatrix;


// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the TorsoMatrix values, what changes in the render? Why?

var originMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);

var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1, 0,0,1,4, 0,0,0,1);
var headFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-0.5, 0,0,1,3, 0,0,0,1);
var noseFinalMatrix = new THREE.Matrix4().multiplyMatrices(headFinalMatrix,noseMatrix);

var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-2, 0,0,1,-12, 0,0,0,1);
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

      var headFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,headMatrix);
      head.setMatrix(headFinalMatrix);
      var noseFinalMatrix = new THREE.Matrix4().multiplyMatrices(headFinalMatrix,noseMatrix);
      nose.setMatrix(noseFinalMatrix);

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tailMatrix);
      tail.setMatrix(tailRotMatrix);

      var legFLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFLMatrix);
      legFL.setMatrix(legFLRotMatrix);
      var pawFLRotMatrix = new THREE.Matrix4().multiplyMatrices(legFLRotMatrix,pawFLMatrix);
      pawFL.setMatrix(pawFLRotMatrix);

      var legFRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFRMatrix);
      legFR.setMatrix(legFRRotMatrix);
      var pawFRRotMatrix = new THREE.Matrix4().multiplyMatrices(legFRRotMatrix,pawFRMatrix);
      pawFR.setMatrix(pawFRRotMatrix);

      var legRLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRLMatrix);
      legRL.setMatrix(legRLRotMatrix);
      var pawRLRotMatrix = new THREE.Matrix4().multiplyMatrices(legRLRotMatrix,pawRLMatrix);
      pawRL.setMatrix(pawRLRotMatrix);

      var legRRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRRMatrix);
      legRR.setMatrix(legRRRotMatrix);
      var pawRRRotMatrix = new THREE.Matrix4().multiplyMatrices(legRRRotMatrix,pawRRMatrix);
      pawRR.setMatrix(pawRRRotMatrix);

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

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tailMatrix);
      tail.setMatrix(tailRotMatrix);

      var legFLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFLMatrix);
      legFL.setMatrix(legFLRotMatrix);
      var pawFLRotMatrix = new THREE.Matrix4().multiplyMatrices(legFLRotMatrix,pawFLMatrix);
      pawFL.setMatrix(pawFLRotMatrix);

      var legFRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFRMatrix);
      legFR.setMatrix(legFRRotMatrix);
      var pawFRRotMatrix = new THREE.Matrix4().multiplyMatrices(legFRRotMatrix,pawFRMatrix);
      pawFR.setMatrix(pawFRRotMatrix);

      var legRLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRLMatrix);
      legRL.setMatrix(legRLRotMatrix);
      var pawRLRotMatrix = new THREE.Matrix4().multiplyMatrices(legRLRotMatrix,pawRLMatrix);
      pawRL.setMatrix(pawRLRotMatrix);

      var legRRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRRMatrix);
      legRR.setMatrix(legRRRotMatrix);
      var pawRRRotMatrix = new THREE.Matrix4().multiplyMatrices(legRRRotMatrix,pawRRMatrix);
      pawRR.setMatrix(pawRRRotMatrix);
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

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateY,setHeadMatrix);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateYNeg,setTailMatrix);
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

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateY,setHeadMatrix);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);

      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateYNeg,setTailMatrix);
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

      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(originMatrix,tailMatrix);
      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(rotateY,setTailMatrix);
      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix, setTailMatrix);
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

      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateY, setTailMatrix);
      tail.setMatrix(tailRotMatrix);

    break

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
    (key == "N")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "N")} //nose fan
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