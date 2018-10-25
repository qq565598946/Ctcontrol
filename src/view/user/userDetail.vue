<script>
export default {
    name:"userDetail",
    data(){
        return{
            selfPic:"http://www.ruanyifeng.com/images_pub/pub_335.jpg",
            tableTitle: [
                {
                    title: '应用名称',
                    key: 'appName',
                    align:"center"
                },
                {
                    title: '访问时间',
                    key: 'visitTime',
                    align:"center"
                },
                {
                    title: '访问时长',
                    key: 'visitDuration',
                    align:"center"
                },
                {
                    title: '应用版本号',
                    key: 'version',
                    align:"center"
                },
                {
                    title: '应用更新时间',
                    key: 'lastUpdateTime',
                    align:"center"
                }
            ],
            appTableData:[],          //  访问详情
            dataList:[{
                key:"IMEI码",
                value:"65239159412"
            },{
                key:"SESSIONID",
                value:"845632118932713762568415f2E2VE"
            },{
                key:"请求ID",
                value:"c65992er2545er"
            },{
                key:"检查站编号",
                value:"36641212695259552"
            },{
                key:"用户ID",
                value:"51135561335578921"
            }],
            currentUserInfo:{},
            userTypeObj:{
                1:"民警账号",
                2:"雇员账号",
                3:"辅警帐号",
                4:"公司帐号",
                5:"测试帐号",
                6:"单位帐号",
                0:"其他"
            },
            headPic:"",              //..用户头像
            userPostion:""          //..用户职务

        }
    },
    methods:{
        getName(name){
            alert(name);
        },
        getAppDetail(row,index){
            this.$router.push({path:"/user/appLogsDetail"});
        },
        getUserData(){

            let currentUserId = this.$route.params.id;

            this.$post({
                url:this.$bus.gateWayList.mcplatform +"/mcplat/userVisitDetails",
                data:{
                    "userId": currentUserId
                },
                success(data,code){

                    this.currentUserInfo = data;            //  将个人详情数据在当前页面展示

                },
                error(err){

                    this.isShowUserData = 2;
                    alert("通讯错误!!----");

                }
            }) 


        }
    },
    mounted(){

        this.getUserData();

    }
}
</script>

<template>
    <div class="userDetail">
        <div class="person_info">
            <div class="person_info_selfInfo">
                <div class="headersPicBox">
                    <img :src="'data:image/png;base64,'+currentUserInfo.base64Img" alt="">
                </div>
                <ul>
                    <li class="line_01">
                        {{currentUserInfo.userName}}
                        <Icon type="ios-person-outline" class="iconStyle"/>
                    </li>
                    <li class="line_02">
                        <p>
                            <span>职务：</span>
                            <span>{{userPostion || "--"}}</span>
                        </p>
                        <p>
                            <span>机构名称：</span>
                            <span>{{currentUserInfo.deptName || "--"}}</span>
                        </p>
                    </li>
                    <li class="line_03">
                        <ul>
                            <li>
                                <div class="item">
                                    <div>用户类型</div>：
                                    <div>{{userTypeObj[currentUserInfo.userType] || "--"}}</div>                                    
                                </div>   
                                <div class="item">
                                    <div>地区</div>：
                                    <div>{{currentUserInfo.regionName || "--"}}</div> 
                                </div>                             
                            </li>
                            <li>
                                <div class="item">
                                    <div>警号</div>：
                                    <div>{{currentUserInfo.policeNumber || "--"}}</div>
                                </div>
                                <div class="item">
                                    <div>警种</div>：
                                    <div>{{currentUserInfo.policeClassify || "--"}}</div>                                      
                                </div>
                            </li>  
                            <li>
                                <div class="item">
                                    <div>终端ID</div>：
                                    <div>{{currentUserInfo.terminalId || "--"}}</div>  
                                </div>
                                <div class="item">
                                    <div>终端IP</div>：
                                    <div>{{currentUserInfo.terminalIp || "--"}}</div>
                                </div>
                            </li>    
                            <li>
                                <div class="item">
                                    <div>身份证号</div>：
                                    <div>{{currentUserInfo.idcard || "--"}}</div>                                      
                                </div>
                            </li>                                                                             
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="person_info_table">
                <Tabs value="visitDetail" @on-click="getName">
                    <TabPane label="访问详情" name="visitDetail">
                        <Table :columns="tableTitle" :data="appTableData" @on-row-click="getAppDetail"></Table>
                    </TabPane>
                    <TabPane label="请求参数" name="getTags">
                        <ul class="getTags">
                            <li v-for="data in dataList">
                                <span>{{data.key}}</span>
                                <span>{{data.value}}</span>
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>                     
            </div>
        </div>
    </div>
</template>

<style scoped>
    .userDetail{
        width: 100%;
    }
    .breadNav{
        text-align: right;
        padding: 10px 0;
        font-size: 14px;
    }
    .person_info_selfInfo{
        display: flex;
        padding-top:15px;
        margin-bottom:25px;
    }
    .headersPicBox{
        width: 130px;
        height: 130px;
        margin-right: 20px;
    }
    .person_info_selfInfo img{
        height:100%;
        max-width: 100%;
        margin-right: 20px;
    }
    .line_01{
        display: flex;
        font-size: 16px;
        vertical-align: middle;
        align-items: center;
        margin-bottom: 10px;
    }

    .line_02{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom:10px;
    }
    .line_02 p:nth-of-type(1){
        margin-bottom:5px;
    }

    .line_03 ul{
        width: 800px;
        display: flex;
    }
    .line_03 ul li .item{
        display: flex;
        margin-right:20px;
        margin-bottom:10px;
    }
    .line_03 ul li .item div:nth-of-type(1){
        width: 50px;
        display: inline-block;
        text-align:justify;
        text-justify:distribute-all-lines;/*ie6-8*/
        text-align-last:justify;/* ie9*/
        -moz-text-align-last:justify;/*ff*/
        -webkit-text-align-last:justify;/*chrome 20+*/
    }

    .person_info_table{
        width:1000px;
    }
    .getTags{
        width: 600px;
        border: 1px solid #D8D8D8;
    }
    .getTags li{
        width: 600px;
        display: flex;
        border-bottom: 0.5px solid #D8D8D8;
    }
    .getTags li span{
        display: inline-block;
        width: 300px;
        height: 30px;
        line-height: 30px;
    }
    .getTags li span:nth-of-type(1){
        width: 100px;
        background-color: #f1f1f1;
        border-right: 1px solid #D8D8D8;
    }
    .getTags li span:nth-of-type(2){
        width: 500px;
    }
</style>

