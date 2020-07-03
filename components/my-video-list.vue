<template>
	<view class="contens">

		<view class="audio-list">
			<view class="audio-item" v-for="(a,index) in videolist" :key="index" >
				<view class="item-top" @click="housedetail(a.id)">
					<!-- <video class="img" :src="utils.siteBaseUrl(a.video)" object-fit="fill" play-btn-position="center" controls='false'
					 show-center-play-btn="false"></video> -->
				<image class="img" :src="[a.image?utils.siteBaseUrl(a.image):'../static/img.png']"></image>
				
				<view class="mask"></view>
				<image class="bofan" src="../static/play_btn.png"></image>
						
					<!-- 	<view class="name">
							{{a.properties_title}}
						</view> -->
				</view>
				<view class="item-title" @click="housedetail(a.id)">
					{{a.title}}
				</view>

				<view class="item-user">
					<image :src="a.avatar" mode=""></image>
					<view class="user-name">
						<view class="">
							{{a.user_nickname}}
						</view>
						<view class="company">
							<!-- {{a.company}} -->
						</view>
					</view>

				</view>
				<view class="item-bottom">
					<view class="">
						{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
					</view>
					<view class="z">
						<image v-if="a.is_fabulous == 0 ||a.is_fabulous == null" src="../static/praise_empty.png" @click="praisetop(index,a.id)"></image>
						<image v-else src="../static/praise.png" @click="nopraisetop(index,a.id)"></image>
						<view v-if="a.give">{{a.give}}</view>
					</view>
					<view class="">
						<image v-if="a.is_favorite == 0  || a.is_favorite == null " src="../static/collect.png" mode="" @click="collecttop(index,a.id)"></image>
						<image v-else src="../static/collected.png" mode="" @click="nocollecttop(index,a.id)"></image>
					</view>
					<!-- 	<view class="">
							<image src="../static/share2.png" mode=""></image>
						</view> -->

				</view>
			</view>

		</view>
		<!-- end -->
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		props: {
			videolist: {

			},
			houseid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				utils: utils,
				video: [],



			};
		},

		methods: {

			praisetop(index, id) {

				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: id,
						type: 2
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.$emit("send", index, 'is_fabulous')
									/* _seft.videolist[index].is_fabulous = 1
									_seft.videolist[index].count++ */

								}
							})

						}
					}

				})
			},
			nopraisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: id,
						type: 2
					},
					success: function(res) {
						var datas = res.data
						//console.log('楼盘动态', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.$emit("send", index, 'is_fabulous')
									/* 	_seft.videolist[index].is_fabulous = 0
										_seft.videolist[index].count-- */
								}
							})
						}
					}

				})
			},
			collecttop(index, id) {
				console.log('收藏', index)
				let _seft = this
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: id,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						console.log('shou', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.$emit("send", index, 'is_favorite')
									/* 	_seft.videolist[index].is_favorite = 1
										_seft.videolist[index].count++ */
									//	_seft.videolists(_seft.houseid)
								}
							})

						}
					}

				})
			},
			nocollecttop(index, id) {

				let _seft = this
				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: id,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						console.log('quxioa', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									/* 	_seft.videolist[index].is_favorite = 0
										_seft.videolist[index].count-- */
									_seft.$emit("send", index, 'is_favorite')
									//_seft.videolists(_seft.houseid)
								}
							})
						}
					}

				})
			},

			housedetail(index) {
				let _seft = this
				uni.navigateTo({
					url: '../shakehouse/video?id=' + index
				})
			},
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

	/* 专享视频 */

	.audio-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		flex-wrap: wrap;
		width: 95%;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.audio-list .audio-item {
		display: flex;
		flex-direction: column;
		justify-content: start; 
		align-items: center;
		width: 46%;
		margin-bottom: 50rpx;
		position: relative;
	
	}
	
	.audio-list .audio-item .item-top {
		/* height: 180rpx; */
		/* display: flex;
		flex-direction: column;
		justify-content: center;*/
		align-items: center; 
		width: 100%;
		position: relative;
	
	}
	
	.audio-list .audio-item .item-top .img {
		width: 100%;
		height: 215rpx;
		border-radius: 15rpx;
	
	}
	
	.audio-list .audio-item .item-top .bofan {
		width: 100rpx;
		height: 100rpx;
	position: absolute;
	z-index: 1;
	top: 50rpx;
	left: 35%;
		
	}
	
	
	.audio-list .audio-item .item-top .mask {
		position: absolute;
		background-color: #000000;
		opacity: .4;
		width: 100%;
		height: 215rpx;
		border-radius: 15rpx;
		top: 0;
	}
	
	.audio-list .audio-item .item-title {
		font-size: 30rpx;
		width: 95%;
		margin-top: 20rpx;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.audio-list .audio-item .item-price {
		font-size: 28rpx;
		color: #FFAB18;
		margin-top: 10rpx;
	}

	.audio-list .audio-item .item-price>text {
		color: #383838;
		margin-left: 10rpx;
		font-size: 24rpx;
	}

	.audio-list .audio-item .item-user {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 100%;
		font-size: 28rpx;
		margin-top: 10rpx;
	}


	.audio-list .audio-item .item-user>image {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.audio-list .audio-item .item-user>view {
		margin-left: 15rpx;
		color: #2A4D9C;
	}

	.audio-list .audio-item .item-user .company {
		color: #7784B3;
		font-size: 24rpx;
	}

	.audio-list .audio-item .item-address {
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	.audio-list .audio-item .item-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 10rpx;
	}

	/* 	.audio-list .audio-item .item-bottom .data {
			font-size: 24rpx;
			color: #7784B3;
		} */

	.audio-list .audio-item .item-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 24rpx;
		color: #7784B3;
	}

	.audio-list .audio-item .item-bottom .bf {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 30%;
	}

	.audio-list .audio-item .item-bottom .z {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 25%;
		margin-left: 15rpx;
	}

	.audio-list .audio-item .item-bottom image {
		width: 30rpx;
		height: 30rpx;
	}

	/* 		.audio-list .audio-item .item-bottom .bf>image {
			width: 30rpx;
			height: 30rpx;
		
		}
	
		.audio-list .audio-item .item-bottom .z>image {
			width: 30rpx;
			height: 30rpx;
		
		} */


	/* end */
</style>
