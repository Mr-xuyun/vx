<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="作业标注"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
      <template #right>
        <div @click="$router.push('/workStatistics')">
          <img src="../../assets/late/统计.png" />
        </div>
        <div style="color: #999; margin-left: 5px; font-size: 13px">统计</div>
      </template>
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
    <div style="margin: 0 10px" @click="showImg = !showImg">
      <img
        v-show="images.length != 0"
        :src="images[0]"
        style="border-radius: 15px; width: 100%"
        height="150"
        width="320"
      />
    </div>
    <van-image-preview v-model="showImg" :images="images" @change="onChange">
      <template v-slot:index>{{ index + 1 }}/{{images.length}}</template>
    </van-image-preview>
    <!-- 作业性质 -->
    <div>
      <mt-cell title="作业性质">
        <img
          slot="icon"
          src="../../assets/job/作业性质.png"
          width="20"
          height="20"
        />
        <div>
          <van-tag
            @click="color('自主作业', $event)"
            round
            type="primary"
            :plain="'自主作业' == workType ? false : true"
            >自主作业</van-tag
          >
          <van-tag
            @click="color('学校作业', $event)"
            round
            type="primary"
            :plain="'学校作业' == workType ? false : true"
            style="margin-left: 10px"
            >学校作业</van-tag
          >
          <van-tag
            @click="color('铭师作业', $event)"
            round
            type="primary"
            :plain="'铭师作业' == workType ? false : true"
            style="margin-left: 10px"
            >铭师作业</van-tag
          >
        </div>
      </mt-cell>
    </div>
    <!-- 分页描述 -->
    <mt-cell title="分项描述">
      <img
        slot="icon"
        src="../../assets/late/分项描述.png"
        width="20"
        height="20"
      />
      <span class="blueFont">添加</span>
      <img
        @click="add"
        style="margin-left: 8px"
        src="../../assets/late/添加.png"
        width="20"
        height="20"
      />
    </mt-cell>

    <div
      class="animate__animated animate__bounceInLeft"
      v-for="(item, i) of describeList"
      :key="i"
      style="
        box-shadow: 1px 1px 5px #1989fa63;
        margin: 14px 15px;
        border-radius: 10px;
        position: relative;
      "
    >
      <!-- 来源 -->
      <div @click="sourseFun(i)">
        <mt-cell title="来源" is-link>
          <img
            slot="icon"
            src="../../assets/late/来源.png"
            width="18"
            height="18"
          />
          <van-field
            v-model="item.source"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入来源,例:'勤学早'"
            required
            input-align="right"
          />
        </mt-cell>
      </div>
      <!-- 页码-->
      <div>
        <mt-cell title="页码" is-link>
          <img
            slot="icon"
            src="../../assets/late/页码.png"
            width="18"
            height="18"
          />
          <van-field
            v-model="item.pageNumber"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入页码,例:P25-35"
            required
            input-align="right"
          />
        </mt-cell>
      </div>
      <!-- 章节-->
      <div>
        <mt-cell title="章节" is-link>
          <img
            slot="icon"
            src="../../assets/late/章节.png"
            width="18"
            height="18"
          />
          <van-field
            v-model="item.chapter"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入章节"
            required
            input-align="right"
          />
        </mt-cell>
      </div>
      <!-- 类别 -->
      <div>
        <mt-cell title="类别">
          <img
            slot="icon"
            src="../../assets/late/类别.png"
            width="18"
            height="18"
          />
          <van-tag
            v-for="(res, index) of item.categorylist"
            :key="index"
            @click="categoryFun(index, item)"
            style="margin-left: 5px"
            :color="item.decType == res ? '#1B8FFFFF' : '#d9d9d9'"
            >{{ res }}</van-tag
          >
        </mt-cell>
        <!-- 其他内容的展开输入框 -->
        <div v-show="item.decType == '其他'">
          <van-field
            v-model="item.others"
            label="其他内容"
            placeholder="请输入描述的内容"
          />
        </div>
        <div style="text-align: right" @click="remove(i)">
          <span style="color: #f61b1bff; font-size: 15px">移除</span>
          <img
            src="../../assets/late/移除.png"
            style="
              padding-left: 4px;
              position: absolute;
              bottom: 0px;
              right: 32px;
            "
            width="18"
            height="18"
          />
        </div>
      </div>
    </div>
    <!-- 展示填入的内容 -->
    <div style="margin-left: 15px">
      <div class="grayFont" v-for="(data, n) of describeList" :key="n">
        {{ n + 1 }}:{{ data.source }}-{{ data.pageNumber }}-{{ data.chapter }}-{{
          data.others
        }}
      </div>
      <!-- <div class="grayFont">2:新观察-P30~30-勾股定理-刷题</div> -->
    </div>
    <van-button
      type="info"
      round
      block
      :disabled="btnSave"
      v-show="describeList.length > 0"
      @click="save"
    >
      提交</van-button
    >
  </div>
