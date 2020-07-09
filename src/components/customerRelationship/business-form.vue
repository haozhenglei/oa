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
            <h3>商家基本信息</h3>
            <el-form-item label="商家名称" prop="name">
              <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="机构代码" prop="organizationCode">
              <el-input v-model="formData.organizationCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="法人代表" prop="legal">
              <el-input v-model="formData.legal" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="formData.address" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="formData.contact" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="formData.tel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="formData.state" placeholder="请选择">
                <el-option label="开发" :value="1"></el-option>
                <el-option label="跟进" :value="2"></el-option>
                <el-option label="谈判" :value="3"></el-option>
                <el-option label="审批" :value="4"></el-option>
                <el-option label="签订" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <hr />
            <h3>合同相关信息</h3>
            <el-form-item label="合同编号" prop="pactNo ">
              <el-input v-model="formData.pactNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="签订日期" prop="signingDate">
              <el-date-picker
                v-model="formData.signingDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="到期日期" prop="dueDate">
              <el-date-picker
                v-model="formData.dueDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否续签" prop="isRenew">
              <el-radio v-model="formData.isRenew" :label="1">是</el-radio>
              <el-radio v-model="formData.isRenew" :label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="2" v-model="formData.note" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item prop="attachments" v-if="isAdd===1">
              <el-upload class="upload-demo" action="string" :file-list="fileLis" :http-request="upload" :on-success="handleAvatarSuccess" 
              v-loading="uploading" accept=".pdf,.doc,.docx" :on-remove="handle_remove">
                <el-button type="text">+添加附件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="附件" prop="attachments" v-if="isAdd==2">
              <el-button type="text" v-for="(item,index) in formData.attachments" :key="index" @click="yuLan(item)"
                title="点击下载"
                style="cursor:pointer;margin-left:0"><i class="el-icon-document" style="margin:0 0.2rem"></i>{{item.substr(item.lastIndexOf("/")+1)}}</el-button>
            </el-form-item>
            <el-form-item prop="adjunctAdress" v-if="isAdd===3">
              <el-upload class="upload-demo" action="string" :file-list="fileLis" :http-request="upload" :on-success="handleAvatarSuccess" 
              v-loading="uploading" accept=".pdf,.doc,.docx" :on-remove="handle_remove">
                <el-button type="text">+添加附件</el-button>
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
import businessServer from '../../api/business'
export default {
  name: "",
  components: {},
  data() {
    return {
        formRules: {},
        // fileList:[],
        // fiList:[],
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
    formData(){
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
      default:()=> {}
    },
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
    openDialog() {
      
    },
    closeDialog() {
      this.$emit("close-dialog");
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
      // this.form.adjunctAdress = res[0]
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
    //下载
    yuLan(url) {
      // this.contract_content=this.tableData[index].fileUrl;
      //获取最后一个.的位置
      var index = url.lastIndexOf(".");
      //获取后缀
      var ext = url.substr(index + 1);
      if (ext == "jpg" || ext == "png" || ext == "jpeg") {
        this.downloadImg(url);
      }
      if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx") {
        window.location.href = url;
      }
      if (ext == "pdf") {
        // download(this.contract_content,"xxx","application/pdf");
        this.downloadFile(url, url.substr(url.lastIndexOf("/") + 1));
      }
    },
    //pdf下载
    downloadFile(url, name) {
      var request = new XMLHttpRequest();
      request.responseType = "blob";
      request.open("GET", url);
      request.onload = function() {
        var url = window.URL.createObjectURL(this.response);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = `${name}.pdf`;
        a.click();
      };
      request.send();
    },
    //图片下载
    downloadImg(url) {
      // const url = this.contract_content;
      // window.open(_this.detail.imgUrl)
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.responseType = "blob";
      xmlhttp.onload = function() {
        if (this.status == 200) {
          const blob = this.response;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = url.substring(url.lastIndexOf("/") + 1, url.length);

          //此写法兼容火狐浏览器
          document.body.appendChild(link);

          const evt = document.createEvent("MouseEvents");
          evt.initEvent("click", false, false);
          link.dispatchEvent(evt);
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
        }
      };

      xmlhttp.send();
    },
      handleSubmit(val) {
      if (val==1) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
              this.formData.attachments=this.imgList;
              this.formData.type=1;
            businessServer.businessAdd(this.formData,res=>{

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
            this.formData.type=1;
            this.formData.attachments=this.imgList;
            businessServer.businessAdd(this.formData,res=>{

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
  mounted() {}
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


