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
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入任务名称，20字以内"></el-input>
            </el-form-item>
            <el-form-item label="任务类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option label="需求分析" :value="1"></el-option>
                <el-option label="原型设计" :value="2"></el-option>
                <el-option label="开发" :value="3"></el-option>
                <el-option label="优化" :value="4"></el-option>
                <el-option label="测试" :value="5"></el-option>
                <el-option label="BUG修复" :value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务负责人" prop="responsibleId">
              <el-select v-model="formData.responsibleId" placeholder="请选择">
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划开始时间" prop="startdate">
              <el-date-picker v-if="isAdd==1"
                v-model="startdate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-date-picker v-if="isAdd==3"
                v-model="formData.startdate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划结束时间" prop="enddate">
              <el-date-picker
                v-model="enddate" v-if="isAdd==1"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <el-date-picker
                v-model="formData.enddate" v-if="isAdd==3"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="任务描述" prop="note">
              <el-input type="textarea" :rows="3" v-model="formData.note" placeholder="请输入"></el-input>
            </el-form-item>
              
            <el-form-item label="添加附件" prop="attachmentUrl" v-if="isAdd==1">
              <el-upload class="upload-demo" action="string" accept=".jpg,.jpeg,.png,.rar,.zip,.doc,.docx,.pdf"
               :http-request="upload" :on-success="handleAvatarSuccess" v-loading="uploading" :file-list="fileLis"
               :on-remove="handle_remove">
                +添加附件
              </el-upload>    
            </el-form-item>

            <!-- <el-form-item label="照片" prop="imgs" v-if="isAdd==2">
                <img :src="item" v-for="(item,index) in formData.imgs" :key="index" alt="" style="width:148px;height:148px;margin-right:2px" @click="yuLan(item)">
             </el-form-item>   -->
            
            <el-form-item label="添加附件" prop="attachmentUrl" v-if="isAdd==3">   
                <el-upload class="upload-demo" action="string"  accept=".jpg,.jpeg,.png,.rar,.zip,.doc,.docx,.pdf"
                :http-request="upload" :on-success="handleAvatarSuccess" v-loading="uploading" :on-exceed="handOverLimit" :file-list="fileLis"
                :on-preview="handleDownload" :on-remove="handle_remove" :before-upload="handBeforeUpload">
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
    <!-- <el-dialog :visible.sync="dialogImgVisible" style="z-index:9999">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
  </div>
</template>

<script>
import publicServer from '../../api/public'
import projectServer from "../../api/projectManage";
export default {
  name: "",
  components: {},
  data() {
    return {
        searchForm:{page: 1, pageSize: 100},
        businessOrChannelList:[],
        formRules: {},
        // fileList:[],
        // imgList:[],
        uploading:false,
        dialogImageUrl: '',
        dialogImgVisible: false,
        limits:3,
        startdate:'',
        enddate:'',
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
    formData(){
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
    fileLis(){
      return this.file.map(item=>{
        return {name:item,url:item}
      });
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
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ""
    },
    userList:{
      type:Array,
      default:[]
    },
    file:{
      type:Array,
      default:[]
    },
    imgList:{
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
    businessOrChannel(){
        // businessServer.businessFind(this.searchForm,res=>{
        //     this.businessOrChannelList=res.data.list;
        // },()=>{})
    },
    yuLan(url){
        // this.dialogImageUrl = url;
        // this.dialogImgVisible = true;
    },
    handlePictureCardPreview(file) {//预览
        // this.dialogImageUrl = file.url;
        // this.dialogImgVisible = true;
    },
    //下载
    handleDownload(file) {
      
      //获取最后一个.的位置
      var index= file.url.lastIndexOf(".");
      //获取后缀
      var ext = file.url.substr(index+1);
      if (ext=="jpg"||ext=="png"||ext=="jpeg") {
        this.downloadImg(file.url)
      }
      if(ext=="doc"||ext=="docx"||ext=="xls"||ext=="xlsx"){
        window.location.href=file.url;    
      }
      if (ext=="pdf") {
        // download(this.contract_content,"xxx","application/pdf");
        this.downloadFile(file.url,file.url);
      }
    },
    //pdf下载
   downloadFile(url,name){
    var request = new XMLHttpRequest();
        request.responseType = "blob";
        request.open("GET", url);
        request.onload = function() {
            var url = window.URL.createObjectURL(this.response);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = `${name}.pdf`
            a.click();
        }
        request.send();
},
    //图片下载
    downloadImg(url){
        let xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",url,true);
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function(){
          if (this.status == 200) {
            const blob = this.response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = url.substring(url.lastIndexOf("/")+1, url.length);
 
            //此写法兼容火狐浏览器
            document.body.appendChild(link);
 
            const evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            link.dispatchEvent(evt);
            window.URL.revokeObjectURL(link.href)
            document.body.removeChild(link);
          };
        }
 
        xmlhttp.send();
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
        // // console.log(this.imgList)
        
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
            // this.formData.attachmentUrl=this.imgList;
            this.formData.attachmentUrl=this.imgList.join(',');
            this.formData.startdate=this.startdate;
            this.formData.enddate=this.enddate;
            projectServer.projectTaskAdd(this.formData,res=>{

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
            this.formData.attachmentUrl=this.imgList.join(',');
            // this.formData.startdate=this.startdate;
            // this.formData.enddate=this.enddate;
            projectServer.projectTaskAdd(this.formData,res=>{

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
      this.startdate=this.timeDefault;
      this.enddate=this.timeDefault;
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


