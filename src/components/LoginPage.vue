<template>
    <div v-if="noDeskTop" ref="htm">
        <div class="LoginPage" >
            <div id="loginContainer" class="desktopLogin"> 
                <div id="loginFrame" class="desktop">
                    <div id="loginWrapper" class="loginWrapper">
                        <img :src="require('@/assets/images/'+tadayPic)" onerror="this.style.display='none'">
                    </div>
                    <div id="loginPannelFrame" class="loginPannelFrame">
                        <div id="loginFrame_Panel_Time" class="loginTime">16:52</div>
                        <div id="loginFrame_Panel_Date" class="loginDate">4月1日 星期六</div>
                        <div id="loginFrame_Panel_Load" class="loginLoading"></div>
                        <div id="loginFrame_Panel_Form" class="loginForm" style="left: 50%; opacity: 1; transition-property: all; transition-duration: 0s; transition-timing-function: ease;">	
                            <div class="loginTitle">欢迎</div>	
                            <div class="loginsubTitle">回来，精彩有你 . . .</div>	
                            <div class="loginUser">
                                帐 号：<input type="text" v-model="userName" name="userName" id="userName" class="loginText" placeholder="请输入帐号" autocomplete="on" required="required">
                            </div>	
                            <div class="loginPass">
                                口 令：<input type="password" v-model="password" name="passWord" id="passWord" class="loginText" placeholder="请输入口令" required="required">
                            </div>	
                            <div id="loginFrame_Panel_Info" class="loginInfo">&nbsp;</div>	
                            <div id="loginFrame_Panel_Slider" class="loginSlider">
                                <div class="track">
                                    <div class="track-message" :style="{opacity:this.msgOpt}">移动滑块来登录</div>
                                    <div class="handle" ref="loginSlider" @mousedown="mousedown" @mouseup="mouseup" :style="{left:this.moveLeft + 'px'}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loginCopyright">©2023 small-Y-KH</div>
            </div>
        </div>
    </div>
    <div v-else>
      <DeskTop />
    </div>
</template>

<script>
import {getTodayPic} from '../API/api.js'
import DeskTop from "./DeskTop";

import $ from "jquery";
import toastr from "../../public/Toaster/toastr.js";
// import axios from "axios";
export default {
    name: 'LoginPage',
    data() {
        return {
            tadayPic:'default.jpg',
            beginleft:0,
            moveLeft:0,
            min : 0,
            max : 218,
            msgOpt : 1,
            userName:'',
            password:'',
            noDeskTop:true
        }
    },
    components:{
        DeskTop,
    },
    mounted(){
        var loginSlider = this.$refs.loginSlider;
        var htm = this.$refs.htm;
        var that = this;
        
        loginSlider.addEventListener('mousedown', (e)=> {
            this.beginleft = e.clientX;
            htm.addEventListener('mousemove', setLeft)
        })
        htm.addEventListener('mouseup', ()=> {
            htm.removeEventListener('mousemove',setLeft)
            if(this.moveLeft<=this.max){
                reset()   
            }
            if($(loginSlider).css("left").replace(/[^0-9]/g, "") == this.max){
                login();
            }
        })
        function setLeft(e) {
            that.moveLeft = e.pageX-that.beginleft;
            that.msgOpt = Math.max(0, 1 - 2 * that.moveLeft / that.max);
            if(that.moveLeft<=that.min){
                that.moveLeft=that.min
            }else if(that.moveLeft>=that.max){
                that.moveLeft=that.max
            }
        }
        function reset() {
            that.moveLeft=0;
            loginSlider.animate({
                left: 0
            }, 400);
            loginSlider.animate({
                opacity: 1
            }, 400)
        }
        getTodayPic('deskData/getTodayPic.json').then(res=>{
            console.log(res);
            if(res.status==200){
                var data = res.data;
                that.tadayPic=data.imgWrapper;
            }
        },err=>{
         console.log(err);
         
        });
        function login() {
            if(that.userName==''){
                toastr.warning('请输入您的用户名！')
                $("#userName").focus();
                playSound('warn');
            }else{
                if(that.password==''){
                    toastr.warning('请输入您的密码！')
                    $("#password").focus();
                    playSound('warn');
                }else{
                    postLogin();
                }
            }
        }
        function postLogin() {
            //进入桌面
            playSound('desktop');
            if(that.userName=='haoyuwei'&&that.password=='hyw123'){
                that.noDeskTop=!that.noDeskTop;
            }
        }
        function playSound(soundType) {
            var soundTag = document.getElementById(soundType+"_sound");
            soundTag.play()
        }
        toastr.options = {
            "closeButton": true,//是否显示关闭按钮
            "debug": false,//是否使用debug模式
            "positionClass": "toast-bottom-right",//弹出窗的位置
            "onclick": null,
            "showDuration": "1000",//显示的动画时间
            "hideDuration": "1000",//消失的动画时间
            "timeOut": "8000",//展现时间
            "extendedTimeOut": "5000",//加长展示时间
            "showEasing": "swing",//显示时的动画缓冲方式
            "hideEasing": "linear",//消失时的动画缓冲方式
            "showMethod": "fadeIn",//显示时的动画方式
            "hideMethod": "fadeOut"//消失时的动画方式
        }
    }
}
</script>

