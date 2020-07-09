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
      <div style="display: flex;align-items: center;margin-bottom: 20px;">
        <p style="font-size: 22px;font-weight: bold;flex: 1">共{{tableData.totalCount}}个交集点，共包含399名人员 <span style="font-size: 16px;font-weight: normal"> 当前时间:{{time}}</span></p>
        <p style="color: #2D63E7;cursor: pointer;margin-right: 20px" @click="goJl">全部处理记录</p>
        <p style="color: #2D63E7;cursor: pointer;" @click="goback">返回地图模式</p>
      </div>

      <el-table :data="tableData.list" >
        <el-table-column label="交集点地址"  prop="addr" show-overflow-tooltip></el-table-column>
        <el-table-column label="交集人员数" prop="intersectionCounts" show-overflow-tooltip></el-table-column>
        <el-table-column label="待处理人员数" prop="unDealCounts" show-overflow-tooltip></el-table-column>
        <el-table-column label="已处理人员数" prop="dealCounts" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="contend(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalCount"
                     :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <intersection-table ref="intersec" :dialog-visible="formDialogVisible" @close-dialog="formDialogVisible = false" :p_id="p_id" :address="address" @openForm="openDeal"></intersection-table>
    <dealForm :dialog-visible="formDialogVisible2" @close-dialog="formDialogVisible2 = false" :row="row" @submit-success="dealSuc"></dealForm>
  </div>
</template>

<script>
  import {  regionData,CodeToText} from 'element-china-area-data'
  import publicServer from '../../api/public'
  import intersectionTable from "./intersectionTable"
  import dealForm from "./dealForm"
  export default {
    name: "advertisement-list",
    components: {
      intersectionTable,dealForm
    },
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        {name: '交集分析列表模式', path: '', params: null},
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
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    this.time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    this.loadList()
  },
    data() {
      return {
        selectedOptions:[],
        time:'',
        goodsName:'',
        goodsImg:"",
        dialogImgUrl:'',
        imgDialogVisible:false,
        isLoading: false,
        isAdd: 1,
        searchForm: {
          page:1,
          page_size:10
        },
        options: regionData,
        rowId: null,
        roleTree: [],
        value:'',
        tableData: {
          list:[],
          totalCount:0
        },
        detailDialogVisible: false,
        formDialogVisible: false,
        formDialogVisible2: false,

        choiceAll:[],
        allPerson:0,
        p_id:0,
        address:'',
        row:{}
      }
    },


    methods: {
      handleChange (value) {
        this.searchForm.province =CodeToText[value[0]];
        this.searchForm.city =CodeToText[value[1]];
        this.searchForm.district =CodeToText[value[2]];
      },
      dealSuc(){
        this.$refs.intersec.loadList();
      },
      openDeal(item){
        this.formDialogVisible2 = true;
        this.row = item
      },
      goback(){
        this.$router.push({
          path:'/mapWay'
        })
      },
      del(item) {
        this.$confirm('你确定删除该交集点吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          publicServer.delIntersectionPosition({p_id: item.id}, () => {
            this.$message.success('删除成功');
            this.loadList();
          });
        }).catch(() => {
        });
      },
      contend (item) {
        this.formDialogVisible = true;
        this.p_id = item.id;
        this.address = item.addr
      },
      goJl(){
        this.$router.push({
          path:'/dealList'
        })
      },
      choice(item){

        var arr = [];
        for(let e of item){
          arr.push(e.advertId)
        }
        this.choiceAll = arr

      },
      closeD(){
        this.formDialogVisible=false;
        this.row = {
          advertImg:''
        };
        this.goodsImg = '';
        this.goodsName = '';


      },
      changeGood(item){
        this.goodsImg = item.imgUrl;
        this.goodsName = item.infoName;

      },
      lookBannerImages(imgURL) {
        this.dialogImgUrl = imgURL;
        this.imgDialogVisible = true;
      },
      loadList() {
        this.isLoading = true;
        publicServer.intersectionAnalysis(this.searchForm, res => {
          this.isLoading = false;
          this.tableData = res.data;
        }, () => {
          this.isLoading = false;
        })
      },
      upd(item){
        if(item.lines){
          item.advertStatus = 1
        }else{
          item.advertStatus = 0
        }
        advertisementServer.adverupd({
          advertId:item.advertId,
          advertStatus:item.advertStatus,
        }, res => {
          this.$message.success(res.msg);
          this.loadList()
        }, (res) => {
          if(res.code !== 200){
            this.$message.success(res.msg);
            this.loadList()
          }

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
      dele(e){

      },
      handleTop(item){
        advertisementServer.toTop({
          advertId:item.advertId,
          fromSort:item.advertSort,
          toSort:1
        }, res => {
          this.loadList()
        }, () => {

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



      handleView(item) {

        this.isAdd = 3;
        this.formDialogVisible = true;
        this.row = JSON.parse(JSON.stringify(item));
        if(item.advertType === 2){
          advertisementServer.searchAdver({id:item.advertData,tag:item.goodsType,type:1}, (res) => {
            this.goodsName = res.data.infoName;
            this.goodsImg = res.data.imgUrl
            this.$refs.mychild.changeTrueName({trueName:'商品名称',trueUrl:'商品图片'});
          }, (res) => {

          });
        }else if(item.advertType === 1){
          advertisementServer.searchAdver({id:item.advertData,tag:2,type:2}, (res) => {
            this.goodsName = res.data.infoName;
            this.goodsImg = res.data.imgUrl
            this.$refs.mychild.changeTrueName({trueName:'活动名称',trueUrl:'活动图片'});
          }, (res) => {

          });
        }else{
          this.goodsName = '';
          this.goodsImg = ''
        }
        this.$refs.mychild.imgSize();

      },

      handleAdd() {
        this.isAdd = 1;
        this.formDialogVisible = true;
      },

      handleEdit(id) {
        this.isAdd = 2;
        this.formDialogVisible = true;
        this.rowId = id;
      },
      deleAll(){
        if(this.choiceAll.length){
          this.$confirm('你确定删除所选全部广告吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            advertisementServer.delAdver({advertIds:this.choiceAll}, () => {
              this.$message.success('删除成功');
              this.loadList();
            });
          }).catch(() => {
          });
        }else{
          this.$message.warning('请选择广告删除');
        }

      },
      handleDelete(row){
        this.$confirm('你确定删除本条广告吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          advertisementServer.delAdver({advertIds: [row.advertId]}, () => {
            this.$message.success('删除成功');
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
