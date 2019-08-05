<template>
    <div class="goodsIntro-container">
        <h3>{{intro.title}}</h3>

        <hr>

        <div class="content" v-html="intro.content"></div>
    </div>
</template>


<script>
import Toast from 'mint-ui'
export default {
    data () {
        return {
            id: this.$route.params.id,
            intro: []
        }
    },
    created() {
        this.getIntro()
    },
    methods: {
        getIntro() {
            this.axios.get(`http://www.liulongbin.top:3005/api/goods/getdesc/${this.id}`)
                .then( res => {
                    this.intro = res.data.message[0]
                    console.log(this.intro)
                })
                .catch( () => Toast("获取数据失败！"))
        }
    }
}
</script>


// 需要去掉scope才能调整img图片大小
<style lang="scss">
    .goodsIntro-container{
        padding: 4px;
        h3{
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100%;
                // height: 100%;
            }
        }
    }
</style>
