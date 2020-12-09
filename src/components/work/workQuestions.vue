<template>
<div >
  <!-- 导航栏 -->
    <van-nav-bar title="答疑登记" left-text="返回" left-arrow   @click-left="$router.go('-1')">
        <template #right>  </template>
    </van-nav-bar>
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
        <img slot="icon" src="../../assets/course/学生.png" width="20" height="20"/>
        {{studentName}}
      </mt-cell>
    </div>
    <van-popup v-model="showStudent" position="bottom">
      <van-picker
          show-toolbar
          :columns="studentList"
          @confirm="onConfirmStudent"
          @cancel="showStudent = false"
      />
    </van-popup>
       <!-- 本次时长 -->
   <div @click="showTimes = true" >
      <mt-cell title="本次时长" is-link>
        <img slot="icon" src="../../assets/job/时间.png" width="20" height="20"/>
          {{messageTimes}}
      </mt-cell>
    </div>
    <van-popup v-model=" showTimes" position="bottom">
      <van-picker title="请选择本次时长" show-toolbar @confirm="onConfirmExpect" @cancel="showTimes = false;" :columns="timePicker" />
    </van-popup>
         <!-- 科目-->
     <div @click="showSubject = true">
      <mt-cell title="科目" is-link>
        <img slot="icon" src="../../assets/job/科目.png" width="20" height="20"/>
          {{subject}}
      </mt-cell>
    </div>
    <van-popup v-model="showSubject " position="bottom">
      <van-picker
          show-toolbar
          :columns="subjectList"
          @confirm="onConfirmSubject"
          @cancel="showSubject = false"
      />
    </van-popup>
    <!-- 讲解题次 -->
   <div>
      <mt-cell title="讲解题次" is-link>
        <img slot="icon" src="../../assets/late/讲解题次.png" width="20" height="20"/>
          <span> {{coachCount}} </span>
      </mt-cell>
    </div>
    <div class="demo"></div>
      <!-- 附件 -->
    <div>
        <sidebar > 答疑题目:</sidebar>
        <div>
          <van-uploader style="margin:10px 10px;" v-model="fileList" multiple />
        </div>
    </div>
    <!--  -->
    <div>
         <sidebar > 备注:</sidebar>
    </div>
     <!-- 作业来源-->
     <div >
      <mt-cell title="作业来源" is-link>
        <img slot="icon" src="../../assets/job/作业来源.png" width="20" height="20"/>
         <van-field
                v-model="source"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入作业来源"
                 required
                input-align="right"
              />
      </mt-cell>
    </div>
     <!-- 章节-->
      <div >
      <mt-cell title="章节" is-link>
        <img slot="icon" src="../../assets/job/章节.png" width="20" height="20"/>
          <van-field
                v-model="section"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入章节"
                  required
                   input-align="right"
              />
      </mt-cell>
    </div>
     <!-- 页码-->
      <div >
      <mt-cell title="页码" is-link>
        <img slot="icon" src="../../assets/late/页码2.png" width="20" height="20"/>
          <van-field
                v-model="page"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入页码,例:P25-35"
                required
                input-align="right"
              />
      </mt-cell>
    </div>
     <!-- 题号-->
      <div >
      <mt-cell title="题号" is-link>
        <img slot="icon" src="../../assets/late/题号.png" width="20" height="20"/>
                <van-stepper v-model="choice" integer />
                <!-- choice -->
      </mt-cell>
    </div>
    <van-button type="info" round block @click="save()">提交</van-button>
  
