<template>
  <div class="service-detail">
    <!-- 头部面包屑 -->
    <div class="header">
      <p><span class="line"></span>服务详情</p>
      <Breadcrumb separator=">">
        <BreadcrumbItem to="#">服务</BreadcrumbItem>
        <BreadcrumbItem >服务详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- 服务简介 -->
    <div class="service-introduce">
      <!-- 图像 -->
        <img :src="serviceDesc.serviceImg" alt="服务图像">
      <!-- 右侧描述信息 -->
        <div class="introduce-container">
            <p class="title mb10">{{ serviceInfo.serviceName }} <span class="version">{{ serviceInfo.serviceVersion }}</span><span class="colorGray">{{ serviceInfo.company }}</span></p>
            <p class="middle">
              <span>服务标志：<span class="mr20">{{ serviceInfo.serviceFlag[0] }}</span></span>
              <span class="mr20">{{ serviceInfo.serviceFlag[1] }}</span>
              <span>{{ serviceInfo.serviceFlag[2] }}</span>
            </p>
            <p class="mr20 mb10">服务状态：<span>{{ serviceInfo.serviceStatus }}</span></p>
            <p >服务更新时间：<span class="mr20">{{ serviceInfo.serviceUpdateTime }}</span> 服务大小：<span>{{ serviceInfo.serviceSize }}</span></p>
        </div>
    </div>

    <!-- tab切换 -->
    <Tabs  value="application">
      <TabPane label="访问应用" name="application">
        <div class="select-time" >

          <DatePicker
            type="datetime"
            :value="condition.beginTime"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="handleChange1"
            placeholder = "访问开始时间"
          >

          </DatePicker>

       <span class="interval">至</span>
          <DatePicker
            type="datetime"
            :value="condition.endTime"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="handleChange2"
            placeholder = "访问结束时间">

          </DatePicker>

          <div class="application-name">
            <Input placeholder="输入应用关键字搜索" suffix="ios-search" v-model="condition.keyWords" />
            <div  @click="searchData" ></div>
          </div>

        </div>
        <!-- 访问应用表格 -->
        <Table :columns="columns1" :data="data1" class="table"></Table>

        <!-- 分页 -->
        <Page :total="100" />
      </TabPane>
      <TabPane label="服务描述" name="service-desc">
        <div class="service-desc">

          <div class="mb30">

            <div class="desc-item">
              <label>服务开发商负责人：</label>
              <div>{{ serviceDesc.responsePerson }}</div>
            </div>

            <div class="desc-item">
              <label>服务开发商运维人员：</label>
              <div>{{ serviceDesc.responsePerson }}</div>
            </div>

          </div>

          <div class="mb30">

            <div class="desc-item">
              <label>服务依赖：</label>
              <div>{{ serviceDesc.dependent }}</div>
            </div>

            <div class="desc-item">
              <label>服务更新时间：</label>
              <div>{{ serviceDesc.updateTime }}</div>
            </div>

            <div class="desc-item">
              <label>服务下载地址：</label>
              <div>{{ serviceDesc.address }}</div>
            </div>

            <div class="desc-item">
              <label>服务描述：</label>
              <Input  type="textarea" :rows="4" class="resetWidth" v-model="serviceDesc.desc" />
            </div>

          </div>

          <div class="mb30">

            <div class="desc-item">
              <label>容器信息：</label>
              <div>{{ serviceDesc.container }}</div>
            </div>

            <div class="desc-item">
              <label>容器节点：</label>
              <div>{{ serviceDesc.containerNode }}</div>
            </div>

            <div class="desc-item">
              <label>容器运行情况：</label>
              <div>{{ serviceDesc.workingStatus }}</div>
            </div>

          </div>

        </div>
      </TabPane>
      <TabPane label="服务排名" name="service-rank" >
          <Form class="form">
            <FormItem  class="select-item">
              <Select  placeholder="" v-model="serviceRank">
                <Option  v-for="item in rankList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem  class="select-item">
              <Select  v-model="timeDetail">
                <Option  v-for="item in timeLine" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem class="export"> <Button @click="exportService">导出</Button></FormItem>
          </Form>

        <!-- 访问应用表格 -->
        <Table :loading="loading" :columns="columns1" :data="data1" class="table"  @on-row-dblclick="openLogDisplay"></Table>
        <!-- 分页 -->
        <div class="tablePage">
          <Page :total="totalPage" :page-size="pageSize" :current="tablePage" @on-change="changePage(page)" show-total></Page>
        </div>
      </TabPane>
    </Tabs>


  </div>

</template>

