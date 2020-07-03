<template>
	<view class="content">
		<view class="uni-card" v-if="amount">
			<view class="headerimg">
				<image src="../../static/money.png" mode=""></image>
				<view class="">
					{{amount.balance}} 元
				</view>
			</view>
			<!-- <view class="username">
				{{cards.name}}
			</view> -->
			<view class="user-message">
				<view class="wx">

					<view class="">
						可提现
					</view>
					<view>
						<image src="../../static/money2.png" mode=""></image>
						<view class="">
							{{amount.withdrawal}} 元
						</view>
					</view>
				</view>
				<view class="tel">
					<view class="">
						已提现
					</view>
					<view>
						<image src="../../static/pic13.png" mode=""></image>
						<view class="">
							{{amount.already_withdrawal}} 元
						</view>
					</view>
				</view>

			</view>

			<view class="borer-line">

			</view>
			<view class="company">
				收益明细
			</view>
			<view class="user-message">
				<view class="">
					<view class="">
						文章收益
					</view>
					<view>￥{{amount.article_amount}}元</view>
				</view>
				<view class="">
					<view class="">
						视频收益
					</view>
					<view>￥ {{amount.video_amount}} 元</view>
				</view>

			</view>

			<view class="card-bottom" @click="cashTop">
				申请提现

			</view>

		</view>

	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '我的名片',
				utils: utils,
				amount: '',
			}
		},
		onLoad() {
			let _seft = this

			//我的名片
			con.sendRequest({
				url: '/home/index/amount',
				method: 'get',
				success: function(res) {
					console.log('我的名片', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.amount = restun
					}

				}

			})
		},
		onShow() {
		con.usertype() //用户身份	
		},
		onUnload(){
			let _seft  = this
			console.log('onUnload')
			uni.switchTab({
				url:'../myinfo/index'
			})
		},
		methods: {
			cashTop() {
				uni.navigateTo({
					url: "./cash"
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #389AFD;
		padding-bottom: 200rpx;
	}

	.uni-card {
		width: 95%;
		background-color: #FFFFFF;
		margin-top: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;



	}

	.uni-card .borer-line {
		background-color: #BCC2E6;
		height: 1rpx;

	}


	.uni-card .headerimg {
		/* margin-top: -90rpx; */
		margin-top: 50rpx;
		font-weight: bold;
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: center;
		font-size: 36rpx;

	}

	.uni-card .headerimg>image {
		width: 65rpx;
		height: 65rpx;
		margin-right: 10rpx;

	}


	.uni-card>view {
		margin: 0rpx 30rpx 30rpx 30rpx;


	}

	.uni-card .user-message {
		font-size: 29rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;


	}

	.uni-card .user-message .wx>view:nth-of-type(1) {
		font-size: 32rpx;
		color: #BCC2E6;
	}

	.uni-card .user-message .tel>view:nth-of-type(1) {
		font-size: 32rpx;
		color: #BCC2E6;
	}

	.uni-card .user-message>view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.uni-card .user-message>view view:nth-of-type(2) {
		margin-top: 10rpx;
		align-items: center;
		display: flex;
	}

	.uni-card .company {
		font-size: 29rpx;

	}

	.uni-card .user-message image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.uni-card .qianming {
		font-size: 29rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
	}

	.uni-card .qianming .qianming-content {

		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.uni-card .qianming .label {

		width: 20%;
	}

	.prive {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30rpx;
		padding-bottom: 90rpx;
	}

	.prive .border-right {
		border-right: 2rpx solid #95CAFF;
	}

	.prive .prive-item {
		font-size: 29rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

		align-items: center;

		width: 30%;
	}

	.prive .prive-item .num {
		color: #FFB608;
		font-size: 32rpx;
		line-height: 90rpx;
	}

	.card-bottom {
		background-color: #389BFE;
		font-size: 34rpx;
		width: 90%;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50rpx;
		/* 	margin-top: -45rpx; */
		border: 1rpx solid #FFFFFF;
		line-height: 90rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.card-bottom>view {
		width: 75%;
		margin-left: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
	}
</style>
