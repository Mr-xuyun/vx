<template>
  <div>
    <div @click="show = true">
      <mt-cell :title="myTitle" is-link>
        <img slot="icon" :src="require('@/'+icon)"  width="20" height="20"/>
        {{ data.text }}
      </mt-cell>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
          show-toolbar
          :columns="dataList"
          @confirm="onConfirm"
          @cancel="show = false"
          ref="picker"
      />
      <van-search
          v-model="value"
          placeholder="请输入关键词"
          @search="onSearch"
          @input="onSearch"
          @cancel="onCancel"
      >
      </van-search>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    //数据列表
    list: {
      type: Array,
      required:true
    },
    //是否显示弹出层
    popupShow: {
      type: Boolean,
      default: false
    },
    //标题
    myTitle: {
      type: String,
      default: "标题",
    },
    //图片
    icon: {
      type: String,
      default:require("../../assets/course/老师.png")
    }
  },
  data() {
    return {
      data: "",
      show: this.popupShow,
      value: "",
      dataList: this.list,
    }
  },
  methods: {
    onConfirm(value) {
      this.show = false
      this.data = value;
      this.$emit("myOnClick", value)
    },
    onSearch(v) {
      let value = v.trim();
      if (value == '' || value==null){
        this.dataList = this.list;
        return ;
      }
      let temp = [];
      for (let item of this.list) {
        if (item.text.indexOf(value) != -1) {
          temp.push(item);
        }
      }
      if (temp.length != 0){
        this.dataList = [];
        this.dataList = temp;
      }else {
        this.dataList = [];
      }
    },
    onCancel(){
      this.dataList = this.list;
    }
  },
  mounted() {
  }
}
</script>
<style scoped>

</style>
