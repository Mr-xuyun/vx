<template>
  <div>
    <van-nav-bar
      title="审核评价"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active" swipeable color="#1B8FFF">
      <van-tab title="待审核列表">
        <div   v-if="auditContent.length!=0">
        <div
          class="content"
        
          v-for="(item, i) of auditContent"
          :key="i"
          @click="correct(item.id)"
        >
          <div class="text">
            <div class="time">
              {{ item.receiver }}--{{ item.modifyTime }} 截止
            </div>
            <div style="text-align: right">
              <span>待审核</span>
              <button class="miniBtn">{{ num + (i + 1) }}</button>
            </div>
          </div>
          <div class="txt">{{ item.content }}</div>
          <div class="user">
            <div>
              <van-icon name="user-o" />
              <span> {{ item.receiver }}</span>
            </div>
            <div><img src="../assets/联合.png" /></div>
          </div>
        </div>

     </div>
         <div style="text-align:center; margin-top:100px; " v-else  > 
             <img src="../assets/job/空白.png" width="100" height="100s">
             <div style="color:#666;font-size:15px;">暂无任务</div>
        </div>
      </van-tab>
      <van-tab title="已审核通过">
       <div v-if=" checked.length!=0"> 
        <div class="content" v-for="(item, i) of checked" :key="i">
          <div class="text">
            <div class="time">
              {{ item.receiver }}--{{ item.modifyTime }} 截止
            </div>
            <div style="text-align: right">
              <span style="color: #279227">审核通过</span>
              <button class="miniBtn" style="background-color: #9cda9c">
                {{ num + (i + 1) }}
              </button>
            </div>
          </div>
          <div class="txt">{{ item.content }}</div>
          <div class="user">
            <div>
              <van-icon name="user-o" />
              <span> {{ item.receiver }}</span>
            </div>
            <div><img src="../assets/联合.png" /></div>
          </div>
        </div>
       </div>
          <div style="text-align:center; margin-top:100px; " v-else  > 
             <img src="../assets/job/空白.png" width="100" height="100s">
             <div style="color:#666;font-size:15px;">暂无任务</div>
        </div>
      </van-tab>
      <!-- 审核未通过 -->
      <van-tab title="审核未通过">
      <div v-if="notPass.length!=0">
        <div class="content" v-for="(item, i) of notPass" :key="i">
          <div class="text">
            <div class="time">
              {{ item.receiver }}--{{ item.modifyTime }} 截止
            </div>
            <div style="text-align: right">
              <span style="color: red; font-size: 14px">审核未通过</span>
              <button class="miniBtn" style="background-color: red">
                {{ num + (i + 1) }}
              </button>
            </div>
          </div>
          <div class="txt">{{ item.content }}</div>
          <div class="user">
            <div>
              <van-icon name="user-o" />
              <span> {{ item.receiver }}</span>
            </div>
            <div><img src="../assets/联合.png" /></div>
          </div>
        </div>
      </div>
        <div style="text-align:center; margin-top:100px; " v-else  > 
             <img src="../assets/job/空白.png" width="100" height="100s">
             <div style="color:#666;font-size:15px;">暂无任务</div>
        </div>
      </van-tab>
    </van-tabs>
    <van-popup round v-model="show" position="bottom">
      <van-cell-group>
        <van-field
          v-model="comment"
          :required="true"
          rows="2"
          autosize
          label="评价"
          type="textarea"
          maxlength="100"
          placeholder="请输入评价"
          show-word-limit
        />
        <van-button type="primary" @click="passed" round size="large"
          >审核通过</van-button
        >
        <van-button type="danger" round @click="failed" size="large"
          >审核不通过</van-button
        >
        <van-button size="large" round @click="show = false">取消</van-button>
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auditContent: [],
      checked: [], //已审核
      notPass: [], //未通过的
      num: "011",
      active: 0,
      show: false,
      comment: "", //评价
      actions: [
        { name: "通过", color: "#1B8FFF" },
        { name: "未通过", color: "#FF2424" },
      ],
      id: "", //待审核id
    };
  },
  methods: {
    //审核通过
    passed() {
      let data = {
        token:this.getLocalStorage("token"),
        status: 4,
        idList: [this.id],
        comment: this.comment,
      };
      this.axios.post("vx/task/changeTaskStatus", data).then((res) => {
        this.$toast("审核通过");
        this.show = true;
      });
    },
    //审核不通过
    failed() {
      let data = {
        token:this.getLocalStorage("token"),
        status: 5,
        idList: [this.id],
        comment: this.comment,
      };
      this.axios.post("vx/task/changeTaskStatus", data).then((res) => {
        this.$toast("审核未通过");
        this.show = true;
      });
    },

    onClickLeft() {
      this.$router.go("-1");
    },
    correct(id) {
      this.show = true;
      this.id = id;
    },
  },

  mounted() {
    var data = {
      token:this.getLocalStorage("token"),
      status: "3",
      admin: true,
      pageNo: 1,
      pageSize: 5,
    };
    // console.log(data);
    this.axios.post("vx/task/getAllMyTask", data).then((res) => {
      //console.log(res);
      var dataArr = res.data.result.records;
      const moment = require("moment");
      for (var item of dataArr) {
        item.modifyTime = moment(item.modifyTime).format("MM月DD日 HH:mm");
        this.auditContent.push(item);
      }
      //console.log(this.auditContent);
    });
    //  已审核
    var dataChecked = {
      token:this.getLocalStorage("token"),
      status: "4",
      admin: true,
      pageNo: 1,
      pageSize: 5,
    };
    // console.log(data);
    this.axios.post("vx/task/getAllMyTask", dataChecked).then((res) => {
      // console.log(res);
      let dataArr = res.data.result.records;
      for (var item of dataArr) {
        this.checked.push(item);
      }
      // console.log(this.checked);
    });
    //  未审核通过
    var notPass = {
      token:this.getLocalStorage("token"),
      status: "5",
      admin: true,
      pageNo: 1,
      pageSize: 5,
    };
    // console.log(notPass);
    this.axios.post("vx/task/getAllMyTask", notPass).then((res) => {
      // console.log(res);
      let notPassArr = res.data.result.records;
      for (var item of notPassArr) {
        this.notPass.push(item);
      }
      // console.log(this.notPass);
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
  padding: 0px 8px;
  justify-content: space-between;
}
.text div:nth-child(2) {
}
/* 标题 */
.text .time {
  font-size: 14px;
  font-weight: bold;
}
.text span {
  /* #1B8FFF #279227  9cda9c*/
  color: #1b8fff;
}
.miniBtn {
  background-color: #1b8fff;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 2px 3px #999;
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
  padding: 8px 3px;
  justify-content: space-between;
}
.user img {
  width: 20px;
  height: 20px;
}
</style>
