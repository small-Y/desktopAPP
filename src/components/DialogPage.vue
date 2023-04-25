<template>
    <div class="DialogPage" v-if="showDialog">
        <div id="dialog" class="dialog" :style="{'width':width,'height':height,'left':this.moveLeft + 'px','top':this.moveTop + 'px'}">
            <div class="bar">
                <img src="/static/images/user/thingslabs.png" alt="" border="0" onmousedown="return false">
                <span class="title">{{ title }}</span>
                <a class="close" @click="$emit('clickClose')"></a>
            </div>
            <div class="main">
                <div class="leftbar"></div>
                <div class="content">
                    <div class="msgBox">
                        <div v-if="menuType=='loginOut'">
                            <div class="msgIcon">
                                <img src="/static/images/desktop/warn.png" alt="" width="64" height="64" border="0">
                            </div>
                            <div class="msgText">   您确定要注销ThingsOS桌面吗？</div>
                        </div>
                        <div  v-else-if="menuType=='userSign'">
                            <div class="msgInput">请输入您的信息：<br><input type="text" id="msgInput"></div>
                        </div>
                        <div v-else-if="menuType=='userPic'">
                            <div class="msgInput">
                                <form name="form" action="" method="POST" enctype="multipart/form-data">
                                    请选择您的图片：<br>
                                    <input id="fileToUpload" type="file" size="30" name="fileToUpload" accept="image/*">
                                </form>
                            </div>
                        </div>
                        <div v-else-if="menuType=='userPass'">
                            <div class="msgPass">
                                旧的密码：<input type="password" id="oldPass"><br>
                                新的密码：<input type="password" id="newPass1"><br>
                                确认密码：<input type="password" id="newPass2">
                            </div>
                        </div>
                        <div class="operate">
                            <a id="okBtn" class="inputButton" @click="$emit('clickOk')"> 确 定 </a>
                            <span style="margin:0 10px"></span>
                            <a id="cancelBtn" class="inputButton" @click="$emit('clickCancel')"> 取 消 </a>
                        </div>
                    </div>
                </div>
                <div class="rightbar"></div>
            </div>
            <div class="foot"></div>
            <div class="mask"></div>
            <div class="barMove" @mousedown="barMoveDown" @mouseup="barMoveUp"></div>
        </div>
        <div id="dialog-2-overlay" class="dialog-overlay"></div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: 'DialogPage',
    data() {
        return {
            moveLeft:732,
            moveTop:366,
            beginLeft:0,
            beginTop:0,
        }
    },
    props:['title','width','height','showDialog','menuType'],
    methods: {
        barMoveDown:function(event){
            this.showSize=true;
            console.log(event)
            console.log(event.clientX,'坐标',event.clientY)
            this.beginTop = event.clientY - parseInt($("#dialog").css("top"));
            this.beginLeft = event.clientX - parseInt($("#dialog").css("left"));
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
    }
}
</script>

<style>

</style>
  