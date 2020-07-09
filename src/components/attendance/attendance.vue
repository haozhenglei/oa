<template>
  <div class="role-list">
    <div style="margin-bottom:18px">
      <el-button
        size="small"
        v-for="item in wpList"
        :key="item.name"
        :class="{active : active === item.name}"
        @click="selected(item)"
      >{{item.name}}</el-button>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="时间">
            <el-date-picker
              v-model="date_search"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="date_select">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="searchForm.branchId" placeholder="请选择部门" @change="depart_select">
              <el-option
                v-for="item of groupList"
                :label="item.branchName"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search(searchForm.id)">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset(searchForm.id)">重置</el-button>
      </div>
    </div>

    <div class="handle-box">
      <el-button type="primary" size="small" @click="exportExel(searchForm.id,active)">导出报表</el-button>
    </div>

    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
        <el-table id="outTable1" :data="tableData1" height="550" v-if="searchForm.id === 1">
          <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="部门" prop="branchName" show-overflow-tooltip></el-table-column>
          <el-table-column label="工号" prop="roleId" show-overflow-tooltip></el-table-column>
          <el-table-column label="职位" prop="roleName" show-overflow-tooltip></el-table-column>
          <el-table-column label="出勤天数" prop="cqday" show-overflow-tooltip></el-table-column>
          <el-table-column label="休息天数" prop="xxday" show-overflow-tooltip></el-table-column>
          <el-table-column label="迟到次数" prop="cdcount" show-overflow-tooltip></el-table-column>
          <el-table-column label="迟到分钟" prop="cdmin" show-overflow-tooltip></el-table-column>
          <el-table-column label="早退次数" prop="ztcount" show-overflow-tooltip></el-table-column>
          <el-table-column label="早退分钟" prop="ztmin" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" prop="remarks" show-overflow-tooltip width="290" align="center"></el-table-column>
          <el-table-column
            :label="`周${item.week}/${item.date}`"
            align="center"
            show-overflow-tooltip
            v-for="(item,index) in tableData1[0].list"
            :key="index"
            :render-header="renderheader"
          >
            <template slot-scope="scope">
              <div>{{scope.row.list[index].comment}}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-table id="outTable2" :data="tableData2" height="550" v-if="searchForm.id === 2">
          <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="部门" prop="branchName" show-overflow-tooltip></el-table-column>
          <el-table-column label="工号" prop="roleId" show-overflow-tooltip></el-table-column>
          <el-table-column label="职位" prop="roleName" show-overflow-tooltip></el-table-column>
          <el-table-column
            :label="`周${item.week}/${item.date}`"
            align="center"
            show-overflow-tooltip
            v-for="(item,index) in tableData2[0].checkLogs"
            :key="index"
            :render-header="renderheader"
          >
            <template slot-scope="scope">
              <div>{{scope.row.checkLogs[index].sbTime}}</div>
              <div>{{scope.row.checkLogs[index].xbTime}}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-table id="outTable3" :data="tableData3" height="550" v-show="searchForm.id === 3">
          <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="部门" prop="branchName" show-overflow-tooltip></el-table-column>
          <el-table-column label="工号" prop="roleId" show-overflow-tooltip></el-table-column>
          <el-table-column label="职位" prop="roleName" show-overflow-tooltip></el-table-column>
          <el-table-column label="考勤日期" prop="checkWorkDate" min-width="180px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="考勤时间" prop="regularTime" min-width="120px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="打卡时间" prop="checkWorkTime" min-width="180px" align="left" show-overflow-tooltip></el-table-column>
          <el-table-column label="打卡结果" prop="comment" min-width="100px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="打卡地点" prop="address" min-width="380px" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import publicServer from "../../api/public";
import attendanceServer from "../../api/attendance";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "attendance",
  components: {},
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "考勤统计", path: "/attendance", params: null }
    ]);
  },
  mounted() {
    this.loadList();
    this.Company();
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
    }
  },

  props: {
    activeName: {
      type: String,
      default: ""
    },
    tabName: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      wpList: [
        { name: "月度汇总", id: 1 },
        { name: "打卡时间", id: 2 },
        { name: "原始记录", id: 3 }
      ],
      active: "月度汇总",
      row: {},
      isLoading: false,
      isAdd: 1,
      searchForm: {
        pageType: 0,
        id:1
      },
      rowId: null,
      roleTree: [],
      groupList: [], //部门列表
      date_search: "", //日期搜索
      date_start_search:'',
      date_end_search:'',
      depart_search: "", //部门搜索
      search_branchName: "",
      value: "",
      tableData1: [], //搜索前的表格数据
      tableData2: [],
      tableData3: [],
      tableDataSave: [],
      dateList: [],
      dateListSave: [],
      is_search: false,
      selected_key: "",
      detailDialogVisible: false,
      formDialogVisible: false,
      choiceAll: [],
      pickerOptions: {
        disabledDate: time => {
          return time > new Date();
        }
      }
    };
  },

  methods: {
    exportExel(id, name) {
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      var wb = XLSX.utils.table_to_book(
        document.querySelector(`#outTable${id}`),
        xlsxParam
      );
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
          `${name}报表.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },

    Company() {
      publicServer.findCompanyList(
        {},
        res => {
          this.groupList = res.data;
        },
        () => {}
      );
    },
    date_select(val) {     
      // this.date_start_search=this.date_search[0];
      // this.date_end_search=this.date_search[1];
    },
    depart_select(val) {
      var obj = {};
      obj = this.groupList.find(function(item) {
        return item.id === val;
      });

      this.search_branchName = obj.branchName;
    },

    selected(item) {
      this.searchForm.id = item.id;
      this.searchForm.pageType = item.id - 1;
      this.active = item.name;
      if (item.id==2) {
        this.loadList2();
      }
      if (item.id==3) {
        this.loadList3();
      }
      // console.log(this.searchForm.id)
    },
    loadList() {
      this.isLoading = true;
      attendanceServer.attendanceMonthFind(
        this.searchForm,
        res => {
          this.isLoading = false;
          this.tableData1 = res.data;
        },
        () => {
          this.isLoading = false;
        }
      );
    },
    loadList2(){
      this.isLoading = true;
        attendanceServer.attendanceMonthFind(
          this.searchForm,
          res => {
            this.isLoading = false;
            this.tableData2 = res.data;
          },
          () => {
            this.isLoading = false;
          }
        );
    },
    loadList3(){
      this.isLoading = true;
        attendanceServer.attendanceMonthFind(
          this.searchForm,
          res => {
            this.isLoading = false;
            this.tableData3 = res.data;
          },
          () => {
            this.isLoading = false;
          }
        );
    },
    renderheader(h, { column }) {
      let header = column.label.split("/");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    },
    search(id) {
      this.searchForm.startDate=this.date_search[0];
      this.searchForm.endDate=this.date_search[1];
      if (id==1) {     
        this.loadList();
      }else if (id==2) {
        this.loadList2();
      }else if (id==3) {
        this.loadList3();
      }
    },
    handleReset(id) {
      this.date_search='';
      if (id==1) { 
        this.searchForm={id:1,pageType:0}    
        this.loadList();
      }else if (id==2) {
        this.searchForm={id:2,pageType:1}
        this.loadList2();
      }else if (id==3) {
        this.searchForm={id:3,pageType:2}
        this.loadList3();
      }
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 15px;
}
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}
.el-table .cell {
  white-space: pre-line;
}
</style>
