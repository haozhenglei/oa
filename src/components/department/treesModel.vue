<template>
  <div style="">
    <div style="padding-left:30px " v-for="item of nodes">
      <div style="width:100%;display: flex;align-items: center;padding: 5px 0" @click="expandNode(!item.isExpanded,item)">
        <div style="flex: 1">
          <el-radio :label="item.id">{{item.branchName}}</el-radio>
        </div>
        <i class="el-icon-arrow-down" style="font-size: 12px;font-weight: bold" v-if="item.childBranchs" v-show="item.isExpanded"></i>
        <i class="el-icon-arrow-up" style="font-size: 12px;font-weight: bold" v-if="item.childBranchs" v-show="!item.isExpanded"></i>
      </div>
      <trees-model v-if="item.childBranchs" :nodes="item.childBranchs" v-show="item.isExpanded"></trees-model>
    </div>
  </div>

</template>

<script>
  import treesModel from "./treesModel";
  export default {
    name: "trees-model",
    components: {
      treesModel
    },
    computed: {
      bodyHeight() {
        return this.$store.state.Public.bodyHeight
      },

    },
    props: {
      nodes: {
        type: Array,
        default: []
      },

    },
    data() {
      return {

      }
    },
    methods: {
      expandNode(isExpanded,item){
        console.log(isExpanded);
        item.isExpanded = isExpanded;
        console.log(this.nodes);
        this.$forceUpdate()
      },
      closeDialog() {

      },
    }
  }
</script>

<style scoped>

</style>
