var mic;
var capture;

function audioSetup() {
  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  mic.connect();
}



function videoSetup() {
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function drawVideo() {
  
}

function setup() {
  var audCanvas = createCanvas(1000, 1000);
  audCanvas.parent('audio-container');
  audioSetup();
  videoSetup();
}

function draw() {
  drawVideo();


  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);
  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  background(255);
  image(capture, width/4, h - 500, 500, 500);
  filter('INVERT');
}

setup();
draw();





