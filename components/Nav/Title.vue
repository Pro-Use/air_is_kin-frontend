<template>
    <Transition>
    <div v-f="!props.hidden" class="title-container">
        <div class="region-title">
            <div>{{ title }}</div>
        </div>

    </div>
    </Transition>
</template>
<script setup>
    const props = defineProps(['region'])
    const data = useDataStore()
    const title = computed(()=>{
        if (props.region){
            return data.regionData[props.region]?.title
        } else {
            return null
        }
    })

</script>
<style scoped>

.title-container {
  width: 100%;
  position: absolute;
  height: calc(100vh/9);
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.region-title {
  font-size: 3.5em;
  color: #FFF;
  /* color: #5C5C5C; */
  text-transform: uppercase;
  width: calc((100%/16)*4);
  height: calc(100% - 2px);
  text-align: center;
  background:#c9dbe4;
  background-blend-mode: color;
  border-right: white 2px solid;
  display:flex;
  justify-content: center;
  align-items: center;
}

</style>