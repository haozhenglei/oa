<template>
  <div class="role-list">
    <div class="search-box">
      <div class="left-form">
      <el-form :inline="true" label-width="" size="small" @submit.native.prevent>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.keyword" placeholder="请输入用户姓名" ></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="searchForm.loginTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <div class="handle-box">
      <!--<el-button type="primary" size="small" @click="handleAdd">新增账号</el-button>-->
      <!--      <el-button type="danger" size="small" @click="deleAll">批量删除</el-button>-->
    </div>

    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData.list" @selection-change="choice">
        <!--        <el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column label="登录账号" prop="acccount" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="日志详情" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="登录IP" prop="remoteAddr" show-overflow-tooltip></el-table-column>
        <el-table-column label="登录时间" prop="loginTime" show-overflow-tooltip></el-table-column>

      </el-table>

      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                     :current-page="tableData.currentPage" :page-size="searchForm.pageSize" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import publicServer from '../../api/public'

  export default {
    name: "loginLog",
    components: {

    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '登录日志', path: '', params: null},
        // {name: '品牌管理', path: '', params: null}
      ])
    },
    mounted() {
      this.loadList();
    },
    computed: {
      pageAllSize: function () {
        return this.$store.state.Public.pageAllSize;
      }
    },

    props: {
      activeName: {
        type: String,
        default: ''
      },
      tabName: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        row:{},
        isLoading: false,
        isAdd: 1,
        searchForm: {
          page:1,
          pageSize:10,
          // token:localStorage.getItem('adminToken')
        },
        rowId: null,
        roleTree: [],
        treeList: [],
        value:'',
        tableData:{},
        detailDialogVisible: false,
        formDialogVisible: false,
        choiceAll:[],
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.searchForm.endTime;
            if (beginDateVal) {
              return time.getTime() > new Date(beginDateVal).getTime();
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.searchForm.startTime;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime() ;
            }
          }
        },
      }
    },


    methods: {
      choice(item){
        var arr = [];
        for(let e of item){
          arr.push(e.id)
        }
        this.choiceAll = arr
      },
      closeD(){
        this.row = {};
        this.formDialogVisible=false;

      },
      search(){
        this.searchForm.page = 1;
        this.loadList();
      },
      loadList() {
        this.isLoading = true;
        publicServer.loginLogs(this.searchForm, res => {
          this.isLoading = false;
          this.tableData = res.data;
        }, () => {
          this.isLoading = false;
        })
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
      upd(item){
        publicServer.accountOpen({
          id:item.id,
          openStatus:item.openStatus,
        }, res => {
          this.$message.success(res.msg);
          this.loadList()
        }, (res) => {
          if(res.code !== 200){
            this.$message.success(res.msg);
            this.loadList()
          }

        })
      },
      handleReset() {
        this.searchForm = {page:1,pageSize:10};
        this.loadList();
      },




    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 15px;
  }
</style>
