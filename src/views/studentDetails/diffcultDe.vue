<template>
  <div>
    <van-nav-bar
        title="详情"
        left-arrow
        @click-left="$router.go('-1')"
    />
    <div class="myUpload">
      <sidebar>我的上传</sidebar>
      <div>
        <img @click="$router.push('/upload?id='+id+'&tableName='+type)" src="../../assets/student/修改.png" width="18" height="18"/>
      </div>
    </div>
    <!--  我的上传的图片 -->
    <div class="details">
      <van-swipe>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" class="myImg" @click="ImgPreview(index)"/>
        </van-swipe-item>
      </van-swipe>
      <!--    -->
      <div class="title">
        <div>
          <div class="grayFont">2020/09/24 18:36</div>
          <div style="margin-top:5px;">
            <van-tag color="#D1E8FF" text-color="#1B8FFF"
            >{{ list.subject }}
            </van-tag
            >
            <van-tag
                style="margin-left: 5px"
                text-color="#1B8FFF"
                color="#D1E8FF"

            >{{ list.chapter }}
            </van-tag
            >
          </div>
        </div>
        <!-- 已解决和未解决 -->
        <div v-show="type=='difficult_homework' || type=='error_homework' ">
          <div>
            <div name="未解决"   v-if="list.is_done== 0" icon-size="14px">
               <span class="yuan" style="background-color:red;"></span>
              <span style="font-size:11px;color:red; margin-left:5px;">未解决  </span>
            </div>
            <div name="解决" v-else icon-size="14px">
               <span class="yuan" style="background-color:#1B8FFF;"></span>
              <span style="font-size:14px; color:#1B8FFF; margin-left:5px;">解决 </span>
            </div>
          </div>
        </div>
        <!--  已评改和未评改-->
        <div v-show="type=='homework_base' || type=='test_papers'">
          <div>
            <span class="yuan" style="background-color: #1b8fff;"></span>
            <span style="color:#1B8FFF; font-size:13px; margin-left:5px">已评改</span>
          </div>
          <!-- <div>
               <span class="yuan"></span>
               <span style="color:chocolate; font-size:13px;margin-left:5px">未评改</span>
          </div> -->
        </div>

      </div>
      <!-- 错题的详情 -->
      <div style="margin:7px 5px;" v-show="type=='error_homework'">
        <van-tag type="primary" round
        >{{ list.error_type }}
        </van-tag
        >
        <van-tag
            style="margin-left: 5px"
            type="primary"

        >{{ list.error_reason }}
        </van-tag
        >
        <van-tag
            style="margin-left: 5px"
            type="primary"
            v-if="list.is_explain==1"
        >需讲解
        </van-tag
        >
        <van-tag
            style="margin-left: 5px"
            type="primary"
           v-else
        >不需要讲解
        </van-tag
        >
      </div>
      <!-- 作业详情 -->
      <div style="margin:7px 5px;" v-show="type=='homework_base'">
        <van-tag type="primary">
          {{ list.source }}
        </van-tag>
        <van-tag style="margin-left: 5px" type="primary" v-if="list.is_explain==1">
          需讲解
        </van-tag>
        <van-tag style="margin-left: 5px" type="primary" v-else>
          不需讲解
        </van-tag>
      </div>
      <!-- 试卷详情 -->
      <div style="margin:7px 5px;" v-show="type=='test_papers'">
        <van-tag type="primary"
        >{{ list.paper_type }}
        </van-tag
        >
        <van-tag
            style="margin-left: 5px"
            type="primary"

        >{{ list.source }}
        </van-tag
        >
        <div class="test_case">
          <div>
            <div>
              <img src="../../assets/student/得分.png" width="19" height="16">
              <div style="color: #A4A4A4; font-size:10px">得分</div>
            </div>
            <span class="blueColor">{{ list.score }}</span>
            <span class="grayColor">/</span>
            <div>
              <img src="../../assets/student/总分.png" width="19" height="16">
              <div style="color: #A4A4A4; font-size:10px">总分</div>
            </div>
            <span class="blueColor">{{ list.sum }}</span>
          </div>
          <!--  -->
          <div>
            <div>
              <img src="../../assets/student/班级.png" width="19" height="16">
              <div style="color: #A4A4A4; font-size:10px">班级</div>
            </div>
            <span class="blueColor">{{ list.class_place }}</span>
            <span class="grayColor">/</span>
            <div>
              <img src="../../assets/student/年级.png" width="19" height="16">
              <div style="color: #A4A4A4; font-size:10px">年级</div>
            </div>
            <span class="blueColor">{{ list.grade_place }}</span>
          </div>

        </div>
      </div>
      <!-- 笔记 -->
      <div style="margin:7px 5px;" v-show="type=='take_notes'">
        <van-tag type="primary"
        >{{ list.notes_source }}
        </van-tag
        >
        <van-tag
            style="margin-left: 5px"
            type="primary"

        >{{ list.notes_type }}
        </van-tag
        >
      </div>

      <div>

      </div>
      <!-- 备注 -->
      <div>
        <sidebar> 备注</sidebar>
        <div class="remark">
          {{ list.remarks }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "../../components/sidebar";
import {ImagePreview} from "vant";

export default {
  components: {
    sidebar,
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      radio: "",
      images: [],
      type: this.$route.params.type,  //详情的类型
      id: this.$route.params.id,
      list:{},
    };
  },
  methods: {
    // 图片的预览
    ImgPreview(i) {
      ImagePreview({
        images: this.images,
        startPosition: i,
      });
    },
  },
  mounted() {
    let data = {
      tableName: this.type,
      id: this.id
    }
    this.axios.post("vx/homeworkCart/queryByTableNameAndId", data).then((res) => {
      this.list = res.data.result;
      console.log(this.list)
      console.log(this.list.is_done);
      let file = this.list.file_id.split(",")
      for (const f of file) {
        this.images.push(this.$store.state.imgURL+f)
      }
    })
  }
};
</script>
<style>
.van-nav-bar .van-icon {
  color: #707070;
}

.van-nav-bar__title {
  font-weight: bold;
}
</style>
<style scoped>
/* 试卷得得分情况 */
.test_case {
  display: flex;
  margin: 8px 5px;
}

.test_case > div {
  display: flex;
  align-items: center;

}

.test_case > div:nth-child(2) {
  margin-left: 20px;
}

.test_case > div > div, .test_case > div > span {
  margin: 0px 4px;
}

.blueColor {
  color: #1B8FFF;
}

.grayColor {
  color: #A4A4A4;
  font-size: 18px;
}

.myImg {
  width: 100%;
  height: 170px;
  border-radius: 10px;
  align-items: flex-end;
}

.myUpload {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 8px 0px;
}

.myUpload img {
  padding: 0px 5px;
}

.details {
  margin: 10px 10px;
  box-shadow: 1px 1px 6px #E1E1E1;
  border-radius: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin: 5px 5px;
}

/* 备注 */
.remark {
  background-color: #F2F2F2;
  margin: 5px 13px;

  border-radius: 5px;
  line-height: 30px;
  color: #999;
  font-size: 14px;
}

::v-deep .van-tag {
  line-height: 23px

}


</style>
