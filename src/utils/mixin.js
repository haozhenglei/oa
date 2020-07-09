export default {
  data() {
    return {
      searchForm: {
        currentPage: 1,
        pageSize: 10,
      },
      isLoading: false,
      tableData: {
        items: []
      },
      formDialogVisible: false,
      isSubmiting: false,
      formData: {},
      isAdd: true
    }
  },
  methods: {
    hanldeEdite(row) {
      this.isAdd = false;
      this.formDialogVisible = true;
      this.formData = row;
    },
    
    search(){
      this.searchForm.currentPage = 1;
      this.loadList();
    },
    closeDialog() {
      this.formData = {}
      this.isAdd = true
    },
    handleCurrentChange(pageNum) {
      this.searchForm.currentPage = pageNum;
      this.loadList();
    },

    handleSizeChange(pageSize) {
      this.searchForm.currentPage = 1;
      this.searchForm.pageSize = pageSize;
      this.loadList();
    },

    handleReset() {
      this.searchForm = {currentPage:1,pageSize:10};
      this.loadList();
    },

    handleAdd() {
      this.formDialogVisible = true;
    },
  }
}