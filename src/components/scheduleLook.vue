<template>
    <div>
     <van-nav-bar
      title="进度查看"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
<div v-if="lookList.length!=0">
  <div  v-for="(item,i) of lookList" :key="i">
   <div @click="showLook(item)">
   <div class="content"  >
         <div class="text" >
           <div class="time" style="margin-top:10px;    width: 253px;" >
          {{ item.taskNumber }}-{{ item.receiver }}-{{ item.startTime }}截止
           </div>
           <div>
             <span>{{ item.subject }}</span>
           </div>
         </div>
         <div class="txt" style="margin-top:10px;">{{ item.content}} 完成联系家长的续费沟通问题</div>
         <div class="user">
           <div>
             <van-icon name="user-o" />
             <span> {{ item.receiver }}</span>
           </div>
         </div>
       </div>
    </div>
    <div v-show="id==item.id">
    <!--  内容-->
     
     <div class="details"  >{{item.content}}</div>
      <!-- 上传图片和文档 -->
           <img-preview  :file="item.executorFileId"></img-preview>
     <!--  -->
        <div >
            <mt-cell title="任务级别" >
                <img slot="icon" src="../assets/rwfb/renwujibie.png" width="15" height="15" />
                <van-rate v-model="level" color="#F8AD18" void-color="#707070" />
            </mt-cell> 
        </div> 
         <div >
            <mt-cell title="截止时间" >
                <img slot="icon" src="../assets/rwfb/tj.png" width="15" height="15" />
                 <span>{{item.modifyTime}}</span>
            </mt-cell> 
        </div> 
        <div >
            <mt-cell title="执行人" >
                <img slot="icon" src="../assets/rwfb/xuanche.png" width="15" height="15" />
                 <span>已选择“{{item.receiver}}”</span>
            </mt-cell> 
        </div> 
        <div >
            <mt-cell title="备注" >
                <img slot="icon" src="../assets/job/备注.png" width="15" height="15" />
            </mt-cell> 
        </div> 
    <div style="margin-left:16px; color:#666;  ">{{item.remakes}}</div>
    <!-- 附件 -->
    <div  style=" font-weight: 548;
  padding: 10px 10px;">附件</div>
     
  <div v-if="item.extra!=null">
     <img-preview   :file="item.extra"></img-preview>
  </div>
  <div v-else style="font-size:14px; padding:0px 14px; color:#666;">暂无附件</div>
   <van-steps :active="active" active-icon="success" active-color="#38f">
      <van-step>已接收</van-step>
      <van-step>已开始</van-step>
      <van-step>已完成</van-step>
      <van-step>审核通过</van-step>
    </van-steps>
       <!-- 沟通留言 -->
         
              <div style="color:#1B8FFF;   font-weight: bold;text-align: right;" > 沟通留言:</div>
                 
                <div>
                  <div  v-for="(res,i) of saveList" :key="i+55">
                    <div   style="display:flex; justify-content: space-between; " v-if="!res.isSender" >
                      <div></div>
                      <div class="Tuser">
                        <span style="padding:0px 0px; text-align:right; font-weight: bold; color:#999; width:300px; " >{{res.content}}</span>
                        <img src="../assets/tx.jpg" alt="">
                        <div class="teacher">
                          <div>{{res.user}}</div>
                          <div style="font-size:13px;" >管理员</div>
                        </div>
                      </div>
                    </div>
                    <!-- 老师的评论内容 -->
                    <div style="display:flex; justify-content: space-between;" v-else >
                      <div class="Tuser">
                        <img src="../assets/tx.jpg" alt="">
                        <div class="teacher">
                          <div style="width:36px;">{{res.user}}</div>
                          <div style="font-size:14px;">老师</div>
                        </div>
                        <span style="padding:0px 0px; font-weight: bold; color:#999; width:300px;" >{{res.content}}</span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              <div style="display:flex ;margin-top:10px;  align-items:center;" >
                  <van-field
                      v-model="message"
                      rows="1"
                      autosize
                      label="留言回复"
                      type="textarea"
                      placeholder="请输入留言"
                      maxlength="30"
                  />
        <van-button type="info" :disabled="btnShow" @click="send(item.id) ">发送</van-button>
     </div>
    </div>
  </div>
 </div>
    <div style="text-align:center; margin-top:100px; " v-else > 
        <img src="../assets/job/空白.png" width="100" height="100s">
        <div style="color:#666;font-size:15px;">暂无任务</div>
    </div>
</div> 
</template>
<script>
import imgPreview from "../views/util/imgPreview.vue";
import pdfa from "../views/util/pdfPreview.vue";
export default {
    components:{imgPreview,pdfa},
    data(){
        return{
            level:0,// 任务级别
            active:0  ,//进度条
            message:"",  //评论的内容
            lookList:[], //进度查看的列表
            saveList:[],
            id:"-1",
            btnShow:false
            
        }
    },
    methods:{
      showLook(obj){
      
         this.level= parseInt(obj.level)
         this.active =obj.status;
         if(this.id==obj.id){
            this.id ="-1"
         }else{
            this.id=obj.id
         }
           this.axios.post("vx/taskChatRecord/list",{ taskId : this.id,}).then(res=>{
                    this.saveList=res.data.result
           })
           
      },
      send(id){
            let saveData = {
            token:this.getLocalStorage("token"),
             taskId : this.id,
            content : this.message,
            isSender : false //管理官
          }
        
          if(this.message!=""){
              this.axios.post("vx/taskChatRecord/save",saveData).then(res=>{
                  this.$dialog.confirm({
                        title: '确认发送留言吗',
                      })
                        .then(() => {
                           this.$toast("已发送")
                        })
                        .catch(() => {
                          // on cancel
                        });
              })
          }else{
            this.$toast("留言不能为空")
          }
      
      }
    },
    mounted(){
         let data ={
            token:this.getLocalStorage("token"),
            status: "-1",
            admin: true,
            pageNo: "1",
            pageSize: "5"
         }
         this.axios.post("vx/task/getAllMyTask",data).then(res=>{
           console.log(res);
                  var result = res.data.result.records
                   const moment =require('moment')
                  for(var item of result){
                      item.modifyTime =moment(item.modifyTime).format("MM月DD日HH:mm")
                       this.lookList.push(item)
                  }
                 console.log(this.lookList);
         })

    }
    
}
</script>
<style scoped>
/* 遮罩层 */

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
  padding: 0px 0px;
  justify-content: space-between;
}
/* 标题 */
.text .time {
 overflow: hidden;
    width: 250px;
    font-size:15px ;
    text-overflow: ellipsis;
    white-space:nowrap ;
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
  justify-content: space-between;
  font-size: 14px;
  font-weight: Medium;
  padding: 0px 8px;
 
}
/*  */
.user {
  display: flex;
  justify-content: space-between;
}
.user img {
  width: 20px;
  height: 20px;
}
.details{
    color:#666;
    margin:15px 8px;
    border-bottom: 1px solid rgba(0, 0,0, 0.2);
    padding-bottom: 15px;
}
/* 老师 */
.Tuser {
  display: flex;
  align-items: center;
  margin: 10px 10px;
  border-bottom: 1px solid rgba(153, 153, 153, 0.4);
  padding: 10px 0px;

}

.Tuser img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.teacher {
  margin-left: 5px;
}

.teacher div:nth-child(1) {
  color: #000;
  font-weight: bold;
}

.teacher div:nth-child(2) {
  color: #666;
  font-size: 10px;
}

</style>