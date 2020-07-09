<template>
  <div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="register">新建工单</el-button>
      </div>
    </div>
    <div class="search-box" style="position:relative">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="工单状态" style="width:90%">            
            <el-radio v-model="searchForm.workOrderStatus" label="1">未处理</el-radio>
            <el-radio v-model="searchForm.workOrderStatus" label="2">进行中</el-radio>
            <el-radio v-model="searchForm.workOrderStatus" label="3">已完成</el-radio>
            <el-radio v-model="searchForm.workOrderStatus" label="4">已关闭</el-radio>
            <el-checkbox v-model="searchForm.isAssign">指派给我</el-checkbox>
            <el-checkbox v-model="searchForm.isOneself">由我创建</el-checkbox>
          </el-form-item>
          <div style="width:100%" class="zhongjian">
            <el-form-item label="工单ID" style="margin-right:5px">
              <el-input v-model="searchForm.workOrderId" placeholder="请输入工单ID"></el-input>
            </el-form-item>
            <el-form-item label="工单名称" style="margin-right:5px">
              <el-input v-model="searchForm.workOrderName" placeholder="请输入工单名称"></el-input>
            </el-form-item>
            <el-form-item label="发起人">
              <el-input v-model="searchForm.issueUser" placeholder="请输入发起人"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="发布日期" style="margin-right:105px">
            <el-date-picker
              v-model="releaseDate"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="交付日期">
            <el-date-picker
              v-model="finishDate"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle" style="position:absolute;right:0;bottom:1.5rem;">
        <el-button type="primary" size="small" @click="search" style="width:6.2857rem">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset" style="width:6.2857rem">重置</el-button>
      </div>
    </div>
    <div class="projectList">
      <div class="listOne" @click="goDetail(item.id)" v-for="(item,index) in tableData" :key="index">
        <div style="display:flex;font-weight:bold;margin-bottom:2%;font-size:16px;align-items:center">
          <div style="flex:10">{{item.workOrderName}}</div>
          <div style="flex:1;font-size:20px" @click.stop="closeProject(item.id)">
            <i class="el-icon-circle-close"></i>
          </div>
        </div>
        <div>
          <span>
            工单ID:
            <span>{{item.workOrderNo}}</span>
          </span>
        </div>
        <div style="display:flex;justify-content: space-between;margin-top:1%;align-items:center">
          <div class="maAndPe">{{item.issueUser}}</div>
          <div class="maAndPe">{{item.assignCount}}人</div>
          <div class="maAndPe">
            <span v-if="item.workOrderStatus==1">未处理</span>
            <span v-if="item.workOrderStatus==2">进行中</span>
            <span v-if="item.workOrderStatus==3">已完成</span>
            <span v-if="item.workOrderStatus==4">已关闭</span>
          </div>
        </div>
        <div>
          <div>
            发布日期:
            {{item.issueDate}}
          </div>
        </div>
        <div>
          <div>
            交付日期:
            {{item.successDate}}
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="tableData.length>searchForm.pageSize">
      <el-button type="text" @click="loadMore">加载更多...</el-button>
    </div> -->
    <workOrderForm
      :title="title"
      :dialog-visible="workOrderFormVisible"
      @close-dialog="closeDialog"
      @submit-success="workOrderAddSuc"
      :isAdd="isAdd"
      :staff="staffList"
      :formData2="formData2"
    ></workOrderForm>
  </div>
</template>

<script>
import workOrderForm from "./workOrder-form";
import workOrderServer from "../../api/workOrder";
import staffServer from "../../api/staff";
import publicServer from '../../api/public'
export default {
  name: "",
  components: {
    workOrderForm
  },
  data() {
    return {
      searchForm: { page: 1, pageSize: 100, isAssign: false, isOneself: false },
      searchForm1: { page: 1, pageSize: 100},
      isAdd: null,
      title: "",
      // workOrderFormDialog: false,
      releaseDate: "",
      finishDate: "",
      pickerOptions: {
        // disabledDate: time => {
        //   return time > new Date();
        // }
      },
      tableData: [],
      isLoading: false,
      workOrderFormVisible:false,
      isAdd:null,
      staffList:[],
      formData2:{},
    };
  },
  computed: {},
  methods: {
    loadList() {
      this.isLoading = true;
      workOrderServer.workOrderFind(
        this.searchForm,
        res => {
          // console.log(res)
          this.isLoading = false;
          this.tableData = res.data.list;
          // this.total = res.data.total;
          // this.currentPage = res.data.pageNum;
        },
        () => {
          this.isLoading = false;
        }
      );
    },
    loadMore(){

    },
    closeDialog() {
      this.workOrderFormVisible = false;
    },
    staff() {
      publicServer.findAccount(this.searchForm1,res=>{
        this.staffList = res.data.list;
      },()=>{})
    },
    register() {
      this.isAdd = 1;
      this.title = "新建工单";
      this.workOrderFormVisible = true;
    },
    typeChange(val) {
      console.log(val);
    },
    goDetail(id) {
      this.$router.push({
        name: "workOrderDetail",
        query: {id: id,staff:JSON.stringify(this.staffList)}
      });
    },
    closeProject(id) {
      this.isAdd = 2;
      this.title = "关闭工单";
      this.workOrderFormVisible = true;
      workOrderServer.workOrderDetail(id,res=>{
        this.formData2=res.data
      },()=>{})
    },
    search() {
      this.searchForm.issueStartTime=this.releaseDate[0];
      this.searchForm.issueEndTime=this.releaseDate[1];
      this.searchForm.successStartDate=this.finishDate[0];
      this.searchForm.successEndDate=this.finishDate[1];
      // console.log(this.searchForm)
      this.loadList();
    },
    handleReset() {
      this.searchForm={page: 1, pageSize: 10, isAssign: false, isOneself: false};
      this.releaseDate='';
      this.finishDate='';
      this.loadList();
    },
    workOrderAddSuc() {
      this.loadList();
    }
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "工单列表", path: "/workOrder", params: null }
    ]);
  },
  mounted() {
    this.loadList();
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
  flex:1;
  text-align: center;
  padding: 1% 2%;
  margin-right: 2%;
  margin-bottom: 2%;
  border: 1px solid #ededed;
  border-radius: 15px;
}
/deep/.el-radio__inner{
  border-radius: 2px;
}
/deep/.el-radio__input.is-checked .el-radio__inner::after{
  transform: rotate(45deg) scaleY(1);
}
/deep/.el-radio__inner::after{
  -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #FFF;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transition: -webkit-transform .15s ease-in .05s;
    transition: -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;
    -webkit-transform-origin: center;
    transform-origin: center;
    border-radius: 0;
    background-color: #3551A2;
}
/deep/.el-radio{
  margin-right:56px;
}
/deep/.el-checkbox{
  margin-right:56px;
}
</style>