<template>
	<view class="uni">
		<view class="box-top">
			<view class="message-top" v-if="answersdeta">
				<view class="user-mess">
					<view class="left">
						<image :src="answersdeta.avatar" mode=""></image>
						<view class="uname">
							{{answersdeta.user_nickname}}
						</view>
						<view class="data">
							{{utils.timeTodate('m-d',answersdeta.create_time*1000)}}
						</view>
					</view>

					<view class="botton" v-if="answersdeta.type == 1">
						未回答
					</view>
					<view class="botton" v-if="answersdeta.type == 2">
						已回答
					</view>

					<view class="botton" v-if="answersdeta.type == 3">
						已解决
					</view>

				</view>
				<view class="message-title">
					{{answersdeta.title}}
				</view>
				<view class="message-bottom">
					<view class="">

					</view>
					<!-- <view class="botton-dk">
						贷款
					</view> -->
					<view class="botton-hd" @click="anspost">
						我要回答
					</view>

				</view>


			</view>


		</view>

		<view class="house-navbar">
			<view class="left"> 最新回答</view>
		</view>
		<!-- @click="ansdis(a.id)" -->
		<block v-if="anslist.length > 0">
			<view class="box-content" v-for="(a,index) in anslist" :key="index">
				<view class="users">
					<image :src="a.avatar" mode=""></image>
					<view class="uname">
						{{a.user_nickname}}
					</view>
					<view class="data">
						{{utils.timeTodate('m-d',a.create_time*1000)}}
					</view>
				</view>

				<view class="act-content" @click="ansdis(a.id)">
					{{a.describe}}

				</view>
				<view class="bottom">
					<view class="data">

					</view>
					<view class="zan">
						<view class="shulaing" v-if="a.count">
							{{a.count}}
						</view>
						<image v-if="a.is_fabulous == 0|| a.is_fabulous ==null" src="../../static/praise_empty.png" mode="" @click="praisetop(index,a.id)"></image>
						<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(index,a.id)"></image>
						<!-- <image src="../../static/MSG_empty.png" mode="" @click="ansdis(a.id)"></image> -->

					</view>
				</view>

			</view>
		</block>
		<!-- 底部 -->
		<view class="flex-box">
			<view class="box-content">
				<view class="scan" @click="colloect" v-if="answersdeta.is_favorite == 0 || answersdeta.is_favorite == null ">
					<image src="../../static/subscribe.png"></image>
				</view>
				<view v-else class="scan" @click="nocolloect">
					<image src="../../static/subscribe2.png"></image>
				</view>

				<button class="zixun" type="default" hover-class="none" open-type="share">发给朋友 </button>
				<!-- 	<view class="zixun">
						发给朋友
		
					</view> -->
				<view class="tel" @click="shareFc">
					生成海报

				</view>

			</view>

		</view>
		<!-- end -->
		
		<uni-popup type="center" ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
				
					<image  :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini"  @tap.prevent.stop="saveImage()">保存图片</button>
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
				</view>
			</view>
		
		</uni-popup>
	
		
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	import _app from '@/common/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/common/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				title: 'Hello',
				utils: utils,
				asid: '',
				wechat_img: '',
				answersdeta: '', //问答
				anslist: [], //回答列表
				canvasId: 'default_PosterCanvasId',
				poster: {},
				qrShow:false,
			}
		},
		onLoad(e) {
			let _seft = this
			let asid = e.id
			_seft.asid = asid
			console.log(asid)
			con.sendRequest({
				url: '/home/Answer/getShowAnswer',
				method: 'GET',
				data: {
					id: asid
				},
				success: function(res) {
					var datas = res.data
					console.log(datas, '问答详情')
					if (datas.code == 1) {
						var restun = datas.data
						_seft.answersdeta = restun
					}
					//console.log('问答详情',datas)
				}
			})
			con.sendRequest({
				url: '/home/index/get_wechat_img',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					console.log(datas, '问答详情')
					if (datas.code == 1) {
						var restun = datas.data
						_seft.wechat_img = restun
					}else{
					uni.showToast({
						title: datas.msg,
						icon:"none"
					})	
					}
					//console.log('问答详情',datas)
				}
			})

			//问答列表
			con.sendRequest({
				url: '/home/Answer/getListQuestion',
				method: 'GET',
				data: {
					id: asid
				},
				success: function(res) {
					var datas = res.data

					if (datas.code == 1) {
						var restun = datas.data
						_seft.anslist = restun
					}else{
						uni.showToast({
							title: datas.msg,
							icon:"none"
						})
					}
					console.log('回答列表', datas)
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})


		},
		onShareAppMessage(res) {
			let _seft = this
			con.sendRequest({
				url: '/home/index/share',
				method: 'GET',
				data: {
					id: _seft.answersdeta.id,
					type: 5 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师 
				},
				success: function(res) {

					var datas = res.data
					console.log('分享成功', datas)
					if (datas.code == 1) {
						uni.showToast({
							title: '分享成功',
							icon: "none",
						})
					}

				}
			})
			return {
				title: _seft.answersdeta.describe, //标题
				desc: _seft.answersdeta.title,
				path: 'pages/news/answers_details?id=' + _seft.answersdeta.id, ///链接
				imageUrl: _seft.answersdeta.avatar, //图片
			}
		},


		methods: {
			ansdis(index) {
				uni.navigateTo({
					url: '../news/answers_discuss?id=' + index
				})
			},
			anspost() {
				console.log('')
				uni.navigateTo({
					url: '../answer/index?id=' + this.asid
				})
			},
			praisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'GET',
					data: {
						id: id,
						type: 8
					},
					success: function(res) {
						var datas = res.data

						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none"
							})

							_seft.anslist[index].is_fabulous = 1
							_seft.anslist[index].count = _seft.anslist[index].count + 1

						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none"
							})
						}
						//console.log('问答详情',datas)
					}
				})
			},
			nopraisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'GET',
					data: {
						id: id,
						type: 8
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none"
							})
							_seft.anslist[index].is_fabulous = 0
							_seft.anslist[index].count = _seft.anslist[index].count - 1

						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none"
							})
						}
					}
				})
			},
			colloect() { //订阅问题
				let _seft = this
				uni.showLoading({
					title: "请求中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'GET',
					data: {
						object_id: _seft.asid,
						type: 5
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
							_seft.answersdeta.is_favorite = 1
							uni.showToast({
								title: datas.msg,
								icon: "none"
							})


						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none"
							})
						}
					}
				})
			},
			nocolloect() { //订阅问题
				let _seft = this
				uni.showLoading({
					title: "请求中"
				})
				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'GET',
					data: {
						id: _seft.asid,
						type: 5
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
							_seft.answersdeta.is_favorite = 0
							uni.showToast({
								title: datas.msg,
								icon: "none"
							})

						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none"
							})
						}
					}
				})
			},
			
			async shareFc() {
				let _seft = this
				_seft.qrShow = false
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: _seft.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 1000,
							height: 1520,
							backgroundColor: '#FFF'
						},
			
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							console.log(dx, fontSize, lineHeight, bgObj.width, bgObj.height)
					
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('#389BFE');
											/* Context.setGlobalAlpha(0.3); */
			
											/* Context.fillRect(0, bgObj.height - bgObj.height * 0.9, bgObj.width*0.05, bgObj.height * 0.05); */
											Context.fillRect(30, 150, 200, 90);
											Context.fillRect(30, 500, 300, 90);
											
											Context.setGlobalAlpha(1);
										}
									},
									{
										type: 'text',
										text: '派好房 ',
										size: 55,
										color: '#389BFE',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 30,
										dy: 100,
									},
									{
										type: 'text',
										text: '问题 ',
										size: 55,
										color: '#FFF',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 75,
										dy: 200,
									},
									{
										type: 'text',
										text:_seft.answersdeta.title ,//_seft.answersdeta.title
										size: 52,
										color: '#000',
										/* alpha: .5, */
										textAlign: 'left',
										textBaseline: 'middle',
										lineFeed: {
											maxWidth: bgObj.width - 30,
											lineHeight: 100,
											lineNum: 2,
										},
										dx: 60,
										dy: 300,
									
									},
									{
										type: 'text',
										text: '优质回答 ',
										size: 55,
										color: '#FFF',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 75,
										dy: 555,
									},
									{
										type: 'text',
										text: _seft.anslist[0].describe,//_seft.anslist[0].describe
										size: 52,
										color: '#000',
										textAlign: 'left',
										textBaseline: 'middle',
										lineFeed: {
											maxWidth: bgObj.width - 30,
											lineHeight: 100,
											lineNum: 2,
										},
										dx: 60,
										dy: 650,
									},
									{
										type: 'image',
										url: utils.siteBaseUrl(_seft.wechat_img),
										dx:bgObj.width/2 - 150,
										dy: bgObj.height - 500,
										dWidth: 300,
										dHeight: 300,
									},
									{
										type: 'text',
										text: '关注派好房 ',
									    alpha: .6,
										size: 40,
										color: '#000',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: bgObj.width/2 - 120,
										dy: bgObj.height - 150,
									}, {
										type: 'text',
										text: '买房更省心 ',
										  alpha: .6,
										size: 40,
										color: '#000',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: bgObj.width/2 - 120 ,
										dy: bgObj.height - 100,
									},
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							_seft.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					_seft.poster.finalPath = d.poster.tempFilePath;
					console.log(_seft.poster.finalPath)
					_seft.qrShow = true;
					_seft.$refs.popup.open()
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
					
	
			
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},

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

	button {
		position: initial;
		font-size: 30rpx !important;
	}

	button::after {

		position: initial;
		border: none;
	}

	.box-top {
		width: 100%;
		background-color: #389BFE;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.message-top {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 95%;
		background-color: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 55rpx;
	}

	.message-top .user-mess {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: cneter;
		text-align: center;
		width: 95%;
		margin: 30rpx;

	}

	.message-top .user-mess .left {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: cneter;
		text-align: center;
		width: 60%;
		/* height: 50rpx; */
	}

	.message-top .user-mess .left>image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;

	}

	.message-top .user-mess .left .uname {
		font-size: 24rpx;
		color: #2A4D9C;
		height: 100%;
		line-height: 60rpx;
		margin-left: 20rpx;

	}

	.message-top .user-mess .left .data {
		font-size: 23rpx;
		color: #9A9A9A;
		height: 100%;
		line-height: 60rpx;
		margin-left: 20rpx;
	}

	.message-top .user-mess .botton {
		background-color: #63DB4F;
		color: #FFFFFF;
		font-size: 22rpx;
		/* height: 100%; */
		width: 15%;
		height: 40rpx;
		line-height: 40rpx;

	}

	.message-title {
		font-size: 35rpx;
		font-weight: 550;
		width: 95%;
	}

	.message-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
		align-items: center;
		width: 95%;
		margin: 30rpx;
	}

	.message-bottom .botton-dk {
		background-color: #FFF0F0;
		font-size: 23rpx;
		color: #FE7995;
		width: 15%;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 9rpx;
	}

	.message-bottom .botton-hd {
		background-color: #EEF6FE;
		font-size: 24rpx;
		color: #389BFE;
		width: 25%;
		height: 50rpx;
		line-height: 50rpx;
	}

	.house-navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 95%;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		height: 52rpx;
	}

	.house-navbar .left {
		font-size: 40rpx;
		font-family: FZLanTingHei-L-GBK;
		font-weight: 549;
		color: rgba(0, 0, 0, 1);
	}

	.box-content {
		display: flex;
		flex-direction: column;
		/* text-align: center; */
		width: 95%;
		margin-top: 30rpx;
	}

	.box-content .users {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
		width: 60%;
	}

	.box-content .users>image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.box-content .users .uname {
		font-size: 24rpx;
		color: #2A4D9C;
		height: 100%;
		margin-left: 20rpx;
		line-height: 60rpx;
	}

	.box-content .users .data {
		font-size: 23rpx;
		color: #9A9A9A;
		margin-left: 20rpx;
		line-height: 60rpx;
	}

	.box-content .act-content {
		margin-top: 20rpx;
		display: flex;
		justify-content: start;
		flex-direction: column;
		/* white-space: wrap; */
		word-wrap: break-word;
		/* margin-left: 90rpx; */
		width: 95%;
		font-size: 27rpx;
	}

	.box-content .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;

	}

	.box-content .bottom .data {
		font-size: 24rpx;
		color: #BFC4D9;
	}

	.box-content .bottom .zan {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* width: 25%; */
	}

	.box-content .bottom .zan .shulaing {
		font-size: 24rpx;
		color: #BFC4D9;

	}

	.box-content .bottom .zan>image:nth-of-type(1) {
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
	}

	.box-content .bottom .zan>image:nth-of-type(2) {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
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
		font-size: 30rpx;

	}

	.flex-box .scan {
		margin-left: 5%;
	}

	.flex-box .scan>image {
		width: 70rpx;
		height: 70rpx;

	}

	.flex-box .zixun {
		background-color: #7CE311;
		color: #FFFFFF;
		/* font-size: 36rpx; */
		border-radius: 20rpx;
		width: 30%;
		line-height: 70rpx;
	}

	.flex-box .tel {
		background-color: #38AEFE;
		color: #FFFFFF;
		/* font-size: 36rpx; */
		border-radius: 20rpx;
		width: 30%;
		line-height: 70rpx;
	}

	/* end */
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
	.hideCanvasView {
		position: relative;
	}
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
</style>
