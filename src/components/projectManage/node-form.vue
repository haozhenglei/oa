<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="nodeDialogFormVisible"
      width="600px"
      top="0"
      :close-on-click-modal="false"
      custom-class="center-dialog"
      @open="openDialog"
      @close="closeDialog"
    >
      <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
        <div class="dialog-content">
          <el-form ref="form" :model="form" label-width="100px" v-if="isAdd==1">
            <el-form-item label="实际开始" prop="date">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="实际开始"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="3" v-model="form.note"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="form2" :model="form2" label-width="100px" v-if="isAdd==2">
            <el-form-item label="时间" prop="date">
              <el-date-picker
                v-model="form2.date"
                type="date"
                placeholder="时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完成度" prop="completionPercentage">
              <el-input type="text" v-model="form2.completionPercentage" class="percentegy">
                  <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="3" v-model="form2.note"></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop>
              <el-upload
                class="upload-demo"
                action="string"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
          <el-form ref="form3" :model="form3" label-width="100px" v-if="isAdd==3">
            <el-form-item label="完成时间" prop="date">
              <el-date-picker
                v-model="form3.date"
                type="date"
                placeholder="完成时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="3" v-model="form3.note"></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop>
              <el-upload
                class="upload-demo"
                action="string"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmit(isAdd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import projectServer from "../../api/projectManage";
import staffServer from "../../api/staff";
import publicServer from '../../api/public'
export default {
  name: "",
  components: {},
  data() {
    return {
      uploading: false
    };
  },
  computed: {
    bodyHeight() {
      return this.$store.state.Public.bodyHeight;
    },
    nodeDialogFormVisible: {
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
      var hh=date.getHours()<10 ? '0'+date.getHours() : date.getHours();
      var mm=date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
      var ss=date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
      if (date.getMonth() + 1 < 10) {
        month = "0" + (date.getMonth() + 1);
      } else {
        month = date.getMonth() + 1;
      }
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      } else {
        day = date.getDate();
      }
      var s1 = date.getFullYear() + "-" + month + "-" + day+ " "+hh+":"+mm+":"+ss;
    //   console.log(s1)
      return s1;
    }
    // formData(){
    //   return this.rowList;
    // },
    // fileLis(){
    //   return this.file.map(item=>{
    //     return {name:item,url:item}
    //   });
    // },
  },
  watch: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Number,
      default: true
    },
    form: {
      type: Object,
      default: {}
    },
    form2: {
      type: Object,
      default: {}
    },
    form3: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ""
    },
    file: {
      type: Array,
      default: []
    },
    imgList: {
      type: Array,
      default: []
    }
  },
  methods: {
    openDialog() {},
    closeDialog() {
      this.$emit("close-dialog");
    },
    handOverLimit() {
      // this.$message.warning('不能超过三张照片')
    },
    handBeforeUpload() {},
    upload(item) {
      this.uploading = true;
      let formData = new FormData();
      formData.append("greenPic", item.file);
      publicServer.uploadPic(
        formData,
        res => {
          this.uploading = false;
          item.onSuccess(res.data);
        },
        res => {}
      );
    },
    handleAvatarSuccess(res, file, fileList) {
      this.imgList.push(res[0]);
      // // console.log(this.imgList)
    },
    handle_remove(file, fileList) {
      var _tmp = this.imgList;
      // console.log(file);
      // console.log(fileList);
      for (var i = 0, len = _tmp.length; i < len; i++) {
        // if (this.isAdd==1) {
        if (_tmp[i] == file.response[0]) {
          _tmp.splice(i, 1);
          break;
        }
        // }
        // else if (this.isAdd==3) {
        //   if (_tmp[i] == file.url) {
        //   _tmp.splice(i, 1);
        //   break;
        //   }
        // }
      }
      this.imgList = _tmp;
      // console.log(this.imgList)
    },
    handleSubmit(val){
      if (val==1) {
          this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.type=1;
            this.form.completionPercentage=0;
            projectServer.taskNodeAdd(this.form,res=>{

              this.$message.success('任务开始')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
      if (val==2) {
          this.$refs['form2'].validate(valid => {
          if (valid) {
            this.form2.type=2;
            this.form2.attachmentUrl=this.imgList.join(',');
            // this.form2.time=this.timeDefault;
            projectServer.taskNodeAdd(this.form2,res=>{

              this.$message.success('添加节点成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
      if (val==3) {
          this.$refs['form3'].validate(valid => {
          if (valid) {
            this.form3.type=3;
            this.form3.attachmentUrl=this.imgList.join(',')
            // console.log(this.form2)
            this.form3.completionPercentage=100;
            projectServer.taskNodeAdd(this.form3,res=>{

              this.$message.success('节点已完成')
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
</style>
