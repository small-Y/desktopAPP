<template>
    <div class="StartApp">
        <div class="item" v-for="(item, index) in installApp" :key="index" @click="$emit('clickStartApp',index)">
            <img :src="item.appUrl+item.icons" alt="">
            <br>
            <span>{{ item.shortName }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'StartApp',
    props:['installApp'],

}
</script>

<style scoped>

</style>