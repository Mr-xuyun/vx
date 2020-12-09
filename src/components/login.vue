<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <van-form>
      <van-field
        v-model="username"
        @blur="checkPhone()"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        disabled
      />

      <div style="margin: 16px">
        <van-button round block type="info" @click="login"> 登录 </van-button>
      </div>
      <!-- <div style="margin: 16px">
        <van-button type="default" round block @click="$router.push('/logon')"
          >注册</van-button
        >
      </div> -->
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "123456",
      sms: "",
      // now : new Date().getTime() //当前的毫秒数
    };
  },
  methods: {
    // 验证手机号
    checkPhone() {
      var reg = /^1[3456789]\d{9}$/;
      var username = this.username;
      if (reg.test(username)) {
      } else {
        this.$toast("请输入正确的手机号合适");
      }
    },
    login() {
      let username = this.username;
      let password = this.password;
      if (username !="") {
        let data = { mobile: username, type: "vx", password: password };
           this.$toast.loading({
               message:"登录中..",
               duration:0,
               overlay :true,
               closeOnClickOverlay: true
           })
        this.axios.post("sys/phoneLogin", data).then((res) => {
          if (res.data.code!=500) {
            var token = res.data.result.token;
            this.$store.dispatch('studentIs',token)
            this.axios.post("sys/user/hasPermission", { token: token,
              roles: ["学生"]}).then((res) => {
               // console.log(res);
              if (res.data.result) {
                 this.setLocalStorage("token", token,2592000*1000);
                 this.setLocalStorage("identity", "学生",2592000*1000);
                 this.$toast.clear();
                 this.$router.push("/students");
                 this.$toast("登录成功");
              } else {
                this.axios.post("sys/user/hasPermission",{ token: token,
                  roles: ["老师"]}).then(res=>{
                         if(res.data.result){
                            //将身份存到 localstorage中
                             this.setLocalStorage("identity", "老师",  2592000*1000);
                             this.setLocalStorage("token", token,2592000*1000);
                              this.$router.push("/");
                              this.$toast.clear();
                              this.$toast("登录成功");
                         }else{
                               this.setLocalStorage("identity", "管理员",2592000*1000);
                              this.setLocalStorage("token", token,2592000*1000);
                              this.$router.push("/");
                              this.$toast.clear();
                              this.$toast("登录成功");
                         }
                  })
              
              }
            });
          }else{
              this.$toast.clear();
              this.$toast.fail(res.data.message)
          }
        });
      } else {
        this.$toast("手机号不能为空");
      }
    },
  },
  mounted(){
          
  }
};
</script>
<style scoped>
</style>