<template>

  <el-dialog :title='title' :visible.sync="formDialogVisible" width="600px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">
          <div v-if="title === '新增部门' || title === '编辑部门'">
            <el-form-item label="部门名称" prop="branchName" >
              <el-input v-model="formData.branchName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上级部门" v-if="companyOne.parentId">
              <el-select v-model="formData.parentId" placeholder="请选择">
                <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设置主管" class="sonCheck" v-if="title === '编辑部门'">
              <el-select v-model="formData.leaderId" placeholder="请选择">
                <el-option v-for="item of personList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="选择部门"  prop="branchId" >
              <el-radio-group v-model="formData.branchId">
                <div style="width: 350px">
                  <treesModel :nodes="treeData"></treesModel>
                </div>
              </el-radio-group>
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
  import staffServer from '../../api/staff'
  import treesModel from "./treesModel";
  export default {
    name: "department-new",
    components: {
      treesModel
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
      },
      treeData:{
        type:Array,
        default:[]
      },
      idList:{
        type:Array,
        default:[]
      },
      companyOne:{
        type:Object,
        default:{}
      },
    },
    data() {
      return {
        data: [],
        personList:[],
        defaultProps: {
          children: 'childBranchs',
          label: 'branchName'
        },
        formData:{},
        formRules: {
          branchName: {required: true, message: '请输入部门名称'},
          nick_name: {required: true, message: '请输入姓名'},
          branchId: {required: true, message: '请选择部门'},
        },
        isSubmiting:false,
        editCheckId:'',
        groupList:[]
      }
    },
    methods:{

      closeDialog() {

        this.$refs['submitForm'].clearValidate();
        this.formData  = {};
        this.$emit('close-dialog');
      },
      openDialog() {
          publicServer.findCompanyList({isDrow:1}, (res) => {
            this.groupList = res.data
          }, () => {
          });
          if(this.title === '编辑部门'){
            this.formData = this.companyOne;
            this.formData.branchId = this.companyOne.id;
            publicServer.userListDrow({branchId:this.companyOne.id}, res => {
              this.isLoading = false;
              this.personList = res.data;
            }, () => {
              this.isLoading = false;
            })
          }
      },

      handleNodeClick(item,node,self){ //自己定义的editCheckId，防止单选出现混乱
        this.editCheckId=item.id;
        console.log(this.editCheckId);
        this.$refs.tree.setCheckedKeys([item.id])
      },
      checkChange(item,node,self){
        if (node == true) {
          this.editCheckId=item.id;
          this.$refs.tree.setCheckedKeys([item.id])
        }else {
          if (this.editCheckId == item.id) {
            this.$refs.tree.setCheckedKeys([item.id])
          }
        }
      },
      choosePart(a,b){
         console.log(a)
         console.log(b)

      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            if(this.title === '新增部门'){
              publicServer.addBranch(this.formData, () => {
                this.$message.success('新增成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else if(this.title === '调整部门'){
              this.formData.ids = this.idList;
              console.log(this.formData)
              publicServer.updateDepartment(this.formData, () => {
                this.$message.success('调整成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else if(this.title === '编辑部门'){
              publicServer.appointLeader(this.formData, () => {
                this.$message.success('编辑成功');
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

<style scoped lang="less">


</style>
