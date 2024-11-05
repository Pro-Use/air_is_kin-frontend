<template>
  <div :class="{'no-mouse': $config.public.NO_MOUSE}">
  <TimeOut/>
  <div @click="interaction" >
    <!-- Colours -->
    <Grid>
      <GridColours/>
    </Grid>
    <!-- columns -->
    <Grid>
        <GridColumns></GridColumns>
    </Grid>
    <!-- rows -->
    <Grid>
        <GridRows></GridRows>
    </Grid>
    <!-- Page -->
    <Grid>
      <NuxtPage class="page-box"/>
    </Grid>
    <!-- Navigation -->
    <Grid>
    <Navigation/>
    </Grid>
  </div>
</div>
</template>

<script setup>

const store = useDataStore()
const timeout = useTimeout()
const route = useRoute()
const config =  useRuntimeConfig()

console.log('config', config.public)

const interaction = () =>{
  console.log('tap')
  timeout.setTimer()
}

if(!store.regionData.length){
  await store.getData()
}

const region_data = computed(()=>{
  if (route.params.region && store.regionData.length){
    const index = parseInt(route.params.region)
    return store.regionData[index]
  }
})

provide('region_data', region_data)

</script>

<style scoped>

.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-box {
    grid-area: 2 / 2 / 9 / 16;
    background-color: white;
    margin: 0 1px 1px 0;
    pointer-events: all;
    display: flex;
    position: relative;
}

.no-mouse {
  cursor: none;
  user-select: none;
}
</style>