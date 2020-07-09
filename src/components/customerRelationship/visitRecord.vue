<template>
  <div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register" style="margin-bottom:10px">新增</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="商家名称">
            <el-input v-model="searchForm.merchantsName" placeholder="商家名称"></el-input>
          </el-form-item>
          <el-form-item label="拜访日期">
            <el-date-picker
              v-model="date_search"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData">
        <el-table-column label="拜访日期" prop="visitDate" show-overflow-tooltip></el-table-column>
        <el-table-column label="拜访方式" prop="visitWay" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-if="scope.row.visitWay==1">上门拜访</span>
                <span v-if="scope.row.visitWay==2">电话拜访</span>
            </template>
        </el-table-column>
        <el-table-column label="拜访商家/渠道" prop="merchantsName" show-overflow-tooltip>
            <!-- <template slot-scope="scope">
                <span v-for="(item,index) in businessOrChannelList" :key="index">
                  <p v-if="parseInt(scope.row.merchantsName)===item.name">{{item.name}}</p>
                </span>
            </template> -->
        </el-table-column>
        <el-table-column label="拜访地址" prop="visitAddress" show-overflow-tooltip></el-table-column>
        <el-table-column label="受访人" prop="respondents" show-overflow-tooltip></el-table-column> 
        <el-table-column label="拜访结果" prop="visitResult" show-overflow-tooltip>
            <template slot-scope="scope">
                <span v-if="scope.row.visitResult==1">拜访成功</span>
                <span v-if="scope.row.visitResult==2">拜访失败</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="240">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">详情</el-button>
            <el-button type="text" size="small" @click="update(scope.row.id)">修改</el-button>
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
    <visitRecordForm
      :title="title"
      :dialog-visible="visitRecordFormVisible"
      @close-dialog="closeDialog"
      @submit-success="visitRecordAddSuc"
      :isAdd="isAdd"
      :rowList="visitRecordList"
      :file="fileList"
      :imgList="imgList"
    ></visitRecordForm>
  </div>
</template>

<script>
import visitRecordForm from "./visitRecord-form";
import businessServer from '../../api/business'
export default {
  name: "",
  components: {
    visitRecordForm
  },
  data() {
    return {
      searchForm: { page: 1, pageSize: 10},
      tableData: [],
      date_search: "",
      pickerOptions: {
        disabledDate: time => {
          return time > new Date();
        }
      },
      isLoading: false,
      total:0,
      currentPage:1,
      visitRecordFormVisible: false,
      visitRecordList: {},
      isAdd: null,
      title: "",
      searchForm1: { page: 1, pageSize: 100},
      businessOrChannelList:[],
      fileList:[],
      imgList:[],
    };
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
    }
  },
  methods: {
    loadList() {
        this.isLoading = true;
        businessServer.visitRecordFind(this.searchForm,res=>{
            this.isLoading = false;
            this.tableData=res.data.list;
            this.total=res.data.total;
            this.currentPage=res.data.pageNum;
        },()=>{
            this.isLoading = false;
        })
    },
    businessOrChannel(){
        businessServer.businessFind(this.searchForm,res=>{
            this.businessOrChannelList=res.data.list;
            // console.log(this.businessOrChannelList)
        },()=>{})
    },
    register(){
      this.title = "新增拜访记录";
      this.isAdd = 1;
      this.visitRecordFormVisible = true;
      this.visitRecordList={};
      this.imgList=[];
      this.fileList=[];
    },
    search() {
        this.searchForm.startDate=this.date_search[0];
        this.searchForm.endDate=this.date_search[1];
        this.loadList();
    },
    detail(id){
      this.title = "详情";
      this.isAdd = 2;
      this.visitRecordFormVisible = true;
      businessServer.visitRecordDetail(id,res=>{
          this.visitRecordList=res.data
      },()=>{})
    },
    update(id){
      this.title = "修改";
        this.isAdd = 3;
        this.visitRecordFormVisible = true;
        businessServer.visitRecordDetail(id,res=>{
            this.visitRecordList=res.data;
            this.fileList=this.visitRecordList.imgs;
            this.imgList=this.fileList;
        },()=>{});
        
    },
    handleDelete(id){
        this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          businessServer.visitRecordDel(id,res=>{
            this.$message.success("删除成功")
            this.loadList();
          },()=>{})
          
        })
        .catch(() => {});
    },
    handleReset() {
      this.searchForm = { page: 1, pageSize: 10 };
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
      this.visitRecordFormVisible = false;
    },
    visitRecordAddSuc(val){
      this.loadList();
    },
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "拜访记录", path: "/visitRecord", params: null }
    ]);
  },
  mounted() {
    this.loadList();
    this.businessOrChannel();
  }
};
</script>

<style lang="less" scoped>
</style>

