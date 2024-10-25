<template>
    <div v-if="$route.name != 'region-intro'"  v-show="visible" class="back-container" :class="{'hidden':props.hidden}">
        <div @click="back" class="button">BACK</div>
    </div>
    <div v-if="$route.name != 'region-outro'"  v-show="visible" class="continue-container" :class="{'hidden':props.hidden}">
        <div @click="cont($route)" class="button">CONTINUE</div>
    </div>
</template>
<script setup>
const props = defineProps(['hidden'])
const visible = ref(true)
const next_links = [
    'intro','local-intro', 'declaration', 'outro'
]

const router = useRouter()
const back = () => {
    router.back()
}

const cont = (cur_route) => {
    console.log('cur_route', cur_route)
    const full_name = cur_route.name.replace('region-', '')
    const page_index = next_links.indexOf(full_name)
    navigateTo(next_links[page_index + 1])
}

router.beforeEach((to) => {
    if (to.path == '/'){
        visible.value = false
        setTimeout(() => {
            visible.value = true
        }, 2000)
    }
})
</script>
<style scoped>

.back-container {
    grid-area: 9 / 2 / 10 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -50%;
    opacity: 1;
    transition: opacity 0.1s ease 1.5s ;
    z-index: 100;
    pointer-events: all;
}

.continue-container {
    grid-area: 9 / 13 / 10 / 15;
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