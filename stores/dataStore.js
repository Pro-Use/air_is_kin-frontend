export const useDataStore = defineStore('dataStore', () => {
    const introData = ref({})
    const regionIntroData = ref({})
    const regionData = ref([])
    const outroData = ref({})

    const hasData = ref(false)

    const hasWatchedIntro = ref(false)

    const getData = async () => {
        const { data } = await useKql({
            "query": "site",
            "select": {
                "children": true,
                "intro": {
                    "query": "site.children.find('intro')",
                    "select": {
                        "title": true,
                        "blocks": "page.leftcontent.toBlocks"
                    }
                },
                "region_intro": {
                    "query": "site.children.find('region-intro-global')",
                    "select": {
                        "headline_title": true,
                        "headline_text": true,
                        "detail_headline": "page.detail_items.toBlocks.filterBy('in_headline', true)",
                        "detail_items": "page.detail_items.toBlocks.filterBy('in_headline', false)"
                    }
                },
                "regions": {
                    "query": "site.children.find('regions').children",
                    "select": {
                        "slug": true,
                        "title": "page.title",
                        "intro": {
                            "query": "page",
                            "select": {
                                "map": "page.map.toFile?.srcset('large')",
                                "blocks": "page.rightcontent.toBlocks"
                            }
                        },
                        "declaration": {
                            "query": "page",
                            "select": {
                                "portrait": "page.declaration_portrait.toFile ? page.declaration_portrait.toFile.url : ''",
                                "title": "page.declaration_title",
                                "text": "page.declaration_text",
                                "blocks": "page.declaration_video.toBLocks"
                            }
                        }
                    }
                },
                "outro": {
                    "query": "site.children.find('outro')",
                    "select": {
                        "title": "page.pagetitle",
                        "left_blocks": {
                            "query": "page.leftcontent.toResolvedBlocks"
                        },
                        "right_blocks": {
                            "query": "page.rightcontent.toResolvedBlocks"
                        }
                    }
                }
            }
        })
        introData.value = data.value.result.intro
        regionIntroData.value = data.value.result.region_intro
        regionData.value = data.value.result.regions
        outroData.value = data.value.result.outro
        console.log(data.value.result)
        hasData.value = true
    }



    return {
        getData,
        introData, regionIntroData, regionData, outroData,
        hasData, hasWatchedIntro,
    }
})