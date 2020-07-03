<template>
	<view class="uni">
		<!-- 顾问信息 -->

		<view class="advise" v-if="cards">
			<view class="top">
				<view class="left">
					<image :src="cards.avatar"></image>
				</view>
				<view class="right">
					<view class="right-top">
						<view class="uesername">
							<view class="uname">{{cards.name}}</view>
							<view class="tel">
								{{cards.phone}}
							</view>
						</view>


					</view>
					<view class="right-conter">
						<view class="wx">微信：{{cards.wechat_name}}</view>
						<view class="company">
							所属公司：{{cards.company}}
						</view>
					</view>
					<view class="right-bottom">
						<view class="qianming">
							个性签名：{{cards.describe}}
						</view>
						<!-- 	<view class="bianjie">
								编辑
							</view> -->
					</view>

				</view>
			</view>
			<view class="bottom">
				<view class="preview"><text>{{cards.click}}</text> 浏览量 </view>
				<view class="activity"> <text> {{cards.activity}}</text> 活跃度</view>
				<view class="likes"> <text>{{cards.likes}}</text> 点赞数</view>
			</view>
		</view>
		<!-- end -->
		<!-- 导航 -->
		<view class="navbar">
			<!-- v-if="cards.is_fabulous == 0" -->
			<view class="navbar-item">
				<image  v-if="cards.is_fabulous == 0 ||  cards.is_fabulous == null" src="../../static/big_praises.png" @click="praisetop"></image>
				<image  v-else  src="../../static/big_praises2.png" @click="nopraisetop" ></image>
				
				<view class="name">为我点赞</view>
			</view>
			<view class="navbar-item">
				<button class="name"  hover-class="none" open-type="share">
					<image src="../../static/transmit.png"></image>
					
					<view class="name" @click="sharetop(shootid)">转发</view>
				</button>
			
			</view>
			<view class="navbar-item">
				<image src="../../static/code.png" @click="codetop"></image>
				<view class="name">保存二维码</view>
			</view>
		</view>
		<!-- end -->

		<!-- 楼盘 -->
		<block v-if="houselist.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="主营楼盘" isshows="false"></my-laber-title>

			<my-column-list style="width: 100%;" isshow='2' :listHouse="houselist"></my-column-list>
		</block>
		<!-- end -->
		<!-- 视频 -->

		<view class="audio-navbar">
			<view class="" @click="tuchContent(1)">
				<view :class='["min",indexActive== 1 ? "active":""]'>视频</view>
			</view>
			<view class="" @click="tuchContent(2)">
				<view :class='["min",indexActive== 2 ? "active":""]'>文章</view>
			</view>

		</view>
		<view class="audio-list">
			<view class="audio-item" v-for="(a,index) in videolist" :key="index">
				<view class="item-top" @click="housedetail(a.id)">
					<!-- v-if="a.image" -->
					<image class="img"  :src="[a.image?utils.siteBaseUrl(a.image):'../../static/img.png']" mode="scaleToFill"></image>
					<!-- <video class="img" v-if="a.video" :src="utils.siteBaseUrl(a.video)" object-fit="fill" play-btn-position="center"
					 controls='false' show-center-play-btn="false"></video> -->

					<image  v-if="a.video"class="bofan" src="../../static/play_btn.png"></image>
					 <view  v-if="a.video" class="mask"></view>
					<!--<view class="name">
						景茂誉景国际
					</view> -->
				</view>
				<view class="item-title">
					{{a.title}}
				</view>
				<view class="item-bottom">
					<view class="data">
						{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
					</view>
					<view class="icon">
						<image v-if="a.is_favorite == 0 ||a.is_favorite== null " src="../../static/collect_empty.png" @click="houscoll(index,indexActive,a.id)"></image>
						<image v-else src="../../static/collect.png" @click="nohouscoll(index,indexActive,a.id)"></image>

						<!-- 	<image src="../../static/fx.png"></image> -->
					</view>
				</view>
			</view>

		</view>

		<!-- end -->
		<!-- 底部 -->
		<view class="flex-box">
			<view class="box-content">
				<view class="scan">
					<image v-if="cards.is_favorite == 0 || cards.is_favorite == null" src="../../static/big_collect.png" @click="collettop"></image>
					<image v-else src="../../static/big_collected.png" @click="nocollettop"></image>
				</view>
				<view class="zixun" @click="seekTop(shootid)">
					咨询

				</view>
				<view class="tel" @click="calltop">
					免费电话

				</view>

			</view>

		</view>
		<!-- end -->
	</view>
</template>

<script>
	import utils from '@/common/utils.filter.js'
	import con from '@/common/config.js'
	export default {
		data() {
			return {
				title: 'Hello',
				utils: utils,
				indexActive: 1,
				shootid: '',
				videolist: [],
				cards: '',
				houselist: [],


			}

		},
		onLoad(e) {
			let _seft = this;
			_seft.shootid = e.id


		},
		onShow() {
			let _seft = this;
			if (_seft.indexActive == 1) _seft.vitop()
			if (_seft.indexActive == 2) _seft.artop()
			_seft.shootcard()
			_seft.houselisttop()

		},
		onShareAppMessage(res) {
			let _seft = this
			con.sendRequest({
				url: '/home/index/share',
				method: 'GET',
				data: {
					id: _seft.shootid,
					type: 6 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师 
				},
				success: function(res) {
					var datas = res.data
						console.log('分享成功', datas) 
					if (datas.code == 1) {
						uni.showToast({
							title: '分享成功',
							icon:"none",
							mask:true,
						})
					}
					
				}
			})
		return {
			title: _seft.cards.describe,//标题
			/* desc:_seft.cards.describe,
			content:_seft.cards.describe, */
			path: 'pages/consultants/details?id='+_seft.shootid,     ///链接
		//	imageUrl: _seft.cards.avatar,  //图片	
		}
		
		
			
		},
		methods: {

			codetop() {
				let _seft = this;
				let  imgs = []
				imgs.push(utils.siteBaseUrl(_seft.cards.wecaht_img))
				// 预览图片
				console.log('_seft.cards.wecaht_img', imgs);

				uni.previewImage({
					current: 1,
					urls: imgs,
					indicator: 'number',
					loop: true,
					success: function(res) {
						console.log('调用成功', res)

					},
					fail:function(res){
						console.log('调用', res)
					}
				})
			},

			housedetail(index) {
				let _seft = this
				if (_seft.indexActive == 1) {
					uni.navigateTo({
						url: '../shakehouse/video?id=' + index
					})
				} else {
					uni.navigateTo({
						url: '../news/details?id=' + index
					})
				}


			},
			artop() {
				let _seft = this;
				//文章
				con.sendRequest({
					url: '/home/Essay/getShopList',
					method: 'get',
					data: {
						user_id: _seft.shootid
					},
					success: function(res) {
						console.log('//文章', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.videolist = restun
						}

					}

				})

			},
			vitop() {
				let _seft = this;
				//视频
				con.sendRequest({
					url: '/home/video/getShopList',
					method: 'get',
					data: {
						user_id: _seft.shootid
					},
					success: function(res) {
						console.log('视频', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.videolist = restun
						}

					}

				})

			},

			shootcard() {
				let _seft = this;
				//咨询师的名片
				con.sendRequest({
					url: '/home/Shop/getShow',
					method: 'get',
					data: {
						id: _seft.shootid
					},
					success: function(res) {
						console.log('咨询师的名片', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.cards = restun
						}

					}

				})
			},

			houselisttop() {
				let _seft = this;
				//主营楼盘
				con.sendRequest({
					url: '/home/properties/getUserProperties',
					method: 'get',
					data: {
						id: _seft.shootid
					},
					success: function(res) {
						console.log('主营楼盘', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.houselist = restun
						}

					}

				})

			},




			tuchContent(index) {
				let _seft = this;
				switch (index) {
					case 1:
						_seft.indexActive = 1
						_seft.vitop()
						break;
					case 2:
						_seft.indexActive = 2
						_seft.artop()

						break;
				}
			},
			praisetop() {
				let _seft = this;
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: _seft.shootid,
						type: 1
					},
					success: function(res) {
						console.log('dianzan ', res)
						var datas = res.data
						_seft.cards.is_fabulous = 1
						_seft.cards.likes = _seft.cards.likes + 1
						uni.showToast({
							title: datas.msg,
							icon: "none",
							mask:true,
						})


					}

				})

			},
			nopraisetop() {
				let _seft = this;
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: _seft.shootid,
						type: 1
					},
					success: function(res) {
						console.log('dianzan ', res)
						var datas = res.data
						_seft.cards.is_fabulous = 0
						_seft.cards.likes = _seft.cards.likes?_seft.cards.likes - 1: 0
						uni.showToast({
							title: datas.msg,
							icon: "none",
							mask:true,
						})
			
			
					}
			
				})
			
			},
			collettop() {

				let _seft = this;

				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: _seft.shootid,
						type: 4
					},
					success: function(res) {

						console.log('收藏 ', res)
						var datas = res.data
						uni.showToast({
							title: datas.msg,
							icon: "none",
							mask:true,
						})
						if (datas.code == 1) {
							_seft.cards.is_favorite = 1
						}


					}

				})
			},
			nocollettop() {
				let _seft = this;

				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: _seft.shootid,
						type: 4
					},
					success: function(res) {
						console.log('取消收藏 ', res)

						var datas = res.data
						uni.showToast({
							title: datas.msg,
							icon: "none",
							mask:true,
						})
						if (datas.code == 1) {
							_seft.cards.is_favorite = 0
						}



					}

				})
			},
			houscoll(index, type, id) {

				let _seft = this;
				uni.showLoading({
					title:"收藏中",
					mask:true
				})
				var types = ''
				if (type == 1) types = 3
				if (type == 2) types = 1
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: id,
						type: types
					},
					success: function(res) {
						uni.hideLoading()
						console.log('收藏 ', res)
						var datas = res.data
						uni.showToast({
							title: datas.msg,
							icon: "none",
							mask:true,
						})
						if (datas.code == 1) {
							_seft.videolist[index].is_favorite = 1
						}
					}

				})
			},
			nohouscoll(index, type, id) {
				let _seft = this;
				var types = ''
				if (type == 1) types = 3
				if (type == 2) types = 1

				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: id,
						type: types
					},
					success: function(res) {

						console.log('取消收藏 ', res)
						var datas = res.data
						uni.showToast({
							title: datas.msg,
							icon: "none",
							mask:true,
						})
						if (datas.code == 1) {
							_seft.videolist[index].is_favorite = 0
						}

					}

				})
			},
			calltop() {
				let _seft = this;
				uni.makePhoneCall({
					phoneNumber: _seft.cards.phone,
					success(data) {
						console.log('成功')
					}
				})
			},
			seekTop(index){
				uni.navigateTo({
					url:"../message/details?id="+index
				})	
			}

		}
	}
