<template>
  <span v-if="show">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: "permission",

    props: {
      perms: {
        required: true,
        type: Array,
        default: () => {
          return [];
        }
      },
      operate: {
        type: String,
        default: 'AND'
      }
    },

    computed: {
      permissionList() {
        return this.$store.state.Public.permission;
      }
    },

    data() {
      return {
        show: false
      }
    },

    created() {
      this.show = this.$utils.hasPermission(this.permissionList, this.perms, this.operate);
    }
  }
</script>
