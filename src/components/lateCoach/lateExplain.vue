<template>
  <div>
    <van-nav-bar title="情况说明" left-text="返回" left-arrow @click-left="$router.go('-1')">
      <template #right></template>
    </van-nav-bar>
    <div @click="showClass=true">
      <mt-cell title="今日未到学生:" is-link>
        <img slot="icon" src="../../assets/late/学生.png" width="20" height="20"/>
        <span class="student"> {{ student }}</span>
      </mt-cell>
    </div>
    <van-popup v-model="showClass" position="bottom">
      <van-picker
          show-toolbar
          :columns="studentList"
          @confirm="onConfirmClass"
          @cancel="showClass = false"
      />
    </van-popup>
    <div>
      <mt-cell title="情况说明">
        <img slot="icon" src="../../assets/late/出勤类别.png" width="20" height="20"/>
      </mt-cell>
    </div>
    <van-field
        v-model="situation"
        rows="2"
        autosize
        label="情况说明"
        type="textarea"
        maxlength="100"
        placeholder="请输入内容"
        :required = "true"
        show-word-limit
    />
    <van-button style="margin-top:25px;" @click="submit" type="info" round block> 提交</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showClass: false,
      studentList: [],
      student: "",
      id: "",
      situation: ""
    }
  },
  methods: {
    onConfirmClass(value) {
      this.showClass = false;
      this.student = value.text;
      this.id = value.value;
    },
    submit(){
      if (this.situation==""){
        this.$toast("情况说明不能为空!");
      }
      let data = {
        id: this.id,
        status: "4",
        situation:this.situation
      }
      this.axios.post("vx/attendance/saveOrUpdate", data).then((res) => {
        this.$toast("操作成功");
        this.$router.go(0);
      })
    }
  },
  mounted() {
    let now = new Date();
    let dueDate = now.getMonth() + 1 + "-" + now.getDate();
    let data = {
      dueDate: dueDate,
      status: "1",
    }
    this.axios.post("vx/attendance/list", data).then((res) => {
      for (let student of res.data.result) {
        let studentObj = {text: student.student, value: student.id}
        this.studentList.push(studentObj)
      }
    })
     this.student=this.$route.query.studentName
  }
}
</script>
<style scoped>
.parent {
  padding: 15px 10px;
}

.student {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  text-align: right;
}

</style>
