<!--固定资产-->
<template>
  <div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register" style="margin-bottom:10px">资产登记</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="资产类型">
            <el-select v-model="searchForm.propertyType " placeholder="请选择">
              <el-option label="办公类" value="1"></el-option>
              <el-option label="家具类" value="2"></el-option>
              <el-option label="生活类" value="3"></el-option>
              <el-option label="非生产性交通共军" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资产现状">
            <el-select v-model="searchForm.propertyStatus " placeholder="请选择">
              <el-option label="停用" value="1"></el-option>
              <el-option label="使用" value="2"></el-option>
              <el-option label="待修" value="3"></el-option>
              <el-option label="报废" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关键字">
            <el-input v-model="searchForm.keyword" placeholder="资产名称、领用人"></el-input>
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
        <el-table-column label="资产编号" prop="propertyNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="资产名称" prop="propertyName" show-overflow-tooltip></el-table-column>
        <el-table-column label="资产型号" prop="propertyModel" show-overflow-tooltip></el-table-column>
        <el-table-column label="资产类型" prop="propertyType" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.propertyType==1">办公类</span>
            <span v-if="scope.row.propertyType==2">家具类</span>
            <span v-if="scope.row.propertyType==3">生活类</span>
            <span v-if="scope.row.propertyType==4">非生产性交通工具</span>
          </template>
        </el-table-column>
        <el-table-column label="购置日期" prop="purchaseDate" show-overflow-tooltip></el-table-column>
        <el-table-column label="资产原值" prop="propertyValue" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>￥</span>
            <span>{{scope.row.propertyValue}}</span>
          </template>
        </el-table-column>
        <el-table-column label="资产现状" prop="status" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">停用</span>
            <span v-if="scope.row.status==2">使用</span>
            <span v-if="scope.row.status==3">待修</span>
            <span v-if="scope.row.status==4">报废</span>
          </template>
        </el-table-column>
        <el-table-column label="领用部门" prop="branchName" show-overflow-tooltip></el-table-column>
        <el-table-column label="领用人" prop="userName" show-overflow-tooltip></el-table-column>
        <el-table-column label="领用日期" prop="receiveDate" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="240">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="view(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="update(scope.row.id)">修改</el-button>
            <el-button type="text" size="small" @click="setReceiveUser(scope.row.id)">设置</el-button>
            <el-button type="text" size="small" @click="transfer(scope.row.id)">转移</el-button>
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
    <!-- 资产登记 / 详情 / 修改 -->
    <assetsForm
      :title="title"
      :dialog-visible="assetsFormVisible"
      @close-dialog="closeDialog"
      @submit-success="fixedAssetsAddSuc"
      :isAdd="isAdd"
      :rowList="assetsList"
      :staff="staffList"
    ></assetsForm>
  </div>
</template>
<script>
import assetsForm from "./assets-form";
import fixedAssetsServer from "../../api/fixedAssets";
import staffServer from "../../api/staff";
export default {
  name: "fixedAssets",
  components: {
    assetsForm
  },
  data() {
    return {
      searchForm: { page: 1, pageSize: 10 },
      searchForm1: { page: 1, pageSize: 100 },
      tableData: [],
      isLoading: false,
      assetsFormVisible: false,
      assetsList: {},
      isAdd: null,
      title: "",
      total:0,
      currentPage:1,
      staffList:[],
      // assetsTypeValue:'',
      // assetsStatusValue:'',
      // keyword:'',
    };
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
    }
  },
  created() {
    this.$store.dispatch('changeBreadcrumb', [
      {name: '固定资产管理', path: '/fixedAssets', params: null},
      
    ])
  },
  mounted() {
    this.loadList();
    this.staff();
  },
  methods: {
    loadList() {
      this.isLoading = true;
      fixedAssetsServer.fixedAssetsFind((this.searchForm),res=>{
        this.isLoading = false;
        this.tableData=res.data.list;
        this.total=res.data.total;
        this.currentPage=res.data.pageNum;
      },()=>{
        this.isLoading = false;
      })
    },
    staff() {
      staffServer.queryUserList(
        this.searchForm1,
        res => {
          this.staffList = res.data.list;
          // console.log(this.staffList)
        },
        () => {}
      );
    },
    register() {
      this.title = "资产登记";
      this.isAdd = 1;
      this.assetsFormVisible = true;
      this.assetsList={};
    },
    search(){
      this.loadList();
    },
    handleReset() {
      this.searchForm = { page: 1, pageSize: 10 };
      this.loadList();
    },
    view(id) {
      this.isAdd = 2;
      this.assetsFormVisible = true;
      this.title = "详情";
      fixedAssetsServer.fixedAssetsFindOne(id,res=>{
        this.assetsList=res.data;
      },()=>{})
    },
    update(id) {
      this.isAdd = 3;
      this.assetsFormVisible = true;
      this.title = "修改";
      fixedAssetsServer.fixedAssetsFindOne(id,res=>{
        this.assetsList=res.data;
      },()=>{})
    },
    setReceiveUser(id){
      this.isAdd = 5;
      this.assetsFormVisible = true;
      this.title = "设置领用人";
      fixedAssetsServer.fixedAssetsFindOne(id,res=>{
        this.assetsList=res.data;
      },()=>{})
    },
    transfer(id) {
      this.isAdd = 4;
      this.assetsFormVisible = true;
      this.title = "转移";
      fixedAssetsServer.fixedAssetsFindOne(id,res=>{
        this.assetsList=res.data;
      },()=>{})
    },
    handleDelete(id) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fixedAssetsServer.fixedAssetsDel(id,res=>{
            this.$message.success("删除成功")
            this.loadList();
          },()=>{})
          
        })
        .catch(() => {});
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
      this.assetsFormVisible = false;
    },
    fixedAssetsAddSuc(){
      this.loadList();
    },
  }
};
</script>
<style lang="less" scoped>
</style>