<template>
  <el-dialog
    :title="isAdd===1?'添加账号':'修改账号'"
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
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="登录账号" prop="account">
            <el-input v-model="formData.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <!-- <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="branchId">
            <el-select v-model="formData.branchId" placeholder="请选择">
              <el-option
                v-for="item of groupList"
                :label="item.branchName"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="选择角色" prop="accountRoleId">
            <el-select v-model="formData.accountRoleId" placeholder="请选择">
              <el-option
                v-for="item of PersonList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" :disabled="isSubmiting" @click="closeDialog('formb')">取 消</el-button>
      <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import publicServer from "../../api/public";
export default {
  name: "account-form",
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
    }
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
    }
  },
  data() {
    return {
      imageUrl: "",
      look: true,
      propertyName: "",
      groupList: [],
      PersonList: [],
      formData: {},
      formRules: {
        name: { required: true, message: "请输入姓名" },
        account: { required: true, message: "请输入账号" },
        phone: { required: true, message: "请输入手机号码" },
        branchId: { required: true, message: "请选择" },
        accountRoleId: { required: true, message: "请选择" }
      },

      isSubmiting: false
    };
  },
  methods: {
    add() {
      this.look = false;
      this.propertyName = "";
    },
    sure() {
      this.allTag.push({
        name: this.propertyName
      });
      this.look = true;
    },
    cencle() {
      this.look = true;
      this.propertyName = "";
    },
    closeDialog(it) {
      this.$refs["submitForm"].clearValidate();
      this.$emit("close-dialog");
    },
    openDialog() {
      this.formData = this.rowList;
      publicServer.findCompanyList(
        {},
        res => {
          this.groupList = res.data;
        },
        () => {}
      );
      publicServer.accountRoleList(
        {},
        res => {
          this.PersonList = res.data;
        },
        () => {}
      );
    },
    handleSubmit() {
      this.$refs["submitForm"].validate(valid => {
        if (valid) {
          if (this.isAdd === 1) {
            publicServer.accountAdd(
              this.formData,
              () => {
                this.$message.success("新增成功");
                this.$emit("submit-success");
                this.$emit("close-dialog");
              },
              () => {}
            );
          } else {
            this.formData.uid = this.formData.id;
            publicServer.updateUser(
              this.formData,
              () => {
                this.$message.success("修改成功");
                this.$emit("submit-success");
                this.$emit("close-dialog");
              },
              () => {}
            );
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
