<template>
	<view class="contents">
		<view class="navbar-content-column">
			<view class="navbar-item" v-for="(item,index) in listHouse" :key="index"  @click="housedetail(item.id)" >
				<view class="item-left">
					<image   v-if="item.image" :src="utils.siteBaseUrl(item.image)"></image>
					<image   v-else src="../static/img.png"></image>
					<view class="eye" v-if="item.click !=null">
						<image src="../static/view.png"></image>
						<view>{{item.click}} </view>

					</view>
				</view>
				<view class="item-rigth">
					<view class="name">
						<view class="name-title">{{item.title}}</view>
						<view class="name-type" v-if="isshow==1">
							
							<view  class="zz"  v-if="item.type=='住宅'">{{item.type}}</view>
							<view  class="gy"  v-if="item.type=='公寓'">{{item.type}}</view>
							<view  class="sp"  v-if="item.type=='商铺'">{{item.type}}</view>
						<!-- 	<view class="zz" v-if="item.apartment==1">住宅</view>
							<view class="gy" v-if="item.apartment==2">公寓</view>
							<view class="sp" v-if="item.apartment==3">商铺</view> -->
						</view>

					</view>
					<view class="info">{{item.region_title}}<text v-if="item.apartment">/{{item.apartment_min}}-{{item.apartment}}居室</text></view>
					<view class="price">
						<view>{{item.price}}</view> <text>元/㎡</text>
					</view>
					<view class="label">
						
						<view  v-if="item.sale" :class="[item.sale=='在售'?'zs':'ds']">{{item.sale}}</view>
					<!-- 	<view class="zs" v-if="item.status==1">在售</view>
						<view class="ds" v-if="item.status==2">待售</view> -->
						<view class="type" v-if="item.type">{{item.type}}</view>
						<!-- <view class="vr">VR看房</view> -->
					</view>
				</view>
			</view>
	<!-- 	<uni-load-more :status="more"></uni-load-more> -->
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.filter.js'
	export default {

		props: {
			isshow: {
				type: Number,
				default: 1
			},
			listHouse: {

			}
		},
		data() {
			return {
				title: 'Hello',
				nametype: true,
				utils: utils,
			}
		},
		onLoad() {

		},
		methods: {
			housedetail(index) {
				console.log(index)
		
				uni.navigateTo({
					url: '../newshouse_details/index?id=' + index,
				})
			}

		}
	}
</script>

<style>
	.contents {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	/* 限时特惠 */

	.navbar-content-column {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
	}

	.navbar-content-column .navbar-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		/* width: calc(100% / 3 - 10rpx); */
		width: 100%;
		height: 180rpx;

	}

	.navbar-content-column .navbar-item .item-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 35%;
	}

	.navbar-content-column .navbar-item .item-rigth {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 62%;

	}


	.navbar-content-column .navbar-item .item-rigth view {
		margin-bottom: 5rpx;
	}


	.navbar-content-column .navbar-item .item-left image {
		width: 100%;
		height: 170rpx;
	}

	.navbar-content-column .navbar-item .item-rigth .name {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 1);
		/* font-weight: 550; */
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	
	}
	.navbar-content-column .navbar-item .item-rigth  .name .name-title{
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}
	.navbar-content-column .navbar-item .item-rigth .name .name-type {
		font-size: 22rpx;
		background-color: #F1F7FC;
		color: #389BFE;
		margin-left: 10rpx;
		

	}

	.navbar-content-column .navbar-item .item-rigth .name .gy {
		border: 1px solid #FE7995;
		padding: 5rpx 15rpx;
		background-color: #FFF0F0;
		color: #FE7995;
	}

	.navbar-content-column .navbar-item .item-rigth .name .zz {
		border: 1px solid #389BFE;
		padding: 5rpx 15rpx;
		background-color: #F1F7FC;
		color: #389BFE;
	}

	.navbar-content-column .navbar-item .item-rigth .name .sp {
		border: 1px solid #FFAB18;
		background-color: #FFF7E9;
		padding: 5rpx 15rpx;
		color: #FFAB18;

	}

	.navbar-content-column .navbar-item .item-rigth .price {
		display: flex;
		justify-content: start;
		height: 50rpx;
		width: 100%;
		line-height: 50rpx;
	}

	.navbar-content-column .navbar-item .item-rigth .price view {
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		font-size: 32rpx;
		color: #FFAB18;
		font-weight: 550;
	}

	.navbar-content-column .navbar-item .item-rigth .price text {
		margin-left: 10rpx;
		font-size: 22rpx;
		color: rgba(0, 0, 0, 1);
	}

	.navbar-content-column .navbar-item .item-left .eye {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		background-color: rgb(0, 0, 0, 0.3);
		margin-top: -35rpx;
		height: 35rpx;

	}

	.navbar-content-column .navbar-item .item-left .eye image {
		width: 32rpx;
		height: 20rpx;
	}

	.navbar-content-column .navbar-item .item-left .eye view {
		font-size: 19rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		color: #FFFFFF;
		margin-left: 5rpx;
	}

	.navbar-content-column .navbar-item .item-rigth .info {
		font-size: 22rpx;

	}

	.navbar-content-column .navbar-item .item-rigth .label {

		display: flex;
		justify-content: start;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		font-size: 22rpx;

	}

	.navbar-content-column .navbar-item .item-rigth .label view {
		background-color: #E7ECEE;
		margin-left: 10rpx;
		padding: 5rpx 15rpx;

	}

	.navbar-content-column .navbar-item .item-rigth .label .zs {
		background-color: #7DCC77;


	}

	.navbar-content-column .navbar-item .item-rigth .label .ds {
		background-color: #F1D934;

	}

	/* end */
</style>
