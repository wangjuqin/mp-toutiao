<template>
	<view class="content">

		<block v-if="isshow==1">
			<!-- 用户信息 -->
			<view class="users">
				<view class="">
					<view class="users-left">
						<image :src="users.avatar?users.avatar:'../../static/my_hover.png'" mode=""></image>
						<view v-if="users.user_nickname" class="">
							{{users.user_nickname}}
						</view>
						<view v-else class="loginTab" @click="loginTap">
							登录
						</view>
					</view>
					<!-- 	<view class="users-right">
						邀请好友 
					</view>-->
				</view>


			</view>

			<!-- end -->

			<view class="uni-navbar">
				
				<view class="uin-navbar-item"  @click="navigatorTap(index.url)" v-for="(index,item) in uinnavbar" :key="item">
					<image :src="index.img"></image>
					<view class="name">
						{{index.name}}
					</view>
				</view>
			<!-- 	<navigator :url="index.url" hover-class="none" class="uin-navbar-item" v-for="(index,item) in uinnavbar" :key="item">
					<image :src="index.img"></image>

					<view class="name">
						{{index.name}}
					</view>
				</navigator> -->
			</view>

		</block>

		<block v-if="isshow == 2">
			<!-- 顾问信息 -->
			<view class="advise" v-if="cards">
				<view class="top">
					<view class="left">
						<image :src="cards.avatar"></image>
					</view>
					<view class="right">
						<view class="right-top">
							<view class="uesername">
								<view class="uname">{{cards.name}}</view>
								<view class="tel">
									{{cards.phone}}
								</view>
							</view>
							<!-- <view class="icon">
								<view class="">
									更改
								</view>
									<view class="">
									|
								</view>
								<view class="">
									注销
								</view>
								<image src="../../static/xx1.png"></image>
									<image src="../../static/dhfh.png"></image>
							</view> -->

						</view>
						<view class="right-conter">
							<view class="wx">微信：{{cards.wechat_name}}</view>
							<view class="company">
								所属公司：{{cards.company}}
							</view>
						</view>
						<view class="right-bottom">
							<view class="qianming">
								<view class="">
									个性签名：
								</view>
								<text v-if="editstaue == true">{{cards.describe}}</text>
								<view v-else class="editdesribe">
									<input type="text" :value="cards.describe" maxlength="30" @blur="editstaueTop" />
								</view>

							</view>

							<view class="bianjie" v-if="editstaue == true" @click="editTop">
								编辑
							</view>
						</view>

					</view>
				</view>
				<view class="bottom">
					<view class="preview"><text>{{cards.click}}</text> 浏览量 </view>
					<view class="activity"> <text> {{cards.activity}}</text> 活跃度</view>
					<view class="likes"> <text>{{cards.likes}}</text> 点赞数</view>
				</view>
			</view>

			<!-- end -->

			<!--标签 -->
			<block v-if="notice">
				<view class="house-navbar">
					<view class="left">
						<image src="../../static/title.png" mode=""></image>
					</view>
					<!-- <view class="right">查看更多></view> -->
				</view>
				<!-- end -->
				<view class="con-conten" @click="articleTop(notice.id)">
					<view class="title">{{notice.title}}</view>

					<view class="contents">
						<rich-text :nodes="notice.content"></rich-text>
					</view>
				</view>
			</block>
			<view class="uni-navbar">
				<view class="uin-navbar-item"  @click="navigatorTap(index.url)" v-for="(index,item) in uinnavbar1" :key="item">
					<image :src="index.img"></image>
					<view class="name">
						{{index.name}}
					</view>
				</view>
			<!-- 	<navigator :url="[sessionKey !=''?index.url:'']" hover-class="none"  >
					<image :src="index.img"></image>
					<view class="name">
						{{index.name}}
					</view>
				</navigator> -->
			</view>

		</block>


	</view>

