<template>
    <div class="timeline">
        <VueSlider v-model="tl_val"
            :v-if="store.hasData"
            :min="tl_min" 
            :max="tl_max"
            :marks="tlMarks"
            :height="1"
            tooltip="none"
            :railStyle="{backgroundColor:'#4B4B4B'}"
            :processStyle="{backgroundColor:'#4B4B4B'}"
            @dragEnd="end"
            @change="change"
        >
        <!-- marks -->
            <template v-slot:mark="{ pos, label }">
                <div class="tl-label" :style="{left: `${pos}%`}">
                    {{label}}
                </div>
            </template>
        <!-- dot -->
            <template #dot="{pos, index, value, focus, disabled}">
                <div class="tl-dot" :style="{'background-color': dot_colour}"></div>
                </template>
        </VueSlider>
    </div>
</template>

<script setup>
import VueSlider from 'vue-3-slider-component'
const emit = defineEmits(['changeVal'])
const route = useRoute()
const tl_val = ref(0)
const tl_min = ref(0)
const tl_max = ref(0)
const tl_points = []
const dot_colour = ref('black')
const store = useDataStore()

const tlMarks = computed(()=> {
    console.log('marks',route.params.region)
    const region_marks = store.tlMarks[parseInt(route.params.region)]
    const marks_obj = {}
    if(region_marks){
        tl_min.value = region_marks[0].value
        tl_max.value = region_marks[region_marks.length - 1].value
        tl_val.value = region_marks[0].value
        snap_change(region_marks[0].value)
        region_marks.forEach((mark)=>{
            marks_obj[mark.value.toString()] = mark.label
            tl_points.push(mark.value)
        })
    }
    return marks_obj
})

const snap = () => {
    const snap_to = tl_points.find((element, index) => {
        if (index == tl_points.length - 1){
            return true
        }
        const cur_dif = Math.abs(element - tl_val.value)
        const next_val = tl_points[index + 1]
        const next_dif = Math.abs(next_val - tl_val.value)
        if(cur_dif < next_dif){
            return true
        } else {
            return false
        }
    })
    return snap_to
}

const end = () => {
    const snapped_val = snap()
    tl_val.value = snapped_val
    snap_change(snapped_val)
}

const change = () => {
    const snapped_val = snap()
    snap_change(snapped_val)
}

const get_dot_colour = (snapped_val)=>{
    const region_marks = store.tlMarks[parseInt(route.params.region)]
    const cur_item = region_marks.find((item)=>{
        return item.value == snapped_val
    })
    if (cur_item){
        return cur_item.colour
    } else {
        return 'black'
    }
}

const snap_change = (snapped_val) => {
    emit('changeVal', snapped_val)
    dot_colour.value = get_dot_colour(snapped_val)
}

</script>



<style scoped>

.timeline {
  width: 100%;
  padding: 0.5% 10% 3% 0;
}

.tl-label {
    position: absolute;
    transform: rotate(45deg) translate(-5%, -81%);
    transform-origin: left;
    padding-left: 3.2%;
    border-bottom: #4B4B4B 1px solid;
    
}

.tl-dot{
    width: 200%;
    height: 200%;
    margin-top: -50%;
    border-radius: 100%;
}
</style>