<template>
  <div class="Taskdesk">
    <van-nav-bar
      title="工作台"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 标签页-->
    <div>
      <van-tabs v-model="tabID" title-active-color="#1B8FFF" color="#1B8FFF">
        <van-tab title="待完成" name="1">
          <div v-if="detailsList.length != 0">
            <div v-for="(item, i) of detailsList" :key="i">
              <div
                class="details"
                :style="{
                  backgroundColor: item.id == i ? Bgcolor[0] : Bgcolor[1],
                }"
                @click="cutImg(item.id)"
              >
                <div class="user">
                  <img src="../assets/tx.jpg" />
                  <div :style="{ color }">校长</div>
                </div>
                <div class="textL" :style="{ color }">
                  <div>
                    {{ item.taskNumber }}-{{ item.receiver }}-{{ item.content }}
                  </div>
                  <div>{{ item.modifyTime }}截止</div>
                </div>
                <img :src="img" />
              </div>
              <div v-show="listID == item.id">
                <!-- 进度条 -->
                <div class="Tuser">
                  <img src="../assets/tx.jpg" alt="" />
                  <div class="teacher">
                    <div>{{ item.receiver }}</div>
                    <div>老师</div>
                  </div>
                </div>
                <div>
                  <van-steps :active="item.status" active-color="#0B8FFF">
                    <van-step>未接收</van-step>
                    <van-step>已接收</van-step>
                    <van-step>已开始</van-step>
                    <van-step>已完成</van-step>
                    <van-step>审核通过</van-step>
                  </van-steps>
                  <div class="releaseTime">
                    <div>{{ item.startTime }} 发布</div>
                    <div>{{ item.endTime }}截止</div>
                  </div>
                </div>
                <!-- 任务图片 -->
                <div
                  v-if="
                    item.executorFileId != null &&
                    item.executorFileId.length != 0
                  "
                >
                  <img-preview :file="item.executorFileId"></img-preview>
                </div>
                <!--  -->
                <div class="file">
                  <div>备注：</div>
                  <div style="padding:10px 8px;">{{ item.remakes }}</div>
                </div>
                <!-- 文件上传 -->
                <div class="file">
                  <div>我的上传</div>
                  <van-uploader
                    v-model="fileList"
                    multiple
                    :disabled="true"
                    :deletable="false"
                  />
                </div>
                <!-- 确认按钮 -->
                <div class="btn">
                  <van-button
                    type="info"
                    :disabled="item.status == 0 ? false : true"
                    round
                    @click="btnReceiven(item.id, i)"
                    >确认接收
                  </van-button>
                  <van-button
                    type="info"
                    :disabled="item.status <= 1 ? false : true"
                    round
                    @click="showPicker = true"
                    >确认开始
                  </van-button>
                  <van-button
                    type="info"
                    :disabled="item.status == 3 ? true : false"
                    round
                    @click="showPicker = true"
                    >确认完成
                  </van-button>
                  <van-popup
                    v-model="showPicker"
                    :close-on-click-overlay="false"
                    position="bottom"
                  >
                    <van-uploader
                      v-model="tempFileList"
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                      multiple
                    />
                    <van-button
                      size="large"
                      round
                      type="primary"
                      @click="
                        btnAccomplish(item.id, i);
                        showPicker = false;
                      "
                      >确认
                    </van-button>
                    <van-button size="large" round @click="showPicker = false"
                      >取消</van-button
                    >
                  </van-popup>
                </div>
                <div
                  style="display: flex; margin-top: 10px; align-items: center"
                >
                  <van-field
                    v-model="message"
                    rows="1"
                    autosize
                    label="沟通协调"
                    type="textarea"
                    placeholder="请输入内容"
                    @focus="focusInput(item.id)"
                    maxlength="30"
                  />
                  <van-button
                    type="info"
                    :disabled="message.length <= 0"
                    @click="save(item.id)"
                    >发送</van-button
                  >
                </div>
                <!-- <div
                  class="blueFont"
                  style="font-weight: bold; text-align: right; margin-top: 25px"
                >
                  沟通协调
                </div> -->
                <div v-for="(res,i) of chatList "  :key="i" >
                <!-- 管理员的评论内容 -->
                <div class="admin"  v-if="res.isSender">
                  <div></div>
                  <div style="display: flex; align-items: center">
                    <span class="grayFont" 
                      >{{res.content}}</span
                    >
                    <img src="../assets/tx.jpg" class="avatar" />
                    <div style="width: 70px">
                      <div style="font-weight: bold">黄小满</div>
                      <div style="font-size: 13px; color: #999">管理员</div>
                    </div>
                  </div>
                </div>
                <!-- 老师的沟通协调 -->
                <div class="admin" v-if="!res.isSender">
                  <div style="display: flex; align-items: center">
                    <img src="../assets/tx.jpg" class="avatar" />
                    <div style="width: 70px">
                      <div style="font-weight: bold">{{res.user}}</div>
                      <div style="font-size: 13px; color: #999">老师</div>
                    </div>
                    <span class="grayFont" style="margin-left: 6px"
                      >{{res.content}}</span
                    >
                  </div>
                  <div></div>
                 </div>
              </div>
              </div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 100px" v-else>
            <img src="../assets/job/空白.png" width="100" height="100s" />
            <div style="color: #666; font-size: 15px">暂无任务</div>
          </div>
        </van-tab>

        <van-tab title="已完成" name="2">
          <div v-if="finishedList.length != 0">
            <div v-for="(item, i) of finishedList" :key="i + 2">
              <div
                class="details"
                :style="{
                  backgroundColor: item.id == i ? Bgcolor[0] : Bgcolor[1],
                }"
                @click="cutImg(item.id)"
              >
                <div class="user">
                  <img src="../assets/tx.jpg" />
                  <div :style="{ color }">校长</div>
                </div>
                <div class="textL" :style="{ color }">
                  <div>
                    {{ item.taskNumber }}-{{ item.receiver }}-{{ item.content }}
                  </div>
                  <div>{{ item.modifyTime }}截止</div>
                </div>
                <img :src="img" />
              </div>
              <div v-show="listID == item.id">
                <div class="Tuser">
                  <img src="../assets/tx.jpg" alt="" />
                  <div class="teacher">
                    <div>{{ item.receiver }}</div>
                    <div>老师</div>
                  </div>
                </div>
                <div>
                  <van-steps :active="item.status" active-color="#0B8FFF">
                    <van-step>未接收</van-step>
                    <van-step>已接收</van-step>
                    <van-step>已开始</van-step>
                    <van-step>已完成</van-step>
                    <van-step>审核通过</van-step>
                  </van-steps>
                  <div class="releaseTime">
                    <div>{{ item.startTime }} 发布</div>
                    <div>{{ item.endTime }}截止</div>
                  </div>
                </div>
                <!-- 任务图片 -->
                <div
                  v-if="
                    item.executorFileId != null &&
                    item.executorFileId.length != 0
                  "
                >
                  <img-preview :file="item.executorFileId"></img-preview>
                </div>
                <!--  -->
                <div class="content" style="height:45px;">
                  <div>备注：</div>
                  <span>{{ item.remakes }}</span>
                </div>
                <div class="content" style="height:45px;">
                  <div>评价：</div>
                  <span>{{ item.comment }}</span>
                </div>
                <!-- 文件上传 -->
                <div class="file">
                  <div>我的上传</div>
                  <div v-if="item.extra != null && item.extra.length != 0">
                    <img-preview :file="item.extra"></img-preview>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 100px" v-else>
            <img src="../assets/job/空白.png" width="100" height="100s" />
            <div style="color: #666; font-size: 15px">暂无任务</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import imgPreview from "../views/util/imgPreview.vue";
