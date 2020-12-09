<template>
  <div>
    <van-nav-bar
      title="作业库"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <!-- 日期-->
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
    <van-calendar color="#1B8FFF" v-model="showDate" @confirm="onConfirmDate" />
    <!--  -->

    <van-tabs v-model="active" swipeable color="#1B8FFFFF">
      <van-tab title="铭师作业">
        <div v-if="msdjList.length != 0">
          <div v-for="(item, i) of msdjList" :key="i">
            <div
              class="content"
              style="background-color: #9cccf5"
              @click="showWork(item)"
            >
              <div class="text">
                <div class="time">
                  课程编号{{ item.courseNumber }}/{{ item.product }}/{{
                    item.classworkFinishedList[0].student
                  }}/{{ item.semester }}
                </div>
                <div>
                  <span>{{ item.subject }}</span>
                </div>
              </div>
              <div class="txt">
                {{ item.createDate }} 时间段--{{ item.timeRange }}
              </div>
              <div class="user">
                <div>
                  <van-icon name="user-o" />
                  <span> {{ item.teacher }}</span>
                </div>
              </div>
            </div>
            <!--  -->
            <div style="margin-top: 10px" v-show="item.courseId == courseId">
              <van-cell title="作业内容" border title-class="titleLeft" />
              <div style="color: #666; font-size: 14px; padding: 10px 16px">
                {{ item.content }}
              </div>
              <img-preview :file="item.questionFileId"></img-preview>
              <van-cell title="备注" title-class="titleLeft" />
              <div style="color: #666; font-size: 14px; padding: 10px 16px">
                {{ item.remarks }}
              </div>
              <div class="demo"></div>
              <!--  -->
              <div
                v-for="(student, index) of item.classworkFinishedList"
                :key="index"
              >
                <van-cell title="学生作业" title-class="titleLeft" />
                <div style="color: #666; font-size: 14px; padding: 10px 16px">
                  错误率
                  <van-tag type="danger"
                    >{{ Math.ceil((student.error / student.total) * 100) }}%
                  </van-tag>
                </div>
                <img-preview :file="student.fileId"></img-preview>
                <van-cell title="批改作业" title-class="titleLeft" />
                <img-preview :file="student.appraiseFileId"></img-preview>
              </div>
              <div class="demo"></div>
              <!--  -->
            </div>
          </div>
        </div>
        <div v-else>
          <van-empty description="暂无铭师作业" />
        </div>
      </van-tab>
      <!--  -->
      <van-tab title="学校作业">
        <div v-if="homeworkList.length != 0">
          <div v-for="(item, i) of homeworkList" :key="i + 99">
            <div class="content" style="height: 73px" @click="homeShow(item)">
              <div class="text">
                <div class="time">
                  课程编号{{ item.homeworkNumber }}/{{ item.student }}/{{
                    item.semester
                  }}
                </div>
                <div>
                  <span>{{ item.subject }}</span>
                </div>
              </div>
              <div class="user">
                <div>
                  <van-icon name="user-o" />
                  <span> {{ item.student }}</span>
                </div>
              </div>
            </div>
            <!--  展开内容-->
            <div v-show="item.id == id">
            <div  style="margin-top: 10px">
              <div style="color:#666; font-size:14px; margin-left:15px;">
                 错误率 <van-tag type="danger">{{ parseInt(item.error/item.total) +'%'}}</van-tag>
              </div>
               <div style="color:#666; font-size:14px; margin:10px 15px;"> 章节: <span></span>{{ item.chapter }}</div>
               <div class="workList">
                 <div> 题数 :  <span>{{ item.total }}题</span> </div>
                 <div>性质:  <span>{{ item.type }}</span> </div>
                 <div>来源  <span>{{ item.source }}</span> </div>
              </div>
              <div style="color:#707070FF;font-size:14px ;margin-left:15px;">预计时间 <span style="color:#1B8FFFFF;"> {{item.expect}}</span> </div>
            </div>
            <!--  -->
              <div style="margin: 10px 10px">
                <h4 style="margin: 10px 0px">作业的内容</h4>
                <img-preview :file="item.fileId"></img-preview>
                <h4 style="margin: 10px 0px">其他 : </h4>
                 <div style="margin-left:15px; color:#707070FF;font-size:14px ;"> {{item.others}}</div>
              </div>
            
            </div>
          </div>
        </div>
        <div v-else>
          <van-empty description="暂无学校作业" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import imgPreview from "../../views/util/imgPreview.vue";
