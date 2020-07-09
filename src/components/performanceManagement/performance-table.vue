<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="formDialogVisible"
      width="70%"
      height="40%"
      top="15vh"
      :close-on-click-modal="false"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form :inline="true" label-width size="small" @submit.native.prevent v-if="isAdd==1">
        <el-form-item label="考核时间" style="width:90%;">
          <el-date-picker
            :disabled="isDisabled"
            v-model="searchForm.assesstime"
            type="month"
            :editable="false"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="添加指标" style="width:100%;margin-bottom:5px"></el-form-item>
        <div class="addZB">
          <div class="addZBLeft">
            <el-form-item label="指标名称" style="width:40%">
              <el-input v-model="searchForm.name" placeholder="指标名称"></el-input>
            </el-form-item>
            <el-form-item label="分值" style="width:40%">
              <el-input v-model="searchForm.score" placeholder="分值"></el-input>
            </el-form-item>
            <el-form-item label="目标值" style="width:40%">
              <el-input v-model="searchForm.target" placeholder="目标值"></el-input>
            </el-form-item>
            <el-form-item label="指标说明/计算方式" style="width:40%">
              <el-input v-model="searchForm.goalExplain" placeholder="指标说明/计算方式"></el-input>
            </el-form-item>
          </div>
          <div class="addZBRight">
            <el-button type="primary" @click="addGoal">添加目标</el-button>
          </div>
        </div>
      </el-form>
      <div v-if="isAdd==1">
        <el-table :data="tableData">
          <el-table-column label="指标名称" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="分值" prop="score" show-overflow-tooltip></el-table-column>
          <el-table-column label="目标值" prop="target" show-overflow-tooltip></el-table-column>
          <el-table-column label="指标说明/计算方式" prop="goalExplain" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column label="完成数据" prop="finish" show-overflow-tooltip></el-table-column>
          <el-table-column label="自评分" prop="meScore" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row.id,scope.$index,isAdd)" v-if="isAdd==1">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="isAdd==2">
        <el-table :data="tableDataEdit">
          <el-table-column label="指标名称" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="分值" prop="score" show-overflow-tooltip></el-table-column>
          <el-table-column label="目标值" prop="target" show-overflow-tooltip></el-table-column>
          <el-table-column label="指标说明/计算方式" prop="goalExplain" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column label="完成数据" prop="finish" show-overflow-tooltip></el-table-column>
          <el-table-column label="自评分" prop="meScore" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row.id,scope.$index,isAdd)">编辑</el-button>
              <el-button type="text" size="small" disabled="" @click="handleDelete(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="isAdd==3">
        <el-table :data="tableDataSelf">
          <el-table-column label="指标名称" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="分值" prop="score" show-overflow-tooltip></el-table-column>
          <el-table-column label="目标值" prop="target" show-overflow-tooltip></el-table-column>
          <el-table-column label="指标说明/计算方式" prop="goalExplain" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column label="完成数据" prop="finish" show-overflow-tooltip></el-table-column>
          <el-table-column label="自评分" prop="meScore" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" show-overflow-tooltip width="240">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row.id,scope.$index,isAdd)">编辑</el-button>
              <el-button type="text" size="small" disabled="" @click="handleDelete(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(isAdd)">保 存</el-button>
      </div>
    </el-dialog>
    <performanceForm 
      :title="titleForm"
      :dialog-visible="performanceFormVisible"
      @close-dialog="closePerformanceDialog"
      :isAdd="formIsAdd"
      :formData1="tableData1"
      :formData2="tableData2"
    ></performanceForm>
  </div>
</template>

