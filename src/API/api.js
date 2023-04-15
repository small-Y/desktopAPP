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
export function getTodayPic(url){
    return axios.get(url);
}
export function getCityList(url){
    return axios.get(url);
}
export function postLoginOut(url,params){
    return axios.post(url,params);
}

export default {
    getTodayPic,
    getCityList,
    getLogin,
    postLoginOut,
    Login
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