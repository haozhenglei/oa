<template>
  <el-dialog title="" :visible.sync="formDialogVisible" width="600px"  top="0" :close-on-click-modal="false"
             @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <p style="margin-bottom: 20px">有必要的情况下，请联系相关电话后再审核。审核通过用户路径数据将参 与计算，帮助找出疑似接触者C。</p>
        <el-form :model="formData" :rules="formRules" ref="submitForm"  size="small">
          <el-form-item label="" prop="result">
            <el-radio-group v-model="formData.result">
              <el-radio :label=1>审核通过</el-radio>
              <el-radio :label=0>审核不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="反馈详情"  v-show="formData.result !== 0 ">
            <el-input v-model.trim="formData.comment" placeholder="请输入备注信息" maxlength="150" type="textarea"
                      :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="" prop="comment" v-if="formData.result === 0">
            <el-input v-model.trim="formData.comment" placeholder="请输入备注信息" maxlength="150" type="textarea"
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
  import publicServer from "../../api/public";

  export default {
    name: "declaration-form",

    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      r_id: {
        type: Number,
        default: 1
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
          result: {required: true, message: '请输入处理意见'},
          comment: {required: true, message: '请选择审核意见'},

        }
      }
    },

    methods: {
      handleSubmit() {
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            this.isSubmiting = true;
              this.formData.r_id = this.r_id;
            publicServer.review_result(this.formData, () => {
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
        // this.$refs['submitForm'].resetFields();
        this.$emit('close-dialog');
      }
    }
  }
</script>
