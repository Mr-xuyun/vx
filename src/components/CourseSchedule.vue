<template>
  <div>
    <van-nav-bar
      title="进度查看"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <div>
      <div v-for="(item, i) of scheduleList" :key="i">
        <div class="content" style="box-shadow: 1px 1px 2px #999" @click="show(item.id)">
          <div class="text">
            <div class="time">
              课程编号{{ item.courseNumber }}/{{ item.product }}/{{
                item.student
              }}/{{ item.semester }}
            </div>
            <div>
              <span>{{ item.subject }}</span>
            </div>
          </div>
          <div class="txt">
            {{ item.createDate }} 时间段:{{ item.timeRange }}
          </div>
          <div class="user">
            <div>
              <van-icon name="user-o" />
              <span> {{ item.teacher }}</span>
            </div>
            <div class="blueFont" v-text="status(item.status)"></div>
          </div>
        </div>
        <div  v-show="item.id==id">
          <van-steps :active="item.status>3 ? 4: item.status" active-icon="success" active-color="#38f">
            <van-step>已排课</van-step>
            <van-step>老师已确认</van-step>
            <van-step>学生已确认</van-step>
            <van-step>已提交教案</van-step>
          </van-steps>
          <van-steps
            :active="condition(item.status)"
            active-icon="success"
            active-color="#38f"
          >
            <van-step>已上课</van-step>
            <van-step>已下课</van-step>
             <van-step>布置作业</van-step>
            <van-step>提交作业</van-step>
            <van-step>评改作业</van-step>
          </van-steps>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active1: 0,
      scheduleList: [], //进度查看列表
      id: "-1",
    };
  },
  computed: {
    condition(){
   return function (state){
      switch (state) {
          case "4":
            return   0 ;
          case "5":
            return  1;
          case "6":
            return  2;
          case "7":
            return  3;
          case "8":
            return   4;
         }
       }
    },
    //状态
    status() {
      return function (status) {
        switch (status) {
          case "0":
            return "已排课";
          case "1":
            return "老师已确认";
          case "2":
            return "学生以确认";
          case "3":
            return "已提交教案";
          case "4":
            return "已上课";
          case "5":
            return "已下课";
          case "6":
            return "已布置作业";
          case "7":
            return "已提交作业";
          case "8":
            return "已评改作业";
        }
      };
    },
  },
  methods: {
    show(id){
        if(this.id==id){
            this.id="-1"
        }else{
          this.id=id
        }
    }
  },
  mounted() {
    let data = {
      token: this.getLocalStorage("token"),
      pageSize: "5",
      pageNo: "1",
    };
    this.axios.post("vx/coursePublish/queryCourseProcess", data).then((res) => {
      console.log(res);
      for (let item of res.data.result.records) {
        this.scheduleList.push(item);
      }
      console.log(this.scheduleList);
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
  padding: 8px 8px;
  justify-content: space-between;
}
/* 标题 */
.text .time {
  font-weight: bold;
}
.text span {
  /* #1B8FFF #279227  9cda9c*/
  color: #1b8fff;
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
  justify-content: space-between;
  padding: 8px 8px;
}
.user img {
  width: 20px;
  height: 20px;
}
</style>