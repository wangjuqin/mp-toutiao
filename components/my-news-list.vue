<template>
	<view class="contents">
		<!-- 热门文章 -->
		<view class="hot-content">
			<view class="hot-item " v-for="(item,index) in ArticleList" :key="index"  @click="artivedateil(item.id)">
				<view class="img">
					<image v-if="item.image" :src="utils.siteBaseUrl(item.image)"></image>
					<image v-else src="../static/img.png"></image>
				</view>
				<view class="item-right">
					<view class="hot-title"> {{item.title}}</view>
					<view class="artice">
						<view class="art-data">
							{{utils.timeTodate('Y-m-d H:i:s', item.create_time*1000) }}
						</view>
			<!-- 			<view class="operate" v-if="operate==1">
							<image v-if="item.is_fabulous == 0 ||item.is_fabulous == null" src="../static/praise_empty.png" @click="praisetop(index,item.id)"></image>
							<image v-else src="../static/praise.png" @click="nopraisetop(index,item.id)"></image>

							<image v-if="item.is_favorite == 0  || item.is_favorite == null " src="../static/collect_empty.png" mode=""
							 @click="collecttop(index,item.id)"></image>
							<image v-else src="../static/collect.png" mode="" @click="nocollecttop(index,item.id)"></image>
								<image src="../static/praise.png" @click="praisetop(item.id)"></image>
								<image src="../static/edit.png"></image>
							<image src="../static/collect.png" @click="collect(item.id)"></image>

							<image src="../static/share2.png"  ></image> 
						    <button  class="sharebtn"    plain='true' hover-class="none"></button>


						</view> -->
						<view class="operate" > <!-- v-if="operate==2"-->
								<image v-if="item.avatar" :src="item.avatar"></image>
							<view class="">
								{{item.user_nickname}}
							</view>

						</view>

					</view>

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
			isshow: {
				type: Boolean,
				default: true
			},
			operate: {
				type: Number,
				default: 1
			},
			ArticleList: {
				type: Array,
				default () {
					return []
				}

			}
		},
		data() {
			return {
				title: 'Hello',
				utils: utils,
				/* ArticleList: [], */
			}
		},
		onReady() {
			//this.articleListtop()
		},

		methods: {

			artivedateil(index) {
				uni.navigateTo({
					url: '../news/details?id=' + index
				})
			},
			praisetop(index, id) {
				console.log('dinazans', index, id)
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: id,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
								/* 	_seft.ArticleList[index].is_fabulous = 1
									console.log(_seft.ArticleList[index].is_fabulous)
							 */
								_seft.$emit("send", index,1)
									//_seft.articleListtop()

								}
							})

						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
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
						type: 3
					},
					success: function(res) {
						var datas = res.data
						//console.log('楼盘动态', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								duration: 2000,
								success() {
									_seft.$emit("send", index,1)
									//_seft.articleListtop()
								}
							})
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
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
						type: 1
					},
					success: function(res) {
						var datas = res.data
						console.log('shou', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
								
								   _seft.$emit("send",index,2)
									
								}
							})

						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
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
						type: 1
					},
					success: function(res) {
						var datas = res.data
						console.log('quxioa', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									 _seft.$emit("send",index,2)
								}
							})
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
						}
					}

				})
			},
			articleListtop() {
				let _seft = this
				//热门文章
				con.sendRequest({
					url: '/home/article/getIndexArticleList',
					method: 'get',
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('热门文章', restun)
							//_seft.$emit("send", restun)
							_seft.ArticleList = restun

						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
						}
					}

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
		/* padding-bottom: 200rpx; */
	}


	/* 热门文章 */
	.hot-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
	}

	.hot-content .hot-item {
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 160rpx;
		width: 100%
	}

	.hot-content .hot-item .img {
		width: 27%;

	}

	.hot-content .hot-item .img image {
		width: 100%;
		height: 150rpx;

	}

	.hot-content .hot-item .item-right {
		width: 69%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}

	.hot-content .hot-item .item-right .hot-title {
		font-size: 30rpx;
		overflow: hidden;
		width: 100%;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		/* height: 100rpx; */
	}

	.hot-content .hot-item .item-right .artice {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin-top: 20rpx;

	}

	.hot-content .hot-item .item-right .artice .art-data {
		font-size: 24rpx;
		opacity: .6;
		
	}

	.hot-content .hot-item .item-right .artice .operate {
		display: flex;
		flex-direction: row;
		justify-content: start;
		margin-left: 10%;
		width: 40%;
		
	}


	.hot-content .hot-item .item-right .artice .operate image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 15rpx;
		border-radius: 50%;
	}

	.hot-content .hot-item .item-right .artice .operate>view {
		font-size: 27rpx;
		opacity: .6;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		width: 70%;
		margin-left: 5%;
		
	}

	/* end */
</style>
