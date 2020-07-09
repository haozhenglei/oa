<template>
  <div class="role-list">
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width="68px" size="small" @submit.native.prevent>
          <el-form-item label="区域">
            <el-select v-model="searchForm.advertLocation" placeholder="请选择" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="handle-box">

    </div>
    <div  style="height:520px;width: 100%">
      <div id="container"  style="width: 100%;height: 100%;position: relative">
        <img src="../../assets/img/yq/lb.png" alt="" style="width: 50px;height: 50px;z-index: 999;position: absolute;right: 10px;bottom: 10px" @click="goLb">
        <img src="../../assets/img/yq/jl.png" alt="" style="width: 50px;height: 50px;z-index: 999;position: absolute;right: 10px;bottom: 70px" @click="goJl">
      </div>
    </div>
    <intersection-table ref="intersec" :dialog-visible="formDialogVisible" @close-dialog="formDialogVisible = false" :p_id="p_id" :address="address" @openForm="openDeal"></intersection-table>
    <dealForm :dialog-visible="formDialogVisible2" @close-dialog="formDialogVisible2 = false" :row="row" @submit-success="dealSuc"></dealForm>
  </div>
</template>

<script>
  import Vue from 'vue'
  import intersectionTable from "./intersectionTable"
  import dealForm from "./dealForm"
  import publicServer from '../../api/public'
    export default {
      name: "mapWay",
      components: {
        intersectionTable,dealForm
      },
      created() {
        this.$store.dispatch('changeBreadcrumb', [
          {name: '交集分析地图模式', path: '', params: null},
        ])
      },
      computed: {
        pageAllSize: function () {
          return this.$store.state.Public.pageAllSize;
        }
      },
      mounted() {
        this.loadList()
      },
      data() {
        return {
          formDialogVisible:false,
          formDialogVisible2:false,
          searchForm: {
            page: 1,
            pageSize: 10
          },
          options:[],
          map:null,
          infoWindow:null,
          p_id:0,
          address:'',
          row:{}
        }
      },
      methods: {
        dealSuc(){
          this.$refs.intersec.loadList();
        },
        openDeal(item){
          this.formDialogVisible2 = true;
          this.row = item
        },
        goLb(){
          this.$router.push({
            path:'/list'
          })
        },
        goJl(){
          this.$router.push({
            path:'/dealList'
          })
        },
        del(){
          console.log(1)
        },
        contend(){
          console.log(2)
        },
        loadList(){
          let that = this;
          let marker;
          publicServer.intersectionAnalysis({page:1,page_size:9999}, (res) => {
            this.map = new AMap.Map('container', {
              resizeEnable: true,
              mapStyle: 'amap://styles/light',
            });
            this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            setTimeout(function () {
              for (var i = 0; i < res.data.list.length; i++) {
                let x = res.data.list[i].lng; //经度
                let y = res.data.list[i].lat; //纬度
                // let icon = that.markerList[i].icon; //图片
                let toiletid = res.data.list[i].id; //idchangeToiletId
                marker = new AMap.Marker({
                  // icon: require('../../assets/img/yq/rw.png'),
                  // size: new AMap.Size(25,25),  //图标大小
                  // imageSize: new AMap.Size(25,25),
                  position: [x, y]
                });
                const newIcon = new AMap.Icon({
                  size: new AMap.Size(22, 22), // 图标尺寸
                  image:  require('../../assets/img/yq/jjd.png'), // Icon的图像
                  imageSize: new AMap.Size(22,22),
                });

                marker.setIcon(newIcon)
                marker.id = toiletid;


                var MyComponent = Vue.extend({
                  template: '<div style="text-align: right;padding-right: 20px"><h3>'+res.data.list[i].addr+'</h3><button style="margin-right: 5px" @click="del('+i+')">删除</button><button  @click="contend('+i+')">详情</button></div>',
                  methods:{
                    del:function(e) {
                      console.log(e)
                      that.$confirm('你确定删除该交集点吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        publicServer.delIntersectionPosition({p_id: res.data.list[e].id}, () => {
                          that.$message.success('删除成功');
                          that.loadList();
                        });
                      }).catch(() => {
                      });
                    },
                    contend:function (e) {
                       that.formDialogVisible = true;
                       that.p_id = res.data.list[e].id;
                       that.address = res.data.list[e].addr
                    }
                  }
                });
                var component= new MyComponent().$mount();
                // infowindow 内容定义
                marker.content = component.$el
                // that.infoWindow = new AMap.InfoWindow({
                //   content : component.$el
                // });
                // marker.content = '<h3>'+res.data.list[i].addr+'</h3>';
                // marker.content += '<div style="text-align: right"><button style="margin-right: 5px" @click="del">删除</button><button  @click="contend">详情</button></div>';
                //点击marker图标
                marker.on("click", function (e) {
                  that.infoWindow.setContent(e.target.content);
                  that.infoWindow.open(that.map, e.target.getPosition());
                });
                marker.setMap(that.map);
                that.map.setFitView();


              }
            }, 50);
          },()=>{

          });
          // let res={
          //   data:[{
          //     longitude:'103.54',
          //     latitude:'30.54',
          //     name:'wyc',
          //     id:1
          //   },{
          //     longitude:'103.55',
          //     latitude:'30.54',
          //     name:'wyc2',
          //     id:2
          //   }]
          // }
          // this.map = new AMap.Map('container', {
          //   resizeEnable: true,
          //   mapStyle: 'amap://styles/light',
          // });
          // this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
          //   setTimeout(function () {
          //     for (var i = 0; i < res.data.length; i++) {
          //       let x = res.data[i].longitude; //经度
          //       let y = res.data[i].latitude; //纬度
          //       // let icon = that.markerList[i].icon; //图片
          //       let toiletid = res.data[i].id; //idchangeToiletId
          //       let toiletName = res.data[i].name; //名
          //       marker = new AMap.Marker({
          //         // icon: require('../../assets/img/yq/rw.png'),
          //         // size: new AMap.Size(25,25),  //图标大小
          //         // imageSize: new AMap.Size(25,25),
          //         position: [x, y]
          //       });
          //       const newIcon = new AMap.Icon({
          //         size: new AMap.Size(24, 28), // 图标尺寸
          //         image:  require('../../assets/img/yq/rw.png'), // Icon的图像
          //         imageSize: new AMap.Size(24,28),
          //       });
          //       marker.setIcon(newIcon)
          //       marker.id = toiletid;
          //       marker.content = '<h3>'+res.data[i].name+'</h3>';
          //       marker.content += '<div>患者电话：'+res.data[i].longitude+'</div>';
          //       marker.content += '<div>确诊时间：'+res.data[i].latitude+'</div>';
          //       marker.content += '<div>收治医院：'+res.data[i].latitude+'</div>';
          //       marker.content += '<div>医院电话：'+res.data[i].latitude+'</div>';
          //       marker.content += '<div>目前定位：'+res.data[i].latitude+'</div>';
          //       // marker.content += '&nbsp;<button class="btn btn-warning btn-xs">实时跟踪&nbsp;</button>';
          //       // marker.content += '&nbsp;<button  class="btn btn-danger btn-xs">设置</button></div>';
          //
          //       // that.infoWindow.setContent(marker.content)
          //       // marker.on('mouseover', that.infoOpen(marker));
          //       marker.on('mouseover', function (e) {
          //         console.log(1)
          //         that.infoWindow.setContent(e.target.content);
          //         that.infoWindow.open(that.map, e.target.getPosition());
          //       });
          //       console.log(2)
          //       marker.emit('mouseover', {target: marker});
          //       marker.on('mouseout', function (e) {
          //         that.map.clearInfoWindow();
          //         // this.infoWindow.close(that.map, e.target.getPosition());
          //       });
          //
          //       // marker.setTitle(toiletName);
          //       // that.markerArr.push( that.markerArr);
          //       marker.setMap(that.map);
          //       that.map.setFitView();
          //       // marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
          //       //   offset: new AMap.Pixel(30, 0),//修改label相对于maker的位置
          //       //   content: toiletName
          //       // });
          //       //点击marker图标
          //       marker.on("click", function (e) {
          //
          //         // shopServer.getShopById({id:e.target.id}, (res) => {
          //         //
          //         // });
          //         // var title = '方恒假日酒店<p style="font-size:11px;color:#F00;">价格:318</p>',
          //         // that.infoWindow.setContent(e.target.id);
          //         // that.infoWindow.open(that.map, e.target.getPosition());
          //       })
          //     }
          //   }, 50);
        },
        infoClose(e) {
          console.log(e)
          this.infoWindow.close(this.map, e.getPosition());
        },
        infoOpen(e) {
          console.log(111)
          this.infoWindow.setContent(e.content);
          this.infoWindow.open(this.map, e.getPosition());
        },
        handleReset() {
          this.searchForm = {page:1,pageSize:10};
          this.loadList();
        },
        search(){
          this.searchForm.page = 1;
          this.loadList();
        },
      }
    }
</script>

<style scoped>

</style>
