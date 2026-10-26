function loadGoogleFont(names) {
   WebFont.load({
    google: {
      families: [names]
    }
  });
  
}


function fullScreenToggle() {
  var fs = fullscreen();
  fullscreen(!fs);
}




function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function noScrolling() {
  document.addEventListener('touchstart', function(event) {
    event.preventDefault();
  }, {
    passive: false
  });
}