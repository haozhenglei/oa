<!--资料管理-->
<template>
  <div class="dataManagement">
    <div class="search-box" style="margin-bottom:1.5%">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="dataRegister">资料登记</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="资料状态">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option label="在库" :value="1"></el-option>
              <el-option label="借出" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.keyword" placeholder="资料名称、资料编号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search" style="width:6.2857rem">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset" style="width:6.2857rem">重置</el-button>
      </div>
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <div>
        <el-table :data="tableData">
          <el-table-column label="资料编号" prop="fileNo" show-overflow-tooltip></el-table-column>
          <el-table-column label="资料名称" prop="fileName" show-overflow-tooltip></el-table-column>
          <el-table-column label="资料状态" prop="status" show-overflow-tooltip>
            <template slot-scope="scope">
                <div v-if="scope.row.status==1">在库</div>
                <div v-else-if="scope.row.status==2">借出</div>
              </template>
          </el-table-column>
          <el-table-column label="备注" prop="comment" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="view(scope.row.id,scope.$index)">查看</el-button>
              <el-button v-if="scope.row.status==2" type="text" size="small" @click="borrow(scope.row.id,scope.row.status)">归还</el-button>
              <el-button v-if="scope.row.status==1" type="text" size="small" @click="borrow(scope.row.id,scope.row.status)">借阅</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 登记、详情 -->
    <dataManagementForm
      :title="title"
      :dialog-visible="dataFormVisible"
      @close-dialog="closeDialog"
      @submit-success="dataInsertSuc"
      :isAdd="isAdd"
      :rowList="dataList"
    ></dataManagementForm>
    <!-- 详情 -->
    <borrowForm :title="title" :dialog-visible="borrowFormVisible" @borrow-saveSuc="borrowSuc" @close-dialog="closeDialog2" :borrowid="borrowId" :staval="staVal"></borrowForm>
  </div>
</template>
<script>
import dataManagementForm from "./dataManagement-form";
import borrowForm from "./borrow-form";
import documentServer from "../../api/document";
export default {
  name: "dataManagement",
  name: "addressee",
  components: {
    dataManagementForm,
    borrowForm
  },
  data() {
    return {
      title: "",
      dataFormVisible: false,
      isAdd: null,
      dataList: {},
      total:0,
      currentPage:1,
      searchForm: { page: 1, pageSize: 10 },
      tableData: [],
      isLoading: false,
      borrowFormVisible: false,
      borrowId:null,
      staVal:null,
    };
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
    }
  },
  mounted() {
    this.loadList();
  },
  methods: {
    loadList() {
      this.isLoading = true;
        documentServer.dataListFind(this.searchForm, res => {
          this.isLoading = false;
          this.tableData = res.data.list;
          this.total=res.data.total;
          this.currentPage=res.data.pageNum;
        }, () => {
          this.isLoading = false;
        })
    },
    search() {
      this.loadList();
    },
    handleReset() {
      this.searchForm={ page: 1, pageSize: 10 };
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
    //资料登记
    dataRegister(){
      this.isAdd=1;
      this.title='登记'
      this.dataFormVisible=true;
    },
    //查看详情
    view(id,index) {
      this.isAdd = 2;
      this.dataFormVisible = true;
      this.title = "详情";
      if (this.is_search) {
        this.dataList=this.searchData[index]
      } else {
        this.dataList=this.tableData[index]
      }
      documentServer.dataDetail(id,res=>{
        console.log(res)
        this.dataList.list=res.data.list;
      },()=>{})
    },
    //借阅或者归还
    borrow(id,sta) {
      this.staVal=sta;
      this.borrowFormVisible = true;
      this.borrowId=id;
      if (sta==1) {
        this.title='借阅'
      }if (sta==2) {
        this.title='归还'
      }
    },
    handleDelete(id) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          documentServer.datadel(id,res=>{
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
    closeDialog() {
      this.dataFormVisible = false;
    },
    closeDialog2() {
      this.borrowFormVisible = false;
    },
    dataInsertSuc(){
      this.loadList();
    },
    borrowSuc(){
      this.loadList();
    }
  }
};
</script>
<style lang="less" scoped>
</style>