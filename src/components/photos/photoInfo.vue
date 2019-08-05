<template>
    <div>
        <a v-bind:href="photoInfo"></a>
    </div>
</template>


<script>
import Toast from 'mint-ui'
export default {
    data() {
        return {
            id: this.$route.params.id,
            photoInfo: []
        }
    },
    computed: {
        // 获取vuex中的值要写在computed中
        // theUrl: function() {
        //     return this.$store.state.theUrl
        // }
    },
    created() {
        window.open(this.id)
    },
    mounted() {
        // this.getPhotoList()
    },
    methods: {
        //点击链接跳转的代码
        // getPhotoList() {
		// 	this.axios.get(`http://api.tianapi.com/${this.theUrl}/?&key=2c745d24f0fbaf8fc99e13f4100a5a71&num=10`)
  		// 		.then( res => {
		// 			  this.photoInfo = res.data.newslist[this.id].url
		// 			  console.log('photoInfo: ',this.photoInfo)
  		// 		})
  		// 		.catch( () => {
  		// 	  		Toast('获取数据失败！')
  		// 		})
		// },
	}
}
</script>


<style lang="scss" scoped>

</style>
