var mic, capture, canvas, slider, blur, exposure, blend, chroma;

function setup() {
  canvas = createCanvas(1000,1000,WEBGL);
  canvas.id('p5canvas');
  // background(51);

  mic = new p5.AudioIn();
  mic.start();
  mic.connect();

  video = createCapture(VIDEO);
  video.id('p5video');
  video.hide();

  // slider = createSlider(0, 1, 0.5, 0.01);
  // slider.id('blur-slider')

  var seriously = new Seriously();
  var videoSource = seriously.source('#p5video')
  var target = seriously.target('#p5canvas')

  blur = seriously.effect('blur');
  exposure = seriously.effect('exposure');
  blend = seriously.effect('blend');
  blend.mode = 'difference'
  chroma = seriously.effect('chroma');
  chroma.screen = [1 / 255, 244 / 255, 180 / 255, 1]
  
  blur.source = videoSource;
  exposure.source = blur;
  blend.top = exposure;
  blend.bottom = videoSource;
  chroma.source = blend;
  target.source = chroma;
  seriously.go();
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  exposure.exposure = vol*vol+vol
  blur.amount = vol
  blend.opacity = (((vol + vol * vol) + vol * 2) * 2) + vol*vol
  chroma.weight = (((vol + vol * vol) + vol * 4) * 8) + vol*vol
  // fill(127);
  // stroke(0);
  // Draw an ellipse with height based on volume
  // var h = map(vol, 0, 1, height, 0);
  // image(video, width/4, h - 500, 500, 500);
}

// setup();
// draw();





