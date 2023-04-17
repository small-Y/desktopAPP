<template>
  <li id="desktopFrame1_Panel_Task_">
    <div class="icon">
        <div class="label">
            <em>个人中心</em>
            <span class="pointer"></span>
        </div>
    </div>
    <div id="desktopFrame1_Panel_Task_0CB4D644-896A-4ADA-9D5F-58448BD04498_Button" class="ButtonItemActive">
        <img src="@/webApp/Account/user.png" onmousedown="return false;">
    </div>
  </li>
    
</template>

<script>
export default {
    name:'PannelTask',
    props:[],

}
</script>

<style>
.taskbar .TaskButton li .icon {
    line-height: 20px;
}
.taskbar .TaskButton li .label {
    position: absolute;
    top: 45px;
    display: none;
    width: 150px;
    margin-left: -50px;
    text-align: center;
    color: #FFF;
}
.taskbar .TaskButton li .label em {
    display: inline-block;
    padding: 1px 10px;
    font-style: normal;
    background: #000;
    background: rgba(0,0,0,.3);
    border: rgba(255,255,255,0.3);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
}
.taskbar .TaskButton li .label .pointer {
    position: absolute;
    bottom: -5px;
    top: -5px;
    left: 75px;
    margin-left: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 0;
    border-bottom: 5px solid rgba(0,0,0,.3);
}
.taskbar .TaskButton .ButtonItemActive {
    cursor: pointer;
    width: 50px;
    height: 38px;
    border-top: 2px solid rgba(255,255,255,1);
    background: rgba(255,255,255,.4);
}
.taskbar .TaskButton li img {
    width: 32px;
    height: 32px;
    padding: 3px 9px 4px 9px;
}
</style>