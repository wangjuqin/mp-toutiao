<template>
	<view class="content">
		<view class="top">
			<view class="scroll-view">
				<navigator class="scroll-view-item  active" url="../info_asklist/index">我的提问 </navigator>
				<navigator class="scroll-view-item " url="../info_answerlist/index"> 我的回答 </navigator>
				<navigator class="scroll-view-item " url=""> 订阅问题 </navigator>
			</view>
		</view>
		<view class="img">
			<image src="../../static/warning.png" mode=""></image>

		</view>

		<button type="primary">我也要提问</button>
		<button type="primary"  class="answers-button"  >查看精选问题</button>


<view class="bottom">
	行业专家将为您答疑解惑
</view>
	</view>

</template>

<script>
	export default {

		data() {
			return {
				title: 'Hello',

			}
		},
		onLoad() {

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

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #EEF6FE;
		width: 100%;
		/* padding-bottom: 20rpx; */
	}

	/* 咨询分类 */

	.active {
		line-height: 90rpx;
		font-size: 32rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;
		/* width: 57%; */
	}

	.scroll-view {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		/* white-space: nowrap;
		width: 95%; */
		width: 95%;
	}


	.scroll-view-item {
		display: inline-block;
		color: #606060;
		line-height: 90rpx;
		text-align: center;
		font-size: 26rpx;
		/* margin-left: 50rpx; */
		width: 20%;
	}

	/* end */
	  .img{
		 width: 95%;
		 text-align: center;
		 margin: 80rpx 0rpx;
	  }
	  .img>image{
		  width: 50%;
		  height: 150rpx;
	  }
	button{
		margin-top: 50rpx;
		width: 90%;
		/* height: 100rpx; */
		background-color: #389BFE !important;
		color: #FFFFFF !important;
		font-size: 32rpx;
		text-align: center;
		border:  1rpx solid #A9BCFD;
	}
	.answers-button{
		background-color: #FFFFFF !important; 
		color: #389BFE !important;
		
	}
	.bottom{
		margin-top: 40rpx;
		font-size: 28rpx;
		color: #606060;
		text-align: center;
		width: 95%;
	}
</style>
