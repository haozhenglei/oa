<!-- 资产登记 / 详情 / 修改 -->
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
        <div class="dialog-content">
          <el-form
            :model="formData"
            :rules="formRules"
            ref="submitForm"
            label-width="100px"
            size="small"
          >
            <h3>资产基本信息</h3>
            <el-form-item label="资产编号" prop="propertyNo ">
              <el-input v-model="formData.propertyNo" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资产名称" prop="propertyName ">
              <el-input v-model="formData.propertyName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资产型号" prop="propertyModel  ">
              <el-input v-model="formData.propertyModel " placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资产类型" prop="propertyType ">
              <el-select v-model="formData.propertyType " placeholder="请选择">
                <el-option label="办公类" :value="1"></el-option>
                <el-option label="家具类" :value="2"></el-option>
                <el-option label="生活类" :value="3"></el-option>
                <el-option label="非生产性交通工具" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="购置日期" prop="purchaseDate ">
              <el-date-picker
                v-model="formData.purchaseDate "
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="资产原值" prop="propertyValue ">
              <div class="inp">
                <span>￥</span>
                <el-input v-model="formData.propertyValue " placeholder="请输入"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="资产现状" v-if="isAdd===3">
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option label="停用" :value="1"></el-option>
                <el-option label="使用" :value="2"></el-option>
                <el-option label="待修" :value="3"></el-option>
                <el-option label="报废" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="isAdd===2">
              <hr />
              <h3>资产领用信息</h3>
              <el-form-item label="领用部门" prop="phone">
                <el-input v-model="formData.branchName " placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="领用人" prop="account">
                <el-input v-model="formData.userName " placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="领用日期" prop="account">
                <el-input v-model="formData.receiveDate " placeholder="请输入"></el-input>
              </el-form-item>            
            </div>
            <div v-if="isAdd===5">
              <hr />
              <h3>资产领用信息</h3>
              <el-form-item label="领用部门" prop="phone">
                <el-select v-model="depart_value" placeholder="请选择" @change="depart_change(0)">
                  <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="领用人" prop="account">
                <el-select v-model="userValue" placeholder="请选择">
                  <el-option v-for="item of userLis" :label="item.name" :value="item.id" :key="item.id" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="领用日期" prop="account">
                <el-date-picker
                  v-model="receiveDateValue"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>            
            </div>
            <div v-if="isAdd === 2">
              <hr />
              <h3>操作日志</h3>
              <ul v-for="(item,index) in formData.logs" :key="index">
                <li v-if="item.logType==2">
                  <span>{{formData.receiveDate}}</span>
                  <span>{{item.updateBy}}</span>
                  <span>{{item.branchName}}{{item.userName}}领用</span>
                </li>
                <li v-if="item.logType==4">
                  <span v-if="item.sendDate[1]<10&&item.sendDate[2]>9">{{item.sendDate[0]+'-0'+item.sendDate[1]+'-'+item.sendDate[2]}}</span>
                  <span v-if="item.sendDate[1]>9&&item.sendDate[2]<10">{{item.sendDate[0]+'-'+item.sendDate[1]+'-0'+item.sendDate[2]}}</span>
                  <span v-if="item.sendDate[1]<10&&item.sendDate[2]<10">{{item.sendDate[0]+'-0'+item.sendDate[1]+'-0'+item.sendDate[2]}}</span>
                  <span v-if="item.sendDate[1]>9&&item.sendDate[2]>9">{{item.sendDate[0]+'-'+item.sendDate[1]+'-'+item.sendDate[2]}}</span>
                  <span>{{item.updateBy}}</span>
                  <span>由{{item.branchName}}{{item.userId}}转移给{{item.sendUserBranchName}}{{item.sendUserName}} 监交人:{{item.supervisionUserBranchName}}{{item.supervisionUserName}}</span>
                </li>
              </ul>
            </div>
            <div v-if="isAdd === 4">
              <hr />
              <h3>移交人信息</h3>
              <el-form-item label="移交部门" prop="phone">  
                <el-input v-model="formData.branchName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="移交人" prop="account">
                <el-input v-model="formData.userName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="移交日期" prop="account">   
                <el-input v-model="formData.receiveDate" placeholder="请输入"></el-input>
              </el-form-item>
              <hr />
              <h3>接收人信息</h3>
              <el-form-item label="接收部门" prop="phone">
                <el-select v-model="depart_value1" placeholder="请选择" @change="depart_change(1)">
                  <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接收人" prop="account">
                <el-select v-model="userValue1" placeholder="请选择">
                  <el-option v-for="item of userLis" :label="item.name" :value="item.id" :key="item.id" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接收日期" prop="account">
                <el-date-picker
                  v-model="formData.sendDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <hr />
              <el-form-item label="监交人" prop="account">
                <el-select v-model="userValue2" placeholder="请选择" @change="jianjiaoChoose">
                  <el-option v-for="item of staff" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门" prop="account">
                <el-select v-model="depart_value2" disabled="" placeholder="请选择" @change="depart_change(2)">
                  <el-option v-for="item of groupList" :label="item.branchName" :value="item.id" :key="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" :disabled="isAdd === 2" type="primary" @click="handleSubmit(isAdd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import fixedAssetsServer from "../../api/fixedAssets";
