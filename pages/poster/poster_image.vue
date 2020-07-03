<template>
	<view class="content">
		<view style="width: 100%;" v-bind:style="{height:windowHeight}">
			<!-- <image src="/www/wwwroot/paihaofang.feifenxiao.com/public/upload/default/image/1589869438.png" mode=""></image> -->
			<image class="box-img" @click="codetop" :src="utils.siteBaseUrl('default/image/1589968739.png')" mode=""></image>
		</view>
	<uni-popup type="top" ref="popup">
		<view  class="share-tip">
			<view class="">
				
			</view>
			<image  src="../../static/share-tip.png" mode=""></image>
		</view>
		<view class="">
			
		</view>
		
	</uni-popup>


	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				utils: utils,
				posterdata: '',
				postid: '',
				windowHeight: ''

			}
		},
		onLoad(e) {
			let _seft = this
			_seft.postid = e.id
			//_seft.$refs.popup.open()
			//海报
			con.sendRequest({
				url: '/home/poster/info',
				method: 'get',
				data: {
					id: _seft.postid
				},
				success: function(res) {
					console.log('海报', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.posterdata = restun
					} else {
						uni.showToast({
							title: datas.msg,
							icon: "none",
							duration: 1500,
						})
						return
					}
				}
			})

			uni.getSystemInfo({
				success: function(res) {
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					_seft.windowHeight = res.windowHeight + 'px'

				}
			})

		},
		onShow() {
			con.usertype() //用户身份		
		},
		onShareAppMessage(res) {
			let _seft = this
			con.sendRequest({
				url: '/home/index/share',
				method: 'GET',
				data: {
					id: _seft.cards.id,
					type: 6 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师 
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
				title: _seft.cards.describe, //标题
				/* desc:_seft.cards.describe,
				content:_seft.cards.describe, */
				path: 'pages/consultants/details?id=' + _seft.cards.id, ///链接
				//	imageUrl: _seft.cards.avatar,  //图片	
			}

		},
		methods: {
			codetop() {
				let _seft = this;
				//_seft.$refs.popup.open()
				
				let imgs = []
				/* utils.siteBaseUrl(_seft.posterdata.path) */
				imgs.push(utils.siteBaseUrl('default/image/1589968739.png'))
				// 预览图片
				console.log('posterdata', imgs);

				uni.previewImage({
					current: 1,
					urls: imgs,
					indicator: 'number',
					loop: true,
					success: function(res) {
						console.log('调用成功', res)

					},
					fail: function(res) {
						console.log('调用', res)
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
		width: 100%;
	}

	.box-img {
		width: 100%;
		height: 100%;
	}
	.share-tip{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		
	}
	
	.share-tip>image{
			width: 70%;
			height: 250rpx;
	}
</style>
