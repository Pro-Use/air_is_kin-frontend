<template>
    <div>
        <div class="left-col">
            <h1>{{ data.outroData.title }}</h1>
            <div v-for="(block, index) in data.outroData.blocks">
                <OutroPlayer 
                    v-if="block.type == 'audio'"
                    :slug="`block-${index}`"
                    :title="block.content.name"
                    :url="block.content.resolved.soundfile[0].url"
                    @onplay="setPlaying"
                />
            </div>
        </div>
        <div class="right-col"></div>
    </div>
</template>

<script setup>
    const data = useDataStore()

    const cur_playing = ref('null')
    provide('cur_playing', cur_playing)

    const setPlaying = (slug) => {
        cur_playing.value = slug
    }

</script>

<style scoped>

.left-col {
    height: 100%;
    width: calc((100% / 14)* 9);
    margin-left: calc(100% / 14);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.right-col {
    height: 100%;
    width: calc((100%/14)*3);
    margin-right: calc(100% / 14);
    display: flex;
    flex-direction: row;
    align-items: center;
}

</style>