import publicServer from '../../api/public'
import staffServer from '../../api/staff'
export default {
  data() {
    return {
      formDat: {},
      formRules: {},
      groupList: [],//部门列表
      userList:[],
      depart_value:'',
      userValue:'',
      depart_value1:'',
      userValue1:'',
      depart_value2:'',
      userValue2:'',
      receiveDateValue:'',
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
    },
    formData(){
      return this.rowList;
    },
    userLis(){
      return this.userList;
    },
  },
  mounted(){
    this.Company();
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
    },
    staff: {
      type: Array,
      default: []
    }
  },
  methods: {
    openDialog() {
      if (this.isAdd==5) {
        this.depart_value='';
        this.userValue='';
        this.receiveDateValue='';
      }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    jianjiaoChoose(val){
      this.staff.map(item=>{
            if (item.id==val) {
                this.depart_value2=item.branchId;
                
            }
        })
    },
    handleSubmit(val) {
      if (val==1) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
            fixedAssetsServer.fixedAssetsAdd(this.formData,res=>{
              this.$message.success('新增成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
      if (val==3) {
          this.$refs['submitForm'].validate(valid => {
          if (valid) {
            var form={
              id:this.formData.id,
              propertyModel:this.formData.propertyModel,
              propertyName:this.formData.propertyName,
              propertyNo:this.formData.propertyNo,
              propertyType:this.formData.propertyType,
              propertyValue:this.formData.propertyValue,
              purchaseDate:this.formData.purchaseDate,
              status:this.formData.status
              }
              fixedAssetsServer.fixedAssetsUpdate(form,res=>{
              this.$message.success('修改成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
            },()=>{})      
              
          }
        });
      }
      if (val==4) {
        var form={
          propertyId:this.formData.id,
          status:this.formData.status,
          sendUserId:this.userValue1,
          sendDate:this.formData.sendDate,         
          supervisionUserId:this.userValue2,
          userId:this.formData.userName,
          receiveDate:this.formData.receiveDate,
        }
        fixedAssetsServer.fixedAssetsShift(form,res=>{
          this.$message.success('转移成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
        },()=>{})
      }
      if (val==5) {
        var form={
          id:this.formData.id,
          receiveDate:this.receiveDateValue,
          status:this.formData.status,
          userId:this.userValue
        }
        fixedAssetsServer.fixedAssetsSetReceiveUser(form,res=>{
          this.$message.success('设置成功')
              this.$emit('submit-success');  
              this.$emit('close-dialog'); 
        },()=>{})
      }
    },
    Company() {
        publicServer.findCompanyList({}, (res) => {
          this.groupList = res.data    
        }, () => {
        });
      },
    depart_change(val){
      var depar;
      if (val==0) {
        this.userValue='';
        depar=this.depart_value;
      } else if(val==1) {
        this.userValue1='';
        depar=this.depart_value1;
      }else{
        this.userValue2='';
        depar=this.depart_value2;
      }
      staffServer.queryUserList({page: 1, pageSize: 10,branchId:depar}, res => {
          this.userList=res.data.list;
          }, () => {
        })
        
    },
    user_change(val){
    },
  }
};
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
.inp {
  display: flex;
}
</style>