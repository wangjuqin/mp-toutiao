<template>
	<view class="content">


		<!-- 			<view class="consult">
				<image src="../../static/logo.png" mode=""></image>
			 <view>  咨询我，了解更多楼盘信息立即咨询</view>
			</view> -->
		<view class="dy-list">
			<view class="dy-item" v-for="(a,index) in Dynamic " :key='index'>
				<view class="dy-item-left">
					<view class="spot"></view>
					<!-- 	<view class="line"></view> -->
				</view>
				<view class="dy-item-right">
					<view class="dy-item-top">
						<view class="dates">
							{{utils.timeTodate('Y-m-d', a.create_time*1000) }}
						</view>

					</view>

					<view class="dy-item-cen">
						{{a.title}}

					</view>
					<view class="dy-item-bot">
						<jyf-parser :html="a.content" ref="article" class="rich-text"></jyf-parser>
						<!-- <rich-text :nodes="a.content"></rich-text> -->
					</view>

				</view>



			</view>

		</view>


		<view class="question">
			<navigator hover-class="none" class="question-btn" url="../info_ask/index">
				订阅动态
			</navigator>
		</view>


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
				houseid: '',
				Dynamic: [],
			}
		},
		onLoad(e) {
			let _seft = this
			let houseid = e.id
			_seft.houseid = houseid
			_seft.Dynamiclist()


		},
		methods: {
			Dynamiclist() {
				//楼盘动态

				let _seft = this
				con.sendRequest({
					url: '/home/Dynamic/getShowList',
					method: 'get',
					data: {
						id: _seft.houseid,
						is_all: 1
					},
					success: function(res) {
						var datas = res.data
						console.log('楼盘动态', datas)
						if (datas.code == 1) {
							var restun = datas.data
							_seft.Dynamic = restun
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
		width: 100%;
		padding-bottom: 200rpx;
	}


	.dy-list {
		display: flex;
		flex-direction: column;

		justify-content: center;
		width: 95%;
		margin: 30rpx 0rpx;
	}

	.dy-list .dy-item {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin: 30rpx 0rpx;
	}

	.dy-list .dy-item .dy-item-left {
		display: flex;
		flex-direction: column;

	}

	.dy-list .dy-item .dy-item-left .spot {
		background-color: #5A6B9C;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
	}

	/* .dy-list .dy-item  .dy-item-left .line{
	background-color: #EEEEEE;
	text-align: center;
	width: 25rpx;
	
} */

	.dy-list .dy-item .dy-item-right {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: start;
		margin-left: 25rpx;
	}

	.dy-list .dy-item .dy-item-right .dy-item-top {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
	}

	.dy-list .dy-item .dy-item-right .dy-item-top .dates {

		color: #57656E;
		font-size: 26rpx;
		margin-left: 30rpx;
	}

	.dy-list .dy-item .dy-item-right .dy-item-cen {
		width: 100%;
		font-weight: bold;
		font-size: 34rpx;
		margin: 15rpx 0rpx;
	}

	.dy-list .dy-item .dy-item-right .dy-item-bot {
		width: 100%;
		font-size: 30rpx;
		margin: 15rpx 0rpx;
	}

	.consult {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 95%;
		margin-top: 50rpx;
	}

	.consult>image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.consult>view {
		width: 80%;
		background-color: #0066CC !important;
		color: #FFFFFF !important;
		border-radius: 15rpx;
	}

	.question {
		display: flex;
		position: fixed;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		bottom: 50rpx;
		align-items: center;
		text-align: center;

	}

	.question .question-btn {
		width: 45%;
		background-color: #FF7546;
		font-size: 36rpx;
		line-height: 90rpx;
		color: #FFFFFF;
		border-radius: 50rpx;

	}
</style>
