<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="疑难错题查看表"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
      <template #right> </template>
    </van-nav-bar>
    <!-- 日期 -->
    <div @click="showDate = true">
      <mt-cell title="筛选日期" is-link>
        <img
          slot="icon"
          src="../../assets/job/日期.png"
          width="20"
          height="20"
        />
        {{ date }}
      </mt-cell>
    </div>
    <van-calendar
      v-model="showDate"
      @confirm="onConfirmDate"
      color="#1B8FFFFF"
    />

    <!-- 错题查看表 -->
    <van-tabs v-model="active" color="#1B8FFFFF" swipeable>
      <van-tab title="错题查看表">
        <div v-if="errList.length!=0">
        <div
          v-for="(item,i) of errList " :key="i"
          style="
            display: flex;
            justify-content: space-around;
            position: relative;
             border-bottom: 1px solid rgba(112, 112, 112, 0.3);
            margin-top:15px;
          "
        >
          <img-preview :file="item.fileId"></img-preview>
          <div>
            <div class="diffcult">
              <div>
                学期段:
                <span> {{item.semester}} </span>
              </div>
             
            </div>
            <div class="diffcult">
                <div>
                    章节:
                    <span> {{item.chapter}}</span>
                </div>
            </div>
            <!--  -->
             <div class="diffcult">
                <div>
                    备注:
                    <span> {{item.remarks}} </span>
                </div>
            </div>
          </div>
           <div style="position: absolute; top: 0; right: 0">
                <van-tag type="primary">{{item.subject}}</van-tag>
              </div>
        </div>
        </div>
        <div v-else>
            <van-empty description="暂无信息" /> 
        </div>
      </van-tab>
      <van-tab title="疑难查看表">
               <div v-if="diffcultList.length!=0">
        <div
          v-for="(item,i) of diffcultList " :key="i"
          style="
            display: flex;
            justify-content: space-around;
            position: relative;
             border-bottom: 1px solid rgba(112, 112, 112, 0.3);
            margin-top:15px;
          "
        >
          <img-preview :file="item.fileId"></img-preview>
          <div>
            <div class="diffcult">
              <div>
                学期段:
                <span> {{item.semester}} </span>
              </div>
             
            </div>
            <div class="diffcult">
                <div>
                    章节:
                    <span> {{item.chapter}}</span>
                </div>
            </div>
            <!--  -->
             <div class="diffcult">
                <div>
                    备注:
                    <span> {{item.remarks}} </span>
                </div>
            </div>
          </div>
           <div style="position: absolute; top: 0; right: 0">
                <van-tag type="primary">{{item.subject}}</van-tag>
              </div>
        </div>
        </div>
        <div v-else>
            <van-empty description="暂无信息" /> 
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { duration } from 'moment';
import imgPreview from "../../views/util/imgPreview";
const moment = require("moment")
export default {
  components: { imgPreview },
  data() {
    return {
      active: 0,
      showDate: false,
      date:  this.$store.state.date,
      minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
      errList :[],
      diffcultList:[],
    };
  },
  methods: {
    formatDate(date) {
      return  moment(date).format("YYYY-MM-DD")
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
       this.errList=[];
       this.diffcultList=[];
      this.diffcult("1");
       this.diffcult("2")
    },
   // 疑难错题登记请求方法
    diffcult(type){
       let errData ={
          pageSize:"5",
          pageNo:"1",
          createTime: this.date,
          token:this.getLocalStorage("token"),
          type:type
       }
       this.$toast.loading({
           message:"加载中...",
           duration:0,
           closeOnClick : true
       })
         if(type=="2"){
                this.axios.post("vx/difficultyAndError/list",errData).then(res=>{
                  if(res.data.success){
                        for(let item of res.data.result.records){
                         this.diffcultList.push(item)
                      }
                      this.$toast.clear();
                  }else{
                       this.$toast("查询失败")
                  }
                //  console.log(res);
                  
            })
         }else{
                this.axios.post("vx/difficultyAndError/list",errData).then(res=>{
              // console.log(res);
                    for(let item of res.data.result.records){
                        this.errList.push(item)
                    }
              })
          }
      }
  },
  mounted(){
    // 错题登记请求
         this.diffcult("1");
      //疑难登记
         this.diffcult("2")
         console.log(this.errList);
  }
};
</script>
<style  scoped>
.diffcult {
    margin-right:56px ;
    width: 100%;
    margin-top: 8px;
}
.diffcult>div{
    color:#707070FF ;
    font-size: 14px;
    
}
.diffcult span{
    color:#1B8FFFFF ;
    font-size: 13px;
     overflow: hidden;
    text-overflow: ellipsis;
}
</style>