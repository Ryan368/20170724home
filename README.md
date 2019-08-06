## 这是一个基于vue开发的移动端项目，实现了远程请求图文数据并渲染、商城经典布局、购物车逻辑、前端组件库的调用等。所涉及的技术主要有：
- 1.使用 sass 进行样式的预处理；
- 2.使用 vue 进行组件设计和开发；
- 3.使用 vue-router 实现单页面网页的路由跳转；
- 4.使用 vue-resource 和 axios 请求数据；
- 5.使用 vuex 实现非父子组件间的传值；
- 6.使用 webpack 进行模块的打包并启用 webpack-dev-server 实现热加载；
- 7.使用 git 进行版本控制
- 8.使用 Mint-Ui 和 MUI 组件库实现特定样式

## 所使用的服务器有两个，域名为(具体接口此处省略)：
- 1. http://www.liulongbin.top:3005/;
- 2. http://api.tianapi.com/

### 以下记录了一些项目涉及的比较复杂的操作，以供复习和修改

#### 导入子组件
##### 1.先创建一个单独的comment.vue组件模板
##### 2.在需要使用comment组件的页面中，先手动导入comment组件；
##### 3.在父组件中，使用 components 属性，将导入的组件注册为自己的子组件；
##### 4.将注册子组件时的注册名称以标签形式在页面中引用即可

#### photoList中使用顶部导航条注意事项：
##### 1.需要借助于 mui 中的 tab-top-webview-main.html
##### 2.需要把 slider 区域的 mui-fullscreen 类去掉
##### 3.滑动调无法正常滑动原因：
       此顶部顶部导航条是js组件，需要被初始化：
           1.导入 mui.js
           2.调用官方提供的方式去初始化：
                mui('.mui-scroll-wrapper').scroll({
	                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
##### 4.导入 mui.min.js 且初始化了滑动条，但是控制台报错：
     `Uncaught TypeError: 'caller','callee',and 'arguments' properties may not be accessed on strict mode`
     原因： mui.min.js中用到了 'caller','callee',and 'arguments'等属性，但webpack打包好的bundle.js中，默认是启用严格模式的，所以两者发生冲突。
     方案： 改mui.js中的代码不现实，所以选择禁用webpack打包时的严格模式
     步骤:  1. npm i babel-plugin-transform-remove-strict-mode
            2. .babelrc中： 
                {
                    "plugins": ["transform-remove-strict-mode"]
                }
##### 5.滑动条可正常使用，但是出现警告 [Intervention] Unable to preventDefault inside   passive   event listener due to target being treated as passive.
   解决方法：
       在photoList.vue中添加样式：
       * {
           touch-action: pan-y;
       }
       css属性 touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户的操作（比如浏览器自带的滑动、缩放等）；pan-y 表示启用单指垂直平移手势。可以与pan-x, pan-left, pan-right 和/或 pinch-zoom 组合使用
##### 6.滑动条正常，但切换Tabbar栏时报错：[Intervention] Unable to preventDefault inside         passive event listener due to target being treated as passive.  且无法实现页面切换，
    原因：mui自身的bug，Tabbar和滑动条中都定义了样式mui-tab-item，所以在这两个组件一起使用时产生了冲突
    方案：修改Tabbar中的mui-tab-item样式，将设计它的样式都重命名为mui-tab-item-jj，相关代码从mui.css中获得。   
##### 7.刚进页面时，滑动条不能滑动，刷新后才能滑动，方法：
    将mui('.mui-scroll-wrapper').scroll({
	                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });  
    添加到mounted钩子函数中

###### 使用axios请求数据
步骤：1.npm i axios vue-axios   
      2.在main.js中：   
            import axios from 'axios'
            import vueAxios from 'vue-axios'  
            Vue.prototype.$http = axios
            Vue.use(vueAxios,axios)   顺序有关
      3.在模板文件中：
            this.axios.get('url')
  				.then( res => {
  				})
  				.catch( () => {
  				})
##### 使用vuex实现组件间传值
  1. npm i vuex -S
  2. main.js中：
    import Vuex from 'vuex'
    Vue.use(Vuex)
    let store = new Vuex.Store({
        state: {
            theUrl: {},
            count: 0,
        },
        mutations: {
            setUrl(state,data) {
            state.theUrl = data
            }
        },
        //如果store中state上的数据在对外提供时需要做一层包装，则推荐使用getters，getters相当于计算属性，其值会随着state值的改变而实时更新；用法：this.$store.getters.XXX。 注意：getters只负责对外提供数据，不负责修改数据，修改数据的操作在mutations中进行
        getters: {
            optCount: function(state) {
                return '当前最新的count值是：' + state.count
            }
        }
    })
    let vm = new Vue({
        el: '#app',
        render: c => c(home),
        router,
        store
    })
  3. 将组件中的值上传到vuex的store
    this.$store.commit("setUrl", name)  //参数分别为：要调用的mutations中的函数；传递的参数
  4. 从store中获取数据到组件
    computed: {
        // 获取vuex中的值要写在computed中
        theUrl: function() {
            return this.$store.state.theUrl
        }
    },