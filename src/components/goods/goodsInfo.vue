<template>
    <div class="goodsinfo-container">
        <transition mode="out-in" appear
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <swiper :lunbotuList="lunbotu" :isfull=false></swiper>
					</div>
				</div>
		</div>


        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsInfo[0].title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>{{goodsInfo[0].market_price}}</del>&nbsp;&nbsp;销售价：<span class="now">{{goodsInfo[0].sell_price}}</span>
                        </p>
                        <p>购买数量<numbox @getcount="getSelectedCount" :max="goodsInfo[0].stock_quantity"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">立 即 购 买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
			</div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsInfo[0].goods_no}}</p>
                        <p>库存情况：剩余{{goodsInfo[0].stock_quantity}}件</p>
                        <p>上架时间：{{goodsInfo[0].add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goIntro(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>


<script>
import Toast from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsInfo_numbox.vue'
export default {
    data() {
        return{
            id: this.$route.params.id,
            lunbotu: [],
            goodsInfo: [],
            ballFlag: false,
            selectedCount: 1,//numbox的默认值
        }
    },
    created() {
        this.getLunbotu()
        this.getGoodsInfo()
        //goodsInfo是异步获取的，goodsInfo有定义，但是goodsInfo[0]没有定义，
        // 而数据绑定用到的是goodsInfo[0],如果不对其定义，其值为undefined，绑定时会报错
        this.goodsInfo[0] = ''
    },
    computed: {
        now_price: function() {
            return this.$store.state.now_price
        },
        market_price: function() {
            return this.$store.state.market_price
        }
    },
    methods: {
        getLunbotu() {
            this.$http.get(`http://www.liulongbin.top:3005/api/getthumimages/${this.id}`)
                .then( res => {
                    // swiper组件只识别picUrl属性，所以要循环数组创建picUrl属性并为其赋值
                    res.data.message.forEach( item => item.picUrl = item.src )
                    this.lunbotu = res.data.message
                    console.log("lunbotu-after: ",this.lunbotu)
                })
                .catch( () => Toast('获取数据错误！'))
        },
        getGoodsInfo() {
            this.$http.get(`http://www.liulongbin.top:3005/api/goods/getinfo/${this.id}`)
                .then( res => {
                    this.goodsInfo = res.data.message
                    console.log("goodsInfo: ",this.goodsInfo)
                })
                .catch( () => Toast('获取数据失败！'))
        },
        goIntro(id) {
            //点击使用编程式导航跳转到图文介绍页面
            // $route用于获取query和params; #router用于编程式导航是的跳转
            this.$router.push({name: 'goodsIntro', params: {id}})
        },
        goComment(id) {
            this.$router.push({name: 'goodsComment', params: {id}})
        },
        addToShopCar() {
            this.ballFlag = !this.ballFlag
            //拼接出一个要保存到store的car中的对象
            let goodsinfo = {
                id: this.id,
                count: parseInt(this.selectedCount),
                price: this.goodsInfo[0].sell_price,
                selected: true
            }
            this.$store.commit("addToCar", goodsinfo)
            console.log("购物车信息：",this.$store.state.car)
        },
        // 问题未解决！！！：
        // 添加购物车动画第一次触发时没有贝塞尔曲线，连续点击将出现离场动画,添加done()后动画不显示
        beforeEnter(el) {
            el.style.transform = "translate(0,0)"
        },
        enter(el) {
            el.offsetTop
            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect()
            //获取徽标位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect()
            const xDist = badgePosition.left - ballPosition.left
            const yDist = badgePosition.top - ballPosition.top
            el.style.transform = `translate(${xDist}px,${yDist}px)`
            el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)"  //cubic-bezier(.4,-0.3,1,.68)
            // done()
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count) {
            //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
            this.selectedCount = count
            console.log("父组件拿到的数量值为："+ this.selectedCount)
        }
    },
    components: {
        swiper,
        numbox,
    }
}
</script>


<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;

        .now{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 10px 0;
            }
        }

        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 412px;
            left: 77px;

        }
    }
</style>
