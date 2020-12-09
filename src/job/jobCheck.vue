<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="批改作业"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <van-tabs v-model="active" @click="active == 0" swipeable color="#1B8FFFFF">
      <van-tab title="未批改">
        <div v-if="noCorrections.length != 0">
          <div v-for="(item, i) of noCorrections" :key="i">
            <div
              class="content"
              style="background-color: #9cccf5"
              @click="unfold(item)"
            >
              <div class="text">
                <div class="time">
                  课程编号{{ item.courseNumber }}/{{ item.product }}/{{
                    item.studentStr
                  }}/{{ item.semester }}
                </div>
                <div>
                  <span>{{ item.subject }}</span>
                </div>
              </div>
              <div class="txt">
                {{ item.createDate }}__ 时间段:{{ item.timeRange }}
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
                v-for="(student, index) of classworkFinishedList"
                :key="index"
              >
                <van-cell :title="student.student" title-class="titleLeft" />
                <img-preview :file="student.fileId"></img-preview>
                <van-cell title="批改的作业" title-class="titleLeft" />
                <div @click="sectionClick(index)">
                  <mt-cell title="问题类别" is-link>
                    <img
                      slot="icon"
                      src="../assets/job/问题类别.png"
                      width="20"
                      height="20"
                    />
                    {{ student.section }}
                  </mt-cell>
                </div>
                <van-popup v-model="showSection" position="bottom">
                  <van-picker
                    show-toolbar
                    :data-id="index"
                    :columns="sectionList"
                    @confirm="onConfirmSection"
                    @cancel="showSection = false"
                  />
                </van-popup>
                <div @click="situationClick(index)">
                  <mt-cell title="完成情况" is-link>
                    <img
                      slot="icon"
                      src="../assets/job/完成情况.png"
                      width="20"
                      height="20"
                    />
                    {{ student.finishSituation }}
                  </mt-cell>
                </div>
                <van-popup v-model="showSituation" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="finishSituationList"
                    @confirm="onConfirmSituation"
                    @cancel="showSituation = false"
                  />
                </van-popup>
                <van-uploader
                  v-model="student.file"
                  multiple
                  style="padding: 10px 16px"
                />
                <van-cell title="作业情况" title-class="titleLeft" />
                <div class="prarent">
                  <div class="err">
                    <span>错误题</span>
                    <van-stepper
                      v-model="student.valueErr"
                      theme="round"
                      button-size="22"
                      min="0"
                      max="50"
                    />
                  </div>
                </div>

                <div class="demo"></div>
              </div>
              <!--  -->
              <van-button
                type="info"
                @click="affirm"
                round
                block
                :loading="btnLoading"
                style="margin-top: 16px"
                >确认
              </van-button>
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 100px" v-else>
          <img src="../assets/job/空白.png" width="100" height="100s" />
          <div style="color: #666; font-size: 15px">暂无任务</div>
        </div>
      </van-tab>
      <van-tab title="已批改">
        <div v-if="responses.length != 0">
          <div v-for="(item, i) of responses" :key="i">
            <div
              class="content"
              style="background-color: #9cccf5"
              @click="unfold(item)"
            >
              <div class="text">
                <div class="time">
                  课程编号{{ item.courseNumber }}/{{ item.product }}/{{
                    item.studentStr
                  }}/{{ item.semester }}
                </div>
                <div>
                  <span>{{ item.subject }}</span>
                </div>
              </div>
              <div class="txt">
                {{ item.createDate }}__ 时间段:{{ item.timeRange }}
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
                <van-cell :title="student.student" title-class="titleLeft" />
                <img-preview :file="student.fileId"></img-preview>
                <van-cell title="批改的作业" title-class="titleLeft" />
                <div @click="sectionClick(index)">
                  <mt-cell title="问题类别" is-link>
                    <img
                      slot="icon"
                      src="../assets/job/问题类别.png"
                      width="20"
                      height="20"
                    />
                    {{ student.questionType }}
                  </mt-cell>
                </div>

                <div>
                  <mt-cell title="完成情况" is-link>
                    <img
                      slot="icon"
                      src="../assets/job/完成情况.png"
                      width="20"
                      height="20"
                    />
                    {{ student.finishSituation }}
                  </mt-cell>
                </div>

                <img-preview :file="student.appraiseFileId"></img-preview>
                <van-cell title="作业情况" title-class="titleLeft" />
                <div class="prarent">
                  <div class="err">
                    <span>错误题</span>
                    {{ student.error }}
                  </div>
                </div>

                <div class="demo"></div>
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
</template>
<script>
import imgPreview from "../views/util/imgPreview.vue";
import leteCheck from "@/components/lateCoach/leteCheck";

