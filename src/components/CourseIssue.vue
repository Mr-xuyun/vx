<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="课程发布" left-text="返回" left-arrow   @click-left="onClickLeft">
      <template #right>
         <img src="../assets/job/其他.png" width="19" height="18" @click="showElse=true" >
      </template>
    </van-nav-bar>
     <van-action-sheet
        v-model="showElse"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @select="onSelect"
      />
    <!-- 科目 -->
    <div @click="showPicker = true">
      <mt-cell title="科目" is-link>
        <img slot="icon" src="../assets/course/科目.png" width="24" height="24"/>
        {{ subject }}
      </mt-cell>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 日期 -->
    <div @click="showDate = true">
      <mt-cell title="日期" is-link>
        <img slot="icon" src="../assets/course/日期.png" width="24" height="24"/>
        {{ date }}
      </mt-cell>

    </div>
    <van-calendar v-model="showDate" @confirm="onConfirmDate" color="#1B8FFF"/>
    <!--开始时间  -->
    <div @click="showTime = true">
      <mt-cell title="时间段" is-link>
        <img slot="icon" src="../assets/course/时间.png" width="24" height="24"/>
        {{ time }}
      </mt-cell>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-picker title="请选择时间段" show-toolbar @confirm="onConfirmTime" @cancel="showTime = false;" :columns="timePicker" />
    </van-popup>
    <!-- 老师 -->
    <div @click="showTeacher = true">
      <mt-cell title="老师" is-link>
        <img slot="icon" src="../assets/course/老师.png" width="24" height="24"/>
        {{ teacherName }}
      </mt-cell>
    </div>
    <van-popup v-model="showTeacher" position="bottom">
      <van-picker
          show-toolbar
          :columns="teacher"
          @confirm="onConfirmTeacher"
          @cancel="showTeacher = false"
      />
    </van-popup>
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
        <img slot="icon" src="../assets/course/学生.png" width="24" height="24"/>
        {{ studentName }}
      </mt-cell>
    </div>
    <van-popup v-model="showStudent" position="bottom">
      <van-picker
          show-toolbar
          :columns="student"
          @confirm="onConfirmStudent"
          @cancel="showStudent = false"
      />
    </van-popup>
    <!-- 学期段 -->
    <div @click="showClass = true">
      <mt-cell title="学期段" is-link>
        <img slot="icon" src="../assets/course/学期段.png" width="24" height="24"/>
        {{ className }}
      </mt-cell>
    </div>
    <van-popup v-model="showClass" position="bottom">
      <van-picker
          show-toolbar
          :columns="classList"
          @confirm="onConfirmClass"
          @cancel="showClass = false"
      />
    </van-popup>
    <!-- 产品 -->
    <div @click="showProduct = true">
      <mt-cell title="产品" is-link>
        <img slot="icon" src="../assets/course/产品.png" width="24" height="24"/>
        {{ productName }}
      </mt-cell>
    </div>
    <van-popup v-model="showProduct" position="bottom">
      <van-picker
          show-toolbar
          :columns="productList"
          @confirm="onConfirmProduct"
          @cancel="showProduct = false"
      />
    </van-popup>
    <div style="margin-top: 50px;">
      <van-button round block type="info" @click="issue" :disabled="btnshow">
        确定发布
      </van-button>
    </div>

  </div>
