<template>
  <div class="deviceZone">
    <!-- 头部面包屑 -->
    <div class="header">
      <p>设备分区</p>
    </div>
    <!-- 主体内容 -->
    <div class="main-content">
      <!-- 搜索 -->
      <div class="search-service clearfix">
        <Input search  placeholder="输入设备号,设备名称或开发商名称搜索" class="item-input" v-model="condition.searchData"/>
        <div class="history-search line-item" :class="{ moreType:isMoreClick }">
          <div class="label">历史搜索: </div>
          <div class="search-content item-content">
            <p v-for="item in condition.history"><a href="javascript:void(0);" title=`${item}`>{{ item }}</a></p>
          </div>

          <div class="getMore" @click.stop="getMoreHistory()" v-show="condition.history.length>10">
            更多  <Icon :type="IconHis" />
          </div>

        </div>
      </div>
      <!-- 标签筛选 -->
      <div class="label-filter">
        <!-- 所属城市 -->
        <div class="line-item " :class="{ moreType:isMoreCityClick }">
          <div class="label">所属城市: </div>
          <div class="item-content">
            <p v-for="item in condition.cityNames"  @click="itemCity(item.cityId)"><a href="javascript:void(0);" title=`${item}`>{{ item }}</a></p>
          </div>

          <div class="getMore" @click="getMoreCity()" v-show="condition.cityNames.length>10">
            更多 <Icon :type="IconCity" />
          </div>
        </div>
        <!-- 部署网络 -->
        <div class="line-item" :class="{ moreType:isMoreNetworkClick }">
          <div class="label">部署网络: </div>
          <div class="item-content">
            <p v-for="item in condition.network"  @click="itemNetwork(item.netId)"><a href="javascript:void(0);" title=`${item}`>{{ item }}</a></p>
          </div>

          <div class="getMore" @click="getMoreNetWork()" v-show="condition.network.length>10">
            更多 <Icon :type="IconNet" />
          </div>

        </div>

      </div>
      <div class="service-container">
        <!-- 标题 -->
        <div class="service-title">设备列表</div>
        <!--设备列表 -->
        <div class="dervice-list">
          <Table  :columns="columns5" :data="data5"></Table>
        </div>
      </div>
      <!-- 分页 -->
      <div class="tablePage">
        <Page :total="totalPage" :page-size="pageSize" :current="currentPage" @on-change="changePage" show-total></Page>
      </div>

    </div>

  </div>
 
</template>

