<template>
 <div>
     <!-- 导航栏 -->
    <van-nav-bar
    title="布置作业"
    left-text="返回"
    left-arrow
    @click-left="$router.go('-1')"
    />
    <div v-if="courseList.length!=0">
     <div v-for="(item,i) of courseList" :key="i" >
       <!-- 列表栏 -->
       <div class="content" @click="showOrHide(item.id)" >
         <div class="text">
           <div class="time">
             课程编号{{ item.courseNumber }}/{{ item.product }}/{{ item.student }}/{{ item.semester }}
           </div>
           <div>
             <span>{{ item.subject }}</span>
           </div>
         </div>
         <div class="txt">{{ item.createTime }} {{ item.timeRange }}</div>
         <div class="user">
           <div>
             <van-icon name="user-o" />
             <span> {{ item.teacher }}</span>
           </div>
         </div>
       </div>
       <!-- 展开的内容 -->
       <div style="margin-top:10px;" v-show="item.id==id">
         <van-cell title="作业内容"  title-class="titleLeft" is-link   />
         <van-field
             v-model="content"
             rows="1"
             :required="true"
             autosize
             type="textarea"
         />
         <van-cell title="拍照上传"  title-class="titleLeft"   />
         <van-uploader v-model="fileList" multiple  style="padding: 10px 16px;"/>
         <van-cell title="备注"  title-class="titleLeft" is-link   />
         <van-field
             v-model="remark"
             rows="1"
             autosize
             type="textarea"
             placeholder="请输入备注"
             :required="true"
         />
         <van-cell title="总题数" title-class="titleLeft"/>
         <van-stepper  v-model="total" theme="round" :buttonsize="25" :default-value="30" :min="1" :max="99" :integer="true" />
         <van-button :disabled="btn" @click="submit(item.id)" type="info" round block style="margin-top:16px;">提交</van-button>
       </div>
     </div>
     </div>
     <div style="text-align:center; margin-top:100px; " v-else  > 
             <img src="../assets/job/空白.png" width="100" height="100s">
             <div style="color:#666;font-size:15px;">暂无任务</div>
      </div>
 </div>
</template>
<script>
export default {
  data(){
    return{
      content:"",//作业评改的内容
      fileList:[],  //文件上传
      remark:"" ,//备注的文本内容
      courseList : [],//课程列表
      show: false,
      id :"-1",
      total:0,
      btn:false,
    }},
  methods:{
    showOrHide(id){
      if(this.id ==id){
        this.id = '-1';
      }else {
        this.id = id;
      }
    },
    submit(id){
      this.btn = true;
      let file = new FormData();
      for(let fileObj of this.fileList){
        file.append("file",fileObj.file)
      }
      this.axios.post("sys/common/uploadBatch",file).then(res=>{
        let data = {
          token:this.getLocalStorage("token"),
          courseId:id,
          content:this.content,
          remarks:this.remark,
          fileId:res.data.message,
          total:this.total
        }
        //获取课程列表
        this.axios.post("vx/classwork/save",data).then((res)=>{
          this.$toast("操作成功");
        })
      })

    },
  },
  mounted() {
    let data={
      token :this.getLocalStorage("token"),
      status : "5"
    }
    //获取课程列表
    this.axios.post("vx/coursePublish/list",data).then((res)=>{
      this.courseList = res.data.result.records;
    })
  }
}
</script>
<style scoped>
.titleLeft{
    font-weight: bold;
    font-size: 15px;
}
</style>
