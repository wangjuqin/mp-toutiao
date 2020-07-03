<template>
	<view class="content">
		<view class="top" style="width: 100%;" @click="searchhouseTop">
			<!-- 搜索框 -->
			<my-search style="width: 100%;"></my-search>
			<!-- end -->
		</view>
		<!-- <my-search style="width: 100%;"></my-search> -->

		<view class="uni-swipe" v-if="topbanner.length > 0">
			<swiper autoplay="true" indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#FFFC28">
				<swiper-item v-for="(item,index) in topbanner" :key="index">
					<image :src="utils.siteBaseUrl(item.image)" @click="pageTap(item.url)"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="navbar">
			<navigator url="../newshouse/index" class="navbar-item" hover-class="none">
				<image src="../../static/new_house.png"></image>
				<view> 新房</view>
			</navigator>
			<navigator url="../news/index" class="navbar-item" hover-class="none">
				<image src="../../static/information.png"></image>
				<view> 资讯</view>
			</navigator>
			<navigator url="" @click="shakehouse" class="navbar-item" hover-class="none">
				<image src="../../static/video_house.png"></image>
				<view> 抖房</view>
			</navigator>
		</view>


		<view class="consult" v-if="article">
			<view class="con-nav">
				<image src="../../static/title.png" mode=""></image>
				<!-- <view class="con-gd" @click="ness">
					<view class="">
						查看更多
					</view>
					<image src="../../static/jkh-r.png" mode=""></image>
				</view> -->
			</view>

			<view class="con-conten" @click="articleTop(article.article_id)">
				<view class="title">{{article.title}}</view>

				<view class="contents">
					<jyf-parser :html="article.content" ref="article"></jyf-parser>
					<!-- <rich-text  :nodes="article.content"></rich-text> -->

				</view>
			</view>
		</view>


		<block v-if="Propertieslimit.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="限时特价" morelist='../special/index?is_recommend=1'></my-laber-title>

			<my-row-list style="width: 100%;" :listHouse="Propertieslimit"></my-row-list>
		</block>

		<block v-if="Propertiescomm.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="热门推荐" morelist='.../seekhouse/houselist?is_recommend=2'></my-laber-title>

			<my-column-list style="width: 100%;" :listHouse='Propertiescomm'> </my-column-list>
			<!-- 
			<view class="more" @click="morehouse">
				更多品质楼盘
			</view> -->
		</block>

		<block v-if="conbanner.length > 0">
			<view class="uni-swipe-active">
				<view class="active-swiper">
					<swiper autoplay="true">
						<swiper-item v-for="(a,index) in conbanner" :key="index">
							<image :src="utils.siteBaseUrl(a.image)"  @click="pageTap(a.url)"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</block>

		<view class="navbar-zf">
			<view class="zf">
				<view class="navbar-item-zf" @click="helpHouse">
					<image src="../../static/help_find_house.png"></image>

				</view>
				<view class="navbar-item-zf" @click="mapHouse">
					<image src="../../static/map_find_house.png"></image>
				</view>
			</view>
		</view>

		<block v-if="Shop1.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="金牌咨询师" morelist='../consultants/index?type=1'></my-laber-title>
			<my-seek-list :seeklist="Shop1" style="width: 100%;"></my-seek-list>
		</block>
		<!-- end -->
		<!-- 热门文章 -->
		<block v-if="ArticleList.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="热门文章" morelist='../news/index'></my-laber-title>
			<my-news-list style="width: 100%;" :ArticleList="ArticleList" @send="getArticlevalue"></my-news-list>


		</block>

		<block v-if="Shop2.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="金牌置业顾问" morelist='../consultants/index?type=2'></my-laber-title>
			<my-seek-list :seeklist="Shop2" style="width: 100%;" seektype='2'></my-seek-list>
		</block>


		<!-- end -->

		<!-- 视频讲房 -->


		<block v-if="Videolist.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="视频讲房" @click="shakehouse" isshows="false" morelist='../shakehouse/through'></my-laber-title>
			<view class="audio-content">
				<view v-for="(a,index) in Videolist" :key="index">
					<view class="audio-item" @click="housedetail(a.id)" v-if="a.video">
						<!-- <video class="img" :src="utils.siteBaseUrl(a.video)" object-fit="fill" play-btn-position="center"
						 controls='false' show-center-play-btn="false"></video> -->
						<image class="img" :src="[a.image?utils.siteBaseUrl(a.image):'../../static/img.png']"></image>
						<image class="bofan" src="../../static/play_btn.png"></image>
						<view class="mask"></view>
					</view>
					<view class="name"> {{a.title}}</view>
				</view>
			</view>
		</block>
		<!-- end -->

	</view>


