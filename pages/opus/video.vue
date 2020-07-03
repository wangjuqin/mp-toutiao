<template>
	<view class="content"  v-if="display == 1"  >
		<!--  v-bind:style="{display:display}" -->
		<block v-if="isshow ==0">
			<!-- @submit="formSubmit" @reset="formReset" -->
			<form class="box-form" id="forms" style="width: 95%;">
				<input type="text" name="id" :value="opuid" hidden />
				<view class="title">
					<view class="">
						视频类型
					</view>
					<view class="redioe">
						<view :class="[type==1?'actives':'']" @click="typeTop(1)">
							楼盘直达
						</view>
						<view :class="[type==2?'actives':'']" @click="typeTop(2)">
							房产知识
						</view>
					</view>

					<input type="text" name="type" :value="type" hidden />
				</view>
				<view class="title">
					<view class="">
						标题
					</view>
					<input type="text" name="title" :value="oputitle" maxlength="40" @input="titleTap" />
				</view>
				<view class="select-house" v-if="type == 1">

					<input type="text" :value="houseid" name="properties_id" hidden />
					<view class="">
						楼盘
					</view>
					<view class="house">
						{{housname}}
					</view>
					<button class="house-btn" type="primary" @click="housebtn">选择楼盘</button>

				</view>

				<view class="video">
					<input type="text" :value="videourl" name="video" hidden />
					<input type="text" :value="thumburl" name="image" hidden />
					<view class="">
						添加视频
					</view>
					<view class="upload-video">
						<video :src="utils.siteBaseUrl(videourl)" controls='false' muted='true' v-if="videourl" style="width: 200rpx;height: 200rpx;"></video>
						<image src="../../static/upload.png" class="upload-image" mode="" @click="uploads"></image>
					</view>
					<view class="upload-tip">
						建议添加横屏视频
					</view>
				</view>
				<view class="sumbilt-button">
					<button class="hose-sumbilt" @click="submitTap(0)" value="0">发布</button>
					<button class="hose-sumbilt" @click="submitTap(2)" value="2">保存为草稿</button>
				</view>
			</form>

		</block>


		<uni-popup type="top" ref="popup">
			<view class="popupconten">
				<my-search style="width: 100%;background-color: #EEF6FE;" @send="getCenters"></my-search>
				<block v-if="Propertieslimit.length > 0">
					<scroll-view scroll-y="true" style="width: 100%;height: 88%;" @scrolltolower='scrollBottom' show-scrollbar="true">
						<view class="housename" v-for="(a,index) in Propertieslimit" :key="index" :class="[selecthouse == a.id?'active':'']"
						 @click="selHouseTop(a.id,a.title)">
							{{a.title}}
						</view>
					</scroll-view>

				</block>
				<block v-else>
					<view class="housename">
						未找到楼盘，输入楼盘名称
					</view>
				</block>
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
				title: 'Hello',
				utils: utils,
				candidates: ['新闻', '热门', '资讯'],
				videourl: '',
				tempFilePath: '',
				houseid: '',
				housname: '',
				isshow: 0,
				limits: 10,
				pages1: 1,
				Propertieslimit: [],
				center: '',
				type: 1,
				thumburl: '',
				oputitle: '',
				opuid: '',
				display: 0,
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.opuid = e.id
			_seft.houseid = e.houseid ? e.houseid : ''
			console.log('作品id', _seft.opuid)
		},
		onShow() {
			
			/* let types = con.usertype() //用户身份	
			
			console.log('types', types) */
			let _seft = this
			
			
			con.sendRequest({
				url: '/user/Shop/isShop',
				method: 'post',
				success: function(res) {
					//1普通用户  2经纪人或置业顾问
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						if (restun == 2) {
							_seft.display = 1
							console.log('我的身份2', restun)
						} else {
							uni.showToast({
								title:'没有权限',
								duration:1500,
								success() {
									uni.switchTab({
										url:"/pages/index/index"
									})
								}
							})
							console.log('我的身份1', restun)
						}
							
					}
							
				}
			})
			con.sendRequest({
				url: '/home/Video/get_show',
				method: 'get',
				data: {
					id: _seft.opuid
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.type = restun.type
						_seft.oputitle = restun.title
						_seft.properties_id = restun.properties_id
						_seft.videourl = restun.video
						_seft.thumburl = restun.image
						_seft.status = restun.status
						_seft.housname = restun.properties_title
						console.log('作品', restun)
					}

				}

			})


		},
		methods: {
			submitTap(index) {
				let _seft = this
				let title = '确定提交审核吗？'
				//status  0.提交  2. 草稿  
				let formdata = {
					id: _seft.opuid,
					type: _seft.type,
					title: _seft.oputitle,
					properties_id: _seft.houseid,
					video: _seft.videourl,
					image: _seft.thumburl,
					status: index,
				}
				console.log('formdata', formdata, )
				if (!formdata.title) {
					uni.showToast({
						title: '标题不能为空',
						icon: "none",
						duration: 1500,
					})
					return
				}

				if (formdata.status == 0) {
					if (!_seft.videourl) {
						uni.showToast({
							title: '请添加视频',
							icon: "none",
							duration: 1500,
						})
						return
					}
					if (_seft.type == 1 && !formdata.properties_id) {
						uni.showToast({
							title: '请选择楼盘',
							icon: "none",
							duration: 1500,
						})
						return
					}
				} else {
					title = '确定保存为草稿吗!'
				}

				uni.showModal({
					title: '添加作品',
					content: title,
					success: res => {
						if (res.confirm) {
							_seft.formRequest(formdata)
						}
					},

				});

				console.log('formdata', formdata)


			},


			titleTap(e) {

				let val = e.detail.value
				let len = e.detail.cursor
				this.oputitle = e.detail.value
				console.log(e)
			},

			formSubmit: function(e) {

			},
			formRequest(formdata) {
				uni.showLoading({
					title: "请求中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Video/add',
					method: 'post',
					data: formdata,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log(datas)
						if (datas.code == 1) {
							uni.navigateTo({
								url: '../myinfo/opus?type=0'
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 1500,
							})
							return
						}
					},
					fail: function(res) {
						uni.showToast({
							title: '提交失败',
							icon: "none",
							duration: 1500,
						})
						return
					}
				})
			},


			scrollBottom() {
				let _seft = this
				_seft.pages++
				console.log(_seft.pages, '来来来')
				con.sendRequest({
					url: '/home/search/propertiesList',
					method: 'get',
					data: {
						p: _seft.pages,
						limit: _seft.limits,
						keyword: _seft.center
					},
					success: function(res) {
						var datas = res.data
						//console.log(datas)
						/* return */
						if (datas.code == 1) {
							var restun = datas.data
							console.log('loupan', restun)
							_seft.Propertieslimit = _seft.Propertieslimit.concat(restun)
							console.log('loupan', _seft.Propertieslimit)
						}

					}

				})

			},

			getCenters(e) {
				let _seft = this
				_seft.center = e
				_seft.pages = 1
				console.log(_seft.pages, _seft.limits)
				_seft.houselist()


			},
			houselist() {
				let _seft = this
				con.sendRequest({
					url: '/home/search/propertiesList',
					method: 'get',
					data: {
						p: _seft.pages,
						limit: _seft.limits,
						keyword: _seft.center
					},
					success: function(res) {
						var datas = res.data
						//console.log(datas)
						/* return */
						if (datas.code == 1) {
							var restun = datas.data
							console.log('loupan', restun)
							_seft.Propertieslimit = restun
							console.log('loupan', _seft.Propertieslimit)
						}

					}

				})
			},

			selHouseTop(id, title) {
				let _seft = this
				_seft.housname = title
				_seft.houseid = id
				console.log(id)
				_seft.$refs.popup.close()
			},

			uploads() {
				let _seft = this
				_seft.chooseVideos()

			},
			chooseVideos() {
				let promise = new Promise((resolve, reject) => {
					let _seft = this
					uni.chooseVideo({
						sourceType: ['album', 'camera'], //从相册选择
						compressed: 'true',
						maxDuration: '60', //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
						success: function(res) {
							console.log(res);

							/* _seft.tempFilePath = res.tempFilePath
							_seft.thumburl = res.thumbTempFilePath */
							_seft.uploadvideo(res.tempFilePath)
							_seft.uploadimage(res.thumbTempFilePath)
							resolve()
						}
					})
				})
				return promise

			},



			uploadimage(tempFilePath) {
				let promise = new Promise((resolve, reject) => {
					let _seft = this
					uni.showLoading({
						title: "请求中",
						mask:true
					})
					con.uploadFile({
						url: '/user/Upload/one', ///user/Upload/one
						filePath: tempFilePath,
						fileType: 'image',
						name: 'file',
						formData: {
							file: tempFilePath,
							filetype: 'image',
						},
						success: function(res) {
							uni.hideLoading()
							if (res.statusCode == 200) {
								var datas = JSON.parse(res.data)
								console.log('图片上传', datas)
								if (datas.code == 1) {
									_seft.thumburl = datas.data.url
								} else {
									uni.showToast({
										title: '图片上传失败',
										icon: "none",
										duration: 1500,
									})
								}
								resolve()
							} else {
								uni.showToast({
									title: '图片上传失败',
									icon: "none",
									duration: 1500,
								})
							}
							resolve()
						},
						fail: function(res) {
							console.log('fail', res)
						}

					});
				})
				return promise

			},

			uploadvideo(tempFilePath) {
				let _seft = this

				uni.showLoading({
					title: "请求中",
					mask:true
				})
				con.uploadFile({
					url: '/user/Upload/one', // /user/Upload/one仅为示例，非真实的接口地址
					filePath: tempFilePath,
					fileType: 'video',
					name: 'file',
					formData: {
						file: tempFilePath,
						filetype: 'video',
					},
					success: function(res) {
						uni.hideLoading()
						if (res.statusCode == 200) {
							var datas = JSON.parse(res.data)
							console.log('视频上传', datas);
							if (datas.code == 1) {
								_seft.videourl = datas.data.url
							} else {
								uni.showToast({
									title: datas.msg,
									icon: "none",
									duration: 1500,
								})
							}
						} else {
							uni.showToast({
								title: '视频上传失败',
								duration: 1500,
							})
						}

					},
					fail: function(res) {
						uni.hideLoading()
						console.log('fail', res)
					}

				});
			},
			housebtn() {
				let _seft = this
				_seft.$refs.popup.open()


			},
			typeTop(index) {

				this.type = index
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


	.popupconten {
		width: 100%;
		position: absolute;
		height: 900rpx;
		left: 0;
		right: 0;
		top: 0;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;

		z-index: 22222;

	}

	.uni-comboxs {

		border-bottom: 1rpx solid #BCC2E6;
		color: #AFAFAF;
		font-size: 29rpx;
		padding: 30rpx 0rpx;

	}

	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;


		color: #AFAFAF;
		font-size: 33rpx;
		padding: 50rpx 0rpx;
		border-bottom: 1rpx solid #C4C2CE;
	}

	.title .redioe {

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		color: #000000;

	}

	.title .redioe>view {
		border: 1px solid #F2F2F2;
		font-size: 29rpx;
		background-color: #F2F2F2;
		margin: 0rpx 15rpx;
		padding: 10rpx 30rpx;
		border-radius: 15rpx;

	}

	.actives {
		border: 1px solid rgba(56, 155, 254, 1) !important;
		background-color: #389BFE !important;
		color: #FFFFFF;
	}

	.title>input {
		width: 85%;
		color: #000000;
	}


	.select-house {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		color: #AFAFAF;
		font-size: 33rpx;
		padding: 50rpx 0rpx;
		border-bottom: 1rpx solid #C4C2CE;
	}

	.select-house .house {
		width: 60%;
		color: #000;
		margin-left: 20rpx;

	}

	.select-house .house-btn {
		background: #EEF6FE;
		border: 1px solid rgba(56, 155, 254, 1);
		color: rgba(56, 155, 254, 1);
		border-radius: 30rpx;
		font-size: 29rpx;
		line-height: 60rpx;

	}

	.video {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;

		color: #AFAFAF;
		font-size: 33rpx;
		padding: 50rpx 0rpx;
	}

	.video>view {
		width: 100%;
	}

	.video .upload-tip {
		font-size: 24rpx;
		margin-top: 20rpx;
		margin-left: 40rpx;
	}

	.video .upload-video {
		margin-top: 40rpx;
	}

	.video .upload-video .upload-image {
		width: 90rpx;
		height: 90rpx;
		padding: 50rpx;
		background-color: #F2F2F2;
		border: 1px solid rgba(202, 214, 226, 1);
		margin-left: 20rpx;
	}

	/* 	.video .upload-video>image {
	
	} */
	.sumbilt-button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		width: 95%;

	}

	.hose-sumbilt {
		margin-top: 40rpx;
		background: rgba(56, 155, 254, 1);
		border: 1px solid rgba(56, 155, 254, 1);
		color: #FFFFFF;
		font-size: 38rpx;
		color: #FFFFFF;
		background-color: #389BFE;
		width: 40%;
		line-height: 80rpx;


	}

	.active {
		color: #389BFE !important;

	}

	.housename {
		border-bottom: 1rpx solid #BCC2E6;
		width: 95%;
		color: #3D3D3D;
		font-size: 32rpx;
		line-height: 120rpx;


	}
</style>
