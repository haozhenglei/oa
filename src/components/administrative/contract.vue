<!--合同管理-->
<template>
  <div class="role-list">
    <div class="search-box">
      <div class="left-form">
        <el-form :inline="true" label-width size="small" @submit.native.prevent>
          <el-form-item label="合同名称">
            <el-input v-model="searchForm.keyword" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="primary" size="small" plain @click="handleReset">重置</el-button>
      </div>
    </div>
    <div class="search-box">
      <div class="left-form"></div>
      <div class="right-handle">
        <el-button type="primary" size="small" @click="newAdd">新建</el-button>
      </div>     
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <div>
        <el-table :data="tableData">
        <el-table-column label="合同编号" prop="pactNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="合同名称" prop="pactName" show-overflow-tooltip></el-table-column>
        <el-table-column label="客户名称" prop="agentName" show-overflow-tooltip></el-table-column>
        <el-table-column label="上传日期" prop="upTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="上传人" prop="upBy" show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="comment" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="resetPwd(scope.row.id,scope.$index)">查看</el-button>
            <el-button type="text" size="small" @click="handleView(scope.row.id,scope.$index,scope.row.pactName)">下载</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
        :current-page="this.currentPage"
        :page-size="searchForm.pageSize"
        :page-sizes="pageAllSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- <el-dialog
      title="合同查看"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{contract_content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

    <el-dialog title="新建合同" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="合同编号" :label-width="formLabelWidth">
          <el-input v-model="form.pactNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同名称" :label-width="formLabelWidth">
          <el-input v-model="form.pactName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="form.agentName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加附件" :label-width="formLabelWidth">
          <!-- <el-upload
            class="avatar-uploader"
            action="string"
            :show-file-list="false"
            :http-request="upload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            v-loading="uploading"
            >
            <img v-if="fileType=='picture'" :src="form.fileUrl" class="avatar">
            <div v-else-if="fileType=='file'" class="avatar" style="width:100px;height:100px;line-height:20px">{{this.fileName}}</div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <el-upload class="upload-demo" action="string" :file-list="fileList" :limit="1" :http-request="upload" :on-success="handleAvatarSuccess" v-loading="uploading">
            <el-button type="text">+点击添加附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 预览图片 -->
    <el-dialog :visible.sync="dialogImgVisible" style="z-index:9999">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- 预览pdf -->
    <!-- <el-dialog title="预览" :visible.sync="viewVisible" width="100%" height="100%" top='0' :before-close='closeDialog'>      
      <div class="pdf" v-show="fileType === 'pdf'">
        <p class="arrow" style="margin-bottom:1%">     
        <el-button type="plain" size="small" @click="changePdfPage(0)" class="turn" :class="{grey: currentpage==1}">上一页</el-button>
        {{currentpage}} / {{pageCount}}     
        <el-button type="plain" size="small" @click="changePdfPage(1)" class="turn" :class="{grey: currentpage==pageCount}">下一页</el-button>
        </p>    
        <pdf
          :src="pdfsrc"  
          :page="currentpage" 
          @num-pages="pageCount=$event" 
          @page-loaded="currentPage=$event" 
          @loaded="loadPdfHandler"> 
        </pdf>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import contractServer from "../../api/contract";
import publicServer from '../../api/public'
import baseUrl from '../../assets/js/baseurl'
// import pdf from 'vue-pdf'
// import download from 'downloadjs'
// import { base64ToFileOrBlob, saveFileToBlob, saveFileToLink } from 'web-downloadfile';
export default {
  name: "contract",
  components:{
    // pdf
  },
  data() {
    return {
      searchForm: {
        page: 1,
        pageSize: 10,
      },
      total:0,
      currentPage:1,
      tableData: [],
      searchData: [],//搜索后的合同列表
      isLoading: false,
      contract_name:'',//合同名称
      is_search:false,//是否搜索
      dialogVisible: false,//查看弹出框初始不可见
      contract_content:'',//合同查看内容
      dialogFormVisible: false,//新建合同弹出框
      formLabelWidth: '120px',
      form:{
        pactNo:'',
        pactName:'',
        agentName:'',
        comment:'',
        fileUrl:'',
      },
      // fileName:'',
      // fileType:'',
      fileList:[],
      uploading:false,
      dialogImgVisible:false,
      dialogImageUrl:'',
      viewVisible:false,
      currentpage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      pdfsrc:'',
      fileType:'pdf',
    };
  },
  computed: {
    pageAllSize: function() {
      return this.$store.state.Public.pageAllSize;
    },
    bodyHeight() {
      return this.$store.state.Public.bodyHeight;
    },
  },
  created() {
    this.$store.dispatch('changeBreadcrumb', [
      {name: '合同管理', path: '/contract', params: null},
      
    ])
  },
  mounted() {
    this.loadList();
  },
  methods: {
    loadList() {
      this.isLoading = true;
        contractServer.constractListFind(this.searchForm, res => {
          // console.log(res)
          this.isLoading = false;
          this.tableData = res.data.list;
          this.total=res.data.total;
          this.currentPage=res.data.pageNum;
        }, () => {
          this.isLoading = false;
        })
    },
    //搜索
    search() {
      this.loadList();
    },
    //重置
    handleReset() {
      this.searchForm={page:1,pageSize:10}
      this.loadList();
    },
    //新建
    newAdd(){
      this.form={
        pactNo:'',
        pactName:'',
        agentName:'',
        comment:'',
        fileUrl:'',
      };
      this.dialogFormVisible=true;
      this.fileList=[];
    },
    sure(){
      this.dialogFormVisible = false;
      contractServer.constractAdd(this.form,res=>{
        if (res.code==200) {
          this.$message.success('新增成功')
          this.loadList();
        }else{
          this.$message.error('新增失败')
        }      
      },()=>{})
    },
      upload(item){
        this.uploading=true;
        let formData = new FormData();
        formData.append('greenPic', item.file);
        publicServer.uploadPic(formData, (res) => {
          this.uploading=false;
          item.onSuccess(res.data);
        },(res) => {
        });
      },
      beforeAvatarUpload (file) {

      },
      handleAvatarSuccess(res,file) {
        // var houZhui=res[0].substr(res[0].lastIndexOf("."));
        // if (houZhui=='.jpg' || houZhui =='.jpeg' || houZhui =='.png'|| houZhui =='.bmp') {
        //   this.fileType='picture';
        // } else {
        //   this.fileType='file';
        //   this.fileName=file.name;
        // }
        this.form.fileUrl = res[0]
      },
      
    //查看预览
    resetPwd(id,index) {
      this.contract_content=this.tableData[index].fileUrl;
      //获取最后一个.的位置
      var index= this.contract_content.lastIndexOf(".");
      //获取后缀
      var ext = this.contract_content.substr(index+1);
      if (ext=="jpg"||ext=="png"||ext=="jpeg") {
        this.dialogImageUrl = this.contract_content;
        this.dialogImgVisible = true;
      }
      if(ext=="doc"||ext=="docx"||ext=="xls"||ext=="xlsx"){
        window.open("https://view.officeapps.live.com/op/view.aspx?src=" + this.contract_content);
      }
      if (ext=="pdf") {
        // let url = this.contract_content;
        // this.viewVisible = true
        // this.pdfsrc = url
        window.open(this.contract_content);
      }
    },
    // // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    //   changePdfPage (val) {
    //     // console.log(val)
    //     if (val === 0 && this.currentpage > 1) {
    //       this.currentpage--
    //       // console.log(this.currentPage)
    //     }
    //     if (val === 1 && this.currentpage < this.pageCount) {
    //       this.currentpage++
    //       // console.log(this.currentPage)
    //     }
    //   },

    //   // pdf加载时
    //   loadPdfHandler (e) {
    //     this.currentpage = 1 // 加载的时候先加载第一页
    //   },

    // closeDialog(done) {
    //     done();
    //   },
    //下载
    handleView(id,index,name) {
      this.contract_content=this.tableData[index].fileUrl;
      //获取最后一个.的位置
      var index= this.contract_content.lastIndexOf(".");
      //获取后缀
      var ext = this.contract_content.substr(index+1);
      if (ext=="jpg"||ext=="png"||ext=="jpeg") {
        this.downloadImg()
      }
      if(ext=="doc"||ext=="docx"||ext=="xls"||ext=="xlsx"){
        window.location.href=this.contract_content;    
      }
      if (ext=="pdf") {
        // download(this.contract_content,"xxx","application/pdf");
        this.downloadFile(this.contract_content,name);
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
    downloadImg(){
        const url = this.contract_content;
        // window.open(_this.detail.imgUrl)
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
    //删除
    handleDelete(id) {
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          contractServer.constractDel(id,(res)=>{
            if (res.code==200) {
              this.$message.success('删除成功');
              this.loadList();
            }else{
              this.$message.error('删除失败');
            }          
          })         
        })
        .catch(() => {});
    },
    handleCurrentChange(pageNum) {
      this.searchForm.page = pageNum;
      this.loadList();
    },
    handleSizeChange(pageSize) {
      this.searchForm.page = 1;
      this.searchForm.pageSize = pageSize;
      this.loadList();
    }
  }
};
</script>
<style lang="less" scoped>

</style>