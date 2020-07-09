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
        <div class="dialog-content" v-if="isAdd === 1">
          <h3>资料基本信息</h3>
          <el-form
            :model="form"
            :rules="formRules"
            ref="submitForm"
            label-width="100px"
            size="small"
          >
            <el-form-item label="资料编号" prop="fileNo">
              <el-input v-model="form.fileNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资料名称" prop="fileName">
              <el-input v-model="form.fileName" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="资料状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="在库" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input type="textarea" :rows="2" placeholder="请输入" v-model="form.comment"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="dialog-content" v-if="isAdd === 2">
          <h3>资料基本信息</h3>
          <el-form
            :model="rowList"
            label-width="100px"
            size="small"
          >
            <el-form-item label="资料编号" prop="fileNo">
              <el-input readonly="" v-model="rowList.fileNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资料名称" prop="fileName">
              <el-input readonly="" v-model="rowList.fileName" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="资料状态" prop="status">
              <el-select disabled="" v-model="rowList.status" placeholder="请选择">
                <el-option label="在库" :value="1"></el-option>
                <el-option label="借出" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input readonly="" type="textarea" :rows="2" placeholder="请输入" v-model="rowList.comment"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <hr />
            <h3>操作日志</h3>
            <ul v-for="(item,index) in rowList.list" :key="index">
              <li>
                <span>{{item.updateTime}}</span>
                <span>{{item.userName}}</span>
                <span v-if="item.status==1">资料归还：{{item.borrowTime}}</span>
                <span v-if="item.status==2">资料借阅：{{item.borrowTime}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" :disabled="isAdd === 2" type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import documentServer from "../../api/document";
export default {
  data() {
    return {
      form: {},
      formRules: {
        
      }
    };
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
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    openDialog() {},
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleSubmit() {
      this.$refs['submitForm'].validate(valid => {
        if (valid) {
          // console.log(this.form)
          documentServer.dataAdd(this.form,res=>{
            this.$message.success('新增成功')
            this.$emit('submit-success');  
            this.$emit('close-dialog'); 
          },()=>{})      
             
          }
      })
    },
  }
}
</script>
<style lang="less" scoped>
h3 {
  padding: 0 0 15px 0;
}
li span:nth-child(n + 2) {
  margin-left: 30px;
}
hr {
  background-color: #ededed;
  margin-bottom: 10px;
  height: 1px;
  border: none;
}
</style>