export default {
  components: { imgPreview },
  data() {
    return {
      studentText: "",
      noCorrections: [],
      responses: [], // 已批改的作业
      showPicker: false,
      showSection: false,
      showSituation: false,
      columns: [],
      errText: "", //错误的内容
      active: 0, // 标签页
      files: [],
      valueErr: 0,
      courseId: "-1",
      sectionList: [], //问题类别
      classworkFinishedList: [],
      finishSituationList: [],
      i: "",
      btnLoading: false,
    };
  },
  methods: {
    //错误题的弹出框
    onConfirmSection(value) {
      this.showSection = false;
      this.classworkFinishedList[this.i].section = value;
    },
    onConfirmSituation(value) {
      this.showSituation = false;
      this.classworkFinishedList[this.i].finishSituation = value;
    },
    // 展开
    unfold(obj) {
      if (obj.courseId == this.courseId) {
        this.courseId = "-1";
      } else {
        this.courseId = obj.courseId;
      }
      this.classworkFinishedList = [];
      for (let item of obj.classworkFinishedList) {
        let obj = {};
        obj["file"] = [];
        obj.id = item.id;
        obj.finishSituation = "";
        obj.fileId = item.fileId;
        obj.section = "";
        obj.valueErr = item.valueErr;
        this.classworkFinishedList.push(obj);
      }
    },
    sectionClick(i) {
      this.showSection = true;
      this.i = i;
    },
    situationClick(i) {
      this.showSituation = true;
      this.i = i;
    },
    // 确认按钮
    async affirm() {
      this.btnLoading = true;
      let data = {};
      data.token =this.getLocalStorage("token");
      data.courseId = this.courseId;
      let classworkFinished = [];
      for (let item of this.classworkFinishedList) {
        let formData = new FormData();
        if (
          item.file.length == 0 ||
          item.finishSituation == "" ||
          item.section == ""
        ) {
          this.$toast("以上内容不能为空!");
          this.btnLoading = false;
          return;
        }
        for (let ite of item.file) {
          formData.append("file", ite.file);
        }
        await this.axios
          .post("sys/common/uploadBatch", formData)
          .then((res) => {
            let result = new Object();
            result.id = item.id;
            result.finishSituation = item.finishSituation;
            result.error = item.valueErr;
            result.appraiseFileId = res.data.message;
            result.questionType = item.section;
            classworkFinished.push(result);
          });
      }
      data.classworkFinished = classworkFinished;
      this.axios.post("vx/classworkFinished/save", data).then((res) => {
        if (res.data.success == true) {
          this.$toast("操作成功!");
          setTimeout(function () {
            this.$router.go(0);
          }, 1500);
        } else {
          this.$toast("操作失败!");
          this.btnLoading = false;
        }
      });
    },
  },
  mounted() {
    let data = {
      token:this.getLocalStorage("token"),
      status: "7",
    };
    this.axios
      .post("vx/classworkFinished/queryMyClasswork", data)
      .then((res) => {
        res.data.result.forEach((item, i) => {
          this.noCorrections.push(item);
        });
      });
    //问题类别
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "问题类别" })
      .then((res) => {
        for (let classGrade of res.data.result) {
          this.sectionList.push(classGrade.title);
        }
      });
    //完成情况
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "完成情况" })
      .then((res) => {
        for (let classGrade of res.data.result) {
          this.finishSituationList.push(classGrade.title);
        }
      });

    let data1 = {
      token:this.getLocalStorage("token"),
      status: "8",
    };
    this.axios
      .post("vx/classworkFinished/queryMyClasswork", data1)
      .then((res) => {
        res.data.result.forEach((item, i) => {
          this.responses.push(item);
        });
        console.log(this.responses);
      });
  },
};
</script>
<style scoped>
.titleLeft {
  font-weight: bold;
  font-size: 15px;
}

.prarent {
  display: flex;
  padding: 0px 16px;
}

.err {
  text-align: center;
  margin-top: 20px;
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
  margin-top: 10px;
}

.err > img {
  padding-top: 2px;
}
</style>
<style>
.van-stepper--round .van-stepper__minus {
  border: 1px solid #1989fa;
  color: #1989fa;
}

.van-stepper--round .van-stepper__plus {
  background-color: #1989fa;
}
</style>
