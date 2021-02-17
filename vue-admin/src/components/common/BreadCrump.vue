<template>
  <!-- 面包屑 -->
  <div class="bread-crumbs">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>

      <el-breadcrumb-item v-if="route">{{ route }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="routee">{{ routee }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},

  computed: {
    route: function() {
      return this.$route.meta.Cname;
    },
    routee: function() {
      return this.$route.meta.cname;
    },
  },
};
</script>
<style></style>