export default {
  components: { imgPreview },
  data() {
    return {
      showDate: false,
      date: "",
      active: 0,
      studentText: "",
      fileList: [], //批改的作业
      showPicker: false,
      showErr: false,
      columns: ["按时完成", "未完成"],
      err: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      finish: "", //完成的情况
      errText: "", //错误的内容
      active: 0, // 标签页
      msdjList: [], //铭师的列表
      homeworkList: [],
      courseId: "-1", //课程id
      id: "-1 ", //学校作业Id
    };
  },
  methods: {
    homeShow(obj) {
      if (obj.id == this.id) {
        this.id = "-1";
      } else {
        this.id = obj.id;
      }
    },
    showWork(obj) {
      if (obj.courseId == this.courseId) {
        this.courseId = "-1";
      } else {
        this.courseId = obj.courseId;
      }
    },
    onConfirmDate(date) {
      let moment = require("moment");
      this.date = moment(date).format("YYYY-MM-DD");
      this.showDate = false;
      let data = {
        pageNo: "1",
        pageSize: "5",
        status: "1",
        token:this.getLocalStorage("token"),
        createTime: this.date,
      };
            this.$toast.loading({
               message:"加载中...",
               duration:0,
               closeOnClick:true,
            })
      
      this.axios
        .post("vx/classworkFinished/queryClassworkFinishedList", data)
        .then((res) => {
           if(res.data.code!=500){
             this.msdjList = [];
              for (let item of res.data.result) {
                    this.msdjList.push(item);
             }
              this.$toast.clear();
          // console.log(this.msdjList);
           }
         
        });
      //  学校作业
      this.axios.post("vx/homework/list", data).then((res) => {
        this.homeworkList = [];
        for (let item of res.data.result.records) {
          this.homeworkList.push(item);
        }
        // console.log(this.homeworkList);
      });
    },
    // 完成情况弹出框
    onConfirm(value) {
      this.showPicker = false;
      this.finish = value;
    },
    showFinish() {
      this.showPicker = true;
    },
    //错误题的弹出框
    onConfirmErr(value) {
      this.showErr = false;
      this.errText = value;
    },
    errShow() {
      this.showErr = true;
    },
  },
  mounted() {
    let moment = require("moment");
    let date = new Date();
    let time = moment(date).format("YYYY-MM-DD");
    this.date = time;
    let data = {
      pageNo: "1",
      pageSize: "5",
      status: "1",
      token:this.getLocalStorage("token"),
      createTime: time,
    };
    //console.log(data);
    this.axios
      .post("vx/classworkFinished/queryClassworkFinishedList", data)
      .then((res) => {
        //console.log(res);
        for (let item of res.data.result) {
          this.msdjList.push(item);
        }
        // console.log(this.msdjList);
      });
    //console.log(data);

    //  学校作业
    this.axios.post("vx/homework/list", data).then((res) => {
      this.homeworkList = [];

      for (let item of res.data.result.records) {
        this.homeworkList.push(item);
      }
      //console.log(this.homeworkList);
    });
  },
};
</script>
<style scoped>
.workList{
  display: flex;
  margin: 10px 0px;
}
.workList>div{
   color: #707070FF;
   font-size: 14px;
   margin-left:15px ;
}
.workList>div>span{
   color:#1B8FFFFF;
   font-size: 14px;
}
.titleLeft {
  font-weight: bold;
  font-size: 15px;
}
.prarent {
  display: flex;
  padding: 0px 16px;
}
.err > span {
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
}
.err > div {
  font-size: 13px;
  color: #666;
  margin-left: 10px;
}
.err > img {
  padding-top: 2px;
}
#table > td {
  background-color: #f2f2f2ff;
  width: 120px;
}
.listtable > td {
  font-size: 13px;
  background-color: #d8d8d8ff;
}
</style>