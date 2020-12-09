<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="统计项"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
      <template #right> </template>
    </van-nav-bar>
    <!-- 日期 -->
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
      color="#1B8FFFFF"
      v-model="showDate"
      @confirm="onConfirmDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
        <img
          slot="icon"
          src="../../assets/course/学生.png"
          width="20"
          height="20"
        />
        {{ studentName }}
      </mt-cell>
    </div>
    <van-popup v-model="showStudent" position="bottom">
      <van-picker
        show-toolbar
        :columns="$store.state.studentList"
        @confirm="onConfirmStudent"
        @cancel="showStudent = false"
      />
    </van-popup>
    <!-- 科目-->
    <div @click="showSubject = true">
      <mt-cell title="科目" is-link>
        <img
          slot="icon"
          src="../../assets/job/科目.png"
          width="20"
          height="20"
        />
        {{ subject }}
      </mt-cell>
    </div>
    <van-popup v-model="showSubject" position="bottom">
      <van-picker
        show-toolbar
        :columns="$store.state.subjectList"
        @confirm="onConfirmSubject"
        @cancel="showSubject = false"
      />
    </van-popup>
    <!-- 学期段 -->
    <div @click="showClass = true">
      <mt-cell title="学期段" is-link>
        <img
          slot="icon"
          src="../../assets/course/学期段.png"
          width="24"
          height="24"
        />
        {{ classTime }}
      </mt-cell>
    </div>
    <van-popup v-model="showClass" position="bottom">
      <van-picker
        show-toolbar
        :columns="$store.state.timeList"
        @confirm="onConfirmClass"
        @cancel="showClass = false"
      />
    </van-popup>
      <div style=" display: flex;   margin:10px 0px;" >
              <van-tag  style="margin:0px 15px" v-show="studentName" color="#b8b8b8ff" closeable size="large"  @close="close(studentName)">
              {{studentName}}
            </van-tag> 
              <van-tag  v-show="subject" style="margin:0px 15px" color="#b8b8b8ff" closeable size="large" @close="close(subject)">
              {{subject}}
            </van-tag> 
           <van-tag  v-show="classTime" style="margin:0px 15px" color="#b8b8b8ff" closeable size="large"  @close="close(classTime)">
              {{classTime}}
            </van-tag> 
      </div>
    <!-- 全部 -->
    <!-- <div>
      <mt-cell title="状态" is-link>
        <img
          slot="icon"
          src="../../assets/late/状态.png"
          width="24"
          height="24"
        />
        全部
      </mt-cell>
    </div> -->
    <!-- 显示的内容 -->
    <table style="width:100%;" >
      <tr class="blueFont" style=" line-height: 2;">
        <th >学生</th>
        <th>时间</th>
        <th >科目</th>
        <th >项目数</th>
        <th >状态</th>
      </tr>
      <tr style="text-align:center;  line-height: 2; " class="grayFont" v-for="(item,i) of statisticsList" :key="i"> 
         <td >{{item.student}}</td>
         <td >{{item.createTime}}</td>
         <td >{{item.subject}}</td>
          <td >{{item.count}}</td>
          <td > 
               <span v-if="item.mark==1">
                   <van-tag type="primary "  round> 已标记</van-tag>
              </span>
               <span v-else>
                   <van-tag type="danger "  round> 未标记</van-tag>
              </span>
               </td>
      </tr>
     
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showClass: false,
      showDate: false,
      showStudent: false,
      showSubject: false,
      studentName: "",
      subject: "",
      date: this.$store.state.date,
      classTime: "", //学期段
      studentId: "",
      minDate: new Date(2020, 9, 1),
      maxDate: new Date(2050, 10, 31),
      statisticsList:[],
    };
  },
  methods: {
    //删选去标签
    close(value){
         if(this.subject==value){
            this.subject=""
            this.statistics();
         }else if(this.classTime==value){
            this.classTime=""
              this.statistics();
         }else{
            this.studentName=""
            this.studentId=""
              this.statistics();
         }
    },

    //  学生的弹出框
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text;
      this.studentId = value.value;
       this.statistics();
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
       this.statistics();
    },
    // 日期
    formatDate(date) {
      const moment = require("moment");
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
       this.statistics();
    },
    //学期段
    onConfirmClass(value) {
      this.showClass = false;
      this.classTime = value;
       this.statistics();
    },
    statistics(){
       this.statisticsList=[];
         let data ={
             studentId:this.studentId,
             createTime:this.date,
             subject:this.subject,
             semester:this.classTime
         }
         //console.log(data);
         this.axios.post("vx/homeworkDesc/queryAll",data).then(res=>{
            // console.log(res);
                 if(res.data.result.length!=0){
                   const moment = require("moment")
                        for(let item of  res.data.result){
                          item.createTime= moment(item.createTime).format("HH:mm")
                            this.statisticsList.push(item) 
                               
                        }
                 }else{
                    this.$toast("暂无数据")
                 }
                  
                 
         });
    }
  },
  mounted(){
     this.statistics();
    this.$store.dispatch("semester", { name: "学期段" });
    this.$store.dispatch("students", { roleList: ["学生"] });
    this.$store.dispatch("subjects", { name: "科目" });
  }
};
</script>
<style scoped>
</style>