<template>

  <el-dialog title='交集详情' :visible.sync="formDialogVisible" width="1200px" :close-on-click-modal="false" custom-class="center-dialog"
             top="0"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <p>交集地点：{{address}}</p>
        <div style="display: flex;align-items: center;margin: 20px 0">
          <p>交集人员名单:</p>
          <p class="status" :class="{ blue: status === 0 }" style="margin:0 20px;cursor: pointer" @click="changeStatus(0)">待处理</p>
          <p class="status" :class="{ blue: status === 1 }" style="cursor: pointer" @click="changeStatus(1)">已处理</p>
        </div>
        <el-table :data="tableData.list">
          <el-table-column label="姓名"  prop="user_name" show-overflow-tooltip></el-table-column>
          <el-table-column label="交集患者" prop="advertName" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.infected_user_name }}</p>
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
          <el-table-column label="交集时间" prop="infected_time" show-overflow-tooltip></el-table-column>
          <el-table-column label="电话" prop="user_tel" show-overflow-tooltip></el-table-column>
          <el-table-column label="住址" prop="addr" show-overflow-tooltip></el-table-column>
          <el-table-column label="处理人" prop="deal_user" key="7" show-overflow-tooltip v-if="status===1"></el-table-column>
          <el-table-column label="处理时间" prop="deal_time" key="8" show-overflow-tooltip v-if="status===1"></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="150" v-if="status===0">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="handleView(scope.row)">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalCount"
                    :page-size="searchForm.page_size"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">

    </div>


  </el-dialog>

</template>

<script>
  import publicServer from '../../api/public'

  export default {
    name: "intersection-table",
    computed: {
      bodyHeight() {
        return this.$store.state.Public.bodyHeight
      },
      formDialogVisible: {
        get: function () {
          return this.dialogVisible;
        },
        set: function () {
          this.closeDialog();
        }
      },
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      p_id: {
        type: Number,
        default: 0
      },
      address: {
        type: String,
        default: ''
      },

    },
    data() {
      return {
        searchForm: {
          page:1,
          page_size:10,
        },
        status:0,
        tableData:{
           items:[
             {advertName:'sdas'}
           ]
        }
      }
    },
    methods:{
      loadList(){
        this.searchForm.p_id = this.p_id;
        this.searchForm.deal_status = this.status;
        publicServer.getIntersectionDetailLists(this.searchForm, (res) => {
            this.tableData = res.data
        });
      },
      changeStatus(e){
         this.status = e;
         this.loadList();
      },
      closeDialog() {
        this.$emit('close-dialog');
      },
      openDialog() {
         this.status = 0;
         this.loadList()
      },
      contend(){
        console.log(11)
      },
      closeContend(){

      },
      handleCurrentChange(pageNum) {
        this.searchForm.page = pageNum;
        // this.loadList();
      },

      handleSizeChange(pageSize) {
        this.searchForm.page = 1;
        this.searchForm.page_size = pageSize;
        // this.loadList();
      },
      handleView(item){
        var obj = item;
        obj.p_id = item.id;
        this.$emit('openForm',item);
      }

    }
  }
</script>

<style scoped lang="less">
.status{
  padding: 5px 25px;
  border: 1px solid;
  border-radius: 15px;
}
  .blue{
    color: #02a7f0;
    border-color:#02a7f0 ;
  }
</style>
