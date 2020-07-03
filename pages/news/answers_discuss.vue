<template>
	<view class="content">
		<view class="box-top">
			<image  :src="answersdeta.avatar" mode=""></image>
		</view>
		<view class="artice">
			<view>
				<view class="title">
					{{answersdeta.title}}
				</view>
				<view class="contents">
					{{answersdeta.describe}}

				</view>

				<view class="prive-num">
					<view class="headerimg">
						<image v-for="(a,index) in anslist" :key="index" v-if="index < 4" :src="a.avatar"></image>
						<!-- <image src="../../static/banner.png"></image>
						<image src="../../static/banner.png"></image>
						<image src="../../static/banner.png"></image> -->
					</view>
					<view class="user-num">
						{{anslist.length}} 人围观
					</view>
				</view>

			</view>


		</view>
		<view class="house-navbar">
			<view class="left"> 最新回答</view>
		</view>

		<view class="advise">
			<view class="item" v-for="(a,index) in anslist" :key="index">
				<view class="left">
					<image :src="a.avatar"></image>
				</view>

				<view class="right">
					<view class="right-top">
						<view class="users">
							<view class="uname">{{a.user_nickname}}</view>
							<!-- <view class="address">优质房地产</view> -->
						</view>
						<!-- 	<view class="img">
							<image src="../../static/contact_normal.png"></image>
						</view>
						<view class="gd">
							...
						</view> -->
					</view>

					<view class="leav">
						{{a.content}}
					</view>
					<view class="bottom">
						<view class="data">
							{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
						</view>
						<view class="zan">
							<view class="shulaing">
								{{a.fabulous_number}}
							</view>
							<image v-if="a.is_fabulous == 0|| a.is_fabulous ==null" src="../../static/praise_empty.png" mode="" @click="praisetop(index,a.id)"></image>
							<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(index,a.id)"></image>
							<!-- 	<image src="../../static/MSG_empty.png" mode=""></image> -->

						</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 底部 -->
		<view class="flex-box">
			<view class="box-content">

				<input type="text" value="" @input="ttareatop" placeholder="我来说两句..." />

				<view class="" @click="commenttop">
					发送
				</view>

			</view>

		</view>
		<!-- end -->

		<!-- 浮框 -->
		<view class="fielx-box">
			<image src="../../static/share_btn_hover.png" mode=""></image>

		</view>
		<!-- end -->
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		data() {
			return {

				title: 'Hello',
				utils: utils,
				asid: '',
				answersdeta: '', //问答
				anslist: [], //回答列表
				ttarea:'',
				
			}
		},
		onLoad(e) {

			let _seft = this
			let asid = e.id
			_seft.asid = asid
			console.log(asid)
			con.sendRequest({
				url: '/home/Answer/getShowAnswer',
				method: 'GET',
				data: {id: asid},
				success: function(res) {
					var datas = res.data
					console.log(datas,'问答详情')
					if (datas.code == 1) {
						var restun = datas.data
						_seft.answersdeta = restun
					}
					//console.log('问答详情',datas)
				}
			})

			//问答列表
			con.sendRequest({
				url: '/home/shooting/commentList',
				method: 'GET',
				data: {
					id: asid,
					type: 6

				},
				success: function(res) {
					var datas = res.data

					if (datas.code == 1) {
						var restun = datas.data
						_seft.anslist = restun
					}
					console.log('评论列表', datas)
				}
			})


		},
		methods: {	
			//评论
			commenttop(){
				let _seft = this
				uni.showLoading({
					title:'评论中',
					mask:true
				})
				con.sendRequest({
					url: '/home/shooting/addComment',
					method: 'post',
					data: {
						id: _seft.asid,
						content:_seft.ttarea,
						type:6,
						parent_id:0
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						_seft.iscomm=0
						if (datas.code == 1) {
							uni.showToast({
								title:"评论成功",
								icon:"none",
								success() {
									uni.redirectTo({
										url:'answers_discuss?id='+_seft.asid
									})
								}
							})
				
						}else{
							uni.showToast({
								title:"评论失败"
							})
							
						}
					}
				})	
			},
		ttareatop(e){
				
				 this.ttarea = e.detail.value
				 
			},
			praisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'GET',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						var datas = res.data

						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
							})

							_seft.anslist[index].is_fabulous = 1
							_seft.anslist[index].fabulous_number = _seft.anslist[index].fabulous_number + 1

						}
						//console.log('问答详情',datas)
					}
				})
			},
			nopraisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'GET',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
							})
							_seft.anslist[index].is_fabulous = 0
							_seft.anslist[index].fabulous_number = _seft.anslist[index].fabulous_number - 1

						}
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
		padding-bottom: 200rpx;
	}

	.box-top {
		width: 100%;
	}

	.box-top>image {
		width: 100%;
		height: 350rpx;

	}

	.artice {
		margin-top: -250rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 95%;
		border-box-top-left-radius: 20rpx;
		border-box-top-right-radius: 20rpx;
		background-color: #FFFFFF;
	}

	.artice>view {

		width: 92%;
	}

	.artice .title {
		font-size: 36rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-family: FZLTXIHK--GBK1-0;
		/* font-weight: 550; */
		/* width: 100%; */

	}

	.artice .contents {
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
		align-items: center;
		/* 	width: 97%; */
	}

	.artice .contents>view {
		width: 100%;
	}

	/* 	.box-center{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 95%;
		align-items: center;
	} */
	.artice .prive-num {
		margin-top: 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
	}

	.artice .prive-num .headerimg {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 35%;
	}

	.artice .prive-num .headerimg>image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}

	.artice .prive-num .user-num {
		margin-left: 20rpx;
		color: #6F6F6F;
		font-size: 24rpx;
		line-height: 50rpx;
		width: 100%;
	}

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
	}



	.advise {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		/* align-items: center; */
		/* text-align: center; */
		/* background-color: #007AFF; */
		width: 95%;
		border-radius: 15rpx;
		margin: 20rpx 0rpx;
		/* border: 1rpx  solid #EEEEEE;
			border-top: 0rpx; */
		/* 	box-shadow: 4rpx 4rpx 0px rgba(0, 0, 0, 0.1) */


	}

	.advise .item {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		margin-item: 30rpx;
		width: 100%;

	}

	.item .left {
		width: 20%;
		height: 100%;
	}

	.item .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item .right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		align-items: center;
		height: 100%;
		width: 90%;

	}

	.item .right .right-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

	}

	.item .right .right-top .users {

		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}

	.item .right .right-top .users .uname {
		font-size: 32rpx;
		width: 100%;
		color: #2A4D9C;

	}

	.item .right .right-top .users .address {
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #9A9A9A;
		width: 100%;

	}


	.item .right .right-top .img {
		width: 48%;

	}

	.item .right .right-top .img>image {

		width: 160rpx;
		height: 46rpx;
		background-color: #EEF6FE;
		/* border-radius: 50%; */
		/* padding: 15rpx; */

	}

	.item .right .right-top .gd {
		color: #BFC4D9;
		/* text-align: right; */
	}

	.item .right .leav {
		font-size: 26rpx;
		margin-top: 10rpx;

	}

	.item .right .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;

	}

	.item .right .bottom .data {
		font-size: 24rpx;
		color: #BFC4D9;
	}

	.item .right .bottom .zan {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* width: 25%; */
	}

	.item .right .bottom .zan .shulaing {
		font-size: 24rpx;
		color: #BFC4D9;

	}

	.item .right .bottom .zan>image {
		width: 40rpx;
		height: 40rpx;
	}

	/* 底部 */
	.flex-box {
		border-top: 2rpx solid #D5D7E6;
		width: 100%;
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #FFFFFF;
		bottom: 0rpx;
		z-index: 2;

	}

	.flex-box .box-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* text-align: center; */
		width: 90%;
		margin: 15rpx 0rpx;
		font-size: 30rpx;

	}

	.flex-box .box-content>input {
		background-color: #EFF0F5;
		font-size: 30rpx;
		width: 85%;
		height: 60rpx;
		border-radius: 25rpx;
		/* text-align: center; */
	}

	.flex-box .box-content>view {
		font-size: 34rpx;
		color: #389BFE;

	}

	.fielx-box {
		position: fixed;
		bottom: 250rpx;
		right: -10rpx;

	}

	.fielx-box>image {
		width: 170rpx;
		height: 60rpx;
	}

	/* end */
</style>
