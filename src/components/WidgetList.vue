<template>
    <div class="WidgetList">
        <div class="item" v-for="(item, index) in WidgetApp" :key="index" @click="$emit('clickWidgetApp',index)">
            <img :src="item.appUrl+item.icons" alt="">
            <br>
            <span>{{ item.shortName }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'WidgetList',
    props:['WidgetApp'],

}
</script>

<style scoped>
.WidgetList .item {
    position: relative;
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
.WidgetList .item:hover {
    background: rgba(0,0,0,.1);
}
.WidgetList .item img {
    width: 54px;
    height: 54px;
    overflow-clip-margin: content-box;
    overflow: clip;
}
</style>