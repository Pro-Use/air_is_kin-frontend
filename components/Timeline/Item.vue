<template>
    <Transition :name="trans_dir">
    <div v-if="visible" class="item-wrapper" :style="{'z-index': `${props.index * 100}`}">
        <div class="item-content">
            <div class="title">{{ props.item.item_title }}</div>
            <div v-for="block in props.item.blocks">
                <div v-if="block.type == 'text'" class="item-text" v-html="block.content.text"></div>
            </div>
        </div>
    </div>
    </Transition>
</template>

<script setup>
    const props = defineProps(['item', 'index', 'slider_val'])
    console.log('item', props.item)

    const visible = computed(()=>{
        return props.item.date == props.slider_val
    })

    const slider_val = computed(()=>{
        return props.slider_val
    })

    const trans_dir = ref('right')

    watch(slider_val, (new_val, old_val) => {
        if(new_val < old_val){
            trans_dir.value = 'left'
        } else {
            trans_dir.value = 'right'
        }
    })
</script>

<style scoped>
.item-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: white;
}

.item-title {
  text-transform: uppercase;
  font-size: 175%;
}

.item-text {
  width: 50%;
}

.right-enter-active,
.right-leave-active {
  transition: right 0.5s ease;
}

.right-enter-to,
.right-leave-from {
    right: 0;
}

.right-enter-from{
    right:-100%
}
.right-leave-to {
    right: 200%;
}

.left-enter-active,
.left-leave-active {
  transition: left 0.5s ease;
}

.left-enter-to,
.left-leave-from {
    left: 0;
}

.left-enter-from{
    left:-100%
}
.left-leave-to {
    left: 200%;
}



</style>
