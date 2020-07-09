<template>
  <div>
    <div class="top">
      <div class="topLeft">{{taskDetailList.name}}</div>
      <div class="topRight">
        <div class="topRightCenter">
          <span title="开始" @click="start">
            <i class="el-icon-video-play"></i>
          </span>
          <span title="添加节点" @click="addNode">
            <i class="el-icon-circle-plus-outline"></i>
          </span>
          <span title="完成" @click="finish">
            <i class="el-icon-switch-button"></i>
          </span>
          <span title="返回" @click="goBack">
            <i class="el-icon-arrow-left"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="liuCheng">
      <div class="liuChengLeft">
        <div style="font-size:16px">流程</div>
        <div>
          1、{{taskDetailList.createTime}},由
          <span
            style="color:#243CF1"
          >{{this.$route.query.startUserName}}</span>创建
        </div>
        <div v-for="(item,index) in taskDetailList.taskNodes" :key="index">
          {{index+2}}、{{item.date}},由
          <span v-for="(staff,i) in accountList" :key="i">
            <span v-if="item.createBy==staff.id" style="color:#243CF1">{{staff.name}}</span>
          </span>
          <span v-if="item.completionPercentage==0">
            开始执行任务,实际开始时间:{{item.date}}。
            <div v-if="item.note">备注:{{item.note}}</div>
          </span>
          <span v-if="item.completionPercentage>0&&item.completionPercentage<100">
            添加节点,节点时间:{{item.date}},
            <span>完成度:{{item.completionPercentage}}%。</span>
            <div v-if="item.note">备注:{{item.note}}</div>
            <div v-if="item.attachmentUrl" class="fujian">
              <span>附件:</span>
              <span v-if="item.attachmentUrl">
                <div
                  v-for="(each,i) in item.attachmentUrl.split(',')"
                  :key="i"
                  title="点击下载"
                  style="cursor:pointer;"
                  @click="yuLan(each)"
                  v-on:mouseover="changeActive($event)"
                  v-on:mouseout="removeActive($event)"
                >
                  <i class="el-icon-document" style="margin:0 0.2rem"></i>
                  {{each.substr(each.lastIndexOf("/")+1)}}
                </div>
              </span>
            </div>
          </span>
          <span v-if="item.completionPercentage==100">
            完成任务,完成时间:{{item.date}}。
            <div v-if="item.note">备注:{{item.note}}</div>
            <div v-if="item.attachmentUrl">
              <span>附件:</span>
              <span v-if="item.attachmentUrl">
                <div
                  v-for="(each,i) in item.attachmentUrl.split(',')"
                  :key="i"
                  title="点击下载"
                  style="cursor:pointer;"
                  @click="yuLan(each)"
                  v-on:mouseover="changeActive($event)"
                  v-on:mouseout="removeActive($event)"
                >
                  <i class="el-icon-document" style="margin:0 0.2rem"></i>
                  {{each.substr(each.lastIndexOf("/")+1)}}
                </div>
              </span>
            </div>
          </span>
        </div>
      </div>
      <div class="liuChengRight">
        <div style="margin-bottom:0.8rem;font-size:16px">任务详情</div>
        <div>任务名称:{{taskDetailList.name}}</div>
        <div>
          任务类型:
          <span v-if="taskDetailList.type==1">需求分析</span>
          <span v-if="taskDetailList.type==2">原型设计</span>
          <span v-if="taskDetailList.type==3">开发</span>
          <span v-if="taskDetailList.type==4">优化</span>
          <span v-if="taskDetailList.type==5">测试</span>
          <span v-if="taskDetailList.type==6">BUG修复</span>
        </div>
        <div>
          任务负责人:
          <span v-for="(item,index) in staffList" :key="index">
            <span v-if="taskDetailList.responsibleId==item.id">{{item.name}}</span>
          </span>
        </div>
        <!-- <div>完成度(%):<span v-if="taskDetailList.taskNodes">{{taskDetailList.taskNodes[taskDetailList.taskNodes.length-1].completionPercentage}}</span></div> -->
        <div>完成度(%):{{taskDetailList.taskNodes!==null?taskDetailList.taskNodes[taskDetailList.taskNodes.length-1].completionPercentage:'未开始'}}</div>
        <div>计划开始时间:{{taskDetailList.startdate}}</div>
        <div>实际开始时间:{{taskDetailList.startRealDate}}</div>
        <div>计划结束时间:{{taskDetailList.enddate}}</div>
        <div>实际结束时间:{{taskDetailList.endRealDate}}</div>
        <div>任务描述:{{taskDetailList.note}}</div>
        <div class="fujian">
          <span>附件:</span>
          <span>
            <div v-if="taskDetailList.attachmentUrl">
              <div
                v-for="(item,index) in taskDetailList.attachmentUrl.split(',')"
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
          </span>
        </div>
      </div>
    </div>
    <nodeForm
      :title="nodeTitle"
      :dialog-visible="nodeDialogFormVisible"
      @close-dialog="closeNodeFormDialog"
      @submit-success="NodeAddSuc"
      :isAdd="nodeIsAdd"
      :file="fileListNode"
      :imgList="imgListNode"
      :form="form"
      :form2="form2"
      :form3="form3"
    ></nodeForm>
  </div>
