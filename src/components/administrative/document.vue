<!--文档管理-->
<template>
  <div>
    <!-- <div class="left-form">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="发文管理" name="first">
          <dispatch></dispatch>
        </el-tab-pane>
        <el-tab-pane label="收文管理" name="second">
          <addressee></addressee>
        </el-tab-pane>
        <el-tab-pane label="资料管理" name="third">
          <dataManagement></dataManagement>
        </el-tab-pane>
      </el-tabs>
    </div> -->
    <div style="display:flex;position:absolute">
      <el-button
        size="small"
        v-for="item in wpList"
        :key="item.name"
        :class="{active : active === item.name}"
        @click="selected(item)"
      >{{item.name}}</el-button>
    </div>
    <dispatch v-if="active=='发文管理'"></dispatch>
    <addressee v-if="active=='收文管理'"></addressee>
    <dataManagement v-if="active=='资料管理'"></dataManagement>
    <!-- <div class="right-handle" style="">
      <el-button type="primary" size="small" @click="register(1)" v-if="activeName==='first'">发文登记</el-button>
      <el-button type="primary" size="small" @click="register(2)" v-if="activeName==='second'">收文登记</el-button>
      <el-button type="primary" size="small" @click="register(3)" v-if="activeName==='third'">资料登记</el-button>
    </div> -->

    <!-- 发文登记表单 -->
    <!-- <dispatchForm
      :title="title"
      :dialog-visible="dispatchFormVisible"
      @close-dialog="closeDialog"
      :isAdd="isAdd"
      :rowList="dispatchList"
    ></dispatchForm> -->
    <!-- 收文登记表单 -->
    <!-- <addresseeForm
      :title="title"
      :dialog-visible="addresseeFormVisible"
      @close-dialog="closeDialog"
      :isAdd="isAdd"
      :rowList="addresseeList"
    ></addresseeForm> -->
    <!-- 资料管理 -->
    <!-- <dataManagementForm
      :title="title"
      :dialog-visible="dataFormVisible"
      @close-dialog="closeDialog"
      :isAdd="isAdd"
      :rowList="dataList"
    ></dataManagementForm> -->
  </div>
</template>
<script>
import dispatch from "./dispatch";
// import dispatchForm from "./dispatch-form";
import addressee from "./addressee";
// import addresseeForm from "./addressee-form";
import dataManagement from "./dataManagement";
// import dataManagementForm from "./dataManagement-form";

export default {
  name: "document",
  components: {
    dispatch,
    // dispatchForm,
    addressee,
    // addresseeForm,
    dataManagement,
    // dataManagementForm
  },
  data() {
    return {
      wpList: [
        { name: "发文管理", id: 1 },
        { name: "收文管理", id: 2 },
        { name: "资料管理", id: 3 }
      ],
      active: "发文管理",
      activeName: "first",
      num: null,
      title: "",
      dispatchFormVisible: false,
      isAdd: null,
      dispatchList: {},
      addresseeFormVisible: false,
      addresseeList: {},
      dataFormVisible: false,
      dataList: {},
      // dispatchTotal:0,
      // dispatchCurrentPage:1,
      // searchForm: {page:1,pageSize:10,sendType:0},
      // tableData: [],
      // isLoading: false,
      // secretValue:'',
      // keyword:'',
    };
  },
  created() {
    this.$store.dispatch('changeBreadcrumb', [
      {name: '文档管理', path: '/document', params: null},
      
    ])
  },
  mounted() {

  },
  methods: {
    selected(item) {
      // this.searchForm.id = item.id;
      // this.searchForm.pageType = item.id - 1;
      this.active = item.name;
      // if (item.id==2) {
      //   this.loadList2();
      // }
      // if (item.id==3) {
      //   this.loadList3();
      // }
      // console.log(this.searchForm.id)
    },
    handleClick(tab, event) {},
    register(num) {
      this.num = num;
      this.isAdd = 1;
      if (this.activeName === "first") {
        this.title = "发文登记";
        this.dispatchFormVisible = true;
      }
      if (this.activeName === "second") {
        this.title = "收文登记";
        this.addresseeFormVisible = true;
      }
      if (this.activeName === "third") {
        this.title = "资料登记";
        this.dataFormVisible = true;
      }
    },
    closeDialog() {
      if (this.num === 1) {
        this.dispatchFormVisible = false;
      }
      if (this.num === 2) {
        this.addresseeFormVisible = false;
      }
      if (this.num === 3) {
        this.dataFormVisible = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}
</style>