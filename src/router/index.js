import Vue from 'vue'
import Router from 'vue-router'



// 人员
import User from '@/view/user/index'

Vue.use(Router)


export default new Router({
  mode:"history",
  routes: [
    {
		path: '/',
		name: '应用',

		component: resolve => require(["@/view/appManage/index"],resolve),
		redirect:"/appManage",
		meta:{
			level:1
		},
    },{
		path:"/user",
		name:"人员",
		redirect:"/user/userList",
		component:User,
		meta:{
			level:1
		},
		children:[
			{
				path:"userList",
				name:"人员列表",
				meta:{
					level:2
				},
				component: resolve => require(["@/view/user/user"],resolve),
			},
			{
				path:"userDetail/:id",
				name:"人员详情",
				meta:{
					level:3
				},
				component: resolve => require(['@/view/user/userDetail'],resolve),
				children:[]
			},
			{
				path:"appLogsDetail",
				name:"应用日志详情",
				meta:{
					level:4
				},
				component: resolve => require(['@/view/user/appDetail'],resolve)
			}
		]

    },{
		path:"/appManage",
		name:"应用",
		component: resolve => require(["@/view/appManage/index"],resolve),
		redirect:"/appManage/appList",
		meta:{
			level:1
		},
		children:[
		  {
			path:"appList",
			name:"应用列表",
			meta:{
				level:2
			},
			component:resolve => require(['@/view/appManage/appList'],resolve)
		},{
			path:"appDetails",
			name:"应用详情",
			meta:{
				level:3
			},
			component: resolve => require(['@/view/appManage/appDetails'],resolve)
		}]
	},{
		path: '/register',
		name: '注册',
		component: resolve => require(["@/view/register/index"],resolve),
		meta:{
			level:1
		},
    },{
      path: "/serviceManage",
      name: "服务管理",
      component: resolve => require(["@/view/serviceManage/index"],resolve)
    },{
      path: "/serviceDetail:id",
      name: "服务详情",
      component: resolve => require(["@/view/serviceManage/serviceDetail"],resolve)
    },{
      path: "/serviceDetail",
      name: "服务日志展示",
      component: resolve => require(["@/view/serviceManage/serviceLogDisplay"],resolve)
    },{
      path: "/serviceDetail",
      name: "日志详情",
      component: resolve => require(["@/view/serviceManage/serviceLogDetail"],resolve)
    },{
      path: "/deviceManage",
      name: "设备列表状态",
      component: resolve => require(["@/view/deviceManage/index"],resolve)
    }
		,{
      path: "/deviceZone",
      name: "设备分区",
      component: resolve => require(["@/view/deviceManage/deviceZone"],resolve)
    }
		,{
      path: "/derviceZoneDetails",
      name: "设备分区详情",
      component: resolve => require(["@/view/deviceManage/derviceZoneDetails"],resolve)
    }
	// 	,{
	// 	path:"/deviceZone",
	// 	name:"设备分区",
	// 	component: resolve => require(["@/view/deviceManage/deviceZone"],resolve),
	// 		redirect:"/deviceManage/deviceZone",
	// 	meta:{
	// 		level:1
	// 	},
	// 	children:[
	// 	  {
	// 		path:"derviceZoneDetails",
	// 		name:"设备详情",
	// 		meta:{
	// 			level:2
	// 		},
	// 		component:resolve => require(['@/view/deviceManage/derviceZoneDetails'],resolve)
	// 	}]
	// }
  ]
})
