<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="疑难库"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
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
    </div>
    <div>
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
      <!-- <van-popup v-model="showSubject " position="bottom">
            <van-picker
                show-toolbar
                :columns="subjectList"
                @confirm="onConfirmSubject"
                @cancel="showSubject = false"
            />
            </van-popup>    -->
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
    <!--  滑选是否解决-->
    <div>
      <mt-cell title="滑选是否解决">
        <img
          slot="icon"
          src="../../assets/student/滑选是否解决.png"
          width="20"
          height="20"
        />
        <van-switch
          v-model="checkedSolve"
          size="20"
          @click="vanSwitch"
          active-color="#1B8FFF"
          inactive-color="#E1E1E1"
        />
      </mt-cell>
    </div>
    <!-- 搜索 -->
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </form>
    <!--  tag筛选的标签 -->
    <div style="margin: 8px 8px">
      <van-tag
        v-show="subject"
        style="margin-right: 10px"
        color="#e1e1e1"
        closeable
        size="medium"
        @close="close(subject)"
        >{{ subject }}
      </van-tag>
       <van-tag
        v-show="date"
        style="margin-right: 10px"
        color="#e1e1e1"
        closeable
        size="medium"
        @close="close(date)"
        >{{ date }}
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
      <div style="display: flex">
        <sidebar> 疑难列表</sidebar>
        <van-checkbox
          @click="checkedBox"
          style="margin-top: 14px"
          v-model="checkedAll"
          icon-size="14px"
          shape="square"
          >全选
        </van-checkbox>
      </div>
      <img
        style="margin-top: 10px; margin-right: 10px"
        src="../../assets/student/垃圾桶.png"
        width="20"
        height="20"
        @click="del"
      />
    </div>
    <!-- 疑难列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="difficultList" v-for="(item, i) of difficultList" :key="i">
          <div
            :style="{
              borderColor: checkedAll == true ? '#1b8fff80' : '#f2f2f2',
            }"
          >
            <div
              @click="
                $router.push(
                  '/studentDetails/' + item.id + '/difficult_homework'
                )
              "
            >
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
                <van-tag color="#F61B1B" round size="medium" plain
                  >{{ flagName(item.flag) }}
                </van-tag>
                <van-tag
                  style="margin: 0px 5px"
                  color="#1B8FFF"
                  round
                  size="medium"
                  @click="submit(item.id)"
                  >+讲解篮
                </van-tag>
              </div>
            </div>
            <van-checkbox
              :name="item.id"
              @click="borderBg(i)"
              class="checkbox"
              v-model="item.checked"
              icon-size="14px"
            ></van-checkbox>
          </div>
        </div>
      </van-checkbox-group>
    </van-list>
    <!-- 讲解蓝 弹出框 -->

     <van-popup
      v-model="showPopup"
      round
      position="left"
      :style="{ height: '70%', width: '70%', top: '65%' }"
    >
      <div v-if="cartList.length != 0">
        <van-swipe-cell
          style="height: 77px"
          v-for="(item, index) of cartList"
          :key="index"
        >
          <div class="difficultList">
            <div
              :style="{
                borderColor: checkedAll == true ? '#1b8fff80' : '#f2f2f2',
              }"
            >
              <div>
                <div>
                  <van-tag
                    color="#C8E4FF"
                    text-color="#1B8FFF"
                    round
                    size="large"
                    >{{ item.subject }}
                  </van-tag>
                </div>
                <div class="title" style="width: 57%">
                  {{ item.chapter }}
                </div>
                <!--  -->
              </div>
              <div>
                <div class="grayFont" style="font-size: 12px">
                  {{ item.createTime }}
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              @click="call(item.id, item.typeId)"
              square
              text="删除"
              type="danger"
              class="removeBtn"
            />
          </template>
        </van-swipe-cell>
      </div>
      <div v-else class="empty">
        <div>空空如也~~</div>
      </div>
    </van-popup>

    <div style="margin-top: 50px">
      <van-tabbar>
        <van-tabbar-item
          :badge="cartList.length != 0 ? cartList.length : 0"
          @click="showPopup = true"
        >
          <span style="color: #999">讲解篮</span>
          <template #icon="props">
            <span v-show="false"> {{ props }}</span>
            <img src="../../assets/student/讲解篮.png" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon="props">
            <van-button
              @click="join"
              style="height: 34px; width: 120px"
              plain
              type="info"
              round
              >加入复习库
            </van-button>
            <span v-show="false"> {{ props }}</span>
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          <template #icon="props">
            <span v-show="false"> {{ props }}</span>
            <van-button
              style="margin: 0px 8px; height: 34px; width: 120px"
              type="info"
              round
              @click="showExplain = true"
            >
              求讲解
            </van-button>
          </template>
        </van-tabbar-item>
      </van-tabbar>

      <!--  求讲解的弹出层 -->
      <van-popup
        v-model="showExplain"
        round
        :style="{ width: '70%', height: '55%' }"
        closeable
      >
        <div class="explainPopup">
          <img
            src="../../assets/student/弹框.png"
            style="width: 100%; height: 100px"
            alt=""
          />
          <div>
            <sidebar>答疑方式</sidebar>
            <div class="tagDiffcult">
              <van-tag
                v-for="(res, index) of answeringList1"
                :key="index"
                @click="tagColor1(res)"
                size="large"
                :color="res == answeringType1 ? '#1B8FFFFF' : '#d9d9d9'"
                >{{ res }}
              </van-tag>
            </div>
            <div class="tagDiffcult" v-show="answeringType1 == '线上'">
              <van-tag
                v-for="(res, index) of answeringList2"
                :key="index"
                @click="tagColor2(res)"
                size="large"
                :color="res == answeringType2 ? '#1B8FFFFF' : '#d9d9d9'"
                >{{ res }}
              </van-tag>
            </div>
          </div>
          <!-- 预约时间 -->
          <div>
            <div class="appointment_time" @click="showTime = true">
              <sidebar>选择预约时间</sidebar>
              <img src="../../assets/right.png" width="14" height="14" />
            </div>
            <div class="grayFont" style="margin: 8px 8px">
              {{ appointmentDate }}
            </div>
          </div>
          <van-button
            type="info"
            @click="commit"
            style="height: 30px; bottom: 7px; position: absolute"
            round
            block
          >
            确定提交
          </van-button>
        </div>
      </van-popup>
      <van-popup
        v-model="showTime"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择预约时间"
          :min-date="minDate"
          @confirm="confirmTime"
          @cancel="showTime = false"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import sidebar from "../../components/sidebar";
