var mic, capture, canvas, slider, moblur, blur, exposure, blend, chroma;

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
  blend.mode = 'darken'
  chroma = seriously.effect('chroma');
  chroma.screen = [66 / 255, 93 / 255, 0 / 255, 1]
  moblur = seriously.effect('directionblur');
  
  blur.source = videoSource;
  exposure.source = videoSource;
  blend.top = blur;
  blend.bottom = exposure;
  chroma.source = blend;
  moblur.source = chroma;
  target.source = moblur;
  seriously.go();
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  var h = map(vol, 0, 1, height, 0);
  exposure.exposure = h*vol
  blur.amount = h
  blend.opacity = vol+vol*2
  chroma.weight = vol/vol/h
  moblur.amount = h*vol;
  moblur.angle = (vol > .5) ? (vol*h/vol*h) : h
  // fill(127);
  // stroke(0);
  // Draw an ellipse with height based on volume
  // var h = map(vol, 0, 1, height, 0);
  // image(video, width/4, h - 500, 500, 500);
}

// setup();
// draw();





