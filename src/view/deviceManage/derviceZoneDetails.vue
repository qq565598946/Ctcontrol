<template>
  <div class="derviceZoneDetails">
    <div class="topbox">
      <Breadcrumb>
        <BreadcrumbItem to="/deviceZone">设备分区</BreadcrumbItem>
        <BreadcrumbItem to="">设备详情</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="header-box">
      <h1>阿里云一号</h1>
      <span>兰州市</span>
      <span>2018-10-23 15:55</span>
    </div>
    <!--设备信息Start-->
    <div class="dervice-info">
      <p>设备信息</p>
      <div class="dervice-info-con">
        <div><span>设备编号 : </span>00354</div>
        <div><span>边界厂商映射状态 : </span>监控中</div>
        <div><span>设备厂商 : </span>阿里云计算机有限公司</div>
        <div><span>设备类型 : </span>linux服务器</div>
        <div><span>设备IP地址 : </span>192.168.0.1</div>
        <div><span>开发厂商 : </span>深圳市星火电子工程公司</div>
        <div><span>设备状态 : </span>运行中</div>
        <div><span>MAC地址 : </span>00354</div>
      </div>
    </div>
    <!--协议信息Start-->
    <div class="dervice-info">
      <p>协议信息</p>
      <div class="dervice-info-con" style="width: 736px">
        <div><span>SNMP版本 : </span>00354</div>
        <div><span>SNMP读口令 : </span>46548</div>
        <div><span>SNMP端口 : </span>8050</div>
        <div><span>SNMP写口令 : </span>1111</div>
      </div>
    </div>
    <!--运行状态Start-->
    <div class="dervice-info">
      <p>运行状态</p>
      <div class="dervice-state">
        <Table border :columns="columns5" :data="data5"></Table>
      </div>
    </div>
    <!--运行状态end-->
  </div>
</template>

<script>
  export default {
    name: "derviceZoneDetails",
    data() {
      return {
        derviceArr:{
            derviceinfo:[],
            agreementinfo:[],
            derviceID:''
        },
        columns5: [
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
          }
        ],
        data5: [
          {
            date2: '10%',
            date3: '30%',
            date4: '40%',
            date5: '正常',
            date6: '99%',
            date7: '50%',
            date8: '99%',
            date9: '50%',
            date10: '稳定',
          },
        ]
      }
    },mounted:function () {
      this.getDerviceDes();
      this.derviceID = this.$route.query.id
    },
    methods:{
          getDerviceDes(){
            this.$get({
              url:this.$bus.gateWayList.appservice+"",
              data: "",
              cache:this.cache,
              success(data){
                this.derviceArr.derviceinfo = data;
              }
            });
          }
    }
  }
</script>

<style scoped>
  .topbox{
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }
  .header-box {
    text-align: left;
    padding: 20px 20px;
  }

  .header-box h1 {
    display: inline-block;
    padding-right: 15px;
  }

  .header-box span:last-child {
    padding-left: 10px;
    color: #a9a8a8;
  }

  .dervice-info p {
    text-align: left;
    font-size: 15px;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    height: 32px;
    width: 870px;
  }

  .dervice-info-con {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 790px;
    margin-left: 20px;
  }

  .dervice-info-con div {
    width: 250px;
    text-align: left;
    padding-top: 15px;
  }

  .dervice-info {
    margin-bottom: 45px;
  }

  .dervice-state {
    width: 870px;
    margin-left: 20px;
  }
  .dervice-info-con span {
    color: #6f6f6f;
  }

</style>