export default {
  components: { imgPreview },
  data() {
    return {
      //标签页的id
      tabID: 1,
      img: require("../assets/right.png"),
      Bgcolor: ["#0B8FFF", "#999"],
      color: "#fff",
      showDetails: false, //展示列表
      detailsList: [], //任务的列表
      imgURL:"https://sdmx.oss-cn-hangzhou.aliyuncs.com/upload/",
      listID: 0,
      show: false,
      showPicker: false,
      disabled1: false,
      disabled2: false,
      disabled3: false,
      tempFileList: [],
      fileList: [],
      finishedList: [],
      fileName: "",
      message: "",
      chatList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
    },
    //切换图标和背景颜色 ，字体颜色，和展开效果
    cutImg(i) {
      this.img =
        this.img == require("../assets/right.png")
          ? require("../assets/down.png")
          : require("../assets/right.png");
      if (this.listID == i) {
        this.listID = -1;
      } else {
        this.listID = i;
      }
      // this.focusInput(this.listID);
    },
    showx() {
      this.show = !this.show;
    },
    // 接收按钮
    btnReceiven(id, i) {
      Dialog.confirm({
        message: "确认接收吗？",
        confirmButtonColor: "#0B8FFF",
      }).then(() => {
        this.detailsList[i].status = parseInt(this.detailsList[i].status) + 1;
        let idList = [];
        idList.push(id);
        let data = {
          token: this.getLocalStorage("token"),
          status: this.detailsList[i].status,
          idList: idList,
          admin: false,
        };
        this.axios.post("vx/task/changeTaskStatus", data).then((res) => {
          this.$toast("操作成功");
        });
      });
    },
    btnAccomplish(id, i) {
      this.detailsList[i].status = parseInt(this.detailsList[i].status) + 1;
      let tempFileList = new FormData();
      for (let item of this.tempFileList) {
        tempFileList.append("file", item.file);
      }
      this.axios.post("sys/common/uploadBatch", tempFileList).then((res) => {
        let idList = [];
        idList.push(id);
        let data = {
          token: this.getLocalStorage("token"),
          status: this.detailsList[i].status,
          idList: idList,
          admin: false,
          taskFlowFile: res.data.message,
        };
        this.axios.post("vx/task/changeTaskStatus", data).then((res) => {
          this.fileList.push(tempFileList);
          this.tempFileList = [];
          this.fileName = [];
          this.$toast("操作成功");
          if (this.detailsList[i].status == "3") {
            this.$router.go("0");
          }
        });
      });
    },
    //加载沟通协调内容
    focusInput(taskId) {
      let data = {
        taskId: taskId,
      };
      console.log(data);
      this.axios.post("vx/taskChatRecord/list", data).then((res) => {
        this.chatList = res.data.result;
      //  console.log(this.chatList);
      });
    },
    //保存沟通协调内容
    save(taskId) {
      let data = {
        token: this.getLocalStorage("token"),
        taskId: taskId,
        content: this.message,
        isSender: true,
      };
      this.axios.post("vx/taskChatRecord/save", data).then((res) => {
        this.$toast("操作成功");
        this.axios
          .post("vx/taskChatRecord/list", { taskId: taskId })
          .then((re) => {
            this.chatList = re.data.result;
          });
      });
    },
  },
  mounted() {
    // console.log(this.taskId);

    //待完成的列表
    let data1 = {
      token: this.getLocalStorage("token"),
      status: "0,1,2",
      pageNo: 1,
      pageSize: 5,
    };
    this.axios.post("vx/task/getAllMyTask", data1).then((res) => {
      //  console.log(res);
      this.detailsList = res.data.result.records;
    });
    // 已完成的列表
    let data2 = {
      token: this.getLocalStorage("token"),
      status: "3,4,5",
      pageNo: 1,
      pageSize: 5,
    };
    //console.log(data1,data2);
    this.axios.post("vx/task/getAllMyTask", data2).then((res) => {
      // console.log(res);
      this.finishedList = res.data.result.records;
    });
  },
};
</script>
<style scoped>
/* 管理员沟通协调的内容 */
.admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid #f2f2f2ff;
}

