<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        router
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#BFCBD9"
        style="height: 100vh; overflow-x: hidden; "
        :collapse-transition="true"
        :default-active="$route.path"
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-menu"></i>
          <span slot="title" style="font-size: 15px">首页</span>
        </el-menu-item>

        <el-submenu
          :index="index + ''"
          v-for="(item, index) in sidedata"
          :key="index"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>

          <el-menu-item-group>
            <el-menu-item
              style="font-size: 13px; "
              v-for="(v, i) in item.children"
              :key="i"
              :index="v.routing"
              >{{ v.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="header">
          <div class="header-left">
            <div class="collapse">
              <span>
                <i
                  class="el-icon-s-fold"
                  style="font-size: 28px"
                  v-show="!isCollapse"
                  @click="_isShow"
                ></i>
              </span>

              <span>
                <i
                  class="el-icon-s-unfold"
                  style="font-size: 28px"
                  v-show="isCollapse"
                  @click="_isShow"
                ></i>
              </span>
            </div>
            <h-bread></h-bread>
          </div>
          <div class="header-right">
            <h-screenfull />
            <h-avatar />
          </div>
        </div>
      </el-header>

      <el-main>
          
            <router-view ></router-view>
          
        
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import sidedata from "@/localdata/sidebar.json";
import BreadCrump from "@/components/common/BreadCrump";
import Avatar from "@/components/common/Avatar";
import Screenfull from "@/components/common/ScreenFull";

export default {
  data() {
    return {
      isCollapse: false,
      sidedata: null,
    };
  },
  components: {
    "h-bread": BreadCrump,
    "h-avatar": Avatar,
    "h-screenfull": Screenfull,
  },
  created() {
    this.sidedata = sidedata.data;
  },
  methods: {
    _isShow() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="scss" scope>
// 收缩样式
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  width: 200px;
}

.el-submenu {
  padding: 0 5px;
  .el-submenu span {
    font-size: 15px;
  }
}

.el-header {
  background-color: white;
  color: #333;
  height: 92px;
  box-shadow: 2px 1px 3px #888888;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    .header-left {
      display: flex;
      align-items: center;
      .collapse {
        cursor: pointer;
        width: 45px;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 120px;
    }
  }
}
</style>
