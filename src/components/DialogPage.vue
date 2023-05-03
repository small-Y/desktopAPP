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
                            <div class="msgInput">请输入您的信息：<br><input v-model="userSign" type="text" id="msgInput"></div>
                        </div>
                        <div v-else-if="menuType=='userPic'">
                            <div class="msgInput">
                                <form name="form" action="" method="POST" enctype="multipart/form-data">
                                    请选择您的图片：<br>
                                    <input id="fileToUpload" type="file" size="30" name="" accept="image/*" @change="$emit('changeUserPic',$event)">
                                </form>
                            </div>
                        </div>
                        <div v-else-if="menuType=='userPass'">
                            <div class="msgPass">
                                旧的密码：<input type="password" id="oldPass"><br>
                                新的密码：<input type="password" id="newPass1" v-model="changeNewPass1"><br>
                                确认密码：<input type="password" id="newPass2" v-model="changeNewPass2">
                            </div>
                            <div class="LVCheck"></div>
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
import VueCookies from 'vue-cookies'
export default {
    name: 'DialogPage',
    data() {
        return {
            moveLeft:732,
            moveTop:366,
            beginLeft:0,
            beginTop:0,
            userSign:'',
            changeNewPass1:'',
            changeNewPass2:'',
            level:0
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
        init:function(){
            var userData = VueCookies.get('TUser');
            this.userSign = userData.userSign;
        },
        checkPass:function(pass){
            this.level=0;
            if(pass.length8 >= 8){
                this.level++;
            }
            if(/\d/.test(pass)){
                this.level++;
            }
            if(/[a-z]/.test(pass)){
                this.level++;
            }
            if(/[A-Z]/.test(pass)){
                this.level++;
            }
            if(/\W/.test(pass)){
                this.level++;
            }
        }
    },
    watch: {
        changeNewPass1:function (newchangeNewPass1) {
            this.checkPass(newchangeNewPass1);
        },
        changeNewPass2:function (newchangeNewPass2) {
            this.checkPass(newchangeNewPass2);
        },
        level:function (newlevel) {
            console.log(newlevel)
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>
.LvCheck::before {
    width: 100%;
    background: #0f0;
    filter: drop-shadow(0px 0px 5px #0f0) drop-shadow(0px 0px 10px #0f0) drop-shadow(0px 0px 20px #0f0);
}
</style>
  