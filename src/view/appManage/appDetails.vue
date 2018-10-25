<script>
export default {
    // name:"应用详情",
    data(){
        return{
            appInfo:{
                src:"",
                appName:"掌上执法",
                appVersion:"v1.0",
                developCompany:"深圳市星火电子工程公司",
                appType:"辅助办公",
                netType:"二类网",
                appState:"已上线",
                allDownLoad:"123456",
                allClick:"1234565",
                allOnline:"1234565"
            },
            columns1: [
                {
                    title: '姓名',
                    key: 'visitorName',
                    align:"center"
                },
                {
                    title: '职务',
                    key: 'job',
                    align:"center"
                },
                {
                    title: '用户类型',
                    key: 'userType',
                    align:"center"
                },
                {
                    title: '警种',
                    key: 'policeType',
                    align:"center"
                },
                {
                    title: '机构',
                    key: 'organization',
                    align:"center"
                },
                {
                    title: '地区',
                    key: 'region',
                    align:"center"
                },
                {
                    title: '访问时间',
                    key: 'visitTime',
                    align:"center"
                }
            ],
            data1: [
                {
                    visitorName: '张明明',
                    job: "支队队长",
                    userType: '民警',
                    policeType: '刑警',
                    organization:"治安管理支队",
                    region:"兰州",
                    visitTime:"2018-09-11"
                }
            ]
        }
    },
    methods:{

    }
}
</script>
<template>
    <div class="main">
        <div class="detailInfo">
            <div class="imgBox">
                <img src="../../assets/app/掌上执法.png" alt="">
            </div>
            <div class="appInfo">
                <ul class="info_01">
                    <li>{{appInfo.appName}}</li>
                    <li>{{appInfo.appVersion}}</li>
                    <li>{{appInfo.developCompany}}</li>
                </ul>
                <div class="info_02">
                    <div class="appMark">
                        <p>应用标识：</p>
                        <p>{{appInfo.appType}}</p>
                        <p>{{appInfo.netType}}</p>
                    </div>
                    <div class="appState">
                        <p>应用状态：</p>
                        <p>{{appInfo.appState}}</p>
                    </div>
                </div>
                <ul class="info_03">
                    <li>总下载次数：{{appInfo.allDownLoad}}</li>
                    <li>总点击次数：{{appInfo.allClick}}</li>
                    <li>目前在线人数：{{appInfo.allOnline}}</li>                    
                </ul>
            </div>
        </div>
        <div class="visitorTotal">
            <p class="tabName">
                <span>访问人数</span>
            </p>
            <Table :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>
<style scoped>
    .detailInfo{
        width: 100%;   
        padding-top: 10px; 
        display: flex;
        margin-bottom: 20px;
    }
    .detailInfo img{
        width:100px;
    }
    .detailInfo .imgBox{
        width: 105px;
        height:105px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eee;
        margin-right: 20px;
    }

    .detailInfo .info_01{
        display: flex;
        align-items: flex-end;
        margin-bottom: 10px;
    }
    .detailInfo .info_01 li{
        margin-right:10px;
    }
    .detailInfo .info_01 li:nth-of-type(1){
        font-size: 16px;
    }
    .detailInfo .info_01 li:nth-of-type(2),.detailInfo .info_01 li:nth-of-type(3){
        color:#979797;
    }
    .detailInfo .info_02{
        margin-bottom:10px;
    }
    .detailInfo .info_02 .appMark,
    .detailInfo .info_02 .appState{
        display: flex;
        line-height: 20px;
    }
    .detailInfo .info_02 .appMark p:nth-of-type(2){
        margin-right:10px;
    }
    .detailInfo .info_03{
        display: flex;
    }
    .detailInfo .info_03 li{
        margin-right: 30px;
        line-height: 20px;
    }


    .tabName{
        width:100%;
        height: 30px;
        border-bottom: 0.5px solid #979797;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom:20px;
    }
    .tabName span{
        height: 100%;
        display: block;
        line-height: 30px;
        border-bottom: 1px solid #00C5E2;
        color: #00C5E2;
        padding:0 5px;
    }
</style>

