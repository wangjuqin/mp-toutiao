<template>
	<view class="content">
		<view class="navbar-top">
			<view class="">主营楼盘</view>
			<!--  -->
			<view class="img" v-if="shoptype == 1" @click="addhouse"> 添加
				<image src="../../static/upload.png" mode=""></image>
			</view>
		</view>

		<view class="navbar-content-column">
			<view class="navbar-item" v-for="(item,index) in listHouse" :key="index">
				<view class="item-left" @click="housedetail(item.id)">
					<image v-if="item.image" :src="utils.siteBaseUrl(item.image)"></image>
					<image v-else src="../../static/img.png"></image>
					<view class="eye" v-if="item.click !=null">
						<image src="../../static/view.png"></image>
						<view>{{item.click}} </view>

					</view>
				</view>
				<view class="item-rigth">
					<view class="name" @click="housedetail(item.id)">
						<view>{{item.title}}</view>
					</view>
					<view class="info" @click="housedetail(item.id)">{{item.region_title}}<text v-if="item.apartment">/{{item.apartment}}居室</text></view>
					<view class="price" @click="housedetail(item.id)">
						<view>{{item.price}}</view> <text>元/㎡</text>
					</view>
					<view class="label">
						<view v-if="item.sale" :class="[item.sale=='在售'?'zs':'ds']">{{item.sale}}</view>
						<!-- 	<view class="zs" v-if="item.status==1">在售</view>
						<view class="ds" v-if="item.status==2">待售</view> -->
						<view class="type" v-if="item.type">{{item.type}}</view>
						<image v-if="shoptype == 1" src="../../static/delect.png" @click="delecthouse(item.id)"></image>
						<!-- <image  v-else src="../../static/edit.png" @click="addhouse"></image> -->
					</view>
				</view>
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
				title: 'Hello',
				nametype: true,
				utils: utils,
				listHouse: [],
				shoptype: 0,
			}
		},
		onLoad() {


		},
		onShow() {
			con.usertype() //用户身份	
			let _seft = this
			_seft.houslisttop()
			_seft.shoptypeTap()
		},
		methods: {
			addhouse(index) {
				console.log(index)
				uni.navigateTo({
					url: '../searchhouse/index',
				})
			},
			houslisttop() {
				let _seft = this
				con.sendRequest({
					url: '/home/shop/getPropertiesList',
					method: 'get',
					success: function(res) {
						//	uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.listHouse = restun
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
							})
						}
					}

				})
			},
			housedetail(index) {

				uni.navigateTo({
					url: '../myhouse/index?id=' + index,
				})
			},
			delecthouse(index) {
				let _seft = this
				//实拍
				uni.showLoading({
					title: "删除中",
					mask:true
				})

				uni.showModal({
					title: '提示框',
					content: "确定删除楼盘实拍",
					success: function(res) {
						if (res.confirm) {
							con.sendRequest({
								url: '/home/shop/deleteProperties',
								method: 'get',
								data: {
									id: index
								},
								success: function(res) {
									uni.hideLoading()
									_seft.houslisttop()
									uni.showToast({
										title: "删除成功",
										icon: "none",
										duration: 1500
									})

								}

							})
						} else if (res.cancel) {
							uni.showToast({
								title: "取消删除",
								icon: "none",
								duration: 1500
							})
						}

					}

				})


			},
			shoptypeTap() {
				let _seft = this
				con.sendRequest({
					url: '/user/Shop/getType',
					method: 'get',
					success: function(res) {
						console.log('==============', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.shoptype = restun
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
							})
						}
						console.log('_seft.shoptype', _seft.shoptype)
					}

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

	.navbar-content-column .navbar-item .item-rigth .name .name-type {
		font-size: 22rpx;
		background-color: #F1F7FC;
		color: #389BFE;

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

	.navbar-content-column .navbar-item .item-rigth .label image {
		width: 45rpx;
		height: 45rpx;
		margin-left: 45%;
	}

	/* end */

	.navbar-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 52px;
		width: 95%;
	}

	.navbar-top view:nth-of-type(1) {
		font-size: 40rpx;
		font-family: FZLanTingHei-L-GBK;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		/* line-height:99px; */
		/* width: 80%; */
	}

	.navbar-top view:nth-of-type(2) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #6F6F6F;
	}

	.navbar-top view>image {
		width: 45rpx;
		height: 45rpx;
	}
</style>
