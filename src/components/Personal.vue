<template>
  <div class="web-wrap">
    <!--头部，我后面会修改-->
    <div class="page-header text-left">
        <img src="../assets/images/logo.png" class="logo" />
        <b-input type="text"
               id="keyword"
               required
               v-model="form.keyword"
               placeholder="请输入搜索关键词"
               class="keyword-in"
               >
        </b-input>
      <b-button class="search-btn " type="button">搜索</b-button>
    </div>

    <!--主体-->
    <div>
      <!--个人信息模块-->
      <div class="per-information">
        <b-container>
        
        </b-container>
      </div>

      <!--关注、浏览模块-->
      <div class="my">
        <b-container>
        <el-pagination  @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total">
          </el-pagination>
        </b-container>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '../assets/css/search.css'; 

  .per-information {
    height: 340px;
    border-bottom: 2px solid #DADADA;
  }

  .my {
    height: 500px;
    border-bottom: 2px solid #DADADA;
  }
</style>

<style>
  .el-pagination .el-pager .active {
    background-color: #00aca0!important;
  }

  .el-pagination .el-pager :hover {
    color: #00aca0!important;
  }
</style>

<script>
  export default {
    data: function() {
      return {
        form: {
          keyword: ''
        },

        total: 200,
      }
    },

    methods: {
      handleCurrentChange: function (val) {
        console.log("val:");
        console.log(`${val}`);
      }
    }
  }
</script>