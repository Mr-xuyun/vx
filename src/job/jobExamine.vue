<template>
  <div>
    <van-nav-bar
      title="查看作业"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <div v-if="jobList.length!=0">
      <div v-for="(item, i) of jobList" :key="i">
        <div class="content" @click="showList(item)">
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
          <div class="txt">
            {{ item.createTime }} &nbsp; {{ item.timeRange }}
          </div>
          <div class="user">
            <div>
              <van-icon name="user-o" />
              <span> {{ item.teacher }}</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px" v-show="item.classworkId == classworkId">
          <van-cell title="作业内容" title-class="titleLeft" is-link />
          <div style="color: #666; font-size: 14px; padding: 10px 16px">
            {{ item.content }}
          </div>
          <img-preview :file="item.fileId"></img-preview>
          <van-cell title="备注" title-class="titleLeft" is-link />
          <div style="color: #666; font-size: 14px; padding: 10px 16px">
            {{ item.remarks }}
          </div>
          <van-cell
            title="总题数"
            title-class="titleLeft"
            is-link
            value="30题"
          />
          <van-button type="danger" round block @click="alter(item)"
            >修改</van-button
          >
        </div>
        <div style="margin-top: 10px" v-show="item.courseId == courseId">
          <van-cell title="作业内容" title-class="titleLeft" is-link />
          <van-field
            v-model="message"
            rows="1"
            autosize
            label="作业内容"
            type="textarea"
            placeholder="请输入修改的作业内容"
          />
          <van-uploader v-model="fileList" multiple />
          <van-field
            v-model="remarks"
            rows="1"
            autosize
            label="备注"
            type="textarea"
            placeholder="请输入修改的作业备注"
          />
          <div style="display: flex">
            <van-stepper v-model="stepper" />
            <div style="color: #666; font-size: 15px; margin-left: 10px">
              题数
            </div>
          </div>
          <van-button type="info" round block @click="save"> 保存</van-button>
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
import imgPreview from "../views/util/imgPreview.vue";
export default {
  components: { imgPreview },
  data() {
    return {
      jobList: [],
      classworkId: "-1",
      message: "", //备注
      fileList: [],
      show: false,
      courseId: "",
      remarks: "",
      fileId: "",
      stepper: 1,
    };
  },
  methods: {
    showList(obj) {
      if (obj.classworkId == this.classworkId) {
        this.classworkId = "-1";
      } else {
        this.classworkId = obj.classworkId;
      }
      this.fileId = obj.fileId;
    },
    alter(obj) {
      if (obj.courseId == this.courseId) {
        this.courseId = "-1";
      } else {
        this.courseId = obj.courseId;
      }
    },
    save() {
      let fileData = new FormData();
      for (let obj of this.fileList) {
        fileData.append("file", obj.file);
      }
      if (this.fileList.length != 0) {
        this.axios.post("sys/common/uploadBatch", fileData).then((res) => {
          let fileS = res.data.message;
          let data = {
            classworkId: this.classworkId,
            file: fileS,
            content: this.message,
            total: this.stepper,
            remarks: this.remarks,
          };
          console.log(data);
          this.axios.post("vx/classwork/update", data).then((res) => {
            this.$toast(res.data.message);
          });
        });
      } else {
        this.$toast("文件上传不能为空");
      }
    },
  },
  mounted() {
    let data = {
      token:this.getLocalStorage("token"),
      page: "1",
      pageSize: "5",
    };
    //   console.log(data);
    //获取作业列表
    this.axios.post("vx/classwork/list", data).then((res) => {
      //console.log(res);
      for (var item of res.data.result.records) {
        this.jobList.push(item);
      }
    });

    console.log(this.jobList);
  },

  // vx/classwork/update 课程查看修改按钮
  // ╰微笑感染嘴角的苦涩:
  // String classworkId = jsonObject.getString("id");id就是classworkID
  //  String file = jsonObject.getString("fileId");新的文件id
  //  String content = jsonObject.getString("content"); 新的作业内容
  //  String total = jsonObject.getString("total");新的总题数
  //  String remarks = jsonObject.getString("remarks");新的备注
};
</script>
<style scoped>
.titleLeft {
  font-weight: bold;
  font-size: 15px;
}
</style>