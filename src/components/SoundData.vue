<template>
  <div class="soundData">
    <audio id="start_sound" autoplay preload="auto">
      <source src="../assets/sound/start.mp3" type="audio/mpeg" />
    </audio>
    <audio id="warn_sound" preload="auto">
      <source src="../assets/sound/warn.mp3" type="audio/mpeg" />
    </audio>
    <audio id="desktop_sound" preload="auto">
      <source src="../assets/sound/desktop.mp3" type="audio/mpeg" />
    </audio>
    <audio id="desktop_sound" preload="auto">
      <source src="../assets/sound/desktop.mp3" type="audio/mpeg" />
    </audio>
    <audio id="info_sound" autoplay preload="auto">
      <source src="../assets/sound/info.mp3" type="audio/mpeg" />
    </audio>
    <audio id="error_sound" preload="auto">
      <source src="../assets/sound/error.mp3" type="audio/mpeg" />
    </audio>
    <audio id="open_sound" preload="auto">
      <source src="../assets/sound/open.mp3" type="audio/mpeg" />
    </audio>
    <audio id="close_sound" preload="auto">
      <source src="../assets/sound/close.mp3" type="audio/mpeg" />
    </audio>
    <audio id="max_sound" preload="auto">
      <source src="../assets/sound/max.mp3" type="audio/mpeg" />
    </audio>
    <audio id="min_sound" preload="auto">
      <source src="../assets/sound/min.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
    name: 'SoundData',
    data(){
      return{
        type:'start'
      }
    },
    mounted(){
      var soundTag = document.getElementById(this.type+"_sound");
      if(4 == soundTag.readyState){
        soundTag.currentTime = 0,
        soundTag.play()
      }
    }
}
</script>

<style>

</style>