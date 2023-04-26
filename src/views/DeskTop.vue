<template>
  <div id="desktopcontiner" class="desktop">
    <div class="desktopWrapper">
      <img src="/static/images/wrapper.jpg"  style="" onerror="this.style.display='none'">
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
                    <div class="tab1" @click="showAppListTab1=true" :class="showAppListTab1?'active':''"></div>
                    <div class="tab2" @click="showAppListTab1=false" :class="showAppListTab1?'':'active'"></div>
                    <div class="tab1content" v-if="showAppListTab1">
                        <AppList :userApp="userApp" @click-UserApp="clickUserApp"/>
                    </div>
                    <div class="tab2content" v-else>
                        <WidgetList :WidgetApp="installWidget" @click-WidgetApp="clickWidgetApp"/>
                    </div>
                </div>
                <div class="AppSearch">
                  <div class="searchBtn"><i class="fa fa-search"></i></div>
                  <input type="text" class="searchKey" placeholder="搜索..." required="">
                  <div class="edit">管理</div>
                </div>
                <span class="pointer"></span>
              </div>
            </li>
            <li>
              <div id="desktopFrame1_Panel_Task_theme" class="ThemeButton" @click="clickThemeMenu"></div>
              <div class="ThemeMenu" v-show="showThemeMenu">
                <div class="ThemeList">
                  <div class="tab1" @click="showThemeListTab1=true" :class="showThemeListTab1?'active':''"></div>
                  <div class="tab2" @click="showThemeListTab1=false" :class="showThemeListTab1?'':'active'"></div>
                  <div class="tab1content" v-if="showThemeListTab1">
                
                  </div>
                  <div class="tab2content" v-else>

                  </div>
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
            <img src="/static/images/msg1.png">
            <div class="number" style="display: none;">0</div>
          </div>
          <div class="Weather" @click="clickWeather">			
            <div class="icon"><img :src="require('@/assets/images/Weather/'+weatherPng+'.png')"></div>			
            <div class="info">{{ temp }}℃</div>		
          </div>
          <div class="Sayma" @click="clickSayma"><img src="/static/images/task.png"></div>
          <div class="Clock" @click="clickClock">{{ Time1 }} <br> {{ Time2 }}{{ CWeek }}</div>
          <div class="ClockList" v-show="showClockList">			
            <span class="pointer"></span>			
            <div class="now"></div>			
            <div class="today">
                <div>{{ymd}}&nbsp;{{ CWeek }}</div><div class="day">{{ day }}</div><div style="line-height: 22px;">{{ lunar }}<br>{{ lunarYear }}<br>{{ zodiac }}&nbsp;<br>{{ solarTerm }}</div>
            </div>		
          </div>
          <div class="Picture" @click="clickUserMenu"><img src="/static/images/user/new.png"></div>
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
    @click-Ok="clickLiginOutOk"
     @click-Cancel="clickCancel" 
     @click-close="clickCloseDialog"/>
    <DialogPagePlugin 
    :width="dialogPluginWidth" 
    :height="dialogPluginHeight" 
    :showDialogPlugin="showDialogPlugin"
    :listApp="listApp"
    @click-close="clickCloseDialogPlugin"/>
    <DialogWidget 
    :widgetWidth="dialogWidgetWidth" 
    :widgetHeight="dialogWidgetHeight" 
    :showDialogWidget="showDialogWidget"
    :widgetApp="widgetApp"
    @click-WidgetClose="clickWidgetClose"/>
  </div>
</template>

