

import Vue from 'vue'

Vue.prototype.$bus=new Vue({

    data(){
        return {
            addressListData:[],                 //  通讯录数据存储
            currentHeadPic:"",                  //..当前人员头像
            currentUserData:"",                 //..当前人员的详情信息存储
            personPosition:"",                  //  当前用户的全量职务,
            addressListBaseUrl:"http://172.28.0.56:9121",        // 通讯录服务访问地址
            accessToken:"a578139a657f49dda9cde8baa821be6c",      //..token
            regionCode:"620000",                                 //..省份编号
            appManage:{
                classifyTypeCatch:[],        //  分类缓存
                regionListCatch:[],          //  地区缓存
                appClassifyObj:{},            //  应用列表所需要转换的分类对象
                isRouterChange:false        //  为true时，路由改变，请求getAllApp接口
            },
            gateWayList:{   //  网关地址集合
                mcplatform:"xinghuo-apaas-mcplatform",      //..xt集中管控接口
                appservice:"xinghuo-apaas-appservice/appservice/",      //..ysh应用服务文档
            },
            serviceManage:{
              classifyTypeCatch:[],        //  分类缓存
              regionListCatch:[],        //  地区缓存
              networkCatch:[]        //  网络缓存
            },
            routerBread:[]

        }
    },

    methods:{

    }

})
