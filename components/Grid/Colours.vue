<template>
    <div 
        v-for="number in 16" class="block":class="[`row-1-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-1-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-1-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-2-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-2-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-2-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-3-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-3-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
    <div 
        v-for="number in 16" class="block":class="[`row-3-column-${Math.ceil(number/divisor)}`, visible]"
        :style="{'transition': `opacity 1s ease ${Math.random()*1}s`}"
    >
    </div>
</template>
<script setup>
    const route = useRoute()
    const divisor = ref(5.5)

    const visible = computed(()=>{
        console.log('visible', route)
        if(route.params.region >= 0){
            return 'show'
        } else {
            return 'no-show'
        }
    })

</script>
<style scoped>

.block{
    opacity: 0.3;
}

.no-show{
    opacity: 0;
}

.row-1-column-1{
    background-color: #52B6B6;
}
.row-1-column-2{
    background-color: #4F8AA8;
}
.row-1-column-3{
    background-color: #434E87;
}

.row-2-column-1{
    background-color: #9CCFCF;
}
.row-2-column-2{
    background-color: #969DBF;
}
.row-2-column-3{
    background-color: #80599A;
}
.row-3-column-1{
    background-color: #D3D3D3;
}
.row-3-column-2{
    background-color: #CBA0C3;
}
.row-3-column-3{
    background-color: #AD5B9C;
}

</style>