<script setup>
    import { ref , onMounted} from 'vue'
    import { getLunar } from 'chinese-lunar-calendar'
    import $ from "jquery";
    import toastr from "/public/static/Toaster/toastr.js";
    import {getCityList,postLoginOut,readConfig} from '../API/api.js'
    import VueCookies from 'vue-cookies'
    import DialogPage from "@/components/DialogPage.vue";
    import DialogPagePlugin from "@/components/DialogPlugin.vue";
    import DialogWidget from "@/components/DialogWidget.vue";
    import PannelTask from "@/components/PannelTask.vue";
    import StartApp from "@/components/StartApp.vue";
    import AppList from "@/components/AppList.vue";
    import WidgetList from "@/components/WidgetList.vue";
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const menuType=ref();
    const dialogTitle=ref();
    const width=ref();
    const height=ref();
    const showDialog=ref(false);

    const dialogPluginWidth=ref();
    const dialogPluginHeight=ref();
    const showDialogPlugin=ref(false);

    const dialogWidgetWidth=ref();
    const dialogWidgetHeight=ref();
    const showDialogWidget=ref(false);

    const installApp=ref();
    const userApp=ref();
    const installWidget=ref();

    const listApp=ref([]);
    const widgetApp=ref([]);
    const showPannelTask=ref(false)

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
    const showAppListTab1=ref(true)
    const showThemeListTab1=ref(true)

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
        $(".HomeButton").removeClass("active");
        $(".ApplyButton").removeClass("active");
        $(".ThemeButton").removeClass("active");
    }
    function clickStartMenu() {
        showStartMenu.value=!showStartMenu.value
        showAppMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
        $(".HomeButton").addClass("active");
        $(".ApplyButton").removeClass("active");
        $(".ThemeButton").removeClass("active");
    }
    function clickAppMenu() {
        showAppMenu.value=!showAppMenu.value
        showStartMenu.value=false
        showThemeMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
        $(".ApplyButton").addClass("active");
        $(".HomeButton").removeClass("active");
        $(".ThemeButton").removeClass("active");
    }
    function clickThemeMenu() {
        showThemeMenu.value=!showThemeMenu.value
        showStartMenu.value=false
        showAppMenu.value=false
        showSearch.value=false
        showWeatherList.value=false
        showUserMenu.value=false
        showClockList.value=false
        $(".ThemeButton").addClass("active");
        $(".HomeButton").removeClass("active");
        $(".ApplyButton").removeClass("active");
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


    // 
    function initClock(){
        var now = new Date();
        var hour = now.getHours();
        var min = now.getMinutes();
        var AMorPM = hour<12?'上午':'下午';
        var cHour = hour>12?(hour-12):hour;
        var cMin = min<10?'0'+min:min;
        year.value = now.getFullYear();
        ymd.value = now.Format("yyyy-MM-dd");
        month.value = now.getMonth() + 1;
        day.value = now.getDate();
        CWeek.value = now.getSysWeek();
        Time1.value=AMorPM+cHour+':'+cMin;
        Time2.value=month.value+'月'+day.value+'日'+'  ';
    }
    function initClockList(){
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
        getCityList('/static/deskData/CityList.csv').then(res=>{
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
        var top = parseInt($("#dialogPlugin-"+index).css('top').split('px')[0]);
        var maxZindex = getDialogZindexMax();
        maxZindex++;
        if(top<-600){
            $("#dialogPlugin-"+index).removeClass();
            $("#dialogPlugin-"+index).addClass("dialog");
            $("#dialogPlugin-"+index).css("z-index", maxZindex);
            $("#dialogPlugin-"+index).animate({
                top: listApp.value[index].top,
                left: listApp.value[index].left,
                width: listApp.value[index].width,
                height: listApp.value[index].height,
                avoidTransforms: false,
                useTranslate3d: true,
                opacity: 1
            }, "normal", function() {
                $("#dialogPlugin-"+index).find(".content iframe").fadeIn("fast")
            });
        }else{
            $("#dialogPlugin-"+index).css("z-index", maxZindex);
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
    function getDialogZindexMax () {
        var myList = [];
        for (let i = 0; i < 20; i++) {
            var myZindex = $("#dialog-"+i).css('z-index');
            myList.push(myZindex?parseInt(myZindex):0);
        }
        var max = Math.max(...myList)
        return max
    }

    // widget操作
    function clickWidgetClose (appID) {
        console.log('点击关闭')
        playSound('close')
        var aList=widgetApp.value;
        for (let i = 0; i < aList.length; i++) {
            const element = aList[i];
            if(element.appID==appID){
                aList.splice(i,1);
            }
        }
        widgetApp.value=aList;
    }

    // 点击打开系统app
    function clickStartApp(index){
        $(".HomeButton").removeClass("active");
        $(".ApplyButton").removeClass("active");
        $(".ThemeButton").removeClass("active");
        playSound("rest");
        showStartMenu.value=false
        showPannelTask.value=true;
        showDialogPlugin.value=true;
        var aList=listApp.value;
        aList.push(installApp.value[index]);
        aList=arreryFiter(aList);
        aList[aList.length-1].active=true;
        listApp.value=aList;
        setDialogPlugin(index);
    }
    // 点击打开用户app
    function clickUserApp(index){
        $(".HomeButton").removeClass("active");
        $(".ApplyButton").removeClass("active");
        $(".ThemeButton").removeClass("active");
        playSound("rest");
        showAppMenu.value=false
        showPannelTask.value=true;
        showDialogPlugin.value=true;
        var aList=listApp.value;
        aList.push(userApp.value[index]);
        aList=arreryFiter(aList);
        aList[aList.length-1].active=true;
        listApp.value=aList;
        setDialogPlugin(index);
    }
     // 点击打开移动app
     function clickWidgetApp(index){
        $(".HomeButton").removeClass("active");
        $(".ApplyButton").removeClass("active");
        $(".ThemeButton").removeClass("active");
        playSound("rest");
        showAppMenu.value=false;
        showDialogWidget.value=true;
        var aList=widgetApp.value;
        aList.push(installWidget.value[index]);
        aList=arreryFiter(aList);
        aList[aList.length-1].active=true;
        widgetApp.value=aList;
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
            userApp.value = res.data.userApp;
            installWidget.value = res.data.installWidget;
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

</style>