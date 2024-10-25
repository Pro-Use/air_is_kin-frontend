<template>
    <div class="main-grid">
        <slot></slot>
    </div>

</template>
<style scoped>
    .main-grid {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-template-rows: repeat(9, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        pointer-events: none;
    }

</style>