</div>
</template>
<script>
import sidebar from "../sidebar.vue"
export default {
    components:{sidebar},
    data(){
        return {
            showStudent:false,//
            showSource:false ,//作业来源
            showSubject:false, 
            showDate:false,//
            showTimes: false  ,////本次时长
            studentList:[],
            sourceList:["勤学早"],
            subjectList:[],
            studentName:"",
            source:"",//作业来源
            subject:"",  //科目
            section:"", // 章节
            date: this.$store.state.date ,//日期
            page:"", //页码
            choice:0, //题号
            messageTimes:"", //本次时长
            knowledge:'', //知识点
            coachCount:"",//讲解次数
            studentId :"",
            fileList:[],
            btnShow:false,
            attendanceId:"",//
              timePicker: [
      
        {
           values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23"
          ]
        },
        {
          values: [" 小时 "]
        },
        {
             values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
            "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
            "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
          ]
          
        },
        {
          values: ["分钟"]
        },
      
      ]
        }
    },
    methods:{
       //  学生的弹出框
        onConfirmStudent(value){
             this.showStudent=false;
             this.studentName=value.text
             this.studentId = value.value
              this.attendanceId =value.id
        const moment  = require("moment")
        let now = new Date();
       let data = {
        student: value.text,
        startDate: moment(new Date()).format("YYYY-MM-DD") ,
        endDate: moment(now.setDate(now.getDate()+1)).format("YYYY-MM-DD")
      }
      console.log(data);
     this.axios.post("vx/nightCoach/nightCoachStatistics",data).then((res)=>{
        console.log(res);
          if(res.data.result.length!=0){
               this.coachCount = res.data.result[0].coachCount +"次"
          }
      })
        },
        //本次时间
              onConfirmExpect(time) {
            let timeStr = "";
            for (let i = 0; i <time.length ; i++) {
              timeStr+=time[i];
            }
            this.messageTimes = timeStr;
            this.showTimes = false;
          },
        // 作业来源
        onConfirmSource(value){
             this.showSource =false;
             this.source= value;
        },
        // 科目
        onConfirmSubject(value){ this.subject =value ; this.showSubject=false},
        // 章节
           formatDate(date) {
             const moment =require("moment")
              return  moment(date).format("YYYY-MM-DD");
            },
           onConfirmDate(date) {
              this.showDate = false;
              this.date = this.formatDate(date);
            },
            save(){
                  
                 if(  this.source!='' && this.subject!='' && this.section!='' && this.date!='' &&  this.messageTimes!=''   && this.studentName!=''  && this.page!="")  {
                              let fileData= new FormData();
                        for(let item of this.fileList){
                                 fileData.append("file" ,item.file)
                        }
                        this.axios.post("sys/common/upload",fileData).then(res=>{
                              let data= {
                                    token:this.getLocalStorage("token"),
                                    student: this.studentName ,
                                    studentId: this.studentId,
                                    source : this.source,
                                    subject :this.subject,
                                    chapter :this.section,
                                    questionNumber :this.choice,
                                    coachTime: this.messageTimes,
                                    pageNumber : this.page,
                                    attendanceId: this.attendanceId
                                  }
                             console.log(data);
                              if(!this.btnShow){
                                  this.btnShow =true
                                    this.axios.post("vx/nightCoach/saveNightCoach",data).then(res=>{
                                             console.log(res);
                                              this.btnShow =true
                                              this.$toast(res.data.message)
                                              setTimeout(()=>{
                                                    this.btnShow =false
                                              },1500)
                                      })
                                } 
                          })
                        }else{
                                this.$toast("以上内容不能为空")
                        }
                      
             
            }
    },
    mounted(){
     //科目
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "科目"}).then((res => {
      for (let subject of res.data.result) {
        this.subjectList.push(subject.title)
      }
    }))
    //学生
   const moment = require("moment")
   let data = {
      dueDate:  moment(new Date()).format("YYYY-MM-DD"),
      status: "2,3",
    }
    console.log(data);
    this.axios.post("vx/attendance/list", data).then((res) => {
       console.log(res);
      this.listDesc = res.data.result;
      for (let student of this.listDesc) {
        let studentObj = {text: student.student, value: student.id, id:student.id}
        this.studentList.push(studentObj)
      }
    })
   }
}
</script>

<style scoped>
.font {
   text-align: center;
}
 .font span:nth-child(1){
     font-weight: bold;
 }
  .font span:nth-child(3){
     color: #666; 
      
     font-size: 15px;
 }

</style>
<style >
 .van-stepper--round .van-stepper__plus{
     background-color: #1b8fff;
  }
  .van-stepper--round .van-stepper__minus{
     border: 1px solid #1b8fff;
     color: #1b8fff;

  }

</style>
<style>

.van-field__control{
       width: 150px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
}
</style>