</script>

<style>
	.uni {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-bottom: 200rpx;
	}
	button{
		background-color: #FFFFFF !important; 
		font-size: 30rpx !important;
		margin-top: 10rpx;
		position: initial !important;
		line-height: initial !important;
		
	}
	button::after {
		  border: none;
		  position: initial;
		}

	/* 底部 */
	.flex-box {
		border-top: 2rpx solid #EEEEEE;
		width: 100%;
		position: fixed;
		background-color: #FFFFFF;
		bottom: 0rpx;
		z-index: 2;

	}

	.flex-box .box-content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		width: 95%;
		margin: 15rpx 0rpx;

	}

	.flex-box .scan>image {
		width: 70rpx;
		height: 65rpx;

	}

	.flex-box .zixun {
		background-color: #7CE311;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 20rpx;
		width: 30%;
		line-height: 70rpx;
	}

	.flex-box .tel {
		background-color: #38AEFE;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 20rpx;
		width: 30%;
		line-height: 70rpx;
	}

	/* end */

	/* 视频 */
	.audio-navbar {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 95%;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		height: 90rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.audio-navbar>view {
		width: 22%;
	}

	.active {
		line-height: 90rpx;
		font-size: 40rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;
		width: 57%;
	}

	.audio-navbar .min {
		font-size: 36rpx;
		color: #9C9C9C;
	}

	.audio-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		width: 95%;
		/* 	margin-top: 50rpx; */
		margin-bottom: 20rpx;
	}

	.audio-list .audio-item {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 46%;
		margin-bottom: 20rpx;

	}

	.audio-list .audio-item .item-top {
		/* height: 180rpx; */
	/* 	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		width: 100%;
		position: relative;

	}

	.audio-list .audio-item .item-top .img {
		width: 100%;
		height: 230rpx;
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
		height: 230rpx;
		border-radius: 15rpx;
		top: 0;
	}

	.audio-list .audio-item .item-top .name {
		position: absolute;
		opacity: .75;
		font-size: 24rpx;
		z-index: 1;
		color: #FFFFFF;
		margin-top: 80rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}

	.audio-list .audio-item .item-title {
		font-size: 30rpx;
		width: 100%;
		margin-top: 20rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		
	}

	.audio-list .audio-item .item-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 20rpx;
	}

	.audio-list .audio-item .item-bottom .data {
		font-size: 24rpx;
		color: #7784B3;
	}

	.audio-list .audio-item .item-bottom .icon {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 20%;
	}

	.audio-list .audio-item .item-bottom .icon>image {
		width: 40rpx;
		height: 40rpx;

	}


	/* end */



	/* 导航 */
	.navbar {
		margin-top: 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		width: 95%;
		margin-bottom: 20rpx;
		/* border-radius: 15rpx; */
		/* margin: 20rpx 0rpx; */
	}

	.navbar .navbar-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 30rpx;
		color: #383838;
	}

	.navbar .navbar-item image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.navbar .navbar-item>view {
		margin-top: 10rpx;
	}

	/* 经纪人 */


	.advise {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background-image: url(../../static/info_BG.png);
		width: 100%;
		background-size: cover;


	}

	.advise .top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 95%;
		height: 160rpx;
		margin-top: 30rpx;

	}

	.top .left {

		/* width: 20%; */
		height: 100%;
	}

	.top .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.top .right {

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* 	align-items: center; */
		height: 100%;
		width: 83%;

	}

	.top .right .right-top {
		height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* text-align: center; */
		width: 100%;
		color: #FFFFFF;
		/* 	opacity: .8; */

	}

	.top .right .right-top .uesername {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* width: 48%; */

	}

	.top .right .right-top .icon {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		text-align: center;
		align-items: center;
		border: 1rpx solid #FFFFFF;
		border-radius: 50rpx;
		padding: 0rpx 30rpx;
		font-size: 26rpx;
		height: 50rpx;
	}


	/* 	.top .right .right-top .icon image {
		width: 40rpx;
		height: 40rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		padding: 10rpx;
	}
	 */

	.top .right .right-top .uname {
		font-size: 36rpx;
	}

	.top .right .right-top .tel {
		font-size: 28rpx;
		line-height: 70rpx;
		margin-left: 10rpx;
	}

	.top .right .right-conter {

		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
		font-size: 24rpx;
		/* width: 85%; */
		color: #FFFFFF;
		/* 	opacity: .8; */
	

	}
