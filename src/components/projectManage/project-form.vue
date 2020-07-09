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
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- <el-form-item label="项目编号" prop="code">
              <el-input v-model="formData.code" placeholder="请输入"></el-input>
            </el-form-item> -->
            <el-form-item label="项目经理" prop="projectManager">
              <el-select v-model="formData.projectManager" filterable placeholder="请选择" @change="channelFromChange">
                <el-option
                  v-for="item in staff"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属部门" prop="">
              <el-select v-model="searchId" disabled placeholder="请选择" @change="departChange">
                <el-option
                  v-for="item in group"
                  :key="item.id"
                  :label="item.branchName"
                  :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>
            <el-form-item label="参与人员" prop="userIds">
              <el-select v-model="userIds" multiple placeholder="请选择" @change="chooseUser">
                <el-option
                  v-for="item in staff"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始日期" prop="startdate">
              <el-date-picker
                v-model="formData.startdate"
                type="date"
                placeholder="开始日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="交付日期" prop="enddate">
              <el-date-picker
                v-model="formData.enddate"
                type="date"
                placeholder="交付日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>  
            <el-form-item label="添加附件" prop="imgs" v-if="isAdd==1">
              <el-upload class="upload-demo" action="string" accept=".jpg,.jpeg,.png,.rar,.zip,.doc,.docx,.pdf"
               :http-request="upload" :on-success="handleAvatarSuccess" v-loading="uploading" :on-exceed="handOverLimit" 
               :on-remove="handle_remove">
                +添加附件
              </el-upload>    
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button
          size="small"
          :disabled="isAdd === 2"
          type="primary"
          @click="handleSubmit(isAdd)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicServer from '../../api/public'
import staffServer from '../../api/staff'
import projectServer from '../../api/projectManage'
export default {
  name: "",
  components: {},
  data() {
    return {
        formData:{startdate:''},
        searchForm:{page: 1, pageSize: 100},
        formRules: {},
        uploading:false,
        searchId:'',
        userList:[],
        userIds:[],
        imgList:[],
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
    // formData(){
    //   return this.rowList;
    // },
    // fileLis(){
    //   return this.file.map(item=>{
    //     return {name:item,url:item}
    //   });
    // },
  },
  watch:{
    userIds:function(newVal, oldVal){
      // console.log(newVal)
    }
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
    // rowList: {
    //   type: Object,
    //   default: {}
    // },
    title: {
      type: String,
      default: ""
    },
    staff:{
      type:Array,
      default:[]
    },
    group:{
      type:Array,
      default:[]
    }
  },
  methods: {
    openDialog() {
        
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    channelFromChange(val){
        this.userIds=[],
        this.staff.map(item=>{
            if (item.id==val) {
                this.searchId=item.branchId;
                
            }
        })
    },
    departChange(val){
        console.log(val)
    },
    chooseUser(val){
      // console.log(val)
    },
    handOverLimit(){
        // this.$message.warning('不能超过三张照片')
    },
    handBeforeUpload(){

    },
    upload(item){
        
        this.uploading=true;
        let formData = new FormData();
        formData.append('greenPic', item.file);
        publicServer.uploadPic(formData, (res) => {
          this.uploading=false;
          item.onSuccess(res.data);
        },(res) => {
        });
      },
      handleAvatarSuccess(res,file,fileList) {
        this.imgList.push(res[0]);  
        // console.log(this.imgList)
        
      },
      handle_remove(file, fileList) {
      var _tmp = this.imgList;
      // console.log(file);
      // console.log(fileList);
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if (this.isAdd==1) {
          if (_tmp[i] == file.response[0]) {
          _tmp.splice(i, 1);
          break;
          }
        }else if (this.isAdd==3) {
          if (_tmp[i] == file.url) {
          _tmp.splice(i, 1);
          break;
          }
        }
        
      }
      this.imgList = _tmp;
      // console.log(this.imgList)
    },
      handleSubmit(val) {
      if (val==1) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
            this.formData.companyId=this.searchId;
            this.formData.userIds=this.userIds.join(',');
            this.formData.attachmentUrl=this.imgList.join(',');
            projectServer.projectAdd(this.formData,res=>{

              this.$message.success('新增成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
      if (val==3) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
            this.formData.userIds=this.userIds;
            this.formData.attachmentUrl=this.imgList;
            projectServer.projectAdd(this.formData,res=>{

              this.$message.success('修改成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
    },
  },
  created() {},
  mounted() {
    this.formData.startdate=this.timeDefault;
    // this.businessOrChannel();
  }
};
</script>

<style lang="less" scoped>
h3 {
  padding: 0 0 15px 0;
}
hr {
  background-color: #ededed;
  margin-bottom: 10px;
  height: 1px;
  border: none;
}
</style>


