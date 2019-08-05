<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>


<script>
import mui from '../../lib/mui/js/mui.min.js'
import { setTimeout } from 'timers';
export default {
    mounted() {
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
        console.log("max: ", this.max)
    },
    methods: {
        countChanged() {
            //绑定change事件，每当文本框的数据被修改时，立即把最新的数据通过事件调用传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit("getcount", parseInt(this.$refs.numbox.value))
        }
    },
    props: ["max"],
    watch: {
        // 由于max对应的值是异步获取的，在父组件将此值传给子组件时，可能还没有获得到max的值，
        // 那么这里就会是undefined，所以使用watch监听max，在max值发生变化时，及时更新其值,
        // 此处设置max的方式可在mui官网上查看
        max: (newVal,oldVal) => {
            mui(".mui-numbox").numbox().setOption("max", newVal) 
            // console.log("max has watched: ", max)
        }
    }
}
</script>