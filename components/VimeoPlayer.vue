<template>
  <div class="vimeo-container" ref="video" ></div>
  <div v-if="!is_playing" class="controls">
    <img class="video-play-arrow" src="~/assets/img/play-arrow.svg" @click.stop="play_pause()"/>
    <div v-if="has_played" class="slider button">
      <span class="dur_str">00:00</span>
      <div class="slider-inner">
        <VueSlider 
          v-model="video_pos" :min="0" :max="video_max" :processStyle="{backgroundColor:'gray'}" 
          :tooltip-formatter="val => convertStoMs(val)" @change="(v, i) => change(v)" 
          :tooltipStyle="{
            color:'#FFF','background-color':'#000','border-top-color':'#000','font-size':'1em','padding':'0.5em'
          }"
          :railStyle="{
            backgroundColor : 'gray', 'margin-top': '0.2em', height: '1px'
          }"
          :dotStyle="{
            backgroundColor: '#9cb0c9', width: '1em', height: '1em', transform: 'translate(-35%, -35%)'
          }"
        />
      </div>
      <span class="dur_str">{{ video_max_str }}</span>
    </div>
  </div>
  <div v-else class="controls" @click.stop="play_pause()"></div>
</template>

<script setup>
import VueSlider from 'vue-3-slider-component'

const timeout = useTimeout()
const video = ref()
const { $script } = useScriptVimeoPlayer()
const is_playing = ref(false)
const video_pos = ref(0)
const video_max = ref(100)
const video_max_str = ref('')
const has_played = ref(false)

const props = defineProps({
  'video_id':{
    type: String,
  },
  'status_events':{
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['status-change', 'vid-ended'])
console.log('props', props)

const convertStoMs = (seconds) => {
      let minutes = Math.floor(seconds / 60);
      let extraSeconds = seconds % 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      extraSeconds = Math.floor(extraSeconds< 10 ? "0" + extraSeconds : extraSeconds);
      extraSeconds = extraSeconds.toString().padStart(2, '0')
      return minutes + ":" +extraSeconds;
}

const change = async (v) => {
    console.log(v)
    await player.setCurrentTime(v)
}
let player
onMounted(()=>{
  $script.then(async ({ Vimeo }) => {
    player = new Vimeo.Player(video.value, {
      id: props.video_id,
      height: video.value.clientHeight,
      width: video.value.clientWidth,
      autoplay: false,
      byline: false,
      controls: false,
      cc: true,
      texttrack: 'en.captions'
    })
    video_max.value = await player.getDuration()
    video_max_str.value = convertStoMs(video_max.value)
    player.on('loaded', (e) => {
        console.log(e)
    })
    player.on('ended', () => {
        player.setCurrentTime(0)
        is_playing.value = false
        timeout.notPlaying()
        emit('vid-ended')
        if (props.status_events){
          emit('status-change', false)
        }
    })
  })
})

const play_pause = async (event) => {
    console.log(event)
    // if(event.target.classList.value.includes('slider')){
    //     return
    // }
    if (!is_playing.value) {
        player.play()
        timeout.nowPlaying()
        is_playing.value = true
        has_played.value = true
        if (props.status_events){
          emit('status-change', true)
        }
    } else {
        player.pause()
        timeout.notPlaying()
        is_playing.value = false
        video_pos.value = await player.getCurrentTime()
        if (props.status_events){
          emit('status-change', false)
        }
    }
}
</script>

<style scoped>
.vimeo-container {
  height: 100%;
  width: 100%;
  background-color: #000000;
  /* margin: 0 calc((100% / 14)* 2); */
}

.controls {
    width: 100%; 
    height: 100%; 
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center; 
    align-items: center;
    gap: 10px; 
    display: inline-flex;
    z-index: 100;
}

.video-play-arrow {
  width: 8em;
}

.slider {
  width: 55%;
  height: 6%;
  padding: 1%;
  position: absolute;
  bottom: -1em;
  display: flex;
}

.dur_str {
    position: relative;
    top: -33%;
}

.slider-inner {
  width: 100%;
  margin: 0 1em;
}

</style>