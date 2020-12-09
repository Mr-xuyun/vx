<template>
  <div>
    <van-nav-bar
        title="课程列表"
        left-text="返回"
        left-arrow
        @click-left="$router.go('-1')"
    />
    <van-tabs v-model="active" swipeable color="#1B8FFF">
     
      <van-tab title="待完成列表">
      <div v-if="couserList.length!=0">
        <div v-for="(item,i) of couserList " :key="i">
          <div class="content" @click="showList(item)">
            <div class="text">
              <div class="time">
                课程编号/{{ item.courseNumber }}/{{ item.product }}/{{ item.student }}/{{ item.semester }}
              </div>
              <div>
                <span>{{ item.subject }}</span>
              </div>
            </div>
            <div class="txt">{{ item.createTime }} 时间段:{{ item.timeRange }}</div>
            <div class="user">
              <div>
                <van-icon name="user-o"/>
                <span> {{ item.teacher }}</span>
              </div>
            </div>
          </div>
          <div v-if="item.id==id">
            <van-button type="info" @click="goClass(item.id)" round block style="margin-top:15px;"
                        :disabled="  item.status>='4' ? true :false">开始上课
            </van-button>
            <div style="font-weight: bold; padding:8px 8px;">拍照上传</div>
            <van-uploader style=" padding:0px 8px;" v-model="fileList" multiple/>
            <div style="font-weight: bold; padding:8px 8px;">课堂内容描述:</div>
            <van-field
                v-model="content"
                rows="2"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入课堂内容"
                show-word-limit
            />
            <div style="font-weight: bold; padding:8px 8px;">进度描述:</div>
            <van-field
                v-model="courseProcess"
                rows="2"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入进度"
                show-word-limit
            />
            <div style="font-weight: bold; padding:8px 8px;">学生态度描述:</div>
            <van-field
                v-model="studentManner"
                rows="2"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入学生态度"
                show-word-limit
            />
            <div style="font-weight: bold; padding:8px 8px;">计划和要求:</div>
            <van-field
                v-model="planAndRequirement"
                rows="2"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入计划和要求"
                show-word-limit
            />
            <van-cell title="任务级别" icon="bookmark-o" is-link>
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <template #right-icon>
                <van-rate v-model="courseEffect" color="#F8AD18" void-color="#707070" />
              </template>
            </van-cell>
            <van-button type="info" :disabled="item.status>=5 ? true :false" round block style="margin-top:15px;"
                        @click="afterClass()">确定下课
            </van-button>
          </div>
        </div>
      </div>
      <div v-else>
          <van-empty description="暂无任务"/>
        </div>
        <!--  -->
      </van-tab>
      <!-- 已完成列表 -->
      <van-tab title="已完成列表">
        <div v-if="doneList.length!=0">
          <div v-for="(res,i) of doneList" :key="i" >
            <div class="content" @click="showDone(res.id)">
              <div class="text">
                <div class="time">
                  课程编号{{ res.course_number }}/{{ res.product }}/{{ res.student }}/{{ res.semester }}
                </div>
                <div>
                  <span>{{ res.subject }}</span>
                </div>
              </div>
              <div class="txt"> {{ res.create_date }} --时间段:{{ res.time_range }}</div>
              <div class="user">
                <div>
                  <van-icon name="user-o"/>
                  <span> {{ res.teacher }}</span>
                </div>
                <div style="color:red"></div>
              </div>
            </div>
            <div v-if="res.id==id">
              <div style="font-weight: bold; padding:8px 8px;">我的上传</div>
              <div>
                <img-preview :file="res.fileId"></img-preview>
              </div>
              <div style="font-weight: bold; padding:8px 8px;">课堂内容描述:</div>
              <van-field
                  v-model="res.content"
                  rows="2"
                  autosize
                  :readonly="true"
                  type="textarea"
                  maxlength="100"
                  show-word-limit
              />
              <div style="font-weight: bold; padding:8px 8px;">进度描述:</div>
              <van-field
                  v-model="res.course_process"
                  rows="2"
                  autosize
                  :readonly="true"
                  type="textarea"
                  maxlength="100"
                  show-word-limit
              />
              <div style="font-weight: bold; padding:8px 8px;">学生态度描述:</div>
              <van-field
                  v-model="res.student_manner"
                  rows="2"
                  autosize
                  type="textarea"
                  :readonly="true"
                  maxlength="100"
                  show-word-limit
              />
              <div style="font-weight: bold; padding:8px 8px;">计划和要求:</div>
              <van-field
                  v-model="res.plan_and_requirement"
                  rows="2"
                  autosize
                  type="textarea"
                  :readonly="true"
                  maxlength="100"
                  show-word-limit
              />
              <van-cell title="课堂吸收效果" icon="bookmark-o" is-link>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                  <van-rate v-model="res.course_effect" :readonly="true" color="#F8AD18" void-color="#707070" />
                </template>
              </van-cell>

            </div>
          </div>
        </div>
        <div v-else>
          <van-empty description="暂无任务"/>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import imgPreview from "../views/util/imgPreview.vue"

