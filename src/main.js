import Vue from 'vue'
import App from './App'
import router from './router'

import '@/bus.js'
import axios from '@/axios.js'

// import '@/lib/less/reset.less'
// import '@/lib/less/common.less'

Vue.use(axios);

import 'iview/dist/styles/iview.css';
import { Spin, Button, Table, Icon, Page, Menu, Sider, Submenu, Layout, MenuGroup, MenuItem, Modal,DatePicker, Form, FormItem,Select,Option, Input,Tree,Breadcrumb, BreadcrumbItem,Tabs,TabPane} from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Icon', Icon);
Vue.component('Page', Page);
Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('MenuItem', MenuItem);
Vue.component('Modal', Modal);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Input', Input);
Vue.component('Tree', Tree);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('DatePicker', DatePicker);
Vue.component('Spin', Spin);
Vue.component('Layout', Layout);
Vue.component('Layout', Layout);
Vue.component('Sider', Sider);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
