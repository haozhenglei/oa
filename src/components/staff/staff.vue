<template>
  <div class="role-list">
    <div class="staff">
      <div class="staff-one">
        <span>在职员工</span>
        <span>{{formData.onJobNum}}</span>
      </div>
      <div class="staff-two">
        <div>
          <p>正式员工</p>
          <p>{{formData.currentNum}}</p>
        </div>
        <div>
          <p>试用期</p>
          <p>{{formData.tryNum}}</p>
        </div>
      </div>
      <div class="staff-three">
        <p>离职员工</p>
        <p>{{formData.outNum}}</p>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width="" size="small" @submit.native.prevent>
          <el-form-item label="">
            <el-input v-model="searchForm.query" placeholder="姓名，电话" ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="searchForm.branchId" placeholder="请选择部门">
              <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="searchForm.status" placeholder="选择类型">
              <el-option label="正常" :value=0></el-option>
              <el-option label="试用" :value=1></el-option>
              <el-option label="离职" :value=2></el-option>
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
      <el-button type="primary" size="small" @click="handleAdd">添加新员工</el-button>
      <el-upload
        style="display: inline-block"
        ref="my-upload"
        class="upload-demo"
        action="string"
        :show-file-list=false
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        multiple
        :http-request="upload2"
      >
        <el-button size="small" type="primary" :disabled="isSubmit">批量导入</el-button>
      </el-upload>
      <el-button type="primary" size="small" @click="xiaZaiMuBan">下载导入模板</el-button>
      <!--      <el-button type="danger" size="small" @click="deleAll">批量删除</el-button>-->
    </div>

    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData.list" @selection-change="choice">
        <!--        <el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="手机号码(账号)" prop="phone" show-overflow-tooltip></el-table-column>
        <el-table-column label="部门" prop="companyName" show-overflow-tooltip></el-table-column>
        <el-table-column label="职位" prop="roleName" show-overflow-tooltip></el-table-column>
        <!--<el-table-column label="类型" prop="status" show-overflow-tooltip></el-table-column>-->
        <el-table-column label="状态" prop="status" show-overflow-tooltip>
          <template slot-scope="scope">
          <p v-if="scope.row.status === 0">正常</p>
          <p v-if="scope.row.status === 1">试用</p>
          <p v-if="scope.row.status === 2">离职</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <!--<el-button type="text" size="small"  @click="resetPwd(scope.row.id)">重置密码</el-button>-->
            <el-button type="text" size="small"  @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" size="small" v-if="scope.row.status === 2" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-button type="text" size="small"  v-else @click="quit(scope.row)">离职</el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.total"
                     :current-page="tableData.currentPage" :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>


    <staff-form :dialog-visible="formDialogVisible" :rowList="row" :is-add="isAdd" :groupList="groupList" :positionList="positionList"
                 @submit-success="successLoad"
                 @close-dialog="closeD"></staff-form>
    <out-form :dialog-visible="formDialogVisible2" :rowList="row"
                 @submit-success="successLoad"
                 @close-dialog="closeD"></out-form>
  </div>
</template>

<script>
  import staffServer from '../../api/staff'
  import staffForm from "./staff-form";
  import outForm from "./out-form";
  import publicServer from '../../api/public'
  export default {
    name: "staff",

    components: {
      staffForm,outForm
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '员工管理', path: '/staff', params: null},
        // {name: '品牌管理', path: '', params: null}
      ])
    },
    mounted() {
      this.loadList();
      this.topList();
      this.Company();
      this.group();
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
        isSubmit:false,
        rowId: null,
        roleTree: [],
        groupList:[],
        CompanyList:[],
        positionList:[],
        value:'',
        formData:{},
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
      upload2(item){
        this.isSubmit = true;
        let formData = new FormData();
        formData.append('file', item.file);
        staffServer.excelAdd(formData, (res) => {
          console.log(res)
          this.isSubmit = false;
          this.$message.success('导入成功');
          this.loadList();
          this.topList();
        }, (res) => {
          this.isSubmit = false;
        });
      },
      // handleExceed(files, fileList) {
      //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件`);
      // },
      handleRemove(file, fileList) {
        console.log(file)
        console.log(1)
      },
      handlePreview(file) {
        console.log(file);
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
        this.formDialogVisible2=false;
      },
      search(){
        this.searchForm.page = 1;

        this.loadList();
      },
      successLoad(){
        this.loadList();
        this.topList();
      },
      loadList() {
        this.isLoading = true;
        staffServer.queryUserList(this.searchForm, res => {
          this.isLoading = false;
          this.tableData = res.data;
        }, () => {
          this.isLoading = false;
        })
      },
      topList() {
        staffServer.countUserNum({}, (res) => {
          this.formData = res.data
        }, () => {
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
        this.isAdd = 3;
        this.formDialogVisible = true;
        this.row = JSON.parse(JSON.stringify(item));
      },

      handleAdd() {
        this.isAdd = 1;
        this.formDialogVisible = true;
      },
      xiaZaiMuBan(){
        staffServer.downMuBan({},'员工导入模板',()=>{})
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
          staffServer.delStaff({ids: [id]}, () => {
            this.$message.success('删除成功');
            this.loadList();
            this.topList();
          });
        }).catch(() => {
        });
      },
      quit(item){

        this.row = JSON.parse(JSON.stringify(item));
        this.formDialogVisible2 = true;
        // this.$confirm('你确定该员工离职吗？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   staffServer.userStatus({id: id}, () => {
        //     this.$message.success('离职成功');
        //     this.loadList();
        //     this.topList();
        //   });
        // }).catch(() => {
        // });
      },

    }
  }
</script>

<style scoped lang="less">
  .handle-box {
    margin-bottom: 15px;
  }
  .staff{
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
    .staff-one{
      padding: 0 25px;
       display: flex;
       justify-content: center;
      align-items: center;
       span:last-child{
         color: #1890ff;
         margin-left: 20px;
         font-size: 30px;
       }
    }
    .staff-two{
      border-left: 1px solid;
      border-right: 1px solid;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      >div:first-child{
        margin-right: 100px;
      }
      >div{
        text-align: center;
        >p:last-child{
          margin-top: 15px;
          font-size: 30px;
          color: #606266;
        }
      }
    }
    .staff-three{
      padding: 0 50px;
      text-align: center;
      p:last-child{
        margin-top: 15px;
        font-size: 30px;
        color: #606266;
      };
    }
  }
</style>
