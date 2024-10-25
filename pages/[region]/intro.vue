<template>
    <div style="background-color: black;">
        <VimeoPlayer v-if="video_id" :video_id="video_id"/>
    </div>
</template>

<script setup>

const data = useDataStore()

const video_id = computed(()=>{
    if (data.introData.blocks.length){
        if (data.introData.blocks[0].type == 'video'){
            const split_path = data.introData.blocks[0].content.url.split('/')
            return split_path[split_path.length - 1].split('?')[0]
        }
    }
})

</script>



<style scoped>

</style>