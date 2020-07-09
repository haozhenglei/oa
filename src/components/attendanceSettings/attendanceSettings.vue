<template>
  <div>
    <div style="padding-right:35%">
      <div class="card_setting_title">打卡时间范围设置</div>
      <div class="on_work_card">
        <div class="on_work_card_left">
          <div class="on_work_time">上班时间:</div>
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="on_work_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="on_work_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
              :picker-options="{
                  selectableRange:`${on_work_start_time+':00'}-${on_work_end_time+':00'}`
                }"
            ></el-time-picker>
          </div>
        </div>
        <div class="on_work_card_right">
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="on_work_start_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="on_work_start_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
          <div class="zhi">至</div>
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="on_work_end_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="on_work_end_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
          <div class="on_work_card_enable">可打上班卡</div>
        </div>
      </div>
      <div class="on_work_card">
        <div class="on_work_card_left">
          <div class="on_work_time">下班时间:</div>
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="off_work_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="off_work_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
              :picker-options="{
                  selectableRange:`${off_work_start_time+':00'}-${off_work_end_time+':00'}`
                }"
            ></el-time-picker>
          </div>
        </div>
        <div class="on_work_card_right">
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="off_work_start_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="off_work_start_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
          <div class="zhi">至</div>
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="off_work_end_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="off_work_end_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
          <div class="on_work_card_enable">可打下班卡</div>
        </div>
      </div>
      <div class="on_work_card" style="width:50%">
        <div class="on_work_card_right">
          <div class="on_work_time">午休时间:</div>
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="rest_start_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="rest_start_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
          <div class="zhi">至</div>
          <div class="on_work_time_show">
            <!-- <input type="text" class="input_inner" v-model="rest_end_time" />
            <span class="iconfont icon-shijian shijianicon"></span>-->
            <el-time-picker
              v-model="rest_end_time"
              class="date-box"
              format="HH:mm"
              value-format="HH:mm"
            ></el-time-picker>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="attendence_location_setting_title">考勤地点设置</div>
      <div class="attendence_location_setting">
        <div class="attendence_location">
          <el-input v-model="address" placeholder="请输入考勤地点"></el-input>
        </div>
        <div class="card_valid_range">打卡有效范围:</div>
        <div class="card_valid_range_select">
          <el-select v-model="radius_value" placeholder="请选择" @change="change_radius">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="radius_danwei">米</div>
        </div>
        <div class="right-handle">
          <el-button type="primary" size="small" @click="search">确定</el-button>
          <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
        </div>
      </div>
      <div class="map">
        <div id="allmap" ref="allmap"></div>
        <div class="location_info">
          <div class="location_info_top">{{addressShow}}</div>
          <div class="location_info_bottom">{{addressShow_detail}}</div>
        </div>
      </div>
      <div class="waiqin_card">
        <el-checkbox v-model="waiqin_checked" @change="change_waiqin">允许外勤打卡</el-checkbox>
      </div>
    </div>

    <div>
      <div class="weekday_setting_title">工作日设置</div>

      <table class="gridtable">
        <tr>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th>周六</th>
          <th>周日</th>
        </tr>
        <tr>
          <td>
            <el-checkbox v-model="mon_checked" @change="change_mon">
              <span v-if="mon_checked">上班</span>
              <span v-if="!mon_checked">休息</span>
            </el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="tus_checked" @change="change_tus">
              <span v-if="tus_checked">上班</span>
              <span v-if="!tus_checked">休息</span>
            </el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="wed_checked" @change="change_wed">
              <span v-if="wed_checked">上班</span>
              <span v-if="!wed_checked">休息</span>
            </el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="thi_checked" @change="change_thi">
              <span v-if="thi_checked">上班</span>
              <span v-if="!thi_checked">休息</span>
            </el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="fri_checked" @change="change_fri">
              <span v-if="fri_checked">上班</span>
              <span v-if="!fri_checked">休息</span>
            </el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="sau_checked" @change="change_sau">
              <span v-if="sau_checked">上班</span>
              <span v-if="!sau_checked">休息</span>
            </el-checkbox>
          </td>
          <td>
            <el-checkbox v-model="sun_checked" @change="change_sun">
              <span v-if="sun_checked">上班</span>
              <span v-if="!sun_checked">休息</span>
            </el-checkbox>
          </td>
        </tr>
      </table>
      <!-- <div class="waiqin_card">
        <el-checkbox v-model="paixiu_checked" @change="change_paixiu">法定节假日自动排休</el-checkbox>
      </div>-->
    </div>

    <div class="holiday_setting">
      <div class="weekday_setting_title">节日设置</div>
      <div class="holiday_setting_block">
        <div class="holiday_setting_block_xuanze">
          <div class="holiday_setting_block_xuanze_left">
            <el-date-picker v-model="yearVal" type="year" format="yyyy" value-format="yyyy" placeholder="选择年" @change="yearChange"></el-date-picker>
          </div>
          <div class="holiday_setting_block_xuanze_right">
            <el-button type="primary" size="small" @click="addHoliday">新增节日</el-button>
          </div>
        </div>
        <!-- <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="holidayName" label="节日" width="150px" align="center">
              <template slot-scope="scope">
                <span v-if="isEdit===false||scope.$index!=tableDataIndex">{{scope.row.holidayName}}</span>
                <el-input v-if="isEdit===true&&scope.$index==tableDataIndex" v-model="holidayName" placeholder="节日名称"></el-input>
              </template>             
            </el-table-column>
            <el-table-column prop="startDate,endDate" label="放假时间" align="center">              
              <template slot-scope="scope">
                <span v-if="isEdit===false||scope.$index!=tableDataIndex">{{scope.row.startDate}}至{{scope.row.endDate}}</span>
                <el-date-picker
                v-if="isEdit===true&&scope.$index==tableDataIndex"
                v-model="holidayTime"
                type="daterange"
                format="MM-dd"
                value-format="MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              </template>              
            </el-table-column>
            <el-table-column prop="workOffDay" label="调休上班日期" align="center">
              <template slot-scope="scope">
                <span v-if="isEdit===false||scope.$index!=tableDataIndex">{{scope.row.workOffDay==""?"无":scope.row.workOffDay}}</span>
                <el-date-picker
                v-if="isEdit===true&&scope.$index==tableDataIndex"
                type="dates"
                v-model="workOffDay"
                placeholder="一个或多个日期"
                format="MM-dd"
                value-format="MM-dd">
              </el-date-picker>
              </template>            
            </el-table-column>
            <el-table-column prop="days" label="放假天数" width="150px" align="center">
              <template slot-scope="scope">
                {{scope.row.days}}
              </template>             
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button v-if="isEdit===true&&scope.$index==tableDataIndex" type="text" size="small" @click="saveHoliday(scope.row.id,scope.$index)">保存</el-button>
                <el-button v-else type="text" size="small" @click="editHoliday(scope.row.id,scope.$index)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteHoliday(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="height:30px;text-align:center;margin-top:2px">
          <i class="el-icon-plus" style="font-size:20px;line-height:30px;width:30px;border:1px dashed #999;border-radius:5px" @click="addHoliday"></i>
        </div> -->
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="holidayName" label="节日" width="150px" align="center"></el-table-column>
            <el-table-column prop="startDate,endDate" label="放假时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.startDate}}至{{scope.row.endDate}}</span>
              </template> 
            </el-table-column>
            <el-table-column prop="workOffDay" label="调休上班日期" align="center"></el-table-column>
            <el-table-column prop="days" label="放假天数" width="150px" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editHoliday(scope.row.id,scope.$index)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteHoliday(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <holidayForm 
      :title="title"
      :dialog-visible="holidayFormVisible"
      @submit-success="addSuccess"
      @close-dialog="closeHolidayFormDialog"
      :isAdd="isAdd"
      :formData="holidayObj"
      :holidayTime2="holidayTime2"
      :workOffDay2="workOffDay2"
    ></holidayForm>
    <div class="tijiaoSetting">
      <el-button type="primary" size="small" @click="tijiaoSetting">提交设置</el-button>
    </div>
  </div>
</template>

<script>
import attendanceSettingServer from "../../api/attendanceSetting";
import holidayForm from "./holiday-form";
let map;
let marker;
export default {
  name: "attendanceSettings",
  components: {
    holidayForm
  },
  data() {
    return {
      title:'',
      isAdd:null,
      holidayFormVisible:false,
      holidayObj:{},
      holidayTime2:[],
      workOffDay2:[],
      on_work_time: "",
      on_work_start_time: "",
      on_work_end_time: "",
      off_work_time: "",
      off_work_start_time: "",
      off_work_end_time: "",
      rest_start_time: "",
      rest_end_time: "",
      address: "",
      addressShow: "成都市总工会",
      addressShow_detail: "成都市青羊区贝森路2号",
      options: [
        {
          value: "100"
        },
        {
          value: "200"
        },
        {
          value: "300"
        },
        {
          value: "500"
        },
        {
          value: "1000"
        }
      ],
      radius_value: "",
      centerX: "",
      centerY: "",
      waiqin_checked: "",
      // paixiu_checked: "",
      mon_checked: "",
      tus_checked: "",
      wed_checked: "",
      thi_checked: "",
      fri_checked: "",
      sau_checked: "",
      sun_checked: "",
      yearVal: null,
      tableData:[],
      // holidayObj:{},
      isEdit:false,
      tableDataIndex:-1,
      holidayName:'',
      holidayTime:'',
      workOffDay:'',
      isClear:'',
    };
  },
  computed: {
    timeDefault() {
      var date = new Date();
      var month;
      var day;
      if (date.getMonth()+ 1<10) {
        month='0'+(date.getMonth()+ 1)
      } else {
        month=date.getMonth()+ 1
      }
      if (date.getDate()<10) {
        day='0'+date.getDate()
      } else {
        day=date.getDate()
      }
      // var s1 = date.getFullYear() + "-" + month + "-" + day;
      var s1=date.getFullYear();
      return s1;
    },
  },

  methods: {
    closeHolidayFormDialog(){
      this.holidayFormVisible=false;
    },
    addSuccess(){
      this.loadHolidayList();
    },
    attendanceSettingLoad() {
      attendanceSettingServer.attendanceSettingFind(
        {},
        res => {
          console.log(res.data);
          this.on_work_time = res.data.workStartTime;
          this.on_work_start_time = res.data.onWorkStartTime;
          this.on_work_end_time = res.data.onWorkEndTime;
          this.off_work_time = res.data.workEndTime;
          this.off_work_start_time = res.data.downWorkStartTime;
          this.off_work_end_time = res.data.downWorkEndTime;
          this.rest_start_time = res.data.restStartTime;
          this.rest_end_time = res.data.restEndTime;

          this.radius_value = res.data.checkWorkRadius;

          this.centerX = res.data.companyXxx;
          this.centerY = res.data.companyYyy;
          this.initmap(this.centerX, this.centerY);
          this.addressShow = res.data.address;
          this.addressShow_detail = res.data.addressDetail;

          let workDayConfigArr = res.data.workDayConfig.split("");
          if (workDayConfigArr[0] == "0") {
            this.mon_checked = true;
          } else {
            this.mon_checked = false;
          }
          if (workDayConfigArr[1] == "0") {
            this.tus_checked = true;
          } else {
            this.tus_checked = false;
          }
          if (workDayConfigArr[2] == "0") {
            this.wed_checked = true;
          } else {
            this.wed_checked = false;
          }
          if (workDayConfigArr[3] == "0") {
            this.thi_checked = true;
          } else {
            this.thi_checked = false;
          }
          if (workDayConfigArr[4] == "0") {
            this.fri_checked = true;
          } else {
            this.fri_checked = false;
          }
          if (workDayConfigArr[5] == "1") {
            this.sau_checked = false;
          } else {
            this.sau_checked = true;
          }
          if (workDayConfigArr[6] == "1") {
            this.sun_checked = false;
          } else {
            this.sun_checked = true;
          }

          if (res.data.isAllowOutCheck == 1) {
            this.waiqin_checked = true;
          }
          // if (res.data.isAutoRest == 1) {
          //   this.paixiu_checked = true;
          // }
        },
        () => {}
      );
    },

    // 初始化地图
    initmap(x, y) {
      // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
      map = new AMap.Map("allmap", {
        //'container'是对应页面盒子的id
        resizeEnable: true, //自适应大小
        zoom: 16, //初始视窗
        center: [x, y] //中心点
      });
      // 定位点
      this.addMarker(x, y);
      this.setCircle(x, y);
    },
    // 实例化点标记
    addMarker(x, y) {
      var _this = this;
      marker = new AMap.Marker({
        icon: "", //图片ip
        imageSize: "20px",
        position: [x, y],
        offset: new AMap.Pixel(-13, -30),
        // 设置是否可以拖拽
        draggable: true,
        cursor: "move",
        // 设置拖拽效果
        raiseOnDrag: true
      });
      marker.setMap(map);
    },
    setCircle(x, y) {
      let _this = this;
      _this.circle = new AMap.Circle({
        center: [x, y],
        radius: _this.radius_value, //半径
        borderWeight: 3,
        strokeColor: "rgba(0,0,0,0)",
        strokeOpacity: 1,
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: "solid",
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: "#1791fc",
        zIndex: 50
      });
      _this.circle.setMap(map);
      map.setFitView();
    },

    placeSearch(name) {
      var MSearch;
      map.plugin(["AMap.PlaceSearch", "AMap.ToolBar", "AMap.Scale"], () => {
        map.addControl(new AMap.ToolBar());
        // map.addControl(new AMap.Scale());
        MSearch = new AMap.PlaceSearch({
          //构造地点查询类
          city: "" //城市
        });
        AMap.event.addListener(
          MSearch,
          "complete",
          this.keywordSearch_CallBack
        ); //返回地点查询结果
        MSearch.search(name); //关键字查询
      });
    },
    //结果的回调
    keywordSearch_CallBack(data) {
      console.log(data);
      if (data.poiList.pois.length > 0) {
        this.centerX = data.poiList.pois[0].location.lng;
        this.centerY = data.poiList.pois[0].location.lat;
        this.initmap(this.centerX, this.centerY);
        this.addressShow = data.poiList.pois[0].name;
        this.addressShow_detail = data.poiList.pois[0].address;
      }
      map.setFitView();
    },

    change_mon(val) {
      this.mon_checked = val;
      // console.log(val)
    },
    change_tus(val) {
      this.tus_checked = val;
    },
    change_wed(val) {
      this.wed_checked = val;
    },
    change_thi(val) {
      this.thi_checked = val;
    },
    change_fri(val) {
      this.fri_checked = val;
    },
    change_sau(val) {
      this.sau_checked = val;
    },
    change_sun(val) {
      this.sun_checked = val;
    },
    change_waiqin(val) {
      this.waiqin_checked = val;
    },
    // change_paixiu(val) {
    //   this.paixiu_checked = val;
    // },
    change_radius(val) {
      this.radius_value = val;
    },

    search() {
      this.placeSearch(this.address);
    },
    handleReset() {
      this.address = "";
      this.initmap(104.008133, 30.669719);
      this.addressShow = "成都市总工会";
      this.addressShow_detail = "成都市青羊区贝森路2号";
      this.centerX = "104.008133";
      this.centerY = "30.669719";
    },
    tijiaoSetting() {
      var waiqin;
      var paixiu;
      var mon;
      var tus;
      var wed;
      var thi;
      var fri;
      var sau;
      var sun;
      if (this.waiqin_checked) {
        waiqin = 1;
      } else {
        waiqin = 0;
      }
      // if (this.paixiu_checked) {
      //   paixiu = 1;
      // } else {
      //   paixiu = 0;
      // }
      if (!this.mon_checked) {
        mon = 1;
      } else {
        mon = 0;
      }
      if (!this.tus_checked) {
        tus = 1;
      } else {
        tus = 0;
      }
      if (!this.wed_checked) {
        wed = 1;
      } else {
        wed = 0;
      }
      if (!this.thi_checked) {
        thi = 1;
      } else {
        thi = 0;
      }
      if (!this.fri_checked) {
        fri = 1;
      } else {
        fri = 0;
      }
      if (!this.sau_checked) {
        sau = 1;
      } else {
        sau = 0;
      }
      if (!this.sun_checked) {
        sun = 1;
      } else {
        sun = 0;
      }
      let workday_config = `${mon}${tus}${wed}${thi}${fri}${sau}${sun}`;
      let updateObj = {
        id: 1,
        workStartTime: this.on_work_time,
        onWorkStartTime: this.on_work_start_time,
        onWorkEndTime: this.on_work_end_time,
        workEndTime: this.off_work_time,
        downWorkStartTime: this.off_work_start_time,
        downWorkEndTime: this.off_work_end_time,
        restStartTime: this.rest_start_time,
        restEndTime: this.rest_end_time,
        address: this.addressShow,
        addressDetail: this.addressShow_detail,
        checkWorkRadius: this.radius_value,
        isAllowOutCheck: waiqin,
        workDayConfig: workday_config,
        // isAutoRest: paixiu,
        companyXxx: this.centerX,
        companyYyy: this.centerY
      };

      console.log(updateObj);

      attendanceSettingServer.attendanceSettingUpdate(
        updateObj,
        res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("更改成功");
            this.attendanceSettingLoad();
          } else {
            this.$message.error("更改失败");
          }
        },
        () => {}
      );
    },
    yearChange(val){
      // console.log(typeof val)
      this.loadHolidayList();
    },
    loadHolidayList(){
      attendanceSettingServer.holidayFind({year:this.yearVal},res=>{
        this.tableData=res.data;
      },()=>{})
    },
    addHoliday(){
      // this.loadHolidayList();
      // this.tableData.push(this.holidayObj);
      // attendanceSettingServer.holidayAdd({year:this.yearVal},res=>{
      //   this.loadHolidayList();
      // },()=>{})
      this.title='新增假日';
      this.holidayFormVisible=true;
      this.isAdd=1;
      this.holidayObj={year:this.yearVal};
    },
    editHoliday(id,index){
      // if (this.tableDataIndex==index) {
      //   this.isClear=false;       
      // }else{
      //   this.isClear=true;
      //   // this.holidayName='';
      //   // this.holidayTime='';
      //   // this.workOffDay='';   
      // }
      // console.log(this.isClear);
      // this.isEdit=true;
      // this.tableDataIndex=index;
      this.title='编辑假日';
      this.holidayFormVisible=true;
      this.isAdd=2;
      this.holidayObj=this.tableData[index];
      // console.log(this.holidayObj);
      this.holidayTime2=[this.holidayObj.startDateTwo,this.holidayObj.endDateTwo];

      if (this.holidayObj.workOffDay!=="") {
        this.workOffDay2=this.holidayObj.workOffDay.split(',');
      } else {
        this.workOffDay2=[];
      }
      // console.log(this.workOffDay2)
    },
    // saveHoliday(id,index){
    //   this.isEdit=false;
    //   this.tableData[index]={
    //     id:id,
    //     year:this.yearVal,
    //     holidayName:this.holidayName,
    //     startDate:this.yearVal+'-'+this.holidayTime[0], 
    //     endDate:this.yearVal+'-'+this.holidayTime[1],
    //     workOffDay:this.workOffDay!==""?this.workOffDay.join(','):this.workOffDay,
    //   }
    //   console.log(this.tableData)
    //   console.log(this.tableData[index])
    //   attendanceSettingServer.holidayUpdate(this.tableData[index],res=>{
    //     this.loadHolidayList();
    //   },()=>{})
    // },
    deleteHoliday(id){
      this.$confirm('你确定删除该假日吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          attendanceSettingServer.holidayDel(id,res=>{
            this.loadHolidayList();
          },()=>{})
        }).catch(() => {
        });
      
    },
  },

  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "考勤设置", path: "/attendanceSettings", params: null }
    ]);
  },
  mounted() {
    this.initmap(104.008133, 30.669719); //初始定位到成都市总工会
    this.attendanceSettingLoad();
    this.loadHolidayList();
    this.yearVal=String(this.timeDefault);
    // console.log(typeof this.yearVal)
  }
};
</script>

