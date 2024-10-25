<template>
    <div class="timeline-wrapper">
        <div class="timeline-content">
            <div class="content-inner">
                <TimelineItem 
                    v-for="(item, index) in items"
                    :item="item"
                    :index="index"
                    :slider_val="live_val"
                />
            </div>
        </div>
        <TimelineSlider @changeVal="change_val"/>
    </div>
</template>
<script setup>
const route = useRoute()
const store = useDataStore()
const live_val = ref(0)

const items = computed(()=>{
    if(store.regionData.length){
        return store.regionData[parseInt(route.params.region)]['timeline-items']
    } else {
        return []
    }
})
 
const change_val = (new_val) => {
    live_val.value = new_val
}

</script>

<style scoped>

.timeline-wrapper {
  display: flex;
  flex-direction: column;
  padding: 7.5% 5%;
}

.timeline-content {
    flex-grow: 1;
    overflow-x: hidden;
    margin-right: 10%;
}

.content-inner {
    height: 100%;
    position: relative;
    display: flex;
    width: 100%;
}

</style>