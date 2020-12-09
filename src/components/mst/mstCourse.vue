<template>
  <div>
    <van-nav-bar
      title="课程通知"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <div class="beconfirmed">
      <div style="margin-left: 10px">
        <span></span>
        待确认
      </div>
      <div @click="$router.push('/mstHistory')">
        历史记录
        <img width="15px" height="12" src="../../assets/right.png" alt="" />
      </div>
    </div>
    <div v-if="courseList != 0">
      <div
        class="content"
        :style="{ border: item.id == id ? borderColor : '' }"
        v-for="(item, i) of courseList"
        :key="i"
       
      >
      <div @click="pitchOn(item)">
        <div class="text">
          <div class="time">
            课程编号{{ item.courseNumber }}/{{ item.product }}/{{
              item.student
            }}/{{ item.semester }}
          </div>
          <div>
            <van-tag type="primary" style="color: #fff">{{
              item.subject
            }}</van-tag>
          </div>
        </div>
        <div class="txt">{{ item.createDate }} 时间段:{{ item.timeRange }}</div>
        <div class="user">
          <div>
            <van-icon name="user-o" />
            <span>
              {{ item.teacher }}
              <van-tag type="primary" style="color: #fff">授新课</van-tag></span
            >
          </div>
          <div class="communication">沟通</div>
        </div>
        </div>
         <van-button
        type="info"
        round
        block
        @click="save(i)"
        class="btn"
        :disabled="btnSave"
        v-show="courseList != 0"
      >
        提交
      </van-button>
      </div>
     
    </div>
    <div v-else>
      <van-empty description="暂无任务" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      borderColor: " 5px solid #63aae575",
      mstCouserList: this.$store.state.mstcourseList,
      courseList: [], //
      id: "-1",
      btnSave: false,
    };
  },
  methods: {
    //选中
    pitchOn(obj) {
      if (obj.id == this.id) {
        this.id = "-1";
      } else {
        this.id = obj.id;
      }
      //  console.log(this.id);
    },
    //提交
    save(index) {
      let data = {
        courseId: this.id,
        token:this.getLocalStorage("token"),
      };
      if (this.id != "-1") {
        this.$toast.loading({
          message: "提交中...",
          duration: 0,
          closeOnClick: true,
        });
        this.axios.post("vx/classworkFinished/update", data).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
             this.courseList.splice(index,1)
            this.$toast.clear();
             this.$toast("提交成功");
          } else {
             this.$toast("提交失败");
              this.$toast.clear();
          }
        });
      } else {
        this.$toast("请选择课程");
      }
    },
  },
  mounted() {
    let data = {
      pageNo: "1",
      pageSize: "5",
      token:this.getLocalStorage("token"),
    };
    // this.$store.dispatch("mstCourses", data);
        this.axios.post("vx/coursePublish/queryStudentConfirm",data).then(res=>{
                for(let item of res.data.result.records){
                        this.courseList.push(item)
                }
                console.log(this.courseList);
        })

  },
};
</script>
<style scoped>
.btn {
  position: absolute;
  bottom: 0px;
}
.communication {
  width: 40px;
  height: 40px;
  color: #fff;
  border-radius: 50%;
  font-size: 10px;
  background-color: #0b8fffff;
  text-align: center;
  line-height: 40px;
  margin-top: -16px;
}

.beconfirmed {
  font-weight: bold;
  font-size: 17px;
  padding: 0px 8px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.beconfirmed > div:nth-child(2) {
  color: #666;
  font-size: 14px;
  opacity: 0.5;
}
.beconfirmed span {
  position: absolute;
  top: 3px;
  left: 9px;
  width: 4px;
  height: 18px;
  background-color: #0b8fffff;
}
</style>