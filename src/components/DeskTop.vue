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
        <div id="desktopFrame1_Panel_Task_Button" class="TaskButton"><ul></ul></div>
        <div id="desktopFrame1_Panel_Task_Status" class="TaskStatus">
          <div class="WeatherList" v-show="showWeatherList">			
            <span class="pointer"></span>			
            <div class="today">
              <ul></ul>
            </div>			
            <div class="future">
              <ul></ul>
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
            <div class="icon"><img src="../assets/images/Weather/99.png"></div>			
            <div class="info">—℃</div>		
          </div>
          <div class="Sayma" @click="clickSayma"><img src="../assets/images/task.png"></div>
          <div class="Clock" @click="clickClock">{{ Time1 }} <br> {{ Time2 }}{{ CWeek }}</div>
          <div class="ClockList" v-show="showClockList">			
            <span class="pointer"></span>			
            <div class="now"></div>			
            <div class="today">
                <div>{{year}}&nbsp;{{ CWeek }}</div><div class="day">{{ day }}</div><div style="line-height: 22px;">{{ lunar }}<br>{{ lunarYear }}<br>{{ zodiac }}&nbsp;<br>{{ solarTerm }}</div>
            </div>		
          </div>
          <div class="Picture" @click="clickUserMenu"><img src="../assets/images/user/new.png"></div>
          <div class="UserMenu" v-show="showUserMenu">			
            <span class="pointer"></span>			
              <ul>				
                <li class="doUserInfo"><i class="fa fa-edit"></i>&nbsp;个性签名</li>				
                <li class="doUserPic"><i class="fa fa-camera"></i>&nbsp;上传头像</li>				
                <li class="doUserPass"><i class="fa fa-key"></i>&nbsp;修改密码</li>				
                <hr>				
                <li class="doUserCenter"><i class="fa fa-user"></i>&nbsp;个人中心</li>				
                <li class="fullScreen"><i class="fa fa-arrows-alt"></i>&nbsp;全屏模式</li>				
                <li class="exitScreen"><i class="fa fa-arrows"></i>&nbsp;退出全屏</li>				
                <hr>				
                <li class="doUserLogout"><i class="fa fa-sign-out"></i>&nbsp;注销退出</li>			
              </ul>		
            </div>
        </div>
        <div id="desktopFrame1_Panel_Task_ShowDesktop" class="TaskShowDesktop"></div>
      </div>
      <div id="desktopFrame1_Panel_Home" class="homepanel" @click="clickDesk">

      </div>
      <div id="desktopFrame1_Panel_Widget" class="homewidget">

      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref , onMounted} from 'vue'
    import { getLunar } from 'chinese-lunar-calendar'
    import $ from "jquery";

    const Time1=ref();
    const Time2=ref();
    const year=ref();
    const month=ref();
    const day=ref();
    const CWeek=ref();
    const lunar=ref();
    const lunarYear=ref();
    const zodiac=ref();
    const solarTerm=ref();

    const showStartMenu=ref(false);
    const showAppMenu=ref(false)
    const showThemeMenu=ref(false);
    const showWeatherList=ref(false);
    const showUserMenu=ref(false);
    const showClockList=ref(false);
    const showSearch=ref(false)

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
    function clickMessage() {

    }

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
        year.value = now.Format("yyyy-MM-dd");
        // 获取农历
        var getLunarDay = getLunar(2023, 4, 5)
        console.log(getLunarDay)
        lunar.value = '农历'+getLunarDay.dateStr;
        lunarYear.value = getLunarDay.lunarYear;
        zodiac.value = getLunarDay.zodiac+'年';
        solarTerm.value = getLunarDay.solarTerm+'节';
        $(".ClockList .now").thooClock({
                size: 150,
                dialColor: "#1099EC",
                secondHandColor: "#DDBD45",
                minuteHandColor: "#1199ec",
                hourHandColor: "#1199ec",
                alarmHandColor: "#D84C49",
                alarmHandTipColor: "#DDBD45",
                showNumerals: !0,
                brandText: "ThingsLabs"
            });
    }

    onMounted(()=>{
        initClock();
        initClockList();
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
    width: 350px;
    padding: 5px 15px;
    color: #aaa;
    font-size: 10pt;
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
}
.taskbar .TaskStatus .WeatherList ul {
    display: inline-block;
    padding: 0;
    margin: 0;
}
.taskbar .TaskStatus .WeatherList .future {
    padding: 10px 0;
    text-align: center;
    font-size: 10.5pt;
    color: #607D8B;
}
.taskbar .TaskStatus .WeatherList ul {
    display: inline-block;
    padding: 0;
    margin: 0;
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












/* 类别样式 */
input[type="text"], input[type="password"], textarea {
    -webkit-appearance: none;
    outline: 0;
}
</style>