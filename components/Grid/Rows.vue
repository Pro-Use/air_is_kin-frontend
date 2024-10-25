<template>
    <div v-for="row in 9" class="grid-row" :class="{'region-border': route.params.region >= 0}"></div>

</template>
<script setup>
    const route = useRoute()
</script>
<style scoped>
    .grid-row {
        grid-column-start: 1;
        grid-column-end: 17;
        border-bottom: gray solid 2px;
        transition: border-color 1s ease-out;
    }

    .region-border {
        border-color: white;
    }

</style>