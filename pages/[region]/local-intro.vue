<template>
    <div>
        <div class="map-wrapper">
            <div class="map-container">
                <img 
                    v-if="region_data.intro.map"
                    class="map-img"
                    :srcset="region_data.intro.map"
                >
            </div>
        </div>
        <div class="context-wrapper">
            <div class="context-container">
                <div class="context-main">
                    <div class="context-blocks">
                        <div>
                            <!-- Global Context -->
                            <div class="context-title">
                                <h1>{{ data.regionIntroData.headline_title }}</h1>
                            </div>
                            <div class="context-text body-text" v-html="data.regionIntroData.headline_text">
                            </div>
                            <div 
                                class="body-text context-link"
                                v-for="link in data.regionIntroData.detail_headline"
                                @click="openDetail(link.id)"
                            >
                                {{ link.content.button_text }} →

                            </div>
                        </div>
                        <div>
                        <!-- Region Context -->
                            <div class="context-title">
                                <h1>{{ region_data.title }}</h1>
                            </div>
                            <div v-for="block in region_data.intro.blocks">
                                <div
                                    v-if="block.type == 'text'"
                                    class="context-text body-text"
                                    v-html="block.content.text"
                                ></div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <!-- Detail Overlay -->
                    <Transition>
                        <div 
                            class="context-detail"
                            v-if="detail_id"
                            >
                            <div class="context-title">
                                <h1>{{ detail.content.detail_title }}</h1>
                            </div>
                            <div class="context-text body-text" v-html="detail.content.detail_text">
                            </div>
                            <div class="body-text context-link" @click="detail_id = null">
                                ← RETURN
                            </div>
                        </div>
                    </Transition>
                </div>
                <!-- Detail Links -->
                <div class="context-links">
                    <div 
                        class="body-text context-link context-list"
                        v-for="link in data.regionIntroData.detail_items"
                        @click="openDetail(link.id)"
                    >
                        {{ link.content.button_text }} →

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const data = useDataStore()
    const timeout = useTimeout()
    const detail_id = ref(null)
    const region_data = inject('region_data')

    const detail = computed(()=>{
        if(detail_id.value){
            const all_detail = data.regionIntroData.detail_headline.concat(
                data.regionIntroData.detail_items
            )
            return all_detail.find((item)=> item.id == detail_id.value)
        }
    })

    const openDetail = (new_id) => {
        if(detail_id.value){
            detail_id.value = null
            setTimeout(()=>{
                detail_id.value = new_id
            }, 600)
        } else {
            detail_id.value = new_id
        }
    }

</script>



<style scoped>
.map-wrapper {
    height: 100%;
    width: calc((100%/14)*8);
    display: flex;
    background-color: white;
    z-index: 100;
}

.map-container {
  width: 100%;
  height: 100%;
  margin: 0 3.12em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-img {
  width: 100%;
}

.context-wrapper {
    height: 100%;
    width: calc((100% / 14)* 5);
    margin-right: calc(100% / 14);
    padding: calc((100% / 14)* 0.25) 0;
    display: flex;
}

.context-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.context-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.context-blocks {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.context-link{
    font-weight: 700;
    text-transform: uppercase;
}

.context-list {
    line-height: 1.875em;
}

.context-detail {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
}

.v-enter-active,
.v-leave-active {
  transition: left 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  left: -100%;
}
</style>