<template>
	<view class="uni">
		<!-- 顾问信息 -->
		<view class="advise" v-for="(a,item) in listFollow" :key="item">
			<view class="item">
				<!-- @click="detailstop(a.id)" -->
				<view class="left" @click="detailstop(a.user_id)">
					<image v-if="a.avatar" :src="a.avatar"></image>
					<image v-else src="../../static/img.png"></image>
					<view class="uname" v-if="a.name">{{a.name}}</view>
				</view>
				<!--  @click="detailstop(a.id)" -->
				<!-- <view class="conter">
						<view class="uname" v-if="a.name">{{a.name}}</view>
						<view class="address" v-if="a.company">{{a.company}}</view>
				</view> -->
				<view class="right">
					<image src="../../static/MSG.png" @click="seekTop(a.id)"></image>
					<image src="../../static/tel.png" @click="teltop(a.phone)"></image>
				</view>
			</view>
			<view class="bottom">
				<view class="preview"><text v-if="a.click">{{a.click}}</text> 浏览量 </view>
				<view class="activity"> <text v-if="a.activity"> {{a.activity}}</text> 活跃度</view>
				<view class="likes"> <text v-if="a.likes">{{a.likes}}</text> 点赞数</view>
			</view>
		</view>

		<!-- end -->

		<view class="flex-box">
			<image src="../../static/home_btn.png" mode="" @click="Hometop"></image>

		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: 'Hello',
				listFollow: [],
			}
		},
		onLoad() {
			let _seft = this
			//关注
			/* 		con.sendRequest({
						url: '/home/shop/listFollow',
						method: 'get',
						success: function(res) {
						
							var datas = res.data
								console.log('listFollow', datas)
							if (datas.code == 1) {
								var restun = datas.data
								_seft.listFollow = restun
							}

						}

					}) */
		},
		onShow() {
			//con.usertype() //用户身份	
			let _seft = this
			//关注
			con.sendRequest({
				url: '/home/shop/listFollow',
				method: 'get',
				success: function(res) {

					var datas = res.data
					console.log('listFollow', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.listFollow = restun
					}

				}

			})
		},
		methods: {
			teltop(index) {
				uni.makePhoneCall({
					phoneNumber: index,
					success(res) {
						console.log(res)
					}
				})
			},
			Hometop() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			seekTop(index) {
				uni.navigateTo({
					url: "../message/details?id=" + index
				})
			},
			detailstop(index) {
				console.log(index)
				uni.navigateTo({
					url: "../consultants/details?id=" + index
				})
			},

		}
	}
</script>

<style>
	/* 顾问信息 */
	.uni {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-bottom: 200rpx;
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
		border: 1rpx solid #EEEEEE;
		border-top: 0rpx;
		box-shadow: 0rpx 4rpx 0px rgba(0, 0, 0, 0.1)
	}

	.advise .item {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		/* align-items: center; */
		/* text-align: center; */
		/* height: 200rpx; */
		margin-item: 30rpx;
		width: 100%;

	}

	.item .left {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 70%;
		height: 100%;
	}

	.item .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item .conter {

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		height: 100%;

	}

	.item .left .uname {
		font-size: 39rpx;
		/* width: 100%; */
		margin-left: 10rpx;

	}

	.item .conter .address {
		margin-top: 10rpx;
		font-size: 26rpx;
		color: #7784B3;
		width: 100%;
	}


	.item .right {

		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 25%;
		/* width: 30%;
	line-height: 70rpx; */
	}

	.item .right image {
		width: 50rpx;
		height: 50rpx;
		background-color: #EEF6FE;
		border-radius: 50%;
		padding: 15rpx;

	}

	.item .right .icon image {}

	.advise .bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		color: #7784B3;
		opacity: .7;
		font-size: 24rpx;
		width: 100%;
		margin-bottom: 30rpx;
		margin-top: 20rpx;
	}

	.advise .bottom text {
		color: #7784B3;
	}


	/* end */


	.flex-box {
		position: fixed;
		right: 0rpx;
		z-index: 2;
		bottom: 150rpx;
	}

	.flex-box>image {
		width: 180rpx;
		height: 70rpx;
	}
</style>
