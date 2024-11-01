<template>
    <div>
        
        <div class="left-col">
            <h1 class="title">{{ data.outroData.title }}</h1>
            <div v-for="(block, index) in data.outroData.left_blocks">
                <OutroPlayer 
                    v-if="block.type == 'audio'"
                    :slug="`block-${index}`"
                    :title="block.content.name"
                    :url="block.content.resolved.soundfile[0].url"
                    @onplay="setPlaying"
                />
                <div
                    class="outro-heading"
                    v-if="block.type == 'heading'"
                >{{ block.content.text }}</div>
                <div
                    v-if="block.type == 'text' || block.type == 'list'"
                    v-html="block.content.text"
                    class="text-block"
                ></div>
                <!-- <div v-if="block.type == 'image'">
                    <div class="headshot" :style="{'background-image': `url(${block.content.resolved.image[0].url})`}"></div>
                </div> -->
            </div>
        </div>
        <div class="right-col">
            <div v-for="block in data.outroData.right_blocks">
                <div
                    class="outro-heading"
                    v-if="block.type == 'heading'"
                >{{ block.content.text }}</div>
                <div
                    v-if="block.type == 'text' || block.type == 'list'"
                    v-html="block.content.text" 
                ></div>
                <div v-if="block.type == 'image'">
                    <img class="outro-image" :srcset="block.content.resolved.image[0].srcset">
                </div>
            </div>
        </div>
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

.outro-title {
    position: absolute;
    padding-left: calc(100% / 14);
    padding-top: calc(100% / 14);
    margin-top: -2em;
}

.left-col {
    height: 100%;
    width: calc((100% / 14)* 10);
    padding: calc(100% / 7) calc(100% / 14);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.right-col {
    height: 100%;
    width: calc((100% / 14)* 3);
    padding: calc(100% / 7) calc(100% / 14);
    padding-left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap:2em
}

.headshot {
  margin-top: 2em;
  width: 12em;
  aspect-ratio: 1/1;
  background-size: cover;
  border-radius: 100%;
}

.outro-heading {
    /* font-weight: 700; */
    text-transform: uppercase;
}

.text-block {
    /* font-weight: 300; */
    line-height: 2em;
    list-style-type: square;
}

img.outro-image {
    width: 100%;
}

</style>