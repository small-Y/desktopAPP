<template>
    <div class="pannelTask" v-if="showPannelTask">
        <div class="pannelTask_item" v-for="(item, index) in listApp" :key="index"  @click="$emit('clickTask',index)">
            <li :id="'desktopFrame1_Panel_Task_'+item.appID">
                <div class="icon">
                    <div class="label">
                        <em>{{ item.shortName }}</em>
                        <span class="pointer"></span>
                    </div>
                </div>
                <div :id="'desktopFrame1_Panel_Task_'+item.appID+'_Button'" :class="item.active?'ButtonItemActive':'ButtonItem'">
                    <img :src="item.appUrl+item.icons" onmousedown="return false;">
                </div>
            </li>
        </div>
    </div>
</template>

<script>
export default {
    name:'PannelTask',
    props:['showPannelTask','listApp'],

}
</script>

<style>

</style>