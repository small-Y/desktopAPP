<template>
  <div id="desktopcontiner" class="desktop" @contextmenu.prevent>
    <div class="desktopWrapper">
      <img :src="wrapperImg" alt="壁纸" v-if="wrapperImgType">
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
                  <div class="DoLock" @click="DoLock"><i class="fa fa-lock"></i>&nbsp;锁 定</div>
                  <div class="Logout" @click="LiginOut"><i class="fa fa-sign-out"></i>&nbsp;注 销</div>
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
                    <ThemeList :TList="TList" @click-SetTheme="clickSetTheme"/>
                  </div>
                  <div class="tab2content" v-else>
                    <WrapperList :WList="WList" @click-SetWrapper="clickSetWrapper" @click-SetWrapper1="clickSetWrapper1" @click-SetWrapper2="clickSetWrapper2"/>
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
          <div class="Picture" @click="clickUserMenu"><img :src="userHeadPic"></div>
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
    @click-Ok="clickDialogOk"
    @click-Cancel="clickCancel" 
    @click-close="clickCloseDialog"
    @change-UserPic="uploadUserPic"/>
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
    import {getLogin,getCityList,postLoginOut,readConfig,postUserSign,getThemeList,postSetTheme,postSetWrapper,uploadPic,setUserPass} from '../API/api.js'
    import {encrypt} from '@/common/crypto'
    import VueCookies from 'vue-cookies'
    import DialogPage from "@/components/DialogPage.vue";
    import DialogPagePlugin from "@/components/DialogPlugin.vue";
    import DialogWidget from "@/components/DialogWidget.vue";
    import PannelTask from "@/components/PannelTask.vue";
    import StartApp from "@/components/StartApp.vue";
    import AppList from "@/components/AppList.vue";
    import WidgetList from "@/components/WidgetList.vue";
    import ThemeList from "@/components/ThemeList.vue";
    import WrapperList from "@/components/WrapperList.vue";

    const wrapperImg=ref();
    const wrapperImgType=ref(true);
    const userHeadPic=ref('/static/images/user/new.png');

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

    const TList=ref();
    const WList=ref()

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

    const userPic=ref();

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
            toastr.warning('服务器错误！'+err.response.statusText);
        
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
        showStartMenu.value=false
        menuType.value='loginOut';
        playSound('rest')
    }
    function DoLock(){
        dialogTitle.value='锁定桌面';
        width.value='400px';
        height.value='155px'
        showDialog.value=true;
        showUserMenu.value=false;
        showStartMenu.value=false
        menuType.value='DoLock';
        playSound('rest')
    }
    // diolog 操作
    function clickCancel(){
        showDialog.value=false;
        playSound('close')
    }
    function clickCloseDialog(){
        showDialog.value=false;
        playSound('close')
        showPannelTask.value=false;
    }
    function clickDialogOk(){
        var userData = VueCookies.get('TUser');
        var username = userData.username;
        var userID = userData.userID;
        
        if(menuType.value=='userSign'){
            var userSign = $('#msgInput').val();
            console.log(userSign)
            postUserSign('api/postUserSign',{username:username,userSign:userSign}).then(res=>{
                showDialog.value=false;
                console.log(res);
                if(res.status==200){
                    toastr.success('用户签名修改成功！')
                    var data = res.data;
                    VueCookies.set('TUser',data)
                }
            },err=>{
                toastr.warning('服务器错误！'+err.response.statusText);
            });
        }else if(menuType.value=='loginOut'){
            postLoginOut('api/LoginOut',{username:username}).then(res=>{
                showDialog.value=false;
                console.log(res);
                console.log('注销登录！')
                location.href = "/"
                VueCookies.remove('TUser')
            },err=>{
                toastr.warning('服务器错误！'+err.response.statusText);
            });
        }else if(menuType.value=='DoLock'){
            console.log('锁定桌面！')
            VueCookies.set('TUser',null)
            location.href = "/Login"
        }else if(menuType.value=='userPic'){
            showDialog.value=false;
            console.log(userPic.value)
            if(userPic.value){
                var fileData = userPic.value;
                uploadPic('api/uploadPic?userID='+userID,fileData).then(res=>{
                    console.log(res);
                    if(res.data.flag){
                        toastr.success('用户头像修改成功！')
                    }
                },err=>{
                    toastr.warning('服务器错误！'+err.response.statusText);
                });
            }else{
                toastr.warning('错误操作！请先选择图片.');
            }
        }else if(menuType.value=='userPass'){
            var oldPass = $('#oldPass').val();
            var newPass1 = $('#newPass1').val();
            var newPass2 = $('#newPass2').val();
            var checkPass = passFiter(oldPass,newPass1,newPass2);
            if(!checkPass){
                return false;
            }
            oldPass = encrypt(oldPass);
            const pass = encrypt(newPass1);
            setUserPass('api/setUserPass',{username:username,oldPass:oldPass,pass:pass}).then(res=>{
                showDialog.value=false;
                console.log(res);
                if(res.data.flag){
                    toastr.success('用户密码修改成功！')
                }
            },err=>{
                toastr.warning('服务器错误！'+err.response.statusText);
            });
        }
        
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
    function uploadUserPic(e){
        console.log(e.target.files[0])
        var file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData)
        userPic.value = formData;
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

    // diologPlugin 操作
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
        showDialogPlugin.value=true;
        playSound("rest");
        var top = parseInt($("#dialogPlugin-"+index).css('top').split('px')[0]);
        var maxZindex = getDialogZindexMax();
        maxZindex++;
        if(top<-600){
            $("#dialogPlugin-"+index).removeClass();
            $("#dialogPlugin-"+index).addClass("dialogPlugin");
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
        var list = listApp.value;
        for (let i = 0; i < list.length; i++) {
            if(index==i){
                setTaskActive(listApp.value[i].appID)
            }else{
                setTaskNormal(listApp.value[i].appID)
            }
        }
    }
    function setTaskActive (appID) {
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItemActive")
    }
    function setTaskNormal (appID) {
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").removeClass();
        $("#desktopFrame1_Panel_Task_" + appID + "_Button").addClass("ButtonItem")
    }
    function getDialogZindexMax () {
        var myList = [];
        for (let i = 0; i < 20; i++) {
            var myZindex = $("#dialogPlugin-"+i).css('z-index');
            myList.push(myZindex?parseInt(myZindex):0);
        }
        var max = Math.max(...myList)
        return max
    }

    // widget操作
    function clickWidgetClose (appID) {
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


    // 主题操作
    function clickSetTheme(themeName){
        var userData = VueCookies.get('TUser');
        var userID = userData.userID;
        postSetTheme('api/setTheme',{userID:userID,themeName:themeName}).then(res=>{
            console.log(res);
            if(res.data.flag){
                playSound('info')
                showThemeMenu.value=false;
                wrapperImg.value = "/Theme/"+themeName+"/i/wrapper.jpg";
                document.getElementById("mytheme").href ="/Theme/"+ themeName + "/theme.css";
                toastr.success('主题修改成功！')
            }
        },err=>{
            toastr.warning('服务器错误！'+err.response.statusText);
        });
    }
    function clickSetWrapper(fileName){
        wrapperImgType.value=true;
        var userData = VueCookies.get('TUser');
        var userID = userData.userID;
        setWrapper(userID,fileName);
    }
    function clickSetWrapper1(fileName){
        wrapperImgType.value=false;
        var userData = VueCookies.get('TUser');
        var userID = userData.userID;
        setWrapper(userID,fileName);
        var fileUrl = "/static/images/wrapper/"+fileName;
        $("#desktopcontiner").find(".desktopWrapper").css("background", "transparent url(" + fileUrl + ") repeat center top")
    }
    function clickSetWrapper2(fileName){
        wrapperImgType.value=true;
        var userData = VueCookies.get('TUser');
        var userID = userData.userID;
        setWrapper(userID,fileName);
    }
    function setWrapper(userID,fileName){
        postSetWrapper('api/setWrapper',{userID:userID,fileName:fileName,wrapperImgType:wrapperImgType.value}).then(res=>{
            if(res.data.flag){
                playSound('info')
                showThemeMenu.value=false;
                wrapperImg.value = "/static/images/wrapper/"+fileName;
                toastr.success('壁纸修改成功！')
            }
        },err=>{
            toastr.warning('服务器错误！'+err.response.statusText);
        });
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
    function passFiter(oldPass,newPass1,newPass2){
        var level = 0;
        if(oldPass==''){
            toastr.warning('必须输入原密码！','修改密码！');
            return false;
        }
        if(newPass1==''){
            toastr.warning('请输入密码！','修改密码！');
            return false;
        }
        if(newPass1!=newPass2){
            toastr.warning('请再次输入密码！','修改密码！');
            return false;
        }
        if(newPass1!=newPass2){
            toastr.warning('俩次密码输入不一致！','修改密码！');
            return false;
        }
        if(newPass1.length8 < 8){
            return level;
        }
        if(/\d/.test(newPass1)){
            level++;
        }
        if(/[a-z]/.test(newPass1)){
            level++;
        }
        if(/[A-Z]/.test(newPass1)){
            level++;
        }
        if(/\W/.test(newPass1)){
            level++;
        }
        if(level<3){
            toastr.warning('新密码强度太弱,请使用8位及以上的数字+字母+特殊符号组合！','修改密码！');
            return false;
        }
        return true;
    }

    // 
    function oneTimeLogin() {
        var userData = VueCookies.get('TUser');
        var username = '';
        if(userData) {
            username = userData.username;
        }else{
            location.href = "/"
        }
        getLogin('api/getLogin',{username:username}).then(res=>{
            if(res.status==200){
                var data = res.data;
                if(!data.loginStatus){
                    location.href = "/"
                }else{
                    initClock();
                    $("#desktopFrame1_Panel_Task_Status").find(".Clock").html(Time1.value+'<br>'+Time2.value+CWeek.value)
                    if(!data.userPic){
                        userHeadPic.value='/static/images/user/new.png'
                    }else{
                        userHeadPic.value=data.userPic;
                    }
                }
            }
        },err=>{
            toastr.warning('服务器错误！'+err.response.statusText);
            $("#desktopFrame1_Panel_Task_Status").find(".Clock").html('<font color="#ffff00">网络脱机</br>正在重新连接...</font>')
        });
    }

    function init(){
        var timer;
        clearInterval(timer==''?timer:'');
        timer = setInterval(() => {
            // console.log('实时登录验证')
            oneTimeLogin();
        }, 2000);
        // 
        var userData = VueCookies.get('TUser');
        var userID = userData.userID;
        readConfig('api/readConfig',{userID:userID}).then(res=>{
            wrapperImgType.value = res.data.wrapperImgType;
            wrapperImg.value = res.data.wrapperImg;
            installApp.value = res.data.installApp;
            userApp.value = res.data.userApp;
            installWidget.value = res.data.installWidget;
            if(res.data.system.myTheme!='default'){
                document.getElementById("mytheme").href ="/Theme/"+ res.data.system.myTheme + "/theme.css"
            }
            if(!res.data.wrapperImgType){
                $("#desktopcontiner").find(".desktopWrapper").css("background", "transparent url(" + res.data.wrapperImg + ") repeat center top")
            }

        },err=>{
            toastr.warning('服务器错误！'+err.response.statusText);
        });
        getThemeList('api/getThemeList').then(res=>{
            TList.value = res.data.themeList;
            WList.value = res.data.wrapperList;
        },err=>{
            toastr.warning('服务器错误！'+err.response.statusText);
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