<template>
  <div>
    <van-nav-bar
      title="学情分析"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <!--  日期-->
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
    <!-- 应该做什么 -->
    <van-calendar
      color="#1B8FFF"
      v-model="showDate"
      @confirm="onConfirmDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <van-tabs v-model="active" swipeable color="#1B8FFFFF">
      <van-tab title="应该做什么">
        <div v-if="playhomeList.length != 0 || playclassLsit.length != 0">
          <div class="play" v-for="(item, i) of playhomeList" :key="i">
            <div class="work">
              <div>作业性质 :<span>铭师作业</span></div>
              <div>
                总题数 : <span>{{ item.total }}</span>
              </div>
              <van-tag
                type="primary"
                style="color: #fff; position: absolute; top: 0px; right: 0px"
                size="medium"
                >{{ item.subject }}</van-tag
              >
            </div>
            <div class="nature">
              <div>章节 :</div>
              <div>{{ item.chapter }}</div>
            </div>
            <div class="nature">
              <div>知识点 :</div>
              <div>{{ item.languagePoints }}</div>
            </div>

            <div class="nature">
              <div>备注: &nbsp;&nbsp;</div>
              <div>
                {{ item.remarks }}
              </div>
            </div>
            <h4 style="margin-left: 18px; color: #1b8fffff">附件</h4>
            <img-preview :file="item.fileId"></img-preview>
            <div class="jiao">
              <van-tag
                type="primary"
                style="color: #fff; position: absolute; bottom: 2px; right: 0px"
                size="large"
                >上课</van-tag
              >
            </div>
            <!-- 学校作业 版块 -->
          </div>
          <div
            class="play"
            v-for="(item, index1) of playclassLsit"
            :key="index1 + 55"
          >
            <div class="work">
              <div>作业性质 :<span>学校作业</span></div>
              <div>
                作业来源 <span>{{ item.type }}</span>
              </div>
              <van-tag
                type="primary"
                style="color: #fff; position: absolute; top: 0px; right: 0px"
                size="medium"
                >{{ item.subject }}</van-tag
              >
            </div>
            <div class="nature">
              <div>预计时长</div>
              <div>{{ item.expect }}</div>
            </div>
            <div class="nature">
              <div>章节 :</div>
              <div>{{ item.chapter }}</div>
            </div>
            <div class="nature">
              <div>知识点 :</div>
              <div>{{ item.languagePoints }}</div>
            </div>
            <div class="total">
              <div>
                选择题<span> {{ item.choice }}题</span>
              </div>
              <div>
                填空题 <span> {{ item.completion }}题</span>
              </div>
              <div>
                大题 <span> {{ item.bigQuestions }}题</span>
              </div>
            </div>
            <div class="nature">
              <div>其他: &nbsp;&nbsp;</div>
              <div>
                {{ item.others }}
              </div>
            </div>
            <h4 style="margin: 10px 18px; margin-left: 18px; color: #1b8fffff">
              附件
            </h4>
            <img-preview :file="item.fileId"></img-preview>
            <div class="jiao">
              <van-tag
                type="primary"
                style="color: #fff; position: absolute; bottom: 2px; right: 0px"
                size="large"
                >上课</van-tag
              >
            </div>
          </div>
        </div>
        <div v-else>
          <van-empty description="暂无数据" />
        </div>
        <!-- 做了什么 -->
      </van-tab>
      <van-tab title="做了什么">
      <div v-if="doPlayList.length != 0 || playclassLsit.length != 0">
        <div >
          <div class="play" style="height: 95px" v-for="(item, index2) of playclassLsit" :key="index2 + 99">
            <div >
              <div class="work">
                <div>
                  应完成 :<span>{{ item.total }}题</span>
                </div>
                <div>
                  实完成: <span>{{ item.finished }}题</span>
                </div>
                <van-tag
                  type="primary"
                  style="color: #fff; position: absolute; top: 0px; right: 0px"
                  size="medium"
                  >{{ item.subject }}</van-tag
                >
              </div>
              <div class="nature">
                <div>实际时长 :</div>
                <div>{{ item.practical }}</div>
              </div>
              <div class="nature">
                <div>评语 :</div>
                <div>{{ item.appraise }}</div>
              </div>
                
          <div class="jiao">
            <van-tag
              type="primary"
              style="color: #fff; position: absolute; bottom: 2px; right: 0px"
              size="large"
              >上课</van-tag
            >
          </div>
            </div>
            <!--  -->
          </div>
        </div>
          <div class="content1" v-for="(item,index6) of doPlayList" :key="index6+23" >
         <div class="text">
           <div class="time">
             课程编号{{ item.courseNumber }}/{{ item.product }}/{{ item.student }}/{{ item.semester }}
           </div>
           <div>
             <span>{{ item.subject }}</span>
           </div>
         </div>
         <div class="txt">{{ item.createTime }}-- 时间段{{ item.timeRange }}</div>
         <div class="user">
           <div>
             <van-icon name="user-o" />
             <span> {{ item.teacher }}</span>
           </div>
         </div>
         <div>
             <img-preview :file="item.file"></img-preview>
         </div>
       </div>
     </div>
        <div v-else>
          <van-empty description="暂无数据" />
        </div>
      </van-tab>
      <!-- 错了什么 -->
      <van-tab title="错了什么">
        <div>
          <div v-if="doPlayList.length != 0">
            <div
              class="course play"
              style="margin-top: 20px; height: 180px"
              v-for="(item, index4) of doPlayList"
              :key="index4 + 600"
            >
              <div>
                课程编号{{ item.courseNumber }}/{{ item.product }}/{{
                  item.student
                }}/{{ item.semester }}
              </div>
              <div>{{ item.createTime }}--{{ item.timeRange }}</div>
              <div>
                <van-tag type="primary" size="medium" style="margin-left: 8px"
                  >受新课</van-tag
                >
                <van-tag
                  type="primary"
                  style="color: #fff; position: absolute; top: 0px; right: 0px"
                  size="medium"
                  >{{ item.subject }}</van-tag
                >
              </div>
              <img-preview :file="item.appraiseFileId"></img-preview>
            </div>
          </div>
          <div v-if="errList.length != 0">
            <div
              class="play"
              style="
                height: 150px;
                display: flex;
                margin: 20px 0px;
                justify-content: space-around;
              "
              v-for="(item, index5) of errList"
              :key="index5 + 800"
            >
              <img-preview :file="item.fileId"></img-preview>
              <div>
                <div class="class">
                  学期段:
                  <span>{{ item.semester }}</span>
                </div>
                <div class="class">
                  章节:
                  <span>{{ item.chapter }}</span>
                </div>
                <div class="class">
                  备注:
                  <span>{{ item.remarks }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="errList.length == 0 && doPlayList.length == 0">
            <van-empty description="暂无数据!" />
          </div>
        </div>
      </van-tab>
      <!-- <van-tab title="解决建议">
        <div class="tableClass1" style="display: flex">
          <div>科目</div>
          <div>章节</div>
          <div>问题类别</div>
          <div>处理建议</div>
        </div>

        <div class="tableClass" style="display: flex">
          <div>数学</div>
          <div>三角函数...asdasdasd</div>
          <div>知识理解</div>
          <div>上课</div>
        </div>
      </van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import imgPreview from "../../views/util/imgPreview";
export default {
  components: { imgPreview },
  data() {
    return {
      minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
      date: "",
      showDate: false,
      active: 0,
      subject: "", //章节
      point: "", //知识点
      workContent: "", //作业内容
      remark: "", //备注
      //应该做什么
      playhomeList: [], // 铭师作业
      playclassLsit: [], //学生作业
      //  做什么
      doPlayList: [],
      errList: [],
    };
  },
  methods: {
    formatDate(date) {
       const moment =require("moment")
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.playclassLsit = [];
      this.playhomeList = [];
      this.errList = [];
      if (this.active == 0) {
        this.classwork();
        this.homework();
      } else if (this.active == 1) {
        this.doPlay();
        this.homework();

        // console.log(1111);
      } else if (this.active == 2) {
        this.doPlay();
        this.err();
      }
    },
    //应该做什么的铭师作业
    classwork() {
      let data = {
        token:this.getLocalStorage("token"),
        createTime: this.date,
        pageNo: "1",
        pageSize: "5",
      };
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      this.axios.post("vx/classwork/queryMyClasswork", data).then((res) => {
        // console.log(res);
        if (res.data.success) {
          for (let item of res.data.result.records) {
            this.playhomeList.push(item);
          }
          this.$toast.clear();
        }

        // console.log(this.playhomeList);
      });
    },
    //应该做什么的 学校作业
    homework() {
      let data = {
        token:this.getLocalStorage("token"),
        createTime: this.date,
        pageNo: "1",
        pageSize: "5",
      };
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      //  学校作业
      this.axios.post("vx/homework/queryMyHomework", data).then((res) => {
        if (res.data.success) {
          for (let item of res.data.result.records) {
            this.playclassLsit.push(item);
          }
          this.$toast.clear();
        } else {
          this.$toast("查询失败");
          this.$toast.clear();
        }
        // console.log(this.playclassLsit);
      });
    },
    //应该做什么
    doPlay() {
      let data = {
        token:this.getLocalStorage("token"),
        createTime: this.date,
        pageNo: "1",
        pageSize: "5",
      };
      this.$toast.loading({
        message: "加载中...",
        // forbidClick: true,
        duration: 0,
        closeOnClick: true,
      });
      this.axios
        .post("vx/classworkFinished/queryClassworkFinished", data)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.doPlayList = res.data.result.records;
            this.$toast.clear();
          }
        });
    },
    //   错题登记请求
    err() {
      let data = {
        token:this.getLocalStorage("token"),
        createTime: this.date,
        pageNo: "1",
        pageSize: "5",
      };
      this.$toast.loading({
        message: "加载中...",
        // forbidClick: true,
        duration: 0,
        closeOnClick: true,
      });
      this.axios.post("vx/difficultyAndError/list", data).then((res) => {
        if (res.data.success) {
          for (let item of res.data.result.records) {
            this.errList.push(item);
          }
          this.$toast.clear();
        } else {
          this.$toast("查询失败");
          this.$toast.clear();
        }
      });
    },
  },
  mounted() {
    this.date = this.$store.state.date;
    this.classwork();
    this.homework();
    this.doPlay();
    this.err();
    console.log(this.playclassLsit);
  },
};
</script>
<style scoped>
.total {
  display: flex;
  margin: 8px 17px;
}
.total > div {
  width: 80px;
  color: #999;
  font-size: 14px;
}
.total > div > span {
  color: #1b8fffff;
  font-size: 13px;
}

