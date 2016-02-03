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

// MATRICES
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);



// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
// Hint: Play around with the TorsoMatrix values, what changes in the render? Why?

var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,1, 0,0,1,4, 0,0,0,1);
var headFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-0.5, 0,0,1,3, 0,0,0,1);
var noseFinalMatrix = new THREE.Matrix4().multiplyMatrices(headFinalMatrix,noseMatrix);

var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-2, 0,0,1,-12, 0,0,0,1);
var tailFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);

var legFLMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3, 0,0,1,2, 0,0,0,1);
var legFLFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legFLMatrix);

var pawFLMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,-1, 0,0,1,0, 0,0,0,1);
var pawFLFinalMatrix = new THREE.Matrix4().multiplyMatrices(legFLFinalMatrix,pawFLMatrix);

var legFRMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3, 0,0,1,2, 0,0,0,1);
var legFRFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legFRMatrix);

var legRLMatrix = new THREE.Matrix4().set(1,0,0,2.5, 0,1,0,-3, 0,0,1,-2, 0,0,0,1);
var legRLFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legRLMatrix);

var legRRMatrix = new THREE.Matrix4().set(1,0,0,-2.5, 0,1,0,-3, 0,0,1,-2, 0,0,0,1);
var legRRFinalMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,legRRMatrix);



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

var legFR = new THREE.Mesh(legGeometry,normalMaterial);
legFR.setMatrix(legFRFinalMatrix);
scene.add(legFR);

var legRL = new THREE.Mesh(legGeometry,normalMaterial);
legRL.setMatrix(legRLFinalMatrix);
scene.add(legRL);

var legRR = new THREE.Mesh(legGeometry,normalMaterial);
legRR.setMatrix(legRRFinalMatrix);
scene.add(legRR);

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
      legFLRotMatrix = new THREE.Matrix4().multiplyMatrices(legFLRotMatrix,rotateZ);
      legFL.setMatrix(legFLRotMatrix);

      var legFRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFRMatrix);
      legFR.setMatrix(legFRRotMatrix);

      var legRLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRLMatrix);
      legRL.setMatrix(legRLRotMatrix);

      var legRRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRRMatrix);
      legRR.setMatrix(legRRRotMatrix);

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
      var legFRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legFRMatrix);
      legFR.setMatrix(legFRRotMatrix);

      var legRLRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRLMatrix);
      legRL.setMatrix(legRLRotMatrix);

      var legRRRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,legRRMatrix);
      legRR.setMatrix(legRRRotMatrix);
    break

    case(key == "H" && animate): // Head turn Right
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

      var setHeadMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateY,setHeadMatrix);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);
    break

    case(key == "G" && animate): // Head turn Left
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

      var setHeadMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);

      var headRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateY,setHeadMatrix);
      head.setMatrix(headRotMatrix);
      var noseRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
      nose.setMatrix(noseRotMatrix);
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

      var setTailMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);

      var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(rotateY, setTailMatrix);
      tail.setMatrix(tailRotMatrix);

    break

    case(key == "V" && animate): // Tail turn right
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
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}  
  else if(keyboard.eventMatches(event,"D")){
    (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "D")}
  else if(keyboard.eventMatches(event,"H")){
    (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "H")}
  else if(keyboard.eventMatches(event,"G")){
    (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "G")}
  else if(keyboard.eventMatches(event,"T")){
    (key == "T")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "T")}
  else if(keyboard.eventMatches(event,"V")){
    (key == "V")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/8,1), key = "V")}


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