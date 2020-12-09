<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="作业库"
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
      :min-date="new Date('2020-01-01')"
      @confirm="onConfirmDate"
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
    <!-- 学期段 -->
    <div @click="showClass = true">
      <mt-cell title="学期段" is-link>
        <img
          slot="icon"
          src="../../assets/course/学期段.png"
          width="24"
          height="24"
        />
        {{ className }}
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
              <van-tag  style="margin:0px 15px" v-show="studentName" color="#b8b8b8ff" closeable size="large"  @close="close(studentName)">
              {{studentName}}
            </van-tag> 
              <van-tag  v-show="subject" style="margin:0px 15px" color="#b8b8b8ff" closeable size="large" @close="close(subject)">
              {{subject}}
            </van-tag> 
           <van-tag  v-show="className" style="margin:0px 15px" color="#b8b8b8ff" closeable size="large"  @close="close(className)">
              {{className}}
            </van-tag> 
         </div>
    <van-tabs v-model="active" swipeable color="#1B8FFFFF">
        <van-tab title="未标记" >
          <van-list 
         v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad" 
          :immediate-check="false">
          <van-row  >
            <van-col span="12" v-for="(item,index) of this.homeworkListNotMark " :key="index+1" style="margin-top:15px;">
              <div class="unlabeled">
                <img
                   
                    style="border-radius: 15px; width: 100%"
                    :src="$store.state.imgURL+item.fileId.split(',')[0]"
                    height="100"
                />
       <van-image-preview v-model="showImg" :images="images" @change="inexImg=index">
          <template v-slot:index>第{{ index+1 }}页</template>
        </van-image-preview>
                <div class="student">
                  <div>{{ item.student }}</div>
                  <div @click="register(item)">去登记></div>
                </div>
                <div>{{ item.semester }}</div>
                <div>
                  <div>{{ item.createTime }}</div>
                  <van-tag style="margin-top: 5px" type="danger">未标记</van-tag>
                </div>
                <van-tag
                    type="primary"
                    size="medium"
                    style="position: absolute; top: 0; right: 0"
                >{{ item.subject }}</van-tag
                >
              </div>
            </van-col>
           </van-row>
          </van-list>
        </van-tab>
      <van-tab title="已标记"  >
        <div v-if="this.homeworkListMark.length != 0" >
          <van-row >
            <van-col style="margin-top:15px;" span="12" v-for="(item,index) of this.homeworkListMark " :key="index+11" >
              <div class="unlabeled" >
               <img
                    style="border-radius: 15px; width: 100%"
                    :src="$store.state.imgURL+item.fileId.split(',')[0]"
                    height="100"
                />
                <div class="student">
                  <div>{{ item.student }}</div>
                </div>
                <div>{{ item.semester }}</div>
                <div>
                  <div>{{ item.createTime }}</div>
                  <van-tag style="margin-top: 5px" type="primary">已标记</van-tag>
                </div>
                <van-tag
                    type="primary"
                    size="medium"
                    style="position: absolute; top: 0; right: 0"
                >{{ item.subject }}</van-tag
                >
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      showClass: false, //学期段
      showStudent: false,
      showDate: false,
      showSubject: false,
      showImg:false,
      loading: false,
      finished: false,
      date: this.$store.state.date,
      studentName: "",
      subject: "",
      className: "", //学期段
      homeworkListNotMark:[],
      homeworkListMark:[],
      images:[] ,//预览的图片
      inexImg :0,
      studentId:"",
      page:1

    };
  },
  methods: {
    //上刷更新跟多数据
        onLoad() {
      let data = {
        pageNo: this.page+1,
        pageSize: "6",
        mark: this.active,
        token: this.getLocalStorage("token"),
        type: "老师",
        createTime :this.date,
        subject:this.subject,
        semester:this.className,
        studentId:this.studentId
      };
      console.log(data);
       this.axios.post("vx/homework/list", data).then(res=>{
         console.log(res);
         if( res.data.result.records.length!=0){
                  if(this.active==0){
                  
                    for(let item of res.data.result.records){
                           this.homeworkListNotMark.push(item)
                    }
                    this.loading =false
                 }else{
                     for(let item of res.data.result.records){
                           this.homeworkListMark.push(item)
                      }
                      this.loading =false
                  }
         }else{
             this.finished = true;
          
         }
         
       })
            

        },
    // 标签
    close(value){
       this.homeworkListNotMark=[];
      this.homeworkListMark=[]
                if(this.subject==value){
                      this.subject=""
                      this.onLoad()

                }else if(this.studentName==value){
                     this.studentName=""
                     this.studentId="",
                     this.onLoad()
                }else{
                    this.className=""
                    this.onLoad()
                }
    },
    // 去登记
    register(obj){
        this.$router.push(`/workLabel?studentName=${obj.student}&studentId=${obj.studentId}&subject=${obj.subject}&fileId=${obj.fileId}&workId=${obj.id}`)
    },


    //  学生的弹出框
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text;
      this.studentId = value.value;
      this.history()
      this.homeworkListNotMark=[];
      this.homeworkListMark=[]
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
      this.history()
       this.homeworkListNotMark=[];
      this.homeworkListMark=[]
    },
    // 日期
    formatDate(date) {
      const moment = require("moment");
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.history()
       this.homeworkListNotMark=[];
      this.homeworkListMark=[]
    },
    // 学期段
    onConfirmClass(grade) {
      this.className = grade;
      this.showClass = false;
      this.history()
       this.homeworkListNotMark=[];
      this.homeworkListMark=[]
    },
    // 请求列表
    history(page) {
          //  this.homeworkListNotMark=[];
          //  this.homeworkListMark=[]
      let data = {
        pageNo: page,
        pageSize: "6",
        mark: this.active,
        token: this.getLocalStorage("token"),
        type: "老师",
        createTime :this.date,
        subject:this.subject,
        semester:this.className,
        studentId:this.studentId
      };
       console.log(data);
       this.axios.post("vx/homework/list", data).then(res=>{
        // console.log(res);
         if( res.data.result.records.length!=0){
                  if(this.active==0){
                    for(let item of res.data.result.records){
                           this.homeworkListNotMark.push(item)
                    }
                 }else{
                     for(let item of res.data.result.records){
                           this.homeworkListMark.push(item)
                      }
                  }
         }else{
              this.$toast("暂无数据!")
         }
           
       })
    },
  },
  watch:{
      active:  function (){
             
      }
  },
  mounted() {
    this.history("1")
    this.$store.dispatch("semester", { name: "学期段" });
    this.$store.dispatch("students", { roleList: ["学生"] });
    this.$store.dispatch("subjects", { name: "科目" });
  },
};
</script>
<style scoped>
.unlabeled {
  box-shadow: 1px 4px 4px #999;
  padding: 5px 10px;
  margin: 0px 10px;
  border-radius: 15px;
  position: relative;
}
.unlabeled > div:nth-child(3) {
  color: #999;
  font-size: 14px;
  margin-top: 5px;
}
.unlabeled > div:nth-child(4) {
  color: #c9c9c9ff;
  font-size: 14px;
  margin-top: 5px;
}
.student {
  display: flex;
  justify-content: space-between;
}
.student > div:nth-child(1) {
  color: #1b8fffff;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
}
.student > div:nth-child(2) {
  color: #1b8fffff;
  font-size: 13px;
  margin-top: 5px;
}
</style>
