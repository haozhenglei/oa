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
            :model="form"
            :rules="formRules"
            ref="submitForm"
            label-width="100px"
            size="small"
          >
            <el-form-item label="自编号" prop="oneselfNo">
              <el-input v-model="form.oneselfNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来文字号" prop="fileNo">
              <el-input v-model="form.fileNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="文件名称" prop="fileName">
              <el-input v-model="form.fileName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="秘密等级" prop="secretGrade">
              <el-select v-model="form.secretGrade" placeholder="请选择">
                <el-option label="秘密" :value="1"></el-option>
                <el-option label="机密" :value="2"></el-option>
                <el-option label="绝密" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="份数" prop="copies">
              <el-input v-model="form.copies" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="页数" prop="pages">
              <el-input v-model="form.pages" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来文机关" prop="signReceiveCompany">
              <el-input v-model="form.signReceiveCompany" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="收文日期" prop="issueTime">
              <el-date-picker
                v-model="form.issueTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="签收人" prop="signReceiveUser">
              <el-input v-model="form.signReceiveUser" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="签收日期" prop="signReceiveTime">
              <el-date-picker
                v-model="form.signReceiveTime"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input type="textarea" :rows="2" placeholder="请输入" v-model="form.comment"></el-input>
            </el-form-item>
            <el-form-item prop="adjunctAdress" v-if="isAdd===1">
              <el-upload class="upload-demo" action="string" multiple :file-list="fileLis" :http-request="upload" :on-success="handleAvatarSuccess" 
              v-loading="uploading" accept=".pdf,.doc,.docx" :on-remove="handle_remove">
                <el-button type="text">+添加收文原文附件</el-button>
              </el-upload>
            </el-form-item> 
            <el-form-item label="收文原文附件" prop="" v-if="isAdd===2">
              <el-button type="text" v-for="(item,index) in form.adjunctAdress.split(',')" :key="index" @click="handleView(item)">{{item}}</el-button>
            </el-form-item>  
            <el-form-item prop="adjunctAdress" v-if="isAdd===3">
              <el-upload class="upload-demo" action="string" :file-list="fileLis" :http-request="upload" :on-success="handleAvatarSuccess" 
              v-loading="uploading" accept=".pdf,.doc,.docx" :on-remove="handle_remove">
                <el-button type="text">+添加收文原文附件</el-button>
              </el-upload>
            </el-form-item>  
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" :disabled="isAdd === 2" type="primary" @click="handleSubmit(isAdd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import publicServer from '../../api/public'
import documentServer from "../../api/document";
export default {
  data() {
    return {
      // form:{
      //   sendType:1,
      //   oneselfNo:'',
      //   fileNo:'',
      //   fileName:'',
      //   secretGrade:'',
      //   copies:'',
      //   pages:'',
      //   issueTime:'',
      //   signSendUser:'',
      //   signReceiveCompany:'',
      //   signReceiveUser:'',
      //   signReceiveTime:'',
      //   comment:'',
      //   adjunctAdress:'',   
      // },
      // formRules1: {
      //   oneselfNo: {required: true, message: '请输入自编号'},
      //   fileNo: {required: true, message: '请输入来文字号'},
      //   fileName: {required: true, message: '请输入文件名称'},
      //   secretGrade: {required: true, message: '请选择文件秘密等级'},
      //   copies: {required: true, message: '请输入文件份数'},
      //   pages: {required: true, message: '请输入文件页数'},
      //   issueTime: {required: true, message: '请选择收文日期'},
      //   signReceiveCompany: {required: true, message: '请输入来文机关'},
      //   signReceiveUser: {required: true, message: '请输入签收人'},
      //   signReceiveTime: {required: true, message: '请选择签收日期'},
      //   adjunctAdress: {required: true, message: '请添加附件'},
      // },
      // formRules3: {
      //   oneselfNo: {required: true, message: '请输入自编号'},
      //   fileNo: {required: true, message: '请输入来文字号'},
      //   fileName: {required: true, message: '请输入文件名称'},
      //   secretGrade: {required: true, message: '请选择文件秘密等级'},
      //   copies: {required: true, message: '请输入文件份数'},
      //   pages: {required: true, message: '请输入文件页数'},
      //   issueTime: {required: true, message: '请选择收文日期'},
      //   signReceiveCompany: {required: true, message: '请输入来文机关'},
      //   signReceiveUser: {required: true, message: '请输入签收人'},
      //   signReceiveTime: {required: true, message: '请选择签收日期'},
      //   adjunctAdress: {required: true, message: '请添加附件'},
      // },
      formRules:{},
      uploading:false,
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
    form(){
      return this.rowList;
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
    // rowListUpdate: {
    //   type: Object,
    //   default: {}
    // },
    title: {
      type: String,
      default: ""
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
    openDialog() {},
    closeDialog() {
      this.$emit("close-dialog");
    },
    
    upload(item) {
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
      console.log(this.imgList)
    },
    handleSubmit(val) {
      if (val==1) {
        this.$refs['submitForm'].validate(valid => {
        if (valid) {
          this.form.adjunctAdress=this.imgList.join(',');
          this.form.sendType=1;
          documentServer.sendFileListInsert(this.form,res=>{
            this.$message.success('新增成功')
            this.$emit('submit-success');  
            this.$emit('close-dialog'); 
          },()=>{})      
             
        }
      });
      }else if (val==3) {
        this.$refs['submitForm'].validate(valid => {
        if (valid) {
          this.form.adjunctAdress=this.imgList.join(',');
          this.form.sendType=1;
          documentServer.sendFileUpdate(this.form,res=>{
            this.$message.success('修改成功')
            this.$emit('submit-success');  
            this.$emit('close-dialog'); 
          },()=>{})      
             
        }
      });
      }
      
    },
    //下载
    handleView(url) {
      //获取最后一个.的位置
      var index= url.lastIndexOf(".");
      //获取后缀
      var ext = url.substr(index+1);
      if(ext=="doc"||ext=="docx"||ext=="xls"||ext=="xlsx"){
        window.location.href=url;    
      }
      if (ext=="pdf") {
        // download(this.contract_content,"xxx","application/pdf");
        this.downloadFile(url,url);
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
  }
};
</script>
<style lang="less" scoped>
/deep/.el-button+.el-button{
  margin-left:0;
}
</style>