</template>
<script>
import { duration } from "moment";
export default {
  data() {
    return {
      animation: "",
      bgColor: "#d9d9d9",
      showSource: false,
      showStudent: false,
      showDate: false,
      showSubject: false,
      showImg: false,
      showRests: false, //其他
      btnSave:false,
      date: this.$store.state.date,
      studentName:"",
      subject:"s",
      studentId:"",
      workId:"",//作业的id
      index: 0,
      workType: "学校作业", //作业性质
      // others: "", //其他
      decType: "", //类别
      // sourse: "",//来源
      // pageNumber: "", //页码
      // chapter: "", // 章节
      sourceIndex: "",
      describeList: [], //分项描述
      images: [],
      minDate:new Date(2020,10,1)
    };
  },
  methods: {
    //移除
    remove(index) {
      this.describeList.splice(index, 1);
    },
    //分项描述添加
    add() {
         if(this.subject!="" ){
         let obj = {
            homeworkId:this.workId,
            source: "",
            pageNumber: "",
            chapter: "",
            categorylist: ["抄写", "默写", "刷题", "试卷", "其他"],
            others: "",
            descType: "",
          };
          this.describeList.push(obj);
         }else{
            this.$toast("请选择对应的学生和科目")
         }
    
    },
    // 来源的弹出框
    sourseFun(i) {
      this.showSource = true;
      this.sourceIndex = i;
    },
    //  类别的 切换图标
    categoryFun(i, res) {
      if (res.categorylist[i] == res.decType) {
        this.$set(res, "decType", "-1");
      } else {
        this.$set(res, "decType", res.categorylist[i]);
      }
    },
    //查询
    list() {
      // let data = {
      //   pageNo: "1",
      //   pageSize: "5",
      //   mark: "0",
      //   token: this.getLocalStorage("token"),
      //   type: "老师",
      // };
      let data = {
        pageSize: "5",
        pageNo: "1",
        createTime: this.date,
        studentId: this.studentId,
        subject: "",
        mark: "0",
      };
      //console.log(data);
      if (this.studentId!=""){
         this.images=[];
        this.axios.post("vx/homework/list", data).then((res) => {
          //console.log(res);
           if(res.data.result.records.length!=0){
              for (let item of res.data.result.records) {
                if (item.fileId.indexOf(",") == "-1") {
                    this.workId=  item.id;
                    this.subject = item.subject
                  this.images.push(this.$store.state.imgURL + item.fileId);
                } else {
                      for(let file of item.fileId.split(',')){
                         this.workId=  item.id;
                         this.subject = item.subject
                        let  strImg = this.$store.state.imgURL + file;
                        this.images.push(strImg);
                      }
                }
              }
           }else{
             this.$toast("暂无数据,请重新选择")
             this.subject=""
           }
        });
      }else {
        this.$toast("请选择你要标注的学生");
      }
    },
    // 提交
    save() {
      let data = {
        id: this.workId,
        type:this.workType,
        homeworkDescList:this.describeList
      };
      //console.log(data);
       if(!this.btnSave){
             this.btnSave =true
          this.axios.post("vx/homeworkDesc/saveBatch", data).then((res) => {
                if(res.data.success){
                    this.$toast("提交成功")
                    setTimeout(()=>{
                         this.btnSave=false
                    },1500)
                }else{
                   this.$toast("提交失败")
              }
        });
           }
     
      
    },
    //   来源
    onConfirmSource(value) {
      this.sourse = value;
      this.showSource = false;
      this.$set(this.describeList[this.sourceIndex], "source", "ww");
      // console.log(this.describeList);
    },
    //   作业性质的颜色
    color(type, dom) {
      this.workType = type;
    },
    onChange(index) {
      this.index = index;
    },
    //  学生的弹出框
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text;
      this.studentId = value.value;
      this.list();
    },
    // 科目
    onConfirmSubject(value) {
      console.log(this.studentName);
      this.subject = value;
      this.showSubject = false;
      if(this.studentName){
          this.list();
      }else{
        
         this.$toast("请选择学生")
      }
      
    },
    // 日期
    formatDate(date) {
      const moment = require("moment");
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.list();
    },
  },
  mounted() {
    // 查询
    this.studentName = this.$route.query.studentName;
    this.subject = this.$route.query.subject;
    this.studentId = this.$route.query.studentId;
     this.workId = this.$route.query.workId;
    let fileId = this.$route.query.fileId;
    if (fileId != undefined) {
      if (this.$route.query.fileId.indexOf(",") == "-1") {
        this.images.push(this.$store.state.imgURL + fileId);
      } else {
        let fileArr = fileId.split(",");
        for (let item of fileArr) {
          item = this.$store.state.imgURL + item;
          this.images.push(item);
        }
      }
    }

    this.$store.dispatch("semester", { name: "学期段" });
    this.$store.dispatch("students", { roleList: ["学生"] });
    this.$store.dispatch("subjects", { name: "科目" });
  },
};
</script>
<style scoped>
</style>