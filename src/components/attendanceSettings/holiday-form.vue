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
            <el-form-item label="节日名称" prop="holidayName">
              <el-input v-model="formData.holidayName" placeholder="请输入"></el-input>
            </el-form-item>         
            <el-form-item label="放假时间" prop="" v-if="isAdd==1">
              <el-date-picker
                v-model="holidayTime"
                type="daterange"
                format="MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> 
            <el-form-item label="放假时间" prop="" v-if="isAdd==2">
              <el-date-picker
                v-model="holidayTime2"
                type="daterange"
                format="MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item> 
            <el-form-item label="调休日期" prop="" v-if="isAdd==1">
              <el-date-picker
                type="dates"
                v-model="workOffDay"
                placeholder="调休上班日期"
                format="MM-dd"
                value-format="MM-dd">
              </el-date-picker>
            </el-form-item>  
            <el-form-item label="调休日期" prop="" v-if="isAdd==2">
              <el-date-picker
                type="dates"
                v-model="workOffDay2"
                placeholder="调休上班日期"
                format="MM-dd"
                value-format="MM-dd">
              </el-date-picker>
            </el-form-item> 
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button
          size="small"
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
import attendanceSettingServer from "../../api/attendanceSetting";
export default {
  name: "",
  components: {},
  data() {
    return {
        // formData:{startdate:''},
        searchForm:{page: 1, pageSize: 100},
        formRules: {},
        uploading:false,
        searchId:'',
        userList:[],
        userIds:[],
        imgList:[],
        holidayTime:'',
        workOffDay:'',
        // holidayTime2:[this.formData.startDateTwo,this.formData.endDateTwo],
        // workOffDay2:'',
        workOffDayEdit:[],
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
    
  },
  watch:{
    userIds:function(newVal, oldVal){
      // console.log(newVal)
    },
    holidayTime2:function(newVal, oldVal){
    //   console.log(newVal)
    },
    workOffDay2:function(newVal, oldVal){
        // console.log(newVal)
      this.workOffDayEdit=newVal;
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
    formData: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ""
    },
    holidayTime2:{
      type:Array,
      default:[]
    },
    workOffDay2:{
      type:Array,
      default:[]
    }
  },
  methods: {
    openDialog() {
        // if (this.isAdd==2) {
        //     this.holidayTime=[this.formData.startDateTwo,this.formData.endDateTwo];
        //     this.workOffDay=this.formData.workOffDay.split(',')
        // }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleSubmit(val) {
      if (val==1) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
              // console.log(typeof this.workOffDay)
              // console.log(this.workOffDay)
            this.formData.startDate=this.holidayTime[0];
            this.formData.endDate=this.holidayTime[1];
            this.formData.workOffDay=this.workOffDay!==""?this.workOffDay.join(','):this.workOffDay,
            attendanceSettingServer.holidayAdd(this.formData,res=>{

              this.$message.success('新增成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
      if (val==2) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
           this.formData.startDate=this.holidayTime2[0];
            this.formData.endDate=this.holidayTime2[1];
            if (this.workOffDayEdit!==null) {
                this.formData.workOffDay=this.workOffDayEdit.join(',')
            }else{
                this.formData.workOffDay=""
            }
            // this.formData.workOffDay=this.workOffDayEdit!==""?this.workOffDayEdit.join(','):this.workOffDayEdit,
            attendanceSettingServer.holidayUpdate(this.formData,res=>{

              this.$message.success('修改成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
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
      
  },
  created() {},
  mounted() {
    this.formData.startdate=this.timeDefault;
    // this.holidayTime2=[this.formData.startDateTwo,this.formData.endDateTwo];
    // this.workOffDay2=this.formData.workOffDay;
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