<script>
    import logDisplay from "./serviceLogDisplay.vue"
    export default {
        name: "service-detail",
        data() {
            return {
              loading: true,
              userId: "",
              tabValue:"application",
              serviceInfo: {
                serviceImg: "",
                serviceName: "",
                serviceVersion: "",
                company: "",
                serviceFlag: [1,2,3],
                serviceStatus: "",
                serviceUpdateTime: "",
                serviceSize: "",
              },
              condition: {
                beginTime: "",
                endTime: "",
                keyWords: "",
              },
              columns1: [
                {
                  title: '应用名',
                  key: 'name'
                },
                {
                  title: '应用标志',
                  key: 'age'
                },
                {
                  title: '开发商',
                  key: 'address'
                },
                {
                  title: '访问用户',
                  key: 'address'
                },
                {
                  title: '机构',
                  key: 'address'
                },{
                  title: '地区',
                  key: 'address'
                },{
                  title: '访问时间',
                  key: 'address'
                },{
                  title: "操作",
                  key: "opt",
                  render: (h,params) =>{
                        return h(
                          <div>
                          aaa
                          </div>

                        )

                    }
                }
              ],
              data1: [
                {
                  name: 'John Brown',
                  age: 18,
                  address: 'New York No. 1 Lake Park',
                  date: '2016-10-03'
                },
                {
                  name: 'Jim Green',
                  age: 24,
                  address: 'London No. 1 Lake Park',
                  date: '2016-10-01'
                },
                {
                  name: 'Joe Black',
                  age: 30,
                  address: 'Sydney No. 1 Lake Park',
                  date: '2016-10-02'
                },
                {
                  name: 'Jon Snow',
                  age: 26,
                  address: 'Ottawa No. 2 Lake Park',
                  date: '2016-10-04'
                }
              ],
              serviceDesc: {
                 responsePerson: "",
                 maintenancePerson: "",
                 dependent: "",
                 updateTime: "",
                 address: "",
                 desc: "",
                 containerNode: "",
                 workingStatus: "",
              },
              serviceRank:"",
              rankList:[],
              timeLine:[],
              timeDetail: "",
              totalPage:0,
              pageSize:10,
              tablePage: 1
            }
        },
        components:{
          logDisplay
        },
        watch:{
          '$route'(to,from){
            //更新数据
            this.userId=this.$route.params.id;

          }
        },
        methods: {
          handleChange1(){

          },
          handleChange2(){

          },
          searchData(){

          },
          getOption(){
         /*   this.$get({
              url:"",
              success(data){
                this.rankList = data;
              }
            })*/

          },


          getTableData(){
            data = {}
            data.condition = this.condition;

            this.$get({
              baseUrl:this.$bus.addressListBaseUrl,
              url: "",
              data: "",
              cache:this.cache,
              complete(){
                this.loading = false;
              },
              success(data){
                this.condition.serviceList = data;
              }

            });
          },

          // 表格分页
          changePage(page){

            this.getTableData(page)

          },
          exportService(){

          },

          openLogDisplay(){

            this.$router.push({
              name: "服务日志展示",
              params:{
                userId:this.userId
              }
            });

          }

        },
        created() {
          this.getOption();
        },
        mounted() {

        }

    }
</script>

<style scoped lang="less">

  .service-detail{
    padding: 30px;
    font-size: 14px;
    .header{
      padding: 10px 10px 10px 0px; ;
      text-align: left;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      .line{
        content: "";
        width: 3px;
        height: 18px;
        background: #00C5E2;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .service-introduce {
      margin: 20px 0;
      display: flex;

      .introduce-container {
        margin: 5px 0;
        .title {
          font-size: 18px;
          color: #333;

          span {
            font-size: 12px;
          }
        }

        .version {
          margin: 0 5px;
        }

        p {
          text-align: left;
        }

        span {
          display: inline-block;
        }

        .mb10 {
          margin-bottom: 10px;
        }

        .mr20 {
          margin-right: 20px;
        }

      }

      img {
          width: 120px;
          height: 120px;
          border: 1px solid #ddd;
          margin-right: 20px;
      }

    }
  }
  .colorGray{
    color: #999
  }

  .select-time{
    display: flex;
    margin-bottom: 20px;

    .application-name{
      margin-left: 20px;
    }

    .interval{
      display: inline-block;
      text-align: center;
      margin: 0 10px;
      line-height: 32px;
    }

  }

  .service-desc{
    margin-top: 20px;
    .mb30{
      margin-bottom: 30px;
    }
    .desc-item{
        display: flex;
         margin-bottom: 5px;
        label{
          width: 150px;
          text-align: right;
          margin-right: 5px;
        }
      .resetWidth{
        width: 34%
      }

    }
  }

  .form{
    margin: 20px 0 10px 0;
    display: flex;

    .select-item{
      width: 20%;
      margin-right: 15px;
    }

  }

  .table{
    margin-bottom: 20px;
  }

</style>
