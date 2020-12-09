<template>
  <div>
    <van-nav-bar title="投诉" left-arrow @click-left="$router.go('-1')" />
    <div>
      <!-- 科目-->
      <div>
        <mt-cell title="投诉对象" is-link>
          <img
            slot="icon"
            src="../../assets/student/投诉对象.png"
            width="20"
            height="20"
          />
          <van-field
            style="padding: 10px 6px"
            v-model="complaintUser"
            placeholder="请输入投诉对象"
            input-align="right"
          />
        </mt-cell>
      </div>
      <!-- 投诉事由-->
      <div >
        <mt-cell title="投诉事由" >
          <img
            slot="icon"
            src="../../assets/student/投诉事由.png"
            width="20"
            height="20"
          />
        </mt-cell>
        <van-field
          v-model="messageReason "
          rows="1"
          label="投诉事由"
          type="textarea"
          placeholder="请输入投诉事由"
          show-word-limit
        />
      </div>
        <!-- 期望结果-->
      <div >
        <mt-cell title="期望结果">
          <img
            slot="icon"
            src="../../assets/student/期望结果.png"
            width="20"
            height="20"
          />
        </mt-cell>
        <van-field
          v-model="messageResult"
          rows="1"
          label="期望结果"
          type="textarea"
          placeholder="请输入期望结果"
          show-word-limit
        />
      </div>
      <sidebar> 备注</sidebar>
       <van-field
          v-model="remark"
          rows="1"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          show-word-limit
        />
    </div>
     <van-button type="info" round block @click="save"> 提交</van-button>
  </div>
</template>
<script>
import Sidebar from '../../components/sidebar.vue';
export default {
    components:{Sidebar},
  data() {
    return {
      complaintUser: "", //投诉对象
      messageReason:"" ,//投诉理由
      messageResult:"" ,//期望的结果
      remark: "" //备注
    }
  },
  methods:{
      save(){
          if (this.complaintUser == "" || this.messageReason=="" || this.messageResult==""){
            this.$toast("以上内容不能为空");
            return ;
          }
          let data = {
            token:this.getLocalStorage("token"),
            object:this.complaintUser,
            reason:this.messageReason,
            expect:this.messageResult,
            remarks:this.remark,
            type:0//0投诉1建议
          }
          this.axios.post("vx/complaintAndSuggest/save", data).then((res)=>{
            if (res.data.success && res.data.result){
              this.$toast(res.data.message);
            }else {
              this.$toast(res.data.message);
            }
          })
      }
  }
};
</script>
<style scoped>
</style>
