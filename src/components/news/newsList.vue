<template>
    <div>
        <ul class="mui-table-view" v-for="(item,i) in newsList" :key="item.picUrl">
				<li class="mui-table-view-cell mui-media">
					<router-link :to="{ name: 'newsinfo', params: { id: item.url }}">
						<img class="mui-media-object mui-pull-left" :src=item.picUrl>
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>{{ item.ctime | dateFormat}}</span>
                                <span>点击：{{ i }} 次</span>
                            </p>
						</div>
					</router-link>
				</li>	
			</ul>
    </div>
</template>



<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            newsList: []
        }
    },
    created() {
        this.getnewslist()
    },
    methods: {
        getnewslist(){
            this.$http.get(' http://api.tianapi.com/allnews/?&key=2c745d24f0fbaf8fc99e13f4100a5a71&num=10&col=7')
                .then(res => {
                        this.newsList = res.data.newslist
                        console.log("newsList:",this.newsList)
                })
                .catch(() => Toast('获取新闻列表失败！'))        
        } 
    }
}
</script>



<style lang="sass" scoped>
    .mui-media-body{
        h1{
            font-size: 15px;
        }
    }
    // css3实现两端对齐
    .mui-ellipsis{
        display: flex;
        justify-content: space-between;
    }
</style>
