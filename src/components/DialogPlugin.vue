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
                    <div class="leftbar"  @mousedown="leftbarDown($event,index)" @mouseup="leftbarUp()"></div>
                    <div class="winSize"><div class="sizeText">^_^&nbsp;窗体调整中...</div></div>
                    <div class="content">
                        <iframe :src="item.appUrl+'/index.html'" frameborder="0" marginwidth="0" marginheight="0"></iframe>
                    </div>
                    <div class="rightbar" @mousedown="rightbarDown($event,index)" @mouseup="rightbarUp()"></div>
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
                beginbarLeft:0,
                beginbarRight:0,
                ifMax:false,
                ifMin:false,
                DzIndex:0,
                zindex:500,
                index:0,
                location:{}
            }
        },
        props:['showDialogPlugin','listApp'],
        watch: {
            listApp: function (newListApp) {
                for (let i = 0; i < newListApp.length; i++) {
                    this.location[i]={'ifMax':false}
                }
            }
        },
        methods: {
            barMoveDown:function(event,index){
                this.index=index;
                var maxZindex = this.getDialogZindexMax();
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
                this.beginTop = event.clientY - parseInt($("#dialogPlugin-"+this.index).css("top"));
                this.beginLeft = event.clientX - parseInt($("#dialogPlugin-"+this.index).css("left"));
            },
            clickMax:function(index){
                if(this.location[index].ifMax){
                    this.ifMax=false;
                    this.playSound("rest");
                    $("#dialogPlugin-"+index).removeClass();
                    $("#dialogPlugin-"+index).addClass("dialogPlugin");
                    $("#dialogPlugin-"+index).css("z-index", this.DzIndex);
                    var thisLocation =  this.location[index];
                    $("#dialogPlugin-"+index).animate({
                        top:thisLocation.Dtop,
                        left: thisLocation.Dleft,
                        width: thisLocation.Dwidth,
                        height:thisLocation.Dheight,
                        avoidTransforms: false,
                        useTranslate3d: true
                    }, "normal", function() {
                        $("#dialogPlugin-"+index).find(".content iframe").fadeIn("fast")
                    });
                    this.location[index].ifMax = false;
                }else{
                    this.ifMax=true;
                    this.playSound("max");
                    var pluginLocation = {
                        'Dtop' : parseInt($("#dialogPlugin-"+index).css("top")),
                        'Dleft' : parseInt($("#dialogPlugin-"+index).css("left")),
                        'Dwidth' : parseInt($("#dialogPlugin-"+index).css("width")),
                        'Dheight' : parseInt($("#dialogPlugin-"+index).css("height")),
                        'ifMax' : true
                    }
                    this.location[index]=pluginLocation;
                    this.DzIndex = this.getDialogZindexMax();
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
                });
                this.location[index].ifMax = false;
            },
            setDialogPlugin:function (index) {
                var list = this.listApp;
                for (let i = 0; i < list.length; i++) {
                    if(index==i){
                        this.setTaskActive(list[i].appID)
                    }else{
                        this.setTaskNormal(list[i].appID)
                    }
                }
            },
            setTaskActive:function (appID) {
                $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
                $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItemActive")
            },
            setTaskNormal:function (appID) {
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
            leftbarDown:function (event,index) {
                this.index=index;
                var maxZindex = this.getDialogZindexMax();
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
                this.beginbarLeft = event.clientX + parseInt($("#dialogPlugin-"+this.index).css("width"));
                $(document).bind("mousemove", this.leftbarGo);

                this.setDialogPlugin(index);
            },
            leftbarUp:function(){
                $("#dialogPlugin-"+this.index).find(".winSize").css({
                    'display':'none'
                })
                $("#dialogPlugin-"+this.index).find(".content").find('iframe').css({
                    'display':'block'
                })
            },
            leftbarGo:function(event){
                var width = (this.beginbarLeft - event.clientX);
                var left = event.clientX ;
                $("#dialogPlugin-"+this.index).css({
                    width:width,
                    left:left
                })
                this.beginbarLeft = event.clientX + parseInt($("#dialogPlugin-"+this.index).css("width"));
            },
            rightbarDown:function (event,index) {
                this.index=index;
                var maxZindex = this.getDialogZindexMax();
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

                this.beginbarRight = parseInt($("#dialogPlugin-"+this.index).css("width")) - event.clientX;
                $(document).bind("mousemove", this.rightbarGo);

                this.setDialogPlugin(index);
            },
            rightbarUp:function(){
                $("#dialogPlugin-"+this.index).find(".winSize").css({
                    'display':'none'
                })
                $("#dialogPlugin-"+this.index).find(".content").find('iframe').css({
                    'display':'block'
                })
            },
            rightbarGo:function(event){
                var width =   (this.beginbarRight + event.clientX);
                $("#dialogPlugin-"+this.index).css({
                    width:width
                })
                this.beginbarRight = parseInt($("#dialogPlugin-"+this.index).css("width")) - event.clientX;
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