<script>
  // import axios from 'axios'
  import derviceZoneDetails from './derviceZoneDetails'
  export default {
    components: {
      derviceZoneDetails
    },
    name: "derviceZone",

    data() {
      return {
        condition:{
          searchData: '',
          history:[],
          cityNames:[],
          network:[],
          classify:[],
        },
        isMoreClick: false,
        isMoreCityClick:false,
        isMoreNetworkClick:false,
        isMoreClassifyClick:false,
        IconHis:"ios-arrow-down",
        IconCity:"ios-arrow-down",
        IconNet:"ios-arrow-down",
        IconClassify:"ios-arrow-down",
        stateImg:require("../../assets/public.png"),
        serviceList:[],
        pageSize: 10,
        currentPage: 1,
        columns5: [
          {
            title: '名称',
            key: 'date',
          },
          {
            title: '编号',
            key: 'date0'
          },
          {
            title: '类型',
            key: 'date1',
          },
          {
            title: '地区',
            key: 'date2'
          },
          {
            title: 'cpu状态',
            key: 'date3'
          },
          {
            title: 'raid状态',
            key: 'date4'
          },
          {
            title: '内存状态',
            key: 'date5'
          },
          {
            title: '温度状态',
            key: 'date6'
          },
          {
            title: '物理硬盘状态',
            key: 'date7'
          },
          {
            title: '电源状态',
            key: 'date8'
          },
          {
            title: '网卡状态',
            key: 'date9'
          },
          {
            title: '风扇状态',
            key: 'date10'
          },{
              title:'操作',
              key:'date11',
            width:150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDestail(params.row.date11)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data5: [
          {
            date: '阿里云1号',
            date0: '00354',
            date1: 'linux服务器',
            date2: '兰州市',
            date3: '深圳星火电子工程公司',
            date4: '40%',
            date5: '正常',
            date6: '99%',
            date7: '50%',
            date8: '99%',
            date9: '50%',
            date10: '稳定',
            date11: '1',
          },
        ]
      }
    },
    methods: {
      //查看更多
      getMoreHistory(){
        this.isMoreClick = !this.isMoreClick;
        this.IconHis = this.isMoreClick ? "ios-arrow-up" : "ios-arrow-down"
      },
      getMoreCity(){
        this.isMoreCityClick = !this.isMoreCityClick;
        this.IconCity = this.isMoreCityClick ? "ios-arrow-up" : "ios-arrow-down"
      },
      getMoreNetWork(){
        this.isMoreNetworkClick = !this.isMoreNetworkClick;
        this.IconNet = this.isMoreNetworkClick ? "ios-arrow-up" : "ios-arrow-down"
      },
      // 获取历史搜索
      getHistoryData(){
        var data = {}

        this.$get({
          url:this.$bus.gateWayList.appservice+"",
          data: data,
          cache:this.cache,
          success(data){
            this.condition.history = data;
          }
        });
      },

      // 获取所属城市
      getCityData(){

        var data = {};

        var CityCache = this.$bus.serviceManage.regionListCatch;

        if(CityCache.length){
          this.condition.cityNames = CityCache;
          return
        }

        this.$get({
          url:this.$bus.gateWayList.appservice+"",
          data: "",
          cache:this.cache,
          success(data){

            this.condition.cityNames = data;

            this.condition.cityNames.forEach( item => {

              this.$bus.serviceManage.regionListCatch.push(item);

            });
          }
        });
      },

      // 获取部署网络
      getNetworkData(){
        var data = {}

        var networkCatch = this.$bus.serviceManage.networkCatch;

        if(networkCatch.length){
          this.condition.network = networkCatch;
          return
        }
        this.$get({
          url:this.$bus.gateWayList.appservice+"",
          data: "",
          cache:this.cache,
          success(data){
            this.condition.network = data;
          }
        });

      },
      showDestail(value){
        // this.$router.push({name:"设备详情"});
          this.$router.push({
              path:'/derviceZoneDetails',
              query:{
                  id:value
              }
          })
      },
      remove(value){

      },
      // 表格分页
      changePage(page){

        this.currentPage = page;
        this.getServiceListData()

      },

      // 点击所属城市
      itemCity(cityId){
        this.currentPage = 1;
        getServiceListData();
      },

      // 点击部署网络
      itemNetwork(netId){
        this.currentPage = 1;
        getServiceListData();
      },

      // 点击分类
      itemClassify(classifyId){
        this.currentPage = 1;
        getServiceListData();
      }

    },
    computed:{

    },
    created() {

    },
    mounted() {
      this.getHistoryData();
      this.getCityData();
      this.getNetworkData();
      this.$nextTick(function () {
        this.stateImg = '../../assets/offLine.png';
      });

    }

  }
</script>
<style scoped lang="less" type="text/less" >


  .deviceZone{
    padding: 20px;
    font-size: 14px;
  .coloBlack{
    color: #333;
  }
  .header{
    padding: 10px 10px 10px 0px; ;
    text-align: left;
    border-bottom: 1px solid #ddd;
  :before{
    content: "";
    width: 3px;
    height: 18px;
    background: #00C5E2;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
  }
  }

  .main-content{
    padding: 20px 0;

  .search-service{


  .item-input{
    width: 30%;
    padding-bottom: 6px;

    display: flex;
    justify-content: flex-start;
  }


  }

  .service-container{
  .service-title{
    justify-content: flex-start;
    display: flex;
    font-size: 18px;
    padding-bottom: 4px;
    border-bottom: 1px solid #ddd;
    margin-bottom:20px;
  }

  .service-content{
    margin: 25px auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  .content-item{
  &:hover{
     box-shadow: 0 0 6px #00c5e2;
     border: 1px solid #00c5e2;
   }
  width: 200px;
  height: 200px;
  box-shadow: 0 0 6px #A3A3A3;
  border-radius: 4px;
  margin: 20px 10px;
  display: flex;
  justify-content: center;
  position: relative;
  .topImage{
    position: absolute;
    right: 0;
  }

  .item-desc{
    width: 100px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
  }
  img{
    height: 80px;
    line-height: 80px;
  }
  }
  }

  }
  .label-filter{
    padding: 20px 0;
  }
  .line-item{
    width: 1200px;
    display: flex;
    height: 30px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
  .label{
    text-align: left;
    width: 80px;
    height: 30px;
    line-height: 30px;
    color: #b6b6b6;
  }

  .item-content{
  a{
    color: #333
  }
  }

  .search-content{
  p{
  a{
    color: #999
  }
  }
  }

  .item-content{
    display: flex;
    flex-wrap: wrap;
    flex-grow: 17;
    cursor: pointer;
  }

  p{
    margin-right: 5px;
    overflow: hidden;
    white-space: nowrap;
    word-wrap: break-word;
    text-overflow: ellipsis;

    height: 30px;
    width: 60px;
    line-height: 30px;
    border-radius: 5px;

  }
  }

  .moreType{
    height:auto !important;
    overflow: auto;
  }
  }

  }
  .colorGray{
    color: #b6b6b6
  }

  .getMore{
    color: #1E9FFF;
    cursor: pointer;
    margin-top: 4px;
    right: 0px;
    position: absolute;
    z-index: 9999;
  }

.dervice-list{
      margin: 15px 0px;
}

</style>
