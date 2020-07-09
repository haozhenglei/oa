<template>
  <div class="role-list">
    <div class="depart">
      <div class="depart-left">
        <div  class="depart-top">
          <p  size="small"   :class="{active : active === 1}" @click="selected(1)">组织架构</p>
          <p  size="small"   :class="{active : active === 2}" @click="selected(2)">职位管理</p>
        </div>

        <div v-if="active === 1">
          <div  class="manage">
            <p @click="addSon">新增部门</p>
            <p @click="changeD">调整部门</p>
          </div>
          <el-tree :highlight-current=true :data="data2" :props="defaultProps2" @node-click="handleNodeClick2"></el-tree>
        </div>
        <div v-show="active === 2">
          <div  class="manage">
            <p @click="handAdd">新增分组</p>
            <p @click="partAdd">新增职位</p>
          </div>
          <el-tree :highlight-current=true :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
      <div class="depart-right">
        <div class="title">
           <h2>{{companyOne.branchName}}</h2>
           <p @click="setup">设置</p>
        </div>
        <div class="search-box">
          <div class="left-form">
            <el-form :inline="true" label-width="" size="small" @submit.native.prevent>
              <el-form-item label="">
                <el-input v-model="searchForm.query" placeholder="姓名，电话" ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="right-handle">
            <el-button type="primary" size="small" @click="search">搜索</el-button>
            <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
          </div>
        </div>
        <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
          <el-table :data="tableData.list" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="手机号码(账号)" prop="phone" show-overflow-tooltip></el-table-column>
            <el-table-column label="职位" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" show-overflow-tooltip width="200">
              <template slot-scope="scope">
                <!--<el-button type="text" size="small"  @click="resetPwd(scope.row.id)">重置密码</el-button>-->
                <el-button type="text" size="small"  @click="handleView(scope.row)">查看</el-button>
                <el-button type="text" size="small"  @click="handleBack(scope.row.id)">离职</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                         :current-page="tableData.currentPage" :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                         @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <department-form :dialog-visible="formDialogVisible" :title="title"
                 @submit-success="loadList"
                 @close-dialog="closeD"></department-form>
    <department-new :dialog-visible="formDialogVisible2" :title="title" :treeData="data2" :idList="idList" :companyOne="companyOne"
                 @submit-success="successLoad"
                 @close-dialog="closeD"></department-new>

    <staff-form :dialog-visible="formDialogVisible3" :rowList="row" :is-add="isAdd" :groupList="groupList" :positionList="positionList"
                @submit-success="loadList3"
                @close-dialog="formDialogVisible3 = false"></staff-form>
  </div>
  <!---->
</template>

