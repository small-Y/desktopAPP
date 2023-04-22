<template>
  <div id="desktopcontiner" class="desktop">
    <div class="desktopWrapper">
      <img src="../assets/images/wrapper.jpg"  style="" onerror="this.style.display='none'">
    </div>
    <div id="desktopFrame1_Panel" class="desktopPanel">
      <div id="desktopFrame1_Panel_Task" class="taskbar">
        <div id="desktopFrame1_Panel_Task_System" class="SystemButton">
          <ul>
            <li>
              <div id="desktopFrame1_Panel_Task_home" class="HomeButton" @click="clickStartMenu"></div>
              <div class="StartMenu" v-show="showStartMenu">
                <div class="AppList"> 
                    <StartApp :installApp="installApp" @click-StartApp="clickStartApp"/>
                </div>
                <div class="UserOperate">
                  <div class="DoLock"><i class="fa fa-lock"></i>&nbsp;锁 定</div>
                  <div class="Logout"><i class="fa fa-sign-out"></i>&nbsp;注 销</div>
                </div>
                <span class="pointer"></span>
              </div>
            </li>
            <li>
              <div id="desktopFrame1_Panel_Task_apply" class="ApplyButton" @click="clickAppMenu"></div>
              <div class="AppMenu" v-show="showAppMenu">
                <div class="AppList">
                  <div class="tab1 active"></div>
                  <div class="tab1content"></div>
                  <div class="tab2"></div>
                  <div class="tab2content"></div>
                </div>
                <div class="AppSearch">
                  <div class="searchBtn"><i class="fa fa-search"></i></div>
                  <input type="text" class="searchKey" placeholder="搜索..." required="">
                  <div class="edit">管理</div>
                </div>
                <span class="Pointer"></span>
              </div>
            </li>
            <li>
              <div id="desktopFrame1_Panel_Task_theme" class="ThemeButton" @click="clickThemeMenu"></div>
              <div class="ThemeMenu" v-show="showThemeMenu">
                <div class="ThemeList">
                  <div class="tab1 active"></div>
                  <div class="tab1content"></div>
                  <div class="tab1"></div>
                  <div class="tab2content"></div>
                </div>
                <div class="ThemeSearch">					
                  <div class="searchBtn"><i class="fa fa-search"></i></div>					
                  <input type="text" class="searchKey" placeholder="搜索..." required="">					
                  <div class="edit">编 辑</div>				
                </div>
                <span class="pointer"></span>
              </div>
            </li>
          </ul>
        </div>
        <div id="desktopFrame1_Panel_Task_Button" class="TaskButton">
            <ul>
                <PannelTask :listApp="listApp" :showPannelTask="showPannelTask" @click-task="clickPannelTask"/>
            </ul>
        </div>
        <div id="desktopFrame1_Panel_Task_Status" class="TaskStatus">
          <div class="WeatherList" v-show="showWeatherList">			
            <span class="pointer"></span>			
            <div class="today">
              <ul v-show="ifShowWeatherListToday">
                <span class="weatherCity">{{ weatherCity }}</span>
                <div class="weatherIcon"><img :src="require('@/assets/images/weatherImg/'+weatherTodayImg+'.png')"></div>
                <span class="weatheriInfo">{{ temp }}℃</span>	
                <span class="weatherFeelsLike">{{ weatherFeelsLike }}</span>
                <span class="weatherText">{{ weatherText }}</span>
                <span class="weatherWindDir">{{ weatherWindDir }}</span>
                <span class="weatherHumidity">{{ weatherHumidity }}</span>
              </ul>
            </div>			
            <div class="future">
              <ul v-show="ifShowWeatherList">
                <li>
                    <span class="weatherBoxTitle">今天</span>
                    <div class="weatherBoxImg"><img :src="require('@/assets/images/weatherImg/'+weatherTodayImg+'.png')"></div>
                    <div class="weatherBoxTemp">{{ weatherTodayTempMin }}°/{{ weatherTodayTempMax }}°</div>
                    <div class="weatherBoxText">{{ weatherTodayTemptextDay }}</div>
                </li>
                <li>
                    <span class="weatherBoxTitle">明天</span>
                    <div class="weatherBoxImg"><img :src="require('@/assets/images/weatherImg/'+weatherMingImg+'.png')"></div>
                    <div class="weatherBoxTemp">{{ weatherMingTempMin }}°/{{ weatherMingTempMax }}°</div>
                    <div class="weatherBoxText">{{ weatherMingTemptextDay }}</div>
                </li>
                <li>
                    <span class="weatherBoxTitle">后天</span>
                    <div class="weatherBoxImg"><img :src="require('@/assets/images/weatherImg/'+weatherHouImg+'.png')"></div>
                    <div class="weatherBoxTemp">{{ weatherHouTempMin }}°/{{ weatherHouTempMax }}°</div>
                    <div class="weatherBoxText">{{ weatherHouTemptextDay }}</div>
                </li>
              </ul>
            </div>		
          </div>
          <div class="Search" v-show="showSearch">
            <input type="search" name="" placeholder="输入你要搜索的内容">&nbsp;&nbsp;&nbsp;<i class="fa fa-search"></i>
          </div>
          <div class="Message" @click="clickMessage">
            <img src="../assets/images/msg1.png">
            <div class="number" style="display: none;">0</div>
          </div>
          <div class="Weather" @click="clickWeather">			
            <div class="icon"><img :src="require('@/assets/images/Weather/'+weatherPng+'.png')"></div>			
            <div class="info">{{ temp }}℃</div>		
          </div>
          <div class="Sayma" @click="clickSayma"><img src="../assets/images/task.png"></div>
          <div class="Clock" @click="clickClock">{{ Time1 }} <br> {{ Time2 }}{{ CWeek }}</div>
          <div class="ClockList" v-show="showClockList">			
            <span class="pointer"></span>			
            <div class="now"></div>			
            <div class="today">
                <div>{{ymd}}&nbsp;{{ CWeek }}</div><div class="day">{{ day }}</div><div style="line-height: 22px;">{{ lunar }}<br>{{ lunarYear }}<br>{{ zodiac }}&nbsp;<br>{{ solarTerm }}</div>
            </div>		
          </div>
          <div class="Picture" @click="clickUserMenu"><img src="../assets/images/user/new.png"></div>
          <div class="UserMenu" v-show="showUserMenu">			
            <span class="pointer"></span>			
              <ul>				
                <li class="doUserInfo" @click="changeUserSign"><i class="fa fa-edit"></i>&nbsp;个性签名</li>				
                <li class="doUserPic" @click="changeUserPic"><i class="fa fa-camera"></i>&nbsp;上传头像</li>				
                <li class="doUserPass" @click="changeUserPass"><i class="fa fa-key"></i>&nbsp;修改密码</li>				
                <hr>				
                <li class="doUserCenter" @click="UserCenter"><i class="fa fa-user"></i>&nbsp;个人中心</li>				
                <li class="fullScreen" @click="fullScreen"><i class="fa fa-arrows-alt"></i>&nbsp;全屏模式</li>				
                <li class="exitScreen" @click="exitScreen"><i class="fa fa-arrows"></i>&nbsp;退出全屏</li>				
                <hr>				
                <li class="doUserLogout" @click="LiginOut"><i class="fa fa-sign-out"></i>&nbsp;注销退出</li>			
              </ul>		
            </div>
        </div>
        <div id="desktopFrame1_Panel_Task_ShowDesktop" class="TaskShowDesktop"></div>
      </div>
      <div id="desktopFrame1_Panel_Home" class="homepanel" @click="clickDesk">
        <div id="desktopFrame1_Panel_Dock" class="dock" style="display: block;">
            <div class="apps" style="min-width: 320px;"><div class="l"></div><ul></ul> <div class="r"></div></div><div class="dragapp"></div>
        </div>
      </div>
      <div id="desktopFrame1_Panel_Widget" class="homewidget">

      </div>
    </div>
    <DialogPage 
    :title="dialogTitle" 
    :width="width" 
    :height="height" 
    :showDialog="showDialog" 
    :menuType="menuType"
    :zindex="zindex" 
    @click-Ok="clickLiginOutOk"
     @click-Cancel="clickCancel" 
     @click-close="clickCloseDialog"/>
    <DialogPagePlugin 
    :title="dialogPluginTitle" 
    :width="dialogPluginWidth" 
    :height="dialogPluginHeight" 
    :showDialogPlugin="showDialogPlugin"
    :listApp="listApp"
    :zindex="zindex" 
    @click-close="clickCloseDialogPlugin"/>
  </div>
