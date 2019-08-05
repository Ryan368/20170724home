<template>
    <div class="app-container">
        <!-- 顶部固定区域 -->
        <mt-header fixed title="vue-mobile">
			<span @click="goBack" slot="left" v-show="flag">
    			<mt-button icon="back">返回</mt-button>
  			</span>
		</mt-header>


        <!-- 中间区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		

        <!-- 底部tapbar区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-jj" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-jj" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-jj" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{getBadgeNum}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-jj" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>


<script>
import {Tabber} from 'mint-ui'
	export default {
		data() {
			return{
				flag: false
			}
		},
		//解决非首页页面刷新时返回图谱不显示问题
		created() {
			this.flag = this.$route.path === '/home' ? false : true
		},
		watch: {
			//监听路由的变化，若是根目录，则隐藏返回图标
			"$route.path": function(newval) {
				if (newval === '/home') {
					this.flag = false
				} else this.flag = true
			}
		},
		methods: {
			goBack() {
				//点击后退
				this.$router.go(-1)
			}
		},
		computed: {
			getBadgeNum: function() {
				return this.$store.getters.setBadge
			}
		}
	}

</script>


<style>
	.app-container{
		margin-top: 40px;
		margin-bottom: 50px;
		/* 用于解决组件切换动画使顶部和tabbar也移动的问题 */
		overflow-x: hidden;
	}
	/* 添加动画 */
	.v-enter {
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s ease
	}

/* 由于mui中，mui-tab-item这个样式在Tabbar和滑动条中都有，产生了冲突，所以通过以下方式
将Tabbar中的mui-tab-item重命名为mui-tab-item-jj,从而解决使用滑动条时无法切换Tabbar
栏的问题。具体代码从mui.css中拷贝而来。 */
	.mui-bar-tab .mui-tab-item-jj {
    	display: table-cell;
    	overflow: hidden;
    	width: 1%;
    	height: 50px;
    	text-align: center;
    	vertical-align: middle;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	color: #929292;
	}
	.mui-bar-tab .mui-tab-item-jj.mui-active {
    	color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-jj .mui-icon {
    	top: 3px;
    	width: 24px;
    	height: 24px;
    	padding-top: 0;
    	padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-jj .mui-icon ~ .mui-tab-label {
    	font-size: 11px;
    	display: block;
    	overflow: hidden;
    	text-overflow: ellipsis;
	}
	.mui-bar-tab .mui-tab-item-jj .mui-icon:active {
    	background: none;
	}


</style>
