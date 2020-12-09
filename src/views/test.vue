<template>
    <div style="text-align: center">
         <img src="../assets/微信海报.jpg" class="img">
   <div style="width:300px;margin:0 auto; padding:20px 0;">
     <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61019002001463" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="../assets/备案1.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">陕公网安备 61019002001463号</p ></a>
    </div>
    </div>
    
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
  },
 
}
</script>
<style  lang="less" scoped>
.img{
  width: 100%;
}
.beian{
   display: flex;
   align-items: center;
   justify-content: center;
   a{
     margin:0px 5px ;
     color: #999;
     &:hover{
         border-bottom: 1px solid  #999;
     }
   }
   img{
      margin-top:2px ;
   }
   
}
</style>

