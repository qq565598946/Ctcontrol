<template>
  <div class="log-show">
    <!-- 头部面包屑 -->
    <div class="header">
      <p><span class="line"></span>服务日志展示</p>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="#">服务</BreadcrumbItem>
        <BreadcrumbItem to="#">服务详情</BreadcrumbItem>
        <BreadcrumbItem >服务日志展示</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <!-- 内容区 -->
    <div class="container">
      <!-- 应用标题 -->
        <div class="title">
          掌上执法应用日志详情
        </div>
      <!-- 用户基本信息 -->
        <div class="basic-info">
            <div class="info-item">
              <label >用户：</label>
              <p>{{ basicInfo.user }}</p>
            </div>
            <div class="info-item">
              <label >身份证：</label>
              <p>{{ basicInfo.IdCard }}</p>
            </div>
          <div class="info-item">
            <label >IMEI码：</label>
            <p>{{ basicInfo.IMEI  }}</p>
          </div>
          <div class="info-item">
            <label >本次流量：</label>
            <p>{{ basicInfo.flux }}</p>
          </div>

        </div>

        <!-- 访问应用表格 -->
        <Table :loading="loading" :columns="columns1" :data="data1" class="table"  @on-row-click="openLogDetail"></Table>

      <!-- 分页 -->
      <div class="tablePage">
        <Page :total="totalPage" :page-size="pageSize" :current="currentPage" @on-change="changePage(page)" show-total></Page>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "service-log-display",

        data() {
            return {
              loading: true,
              userId: "",
              basicInfo: {
                 user: "",
                 IdCard: "",
                 IMEI: "",
                 flux: ""
              },
              totalPage:0,
              pageSize:10,
              currentPage: 1
            }
        },
        watch:{
          '$route'(to,from){
            //更新数据
            this.userId=this.$route.params.userId;

          }
        },
        methods: {
          openLogDetail(){

            this.$router.push({
              name: "日志详情",
              params:{
                userId:this.userId
              }
            });

          },
          changePage(page){
            this.getTableData(page)
          }
        },
        created() {

        },
        mounted() {

        }

    }
</script>

<style scoped lang="less">
  .log-show{
    padding: 30px;
    font-size: 14px;

    .container{
      .title{
          margin-top: 30px;
          font-size: 18px;
          padding-bottom: 5px;
          border-bottom: 1px solid #ddd;
      }
      .basic-info{
            height: 60px;
            line-height: 60px;
            display: flex;
            .info-item{
                display: flex;
              margin-right: 20px;
            }
       }
    }
  }


</style>
