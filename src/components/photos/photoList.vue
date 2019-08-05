<template>
    <div>
		<!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a class="mui-control-item mui-active" data-wid="tab-top-subpage-1.html" @click="getPhotoList('generalnews')">
							推荐
						</a>
						<a class="mui-control-item" data-wid="tab-top-subpage-2.html" @click="getPhotoList('topnews')">
							热点
						</a>
						<a class="mui-control-item" data-wid="tab-top-subpage-3.html" @click="getPhotoList('meinv')">
							美女
						</a>
						<a class="mui-control-item" data-wid="tab-top-subpage-4.html" @click="getPhotoList('caijing')">
							财经
						</a>
						<a class="mui-control-item" data-wid="tab-top-subpage-5.html" @click="getPhotoList('it')">
							IT
						</a>
                        <a class="mui-control-item" data-wid="tab-top-subpage-5.html" @click="getPhotoList('game')">
							游戏
						</a>
					</div>
				</div>
		</div>
		<!-- 图文内容区域 -->
		<ul class="photo-list">
  			<router-link v-for="item in photoList" :key=item.picUrl :to="{ name: 'photoinfo', params: { id: item.url }}" tag="li">
    			<img v-lazy = item.picUrl>
				<div>
					{{item.title}}
				</div>
  			</router-link>
		</ul>	
    </div>
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'


export default {
    data () {
        return {
			photoList: [],
		}
    },
    mounted() {
            mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
	},
	created () {
		this.getPhotoList('mobile');
	},
	methods: {
		getPhotoList(name) {
			this.axios.get(`http://api.tianapi.com/${name}/?&key=2c745d24f0fbaf8fc99e13f4100a5a71&num=30`)
  				.then( res => {
					  this.photoList = res.data.newslist
					  console.log('photoList: ',this.photoList)
  				})
  				.catch( () => {
  			  		Toast('获取数据失败！')
				})
				this.$store.commit("setUrl", name)
				console.log("vuex---theUrl: ",this.$store.state.theUrl)
		},
		
	}
}
</script>


<style lang="scss" scoped>
     *  { 
            touch-action: pan-y; 
        } 
	.photo-list{
		background-color: white;
		// 去掉懒加载图片旁边的小黑点
		list-style: none;
		text-align: center;
		// ul默认左侧留白，去掉方可让图片居中
		margin:0;
		padding: 10px;
		padding-bottom: 0;
		li{
			margin-bottom: 10px;
			box-shadow: 0 0 9px #999;
			margin: 10px;
			position: relative;
			img[lazy=loading] {
  				width: 40px;
  				height: 300px;
  				margin: auto;
			}
			img{
				height: 100%;
				width: 100%;
				// 去除图片底部的灰条
				vertical-align: middle;
				border-radius: 10px;
			}
			div{
				position: absolute;
				bottom: 0;
				left: 5px;
				color: white;
				text-align: left;
				font-size: 14px;
			}
		}
	}
	
</style>
