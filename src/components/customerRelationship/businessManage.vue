<template>
  <div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register" style="margin-bottom:10px">新增商家</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="状态">
            <el-select v-model="searchForm.state " placeholder="请选择">
              <el-option label="开发" value="1"></el-option>
              <el-option label="跟进" value="2"></el-option>
              <el-option label="谈判" value="3"></el-option>
              <el-option label="审批" value="4"></el-option>
              <el-option label="签订" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.key" placeholder="商家名称、联系人"></el-input>
          </el-form-item>
          <el-form-item label="到期日期">
            <el-date-picker
              v-model="date_search"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search" style="width:6.2857rem">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset" style="width:6.2857rem">重置</el-button>
      </div>
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData">
        <el-table-column label="商家名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="地址" prop="address" show-overflow-tooltip></el-table-column>
        <el-table-column label="联系人" prop="contact" show-overflow-tooltip></el-table-column>
        <el-table-column label="联系电话" prop="tel" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" prop="state" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.state==1">开发</span>
            <span v-if="scope.row.state==2">跟进</span>
            <span v-if="scope.row.state==3">谈判</span>
            <span v-if="scope.row.state==4">审批</span>
            <span v-if="scope.row.state==5">签订</span>
          </template>
        </el-table-column>
        <el-table-column label="到期日期" prop="dueDate" show-overflow-tooltip></el-table-column>
        <el-table-column label="是否续签" prop="isRenew" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.isRenew==1">是</span>
            <span v-if="scope.row.isRenew==2">否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="240">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="view(scope.row.id)">查看下级</el-button>
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
    <businessForm
      :title="title"
      :dialog-visible="businessFormVisible"
      @close-dialog="closeDialog"
      @submit-success="businessAddSuc"
      :isAdd="isAdd"
      :rowList="businessList"
      :file="fileList"
      :imgList="imgList"
    ></businessForm>
  </div>
</template>

<script>
import businessForm from "./business-form";
import businessServer from '../../api/business'
export default {
  name: "",
  components: {
    businessForm
  },
  data() {
    return {
      searchForm: { page: 1, pageSize: 10,type:1,id:this.$route.query.id },
      tableData: [],
      date_search: "",
      // pickerOptions: {
      //   disabledDate: time => {
      //     return time > new Date();
      //   }
      // },
      isLoading: false,
      total:0,
      currentPage:1,
      businessFormVisible: false,
      businessList: {},
      isAdd: null,
      title: "",
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
        businessServer.businessFind(this.searchForm,res=>{
            this.isLoading = false;
            this.tableData=res.data.list;
            this.total=res.data.total;
            this.currentPage=res.data.pageNum;
        },()=>{
            this.isLoading = false;
        })
    },
    register(){
      this.title = "新增商家";
      this.isAdd = 1;
      this.businessFormVisible = true;
      this.businessList={};
      this.imgList=[];
      this.fileList=[];
    },
    search() {
        this.searchForm.startDate=this.date_search[0];
        this.searchForm.endDate=this.date_search[1];
        this.loadList();
    },
    view(id){
      this.$router.push({
           path:'/channelManage',
           query: {id: id}
         })
    },
    detail(id){
        this.title = "商家详情";
        this.isAdd = 2;
        this.businessFormVisible = true;
        businessServer.businessDetail(id,res=>{
            this.businessList=res.data;
            
        },()=>{})
    },
    update(id){
      this.title = "商家修改";
        this.isAdd = 3;
        this.businessFormVisible = true;
        businessServer.businessDetail(id,res=>{
            this.businessList=res.data;
            this.fileList=this.businessList.attachments;
            this.imgList=this.fileList;
        },()=>{})
    },
    handleDelete(id){
        this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          businessServer.businessDel(id,res=>{
            this.$message.success("删除成功")
            this.loadList();
          },()=>{})
          
        })
        .catch(() => {});
    },
    handleReset() {
      this.searchForm = { page: 1, pageSize: 10,type:1};
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
      this.businessFormVisible = false;
    },
    businessAddSuc(){
      this.loadList();
    },
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "商家管理", path: "/businessManage", params: null }
    ]);
  },
  mounted() {
    this.loadList();
  }
};
</script>

<style lang="less" scoped>
</style>