</template>

<script>
import projectServer from "../../api/projectManage";
import publicServer from "../../api/public";
import staffServer from "../../api/staff";
import nodeForm from "./node-form";
export default {
  name: "taskDetail",
  components: {
    nodeForm
  },
  data() {
    return {
      id: this.$route.query.id,
      taskDetailList: {},
      searchForm1: { page: 1, pageSize: 100 },
      accountList: [],
      staffList: [],
      nodeTitle: "",
      nodeDialogFormVisible: false,
      nodeIsAdd: null,
      form: { date: "" },
      form2: { date: "" },
      form3: { date: "" },
      fileListNode: [],
      imgListNode: []
    };
  },
  computed: {
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
    }
  },
  methods: {
    loadDetail() {
      projectServer.projectTaskDetail(
        this.id,
        res => {
          this.taskDetailList = res.data;
          console.log(this.taskDetailList);
        },
        () => {}
      );
    },
    account() {
      publicServer.findAccount(
        this.searchForm1,
        res => {
          this.accountList = res.data.list;
          // console.log()
        },
        () => {}
      );
    },
    staff() {
      staffServer.queryUserList(
        this.searchForm1,
        res => {
          this.staffList = res.data.list;
        },
        () => {}
      );
    },
    start() {
      if (this.taskDetailList.state == 1) {
        this.$message.warning("任务正在进行中");
      } else if (this.taskDetailList.state == 2) {
        this.$message.warning("任务已完成");
      } else {
        this.nodeIsAdd = 1;
        this.nodeTitle = `${this.taskDetailList.name}>开始`;
        this.nodeDialogFormVisible = true;
        this.form.taskId = this.taskDetailList.id;
      }
    },
    addNode() {
      if (this.taskDetailList.state == 2) {
        this.$message.warning("任务已完成");
      } else if (this.taskDetailList.state == 0) {
        this.$message.warning("任务还未开始");
      } else {
        this.nodeIsAdd = 2;
        this.nodeTitle = `${this.taskDetailList.name}>添加节点`;
        this.nodeDialogFormVisible = true;
        this.form2.taskId = this.taskDetailList.id;
      }
    },
    finish() {
      if (this.taskDetailList.state == 0) {
        this.$message.warning("任务还未开始");
      } else if (this.taskDetailList.state == 2) {
        this.$message.warning("任务已完成");
      } else {
        this.nodeIsAdd = 3;
        this.nodeTitle = `${this.taskDetailList.name}>完成`;
        this.nodeDialogFormVisible = true;
        this.form3.taskId = this.taskDetailList.id;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    closeNodeFormDialog() {
      this.nodeDialogFormVisible = false;
    },
    NodeAddSuc() {
      this.loadDetail();
      // this.$router.go(-1);
    },
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
    changeActive($event) {
      $event.currentTarget.className = "colorActive";
    },
    removeActive($event) {
      $event.currentTarget.className = "";
    }
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "项目列表", path: "/projectManage", params: null },
      // { name: "项目详情", path: "/projectDetail", params: null },
      { name: "任务详情", path: "/taskDetail", params: null }
    ]);
  },
  mounted() {
    this.loadDetail();
    this.account();
    this.staff();
    this.form.date = this.timeDefault;
    this.form2.date = this.timeDefault;
    this.form3.date = this.timeDefault;
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  padding: 1% 1%;
}
.topLeft {
  flex: 3;
  font-weight: bold;
  font-size: 20px;
  color: #6e6e6e;
}
.topRight {
  flex: 2;
}
.topRightCenter {
  width: 100%;
}
.topRight span {
  font-size: 28px;
  cursor: pointer;
  margin: 0 0.3rem;
}
.liuCheng {
  display: flex;
  padding: 0% 1%;
}
.liuChengLeft {
  flex: 3;
  line-height: 1.8;
}
.liuChengLeft > div {
  margin-bottom: 0.8rem;
}
.liuChengRight {
  flex: 2;
  line-height: 1.8;
}
.colorActive {
  color: blue;
}
.fujian {
  display: flex;
}
</style>




