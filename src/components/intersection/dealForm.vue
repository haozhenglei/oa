<template>
  <el-dialog title="" :visible.sync="formDialogVisible" width="600px"  top="0" :close-on-click-modal="false"
             @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <p style="color: orange;margin-bottom: 20px">建议联系相关用户核实情况后再做处理!</p>
        <el-form :model="formData" :rules="formRules" ref="submitForm"  size="small">
          <el-form-item label=""  >
            <el-input v-model="formData.comment" placeholder="请输入处理的备注信息" maxlength="150" type="textarea"
                      :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" :disabled="isSubmiting" @click="closeDialog">取 消</el-button>
      <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import publicServer from '../../api/public'

  export default {
    name: "commodity-form",

    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      row: {
        type: Object,
        default: {}
      },

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

        },
        formRules: {
          goodsAuditDetails: {required: true, message: '请输入处理意见'},
          goodsAuditStatus: {required: true, message: '请选择审核意见'},

        }
      }
    },

    methods: {
      handleSubmit() {
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            this.isSubmiting = true;
              var obj = this.row;
              obj.comment = this.formData.comment;
              // obj.deal_user = localStorage.getItem('user_name');
              obj.deal_user = 'admin';
              obj.user_addr = this.row.addr;
              publicServer.addIntersectionDealLog(obj, () => {
                this.isSubmiting = false;
                this.$message.success('处理成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
                this.isSubmiting = false;
              })
          }
        })
      },

      closeDialog() {
        this.formData={}
        this.$refs['submitForm'].resetFields();
        this.$emit('close-dialog');
      }
    }
  }
</script>

