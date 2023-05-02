<template>
    <div class="AList">
        <div class="item" v-for="(item, index) in userApp" :key="index" @click="$emit('clickUserApp',index)">
            <img :src="item.appUrl+item.icons" alt="">
            <br>
            <span>{{ item.shortName }}</span>
        </div>
        <div class="item">
            <img src="static/images/plus.png" alt="addTheme">
            <br>
            <span>添加应用</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'AppList',
    props:['userApp'],

}
</script>

<style scoped>

</style>