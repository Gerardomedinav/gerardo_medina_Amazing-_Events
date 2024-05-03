
var audio2 = new Audio('./asset/audio/guitarra_acustica.mp3');


function playAudio2() {
  audio2.play();
}

function pauseAudio2() {
  audio2.pause();
}
window.addEventListener('load', function() {
  playAudio2();
});
 window.addEventListener('unload', function() {
      pauseAudio2();
});
   
    
