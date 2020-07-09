<template>
  <div class="role-list">
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width="68px" size="small" @submit.native.prevent>
          <el-form-item label="区域">
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="交集时间">
            <el-date-picker v-model="searchForm.beginTime" type="date" placeholder="选择日期" :picker-options="pickerBeginDateBefore"
                            value-format="yyyy-MM-dd"></el-date-picker>
            -
            <el-date-picker v-model="searchForm.endTime" type="date" placeholder="选择日期" :picker-options="pickerBeginDateAfter"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.key_words" placeholder="用户、地点、患者、处理人、备注" style="width: 250px"></el-input>
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
        <el-table-column label="姓名"  prop="user_name" show-overflow-tooltip></el-table-column>
        <el-table-column label="交集患者" prop="infected_user_name" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.advertName }}</p>
              <p>患者电话: {{ scope.row.advertNames }}</p>
              <p>确诊时间: {{ scope.row.advertNames }}</p>
              <p>收治医院: {{ scope.row.advertNames }}</p>
              <p>目前定位: {{ scope.row.infected_district }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.infected_user_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="交集地点" prop="infected_addr" show-overflow-tooltip></el-table-column>
        <el-table-column label="交集时间" prop="infected_time" show-overflow-tooltip></el-table-column>
        <el-table-column label="电话" prop="user_tel" show-overflow-tooltip></el-table-column>
        <el-table-column label="住址" prop="user_addr" show-overflow-tooltip></el-table-column>
        <el-table-column label="处理人" prop="deal_user" show-overflow-tooltip></el-table-column>
        <el-table-column label="处理时间" prop="deal_time" show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="comment" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalCount"
                      :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import publicServer from '../../api/public'
  import {  regionData,CodeToText} from 'element-china-area-data'
  export default {
    name: "deal-list",
    components: {
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '交集分析-处理记录', path: '', params: null},
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
    mounted(){
      this.loadList()
    },

    data() {
      return {
        selectedOptions:[],
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
        options:regionData,
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
      handleChange (value) {
        this.searchForm.province =CodeToText[value[0]];
        this.searchForm.city =CodeToText[value[1]];
        this.searchForm.district =CodeToText[value[2]];
      },
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
        publicServer.getIntersectionDealLogs(this.searchForm, res => {
          this.isLoading = false;
          this.tableData = res.data;
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

