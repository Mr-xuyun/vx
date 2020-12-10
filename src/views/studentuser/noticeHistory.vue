<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="历史记录"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/courseNotice')"
    />
    <div class="difficultList" style="border:none;">
      <div>
        <div>
          <div>
            <van-tag color="#C8E4FF" text-color="#1B8FFF" round size="large"
              >数学
            </van-tag>
          </div>
          <div class="title">方根与根式及根式的化简运算</div>
          <!--  -->
        </div>
        <div>
          <div class="grayFont" style="margin-top: 4px; margin-left:5px;">2020-09-05 14:00-16:00</div>
          <div style="margin-bottom:5px">
            <van-tag style="margin: 0px 5px;" plain color="#1B8FFF" round size="medium"
              >一对一
            </van-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.difficultList>div{
    border: none;
}
</style>
