<template>
  <div>
    <div style="height:40px;font-weight:bold">流程类别管理</div>
    <div style="display:flex;margin-bottom:1%">
        <div style="flex:5"></div>
        <div style="flex:1"><el-button type="primary" @click="addLiuChengType">新增流程类别</el-button></div>       
    </div>
    <div class="list-box" v-loading="isLoading" element-loading-text="拼命加载中">
      <el-table :data="tableData" border="">
        <el-table-column label="类别名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="editType(scope.row.id,scope.$index)">编辑</el-button>
            <el-button type="text" size="small"  @click="deleteType(scope.row.id,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog width="600px" :title="title" :visible.sync="dialogLiuChengVisible">
      <el-form :model="liuChengform">
        <el-form-item label="流程名称" :label-width="formLabelWidth">
          <el-input v-model="liuChengform.name" autocomplete="off" placeholder="输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="liuChengform.description" autocomplete="off" placeholder="输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLiuChengVisible = false">取 消</el-button>
        <el-button type="primary" @click="liuChengSure(isAdd)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import appServer from '../../api/approval'
  export default {
    name: '',
    components: {
      
    },
    data() {
      return {
        isLoading:false,
        tableData:[],
        dialogLiuChengVisible:false,
        liuChengform:{},
        formLabelWidth:'120px',
        title:'',
        isAdd:0,
        // tableDataIndex:'',
      }
    },
    computed: {
      
    }, 
    methods: {
      loadList(){
        this.isLoading=true;
        appServer.liuChengTypeList({},res=>{
            this.isLoading=false;
            console.log(res)
            this.tableData=res.data;
        },()=>{})
        
      },
      addLiuChengType(){
        this.dialogLiuChengVisible=true;
        this.isAdd=1;
        this.title='新增流程类别'
      },
      liuChengSure(isadd){
          if (isadd==1) {
            appServer.liuChengTypeAdd(this.liuChengform,res=>{
                if (res.code==200) {
                    this.$message.success('新增成功')
                    this.loadList();
                } else {
                    
                }
            },()=>{})
          } else {
            appServer.liuChengTypeUpdate(this.liuChengform,res=>{
                console.log(res)
            },()=>{})
          }
        
        this.dialogLiuChengVisible=false;
      },
      editType(id,index){
        //   console.log(id)
        this.dialogLiuChengVisible=true;
        this.isAdd=2
        this.title='编辑流程类别';
        this.liuChengform=this.tableData[index];
      },
      deleteType(id,index){
        appServer.liuChengTypeDelete(id,res=>{
            this.$message.success('删除成功');
            this.loadList();
        },()=>{})
      },
    },   
    created() {
      this.$store.dispatch('changeBreadcrumb', [
        // {name: '审批管理', path: '/approval', params: null},
        {name: '流程类别管理', path: '/approvalType', params: null}
      ])
    },
    mounted(){
       this.loadList();
    }
      
  }
</script>

<style lang="less" scoped>

</style>
