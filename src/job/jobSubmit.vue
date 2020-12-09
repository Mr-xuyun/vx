<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="提交作业"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <!-- 列表栏 -->
    <div v-if="courseList.length!=0">
      <div v-for="(item, i) of courseList" :key="i + 6">
        <div class="content" @click="showOrHide(item.courseId, item)">
          <div class="text">
            <div class="time">
              课程编号{{ item.courseNumber }}/{{ item.product }}/{{
                item.student
              }}/{{ item.semester }}
            </div>
            <div>
              <span>{{ item.subject }}</span>
            </div>
          </div>
          <div class="txt">{{ item.createTime }} {{ item.timeRange }}</div>
          <div class="user">
            <div>
              <van-icon name="user-o" />
              <span> {{ item.teacher }}</span>
            </div>
          </div>
        </div>
        <!-- 展开的内容 -->
        <div style="margin-top: 10px" v-show="item.courseId == courseId">
          <van-cell title="作业内容" title-class="titleLeft" is-link />
          <van-field
            v-model="item.content"
            rows="1"
            autosize
            type="textarea"
            readonly="readonly"
          />
          <img-preview :file="item.fileId"></img-preview>
          <div class="demo"></div>
          <div v-for="(res, index) of fileList" :key="index">
            <van-cell :title="res.student" title-class="titleLeft" is-link />
            <div>
              <van-uploader
                v-model="res['file']"
                multiple
                style="padding: 10px 16px"
              />
              <van-cell title="评语" title-class="titleLeft" is-link />
              <van-field
                v-model="res['appraise']"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入评语"
              />
              <div class="demo"></div>
            </div>
          </div>
          <van-button
            type="info"
            round
            block
            style="margin-top: 16px"
            @click="save"
            >确认提交</van-button
          >
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 100px" v-else>
      <img src="../assets/job/空白.png" width="100" height="100s" />
      <div style="color: #666; font-size: 15px">暂无任务</div>
    </div>
  </div>
</template>
<script>
import ImgPreview from "@/views/util/imgPreview";
export default {
  components: { ImgPreview },
  data() {
    return {
      fileList: [], //文件的上传
      appraise: "", //
      courseList: [],
      courseId: "-1",
      classworkId: "", //作业的id
      student: "", //学生的姓名
      studentId: [], //学生的id
      fileId: "", // 上传文件的Id
    };
  },
  methods: {
    showOrHide(id, obj) {
      if (this.courseId == id) {
        this.courseId = "-1";
      } else {
        this.courseId = id;
      }
      this.classworkId = obj.classworkId;
      this.fileList = [];
      var name = obj.student.split(",");
      let studentId = obj.studentId.split(",");
      name.forEach((res, i) => {
        var item = {};
        item["appraise"] = "";
        item["file"] = [];
        item.student = name[i];
        item.studentId = studentId[i];
        item.classworkId = this.classworkId;
        this.fileList.push(item);
      });
      //  console.log(this.fileList);
    },
    // 提交按钮
    save() {
      //  {token:"",courseId:"课程ID",classworkFinished:[作业完成表列表]}
      // classworkFinished:[{classworkId 作业id,student 学生姓名,studentId 学生Id,fileId 文件id,appraise 评价}]

      let classworkFinished = [];
      let formdata = new FormData();
      console.log(formdata);
      for (let fileObj of this.fileList) {
        formdata.append("file", fileObj.file[0].file);
      }
      this.axios.post("sys/common/uploadBatch", formdata).then((res) => {
        let fileId = res.data.message;
        let fileIdArr = fileId.split(",");
        this.fileList.forEach((item, i) => {
          item.fileId = fileIdArr[i];
        });
        let data = {
          token:this.getLocalStorage("token"),
          courseId: this.courseId,
          classworkFinished: this.fileList,
        };
        console.log(data);
        this.axios.post("vx/classwork/submit", data).then((res) => {
          console.log(res);
          if (res.data.success) {
            this.$toast("操作成功");
          } else {
            this.$toast("操作失败");
          }
        });
      });
    },
  },
  mounted() {
    let data = {
      token:this.getLocalStorage("token"),
      page: "1",
      pageSize: "5",
    };
    //获取作业列表
    this.axios.post("vx/classwork/list", data).then((res) => {
      for (let item of res.data.result.records) {
        this.courseList.push(item);
      }
    });

    console.log(this.courseList);
  },
};
</script>
<style scoped>
.titleLeft {
  font-weight: bold;
  font-size: 15px;
}
</style>
