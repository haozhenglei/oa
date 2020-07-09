<template>
  <div class="role-list">
    <!--<div style="margin-bottom:18px">-->
    <!--<el-button  size="small"   :class="{active : active === 1}" @click="selected(1)">审批列表</el-button>-->
    <!--<el-button  size="small"   :class="{active : active === 2}" @click="selected(2)">审批流程管理</el-button>-->
    <!--</div>-->
    <div v-if="active === 1">
      <div class="search-box">
        <div class="left-form">
          <el-form :inline="true" label-width="" size="small" @submit.native.prevent>
            <el-form-item label="">
              <el-select v-model="searchForm.branchId" placeholder="请选择部门">
                <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker v-model="searchForm.findDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="searchForm.state" placeholder="审批结果">
                <el-option label="审核中" :value=1 ></el-option>
                <el-option label="审核通过" :value=2 ></el-option>
                <el-option label="审核驳回" :value=3 ></el-option>
                <el-option label="申请撤回" :value=4 ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="searchForm.keyword" placeholder="发起人" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="right-handle">
          <el-button type="primary" size="small" @click="search">搜索</el-button>
          <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
        </div>
      </div>


      <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
        <el-table :data="tableData.list" >
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column label="审批类型" prop="processName" show-overflow-tooltip></el-table-column>
          <el-table-column label="提交时间" prop="createTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="发起人" prop="startUser" show-overflow-tooltip></el-table-column>
          <el-table-column label="部门" prop="branchName" show-overflow-tooltip></el-table-column>
          <el-table-column label="审批结果"  show-overflow-tooltip>
            <template slot-scope="scope">
               <span v-if="scope.row.state === 1">审核中</span>
               <span v-else-if="scope.row.state === 2" style="color: #2d63e7">审核通过</span>
               <span v-else-if="scope.row.state === 3" style="color:red">审核驳回</span>
               <span v-else-if="scope.row.state === 4" style="color: grey">申请撤回</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="handleView(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                       :current-page="tableData.currentPage" :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>




    <!---->
    <approval-table :dialog-visible="formDialogVisible" :instanceId="instanceId"
                    @close-dialog="formDialogVisible = false"></approval-table>
  </div>
</template>

<script>
  import appServer from '../../api/approval'
  import publicServer from '../../api/public'

  import approvalTable from "./list-table";
  export default {
    name: "approval",

    components: {
      approvalTable
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        // {name: '审批管理', path: '/approval', params: null},
        {name: '审批列表', path: '/approvalList', params: null}
      ])
    },
    mounted() {
      this.loadList();
      this.Company();
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
        appId:'',
        row:{},
        isLoading: false,
        isAdd: 1,
        searchForm: {
          page:1,
          pageSize:10,
          // token:localStorage.getItem('adminToken')
        },
        active:1,
        rowId: null,
        roleTree: [],
        value:'',
        tableData: {
          list:[{}]
        },
        detailDialogVisible: false,
        formDialogVisible: false,
        formDialogVisible2: false,
        choiceAll:[],
        groupList:[],
        instanceId:''
      }
    },


    methods: {
      search(){
        this.searchForm.page = 1;
        this.loadList();
      },
      Company() {
        publicServer.findCompanyList({}, (res) => {
          this.groupList = res.data
        }, () => {
        });
      },
      loadList() {
        this.isLoading = true;
        appServer.instanceList(this.searchForm, res => {
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

      handleReset() {
        this.searchForm = {page:1,pageSize:10};
        this.loadList();
      },

      handleView(id) {
        this.instanceId = id;
        this.formDialogVisible = true;
      },
    }
  }
</script>

<style scoped lang="less">
  .handle-box {
    margin-bottom: 15px;
  }
  .active {
    background: #2a82e4;
    border: 1px solid #2a82e4;
    color: #fff;
  }
  .contend{
    padding: 25px 20px 0;
    display: flex;
    font-size: 15px;
    .contend-left{
      display: flex;
      padding-right: 80px;
      border-right: 1px solid gainsboro;
      >div{
        margin-left: 15px;
        p:first-child{
          margin: 20px 0 5px 0;
        }
      }
    }
    .contend-right{
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 40px;
      .blue{
        color: #2a82e4;
        cursor: pointer;
      }

    }
  }


</style>
