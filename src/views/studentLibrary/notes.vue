<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
        title="笔记库"
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

    <div>
      <!--笔记来源-->
      <div @click="showNotesSource = true">
        <mt-cell title="笔记来源" is-link>
          <img
              slot="icon"
              src="../../assets/student/笔记类型.png"
              width="20"
              height="20"
          />
          {{ notesSource }}
        </mt-cell>
      </div>
      <van-popup v-model="showNotesSource" position="bottom">
        <van-picker
            show-toolbar
            :columns="notesSourceList"
            @confirm="onConfirmNotesSource"
            @cancel="showNotesSource = false"
        />
      </van-popup>
    </div>

    <div>
      <!--笔记类型-->
      <div @click="showNotesType = true">
        <mt-cell title="笔记类型" is-link>
          <img
              slot="icon"
              src="../../assets/student/笔记类型.png"
              width="20"
              height="20"
          />
          {{ notesType }}
        </mt-cell>
      </div>
      <van-popup v-model="showNotesType" position="bottom">
        <van-picker
            show-toolbar
            :columns="notesTypeList"
            @confirm="onConfirmNotesType"
            @cancel="showNotesType = false"
        />
      </van-popup>
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
        <sidebar> 笔记列表</sidebar>
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
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <div class="difficultList" v-for="(item, i) of difficultList" :key="i">
        <div :style="{ borderColor: checkedAll == true ? '#1b8fff80' : '#f2f2f2' }">
          <div @click="$router.push('/studentDetails/'+item.id+'/take_notes')">
            <div>
              <van-tag
                  color="#C8E4FF" text-color="#1B8FFF" round size="large"
              >{{ item.subject }}
              </van-tag>
            </div>
            <div
                class="title">
              {{ item.chapter }}
            </div>
          </div>
          <div>
            <div class="grayFont">{{ item.createTime }}</div>
            <div>
              <van-tag
                  style="margin: 0px 5px"
                  color="#1B8FFF"
                  round
                  size="medium"
                  @click="submit(item.id)"
              >+复习篮
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
    <!--  复习蓝 弹出框 -->
    <van-popup
        v-model="showPopup"
        round
        position="left"
        :style="{ height: '70%', width: '70%', top: '65%' }"
    >
      <van-swipe-cell
          v-for="(item, index) of cartList"
          :key="index"
          style="height: 77px"
      >
        <div class="difficultList">
          <div
              :style="{
              borderColor: checkedAll == true ? '#1b8fff80' : '#f2f2f2',
            }"
          >
            <div>
              <div>
                <van-tag color="#C8E4FF" text-color="#1B8FFF" round size="large"
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
    </van-popup>

    <div style="margin-top: 50px">
      <van-tabbar>
        <van-tabbar-item
            :badge="cartList.length != 0 ? cartList.length : 0"
            @click="showPopup = true"
        >
          <span style="color: #999">复习蓝</span>
          <template #icon="props">
               <span v-show="false">  {{props}}</span>
            <img src="../../assets/student/讲解篮.png"/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item>
          <template #icon="props">
               <span v-show="false">  {{props}}</span>
            <van-button
                @click="join"
                style="height: 34px; width: 268px;"
                type="info"
                round
            >加入复习库
            </van-button>
          </template>
        </van-tabbar-item>
      </van-tabbar>

    </div>
  </div>
</template>
<script>
import {duration} from "moment";
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
      chapter: "", // 章节,
      searchValue: "", // 搜索
      checkedAll: false, //多选
      showPopup: false,
      difficultList: [], //疑难题列表
      cartList: [], //购物车列表
      result: [],
      showNotesSource: false,
      notesSource: "", //笔记来源
      notesSourceList: [], //笔记来源列表
      showNotesType: false,
      notesType: "", //笔记类型
      notesTypeList: [], //笔记类型列表
    };
  },
  methods: {
    //   笔记来源
    onConfirmNotesSource(value) {
      this.notesSource = value;
      this.showNotesSource = false;
      this.getDifficultHomework();
    },
    //  笔记类型
    onConfirmNotesType(value) {
      this.notesType = value;
      this.showNotesType = false;
      this.getDifficultHomework();
    },
    //批量删除
    del() {
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
                  .post("vx/takeNotes/deleteBatch", this.result)
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
        type: 5, //笔记
        typeId: id, //笔记ID
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
        tableName: "take_notes",
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
      this.date = `${moment(start).format("yyyy-MM-DD")} 至 ${moment(end).format("yyyy-MM-DD")}`;
      this.getDifficultHomework();
    },
    //搜索
    onSearch(val) {
      let data = {
        token: this.getLocalStorage("token"),
        others: val,
      };
      this.axios.post("vx/takeNotes/list", data).then((res) => {
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
            type: 5, //笔记
            typeId: item, //笔记ID
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
    getDifficultHomework() {
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
        notesSource: this.notesSource,
        notesType: this.notesType
      };
      this.$toast.loading({
        title: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      this.axios.post("vx/takeNotes/list", data).then((res) => {
        if (res.data.result.records.length != 0) {
          this.difficultList = res.data.result.records;
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.$toast("暂无数据");
          this.difficultList = res.data.result.records;
        }
      });
    },
    reloadAll() {
      this.$toast.loading({
        title: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      this.axios.post("vx/takeNotes/list", {token: this.getLocalStorage("token"),}).then((res) => {
        console.log(res)
        if (res.data.result.records.length != 0) {
          this.difficultList = res.data.result.records;
          this.$toast.clear();
        } else {
          this.$toast.clear();
          this.$toast("暂无数据");
        }
      });
      let query = {
        token: this.getLocalStorage("token"),
        tableName: "take_notes",
        whereTo: 2,
      };
      this.axios.post("vx/homeworkCart/queryListByTableName", query).then((res) => {
        this.cartList = res.data.result;
      });
    },
  },
  created() {
    this.$store.dispatch("subjects", {name: "科目"});
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "笔记来源"}).then((res) => {
      for (let subject of res.data.result) {
        this.notesSourceList.push(subject.title);
      }
    });
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "笔记类型"}).then((res) => {
      for (let subject of res.data.result) {
        this.notesTypeList.push(subject.title);
      }
    });
  },
  mounted() {
    this.reloadAll();
  },
};
</script>
<style scoped>
/* 预约时间 */
.appointment_time {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

/* 答疑方式 */
.tagDiffcult {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

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

.checkbox {
  position: absolute;
  top: -6px;
  left: -7px;
}

/* ::v-deep .van-dropdown-menu__bar {
  border-radius: 8px;
  height: 37px;
} */
</style>
