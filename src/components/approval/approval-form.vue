<template>

  <el-dialog title='' :visible.sync="formDialogVisible" width="600px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar >
      <div class="dialog-content" >
         <div class="top">
            <div class="top-one" :class="{active : active === 1}" @click="selected(1)">基础设置</div>
            <div class="top-one" :class="{active : active === 2}" @click="selected(2)">表单格式</div>
            <div class="top-one" :class="{active : active === 3}" @click="selected(3)">审批流程</div>
         </div>

          <el-form label-position="top" :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">
            <div v-if="active===1">
          <el-form-item label="审批名称(最多15个字)" prop="name">
            <el-input v-model="formData.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="选择分组">
            <el-select v-model="formData.sourceType" placeholder="选择分组">
              <el-option label="男" :value=1></el-option>
              <el-option label="女" :value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="谁可以发起这类审批">
            <el-select v-model="formData.sourceType" placeholder="选择分组">
              <el-option label="男" :value=1></el-option>
              <el-option label="女" :value=2></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="advertImg" >
            <el-upload
              class="avatar-uploader"
              action="string"
              :show-file-list="false" accept="image/png,image/jpeg,image/bmp,image/x-icon"
              :http-request="upload"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess">
              <img v-if="formData.advertImg" :src="formData.advertImg" v-model="formData.advertImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="审批说明" prop="name">
            <el-input v-model="formData.name" placeholder="请输入"></el-input>
          </el-form-item>
              <div style="text-align: center">
                <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">保 存</el-button>
              </div>

            </div>
            <div v-if="active === 2">
              <el-form-item label="合同名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="合同时间" prop="name">
                <el-date-picker v-model="formData.value1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="对方公司名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="对方法人姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="对方法人身份证号" prop="name">
                <el-input v-model="formData.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="合同概要" prop="name">
                <el-input
                  type="textarea" :rows="5" placeholder="请输入" v-model="formData.textarea">
                </el-input>
              </el-form-item>
            </div>
            <div v-if="active === 3" style="margin: auto">
               <div style="padding: 5px 0;width: 200px;text-align:center;background: #00baad;color: white;margin: auto">发起人</div>
               <div style="width: 200px;text-align:center;background: #efefef;margin: auto;padding: 20px 0;">所有人</div>
                <div style="text-align: center">
                  <i class="el-icon-arrow-down" style="margin: 15px"></i>
                </div>
               <div style="display: flex;padding-left: 160px;margin-bottom: 20px">
                  <div style="padding: 5px 0;width: 200px;text-align:center;background: #ff8d1a;color: white;">选择审批人</div>
                  <div style="text-align:center;background: #999999;color: white;padding: 5px;margin-left: 10px;cursor: pointer">添加审批人</div>
               </div>
               <div v-for="item of 3">
                   <div style="display: flex;align-items: center;justify-content: center;padding-left: 45px">
                     <div style="text-align:center;background: #999999;color: white;padding: 5px;">审批人</div>
                     <i class="el-icon-remove" style="font-size: 20px;color: #999999;margin-left: 25px"></i>
                   </div>
                   <div style="text-align: center">
                     <i class="el-icon-arrow-down" style="margin: 15px"></i>
                   </div>
               </div>
                <div style="display: flex;padding-left: 160px;margin-bottom: 20px">
                  <div style="padding: 5px 0;width: 200px;text-align:center;background: #2a82e4;color: white;">选择抄送人</div>
                  <div style="text-align:center;background: #999999;color: white;padding: 5px;margin-left: 10px;cursor: pointer">添加抄送人</div>
                </div>
              <div v-for="(item,index) of 2">
                <div style="display: flex;align-items: center;justify-content: center;padding-left: 45px">
                  <div style="text-align:center;background: #999999;color: white;padding: 5px;">审批人</div>
                  <i class="el-icon-remove" style="font-size: 20px;color: #999999;margin-left: 25px"></i>
                </div>
                <div style="text-align: center" v-if="index < 1">
                  <i class="el-icon-arrow-down" style="margin: 15px"></i>
                </div>
              </div>
              <div style="text-align: center;margin-top: 40px">
                <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">保 存</el-button>
              </div>
            </div>
          </el-form>


      </div>
    </el-scrollbar>
    <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button size="small" :disabled="isSubmiting" @click="closeDialog('formb')">取 消</el-button>-->
      <!--<el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
  import publicServer from '../../api/public'
  export default {
    name: "approval-form",
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
        active:1,
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
      upload(item){

        let formData = new FormData();
        formData.append('file', item.file);
        formData.append('fileType', 'customerHead/productImage');

        publicServer.getWebUploadPolicy(formData, (res) => {

          item.onSuccess(res.data,item.file.uid);

        }, (res) => {

        });
      },
      beforeAvatarUpload(file){

      },
      handleAvatarSuccess(res, file) {
        this.formData.advertImg = res;
      },
      selected(item){
        this.active = item;
      },
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

<style scoped lang="less">
.top{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .top-one{
    padding: 30px 0;
    text-align: center;
    width: 33%;
    border: 1px solid #2a82e4;
    color: #2a82e4;
    box-sizing: border-box;
  }
  .active{
    background: #2a82e4;
    color: white;
  }
}
</style>
