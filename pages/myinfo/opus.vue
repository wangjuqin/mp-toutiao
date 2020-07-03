<template>
	<view class="content">
		<view class="top">
			<view class="scroll-view">
				<view hover-class="none" class="scroll-view-item " @click="showtop(index)" :class="[isshow==index?'active':'' ]"
				 v-for="(a,index) in  nav" :key="index">{{a}} </view>
			</view>
		</view>


		<!-- 视频 -->
		<block v-if="isshow==0">
			<view class="hot-content" v-if="videolist.length > 0">
				<view class="hot-item " v-for="(a,index) in videolist" :key="index">
					<view class="img" @click="housedetail(a.id,a.status)">

						<!-- <video  v-if="a.video"  :src="utils.siteBaseUrl(a.video)" muted="true"  object-fit="fill"  play-btn-position="center" controls='false' show-center-play-btn="false"></video>
						 -->
						<image :src="[a.image?utils.siteBaseUrl(a.image):'../../static/img.png']"></image>
						<view class="mask"></view>
						<image class="play_btn" src="../../static/play_btn.png" mode=""></image>
					</view>
					<view class="item-right">
						<view class="hot-title" @click="housedetail(a.id,a.status)">
							<view class="titles">
								{{a.title}}
							</view>
							<view class="statuss">
								<text v-if="a.status==0">未审核</text>
								<text  v-else-if="a.status==2">草稿</text>
								<text v-else>已审核</text>
							</view>
						</view>
						<view class="artice" @click="housedetail(a.id,a.status)">
							<view class="art-data tjhouse">
								<text v-if="a.properties_title">
									楼盘：{{a.properties_title}}
								</text>

							</view>
							<view class="operate">
								<image src="../../static/video.png"></image>
								<text v-if="a.click">{{a.click}}</text>
								<text v-else>0</text>

							</view>
						</view>
						<view class="artice">
							<view class="art-data">{{utils.timeTodate('Y-m-d',a.create_time*1000)}}</view>
							<view class="operate">
								<!-- <image src="../../static/share2.png"></image> -->
								<image src="../../static/edit.png"  @click="editvidtop(a.id)"></image>
								<image src="../../static/delect.png" @click="delectvideotop(a.id)"></image>
								
							</view>
						</view>

					</view>

				</view>
			</view>

		</block>
		<!-- 文章 -->
		<block v-if="isshow==1">
			<!-- 	<my-news-list  :articleList="articelist" style="width: 100%;"></my-news-list> -->

			<view class="hot-content" v-if="articelist.length > 0">
				<view class="hot-item " v-for="(a,index) in articelist" :key="index">
					<view class="img" @click="housedetail(a.id,a.status)">
						<image :src="utils.siteBaseUrl(a.image)"></image>
					</view>
					<view class="item-right">
						<view class="hot-title" @click="housedetail(a.id,a.status)">
							<view class="titles">
								{{a.title}}
							</view>
							<view class="statuss">
								<text v-if="a.status==0">未审核</text>
								<text  v-else-if="a.status==2">草稿</text>
								<text v-else>已审核</text>
							</view>
						</view>
						<view class="artice">
							<view class="art-data">{{utils.timeTodate('Y-m-d',a.create_time*1000)}}</view>
							<view class="operate">
								<view class="prive">
									<image class="view" src="../../static/view1.png"></image>
									<text v-if="a.click">{{a.click}}</text>
									<text v-else>0</text>
								</view>
								<!-- @click="sharetop(a.id)" -->
								<!-- <image src="../../static/share2.png"  ></image> -->
								<image src="../../static/edit.png" @click="editarttop(a.id)"></image>
								<image src="../../static/delect.png" @click="delectartictop(a.id)"></image>
								
							</view>
						</view>

					</view>

				</view>
			</view>
		</block>


		<view class="flex-box" @click="addtop">
			<image src="../../static/add_btn.png" mode=""></image>

		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '我的作品',
				isshow: 0,
				utils: utils,
				articelist: [],
				videolist: [],
				nav: ['视频', '文章'],
			}
		},
		onLoad(e) {
			let _seft = this
			console.log(uni.getStorageSync('sessionKey'))
			_seft.isshow = e.type ? e.type : 0
		},
		onShow() {
			con.usertype() //用户身份	
			let _seft = this

			//我的视频
			con.sendRequest({
				url: '/home/Video/getList',
				method: 'get',
				data: {
					is_all: 1
				},
				success: function(res) {
					console.log('我的视频', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.videolist = restun
					}

				}

			})
			//我的文章
			con.sendRequest({
				url: '/home/Essay/getList',
				method: 'get',
				success: function(res) {
					console.log('我的文章', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.articelist = restun
					}

				}

			})
		},
		onUnload() {
			let _seft = this
			console.log('onUnload')
			uni.switchTab({
				url: '../myinfo/index'
			})
		},
		methods: {
			showtop(index) {
				this.isshow = index

			},
			answerstop(index) {
				uni.navigateTo({
					url: '../answer/index?id=' + index
				})
			},
			addtop() {
				if (this.isshow == 0) {
					uni.navigateTo({
						url: '../opus/video'
					})
				} else {
					uni.navigateTo({
						url: '../opus/article'
					})
				}

			},
			delectvideotop(index) {
				var _seft = this
				con.sendRequest({
					url: '/home/Video/delete',
					method: 'get',
					data: {
						id: index
					},
					success: function(res) {
						console.log('shanchu', res)
						var datas = res.data
						if (datas.code == 1) {
							_seft.videolist = _seft.videolist.filter(t => t.id != index)
							return
						}
					}
				})
			},
			delectartictop(index) {
				var _seft = this
				console.log(index)
				con.sendRequest({
					url: '/home/Essay/delete',
					method: 'get',
					data: {
						id: index
					},
					success: function(res) {
						console.log('shanchu', res)
						var datas = res.data
						if (datas.code == 1) {
							_seft.articelist = _seft.articelist.filter(t => t.id != index)
							return
						}
					}
				})
			},
			editarttop(index) {
				uni.navigateTo({
					url: '../opus/article?id='+index
				})

			},
			editvidtop(index) {
				uni.navigateTo({
					url: '../opus/video?id='+index
				})

			},

			housedetail(index, sta) {
				let _seft = this
				if (sta == 0) {
					uni.showToast({
						title: '内容未审核',
						icon: 'none',
						mask: true
					})
					return false
				}
				if (this.isshow == 0) {
					uni.navigateTo({
						url: '../shakehouse/index?id=' + index
					})
				} else {
					uni.navigateTo({
						url: '../news/details?id=' + index
					})
				}


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

	/* 热门文章 */
	.hot-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		margin-top: 80rpx;
		width: 95%;
	}

	.hot-content .hot-item {
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 160rpx;
		width: 100%;

	}

	.hot-content .hot-item .img {
		width: 27%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.hot-content .hot-item .img image {
		width: 100%;
		height: 150rpx;
		position: absolute;

	}

	.hot-content .hot-item .img video {
		width: 100%;
		height: 150rpx;
		position: absolute;

	}

	.hot-content .hot-item .img .mask {
		position: absolute;
		width: 100%;
		height: 150rpx;
		background-color: #000000;
		opacity: .4;

	}

	.hot-content .hot-item .img .play_btn {
		width: 80rpx;
		height: 80rpx;

		text-align: center;
	}

	.hot-content .hot-item .item-right {
		width: 69%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;



	}

	.hot-content .hot-item .item-right .hot-title {
		font-size: 32rpx;
		overflow: hidden;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;


	}

	.hot-content .hot-item .item-right .hot-title .titles {
		display: inline-block;
		white-space: nowrap;
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.hot-content .hot-item .item-right .hot-title .statuss {

		width: 20%;
		/*  border-radius: 15rpx; */
		font-size: 27rpx;
		color: #389BFE;

	}


	.hot-content .hot-item .item-right .artice {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin-top: 20rpx;
		/* height: 60rpx; */

	}

	.hot-content .hot-item .item-right .artice .art-data {
		font-size: 26rpx;
		color: #9A9A9A;
	}

	.hot-content .hot-item .item-right .artice .tjhouse {
		color: #000000;
	}

	.hot-content .hot-item .item-right .artice .operate {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.hot-content .hot-item .item-right .artice .operate text {
		font-size: 24rpx;
		color: #7784B3;
	}

	.hot-content .hot-item .item-right .artice .operate>image {
		width: 38rpx;
		height: 38rpx;
		padding: 0rpx 10rpx;
	}

	.hot-content .hot-item .item-right .artice .operate .prive>image {
		width: 40rpx;
		height: 23rpx;
		padding: 0rpx 10rpx;
	}

	.hot-content .hot-item .item-right .artice .operate>view {
		font-size: 27rpx;
		opacity: .6;
		margin-left: 5rpx
	}



	/* end */

	.flex-box {
		position: fixed;
		right: 0rpx;
		z-index: 2;
		top: 100rpx;
	}

	.flex-box>image {
		width: 150rpx;
		height: 60rpx;
	}
</style>