</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '首页',
				utils: utils,
				topbanner: [],
				conbanner: [],
				article: '',
				Propertieslimit: [],
				Propertiescomm: [],
				isShop1: true,
				isShop2: true,
				Shop1: [],
				Shop2: [],
				ArticleList: [],
				Videolist: []
			}
		},
		onShareAppMessage(res) {
			let  _seft= this
		
			return {
				title: '派好房',//标题
				path: 'pages/index/index',     ///链接
				//imageUrl: _seft.videoList[_seft.current].avatar,  //图片
				
			}
		},
		onLoad() {
			
			

		},
		onShow() {

			let _seft = this
			//console.log('sessionKey====', uni.getStorageSync('sessionKey'))
		/* 	if (!uni.getStorageSync('sessionKey')) {
				//console.log('sessionKeynull====', uni.getStorageSync('sessionKey'))
				uni.navigateTo({
					url: '../login/login'
				})
				return false
			} */

			//顶部轮播图
			con.sendRequest({
				url: '/home/index/slide',
				method: 'GET',
				data: {
					type: 1
				},
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					var datas = res.data
					console.log('顶部轮播图',datas)
					if (datas.code == 1) {
						var ban = datas.data
						_seft.topbanner = ban
					}
				},
				fail: function(res) {
					//console.log('fail', res)
				}
			})
			//中部轮播图
			con.sendRequest({
				url: '/home/index/slide',
				method: 'GET',
				data: {
					type: 3
				},
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					var datas = res.data
					//console.log(_seft.conbanner)
					if (datas.code == 1) {
						var ban = datas.data
						_seft.conbanner = ban
					}
				},
				fail: function(res) {
					//console.log('fail', res)
				}
			})
			//最新公告
			con.sendRequest({
				url: '/home/article/getIndexNewArticleFind',
				method: 'get',
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					//console.log('getIndexNewArticleFind', res)
					var datas = res.data
					if (datas.code == 1) {

						var restun = datas.data
						//console.log('最新公告', restun)
						_seft.article = restun
					}

				}

			})
			//限时特惠
			con.sendRequest({
				url: '/home/properties/getList',
				method: 'get',
				data: {
					is_recommend: 1,
					limit: 3
				},
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						//console.log('限时特惠', restun)
						_seft.Propertieslimit = restun
					}

				}

			})
			//热门推荐
			con.sendRequest({
				url: '/home/properties/getList',
				method: 'get',
				data: {
					is_recommend: 2,
					limit: 3
				},
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					var datas = res.data
					//console.log('热门推荐', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Propertiescomm = restun
					}
				}

			})

			//咨询师
			con.sendRequest({
				url: '/home/Shop/getIndexShop',
				method: 'get',
				data: {
					"type": 1
				},
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Shop1 = restun
						//console.log('咨询师', _seft.Shop1)
					}
				}

			})
			//置业顾问
			con.sendRequest({
				url: '/home/Shop/getIndexShop',
				method: 'get',
				data: {
					"type": 2
				},
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					//console.log('getListLimitCommendation', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Shop2 = restun
						//console.log('置业顾问', restun)

					}
				}

			})
			//热门文章
			_seft.articleListtop()

			//视频讲房
			con.sendRequest({
				url: '/home/video/getIndexVideo',
				method: 'get',
				header:{'XX-Token':'8e9c1a2ac4c67595'},
				success: function(res) {
					var datas = res.data
					//console.log('视频讲房', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Videolist = restun
					}
				}
			})
		},

		methods: {
			getArticlevalue(index, type) {
				let _seft = this
				//console.log(index, type)
				if (type == 1) {
					if (_seft.ArticleList[index].is_fabulous == 0 || _seft.ArticleList[index].is_fabulous == null) {
						_seft.ArticleList[index].is_fabulous = 1
					} else {
						_seft.ArticleList[index].is_fabulous = 0
					}
				}
				if (type == 2) {
					if (_seft.ArticleList[index].is_favorite == 0 || _seft.ArticleList[index].is_favorite == null) {
						_seft.ArticleList[index].is_favorite = 1
					} else {
						_seft.ArticleList[index].is_favorite = 0
					}
				}
			},
			
			searchhouseTop() {
				//console.log('search')
				uni.navigateTo({
					url: "../searchhouse/houselist"
				})

			},
			pageTap(url) {
				console.log('url',url)
				uni.navigateTo({
					url: url
				})

			},

			special() {
				uni.navigateTo({
					url: '/pages/special/index',
				});
			},
			videoHouse() {
				uni.navigateTo({
					url: '/pages/video/index',
				});
			},
			mapHouse() {
				uni.navigateTo({
					url: '/pages/seekhouse/map',
				});
			},
			helpHouse() {
				uni.navigateTo({
					url: '/pages/seekhouse/proviso',
				});
			},
			morehouse() {
				uni.navigateTo({
					url: '/pages/newshouse/index',
				});
			},
			hotArtive() {
				uni.navigateTo({
					url: '/pages/news/index',
				});
			},
			consultants() {
				uni.navigateTo({
					url: '/pages/consultants/index',
				});
			},

			articleTop(index) {
				uni.navigateTo({
					url: '../news/details?id=' + index
				});
			},

			consultantsdetail() {
				uni.navigateTo({
					url: '/pages/adviser_details/index',
				});
			},
			shakehouse() {
				uni.switchTab({
					url: "../shakehouse/through"
				})
			},
			housedetail(index) {
				let _seft = this
				uni.navigateTo({
					url: '../shakehouse/video?id=' + index
				})
			},
			articleListtop() {
				let _seft = this
				//热门文章
				con.sendRequest({
					url: '/home/article/getIndexArticleList',
					method: 'get',
					header:{'XX-Token':'8e9c1a2ac4c67595'},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							//console.log('热门文章index', restun)
							_seft.ArticleList = restun

						}
					}

				})
			}

		},
		praisetop(index, id) {

			let _seft = this
			//console.log('dinazan', index, id)
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
					if (datas.code == 1) {
						var restun = datas.data
						uni.showToast({
							title: datas.msg,
							icon: "none",
							duration: 2000,
							success() {
								_seft.ArticleList[index].is_fabulous = 1
								//_seft.$emit("send")
								//_seft.articleListtop()

							}
						})

					}
				}

			})
		},



	}
