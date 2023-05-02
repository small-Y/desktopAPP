<template>
    <div class="WList">
        <div class="item" v-for="(item, index) in WList" :key="index">
            <img :src='item.urlPath+item.fileName' :alt="item.themeName" @click="$emit('clickSetWrapper',item.fileName)">
            <br>
            <span class="wbtn1" @click="$emit('clickSetWrapper1',item.fileName)">平铺</span>
            <span class="wbtn2" @click="$emit('clickSetWrapper2',item.fileName)">拉伸</span>
            <div class="uninstall"></div>
        </div>
        <div class="item">
            <img src="static/images/plus2.png" alt="addTheme">
            <br>
            <span>添加壁纸</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'WrapperList',
    props:['WList'],

}
</script>

<style scoped>

</style>