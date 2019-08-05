import Vue from 'vue'
import vueRouter from 'vue-router'
import router from './router.js'
import vueResource from 'vue-resource'
// import {Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'
import home from './routers/home.vue'
// import './lib/bootstrap/bootstrap.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import moment from 'moment'
import axios from 'axios'
import vueAxios from 'vue-axios'
// 若要启用mint-ui的懒加载，必须全局导入mint-ui，且局部导入的语句必须注掉
import mintUi from 'mint-ui'
import Vuex from 'vuex'

Vue.prototype.$http = axios

Vue.use(vueRouter)
Vue.use(vueResource)
// Vue.use(Lazyload)
Vue.use(vueAxios,axios)
Vue.use(mintUi)
Vue.use(Vuex)

// 全局设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置 post 时表单数据格式的组织形式
Vue.http.options.emulateJSON = true

// 全局定义过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);


let car = JSON.parse(localStorage.getItem('car') || '[]')
let store = new Vuex.Store({
    state: {
        theUrl: {},
        car,
        goodsNum: []
    },
    mutations: {
        setUrl(state,data) {
            state.theUrl = data
        },
        addToCar(state, data) {
            //假设在购物车中没有找到对应的商品
            let flag = false
            state.car.some(item => {
                if (item.id == data.id) {
                    item.count += parseInt(data.count)
                    flag = true
                    return true
                }
            })
            //如果循环完毕得到的flag还是false，则把商品数据直接push到购物车中
            if (!flag) {
                state.car.push(data)
            }
            //当更新car之后，把car数组存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updataGoodsNum(state,data) {
            //在购物车界面改变商品数量时，实时更新徽标及localstorage中的数据
            state.car.some(item => {
                if (item.id == data.id) {
                    //购物车页面最新的数据要覆盖之前的数据
                    item.count = data.count
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state,data) {
            state.car.forEach((item, i) => {
                if(item.id == data.id) {
                    state.car.splice(i, 1)
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info) {
            state.car.some(item => {
                if(item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
        
    },
    getters: {
        setBadge(state) {
            let c = 0
            state.car.forEach(item => {
                c += parseInt(item.count)
            })
            return c
        },
        getGoodsNum(state)  {
            let oo = {}
            state.car.forEach(item => {
                oo[item.id] = item.count
            })
            return oo
        },
        getGoodsSeleced(state) {
            //接收购物车页面的选择信息并将其同步到car
            let o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsPriceAndAmount(state) {
            let o = {
                price: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if(item.selected == true) {
                    o.amount += parseInt(item.count) 
                    o.price += item.price * item.count
                }
            })
            return o
        }
        
    }
})


let vm = new Vue({
    el: '#app',
    render: c => c(home),
    router,
    store
})