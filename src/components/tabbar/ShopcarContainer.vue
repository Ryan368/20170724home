<template>
    <div class="shopcar-container">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSeleced[item.id]"
                            @change="selectedChanged(item.id, $store.getters.getGoodsSeleced[item.id])"
                        ></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox style="display: inline"  
                                        :goodsNum="$store.getters.getGoodsNum[item.id]"
                                        :goodsId="item.id">
                                </numbox>
                                <a href="#" @click.prevent="remove(item, i)">删除</a>
                            </p>
                        </div>
                    </div>
				</div>
			</div>
        </div>
        
        <!-- 结算区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="pay">
                            <div>
                                <p>总计（不含运费）</p>
                                <p>已勾选商品
                                    <span class="red">{{$store.getters.getGoodsPriceAndAmount.amount}}</span>
                                    件，总价￥
                                    <span class="red">{{$store.getters.getGoodsPriceAndAmount.price}}</span>
                                </p>
                            </div>
                            <mt-button type="danger">去结算</mt-button>
                        </div>
					</div>
				</div>
			</div>
            <p>{{$store.getters.getGoodsSeleced}}</p>
    </div>
</template>


<script>
import Toast from 'mint-ui'
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            goodslist: [],
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            let idArr = []
            this.$store.state.car.forEach(element => {
                idArr.push(element.id)
            })
            if (idArr.length <= 0) return
            this.$http.get(` http://www.liulongbin.top:3005/api/goods/getshopcarlist/${idArr.join(",")}`)
                .then(res => {
                    this.goodslist = res.data.message
                    console.log("购物车里有：",this.goodslist)
                })
                .catch(() => Toast("获取数据出错！"))
        },
        remove(item, i) {
            //用item删除car中的数据，用index删除本页面goodslist中的数据
            this.goodslist.splice(i, 1)
            this.$store.commit("removeFromCar", item)
        },
        //将购物车页面的选择数据同步到store
        selectedChanged(id, val) {
            console.log(id + "---" + val)
            this.$store.commit("updateGoodsSelected", {id, selected: val})
        }
    },
    components: {
        numbox
    }
}
</script>


<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 50px;
            height: 50px;
            margin: 0 10px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h1{
                font-size: 13px;
                margin-bottom: 20px;
            }
            p{
                .price{
                    color: red;
                    font-weight: bold;
                    //保持数字框对齐
                    // display:inline -block;
                    // min-width: 46px;
                    // border: 1px solid black;
                }
                a{
                    color: rgb(50, 101, 209);
                }
            }
            
        }
    }
    .pay{
        display: flex;
        justify-content: space-between;
        //纵向居中
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>
