<template>
     <div>
         <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
        />
             <van-field
                    v-model="phone"
                    @blur="checkPhone()"
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="name"
                    type="neme"
                    label="姓名"
                    placeholder="请输入姓名"
                />  
                <van-field
              v-model="sms"
              center
              clearable
              disabled
              label="短信验证码"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button size="small" disabled type="primary">发送验证码</van-button>
              </template>
            </van-field>
                  <div style="margin: 16px;">
                    <van-button round block type="info" @click="login">
                     注册
                    </van-button>
                </div>
          
     </div>
</template>
<script>
export default {
    data(){
        return{
            sms:"",
            phone:"",
            name:""
        }
    },
   
    methods:{
        checkPhone(){
                 var reg= /^1[3456789]\d{9}$/ 
                var phone =this.phone ;
                 if(reg.test(phone)){
                    return true
                }else{
                    this.$toast("请输入正确的手机号格式")
                    return false
                }
        },
        login(){
            console.log(this.phone,this.name);
            if(this.phone!="" && this.name!="" && this.checkPhone()==true ){
                 console.log(111);
                var data= { phone: this.phone , realName:this.name}
                   this.axios.post("/sys/user/register",data).then((res)=>{
                                console.log(res);
                          if(res.data.code==200){
                                let  data1 =   {mobile:this.phone,type:"vx"}
                               this.axios.post("sys/phoneLogin",data1).then(res=>{
                                   console.log(res);
                                     let token = res.data.result.token
                                    // console.log(token);
                                        this.$toast("注册成功")
                                        this.$router.push("/login")
                                })
                          }else{
                               this.$toast("注册失败 ")
                          }
                   })
            }else{
                
            }
        }
    }
    
}
</script>
<style scoped>

</style>