</template>
<script>
import { duration } from 'moment';
export default {
  data() {
    return {
      value: '',
      columns: [],//科目的列表
      showPicker: false,
      showDate: false,
      showTime: false,
      showTeacher: false,
      showStudent: false,
      showClass: false,
      showProduct: false,
      btnshow:false,
      showTimeEnd: false,//截止时间
      showElse:false ,//其他的下拉选项
      actions: [{ name: '规律增发' }, { name: '查看历史' }, { name: '重新发布' }],
      teacher: [ ],
      student: [],
      productList: [],
      classList: [],
      subject: "", //科目
      date: this.$store.state.date,//日期
      time: "",//时间
      timeEnd: "", //截止时间
      teacherName: "", //老师,
      studentName: "", //学生,
      productName: "", //产品
      className: "",//学期段
      studentId:"",
      teacherId:"",

      timePicker: [
        {
          values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23"
          ]
        },
        {
          values: [":"]
        },
        {
          values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
            "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
            "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
          ]
        },
        {
          values: [" - "]
        },
        {
          values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23"
          ]
        },
        {
          values: [":"]
        },
        {
          values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15",
            "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
            "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
            "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
          ]
        }
      ]
    };
  },
  methods: {
    //   确认发布
    issue() {
      let courses = {
        token:this.getLocalStorage("token"),
        subject: this.subject,
        createDate: this.date,
        timeRange: this.time,
        teacher: this.teacherName,
        teacherId: this.teacherId,
        student: this.studentName,
        studentId: this.studentId,
        semester: this.className,
        product: this.productName
      }
      console.log(courses);
      if (this.subject != "" && this.date != "" && this.time != "" &&  this.teacherName != "" && this.studentName != "" && this.productName != "" && this.className != "") {
           this.$toast.loading({
              message:"发布中...",
              duration:0,
              closeOnClick:true,
           })
          this.axios.post("vx/coursePublish/save", courses).then((res) => {
                console.log(res);
            if (res.data.success) {
              this.$toast("发布成功")
               this.btnshow =true
            } else {
              this.$toast("发布失败")
            }
          })
      } else {
        this.$toast("以上内容都不能为空,才能发布")
      }
      console.log(courses);
    },
    //   产品
    onConfirmProduct(product) {
      this.productName = product;
      this.showProduct = false
    },
    //   科目
    onConfirm(value) {
      this.subject = value
      this.showPicker = false;
    },
    onConfirmDate(date) {
      const moment = require("moment")
      this.date = moment(date).format("YYYY-MM-DD");
      this.showDate = false;
    },
    onConfirmTime(time) {
      let timeStr = "";
      for (let i = 0; i <time.length ; i++) {
        timeStr+=time[i];
      }
      this.time = timeStr;
      this.showTime = false;
    },
    // 老师
    onConfirmTeacher(name) {
      this.teacherName = name.text;
      this.teacherId = name.value
      this.showTeacher = false
    },
    onConfirmStudent(name) {
      if (this.studentName.indexOf(name.text)==-1){
        if (this.studentName!=""){
          this.studentName +=",";
          this.studentId +=",";
        }
        this.studentName += name.text;
        this.studentId += name.value;
      }
     console.log( this.studentId);
      this.showStudent = false;
    },
    onConfirmClass(grade) {
      this.className = grade
      this.showClass = false
    },
    //返回
    onClickLeft() {
      this.$router.go("-1")
    },
    // 其他按钮
    onSelect(obj){
         if(obj.name=="规律增发"){
            this.btnshow =false
         }else if(obj.name=="重新发布"){
              this.btnshow=false;
              this.subject=""
              this.date=""
              this.time=""
              this.teacherName=""
              this.teacherId=""
              this.studentName=""
              this.studentId=""
              this.className=""
              this.productName=""
         }else if(obj.name=="查看历史"){
             this.$router.push("/")
         }
    }
  },
  mounted() {
    //科目
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "科目"}).then((res => {
      for (let subject of res.data.result) {
        this.columns.push(subject.title)
      }
    }))
    // 老师
    this.axios.post("vx/task/getAllReceiver", {roleList: ["老师"]}).then((res => {
      console.log(res);
      for (let teacher of res.data.result) {
        let obj = {text: teacher.realname, value: teacher.id}
        this.teacher.push(obj)

      }
    }))
    //学生
    this.axios.post("vx/task/getAllReceiver", {roleList: ["学生"]}).then((res => {
     // console.log(res);
      for (let student of res.data.result) {
        let studentObj = {text: student.realname, value: student.id}
        this.student.push(studentObj)
      }
    }))
    //产品
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "产品"}).then((res => {
      for (let product of res.data.result) {
        this.productList.push(product.title)
      }
    }))
    //学期段
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "学期段"}).then((res => {
      for (let classGrade of res.data.result) {
        this.classList.push(classGrade.title)
      }
    }))

  }
};
</script>
<style scoped>
.blank {
  color: #000;
}
</style>
