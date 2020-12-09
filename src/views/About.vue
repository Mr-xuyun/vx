<template>
  <div class="about">
    <div>
      <van-nav-bar
        title="发布任务"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <mt-cell title="任务内容" is-link>
      <span>去填写</span>
      <img
        slot="icon"
        src="../assets/rwfb/renwunneirong.png"
        width="24"
        height="24"
      />
    </mt-cell>
    <van-field
      v-model="content"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入任务内容"
      show-word-limit
    />
    <van-uploader
      v-model="fileList"
      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
      multiple
    />
    <van-cell title="任务级别" icon="bookmark-o" is-link>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-rate v-model="level" color="#F8AD18" void-color="#707070" />
      </template>
    </van-cell>
    <!-- icon="underway-o" color="#1B8FFF" -->

    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="执行人"
      placeholder="请选择执行人"
      @click="showPicker1 = true"
    />
    <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm1"
        @cancel="showPicker1 = false"
      />
    </van-popup>

    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div><van-icon name="records" /> 备注</div>
        </template>
        <van-field
          v-model="remakes"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="备注"
          show-word-limit
        />
      </van-collapse-item>
      <van-field
        readonly
        clickable
        name="picker"
        :placeholder="dateNumber"
        label="截止时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          title="选择完整时间"
          @confirm="getTimes"
          @cancel="showPicker = false"
        />
      </van-popup>
    </van-collapse>
    <van-button type="info" block round @click="go" :disabled="btnShow"
      >发布任务</van-button
    >
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      content: "",
      // 上传图片
      fileList: [],
      // 评分的分值
      level: 0,
      show: false,
      //截止的时间
      date: "2020-10-20",
      // 接收人
      value: "",
      //接收人
      columns: [],
      showPicker: false,
      showPicker1: false,
      btnShow: false,
      // 时间
      time: "",
      // 时间戳
      dateNumber: "",
      activeNames: ["1"],
      //备注
      remakes: "",
      currentDate: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
    },

    onConfirm1(value) {
      this.value = value;
      this.showPicker1 = false;
    },
    // 发布任务
    go() {
      // var token = this.getLocalStorage("token");
      var imgFile = new FormData();

      if (this.getLocalStorage("identity") == "管理员") {
        for (var item of this.fileList) {
          imgFile.append("file", item.file);
        }
        if (
          this.fileList.length == 0 ||
          this.content == "" ||
          this.time == "" ||
          this.remakes == "" ||
          this.value == ""
        ) {
          Toast("以上内容都不能为空，才能发布");
        } else {
          //批量上传图片
          this.axios.post("sys/common/uploadBatch", imgFile).then((res) => {
            var imgID = res.data.message;
            var data1 = {
              token: token,
              content: this.content,
              level: this.level,
              endTime: this.dateNumber,
              receiver: this.value,
              remakes: this.remakes,
              executorFileId: imgID,
            };
            this.$toast.loading({
              message: "发布中....",
              duration: 0,
              overlay: true,
              closeOnClickOverlay: true,
            });
            // 发布任务
            this.axios.post("vx/task/save", data1).then((res) => {
              //console.log(res);
              if (res.data.success == false) {
                this.$toast.clear();
                Toast("发布失败");
              } else {
                this.$toast.clear();
                Toast("发布成功");
              }
            });
          });
        }
      }else{
          this.$toast("只有管理员才能发布任务!")
      }
    },
    getTimes(value) {
      var dateTiem = value.getTime();
      let date = new Date(dateTiem);
      let year = date.getFullYear(); //日期
      let data = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate(); //月份
      let day =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let hours =
        date.getHours() >= 10 ? `${date.getHours()}` : "0" + date.getHours();
      let minutes =
        date.getMinutes() >= 10
          ? `${date.getMinutes()}`
          : "0" + date.getMinutes();
      let time = year + "-" + day + "-" + data + " " + hours + ":" + minutes;
      this.time = time;
      this.showPicker = false;
      this.dateNumber = time;
      return dateTiem;
    },
  },
  mounted() {
    console.log();
    var data = {
      roleList: ["老师"],
    };
    // 获取老师的姓名
    this.axios.post("vx/task/getAllReceiver", data).then((res) => {
      var result = res.data.result;
      //console.log(result);
      for (var item of result) {
        this.columns.push(item.realname);
      }
    });
  },
};
</script>
