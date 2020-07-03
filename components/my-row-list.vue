<template>
	<view class="contens">
		<view class="navbar-content">
			<view class="navbar-items" v-for="(item,index) in listHouse" :key="index"  @click="housedetailtop(item.id)">
				<image  v-if="item.image" :src="utils.siteBaseUrl(item.image)"></image>
				<image  v-else  src="../static/img.png"></image>
				<view class="eye" v-if="item.click !=null">
					<image src="../static/view.png"></image>
					<view>{{item.click}} </view>

				</view>
				<view class="name"> {{item.title}}</view>
				<view class="price">
					<view> {{item.price}}</view> <text>元/㎡</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
		import utils from '@/common/utils.filter.js'
	export default {
		props: {
			listHouse:{
				
			}
		},
		data() {
			return {
				  utils: utils,
				
			};
		},
		methods: {
			housedetailtop(index){
				console.log(index);
				uni.navigateTo({
					url: '../newshouse_details/index?id='+index,
				})
			}
		
		}
		
	}
</script>

<style>
.contens{
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

	.navbar-content .navbar-items {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
		width: calc(100% / 3 - 20rpx);
		margin: 20rpx 10rpx;


	}


	.navbar-content .navbar-items image {
		width: 100%;
		height: 175rpx;
	}

	.navbar-content .navbar-items .img {
		margin-top: 50rpx;
		width: 100%;
	}

	.navbar-content .navbar-items .img image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;

	}


	.navbar-content .navbar-items .name {
	margin-top: 6rpx;
		font-size: 29rpx;
		color: rgba(0, 0, 0, 1);
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}

	.navbar-content .navbar-items .price {
		display: flex;
		justify-content: start;
		width: 100%;
		line-height: 50rpx;
	}

	.navbar-content .navbar-items .price view {
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		font-size: 35rpx;
		color: #FFAB18;
		font-weight: 550;
	}

	.navbar-content .navbar-items .price text {
		margin-left: 10rpx;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 1);
	}

	.navbar-content .navbar-items .eye {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		background-color: rgb(0, 0, 0, 0.3);
		/* opacity: 0.48; */
		margin-top: -35rpx;
		height: 35rpx;

	}

	.navbar-content .navbar-items .eye image {
		width: 32rpx;
		height: 20rpx;
	}

	.navbar-content .navbar-items .eye view {
		font-size: 20rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		color: #FFFFFF;
		margin-left: 5rpx;
	}

	.navbar-content .navbar-items .door {
		color: #383838 !important;
		font-size: 24rpx;
		opacity: .8;
	}
</style>
