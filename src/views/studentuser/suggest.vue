<template>
  <div>
    <van-nav-bar title="建议" left-arrow @click-left="$router.go('-1')" />
    <div>
      <!-- 建议对象-->
      <div>
        <mt-cell title="建议对象" is-link>
          <img
            slot="icon"
            src="../../assets/student/建议事由.png"
            width="20"
            height="20"
          />
          <van-field
            style="padding: 10px 6px"
            v-model="complaintUser"
            placeholder="请输入建议对象"
            input-align="right"
          />
        </mt-cell>
      </div>
      <!-- 建议事由-->
      <div >
        <mt-cell title="建议事由" >
          <img
            slot="icon"
            src="../../assets/student/建议对象.png"
            width="20"
            height="20"
          />
        </mt-cell>
        <van-field
          v-model="suggestReason "
          rows="1"
          label="建议事由"
          type="textarea"
          placeholder="请输入建议事由"
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
      suggestReason:"" ,//投诉理由
      remark: "" //备注
    }
  },
  methods:{
      save(){
        if (this.complaintUser == "" || this.suggestReason==""){
          this.$toast("以上内容不能为空");
          return ;
        }
        let data = {
          token:this.getLocalStorage("token"),
          object:this.complaintUser,
          reason:this.suggestReason,
          remarks:this.remark,
          type:1//0投诉1建议
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
