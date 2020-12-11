import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import vant from "vant"
// import 'vant/lib/index.css'
import axios from "axios"
import {Cell} from "mint-ui";
import "mint-ui/lib/style.css";

import { Toast} from "vant";
//  图片预览
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css';
 Vue.use(Toast);
//  Vue.use(vant);
 Vue.prototype.$toast=Toast
Vue.use(VueDirectiveImagePreviewer)
Vue.component(Cell.name, Cell);
Vue.prototype.axios=axios

axios.defaults.baseURL="api"
// axios.defaults.baseURL="http://192.168.0.119:80/msdj/"


// axios.defaults.timeout=3000//设置超时时间
// // axios.defaults.retry=3 //设置全局请求次数
// // axios.defaults.retryDelay =1000  //设置全局请求间隙 
// //http拦截器
// axios.interceptors.response.use((response)=>{
//   console.log("响应");
//     console.log(response);
   
// },err=>{
//     console.log(err);
// }
// )
// // 请求拦截器
// axios.interceptors.request.use(function (config) {
//   return config;
//   }, function (error) {
//   return Promise.reject(error);
//  });



Vue.filter("date",function(oldVal){
    let date = new Date(oldVal) 
    let year = date.getFullYear();
    //日期
    let data=date.getDate()>=10 ? date.getDate() : "0"+( date.getDate());
    //月份
    let day = date.getMonth()+1>=10  ? date.getMonth()+1 : "0" + (date.getMonth()+1);
    let  hours = date.getHours();
    let   minute = date.getMinutes();
    let time = year+"-" + day  +"-" + data + " " + hours + ":" + minute;
    return time
  })

  
 Vue.prototype.getLocalStorage = function (key){
    let obj = JSON.parse(localStorage.getItem(key))
    let now = new Date().getTime();
    if (now-obj.createTime>obj.expire){
        localStorage.removeItem(key);
        return null;
    }
    return JSON.parse(obj.data);
  }
  Vue.prototype.setLocalStorage = function (key,value,expire){
    let obj = {
        data:JSON.stringify(value),
        createTime:new Date().getTime(),
        expire:expire
    }
    localStorage.setItem(key,JSON.stringify(obj));
  }
 
Vue.directive('hasPermission',{
    inserted :(el, binding)=>{
      let hasPermission = false;
      let data = {
          token: new Vue().getLocalStorage("token"),
          roles : binding.value
      }
      axios.post("sys/user/hasPermission",data).then((res)=>{
          hasPermission = res.data.result;
          if (hasPermission == false){
              el.remove();
          }
      })   
       
    },
})

  

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
