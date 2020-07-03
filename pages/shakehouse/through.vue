<template>
	<view class="content">
		<view class="top">
			<!-- 搜索框 -->
			<view class="search">
				<view class="searchbar">
					<icon class="searchicon" type="search" size="16"></icon> <input class="searchtext" type="text" :value="keyword"
					 @input="keywordTap" placeholder="请输入搜索关键字" />
				</view>
			</view>
			<!-- end -->
			<view class="scroll-views" scroll-x="true" @scroll="scroll" scroll-left="0">
				<view class="scroll-views-item  " :class="video==1?'active':''" @click="nabhouse(1)">楼盘直达</view>
				<view class="scroll-views-item " :class="video==2?'active':''" @click="nabhouse(2)"> 房产知识 </view>
			</view>

		</view>



		<!-- 视频 -->


		<block v-if="video==1">
			<view class="audio-list" v-if="videolist.length > 0">
				<view class="audio-item" v-for="(a,index) in videolist" :key="index">
					<view class="item-top" @click="housedetail(a.id)">
						<!-- <video class="img" :src="utils.siteBaseUrl(a.video)" object-fit="fill" play-btn-position="center" controls='false'
						 show-center-play-btn="false" muted='true' show-play-btn="false" show-fullscreen-btn="false"></video> -->
						<image class="img" :src="[a.image?utils.siteBaseUrl(a.image):'../../static/img.png']"></image>
						<image class="bofan" src="../../static/play_btn.png"></image>
						<view class="mask"></view>
						<!-- 	<view class="name">
								{{a.properties_title}}
							</view> -->
					</view>
					<view class="item-title">
						{{a.title}}
					</view>
					<view class="item-address">
						{{a.properties_title}}
					</view>
					<view class="item-price">
						{{a.price}}<text>元 / m² </text>
						<text>{{a.area_title}} / {{a.apartment}}室 </text>

					</view>

					<view class="item-user" @click="consultantsTop(a.shop_id)">
						<image :src="a.avatar" mode=""></image>
						<view class="user-name">
							<view class="">
								{{a.user_nickname}}
							</view>
							<view class="company" v-if="a.company">
								<!-- {{a.company}} -->
							</view>
						</view>

					</view>
					<view class="item-bottom">
						<view class="bf">
							<image src="../../static/video.png"></image>
							<view v-if="a.click">{{a.click}}</view>
						</view>
						<view class="z">
							<image v-if="a.is_fabulous == 0 ||a.is_fabulous == null" src="../../static/praise_empty.png" @click="praisetop(index,a.id)"></image>
							<image v-else src="../../static/praise.png" @click="nopraisetop(index,a.id)"></image>
							<view v-if="a.count">{{a.count}}</view>
						</view>
					</view>
				</view>

			</view>
		</block>
		<!-- 视频 -->
		<block v-if="video==2">
			<view class="audio-list" v-if="videolist.length > 0">
				<view class="audio-item" v-for="(a,index) in videolist" :key="index">
					<view class="item-top" @click="housedetail(a.id)">
						<!-- 	<video class="img" :src="utils.siteBaseUrl(a.video)" object-fit="fill" play-btn-position="center" controls='false' 
						 show-center-play-btn="false" muted='true' show-play-btn="false" show-fullscreen-btn="false"></video>
						 -->
						
						<image class="img" :src="[a.image?utils.siteBaseUrl(a.image):'../../static/img.png']"></image>
						 <image  class="bofan" src="../../static/play_btn.png" mode=""></image>
						<view class="mask"></view>
					</view>
					<view class="item-title">
						{{a.title}}
					</view>
					<!-- 	<view class="item-price">
				{{a.price}}<text>元 / m² </text>
			</view> -->
					<!-- 	<view class="item-address">
				{{a.area_title}} / {{a.apartment}}
			</view> -->
					<view class="item-user" @click="consultantsTop(a.shop_id)">
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
						<view class="bf">
							<image src="../../static/video.png"></image>
							<view v-if="a.click">{{a.click}}</view>
						</view>
						<view class="z">
							<image v-if="a.is_fabulous == 0 ||a.is_fabulous == null" src="../../static/praise_empty.png" @click="praisetop(index,a.id)"></image>
							<image v-else src="../../static/praise.png" @click="nopraisetop(index,a.id)"></image>
							<view v-if="a.count">{{a.count}}</view>
						</view>
					</view>
				</view>

			</view>
		</block>
		<!-- end -->


		<!-- end -->


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
				activeTab: 0,
				video: 1,
				pages: 1,
				limits: 4,
				keyword: '',
				videolist: [],
			}
		},
		onLoad() {
			let _seft = this

			_seft.videolist = []
			_seft.pages = 1
			_seft.videolists()


		},
		onShow() {
			if (!uni.getStorageSync('sessionKey')) {
				uni.showToast({
					title:'请先登录',
					duration:1000,
					mask:true,
					success() {
						uni.switchTab({
							url: "/pages/myinfo/index"
						})
					}
				})
					
					return false
				}
			
		},

		onReachBottom() {
			let _seft = this
			_seft.pages++
			_seft.videolists()


		},
		/* 	onShow() {
				let _seft = this
				_seft.videolist= []
				_seft.pages = 1
				_seft.videolists()
			}, */

		methods: {
			nabhouse(index) {
				let _seft = this
				_seft.videolist = []
				_seft.pages = 1
				_seft.keyword = ''
				//楼盘直达
				switch (index) {
					case 1:
						this.video = index
						break;
					case 2:
						this.video = index
						break;
				}
				_seft.videolists()
			},
			housedetail(index) {
				let _seft = this
				uni.navigateTo({
					url: '../shakehouse/video?id=' + index + '&type=' + _seft.video
				})
			},
			videolists() {
				let _seft = this
				//楼盘直达
				con.sendRequest({
					url: '/home/video/getShake',
					method: 'get',
					data: {
						keyword: _seft.keyword,
						type: _seft.video,
						p: _seft.pages,
						limit: _seft.limits,

					},
					success: function(res) {
						var datas = res.data
						console.log('楼盘直达', datas)
						if (datas.code == 1) {
							var restun = datas.data
							_seft.videolist = _seft.videolist.concat(restun)
							/* if(restun.length > 0){
								
							}else{
								uni.showToast({
									title:'没有更多了',
									icon:"none",
									duration:2000
								})
							} */
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000
							})
						}
					}
				})
			},

			praisetop(index, id) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				uni.showLoading({
					title: "点赞中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 2
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.videolist[index].is_fabulous = 1
									_seft.videolist[index].count++

								}
							})

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
							})
						}
					}

				})
			},
			nopraisetop(index, id) {
				let _seft = this
				uni.showLoading({
					title: "取消点赞中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 2
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						//console.log('楼盘动态', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.videolist[index].is_fabulous = 0
									_seft.videolist[index].count--

								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
							})
						}
					}

				})
			},
			keywordTap(e) {
				let _seft = this
				_seft.videolist = []
				_seft.pages = 1
				console.log(e)
				let keyword = e.detail.value
				_seft.keyword = e.detail.value
				_seft.videolists()

			},
			consultantsTop(index) {

				uni.navigateTo({
					url: "../consultants/details?id=" + index
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



	/* 搜索 */

	.search {
		display: flex;
		justify-content: center;
		width: 95%;

	}

	.searchbar {
		margin: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 100%;
		height: 60rpx;
		border-radius: 50rpx;
		border: 1px solid #EEEEEE;
		background-color: #FFFFFF;
		/* background-color: #EEEEEE; */
	}

	.search .searchbar .searchicon {
		text-align: center;
		width: 10%;
	}

	.search .searchbar .searchtext {
		font-size: 26rpx;
		width: 90%;

	}

	/* end */

	/* 咨询分类 */

	.active {
		line-height: 90rpx;
		font-size: 32rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;
		/* width: 57%; */
	}

	.scroll-views {
		white-space: nowrap;
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: nowrap;
		align-items: center;
		text-align: center;
	}


	.scroll-views-item {
		display: inline-block;
		color: #606060;
		line-height: 90rpx;
		text-align: center;
		font-size: 26rpx;
		/* margin: 0rpx 50rpx; */

	}

	/* end */


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
		/* align-items: center; */
		width: 46%;
		margin-bottom: 50rpx;

	}

	.audio-list .audio-item .item-top {
		/* height: 180rpx; */
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
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
		top: 55rpx;
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
		font-size: 31rpx;
		width: 100%;
		margin-top: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		white-space: nowrap;
	}

	.audio-list .audio-item .item-price {
		font-size: 28rpx;
		color: #FFAB18;
		margin-top: 10rpx;
	}

	.audio-list .audio-item .item-price>text {
		color: #383838;
		margin-left: 10rpx;
		font-size: 23rpx;
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
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.audio-list .audio-item .item-user>view {
		margin-left: 15rpx;
		color: #2A4D9C;
	}

	.audio-list .audio-item .item-user .company {
		color: #7784B3;
		font-size: 24rpx;
		margin-top: 7rpx;
	}

	.audio-list .audio-item .item-address {
		font-size: 26rpx;
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
		justify-content: start;
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
		width: 30%;
		margin-left: 15rpx;
	}

	.audio-list .audio-item .item-bottom .bf>image {
		width: 45rpx;
		height: 45rpx;

	}

	.audio-list .audio-item .item-bottom .z>image {
		width: 40rpx;
		height: 40rpx;

	}


	/* end */
</style>
