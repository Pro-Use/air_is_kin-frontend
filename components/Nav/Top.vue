<template>
    <div v-show="visible" class="top-container" :class="{'hidden':props.hidden}">
        <div @click="restart" to="/" class="button">RESTART</div>
    </div>
</template>
<script setup>
const props = defineProps(['hidden'])
const visible = ref(true)
const timeout = useTimeout()
const restart = () => {
    visible.value = false
    setTimeout(() => {
        visible.value = true
    }, 2000)
    timeout.stopTimer()
    return navigateTo('/')
}
</script>
<style scoped>

.top-container {
    grid-area: 2 / 2 / 3 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -50%;
    opacity: 1;
    transition: opacity 0.1s ease 1.5s ;
    z-index: 100;
    pointer-events: all;
}

.hidden {
  opacity: 0;
}

</style>