<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
        title="复习中心"
        left-text="返回"
        left-arrow
        @click-left="$router.go('-1')"
    />
    <div>
      <!-- 作业来源-->
      <div @click="showReviewSource=true">
        <mt-cell title="复习来源" is-link>
          <img
              slot="icon"
              src="../../assets/job/作业来源.png"
              width="20"
              height="20"
          />
          {{ reviewSource }}
        </mt-cell>
      </div>
      <van-popup v-model="showReviewSource " position="bottom">
        <van-picker
            show-toolbar
            :columns="reviewSourceList"
            @confirm="onConfirmReviewSource"
            @cancel="showReviewSource = false"
        />
      </van-popup>
    </div>
    <div v-show="reviewSource != ''">
      <div>
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

        <!-- 章节-->
        <div>
          <mt-cell title="章节" is-link>
            <img
                slot="icon"
                src="../../assets/job/章节.png"
                width="20"
                height="20"
            />
            {{ chapter }}
          </mt-cell>
        </div>
      </div>
      <!-- 日期 -->
      <div @click="showDate = true">
        <mt-cell title="上传日期" is-link>
          <img
              slot="icon"
              src="../../assets/job/日期.png"
              width="20"
              height="20"
          />
          <span style="font-size: 14px; margin-top: 3px"> {{ date }}</span>
        </mt-cell>
      </div>
      <van-calendar
          color="#1B8FFFFF"
          type="range"
          v-model="showDate"
          @confirm="onConfirmDate"
          :min-date="minDate"
      />

      <!--  滑选是否已评改-->
      <div>
        <mt-cell title="滑选是否已过关">
          <img
              slot="icon"
              src="../../assets/student/讲解.png"
              width="20"
              height="20"
          />
          <van-switch
              v-model="checkedPass"
              size="20"
              active-color="#1B8FFF"
              inactive-color="#E1E1E1"
          />
        </mt-cell>
      </div>
    </div>

    <!--  tag筛选的标签 -->
    <div style="margin: 8px 8px">
      <van-tag
          v-show="reviewSource"
          style="margin-right: 10px"
          color="#e1e1e1"
          closeable
          size="medium"
          @close="close(reviewSource)"
      >{{ reviewSource }}
      </van-tag>
      <van-tag
          v-show="subject"
          style="margin-right: 10px"
          color="#e1e1e1"
          closeable
          size="medium"
          @close="close(subject)"
      >{{ subject }}
      </van-tag>
    </div>
    <!-- 分割线 -->
    <van-divider
        :style="{
        color: '#f7f8fa',
        borderColor: '#dcdee0',
        margin: ' 0px 0px',
        padding: '0px 8px',
      }"
    >
    </van-divider>
    <!-- 疑难列表标题 -->
    <div
        style="justify-content: space-between; display: flex; align-items: center"
    >
    </div>
    <!-- 疑难列表 -->
    <div class="difficultList" v-for="(item, i) of difficultList" :key="i">
      <div :style="{ borderColor:  '#f2f2f2' }">
        <div @click="$router.push('/studentDetails/'+item.id+'/'+getTable(item))">
          <div>
            <van-tag color="#C8E4FF" text-color="#1B8FFF" round size="large"
            >{{ item.subject }}
            </van-tag>
          </div>
          <div class="title">
            {{ item.chapter }}
          </div>
          <!--  -->
        </div>
        <div>
          <div class="grayFont">{{ item.createTime }}</div>
          <div>

            <van-tag
                style="margin: 0px 5px"
                color="#1B8FFF"
                round
                size="medium"
            >{{ reviewSource==""?item.table:reviewSource }}
            </van-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "../../components/sidebar";
import popupPicker from "../util/popupPicker";

