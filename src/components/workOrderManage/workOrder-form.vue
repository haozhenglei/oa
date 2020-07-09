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
            v-if="isAdd==1"
            :model="formData1"
            :rules="formRules1"
            ref="submitForm1"
            label-width="100px"
            size="small"
          >
            <el-form-item label="工单名称" prop="workOrderName">
              <el-input v-model="formData1.workOrderName" placeholder="请输入工单名称,20字以内"></el-input>
            </el-form-item>
            <el-form-item label="紧急程度" prop="urgentLevel">
              <el-radio v-model="formData1.urgentLevel" label="1">高</el-radio>
              <el-radio v-model="formData1.urgentLevel" label="2">中</el-radio>
              <el-radio v-model="formData1.urgentLevel" label="3">低</el-radio>
            </el-form-item>
            <el-form-item label="工单类型" prop="workOrderType">
              <el-select v-model="formData1.workOrderType" placeholder="请选择">
                <el-option label="系统工单" value="1"></el-option>
                <el-option label="财务工单" value="2"></el-option>
                <el-option label="客服工单" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布日期" prop="issueDate">
              <el-date-picker
                v-model="formData1.issueDate"
                type="date"
                placeholder="发布日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="交付日期" prop="successDate">
              <el-date-picker
                v-model="formData1.successDate"
                type="date"
                placeholder="交付日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="指派人" prop="assignIds">
              <el-select
                v-model="formData1.assignIds"
                multiple
                placeholder="请选择"
              >
                <el-option v-for="item in staff" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工单描述" prop="workOrderDescription">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData1.workOrderDescription"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop>
              <el-upload
                class="upload-demo"
                action="string"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-exceed="handOverLimit"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
          <el-form
            v-if="isAdd==2"
            :model="formData2"
            :rules="formRules2"
            ref="submitForm2"
            label-width="100px"
            size="small"
          >
            <el-form-item label="工单名称" prop="workOrderName">
              <el-input v-model="formData2.workOrderName" placeholder="请输入工单名称,20字以内"></el-input>
            </el-form-item>
            <el-form-item label="紧急程度" prop="urgentLevel">
              <el-radio v-model="formData2.urgentLevel" :label="1">高</el-radio>
              <el-radio v-model="formData2.urgentLevel" :label="2">中</el-radio>
              <el-radio v-model="formData2.urgentLevel" :label="3">低</el-radio>
            </el-form-item>
            <el-form-item label="发布日期" prop="issueDate">
              <el-date-picker
                v-model="formData2.issueDate"
                type="date"
                placeholder="发布日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="交付日期" prop="successDate">
              <el-date-picker
                v-model="formData2.successDate"
                type="date"
                placeholder="交付日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="工单状态" prop="workOrderStatus">
              <span v-if="formData2.workOrderStatus==1">未处理</span>
              <span v-if="formData2.workOrderStatus==2">进行中</span>
              <span v-if="formData2.workOrderStatus==3">已完成</span>
              <span v-if="formData2.workOrderStatus==4">已关闭</span>
            </el-form-item>
            <el-form-item label="关闭原因" prop="closeReason">
              <el-radio v-model="formData2.closeReason" :label="1">完成</el-radio>
              <el-radio v-model="formData2.closeReason" :label="2">终止</el-radio>
              <el-radio v-model="formData2.closeReason" :label="3">其他原因</el-radio>
            </el-form-item>
            <el-form-item label="备注" prop="closeComment">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData2.closeComment"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form
            v-if="isAdd==3"
            :model="formData3"
            :rules="formRules3"
            ref="submitForm3"
            label-width="100px"
            size="small"
          >
            <el-form-item label="工单名称" prop="workOrderName">
              <el-input v-model="formData3.workOrderName" placeholder="请输入工单名称,20字以内"></el-input>
            </el-form-item>
            <el-form-item label="紧急程度" prop="urgentLevel">
              <el-radio v-model="formData3.urgentLevel" :label="1">高</el-radio>
              <el-radio v-model="formData3.urgentLevel" :label="2">中</el-radio>
              <el-radio v-model="formData3.urgentLevel" :label="3">低</el-radio>
            </el-form-item>
            <el-form-item label="发布日期" prop="issueDate">
              <el-date-picker
                v-model="formData3.issueDate"
                type="date"
                placeholder="发布日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="交付日期" prop="successDate">
              <el-date-picker
                v-model="formData3.successDate"
                type="date"
                placeholder="交付日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="工单状态" prop="workOrderStatus">
              <span v-if="formData3.workOrderStatus==1">未处理</span>
              <span v-if="formData3.workOrderStatus==2">进行中</span>
              <span v-if="formData3.workOrderStatus==3">已完成</span>
              <span v-if="formData3.workOrderStatus==4">已关闭</span>
            </el-form-item>
            <el-form-item label="处理结果" prop="doType">
              <el-radio v-model="formData3.doType" :label="1">未解决</el-radio>
              <el-radio v-model="formData3.doType" :label="2">已解决</el-radio>
            </el-form-item>
            <el-form-item label="备注" prop="doComment">
              <el-input type="textarea" :rows="3" v-model="formData3.doComment" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop="adjunct">
              <el-upload
                class="upload-demo"
                action="string"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-exceed="handOverLimit"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
          <el-form
            v-if="isAdd==4"
            :model="formData4"
            :rules="formRules4"
            ref="submitForm4"
            label-width="100px"
            size="small"
          >
            <el-form-item label="工单名称" prop="workOrderName">
              <el-input v-model="formData4.workOrderName" placeholder="请输入工单名称,20字以内"></el-input>
            </el-form-item>
            <el-form-item label="紧急程度" prop="urgentLevel">
              <el-radio v-model="formData4.urgentLevel" :label="1">高</el-radio>
              <el-radio v-model="formData4.urgentLevel" :label="2">中</el-radio>
              <el-radio v-model="formData4.urgentLevel" :label="3">低</el-radio>
            </el-form-item>
            <el-form-item label="发布日期" prop="issueDate">
              <el-date-picker
                v-model="formData4.issueDate"
                type="date"
                placeholder="发布日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="交付日期" prop="successDate">
              <el-date-picker
                v-model="formData4.successDate"
                type="date"
                placeholder="交付日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="工单类型" prop="workOrderType ">
              <el-select v-model="formData4.workOrderType " placeholder="请选择">
                <el-option label="系统工单" :value="1"></el-option>
                <el-option label="财务工单" :value="2"></el-option>
                <el-option label="客服工单" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="指派人" prop>
              <span v-for="(item,index) in assignList" :key="index">
                {{item.name}}&nbsp;
                <el-button type="text" style="color:#04B404" @click="deleteAssign(item.userId)">删除</el-button>&nbsp;&nbsp;
              </span>
              <span v-show="false">{{addAssLis}}</span>
            </el-form-item>
            <el-form-item label="添加指派人" prop="assignIds">
              <el-select
                v-model="assignIds"
                multiple
                value-key="id"
                placeholder="请选择"
                @change="currentValChange"
                @visible-change="addAss"
                @remove-tag="yiChu"
              >
                <el-option v-for="item in staffl" :key="item.id" :label="item.name" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工单描述" prop="workOrderDescription">
              <el-input
                type="textarea"
                :rows="3"
                v-model="formData4.workOrderDescription"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop="adjunct">
              <el-upload
                class="upload-demo"
                action="string"
                :file-list="fileLis"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-exceed="handOverLimit"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubmit(isAdd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import publicServer from "../../api/public";
import staffServer from "../../api/staff";
import workOrderServer from "../../api/workOrder";
export default {
  name: "",
  components: {},
  data() {
    return {
      formData1: { issueDate: "" },
      formRules1: {},
      formRules2: {},
      formRules3: {},
      formRules4: {},
      searchForm: { page: 1, pageSize: 100 },

      uploading: false,
      searchId: "",
      userList: [],
      userIds: [],
      // imgList: [],
      addAssList: [],
      currentVal: [],
      thisCurrent: false,
      assignIds: ""
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
    fileLis(){
      return this.file.map(item=>{
        return {name:item,url:item}
      });
    },
    timeDefault() {
      var date = new Date();
      var month;
      var day;
      if (date.getMonth() + 1 < 10) {
        month = "0" + (date.getMonth() + 1);
      } else {
        month = date.getMonth() + 1;
      }
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      } else {
        day = date.getDate();
      }
      var s1 = date.getFullYear() + "-" + month + "-" + day;
      return s1;
    },
    // formData4(){
    //   return this.formData;
    // },
    assignList() {
      return this.formData4.assignLogInfos;
    },
    addAssLis() {
      return this.addAssList;
    }
    // fileLis(){
    //   return this.file.map(item=>{
    //     return {name:item,url:item}
    //   });
    // },
  },
  watch: {
    userIds: function(newVal, oldVal) {
      console.log(newVal);
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
    // rowList: {
    //   type: Object,
    //   default: {}
    // },
    title: {
      type: String,
      default: ""
    },
    staff: {
      type: Array,
      default: () => []
    },
    staffl: {
      type: Array,
      default: () => []
    },
    formData2: {
      type: Object,
      default: () => {}
    },
    formData3: {
      type: Object,
      default: () => {}
    },
    formData4: {
      type: Object,
      default: () => {}
    },
    file:{
      type:Array,
      default:()=>[]
    },
    imgList:{
      type:Array,
      default:()=>[]
    }
  },
  methods: {
    openDialog() {},
    closeDialog() {
      this.$emit("close-dialog");
    },
    currentValChange(val) {
      this.currentVal = val;
    },
    addAss(val) {
      // console.log(val)
      this.addAssList = [];
      // this.assignList.concat(val);
      // console.log(this.assignList)
      if (val == true) {
        this.thisCurrent = false;
      } else {
        this.thisCurrent = true;
        // console.log(this.currentVal)
        this.currentVal.map(item => {
          this.addAssList.push({ userId: item.id, name: item.name });
        });
        // console.log(this.addAssList)
      }
    },
    yiChu(val) {
      if (this.thisCurrent == true) {
        this.addAssList.some((item, index) => {
          if (item.userId == val.id) {
            this.addAssList.splice(index, 1);
            return;
          }
        });
      }
      // console.log(this.addAssList)
    },
    deleteAssign(id) {
      this.assignList.some((item, index) => {
        if (id == item.userId) {
          this.assignList.splice(index, 1);
          return;
        }
      });
      workOrderServer.assignDel(
        { userId: id, workOrderId: this.formData4.id },
        res => {
          this.$message.success("删除成功");
          this.$emit("submit-success");
          this.$emit("submit-success1");
        },
        () => {}
      );
    },
    departChange(val) {
      console.log(val);
    },

    handOverLimit() {
      // this.$message.warning('不能超过三张照片')
    },
    handBeforeUpload() {},
    upload(item) {
      this.uploading = true;
      let formData = new FormData();
      formData.append("greenPic", item.file);
      publicServer.uploadPic(
        formData,
        res => {
          this.uploading = false;
          item.onSuccess(res.data);
        },
        res => {}
      );
    },
    handleAvatarSuccess(res, file, fileList) {
      this.imgList.push(res[0]);
      // console.log(this.imgList)
    },
    handle_remove(file, fileList) {
      var _tmp = this.imgList;
      // console.log(file);
      // console.log(fileList);
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if (this.isAdd == 1) {
          if ((_tmp[i] == file.response[0])) {
            _tmp.splice(i, 1);
            break;
          }
        } else if (this.isAdd == 4) {
          if ((_tmp[i] == file.url)) {
            _tmp.splice(i, 1);
            break;
          }
        }
      }
      this.imgList = _tmp;
      // console.log(this.imgList)
    },
    handleSubmit(val) {
      if (val == 1) {
        this.$refs["submitForm1"].validate(valid => {
          if (valid) {
            // this.formData.companyId=this.searchId;
            this.formData1.assignIds = this.formData1.assignIds;
            this.formData1.adjunct = this.imgList.join(",");
            workOrderServer.workOrderAdd(
              this.formData1,
              res => {
                this.$message.success("新增成功");
                this.$emit("submit-success");
                this.$emit("close-dialog");
              },
              () => {}
            );
          }
        });
      }
      if (val == 2) {
        this.$refs["submitForm2"].validate(valid => {
          if (valid) {
            workOrderServer.workOrderClose(
              {
                closeReason: this.formData2.closeReason,
                closeComment: this.formData2.closeComment,
                id: this.formData2.id
              },
              res => {
                this.$message.success("关闭成功");
                this.$emit("submit-success");
                this.$emit("submit-success1");
                this.$emit("close-dialog");
              },
              () => {}
            );
          }
        });
      }
      if (val == 3) {
        this.$refs["submitForm3"].validate(valid => {
          if (valid) {
            this.formData3.adjunct = this.imgList.join(",");
            workOrderServer.workOrderDeal(
              {
                doType: this.formData3.doType,
                doComment: this.formData3.doComment,
                id: this.formData3.id,
                adjunct: this.formData3.adjunct
              },
              res => {
                this.$message.success("处理成功");
                this.$emit("submit-success");
                this.$emit("submit-success1");
                this.$emit("close-dialog");
              },
              () => {}
            );
          }
        });
      }
      if (val == 4) {
        this.$refs["submitForm4"].validate(valid => {
          if (valid) {
            var arr1 = [];
            var arr2 = [];
            var newArr = [];
            //遍历删除后剩余指派人的列表，取出指派人员的id
            this.assignList.map(item => {
              arr1.push(String(item.userId));
            });
            //遍历新增指派人的列表，取出指派人员的id
            this.addAssLis.map(item => {
              arr2.push(String(item.userId));
            });
            //将删除后的剩余指派人的id加入一个数组
            arr1.map(item => {
              newArr.push(item);
            });
            //将新增的所有指派人的id加入一个数组
            arr2.map(item => {
              newArr.push(item);
            });
            //更新需要的assignIds进行去重（newArr）
            var temp = []; //一个新的临时数组
            for (var i = 0; i < newArr.length; i++) {
              if (temp.indexOf(newArr[i]) == -1) {
                temp.push(newArr[i]);
              }
            }
            //新增的指派人列表是否包含删除后剩余的指派人，有则返回对应的值，无则undefind
            var a = arr2.find(i => {
              return arr1.includes(i);
            });

            if (a != "undefind") {
              var b = arr2.indexOf(String(a)); //找到新增指派人列表包含删除后剩余指派人的下标，然后删除包含的，只留下新增加的
              arr2.some((item, index) => {
                if (b == index) {
                  arr2.splice(b, 1);
                }
              });
            }

            //添加指派人
            if (arr2.length==0) {
              
            }else{
              workOrderServer.assignAdd(
                { userId: arr2.join(","), workOrderId: this.formData4.id },
                res => {},
                () => {}
              );
            }
            var obj = {
              adjunct: this.imgList.join(","),
              assignIds: temp,
              id: this.formData4.id,
              issueDate: this.formData4.issueDate,
              successDate: this.formData4.successDate,
              urgentLevel: this.formData4.urgentLevel,
              workOrderDescription: this.formData4.workOrderDescription,
              workOrderName: this.formData4.workOrderName,
              workOrderType: this.formData4.workOrderType
            };

            workOrderServer.workOrderUpdate(
              obj,
              res => {
                this.$message.success("更新成功");
                this.$emit("submit-success");
                this.$emit("submit-success1");
                this.$emit("close-dialog");
              },
              () => {}
            );
          }
        });
      }
    }
  },
  created() {},
  mounted() {
    this.formData1.issueDate = this.timeDefault;
    // this.businessOrChannel();
  }
};
</script>

<style lang="less" scoped>
h3 {
  padding: 0 0 15px 0;
}
hr {
  background-color: #ededed;
  margin-bottom: 10px;
  height: 1px;
  border: none;
}
</style>


