<template>

  <el-dialog title='离职确认' :visible.sync="formDialogVisible" width="900px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form class="two-input" :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">
          <p style="margin-bottom: 20px">基本信息</p>
          <div style="padding-bottom: 20px;border-bottom: 1px solid gainsboro;margin-bottom: 20px">
            <el-form-item label="姓名" >
              <p>{{formData.name}}</p>
            </el-form-item>
            <el-form-item label="性别" >
              <p v-if="formData.gender === 1">男</p>
              <p v-else>女</p>
            </el-form-item>
            <el-form-item label="电话" >
              <p>{{formData.phone}}</p>
            </el-form-item>
            <el-form-item label="商务部" >
              <p>{{formData.companyName}}</p>
            </el-form-item>
            <el-form-item label="职位" >
              <p>{{formData.roleName}}</p>
            </el-form-item>
          </div>
          <el-form-item label="离职时间" prop="outWorkTime">
            <el-date-picker v-model="formData.outWorkTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="离职原因" prop="reason">
            <el-input v-model="formData.reason" placeholder="请输入离职原因"  type="textarea"
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
  import staffServer from '../../api/staff'
  export default {
    name: "staff-form",
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
          reason: {required: true, message: '请输入离职原因'},
          outWorkTime: {required: true, message: '请选择'},
        },


        isSubmiting:false
      }
    },
    methods:{

      closeDialog() {
        this.$refs['submitForm'].clearValidate();
        this.$emit('close-dialog');
      },
      openDialog() {
        this.formData = this.rowList;
      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            let obj = {};
            obj.status = 2;
            obj.userId = this.formData.id;
            obj.reason = this.formData.reason;
            obj.outWorkTime = this.formData.outWorkTime;
            staffServer.userStatus(obj, () => {
              this.$message.success('离职成功');
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

<style scoped>

</style>
