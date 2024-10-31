<template>
    <div class="modal" v-if="timeout.timedOut" @click-away="reset()">
        <div class="timeout-container">
            <div class="timeout-message">RESTARTING IN {{ timer }} SECONDS</div>
            <div class="button" :class="`button-black`" @click="">
                <div class="button-text" :class="`back-text-black`" @click="reset()">CONTINUE</div>
            </div>
        </div>
    </div>
</template>
<script setup>
const timeout_secs = 10
const timeout = useTimeout()
const data = useDataStore()
const route = useRoute()
const timer = ref(timeout_secs)

watch(() => route.fullPath, () => {
    timeout.notPlaying()
    // timeout.setTimer()
});

const tick = () => {
    if (timeout.timedOut && timer.value > 0) {
        timer.value--
        setTimeout(tick, 1000)
    } else if (timeout.timedOut) {
        timeout.$patch({ timedOut: false })
        data.$patch({hasWatchedIntro: false})
        timer.value = timeout_secs
        return navigateTo('/')
    }
}

const reset = () => {
    timeout.$patch({ timedOut: false })
    timer.value = timeout_secs
    timeout.setTimer()
}

timeout.$subscribe((mutation) => {
    // console.log('mutation', mutation)
    if (timeout.timedOut) {
        setTimeout(tick, 1000)
    }
})

</script>
<style scoped>

.modal {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
}

.timeout-container {
    width: 40%;
    height: 20%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 3em 8em;
    filter: drop-shadow(5px 5px 10px #000000);
}

.timeout-message {
    color: black;
    font-size: 32px;
    font-family: Helvetica Neue;
    font-weight: 700;
    word-wrap: break-word;
    margin-top: 36px;
    margin-bottom: 57px;
}
</style>