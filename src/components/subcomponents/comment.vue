<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model="msg" placeholder="最多输入150字" maxlength="120"></textarea>
        <!-- 由于本项目次部分（评论部分）使用的服务器不支持客户端向其发送数据，所以暂无法实现发表评论的功能 -->
        <mt-button type="primary" size="large" @click="post">发表评论</mt-button>
        <div class="cmt-list" v-for="(item,i) in comments" :key="item.picUrl">
            <div class="cmt-item">
                <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
                <div class="cmt-body">{{item.content}}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

    </div>
</template>


<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageIndex: 1,
            comments: [],
            msg: '',
        }
    },
    created() {
        this.getcomments()
    },
    // 父组件向子组件传值的方法
    props: ["id"],
    methods: {
        getcomments () {
            this.$http.get(` http://www.liulongbin.top:3005/api/getcomments/${this.id}?pageindex=${this.pageIndex}`)
                .then(res => {
                        this.comments = res.data.message
                        console.log("comments: ",this.comments)
                })
                .catch( () => Toast("获取评论失败！"))
        },
        getMore () {
            this.pageIndex += 10
            this.getcomments()
        },
        post () {
            if (this.msg.trim().length === 0 ) {
                Toast('评论内容不能为空！')
            }
            this.$http.post(`http://www.liulongbin.top:3005/api/postcomment/${this.$route.params.id}`,
            {content: this.msg.trim()})
                .then(res => {
                    let cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg = ""
                })
        }
    }
}
</script>


<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 10px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>
