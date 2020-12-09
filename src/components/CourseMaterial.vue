<template>
  <div>
    <van-nav-bar
      title="课程资料发布"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
  <div v-if="courserList.length!=0"> 
    <div v-for="(item, i) of courserList" :key="i">
      <div class="content" @click="showCourse(item)">
        <div class="text">
          <div class="time">
            课程编号{{ item.courseNumber }}/{{ item.product }}/{{
              item.teacher
            }}/{{ item.semester }}
          </div>
          <div>
            <span>{{ item.subject }}</span>
          </div>
        </div>
        <div class="txt">{{ item.createTime }} 时间段:{{ item.timeRange }}</div>
        <div class="user">
          <div>
            <van-icon name="user-o" />
            <span> {{ item.teacher }}</span>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-show="cid == item.id">
        <div style="font-weight: bold; padding: 8px 14px">课程内容</div>
        <van-field
          v-if="item.descriptions == ''"
          v-model="descriptions"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="请输入描述的内容"
          show-word-limit
        />
        <van-field
          v-else
          v-model="item.descriptions"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          :disabled="true"
          placeholder="请输入描述的内容"
          show-word-limit
        />

        <div class="course">
          <div class="courseUser">
            <p>学生</p>
            <div>{{ item.student }}</div>
          </div>
          <div class="courseUser">
            <p>产品</p>
            <div>{{ item.product }}</div>
          </div>
          <div class="courseUser">
            <p>学期段</p>
            <div>{{ item.semester }}</div>
          </div>
          <div class="courseUser">
            <p>章节</p>
            <div>三角函数</div>
          </div>
        </div>
        <div class="course">
          <div class="courseUser">
            <p>老师</p>
            <div>{{ item.teacher }}</div>
          </div>
          <div class="courseUser">
            <p>科目</p>
            <div>{{ item.subject }}</div>
          </div>
          <div class="courseUser">
            <p>日期</p>
            <div>{{ item.createTime }}</div>
          </div>
          <div class="coursetime">
            <p>时间</p>
            <div style="">{{ item.timeRange }}</div>
          </div>
        </div>
        <div class="demo"></div>
        <van-button
          type="info"
          block
          round
          @click="confirmCourse(item.id)"
          :disabled="statusDis == item.status >= 1 ? false : true"
        >
          确认课程</van-button
        >
        <div class="demo"></div>
        <!-- 提交教案 -->
        <div style="font-weight: bold; padding: 14px 14px">提交教案</div>
        <div>
          <van-uploader
            style="padding: 8px 14px"
            v-model="fileList"
            multiple
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
          />
        </div>
        <van-button type="info" block round @click="confirmPlan(i,item.id)">
          提交教案</van-button
        >
      </div>
    </div>
    </div>
     <van-empty description="暂无任务" v-else />
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      activeName: "-1",
      descriptions: "", //描述的内容,
      fileList: [], //提交教案的文档和图片,
      courserList: [], //课程列表
      cid: "-1",
      statusDis: "",
      courseId: "",
      studentName: "",
      studentId:""
    };
  },
  methods: {
    showCourse(item) {
      this.descriptions = "";
      this.fileList=[];
       this.studentId=item.studentId;
       this.studentName =item.student
       this.courseId =item.id
      if (item.id== this.cid) {
         this.cid = -1;
      } else {
        this.cid = item.id;
      }
    },
    //确认课程
    confirmCourse(id) {
      let data = {
        token:this.getLocalStorage("token"),
        id: id, // 课程ID
        descriptions: this.descriptions, //描述
      };
         this.$dialog
            .confirm({
              message: "是否确认课程?",
              confirmButtonColor:"#1989fa",
            })
            .then(() => {
               this.axios.post("vx/coursePublish/update", data).then((res) => {
                   console.log(res);
                     if(res.data.success){
                         this.statusDis =1;
                         this.$toast(res.data.message)
                     }else{
                          this.$toast.fail("确认失败!!")
                     }
              });
            })
            .catch(() => {
              // on cancel
            });
       
     
    },
    // 提交教案
    confirmPlan(index,id) {
      if (this.fileList.length != 0) {
        let fileData = new FormData();
        for (var item of this.fileList) {
          
          fileData.append("file", item.file);
        }
        this.$dialog
          .confirm({
            message: "是否提交教案?",
             confirmButtonColor:"#1989fa",
          })
          .then(() => {
            this.axios.post("sys/common/uploadBatch", fileData).then((res) => {
                let file = res.data.message 
              let data = {
                    token:this.getLocalStorage("token"),
                    id: id, //课程ID
                    student: this.studentName, //学生名字
                    studentId: this.studentId, //学生ID
                    file: file// 教案文件ID
                  };
                  console.log(data);
              this.axios
                .post("vx/coursePublish/saveCourseMaterial", data)
                .then((res) => {
                    console.log(111);
                   if(res.data.success){
                       this.courserList.splice(index,1)
                        this.$toast(res.data.message)
                   }else{
                      this.$toast("提交失败")
                   }
                });
            });
          })
          .catch(() => {
            // on cancel
          });
      }else {
        this.$toast("教案不能为空");
      }
    },
  },
  mounted() {
    const moment = require("moment");
    let data = { token:this.getLocalStorage("token"), status: "3" };
    this.axios.post("vx/coursePublish/list", data).then((res) => {
      let course = res.data.result.records;
      //console.log(res);
      course.forEach((item, i) => {
        item.cid = i;
        item.createTime = moment(item.createTime).format("MM月DD日");
        this.courserList.push(item);
      });
    //  console.log(this.courserList);
    });
  },
};
</script>
<style scoped>
.content {
  margin-top: 20px;
  background-color: #f2f2f2;
  height: 90px;
  border-radius: 14px;
  box-shadow: 5px 5px 5px #999;
}
/* 第一行的文本 */
.text {
  display: flex;
  padding: 8px 8px;
  justify-content: space-between;
}
/* 标题 */
.text .time {
  font-weight: bold;
}
.text span {
  /* #1B8FFF #279227  9cda9c*/
  color: #1b8fff;
}
/*  */
.txt {
  font-size: 14px;
  font-weight: Medium;
  padding: 0px 8px;
}
/*  */
.user {
  display: flex;
  justify-content: space-between;
  padding: 8px 8px;
}
.user img {
  width: 20px;
  height: 20px;
}
.demo {
  margin-top: 10px;
  margin-bottom: 2px;
  width: 100%;
  height: 15px;
  background-color: #f2f2f2;
}
.course {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.courseUser {
  width: 80px;
}
.courseUser > p {
  margin: 8px 8px;
  font-weight: bold;
}
.courseUser > div {
  margin-left: 8px;
  color: #707070;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.coursetime > div {
  padding: 2px 2px;
  color: #707070;
}
.coursetime > p {
  margin: 8px 8px;
  font-weight: bold;
}
</style>