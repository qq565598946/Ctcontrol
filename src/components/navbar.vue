<template>
	<div id="main">
		<Menu :theme="theme3" active-name="1-3" class="menuStyle" width="200px">
			<Submenu name="1">
				<template slot="title">
					<Icon type="ios-cube" style="font-size:18px;"/>
					管理
				</template>
				<MenuItem name="1-1" to="/appManage">
					<Icon type="md-document" />
					应用管理
				</MenuItem>
				<MenuItem name="1-2" to="/user/userList">
					<Icon type="md-document" />
					人员管理
				</MenuItem>
          <MenuItem name="1-3" to="/serviceManage">
            <Icon type="md-document" />
            服务管理
          </MenuItem>
			</Submenu>
			<Submenu name="2">
				<template slot="title">
					<Icon type="ios-people" style="font-size:24px;"/>
					权限
				</template>
				<MenuItem name="2-1" to="/register">
					<Icon type="md-document" />
					团队注册
				</MenuItem>
			</Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-cube" style="font-size:18px;"/>
          设备
        </template>
        <MenuItem name="2-1" to="/deviceManage">
          <Icon type="md-document" />
          设备列表
        </MenuItem>
        <MenuItem name="2-2" to="/deviceZone">
          <Icon type="md-document" />
          设备分区
        </MenuItem>
      </Submenu>

		</Menu>
	</div>
</template>
<script>
export default {
	name:"navBar",
	data(){
		return{
			theme3: 'dark'
		}
	}
}
</script>
<style scoped>
#main{
	height: 100%;
}
.menuStyle{
	height: 100%;
}
.alignCenter{
	text-align: center;
	padding-left: 0;
	padding-right: 0;
}

.ivu-menu-submenu-title{
	background-color: none !important;
}
</style>