<style scoped lang="less">
.card_setting_title {
  margin-bottom: 1%;
  font-weight: bold;
  font-size: 15px;
}
.input_inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 0 0 30px;
  width: 100%;
  font-size: 15px;
}
.on_work_card {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1%;
  margin-left: 3%;
}
.on_work_card_left {
  flex: 2;
  display: flex;
  align-items: center;
}
.on_work_time_show {
  width: 7rem;
}
.zhi{
  margin:0 1%;
}
.on_work_card_right {
  flex: 3;
  display: flex;
  align-items: center;
}
.on_work_card_enable {
  padding-left: 2%;
  word-break:keep-all;           /* 不换行 */
  white-space:nowrap;          /* 不换行 */
}
.shijianicon {
  position: absolute;
  top: 0;
  height: 40px;
  line-height: 40px;
  width: 30px;
  text-align: center;
  color: #c0c4cc;
}

.attendence_location_setting_title,
.weekday_setting_title {
  margin-top: 2%;
  margin-bottom: 1%;
  font-weight: bold;
  font-size: 15px;
}
.attendence_location_setting {
  display: flex;
  align-items: center;
  padding-left: 3%;
  width: 80%;
}
.attendence_location {
  flex: 1.5;
}
.card_valid_range {
  flex: 1;
  text-align: right;
}
.card_valid_range_select {
  position: relative;
  flex: 1;
  padding-left: 2%;
}
.radius_danwei {
  position: absolute;
  top: 0;
  left: 85px;
  height: 40px;
  line-height: 40px;
}
.right-handle {
  flex: 2;
  text-align: center;
}

