<template>
  <div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register" style="margin-bottom:10px">新增渠道</el-button>
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
            <el-input v-model="searchForm.key" placeholder="渠道名称、联系人"></el-input>
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
      <el-table :data="tableData" :cell-style="changeCellStyle">
        <el-table-column label="渠道名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="地址" prop="address" show-overflow-tooltip></el-table-column>
        <el-table-column label="渠道来源" prop="parentId" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="(item,index) in businessList" :key="index">
              <span v-if="scope.row.parentId==item.id" @click="viewFrom(item.id)">{{item.name}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="contact" show-overflow-tooltip></el-table-column>
        <el-table-column label="联系电话" prop="tel" show-overflow-tooltip></el-table-column>
        <el-table-column label="合同状态" prop="state" show-overflow-tooltip>
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
    <channelForm
      :title="title"
      :dialog-visible="channelFormVisible"
      @close-dialog="closeDialog"
      @submit-success="channelAddSuc"
      :isAdd="isAdd"
      :rowList="channelList"
      :file="fileList"
      :imgList="imgList"
    ></channelForm>
  </div>
</template>

<script>
import channelForm from "./channel-form";
import businessServer from '../../api/business'
export default {
  name: "",
  components: {
    channelForm
  },
  data() {
    return {
      searchForm: { page: 1, pageSize: 10,type:2,parentId:this.$route.query.id},
      searchForm1: { page: 1, pageSize: 100,type:1},
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
      channelFormVisible: false,
      channelList: {},
      isAdd: null,
      title: "",
      businessList:[],
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
    channelFrom(){
      businessServer.businessFind(this.searchForm1,res=>{
            this.businessList=res.data.list;
            // console.log(this.businessList)
        },()=>{})
    },
    register(){
      this.title = "新增渠道";
      this.isAdd = 1;
      this.channelFormVisible = true;
      this.channelList={};
      this.imgList=[];
      this.fileList=[];
    },
    search() {
        this.searchForm.startDate=this.date_search[0];
        this.searchForm.endDate=this.date_search[1];
        this.loadList();
    },
    viewFrom(id){
      this.$router.push({
           path:'/businessManage',
           query: {id: id}
         })
    },
    detail(id){
      this.title = "详情";
      this.isAdd = 2;
      this.channelFormVisible = true;
      businessServer.businessDetail(id,res=>{
          this.channelList=res.data
      },()=>{})
    },
    update(id){
      this.title = "修改";
        this.isAdd = 3;
        this.channelFormVisible = true;
        businessServer.businessDetail(id,res=>{
            this.channelList=res.data;
            this.fileList=this.channelList.attachments;
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
    changeCellStyle (row, column, rowIndex, columnIndex) {
      if(row.column.label === "渠道来源"){
          var obj={color:'#3551A2',fontWeight:'bold',cursor:'pointer'}
          return obj  // 修改的样式
      }else{
          return ''
      }
    },
    handleReset() {
      this.searchForm = { page: 1, pageSize: 10,type:2 };
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
      this.channelFormVisible = false;
    },
    channelAddSuc(val){
      // this.searchForm.parentId=val;
      this.loadList();
    },
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "渠道管理", path: "/channelManage", params: null }
    ]);
  },
  mounted() {
    this.loadList();
    this.channelFrom();
  }
};
</script>

<style lang="less" scoped>
</style>

