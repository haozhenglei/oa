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
              <el-input v-model="searchForm.wordkey" placeholder="审批名称" ></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="searchForm.isDeploy" placeholder="是否部署">
                <el-option  label="未部署" :value=0 ></el-option>
                <el-option  label="已部署" :value=1 ></el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
        <div class="right-handle">
          <el-button type="primary" size="small" @click="search">搜索</el-button>
          <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
        </div>
      </div>

      <div class="handle-box">
        <el-button type="primary" size="small" @click="handleAdd">新建审批流程</el-button>
        <!-- <el-button type="primary" size="small" @click="handleList">审批列表</el-button>
        <el-button type="primary" size="small" @click="liuChengType">流程类别</el-button> -->
      </div>

      <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
        <el-table :data="tableData" @selection-change="choice">
          <el-table-column type="index" width="55"></el-table-column>
          <el-table-column label="审批名称" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="提交时间" prop="created" show-overflow-tooltip></el-table-column>
          <el-table-column label="创建人" prop="createdBy" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column label="部门" prop="branchName" show-overflow-tooltip></el-table-column> -->
          <el-table-column label="是否部署" prop="isDeploy" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="scope.row.isDeploy === 1">是</p>
              <p v-else-if="scope.row.isDeploy === 0">否</p>
            </template>
          </el-table-column>
          <el-table-column label="图标" prop="comment" show-overflow-tooltip>
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" alt="" width="50" height="50">
            </template>
          </el-table-column>
          <el-table-column label="流程类型" prop="categoryTypes" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column label="运营类型" prop="comment" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="scope.row.oprateType === 1">媒体运营</p>
              <p v-else-if="scope.row.oprateType === 0">基础运营</p>
            </template>
          </el-table-column> -->
          <el-table-column label="权限类别" prop="authType" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="scope.row.authType === 0">所有人</p>
              <div v-else>
                <span v-for="(item,index) in groupList" :key="index">
                  <p v-if="scope.row.authType===item.id">{{item.branchName}}</p>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <!--<el-button type="text" size="small"  @click="handleView(scope.row)">查看</el-button>-->
              <el-button type="text" size="small"  @click="handleView(scope.row)">编辑</el-button>
              <el-button type="text" size="small"  @click="deploy(scope.row.modelId)">部署</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                       :current-page="tableData.currentPage" :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="display: flex;flex: 1;font-size: 15px">
              <p style="flex: 1">基础审批（1）</p>
              <p style="color: #2a82e4;font-weight: bold;margin-right: 10px">编辑</p>
            </div>

          </template>
          <div class="contend">
             <div class="contend-left">
               <img src="../../assets/img/u444.png" alt="" style="width: 80px;height: 80px">
               <div>
                 <p>合同审批</p>
                 <p style="font-size: 13px">备注说明</p>
               </div>
             </div>
            <div class="contend-right">
               <div style="flex: 1">
                  <p style="margin-bottom: 20px">可见范围</p>
                  <p>所有人 <span class="blue" style="margin-left: 10px">修改</span></p>
               </div>
               <p class="blue" @click="handleAdd">编辑</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>



    <approval-form :dialog-visible="formDialogVisible" :rowList="row" :is-add="isAdd"
                 @submit-success="loadList"
                 @close-dialog="closeD"></approval-form>
    <approval-table :dialog-visible="formDialogVisible2"   :row="row"
                 @submit-success="loadList"
                 @close-dialog="formDialogVisible2 = false"></approval-table>
    <el-dialog width="600px" title="新增流程类别" :visible.sync="dialogLiuChengVisible">
      <el-form :model="liuChengform">
        <el-form-item label="流程名称" :label-width="formLabelWidth">
          <el-input v-model="liuChengform.name" autocomplete="off" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="liuChengform.discreption" autocomplete="off" placeholder="输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLiuChengVisible = false">取 消</el-button>
        <el-button type="primary" @click="liuChengSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import appServer from '../../api/approval'
  import publicServer from '../../api/public'
  import baseUrl from '../../assets/js/baseurl'
  import approvalForm from "./approval-form";
  import approvalTable from "./approval-table";
  export default {
    name: "approval",

    components: {
      approvalForm,approvalTable
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '审批管理', path: '/approval', params: null},
        // {name: '品牌管理', path: '', params: null}
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
        activeNames:['1'],
        row:{},
        isLoading: false,
        isAdd: 1,
        searchForm: {
          page:1,
          pageSize:10,
          // token:localStorage.getItem('adminToken')
        },
        active:1,
        groupList:[],
        rowId: null,
        roleTree: [],
        value:'',
        tableData: [],
        detailDialogVisible: false,
        formDialogVisible: false,
        formDialogVisible2: false,
        dialogLiuChengVisible:false,
        liuChengform:{},
        formLabelWidth:'120px',
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
      selected(item){
        this.searchForm.page = 1;
        this.active = item;
        // this.loadList();
      },
      Company() {
        publicServer.findCompanyList({}, (res) => {
          this.groupList = res.data
        }, () => {
        });
      },
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
        appServer.models(this.searchForm, res => {
          this.isLoading = false;
          for(let item of res.data){
            switch (item.categoryType) {
              case 0:
                item.categoryTypes = '人事';
                break;
              case 1:
                item.categoryTypes = '市场';
                break;
              case 2:
                item.categoryTypes = '行政';
                break;
              case 3:
                item.categoryTypes = '财务';
                break;
              default:
                item.categoryTypes = '';
                break;
            }
          }
          this.tableData = res.data;
          console.log(this.tableData)
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

      handleView(item) {
        this.row = JSON.parse(JSON.stringify(item));
        this.formDialogVisible2 = true;
      },
      deploy(id){
        appServer.repeat({modelId:id}, res => {
             this.$message.success('部署成功')
        }, () => {

        })
      },
      handleAdd() {
        // console.log(baseUrl.dataUrl())
        let url = baseUrl.approvalUrl() + '?id='+localStorage.getItem('adminToken');
        window.open(url);
        // this.isAdd = 1;
        // this.formDialogVisible = true;
      },
      handleList(){
         this.$router.push({
           path:'/approvalList'
         })
      },
      liuChengType(){
        // this.dialogLiuChengVisible=true;
        this.$router.push({
           path:'/approvalType'
         })
      },
      liuChengSure(){
        // this.dialogLiuChengVisible=false;
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
          publicServer.delUser({uid: id}, () => {
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
          publicServer.resetPwd({uid: id}, () => {
            this.$message.success('重置成功');
            this.loadList();
          });
        }).catch(() => {
        });
      }
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
