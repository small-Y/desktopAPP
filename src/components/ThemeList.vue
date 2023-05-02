<template>
    <div class="TList">
        <div class="item" v-for="(item, index) in TList" :key="index" @click="$emit('clickSetTheme',item.themeName)">
            <img :src='item.urlPath+"/snapshot.png"' :alt="item.themeName">
            <br>
            <span>{{ item.themeName }}</span>
            <div class="uninstall"></div>
        </div>
        <div class="item">
            <img src="static/images/plus2.png" alt="addTheme">
            <br>
            <span>添加主题</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'ThemeList',
    props:['TList'],

}
</script>

<style scoped>

</style>