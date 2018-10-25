<template>
    <div class="mainContent">
        <div class="searchTxt">
            <Input suffix="ios-search" placeholder="Enter text" style="width: 400px" />
        </div>
        <div class="downData">
            <div class="downLeft">
                <div class="userList">
                    <p>通讯录</p>
                </div>
                <Tree :data="userList" :render="renderChild" :load-data="loadData" ref="tree" class="addressList"></Tree>
            </div>
            <div class="downRight">
                <div class="personOverview">
                    <p>人员概览</p>
                </div>
                <div class="personDetail" v-if="isShowUserData == 1">
                    <div class="personDetail_top">
                        <div class="headerBox">
                            <img :src="currentUserPhoto?currentUserPhoto:'../../../static/img/tx.png'" alt="">
                        </div>
                        <ul>
                            <li class="per-name">
                                <span>{{currentUserInfo.userName}}</span>
                                <Icon type="ios-person-outline" />
                            </li>
                            <li>
                                <span>职务</span>：
                                <span>{{allPostion || "无"}}</span>
                            </li>
                            <li>
                                <span>机构名称</span>：
                                <span>{{currentUserInfo.deptName || "--"}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="personDetail_bottom">
                        <ul>
                            <li>
                                <span>用户类型</span>：
                                <span>{{currentUserInfo.userType || "--"}}</span>
                            </li>
                            <li>
                                <span>警种</span>：
                                <span>{{currentUserInfo.policeClassify || "--"}}</span>
                            </li>
                            <li>
                                <span>警号</span>：
                                <span>{{currentUserInfo.policeNumber || "--"}}</span>
                            </li>
                            <li>
                                <span>身份证号</span>：
                                <span>{{currentUserInfo.idcard || "--"}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>终端ID</span>：
                                <span>{{currentUserInfo.terminalId || "--"}}</span>
                            </li>
                            <li>
                                <span>终端IP</span>：
                                <span>{{currentUserInfo.terminalIp || "--"}}</span>
                            </li>
                            <li>
                                <span>地区</span>：
                                <span>{{currentUserInfo.regionName || "--"}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="getDetail"  v-if="showCheckLink">
                        <router-link :to="{path:'/user/userDetail/'+currentUserInfo.userId}">查看详情</router-link>
                        <Icon type="md-arrow-round-forward" />
                    </div>
                </div>
                <div v-if="isShowUserData == 2">
                    <p>暂无人员数据</p>
                </div>
                <div v-if="isShowUserData == 3">
                    <Spin size="large" class="loading">
                        <Icon type="ios-loading" size=20 class="demo-spin-icon-load"></Icon>
                        <div style="margin-top:10px;">人员数据加载中...</div>                       
                    </Spin>
                    
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    name:"userList",
    data(){
       return{
            userList: [],                           //  通讯录树结构
            selectedId:"",                          //  判断是否选中树节点
            currentUserPhoto:"",                    //  获取通讯录人员头像
            currentUserInfo:{},                     //  当前点击人员信息展示
            showCheckLink:false,                    //  是否显示查看详情按钮
            isShowUserData:2,                    //  判断是否显示个人信息,1显示个人信息，2显示暂无数据，3显示加载中
            allPostion:"",                      //  全量职务名称
       }
    } ,
    methods:{
        renderChild(h, ctx){
            
            var root=ctx.root
            var node=ctx.node
            var data=ctx.data

            var nodeKey =node.node.userCode;
            
            if(!!node.children){
                return h('span',{
                    style:{
                        cursor:"pointer",
                    }
                },data.title);
            }else{
                return h('span',{
                    style:{
                        cursor:"pointer",
                        color:this.selectedId === nodeKey?'#2d8cf0':''
                    },
                    on:{
                        click:() => {

                            this.selectedId =nodeKey; 
                        
                            this.allPostion = this.$bus.personPosition = node.node.currentJob;  //  用户职务，从通讯录获取，其他信息从统一用户获取

                            if(!!node.node.userId){

                                this.getUserInfo(node);             //  获取单个人员信息的请求

                            }else{
                                return
                            }


                        }
                    }
                },[
                    h('span',{
                        style:{
                            width:"50px",
                            display:"inline-block",
                            marginRight:"15px"
                        }
                    },data.title),
                    h('span',data.position)
                ]);
            }
        },
        loadData (item, callback) {

            let id = item.orgId;

            this.$post({

                baseUrl:this.$bus.addressListBaseUrl,
                url:"/userservice/user/getOrgUserByOrgId",
                data:{
                    "isValidate": false,
                    "id": id
                },
                success(data,code){
                    let orgList = data.orgList;
                    let userList = data.userList;
                    let arr = [];

                    if(!!userList){

                        userList.forEach(element => {

                            let eleObj = {};

                            eleObj.avatarUrl = element.jmtAvatarUrl;                 // 头像
                            eleObj.currentJob = element.currentJob;                  // 职务
                            eleObj.title = element.userName;                         // 名字
                            eleObj.job = element.job;                                // 用户类型
                            eleObj.userCode = element.userCode;                      // 警号
                            eleObj.position = element.position;                      // 市局职务
                            eleObj.userId = element.userId;                          //  uuid
                            eleObj.departmentId = element.departmentId;              //  uuid
                            arr.push(eleObj);

                        });
                    }

                    if(!!orgList){

                        orgList.forEach(element => {

                            let eleObj = {};

                            eleObj.title = element.name;
                            eleObj.orgId = element.id;
                            eleObj.description = element.description;
                            eleObj.nodeKey = element.nodeKey;
                            eleObj.isLeaf = element.isLeaf;
                            eleObj.loading = false;
                            eleObj.expand = false;
                            if(element.isLeaf == 0 || element.isLeaf == 1){
                                eleObj.children = [];
                            }
                            arr.push(eleObj);
                        });
                    }

                    if(userList.length == 0 && orgList.length == 0 ){
                        arr.push({
                            title:"暂无数据",
                        });
                    }


                    if(arr.length >0){  // 递归，将新获取的数据放入父children数组中
                        
                        this.$bus.addressListData.forEach((element,index) => {
                            
                            if(element.orgId === id){

                                element.children = arr;

                                return;

                            }

                        })
                    }                    

                    callback(arr);

                },
                error(err){
                    console.log(err);
                    alert("网络报错了!!");
                }
            })
        },
        getAllUser(){
            
            let _this = this;

            this.$post({
                baseUrl:this.$bus.addressListBaseUrl,
                url:"/userservice/user/getOrgUserByOrgId",
                data:{
                    "isValidate": false,
                    "id": 1
                },
                success(data,code){

                    let orgList = data.orgList;
                    let userList = data.userList;

                    if(!!userList){

                        userList.forEach(element => {

                            let eleObj = {};

                            eleObj.avatarUrl = element.jmtAvatarUrl;        // 头像
                            eleObj.currentJob = element.currentJob;         // 职务
                            eleObj.title = element.userName;                // 名字
                            eleObj.job = element.job;                       // 用户类型
                            eleObj.userCode = element.userCode;             // 警号
                            eleObj.position = element.position;             // 市局职务
                            eleObj.userId = element.userId;                 //  uuid
                            eleObj.departmentId = element.departmentId;                 //  uuid
                            
                            _this.userList.push(eleObj);

                        });                       
                    }


                    if(!!orgList){
                        orgList.forEach(element => {

                            let eleObj = {};

                            eleObj.title = element.name;
                            eleObj.orgId = element.id;
                            eleObj.description = element.description;
                            eleObj.nodeKey = element.nodeKey;
                            eleObj.isLeaf = element.isLeaf;
                            eleObj.loading = false;
                            eleObj.expand = false;
                            if(element.isLeaf == 0){
                                eleObj.children = [];
                            }
                            _this.userList.push(eleObj);
                        });
                    }

                    if(_this.userList.length >0){   // 如果数据有存在，就不再去请求
                        this.$bus.addressListData = _this.userList;
                    }
                        
                },
                error(err){
                    console.log(err);
                    alert("网络报错了!!");
                }
            })         
        },
        getUserInfo(node){

            this.isShowUserData = 3; 
            
            let currentUserId = node.node.userId;       // 处理UUID数据格式

            this.$post({
                url:this.$bus.gateWayList.mcplatform +"/mcplat/userVisitDetails",
                data:{
                    "userId": currentUserId
                },
                success(data,code){
                    
                    this.isShowUserData = 1;                 //  显示个人详情

                    this.$bus.currentUserData = data;       //  将个人详情数据存在bus文件中

                    this.currentUserInfo = data;            //  将个人详情数据在当前页面展示

                    this.currentUserPhoto = this.$bus.currentHeadPic = node.node.avatarUrl;     //  用户头像展示以及存在bus文件中

                    this.showCheckLink = true;      //  显示查看详情按钮
                    
                },
                error(err){

                    this.isShowUserData = 2;
                    alert("通讯错误!!----");

                }
            })         
        }

    },
    computed:{

    },
    mounted(){

        if(this.$bus.addressListData.length > 0){
            this.userList = this.$bus.addressListData;
        }else{
            this.getAllUser();
        }

    }
}
</script>
<style scoped>
    .mainContent .header{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 0.5px solid #979797;
    }
    .mainContent .header p{
        font-size:16px;
        color: #0D0D23;
    }
    .mainContent .header p::before{
        content:"";
        width:3px;
        height: 18px;
        background: #00C5E2;
        display: inline-block;
        vertical-align: middle;
        margin-right:8px;
    }

    .searchTxt{
        padding:20px 0;
        text-align: left;
    }

    .downData{
        display: flex;
        width: 100%;
        height: 100%;
    }
    .downLeft,.downRight{
        flex: 1;
        height: 100%;
    }
    .downLeft{
        text-align: left;
        margin-right: 30px;
    }

    .downLeft .userList,.downRight .personOverview{
        font-size: 16px;
        border-bottom: 0.5px solid #979797;
        line-height: 30px;
        margin-bottom:15px;
    }
    .downLeft .userList{
        width: 100%;
        display: inline-block;
    }
    .addressList{
        height: 600px;
        overflow-y:scroll;
    }
    .downRight .personOverview{
        text-align: left;
    }

    .personDetail_top{
        display: flex;
    }
    .personDetail_top .headerBox{
        width: 130px;
        height: 130px;
    }
    .personDetail_top img{
        height: 100%;
    }
    .personDetail_top ul{
        margin-left:30px;
    }
    .personDetail_top ul .per-name{
        font-size: 20px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }
    .personDetail_top ul .per-name span:nth-of-type(1){
        margin-right: 8px;
    }
    .personDetail_top li{
        display: flex;
        justify-content: flex-start;
    }
    .personDetail_top li:nth-of-type(2) span:nth-of-type(1),
    .personDetail_top li:nth-of-type(3) span:nth-of-type(1){
        width: 50px;
        text-align:justify;
        text-justify:distribute-all-lines;/*ie6-8*/
        text-align-last:justify;/* ie9*/
        -moz-text-align-last:justify;/*ff*/
        -webkit-text-align-last:justify;/*chrome 20+*/
    }
    .personDetail_top li:nth-of-type(2) span:nth-of-type(2),
    .personDetail_top li:nth-of-type(3) span:nth-of-type(2){
        flex: 10;
        text-align: left;
    }

    .personDetail_bottom{
        display: flex;
        margin-top: 15px;
    }
    .personDetail_bottom ul:nth-of-type(1){
        flex: 1;
        margin-right: 30px
    }
    .personDetail_bottom ul:nth-of-type(2){
        flex: 2;
    }
    .personDetail_bottom ul li{
        display: flex;
        line-height: 20px;
    }
    .personDetail_bottom ul li span{
        width:80px;
        text-align: left;
    }
    .personDetail_bottom ul li span:nth-of-type(1){
        text-align:justify;
        text-justify:distribute-all-lines;/*ie6-8*/
        text-align-last:justify;/* ie9*/
        -moz-text-align-last:justify;/*ff*/
        -webkit-text-align-last:justify;/*chrome 20+*/
    }
    .getDetail{
        width: 100%;
        text-align: left;
        margin-top: 20px;
        color:#2d8cf0;
    }

    .loading{
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>