<script>
    import departmentForm from "./department-form";
    import staffForm from "../staff/staff-form";
    import publicServer from '../../api/public'
    import staffServer from '../../api/staff'
    import departmentNew from "./department-new";
    export default {
      name: "department",
      components: {
        departmentForm,departmentNew,staffForm
      },
      created() {
        this.$store.dispatch('changeBreadcrumb', [
          {name: '部门管理', path: '/approval', params: null},
        ])
      },
      mounted() {
        this.loadList();
        this.loadList2();
        this.loadList3();
        this.Company();
        this.group();
      },
      computed: {
        pageAllSize: function () {
          return this.$store.state.Public.pageAllSize;
        }
      },
      data() {
        return {
          companyOne:{
            branchName:''
          },
          formDialogVisible:false,
          formDialogVisible2:false,
          formDialogVisible3:false,
          title:'',
          isLoading:false,
          searchForm:{
            page:1,
            pageSize:10,
            isDimission:0
          },
          isAdd:3,
          tableData:{},
          data: [],
          data2: [],
          groupList: [],
          positionList: [],
          defaultProps: {
            children: 'roles',
            label: 'name'
          },
          defaultProps2: {
            children: 'childBranchs',
            label: 'nameNum'
          },
          active:1,
          idList:[],
          row:{}
        }
      },


      methods: {
        successLoad(){
           this.loadList2();
           this.loadList3();
        },
        loadList(){
          publicServer.findGroupList({}, res => {
            this.isLoading = false;
            this.data = res.data;
          }, () => {
            this.isLoading = false;
          })
        },
        loadList2(){
          publicServer.findCompanyTreet({}, res => {
            this.isLoading = false;
            this.companyOne = res.data[0];
            this.aab(res.data);
            this.data2 = res.data;
            console.log(this.data2)
          }, () => {
            this.isLoading = false;
          })
        },
        aab(array){
           if(array){
             for (let item of array){
               item.isExpanded = true;
               item.nameNum = item.branchName + ' （'+item.num+'人）';
               if(item.childBranchs){
                 this.aab(item.childBranchs)
               }
             }
           }
        },
        loadList3(){
          this.isLoading = true;
          staffServer.queryUserList(this.searchForm, res => {
            this.isLoading = false;
            this.tableData = res.data;
          }, () => {
            this.isLoading = false;
          })
        },
        handleSelectionChange(item){
          this.idList = item.map(function (e) {
                return e.id
          });
        },
        Company() {
          publicServer.findCompanyList({}, (res) => {
            this.groupList = res.data
          }, () => {
          });
        },
        group() {
          publicServer.listDrop({}, res => {
            this.positionList = res.data;
          }, () => {

          })
        },
        handleView(item){
          this.isAdd = 3;
          this.formDialogVisible3 = true;
          this.row = JSON.parse(JSON.stringify(item));
        },
        handleBack(id){
          this.$confirm('你确定该员工离职吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            staffServer.userStatus({id: id}, () => {
              this.$message.success('离职成功');
              this.loadList3();
            });
          }).catch(() => {
          });
        },
        search(){
          this.searchForm.page = 1;
          this.loadList3();
        },
        handleReset() {
          this.searchForm = {page:1,pageSize:10,isDimission:0};
          this.loadList3();
        },
        handAdd(){
          this.title = '新增职位分组';
          this.formDialogVisible = true
        },
        partAdd(){
          this.title = '新增职位';
          this.formDialogVisible = true
        },
        addSon(){
          this.title = '新增部门';
          this.formDialogVisible2 = true
        },
        setup(){
          this.title = '编辑部门';
          this.formDialogVisible2 = true
        },
        changeD(){
          if(this.idList.length) {
            this.title = '调整部门';
            this.formDialogVisible2 = true
          }else{
            this.$message.warning('请先勾选员工')
          }

        },
        closeD(){
          this.formDialogVisible = false;
          this.formDialogVisible2 = false;

        },
        selected(item){
           this.active = item;
        },
        handleNodeClick(data) {
          console.log(data);
          if(data.groupId){
            this.searchForm.roleId = data.id;
            this.searchForm.groupId = null;
            this.searchForm.branchId = null;
            this.loadList3();
          }else{
            this.searchForm.roleId = null;
            this.searchForm.groupId = data.id;
            this.searchForm.branchId = null;
            this.loadList3();
          }
        },
        handleNodeClick2(data) {
          console.log(data);
          this.companyOne = data;
          this.searchForm.branchId = data.id;
          this.searchForm.roleId = null;
          this.searchForm.groupId = null;
          this.loadList3();
        },
        handleSizeChange(pageSize) {
          this.searchForm.page = 1;
          this.searchForm.pageSize = pageSize;
          this.loadList3();
        },
        handleCurrentChange(pageNum) {
          this.searchForm.page = pageNum;
          this.loadList3();
        },
      }
    }
</script>

<style scoped lang="less">
.depart{
  display: flex;
  .depart-top{
    margin-bottom:18px;display: flex;
    p{
      cursor: pointer;
       padding: 10px 0;
        flex: 1;
        border: 1px solid #2a82e4;
        color: #2a82e4;
      text-align: center;
    }
    .active {
      background: #2a82e4;
      color: #fff;
    }
  }

  .depart-left{
    width: 250px;
    border-right: 1px solid gainsboro;
    .manage{
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      p{
        padding: 5px 20px ;
        color:#2a82e4 ;
        border:1px solid #2a82e4;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .depart-right{
     padding-left: 20px;
    flex:1 1 auto;
    .title{
      display: flex;
      margin-bottom: 20px;
      align-items: flex-end;
      p{
        border-radius: 5px;
        margin-left: 20px;
        font-size: 12px;
        background: #2a82e4;
        color: white;
        padding: 1px 8px;
      }
    }
    .add{
      cursor: pointer;
      margin: 20px 0;
      display: inline-block;
      padding: 10px ;
      background: #2a82e4;
      color: white;
      /*text-align: center;*/
    }
  }

}
</style>
