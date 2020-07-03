<template>
	<view class="contens">
		<view class="navbar-content">
				<view class="navbar-item  item_zxs" v-for="(a,index) in seeklist" :key="index" >
					<view class="img" @click="detailstop(a.id)">
						<image :src="a.avatar"></image>
					</view>
					<view class="uname" @click="detailstop(a.id)"> {{a.user_nickname}}</view>
					<view class="num" v-if="seektype == 1 && a.service_number ">服务{{a.service_number}}人</view>
					<view class="num" v-if="seektype == 2">{{a.title}}</view>
					
					<view class="zx" @click="seekTop(a.id)">咨询</view>
				</view>
			</view>

	</view>
</template>

<script>
	import utils from '@/common/utils.filter.js'
	import con from '@/common/config.js'
	export default {
		props: {
			seeklist:{

			},
			seektype:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				utils: utils,

			};
		},
	


		methods: {
			detailstop(index) {
				console.log(index);
				uni.navigateTo({
						url:"../consultants/details?id="+index
				})
			},
			seekTop(index){
				uni.navigateTo({
					url:"../message/details?id="+index
				})
			
				
			}

		}

	}
</script>

<style>
	.contens {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.navbar-content {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		width: 95%;
	}

	.navbar-content .navbar-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		width: calc(100% / 3 - 23rpx);
		margin: 20rpx 9rpx;


	}

	.navbar-content .item_zxs {
		text-align: center;
		border: 1rpx solid #EEEEEE;
		box-shadow: 0rpx 2rpx 0px rgba(0, 0, 0, 0.1);
		padding-bottom: 50rpx;
	}

	.navbar-content .navbar-item image {
		width: 100%;
		height: 175rpx;
	}

	.navbar-content .navbar-item .img {
		margin-top: 50rpx;
		width: 100%;
	}

	.navbar-content .navbar-item .img image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;

	}

	.navbar-content .navbar-item .num {
		width: 100%;
		font-size: 24rpx;
		/* line-height: 60rpx; */
		margin-top: 20rpx;
		color: #7784B3;

	}

	.navbar-content .navbar-item .zx {
		padding: 0rpx 40rpx;
		color: #FFFFFF;
		background-color: #389BFE;
		border-radius: 25rpx;
		line-height: 45rpx;
		font-size: 26rpx;
		margin-top: 25rpx;

	}

	.navbar-content .navbar-item .uname {

		font-size: 32rpx;
		color: rgba(0, 0, 0, 1);
		font-weight: 500;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		margin-top: 20rpx;
	}




	/* end */
</style>
