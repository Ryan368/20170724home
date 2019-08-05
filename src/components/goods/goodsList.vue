<template>
    <div>
        <div class="goods-list">
            <!-- 给router-link添加事件需要加.native修饰符,如下行 -->
            <router-link class="goods-item" v-for="(item) in goodslist" :key='item.img_url' :to="'/home/goodsInfo/'+item.id">
                <img :src="item.img_url">
                <h1 class="title">{{ item.title }}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">{{ item.sell_price }}</span>
                        <span class="old">{{ item.market_price }}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩60件</span>
                    </p>
                </div>
            </router-link>
        </div>

        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>


<script>
import Toast from 'mint-ui'
export default {
    data() {
        return{
            pageIndex: 1,
            goodslist: [],
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            this.$http.get(`http://www.liulongbin.top:3005/api/getgoods?pageindex=${this.pageIndex}`)
                .then( res => {
                    this.goodslist = this.goodslist.concat(res.data.message)
                    console.log("goodsList: ",this.goodslist)
                })
                .catch( () => Toast('获取数据失败!') )
        },
        getmore() {
            this.pageIndex++
            this.getGoodsList()
        },
    // setPrice(i) {
    //     this.$store.commit("setPrice",this.goodslist[i].sell_price)
    //     this.$store.commit("setPrice2",this.goodslist[i].market_price)
    //     console.log("vuex---now_price: ",this.$store.state.now_price)
    //     console.log("vuex---market_price: ",this.$store.state.market_price)

    // }
                           
    }
}
</script>


<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap; //超出换行
        //实现每行元素均匀分布
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding: 2px; //让边框和里面的内容保持一定距离
            // C3语法：改变主轴方向为纵向，使图片和灰盒子上下贴边对齐
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px; //设置最小宽度，在网速慢图片加载不出来时也能展示框架结构
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: rgb(240, 236, 236);
                p{// p标签默认有下margin，不设置的话，item下面会有白边
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    } 
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
</style>
