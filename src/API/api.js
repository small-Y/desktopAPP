import axios from "axios";

// axios.create({
//     baseURL: "http://localhost:8080/",  //配置固定域名
//     timeout: 5000
// })
export function getLogin(url,params){
    return axios.post(url,params);
}
export function Login(url,params){
    return axios.post(url,params);
}
export function postLoginOut(url,params){
    return axios.post(url,params);
}
export function readConfig(url,params){
    return axios.post(url,params);
}
export function postUserSign(url,params){
    return axios.post(url,params);
}
export function getThemeList(url,params){
    return axios.post(url,params);
}
export function postSetTheme(url,params){
    return axios.post(url,params);
}
export function postSetWrapper(url,params){
    return axios.post(url,params);
}
export function uploadPic(url,params){
    return axios.post(url,params);
}
export function setUserPass(url,params){
    return axios.post(url,params);
}
export function getWeather(url,params){
    return axios.post(url,params);
}

export default {
    getLogin,
    postLoginOut,
    Login,
    readConfig,
    postUserSign,
    getThemeList,
    postSetTheme,
    postSetWrapper,
    uploadPic,
    setUserPass,
    getWeather
}



// import  request  from "../..//utils/request.js";

// export function getTodayPic(url){
//     return request.post(url);
// }


// import { getCurrentInstance } from "vue"
// export function getTodayPic(url){
//     const { ctx }   = getCurrentInstance()
    // ctx.$axios.get('/chinaData/100000.json').then((res) => {
    //     console.log(res, '返回的数据')
    // })
//     return  ctx.$axios.get(url);
// }
// export default{
//     getTodayPic
// }