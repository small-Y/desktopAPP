<template>
    <div class="DialogWidget" v-if="showDialogWidget">
        <div id="DialogWidget_item" v-for="(item, index) in widgetApp" :key="item.appID">
            <div :id="'DialogWidget-'+index" class="widget" :style="{'width':item.width + 'px','height':item.height + 'px','z-index':this.zindex+index+1,'right':50 + ((index+1)*10) +'px','z-index':400 + (index+1)}">
                <div class="content">
                    <iframe :src="item.appUrl+'index.html'" frameborder="no" scrolling="no" allowtransparency="true" hidefocus marginwidth="0" marginheight="0"></iframe>
                </div>
                <div class="bar">
                    <div class="close" @click="$emit('clickWidgetClose',item.appID)"></div>
                    <div class="setup"></div>
                    <div class="move" @mousedown="MoveDown($event,index)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    export default {
        name: 'DialogWidget',
        data() {
            return {
                zindex:400
            }
        },
        props:['showDialogWidget','widgetApp'],
        methods: {
            MoveDown:function(event,index){
                this.index=index;
                var maxZindex = this.getWidgetZindexMax();
                console.log(maxZindex);
                maxZindex++;
                $("#DialogWidget-"+this.index).css({
                    'z-index':maxZindex
                });

                this.beginTop = event.clientY - parseInt($("#DialogWidget-"+index).css("top"));
                this.beginLeft = event.clientX - parseInt($("#DialogWidget-"+index).css("left"));
                $(document).bind("mousemove", this.moveGo);
            },
            moveGo:function(event){
                var top = (event.clientY - this.beginTop);
                var left = (event.clientX - this.beginLeft);
                $("#DialogWidget-"+this.index).css({
                    top:top,
                    left:left
                })
            },
            getWidgetZindexMax:function () {
                var myList = [];
                for (let i = 0; i < 20; i++) {
                    var myZindex = $("#dialogWidget-"+i).css('z-index');
                    myList.push(myZindex?parseInt(myZindex):0);
                }
                var max = Math.max(...myList)
                return max
            },
        },
        mounted(){

        }
    }
</script>

<style>
.widget{
    top: 70px;
    position: absolute;
}
.widget .content {
    right: 20px;
    height: 100%;
    position: relative;
}
.widget .content iframe{
    width: 100%;
    height: 100%;
}
.widget .bar {
    top: 0;
    right: -6px;
    position: absolute;
    cursor: move;
    color: #fff;
    width: 20px;
    height: 68px;
    padding: 0 2px;
    filter: alpha(opacity=0);
    opacity: 0;
    background: #000 url(../../public/static/images/btn-drop.png) no-repeat bottom;
}
.widget .bar:hover{
    opacity: 0.7;
    height: 42px;
}
.widget .bar .close {
    float: right;
    cursor: pointer;
    width: 20px;
    height: 20px;
    opacity: .8;
    margin: 2px;
    background: url(../../public/static/images/btn-close.png) no-repeat;
    background-position: 0 -21px;
}
.widget .bar .setup {
    float: right;
    cursor: pointer;
    width: 20px;
    height: 20px;
    opacity: .8;
    margin: 2px 0 2px 4px;
    background: url(../../public/static/images/btn1.png) no-repeat;
    display: none;
}
.widget .bar .move {
    float: right;
    width: 20px;
    height: 20px;
    margin: 2px;
}
</style>
