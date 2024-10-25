<template>
    <div v-for="column in 16" class="grid-column" :class="{'region-border': route.params.region >= 0}"></div>

</template>
<script setup>
const route = useRoute()
</script>
<style scoped>
    .grid-column {
        grid-row-start: 1;
        grid-row-end: 10;
        border-right: gray solid 2px;
        height: 100vh;
        transition: border-color 1s ease-out;
    }

    .region-border {
        border-color: white;
    }
</style>