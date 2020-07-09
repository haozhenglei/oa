<template>
  <div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register" style="margin-bottom:10px">新建项目</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.key" placeholder="项目名称、项目经理"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search" style="width:6.2857rem">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset" style="width:6.2857rem">重置</el-button>
      </div>
    </div>
    <div class="projectList" >
      <div class="listOne" v-for="(item,index) in tableData" :key="index" @click="goDetail(item.id,item.projectManagerName,item.companyName,item.users)">
        <div style="display:flex;font-weight:bold;margin-bottom:2%;font-size:16px">
          <div style="flex:10">{{item.name}}</div>
          <div style="flex:1" @click.stop="deleteProject(item.id)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
        <div style="display:flex;justify-content: space-between;margin-top: 1%;align-items: center;">
          <div class="maAndPe">
            项目经理:
            <span>
              {{item.projectManagerName}}
            </span>
          </div>
          <div class="maAndPe">
            人员:
            <span>{{item.num}}人</span>
          </div>
          <!-- <div style="flex:1"></div> -->
        </div>
        <div>
          <div>
            所属部门:
            <span>
              {{item.companyName}}
            </span>
          </div>
        </div>
        <div>
          <div>
            开始日期:
            <span>{{item.startdate}}</span>
          </div>
        </div>
        <div>
          <div>
            交付日期:
            <span>{{item.enddate}}</span>
          </div>
        </div>
      </div>
    </div>
    <projectForm
      :title="title"
      :dialog-visible="projectFormVisible"
      @close-dialog="closeDialog"
      @submit-success="projectAddSuc"
      :isAdd="isAdd"
      :staff="staffList"
      :group="groupList"
    ></projectForm>
  </div>
</template>

<script>
import projectForm from "./project-form";
import projectServer from "../../api/projectManage";
import publicServer from "../../api/public";
import staffServer from "../../api/staff";
export default {
  name: "",
  components: {
      projectForm
  },
  data() {
    return {
      searchForm: { page: 1, pageSize: 10 },
      searchForm1: { page: 1, pageSize: 100 },
      isLoading: false,
      keyword: "",
      tableData: [],
      groupList: [],
      staffList: [],
      isAdd:null,
      projectFormVisible:false,
      title:'',
    };
  },
  computed: {},
  methods: {
    loadList() {
      this.isLoading = true;
      projectServer.projectFind(
        this.searchForm,
        res => {
          this.isLoading = false;
          this.tableData = res.data.list;
          // this.total=res.data.total;
          // this.currentPage=res.data.pageNum;
        },
        () => {
          this.isLoading = false;
        }
      );
    },
    Company() {
      publicServer.findCompanyList(
        {},
        res => {
          this.groupList = res.data;
          //   console.log(this.groupList)
        },
        () => {}
      );
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
    closeDialog() {
      this.projectFormVisible = false;
    },
    register() {
        this.isAdd=1;
        this.title='新建项目';
        this.projectFormVisible=true;
    },
    goDetail(id,proManager,company,users) {
      this.$router.push({
        name: "projectDetail",
        query: {id: id,proManager:proManager,company:company,users:users}
      });
    },
    deleteProject(id){
      this.$confirm("你确定删除该项目吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          projectServer.projectDel(id,res=>{
            this.$message.success('删除成功');
            this.loadList();
          },()=>{})       
        })
        .catch(() => {});
      
    },
    search() {
      this.loadList();
    },
    handleReset() {
      this.searchForm = { page: 1, pageSize: 10 };
      this.loadList();
    },
    projectAddSuc(){
        this.loadList();
    },
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "项目列表", path: "/projectManage", params: null }
    ]);
  },
  mounted() {
    this.loadList();
    this.Company();
    this.staff();
  }
};
</script>

<style lang="less" scoped>
.projectList {
  display: flex;
  flex-wrap: wrap;
}
.listOne {
  //   flex: 1;
  width: 18%;
  padding: 1%;
  margin: 1%;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 10px #e9e9e9;
  border-radius: 5px;
  cursor: pointer;
}
.listOne > div {
  line-height: 1.7;
}
.maAndPe {
    flex: 1;
    text-align: center;
    padding: 1% 2%;
    margin-right: 2%;
    margin-bottom: 2%;
    border: 1px solid #ededed;
    border-radius: 15px;
}
</style>