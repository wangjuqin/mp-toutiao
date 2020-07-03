<template>
	<view class="content">

		<map style="width: 100%; height: 300rpx;" :latitude="latitude" :longitude="longitude" scale='10' :markers="covers"
		 altitude="true">
		</map>
		<view class="detalis" v-if="dirtpat">
			<view class="detalis-list">
				<!-- 	<view class="detalis-item">
					地块面积： <text>{{dirtpat.address_area}}</text>
				</view> -->
				<view class="detalis-item">
					宗地位置： <text>{{dirtpat.address}}</text>
				</view>
				<!-- 	<view class="detalis-item">
					楼面积： <text> {{dirtpat.area}}</text> m²
				</view> -->
				<view class="detalis-item">
					竞得方： <text>{{dirtpat.obtain}}</text>
				</view>
			</view>
			<view class="detalis-lists">
				<view class="detalis-lists_left">
					<view class="detalis-item">
						起拍价: <text> {{dirtpat.starting_price}}</text>元 /m²
					</view>
					<view class="detalis-item">
						成交价: <text> {{dirtpat.transaction_price}}</text>元 /m²
					</view>
					<view class="detalis-item">
						出让面积： <text>{{dirtpat.granting_area}}</text>元 /m²
					</view>
					<view class="detalis-item">
						成交总价： <text>{{dirtpat.amount}} </text>元 /m²
					</view>

					<view class="detalis-item">
						最大容积率：<text>{{dirtpat.volume}} </text>
					</view>

					<view class="detalis-item">
						溢价率： <text>{{dirtpat.premium_rate}} </text>
					</view>
					<view class="detalis-item">
						土地用途： <text>{{dirtpat.land_use}}</text>
					</view>

					<view class="detalis-item">
						出让年限： <text>{{dirtpat.year}}</text>
					</view>
				</view>

				<view class="detalis-lists_right">
					<image :src="utils.siteBaseUrl(dirtpat.wechat_url)" mode=""></image>
					<view>
						关注派好房
					</view>
					<view>
						买房更省心
					</view>

				</view>
			</view>
			<view class="detalis-list">
				<view class="detalis-item">
					宗地编号： <text>
						{{dirtpat.number}}
					</text>
				</view>
				<view class="detalis-item">
					成交日期：
					<text>
						{{dirtpat.end_time}}
					</text>
				</view>
			</view>

			<!-- 底部 -->
			<view class="flex-box">
				<view class="box-content">
					<button class="zixun" type="default" hover-class="none" open-type="share">发给朋友 </button>
					<view class="tel" @click="shareFc">
						生成海报
					</view>

				</view>

			</view>
			<!-- end -->
		</view>
		<uni-popup type="center" ref="popup">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
				</view>
			</view>

		</uni-popup>
		<!-- 	<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
		
		</view> -->

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
				title: 'map',
				dirtpat: '',
				canvasId: 'default_PosterCanvasId',
				poster: {},
				utils: utils,
				latitude: 39.909,
				longitude: 116.39742,
				image: '',
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/map.png'
				}],
				cansWidth: 270, //海报宽度
				cansHeight: 430, //海报高度
				windowWidth: '',
				windowHeight: '',
				qrShow: false,
			}
		},
		onLoad(e) {
			let _seft = this
			let drid = e.id
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					_seft.windowHeight = res.windowHeight
					_seft.windowWidth = res.windowWidth

				}
			})
			//土拍
			con.sendRequest({
				url: '/home/dirt/getInfo',
				method: 'get',
				data: {
					id: drid
				},
				success: function(res) {
					var datas = res.data
					console.log('土拍', datas)
					if (datas.code == 1) {
						var restun = datas.data
						if (restun.coordinate) {
							var coordinate = restun.coordinate.split(',')
							console.log('土拍', coordinate)
							_seft.latitude = coordinate[0]
							_seft.longitude = coordinate[1]
							_seft.covers = [{
								latitude: coordinate[0],
								longitude: coordinate[1],
								iconPath: '../../static/map.png',
								width: 20,
								height: 20
							}]
						} else {
							uni.getLocation({
								type: 'gcj02 ',
								success: function(res) {
									console.log()
									_seft.longitude = res.longitude
									_seft.latitude = res.latitude
								}
							});
						}


						_seft.dirtpat = restun

					}
				}

			})
			con.sendRequest({
				url: '/home/dirt/getMapAddress',
				method: 'get',
				success: function(res) {
					var datas = res.data
					console.log('土拍', datas)
					if (datas.code == 1) {
						var restun = datas.data
						// var coordinate=restun.coordinate.split(',')
						// _seft.latitude = coordinate[0]
						// _seft.longitude = coordinate[1]
						/* 		_seft.covers= [{
									latitude: coordinate[0],
									longitude: coordinate[1],
									iconPath: '../../static/map.png',
									width:20,
									height:20
								}] */

						//_seft.dirtpat = restun

					}
				}

			})



		},
		onShareAppMessage(res) {
			let _seft = this
			con.sendRequest({
				url: '/home/index/share',
				method: 'GET',
				data: {
					id: _seft.dirtpat.id,
					type: 4 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师 
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
				title: _seft.dirtpat.address, //标题
				/* desc: _seft.dirtpat.title, */
				path: 'pages/news/dirtpatdetails?id=' + _seft.dirtpat.id, ///链接
				// imageUrl: utils.siteBaseUrl(_seft.dirtpat.wechat_url), //图片
			}
		},


		methods: {

			async shareFc() {
				let _seft = this

				let str = ['宗地位置：' + _seft.dirtpat.address, '竞得方：' + _seft.dirtpat.obtain, '起拍价：' + _seft.dirtpat.starting_price,
					'成交价：' + _seft.dirtpat.transaction_price, '出让面积:' + _seft.dirtpat.granting_area,
					'成交总价：' + _seft.dirtpat.amount, '最大容积率：' + _seft.dirtpat.volume, '溢价率：' + _seft.dirtpat.premium_rate,
					'土地用途：' + _seft.dirtpat.land_use, '出让年限：' + _seft.dirtpat.year, '宗地编号：' + _seft.dirtpat.number, '成交日期：' + _seft.dirtpat
					.end_time
				]

				let textarr = []
				for (let item in str) {
					var ss = {}
					ss['text'] = str[item]
					ss['size'] = 55
					ss['textAlign'] = 'left'
					ss['color'] = '#000'
					ss['textBaseline'] = 'middle'
					ss['dx'] = 10
					ss['dy'] = 100 + (100 * item)
					textarr.push(ss)
				}
				console.log(textarr)


				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 1080,
							height: 1920,
							backgroundColor: '#FFF'
						},

						textArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							return textarr

						},

						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('#666');
											Context.setGlobalAlpha(0.25);
											Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
											/* Context.fillRect(0, bgObj.height - 400, bgObj.width, 400); */
											Context.setGlobalAlpha(1);
										}
									},
									{
										type: 'text',
										text: '关注派好房 ',
										size: 50,
										color: '#000',
										textAlign: 'right',
										textBaseline: 'middle',
										dx: bgObj.width - 100,
										dy: bgObj.height - 250,
									}, {
										type: 'text',
										text: '买房更省心 ',
										size: 50,
										color: '#000',
										textAlign: 'right',
										textBaseline: 'middle',
										dx: bgObj.width - 100,
										dy: bgObj.height - 150,
									},
									{
										type: 'image',
										url: utils.siteBaseUrl(this.dirtpat.wechat_url),
										dx: 10,
										dy: bgObj.height - 350,
										dWidth: 300,
										dHeight: 300,
									},
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
					this.$refs.popup.open()
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
	.content {
		/* 	display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 200rpx; */
		width: 100%;
	}

	.hideCanvasView {
		position: relative;
	}

	button {
		position: initial;
		font-size: 30rpx !important;
	}

	button::after {

		position: initial;
		border: none;
	}

	.detalis {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding-bottom: 200rpx;
	}

	.detalis .detalis-list {
		display: flex;
		flex-direction: column;
		justify-content: start;
		border-bottom: 4rpx solid #EEEEEE;
		padding-bottom: 20rpx;
		margin: 30rpx 0rpx 0rpx 30rpx;
	}

	.detalis .detalis-list .detalis-item {
		display: flex;
		flex-direction: row;
		justify-content: end;
		/* text-align: center; */
		font-size: 26rpx;
		line-height: 60rpx;
		color: #9A9A9A;
	}

	.detalis .detalis-list .detalis-item>text {
		color: #000000;
		width: 80%;
	}

	.detalis .detalis-lists {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		border-bottom: 4rpx solid #EEEEEE;
		margin: 30rpx 0rpx 0rpx 30rpx;
		padding-bottom: 20rpx;
	}

	.detalis .detalis-lists .detalis-lists_left {
		display: flex;
		flex-direction: column;
		justify-content: end;
		width: 50%;
	}

	.detalis .detalis-lists .detalis-lists_left .detalis-item {
		display: flex;
		flex-direction: row;
		justify-content: end;
		text-align: center;
		font-size: 26rpx;
		line-height: 60rpx;
		color: #9A9A9A;
	}

	.detalis .detalis-lists .detalis-lists_left .detalis-item>text {
		color: #000000;
	}


	.detalis .detalis-lists .detalis-lists_right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;

	}

	.detalis .detalis-lists .detalis-lists_right>image {
		width: 160rpx;
		height: 160rpx;
	}

	.detalis .detalis-lists .detalis-lists_right>view {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #9A9A9A;
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

	.flex-box .scan>image {
		width: 70rpx;
		height: 70rpx;

	}

	.flex-box .zixun {
		background-color: #7CE311;
		color: #FFFFFF;
		/* font-size: 36rpx; */
		border-radius: 15rpx;
		width: 45%;
		line-height: 70rpx;
	}

	.flex-box .tel {
		background-color: #38AEFE;
		color: #FFFFFF;
		/* font-size: 36rpx; */
		border-radius: 15rpx;
		width: 45%;
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
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
</style>