export default {
  components: { sidebar },
  data() {
    return {
      showSubject: false,
      showDate: false,
      date: "", //日期
      subject: "", //科目
      minDate: new Date(2020, 10, 1),
      chapter: "", // 章节
      checkedSolve: false,
      searchValue: "", // 搜索
      checkedAll: false, //多选
      showPopup: false,
      difficultList: [], //疑难题列表
      cartList: [], //购物车列表
      result: [],
      showExplain: false, //求讲解
      showTime: false,
      currentDate: new Date(),
      appointmentDate: "",
      answeringList1: ["线上", "线下"],
      answeringList2: ["直播", "录播"],
      answeringType1: "", //答疑的方式
      answeringType2: "", //答疑的方式
      loading: false,
      finished: false,
      pageSize: 5,
      pageNo: 1,
    };
  },
  computed: {
    flagName() {
      return function (a) {
        switch (a) {
          case 0:
            return "未讲解";
          case 1:
            return "待讲解";
          case 2:
            return "已讲解";
        }
      };
    },
  },
  methods: {
    //求讲解按钮
    commit() {
      if (this.cartList.length <= 0) {
        this.$toast("答疑栏少于一个");
        return;
      }
      if (this.answeringType1 == "") {
        this.$toast("答疑方式不能为空");
        return;
      }
      if (this.currentDate == "") {
        this.$toast("预约时间不能为空");
        return;
      }
      let answerWay = this.answeringType1;
      if (this.answeringType1 == "线上") {
        if (this.answeringType2 == "") {
          this.$toast("请选择直播或者录播");
          return;
        } else {
          answerWay += "-" + this.answeringType2;
        }
      }
      let data = {
        tableName: "difficult_homework",
        answerWay: answerWay,
        answerTime: this.currentDate,
      };
      this.axios.post("vx/homeworkCart/updateAnswer", data).then((res) => {
        this.$toast(res.data.message);
      });
      this.showExplain = false;
    },
    //批量删除
    del() {
      // if (this.result.length == 0) {
      //   this.$toast("至少选择一个!");
      // } else {
      //   this.axios.post("vx/difficultHomework/deleteBatch", this.result).then((res) => {
      //     let result = res.data;
      //     if (result.success == true && result.result == true) {
      //       this.$toast(result.message);
      //       this.reloadAll();
      //     } else {
      //       this.$toast(result.message);
      //     }
      //   })
      // }
      //
      if (this.result.length == 0) {
        this.$toast("至少选择一个!");
      } else {
        this.$dialog
          .confirm({
            title: " 确认删除吗",
            confirmButtonColor: "#1B8FFF",
          })
          .then(() => {
            this.axios
              .post("vx/difficultHomework/deleteBatch", this.result)
              .then((res) => {
                let result = res.data;
                if (result.success == true && result.result == true) {
                  this.$toast(result.message);
                  this.reloadAll();
                } else {
                  this.$toast(result.message);
                }
              });
          });
      }
    },
    //讲解栏按钮
    submit(id) {
      let data = {
        token: this.getLocalStorage("token"),
        type: 1, //疑难题
        typeId: id, //疑难题ID
        whereTo: 2, //讲解栏
      };
      this.axios.post("vx/homeworkCart/save", data).then((res) => {
        let result = res.data;
        if (result.success == true && result.result == true) {
          this.$toast(result.message);
          this.reloadAll();
        } else {
          this.$toast(result.message);
        }
      });
    },
    //滑动删除
    call(id, typeId) {
      let data = {
        tableName: "difficult_homework",
        ids: id,
        typeIds: typeId,
      };
      this.axios.post("vx/homeworkCart/delete", data).then((res) => {
        let result = res.data;
        if (result.success == true && result.result == true) {
          this.$toast(result.message);
          this.reloadAll();
        } else {
          this.$toast(result.message);
        }
      });
    },
    tagColor1(res) {
      if (this.answeringType1 == res) {
        this.answeringType1 = "";
      } else {
        this.answeringType1 = res;
      }
    },
    tagColor2(res) {
      if (this.answeringType2 == res) {
        this.answeringType2 = "";
      } else {
        this.answeringType2 = res;
      }
    },
    confirmTime(date) {
      const moment = require("moment");
      this.appointmentDate = moment(date).format("YYYY-MM-DD HH:mm");
      this.showTime = false;
    },
    //切换边框的颜色
    borderBg(index) {
      if (
        this.$refs.checkboxGroup.$el.children[index].children[0].style
          .borderColor == "rgb(242, 242, 242)"
      ) {
        this.$refs.checkboxGroup.$el.children[
          index
        ].children[0].style.borderColor = "rgb(27, 143, 255, 0.5)";
      } else {
        this.$refs.checkboxGroup.$el.children[
          index
        ].children[0].style.borderColor = "rgb(242, 242, 242)";
      }
    },
    // 全选
    checkedBox() {
      if (this.checkedAll) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
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
      this.date = `${moment(start).format("yyyy-MM-DD")} 至 ${moment(
        end
      ).format("yyyy-MM-DD")}`;
      this.getDifficultHomework();
    },
    vanSwitch() {
      this.checkedSolve = !this.checkedSolve;
      this.getDifficultHomework();
    },
    //搜索
    onSearch(val) {
      let data = {
        token: this.getLocalStorage("token"),
        others: val,
      };

      this.axios.post("vx/difficultHomework/list", data).then((res) => {
        let result = res.data;
        this.difficultList = result.result.records;
        if (result.success == true) {
          if (this.difficultList.length == 0) {
            this.$toast("暂无数据!");
          } else {
            this.$toast("查询成功!");
          }
        } else {
          this.$toast("查询失败!");
        }
      });
    },
    close(value) {
      if (this.subject == value) {
        this.subject = "";
        this.getDifficultHomework();
      } else if (this.date == value) {
        this.date = "";
        this.getDifficultHomework();
      }
    },
    //加入复习库
    join() {
      if (this.result.length == 0) {
        this.$toast("至少选择一个!");
      } else {
        let list = {
          token: this.getLocalStorage("token"),
          whereTo: 1,
        };
        let array = [];
        for (let item of this.result) {
          let data = {
            token: this.getLocalStorage("token"),
            type: 1, //疑难题
            typeId: item, //疑难题ID
            whereTo: 1, //复习库
          };
          array.push(data);
        }
        list.homeworkCartList = array;
        this.axios.post("vx/homeworkCart/saveBatch", list).then((res) => {
          let result = res.data;
          if (result.success == true && result.result == true) {
            this.$toast(result.message);
          } else {
            this.$toast(result.message);
          }
        });
      }
    },
    // 下拉加载的触发的事件
      onLoad() {
      this.pageNo++;
      let startDate = "";
      let endDate = "";
      if (this.date != "") {
        let arr = this.date.split("至");
        startDate = arr[0].trim();
        endDate = arr[1].trim();
      }
      let data = {
        token: this.getLocalStorage("token"),
        subject: this.subject,
        chapter: this.chapter,
        startDate: startDate,
        endDate: endDate,
        paperType: this.testTypeName,
        source: this.testSourceName,
        pageNo: this.pageNo++,
        pageSize: this.pageSize,
      };
      this.axios.post("vx/testPapers/list", data).then((res) => {
        if (res.data.result.records.length != 0) {
          for (let item of res.data.result.records) {
            this.difficultList.push(item);
          }
          setTimeout(() => {
            this.loading = false;
          }, 700);
        } else {
          this.finished = true;
        }
      });
    },
    getDifficultHomework() {
       this.pageNo = 1;
      this.difficultList = [];
      this.finished = false;
      this.loading = false;

      let startDate = "";
      let endDate = "";
      if (this.date != "") {
        let arr = this.date.split("至");
        startDate = arr[0].trim();
        endDate = arr[1].trim();
      }

      let data = {
        token: this.getLocalStorage("token"),
        subject: this.subject,
        chapter: this.chapter,
        startDate: startDate,
        endDate: endDate,
        isDone: this.checkedSolve,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      console.log(data);
      this.$toast.loading({
        duration: 0,
        closeOnClick: true,
      });
      this.axios.post("vx/difficultHomework/list", data).then((res) => {
        console.log(res);
        if (res.data.success) {
          if (res.data.result.records.length != 0) {
            this.difficultList = res.data.result.records;
            this.$toast.clear();
          } else {
            this.difficultList = res.data.result.records;
            this.$toast.clear();
            this.$toast("暂无数据!");
          }
        } else {
          this.$toast.clear();
          this.$toast("服务器错误");
        }
      });
    },
    //讲解蓝
    carts() {
      let query = {
        token: this.getLocalStorage("token"),
        tableName: "difficult_homework",
        whereTo: 2,
      };
      this.axios
        .post("vx/homeworkCart/queryListByTableName", query)
        .then((res) => {
          console.log(res);
          this.cartList = res.data.result;
        });
    },
    //全部的
    reloadAll() {
      this.$toast.loading({
        duration: 0,
        closeOnClick: true,
      });
      let data = {
        token: this.getLocalStorage("token"),
       pageSize: this.pageSize,
        pageNo: this.pageNo,
      };
      this.axios.post("vx/difficultHomework/list", data).then((res) => {
      
        if (res.data.success) {
          if (res.data.result.records.length != 0) {
            for (let item of res.data.result.records) {
              this.difficultList.push(item);
            }
            this.loading = false;
            this.$toast.clear();
            console.log(222);
          } else {
            this.finished = true;
            this.$toast.clear();
            this.$toast("暂无数据");
          }
        } else {
          this.$toast("服务器错误!!");
        }
      });
      this.carts();
    },
  },
  created() {
    this.$store.dispatch("subjects", { name: "科目" });
  },
  mounted() {
    this.reloadAll();
  },
};
</script>
<style scoped>
.checkbox {
  position: absolute;
  top: -6px;
  left: -7px;
}
</style>
