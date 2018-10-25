<script>
import axios from 'axios'
export default {
    data(){
        return{
            searchData:["一标三实","云知道","云搜"],
            current:{
                origion:"",
                regionCode:"",      //..当前选中的市级地区编码
                netType:"",
                netTag:"",          //..当前选中的网络编码
                appType:"",
                classifyId:"",      //..当前选中的分类id
                timeRange:"",
                timeRangeNum:0,     //  当前选择查看的时间段
                tabName:"appList"          //  当前tab页面标识
            },
            appRankdata:{
                total:0,
                pageNum:1,
                isRankLoading:false
            },
            appTypeObj:{},  //  用于应用列表展示分类 
            appListData:{   //  应用列表
                loadingAppList:false,
                total:0,
                pageNum:1
            },
            regionArr:[],
            netArr:[
                {
                    name:"不限",
                    tag:""
                },{
                    name:"一类网",
                    tag:1
                },{
                    name:"二类网",
                    tag:2
                },{
                    name:"三类网",
                    tag:3
                }
            ],
            appTypeArr:[],
            timeRangeData:[
                {
                    name:"今天",
                    time:0
                },{
                    name:"一周",
                    time:7
                },{
                    name:"一月",
                    time:30
                },{
                    name:"半年",
                    time:183
                },{
                    name:"一年",
                    time:366
                }
            ],
            sortord:[
                {
                    name:"升序",
                    val:1
                },{
                    name:"降序",
                    val:2
                }
            ],
            appList:[],
            showRegionMore:false,
            showTypeMore:false,
            isRegionActive:false,
            appRankTitle: [
                {
                    title: '排名',
                    key: 'id',
                    width:60,
                },
                {
                    title: '应用名称',
                    key: 'appName',
                },
                {
                    title: '评分',
                    key: 'score',
                    width:60
                },
                {
                    title: '开发厂商',
                    key: 'supplier',
                    tooltip:true
                },
                {
                    title: '版本号',
                    key: 'version',
                },
                {
                    title: '应用更新时间',
                    key: 'lastUpdateTime'
                }
            ],
            appRankTable: [],
            tabShow:{
                showAppList:true,
                showAppRank:false
            },
            pageStartLoading:true      //  首次加载进页面的loading展示
        }
    },
    methods:{
        getMoreRegionData(){
           this.showRegionMore=!this.showRegionMore
        },
        getMoreTypeData(){
           this.showTypeMore=!this.showTypeMore
        },
        changeTab(name){
            // 切换内容显示
            this.tabName = name;

            if(this.tabName == "appRank"){
                this.getAppRank();
            }else{
                this.getAppList();
            }

        },
        getAppDetails(){
            this.$router.push({name:"应用详情"});
        },
        getAppRank(){   //  获取应用排名

            this.appRankdata.isRankLoading = true;


            console.log(11111111,this.$post({
                url:this.$bus.gateWayList.mcplatform +"/mcplat/appRanking",
                data:{
                    "pageNo": this.appRankdata.pageNum,
                    "pageSize": 10,
                    "rangeDay": this.current.timeRangeNum,
                    "areaNo": this.current.regionCode,
                    "networkType": this.current.netTag,
                    "appType": this.current.classifyId
                },
                success:(data,code)=>{

                    this.appRankdata.isRankLoading = false;
                    this.appRankTable = data.datas;
                    this.appRankdata.total = data.rowCount;

                }

            })

            )

            
            
        },
        getAppList(){   //  获取应用列表

            this.appListData.loadingAppList = true;

            this.$post({
                url:this.$bus.gateWayList.appservice+"app/getAllApp",
                data:{
                    accessToken:this.$bus.accessToken,
                    flag:2,
                    pageNum:this.appListData.pageNum,
                    pageSize:10,
                    appName:"",
                    appClassify:this.current.classifyId,              //  应用分类
                    deptPathlevel1Code:"",                            //..省级地区单位编码
                    deptPathlevel2Code:this.current.regionCode,       //..市级地区单位编码
                    deployNet:this.current.netTag                     //..网络类型
                },
                success(data,code){
                    this.appListData.loadingAppList = false;
                    this.appList = data.result;
                    this.appListData.total = data.total;

                }
            })     

        },
        getAppType(){   //  获取应用分类
            
            let appTypeBus = this.$bus.appManage.classifyTypeCatch;

            if(appTypeBus.length>0){   // 判断数据是否缓存在js

                 this.appTypeArr = appTypeBus;
                 return;
            }

            return this.$post({
                url:this.$bus.gateWayList.mcplatform + "/mcplat/appTypeList",
                data:{
                    "accessToken": this.$bus.accessToken
                },
                success(data,code){
                    
                    this.appTypeArr = data.list;

                    this.appTypeArr.unshift({
                        classifyName:"不限",
                        classifyId:""
                    });

                    this.appTypeArr.forEach(element => {
                        this.$bus.appManage.classifyTypeCatch.push(element);
                        this.$bus.appManage.appClassifyObj[element.classifyId] = element.classifyName;
                    });

                    this.current.appType = this.appTypeArr[0].classifyId;

                    this.getAppList();  //  获取到分类之后，再获取应用

                }
            })

        },
        getRegion(){    //  获取地市信息

            let regionBus = this.$bus.appManage.regionListCatch;

            if(regionBus.length>0){   // 判断数据是否缓存在js
                this.regionArr = regionBus;
                return;
            }

            return this.$post({
                url:this.$bus.gateWayList.mcplatform +"/mcplat/getAreaInfo",
                data:{
                    "regionCode": this.$bus.regionCode
                },
                success(data,code){
                    
                    this.regionArr = data;

                    this.regionArr.unshift({    //  添加不限的选项
                        regionName:"不限",
                        regionCode:""
                    });

                    this.regionArr.forEach( element =>{

                        this.$bus.appManage.regionListCatch.push(element);

                    });  //  将数据缓存在本地

                    this.current.origion = this.regionArr[0].regionCode;
                }
            })
        },
        changeRankPage(value){  //  应用排名分页

            this.appRankdata.pageNum = value;
            this.getAppRank();

        },
        changeAppListPage(value){
            this.appListData.pageNum = value;
            this.getAppList();
        },
        clickCurrentRegion(region){         //  选中当前的地市
            this.current.origion=region.regionCode;
            this.current.regionCode = region.regionCode;
            this.appListData.pageNum = 1;   //  每次筛选应用的时候，页码要先变成1
            this.appRankdata.pageNum = 1;   //  每次筛选排名的时候，页码要先变成1
            this.$refs['appListPages'].currentPage = 1;     //  重置分页显示
            this.$refs['appRankPages'].currentPage = 1;     //  重置分页显示

            if(this.tabName == "appRank"){
                this.getAppRank();
            }else{
                this.getAppList();
            }
        },
        clickCurrentClassify(appType){      //  选中当前的分类

            this.current.appType = appType.classifyId
            this.current.classifyId = appType.classifyId;
            this.appListData.pageNum = 1;   //  每次筛选应用的时候，页码要先变成1
            this.appRankdata.pageNum = 1;   //  每次筛选排名的时候，页码要先变成1
            this.$refs['appListPages'].currentPage = 1;     //  重置分页显示
            this.$refs['appRankPages'].currentPage = 1;     //  重置分页显示

            if(this.tabName == "appRank"){
                this.getAppRank();
            }else{
                this.getAppList();
            }

        },
        clickCurrentNet(net){               //  选中当前网络类型
            this.current.netType = net.tag;
            this.current.netTag = net.tag;
            this.appListData.pageNum = 1;   //  每次筛选应用的时候，页码要先变成1
            this.appRankdata.pageNum = 1;   //  每次筛选排名的时候，页码要先变成1
            this.$refs['appListPages'].currentPage = 1;     //  重置分页显示
            this.$refs['appRankPages'].currentPage = 1;     //  重置分页显示

            if(this.tabName == "appRank"){
                this.getAppRank();
            }else{
                this.getAppList();
            }
        },
        clickCurrentTime(value){                 //  选中当前的查看时间段

            this.current.timeRangeNum = value;
            this.appRankdata.pageNum = 1;   //  每次筛选排名的时候，页码要先变成1
            this.$refs['appRankPages'].currentPage = 1;     //  重置分页显示

            this.getAppRank();
        }
    },
    mounted(){

        if(this.$bus.appManage.isRouterChange){    //  路由改变之后要重新请求一下列表
            this.getAppList();
        }


        this.$bus.appManage.isRouterChange = true;      //  为true时，路径变化，请求获取app列表
        this.current.netType = this.netArr[0].tag;

        //  应用分类和地区数据并发请求
        this.$allReq({
            reqs:[this.getAppType,this.getRegion],
            success(){

                this.pageStartLoading = false;

            }
        })

    },
    beforeDestroy(){




    }
}
</script>

