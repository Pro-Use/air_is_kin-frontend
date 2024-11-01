<template>
    <div class="outline-border"
    :style="{
        'mask-image': `url(${props.url})`,
    }">
    >
        <div 
            class="outline-img" 
            :style="{
                'mask-image': `url(${props.url})`,
            }">
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['url', 'bg_colour', 'bg_img', 'index', 'cur_index'])

const mask = ref(`url(${props.url})`)

const fallback = 'url(https://www.newcastleworld.com/webimg/b25lY21zOjM4NTE2Y2U4LTVkMDctNGY4ZS1iNzFjLTllYWU4MzQ0OTE2NTphN2ZmZThlYi1mNmVmLTRkYzQtYWFmNC0zNTQxOTU4OGI2YjI=.jpg?crop=3:2,smart&trim=&width=990&quality=65&enable=upscale)'

const background = computed(()=>{
    if(props.index == props.cur_index  || props.cur_index == -1){
        return 0
    } else {
        return 1
    }
})

const bg_img = computed(()=>{
    if(props.bg_img){
        return `url(${props.bg_img.url})`
    } else {
        return fallback
    }
})

const bg_colour = computed(()=>{
    if (props.bg_colour?.length){
        return props.bg_colour
    } else {
        return 'black'
    }
})

</script>
<style scoped>
    .outline-border {
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: center;
        background-color: rgb(255, 255, 255);
        width: 100%;
        height: 100%;
        position: relative;
    }

    .outline-img {
        position: absolute;
        mask-repeat: no-repeat;
        mask-size: contain;
        mask-position: center;
        background-image: v-bind(bg_img);
        background-size: cover;
        width: 99%;
        height: 99.5%;
        top: 0.2%;
        transition: opacity 1s ease;
        z-index: 2;
    }

    .outline-img::before {
        position: absolute;
        content: "";
        inset: 0;
        background-color: v-bind(bg_colour);
        z-index: 1;
        opacity: v-bind(background);
        transition: opacity 0.25s linear;
    }
   
</style>