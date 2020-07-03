<template>
	<view class="conten">

		<view class="navbar-top">
			<view class="">主营楼盘</view>
			<!-- <view class="img" @click="addhouse"> 添加
				<image src="../../static/upload.png" mode=""></image>
			</view> -->
		</view>


		<view class="navbar-content-column">
			<view class="navbar-item" v-if="Housedata" @click="housedetail(Housedata.id)">
				<view class="item-left">
					<image v-if="Housedata.image" :src="utils.siteBaseUrl(Housedata.image)"></image>
					<image v-else src="../../static/img.png"></image>
					<view class="eye" v-if="Housedata.click !=null">
						<image src="../../static/view.png"></image>
						<view>{{Housedata.click}} </view>

					</view>
				</view>
				<view class="item-rigth">
					<view class="name">
						<view>{{Housedata.title}}</view>
					</view>
					<view class="info">{{Housedata.region_title}}<text v-if="Housedata.apartment">/{{Housedata.apartment}}居室</text></view>
					<view class="price">
						<view>{{Housedata.price}}</view> <text>元/㎡</text>
					</view>
					<view class="label">
						<view v-if="Housedata.sale" :class="[Housedata.sale=='在售'?'zs':'ds']">{{Housedata.sale}}</view>

						<view class="type" v-if="Housedata.type">{{Housedata.type}}</view>

					</view>
				</view>
			</view>
		</view>


		<view class="navbar-top">
			<view class="">现场实拍</view>
			<view class="img" @click="addshoting"> 添加
				<image src="../../static/upload.png" mode=""></image>
			</view>
		</view>

		<view class="advise" v-if="shooting.length > 0">
			<view class="item" v-for="(a,index) in shooting" :key="index">
				<view class="left">
					<image :src="a.avatar"></image>
				</view>

				<view class="right">
					<!--  @click="sceneshot" -->
					<view class="right-top" @click="sceneshot(a.id)">
						<view class="users">
							<view class="uname">{{a.user_nickname}}</view>
							<view class="address">{{utils.timeTodate('Y-m-d H:i',a.create_time*1000)}}</view>
						</view>
						<!-- <view class="img" >
							<image src="../../static/contact_normal.png"></image>
						</view> -->

					</view>

					<view class="leav" @click="sceneshot(a.id)">
						{{a.content}}

					</view>
					<view class="house-img">
						<image :src="utils.siteBaseUrl(img)" mode="" v-for="(img,indexs) in JSON.parse(a.images)" :key="indexs"></image>
					</view>

					<view class="bottom">
						<view class="data">

						</view>
						<view class="zan">
							<!-- 	<view class="shulaing">
							{{a.give}}
						</view> -->
							<!-- <image src="../../static/praise_empty.png" mode=""></image> -->
							<!-- 	<image v-if="a.is_fabulous == 0" src="../../static/praise_empty.png" mode="" @click="praisetop(a.id,6)"></image>
						<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(a.id,6)"></image>
	 -->
							<image src="../../static/delect.png" mode="" @click="delectshoot(a.id)"></image>

						</view>
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
				utils: utils,
				shooting: [],
				limits: 5,
				pages: 1,
				ismor: 1,
				housid: '',
				Housedata: '',

			};
		},
		onLoad(e) {
			let _seft = this
			_seft.housid = e.id

		},

		onShow() {
			con.usertype() //用户身份
			let _seft = this
			_seft.commentlists()
			_seft.housdetailstop()
		},


		methods: {
			housdetailstop() {
				let _seft = this
				con.sendRequest({
					url: '/home/Properties/getShow',
					method: 'get',
					data: {
						id: _seft.housid,

					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.Housedata = restun
							console.log('详情', _seft.Housedata)

						}
					}

				})
			},

			commentlists() {
				let _seft = this
				//实拍
				con.sendRequest({
					url: '/home/shooting/getShowList',
					method: 'get',
					data: {
						id: _seft.housid,
						is_all: 1
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.shooting = restun
							console.log('实拍', _seft.shooting)

						}
					}

				})
			},
			addshoting() {
				let _seft = this
				uni.navigateTo({
					url: 'real?id=' + _seft.housid,
				})

			},
			delectshoot(index) {
				let _seft = this
				//实拍
				uni.showModal({
					title: '提示框',
					content: "确定删除楼盘实拍",
					success: function(res) {
						if (res.confirm) {
							con.sendRequest({
								url: '/home/shop/deleteShooting',
								method: 'get',
								data: {
									id: index
								},
								success: function(res) {
									uni.hideLoading()
									_seft.commentlists()
									uni.showToast({
										title: "删除成功",
										icon: "none",
									})
							
								}
							
							})
						} else if (res.cancel) {
							uni.showToast({
								title: "取消删除",
								icon: "none",
							})
						}

					}

				})


			},
			housedetail(index) {
				console.log(index)

				uni.navigateTo({
					url: '../newshouse_details/index?id=' + index,
				})
			},
			sceneshot(index) {

				let _seft = this
				uni.navigateTo({
					url: '../sceneshot_detail/index?id=' + index + '&houseid=' + _seft.housid
				})

			},

		}

	}
</script>

<style>
	.conten {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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

	/* 现实实拍 */

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

		justify-content: start;
		/* 	align-items: center; */
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
		font-size: 24rpx;
		color: #9A9A9A;
		width: 100%;

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
		font-size: 29rpx;
		margin-top: 10rpx;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

	}

	.item .right .house-img {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
	}

	.item .right .house-img>image {
		width: calc(100% / 3 - 15rpx);
		margin: 0rpx 7rpx;
		height: 130rpx;
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

	}

	.item .right .bottom .zan .shulaing {
		font-size: 24rpx;
		color: #BFC4D9;

	}

	.item .right .bottom .zan>image {
		width: 45rpx;
		height: 45rpx;
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
		font-size: 29rpx;
		color: #6F6F6F;
	}

	.navbar-top view>image {
		width: 45rpx;
		height: 45rpx;
	}
</style>
