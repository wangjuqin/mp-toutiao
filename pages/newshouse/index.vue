<template>
	<view class="content">
		<view class="top">
			<!-- 搜索框 -->
			<my-search style="width: 100%;" @send="getCenter" :keyword="keyword"></my-search>
			<!-- end -->
		</view>

		<!-- 特色推荐 -->

		<my-laber-title style="width: 100%;" lefttitle="特色推荐" morelist='special' isshows="false"></my-laber-title>

		<!-- 	<view class="uni-swipe-active"> -->
		<!-- <block v-if="Proper" v-for="(a,index) in Proper" :key="index"> -->
		<view class="active-swiper">
			<swiper autoplay="true">
				<swiper-item v-for="(a,index) in tjbanner" :key="index">
					<image :src="utils.siteBaseUrl(a.image)" @click="pageTap(a.url)"></image>
				</swiper-item>

			</swiper>
		</view>
		<!-- end -->

		<!-- navigator -->
		<!-- 		<view class="navigator">
			<view class="navigator-left">
				<image src="../../static/pic2_2.png" mode=""></image>
			</view>
			<view class="navigator-right">
				<image src="../../static/pic3_3.png" mode=""></image>
				<image src="../../static/pic4_4.png" mode=""></image>
			</view>

		</view> -->
		<!-- end -->

		<!-- 品质刚需 -->
		<block v-if="Demand.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="品质刚需" morelist="../special/index?is_recommend=3"></my-laber-title>

			<my-row-list style="width: 100%;" :listHouse="Demand"></my-row-list>
		</block>
		<!-- end -->
		<my-house-cate style="width: 100%;" :laberlist="laberlist" housesale="false" @send="getSonValue"></my-house-cate>

		<!-- tabel标签 -->
		<scroll-view scroll-x="true" class="table-navbar">
			<view class="table-item " @click="scroll(0)" :class="[items == 0?'table-active':'']">
				全部
			</view>
			<view class="table-item " v-for="(a,index) in housetype" :key="index" @click="scroll(a.id,a.title)" :class="[items == a.id?'table-active':'']">
				{{a.title}}
			</view>

		</scroll-view>
		<!-- end -->

		<!-- 新房列表 -->

		<my-column-list style="width: 100%;" :listHouse="listHouse"></my-column-list>

		<!-- end-->

		<!-- 	<view class="helpshouse">

			还没有找到合适房源，点击
			<text @click="helpshouse"> 帮我找房</text>
			迅速查找房源

		</view> -->


	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {

		data() {
			return {
				title: 'Hello',
				utils: utils,
				limits: 10,
				pages: 1,
				items: 0,
				current: 0,
				keyword: '',
				currents: 0,
				datas: [],
				tjbanner: [],
				listHouse: [],
				Demand: [], //刚需
				Proper: [], //刚需
				housetype: [], //标签
				laberlist: [{
						title: '区域',
						id: 0
					},
					{
						title: '价格',
						id: 1
					},
					{
						title: '户型',
						id: 2
					},
					{
						title: '筛选',
						id: 5
					}

				],
			}
		},
		onLoad() {
			let _seft = this
			//顶部轮播图
			con.sendRequest({
				url: '/home/index/slide',
				method: 'GET',
				data: {
					type: 2
				},
				success: function(res) {
					var datas = res.data

					if (datas.code == 1) {
						var ban = datas.data
						_seft.tjbanner = ban
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})

			//列表
			con.sendRequest({
				url: '/home/properties/getList',
				method: 'get',
				success: function(res) {
					var datas = res.data
					//console.log(datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.listHouse = restun
					}
				}
			})

			//品质刚需
			con.sendRequest({
				url: '/home/properties/getList',
				method: 'GET',
				data: {
					is_recommend: 3,
					limit: 3
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Demand = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})


			//类型
			con.sendRequest({
				url: '/home/Region/getType',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.housetype = restun
					}
				},
			})

		},

		onShow() {


		},
		onReachBottom() { //uniapp 监听下拉加载生命周期
			let _seft = this
			console.log('refresh');
			_seft.pages++
			if (_seft.keyword) {
				_seft.serchHouse()
			} else {
				_seft.houselists(_seft.datas)
			}

		},


		methods: {
			getCenter(keyword) {
				let _seft = this
				_seft.pages = 1
				_seft.keyword = keyword
				_seft.listHouse = []
				_seft.serchHouse()
			},

			getSonValue: function(res) {
				let _seft = this
				_seft.datas = res
				_seft.listHouse = []
				_seft.pages = 1
				//console.log(_seft.datas)
				this.houselists(_seft.datas)
			},

			houselists(datas) {
				let _seft = this
				let houselist = _seft.listHouse
				datas['limit'] = _seft.limits
				datas['p'] = _seft.pages
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				//列表
				//console.log('houselists',_seft.pages,_seft.datas)
				con.sendRequest({
					url: '/home/properties/getList',
					method: 'get',
					data: datas,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						//console.log('新房', datas)
						if (datas.code == 1) {
							var restuns = datas.data
							_seft.listHouse = _seft.listHouse.concat(restuns)
							//console.log(_seft.pages, _seft.listHouse, restuns)
						}
					}
				})
			},

			serchHouse() {
				let _seft = this
				uni.showLoading({
					title: '加载中'
				})
				//列表
				con.sendRequest({
					url: '/home/search/propertiesList',
					method: 'get',
					data: {
						limit: _seft.limits,
						p: _seft.pages,
						keyword: _seft.keyword,
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						//console.log('搜索新房', datas)
						if (datas.code == 1) {
							var restuns = datas.data
							_seft.listHouse = _seft.listHouse.concat(restuns)
							//console.log(_seft.pages, _seft.listHouse, restuns)
						}
					}
				})
			},

			helpshouse() {
				uni.navigateTo({
					url: '../seekhouse/proviso'
				})
			},
			scroll(index, title) {
				let _seft = this
				_seft.datas['type_id'] = title
				_seft.items = index
				//_seft.datas = res
				_seft.listHouse = []
				_seft.pages = 1
				console.log('scroll', _seft.pages, _seft.datas)
				_seft.houselists(_seft.datas)

			},
			pageTap(url) {
				console.log('url',url)
				uni.navigateTo({
					url: url
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

	scroll-view {
		width: 100%;
		height: 100%;
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #EEF6FE;
		width: 100%;
	}




	/* 特色推荐 */


	.active-swiper {
		width: 95%;
		height: 200rpx;
	}

	.active-swiper swiper {
		height: 100%;
	}


	.active-swiper image {
		width: 100%;
		height: 200rpx;
		/* padding: 0rpx; */

	}

	/* end */

	/* navigator */
	.navigator {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 95%;
	}

	.navigator .navigator-left {
		width: 35%;
	}

	.navigator .navigator-left>image {
		margin-top: 20rpx;
		width: 100%;
		height: 320rpx;
		border-radius: 10rpx;
	}

	.navigator .navigator-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 60%;
	}

	.navigator .navigator-right>image {
		width: 100%;
		height: 150rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}

	/* end */




	/* tabel标签 */

	.tabstatus {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
	}

	.table-navbar {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 95%;
		margin: 40rpx 0rpx;
		height: 70rpx;
		white-space: nowrap;
	}

	.table-navbar .table-item {
		display: inline-block;
		font-size: 26rpx;
		width: 160rpx;
		height: 60rpx;
		border-radius: 10rpx;
		line-height: 60rpx;
		margin-right: 30rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
	}

	.table-active {
		background-color: #38AEFE !important;
		color: #FFFFFF;
		border: 1rpx solid #38AEFE !important;
	}

	/* end*/

	/* 选择框 */


	.active {
		color: #389BFE !important;
	}

	.helpshouse {
		color: #ACB2B7;
		font-size: 24rpx;
		margin-top: 80rpx;

	}

	.helpshouse>text {
		color: #0086E4;
		font-size: 29rpx;
		font-weight: bold;
	}
</style>
