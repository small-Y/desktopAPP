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
.item {
    width: 85px;
    height: 80px;
    padding: 5px 2px 0 2px;
    line-height: 16px;
    color: #666;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
}
img {
    width: 54px;
    height: 54px;
    overflow-clip-margin: content-box;
    overflow: clip;
}
</style>