<template>
  <div>
    <!--导航栏 -->
    <van-nav-bar
      title="交作业"
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
         <div style=" display: flex;   margin:10px 0px;" >
              <van-tag  style="margin:0px 15px" v-show="studentName" color="#b8b8b8ff" closeable size="large" type="primary" @close="close(studentName)">
              {{studentName}}
            </van-tag> 
              <van-tag  v-show="subject" color="#b8b8b8ff" closeable size="large" type="primary" @close="close(subject)">
              {{subject}}
            </van-tag> 
         </div>
  <div v-if ="workList.homeworkDescList">
    <div style="margin: 8px 8px" @click="show=!show">
      <div class="title" style="position: relative">
        <div style="position: absolute; top: 0px; right: 0px">
          <van-tag type="primary" size="large">{{workList.subject}}</van-tag>
        </div>
        <div>{{workList.createTime}} （登记的时间）</div>
        <div class="fontSize">
          <div   v-for="(item,i) of workList.homeworkDescList" :key="i">{{i+1}}:{{item.source}}-{{item.pageNumber}}-{{item.chapter}}-{{item.descType}}</div>
        </div>
       
        <div style="position: absolute; bottom: 6px; right: 10px">
          <img src="../../assets/down.png" width="18" height="18" />
        </div>
      </div>
    </div>
    <!-- 展开的内容  -->
    <div style="border: 10px solid #f2f2f2ff; border-radius: 10px" 
    v-show="show" > 
      <div class="title"   v-for="(item,i) of fileList" :key="i" >
        <div class="fontSize">
          <div >{{i+1}}:{{item.source}}-{{item.pageNumber}}-{{item.chapter}}-{{item.descType}}</div>
           <div >
            <van-uploader  v-model="item.file" multiple />
          </div>
        </div>
      </div>
     
       <table style="background-color: #fff"  >
          <tr style="text-align: center">
            <td>
              <div class="fontSize" style="margin-bottom: 6px">应完成</div>
              <van-stepper
                v-model="complete"
                theme="round"
                min="0"
                button-size="15"
                integer
              />
            </td>
            <td>
              <div class="fontSize" style="margin-bottom: 6px">实完成</div>
              <van-stepper
                v-model="finished"
                theme="round"
                min="0"
                button-size="15"
                integer
              />
            </td>
          </tr>
          <tr style="text-align: center">
            <td style="padding-top: 10px">
              <div class="fontSize" style="margin-bottom: 6px">错题数</div>
              <van-stepper
                v-model="error"
                theme="round"
                min="0"
                button-size="15"
                integer
              />
            </td>
            <td style="padding-top: 10px">
              <div class="fontSize" style="margin-bottom: 6px">困难数</div>
              <van-stepper
                v-model="difficulty"
                theme="round"
                min="0"
                button-size="15"
                integer
              />
            </td>
          </tr>
        </table>
            <van-button v-show ="workList.homeworkDescList" style="margin-top: 10px" @click="save" type="info" round block>
          提交</van-button
        >
    </div>
    </div>  
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: this.$store.state.date,
      studentName: "",
      subject: "",
      showStudent: false,
      showDate: false,
      showSubject: false,
      btnShow: false,
      fileList: [],
      error: "", // 错题数
      finished: "", //实完成
      difficulty: "", //疑难题
      complete: "", // 应完成
      workID :"",
      workList:{},
      show:false,
      minDate:new Date(2020,10,1),
      studentId:""
      
    };
  },
  methods: {
    close(value ){
         if(value==this.subject){
            this.subject=""
            this.list();
         }else{
             this.studentName=""
             this.list();
         }
    },
    // 展开
    upload(id){
      if(id==this.workID){
          this.workID=""
      }else{
          this.workID=id
      }
    },
    //  学生的弹出框
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text;
      this.studentId = value.value;
       this.list()
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
        this.list()
    },
    // 日期
    formatDate(date) {
      const moment = require("moment");
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
       this.list()
    },
    // 提交
      save() {
         let data ={
             homeworkId : "",
             total :"",
             finished:"",
             error:"",
             difficulty:"",
             homeworkDescList:[]
         }
         let fileData = new FormData();
          this.workList={}
         for( let obj of this.fileList){
              fileData.append("file",obj.file[0].file)
         }
         this.axios.post("sys/common/uploadBatch",fileData ).then(res=>{
                if(res.data.success){
                   let  arrStr = res.data.message.split(",")
                    this.fileList.forEach((obj,i)=>{
                          obj.fileId =  arrStr[i]
                    })
                  let  data1 = {
                        homeworkId:this.workID,
                        total: this.complete,
                        finished:this.finished,
                        error:this.error,
                        difficulty: this.difficulty,
                        homeworkDescList: this.fileList
                  }
                 /// console.log(data1);
                     this.axios.post("vx/homeworkDesc/saveAll",data1).then(res=>{
                       console.log(res);
                           if(res.data.success){
                              this.$toast("提交成功")
                                this.workList={};
                           }else{
                              this.$toast("提交失败")
                           }
                     })
                }
         })
    },
    // 查询已标注好的
    list() {
      let data = {
        createTime: this.date,
        studentId: this.studentId,
        subject: this.subject,
        mark:"1"
      };
       console.log(data);
         this.workList={}
       if(this.studentName!="" && this.subject!="" ){
       this.axios.post("vx/homeworkDesc/list", data).then((res) => {
           console.log(res);
            if(res.data.result!=null){
                this.workList = res.data.result 
                this.workID =res.data.result.homeworkId
                 for(let item of res.data.result.homeworkDescList){
                      let obj = {
                          chapter:item.chapter,
                          file:[],
                          id:item.id,
                          pageNumber:item.pageNumber,
                          source:item.source
                      }
                      this.fileList.push(obj)
                 }
               //  console.log(this.fileList);
            }else{
               this.workList={}
               this.$toast("暂无数据")
            }
         });
      }else{
        this.$toast("请选择学生和科目")
      }
     
 
    },
  },
  mounted() {
    this.$store.dispatch("students", { roleList: ["学生"] });
    this.$store.dispatch("subjects", { name: "科目" });
  },
};
</script>
<style scoped>

table {
  width: 100%;
  background-color: #f2f2f2ff;
 
}
.header {
  font-size: 14px;
  font-weight: bold;
}

.performance {
  margin-top: 14px;
  background-color: #f2f2f2;
  border-radius: 20px;
}

.subject {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.subjects {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-left: 32px;
}
.font {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.font > span {
  font-size: 14px;
}
.title {
  padding: 10px 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #999;
}
.title > div:nth-child(2) {
  color: #b8b8b8ff;
  font-size: 12px;
}
.title > div:nth-child(3),
.title > div:nth-child(4) {
  padding-top: 5px;
  font-weight: 550;
  font-size: 14px;
}
.fontSize {
  color: #999;
  font-size: 14px;
  font-weight: 550;
}
</style>
<style >
.van-stepper--round .van-stepper__plus {
  background-color: #1b8fff;
}
.van-stepper--round .van-stepper__minus {
  border: 1px solid #1b8fff;
  color: #1b8fff;
}
</style>
<style>
.van-field__control {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>