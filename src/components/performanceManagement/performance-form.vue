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
          <el-form v-if="isAdd==0"
            :model="formData0"
            :rules="formRules0"
            ref="submitForm0"
            label-width="100px"
            size="small"
          >
            <el-form-item label="指标名称" prop="pername">
              <el-input v-model="formData0.pername" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="分值" prop="score">
              <el-input v-model="formData0.score" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="目标值" prop="target">
              <el-input v-model="formData0.target" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="指标说明/计算方式" prop="goalExplain">
              <el-input v-model="formData0.goalExplain" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-form v-if="isAdd==1"
            :model="formData1"
            :rules="formRules1"
            ref="submitForm1"
            label-width="100px"
            size="small"
          >
            <el-form-item label="指标名称" prop="name">
              <el-input v-model="formData1.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="分值" prop="score">
              <el-input v-model="formData1.score" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="目标值" prop="target">
              <el-input v-model="formData1.target" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="指标说明/计算方式" prop="goalExplain">
              <el-input v-model="formData1.goalExplain" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          <el-form v-if="isAdd==2"
            :model="formData2"
            :rules="formRules2"
            ref="submitForm2"
            label-width="100px"
            size="small"
          >
            <el-form-item label="指标名称" prop="name">
              <el-input disabled v-model="formData2.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="分值" prop="score">
              <el-input disabled v-model="formData2.score" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="目标值" prop="target">
              <el-input disabled v-model="formData2.target" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="指标说明/计算方式" prop="goalExplain">
              <el-input disabled="" v-model="formData2.goalExplain" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="完成数据" prop="finish">
              <el-input  v-model="formData2.finish" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="自评分" prop="meScore">
              <el-input  v-model="formData2.meScore" placeholder=""></el-input>
            </el-form-item>
          </el-form>
          
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleSubmit(isAdd)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import performanceServer from "../../api/performance";
  export default {
    name: '',
    components: {
      
    },
    data() {
      return {
        formRules0:{},
        // formData1:{},
        formRules1:{},
        // formData2:{},
        formRules2:{},
      }
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
    timeDefault() {
      var date = new Date();
      var month;
      var day;
      if (date.getMonth()+ 1<10) {
        month='0'+(date.getMonth()+ 1)
      } else {
        month=date.getMonth()+ 1
      }
      if (date.getDate()<10) {
        day='0'+date.getDate()
      } else {
        day=date.getDate()
      }
      var s1 = date.getFullYear() + "-" + month + "-" + day;
      return s1;
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
    formData0: {
      type: Object,
      default: ()=>{}
    },
    formData1: {
      type: Object,
      default: ()=>{}
    },
    formData2: {
      type: Object,
      default: ()=>{}
    },
    title: {
      type: String,
      default: ""
    },
    
  },
    methods: {
      openDialog() {
        
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
    handleSubmit(val) {
      if (val==0) {
          this.$refs['submitForm0'].validate(valid => {
          if (valid) {
            var newAdd=[];
            // this.formData0.submittime=this.timeDefault;
            newAdd.push(this.formData0)
            performanceServer.performanceTargetChildAdd(newAdd,res=>{
              this.$message.success('新增成功');
              this.$emit('submit-success1');  
              this.$emit('close-dialog'); 
            },()=>{})         
          }
        });
      }
      if (val==1) {
          this.$refs['submitForm1'].validate(valid => {
          if (valid) {
            this.$emit('close-dialog');                  
          }
        });
      }
      if (val==2) {
          this.$refs['submitForm2'].validate(valid => {
          if (valid) {
            this.$emit('close-dialog');          
          }
        });
      }
    }
    },   
    created() {
      
    },
    mounted(){

    }
      
  }
</script>

<style lang="less" scoped>

</style>


