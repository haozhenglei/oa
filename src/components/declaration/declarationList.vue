<template>
  <div class="role-list">
    <div style="margin-bottom:18px">
      <el-button  size="small" v-for="item in wpList" :key="item.name"
                  :class="{active : active === item.id}"
                  @click="selected(item)">{{item.name}}</el-button>
    </div>
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width="68px" size="small" @submit.native.prevent>
          <el-form-item label="关键字">
            <el-input v-model="searchForm.key_words" placeholder="用户姓名，电话，住址查询"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchForm.infected_channel" placeholder="请选择" >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申报时间">
            <el-date-picker v-model="searchForm.beginTime" type="datetime" placeholder="选择日期" :picker-options="pickerBeginDateBefore"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            -
            <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="选择日期" :picker-options="pickerBeginDateAfter"
                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>

      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="list-box">
       <div>
         <div class="box-one" v-for="item of tableData.list">
           <img src="../../assets/img/yq/qz.png" v-if="item.infected_status === 1" alt="" style="width: 100px;height: 96px;position: absolute;right: 0;top: 0">
           <img src="../../assets/img/yq/ys.png" v-else alt="" style="width: 100px;height: 96px;position: absolute;right: 0;top: 0">
          <p style="font-size: 20px;font-weight: bold;margin-bottom: 15px">{{item.user_name}}（{{item.user_tel}}）<span style="font-size: 14px;font-weight: normal">{{item.addr}}</span></p>
          <p>确诊时间：{{item.infected_time}}   医院：{{item.hospital_name}}    电话：{{item.hospital_tel}}</p>
           <div style="display: flex;align-items: center;margin-top: 30px">
             <p style="color: gray;flex: 1;">{{item.created_at}}</p>
             <el-button round @click="audit(item.id)" v-if="searchForm.review_status === 1">审核</el-button>
             <el-button round @click="lookWay(item.device_id)" v-else>查看路径</el-button>
           </div>
         </div>
       </div>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalCount"
                      :page-size="searchForm.page_size" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <declarationForm :dialog-visible="formDialogVisible" @close-dialog="formDialogVisible = false" :r_id="r_id" @submit-success="loadList"></declarationForm>
  </div>
</template>

<script>
    import declarationForm from "./declaration-form"
    import publicServer from "../../api/public";
    export default {
      name: "declarationList",
      components: {
        declarationForm
      },
      created() {
        this.$store.dispatch('changeBreadcrumb', [
          {name: '感染申报', path: '', params: null},
        ])
      },
      computed: {
        pageAllSize: function () {
          return this.$store.state.Public.pageAllSizeMore;
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
          r_id:1,
          formDialogVisible:false,
          tableData:{},
          searchForm: {
            review_status:1,
            page:1,
            page_size:10
          },
          active:1,
          options: [
            {name:'医院判定确诊',id:0},
            {name:'医院判定疑似',id:1},
            {name:'自己判定疑似',id:2},
          ],
          wpList: [
            {
              name: '待审核',
              id: 1
            },
            {
              name: '审核通过',
              id: 2
            },
            {
              name: '审核拒绝',
              id:3
            },
          ],
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
        loadList() {
          this.isLoading = true;
          publicServer.getInfectedDeclares(this.searchForm, res => {
            console.log(111)
            this.tableData = res.data;
            this.isLoading = false;
          }, () => {
            this.isLoading = false;
          })
        },
        lookWay(id){
          this.$router.push({
            path:'/declarationMap?device_id='+id
          })
        },
        audit(id){
          this.r_id = id;
          this.formDialogVisible = true
        },
        selected(item){
          this.searchForm.page = 1;
          this.active = item.id;
          this.searchForm.review_status = item.id;
          this.loadList();
        },
        search(){
          this.searchForm.page = 1;
          this.loadList();
        },
        handleReset() {
          this.searchForm = {page:1,page_size:10};
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

<style scoped lang="less">
  .active {
    background: #13ce66;
    border: 1px solid #13ce66;
    color: #fff;
  }
  .box-one{
    position: relative;
    padding: 20px;
    display: inline-block;
    width: 49.5%;
    box-sizing: border-box;
    background: #f2f2f2;
    margin-bottom: 3px;
    /*height: 300px;*/
  }
  .box-one:nth-child(odd){
    margin-right: 1%;
  }
</style>
