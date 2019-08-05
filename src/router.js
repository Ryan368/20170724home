import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import goodsIntro from './components/goods/goodsIntro.vue'
import goodsComment from './components/goods/goodsComment.vue'



let router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/search', component: SearchContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/home/news', component: newsList},
        {path: '/home/newsInfo/:id', component: newsInfo, name: "newsinfo"},
        {path: '/home/photolist', component: photoList},
        {path: '/home/photoInfo/:id', component: photoinfo, name: "photoinfo"},
        {path: '/home/goodslist', component: goodslist},
        {path: '/home/goodsInfo/:id', component: goodsInfo},
        {path: '/home/goodsIntro/:id', component: goodsIntro, name: "goodsIntro"},
        {path: '/home/goodsComment/:id', component: goodsComment, name: "goodsComment"}
    ],
    linkActiveClass: 'mui-active'
})

export default router