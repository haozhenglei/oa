<template>
  <div class="home">

    <div style="display: flex;width: 100%;margin-bottom: 20px ;justify-content: space-between">
      <div style="width: 50%;height: 400px;background: white;padding: 20px 10px">
        <div style="display: flex;align-items: center;margin-bottom: 20px">
          <img src="../../assets/img/u330.png" alt="" width="35" height="35">
          <h2 style="font-weight: bold;font-size: 26px;margin-left: 8px">平台重要数据统计</h2>
        </div>
        <p style="text-align: center">当前时间:{{time}}</p>
        <div style="display:flex;">
        <div style="flex: 1;text-align: center;padding: 20px 0;color: #ef9337">
          <p style="font-size:60px;margin-bottom: 5px;font-weight: bold">{{tableData.confirmedUserCount}}</p>
          <p style="font-size: 18px">确诊申报数</p>
        </div>
        <div style="flex: 1;text-align: center;padding: 20px 0;color: #fb2817">
          <p style="font-size:60px;margin-bottom: 5px;font-weight: bold">{{tableData.suspectedUserCount}}</p>
          <p style="font-size: 18px">疑似申报数</p>
        </div>
        <div style="flex: 1;text-align: center;padding: 20px 0;color: #02a7f0">
          <p style="font-size:60px;margin-bottom: 5px;font-weight: bold">{{tableData.appUerCount}}</p>
          <p style="font-size: 18px">APP用户</p>
        </div>
      </div>
        <div style="display:flex;">
          <div style="flex: 1;text-align: center;padding: 20px 0;color: #fb2817">
            <p style="font-size:60px;margin-bottom: 5px;font-weight: bold">{{tableData.intersectionsCount}}</p>
            <p style="font-size: 18px">发现交集点</p>
          </div>
          <div style="flex: 1;text-align: center;padding: 20px 0;color: #2aa515">
            <p style="font-size:60px;margin-bottom: 5px;font-weight: bold">{{tableData.noDealsectionsCount}}</p>
            <p style="font-size: 18px">待处理交集点</p>
          </div>
          <div style="flex: 1;text-align: center;padding: 20px 0;color: #515151">
            <p style="font-size:60px;margin-bottom: 5px;font-weight: bold">{{tableData.unDealUserCounts}}</p>
            <p style="font-size: 18px">待处理交集人</p>
          </div>
        </div>

      </div>
      <div style="width: 47%;height: 400px;background: white;padding: 20px 10px;">
        <div style="display: flex;align-items: center">
          <img src="../../assets/img/u330.png" alt="" width="35" height="35">
          <h2 style="font-weight: bold;font-size: 26px;margin-left: 8px">平台用户有无交集对比饼图</h2>
        </div>
        <div id="myChart" style="width: 90%;height: 340px;margin: auto"></div>
      </div>
    </div>

    <div style="width: 100%;height: 400px;background: white;padding: 20px 10px;box-sizing: border-box;margin: 20px 0">
      <div style="display: flex;align-items: center;margin-bottom: 20px;">
        <img src="../../assets/img/u330.png" alt="" width="35" height="35">
        <h2 style="font-weight: bold;font-size: 26px;margin-left: 8px;flex-grow: 1">平台近7天发现交集点数据走势图</h2>
      </div>
      <div id="myChart2" style="width: 90%;height: 350px;margin: auto"></div>

    </div>

  </div>
</template>

