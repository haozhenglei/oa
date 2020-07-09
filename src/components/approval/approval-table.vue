<template>

  <el-dialog title='审批详情' :visible.sync="formDialogVisible" width="600px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar >
      <div class="dialog-content">
        <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">

          <el-form-item label="图标" prop="name">
            <el-upload
              class="avatar-uploader"
              action="string"
              :show-file-list="false" accept="image/png,image/jpeg,image/bmp,image/x-icon"
              :http-request="upload"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess">
              <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar" v-model="formData.imgUrl">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="流程类别" prop="categoryType">
            <el-select v-model="formData.categoryType" placeholder="请选择">
              <el-option v-for="item of categoryTypeList" :label="item.name" :value="item.id" :key="item.id" ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="运营类型" prop="oprateType">
            <el-select v-model="formData.oprateType" placeholder="请选择">
              <el-option label="基础运营" :value=0></el-option>
              <el-option label="媒体运营" :value=1></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="权限类别" prop="authType">
            <el-select v-model="formData.authType" placeholder="请选择">
              <el-option label="所有人" :value=0></el-option>
              <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" :disabled="isSubmiting" @click="closeDialog">关 闭</el-button>
      <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import publicServer from '../../api/public'
  import appServer from '../../api/approval'
  export default {
    name: "approval-table",
    computed: {
      bodyHeight() {
        return this.$store.state.Public.bodyHeight
      },
      formDialogVisible: {
        get: function () {
          return this.dialogVisible;
        },
        set: function () {
          this.closeDialog();
        }
      },
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      row: {
        type: Object,
        default: ''
      },


    },
    data() {
      return {
        active:1,
        imageUrl:'',
        look:true,
        propertyName:'',
        allTag: [],
        formData:{},
        formRules: {
          oprateType: {required: true, message: '请选择'},
          authType: {required: true, message: '请选择'},
          categoryType: {required: true, message: '请选择'},
          name: {required: true, message: '请上传图片'},
          nick_name: {required: true, message: '请输入姓名'},
        },
        isSubmiting:false,
        categoryTypeList:[],
        groupList:[],
        depart_value:'',
      }
    },
    methods:{


      closeDialog() {
        this.$emit('close-dialog');
      },
      openDialog() {
        this.formData = this.row;
        appServer.liuChengTypeList({},res=>{
          this.categoryTypeList=res.data;
        },()=>{});
        publicServer.findCompanyList({}, (res) => {
          this.groupList = res.data    
        }, () => {
        });
      },
      upload(item){

        let formData = new FormData();
        formData.append('greenPic', item.file);
        // formData.append('fileType', 'customerHead/productImage');

        publicServer.uploadPic(formData, (res) => {

          item.onSuccess(res.data);

        }, (res) => {

        });
      },
      beforeAvatarUpload (file) {

      },
      handleAvatarSuccess(res, file) {
        this.formData.imgUrl = res[0]
      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            appServer.updateModel(this.formData, () => {
                this.$message.success('编辑成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
          }
        });
      },



    }
  }
</script>

<style scoped lang="less">
  .tableC{
     padding: 30px;
     p{
       font-size: 16px;
       margin: 10px 0;
     }

  }
</style>
