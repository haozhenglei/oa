<template>
  <el-dialog :title='isAdd===1?"新增小区":"编辑小区"' :visible.sync="formDialogVisible" width="800px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar :wrapStyle="[{maxHeight:bodyHeight - 123 + 'px'}]">
      <div class="dialog-content">
        <el-form :model="formData" :rules="formRules" ref="submitForm" label-width="100px" size="small">

          <el-form-item label="小区名称" prop="community">
            <el-input v-model="formData.community" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="所在区域" prop="selectedOptions">
            <el-cascader
              :options="options"
              v-model="formData.selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="小区地址" prop="address">
            <el-input v-model="formData.address" placeholder="请输入小区地址"></el-input>
          </el-form-item>
          <el-form-item label="确诊人数" prop="infected_num">
            <el-input v-model="formData.infected_num" placeholder="请输入确诊人数"></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="lng">
            <el-input v-model="formData.lng" placeholder="请输入经度"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="lat">
            <el-input v-model="formData.lat" placeholder="请输入纬度" @change="openMap" :disabled="!formData.lng"></el-input>
          </el-form-item>
        </el-form>
        <div id="container"  style="width: 100%;height:300px;"></div>
      </div>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" :disabled="isSubmiting" @click="closeDialog('formb')">取 消</el-button>
      <el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {  regionData,CodeToText,TextToCode} from 'element-china-area-data'
  import publicServer from '../../api/public'
  export default {
    name: "babAreaForm",
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
        options: regionData,
        imageUrl:'',
        look:true,
        propertyName:'',
        allTag: [],
        formData:{},
        formRules: {
          address: {required: true, message: '请输入地址'},
          community: {required: true, message: '请输入小区名称'},
          lng: {required: true, message: '请输入经度'},
          lat: {required: true, message: '请输入纬度'},
          infected_num: {required: true, message: '请输入确诊人数'},
          selectedOptions: {required: true, message: '请选择区域'},
        },
        isSubmiting:false,
        map:null
      }
    },
    methods:{
      add(){
        this.look = false;
        this.propertyName = ''
      },
      loadList(){
          this.map = new AMap.Map('container', {
            resizeEnable: true
          });
      },
      loadList2(){
        this.map = new AMap.Map('container', {
          zoom:13,//级别
          center: [this.formData.lng, this.formData.lat],//中心点坐标
          viewMode:'3D'//使用3D视图
        });
        var marker = new AMap.Marker({
          position:[this.formData.lng, this.formData.lat]//位置
        });
        this.map.add(marker);
      },
      openMap(){
        this.map = new AMap.Map('container', {
          zoom:13,//级别
          center: [this.formData.lng, this.formData.lat],//中心点坐标
          viewMode:'3D'//使用3D视图
        });
        var marker = new AMap.Marker({
          position:[this.formData.lng, this.formData.lat]//位置
        });
        this.map.add(marker);
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
      handleChange (value) {
        this.formData.province =CodeToText[value[0]];
        this.formData.city =CodeToText[value[1]];
        this.formData.district =CodeToText[value[2]];
      },
      closeDialog(it) {

        this.$refs['submitForm'].clearValidate();
        this.$emit('close-dialog');
      },
      openDialog() {
        this.formData = this.rowList;
        console.log(this.formData,1111);
        if(this.formData.province){
          console.log(TextToCode[this.formData.province]);
          console.log(TextToCode[this.formData.province][this.formData.city]);
          console.log(TextToCode[this.formData.province][this.formData.city][this.formData.district])
          this.formData.selectedOptions = [TextToCode[this.formData.province].code,
            TextToCode[this.formData.province][this.formData.city].code,
            TextToCode[this.formData.province][this.formData.city][this.formData.district].code,]

        }
      },
      handleSubmit(){
        this.$refs['submitForm'].validate(valid => {
          if (valid) {
            if(this.isAdd===1 ){
              publicServer.addInfectedArea(this.formData, () => {
                this.$message.success('新增成功');
                this.$emit('submit-success');
                this.$emit('close-dialog');
              }, () => {
              });
            }else{
              this.formData.i_id = this.formData.id;
              publicServer.modifyInfectedArea(this.formData, () => {
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

