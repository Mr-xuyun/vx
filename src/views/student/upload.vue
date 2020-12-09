<template>
  <div>
    <!--底部的拍照上传  -->

    <div class="upload">
      <van-uploader v-model="fileList" multiple :preview-image="false">
        <img src="../../assets/student/拍照上传.png" width="75" height="75" />
      </van-uploader>
    </div>

    <div>
      <sidebar>我的上传
          <img
                src="../../assets/student/星号.png"
                width="10"
                height="10"
                alt=""
            />
      </sidebar>
      <van-uploader
        style="padding: 6px 8px"
        :show-upload="false"
        v-model="fileList"
        multiple
      />
    </div>
    <!-- 图片类型 -->
    <sidebar
      >图片类型
      <img src="../../assets/student/星号.png" width="10" height="10" alt=""
    /></sidebar>
    <div style="display: flex; justify-content: space-around; margin-top: 10px">
      <van-tag v-if="id != undefined" size="large" color="#1B8FFFFF"
        >{{ type }}
      </van-tag>
      <van-tag
        v-else
        v-for="(res, index) of imgType"
        :key="index"
        @click="imgSwitch(index, res)"
        size="large"
        :style="{ backgroundColor: res == type ? '#1989fa' : '#d9d9d9' }"
        >{{ res }}
      </van-tag>
    </div>
    <div>
      <div v-show="type != ''" style="margin-top: 10px">
        <!-- 所属科目 -->
        <div @click="showSubject = true">
          <div class="cell">
            <sidebar
              >所属科目
            </sidebar>
            <div class="cell_right">
              <span class="grayFont" style="padding: 0px 8px">{{
                subject
              }}</span>
              <img src="../../assets/right.png" width="15" height="15" />
            </div>
          </div>
        </div>
        <!-- 所属章节 -->
        <div>
          <div class="cell">
            <sidebar
              >所属章节
              <img
                src="../../assets/student/星号.png"
                width="10"
                height="10"
                alt=""
            /></sidebar>
            <div class="cell_right">
              <van-field v-model="chapter" placeholder="请输入章节" />
              <img src="../../assets/right.png" width="15" height="15" />
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 疑难题编辑 -->
      <div v-show="type == '疑难题'">
        <!-- 是否已解决 -->
        <div>
          <div class="cell">
            <sidebar
              >是否已解决
              <img
                src="../../assets/student/星号.png"
                width="10"
                height="10"
                alt=""
            /></sidebar>
            <div class="cell_switch">
              <van-switch
                v-model="checkedSolve"
                size="20px"
                active-color="#1B8FFF"
                inactive-color="#E1E1E1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 疑难题结束 -->

    <!-- 错题开始-->
    <div v-show="type == '错题'">
      <!-- 错题类型 -->
      <div style="padding-bottom: 10px; border-bottom: 1px solid #f2f2f2">
        <div class="cell" style="border: none; padding-bottom: 0px">
          <sidebar
            >错题类型
            <img
              src="../../assets/student/星号.png"
              width="10"
              height="10"
              alt=""
          /></sidebar>
          <div class="cell_right">
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <div style="display: flex; margin-top: 8px">
          <van-tag
            style="margin-left: 10px"
            v-for="(res, index) of errTypeList"
            :key="index"
            @click="errSwitch(index, res)"
            size="medium"
            :color="res == typeErr ? '#1B8FFFFF' : '#d9d9d9'"
            >{{ res }}
          </van-tag>
        </div>
      </div>
      <!-- 是否改正 -->
      <div>
        <div class="cell">
          <sidebar
            >是否已解决
            <img src="../../assets/student/星号.png" width="10" height="10"
          /></sidebar>
          <div class="cell_switch">
            <van-switch
              v-model="checkedCorrect"
              size="20px"
              active-color="#1B8FFF"
              inactive-color="#E1E1E1"
            />
          </div>
        </div>
      </div>
      <!-- 是否需讲解 -->
      <div>
        <div class="cell">
          <sidebar
            >是否需讲解
            <img src="../../assets/student/星号.png" width="10" height="10"
          /></sidebar>
          <div class="cell_switch">
            <van-switch
              v-model="checkedExplain"
              size="20px"
              active-color="#1B8FFF"
              inactive-color="#E1E1E1"
            />
          </div>
        </div>
      </div>
      <!-- 错误原因 -->
      <div>
        <div class="cell" @click="showSection = true">
          <sidebar>错误原因 </sidebar>
          <div class="cell_right">
            <span class="grayFont" style="padding: 0px 8px">{{
              errCause
            }}</span>
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showSection" position="bottom">
          <van-picker
            show-toolbar
            :columns="$store.state.sectionList"
            @confirm="onConfirmSection"
            @cancel="showSection = false"
          />
        </van-popup>
      </div>
      <!-- 提示 -->
      <div>
        <div class="cell">
          <sidebar
            >请系统提醒在
            <van-stepper
              style="display: inline"
              v-model="days"
              :min="0"
              :integer="true"
            />
            天之后复习本题
          </sidebar>
        </div>
      </div>
    </div>
    <!-- 作业版块-->
    <div v-show="type == '作业'">
      <!-- 作业来源 -->
      <div>
        <div class="cell" @click="showWorkSource = true">
          <sidebar>作业来源 </sidebar>
          <div class="cell_right">
            <span class="grayFont" style="padding: 0px 8px">{{
              workSource
            }}</span>
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showWorkSource" position="bottom">
          <van-picker
            show-toolbar
            :columns="workSourceList"
            @confirm="onConfirmWorkSource"
            @cancel="showWorkSource = false"
          />
        </van-popup>
      </div>
      <!--是否已评改  -->
      <div>
        <div class="cell">
          <sidebar
            >是否已评改
            <img src="../../assets/student/星号.png" width="10" height="10"
          /></sidebar>
          <div class="cell_switch">
            <van-switch
              v-model="checkedRegarding"
              size="20px"
              active-color="#1B8FFF"
              inactive-color="#E1E1E1"
            />
          </div>
        </div>
      </div>
      <!--是否需讲解  -->
      <div>
        <div class="cell">
          <sidebar
            >是否需讲解
            <img src="../../assets/student/星号.png" width="10" height="10"
          /></sidebar>
          <div class="cell_switch">
            <van-switch
              v-model="checkedExplain"
              size="20px"
              active-color="#1B8FFF"
              inactive-color="#E1E1E1"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 作业版块结束 -->

    <!-- 试卷版块 -->
    <div v-show="type == '试卷'">
      <!-- 试卷来源 -->
      <div>
        <div class="cell" @click="showPaperSource = true">
          <sidebar>试卷来源 </sidebar>
          <div class="cell_right">
            <span class="grayFont" style="padding: 0px 8px">{{
              paperSource
            }}</span>
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showPaperSource" position="bottom">
          <van-picker
            show-toolbar
            :columns="paperSourceList"
            @confirm="onConfirmPaperSource"
            @cancel="showPaperSource = false"
          />
        </van-popup>
      </div>
      <!--是否已评改  -->
      <div>
        <div class="cell">
          <sidebar
            >是否已评改
            <img src="../../assets/student/星号.png" width="10" height="10"
          /></sidebar>
          <div class="cell_switch">
            <van-switch
              v-model="checkedRegarding"
              size="20px"
              active-color="#1B8FFF"
              inactive-color="#E1E1E1"
            />
          </div>
        </div>
      </div>
      <!-- 试卷类型 -->
      <div>
        <div class="cell" @click="showPaperType = true">
          <sidebar>试卷类型 </sidebar>
          <div class="cell_right">
            <span class="grayFont" style="padding: 0px 8px">{{
              paperType
            }}</span>
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showPaperType" position="bottom">
          <van-picker
            show-toolbar
            :columns="paperTypeList"
            @confirm="onConfirmPaperType"
            @cancel="showPaperType = false"
          />
        </van-popup>
      </div>
      <!-- 得分 -->
      <div class="cell">
        <sidebar>得分 </sidebar>
        <div class="cell_right">
          <van-field
            v-model="score"
            type="number"
            placeholder="请输入得分情况(数字)"
          />
          <img src="../../assets/right.png" width="15" height="15" />
        </div>
      </div>
      <!-- 满分 -->
      <div class="cell">
        <sidebar>满分 </sidebar>
        <div class="cell_right">
          <van-field
            v-model="fullScore"
            type="number"
            placeholder="请输入试卷满分多少分(数字)"
          />
          <img src="../../assets/right.png" width="15" height="15" />
        </div>
      </div>
      <!-- 班级名次 -->
      <div class="cell">
        <sidebar>班级名次 </sidebar>
        <div class="cell_right">
          <van-field
            v-model="classRanks"
            type="number"
            placeholder="请输入班级名次"
          />
          <img src="../../assets/right.png" width="15" height="15" />
        </div>
      </div>
      <!-- 年级名次 -->
      <div class="cell">
        <sidebar>年级名次 </sidebar>
        <div class="cell_right">
          <van-field
            v-model="gradeRanks"
            type="number"
            placeholder="请输入年级名次"
          />
          <img src="../../assets/right.png" width="15" height="15" />
        </div>
      </div>
    </div>
    <!-- 试卷版块结束 -->

    <!-- 笔记的开始 -->
    <div v-show="type == '笔记'">
      <!-- 笔记的来源 -->
      <div>
        <div class="cell" @click="showNoteSource = true">
          <sidebar>笔记来源 </sidebar>
          <div class="cell_right">
            <span class="grayFont" style="padding: 0px 8px">{{
              noteSource
            }}</span>
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showNoteSource" position="bottom">
          <van-picker
            show-toolbar
            :columns="noteSourceList"
            @confirm="onConfirmNoteSource"
            @cancel="showNoteSource = false"
          />
        </van-popup>
      </div>
      <!-- 笔记的类型 -->
      <div>
        <div class="cell" @click="showNoteType = true">
          <sidebar>笔记类型 </sidebar>
          <div class="cell_right">
            <span class="grayFont" style="padding: 0px 8px">{{
              noteType
            }}</span>
            <img src="../../assets/right.png" width="15" height="15" />
          </div>
        </div>
        <!-- 弹出框 -->
        <van-popup v-model="showNoteType" position="bottom">
          <van-picker
            show-toolbar
            :columns="noteTypeList"
            @confirm="onConfirmNoteType"
            @cancel="showNoteType = false"
          />
        </van-popup>
      </div>
    </div>

    <!-- 共用的备注 -->
    <div v-show="type != ''">
      <div class="cell">
        <sidebar>备注</sidebar>
        <div class="cell_right">
          <van-field v-model="remark" placeholder="请输入备注" />
          <img src="../../assets/right.png" width="15" height="15" />
        </div>
      </div>
    </div>
    <van-popup v-model="showSubject" position="bottom">
      <van-picker
        show-toolbar
        :columns="$store.state.subjectList"
        @confirm="onConfirmSubject"
        @cancel="showSubject = false"
      />
    </van-popup>
    <van-button type="info" round block :disabled="showSave" v-show="type != ''" @click="save"
      >提交</van-button
    >
    <!-- 底部选项卡 -->
    <div style="margin-top: 60px">
      <van-tabbar
        v-model="active"
        inactive-color="#999"
        active-color="#1B8FFF"
        route
      >
        <van-tabbar-item replace to="/students" >
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/upload"  style="margin-bottom:0px;">
           <div style="    margin-bottom: 7px; text-align: center;"
   >
              <img
              src="../../assets/student/上传3.svg"
               width="38" height="30"
            />
             <div style="color:#1b8fff; font-weight:bold;    padding-top: 3px; " >上传</div>
           </div>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" replace to="/studentUser">
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ? userIcon.active : userIcon.inactive"  />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import sidebar from "../../components/sidebar";
import PopupPicker from "@/views/util/popupPicker";