</template>

<script setup>
    import { ref , onMounted} from 'vue'
    import { getLunar } from 'chinese-lunar-calendar'
    import $ from "jquery";
    import toastr from "../../public/Toaster/toastr.js";
    import {getCityList,postLoginOut,readConfig} from '../API/api.js'
    import VueCookies from 'vue-cookies'
    import DialogPage from "@/components/DialogPage.vue";
    import DialogPagePlugin from "@/components/DialogPlugin.vue";
    import PannelTask from "@/components/PannelTask.vue";
    import StartApp from "@/components/StartApp.vue";
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const menuType=ref();
    const dialogTitle=ref();
    const width=ref();
    const height=ref();
    const showDialog=ref(false);

    const dialogPluginTitle=ref();
    const dialogPluginWidth=ref();
    const dialogPluginHeight=ref();
    const showDialogPlugin=ref(false);

    const installApp=ref();

    const listApp=ref([]);
    const showPannelTask=ref(false)
    const zindex=ref(500)

    const Time1=ref();
    const Time2=ref();
    const year=ref();
    const ymd=ref();
    const month=ref();
    const day=ref();
    const CWeek=ref();
    const lunar=ref();
    const lunarYear=ref();
    const zodiac=ref();
    const solarTerm=ref();

    const temp=ref('—');
    const weatherPng=ref(99);
    const weatherCity=ref('北京');
    const weatherText=ref();
    const weatherWindDir=ref();
    const weatherFeelsLike=ref();
    const weatherHumidity=ref();
    const weatherTodayImg=ref(100);
    const weatherTodayTempMin=ref();
    const weatherTodayTempMax=ref();
    const weatherTodayTemptextDay=ref();
    const weatherMingImg=ref(100);
    const weatherMingTempMin=ref();
    const weatherMingTempMax=ref();
    const weatherMingTemptextDay=ref();
    const weatherHouImg=ref(100);
    const weatherHouTempMin=ref();
    const weatherHouTempMax=ref();
    const weatherHouTemptextDay=ref();
    const ifShowWeatherList=ref(false);
    const ifShowWeatherListToday=ref(false);

    const showStartMenu=ref(false);
    const showAppMenu=ref(false)
    const showThemeMenu=ref(false);
    const showWeatherList=ref(false);
    const showUserMenu=ref(false);
    const showClockList=ref(false);
    const showSearch=ref(false)

    //阻止右键点击事件
    document.addEventListener('mousedown',function(e){
        if(e.button==2){
            return false;
        }
    })

    function clickDesk() {
        showStartMenu.value=false
        showAppMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
    }
    function clickStartMenu() {
        showStartMenu.value=!showStartMenu.value
        showAppMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
    }
    function clickAppMenu() {
        showAppMenu.value=!showAppMenu.value
        showStartMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
    }
    function clickThemeMenu() {
        showThemeMenu.value=!showThemeMenu.value
        showStartMenu.value=false
        showAppMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
    }
    function clickSayma() {
        showSearch.value=!showSearch.value
        showStartMenu.value=false
        showAppMenu.value=false
        showThemeMenu.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
    }
    function clickWeather() {
        showWeatherList.value=!showWeatherList.value
        showStartMenu.value=false
        showAppMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showUserMenu.value=false
        showClockList.value=false
    }
    function clickUserMenu() {
        showUserMenu.value=!showUserMenu.value
        showStartMenu.value=false
        showAppMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showClockList.value=false
    }
    function clickClock() {
        showClockList.value=!showClockList.value
        showStartMenu.value=false
        showAppMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
    }
    // function clickMessage() {

    // }

    function initClock(){
        var now = new Date();
        var hour = now.getHours();
        var min = now.getMinutes();
        var AMorPM = hour<12?'上午':'下午';
        var cHour = hour>12?(hour-12):hour;
        var cMin = min<10?'0'+min:min;
        month.value = now.getMonth() + 1;
        day.value = now.getDate();
        CWeek.value = now.getSysWeek();
        Time1.value=AMorPM+cHour+':'+cMin;
        Time2.value=month.value+'月'+day.value+'日'+'  ';
    }
    function initClockList(){
        var now = new Date();
        year.value = now.getFullYear();
        ymd.value = now.Format("yyyy-MM-dd");
        // 获取农历
        var getLunarDay = getLunar(year.value, month.value, day.value)
        // console.log(getLunarDay)
        lunar.value = '农历'+getLunarDay.dateStr;
        lunarYear.value = getLunarDay.lunarYear;
        zodiac.value = getLunarDay.zodiac+'年';
        solarTerm.value = getLunarDay.solarTerm?getLunarDay.solarTerm+'节':'';
        $(".ClockList .now").thooClock({
                size: 150,
                dialColor: "#1099EC",
                secondHandColor: "#DDBD45",
                minuteHandColor: "#1199ec",
                hourHandColor: "#1199ec",
                alarmHandColor: "#D84C49",
                alarmHandTipColor: "#DDBD45",
                showNumerals: true,
                brandText: "ThingsLabs"
            });
    }
    function getCityTag(){
        if(!weatherCity.value){
            // 172.29.77.106
            // 192.168.1.109
            // 获取IP
            var ip = window.location.host.split(":")[0];
            // console.log("ip：",ip)
            if(ip.split('.')[0]=='172'||ip.split('.')[0]=='192'){
                ip='myip';
            }
            // 获取城市
            var urlip = "/apil";
            $.ajax({
                url:urlip,
                type:'POST',
                data:{
                    ip: ip,
                    accessKey: 'alibaba-inc'
                },
                success:function(res){
                    console.log(res);
                }
            })
        }

        // 获取城市
        getCityList('deskData/CityList.csv').then(res=>{
            var cityTag='';
            var csvList = res.data.split('\r\n')
            for (let i = 0; i < csvList.length; i++) {
                const ele = csvList[i];
                if(ele.indexOf(weatherCity.value)!=-1){
                    if(ele.split(',')[2]==weatherCity.value){
                        cityTag=ele.split(',')[0];
                    }
                }
            }
            initWeather(cityTag);
        },err=>{
            console.log(err);
        
        });
    }
    function initWeather(cityTag){
        // 获取今天的天气
        var urlnow = 'https://devapi.qweather.com/v7/weather/now?location='+cityTag+'&key=3b94e0eed8624dd6867f5b441fec64e5'
        $.ajax({
            url:urlnow,
            type:'GET',
            success:function(res){
                if(res.code==200){
                    ifShowWeatherListToday.value=true;
                    temp.value=res.now.temp
                    weatherPng.value=res.now.icon
                    weatherText.value=res.now.text
                    weatherWindDir.value=res.now.windDir
                    weatherFeelsLike.value='体感温度'+res.now.feelsLike+'℃'
                    weatherHumidity.value='湿度'+res.now.humidity+'%'
                }else{
                    ifShowWeatherListToday.value=false;
                    weatherPng.value='99';
                }
            }
        })
        // 获取三天的天气
        var url3d = 'https://devapi.qweather.com/v7/weather/3d?location='+cityTag+'&key=3b94e0eed8624dd6867f5b441fec64e5'
        $.ajax({
            url:url3d,
            type:'GET',
            success:function(res){
                if(res.code==200){
                    ifShowWeatherList.value=true
                    // 今天
                    weatherTodayImg.value=res.daily[0].iconDay;
                    weatherTodayTempMin.value=res.daily[0].tempMin;
                    weatherTodayTempMax.value=res.daily[0].tempMax;
                    weatherTodayTemptextDay.value=res.daily[0].textDay;
                    // 明天
                    weatherMingImg.value=res.daily[1].iconDay;
                    weatherMingTempMin.value=res.daily[1].tempMin;
                    weatherMingTempMax.value=res.daily[1].tempMax;
                    weatherMingTemptextDay.value=res.daily[1].textDay;
                    // 后天
                    weatherHouImg.value=res.daily[2].iconDay;
                    weatherHouTempMin.value=res.daily[2].tempMin;
                    weatherHouTempMax.value=res.daily[2].tempMax;
                    weatherHouTemptextDay.value=res.daily[2].textDay;
                }else{
                    ifShowWeatherList.value=false
                }
            }
        })
    }

    // 用户操作
    // 注销登录
    function LiginOut(){
        dialogTitle.value='注销桌面';
        width.value='400px';
        height.value='155px'
        showDialog.value=true;
        showUserMenu.value=false;
        menuType.value='loginOut';
        playSound('rest')
    }
    function clickCancel(){
        console.log('点击取消')
        showDialog.value=false;
        playSound('close')
    }
    function clickCloseDialog(){
        console.log('点击关闭')
        showDialog.value=false;
        showDialogPlugin.value=false;
        playSound('close')
        showPannelTask.value=false;
    }
    function clickLiginOutOk(){
        console.log('点击确定')
        showDialog.value=false;

        var userData = VueCookies.get('TUser');
        console.log(userData)
        var username = userData.username;
        postLoginOut('api/LoginOut',{username:username}).then(res=>{
            console.log(res);
            console.log('注销登录！')
            router.push({name: 'HomePage'});
            location.href = "/"
            VueCookies.remove('TUser')
        },err=>{
            console.log(err);
            toastr.warning('服务器错误！'+err.message)
        });
    }

    // 修改用户签名
    function changeUserSign(){
        dialogTitle.value='个性签名';
        width.value='350px';
        height.value='150px'
        showDialog.value=true;
        showUserMenu.value=false;
        menuType.value='userSign';
        playSound('rest')
    }

    //修改用户头像
    function changeUserPic(){
        dialogTitle.value='用户头像';
        width.value='350px';
        height.value='150px'
        showDialog.value=true;
        showUserMenu.value=false;
        menuType.value='userPic';
        playSound('rest')
    }
    //修改用户密码
    function changeUserPass(){
        dialogTitle.value='修改密码';
        width.value='330px';
        height.value='205px'
        showDialog.value=true;
        showUserMenu.value=false;
        menuType.value='userPass';
        playSound('rest')
    }

    // diolog 操作
    function fullScreen(){
        showUserMenu.value=false;
        playSound('rest')
        var doc = document.documentElement;
        var screen = doc.requestFullScreen || doc.webkitRequestFullScreen || doc.mozRequestFullScreen || doc.msRequestFullscreen;
        "undefined" != typeof screen && screen && screen.call(doc);
        return true;
    }
    function exitScreen(){
        showUserMenu.value=false;
        playSound('rest')
        document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen();
    }
    function UserCenter(){
        showDialogPlugin.value=true;
        showUserMenu.value=false;
        playSound('rest')
        //
        showPannelTask.value=true;
        var aList=listApp.value;
        aList.push(installApp.value[0]);
        aList=arreryFiter(aList);
        listApp.value=aList;
    }
    function clickCloseDialogPlugin(index){
        console.log('点击关闭')
        playSound('close')
        var aList=listApp.value;
        if(aList.length==0){
            showDialogPlugin.value=false;
            showPannelTask.value=false;
        }else{
            for (let i = 0; i < aList.length; i++) {
                const element = aList[i];
                if(element.appID==index){
                    aList.splice(i,1);
                }
            }
            listApp.value=aList;
        }
        
    }
    function clickPannelTask(index){
        console.log('index'+index)
        showDialogPlugin.value=true;
        playSound("rest");
        var top = $("#dialog-"+index).css('top');
        if(top<-600){
            $("#dialog-"+index).removeClass();
            $("#dialog-"+index).addClass("dialog");
            $("#dialog-"+index).css("z-index", (zindex.value+10));
            $("#dialog-"+index).animate({
                top: listApp.value[index].top,
                left: listApp.value[index].left,
                width: listApp.value[index].width,
                height: listApp.value[index].height,
                avoidTransforms: false,
                useTranslate3d: true,
                opacity: 1
            }, "normal", function() {
                $("#dialog-"+index).find(".content iframe").fadeIn("fast")
            });
        }else{
            $("#dialog-"+index).css("z-index", (zindex.value+10));
        }
        setDialogPlugin(index);
        
    }
    function setDialogPlugin (index) {
        console.log('index'+index)
        var list = listApp.value;
        for (let i = 0; i < list.length; i++) {
            console.log(i)
            if(index==i){
                setTaskActive(listApp.value[i].appID)
            }else{
                setTaskNormal(listApp.value[i].appID)
            }
        }
    }
    function setTaskActive (appID) {
        console.log('active: '+appID)
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItemActive")
    }
    function setTaskNormal (appID) {
        console.log('normal: '+appID)
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItem")
    }

    // 
    function clickStartApp(index){
        playSound("rest");
        showStartMenu.value=false
        showPannelTask.value=true;
        showDialogPlugin.value=true;
        var aList=listApp.value;
        aList.push(installApp.value[index]);
        aList=arreryFiter(aList);
        aList[index].active=true;
        listApp.value=aList;
        setDialogPlugin(index);
    }
    


    function playSound(soundType) {
        var soundTag = document.getElementById(soundType+"_sound");
        soundTag.play()
    }
    function arreryFiter(arrObj){
        const map = new Map();
        const newArr = arrObj.filter(value => !map.has(value.appID) && map.set(value.appID, 1));
        return newArr;
    }

    function init(){
        var userData = VueCookies.get('TUser');
        // console.log(userData)
        var userID = userData.userID;
        readConfig('api/readConfig',{userID:userID}).then(res=>{
            // console.log(res.data);
            installApp.value = res.data.installApp;
            if(res.data.system.myTheme){
                // console.log('添加主题！')
                document.getElementById("mytheme").href ="/Theme/"+ res.data.system.myTheme + "/theme.css"
            }

        },err=>{
            console.log(err);
            toastr.warning('服务器错误！'+err.message)
        });
    }

    onMounted(()=>{
        init();
        initClock();
        initClockList();
        getCityTag();
        playSound('desktop')
    })
