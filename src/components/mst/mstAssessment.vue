<template>
  <div>
      <van-nav-bar title="课堂评价" left-text="返回" left-arrow 
      @click-left="$router.go('-1')">
      <template #right>
          <div @click="$router.push('/mstMessagerecord')" style="color:#999;" >留言记录</div>
      </template>
    </van-nav-bar>
   
      <!--  日期-->
      <div @click="showDate = true">
        <mt-cell title="日期" is-link>
          <img
            slot="icon"
            src="../../assets/job/日期.png"
            width="20"
            height="20"
          />
          {{ date }}
        </mt-cell>
      </div>
      <van-calendar
        color="#1B8FFF"
        v-model="showDate"
        @confirm="onConfirmDate"
        :min-date="minDate"
        :max-date="maxDate"
      />
   <div v-if="appraiseList.length!=0">
      <div>
     <div v-for="(item,i) of appraiseList" :key="i">
      <div class="content" style="background-color: #fff" @click="unfold(item)">
        <div class="text">
          <div class="time">课程编号{{item.courseNumber}}/{{item.product}}/{{item.student}}/{{item.semester}}</div>
          <div>
            <van-tag type="primary" style="color: #fff">{{item.subject}}</van-tag>
          </div>
        </div>
        <div class="txt">{{item.createDate}} 时间段:{{item.timeRange}}</div>
        <div class="user">
          <div>
            <van-icon name="user-o" />
          </div>
        </div>
      </div>
   <div v-show="item.courseDescId==id">
      <div style="margin-top: 20px">
        <sidebar> 进度描述</sidebar>
        <div style="margin:10px 15px; color:#666;">{{item.courseProcess}}</div>
        <div style="display: flex; align-items: center">
          <van-field
            v-model="progress"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言的内容"
          />
          <van-button size="small" round type="info" :disabled="btnProgress" @click="progressFun">留言</van-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <sidebar> 课程内容描述</sidebar>
           <div style="margin:10px 15px; color:#666;">{{item.content}}</div>
        <div style="display: flex; align-items: center">
          <van-field
            v-model="course"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言的内容"
          />
          <van-button size="small" round type="info" :disabled="btnCourse" @click="courseFun">留言</van-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <sidebar> 学生态度描述</sidebar>
          <div style="margin:10px 15px; color:#666">{{item.studentManner}}</div>
        <div style="display: flex; align-items: center">
          <van-field
            v-model="manner"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言的内容"
          />
          <van-button size="small" round type="info" :disabled="btnManner" @click="mannerFun">留言</van-button>
        </div>
      </div>
      <div style="margin-top: 20px">
       
        <sidebar> 计划和要求</sidebar>
         <div style="margin:10px 15px; color:#666;">{{item.planAndRequirement}}</div>
        <div style="display: flex; align-items: center">
          <van-field
            v-model="plan"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言的内容"
          />
          <van-button size="small" round type="info" :disabled="btnPlan" @click="planFun">留言</van-button>
        </div>
      </div>
      <div style="margin-top: 20px; display: flex; align-items: center">
        <sidebar style="margin-top: 0px; line-height: 20px">
          课堂吸收效果</sidebar
        >
        <van-rate
          v-model="item.courseEffect"
          :size="15"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
      </div>
     </div>
     </div>
     </div>
    </div>
      <div v-else>
          <van-empty description="暂无课程评价"/>
        </div>
  </div>
</template>
<script>
import sidebar from "../sidebar.vue";
export default {
  components: { sidebar },
  data() {
    return {
      progress: "", //进度
      course: "", //课程描述
      manner: "", //态度
      plan: "", //计划
      courseResult: 0, //课堂效果
      btnProgress:false,
      btnCourse:false,
      btnManner:false,
      btnPlan:false,
      appraiseList:[],
      showDate: false,
      date: this.$store.state.date,
      minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
      id:"-1"
    };
  },
  methods: {
    formatDate(date) {
       const moment = require("moment")
      return  moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.appraiseList=[];
      this.appraise(); 
    },
    //展开
    unfold(obj){
          if(this.id==obj.courseDescId){
              this.id = "-1"
          }else{
             this.id = obj.courseDescId;
          }
          this.plan ="";
          this.progress="";
          this.course="";
           this.manner="";
    },
    //进度描述
    progressFun(){
          let data ={id : this.id,courseProcessA:this.progress}
          if(this.progress !=""){
                this.axios.post("vx/courseDesc/updateById",data).then(res=>{
                    if(res.data.success){
                        this.$toast("留言成功")
                         this.btnProgress = true
                    }else{
                        this.$toast("留言失败请重新发送")
                    }
              })  
          }else{
             this.$toast("进度的描述不能为空")
          }
    },
    // 课程内容 描述 的留言
     courseFun(){
           let data ={id : this.id,contentA:this.course}
          if(this.course !=""){
                this.axios.post("vx/courseDesc/updateById",data).then(res=>{
                 // console.log(res);
                    if(res.data.success){
                        this.$toast("留言成功")
                         this.btnCourse = true
                    }else{
                        this.$toast("留言失败请重新发送")
                    }
              })  
          }else{
             this.$toast("课程内容留言不能为空")
          }
     },
    //  学生态度留言
     mannerFun(){
              let data ={id : this.id,studentMannerA:this.manner}
          if(this.manner !=""){
                this.axios.post("vx/courseDesc/updateById",data).then(res=>{
               //   console.log(res);
                    if(res.data.success){
                        this.$toast("留言成功")
                         this.btnManner = true
                    }else{
                        this.$toast("留言失败请重新发送")
                    }
              })  
          }else{
             this.$toast("学生态度留言不能为空")
          }
     },
      //  计划和要求留言
     planFun(){
              let data ={id : this.id,planAndRequirementA:this.plan}
          if(this.plan !=""){
                this.axios.post("vx/courseDesc/updateById",data).then(res=>{
                 // console.log(res);
                    if(res.data.success){
                        this.$toast("留言成功")
                         this.btnPlan = true
                    }else{
                        this.$toast("留言失败请重新发送")
                    }
              })  
          }else{
             this.$toast("计划和要求留言不能为空")
          }
      },
    // 筛选日期的请求
    appraise() {
      let data = {
        createTime: this.date,
        pageSize: "5",
        pageNo: "1",
        token:this.getLocalStorage("token"),
      };
        this.$toast.loading({
            message: "加载中...",
            duration: 0,
            closeOnClick: true,
          });
      this.axios.post("vx/courseDesc/queryCourseDesc",data).then(res=>{
              if(res.data.success){
                for(let item of res.data.result.records){
                  item.courseEffect = parseInt(item.courseEffect)
                    this.appraiseList.push(item);
                    }
                    this.$toast.clear();
                 //  console.log(this.appraiseList);
              }else{
                  this.$toast("查询失败")
              }
          
          
      })
    },
    
  },
  mounted(){
      this.appraise();  
  }
};
</script>
<style scoped>
.Myinput {
  border-color: rgba(red, green, blue, alpha);
  border-width: 0.1px;
}
</style>