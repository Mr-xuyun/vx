<template>
  <div>
    <!-- 顶部选项卡 -->
    <div class="header">
      <b> 课程通知</b>
      <div @click="$router.push('/noticeHistory')">
        历史记录
        <img
          src="../../assets/right.png"
          style="margin-top: 5px"
          width="12"
          height="12"
        />
      </div>
    </div>
    <!-- 课程通知的内容 -->
    <div class="course">
      <div class="content1">
        <div><strong>三角函数</strong></div>
        <div class="font_color">2020/07/14 15:32 发布</div>
        <div class="table">
          <div>
            <span class="font_gray">产品:</span>
            <span class="font_blue">一对一</span>
          </div>
          <div>
            <span class="font_gray">学生:</span>
            <span class="font_blue">王虎</span>
          </div>
        </div>
        <div class="table">
          <div>
            <span class="font_gray">老师:</span>
            <span class="font_blue">李建</span>
          </div>
          <div>
            <span class="font_gray">科目:</span>
            <span class="font_blue">历史</span>
          </div>
        </div>
        <div>
          <span class="font_gray">上课的时间:</span>
          <span class="font_blue">2020/07/15 15:00-17:30</span>
        </div>
        <van-button
          color="linear-gradient(to bottom, #1B8FFF, #06B2FF)"
          block
          style="border-radius: 10px; height: 35px"
        >
          确认课程
        </van-button>
        <sidebar style="margin-left: -5px">资料</sidebar>
        <div class="data">
          <div>
            <img src="../../assets/DOC图标.svg" />
          </div>
          <div>
            <div class="file">文件名称（1.78M）</div>
            <van-tag plain type="primary">讲义</van-tag>
          </div>
          <div class="upload">
            <van-tag type="primary" size="large">点击下载</van-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "../../components/sidebar";
export default {
  components: { sidebar },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.header {
  background-image: linear-gradient(#1b8fff, #d0e7fe);
  height: 150px;
  border-bottom-right-radius: 187px 12px;
  border-bottom-left-radius: 187px 12px;
  text-align: center;
  position: relative;
  color: #fff;
  b {
    display: inline-block;
    margin-top: 15px;
  }
  div {
    &:nth-child(2) {
      margin-top: 18px;
      position: absolute;
      top: -2px;
      right: 0;
      margin-right: 10px;
      opacity: 0.8;
      font-size: 14px;
    }
  }
}
.course {
  margin: 15px 15px;
  position: relative;
  top: -100px;
}
.content1 {
  box-shadow: 1px 1px 4px #eaeaea;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px 10px;
  div {
    margin-bottom: 6px;
    &:nth-child(1) {
      strong {
        font-size: 18px;
      }
    }
    &:nth-child(5) {
      padding-bottom: 6px;
      border-bottom: 1px dashed #ddd;
    }
  }
}
.table {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ddd;
  div {
    &:nth-child(2) {
      margin-right: 50px;
    }
  }
}
.data {
  margin-top: 15px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #ddd;
  img {
    width: 52px;
    height: 52px;
  }
  div {
    &:nth-child(2) {
      margin-left: 8px;
    }
    div {
      &:nth-child(1) {
        margin-bottom: 10px;
      }
    }
  }
}
.upload {
  position: absolute;
  bottom: 3px;
  right: 0px;
}
.file{
    font-size: 15px;
    width: 215px;
}
.font_color {
  color: #a4a4a4;
  font-size: 14px;
}
.font_gray {
  color: #a4a4a4;
  font-size: 16px;
}
.font_blue {
  color: #1b8fff;
  font-size: 16px;
  margin-left: 10px;
}
</style>