</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'

	export default {
		data() {
			return {
				title: 'Hello',
				utils: utils,
				isshow: 1,
				notice: {},
				cards: '',
				users: '',
				editstaue: true,
				sessionKey:'',
				uinnavbar: [{
						img: '../../static/pic1.png',
						name: '我的关注',
						url: '../myinfo/attention'
					},
					{
						img: '../../static/pic2.png',
						name: '我的回答',
						url: '../myinfo/answer'
					},
					{
						img: '../../static/pic3.png',
						name: '个人消息',
						url: '../myinfo/message'
					},
					{
						img: '../../static/pic4.png',
						name: '我的收藏',
						url: '../collect/index'
					},
					{
						img: '../../static/pic5.png',
						name: '我要入驻',
						url: '../nducted_role/index'
					},
					{
						img: '../../static/pic6.png',
						name: '在线服务',
						url: '../contactus/onepage?type=7' //../contactus/index
					},
					{
						img: '../../static/pic7.png',
						name: '联系我们',
						url: '../contactus/index'
					}

				],
				uinnavbar1: [{
						img: '../../static/pic11.png',
						name: '我的名片',
						url: '../myinfo/card'
					},
					{
						img: '../../static/pic21.png',
						name: '我的积分',
						url: '../myinfo/integral'
					},
					{
						img: '../../static/pic13.png',
						name: '钱包',
						url: '../wallet/index'
					},
					{
						img: '../../static/pic14.png',
						name: '我的作品',
						url: '../myinfo/opus'
					},
					{
						img: '../../static/pic15.png',
						name: '我的楼盘',
						url: '../myinfo/myhouse'
					},
					{
						img: '../../static/pic16.png',
						name: '爆单海报',
						url: '../poster/index'
					},
					{
						img: '../../static/pic1.png',
						name: '我的关注',
						url: '../myinfo/attention'
					},
					{
						img: '../../static/pic2.png',
						name: '我的回答',
						url: '../myinfo/answer'
					},
					{
						img: '../../static/pic3.png',
						name: '个人消息',
						url: '../myinfo/message'
					},
					{
						img: '../../static/pic4.png',
						name: '我的收藏',
						url: '../collect/index'
					},
					{
						img: '../../static/pic6.png',
						name: '在线服务',
						url: '../contactus/onepage?type=7' //../contactus/index
					},
					{
						img: '../../static/pic7.png',
						name: '联系我们',
						url: '../contactus/index'
					}

				],
			}
		},
		onLoad() {

		},

		onShow() {
			let _seft = this
			if (uni.getStorageSync('sessionKey')) {
				_seft.sessionKey = uni.getStorageSync('sessionKey')
				//我的身份
				con.sendRequest({
					url: '/user/Shop/isShop',
					method: 'post',
					success: function(res) {
						console.log('我的身份', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							if (restun == 2) {
								_seft.isshow = 2
							} else {
								_seft.isshow = 1
							}

						}

					}

				})
				//公告
				con.sendRequest({
					url: '/home/Shop/newNotice',
					method: 'get',
					success: function(res) {
						console.log('公告', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.notice = restun
						}

					}

				})
				//getUser
				con.sendRequest({
					url: '/home/index/getUser',
					method: 'get',
					success: function(res) {
						console.log('getUser', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.users = restun
						}

					}

				})

				//我的名片
				con.sendRequest({
					url: '/home/Shop/info',
					method: 'get',
					success: function(res) {
						console.log('我的名片', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.cards = restun
						}
					}
				})
			}else{
				uni.showToast({
					title:'请先登录!',
					duration:1500,
					mask:true,
				})
			}
		},


		methods: {
			navigatorTap(url){
				let _seft = this
				if(!_seft.sessionKey){
					uni.showToast({
						title:'请先登录',
						duration:1500,
						mask:true,
					})
					return false
				}else{
					uni.navigateTo({
						url: url
					});
				}
				
			},
			articleTop(index) {
				uni.navigateTo({
					url: '../news/details?id=' + index
				});
			},
			loginTap(index) {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			editTop() {
				this.editstaue = !this.editstaue

			},
			editstaueTop(e) {
				let _seft = this

				console.log('编辑签名', e)
				//return
				uni.showLoading({
					title: "请求中"
				})
				con.sendRequest({
					url: '/home/index/saveSignature',
					method: 'POST',
					data: {
						describe: e.detail.value
					},
					success: function(res) {
						uni.hideLoading()

						console.log('我的名片', res)
						_seft.cards.describe = e.detail.value
						_seft.editstaue = !_seft.editstaue

					}

				})

			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}



	/* 用户信息 */
	.users {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-image: url(../../static/head_BG.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding-bottom: 50rpx;
	}

	.users>view {
		margin-top: 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 95%;
	}

	.users .users-left {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}

	.users .users-left .loginTab {
		font-size: 40rpx;
	}

	.users .users-left>image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.users .users-left>view {
		font-size: 32rpx;
		color: #FFFFFF;
		width: 75%;
	}

	.users .users-right {
		width: 30%;
		background-color: #389AFD;
		font-size: 31rpx;
		border: 1rpx solid #FFFFFF;
		color: #FFFFFF;
		text-align: center;
		line-height: 70rpx;
		border-radius: 35rpx;
	}

	/* end */

	.uni-navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		width: 95%;
		margin-top: 50rpx;

	}

	.uni-navbar .uin-navbar-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;
		margin-bottom: 50rpx;
	}

	.uni-navbar .uin-navbar-item>image {
		width: 85rpx;
		height: 85rpx;
		border-radius: 50%;

	}

	.uni-navbar .uin-navbar-item>view {

		font-size: 30rpx;
		color: #505050;
		margin-top: 25rpx;
		text-align: center;
	}

	/* 经纪人 */


	.advise {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-image: url(../../static/info_BG.png);
		background-repeat: no-repeat;
		width: 100%;
		background-size: cover;


	}

	.advise .top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 95%;
		height: 160rpx;
		margin-top: 30rpx;

	}

	.top .left {

		/* width: 20%; */
		height: 100%;
	}

	.top .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.top .right {

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* 	align-items: center; */
		height: 100%;
		width: 83%;

	}

	.top .right .right-top {
		height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* text-align: center; */
		width: 100%;
		color: #FFFFFF;
		/* 	opacity: .8; */

	}

	.top .right .right-top .uesername {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* width: 48%; */

	}

	.top .right .right-top .icon {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		text-align: center;
		align-items: center;
		border: 1rpx solid #FFFFFF;
		border-radius: 50rpx;
		padding: 0rpx 30rpx;
		font-size: 26rpx;
		height: 50rpx;
	}


	/* 	.top .right .right-top .icon image {
		width: 40rpx;
		height: 40rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		padding: 10rpx;
	}
	 */

	.top .right .right-top .uname {
		font-size: 38rpx;
	}

	.top .right .right-top .tel {
		font-size: 28rpx;
		line-height: 70rpx;
		margin-left: 10rpx;
	}

	.top .right .right-conter {

		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
		font-size: 24rpx;
		/* width: 85%; */
		color: #FFFFFF;
		/* 	opacity: .8; */

	}

	.top .right .right-conter .wx {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.top .right .right-conter .company {
		width: 55%;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}


	.top .right .right-bottom {

		width: 100%;
		font-size: 24rpx;
		color: #FFFFFF;
		/* opacity: .8; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.top .right .right-bottom .bianjie {
		border: 1rpx solid #FFFFFF;
		/* border-radius: 50rpx; */
		/*  */
		padding: 0rpx 20rpx;
		font-size: 24rpx;
		height: 36rpx;


	}

	.top .right .right-bottom .qianming {

		height: 70rpx;
		line-height: 70rpx;
		display: inline-block;
		white-space: nowrap;
		max-width: 73%;
		overflow: hidden;
		text-overflow: ellipsis;
		display: flex;
		flex-direction: row;
		justify-content: start;


	}

	.top .right .right-bottom .qianming .editdesribe {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
	}

	.top .right .right-bottom .qianming .editdesribe>input {
		background-color: #EEEEEE;
		color: #000000;


	}

	.advise .bottom {

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		color: #FFFFFF;
		/* opacity: .8; */
		font-size: 24rpx;
		width: 95%;
		margin: 30rpx 0rpx;
	}

	.advise .bottom>view {
		width: calc(100% / 3);
	}

	.advise .bottom .preview {
		border-right: 1rpx solid #95CAFF;

		display: flex;
		flex-direction: column;
		justify-content: start;

	}

	.advise .bottom .activity {
		border-right: 1rpx solid #95CAFF;
		display: flex;
		flex-direction: column;
		justify-content: start;
	}

	.advise .bottom .likes {
		display: flex;
		flex-direction: column;
		justify-content: start;
	}

	.advise .bottom>view text {
		color: #FEF11D;
		font-size: 32rpx;
		text-align: center;
		margin-bottom: 10rpx;
	}


	/* 标签 */

	.house-navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 95%;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		height: 52rpx;
	}

	.house-navbar .left {
		font-size: 40rpx;
		font-family: FZLanTingHei-L-GBK;
		font-weight: 549;
		color: rgba(0, 0, 0, 1);
		width: 25%;
	}

	.house-navbar .left>image {
		width: 100%;
		height: 45rpx;
	}

	.house-navbar .right {
		font-size: 26rpx;
		color: #6F6F6F;
	}

	/* end */
	/* 最新公告 */
	.con-conten {
		width: 95%;
		/* margin: 0rpx 15rpx; */
		border: 1rpx solid #EEEEEE;
		border-radius: 10rpx;
		/* padding: 25rpx 20rpx; */
		/* border: 15rpx ; */
		box-shadow: 4rpx 4rpx 0px rgba(0, 0, 0, 0.1)
	}

	.con-conten .title {
		font-size: 36rpx;
		font-weight: bold;
		color: #000000;
		margin: 10px 8px;
		/* text-align: center; */
	}

	.con-conten .contents {
		font-size: 28rpx;
		margin-top: 10rpx;
		margin: 10px 8px;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		color: rgba(56, 56, 56, 1);

	}

	/* end */
</style>
