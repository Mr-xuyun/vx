<template>
  <div>

    <!--   -->
    <van-nav-bar title=" 成绩库" left-arrow @click-left="$router.go('-1')"/>
        <!-- 科目-->
      <div @click="showSubject = true">
        <mt-cell title="筛选科目查询" is-link>
          <img
              slot="icon"
              src="../../assets/job/科目.png"
              width="20"
              height="20"
          />
          {{ subject }}
        </mt-cell>
      </div>
      <van-popup v-model="showSubject" position="bottom">
        <van-picker
            show-toolbar
            :columns="$store.state.subjectList"
            @confirm="onConfirmSubject"
            @cancel="showSubject = false"
        />
      </van-popup>
      <!--  tag筛选的标签 -->
    <div style="margin: 8px 8px">
      <van-tag
          v-show="subject"
          color="#e1e1e1"
          closeable
          size="large"
          @close="close(subject)"
      >{{ subject }}
      </van-tag
      >
    </div>
    <!-- 成绩库 -->
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="main" :style="{height: '200px'}"></div>

   </div>
</template>
<script>
// import echarts from "echarts";

export default {
  name: "",
  data() {
    return {
      charts: "",
      showDate: false,
      minDate: new Date(2020, 9, 1),
      date: "",
      showSubject:false,
      subject:"",
      
    };
  },
  methods: {
    //日期
    onConfirmDate(date) {
      const moment = require("moment")
      const [start, end] = date;
      this.showDate = false;
      this.date = `${moment(start).format("MM-DD")} - ${moment(end).format("MM-DD")}`;
    },
     // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
     this.getperformance()
    },
     
  //  查询成绩列表
   getperformance(){
       let data = {
        token:this.getLocalStorage("token"),
        pageSize:6,
        pageNo:1,
        subject: this.subject
      }
      this.axios.post("vx/testPapers/statisticAnalysis", data).then((res) => {
      
        let result = res.data.result;
        if(result!=null){
            this.drawLine("main",result.date,result.score)
        }else{
          this.$toast("暂无数据!")
          this.drawLine("main", "","")
        }
      })
   },

    //筛选科目 标签
     close(value) {
      if (this.subject == value) {
        this.subject = "";
        this.getperformance()
      }
    },
    drawLine(id,date,score) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "#FFFFFF",
          formatter: function (params) {
            for (let item in params) {
              let str = "<span style='color: #1B8FFF'>"+params[item].data.text + ":" + params[item].data.value+"分</span></br>";
              if(params[item].data.classPlace != undefined){
                str += "<span style='color: #1B8FFF'>"+ params[item].data.classPlace + "</span></br>";
              }
              if(params[item].data.gradePlace != undefined){
                str += "<span style='color: #1B8FFF'>"+ params[item].data.gradePlace + "</span></br>";
              }
              return str;
            }
          }
        },
        title: {
          left: 'center',
          text: '成绩分析走势图',
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          name: "日期",
           splitNumber: 5, // 设置y轴刻度间隔个数

          data: date,
          axisLine: {
            lineStyle: {
              color: "#C9C9C9",
              
            },
          },
          axisLabel:{
              rotate:60,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          type: "value",
          name:"分数",
          splitNumber: 5, // 设置y轴刻度间隔个数
          axisLine: {
            lineStyle: {
              // 设置y轴颜色
              color: "#C9C9C9",
            },
          },
        },
        series: [
          {
            type: "line",
            data: score,
            symbol: "circle", //设定为实心点
            symbolSize: 6,
            itemStyle: {
              //每个坐标点圆点颜色
              normal: {
                color: "#1B8FFF", //圆点外圈颜色
                lineStyle: {
                  color: "#EEEEEE",
                },
              },
            },
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
          },
          
        ],
        dataZoom:[
          
        ]
      });
    },
  },
  //调用
  mounted() {
    this.$store.dispatch("subjects",{name:"科目"})
    this.$nextTick(function () {
      this.getperformance()
    });
    window.onresize = () => {
      this.charts.resize()
    }
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
