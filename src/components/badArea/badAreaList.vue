<template>
  <div class="role-list">
    <div class="search-box">
      <el-form :inline="true" label-width="68px" size="small" @submit.native.prevent>
        <el-form-item label="区域">
          <el-cascader
            :options="options"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.key_words" placeholder="小区名称查询" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="handle-box">
      <el-button type="primary" size="small" @click="handleAdd">新增账号</el-button>
      <el-button type="primary" size="small" @click="importExcl">导入</el-button>
      <!--      <el-button type="danger" size="small" @click="deleAll">批量删除</el-button>-->
    </div>

    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData.list" @selection-change="choice">
        <!--        <el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column label="小区名称" prop="community" show-overflow-tooltip></el-table-column>
        <el-table-column label="区域" prop="nick_name" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.province}}-{{scope.row.city}}-{{scope.row.district}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址" prop="address" show-overflow-tooltip></el-table-column>
        <el-table-column label="定位" prop="comment" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.lng}},{{scope.row.lat}}</span>
          </template>
        </el-table-column>
        <el-table-column label="确诊人数" prop="infected_num" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="handleView(scope.row)">编辑</el-button>
            <el-button type="text" size="small"  @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalCount"
                     :current-page="tableData.currentPage" :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
<!--      <div id="container"  style="width: 100%;height:300px;"></div>-->
    </div>


    <babAreaForm :dialog-visible="formDialogVisible" :rowList="row" :is-add="isAdd" ref="form"
                 @submit-success="loadList"
                 @close-dialog="closeD"></babAreaForm>
  </div>
</template>

<script>
  import {  regionData,CodeToText} from 'element-china-area-data'
  import publicServer from '../../api/public'
  import babAreaForm from "./babAreaForm";
  export default {
    name: "badAreaList",

    components: {
      babAreaForm
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '疫情小区(官)', path: '', params: null},
        // {name: '品牌管理', path: '', params: null}
      ])
    },
    mounted() {
      var map = map = new AMap.Map('container', {
        resizeEnable: true
      });

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
        selectedOptions:[],
        options: regionData,
        row:{},
        isLoading: false,
        isAdd: 1,
        searchForm: {
          page:1,
          page_size:10,
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
      handleChange (value) {
        console.log(value)
        this.searchForm.province =CodeToText[value[0]];
        this.searchForm.city =CodeToText[value[1]];
        this.searchForm.district =CodeToText[value[2]];
        console.log(this.searchForm)
      },
      importExcl(){

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
        publicServer.getInfectedAreas(this.searchForm, res => {
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
        this.searchForm.page_size = pageSize;
        this.loadList();
      },

      handleReset() {
        this.searchForm = {page:1,page_size:10};
        this.loadList();
      },

      handleView(item) {
        this.isAdd = 3;
        this.formDialogVisible = true;
        this.row = JSON.parse(JSON.stringify(item));
        this.$nextTick(()=>{
          this.$refs.form.loadList2();
        });
      },

      handleAdd() {
        this.isAdd = 1;
        this.formDialogVisible = true;
        this.$nextTick(()=>{
          this.$refs.form.loadList();
        });

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
        this.$confirm('你确定删除该小区吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          publicServer.delInfectedArea({i_id: id}, () => {
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

<style scoped>
  .handle-box {
    margin-bottom: 15px;
  }
</style>

