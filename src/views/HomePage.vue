<template>
    <div class="desktopHome">
        <div class="startPage">
            <div id="startingCover">
              <div id="startingLogo">
                  <img src="/static/images/logo.png" width="120" height="120" border="0" alt />
              </div>
              <div id="startingText">Starting ...</div>
              <div id="startingBar"></div>
            </div>
        </div>
        <router-view> </router-view>
    </div>
</template>

<script setup>

import VueCookies from 'vue-cookies'
import {getLogin} from '@/API/api.js'
import { useRouter } from 'vue-router'
const router = useRouter()
setTimeout(() => {
    oneTimeLogin();
    var timer;
    clearInterval(timer==''?timer:'');
    timer = setInterval(() => {
        // console.log('实时登录验证')
        oneTimeLogin();
    }, 2000);
}, 500);

function oneTimeLogin() {
    var userData = VueCookies.get('TUser');
    var username = '';
    if(userData) {
        username = userData.username;
    }
    getLogin('api/getLogin',{username:username}).then(res=>{
        if(JSON.stringify(res.data) == "{}"){
            // console.log('/')
            router.push({ name: 'Login'})
        }
        if(res.status==200){
            var data = res.data;
            if(data.loginStatus){
              router.push({name: 'DeskTop' })
              VueCookies.set('TUser',data)
            }else{
              router.push({name: 'Login' })
              VueCookies.set('TUser',data)
            }
        }
    },err=>{
            console.log(err);
        
    });
}
playSound('start')
function playSound(soundType) {
    var soundTag = document.getElementById(soundType+"_sound");
    soundTag.play()
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background: black;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  user-select: none;
}
#startingCover {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000000;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
#startingLogo {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -60px;
  width: 120px;
  height: 120px;
  animation-name: startingLogoAnimation;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
#startingText {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 60px 0 0 -80px;
  width: 160px;
  height: 50px;
  font-family: Arial, Tahoma, 微软雅黑;
  font-size: 20px;
  color: white;
  text-shadow: #666 1px 1px 2px;
  text-align: center;
  cursor: default;
}
@keyframes startingLogoAnimation {
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}
#startingBar {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 90px 0 0 -60px;
  width: 120px;
  height: 1px;
  overflow: hidden;
  font-size: 0;
  border: 1px solid #999;
  background: black url("/public/static/images/starting_bar.gif");
}
</style>
  