<style>
.desktopLogin{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    font: 12px Arial,Tahoma,微软雅黑;
    color: #fff;
    cursor: default;
    opacity: 1;
    transition-property: all;
    transition-duration: 0s;
    transition-timing-function: ease;
}
.loginCopyright{
    position: absolute;
    left: 50%;
    top: 100%;
    margin: -25px 0 0 -100px;
    width: 200px;
    height: 25px;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 10.5px;
    color: #ccc;
    text-align: center;
    cursor: default;
}
.loginWrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: transparent url(../assets/images/default.jpg) repeat center top;
    z-index: -1;
}
.loginWrapper img{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    z-index:-1
}
.loginPannelFrame{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
.loginTime {
    position: absolute;
    left: 50%;
    top: 20px;
    width: 300px;
    margin: 0 0 0 -150px;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 60px;
    color: #fff;
    text-align: center
}
.loginDate {
    position: absolute;
    left: 50%;
    top: 86px;
    width: 300px;
    margin: 0 0 0 -150px;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 16px;
    color: #fff;
    text-align: center
}
.loginLoading {
    position: absolute;
    width: 124px;
    height: 124px;
    left: 50%;
    top: 50%;
    margin: -62px 0 0 -62px;
    background: transparent url(../assets/images/waiting.gif) no-repeat center center;
    display: none
}
.loginForm {
    position: absolute;
    width: 400px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin: -150px 0 0 -200px;
    color: #fff;
    overflow: hidden;
    background: url("../assets/images/loginframe.png") no-repeat;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    opacity: 0
}
.loginTitle {
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 48px;
    height: 60px;
    left: 60px;
    top: 25px;
    position: absolute
}

.loginsubTitle {
    position: absolute;
    left: 160px;
    top: 63px;
    font-size: 16px;
    color: #eee
}

.loginUser {
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 16px;
    height: 40px;
    left: 95px;
    top: 110px;
    position: absolute
}

.loginPass {
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 16px;
    height: 40px;
    left: 95px;
    top: 150px;
    position: absolute
}

.loginInfo {
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 16px;
    height: 20px;
    color: #cff;
    left: 122px;
    top: 180px;
    position: absolute
}

.loginText {
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 16px;
    color: white;
    width: 150px;
    height: 18px;
    padding: 0 5px 2px 5px;
    border: 0 solid transparent;
    border-bottom: 1px solid #ddd;
    background-color: transparent;
    -webkit-appearance: none;
    outline: 0;
}

.loginSlider {
    width: 273px;
    height: 40px;
    left: 64px;
    top: 239px;
    position: absolute
}
.track {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    height: 42px
}

.track-message {
    width: 200px;
    height: 30px;
    left: 60px;
    top: 0;
    padding-top: 6px;
    position: relative;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 22px;
    text-align: center;
    background: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(0.4,#4d4d4d),color-stop(0.5,white),color-stop(0.6,#4d4d4d),color-stop(1,#4d4d4d));
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: slidetounlock 2.5s infinite;
    text-size-adjust: none
}

@keyframes slidetounlock {
    0% {
        background-position: -100px 0
    }

    100% {
        background-position: 100px 0
    }
}

.handle {
    background-image: url(../assets/images/lock-slider.png);
    cursor: pointer;
    width: 56px;
    height: 38px;
    left: 0px;
    top: -33px;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    border-radius: 7px;
    position: relative
}

.handle:hover {
    background-image: url(../assets/images/lock-slider2.png)
}
  </style>