import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Taskdesk from "../components/Taskdesk.vue"
import Login from "../components/login.vue"
import Logon from "../components/logon.vue";
import Course from "../views/Course.vue";
import Job from "../views/Job.vue"
import workWeakness from "../components/work/workWeakness.vue";
import Student from "../components/student.vue";
import no from "../components/no.vue"
import { Toast } from 'vant';
import students from "../views/student/home.vue";
import Upload from "../views/student/upload.vue";

Vue.use(VueRouter)

const routes = [

  {
    path: "/students",
    name: "students",
    component: students,
    //  ../views/studentLibrary/difficult.vue

  },
  // 疑难库
  { path: '/students/difficult', name: 'difficult', component: resolve => require(['../views/studentLibrary/difficult.vue'], resolve) },
  // // 疑难详情
  { path: '/studentDetails/:id/:type', name: 'diffcultDetails', component: resolve => require(['../views/studentDetails/diffcultDe.vue'], resolve) },
  // // 成绩库  
  { path: '/performance', name: 'performance', component: resolve => require(['../views/studentLibrary/performance.vue'], resolve) },
  // // 错题库
  { path: '/errorLibrary', name: 'errorLibrary', component: resolve => require(['../views/studentLibrary/error.vue'], resolve) },
  // // 错题库
  { path: '/workLibrarys', name: 'workLibrarys', component: resolve => require(['../views/studentLibrary/work.vue'], resolve) },
  // // 试卷库
  { path: '/testLibrary', name: 'testLibrary', component: resolve => require(['../views/studentLibrary/testPaper.vue'], resolve) },
  // // 笔记库
  { path: '/notesLibrary', name: 'notesLibrary', component: resolve => require(['../views/studentLibrary/notes.vue'], resolve) },
  // // 笔记库
  { path: '/reviewLibrary', name: 'reviewLibrary', component: resolve => require(['../views/studentLibrary/review.vue'], resolve) },
  // // 投诉
  { path: '/complaint', name: 'complaint', component: resolve => require(['../views/studentuser/complaint.vue'], resolve) },
  // // 建议
  { path: '/suggest', name: 'suggest', component: resolve => require(['../views/studentuser/suggest.vue'], resolve) },
  // // 通知中心
  { path: '/notification', name: 'notification', component: resolve => require(['../views/studentuser/notification.vue'], resolve) },
  // //  我的
  { path: '/studentUser', name: 'studentUser', component: resolve => require(['../views/student/studentUser.vue'], resolve) },
  // 个人信息
  { path: '/userDetails', name: 'userDetails', component: resolve => require(['../views/student/userDetails.vue'], resolve) },
  // 课程通知
  { path: '/courseNotice', name: 'courseNotice', component: resolve => require(['../views/studentuser/courseNotice.vue'], resolve) },
   // 课程通知
   { path: '/noticeHistory', name: 'noticeHistory', component: resolve => require(['../views/studentuser/noticeHistory.vue'], resolve) },
  //  上传
  {
    path: "/upload",
    name: "upload",
    component: Upload,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      let vm = new Vue();
      if (vm.getLocalStorage("identity") == "学生") {
        next("/students")
      } else {
        next();
      }
    }
  },

  {
    path: "/taskdesk",
    name: 'Taskdesk',
    component: Taskdesk
  },
  {
    path: "/no",
    name: 'no',
    component: no
  },
  {
    path: "/student",
    name: 'Student',
    component: Student
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/studentLogin",
    component: () => import(/* webpackChunkName: "studentLogin" */ "../components/studentLogin.vue")
  },
  {
    path: "/logon",
    component: Logon
  },
  {
    path: "/course",
    component: Course
  },

  {
    path: "/cissue",
    component: () => import(/* webpackChunkName: "cissue" */ "../components/CourseIssue.vue")
  },
  {
    path: "/courseSchedule",
    component: () => import(/* webpackChunkName: "courseSchedule" */ "../components/CourseSchedule.vue")
  },

  {
    path: "/scheduleLook",
    component: () => import(/* webpackChunkName: "scheduleLook" */ "../components/scheduleLook.vue")
  },
  {
    path: "/pdf",
    component: () => import(/* webpackChunkName: "pdfPreview" */ "../views/util/pdfPreview")
  },
  {
    path: "/audit",
    component: () => import(/* webpackChunkName: "audit" */ "../components/Audit.vue")
  },
  {
    path: "/courselist",
    component: () => import(/* webpackChunkName: "CourseList" */ "../components/CourseList.vue")
  },
  {
    path: "/courseBench",
    component: () => import(/* webpackChunkName: "CourseBench" */ "../components/CourseBench.vue")
  },
  {
    path: "/coursematerial",
    component: () => import(/* webpackChunkName: "coursematerial" */ "../components/CourseMaterial.vue")
  },
  {
    path: "/job",
    component: Job
  },
  {
    path: "/jobAssgin",
    component: () => import(/* webpackChunkName: "jobAssgin" */ "../job/jobAssgin.vue")
  },
  {
    path: "/jobExamine",
    component: () => import(/* webpackChunkName: "jobExamine" */ "../job/jobExamine.vue")
  },
  //jobSubmit
  {
    path: "/jobSubmit",
    component: () => import(/* webpackChunkName: "jobSubmit" */ "../job/jobSubmit.vue")
  },
  {
    path: "/jobCheck",
    component: () => import(/* webpackChunkName: "jobCheck" */ "../job/jobCheck.vue")
  },
  // work
  {
    path: "/workRegister",
    component: () => import(/* webpackChunkName: "workRegister" */  "../components/work/workRegister.vue")
  },
  {
    path: "/workErr",
    component: () => import(/* webpackChunkName: "workErr" */  "../components/work/workErr.vue")
  },
  {
    path: "/workWeakness",
    component: workWeakness
  },
  {
    path: "/workList",
    component: () => import(/* webpackChunkName: "workList" */  "../components/work/workList.vue")
  },
  { path: '/workDifficult', name: 'workDifficult', component: resolve => require(['../components/work/workDifficult.vue'], resolve) },

  {
    path: "/workPerformance",
    component: () => import(/* webpackChunkName: "workPerformance" */  "../components/work/workPerformance.vue")
  },
  { path: '/workLoginHistory', name: 'workLoginHistory', component: resolve => require(['../components/work/workLoginHistory.vue'], resolve) },

  { path: '/workQuestions', name: 'workQuestions', component: resolve => require(['../components/work/workQuestions.vue'], resolve) },

  { path: '/workLibrary', name: 'workLibrary', component: resolve => require(['../components/work/workLibrary.vue'], resolve) },

  { path: '/workLabel', name: 'workLabel', component: resolve => require(['../components/work/workLabel.vue'], resolve) },
  // 统计项
  { path: '/workStatistics', name: 'workStatistics', component: resolve => require(['../components/work/workStatistics.vue'], resolve) },

  {
    path: "/test",
    component: () => import(/* webpackChunkName: "test" */  "../views/test.vue")
  },


  // late 晚辅
  {
    path: "/lateCoach",
    component: () => import(/* webpackChunkName: "lateCoach" */  "../components/lateCoach/lateCoach.vue")
  },
  {
    path: "/lateRegister",
    component: () => import(/* webpackChunkName: "lateRegister" */  "../components/lateCoach/lateRegister.vue")
  },
  {
    path: "/lateSign",
    component: () => import(/* webpackChunkName: "lateSign" */  "../components/lateCoach/lateSign.vue")
  },
  {
    path: "/lateAttendance",
    component: () => import(/* webpackChunkName: "lateAttendance" */  "../components/lateCoach/lateAttendance.vue")
  },
  {
    path: "/lateExplain",
    component: () => import(/* webpackChunkName: "lateExplain" */  "../components/lateCoach/lateExplain.vue")
  },
  {
    path: "/lateRatio",
    component: () => import(/* webpackChunkName: "lateRatio" */  "../components/lateCoach/lateRatio.vue")
  },
  {
    path: "/lateHistory",
    component: () => import(/* webpackChunkName: "lateHistory" */  "../components/lateCoach/lateHistory.vue")
  },
  {
    path: "/leteCheck",
    component: () => import(/* webpackChunkName: "leteCheck" */  "../components/lateCoach/leteCheck.vue")
  },
  {
    path: "/beLate",
    component: () => import(/* webpackChunkName: "beLate" */  "../components/lateCoach/beLate.vue")
  },
  { path: '/lateDay', name: 'lateDay', component: resolve => require(['../components/lateCoach/lateDay.vue'], resolve) },

  { path: '/lateStatistics', name: 'lateStatistics', component: resolve => require(['../components/lateCoach/lateStatistics.vue'], resolve) },
  // 铭师通

  {
    path: "/mst",
    component: () => import(/* webpackChunkName: "mst" */  "../components/mst/mst.vue")
  },

  { path: '/mstCourse', name: 'mstCourse', component: resolve => require(['../components/mst/mstCourse.vue'], resolve) },

  { path: '/mstHistory', name: 'mstHistory', component: resolve => require(['../components/mst/mstHistory.vue'], resolve) },

  { path: '/mstAssessment', name: 'mstAssessment', component: resolve => require(['../components/mst/mstAssessment.vue'], resolve) },

  { path: '/mstAnalyse', name: 'mstAnalyse', component: resolve => require(['../components/mst/mstAnalyse.vue'], resolve) },

  { path: '/mstPublicity', name: 'mstPublicity', component: resolve => require(['../components/mst/mstPublicity.vue'], resolve) },

  { path: '/mstStatistics', name: 'mstStatistics', component: resolve => require(['../components/mst/mstStatistics.vue'], resolve) },

  { path: '/mstMessagerecord', name: 'mstMessagerecord', component: resolve => require(['../components/mst/mstMessagerecord.vue'], resolve) },

  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */  "../views/user.vue")
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, form, next) => {
  // if (to.path != '/test') {
    // let agent = navigator.userAgent.toLocaleLowerCase();
    // if (agent.indexOf("micromessenger") === -1) {
    //   next("/test");
    //   return;
    // }
    //如果进入到的路由是登录页或者注册页面，则正常展示
    if (to.path == '/login' || to.path == '/logon') {
      next();
    } else if (!(localStorage.getItem('token'))) {
      Toast("还没有登录，请先登录！")
      next('/login');     //转入login登录页面，登录成功后会将token存入localStorage
    } else {
      next();
    }
  // } else {
  //   next();
  // }
})
export default router
