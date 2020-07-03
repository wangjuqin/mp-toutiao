<template>
	<view class="container" v-if="display == 1">
		<form @submit="formSubmit" @reset="formReset" class="box-form" style="width: 95%;">

			<view class="title">
				<view class="">
					是否原创
				</view>
				<view class="redioe">
					<view :class="[author==1?'active':'']" @click="authorTop(1)">
						原创
					</view>
					<view :class="[author==2?'active':'']" @click="authorTop(2)">
						伪原创
					</view>
				</view>

				<!-- <input type="text" name="title" value="" /> -->
			</view>
			<view class="title">
				<view class="">
					标题
				</view>
				<input type="text" name="title" :value="oputitle" @input="titleTap" maxlength="40" />
			</view>

			<view class="page-body">
				<view class='wrapper'>
					<view class='toolbar' @tap="format">
						<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
						<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
						<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
						<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
						<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
						 data-value="left"></view>
						<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
						 data-value="center"></view>
						<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
						 data-value="right"></view>
						<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
						 data-value="justify"></view>
						<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
						 data-value="2"></view>
						<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
						 data-value="2em"></view>
						<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
						 data-value="20px"></view>
						<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
						 data-name="marginBottom" data-value="20px"></view>
						<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
						<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
						<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
						 data-value="24px"></view>

						<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
						 data-value="#0000ff"></view>
						<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
						 data-name="backgroundColor" data-value="#00ff00"></view>

						<view class="iconfont icon-date" @tap="insertDate"></view>
						<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
						<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
						 data-value="ordered"></view>
						<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
						 data-value="bullet"></view>
						<view class="iconfont icon-undo" @tap="undo"></view>
						<view class="iconfont icon-redo" @tap="redo"></view>

						<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
						<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
						<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
						<view class="iconfont icon-charutupian" @tap="insertImage"></view>
						<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
						 :data-value="1"></view>
						<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
						 data-value="sub"></view>
						<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
						 data-value="super"></view>
						<view class="iconfont icon-shanchu" @tap="clear"></view>
						<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
						 data-value="rtl"></view>

					</view>

					<editor id="editor" class="ql-container" :value="content"  name='content' placeholder="文章内容" showImgSize
					 showImgToolbar showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" @input='contenttop'>
					</editor>

					</editor>

				</view>
			</view>

			<!--  <editor id="editor" class="ql-container" name="content" value="" placeholder="文章内容" hidden></editor> -->

			<view class="video">
				<input type="text" :value="imageurl" name="image" hidden />
				<view class="">
					添加图片
				</view>

				<view class="images">
					<image :src="thumburl"  v-if="thumburl" style="width: 200rpx;height: 200rpx;"></image>
					<view class="upload-video">
						<image src="../../static/upload.png" mode="" @click="uploads"></image>
					</view>

				</view>
			</view>

			<view class="sumbilt-button">
				<button class="hose-sumbilt" @click="submitTap(0)" value="0">发布</button>
				<button class="hose-sumbilt" @click="submitTap(2)" value="2">保存为草稿</button>
			</view>
			<!-- <button class="hose-sumbilt" form-type="submit">发布</button> -->
			<!-- <button class="hose-sumbilt" form-type="submit">保存到草稿</button> -->
		</form>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				utils: utils,
				display:0,
				readOnly: false,
				formats: {},
				editorCtx: '',
				imageurl: '',
				thumburl:'',
				content: '',
				html: '',
				imgUrls: '',
				author: 1,
				opuid: '',
				oputitle: ''

			}
		},
		onLoad(e) {
			let _seft = this
			console.log('imgUrl', this.imgUrl)
			_seft.opuid = e.id
			_seft.imgUrls = _seft.imgUrl
			console.log('作品id', _seft.opuid)
		},
		onShow() {
			//con.usertype() //用户身份	
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
						/* 	uni.showToast({
								title:'没有权限',
								duration:1500,
								success() {
									uni.switchTab({
										url:"/pages/index/index"
									})
								}
							}) */
							console.log('我的身份1', restun)
						}
							
					}
							
				}
			})
			
			con.sendRequest({
				url: '/home/essay/get_show',
				method: 'get',
				data: {
					id: _seft.opuid
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.author = restun.author
						_seft.oputitle = restun.title
						_seft.content = restun.content
						_seft.imageurl = restun.image
						_seft.thumburl = utils.siteBaseUrl(restun.image)
						_seft.display = 1
						_seft.onEditorReady()
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
					author: _seft.author,
					title: _seft.oputitle,
					content: _seft.content,
					image: _seft.imageurl,
					status: index,
				}
				console.log('formdata', formdata)
				if (!_seft.imageurl) {
					uni.showToast({
						title: '请添加图片',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (!formdata.title) {
					uni.showToast({
						title: '标题不能为空',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (index == 0) {
					if (!formdata.content) {
						uni.showToast({
							title: '详情不能为空',
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




			},


			formRequest(formdata) {
				uni.showLoading({
					title: "请求中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Essay/add',
					method: 'post',
					data: formdata,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log(datas)
						if (datas.code == 1) {
							uni.navigateTo({
								url: '../myinfo/opus?type=1'
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
							title: '添加失败',
							icon: "none",
							duration: 1500,
						})
						return
					}
				})
			},
			titleTap(e) {

				let val = e.detail.value
				let len = e.detail.cursor
				this.oputitle = e.detail.value
				console.log(e)
			},

			uploads() {
				var _seft = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择

					success: function(res) {
						console.log(res);
						//_seft.tempFilePath = res.tempFilePath
						console.log(res.tempFilePaths[0]);
						_seft.uploadimage(res.tempFilePaths[0])
							

					}
				})

			},


			uploadimage(tempFilePath) {
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
						console.log(res);
						if (res.statusCode == 200) {
							var datas = JSON.parse(res.data)
							console.log('datas.code');
							if (datas.code == 1) {
								_seft.imageurl = datas.data.url
								_seft.thumburl = tempFilePath
							} else {
								uni.showToast({
									title: datas.msg,
									icon: "none",
									duration: 1500,
								})
							}
						} else {
							uni.showToast({
								title: '图片上传失败',
								icon: "none",
								duration: 1500,
							})
						}

					},
					fail: function(res) {
						console.log('fail', res)
					}

				});
			},


			contenttop(e) {
				let _seft = this
				let str = e.detail.html
				let urls = _seft.imgUrls
				str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(match, capture) {
					let dd =
						str = str.replace(new RegExp(capture, 'g'), capture.replace(urls + '/', '')) //这里也可以替换成需要的路径
				})

				_seft.content = str
				/* console.log('e.detail.html===========', e.detail.html, 'str', str) */
			},

			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				let _seft = this
				uni.createSelectorQuery().select('#editor').context((res) => {
					console.log('onEditorReady===========',res)
					this.editorCtx = res.context
					this.editorCtx.setContents({
						html: _seft.content //this.EditGoodsDetail.content为赋值内容。    
					})
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				let _seft = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						con.uploadFile({
							url: '/user/Upload/one', // 仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'file',
							formData: {
								file: res.tempFilePaths[0],
								filetype: 'image',
							},
							success: function(res) {
								if (res.statusCode == 200) {
									var datas = JSON.parse(res.data)

									if (datas.code == 1) {
										//_seft.imageurl = datas.data.url
										//'upload/' + datas.data.url  + '/upload/'
										console.log('datas.code', _seft.imgUrls + datas.data.url);
										_seft.editorCtx.insertImage({
											src: _seft.imgUrls + datas.data.url,
											alt: '图像',
											success: function() {
												console.log('insert image success')
											}
										})

									} else {
										uni.showToast({
											title: '图片上传失败',
											icon: 'none',
											duration: 1500,
										})
									}
								} else {
									uni.showToast({
										title: '图片上传失败',
										icon: 'none',
										duration: 1500,
									})
								}

							}

						});


					}
				})
			},
			authorTop(index) {
				this.author = index
			}
		},

	}
</script>

<style>
	@import "./editor-icon.css";

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 200rpx;
		width: 100%;
	}

	.page-body {
		width: 95%;
	}

	.wrapper {
		padding: 5px;
		margin-top: 30rpx;
	}

	.iconfont {
		display: inline-block;
		/* 	padding: 8px 8px; */
		width: 24px;
		/* height: 24px; */
		/* cursor: pointer; */
		font-size: 29rpx;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}


	.ql-container {
		box-sizing: border-box;
		/* 	padding: 12px 15px; */
		width: 100%;
		/* min-height: 30vh; */
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 29rpx;
		/* line-height: 1.5; */
	}

	.ql-active {
		color: #06c;
	}

	.title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		color: #AFAFAF;
		font-size: 33rpx;
		padding: 50rpx 0rpx;
		border-bottom: 1rpx solid #BCC2E6;
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

	.active {
		border: 1px solid rgba(56, 155, 254, 1) !important;
		background-color: #389BFE !important;
		color: #FFFFFF;
	}

	.title>input {
		width: 85%;
	}

	.video {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		width: 100%;
		color: #AFAFAF;
		font-size: 33rpx;
		padding: 50rpx 0rpx;
	}

	.video>view {
		width: 100%;
	}

	.video .images {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;

	}

	.video .upload-video {
		margin-top: 40rpx;
		margin-left: 20rpx;
	}

	.video .upload-video>image {
		width: 90rpx;
		height: 90rpx;
		padding: 50rpx;
		background-color: #F2F2F2;
		border: 1px solid rgba(202, 214, 226, 1);
	}

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
</style>
