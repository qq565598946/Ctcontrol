<template>
  <div id="main">
    <div class="header">
      <p>设备列表</p>
    </div>
    <div class="select-box">
      <Select v-model="model1" style="width:200px">
        <Option v-for="item in derviceState" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="tableCon">
      <Table  :columns="deviceList" :data="deviceArr"></Table>
    </div>
    <Page :total="2" show-total :current="pageNum" :page-size="pageSize"   @on-change="handlePage" @on-page-size-change='handlePageSize'/>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        pageSize:10,
        pageNum:1,
        derviceState:[
          {
            value: '1',
            label: 'CPU状态良好'
          },
          {
            value: '2',
            label: 'CPU状态不好'
          },
          {
            value: '3',
            label: 'CPU内存不足'
          },

        ],
        model1: '1',
        deviceList: [
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
            key: 'date3',
            render:(h,params)=>{
              let tmpStr = "";
              switch(params.row.date3){
                case '90%': tmpStr = '90%'
                  break;
              }
              return h('span',{
                style:{
                  color: (params.row.date3=='10%')?"#ed3f14":(params.row.date3=='40%'?"#19be6b":"#2d8cf0")
                }
              },tmpStr)
            }
          },
          {
            title: 'raid状态',
            key: 'date4',
            render:(h,params)=>{
              let tmpStr = "";
                switch(params.row.date4){
                  case '40%':
                    tmpStr = '正常';
                    break;
                  default: tmpStr = '0%'
                }
              return h('span',{
                style:{
                  color: (params.row.date4=='10%')?"#ed3f14":(params.row.date4=='40%'?"#19be6b":"#2d8cf0")
                }
              },tmpStr)
            }
          },
          {
            title: '内存状态',
            key: 'date5',
            render:(h,params)=>{
              let tmpStr = "";
              switch(params.row.date5){
                case '10%':
                  tmpStr = '90%';
                  break;
                default: tmpStr = '0%'
              }
              return h('span',{
                style:{
                  color: (params.row.date5=='10%')?"#ed3f14":(params.row.date5=='90%'?"#19be6b":"#2d8cf0")
                }
              },tmpStr)
            }
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
          }
        ],
        deviceArr: [
          {
            date: '阿里云1号',
            date0: '00354',
            date1: 'linux服务器',
            date2: '兰州市',
            date3: '90%',
            date4: '40%',
            date5: '10%',
            date6: '99%',
            date7: '50%',
            date8: '99%',
            date9: '50%',
            date10: '稳定',
          }, {
            date: '阿里云1号',
            date0: '00354',
            date1: 'linux服务器',
            date2: '兰州市',
            date3: '90%',
            date4: '40%',
            date5: '10%',
            date6: '99%',
            date7: '50%',
            date8: '99%',
            date9: '50%',
            date10: '稳定',
          },
        ]
      }
    },mounted:function () {
        this.GetDeviceData(1,10)
    },methods:{
      GetDeviceData(){
        this.$post({
          url:this.$bus.gateWayList.appservice+"app/getAllApp",
          data:{
            accessToken:this.$bus.accessToken,
            flag:2,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            appName:"",
            appClassify:this.current.classifyId,              //  应用分类
            deptPathlevel1Code:"",                            //..省级地区单位编码
            deptPathlevel2Code:this.current.regionCode,       //..市级地区单位编码
            deployNet:this.current.netTag                     //..网络类型
          },
          success(data,code){
            this.deviceArr = data.result;
            this.appListData.total = data.total;

          }
        })
      },
      handlePage(page){
        this.pageNum = page;
      },
      handlePageSize(size){
        this.pageSize = size;

      }
    }
  }
</script>

<style scoped>
  .select-box {
    display: flex;
    margin: 20px 0px 0px 0px;
  }
  #main{
    padding: 0 20px;
  }
  #main .header{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 0.5px solid #979797;
  }
  #main .header p{
    font-size:16px;
    color: #0D0D23;
  }
  #main .header p::before{
    content:"";
    width:3px;
    height: 18px;
    background: #00C5E2;
    display: inline-block;
    vertical-align: middle;
    margin-right:8px;
  }
  #main .tableCon{
    padding-top: 20px;
    margin-bottom: 20px;
  }

  #main .pageInit{
    width: 100%;
    margin-top: 20px;
    text-align: right;
  }
</style>
