<template>

  <el-dialog :title='title' :visible.sync="formDialogVisible" width="600px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">
          <el-form-item label="分组名称" prop="name" v-if="title === '新增职位分组'">
            <el-input v-model="formData.name" placeholder="请输入"></el-input>
          </el-form-item>

          <div v-else>
            <el-form-item label="职位名称" prop="name" >
              <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="分组名称" prop="groupId" >
              <el-select v-model="formData.groupId" placeholder="请选择">
                <el-option v-for="item of groupList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
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
    name: "department-form",
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
      title: {
        type: String,
        default: true
      }
    },
    data() {
      return {
        imageUrl:'',
        look:true,
        propertyName:'',
        groupList: [],
        formData:{},
        formRules: {
          name: {required: true, message: '请输入账号'},
          groupId: {required: true, message: '请选择'},
        },
        isSubmiting:false
      }
    },
    methods:{

      closeDialog() {

        this.$refs['submitForm'].clearValidate();
        this.formData = {};
        this.$emit('close-dialog');
      },
      openDialog() {
        if(this.title === '新增职位'){
          publicServer.dropGroupList({}, (res) => {
            this.groupList = res.data
          }, () => {
          });
        }
      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            if(this.title === '新增职位分组') {
              publicServer.addGroup(this.formData, () => {
                this.$message.success('新增成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else{
              publicServer.addRole(this.formData, () => {
                this.$message.success('新增成功');
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