</script>

<style>
	.content {
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;

	}

	.top {
		width: 100%;
		height: 300rpx;
		background-color: #389BFE;
	}


	/* 视频讲房 */
	.audio-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		width: 95%;
	}

	.audio-content>view {
		width: 49%;
		margin-bottom: 20rpx
	}

	.audio-content>view .audio-item {
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		width: 100%;
		position: relative;
	}

	.audio-content>view .audio-item .img {
		width: 100%;
		height: 200rpx;
		border-radius: 15rpx;
		
	}

	.audio-content>view .audio-item .bofan {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		z-index: 1;
		top: 50rpx;
		left: 35%;
	}

	.audio-content>view .audio-item .mask {
		position: absolute;
		background-color: #000000;
		opacity: .4;
		width: 100%;
		height: 200rpx;
		border-radius: 15rpx;
		top: 0;
	}

	.audio-content>view .name {
		width: 100%;
		height: 50rpx;
		font-size: 30rpx;
		color: #000000;
		line-height: 70rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}


	/* end */



	.uni-swipe {
		margin-top: -140rpx;
		z-index: 1;
		width: 100%;
	}

	swiper-item {
		display: flex;
		justify-content: center;
	}

	swiper-item image {
		width: 95%;
		height: 100%;
	}

	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		flex-wrap: wrap;
	}

	.navbar .navbar-item {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}

	.navbar .navbar-item image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-top: 50rpx;
	}

	.navbar .navbar-item view {
		font-size: 30rpx;
		margin-top: 20rpx;
		font-family: FZLTXIHK--GBK1-0;
	}

	.consult {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 95%;

	}

	.consult .con-nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 52px;
		width: 95%;
	}


	.consult .con-nav>image {
		width: 150rpx;
		height: 40rpx;

	}

	.consult .con-nav .con-gd {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #6F6F6F;
	}

	.consult .con-nav .con-gd>image {
		width: 40rpx;
		height: 40rpx;
	}

	.con-conten {
		width: 100%;
		border: 1rpx solid #EEEEEE;
		border-radius: 10rpx;
		box-shadow: 4rpx 4rpx 0px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.con-conten .title {
		font-size: 36rpx;
		font-weight: 550;
		color: #000000;
		margin: 10px 8px;
		width: 95%;
		text-align: center;
	}

	.con-conten .contents {
		font-size: 28rpx;
		margin-top: 10rpx;
		margin: 10px 8px;
		width: 95%;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

	}



	.more {
		font-size: 26rpx;
		color: #389BFE;
		background-color: #EEF6FE;
		border: 1px solid #A9BCFD;
		height: 70rpx;
		border-radius: 20rpx;
		line-height: 70rpx;
		width: 45%;
		text-align: center;
		margin-top: 40rpx;
	}


	/* end*/
	.uni-swipe-active {
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 95%;
	}

	.active-swiper {
		width: 100%;
		height: 200rpx;
	}

	.uni-swipe-active .active-swiper swiper {
		height: 100%;
	}


	.uni-swipe-active .active-swiper image {
		height: 100%;
		width: 100%;
		/* padding: 0rpx; */

	}

	.navbar-zf {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.navbar-zf .zf {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		width: 95%;
	}

	.navbar-item-zf {
		width: 47%;
	}

	.navbar-item-zf image {
		width: 100%;
		height: 150rpx;
		border-radius: 20rpx;

	}
</style>
