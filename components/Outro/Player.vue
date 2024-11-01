<template>
  <div class="beat-container">
    <div class="player-container" ref="player_container">
      <div class="controls" @click="play_pause">
        <img v-if="!playing" src="~/assets/img/play-arrow.svg" />
        <img v-else src="~/assets/img/pause.svg" />
      </div>
      <div v-show="wave_loaded" :id="`${props.slug}-player`"></div>
      <span v-if="!wave_loaded" class="loader"></span>
      <div v-show="wave_loaded" class="player-time">
        <span class="min-sec">{{ player_time }}</span>
        <span>/</span>
        <span class="min-sec">{{ player_dur }}</span>
      </div>
      <div class="beat-title">{{ props.title }}</div>
    </div>
  </div>
</template>

<script setup>
import WaveSurfer from 'wavesurfer.js'
const props = defineProps(['title', 'url', 'slug'])
const emit = defineEmits(['onplay'])
const timeout = useTimeout()
console.log(props)
let player
const playing = ref(false)
const cur_playing = inject('cur_playing')
const wave_loaded = ref(false)
const player_container = ref(null)
const player_dur = ref(null)
const player_time = ref('00.00')

onMounted(() => {
  const container = `#${props.slug}-player`
  const height = player_container.value.clientHeight * 0.8
  // console.log('height', height)
  player = WaveSurfer.create({
    container: container,
    height: height,
    waveColor: 'rgba(217, 217, 217, 1)',
    barWidth: height / 60,
    barGap: 2,
    cursorWidth: 0,
    progressColor: 'grey',
    url: props.url,
  })
  player.on('redrawcomplete', () => {
    wave_loaded.value = true
  })

  player.on('play', () => {
    timeout.nowPlaying()
  })

  player.on('finish', () => {
    player.setTime(0)
    playing.value = false
    timeout.notPlaying()
  })

  player.on('ready', (duration) => {
    player_dur.value = calc_time(duration)
  })

  player.on('timeupdate', (currentTime) => {
    player_time.value = calc_time(currentTime)
  })
})

const calc_time = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  extraSeconds = Math.floor(extraSeconds)
  return `${String(minutes).padStart(2, '0')}:${String(extraSeconds).padStart(2, '0')}`
}

watch(cur_playing, (new_playing) => {
  if (new_playing != props.slug && playing.value) {
    player.pause()
    playing.value = player.isPlaying()
  }
})

const play_pause = () => {
  player.playPause()
  playing.value = player.isPlaying()
  if (playing.value) {
    emit('onplay', props.slug)
  } else {
    timeout.notPlaying()
  }
}

</script>

<style scoped>
.beat-container {
  margin: 2em 0px;
  position: relative;
}

.beat-title {
  color: #5C5C5C;
  font-family: Inter;
  font-style: normal;
  line-height: normal;
  margin-bottom: 1em;
  position: absolute;
  bottom: 0;
  padding-left: 10em;
  text-transform: uppercase;
}

.player-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 13em;
  border: black 1px solid;
  border-radius: 10em;
  padding: 0.5em;
}

.controls {
  width: 10em;
  margin: 0 1.25em;
  aspect-ratio: 1/1;
}

.controls>img {
  height: 100%;
}

.player-time {
  width: 8em;
  margin: 1em;
  display: flex;
  align-content: space-around;
  font-feature-settings: "tnum";
}

[id$="player"] {
  width: 100%;
}

.loader {
  width: 80%;
  height: 2px;
  display: inline-block;
  position: relative;
  background: rgba(217, 217, 217, 0.5);
  overflow: hidden;
}

.loader::after {
  content: '';
  width: 96px;
  height: 4.8px;
  background: #FFF;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: hitZak 2s linear infinite alternate;
}

@keyframes hitZak {
  0% {
    left: 0;
    transform: translateX(-1%);
  }

  100% {
    left: 100%;
    transform: translateX(-99%);
  }
}
</style>