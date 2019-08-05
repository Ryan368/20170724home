<template>
    <div>
        <div class="goodsinfo-container">
        <transition mode="out-in" appear
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
    </div>
</template>


<script>
export default {
    data() {
        return {
            ballFlag: false,
        }
    },
    methods: {
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
        }
    }
}
</script>


<style lang="scss" scoped>
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
</style>
