import Vue from 'vue'
import 'muse-components/styles/base.less' // 加载基础的样式
import {tab,tabs} from 'muse-components/tabs'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from './components/Home.vue'
import App from './App.vue'


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.component(tab.name, tab);
Vue.component(tabs.name, tabs);


const routes = [
    {
        path:'/',
        component:Home
    }
];

const router=new VueRouter({
    routes
});
new Vue({
    el: '#app',
    template:'<App/>',
    router,
    components:{App}
}).$mount('#app');
