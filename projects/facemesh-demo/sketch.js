let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let started = false;



function preload() {
  myModel = loadModel('rex.stl', true);
}

function setup() {
  noStroke();
  noScrolling();
  createCanvas(windowWidth, windowHeight, WEBGL);
  loadGoogleFont("Droid Sans");
  textFont("Droid Sans");
  frameRate(60);
}

// Called from the "Start camera" button in index.html, so the webcam
// prompt and the faceMesh model download only happen after a user click.
function startDemo() {
  if (started) return;
  started = true;
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(0);
  if (!started) return;
 // Draw the webcam video
  //push();
  //translate(-video.width/2, -video.height/2);
  //image(video, 0, 0, video.width, video.height);
  //pop();

  drawKeypoints();
  //draw3DObject();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  if (faces.length > 0) {
    let face = faces[0];
    // Tegn alle keypoints
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      // Omregn koordinaterne
      let x = keypoint.x - video.width/2;
      let y = keypoint.y - video.height/2;
      fill(0, 255, 0);
      noStroke();
      circle(x, y, 5);
    }
    // Tegn næsetippen som en rød ellipse
    let noseTip = face.keypoints[4];
    let x = noseTip.x - video.width/2;
    let y = noseTip.y - video.height/2;
    fill(255, 0, 0, 150);
    //ellipse(x, y, 30, 30);
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}


/*function draw3DObject() {
  if (faces.length > 0) {
    let face = faces[0];
    
    // Vælg relevante keypoints
    let noseTip = face.keypoints[4];
    let leftEye = face.keypoints[33];
    let rightEye = face.keypoints[263];
    
    // Beregn øjenmidten
    let eyeCenterX = (leftEye.x + rightEye.x) / 2;
    let eyeCenterY = (leftEye.y + rightEye.y) / 2;
    
    // Beregn et omtrentlig hovedcenter (med en opadgående offset)
    let headCenterX = (noseTip.x + eyeCenterX) / 2;
    let headCenterY = (noseTip.y + eyeCenterY) / 2 - 30; // Justér offset efter behov
    
    // Omregn til WEBGL-koordinatsystemet
    let x = headCenterX - video.width / 2;
    let y = headCenterY - video.height / 2;
    let z = 0;
    
    // Beregn yaw og roll
    let yawOffset = noseTip.x - eyeCenterX;
    let yawAngle = map(yawOffset, -30, 30, -PI/8, PI/8);
    
    let dx = rightEye.x - leftEye.x;
    let dy = rightEye.y - leftEye.y;
    let rollAngle = atan2(dy, dx);
    
    push();
      translate(x, y, z);
      
      // Hvis hjelmen er vendt forkert, prøv at rotere den 180° om z-aksen
      rotateZ(PI);
      // Eller eksperimenter med rotateX i stedet, fx:
      // rotateX(HALF_PI);
      
      // Anvend de øvrige rotationer, så hjelmen følger ansigtets bevægelser
      rotateY(yawAngle);
      rotateZ(rollAngle);
      
      scale(0.5);
      model(myModel);
    pop();
  }
}*/

function keyReleased() {
  if (key == "f") {
    fullScreenToggle();
  }
}

