<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="date"
      label="发布时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="作者"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="所属分类"
      width="140">
    </el-table-column>
    <el-table-column
      prop="name"
       width="78"
      label="是否公开">
    </el-table-column>
    <el-table-column
      prop="name"
       width="300"
      label="文章部分内容">
    </el-table-column>
    <el-table-column
      prop="name"
       width="70"
      label="阅读量">
    </el-table-column>
    <el-table-column
      prop="name"
       width="70"
      label="点赞量">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03 23:22:10',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>