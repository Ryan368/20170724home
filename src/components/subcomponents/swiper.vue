<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在图片的外部标签添加align="center"属性也可以实现图片的水平居中 -->
            <mt-swipe-item v-for="(item,i) in lunbotuList" :key="item.img">
                <div class="text">{{item.title}}</div>
                <img :src="item.picUrl" :class="{full: isfull}" @click="toLunboContent(i)"><!-- 通过传入一个值来确定在某一次调用中是否要启用此样式 -->
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>


<script>
export default {
    props: ['lunbotuList','isfull'],
    methods: {
        toLunboContent(id) {
            window.open(this.lunbotuList[id].url)
        }
    }
}
</script>


<style lang="scss" scoped>
     // mintui的轮播图默认高为0，使用时需要手动为其添加height
    .mint-swipe {
        text-align: center;
        height: 200px;
        position: relative;
        img{
            height: 100%;
            // width: 100%
            
        }
    }
    .full{
        width: 100%;
    }
    .text{
        text-align: justify;
        font-family: "Microsoft YaHei";
        font-size: 15px;
        color: white;
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
</style>
