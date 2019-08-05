<template>
    <div>
            <swiper :lunbotuList="lunbotuList" :isfull=true></swiper>

            <div class="outer_img">
                <img src="https://c-ssl.duitang.com/uploads/item/201604/08/20160408162401_4UxtH.thumb.400_0.gif" class="img">
                <img src="https://c-ssl.duitang.com/uploads/item/201604/08/20160408162401_4UxtH.thumb.400_0.gif" class="img">
                <img src="https://c-ssl.duitang.com/uploads/item/201604/08/20160408162401_4UxtH.thumb.400_0.gif" class="img">
                <img src="https://c-ssl.duitang.com/uploads/item/201604/08/20160408162401_4UxtH.thumb.400_0.gif" class="img">
                <img src="https://c-ssl.duitang.com/uploads/item/201604/08/20160408162401_4UxtH.thumb.400_0.gif" class="img">
                <img src="https://c-ssl.duitang.com/uploads/item/201604/08/20160408162401_4UxtH.thumb.400_0.gif" class="img">
            </div>
            


            <ul class="mui-table-view mui-grid-view mui-grid-9">
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
		            <img src="../../pics/menu1.png" alt="">
		            <div class="mui-media-body">新闻资讯</div></router-link></li><!-- 内容展现到home.vue的router-view中 -->
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		            <img src="../../pics/menu2.png" alt="">
		            <div class="mui-media-body">图片分享</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		            <img src="../../pics/menu3.png" alt="">
		            <div class="mui-media-body">商品购买</div></router-link></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../pics/menu4.png" alt="">
		            <div class="mui-media-body">留言反馈</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../pics/menu5.png" alt="">
		            <div class="mui-media-body">视频专区</div></a></li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		           <img src="../../pics/menu6.png" alt="">
		            <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 

                <div class="img_bottom"><img src="https://c-ssl.duitang.com/uploads/item/201806/12/20180612131747_WScax.thumb.400_0.gif"></div>
    </div>
</template>


<script>
import swiper from '../subcomponents/swiper.vue'
export default {
   data() {
	   return {
		   lunbotuList: [],
	   }
   },
   created() {
       console.log("lunbotuList-before: ",this.lunbotuList)
        this.getlunbotu()
        // res.body.message简单赋值后，其值发生变化???????
		console.log("lunbotuList: ",this.lunbotuList)
	},
   methods: {
		getlunbotu () {
		   this.$http.get('http://api.tianapi.com/internet/?&key=2c745d24f0fbaf8fc99e13f4100a5a71&num=4')
			   .then((res) => {
                        this.lunbotuList = res.data.newslist
                        console.log("轮播图内容: ",this.lunbotuList)
				   })
                .catch(() => console.log('获取数据出错!'))
       },
   },
   components: {
       swiper
   }
}
</script>


<style lang="sass" scoped>
   
    // 在浏览器中找到相关的css，复制过来进行修改
    .outer_img{
        display: flex;
        justify-content: space-between;
        img{
        height: 20px;
        }
    }
    
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img {
            height: 60px;
            width: 60px
        }   
    } 
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
        .mui-media-body {
            font-size: 13px;
        }     
    }
    .img_bottom{
        text-align: center;
        img{
            height: 90px;
        }
    }
    
</style>