<script>
import performanceServer from "../../api/performance";
import performanceForm from "./performance-form";
export default {
  name: "",
   components: {
    performanceForm
  },
  data() {
    return {
      // tableDataDetail:[],
      
      isLoading: false,
      searchForm: {},
      isEdit:false,
      titleForm:'',
      performanceFormVisible:false,
      formIsAdd:null,
      tableData1:{},
      tableData2:{},
      isDisabled:false,
      // creatMonthArr:[],
      pickerOptions: {
            disabledDate: (time) => {
              // console.log(time)
              let year = time.getFullYear()
              let month = time.getMonth() + 1
              if (month < 10) month = '0' + month
              let ym = year + '-' + month
              return this.creatMonthArr.includes(ym)
            }
      }
    };
  },
  computed: {
    formDialogVisible: {
      get: function() {
        return this.dialogVisible;
      },
      set: function() {
        this.closeDialog();
      }
    },
    tableData(){
      return this.rowList;
    },
    timeDefault() {
      var date = new Date();
      var month;
      var day;
      if (date.getMonth()+ 1<10) {
        month='0'+(date.getMonth()+ 1)
      } else {
        month=date.getMonth()+ 1
      }
      if (date.getDate()<10) {
        day='0'+date.getDate()
      } else {
        day=date.getDate()
      }
      var s1 = date.getFullYear() + "-" + month + "-" + day;
      return s1;
    },
  },
  watch:{
    tableData(newVal,oldVal){
      console.log(newVal);
      if (newVal.length>0) {
        this.isDisabled=true;
      } else {
        this.searchForm={};
        this.isDisabled=false;
      }
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Number,
      default: true
    },
    rowList: {
      type: Array,
      default:()=>[]
    },
    title: {
      type: String,
      default: ""
    },
    tableDataEdit: {
      type: Array,
      default:()=>[]
    },
    tableDataSelf: {
      type: Array,
      default:()=>[]
    },
    creatMonthArr:{
      type: Array,
      default:()=>[]
    }
  },
  methods: {
    loadList() {},
    openDialog() {
      // this.fileList=this.formData.imgs;
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    addGoal(){
      if (this.searchForm.assesstime&&this.searchForm.name&&this.searchForm.score&&this.searchForm.target&&this.searchForm.goalExplain) {
        if (this.isEdit==false) {
          this.tableData.push(this.searchForm);
          this.searchForm={
            assesstime:this.searchForm.assesstime,
          };
          
        }else{
          this.searchForm=this.searchForm;
          this.searchForm={
            assesstime:this.searchForm.assesstime,
          };
          this.isEdit=false;
        }
        
      }
      
    },
    handleEdit(id,index,val) {
      if (val==1) {
        this.isEdit=true;
        this.tableData.some((item,i)=>{
          if (index==i) {
            this.searchForm=this.tableData[i];         
            return
          }
        })     
      }
      if (val==2) {
        this.formIsAdd=1;
        this.titleForm='编辑';
        this.performanceFormVisible=true;
        this.tableData1=this.tableDataEdit[index];
      }
      if (val==3) {
        this.formIsAdd=2;
        this.titleForm='自评';
        this.performanceFormVisible=true;
        this.tableData2=this.tableDataSelf[index];
      }
    },
    handleDelete(id,index) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // businessServer.visitRecordDel(
          //   id,
          //   res => {
          //     this.$message.success("删除成功");
          //     this.loadList();
          //   },
          //   () => {}
          // );
          this.tableData.some((item,i)=>{
            if (index==i) {
              this.tableData.splice(i,1);
              return
            }
          })
        })
        .catch(() => {});
    },
    save(val){
      if (val==1) {       
        this.formDialogVisible=false;
        this.tableData.map((item,index)=>{
          item.submittime=this.timeDefault;
        })
        performanceServer.performanceTargetAdd(this.tableData,res=>{
          this.$message.success('新增成功');
          this.$emit('submit-success');  
          this.$emit('close-dialog'); 
        },()=>{})
      }
      if (val==2) {
        performanceServer.performanceTargetUpdate(this.tableDataEdit,res=>{
          this.$message.success('编辑成功');
          this.$emit('submit-success1');  
          this.$emit('close-dialog');
        },()=>{})
      }
      if (val==3) {
        var amiit=false;
        var arr=[];
        var newArr=[];
        this.tableDataSelf.map(item=>{
            arr.push(item.finish,item.meScore)
            // arr.push(item.meScore)
        })
        console.log(arr)
        arr.forEach(element => {
          if (element=="" || element==null) {
            newArr.push(element)
          }
        });
        // console.log(newArr)
        // console.log(newArr.length)
        if (newArr.length==0) {
          amiit=true;
        }
        console.log(amiit)
        if (amiit==true) {         
          performanceServer.performanceTargetUpdate(this.tableDataSelf,res=>{
            this.$message.success('自评成功');
            this.$emit('submit-success1');  
            this.$emit('close-dialog');
          },()=>{})
        }else{
          this.$message.warning('目标没有自评完成，不予提交')
        }
      }
    },
    closePerformanceDialog(){
      this.performanceFormVisible=false;
    },
  },

  created() {},
  mounted() {
    this.loadList();
  }
};
</script>

<style scoped lang="less">
.addZB {
  border: 1px solid #e9e9e9;
  padding: 1%;
  border-radius:8px;
  box-shadow: 0 0 10px #ededed;
  display: flex;
  align-items: center;
}
.addZBLeft{
  width: 80%;
}
.addZBRight{
  width: 15%;
}
</style>