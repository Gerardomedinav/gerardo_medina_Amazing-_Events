var audio = new Audio('./asset/audio/audio-concierto.mp3');

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}
     
    window.addEventListener('load', function() {
      playAudio();
    });
    
    window.addEventListener('unload', function() {
      pauseAudio();
    });
    
   
    
