<template>
    <div class="DialogPage" v-if="showDialog">
        <div id="dialog-2" class="dialog" :style="{'width':width,'height':height}">
            <div class="bar">
                <img src="@/assets/images/user/thingslabs.png" alt="" border="0" onmousedown="return false">
                <span class="title">{{ title }}</span>
                <a class="close" @click="$emit('clickClose')"></a>
            </div>
            <div class="main">
                <div class="leftbar"></div>
                <div class="content">
                    <div class="msgBox">
                        <div v-if="menuType=='loginOut'">
                            <div class="msgIcon">
                                <img src="@/assets/images/desktop/warn.png" alt="" width="64" height="64" border="0">
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
            <div class="barMove"></div>
        </div>
        <div id="dialog-2-overlay" class="dialog-overlay"></div>
    </div>
</template>

<script>
export default {
    name: 'DialogPage',
    data() {
        return {

        }
    },
    props:['title','width','height','showDialog','menuType'],
    methods: {

    }
}
</script>

<style>
.dialog-overlay {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 937px;
    z-index: 503;
    position: absolute;
    opacity: 1;
    transition-property: all;
    transition-duration: 0s;
    transition-timing-function: ease;
    background: transparent url(@/assets/images/desktop/overlay1.png) repeat center top;
}
.dialog {
    z-index: 504;
    position: absolute;
    top: 366px;
    left: 732px;
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
.dialog .main .content .msgBox {
    width: 100%;
    height: 100%;
    background: #fff;
}
.dialog .main .content .msgBox .msgIcon {
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
    text-align: center;
    vertical-align: middle;
    position: relative;
    display: table-cell;
}
.dialog .main .content .msgBox .msgText {
    height: 80px;
    top: 0;
    left: 0;
    padding-right: 10px;
    text-align: left;
    vertical-align: middle;
    position: relative;
    display: table-cell;
    line-height: 20px;
    color: #000;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 15px;
}
.dialog .main .content .msgBox .operate {
    text-align: center;
    background: #f3f3f3;
    height: 40px;
    padding-top: 15px;
    border-top: 1px solid #c0c0c0;
}
.dialog .inputButton {
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    -webkit-user-select: none;
    background: -webkit-linear-gradient(#fafafa,#f4f4f4 40%,#e5e5e5);
    border: 1px solid #aaa;
    color: #444;
    margin-bottom: 0;
    min-width: 4em;
    padding: 3px 12px 3px 12px;
    cursor: pointer;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 15px;
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
.dialog .main .content .msgBox .msgInput {
    height: 65px;
    top: 0;
    left: 0;
    padding: 15px 25px;
    text-align: left;
    vertical-align: middle;
    position: relative;
    display: table-cell;
    line-height: 24px;
    color: #000;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 11pt;
}
.dialog .main .content .msgBox .msgInput input {
    width: 300px;
    border: 1px solid #ccc;
    font-size: 12pt;
}
.dialog .main .content .msgBox .msgPass {
    height: 65px;
    top: 0;
    left: 0;
    padding: 15px 25px;
    text-align: left;
    vertical-align: middle;
    position: relative;
    display: table-cell;
    line-height: 40px;
    color: #000;
    font-family: Arial,Tahoma,微软雅黑;
    font-size: 11pt;
}
</style>
  