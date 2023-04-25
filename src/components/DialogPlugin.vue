<template>
    <div class="DialogPlugin" v-if="showDialogPlugin">
        <div id="DialogPlugin_item" v-for="(item, index) in listApp" :key="item.appID">
            <div :id="'dialogPlugin-'+index" class="dialogPlugin" :style="{'width':item.width + 'px','height':item.height + 'px','z-index':this.zindex+index+1}">
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
                        <iframe :src="item.appUrl+'/index.html'" frameborder="0" marginwidth="0" marginheight="0"></iframe>
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
                zindex:500,
                index:0
            }
        },
        props:['showDialogPlugin','listApp'],
        methods: {
            barMoveDown:function(event,index){
                this.index=index;
                var maxZindex = this.getDialogZindexMax();
                console.log(maxZindex);
                maxZindex++;
                $("#dialogPlugin-"+this.index).css({
                    'z-index':maxZindex
                });
                $("#dialogPlugin-"+this.index).find(".winSize").css({
                    'display':'block'
                })
                $("#dialogPlugin-"+this.index).find(".content").find('iframe').css({
                    'display':'none'
                })

                this.beginTop = event.clientY - parseInt($("#dialogPlugin-"+index).css("top"));
                this.beginLeft = event.clientX - parseInt($("#dialogPlugin-"+index).css("left"));
                $(document).bind("mousemove", this.moveGo);

                this.setDialogPlugin(index);
            },
            barMoveUp:function(){
                $("#dialogPlugin-"+this.index).find(".winSize").css({
                    'display':'none'
                })
                $("#dialogPlugin-"+this.index).find(".content").find('iframe').css({
                    'display':'block'
                })
            },
            moveGo:function(event){
                var top = (event.clientY - this.beginTop);
                var left = (event.clientX - this.beginLeft);
                $("#dialogPlugin-"+this.index).css({
                    top:top,
                    left:left
                })
            },
            clickMax:function(index){
                if(this.ifMax){
                    this.ifMax=false;
                    this.playSound("rest");
                    $("#dialogPlugin-"+index).removeClass();
                    $("#dialogPlugin-"+index).addClass("dialogPlugin");
                    $("#dialogPlugin-"+index).css("z-index", this.DzIndex);
                    $("#dialogPlugin-"+index).animate({
                        top: this.Dtop,
                        left: this.Dleft,
                        width: this.Dwidth,
                        height: this.Dheight,
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "normal", function() {
                        $("#dialogPlugin-"+index).find(".content iframe").fadeIn("fast")
                    });
                }else{
                    this.ifMax=true;
                    this.playSound("max");
                    this.Dtop = parseInt($("#dialogPlugin-"+index).css("top"));
                    this.Dleft = parseInt($("#dialogPlugin-"+index).css("left"));
                    this.Dwidth = parseInt($("#dialogPlugin-"+index).css("width"));
                    this.Dheight = parseInt($("#dialogPlugin-"+index).css("height"));
                    this.DzIndex = parseInt($("#dialogPlugin-"+index).css("z-index"));
                    $("#dialogPlugin-"+index).find(".content iframe").hide(),
                    $("#dialogPlugin-"+index).css("z-index", 1000000),
                    $("#dialogPlugin-"+index).animate({
                        top: 0,
                        left: 0,
                        width: $(window).width(),
                        height: $(window).height(),
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "fast", function() {
                        $("#dialogPlugin-"+index).removeClass();
                        $("#dialogPlugin-"+index).addClass("dialogPlugin-max");
                        $("#dialogPlugin-"+index).find(".content iframe").fadeIn("fast")
                    });
                }
            },
            clickMin:function(index){
                this.playSound("min");
                this.Dtop = parseInt($("#dialogPlugin-"+index).css("top"));
                this.Dleft = parseInt($("#dialogPlugin-"+index).css("left"));
                this.Dwidth = parseInt($("#dialogPlugin-"+index).css("width"));
                this.Dheight = parseInt($("#dialogPlugin-"+index).css("height"));
                this.DzIndex = parseInt($("#dialogPlugin-"+index).css("z-index"));
                $("#dialogPlugin-"+index).animate({
                    top: -$(window).height() - 40,
                    opacity: 0,
                    avoidTransforms: false,
                    useTranslate3d: true
                }, "normal", function() {
                    $("#dialogPlugin-"+index).removeClass();
                    $("#dialogPlugin-"+index).addClass("dialogPlugin");
                    $("#dialogPlugin-"+index).css("z-index", -1);
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
            getDialogZindexMax:function () {
                var myList = [];
                for (let i = 0; i < 20; i++) {
                    var myZindex = $("#dialogPlugin-"+i).css('z-index');
                    myList.push(myZindex?parseInt(myZindex):0);
                }
                var max = Math.max(...myList)
                return max
            },
            playSound:function(soundType){
                var soundTag = document.getElementById(soundType+"_sound");
                soundTag.play()
            }
        },
        mounted(){
            $(document).bind("mouseup", function() {
                $("#dialogPlugin-"+this.index).find(".winSize").css({
                    'display':'none'
                })
                $("#dialogPlugin-"+this.index).find(".content").find('iframe').css({
                    'display':'block'
                })
                $(document).unbind("mousemove")
            });
        }
    }
</script>

<style>

</style>
