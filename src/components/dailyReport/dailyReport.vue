<template>
  <div class="role-list">
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width="68px" size="small" @submit.native.prevent>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.key_words" placeholder="用户姓名，电话，住址查询" style="width: 250px"></el-input>
        </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="handle-box">
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData.list" >
        <el-table-column label="序号"  type="index" width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户姓名"  prop="user_name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户电话" prop="user_tel" show-overflow-tooltip></el-table-column>
        <el-table-column label="住址" prop="addr" show-overflow-tooltip></el-table-column>
        <el-table-column label="相关症状" prop="symptoms" show-overflow-tooltip></el-table-column>
        <el-table-column label="体温°C" prop="temperature" show-overflow-tooltip></el-table-column>
        <el-table-column label="帮助" prop="help_need" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalCount"
                     :page-size="searchForm.page_size"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import publicServer from '../../api/public'
  export default {
    name: "dailyReport",
    components: {
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '日常上报', path: '', params: null},
        // {name: '商城广告管理', path: '', params: null}
      ])
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
    mounted() {
      this.loadList()
    },
    data() {
      return {
        goodsName:'',
        goodsImg:"",
        row:{
          advertImg:''
        },
        dialogImgUrl:'',
        imgDialogVisible:false,
        isLoading: false,
        isAdd: 1,
        searchForm: {
          page:1,
          page_size:10
        },
        rowId: null,
        roleTree: [],
        value:'',
        options:[],
        tableData: {},
        detailDialogVisible: false,
        formDialogVisible: false,
        formDialogVisible2: false,

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
      goback(){
        this.$router.push({
          path:'/mapWay'
        })
      },
      goJl(){
        this.$router.push({
          path:'/record'
        })
      },

      loadList() {
        this.isLoading = true;
        publicServer.getDailyReports(this.searchForm, res => {
          this.tableData = res.data
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        })
      },

      handleReset() {
        this.searchForm = {page:1,page_size:10};
        this.loadList();
      },
      search(){
        this.searchForm.page = 1;
        this.loadList();
      },
      handleCurrentChange(pageNum) {
        this.searchForm.page = pageNum;
        this.loadList();
      },

      handleSizeChange(pageSize) {
        this.searchForm.page = 1;
        this.searchForm.page_size = pageSize;
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
