<template>
<div >
  <!-- 导航栏 -->
    <van-nav-bar title="薄弱点登记表" left-text="返回" left-arrow   @click-left="$router.go('-1')">
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
          :columns="$store.state.studentList"
          @confirm="onConfirmStudent"
          @cancel="showStudent = false"
      />
    </van-popup>
    <!-- 学期段 -->
     <div @click="showTime = true">
      <mt-cell title="学期段" is-link>
        <img slot="icon" src="../../assets/course/学期段.png" width="20" height="20"/>
        {{time}}
      </mt-cell>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-picker
          show-toolbar
          :columns="$store.state.timeList"
          @confirm="onConfirmTime"
          @cancel="showTime = false"
      />
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
          :columns="$store.state.subjectList"
          @confirm="onConfirmSubject"
          @cancel="showSubject = false"
      />
    </van-popup>
   
      <!-- 章节 -->
     <div >
      <mt-cell title="章节" >
        <img slot="icon" src="../../assets/job/章节.png" width="20" height="20"/>
          <van-field
                v-model="chapter"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入内容"
              />
      </mt-cell>
    </div>
    <!-- 知识点 -->
   <div >
      <mt-cell title="知识点">
        <img slot="icon" src="../../assets/job/知识点.png" width="20" height="20"/>
            <van-field
                v-model="point"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入知识点"
              />
      </mt-cell>
    </div>
      <div class="demo"></div>
      <!-- 问题类别-->
     <div @click="showSection = true">
      <mt-cell title="问题类别" is-link>
        <img slot="icon" src="../../assets/job/问题类别.png" width="20" height="20"/>
           {{section}}
      </mt-cell>
    </div>
    <van-popup v-model="showSection " position="bottom">
      <van-picker
          show-toolbar
          :columns="$store.state.sectionList"
          @confirm="onConfirmSection"
          @cancel="showSection = false"
      />
    </van-popup>
    <!-- 日期-->
     <div @click="showDate = true">
      <mt-cell title="日期" is-link>
        <img slot="icon" src="../../assets/job/日期.png" width="20" height="20"/>
           {{date}}
      </mt-cell>
    </div>
      <van-calendar
           v-model="showDate"
          @confirm="onConfirmDate"
          color="#0B8FFFFF"
      />
       <!-- 备注 -->
     <div >
      <mt-cell title="备注">
        <img slot="icon" src="../../assets/job/备注.png" width="20" height="20"/>
            <van-field
                v-model="messageRemark"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入备注"
              />
      </mt-cell>
    </div>
    <!-- 提交 -->
    <div class="demo"></div>
    <div>
        <van-button type="info" block round @click="save" :disabled="btnShow"> 提交</van-button>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            showStudent:false,//
            showTime:false,// 学期段
            showSubject:false, 
            showSection:false,
            showDate:false,//
            btnShow :false,
            sourceList:["勤学早"],
            studentName:"",
            time:"", //学期段
            subject:"",  //科目
            section:"", // 章节
            date:this.$store.state.date,//日期
            chapter:"", //章节
            messageRemark :"" ,//备注
            studentId:"",
            point:"" // 知识点
        }
    },
    methods:{
       //  学生的弹出框
        onConfirmStudent(value){
            this.showStudent=false;
             this.studentName=value.text
             this.studentId= value.value
        },
        // 学期段
        onConfirmTime(value){
            this.showTime=false;
             this.time=value
        },
        // 作业性质
        onConfirmNature(value){
           this.showNature=false;
           this.nature =value;
        },
        // 作业来源
        onConfirmSource(value){
             this.showSource =false;
             this.source= value;
        },
        // 科目
        onConfirmSubject(value){ this.subject =value ; this.showSubject=false},
        // 章节
        onConfirmSection(value){ this.section = value ;this.showSection=false},
           formatDate(date) {
              const moment = require("moment")
                return moment(date).format("YYYY-MM-DD");
            },
           onConfirmDate(date) {
              this.showDate = false;
              this.date = this.formatDate(date);
            //    const moment =require("moment")
            //    this.date = moment(this.formatDate(date)).format("MM月DD日")
            //    console.log(this.date);
            },
            // 提交
            save(){
                 let data ={
                       token :this.getLocalStorage("token"),
                       studentId :this.studentId ,
                       student : this.studentName,
                       semester: this.time,
                       chapter :this.chapter,
                       subject : this.subject,
                       point: this.point,
                       type : this.section,
                       createTime:  this.date,
                       remarks :this.messageRemark
                 }
                 console.log(data);
                if( this.studentName !="" && this.time !="" && this.chapter !="" 
                && this.subject !=""  && this.languagePoints !="" && this.section !="" && this.date!="" 
                &&  this.messageRemark!=""
                ){
                      if(!this.btnShow){
                        this.btnShow= true
                          this.axios.post("vx/weak/save",data).then(res=>{
                            console.log(res);
                              if( res.data.success){
                                  this.$toast("提交成功")
                                   this.btnShow =false
                              }else{
                                   this.$toast("提交失败")
                                   this.btnShow =false
                              }
                          })
                      }
                }else{
                   this.$toast("以上内容不能为空 ")
                }
               
            }
    },
    created(){
              
              this.$store.dispatch('semester',{name: "学期段"})
              this.$store.dispatch('students',{roleList: ["学生"]})
              this.$store.dispatch('subjects', {name: "科目"});
              this.$store.dispatch('sections', {name: "问题类别"})
        }
    
}
</script>

<style scoped>
 .font span:nth-child(1){
     font-weight: bold;
 }
  .font span:nth-child(3){
     color: #666;  
     font-size: 15px;
 }

</style>