</script>

<style>
.desktop {
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
}
.desktopWrapper{
  position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: transparent url(../assets/images/default.jpg) repeat center top;
    z-index: -1;
}
.desktopWrapper img{
  width:"100%" ;
  height:"100%";
  position:absolute;
  top:0;
  left:0;
  z-index:-1
}
.desktopPanel {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.taskbar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: rgba(0,0,0,0.25);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 500;
}
.homepanel {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.homewidget {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: none;
}
.taskbar .SystemButton {
    height: 40px;
    width: 165px;
    padding: 0 10px;
    background: url(../assets/images/desktop/TaskbarPoints.png) no-repeat right top;
}
.taskbar .SystemButton ul {
    display: inline-block;
    padding: 0;
    margin: 0;
    height: 40px;
}
.taskbar .SystemButton .HomeButton {
    cursor: pointer;
    width: 32px;
    height: 32px;
    background: url(../assets/images/desktop/start1.png) no-repeat;
}
.taskbar .SystemButton li {
    display: inline-block;
    width: 32px;
    height: 32px;
    padding: 4px 10px;
}
.taskbar .SystemButton li:hover {
    background: rgba(255,255,255,.3);
}
.taskbar .SystemButton .StartMenu {
    position: absolute;
    top: 45px;
    left: 5px;
    width: 290px;
    height: 415px;
    background: #fafafa;
    border: 1px solid #ddd;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
    z-index: 9999;
}
.taskbar .SystemButton .StartMenu .AppList {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 40px;
    display: table-cell;
    padding: 5px 0 0 3px;
    overflow: auto;
}
.taskbar .SystemButton .StartMenu .UserOperate {
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    bottom: 0;
    color: #000;
    background: #fff;
    border-top: 1px solid #ddd;
}
.taskbar .SystemButton .StartMenu .pointer {
    position: absolute;
    top: -10px;
    left: 30px;
    bottom: -10px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #fafafa;
}
.taskbar .SystemButton .StartMenu .UserOperate .DoLock {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 40px;
    text-align: center;
    font-size: 12pt;
    opacity: .6;
    cursor: pointer;
}
.taskbar .SystemButton .StartMenu .UserOperate .Logout {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 40px;
    border-left: 1px solid #ddd;
    text-align: center;
    font-size: 12pt;
    opacity: .6;
    cursor: pointer;
}
.taskbar .SystemButton .ApplyButton {
    cursor: pointer;
    width: 32px;
    height: 32px;
    background: url(../assets/images/desktop/appcenter1.png) no-repeat;
}
.taskbar .SystemButton .AppMenu {
    position: absolute;
    top: 45px;
    left: 30px;
    width: 380px;
    height: 450px;
    background: #fafafa;
    border: 1px solid #ddd;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    z-index: 9999;
}
.taskbar .SystemButton .AppMenu .AppList {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 40px;
}
.taskbar .SystemButton .AppMenu .AppList .tab1 {
    position: absolute;
    top: 2px;
    left: 80px;
    width: 80px;
    height: 4px;
    border: 8px solid #fafafa;
    border-bottom: 6px solid #fafafa;
    background: #ddd;
    cursor: pointer;
}
.taskbar .SystemButton .AppMenu .AppList .tab1content {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    bottom: 0;
    display: table-cell;
    padding: 10px 0 5px 5px;
    overflow: auto;
    overflow-x: hidden;
}
.taskbar .SystemButton .AppMenu .AppList .tab2 {
    position: absolute;
    top: 2px;
    left: 175px;
    width: 80px;
    height: 4px;
    border: 8px solid #fafafa;
    border-bottom: 6px solid #fafafa;
    background: #ddd;
    cursor: pointer;
}
.taskbar .SystemButton .AppMenu .AppList .tab2content {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    bottom: 0;
    display: table-cell;
    padding: 10px 0 5px 5px;
    overflow: auto;
    overflow-x: hidden;
    display: none;
}
.taskbar .SystemButton .AppMenu .AppSearch {
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    bottom: 0;
    color: #ccc;
    background: #fff;
    border-top: 1px solid #ddd;
}
.taskbar .SystemButton .AppMenu .AppSearch .searchBtn {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    padding: 0 10px;
    font-size: 14pt;
}
.taskbar .SystemButton .AppMenu .AppSearch .searchKey {
    position: absolute;
    top: 8px;
    left: 40px;
    width: 250px;
    height: 24px;
    border: 0 solid #ddd;
}
.taskbar .SystemButton .AppMenu .AppSearch .edit {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 24px;
    font-size: 16px;
    color: #09f;
    cursor: pointer;
}
.taskbar .SystemButton .AppMenu .pointer {
    position: absolute;
    top: -10px;
    left: 60px;
    bottom: -10px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #fafafa;
}
.taskbar .SystemButton .ThemeButton {
    cursor: pointer;
    width: 32px;
    height: 32px;
    background: url(../assets/images/desktop/theme1.png) no-repeat;
}
.taskbar .SystemButton .ThemeMenu {
    position: absolute;
    top: 45px;
    left: 70px;
    width: 420px;
    height: 560px;
    background: #fafafa;
    border: 1px solid #ddd;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    z-index: 9999;
}
.taskbar .SystemButton .ThemeMenu .ThemeList {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 40px;
}
.taskbar .SystemButton .ThemeMenu .ThemeList .tab1 {
    position: absolute;
    top: 2px;
    left: 110px;
    width: 80px;
    height: 4px;
    border: 8px solid #fafafa;
    border-bottom: 6px solid #fafafa;
    background: #ddd;
    cursor: pointer;
}
.taskbar .SystemButton .ThemeMenu .ThemeList .tab1content {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    bottom: 0;
    display: table-cell;
    padding: 10px 0 5px 10px;
    overflow: auto;
    overflow-x: hidden;
}
.taskbar .SystemButton .ThemeMenu .ThemeList .tab2 {
    position: absolute;
    top: 2px;
    left: 205px;
    width: 80px;
    height: 4px;
    border: 8px solid #fafafa;
    border-bottom: 6px solid #fafafa;
    background: #ddd;
    cursor: pointer;
}
.taskbar .SystemButton .ThemeMenu .ThemeList .tab2content {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    bottom: 0;
    display: table-cell;
    padding: 10px 0 5px 10px;
    overflow: auto;
    overflow-x: hidden;
    display: none;
}
.taskbar .SystemButton .ThemeMenu .ThemeSearch {
    position: absolute;
    left: 0;
    width: 100%;
    height: 40px;
    bottom: 0;
    color: #ccc;
    background: #fff;
    border-top: 1px solid #ddd;
}
.taskbar .SystemButton .ThemeMenu .ThemeSearch .searchBtn {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    padding: 0 10px;
    font-size: 14pt;
}
.taskbar .SystemButton .ThemeMenu .ThemeSearch .searchKey {
    position: absolute;
    top: 8px;
    left: 40px;
    width: 320px;
    height: 24px;
    border: 0 solid #ddd;
}
.taskbar .SystemButton .ThemeMenu .ThemeSearch .edit {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 24px;
    font-size: 16px;
    color: #09f;
    cursor: pointer;
}
.taskbar .SystemButton .ThemeMenu .pointer {
    position: absolute;
    top: -10px;
    left: 75px;
    bottom: -10px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #fafafa;
}
.taskbar .TaskButton {
    position: absolute;
    top: 0;
    left: 190px;
    right: 320px;
    height: 40px;
    overflow: hidden;
}
.taskbar .TaskButton ul {
    display: inline-block;
    padding: 0;
    margin: 0;
    height: 40px;
}
.taskbar .TaskStatus {
    position: absolute;
    top: 0;
    right: 10px;
    height: 40px;
    width: 270px;
    font-size: 16px;
    color: #fff;
}
.taskbar .TaskStatus .WeatherList {
    position: absolute;
    top: 45px;
    right: 60px;
    height: 270px;
    width: 250px;
    padding: 5px 15px;
    color: #ccc;
    font-size: 10pt;
    background: #fafafa;
    background: url(../assets/images/weatherImg/100n.png);
    background-repeat: no-repeat;
    background-position: left top;
    background-size: auto 100%;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    z-index: 9998;
}
.taskbar .TaskStatus .WeatherList .pointer {
    position: absolute;
    top: -10px;
    right: 172px;
    bottom: -10px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #fafafa;
}
.taskbar .TaskStatus .WeatherList .today {
    border-bottom: 1px solid #ccc;
    height: 125px;
}
.taskbar .TaskStatus .WeatherList .today ul {
    display: inline-block;
    padding: 0;
    margin: 0;
    height: 125px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherCity{
    position: relative;
    top: 0px;
    left: 10px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherIcon{
    width: 48px;
    height: 48px;
    position: absolute;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherIcon img{
    width: 48px;
    height: 48px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatheriInfo{
    position: relative;
    top: 20px;
    left: 45px;
    font-size: 25px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherFeelsLike{
    position: relative;
    top: 80px;
    left: -15px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherText{
    position: relative;
    top: 52px;
    left: -70px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherWindDir{
    position: relative;
    top: 30px;
    left: 10px;
}
.taskbar .TaskStatus .WeatherList .today ul .weatherHumidity{
    position: absolute;
    top: 70px;
    right: 20px;
    width: 60px;
    display: inline-block;
}

.taskbar .TaskStatus .WeatherList .future {
    padding: 10px 0;
    text-align: center;
    font-size: 10.5pt;
    color: #ccc;
}
.taskbar .TaskStatus .WeatherList .future ul {
    display: inline-block;
    padding: 0;
    margin: 0 10px;
    display: flex;
}
.taskbar .TaskStatus .WeatherList .future ul li {
    padding: 0;
    margin: 0 0px;
    height: 120px;
    width: 330px;
    list-style: none;
}
.taskbar .TaskStatus .WeatherList .future .weatherBoxImg{
    width: 22px;
    height: 22px;
    margin: auto;
}
.taskbar .TaskStatus .WeatherList .future .weatherBoxImg img{
    width: 22px;
    height: 22px;
}
.taskbar .TaskStatus .Search {
    position: absolute;
    top: 0;
    right: 310px;
    width: 240px;
    border-right: 1px solid rgba(255,255,255,0.2);
}
.taskbar .TaskStatus .Search input {
    width: 200px;
    border: 1px solid #fff;
    height: 28px;
    color: black;
    padding: 5px;
}
.taskbar .TaskStatus .Search i {
    cursor: pointer;
}
.taskbar .TaskStatus .Message {
    position: absolute;
    top: 0;
    right: 265px;
    height: 24px;
    width: 24px;
    padding: 8px;
    cursor: pointer;
}
.taskbar .TaskStatus .Message:hover {
    background: rgba(255,255,255,.3)
}
.taskbar .TaskStatus .Message img {
    height: 24px;
    width: 24px;
}
.taskbar .TaskStatus .Message .number {
    position: absolute;
    top: 17px;
    left: 24px;
    height: 15px;
    min-width: 11px;
    padding: 0 2px;
    line-height: 15px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
}
.taskbar .TaskStatus .Weather {
    position: absolute;
    top: 0;
    right: 175px;
    height: 40px;
    width: 90px;
    border-right: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
}
.taskbar .TaskStatus .Weather:hover {
    border-right: 0 solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,.3)
}

.taskbar .TaskStatus .Weather .icon {
    position: absolute;
    top: 5px;
    left: 10px;
    height: 30px;
    width: 30px;
}
.taskbar .TaskStatus .Weather .icon img {
    height: 30px;
    width: 30px;
}
.taskbar .TaskStatus .Weather .info {
    position: absolute;
    top: 5px;
    left: 35px;
    height: 30px;
    width: 50px;
    text-align: center;
    line-height: 32px;
}
.taskbar .TaskStatus .Sayma {
    position: absolute;
    top: 0;
    right: 132px;
    height: 24px;
    width: 24px;
    padding: 8px;
    cursor: pointer;
}
.taskbar .TaskStatus .Sayma:hover {
    background: rgba(255,255,255,.3)
}
.taskbar .TaskStatus .Sayma img {
    height: 24px;
    width: 24px;
}
.taskbar .TaskStatus .Clock {
    position: absolute;
    top: 0;
    right: 45px;
    height: 30px;
    width: 90px;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    padding: 5px 0;
}
.taskbar .TaskStatus .Clock:hover {
    background: rgba(255,255,255,.3)
}
.taskbar .TaskStatus .ClockList {
    position: absolute;
    top: 45px;
    right: 0;
    height: 200px;
    width: 320px;
    color: #aaa;
    font-size: 10.5pt;
    background: #fafafa;
    border: 1px solid #ddd;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
    border-radius: 1px;
    -moz-border-radius: 1px;
    -webkit-border-radius: 1px;
    z-index: 9998;
}
.taskbar .TaskStatus .ClockList .pointer {
    position: absolute;
    top: -10px;
    right: 80px;
    bottom: -10px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #fafafa;
}
.taskbar .TaskStatus .ClockList .now {
    position: absolute;
    top: 0;
    left: 0;
    height: 150px;
    width: 150px;
    padding: 30px 0 30px 15px;
}
.taskbar .TaskStatus .ClockList .today {
    position: absolute;
    top: -5px;
    left: 150px;
    height: 180px;
    width: 150px;
    padding: 10px;
    text-align: center;
}
.taskbar .TaskStatus .ClockList .day {
    font-size: 48pt;
    line-height: 64px;
    color: #c00;
}
.taskbar .TaskStatus .Picture {
    position: absolute;
    top: 0;
    right: 5px;
    height: 32px;
    width: 32px;
    padding: 4px;
    cursor: pointer;
}
.taskbar .TaskStatus .Picture:hover {
    background: rgba(255,255,255,.3)
}
.taskbar .TaskStatus .Picture img {
    height: 32px;
    width: 32px;
    border-radius: 100% 100% 100% 100%;
    -moz-border-radius: 100% 100% 100% 100%;
    -webkit-border-radius: 100% 100% 100% 100%;
}
.taskbar .TaskStatus .UserMenu {
    position: absolute;
    top: 45px;
    right: 0;
    height: 225px;
    width: 100px;
    padding: 8px;
    color: #000;
    font-size: 11pt;
    background: #fff;
    border: 1px solid #ddd;
    -moz-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=25,Direction=135,Color='#888');
    z-index: 9999;
}
.taskbar .TaskStatus .UserMenu .pointer {
    position: absolute;
    top: -10px;
    right: 15px;
    bottom: -10px;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0;
    border-bottom: 10px solid #fff;
}
.taskbar .TaskStatus .UserMenu ul {
    display: inline-block;
    padding: 0;
    margin: 0;
    line-height: 28px;
}
.taskbar .TaskStatus .UserMenu li {
    display: inline-block;
    width: 100px;
    height: 24px;
    padding: 0 0 4px 0;
    text-align: center;
    cursor: pointer;
}
.taskbar .TaskStatus .UserMenu hr {
    width: 100px;
    border: 0;
    border-bottom: 1px solid #ccc;
}
.taskbar .TaskShowDesktop {
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 10px;
    border-left: 1px solid rgba(255,255,255,0.3);
    cursor: pointer;
}
.taskbar .TaskShowDesktop:hover {
    background: rgba(255,255,255,0.2)
}
.homepanel {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.dock {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font: normal 14px/1 Arial,Tahoma,微软雅黑;
}
.dock .apps {
    position: relative;
    z-index: 100;
    display: inline-block;
    padding: 0 10px;
    background: url(../assets/images/desktop/dock-bg-m.png) repeat-x bottom;
}
.dock .apps .l {
    left: -40px;
    background: url(../assets/images/desktop/dock-bg-l.png) no-repeat right bottom;
}
.dock .apps .l, .dock .apps .r {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
}
.dock ul {
    display: inline-block;
    padding: 0;
    margin: 0;
}
.dock .apps .r {
    right: -40px;
    background: url(../assets/images/desktop/dock-bg-r.png) no-repeat left bottom;
}
.dock .dragapp {
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 70px;
    height: 70px;
    /* display: none; */
    cursor: move;
}
.taskbar .TaskButton li {
    display: inline-block;
    width: 50px;
    height: 40px;
}










/* 类别样式 */
input[type="text"], input[type="password"], textarea {
    -webkit-appearance: none;
    outline: 0;
}
</style>