<script>

  import publicServer from '../../api/public'
  export default {
    name: "home",

    data() {
      return {
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.month2;
            if (beginDateVal) {
              return time.getTime() > Date.now() || time.getTime() > new Date(beginDateVal).getTime() || time.getTime() < new Date(beginDateVal).getTime() - 365 * 24 * 60 * 60 * 1000;
            }else{
              return time.getTime() > Date.now()
            }

          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.month;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime() || time.getTime() > new Date(beginDateVal).getTime() + 365 * 24 * 60 * 60 * 1000 || time.getTime() > Date.now();
            }else{
              return time.getTime() > Date.now()
            }
          }
        },
        pickerBeginDateBefore2:{
          disabledDate: (time) => {
            let beginDateVal = this.month4;
            if (beginDateVal) {
              return time.getTime() > Date.now() || time.getTime() > new Date(beginDateVal).getTime() || time.getTime() < new Date(beginDateVal).getTime() - 365 * 24 * 60 * 60 * 1000;
            }else{
              return time.getTime() > Date.now()
            }

          }
        },
        pickerBeginDateAfter2: {
          disabledDate: (time) => {
            let beginDateVal = this.month3;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime() || time.getTime() > new Date(beginDateVal).getTime() + 365 * 24 * 60 * 60 * 1000 || time.getTime() > Date.now();
            }else{
              return time.getTime() > Date.now()
            }
          }
        },
        tableData: {},
        imgList:[{imgBack:require('@/assets/img/n456.png'),imgIcon:require('@/assets/img/u292.png'),name:'商户入驻',total:'',today:''},
          {imgBack:require('@/assets/img/u379.png'),imgIcon:require('@/assets/img/u389.png'),name:'注册用户',total:'',today:''},
          {imgBack:require('@/assets/img/u474.png'),imgIcon:require('@/assets/img/u476.png'),name:'成交买家',total:'',today:''},
          {imgBack:require('@/assets/img/u298.png'),imgIcon:require('@/assets/img/u300.png'),name:'订单数',total:'',today:''},
          {imgBack:require('@/assets/img/u311.png'),imgIcon:require('@/assets/img/u313.png'),name:'交易量',total:'',today:''},
        ],
        myChart: {},type:4,month:'',month2:'',month3:'',month4:'',willList:[],type2:4,endTime2:true,endTime:true,
        time:''
      }
    },

    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '首页', path: '', params: null}
      ]);
    },
    mounted(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      this.time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
      this.loadList();
      // this.saleTop();
      //响应式echarts
      let echarts = this.drawLine();
      this.myChart = echarts.myChart;
      this.myChart2 = echarts.myChart2;
      window.onresize = () => {
        // 这里使用箭头函数，避免this指向问题
        this.myChart.resize();
        this.myChart2.resize();
      };

    },
    methods:{
      cellStyle(data) {
        if (data.columnIndex === 0 && (data.rowIndex === 0 ||data.rowIndex === 1 ||data.rowIndex === 2 )) {
          return 'color:red';
        }
        return '';
      },
      goManage(){
          this.$router.push({
            path:'/shopAuditList'
          })
      },
      goCommodity(){
        this.$router.push({
          path:'/goodsAuditList'
        })
      },
      goKill(){
        // this.$message.warning('该功能暂未开放');
        this.$router.push({
          path:'/shopSpikeAudit'
        })
      },
      goGroup(){
        // this.$message.warning('该功能暂未开放');
        this.$router.push({
          path:'/shopGroupBuyAudit'
        })
      },
      loadList(){

        publicServer.userStatistics({}, (res) => {
            this.tableData = res.data
        },()=>{

        });

      },
      search2(){
         this.drawLine();
      },
      search(){
         this.drawLine();
      },
      chooseStart(item){
        if(item){
          this.endTime = false
        }else{
          this.endTime = true
        }
      },
      chooseEnd(item){
        if(item){
          this.type = 5;
          this.drawLine()
        }
      },
      saleTop(){
        homeServer.salesAmountCountTopFive({}, (res) => {
            this.tableData.items = res.data
        },()=>{

        })
      },
      chooseStart2(item){
        if(item){
          this.endTime2 = false
        }else{
          this.endTime2 = true
        }

      },
      chooseEnd2(item){
        if(item){
          this.type2 = 5;
          this.drawLine()
        }


      },
      drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        // let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
        // let myChart4 = this.$echarts.init(document.getElementById('myChart4'));
        publicServer.intersectionStatistics({}, (res) => {
          let option = {
            tooltip : {
              trigger: 'item',
              // formatter: "{b} : {c} ({d}%)"
            },
            color:['#4CC971','#F9D235','#389FFD'],
            legend: {
              // orient: 'vertical',
              // top: 'middle',
              bottom: 10,
              left: 'center',
              data: [ '已确诊的用户数','与确诊患者【有】交集用户数','与确诊患者【无】交集用户数']
            },
            series : [
              {
                type: 'pie',
                radius : '50%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label:{
                  formatter: '{b}:{d}%',
                },
                data:[{name:'已确诊的用户数',value:res.data.infectedCount},{name:'与确诊患者有交集用户数',value:res.data.intersectionUserCount},{name:'与确诊患者无交集用户数',value:res.data.unIntersectionUserCount},],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart.setOption(option);
        },()=>{

        });
        publicServer.intersectionPositionStatistics({}, (res) => {
                  let time = [],money = [];
                  for(let item in res.data){
                    time.push(item);
                    money.push(res.data[item]);
                  }

            let option2 = {
              tooltip: {
                trigger: 'axis'
              },
              // legend: {
              //   data:['销售额统计']
              // },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                minInterval:2,
                data: time
              },
              yAxis: [{
                name:'交集点总数',
                nameTextStyle: {
                  fontSize: 14,
                  fontWeight:'bold'
                },
                type: 'value'
              },{
                // name:name,
                nameTextStyle: {
                  fontSize: 14,
                  fontWeight:'bold',
                  color:'grey',

                },
                axisLine:{
                  show:false,
                },
              }],
              series: [
                {
                  name:'交集点总数',
                  type:'line',
                  stack: '总量',
                  data:money
                },
              ]
            };
            myChart2.setOption(option2);
        },()=>{

        });









        return { myChart: myChart,myChart2:myChart2}
      },
      ssssss(item){
        console.log(item)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/variable";
  .home {
    padding: 0 !important;
    background-color: #F0F0F0 !important;
    .box-shadow(0, 0, 0, rgba(0,0,0,0)) !important;
    .card-box {
      .title {
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 20px;
      }
    }
    .card {
      padding: 30px 30px 10px;
      background-color: #fff;
      .box-shadow();
      .item-title {
        margin-bottom: 20px;
        padding-bottom: 10px;
        color: #616161;
        font-size:16px;
        font-weight:bold;
        border-bottom: 1px solid #EBEBEB;
        .icon {
          margin-top: 6px;
          margin-right: 10px;
          width: 10px;
          height: 10px;
          .border-radius(50%);
          float: left;
          background-color: #2DD099;
        }
      }
      .tag {
        padding: 0 17px;
        background-color: #F7F7F7;
        height: 34px;
        line-height: 34px;
        .border-radius(17px);
        border: none;
        font-size: 14px;
        font-weight: bold;
        color: #5C5C5C;
      }
      .badge-icon {
        margin-right: 30px;
        margin-bottom: 20px;
        .el-badge__content {
          background-color: #37D3D1;
        }
      }
    }
  }
  .topList{
    padding: 10px;height: 100px;width: 18% ;background-size: 100% 100%;background-position: center center;
    background-repeat: no-repeat;
  }
</style>
