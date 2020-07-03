<template>
	<view class="content">

		<view class="navbar-content">
			<view class="navbar-item" v-for="(a,index) in Apartment" :key="index" @click="showimage(index)">
				<image :src="utils.siteBaseUrl(a.image)"></image>
				<view class="eye">
					<image src="../../static/view.png"></image>
					<view>{{a.click}} </view>
				</view>
				<view class="name door"> {{a.title}} </view>
			</view>
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
				Apartment: [], //户型图
				images: [],

			}
		},
		onLoad(e) {
			let _seft = this
			let houseid = e.id
			_seft.houseid = houseid
			//户型图
			con.sendRequest({
				url: '/home/Apartment/getShowList',
				method: 'get',
				data: {
					"id": houseid,
					is_all:1,
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						var image = []
						for (let i in restun) {
							if (restun[i]['image']) {
								image[i] = utils.siteBaseUrl(restun[i]['image'])
							}

						}
						console.log('image', image)
						_seft.Apartment = restun
						_seft.images = image

					}
				}

			})

		},
		methods: {
			showimage(index) {
				let _seft = this
				uni.previewImage({
					current: index,
					urls: _seft.images,
					indicator: 'number',
					loop: true,
					success: function(res) {
						console.log('调用成功', res)

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
		padding-bottom: 200rpx;
	}


	/* 户型图 */

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
		margin: 30rpx 10rpx;
		width: calc(100% / 3 - 20rpx);


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

		font-size: 35rpx;
		color: rgba(0, 0, 0, 1);
		font-weight: 500;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		margin-top: 20rpx;
	}

	.navbar-content .navbar-item .name {
		height: 60rpx;
		font-size: 29rpx;
		color: rgba(0, 0, 0, 1);
		/* font-weight: 550; */
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		line-height: 60rpx;
	}

	.navbar-content .navbar-item .price {
		display: flex;
		justify-content: start;
		height: 50rpx;
		width: 100%;
		line-height: 50rpx;
	}

	.navbar-content .navbar-item .price view {
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		font-size: 35rpx;
		color: #FFAB18;
		font-weight: 550;
	}

	.navbar-content .navbar-item .price text {
		margin-left: 10rpx;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 1);
	}

	.navbar-content .navbar-item .eye {
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

	.navbar-content .navbar-item .eye image {
		width: 32rpx;
		height: 20rpx;
	}

	.navbar-content .navbar-item .eye view {
		font-size: 20rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		color: #FFFFFF;
		margin-left: 5rpx;
	}

	.navbar-content .navbar-item .door {
		color: #383838 !important;
		font-size: 24rpx;
		opacity: .8;
	}

	/* end */



	/* 	.question {
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

	} */

	/* end */
</style>
