<template>

  <el-dialog :title='isAdd===1?"新增角色":"修改角色"' :visible.sync="formDialogVisible" width="600px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">


          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="discription">
            <el-input v-model="formData.discription" placeholder="请输入角色描述"></el-input>
          </el-form-item>
          <el-form-item label="权限配置" prop="menuId">
            <p v-model="formData.menuId"></p>
            <el-tree
              :data="treeList"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              @check="checkTree"
              highlight-current
              :props="defaultProps">
            </el-tree>
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
    name: "role-form",
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
      treeList: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        imageUrl:'',
        look:true,
        propertyName:'',
        groupList: [],
        PersonList: [],
        formData:{
          menuId:''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        formRules: {
          name: {required: true, message: '请输入角色名'},
          discription: {required: true, message: '请输入描述'},
          menuId: {required: true, message: '请选择'},
        },
        isSubmiting:false
      }
    },
    methods:{
      add(){
        this.look = false;
        this.propertyName = ''
      },
      checkTree(item,arr){
        console.log(this.$refs.tree.getCheckedNodes());
        console.log(arr);
        this.formData.menuIdList = arr.checkedKeys;
        this.formData.menuId = this.formData.menuIdList.length;
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
      closeDialog() {

        this.$refs['submitForm'].clearValidate();
        this.$emit('close-dialog');
      },
      openDialog() {
        // this.formData = this.rowList;
        if(this.isAdd === 3){
          publicServer.accountRole({id:this.rowList.id}, res => {
            this.formData = res.data;
            this.formData.menuId = this.formData.menuIdList.length;
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(res.data.menuIdList);
            });
          }, () => {

          });
        }else{
          this.formData = {
            menuId:''
          };
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys([]);
          });

        }

      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            if(this.isAdd===1 ){
              publicServer.roleAdd(this.formData, () => {
                this.$message.success('新增成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else{
              // this.formData.uid = this.formData.id;
              publicServer.updAccountRole(this.formData, () => {
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
