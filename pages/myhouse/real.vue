<template>
	<view class="container" v-if="display == 1">


		<form @submit="formSubmit" @reset="formReset" class="box-form">
			<input type="text" name='properties_id' :value="housid" hidden />
			<!-- 	<view class="title">
				<view class="">
					标题
				</view>
				<input type="text" name="title" value="" />
			</view> -->
			<view class="textarea">
				<textarea value="" name="content" placeholder="输入内容" />

				</view>
			
			
			<view class="upload-image">
					<input type="text" name='images' :value="imageurl" hidden maxlength="-1" />
				
					<image     v-if="imageurl.length > 0 " v-for="(item,index) in imageurl" :key="index"  :src="utils.siteBaseUrl(item)"   style="width: 200rpx;height: 200rpx;"></image>
			
				
				<view class="image-item"  @click="chooseImage">
					<image src="../../static/upload.png" mode=""></image>
				</view>
				
			</view>
			
			<view class="answers-bottom" >
				图片不多于4张，每张不超过100M
			</view>
			<button class="answers-button"  form-type="submit"  >
				提交
			</button>
			 </form>
	</view>
</template>

<script>
	
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				utils:utils,
                readOnly: false,
				display:0,
				formats: {},
				editorCtx:'',
				imageurl:[],
				content:'',
				housid:'',
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.housid = e.id
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
							uni.showToast({
								title:'没有权限',
								duration:1500,
								
							})
							console.log('我的身份1', restun)
						}
							
					}
							
				}
			})
		},
		methods: {
			
			formSubmit: function(e) {
				let _seft = this
				var formdata = e.detail.value
				//formdata['content'] = this.content
		
			
				if(!formdata.content){
					uni.showToast({
						title:'内容不能为空',
						icon:"none",
						duration:1500,	
					})
					return
				}
				
			//	console.log('formdata',formdata)
			   // return
				uni.showLoading({
					title:'添加中',
					mask:true
				})
				con.sendRequest({
					url: '/home/shop/addShooting',
					method: 'post',
					data: formdata,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log(datas)
						if (datas.code == 1) {
							uni.navigateTo({
								url: 'index?id='+_seft.housid
							})
						} else {
							uni.showToast({
								title:'添加失败',
								duration:1500,	
							})
							return
						}
					}
				})
			
			},
			chooseImage() {
				var _seft = this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera' ], //从相册选择
				
					success: function(res) {
						console.log(res);
						//_seft.tempFilePath = res.tempFilePath
						_seft.uploads( res.tempFilePaths)
					//	_seft.thumburl = res.thumbTempFilePath
			
					}
				})
			
			},
			
		 async	uploads(tempFilePaths){
				let   _seft = this
				//_seft.num = 1
				if(tempFilePaths.length > 0){
				for (let item in tempFilePaths) {
				 await	_seft.uploadimage(tempFilePaths[item])	
				   }	
				}
				
				
			},
			
			
		async uploadimage(tempFilePath) {
				
				let   _seft = this
				uni.showLoading({
					title:'上传中',
					mask:true
				})
				con.uploadFile({
					url: '/user/Upload/one', // /user/Upload/one 仅为示例，非真实的接口地址
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
							console.log('datas.code',datas);
							if (datas.code == 1) {
								 _seft.imageurl.push(datas.data.url)
							} else {
								uni.showToast({
									title:'图片上传失败',
									icon:"none",
									duration:1500,	
								})
							}
						} else {
							uni.showToast({
								title:'图片上传失败',
								icon:"none",
								duration:1500,	
							})
						}
			
					}
			
				});
			},
						
		
		
		
		},
	
	}
</script>

<style>
	
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 200rpx;
	width: 100%;
}

/* 	
	.title{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 95%;
		
		color: #AFAFAF;
		font-size: 33rpx;
		padding: 50rpx 0rpx;
		border-bottom: 1rpx solid #BCC2E6;
	}
	.title>input{
		width: 70%;
		
	} */

	.box-form{
		width: 95%;
		display: flex;
		flex-direction: column;
		justify-content: start;
	}
	.answer-title{
		font-size: 32rpx;
		color: #000000;
		border-bottom: 1rpx solid #BCC2E6;
		line-height: 100rpx;
		
		
	}
	.textarea{
		color: #AFAFAF;
		margin-top: 30rpx;
		font-size: 29rpx;
	}
	.textarea>textarea{
		width: 100%;	
	}
	
		
	.upload-image{
		
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
	}
.upload-image>image{
	margin: 10rpx 10rpx;
	width: 30%;
	height: 180rpx;
}
	.upload-image .image-item{
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		width: 30%;
	    height: 180rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		
	}
	.upload-image .image-item>image{
		width: 90rpx;
		height: 90rpx;
			
	}
	.answers-bottom{
		font-size: 26rpx;
		color: #AFAFAF;
		border-bottom: 1rpx solid #BCC2E6;
		line-height: 100rpx;
		
	}
		
	.answers-button{
		font-size: 40rpx;
		color: #FFFFFF;
		background-color: #389BFE;
		line-height: 100rpx;
		width: 90%;
		border-radius: 20rpx;
		text-align: center;
		margin-top: 200rpx;

	}
</style>
