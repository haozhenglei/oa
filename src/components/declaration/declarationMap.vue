<template>
  <div class="role-list">
    <div  style="height:650px;width: 100%;position: relative">
      <div id="container"  style="width: 100%;height: 100%;">
      </div>
      <div style="z-index: 999;position:absolute; top:20px;left: 0;right:0;margin: auto;width: 80%">
        <div style="display: flex;padding: 20px;justify-content: space-around;background: white">
          <div v-for="item of timeList" style="text-align: center"  @click="selected(item)">
<!--            <p>{{item.week}}</p>-->
            <p :class="{active : active === item}" class="time">{{item}}</p>
          </div>
        </div>
      </div>

      <img src="../../assets/img/yq/fh.png" alt="" style="width: 50px;height: 50px;z-index: 999;position: absolute;right: 10px;bottom: 10px" @click="goLb">
    </div>
  </div>
</template>

<script>
  import publicServer from "../../api/public";
    export default {
      name: "declarationMap",
      created() {
        this.$store.dispatch('changeBreadcrumb', [
          {name: '感染申报-人员路径', path: '', params: null},
        ])
      },
      computed: {
        pageAllSize: function () {
          return this.$store.state.Public.pageAllSize;
        }
      },
      mounted() {
        var that = this;
        this.topList();
        setTimeout(function () {
          that.loadList();
        },500)


      },
      data() {
        return {
          active:7,
          timeList:[{
            week:'周一',
            id:1,
            time:'2020/02/07'
          },{
            week:'周二',
            id:2,
            time:'2020/02/07'
          },{
            week:'周三',
            id:3,
            time:'2020/02/07'
          },{
            week:'周四',
            id:4,
            time:'2020/02/07'
          },{
            week:'周五',
            id:5,
            time:'2020/02/07'
          },{
            week:'周六',
            id:6,
            time:'2020/02/07'
          },{
            week:'周天',
            id:7,
            time:'2020/02/07'
          },],
          formDialogVisible: true,
          formDialogVisible2: false,
          searchForm: {
            page: 1,
            pageSize: 10
          },
          options: [],
          map: null,
          infoWindow: null,
        }
      },
      methods: {
        goLb() {
          this.$router.go(-1)
        },
        selected(item){
          // this.searchForm.page = 1;
          this.active = item;
          // this.searchForm.refundStatus = item.id;
          this.loadList();
        },
        topList(){
          publicServer.getPositions({device_id:this.$route.query.device_id}, res => {
            var arr = [];
            for(let key in res.data){
              arr.push(key)
            }
            this.timeList = arr;
            this.active = this.timeList[0];
          }, () => {
          })
        },
        loadList(){
          let that = this;
          let marker;
          publicServer.getPositions({device_id:this.$route.query.device_id}, obj => {
                  console.log(obj.data[this.active])

            let res=obj.data[this.active];
            console.log(res)
            this.map = new AMap.Map('container', {
              resizeEnable: true,
              mapStyle: 'amap://styles/light',
            });
            this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            setTimeout(function () {
              for (var i = 0; i < res.length; i++) {
                let x = res[i].lng; //经度
                let y = res[i].lat; //纬度
                // let icon = that.markerList[i].icon; //图片
                // let toiletid = res.data[i].id; //idchangeToiletId
                // let toiletName = res.data[i].name; //名
                marker = new AMap.Marker({
                  // icon: require('../../assets/img/yq/rw.png'),
                  // size: new AMap.Size(25,25),  //图标大小
                  // imageSize: new AMap.Size(25,25),
                  position: [x, y]
                });
                const newIcon = new AMap.Icon({
                  size: new AMap.Size(20, 20), // 图标尺寸
                  image:  require('../../assets/img/yq/lj.png'), // Icon的图像
                  imageSize: new AMap.Size(20,20),
                });
                marker.setIcon(newIcon);
                marker.setMap(that.map);
                that.map.setFitView();
              }
            }, 50);

          }, () => {

          })

        },
      }
    }


</script>

<style scoped lang="less">
.time{
  padding: 5px 25px;
  border: 1px solid;
  border-radius: 15px;
  margin-top: 10px;
  cursor: pointer;
}
  .active{
    border-color: #02a7f0;
    color: #02a7f0;
  }
</style>
