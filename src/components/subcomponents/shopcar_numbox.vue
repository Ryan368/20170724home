<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height:26px">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="goodsNum" @change="countChanged" ref="numbox"/>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
// import { setTimeout } from 'timers';
export default {
    data() {
        return {
            test: 3
        }
    },
    mounted() {
        //初始化数字选择框组件
        mui(".mui-numbox").numbox()
    },
    created() {
    },
    methods: {
        countChanged() {
            console.log(this.$refs.numbox.value)
            this.$store.commit("updataGoodsNum",{
                id: this.goodsId,
                count: this.$refs.numbox.value
            })
        },
    },
    props: ["goodsNum","goodsId"]
}
</script>