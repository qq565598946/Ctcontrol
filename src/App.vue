<template>
  <div id="app">
	<div class="topHead">
		<rowBar></rowBar>
	</div>
	<div class="body">
		<div class="navBox">
			<colmunBar ref="siderBar"></colmunBar>
		</div>
		<div class="mainCon">
			<router-view/>
		</div>
	</div>
  </div>
</template>

<script>
import rowBar from '@/components/rowbar'
import colmunBar from '@/components/navbar.vue'
import CircularJSON from 'circular-json'

export default {
	name: 'App',
	components:{
		colmunBar,
		rowBar
	},

	watch:{

		$route(router, oldrouter){

			var routerBread = this.$bus.routerBread;

			var routeMatchd = {
				name:router.matched[1].name,
				path:router.matched[1].path,
				meta:router.matched[1].meta
			}

			if(routerBread.length == 0){	//	刚刚进入页面



				var localData = JSON.parse(sessionStorage.getItem("routerBread")) || [];

				if(localData.length > 0){

					routerBread=this.$bus.routerBread = localData;

				}else{

					routerBread.push(routeMatchd);

				}


			}else if(!!routerBread.length && routerBread.indexOf(routeMatchd) > -1){		//	同父，且往回点击

					let a = routerBread.indexOf(routeMatchd);
					routerBread.splice(a+1,routerBread.length);

			}else if(!!routerBread.length && routerBread.indexOf(routeMatchd) < 0 && routeMatchd.meta.isIndex){	// 不同父菜单之间添砖

					routerBread.splice(0,routerBread.length);
					routerBread.push(routeMatchd);

			}else{	// 点击同父菜单的子菜单

				routerBread.push(routeMatchd);

			}
			
			sessionStorage.setItem("routerBread",JSON.stringify(routerBread));

			
		},
	}
}
</script>

<style>
*{
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#app .body{
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row;
}
#app .mainCon{
	width: 100%;
  flex: 1;
  overflow: auto;
}
</style>
