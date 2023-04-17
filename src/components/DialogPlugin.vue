<template>
    <div class="DialogPlugin" v-if="showDialogPlugin">
        <div id="DialogPlugin_item" v-for="(item, index) in installApp" :key="item.appID">
            <div :id="'dialog-'+index" class="dialog" :style="{'width':width,'height':height,left:this.moveLeft + 'px',top:this.moveTop + 'px'}">
                <div class="bar">
                    {{ item.appUrl }}
                    {{ item.icons }}
                    <img :src="require('@/webApp/Account/user.png')">
                    <!-- <img :src="require('@'+item.appUrl+item.icons)"> -->
                    <span class="title">{{ title }}</span>
                    <a class="close" @click="$emit('clickClose')"></a>
                    <a class="max" @click="clickMax"></a>
                    <a class="min" @click="clickMin"></a>
                </div>
                <div class="main">
                    <div class="leftbar"></div>
                    <div class="winSize" v-if="showSize"><div class="sizeText">^_^&nbsp;窗体调整中...</div></div>
                    <div class="content" v-else>
                        <iframe src="@/webApp/Account/" frameborder="0" marginwidth="0" marginheight="0"></iframe>
                    </div>
                    <div class="rightbar"></div>
                </div>
                <div class="foot"></div>
                <div class="mask"></div>
                <div class="barMove" @mousedown="barMoveDown" @mouseup="barMoveUp"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    export default {
        name: 'DialogPlugin',
        data() {
            return {
                showSize:false,
                moveLeft:480,
                moveTop:110,
                beginLeft:0,
                beginTop:0,
                ifMax:false,
                ifMin:false,
                Dtop:0,
                Dleft:0,
                Dwidth:0,
                Dheight:0,
                DzIndex:0
            }
        },
        props:['title','width','height','showDialogPlugin','installApp'],
        methods: {
            barMoveDown:function(event){
                this.showSize=true;
                console.log(event)
                console.log(event.clientX,'坐标',event.clientY)
                this.beginTop = event.clientY - parseInt($("#dialog-1").css("top"));
                this.beginLeft = event.clientX - parseInt($("#dialog-1").css("left"));
                $(document).bind("mousemove", this.moveGo)
            },
            barMoveUp:function(){
                this.showSize=false;
            },
            moveGo:function(event){
                console.log(event.clientX ,'移动',event.clientY)
                this.moveTop = (event.clientY - this.beginTop);
                this.moveLeft = (event.clientX - this.beginLeft);
            },
            clickMax:function(){
                if(this.ifMax){
                    this.ifMax=false;
                    this.playSound("rest");
                    $("#dialog-1").removeClass();
                    $("#dialog-1").addClass("dialog");
                    $("#dialog-1").css("z-index", this.DzIndex);
                    $("#dialog-1").animate({
                        top: this.Dtop,
                        left: this.Dleft,
                        width: this.Dwidth,
                        height: this.Dheight,
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "normal", function() {
                        $("#dialog-1").find(".content iframe").fadeIn("fast")
                    });
                }else{
                    this.ifMax=true;
                    this.playSound("max");
                    this.Dtop = parseInt($("#dialog-1").css("top"));
                    this.Dleft = parseInt($("#dialog-1").css("left"));
                    this.Dwidth = parseInt($("#dialog-1").css("width"));
                    this.Dheight = parseInt($("#dialog-1").css("height"));
                    this.DzIndex = parseInt($("#dialog-1").css("z-index"));
                    $("#dialog-1").find(".content iframe").hide(),
                    $("#dialog-1").css("z-index", 1000000),
                    $("#dialog-1").animate({
                        top: 0,
                        left: 0,
                        width: $(window).width(),
                        height: $(window).height(),
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "fast", function() {
                        $("#dialog-1").removeClass();
                        $("#dialog-1").addClass("dialog-max");
                        $("#dialog-1").find(".content iframe").fadeIn("fast")
                    });
                }
            },
            clickMin:function(){
                this.playSound("min");
                this.Dtop = parseInt($("#dialog-1").css("top"));
                this.Dleft = parseInt($("#dialog-1").css("left"));
                this.Dwidth = parseInt($("#dialog-1").css("width"));
                this.Dheight = parseInt($("#dialog-1").css("height"));
                this.DzIndex = parseInt($("#dialog-1").css("z-index"));
                $("#dialog-1").animate({
                    top: -$(window).height() - 40,
                    opacity: 0,
                    avoidTransforms: false,
                    useTranslate3d: true
                }, "normal", function() {
                    $("#dialog-1").removeClass();
                    $("#dialog-1").addClass("dialog");
                    $("#dialog-1").css("z-index", -1);
                })
            },
            playSound:function(soundType){
                var soundTag = document.getElementById(soundType+"_sound");
                soundTag.play()
            }
        },
        mounted(){
            $(document).bind("mouseup", function() {
                this.showSize=false;
                $(document).unbind("mousemove")
            });
        }
    }
</script>

<style>
.dialog {
    z-index: 504;
    position: absolute;
    top: 109.5px;
    left: 480px;
    opacity: 1;
    transition-property: all;
    transition-duration: 0s;
    transition-timing-function: ease;
    background: #c0c0c0 url(@/assets/images/desktop/frame.png) repeat-x left top;
    padding: 4px 0 33px 0;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.7);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.7);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
}
.dialog .bar {
    color: #5f5f5f;
    padding: 0;
    height: 32px;
    cursor: pointer;
}
.dialog .bar img {
    float: left;
    width: 26px;
    height: 26px;
    padding: 1px;
    margin-left: 6px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
}
.dialog .bar .title {
    float: left;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 14px;
    margin-top: 4px;
    margin-left: 4px;
}
.dialog .bar .close {
    float: right;
    cursor: pointer;
    margin: 5px 5px 0 5px;
    width: 24px;
    height: 24px;
    background: url(@/assets/images/desktop/dialog-bt.png) no-repeat;
    background-position: 0 -166px;
    font: 12px/1.5 tahoma,helvetica,clean,sans-serif;
    color: #45649e;
}
.dialog .bar .max {
    float: right;
    cursor: pointer;
    margin: 3px 5px 0 5px;
    width: 24px;
    height: 24px;
    background: url(@/assets/images/desktop/dialog-bt.png) no-repeat;
    background-position: 0 -69px;
}
.dialog .bar .min {
    float: right;
    cursor: pointer;
    margin: 3px 5px 0 5px;
    width: 24px;
    height: 24px;
    background: url(@/assets/images/desktop/dialog-bt.png) no-repeat;
    background-position: 0 -20px;
}
.dialog .main {
    width: 100%;
    height: 100%;
    border-top: 1px solid rgba(255,255,255,0.2);
}
.dialog .main .leftbar {
    top: 30px;
    left: -5px;
    bottom: 5px;
    position: absolute;
    cursor: e-resize;
    width: 5px;
}
.dialog .main .content {
    height: 100%;
    background: white url(@/assets/images/desktop/ntp_background.png) repeat left bottom;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
}
.dialog .main .rightbar {
    top: 30px;
    right: -5px;
    bottom: 5px;
    position: absolute;
    cursor: e-resize;
    width: 5px;
}
.dialog .main .winSize {
    top: 30px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    position: absolute;
    display: none;
}
.dialog .main .winSize .sizeText {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -50px 0 0 -180px;
    width: 360px;
    height: 50px;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 42px;
    color: #ccc;
    text-align: center;
}
.dialog-max {
    position: absolute;
    background: #c0c0c0 url(@/assets/images/desktop/frame.png) repeat-x left top;
    margin-top: 0;
    padding: 0;
    top: 0!important;
    left: 0!important;
    width: 100%!important;
    height: 100%!important;
}
.dialog-max .bar {
    color: #5f5f5f;
    padding: 5px 0;
    height: 32px;
}
.dialog-max .bar img {
    float: left;
    width: 24px;
    height: 24px;
    padding: 2px 0 2px 8px;
}
.dialog-max .bar .title {
    float: left;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 14px;
    margin-top: 4px;
    margin-left: 4px;
}
.dialog-max .bar .close {
    float: right;
    cursor: pointer;
    margin: 5px 5px 0 5px;
    width: 24px;
    height: 24px;
    background: url(@/assets/images/desktop/dialog-bt.png) no-repeat;
    background-position: 0 -166px;
}
.dialog-max .bar .max {
    float: right;
    cursor: pointer;
    margin: 3px 5px 0 5px;
    width: 24px;
    height: 24px;
    background: url(@/assets/images/desktop/dialog-bt.png) no-repeat;
    background-position: 0 -117px;
}
.dialog-max .bar .min {
    float: right;
    cursor: pointer;
    margin: 3px 5px 0 5px;
    width: 24px;
    height: 24px;
    background: url(@/assets/images/desktop/dialog-bt.png) no-repeat;
    background-position: 0 -20px;
}
.dialog-max .main {
    top: 38px;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
}
.dialog-max .main .leftbar {
    top: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    cursor: e-resize;
    width: 0;
}
.dialog-max .main .content {
    margin-left: 0;
    margin-right: 0;
    height: 100%;
    background: white url(@/assets/images/desktop/ntp_background.png) repeat left bottom;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
}
.dialog-max iframe {
    height: 100%;
    width: 100%;
}
.dialog-max .main .rightbar {
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    cursor: e-resize;
    width: 0;
}
.dialog-max .foot {
    height: 0;
}
.dialog .barMove {
    position: absolute;
    top: 0;
    left: 36px;
    right: 100px;
    cursor: move;
    color: #5f5f5f;
    padding: 3px;
    height: 32px;
}
</style>