<template>
    <div id="main" style="position: relative;">

        <Spin v-if="pageStartLoading" size="large" fix></Spin>

        <div class="searchBox">
            <Input suffix="ios-search" placeholder="输入应用名称搜索" style="width: 100%" />
            <div class="searchHistory">
                <p>搜索历史：</p>
                <ul>
                    <li v-for="searchTxt in searchData">{{searchTxt}}</li>
                </ul>
            </div>
        </div>
        <div class="screenCondition">
            <div class="appAffi">
                <p>应用出处：</p>
                <ul>
                    <li v-for="(region,index) in regionArr" v-show="index<10||showRegionMore" 
                        :class="{ isActive: current.origion==region.regionCode }" 
                        @click="clickCurrentRegion(region)" :title="region.regionName">{{region.regionName}}</li>
                </ul>
                <p class="getMore" @click="getMoreRegionData()" v-if="this.regionArr.length>10 && !showRegionMore">更多<Icon type="ios-arrow-down" /></p>
                <p class="getMore" @click="getMoreRegionData()" v-if="this.regionArr.length>10 && showRegionMore">收起<Icon type="ios-arrow-up" /></p>
            </div>
            <div class="appAffi">
                <p>部署网络：</p>
                <ul>
                    <li v-for="(net,index) in netArr" :class="{isActive:current.netType == net.tag}"
                    @click="clickCurrentNet(net)"
                    >{{net.name}}</li>
                </ul>
            </div>
            <div class="appAffi">
                <p>应用分类：</p>
                <ul>
                    <li v-for="(appType,index) in appTypeArr" v-show="index<10||showTypeMore" 
                    :class="{isActive:current.appType == appType.classifyId }"
                    @click="clickCurrentClassify(appType)" :title="appType.classifyName">{{appType.classifyName}}</li>
                </ul>
                <p class="getMore" @click="getMoreTypeData()"  v-if="this.appTypeArr.length>10 && !showTypeMore" >展开<Icon type="ios-arrow-down" /></p>
                <p class="getMore" @click="getMoreTypeData()"  v-if="this.appTypeArr.length>10 && showTypeMore" >收起<Icon type="ios-arrow-up" /></p>
            </div>
            <div class="appAffi" v-if="tabShow.showTimeRange">
                <p>时间范围：</p>
                <ul>
                    <li v-for="(timeRangeItem,index) in timeRangeData" v-show="index<6||showTypeMore" 
                    :class="{isActive:current.timeRange == timeRangeItem.time }"
                    @click="clickCurrentTime(timeRangeItem)">{{timeRangeItem.name}}</li>
                </ul>
            </div>
        </div>
        <Tabs value="appList" @on-click="changeTab" style="position: relative;">
            <Spin fix size="large" v-if="appListData.loadingAppList"></Spin>
            <TabPane label="应用列表" name="appList">
                <ul class="appListBox"  v-if="tabShow.showAppList">
                    <li v-for="item in appList" @click="getAppDetails">
                        <img :src="item.appIcon" alt="">
                        <p>{{item.appName}}</p>
                        <p>{{ $bus.appManage.appClassifyObj[item.appClassify]}}</p>
                        <img src="../../assets/app/绿色已发布.png" alt="" class="stateImg">
                    </li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                    <li class="zeroBox"></li>
                </ul>
                <Page ref="appListPages" :total="appListData.total" :page-size="10" show-total class="appListPage" @on-change="changeAppListPage"/>
            </TabPane>
            <TabPane label="活跃度排名" name="appRank">
                <div class="rankCondition">
                    <Select size="small" class="c_01" placement="bottom-start" placeholder="时间范围" @on-change="clickCurrentTime">
                        <Option v-for="item in timeRangeData" :value="item.time" :key="item.time">{{ item.name }}</Option>
                    </Select>
                    <Select size="small" class="c_01" placement="bottom-start" placeholder="排序方式">
                        <Option v-for="item in sortord" :value="item.val" :key="item.val">{{ item.name }}</Option>
                    </Select>
                    <Button type="primary" icon="md-arrow-round-down" size="small">导出</Button>
                </div>
                <Table :columns="appRankTitle" :data="appRankTable" :loading="appRankdata.isRankLoading"></Table>
                <Page ref="appRankPages" :total="appRankdata.total" :page-size="10" show-total class="pageBreak" @on-change="changeRankPage"/>
            </TabPane>
        </Tabs>
    </div>
