<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1%">
      <div style="font-size:16px;font-weight:bold;">工单详情</div>
      <div @click="goBack">
        <el-button type="primary" size="small">返 回</el-button>
      </div>
    </div>
    <div class="detailTop">
      <div class="detailOne">
        <div>
          <label>工单名称:</label>
          <span>{{workDetailList.workOrderName}}</span>
        </div>
        <div>
          <label>工单ID:</label>
          <span>{{workDetailList.workOrderNo}}</span>
        </div>
        <div>
          <label>发起人:</label>
          <span>{{workDetailList.issueUser}}</span>
        </div>
        <div>
          <label>工单状态:</label>
          <span v-if="workDetailList.workOrderStatus==1">未处理</span>
          <span v-if="workDetailList.workOrderStatus==2">进行中</span>
          <span v-if="workDetailList.workOrderStatus==3">已完成</span>
          <span v-if="workDetailList.workOrderStatus==4">已关闭</span>
        </div>
      </div>
      <div class="detailOne">
        <div>
          <label>发布日期:</label>
          {{workDetailList.issueDate}}
        </div>
        <div>
          <label>完成日期:</label>
          {{workDetailList.successDate}}
        </div>
        <div>
          <label>工单类型:</label>
          <span v-if="workDetailList.workOrderType==1">系统工单</span>
          <span v-if="workDetailList.workOrderType==2">财务工单</span>
          <span v-if="workDetailList.workOrderType==3">客服工单</span>
        </div>
        <div>
          <label>紧急状态:</label>
          <span v-if="workDetailList.urgentLevel==1">高</span>
          <span v-if="workDetailList.urgentLevel==2">中</span>
          <span v-if="workDetailList.urgentLevel==3">低</span>
        </div>
      </div>
      <div class="detailOne">
        <div>
          <label>工单描述:</label>
          <span>{{workDetailList.workOrderDescription}}</span>
        </div>
      </div>
      <div class="detailOne">
        <div style="display:flex;">
          <label>附件:</label>
          <div style="margin-top:0.1rem">
            <div
              v-for="(item,index) in workDetailList.adjunct.split(',')"
              :key="index"
              @click="yuLan(item)"
              title="点击下载"
              style="cursor:pointer;"
              v-on:mouseover="changeActive($event)"
              v-on:mouseout="removeActive($event)"
            >
              <i class="el-icon-document" style="margin:0 0.2rem"></i>
              {{item.substr(item.lastIndexOf("/")+1)}}
            </div>
          </div>
        </div>
      </div>
      <div class="detailOne">
        <div>
          <label>指派人员:</label>
          <span
            v-for="(item,index) in workDetailList.names"
            :key="index"
          >{{item}}{{index === workDetailList.names.length-1 ? "":"、" }}</span>
        </div>
      </div>
      <div class="tableOne">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="userId" label="姓名">
            <template slot-scope="scope">
              <span v-for="(item,index) in staff" :key="index">
                <span v-if="item.id==scope.row.userId">{{item.name}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">未处理</span>
              <span v-if="scope.row.status==2">已处理</span>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="备注"></el-table-column>
          <el-table-column prop="adjunct" label="附件"></el-table-column>
          <el-table-column prop="opertionTime" label="处理时间"></el-table-column>
        </el-table>
      </div>
      <div class="tableRecord">
        <div style="font-size:15px">操作记录</div>
        <el-table :data="tableDataRecord" border style="width: 100%">
          <el-table-column prop="accountId" label="操作人">
            <template slot-scope="scope">
              <span v-for="(item,index) in staff" :key="index">
                <span v-if="item.id==scope.row.accountId">{{item.name}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="opertionType" label="操作内容">
            <template slot-scope="scope">
              <span v-if="scope.row.opertionType==1">新建工单</span>
              <span v-if="scope.row.opertionType==2">编辑工单</span>
              <span v-if="scope.row.opertionType==3">处理工单</span>
              <span v-if="scope.row.opertionType==4">关闭工单</span>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="备注"></el-table-column>
          <el-table-column prop="opertionTime" label="操作时间"></el-table-column>
        </el-table>
      </div>
      <div style="display:flex;margin:2% 0">
        <div style="flex:1"></div>
        <div style="flex:1;justify-content: space-between;display:flex;">
          <el-button type="primary" size="small" @click="edit">编辑</el-button>
          <!-- <el-button type="primary" size="small" @click="urge">催促</el-button> -->
          <el-button type="primary" size="small" @click="close">关闭</el-button>
          <el-button type="primary" size="small" @click="handle">处理</el-button>
        </div>
        <div style="flex:1"></div>
      </div>
    </div>
    <workOrderForm
      :title="title"
      :dialog-visible="workOrderFormVisible"
      @close-dialog="closeDialog"
      @submit-success1="successDo"
      :isAdd="isAdd"
      :staffl="staff"
      :formData2="formData2"
      :formData3="formData3"
      :formData4="formData4"
      :file="fileList"
      :imgList="imgList"
    ></workOrderForm>

    <!-- 预览图片 -->
    <el-dialog :visible.sync="dialogImgVisible" style="z-index:9999">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import workOrderServer from "../../api/workOrder";
import workOrderForm from "./workOrder-form";
export default {
  name: "workOrderDetail",
  components: {
    workOrderForm
  },
  data() {
    return {
      tableData: [],
      tableDataRecord: [],
      title: "",
      workOrderFormVisible: false,
      isAdd: null,
      // staffList:[],
      workDetailList: {},
      showDunHao: true,
      staff: [],
      formData2: {},
      formData3: {},
      formData4: {},
      fileList: [],
      imgList: [],
      dialogImgVisible: false,
      dialogImageUrl: ""
    };
  },
  computed: {
    // staffList(){
    //   return this.staff;
    // }
  },
  props: {
    // staff:{
    //   type:Array,
    //   default:()=>[]
    // },
  },
  methods: {
    loadList() {
      workOrderServer.workOrderDetail(
        this.$route.query.id,
        res => {
          this.workDetailList = res.data;
          this.tableData = res.data.assignLogInfos;
          this.tableDataRecord = res.data.opertionLogInfos;
        },
        () => {}
      );
    },
    goBack() {
      this.$router.go(-1);
    },
    changeActive($event){
      $event.currentTarget.className="colorActive";
    },
    removeActive($event){
      $event.currentTarget.className="";
    },
    edit() {
      this.isAdd = 4;
      this.title = "编辑工单";
      this.workOrderFormVisible = true;
      this.formData4 = this.workDetailList;
      this.fileList = this.formData4.adjunct.split(",");
      this.imgList = this.fileList;
    },
    // urge(){
    //   this.isAdd=3;
    //   this.title='催促处理工单';
    //   this.workOrderFormVisible=true;
    // },
    close() {
      this.isAdd = 2;
      this.title = "关闭工单";
      this.workOrderFormVisible = true;
      this.formData2 = this.workDetailList;
    },
    handle() {
      this.isAdd = 3;
      this.title = "处理工单";
      this.workOrderFormVisible = true;
      this.formData3 = this.workDetailList;
    },
    // //查看预览
    // yuLan(url) {
    //   // this.contract_content=this.tableData[index].fileUrl;
    //   //获取最后一个.的位置
    //   var index= url.lastIndexOf(".");
    //   //获取后缀
    //   var ext = url.substr(index+1);
    //   if (ext=="jpg"||ext=="png"||ext=="jpeg") {
    //     this.dialogImageUrl = url;
    //     this.dialogImgVisible = true;
    //   }
    //   if(ext=="doc"||ext=="docx"||ext=="xls"||ext=="xlsx"){
    //     window.open("https://view.officeapps.live.com/op/view.aspx?src=" + url);
    //   }
    //   if (ext=="pdf") {
    //     // let url = this.contract_content;
    //     // this.viewVisible = true
    //     // this.pdfsrc = url
    //     window.open(url);
    //   }
    // },
    //下载
    yuLan(url) {
      // this.contract_content=this.tableData[index].fileUrl;
      //获取最后一个.的位置
      var index = url.lastIndexOf(".");
      //获取后缀
      var ext = url.substr(index + 1);
      if (ext == "jpg" || ext == "png" || ext == "jpeg") {
        this.downloadImg(url);
      }
      if (ext == "doc" || ext == "docx" || ext == "xls" || ext == "xlsx") {
        window.location.href = url;
      }
      if (ext == "pdf") {
        // download(this.contract_content,"xxx","application/pdf");
        this.downloadFile(url, url.substr(url.lastIndexOf("/") + 1));
      }
    },
    //pdf下载
    downloadFile(url, name) {
      var request = new XMLHttpRequest();
      request.responseType = "blob";
      request.open("GET", url);
      request.onload = function() {
        var url = window.URL.createObjectURL(this.response);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = `${name}.pdf`;
        a.click();
      };
      request.send();
    },
    //图片下载
    downloadImg(url) {
      // const url = this.contract_content;
      // window.open(_this.detail.imgUrl)
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.responseType = "blob";
      xmlhttp.onload = function() {
        if (this.status == 200) {
          const blob = this.response;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = url.substring(url.lastIndexOf("/") + 1, url.length);

          //此写法兼容火狐浏览器
          document.body.appendChild(link);

          const evt = document.createEvent("MouseEvents");
          evt.initEvent("click", false, false);
          link.dispatchEvent(evt);
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
        }
      };

      xmlhttp.send();
    },
    closeDialog() {
      this.workOrderFormVisible = false;
    },
    successDo() {
      this.loadList();
    }
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "工单列表", path: "/workOrder", params: null },
      { name: "工单详情", path: "/workOrderDetail", params: null }
    ]);
  },
  mounted() {
    this.loadList();
    this.staff = JSON.parse(this.$route.query.staff);
  }
};
</script>

<style lang="less" scoped>
.detailTop {
  padding: 1%;
  // margin: 1%;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 10px #e9e9e9;
  border-radius: 5px;
}
.detailOne {
  display: flex;
  line-height: 2.4;
  // justify-content: space-between;
}
.detailOne > div {
  flex: 1;
}
.detailOne label {
  font-size: 15px;
  // text-shadow: 10px 10px 20px #e9e9e9;
}
.tableOne {
  margin: 1% 0;
}
.colorActive{
  color: blue;
}
</style>