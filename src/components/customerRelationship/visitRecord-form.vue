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
            <h3>客户基本信息</h3>
            <el-form-item label="拜访日期" prop="visitDate">
              <el-date-picker
                v-model="formData.visitDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="拜访方式" prop="visitWay">
              <el-select v-model="formData.visitWay" placeholder="请选择">
                <el-option label="上门拜访" :value="1"></el-option>
                <el-option label="电话拜访" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="拜访商家/渠道" prop="merchantsName">
              <!-- <el-select v-model="formData.merchantsId" filterable placeholder="请选择" @change="channelFromChange">
                <el-option
                  v-for="item in businessOrChannelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select> -->
              <el-input v-model="formData.merchantsName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="拜访地址" prop="visitAddress">
              <el-input v-model="formData.visitAddress" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="受访人" prop="respondents">
              <el-input v-model="formData.respondents" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="拜访人" prop="visitPerson">
              <el-input v-model="formData.visitPerson" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="拜访结果" prop="visitResult">
              <el-select v-model="formData.visitResult" placeholder="请选择">
                <el-option label="拜访成功" :value="1"></el-option>
                <el-option label="拜访失败" :value="2"></el-option>
              </el-select>
            </el-form-item>  
            <el-form-item label="添加照片" prop="imgs" v-if="isAdd==1">
              <el-upload class="upload-demo" action="string" multiple accept=".jpg,.jpeg,.png,.JPG,.JPEG" :limit='3' list-type="picture-card"
               :http-request="upload" :on-success="handleAvatarSuccess" v-loading="uploading" :on-exceed="handOverLimit" :file-list="fileLis"
               :on-preview="handlePictureCardPreview" :on-remove="handle_remove">
                <i class="el-icon-plus"></i>
              </el-upload>    
            </el-form-item>

            <el-form-item label="照片" prop="imgs" v-if="isAdd==2">
                <img :src="item" v-for="(item,index) in formData.imgs" :key="index" style="width:148px;height:148px;margin-right:2px;border-radius:5px" @click="yuLan(item)">
             </el-form-item>  
            
            <el-form-item label="添加照片" prop="imgs" v-if="isAdd==3">   
                <el-upload class="upload-demo" action="string" accept=".jpg,.jpeg,.png,.JPG,.JPEG" :limit='limits' list-type="picture-card"
                :http-request="upload" :on-success="handleAvatarSuccess" v-loading="uploading" :on-exceed="handOverLimit" :file-list="fileLis"
                :on-preview="handlePictureCardPreview" :on-remove="handle_remove" :before-upload="handBeforeUpload">
                    
                    <i class="el-icon-plus"></i>
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
    <el-dialog :visible.sync="dialogImgVisible" style="z-index:9999">
        <img width="100%" :src="dialogImageUrl" alt="">
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
        searchForm:{page: 1, pageSize: 100},
        businessOrChannelList:[],
        formRules: {},
        fileLists:[],
        // imgList:[],
        uploading:false,
        dialogImageUrl: '',
        dialogImgVisible: false,
        limits:3,
        newArr:[],
    };
  },
  watch:{
    // fileLists(newVal,oldVal){
    //   // console.log(newVal);
    //   newVal.map(item=>{
    //       item.response?this.imgList.push(item.response[0]):this.imgList
    //     }) 
    //     console.log(this.imgList)
    // }
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
      default: {}
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
    businessOrChannel(){
        businessServer.businessFind(this.searchForm,res=>{
            this.businessOrChannelList=res.data.list;
        },()=>{})
    },
    yuLan(url){
        this.dialogImageUrl = url;
        this.dialogImgVisible = true;
    },
    handlePictureCardPreview(file) {//预览
        this.dialogImageUrl = file.url;
        this.dialogImgVisible = true;
    },
    handOverLimit(){
        this.$message.warning('不能超过三张照片')
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
        // console.log(res)
        this.imgList.push(res[0]); 
        // console.log(this.imgList)
        // console.log(fileList)  
      },
      handle_remove(file, fileList) {
      var _tmp = this.imgList;
      // console.log(_tmp);
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
            
            this.formData.imgs=this.imgList;
            this.formData.merchantsId=1;
            businessServer.visitRecordAdd(this.formData,res=>{

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
            this.formData.imgs=this.imgList;
            this.formData.merchantsId=1;
            businessServer.visitRecordAdd(this.formData,res=>{

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
    this.businessOrChannel();
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


