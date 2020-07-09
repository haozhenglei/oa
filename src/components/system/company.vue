<template>
  <div class="role-list">
    <div class="top">
      <p>公司信息</p>
    </div>
    <div class="mid">
      <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="formData.companyName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="nick_name">
          <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false" accept="image/png,image/jpeg,image/bmp,image/x-icon"
            :http-request="upload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess">
            <img v-if="formData.logoUrl" :src="formData.logoUrl" class="avatar" v-model="formData.logoUrl">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="默认头像" >
          <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false" accept="image/png,image/jpeg,image/bmp,image/x-icon"
            :http-request="upload"
            :before-upload="beforeAvatarUpload2"
            :on-success="handleAvatarSuccess2">
            <img v-if="formData.headUrl" :src="formData.headUrl" class="avatar" v-model="formData.headUrl">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="down">
      <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">保存</el-button>
    </div>

  </div>
</template>

<script>
    import publicServer from '../../api/public'
    export default {
        name: "company" ,
        data() {
          return {
            isSubmiting:false,
            formData: {
              logoUrl:'',
              headUrl:'',
            },
            formRules: {
              companyName: {required: true, message: '请选择'},
              logoUrl: {required: true, message: '请上传图片'},
              headUrl: {required: true, message: '请上传图片'},
            },
          }
        },
      created() {
        this.$store.dispatch('changeBreadcrumb', [
          {name: '公司信息', path: '', params: null},
          // {name: '品牌管理', path: '', params: null}
        ])
      },
        mounted(){
            this.loadList()
        },
        methods:{
          loadList(){
            publicServer.findCompany({}, (res) => {
              if(res.data){
                this.formData = res.data
              }
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
            this.formData.logoUrl = res[0];
            console.log(this.formData)
          },
          beforeAvatarUpload2 (file) {

          },
          handleAvatarSuccess2(res, file) {
            this.formData.headUrl = res[0]
          },
          handleSubmit(){
            this.$refs['submitForm'].validate(valid => {
              if (valid) {
                publicServer.editCompany(this.formData, () => {
                  this.$message.success('保存成功');
                  this.loadList();
                }, () => {
                });
              }
            });
          },
        }
    }
</script>

<style scoped lang="less">
.top{
  color: #1890ff;
  font-size: 16px;
  padding: 10px 0;
}
  .mid{
    input{
      width: 150px;
    }
    padding: 20px;
    border-bottom: 1px solid gainsboro;
    border-top: 1px solid gainsboro;
  }
  .down{
    padding-left: 100px;
    margin-top: 30px;
    button{
      width: 150px;
    }
  }
</style>
