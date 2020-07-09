<template>
  <div class="role-list">
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width="" size="small" @submit.native.prevent>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.filter" placeholder="姓名，手机号" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>

    <div class="handle-box">
      <el-button type="primary" size="small" @click="handleAdd">新增账号</el-button>
      <!--      <el-button type="danger" size="small" @click="deleAll">批量删除</el-button>-->
    </div>

    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData.list" @selection-change="choice">
        <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="手机号" prop="phone" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="账号" prop="account" show-overflow-tooltip></el-table-column>
        <el-table-column label="角色" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="添加时间" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="账号启用状态"  show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch  v-model="scope.row.openStatus" :active-value=1 :inactive-value=0 active-color="#13ce66" inactive-color="#ff4949" @change="upd(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="resetPwd(scope.row.id)">重置密码</el-button>
            <!--<el-button type="text" size="small"  @click="handleView(scope.row)">编辑</el-button>-->
            <el-button type="text" size="small"  @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                     :current-page="tableData.currentPage" :page-size="searchForm.pageSize" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>


    <account-form :dialog-visible="formDialogVisible" :rowList="row" :is-add="isAdd"
                 @submit-success="loadList"
                 @close-dialog="closeD"></account-form>
  </div>
</template>

<script>
  import publicServer from '../../api/public'
  import accountForm from "./account-form";
  export default {
    name: "account",
    components: {
      accountForm
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '账号管理', path: '', params: null},
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
        value:'',
        tableData: {},
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
        publicServer.findAccount(this.searchForm, res => {
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

      handleView(item) {
        this.isAdd = 3;
        this.formDialogVisible = true;
        this.row = JSON.parse(JSON.stringify(item));
      },

      handleAdd() {
        this.isAdd = 1;
        this.formDialogVisible = true;
      },

      handleEdit(id) {
        this.isAdd = 2;
        this.formDialogVisible = true;
        this.rowId = id;
      },
      // deleAll(){
      //   if(this.choiceAll.length){
      //     this.$confirm('你确定删除所选全部品牌吗？', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       commodityServer.goodsBrandDelete({ids:this.choiceAll}, () => {
      //         this.$message.success('删除成功');
      //         this.loadList();
      //       });
      //     }).catch(() => {
      //     });
      //   }else{
      //     this.$message.warning('请选择相应品牌');
      //   }
      //
      // },
      handleDelete(id){
        this.$confirm('你确定删除该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          publicServer.deleteAccount({id: id}, () => {
            this.$message.success('删除成功');
            this.loadList();
          });
        }).catch(() => {
        });
      },
      resetPwd(id){
        this.$confirm('你确定重置该用户密码吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          publicServer.accountReset({id: id}, () => {
            this.$message.success('重置成功');
            this.loadList();
          });
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 15px;
  }
</style>
