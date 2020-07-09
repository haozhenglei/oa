<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="formDialogVisible"
      width="600px"
      top="0"
      :close-on-click-modal="false"
      custom-class="center-dialog"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
        <div class="dialog-content">
          <el-form
            :model="formData"
            :rules="formRules"
            ref="submitForm"
            label-width="100px"
            size="small"
          >
          <div v-if="staval==1">
            <el-form-item label="借阅部门" prop="phone">
              <el-select v-model="depart_value" placeholder="请选择" @change="depart_change">
                <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借阅人" prop="userId">
              <el-select v-model="userValue" placeholder="请选择" @change="user_change">
                <el-option v-for="item of userLis" :label="item.name" :value="item.id" :key="item.id" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借阅日期" prop="borrowTime">
              <el-date-picker
                v-model="formData.borrowTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
            <el-form-item label="归还日期" prop="borrowTime" v-if="staval==2">
              <el-date-picker
                v-model="formData.borrowTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit(staval)">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import documentServer from "../../api/document";
import publicServer from '../../api/public'
import staffServer from '../../api/staff'
export default {
  data() {
    return {
      formData: {
        borrowTime:'',
      },
      formRules: {},
      groupList: [],//部门列表
      userList:[],
      depart_value:'',
      userValue:'',
    };
  },
  computed: {
    bodyHeight() {
      return this.$store.state.Public.bodyHeight;
    },
    formDialogVisible: {
      get: function() {
        return this.dialogVisible;
      },
      set: function() {
        this.closeDialog();
      }
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
    userLis(){
      return this.userList;
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    borrowid : {
      type: Number,
      default: true
    },
    staval : {
      type: Number,
      default: true
    },
    title : {
      type: String,
      default: ""
    },
  },
  mounted(){
    this.formData.borrowTime=this.timeDefault;
    this.Company();
  },
  methods: {
    openDialog() {},
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleSubmit(val) {
      if (val==1) {
        
        this.formData.fileId=this.borrowid;
        this.formData.status=2;
        this.formData.userId=this.userValue;
        documentServer.dataBorrow(this.formData,res=>{
          if (res.code==200) {
            this.$message.success('保存成功')
            this.$emit("borrow-saveSuc")
            this.$emit("close-dialog");
          }
        },()=>{})
      }
      if (val==2) {
        
        this.formData.fileId=this.borrowid;
        this.formData.status=1;
        // this.formData.userId=this.userValue;
        documentServer.dataBorrow(this.formData,res=>{
          if (res.code==200) {
            this.$message.success('保存成功')
            this.$emit("borrow-saveSuc")
            this.$emit("close-dialog");
          }
        },()=>{})
      }
      },
    Company() {
        publicServer.findCompanyList({}, (res) => {
          this.groupList = res.data    
        }, () => {
        });
      },
    
    depart_change(val){
      this.userValue='';
      staffServer.queryUserList({page: 1, pageSize: 10,branchId:this.depart_value}, res => {
         this.userList=res.data.list;
        }, () => {
          
        })
        
    },
    user_change(val){
    },
  }
};
</script>
<style lang="less" scoped>
h3 {
  padding: 0 0 15px 0;
}
li span:nth-child(n + 2) {
  margin-left: 30px;
}
</style>