export default {
  components: {imgPreview},
  data() {
    return {
      active: 0,
      show: false,
      fileList: [],
      btnshow: false,
      couserList: [],//待完成列表
      doneList: [], //已完成列表
      id: "-1",
      content: "",//课堂内容
      studentManner: "",//学生态度
      courseProcess: "",//进度描述
      planAndRequirement: "",//计划和要求
      courseEffect:0,//课堂吸收效果
    }
  },
  methods: {
    showList(obj) {
      this.message = ""
      this.fileList = []
      if (this.id == obj.id) {
        this.id = "-1"
      } else {
        this.id = obj.id
      }
    },
    showDone(id) {
      if (this.id == id) {
        this.id = "-1"
      } else {
        this.id = id
      }
    },
    // 开始上课
    goClass(id) {
      this.$dialog.confirm({
        title: '确定开始上课吗?',
        confirmButtonColor:"#1989fa",
      })
          .then(() => {
            let data = {
              token:this.getLocalStorage('token'),
              id: this.id,// 课程ID
              type: '已上课'
            }
          
            this.axios.post("vx/coursePublish/beginOrEndClass", data).then(res => {
                 if(res.data.success){
                    this.couserList.forEach((item, i) => {
                          if (item.id == this.id) {
                            this.couserList[i].status = "4"
                          }
                       })
                        this.$toast(res.data.message)
                 }else{
                      this.$toast("操作失败!")
                 }
            })
          })
    },
    //确定下课按钮
    afterClass() {
      if (this.fileList.length != 0 && this.studentManner != "" && this.courseProcess != "" && this.planAndRequirement != ""&& this.content != ""&& this.courseEffect != "") {
        this.$dialog.confirm({
          title: "确定下课吗",
           confirmButtonColor:"#1989fa",
        }).then(() => {
          this.couserList.forEach((item, i) => {
            if (item.id == this.id) {
              this.couserList[i].status = "5"
            }
          })
          let file = new FormData();
          for (var fileObj of this.fileList) {
            file.append("file", fileObj.file)
          }
          this.axios.post("sys/common/uploadBatch", file).then(res => {
            let data = {
              token:this.getLocalStorage('token'),
              id: this.id,// 课程ID
              type: '已下课',
              file: res.data.message,
              studentManner: this.studentManner,
              courseProcess: this.courseProcess,
              planAndRequirement: this.planAndRequirement,
              content:this.content,
              courseEffect:this.courseEffect
            }
            console.log(data)
            this.axios.post("vx/coursePublish/beginOrEndClass", data).then(res => {
              this.couserList.forEach((item, i) => {
                if (item.id == this.id) {
                  this.couserList.splice(i, 1)
                }
              })
              this.$toast(res.data.message)
            })
          })
        })
      } else {
        this.$toast("以上内容不能为空")
      }
    }
  },
  mounted() {
    let data = {token:this.getLocalStorage('token'), status: "4"}
    this.axios.post("vx/coursePublish/list", data).then(res => {
      //console.log(res);
      for (var item of res.data.result.records) {
        this.couserList.push(item)
      }
      //console.log(this.couserList);
    })
    // 已完成列表
    this.axios.post("vx/coursePublish/queryCourseFinishList", {token:this.getLocalStorage('token')}).then(res => {
      // console.log(res);
      for (var item of res.data.result.records) {
        item.course_effect =parseInt( item.course_effect)
        this.doneList.push(item)
      }
      console.log(this.doneList);
    })


  }
}
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

/* 我上传的图片 */
.uploadImg {
  width: 80px;
  height: 80px;
  padding: 8px 8px;
}
</style>
