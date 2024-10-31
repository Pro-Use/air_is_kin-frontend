<template>
  <div class="nav-wrapper">
      <div v-if="data?.result" class="nav-inner">
          <div v-for="(region,index) in data?.result"
              class="all-outlines" :class="outlineClasses[index]"
              @click="navLink(region.slug, index)"
          >
            <NavImg 
              :url="region.outline" 
              :bg_colour="region.region_index" 
              :bg_img="region.inner"
              :index="index" 
              :cur_index="cur_index"
            />
            <!-- <div class="outline-img" :style="{'mask-image': `url(${region.outline})` }"></div> -->
          </div>
          <Transition>
            <div v-if="onSplash" class="nav-text-wrapper">
              <div class="nav-text">TAP A REGION TO BEGIN</div>
            </div>
          </Transition>
      </div>
    </div>
    <NavTop :hidden="onSplash"/>
    <NavBottom :hidden="onSplash"/>
</template>

<script setup>
const dataStore = useDataStore()
const {data} = await useKql({
  "query": "site.children.find('regions').children",
  "select": {
    "slug": true,
    "outline": "page.outline.toFile.dataUri",
    "inner": "page.inner.toFile",
    "region_index": true
  }
})

const onSplash = ref(true)
let highlight_timeout
const cur_index = ref(0)

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const highlight = () => {
  if (data?.value.result){
    let new_index = getRandomInt(data?.value.result.length)
    while (new_index == cur_index.value) {
      new_index = getRandomInt(data?.value.result.length)
    }
    cur_index.value = new_index
    // console.log('cur_index', cur_index)
    highlight_timeout = setTimeout(() => {
      highlight()
    }, 3000);
  }
}
const start_highlight = () => {
  highlight_timeout = setTimeout(() => {
    highlight()
  }, 3000);
}

const route = useRoute()

if(route.path == '/'){
  onSplash.value = true
  start_highlight()
} else {
  onSplash.value = false
  cur_index.value = parseInt(route.params.region)
  console.log ('route', route)
}

const router = useRouter()

router.beforeEach((to) => {
  if (to.path == '/'){
    onSplash.value = true
    clearTimeout(highlight_timeout)
    start_highlight()
  } else {
    // cur_index.value = -1
    clearTimeout(highlight_timeout)
    onSplash.value = false
  }
})

const navLink = (slug, index) => {
  console.log(slug)
  clearTimeout(highlight_timeout)
  cur_index.value = index
  if(!dataStore.hasWatchedIntro){
    return navigateTo({
      path: `/${index}/intro`,
    })
  } else {
    return navigateTo({
      path: `/${index}/local-intro`,
    })
  }
  
}

const outlineClasses = computed(() => {
  const classes = []
  data?.value.result.forEach((val, i) =>{
    const new_class = {}
    if(onSplash.value){
      new_class[`outline-${i}`] = true
      new_class['outline'] = true
    } else {
      new_class[`nav-outline-${i}`] = true
      new_class['nav-outline'] = true
    }
    classes.push(new_class)
  })
  return classes
})



</script>
<style scoped>


.nav-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
}

.nav-inner {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
}

.nav-text-wrapper {
  height: calc(100vw / 16);
  position: fixed;
  left: -1px;
  bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc((100vw / 16)* 6);
  margin: 0 calc((100vw / 16)* 5);
  background: white;
  z-index: -1;
  border: #808080 1px solid;
}

.nav-text {
  text-align: center;
  font-size: 3.5em;
  color: #5C5C5C;
}

.all-outlines {
  pointer-events: all;
  transition: all 1.5s ease-in-out;
}

.outline {
  height: 50%;
  width: 33%;
  position: absolute;
  padding: 0 50px;
}

.outline-0 {
  top: 0%;
  left: 0%;
  padding-bottom: 5.5%;
}

.outline-1 {
  top: 0%;
  left: 33.33%;
  padding-bottom: 5.5%;
}

.outline-2 {
  top: 0%;
  left: 66.66%;
  padding-bottom: 5.5%;
}

.outline-3 {
  top: 50%;
  left: 16.665%;
  padding-bottom: 5.5%;
}

.outline-4 {
  top: 50%;
  left: 49.995%;
  padding-bottom: 5.5%;
}

.nav-outline {
  height: 20%;
  width: 10%;
  position: absolute;
  left: 88.5%;
  padding: 1%;
}

.nav-outline-0 {
  top: 0%
}

.nav-outline-1 {
  top: 20%
}

.nav-outline-2 {
  top: 40%
}

.nav-outline-3 {
  top: 60%
}

.nav-outline-4 {
  top: 80%
}

.v-enter-active{
  transition: opacity 0.5s ease 1s;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>