import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)
const moment = require("moment");
export default new Vuex.Store({
  state: {
    token:  localStorage.getItem("token")==null ? null : localStorage.getItem("token").data ,
    islogin:"",
    studentList: [],////学生的列表
    timeList: [],   //学期段
    NatureList: [], //作业性质
    sourceList: [],  // 作业来源
    subjectList: [], //科目
    sectionList: [], //问题类别
    mstcourseList:[] , //名师通课程通知
    pageNo :"1",
    pageSize:"5",
    // imgURL: "http://192.168.0.119:80/msdj/sys/common/static/",
    imgURL:"api/sys/common/static/",
    date :   moment(new Date()).format("YYYY-MM-DD")
  },
  mutations: {
    // 学期段
      time(state,payload){
        state.timeList=[]
         for(let item of payload){
            state.timeList.push(item.title) 
         }
      },
      // 学生
      student(state,payload){
        state.studentList=[];
        for(let item of payload){
          let studentObj = {text: item.realname, value: item.id}
          state.studentList.push(studentObj) 
        }
      },
      // 科目
      subject(state,payload){
        state.subjectList=[]
        for(let item of payload){
          state.subjectList.push(item.title) 
       }
      },
       // 问题类别
       section(state,payload){
        state.sectionList=[]
        for(let item of payload){
          state.sectionList.push(item.title) 
       }
      },
      //名师通课程通知 
      mstCourse(state,payload){
          state.mstcourseList=[]
              for(let item of payload){
                state.mstcourseList.push(item)
        }
      },
      // 作业来源
      source(state,payload){
          state.sourceList=[];
          for(let item of payload){
            state.sourceList.push(item.title)
        }
      },
      //身份 
      identity(state,payload){
          state.islogin =  payload
            
      }
      
  },
  actions: {
    // 学期段
    semester(content,payload) {
     axios.post("vx/coursePublish/findCategoryByName", payload).then( (res => {
                content.commit("time" ,res.data.result)
      }))
    },
    // 学生 
      students(content,payload){
        axios.post("vx/task/getAllReceiver", payload).then( (res => {
             content.commit("student" ,res.data.result)
         })) 
      },
      // 科目
      subjects(content,payload){
        axios.post("vx/coursePublish/findCategoryByName",payload).then((res => {
            content.commit("subject" ,res.data.result)
        }))
      },
        // 问题类别
        sections(content,payload){
          axios.post("vx/coursePublish/findCategoryByName", payload).then( (res => {
               content.commit("section" ,res.data.result)
           })) 
        },
         //名师通课程通知
         mstCourses(content,payload){
            axios.post("vx/coursePublish/queryStudentConfirm ", payload).then( (res => {
              content.commit("mstCourse" , res.data.result.records)
          })) 
       } ,
      // 作业 来源
      sources(content,payload){
          axios.post("vx/coursePublish/findCategoryByName", payload).then( (res => {
            content.commit("source" ,res.data.result)
          
         })) 
      },


        // 
       studentIs(content,payload){
        axios.post("sys/user/hasPermission", { token: payload,
          roles: ["老师"]}).then((res) => {
                  if(res.data.result){
                    console.log(11);
                    content.commit("identity","老师")  
                  }else{
                       
               }
          })
       },
  },

  modules: {
  }
})
