<template>
  <div>
    <div class="top">
      <div><el-button type="plain" size="small" @click="fanhui">返回</el-button></div>
      <div>{{this.$route.query.name}}-{{this.$route.query.assesstime}}</div>
      <div><el-button type="primary" size="small" @click="exportExel">导出</el-button></div>
    </div>
    
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table id="outTable" :data="tableData" min-height="150" show-summary :summary-method="getSummaries">
        <!-- <el-table-column label="序号" prop="id" show-overflow-tooltip min-width="10%"></el-table-column> -->
        <el-table-column label="指标名称" prop="name" show-overflow-tooltip min-width="10%"></el-table-column>
        <el-table-column label="分值" prop="score" show-overflow-tooltip min-width="10%"></el-table-column>
        <el-table-column label="目标值" prop="target" show-overflow-tooltip min-width="10%"></el-table-column>
        <el-table-column label="指标说明/计算方式" prop="goalExplain" show-overflow-tooltip min-width="15%"></el-table-column>
        <el-table-column label="完成数据" prop="finish" show-overflow-tooltip min-width="10%"></el-table-column>
        <el-table-column label="自评分" prop="meScore" show-overflow-tooltip min-width="10%"></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip min-width="25%">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            <!-- <el-button type="text" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="handleSelf(scope.row.id)">自评</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="display:flex;margin-left:10%;text-align:center;margin-top:2%">
        <div style="width:10%">总计</div>
        <div style="width:7%">100</div>
      </div> -->
    </div>
    <div style="display:flex;padding-top:5%">
      <div style="width:15%;display:flex;margin:0 auto">
        <el-button style="flex:1" type="primary" size="small" @click="handleAdd">新 增</el-button>
        <el-button style="flex:1" type="primary" size="small" @click="handleEdit">编 辑</el-button>
        <el-button style="flex:1" type="primary" size="small" @click="handleSelf">自 评</el-button>
      </div>
    </div>

    <performanceTable
      :title="title"
      :dialog-visible="performanceTableVisible"
      @close-dialog="closeDialog"
      @submit-success1="editSuccess"
      :isAdd="isAdd"
      :tableDataEdit="tableDataEdit"
      :tableDataSelf="tableDataSelf"
    ></performanceTable>
    <performanceForm 
      :title="titleForm"
      :dialog-visible="performanceFormVisible"
      @submit-success1="editSuccess"
      @close-dialog="closePerformanceDialog"
      :isAdd="formIsAdd"
      :formData0="formNewAdd"
    ></performanceForm>
  </div>
</template>

<script>
import performanceTable from "./performance-table";
import performanceForm from "./performance-form";
import performanceServer from "../../api/performance";
import FileSaver from "file-saver";
import baseUrl from '../../assets/js/baseurl'
import XLSX from "xlsx";
export default {
  name: "performanceDetail",
  data() {
    return {
      searchForm:{},
      tableData: [],
      tableDataEdit:[],
      tableDataSelf:[],
      isLoading: false,
      title: "",
      titleForm:'',
      performanceTableVisible: false,
      performanceFormVisible:false,
      isAdd: null,
      formIsAdd:null,
      // performanceTableList: {},
      dialogFormVisible: false,
      form: {},
      // formLabelWidth: "120",
      formRules: {},
      radio:1,
      textarea:'',
      name:this.$route.query.name,
      formNewAdd:{},
    };
  },
  components: {
    performanceTable,
    performanceForm
  },
  computed: {},

  methods: {
    loadList() {
      performanceServer.performanceTargetDetail({perid:this.$route.query.id,page:0,pageSize:10,keyword:''},res=>{
        this.tableData=res.data.list;
      },()=>{})
    },
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index==1 || index==5) {          
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += '';
            } else {
              // sums[index] = 'N/A';
            }
          }
        });

        return sums;
      },
    handleAdd(){
      this.formIsAdd = 0;
      this.titleForm = "新增";
      this.performanceFormVisible = true;
      // this.tableDataEdit=this.tableData;
      this.formNewAdd={
        perid:this.$route.query.id
      };
    },
    handleEdit() {
      this.isAdd = 2;
      this.title = "编辑";
      this.performanceTableVisible = true;
      this.tableDataEdit=this.tableData;
    },
    handleSelf() {
      this.isAdd = 3;
      this.title = "自评";
      this.performanceTableVisible = true;
      this.tableDataSelf=this.tableData;
    },
    // handleCheck() {
    //   this.dialogFormVisible = true;
    // },
    closeDialog() {
      this.performanceTableVisible = false;
    },
    closePerformanceDialog(){
      this.performanceFormVisible = false;
    },
    handleDelete(id) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          performanceServer.performanceTargetChildDel(
            {id:id},
            res => {
              this.$message.success("删除成功");
              this.loadList();
            },
            () => {}
          );
        })
        .catch(() => {});
    },
    // exportExel() {
    //   performanceServer.performanceTargetExport(this.$route.query.id,'绩效表格',()=>{})
    // },
     exportExel() {
        var queryForm = $("#queryCourseForm");
        var exportForm = $(`<form action='${baseUrl.dataUrl()}performance_target/export/${this.$route.query.id}' method='get'></form>`)
        exportForm.html(queryForm.html());
        $(document.body).append(exportForm);
        exportForm.submit();
        exportForm.remove();
    },
    editSuccess(){
      this.loadList();
    },
    fanhui(){
      this.$router.go(-1);
    },
  },

  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "绩效管理", path: "/performanceManagement", params: null },
      {name: '绩效详情', path: '/performanceDetail', params: null}
    ]);
  },
  mounted() {
    this.loadList();
  }
};
</script>

<style scoped lang="less">
.top{
  display: flex;
  justify-content: space-between;
  width: 99%;
  margin:8px auto;
}
</style>