export default {
  components: {sidebar, popupPicker},
  data() {
    return {
      showSubject: false,
      showDate: false,
      date: "", //日期
      subject: "", //科目
      minDate: new Date(2020, 9, 1),
      chapter: "", // 章节
      checkedSolve: false,
      difficultList: [], //疑难题列表
      checkedPass: false, //滑选是否已过关
      showReviewSource: false,//复习来源
      reviewSource: "", //复习来源
      reviewSourceList: [],//复习来源列表
      startDate:"",
      endDate:""
    };
  },
  computed:{
    getTable :()=>{
      return function (data){
        if (data.tableName==undefined){
          switch (data.type) {
            case 1:
              return "difficult_homework";
            case 2:
              return "error_homework";
            case 3:
              return "homework_base";
            case 4:
              return "test_papers";
            case 5:
              return "take_notes";
          }
        }else {
          return data.tableName;
        }
      }
    }
  },
  methods: {
    //   复习来源
    onConfirmReviewSource(value) {
      this.reviewSource = value;
      this.showReviewSource = false;
      this.getDifficultHomework();
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
      this.getDifficultHomework();
    },
    // 日期
    onConfirmDate(date) {
      const moment = require("moment");
      const [start, end] = date;
      this.showDate = false;
      this.startDate = `${moment(start).format("yyyy-MM-DD")}`;
      this.endDate = `${moment(end).format("yyyy-MM-DD")}`;
      this.date = this.startDate +' 至 '+ this.endDate;
      this.getDifficultHomework();
    },
    close(value) {
      if (this.reviewSource == value) {
        this.reviewSource = "";
        this.subject = "";
        this.reloadAll();
      } else if (this.subject == value) {
        this.subject = "";
        this.getDifficultHomework();
      }
    },
    getDifficultHomework() {
      switch (this.reviewSource) {
        case "疑难库":
          this.reviewCenterPage("difficult_homework");
          break;
        case "错题库":
          this.reviewCenterPage("error_homework");
          break;
        case "作业库":
          this.reviewCenterPage("homework_base");
          break;
        case "笔记库":
          this.reviewCenterPage("take_notes");
          break;
        case "试卷库":
          this.reviewCenterPage("test_papers");
          break;
      }
    },
    reviewCenterPage(tableName){
      this.$toast.loading({
        title: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      let data = {
        token: this.getLocalStorage("token"),
        pageSize: 5,
        pageNo: 1,
        subject: this.subject,
        chapter:this.chapter,
        startDate:this.startDate,
        endDate:this.endDate,
        isPassed:this.checkedPass,
        tableName:tableName
      }
      this.axios.post("vx/homeworkCart/reviewCenterPage", data).then((res) => {
        if (res.data.result.length != 0) {
          this.difficultList = res.data.result;
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.difficultList = res.data.result;
          this.$toast("暂无数据");
        }
      });
    },
    reloadAll() {
      this.$toast.loading({
        title: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      let data = {
        token: this.getLocalStorage("token"),
        pageSize: 5,
        pageNo: 1
      }
      this.axios.post("vx/homeworkCart/reviewCenter", data).then((res) => {
        console.log(res);
        if (res.data.result.length != 0) {
          this.difficultList = res.data.result;
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.difficultList = res.data.result;
          this.$toast("暂无数据");
        }
      });
    },
  },
  created() {
    this.$store.dispatch("subjects", {name: "科目"});
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "复习来源"}).then((res => {
      console.log(res);
      for (let subject of res.data.result) {
        this.reviewSourceList.push(subject.title)
      }
    }))
  },
  mounted() {
    this.reloadAll();
  },
};
</script>
<style scoped>

.foot > div:nth-child(2) {
  line-height: 50px;
}

.difficultList {
  margin: 10px 10px;
}

.difficultList .title {
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
  color: #323233c9;
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.difficultList > div {
  box-shadow: 1px 1px 6px #ebebeb;
  border: 1.4px solid rgba(27, 143, 255, 0.5);
  border-radius: 10px;
  position: relative;
}

.difficultList > div > div:nth-child(1) {
  display: flex;
  padding: 8px 5px;
}

.difficultList > div > div:nth-child(2) {
  display: flex;
  justify-content: space-between;
  margin: 5px 6px;
}

</style>