.map {
  height: 300px;
  width: 60%;
  border-radius: 5px;
  margin-left: 3%;
  margin-top: 0.5%;
  position: relative;
}
#allmap {
  height: 100%;
  width: 100%;
}
.location_info {
  position: absolute;
  left: 2px;
  top: 5px;
  width: 35%;
  height: 60px;
  background-color: #fff;
  z-index: 99;
  border-radius: 5px;
}
.location_info_top {
  font-weight: bold;
  font-size: 15px;
  margin-left: 3px;
}
.location_info_bottom {
  font-size: 13px;
  margin-left: 3px;
}

.waiqin_card {
  margin-left: 3%;
  margin-top: 0.5%;
}

table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 13px;
  color: #909399;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  margin-left: 3%;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px 15px;
  border: 1px solid #ebeef5;
  background-color: #fff;
}
table.gridtable td {
  border-width: 1px;
  padding: 8px 15px;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
}

.tijiaoSetting {
  width: 60%;
  text-align: center;
  margin-top: 3%;
}

/deep/.el-input--suffix .el-input__inner {
  padding-right: 0px;
}
.holiday_setting{
  width:80%;
}
.holiday_setting_block{
  margin-left:3%;
}
.holiday_setting_block_xuanze{
  // width:10%;
  margin-bottom:0.5%;
  display:flex;
  align-items: center;;
}
.holiday_setting_block_xuanze_left{
  // flex:1;
  width: 11rem;
}
.holiday_setting_block_xuanze_right{
  flex:5;
  text-align: right;
}
</style>
