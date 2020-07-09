<template>
  <div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="考核时间">
            <el-date-picker
              v-model="searchForm.dateS"
              type="month"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio v-model="searchForm.status" label="0">待自评</el-radio>
            <el-radio v-model="searchForm.status" label="1">已自评</el-radio>
          </el-form-item>        
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search" style="width:6.2857rem">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset" style="width:6.2857rem">重置</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register">新增目标</el-button>
      </div>
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData" min-height="150">
        <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="职位" prop="merchantsName" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="考核时间" prop="assesstime" show-overflow-tooltip></el-table-column>
        <el-table-column label="提交时间" prop="submittime" show-overflow-tooltip width=""></el-table-column>
        <el-table-column label="状态" prop="status" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">待自评</span>
            <span v-if="scope.row.status==1">已自评</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="240">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row.id,scope.row.name,scope.row.assesstime)">详情</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page="currentPage"
          :page-size="searchForm.pageSize"
          :page-sizes="pageAllSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
    <performanceTable
      :title="title"
      :dialog-visible="performanceTableVisible"
      @close-dialog="closeDialog"
      @submit-success="performanceAddSuc"
      :isAdd="isAdd"
      :rowList="tableDataList"
      :creatMonthArr="creatMonthArr"></performanceTable>
  </div>
</template>

<script>
import performanceTable from "./performance-table";
import publicServer from "../../api/public";
import performanceServer from "../../api/performance";
export default {
  name: "performanceManagement",
  data() {
    return {
      searchForm:{page:1,pageSize:10,keyword:''},
      groupList:[],
      types:[],
      tableData:[],
      isLoading:false,
      title: "",
      performanceTableVisible: false,
      isAdd: null,
      // performanceTableList: {},
      tableDataList:[],
      total:0,
      currentPage:1,
      creatMonthArr:[],
    };
  },
  components: {
    performanceTable
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
    }
  },

  methods: {
    loadList(){
      this.isLoading=true;
      performanceServer.performanceTargetFind(this.searchForm,res=>{
        this.isLoading=false;
        this.tableData=res.data.list;
        this.total=res.data.total;
        this.currentPage=res.data.pageNum;
      },()=>{
        this.isLoading=false;
      })
    },
    // Company() {
    //     publicServer.findCompanyList({}, (res) => {
    //       this.groupList = res.data    
    //     }, () => {
    //     });
    //   },
    typeChange(val) {
      console.log(val);
    },
    register(){
      this.isAdd=1;
      this.title='目标规划';
      this.performanceTableVisible = true;
      this.tableDataList=[];
      this.tableData.map(item=>{
        this.creatMonthArr.push(item.assesstime)
      })
    },
    search(){
      this.loadList();
    },
    handleReset(){
      this.searchForm={page:1,pageSize:10}
      this.loadList();
    },
    handleCurrentChange(pageNum) {
      this.searchForm.page = pageNum;
      this.loadList();
    },

    handleSizeChange(pageSize) {
      this.searchForm.page = 1;
      this.searchForm.pageSize = pageSize;
      this.loadList();
    },
    closeDialog() {
      this.performanceTableVisible = false;
    },
    handleDetail(id,name,assesstime){
      this.$router.push({
        name:'performanceDetail',
        query:{id:id,name:name,assesstime:assesstime}
      })
    },
    handleDelete(id){
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          performanceServer.performanceTargetDel(id,res=>{
            if (res.code==200) {
              this.$message.success('删除成功')

              this.loadList();
            }else{
              this.$message.error('删除失败')
            }
            
          },()=>{})
        })
        .catch(() => {});
    },
    performanceAddSuc(){
      this.loadList();
    }
  },

  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "绩效管理", path: "/performanceManagement", params: null }
      // {name: '品牌管理', path: '', params: null}
    ]);
  },
  mounted() {
    this.loadList();
    // this.Company();
  }
};
</script>

<style scoped lang="less">


</style>