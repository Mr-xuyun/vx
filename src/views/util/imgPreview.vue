<template>
  <div>
    <div class="taskImg">
      <span v-for="(index,i) of file.split(',')" :key="i+88">
        <img v-if="imgType.indexOf(index.substr(index.lastIndexOf('.')))!=-1" :src="imgURL+index" @click="preview(index)">
          <span style="position: relative;" v-else-if="'.docx,.doc'.indexOf(index.substr(index.lastIndexOf('.')))!=-1" @click="download(index)">
            <img class="min" src="../../assets/doc.png">
            <span class="img-desc">{{ index }}</span>
          </span>
          <span style="position: relative;" v-else-if="'.pdf'==index.substr(index.lastIndexOf('.'))" @click="download(index)">
            <img class="min" src="../../assets/PDF.png">
            <span class="img-desc">{{ index }}</span>
          </span>
          <span style="position: relative;" v-else-if="'.xls,.xlsx'==index.substr(index.lastIndexOf('.'))" @click="download(index)">
            <img  src="../../assets/xls.png">
            <span class="img-desc">{{ index }}</span>
          </span>
      </span>
    </div>
  </div>
</template>
<script>
import {Dialog} from 'vant';
import { ImagePreview } from 'vant';
export default {
  props: ["file"],
  data() {
    return {
       imgType: ['.jpeg', '.jpg', '.png', '.gif'],
      // imgURL: "http://192.168.0.119:80/msdj/sys/common/static/",
      imgURL: this.$store.state.imgURL
    }
  },
  methods: {
    download(file){
      Dialog.confirm({
      message: '确认下载['+file+']吗？',
      confirmButtonColor: "#0B8FFF"
      }).then(() => {
        location.href=this.imgURL+file;
      })
    },
    preview(file){
      ImagePreview([this.imgURL+file]);
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
/* 任务的图片 */
.taskImg {
  display: flex;

}

.taskImg img {
  width: 70px;
  height: 70px;
  margin: 10px 10px;
}

.img-desc {
  margin: 0;
  left: 9px;
  right: 0px;
  top: -9px;
  bottom: 0px;
  width: 70px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  font-size: 12px;
}
</style>