</template>
<style scoped>
#main{
    padding: 0;
}
.searchBox{
    width: 400px;
    padding:20px 0;
}
.searchHistory{
    display: flex;
    margin-top:8px;
}
.searchHistory ul{
    display: flex;
}
.searchHistory ul li{
    margin-right:15px;
    color: #999;
}

.screenCondition{
    width:100%;
}
.screenCondition .appAffi{
    display: flex;
    line-height: 26px;
    margin-bottom:15px;
}
.screenCondition .appAffi ul{
    display: flex;
    flex-wrap: wrap;
    width: 900px;
}
.screenCondition .appAffi ul li{
    width: 90px;
    height:26px;
    line-height: 26px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.screenCondition .appAffi ul li:nth-last-of-type(1){
    margin-right:15px;
}
.isActive{
    background-color: #00C5E2;
    color: #fff;
    border-radius: 3px;
}

.screenCondition .appAffi .getMore{
    cursor: pointer;
}
.appListBox{
    padding:5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
.appListBox li{
    width: 180px;
    height: 180px;
    box-shadow: 0 0 8px #e1e1e1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;
    cursor: pointer;

    position: relative;
}

.appListBox:after {
  content: "";
  width: 376px;
}
.appListBox li img{
    width: 60px;
    height: 60px;
}
.appListBox li .stateImg{
    position: absolute;
    top: 0;
    right: 0;
}
.appListBox li p:nth-of-type(1){
    font-size: 16px;
}
.appListBox li p:nth-of-type(2){
    font-size: 14px;
    color: #979797;
}
.appListBox li:hover{
    box-shadow: 0 0 8px #00C5E2;
}

.pageBreak{
    margin: 15px 0 20px 0;
}
.zeroBox{
    height:0 !important;
    border: none;
    font-size: 0;
}

.appListPage{
    margin-bottom:20px;
}
.rankCondition{
    margin-bottom: 20px;
    display: flex;
}
.c_01{
    width: 100px;
    margin-right:20px;
}
</style>

