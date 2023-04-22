<template>
    <div class="DialogPlugin" v-if="showDialogPlugin">
        <div id="DialogPlugin_item" v-for="(item, index) in listApp" :key="item.appID">
            <div :id="'dialog-'+index" class="dialog" :style="{'width':item.width + 'px','height':item.height + 'px'}">
                <div class="bar">
                    <img :src="item.appUrl+item.icons">
                    <span class="title">{{item.shortName}}</span>
                    <a class="close" @click="$emit('clickClose',item.appID)"></a>
                    <a class="max" @click="clickMax(index)"></a>
                    <a class="min" @click="clickMin(index)"></a>
                </div>
                <div class="main">
                    <div class="leftbar"></div>
                    <div class="winSize"><div class="sizeText">^_^&nbsp;窗体调整中...</div></div>
                    <div class="content">
                        <iframe src="/webApp/Account/index.html" frameborder="0" marginwidth="0" marginheight="0"></iframe>
                    </div>
                    <div class="rightbar"></div>
                </div>
                <div class="foot"></div>
                <div class="mask"></div>
                <div class="barMove" @mousedown="barMoveDown($event,index)" @mouseup="barMoveUp()"></div>
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
                beginLeft:0,
                beginTop:0,
                ifMax:false,
                ifMin:false,
                Dtop:0,
                Dleft:0,
                Dwidth:0,
                Dheight:0,
                DzIndex:0,
                index:0
            }
        },
        props:['showDialogPlugin','listApp'],
        methods: {
            barMoveDown:function(event,index){
                this.index=index;
                this.zindex = $("#dialog-"+index).css('z-index');
                if(this.zindex=='auto'){
                    this.zindex=500;
                }
                this.zindex=parseInt(this.zindex)+10;
                $("#dialog-"+this.index).css({
                    'z-index':this.zindex
                });
                $("#dialog-"+this.index).find(".winSize").css({
                    'display':'block'
                })
                $("#dialog-"+this.index).find(".content").css({
                    'display':'none'
                })

                this.beginTop = event.clientY - parseInt($("#dialog-"+index).css("top"));
                this.beginLeft = event.clientX - parseInt($("#dialog-"+index).css("left"));
                $(document).bind("mousemove", this.moveGo);

                this.setDialogPlugin(index);
            },
            barMoveUp:function(){
                $("#dialog-"+this.index).find(".winSize").css({
                    'display':'none'
                })
                $("#dialog-"+this.index).find(".content").css({
                    'display':'block'
                })
            },
            moveGo:function(event){
                var top = (event.clientY - this.beginTop);
                var left = (event.clientX - this.beginLeft);
                $("#dialog-"+this.index).css({
                    top:top,
                    left:left
                })
            },
            clickMax:function(index){
                if(this.ifMax){
                    this.ifMax=false;
                    this.playSound("rest");
                    $("#dialog-"+index).removeClass();
                    $("#dialog-"+index).addClass("dialog");
                    $("#dialog-"+index).css("z-index", this.DzIndex);
                    $("#dialog-"+index).animate({
                        top: this.Dtop,
                        left: this.Dleft,
                        width: this.Dwidth,
                        height: this.Dheight,
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "normal", function() {
                        $("#dialog-"+index).find(".content iframe").fadeIn("fast")
                    });
                }else{
                    this.ifMax=true;
                    this.playSound("max");
                    this.Dtop = parseInt($("#dialog-"+index).css("top"));
                    this.Dleft = parseInt($("#dialog-"+index).css("left"));
                    this.Dwidth = parseInt($("#dialog-"+index).css("width"));
                    this.Dheight = parseInt($("#dialog-"+index).css("height"));
                    this.DzIndex = parseInt($("#dialog-"+index).css("z-index"));
                    $("#dialog-"+index).find(".content iframe").hide(),
                    $("#dialog-"+index).css("z-index", 1000000),
                    $("#dialog-"+index).animate({
                        top: 0,
                        left: 0,
                        width: $(window).width(),
                        height: $(window).height(),
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "fast", function() {
                        $("#dialog-"+index).removeClass();
                        $("#dialog-"+index).addClass("dialog-max");
                        $("#dialog-"+index).find(".content iframe").fadeIn("fast")
                    });
                }
            },
            clickMin:function(index){
                this.playSound("min");
                this.Dtop = parseInt($("#dialog-"+index).css("top"));
                this.Dleft = parseInt($("#dialog-"+index).css("left"));
                this.Dwidth = parseInt($("#dialog-"+index).css("width"));
                this.Dheight = parseInt($("#dialog-"+index).css("height"));
                this.DzIndex = parseInt($("#dialog-"+index).css("z-index"));
                $("#dialog-"+index).animate({
                    top: -$(window).height() - 40,
                    opacity: 0,
                    avoidTransforms: false,
                    useTranslate3d: true
                }, "normal", function() {
                    $("#dialog-"+index).removeClass();
                    $("#dialog-"+index).addClass("dialog");
                    $("#dialog-"+index).css("z-index", -1);
                })
            },
            setDialogPlugin:function (index) {
                console.log('index'+index)
                var list = this.listApp;
                for (let i = 0; i < list.length; i++) {
                    console.log(i)
                    if(index==i){
                        this.setTaskActive(list[i].appID)
                    }else{
                        this.setTaskNormal(list[i].appID)
                    }
                }
            },
            setTaskActive:function (appID) {
                console.log('active: '+appID)
                $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
                $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItemActive")
            },
            setTaskNormal:function (appID) {
                console.log('normal: '+appID)
                $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
                $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItem")
            },
            playSound:function(soundType){
                var soundTag = document.getElementById(soundType+"_sound");
                soundTag.play()
            }
        },
        mounted(){
            $(document).bind("mouseup", function() {
                $("#dialog-"+this.index).find(".winSize").css({
                    'display':'none'
                })
                $("#dialog-"+this.index).find(".content").css({
                    'display':'block'
                })
                $(document).unbind("mousemove")
            });
        }
    }
</script>

<style>
.dialog {
    position: absolute;
    top: 110px;
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
.DialogPlugin iframe{
    width: 100%;
    height: 100%;
}
</style>
