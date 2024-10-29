<template>
    <div>
        <Transition>
        <div v-if="decInfo && info_visible" class="declaration-info">
            <div class="headshot" :style="{'background-image': `url(${decInfo.portrait})`}"></div>
            <div class="text-wrapper">
                <div class="title">{{ decInfo.title }}</div>
                <div class="text">{{ decInfo.text }}</div>
            </div>
        </div>
        </Transition>
        <div class="video-wrapper">
            <VimeoPlayer v-if="video_id" 
                :video_id="video_id"
                :status_events="true"
                @status-change="statusChange"
            />
        </div>
    </div>
</template>

<script setup>
const store = useDataStore()
const route = useRoute()
const info_visible = ref(true)

const statusChange = (new_status) =>{
    info_visible.value = ! new_status
}

const decInfo = computed(()=>{
    const region_dec = store.regionData[parseInt(route.params.region)]
    if (region_dec){
        return region_dec.declaration
    } else {
        return null
    }
})

const video_id = computed(()=>{
    if (decInfo.value && decInfo.value.blocks.length){
        if (decInfo.value.blocks[0].type == 'video'){
            const split_path = decInfo.value.blocks[0].content.url.split('/')
            return split_path[split_path.length - 1].split('?')[0]
        }
    }
})
</script>



<style scoped>

.video-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.declaration-info {
    height: 100%;
    width: calc((100% / 14)* 3);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 2%;
    position: relative;
    z-index: 2;
    padding-top: 4%;
}
.headshot {
    width: 100%;
    aspect-ratio: 1/1;
    background-size: cover;
    border-radius: 100%;
}

.text-wrapper {
    position: absolute;
    bottom: 2em;
    width: 500%;
}

.text {
    width: fit-content;
    background: white;
    padding: 0.2em;
    font-size: 3em;
    margin-bottom: 1em;
}

.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>