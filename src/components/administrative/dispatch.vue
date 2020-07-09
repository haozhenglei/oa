<!--发文管理-->
<template >
  <div class="dispatch">
    <div class="search-box" style="margin-bottom:1.5%">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="sendFileRegister">发文登记</el-button>
      </div>
    </div>
    <div class="search-box">
      
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="秘密等级">
            <el-select v-model="searchForm.secretGrade" placeholder="请选择" @change="select_secret">
              <el-option label="秘密" value="1"></el-option>
              <el-option label="机密" value="2"></el-option>
              <el-option label="绝密" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.keyword" placeholder="文件名称、发往单位、文件编号"></el-input>
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
          <el-table-column label="文件编号" prop="fileNo" show-overflow-tooltip></el-table-column>
          <el-table-column label="文件名称" prop="fileName" show-overflow-tooltip></el-table-column>
          <el-table-column label="秘密等级" prop="secretGrade" show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.secretGrade==1">秘密</div>
              <div v-else-if="scope.row.secretGrade==2">机密</div>
              <div v-else-if="scope.row.secretGrade==3">绝密</div>         
            </template>
          </el-table-column>
          <el-table-column label="份数" prop="copies" show-overflow-tooltip></el-table-column>
          <el-table-column label="页数" prop="pages" show-overflow-tooltip></el-table-column>
          <el-table-column label="发文日期" prop="issueTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="签发人" prop="signSendUser" show-overflow-tooltip></el-table-column>
          <el-table-column label="发往单位" prop="signReceiveCompany" show-overflow-tooltip></el-table-column>
          <el-table-column label="签收人" prop="signReceiveUser" show-overflow-tooltip></el-table-column>
          <el-table-column label="签收日期" prop="signReceiveTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="备注" prop="comment" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="view(scope.row.id,scope.$index)">查看</el-button>
              <el-button type="text" size="small" @click="update(scope.row.id,scope.$index)">修改</el-button>
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
    <dispatchForm
      :title="title"
      :dialog-visible="dispatchFormVisible"
      @close-dialog="closeDialog"
      @submit-success="sendFileInsertSuc"
      :isAdd="isAdd"
      :rowList="dispatchList"
      :file="fileList"
      :imgList="imgList"
    ></dispatchForm>
  </div>
</template>
<script>
import dispatchForm from "./dispatch-form";
import documentServer from "../../api/document";
export default {
  name: "dispatch",
  components: {
    dispatchForm
  },
  data() {
    return {
      title: "登记",
      dispatchFormVisible: false,
      isAdd: null,
      dispatchList: {},
      dispatchUpdateList:{},
      total:0,
      currentPage:1,
      searchForm: {page:1,pageSize:10,sendType:0},
      tableData: [],
      isLoading: false,
      fileList:[],
      imgList:[],
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
        documentServer.sendFileListFind(this.searchForm, res => {
          this.isLoading = false;
          this.tableData = res.data.list;
          this.total=res.data.total;
          this.currentPage=res.data.pageNum;
        }, () => {
          this.isLoading = false;
        })
    },
    
    select_secret(val){
      // if (val==1) {
      //   this.secretValue=='秘密'
      // } else if(val==2) {
      //   this.secretValue=='机密'
      // }else if(val==3){
      //   this.secretValue=='绝密'
      // }
    },
    //搜索
    search() {
      this.loadList();
    },
    //重置
    handleReset() {
      this.searchForm={page:1,pageSize:10,sendType:0};
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
    //发文登记
    sendFileRegister(){
      this.isAdd=1;
      this.title='登记'
      this.dispatchFormVisible=true;
      this.dispatchList={};
      this.imgList=[];
      this.fileList=[];
    },
    //查看详情
    view(id,index) {
      this.isAdd = 2;
      this.dispatchFormVisible = true;
      this.title = "详情";     
      this.dispatchList=this.tableData[index];
    },
    //修改
    update(id,index) {
      this.isAdd = 3;
      this.dispatchFormVisible = true;
      this.title = "修改";   
      this.dispatchList=this.tableData[index];
      this.fileList=this.dispatchList.adjunctAdress.split(',');
      this.imgList=this.fileList;
    },
    handleDelete(id,index) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          documentServer.sendFiledel(id,res=>{
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
      this.dispatchFormVisible = false;
    },
    sendFileInsertSuc(val){
      this.loadList();
    }
  }
};
</script>
<style lang="less" scoped>
</style>