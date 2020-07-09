<template>

  <el-dialog :title='isAdd===1?"添加新员工":"编辑员工"' :visible.sync="formDialogVisible" width="900px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form class="two-input" :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small" :disabled="formData.status === 2">
          <p style="margin-bottom: 20px">手机端展示信息</p>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select v-model="formData.gender" placeholder="请选择">
                <el-option label="男" :value=1></el-option>
                <el-option label="女" :value=0></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="部门" prop="branchId">
              <el-select v-model="formData.branchId" placeholder="请选择">
                <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="roleId">
              <el-select v-model="formData.roleId" placeholder="请选择">
                <el-option v-for="item of positionList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入"></el-input>
          </el-form-item>
          <p style="margin: 40px 0 20px 0">手机端不展示信息</p>
          <div style="display: flex;justify-content: space-between" v-if="formData.status === 2">
            <el-form-item label="离职时间" >
              <el-date-picker v-model="formData.outWorkTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="离职原因" >
              <el-input v-model="formData.reason" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="入职时间" prop="joinTime" >
              <el-date-picker v-model="formData.joinTime" type="date" :picker-options="pickerOptions" @change="getTime" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option label="正常" :value=0></el-option>
                <el-option label="试用" :value=1></el-option>
                <!-- <el-option label="离职" :value=2></el-option> -->
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="试用期" prop="tryStartTime">
              <el-date-picker v-model="formData.tryStartTime"  type="date" placeholder="选择日期" value-format="yyyy-MM-dd" disabled></el-date-picker>
            </el-form-item>
            <el-form-item label="试用期截至" prop="tryEndTime">
              <el-date-picker v-model="formData.tryEndTime" :picker-options="pickerBeginDateAfter" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="formData.nation" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="formData.age" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="出生年月" prop="birthday">
              <el-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="政治面貌" prop="politic">
              <el-input v-model="formData.politic" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="学历" prop="education">
              <el-input v-model="formData.education" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="marry">
              <el-input v-model="formData.marry" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="邮箱" prop="emil">
              <el-input v-model="formData.emil" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="毕业院校" prop="school">
              <el-input v-model="formData.school" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="所学专业" prop="domain">
              <el-input v-model="formData.domain" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="毕业时间" prop="graduateTime">
              <el-date-picker v-model="formData.graduateTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="银行卡账号" prop="bankAccount">
              <el-input v-model="formData.bankAccount" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bankName">
              <el-input v-model="formData.bankName" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="身份证号码" prop="ideNum">
              <el-input v-model="formData.ideNum" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="身份证地址" prop="ideAddress">
              <el-input v-model="formData.ideAddress" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-form-item label="居住地" prop="liveAddress">
              <el-input v-model="formData.liveAddress" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人电话" prop="urgentPhone">
              <el-input v-model="formData.urgentPhone" placeholder="请输入"></el-input>
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
      isAdd: {
        type: Number,
        default: true
      },
      rowList: {
        type: Object,
        default: {}
      },
      groupList: {
        type: Array,
        default: []
      },
      positionList: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        imageUrl:'',
        look:true,
        propertyName:'',
        allTag: [],
        formData:{
          status:1,
          tryStartTime:''
        },
        pickerOptions: {
          disabledDate: time => {
            return time > new Date();
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.formData.tryStartTime;
            if (beginDateVal) {
              return time.getTime() < new Date(beginDateVal).getTime() ;
            }
          }
        },
        formRules: {
          name: {required: true, message: '请输入姓名'},
          phone: {required: true, message: '请输入电话'},
          nation: {required: true, message: '请输入民族'},
          age: {required: true, message: '请输入年龄'},
          politic: {required: true, message: '请输入政治面貌'},
          education: {required: true, message: '请输入学历'},
          bankAccount: {required: true, message: '请输入银行卡账号'},
          bankName: {required: true, message: '请输入开户行'},
          emil: {required: true, message: '请输入邮箱'},
          school: {required: true, message: '请输入毕业院校'},
          marry: {required: true, message: '请输入婚姻状况'},
          ideNum: {required: true, message: '请输入身份证号码'},
          ideAddress: {required: true, message: '请输入身份证地址'},
          liveAddress: {required: true, message: '请输入居住地'},
          urgentPhone: {required: true, message: '请输入紧急联系人电话'},
          domain: {required: true, message: '请输入专业'},
          gender: {required: true, message: '请选择'},
          status: {required: true, message: '请选择'},
          joinTime: {required: true, message: '请选择'},
          tryStartTime: {required: true, message: '请选择'},
          tryEndTime: {required: true, message: '请选择'},
          birthday: {required: true, message: '请选择'},
          graduateTime: {required: true, message: '请选择'},
          branchId: {required: true, message: '请选择'},
          roleId: {required: true, message: '请选择'},
        },


        isSubmiting:false
      }
    },
    methods:{
      add(){
        this.look = false;
        this.propertyName = ''
      },
      getTime(item){
        console.log(item)
        this.formData.tryStartTime = item
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
        if(this.isAdd !== 1){
          this.formData = this.rowList;
        }

      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            if(this.isAdd===1 ){
              staffServer.addStaff(this.formData, () => {
                this.$message.success('新增成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else{
              staffServer.updUserInfo(this.formData, () => {
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