/* 评论和备注的内容 */
.content {
  display: flex;
  align-items: center;
  padding: 0px 8px;
  margin: 14px 0px;
}
.textL > div:nth-child(1) {
  font-size: 14px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.textL > div:nth-child(2) {
  opacity: 0.7;
  margin-top: 5px;
  text-align: right;
  color: #666;
  font-size: 13px;
}
.content > div {
  font-weight: lighter;
}

.content > span {
  color: #787878;
  font-size: 14px;
}

/* 按钮布局 */
.btn {
  display: flex;
  justify-content: space-around;
}

/* 文件*/
.file {
  margin-top: 14px;
}

.file > div {
  font-weight: lighter;
  padding: 0px 8px;
  padding-bottom: 8px;
}

/* 老师 */
.Tuser {
  display: flex;
  align-items: center;
  margin: 10px 10px;
  border-bottom: 1px solid rgba(153, 153, 153, 0.4);
  padding: 10px 0px;
  width: 100%;
}

.Tuser img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 0px 5px;
}

.teacher {
  margin-left: 5px;
}

.teacher div:nth-child(1) {
  color: #000;
  font-weight: bold;
}

.teacher div:nth-child(2) {
  color: #666;
  font-size: 10px;
}

/* 发布时间 */
.releaseTime {
  display: flex;
  justify-content: space-between;
  padding: 7px 7px;
  color: #000000;
  opacity: 0.5;
  font-size: 12px;
}

/* 进度条 */
.steps {
  display: flex;
  justify-content: space-between;
}

.steps:nth-child(2) {
  width: 500px;
}

.details {
  height: 40px;
  border: 1px solid 1px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 5px 5px #999;
}

.text {
  width: 250px;
  color: #646566;
  padding-left: 15px;
}

.text span {
  opacity: 0.5;
  color: #f2f2f2;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 12px;
}

.text div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 头像 */
.user {
  display: flex;
  align-items: center;
  color: #646566;
}

.user > div {
  margin-left: 5px;
}

.user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
/* 沟通协调发送按钮 */
.sendBtn {
  width: 71px;
  height: 28px;
  background-color: #1b8fff;
  border-radius: 5px;
  border: none;
  color: #fff;
}
</style>