.tableClass {
  display: flex;
  justify-content: space-around;
  background-color: #f2f2f2ff;
}
.tableClass1 {
  display: flex;
  justify-content: space-around;
  background-color: #d8d8d8ff;
}
.tableClass div {
  width: 80px;
  text-align: center;
  color: #999;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.class {
  margin: 6px 0px;
  color: #b8b8b8ff;
  font-size: 14px;
}
.class > span {
  color: #1b8fffff;
  font-size: 13px;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.course div {
  font-size: 14px;
  color: #666;
  margin-left: 18px;
  margin-top: 10px;
}
.nature {
  margin-top: 12px;
  display: flex;
}
.nature div:nth-child(1) {
  width: 100px;
  color: rgb(184, 177, 177);
  font-size: 14px;
  padding-left: 18px;
}
.nature div:nth-child(2) {
  color: #1b8fffff;
  font-size: 13px;
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play {
  position: relative;
  height: 300px;
  border-radius: 10px;
  box-shadow: 1px 1px 4px #999;

  margin: 10px 10px;
}
.content1{
    margin-top: 20px;
    background-color: #fff;
    height: 181px;
    border-radius: 14px;
    box-shadow: 1px 1px 4px #999;
    margin: 10px 10px;
}
.work {
  display: flex;
  position: relative;
}
.work > div {
  font-size: 14px;
  color: #b8b8b8ff;
  text-align: center;
  padding-left: 18px;
}
.work span {
  color: #1b8fffff;
  font-size: 13px;
}
</style>
<style >
.van-cell {
  padding: 6px 16px;
}
</style>