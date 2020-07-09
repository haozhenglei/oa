<template>
  <el-dialog title="修改密码" :visible.sync="formDialogVisible" width="600px"
             custom-class="center-dialog" top="0" :close-on-click-modal="false"
             @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="92px" size="small">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="formData.oldPassword" type="password" placeholder="请输入原密码" autocomplete="off"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="formData.newPassword" type="password" placeholder="请输入新密码" autocomplete="off"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="repeatPassword">
            <el-input v-model="formData.repeatPassword" type="password" placeholder="请输入新密码" autocomplete="off"
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" :disabled="isSubmiting" @click="closeDialog">取 消</el-button>
      <el-button type="primary" size="small" :disabled="isSubmiting" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import settingsServer from '../../api/settings'
  import publicServer from '../../api/public'

  export default {
    name: "password-form",

    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },

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
      }
    },

    data() {
      return {
        isSubmiting: false,
        formData: {
          newPassword: '',
          oldPassword: '',
          repeatPassword: ''
        },
        formRules: {
          oldPassword: [
            {required: true, message: '请输入原密码'},
            {validator: this.checkOldPassword, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入新密码'},
            {validator: this.checkOldPassword, trigger: 'blur'}
          ],
          repeatPassword: [
            {required: true, message: '请再次输入新密码'},
            {validator: this.checkRepeatPassword, trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      handleSubmit() {
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            this.isSubmiting = true;
            settingsServer.updateEmployeeSelfPasswordByIntegration({
              newPassword: this.formData.newPassword,
              oldPassword: this.formData.oldPassword,
              repeatPassword: this.formData.repeatPassword,
              // userId: localStorage.getItem('userId')
            }, () => {
              this.isSubmiting = false;
              this.$message.success('保存成功，请重新登录');
              this.$emit('close-dialog');
              // setTimeout(() => {
                // publicServer.logout();
                localStorage.clear();
                sessionStorage.clear();
                this.$router.push({path: '/'});
                this.$store.dispatch('changeLoginStatus', false);
              // }, 3000);
            }, () => {
              this.isSubmiting = false;
            })
          }
        });
      },

      closeDialog() {
        this.$refs['submitForm'].resetFields();
        this.$emit('close-dialog');
      },

      checkOldPassword(rule, value, callback) {
        if (value.length < 6) {
          callback(new Error('密码长度不能小于6个字符'));
        } else {
          callback();
        }
      },

      checkRepeatPassword(rule, value, callback) {
        if (value.length < 6) {
          callback(new Error('密码长度不能小于6个字符'));
        } else if (this.formData.newPassword !== this.formData.repeatPassword) {
          callback(new Error('两次新密码输入不一致'));
        } else {
          callback();
        }
      }
    }
  }
</script>
