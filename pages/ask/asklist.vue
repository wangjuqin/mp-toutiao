<template>
	<view class="content">

		<view class="houser-trends">
		<view class="trends-item" v-for="(a,index) in Problem" :key="index">
			<image src="../../static/question.png" mode=""></image>
			<view class="trends">
				<view class="title">
					{{a.title}}
				</view>
				<view class="contents">
					{{a.describe}}
		
				</view>
				<view class="data">
					<view class="">
						{{utils.timeTodate('Y-m-d H:i:s',a.create_time*1000)}}
		
					</view>
					<!-- <view class="img">
						<image class="MSG_empty" src="../../static/MSG_empty.png" mode=""></image>
						<view>{{a.count}}</view>
					</view> -->
				</view>
			</view>
		
		
		</view>
		</view>

		<view class="question">
			<navigator hover-class="none" class="question-btn" url="../info_ask/index">
				我要提问
			</navigator>
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
				Problem:[],
				utils:utils
				

			}
		},
		onLoad(e) {
			let _seft = this
			//问专家
			con.sendRequest({
				url: '/home/Answer/getShowList',
				method: 'get',
				data: {
					"id": e.id,
					is_all:1
				},
				success: function(res) {
					var datas = res.data
					//console.log('问专家', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Problem = restun
					}
				}
			})

		},
		methods: {

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

	/* 楼盘动态 */
	.houser-trends {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
	}

	.houser-trends .trends-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* 	align-items: center; */
		width: 100%;
		margin: 50rpx 0rpx;
	}

	.houser-trends .trends-item>image {
		width: 55rpx;
		height: 55rpx;
	}

	.houser-trends .trends-item .MSG_empty {
		width: 35rpx !important;
		height: 35rpx !important;
		margin-right: 20rpx;
	}

	.houser-trends .trends-item .trends {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 86%;

	}

	.houser-trends .trends-item .trends .title {
		font-size: 32rpx;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
	}

	.houser-trends .trends-item .trends .contents {
		font-size: 26rpx;
		color: #9A9A9A;

		width: 100%;
		margin-top: 15rpx;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.houser-trends .trends-item .data {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 26rpx;
		color: #9A9A9A;
		margin-top: 15rpx;
	}

	.houser-trends .trends-item .data .img {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.houser-trends .trends-item .data .img>image {
		width: 40rpx;
		height: 40rpx;
	}

	.houser-trends .trends-item .data .img>view {
		line-height: 40rpx;
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

	/* end */
</style>