.top .right .right-conter .wx{
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
	.top .right .right-conter .company {
		width: 55%;	
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.top .right .right-bottom {

		width: 100%;
		font-size: 24rpx;
		color: #FFFFFF;
		/* opacity: .8; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.top .right .right-bottom .bianjie {
		border: 1rpx solid #FFFFFF;
		/* border-radius: 50rpx; */
		/*  */
		padding: 0rpx 20rpx;
		font-size: 24rpx;
		height: 36rpx;


	}

	.top .right .right-bottom .qianming {

		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 73%;
	
	}

	.advise .bottom {

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		color: #FFFFFF;
		/* opacity: .8; */
		font-size: 24rpx;
		width: 95%;
		margin: 30rpx 0rpx;
	}

	.advise .bottom>view {
		width: calc(100% / 3);
	}

	.advise .bottom .preview {
		border-right: 1rpx solid #95CAFF;

		display: flex;
		flex-direction: column;
		justify-content: start;

	}

	.advise .bottom .activity {
		border-right: 1rpx solid #95CAFF;
		display: flex;
		flex-direction: column;
		justify-content: start;
	}

	.advise .bottom .likes {
		display: flex;
		flex-direction: column;
		justify-content: start;
	}

	.advise .bottom>view text {
		color: #FEF11D;
		font-size: 32rpx;
		text-align: center;
		margin-bottom: 10rpx;
	}
</style>
