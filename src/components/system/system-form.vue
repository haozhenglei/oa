<template>

<el-dialog :title='isAdd===1?"添加账号":"修改账号"' :visible.sync="formDialogVisible" width="600px"
           top="0" :close-on-click-modal="false" custom-class="center-dialog"
           @open="openDialog" @close="closeDialog">
  <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
    <div class="dialog-content">
      <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">

        <el-form-item label="账号" prop="name">
          <el-input v-model="formData.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="nick_name">
          <el-input v-model="formData.nick_name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="备注" >
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="formData.comment" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <p style="margin-top: 20px" v-if="isAdd === 1">账号创建成功后，默认密码与账号相同，用户可自行修改。用户忘记密码可 系统管理员重置。</p>
    </div>
  </el-scrollbar>
  <div slot="footer" class="dialog-footer">
    <el-button size="small" :disabled="isSubmiting" @click="closeDialog('formb')">取 消</el-button>
    <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
  import publicServer from '../../api/public'
  export default {
    name: "advertisement-form",
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
      isAdd: {
        type: Number,
        default: true
      },
      rowList: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        imageUrl:'',
        look:true,
        propertyName:'',
        allTag: [],
        formData:{},
        formRules: {
          name: {required: true, message: '请输入账号'},
          nick_name: {required: true, message: '请输入姓名'},
        },


        isSubmiting:false
      }
    },
    methods:{
      add(){
        this.look = false;
        this.propertyName = ''
      },
      sure(){
        this.allTag.push({
          name:this.propertyName
        });
        this.look = true;
      },
      cencle(){
        this.look = true;
        this.propertyName = ''
      },
      closeDialog(it) {

        this.$refs['submitForm'].clearValidate();
        this.$emit('close-dialog');
      },
      openDialog() {
        this.formData = this.rowList;
      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            if(this.isAdd===1 ){
              publicServer.register(this.formData, () => {
                this.$message.success('新增成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else{
              this.formData.uid = this.formData.id;
              publicServer.updateUser(this.formData, () => {
                this.$message.success('修改成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }

          }
        });
      },


    }
  }
</script>

<style scoped>

</style>
