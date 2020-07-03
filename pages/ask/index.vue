<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset" class="box-form">
			<view class="answer-title">
				<input type="text" value="" maxlength="40" name="title" placeholder="一句话说明您的问题（2-40字）" />
			</view>
			<view class="textarea">
				<textarea value="" maxlength="300" name="content" placeholder="输入问题描述，获得更准确的解答（300字内）" />
				</view>
		
		
	<!-- 	<view class="upload-image">
			<input type="text" name='images' :value="imageurl" hidden maxlength="-1" />
							
			<image     v-if="imageurl.length > 0 " v-for="(item,index) in imageurl" :key="index"  :src="utils.siteBaseUrl(item)"   style="width: 200rpx;height: 200rpx;"></image>
												
			<view class="image-item"  @click="chooseImage">
				<image src="../../static/upload.png" mode=""></image>
			</view>
		</view> -->
		
		<!-- <view class="answers-bottom">
			图片不多于4张，每张不超过100M
		</view> -->
		<view class="label-title">
			添加标签可以让更多人看到问题（最多3个）
		</view>
		
		<view class="ask-label">
		<!-- 	<input type="number"    name='cid'  :value="cates"  hidden /> -->
				<view class="label-item" v-for="(a,index) in catelist"  :key="index"  :class="[cates.indexOf(a.id) == -1 ?'':'active']"       @click="catetop(a.id)" >
					{{a.title}}
				</view>
		
			
		</view>
		
<!-- 		<view class="label-seach">
			<uni-search-bar :radius="100" @confirm="search" placeholder="查找更多标签" bgColor="#F1F1F1"></uni-search-bar>
		</view> -->
		<!-- @click="submittop" -->
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
				utils: utils,
				catelist:[],
				imageurl:[],
				cates:[],
				cateid :0,
				imgaes:'../../static/upload.png'
			}
		},
		onLoad() {
			let _seft = this
			//我的提问类型
			con.sendRequest({
				url: '/home/Answer/getCategoryList',
				method: 'get',
				success: function(res) {
					//console.log('我的提问类型', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.catelist = restun
					}
				}
			})
		},
		methods: {
			
			formSubmit: function(e) {
				let _seft = this
					//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
					var formdata = e.detail.value
						formdata['cid']  = _seft.cates.join(',')
						//console.log(_seft.cates)

					if (_seft.cates.length < 1) {
						uni.showToast({
							title: '请添加1到3个标签',
							icon:"none",
							duration: 1500,
						})
						return
					}
					
					if (_seft.cates.length > 3) {
						uni.showToast({
							title: '请添加1到3个标签',
							icon:"none",
							duration: 1500,
						})
						return
					}
					
					if (!formdata.title) {
						uni.showToast({
							title: '请输入问题',
							icon:"none",
							duration: 1500,
						})
						return
					}
					if (!formdata.content) {
						uni.showToast({
							title: '请输入问题描述',
							icon:"none",
							duration: 1500,
						})
						return
					}
					//console.log(formdata)
					uni.showLoading({
						title:"请求中",
						mask:true
					})
				
					con.sendRequest({
						url: '/home/Answer/addAnswer',
						method: 'get',
						data:formdata,
						success: function(res) {
							uni.hideLoading()
							var datas = res.data
							//console.log(datas)
							if (datas.code == 1) {
								uni.showToast({
									title: '提问成功',
									icon:"none",
									duration: 2500,
								})
								uni.navigateTo({
									url:'../myinfo/answer'
								})
								
							}else{
								uni.showToast({
									title:datas.msg,
									icon:"none",
									duration: 2500,
								})
						
								return
								
							}
						},
						fail: function(res) {
							//console.log('fail', res)
						}
					})
			
					  },
			
			catetop(index){
				var _seft = this
				_seft.cateid = index
				let  cates  = _seft.cates
			let ff = cates.indexOf(index)
			if(ff == -1){
				if(cates.length >= 3){
					uni.showToast({
						title: '最多添加3个标签',
						icon:"none",
						duration: 1500,
					})
					return
				}
				cates.push(index)
				
			}else{
				cates = cates.filter(t => t != index)
			}
              _seft.cates =  cates
				//console.log('dd=====',ff,cates)
			
			},
			chooseImage() {
					var _seft = this
					uni.chooseImage({
						count: 4, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera' ], //从相册选择
					
						success: function(res) {
							//console.log(res);
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
						url: '/user/Upload/one', //     /user/Upload/one仅为示例，非真实的接口地址
						filePath: tempFilePath,
						fileType: 'image',
						name: 'file',
						formData: {
							file: tempFilePath,
							filetype: 'image',
						},
						success: function(res) {
							uni.hideLoading()
							//console.log(res);
							if (res.statusCode == 200) {
								var datas = JSON.parse(res.data)
								//console.log('datas.code',datas);
								if (datas.code == 1) {
									 _seft.imageurl.push(datas.data.url)
								} else {
									uni.showToast({
										title:'图片上传失败',
										duration:1500,	
									})
								}
							} else {
								uni.showToast({
									title:'图片上传失败',
									duration:1500,	
								})
							}
				
						}
				
					});
				},
						
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 200rpx;
	}
	.box-form{
		width: 95%;
		display: flex;
		flex-direction: column;
		justify-content: start;
	}
	.active{
		background-color: #389BFE !important;
		color: #F1F1F1  !important;
	}
	.answer-title{
		color: #000000;
		border-bottom: 1rpx solid #BCC2E6;
		
		font-size: 32rpx;
		
	}
	.answer-title>input{
		height:125rpx ;
	}
	.textarea{
		color: #AFAFAF;
		margin-top: 30rpx;
	
		font-size: 26rpx;
	}
	.textarea>textarea{
		width: 100%;	
	}
	
		
	.upload-image{
		
		display: flex;
		flex-direction: row;
		justify-content: start;
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
		font-size: 29rpx;
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
		margin-top: 40rpx;

	}
	.label-title{
		margin-top: 30rpx;
		color: #707070;
		
		line-height: 70rpx;
		font-size: 32rpx;
	}
	.ask-label{
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
		font-size: 24rpx;
		flex-wrap: wrap;
		
		margin-top: 30rpx;
		
	}
	.ask-label .label-item{
		background-color: #F1F1F1;
		border: 1rpx solid #D5D7E6;
		width:calc(100% / 4 - 30rpx) ;
		color: #2984DF;
		line-height: 60rpx;
		border-radius: 25rpx;
		margin: 15rpx 10rpx;
	}
	.label-seach{
		margin-top: 30rpx;
		font-size: 29rpx;
	
	}
</style>
