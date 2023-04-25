<template>
    <div class="LoginPage" ref="htm">
        <div id="loginContainer" class="desktopLogin"> 
            <div id="loginFrame" class="desktop">
                <div id="loginWrapper" class="loginWrapper">
                    <img :src="require('/public/static/images/'+tadayPic)" onerror="this.style.display='none'">
                </div>
                <div id="loginPannelFrame" class="loginPannelFrame">
                    <div id="loginFrame_Panel_Time" class="loginTime">{{ hour }}:{{ minutes }}</div>
                    <div id="loginFrame_Panel_Date" class="loginDate">{{ month }}月{{ date }}日 {{ week }}</div>
                    <div id="loginFrame_Panel_Load" class="loginLoading"></div>
                    <div id="loginFrame_Panel_Form" class="loginForm">	
                        <div class="loginTitle">欢迎</div>	
                        <div class="loginsubTitle">回来，精彩有你 . . .</div>	
                        <div class="loginUser">
                            帐 号：<input type="text" v-model="username" name="userName" id="userName" class="loginText" placeholder="请输入帐号" autocomplete="on" required="required">
                        </div>	
                        <div class="loginPass">
                            口 令：<input type="password" v-model="password" name="passWord" id="passWord" class="loginText" placeholder="请输入口令" required="required">
                        </div>	
                        <div id="loginFrame_Panel_Info" class="loginInfo">&nbsp;</div>	
                        <div id="loginFrame_Panel_Slider" class="loginSlider">
                            <div class="track">
                                <div class="track-message" :style="{opacity:this.msgOpt}">移动滑块来登录</div>
                                <div class="handle" ref="handle" @mousedown="mousedown" @mouseup="mouseup" :style="{left:this.moveLeft + 'px'}"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loginCopyright">©2023 small-Y-KH</div>
        </div>
    </div>
</template>

<script>
import {Login} from '../API/api.js'
import VueCookies from 'vue-cookies'
import { getLunar } from 'chinese-lunar-calendar'
import $ from "jquery";
import toastr from "../../public/Toaster/toastr.js";
import {encrypt} from '@/common/crypto'

export default {
    name: 'LoginPage',
    data() {
        return {
            year: 0,
            month: 0,
            date: 0,
            hour: 0,
            minutes: 0,
            day: 0,
            week: '',
            tadayPic:'default.jpg',
            beginleft:0,
            moveLeft:0,
            min : 0,
            max : 218,
            msgOpt : 1,
            username:'',
            password:'',
        }
    },
    created(){
        var userData = VueCookies.get('TUser');
        // console.log(userData)
        if(userData.loginStatus){
            console.log('/')
            location.href = "/DeskTop"
        }
    },
    methods: {
        init:function () {
            var now = new Date();
            this.year = now.getFullYear();
            this.month = now.getMonth() + 1;
            this.date = now.getDate();
            this.hour = now.getHours();
            this.minutes = now.getMinutes();
            this.day = now.getDay();
            this.week = now.getSysWeek();
        },
        initHandle:function () {
            $('#loginFrame_Panel_Form').css({'left':'50%','opacity':1,'transition-property':'all','transition-duration':'0s','transition-timing-function':'ease'})
            var handle = this.$refs.handle;
            var htm = this.$refs.htm;
            
            handle.addEventListener('mousedown', (e)=> {
                this.beginleft = e.clientX;
                htm.addEventListener('mousemove', this.setLeft)
            })
            htm.addEventListener('mouseup', ()=> {
                htm.removeEventListener('mousemove',this.setLeft)
                if(this.moveLeft<=this.max){
                    this.reset()   
                }
                if($(handle).css("left").replace(/[^0-9]/g, "") == this.max){
                    this.login();
                }
            })
        },
        setLeft:function (e) {
            this.moveLeft = e.pageX-this.beginleft;
            this.msgOpt = Math.max(0, 1 - 2 * this.moveLeft / this.max);
            if(this.moveLeft<=this.min){
                this.moveLeft=this.min
            }else if(this.moveLeft>=this.max){
                this.moveLeft=this.max
            }
        },
        reset:function () {
            this.moveLeft=0;
            var handle = this.$refs.handle;
            handle.animate({
                left: 0
            }, 400);
            handle.animate({
                opacity: 1
            }, 400)
        },
        getTodayPic:function () {
            var trans=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
            
            // 获取农历
            var getLunarDay = getLunar(this.year, this.month, this.date)
            var solarTerm = getLunarDay.solarTerm;
            if(!solarTerm){
                this.tadayPic='wrapper/day'+this.day+'.jpg';
            }else{
                var i = trans.length;
                while (i--) {
                    if (trans[i] === solarTerm) {
                        this.tadayPic='wrapper/SolarTerm'+i+'.jpg';
                    }
                }
            }
        },
        login:function () {
            if(this.username==''){
                toastr.warning('请输入您的用户名！')
                $("#userName").focus();
                this.playSound('warn');
            }else{
                if(this.password==''){
                    toastr.warning('请输入您的密码！')
                    $("#password").focus();
                    this.playSound('warn');
                }else{
                    $('#loginFrame_Panel_Load').css('display','block')
                    this.postLogin();
                }
            }
        },
        postLogin:function () {
            //进入桌面
            const name = this.username;
            const pass = encrypt(this.password)
            Login('api/Login',{name:name,pass:pass}).then(res=>{
                
                console.log(res);
                if(res.status==200){
                    var data = res.data;
                    console.log('已登录，进入桌面！')
                    VueCookies.set('TUser',data)
                    this.playSound('desktop');
                    location.href = "/DeskTop"
                }
                },err=>{
                    console.log(err);
                    toastr.warning('服务器错误！'+err.message)
            });
        },
        playSound:function (soundType) {
            var soundTag = document.getElementById(soundType+"_sound");
            soundTag.play();
        }
    },
    mounted(){
        this.init();
        this.initHandle();
        this.getTodayPic();
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
    background: transparent url(/public/static/images/default.jpg) repeat center top;
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
    background: transparent url(/public/static/images/waiting.gif) no-repeat center center;
    display: none
}
.loginForm {
    position: absolute;
    width: 400px;
    height: 300px;
    left: -200px;
    top: 50%;
    margin: -150px 0 0 -200px;
    color: #fff;
    overflow: hidden;
    background: url("/public/static/images/loginframe.png") no-repeat;
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
    background-image: url(/public/static/images/lock-slider.png);
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
    background-image: url(/public/static/images/lock-slider2.png)
}
  </style>