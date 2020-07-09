<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1%">
      <div>
        <el-button
          size="small"
          v-for="item in wpList"
          :key="item.name"
          :class="{active : active === item.name}"
          @click="selected(item)"
        >{{item.name}}</el-button>
      </div>
      <div @click="goBack">
        <i class="el-icon-arrow-left" style="font-size:24px;cursor: pointer;"></i>
      </div>
    </div>
    <div v-if="this.active=='概况'">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="submitForm"
        label-width="100px"
        size="small"
        :inline="true"
      >
        <el-form-item label="项目名称" prop="name" style="width:90%">
          <el-input v-model="formData.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="code">
          <el-input disabled="" v-model="formData.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目经理" prop="projectManager">
          <!-- <el-input v-model="proManager" placeholder="请输入"></el-input> -->
          <el-select v-model="formData.projectManager" placeholder="请选择" @change="channelFromChange">
            <el-option
              v-for="item in staffList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="companyId">
          <!-- <el-input v-model="company" placeholder="请输入"></el-input> -->
          <el-select v-model="formData.companyId" disabled placeholder="请选择">
            <el-option
              v-for="item in group"
              :key="item.id"
              :label="item.branchName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参与人员" prop="" style="width:90%">
          <!-- <el-input v-model="formData.users" placeholder="请输入"></el-input> -->
          <el-select v-model="users" multiple placeholder="请选择">
            <el-option
              v-for="item in staffList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startdate">
          <el-date-picker
            v-model="formData.startdate"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="交付日期" prop="enddate">
          <el-date-picker
            v-model="formData.enddate"
            type="date"
            placeholder="交付日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目描述" prop="note" style="width:90%">
          <el-input type="textarea" :rows="3" v-model="formData.note" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="添加附件" prop="attachmentUrl">
          <el-upload
            class="upload-demo"
            action="string"
            accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
            :http-request="upload"
            :file-list="fileLis"
            :on-success="handleAvatarSuccess"
            v-loading="uploading"
            :on-exceed="handOverLimit"
            :on-remove="handle_remove"
            :on-preview="handle_download"
          >+添加附件</el-upload>
        </el-form-item>
      </el-form>
      <div style="display:flex;margin-top:3%">
        <div style="flex:3"></div>
        <div style="flex:2">
          <el-button type="primary" @click="save">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
        <div style="flex:3"></div>
      </div>
    </div>

    <!-- 任务模块 -->

    <div v-if="this.active=='任务'">
      <div class="search-box">
        <div class="left-form">
          <el-form :inline="true" label-width size="small" @submit.native.prevent>
            <el-form-item label="任务类型" style="width:90%">
              <el-checkbox-group v-model="types" @change="typesChange">
                <el-checkbox v-for="i in authDtoList" :key="i.id" :label="i.id">{{i.authName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input v-model="searchForm.key" placeholder="任务名称、发起人"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="searchForm.state " placeholder="请选择">
                <el-option label="未开始" :value="0"></el-option>
                <el-option label="进行中" :value="1"></el-option>
                <el-option label="已完成" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="right-handle" style="margin-top:4%">
          <el-button type="primary" size="small" @click="search">搜索</el-button>
          <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
        </div>
      </div>
      <div style="padding:1% 3%;display:flex;justify-content:space-between;font-size:24px">
        <div></div>
        <div style="width:20%;text-align:right;color:#3551A2">
          <i style="cursor:pointer" class="el-icon-circle-plus-outline" title="新建" @click="addTask"></i>
          <i style="cursor:pointer;margin:0 4%" class="el-icon-edit" title="编辑" @click="editTask"></i>
          <i style="cursor:pointer" class="el-icon-delete" title="删除" @click="delTask"></i>
        </div>
      </div>
      <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
        <el-table :data="tableData" border style="width: 100%" @selection-change="gouXuan" :cell-style="changeCellStyle">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="任务名称" width="130">
            <template slot-scope="scope">
              <span @click="goDetail(scope.row.id,scope.row.startUserName)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="type" label="任务类型" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.type==1">需求分析</span>
              <span v-if="scope.row.type==2">原型设计</span>
              <span v-if="scope.row.type==3">开发</span>
              <span v-if="scope.row.type==4">优化</span>
              <span v-if="scope.row.type==5">测试</span>
              <span v-if="scope.row.type==6">BUG修复</span>
            </template>
          </el-table-column>
          <el-table-column prop="startUserName" label="发起人" width="100"></el-table-column>
          <el-table-column prop="responsibleId" label="任务负责人" width="100">
            <template slot-scope="scope">
              <span v-for="(item,index) in staffList" :key="index">
                <span v-if="scope.row.responsibleId==item.id">{{item.name}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="startdate" label="计划开始时间" width="110"></el-table-column>
          <el-table-column prop="startRealDate" label="实际开始时间" width="110"></el-table-column>
          <el-table-column prop="enddate" label="计划结束时间" width="110"></el-table-column>
          <el-table-column prop="endRealDate" label="实际结束时间" width="110"></el-table-column>
          <el-table-column prop="state" label="状态" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.state==0">未开始</span>
              <span v-if="scope.row.state==1">进行中</span>
              <span v-if="scope.row.state==2">已完成</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="start(scope.row.id,scope.$index)">开始</el-button>
              <el-button type="text" @click="addNode(scope.row.id,scope.$index)">添加</el-button>
              <el-button type="text" @click="finish(scope.row.id,scope.$index)">完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page="currentPage"
          :page-size="searchForm.pageSize"
          :page-sizes="pageAllSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <taskForm
          :title="title"
          :dialog-visible="taskFormVisible"
          @close-dialog="closeDialog"
          @submit-success="taskAddSuc"
          :isAdd="isAdd"
          :rowList="taskList"
          :userList="userList"
          :file="fileListTask"
          :imgList="imgListTask"
        ></taskForm>
        <!-- <el-dialog :title="nodeTitle" :visible.sync="nodeDialogFormVisible" width="30%">
          <el-form ref="form" :model="form" label-width="100px" v-if="nodeIsAdd==1">
            <el-form-item label="实际开始" prop="date">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="实际开始"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="3" v-model="form.note"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="form2" :model="form2" label-width="100px" v-if="nodeIsAdd==2">
            <el-form-item label="时间" prop="date">
              <el-date-picker
                v-model="form2.date"
                type="date"
                placeholder="时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="完成度" prop="completionPercentage">
              <el-input type="text" v-model="form2.completionPercentage" class="percentegy"></el-input>
              <span>%</span>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="3" v-model="form2.note"></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop>
              <el-upload
                class="upload-demo"
                action="string"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
          <el-form ref="form3" :model="form3" label-width="100px" v-if="nodeIsAdd==3">
            <el-form-item label="完成时间" prop="date">
              <el-date-picker
                v-model="form3.date"
                type="date"
                placeholder="完成时间"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" :rows="3" v-model="form3.note"></el-input>
            </el-form-item>
            <el-form-item label="添加附件" prop>
              <el-upload
                class="upload-demo"
                action="string"
                accept=".jpg, .jpeg, .png, .rar, .zip, .doc, .docx, .pdf"
                :http-request="upload"
                :on-success="handleAvatarSuccess"
                v-loading="uploading"
                :on-remove="handle_remove"
              >+添加附件</el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="nodeDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit(nodeIsAdd)">确 定</el-button>
          </div>
        </el-dialog> -->
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
    </div>
  </div>
</template>

<script>
import taskForm from "./task-form";
import nodeForm from "./node-form";
import projectServer from "../../api/projectManage";
import staffServer from "../../api/staff";
import publicServer from '../../api/public'
export default {
  name: "projectDetail",
  components: {
    taskForm,
    nodeForm
  },
  data() {
    return {
      wpList: [
        { name: "概况", id: 1 },
        { name: "任务", id: 2 }
      ],
      active: "概况",
      formData: {},
      formRules: {},
      form: { date: "" },
      form2: { date: "" },
      form3: { date: "" },
      authDtoList: [
        {authName: "需求分析",id: 1},
        {authName: "原型设计",id: 2},
        {authName: "开发",id: 3},
        {authName: "优化",id: 4},
        {authName: "测试",id: 5},
        {authName: "BUG修复",id: 6}
      ],
      types: [],
      id: this.$route.query.id,
      company: this.$route.query.company,
      proManager: this.$route.query.proManager,
      users: this.$route.query.users.split(','),
      searchForm: { page: 1, pageSize: 10, projectId: this.$route.query.id },
      searchForm1: { page: 1, pageSize: 100 },
      tableData: [],
      uploading: false,
      isLoading: false,
      total: 0,
      currentPage: 1,
      title: "",
      isAdd: null,
      taskFormVisible: false,
      taskList: {},
      userList: [],
      count: 0,
      staffList: [],
      nodeTitle: "",
      nodeDialogFormVisible: false,
      nodeIsAdd: null,
      checked: false,
      arr: [],
      imgList:[],
      file:[],
      group:[],
      fileListTask:[],
      imgListTask:[],
      fileListNode:[],
      imgListNode:[],
    };
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
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
    fileLis(){
      return this.file.map(item=>{
        return {name:item,url:item}
      });
    },
  },
  methods: {
    selected(item) {
      // this.searchForm.id = item.id;
      // this.searchForm.pageType = item.id - 1;
      this.active = item.name;
      if (this.active == "任务") {
        this.count += 1;
        if (this.count <= 1) {
          this.loadList();
        }
      }
      // console.log(this.searchForm.id)
    },
    channelFromChange(val){
        // this.userIds=[],
        this.staffList.map(item=>{
            if (item.id==val) {
                this.formData.companyId=item.branchId;             
            }
        })
    },
    Company() {
      publicServer.findCompanyList(
        {},
        res => {
          this.group = res.data;
          //   console.log(this.groupList)
        },
        () => {}
      );
    },
    typesChange(val) {
      // console.log(val);
    },
    gouXuan(selection) {
      this.arr = [];
      this.arr = selection;
      if (this.arr.length == 0) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    },
    loadDetail() {
      projectServer.projectDetail(
        this.id,
        res => {
          this.formData = res.data;
          this.file=this.formData.attachmentUrl.split(',');
          this.imgList=this.file;
        },
        () => {}
      );
    },
    loadList() {
      this.isLoading = true;
      projectServer.projectTaskFind(
        this.searchForm,
        res => {
          // console.log(res)
          this.isLoading = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.currentPage = res.data.pageNum;
        },
        () => {
          this.isLoading = false;
        }
      );
    },
    changeCellStyle (row, column, rowIndex, columnIndex) {
      if(row.column.label === "任务名称"){
          var obj={color:'#3551A2',fontWeight:'bold',cursor:'pointer'}
          return obj  // 修改的样式
      }else{
          return ''
      }
    },
    goDetail(id,startUserName){
      this.$router.push({
        name:'taskDetail',
        query:{id:id,startUserName:startUserName}
      })
    },
    handOverLimit() {
      // this.$message.warning('不能超过三张照片')
    },
    handBeforeUpload() {},
    upload(item) {
      this.uploading=true;
      let formData = new FormData();
      formData.append('greenPic', item.file);
      publicServer.uploadPic(formData, (res) => {
        this.uploading=false;
        item.onSuccess(res.data);
      },(res) => {
      });
    },
    handleAvatarSuccess(res, file, fileList) {
      this.imgList.push(res[0]);
      // console.log(this.imgList)
    },
    handle_remove(file, fileList) {
      // var _tmp = this.imgList;
      // console.log(file);

      console.log(_tmp);
      for (var i = 0, len = _tmp.length; i < len; i++) {
        // if (this.isAdd==1) {
        //   if (_tmp[i] == file.response[0]) {
        //   _tmp.splice(i, 1);
        //   break;
        //   }
        // }else
         if (this.active=="概况") {
          if (_tmp[i] == file.url) {
          _tmp.splice(i, 1);
          break;
          }
        }
      }
      this.imgList = _tmp;
      console.log(this.imgList)
    },
    //下载
    handle_download(file) {
      
      //获取最后一个.的位置
      var index= file.url.lastIndexOf(".");
      //获取后缀
      var ext = file.url.substr(index+1);
      if (ext=="jpg"||ext=="png"||ext=="jpeg") {
        this.downloadImg(file.url)
      }
      if(ext=="doc"||ext=="docx"||ext=="xls"||ext=="xlsx"){
        window.location.href=file.url;    
      }
      if (ext=="pdf") {
        // download(this.contract_content,"xxx","application/pdf");
        this.downloadFile(file.url,file.url);
      }
    },
    //pdf下载
   downloadFile(url,name){
    var request = new XMLHttpRequest();
        request.responseType = "blob";
        request.open("GET", url);
        request.onload = function() {
            var url = window.URL.createObjectURL(this.response);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = `${name}.pdf`
            a.click();
        }
        request.send();
},
    //图片下载
    downloadImg(url){
        let xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",url,true);
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function(){
          if (this.status == 200) {
            const blob = this.response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = url.substring(url.lastIndexOf("/")+1, url.length);
 
            //此写法兼容火狐浏览器
            document.body.appendChild(link);
 
            const evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, false);
            link.dispatchEvent(evt);
            window.URL.revokeObjectURL(link.href)
            document.body.removeChild(link);
          };
        }
 
        xmlhttp.send();
      },
    save() {
      this.formData={
        attachmentUrl:this.imgList.join(','),
        code:this.formData.code,
        companyId:this.formData.companyId,
        enddate:this.formData.enddate,
        id:this.formData.id,
        note:this.formData.note,
        projectManager:this.formData.projectManager,
        startdate:this.formData.startdate,
        userIds:this.users.join(","),
        name:this.formData.name
      }
      projectServer.projectAdd(this.formData,res=>{
        this.$message.success('更新成功');
        this.$router.go(-1);
      },()=>{})
    },
    cancel() {
      // const loading = this.$loading({
      //     lock: true,
      //     text: '正在取消操作',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      // this.loadDetail();
      // loading.close();
      this.$router.go(-1);
    },
    goBack() {
      this.$router.go(-1);
    },
    search() {
      this.searchForm.types=this.types;
      if (this.searchForm.types.length==0) {
        this.searchForm.types=null;
        this.loadList();
      }else{
        this.loadList();
      }
      
    },
    handleReset() {
      this.types=[];
      this.searchForm = { page: 1, pageSize: 10,projectId: this.$route.query.id};
      this.loadList();
    },
    staff() {
      staffServer.queryUserList(
        this.searchForm1,
        res => {
          this.staffList = res.data.list;
          // console.log(this.staffList)
        },
        () => {}
      );
    },
    addTask() {
      this.userList = [];
      this.isAdd = 1;
      this.title = "新建任务";
      this.taskFormVisible = true;
      this.taskList = { projectId: this.$route.query.id };
      this.imgListTask=[];
      this.fileListTask=[];
      // console.log(this.users)
      this.staffList.forEach(element => {
        this.users.forEach(item => {
          if (item == element.id) {
            this.userList.push({
              id: element.id,
              name: element.name
            });
            // console.log(this.userList)
          }
        });
      });
    },
    editTask() {
      if (this.checked == true) {
        this.isAdd = 3;
        this.title = "编辑任务";
        this.taskFormVisible = true;
        // this.taskList=this.arr[0];
        // var obj = Object.assign(this.taskList, { projectId: this.$route.query.id });
        // console.log(this.taskList)
        projectServer.projectTaskDetail(
          this.arr[0].id,
          res => {
            // console.log(res)
            this.taskList = res.data;
            Object.assign(this.taskList, { projectId: this.$route.query.id });
            this.fileListTask=this.taskList.attachmentUrl.split(',');
            this.imgListTask=this.fileListTask;
          },
          () => {}
        );
      } else {
        this.$message.warning("您还没有选中任务");
      }
    },
    delTask() {
      if (this.checked == true) {
        this.$confirm("你确定删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            projectServer.projectTaskDel(
              this.arr[0].id,
              res => {
                this.$message.success("删除成功");
                this.loadList();
              },
              () => {}
            );
          })
          .catch(() => {});
      } else {
        this.$message.warning("您还没有选中任务");
      }
    },
    start(id, index) {
      if (this.tableData[index].state==1) {
        this.$message.warning('任务正在进行中')
      }
      else if (this.tableData[index].state==2) {
        this.$message.warning('任务已完成')
      }else{
        this.nodeIsAdd = 1;
        this.nodeTitle = `${this.tableData[index].name}>开始`;
        this.nodeDialogFormVisible = true;
        this.form.taskId=id;
      }
    },
    addNode(id, index) {
      if (this.tableData[index].state==2) {
        this.$message.warning('任务已完成')
      }
      else if (this.tableData[index].state==0) {
        this.$message.warning('任务还未开始')
      }else{

        this.nodeIsAdd = 2;
        this.nodeTitle = `${this.tableData[index].name}>添加节点`;
        this.nodeDialogFormVisible = true;
        this.form2.taskId=id;
      }
    },
    finish(id, index) {
      if (this.tableData[index].state==0) {
        this.$message.warning('任务还未开始')
      }else if (this.tableData[index].state==2) {
        this.$message.warning('任务已完成')
      }
      else{

        this.nodeIsAdd = 3;
        this.nodeTitle = `${this.tableData[index].name}>完成`;
        this.nodeDialogFormVisible = true;
        this.form3.taskId=id;
      }
    },
    handleCurrentChange(pageNum) {
      this.searchForm.page = pageNum;
      this.loadList();
    },
    handleSizeChange(pageSize) {
      this.searchForm.page = 1;
      this.searchForm.pageSize = pageSize;
      this.loadList();
    },
    closeDialog() {
      this.taskFormVisible = false;
    },
    closeNodeFormDialog(){
      this.nodeDialogFormVisible=false;
    },
    NodeAddSuc(){
      this.loadList();
    },
    taskAddSuc() {
      this.loadList();
    },
    handleSubmit(val){
      if (val==1) {
          this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.type=1;
            this.form.completionPercentage=0;
            projectServer.taskNodeAdd(this.form,res=>{

              this.$message.success('任务开始')
              this.loadList();
              this.nodeDialogFormVisible=false;
            },()=>{})      
              
          }
        });
      }
      if (val==2) {
          this.$refs['form2'].validate(valid => {
          if (valid) {
            this.form2.type=2;
            this.form2.attachmentUrl=this.imgList.join(',')
            // console.log(this.form2)
            // this.form.completionPercentage=0;
            projectServer.taskNodeAdd(this.form2,res=>{

              this.$message.success('添加节点成功')
              this.loadList();
              this.nodeDialogFormVisible=false;
            },()=>{})      
              
          }
        });
      }
      if (val==3) {
          this.$refs['form3'].validate(valid => {
          if (valid) {
            this.form3.type=3;
            this.form3.attachmentUrl=this.imgList.join(',')
            // console.log(this.form2)
            this.form3.completionPercentage=100;
            projectServer.taskNodeAdd(this.form3,res=>{

              this.$message.success('节点已完成')
              this.loadList();
              this.nodeDialogFormVisible=false;
            },()=>{})      
              
          }
        });
      }
    },
  },
  created() {
    this.$store.dispatch("changeBreadcrumb", [
      { name: "项目列表", path: "/projectManage", params: null },
      { name: "项目详情", path: "/projectDetail", params: null }
    ]);
  },
  mounted() {
    this.loadDetail();
    this.staff();
    this.Company();
    this.form.date = this.timeDefault;
    this.form2.date = this.timeDefault;
    this.form3.date = this.timeDefault;
    // console.log(this.$route.query.users.split(","))
  }
};
</script>

<style lang="less" scoped>
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}
/deep/.el-form > .el-form-item:nth-child(1) > .el-form-item__content {
  width: 85%;
}
/deep/.el-form > .el-form-item:nth-child(5) > .el-form-item__content {
  width: 60%;
}
/deep/.el-form > .el-form-item:nth-child(8) > .el-form-item__content {
  width: 85%;
}
.el-date-editor.el-input{
  width:60%
}
.percentegy.el-input{
  width: 55%;
}
</style>