export default {
  components: { PopupPicker, sidebar },
  data() {
    return {
      id: this.$route.query.id,
      fileList: [],
      active: 1,
      icon: {
        active: require("../../assets/student/首页-选中.png"),
        inactive: require("../../assets/student/首页-未选中.png"),
      },
      uploadIcon: {
        active: require("../../assets/student/上传2.png"),
        // inactive: require("../../assets/student/上传未选中.png"),
      },
      userIcon: {
        active: require("../../assets/student/我的选中.png"),
        inactive: require("../../assets/student/我的未选中.png"),
      },
      imgType: ["疑难题", "错题", "作业", "试卷", "笔记"],
      errTypeList: ["选择题", "填空题", "大题", "其他"],
      type: "", //图片类型
      showSubject: false,
      showSection: false, // 错误原因弹出框
      showPaperSource: false, //试卷来源弹出框
      showPaperType: false, //试卷类型弹出框
      showNoteSource: false, //笔记来源弹出框
      showNoteType: false, //笔记类型弹出框
      showWorkSource: false, //作业来源弹出框
      subject: "", //科目
      chapter: "", //章节
      checkedSolve: false, //滑块是否已解决
      remark: "", //备注,
      typeErr: "", //错题类型
      checkedCorrect: false, //滑块是否改正
      checkedExplain: false, //滑块是否需讲解
      checkedRegarding: false, //滑块是否已评改
      days: 0, //多少天之后提醒
      errCause: "", //错误原因
      workSource: "", //作业来源
      paperSource: "", //试卷来源
      paperType: "", //试卷类型
      score: "", //得分
      fullScore: "", //满分
      classRanks: "", //班级名次
      gradeRanks: "", //年级名次
      noteSource: "", //笔记来源
      noteType: "", //笔记类型
      paperSourceList: [], //试卷来源列表
      paperTypeList: [], //试卷类型列表
      noteSourceList: [], //笔记来源列表
      noteTypeList: [], //笔记类型列表
      workSourceList: [], //作业来源列表
      showSave:false, //提交的禁用按钮
    };
  },
  methods: {
    save() {
      let data = {
        token: this.getLocalStorage("token"),
      };
      if (this.id != undefined) {
        data.id = this.id;
      }
      if (
        this.fileList.length != 0 &&
        this.type != "" &&
        this.subject != "" &&
        this.chapter != ""
      ) {
        data.imgType = this.type;
        data.subject = this.subject;
        data.chapter = this.chapter;
        data.remarks = this.remark;
        switch (this.type) {
          case "疑难题":
            data.isDone = this.checkedSolve;
            break;
          case "错题":
            if (this.typeErr == "") {
              this.$toast("错题类型不能为空");
              return;
            }
            data.errorType = this.typeErr;
            data.isDone = this.checkedCorrect;
            data.isExplain = this.checkedExplain;
            data.errorReason = this.errCause;
            data.days = this.days;
            break;
          case "作业":
            if (this.workSource == "") {
              this.$toast("作业来源不能为空");
              return;
            }
            data.source = this.workSource;
            data.isAnalysed = this.checkedRegarding;
            data.isExplain = this.checkedExplain;
            break;
          case "试卷":
            data.source = this.paperSource;
            data.isAnalysed = this.checkedRegarding;
            data.paperType = this.paperType;
            data.score = this.score;
            data.sum = this.fullScore;
            data.classPlace = this.classRanks;
            data.gradePlace = this.gradeRanks;
            break;
          case "笔记":
            data.notesSource = this.noteSource;
            data.notesType = this.noteType;
            break;
          default:
            this.$toast("图片类型错误");
        }
      } else {
        this.$toast("带星号不能为空");
        return;
      }
      let fileData = new FormData();
      for (let item of this.fileList) {
        fileData.append("file", item.file);
      }
      this.$toast.loading({
        title: "提交中...",
        duration: 0,
        closeOnClick: true,
      });
      this.showSave = true;
      this.axios.post("sys/common/uploadBatch", fileData).then((res) => {
        if (res.data.success == true) {
          data.fileId = res.data.message;
          this.axios.post("vx/homeworkBase/save", data).then((res) => {
            if (res.data.success == true && res.data.result == true) {
              this.showSave = false;
              this.$toast.clear();
               this.$toast(res.data.message);
            } else {
              this.showSave = false;
              this.$toast.clear();
               this.$toast("操作失败!msg={}," + res.data.message);
            }
          });
        } else {
          this.showSave = false;
          this.$toast("图片上传失败!");
          this.$toast.clear();
        }
      });
    },
    // 图片类别 切换图标
    imgSwitch(i, res) {
      this.subject = "";
      this.chapter = "";
      this.remark = "";
      this.checkedExplain = false;
      this.checkedRegarding = false;
      if (this.type == res) {
        this.type = "";
      } else {
        this.type = res;
      }
    },
    //错题类型切换
    errSwitch(i, value) {
      if (this.typeErr == value) {
        this.typeErr = "";
      } else {
        this.typeErr = value;
      }
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
    },
    onConfirmSection(value) {
      this.errCause = value;
      this.showSection = false;
    },
    onConfirmPaperSource(value) {
      this.paperSource = value;
      this.showPaperSource = false;
    },
    onConfirmPaperType(value) {
      this.paperType = value;
      this.showPaperType = false;
    },
    onConfirmNoteSource(value) {
      this.noteSource = value;
      this.showNoteSource = false;
    },
    onConfirmNoteType(value) {
      this.noteType = value;
      this.showNoteType = false;
    },
    onConfirmWorkSource(value) {
      this.workSource = value;
      this.showWorkSource = false;
    },
  },
  mounted() {
    this.$store.dispatch("subjects", { name: "科目" });
    this.$store.dispatch("sections", { name: "错误原因" });
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "试卷来源" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.paperSourceList.push(subject.title);
        }
      });
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "试卷类型" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.paperTypeList.push(subject.title);
        }
      });
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "笔记来源" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.noteSourceList.push(subject.title);
        }
      });
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "笔记类型" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.noteTypeList.push(subject.title);
        }
      });
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "作业来源" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.workSourceList.push(subject.title);
        }
      });
    //编辑回显
    let tableName = this.$route.query.tableName;
    let id = this.$route.query.id;
    if (tableName != undefined || id != undefined) {
      let data = {
        tableName: tableName,
        id: id,
      };
      this.axios
        .post("vx/homeworkCart/queryByTableNameAndId", data)
        .then((res) => {
          let result = res.data.result;
          for (let f of result.file_id.split(",")) {
            this.fileList.push({ url: this.$store.state.imgURL + f });
          }
          this.subject = result.subject;
          this.chapter = result.chapter;
          this.remark = result.remarks;
          switch (tableName) {
            case "difficult_homework":
              this.type = "疑难题";
              this.checkedSolve = result.is_done == 1 ? true : false;
              break;
            case "error_homework":
              this.type = "错题";
              this.typeErr = result.error_type;
              this.checkedCorrect = result.is_done == 1 ? true : false;
              this.checkedExplain = result.is_explain == 1 ? true : false;
              this.errCause = result.error_reason;
              this.days = result.days;
              break;
            case "homework_base":
              this.type = "作业";
              this.workSource = result.source;
              this.checkedRegarding = result.is_analysed == 1 ? true : false;
              this.checkedExplain = result.is_explain == 1 ? true : false;
              break;
            case "test_papers":
              this.type = "试卷";
              this.paperSource = result.source;
              this.checkedRegarding = result.is_analysed;
              this.paperType = result.paper_type;
              this.score = result.score;
              this.fullScore = result.sum;
              this.classRanks = result.class_place;
              this.gradeRanks = result.grade_place;
              break;
            case "take_notes":
              this.type = "笔记";
              this.noteSource = result.notes_source;
              this.noteType = result.notes_type;
              break;
          }
        });
    }
  },
};
</script>
<style lang="less" scoped>
.upload {
  width: 100%;
  height: 150px;
  background-image: linear-gradient(to bottom, #1b8fff, #06b2ff);
  text-align: center;
  line-height: 200px;
  display: flex;
  justify-content: space-around;
}
.cell {
  display: flex;
  margin-top: 2px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #f2f2f2;
  height: 35px;
}

.cell_right {
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.cell_switch {
  margin-top: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
}
::v-deep .van-cell{
       padding: 10px 0px;
}
</style>
