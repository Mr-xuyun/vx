<template>
<div>
  <!--  v-show="fileType === 'pdf'" -->
  <div class="pdf">
    <pdf :src="src" :page="currentPage" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler"></pdf>
    <p class="arrow">
      <span @click="changePdfPage(0)"  :class="{grey: currentPage==1}">上一页</span>
      <span @click="changePdfPage(1)"  :class="{grey: currentPage==pageCount}">下一页</span>
      {{currentPage}} / {{pageCount}}
    </p>
  </div>
 </div>
</template>
<script>
import pdf from 'vue-pdf';
export default {
  components: {pdf},
  data () {
    return {
      currentPage: 0,
      pageCount: 0,
      fileType: 'pdf',
      src :'http://192.168.0.141:80/msdj/sys/common/static/test.pdf'
    }
  },
  methods: {
      changePdfPage (val) {
        if (val === 0 && this.currentPage > 1) {
            this.currentPage--
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
        }
      },
      loadPdfHandler (e) {
        this.currentPage = 1
      }
    }
  }

</script>

<style scoped>

</style>
