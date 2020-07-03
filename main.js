import Vue from 'vue'
import App from './App'
import common from '@/common/config.js'
import utils from '@/common/utils.filter.js';
import QQMapWX from '@/common/qqmap-wx-jssdk.js';

/* import richText from '@/common/richText.js'; */

import myFearch from 'components/my-search.vue'
import mylabertitle from 'components/my-laber-title.vue'
import mycolumnlist from 'components/my-column-list.vue'
import mynewslist from 'components/my-news-list.vue'
import myscrollnavigator from 'components/my-scroll-navigator.vue'
import myrowlist from 'components/my-row-list.vue'
import myvideolist from 'components/my-video-list.vue'

import myseeklist from 'components/my-seek-list.vue'
import myhousecate from 'components/my-house-cate.vue'
import mycommenlist from 'components/my-commen-list.vue'
import mymenutree from 'components/my-menutree.vue'

Vue.component('my-search', myFearch) //搜索框
Vue.component('my-laber-title', mylabertitle) //内容标签
Vue.component('my-column-list', mycolumnlist) //竖排楼盘列表
Vue.component('my-row-list', myrowlist) //横排楼盘列表
Vue.component('my-news-list', mynewslist) //新闻列表
Vue.component('my-scroll-navigator', myscrollnavigator) //新闻列表
Vue.component('my-video-list', myvideolist) //专享视频

Vue.component('my-seek-list', myseeklist) //咨询师
Vue.component('my-house-cate', myhousecate) //
Vue.component('my-commen-list', mycommenlist) //评论列表
Vue.component('my-menutree', mymenutree) //评论列表

Vue.config.productionTip = false
Vue.prototype.imgUrl = 'https://static-files-fangbashi.oss-cn-chengdu.aliyuncs.com/'; //富文本图片添加
Vue.prototype.siteBaseUrl = 'https://paihaofang.maijindou.cn/api.php';
Vue.prototype.messageUrl = 'swoole.maijindou.cn';
Vue.prototype.deviceType = "wxapp";

Vue.prototype.qqmapsdk = new QQMapWX({
	key: '67JBZ-S4434-UUJUD-DSRJD-QUSL5-NSBXT'
});

Vue.prototype.mRequest = ({
	sendRequest(obj) {
		let that = this
		let apiUrl = 'https://swoole.maijindou.cn'
		let deviceType = 'wxapp'
		try {
			if (uni.getStorageSync('sessionKey')) {
				if (obj.header) {
					obj.header["XX-Token"] = uni.getStorageSync('sessionKey');
					obj.header["XX-Device-Type"] = deviceType;
				} else {
					obj.header = {
						"XX-Token": uni.getStorageSync('sessionKey'),
						"XX-Device-Type": deviceType
					};
				}
				obj.url = apiUrl + obj.url;
				uni.request(obj)
			} else {
				uni.showToast({
					title:'请先登录',
					duration:1500,
					mask:true,
					success() {
						uni.switchTab({
							url: "/pages/myinfo/index"
						})
					}
				})
			/* 	uni.showModal({
					title: '微信授权登录小程序',
					content: '请登录再进行操作',
					confirmText:'立即登录',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							})
						}else{
							uni.switchTab({
								url: '../index/index'
							})
						}
					}
				}) */
				return false
			}
		} catch (e) {
			console.log(e)
			return
		}
	},
});


App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()
