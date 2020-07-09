<template>

  <el-dialog title='详情' :visible.sync="formDialogVisible" width="1200px"
             top="0" :close-on-click-modal="false" custom-class="center-dialog"
             @open="openDialog" @close="closeDialog">
    <el-scrollbar >
      <div class="dialog-content" >
        <div style="" class="approval-table">
        <p style="font-weight: bold">基本信息</p>
        <el-form :model="formData"  ref="submitForm" label-width="100px" size="small">
            <el-form-item :label="item.title" v-for="item of formArr" :key="item.name">
              <p>{{item.value}}</p>
            </el-form-item>

        </el-form>
        </div>
        <p style="font-weight: bold">审批流程：</p>
        <img :src="approvalImg" alt="">
      </div>
    </el-scrollbar>
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button size="small" :disabled="isSubmiting" @click="closeDialog('formb')">取 消</el-button>-->
    <!--<el-button size="small" :disabled="isSubmiting" type="primary" @click="handleSubmit">确 定</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
  import appServer from '../../api/approval'
  import publicServer from '../../api/public'
  import baseUrl from '../../assets/js/baseurl'
  export default {
    name: "list-table",
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
      instanceId: {
        type: String,
        default: false
      },

    },
    data() {
      return {
        formData:{
          name:'wwww'
        },
        formArr:[],
        approvalImg:''
      }
    },
    methods:{

      closeDialog() {
        this.$emit('close-dialog');
      },
      openDialog() {
        appServer.getStartFromValue({instanceId:this.instanceId}, res => {
              let arr = [];
              for(let item in res.data.detail){
                 arr.push(res.data.detail[item])
              }
              this.formArr = arr;
              console.log(this.formArr )
        }, () => {

        });
        var that = this;
        var request = new XMLHttpRequest();
        request.open("GET", baseUrl.approvalUrl()+"flow/query/getBpmnPNG?instanceId="+this.instanceId, true);
        request.responseType = "blob";
        request.onloadend = function() {
          console.log(this.response)
          if (this.status === 200) {
            var blob = this.response;
            that.approvalImg = window.URL.createObjectURL(blob);
            console.log(that.approvalImg)
          }
        };
        request.send()
      },



    }
  }
</script>

<style scoped lang="less">

</style>
