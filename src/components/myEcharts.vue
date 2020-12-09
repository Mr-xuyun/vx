<template>
  <div>
    <div style="margin:0 auto;">
         <!-- echart表格 使用ref获取dom元素 避免在一个组件中重复使用覆盖的问题-->
      <div ref="myChart" id="chart"></div>
    </div>
   
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  props: ["answers" ,"difficultys"],
 
  data() {
    return {
      
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.Pie();
    });
  },
  methods: {
    // 饼状图
    Pie() {
      let a = 10; //延时次数
      let b = 50; //总次数
      this.charts = echarts.init(this.$refs.myChart);
      this.charts.setOption({
        color: ["#FE5D4DFF", "#52F984FF",],
          graphic: {
          type: "text",
          left: "center",
          top: "40%",
          style: {
            text: "总数为",
            textAlign: "center",
            fill: "#707070FF", //饼状图中间字体颜色
            fontSize: 12,
            fontWeight: 600,
          },
        },
         title: {
          text:   parseInt(this.answers) + parseInt(this.difficultys),
          left: "center",
          top: "50%",
          textStyle: {
            color: "#1B8FFFFF", //百分比颜色
            fontSize: 20,
            align: "center",
          },
        },
       
        legend: {
          orient: "vertical",
          right: 10,
          data: ["解决数", "问题数" ],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
           
            labelLine: {
              show: false,
            },
            data: [
              { value: this.difficultys, name: "问题数" },
              { value: this.answers, name: "解决数" },
            
            ],
          },
        ],
      });
    },
  },
};
</script> 
<style scoped>
div {
  width: 100%;
  height: 200px;
}
/* // color: ["#FE5D4DFF", "#52F984FF",],
     
//         graphic: {
//           type: "text",
//           left: "center",
//           top: "40%",
//           style: {
//             text: "总数为",
//             textAlign: "center",
//             fill: "#707070FF", //饼状图中间字体颜色
//             fontSize: 12,
//             fontWeight: 600,
//           },
//         },
//         title: {
//           text: 36,
//           left: "center",
//           top: "50%",
//           textStyle: {
//             color: "#1B8FFFFF", //百分比颜色
//             fontSize: 20,
//             align: "center",
//           },
//         },
//         //饼状图颜色 */
</style>    
