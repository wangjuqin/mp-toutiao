<template>
	<view class="content">

		<block>
			<!-- v-if="isshow == 1" -->
			<form class="box-form" @submit="formSubmit" @reset="formReset">

				<view class="form-item">
					<view class="item-title">
						城市
					</view>
					<input type="text" class="item-input" disabled="disabled" value="成都" name="citys" placeholder="请输入您的城市" />
					<!-- 	<view class="icons">
						<image src="../../static/jkh-r.png" mode=""></image>
					</view> -->
				</view>


				<view class="form-item">
					<view class="item-title">
						手机号
					</view>
					<input type="text" class="item-input"  :value="cards.phone" name="phone" placeholder="请输入您的手机号" />
				</view>



				<view class="form-item">
					<view class="item-title">
						姓名
					</view>
					<input type="text" class="item-input" :value="cards.name" name="name" placeholder="请输入您的真实姓名" />
				</view>
				<view class="form-item">
					<view class="item-title">
						微信号
					</view>
					<input type="text" class="item-input" :value="cards.wechat_name"  :disabled="[cards.wechat_name?'disabled':'']"  name="wechat_name" placeholder="请输入您的微信号" />
				</view>

				<view class="form-item">
					<view class="item-title">
						所属公司
					</view>
					<input type="text" class="item-input"  :value="cards.company" name="company" placeholder="请输入您的经纪公司" />
				</view>

				<view class="form-item" v-if="type == 1">
					<view class="item-title">
						门店
					</view>
					<input type="text" class="item-input"  :value="cards.shop" name="shop" placeholder="请输入您所在门店" />
				</view>

				<!-- 		<view class="form-item">
					<view class="item-title">
						推荐人手机号
					</view>
					<input type="text" class="item-input" value="" name="" placeholder="填写为其加分，若没有可不填" />
				</view> -->

				<view class="form-item">
					<view class="item-title">
						个性签名
					</view>
					<textarea  :value="cards.describe" class="item-input"  name="describe" placeholder="参考样例：5年房产经验，恒泰家园李明全心为您服务" />
					<!-- <input type="text"  value="" placeholder="参考样例：5年房产经验，恒泰家园李明全心为您服务" /> -->
				</view>
				
				<view class="form-item">
					<view class="item-title">
						楼盘
					</view>
					<input type="text" class="item-input"  :value="houseid" name='estate_id'  hidden />
					<input type="text" class="item-input"  :value="housname"  :placeholder="housname" disabled="disabled"  @click="selehouse" />
					<!-- <input type="text" class="item-input"  :value="housname"  :placeholder="housname" disabled="disabled"  @click="selehouse" v-else /> -->
					<view class="icons"  @click="selehouse">
						<image src="../../static/jkh-r.png" mode=""></image>
					</view>
				</view>
				<view class="form-item upload-title" >
					<input type="text"  style="display: none;"  :value="wximage"  name='wecaht_img'/>
					<input type="text"  style="display: none;"  :value="mpimage"  name='work_card'/>
					<view class="item-title">
					上传个人微信二维码和名片或工牌
					</view>
			
					<view class="icons">
						<image src="../../static/jkh-r.png" mode=""></image>
					</view>
				</view>
				<view class="uploadimage">
					
					<view class="upload-image" >
					 	<image   :src="utils.siteBaseUrl(wximage)" mode="" v-if="wximage" @click="uploads(1)"></image>
						
						
						<view class="wx" v-else >
							<image src="../../static/upload.png" mode="" @click="uploads(1)"></image>
							<view class="">
								个人微信二维码
							</view>
						</view>
						</view>
					
					<view class="upload-image" >
					 
							<image  :src="utils.siteBaseUrl(mpimage)" mode="" v-if="mpimage" @click="uploads(2)"></image>
						<view class="mingping" v-else>	
						
							<image src="../../static/upload.png" mode="" @click="uploads(2)" ></image>
							<view class="">
								名片或工牌
							</view>
						</view>
					</view>
					
				</view>
				
				<view class="checkxy">
					<label>
						<checkbox   :checked="checks"    :value="checks" @click="checkboxTop" /><text>我已阅读并同意入驻</text> <text  class="xieyi"  @click="agreeTop">《派好房协议》</text>
					</label>
					
				</view>
			
				<button    form-type="submit" >提交</button>
			
			</form>
			
			<view class="fixed-box" @click="hometop">
				<image src="../../static/home_btn.png" mode=""></image>
				
			</view>
		</block>
		
		<uni-popup  type="top"  ref="popup" >
			 <view  class="popupconten">
			 	<my-search style="width: 100%;background-color: #EEF6FE;"  @send="getCenters"></my-search>
			 	<block v-if="Propertieslimit.length > 0">
			 	<scroll-view  scroll-y="true"  style="width: 100%;height: 88%;"  @scrolltolower='scrollBottom' show-scrollbar="true">
			 		<view class="housename" v-for="(a,index) in Propertieslimit"  :key="index" :class="[selecthouse == a.id?'active':'']"
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
				wximage:'',
				mpimage:'',
				type:1,//1.经纪人 2.置业顾问
				houseid:'',
				housname:'',
				Propertieslimit: [],
				limits: 10,
				pages: 1,
				selecthouse: '',
				center:'',
				popup:'',
				isshow:2,
				checks:false,
				user_id:'',
				cards:'',
				
			}
		},
		onLoad(e) {
			     	let _seft = this
					_seft.type = e.type
					_seft.user_id = e.id
					//我的名片
						con.sendRequest({
							url: '/home/Shop/info',
							method: 'get',
							success: function(res) {
								console.log('我的名片', res)
								var datas = res.data
								if (datas.code == 1) {
									var restun = datas.data
									_seft.wximage = restun.wecaht_img
									_seft.mpimage = restun.work_card
									_seft.houseid = restun.properties_id
									_seft.housname = restun.title
									_seft.cards = restun
								}
					
							}
					
						})
					
				
					

		},

		methods: {
			
			scrollBottom(){
				let _seft = this
				_seft.pages++
				console.log(_seft.pages,'来来来')
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
			
			formSubmit: function(e) {
				let _seft = this
				var formdata = e.detail.value
				formdata['type'] = _seft.type
			
				if(!formdata.phone){
					uni.showToast({
						title:'请输入电话',
						icon:"none",
						duration:1500,	
					})
					return
				}
				
				if(!formdata.name){
					uni.showToast({
						title:'请输入姓名',
						icon:"none",
						duration:1500,	
					})
					return
				}
			
					if(!formdata.estate_id){
						uni.showToast({
							title:'请选择楼盘',
							icon:"none",
							duration:1500,	
						})
						return
					}
				
				
				if(_seft.checks==false){
					uni.showToast({
						title:'请同意《派好房协议》',
						icon:"none",
						duration:1500,	
					})
					return
				}
				console.log('formdata',formdata)
				uni.showLoading({
					title:'提交中',
					mask:true
				})
				con.sendRequest({
					url: '/user/settled/setSettled',
					method: 'post',
					data: formdata,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log(res)
						if (datas.code == 1) {
							uni.showToast({
								title:datas.msg,
								icon:"none",
								duration:2000,	
								
							})
							setTimeout(function(){
							uni.switchTab({
								url: '../myinfo/index',
								
							})	
							},2500)	
							
						} else {
							uni.showToast({
								title:datas.msg,
								icon:"none",
								duration:2000,	
							})
							return
						}
					},
					fail: function(res) {
						console.log('fail', res)
					}
				})
			
			},
			uploads(index) {
				var _seft = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera' ], //从相册选择
				
					success: function(res) {
						console.log(res);
						//_seft.tempFilePath = res.tempFilePath
						_seft.uploadimage( res.tempFilePaths[0],index)
					//	_seft.thumburl = res.thumbTempFilePath
			
					}
				})
			
			},
			
			
			uploadimage(tempFilePath,index) {
				let   _seft = this
				con.uploadFile({
					url: '/user/Upload/one',  // /user/Upload/one仅为示例，非真实的接口地址
					filePath: tempFilePath,
					fileType: 'image',
					name: 'file',
					formData: {
						file: tempFilePath,
						filetype: 'image',
					},
					success: function(res) {
						console.log(res);
						if (res.statusCode == 200) {
							var datas = JSON.parse(res.data)
							console.log('datas.code',);
							
							if (datas.code == 1) {
								if(index==1){
									_seft.wximage = datas.data.url
								}else{
									_seft.mpimage = datas.data.url
								}
							console.log('datas',_seft.wximage,_seft.mpimage);	
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
			
					},
					fail: function(res) {
						console.log('fail', res)
					}
			
				});
			},
			hometop(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			selehouse(){
				let _seft = this
				//_seft.popup = 1
				//_seft.isshow = 2
				_seft.$refs.popup.open()
			
				
			},
			
			getCenters(e) {
				let _seft = this
				_seft.center = e
				_seft.pages = 1
				//_seft.Propertieslimit = []
				console.log(_seft.pages,_seft.limits)
				_seft.houselist()
			
			
			},
			
			houselist(){
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
			selHouseTop(id,title) {
				let _seft = this
				_seft.housname = title
				_seft.houseid = id
				console.log(id)
				_seft.$refs.popup.close()
			},
			checkboxTop(){
				let _seft = this
				_seft.checks = !_seft.checks
				
			},
			agreeTop(){
				uni.navigateTo({
					url:"../contactus/onepage?type=1"
				})
			},
			moveHandle(){
				return false
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


	.box-form{
		width: 95%;
		display: flex;
		flex-direction: column;
		justify-content: start;
	}
	.box-form .form-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		border-bottom: 1rpx solid #CAD6E2;
		padding: 30rpx 0rpx;
		
	}
	.box-form .form-item .item-title{
		color: #606060;
		/* width: 30%; */
		font-size: 29rpx;
	}
	.box-form .form-item  .item-input{
	width: 60%;	
	font-size: 26rpx;
	color: #000000;
	

	}
	.box-form .form-item>textarea{
		height: 85rpx;
	}
	.box-form .form-item .icons{
		width: 6%;	
	}
	.box-form .form-item .icons>image{
		width: 100%;
		height: 50rpx;
	}
	
		
	.uploadimage{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;	
		font-size: 26rpx;
		color: #606060;
		text-align: center;
	}
	
	.upload-image{
	width: 45%;	
	font-size: 26rpx;
	color: #606060;
	text-align: center;
	}
/* 	.upload-image>view{
		
	} */
	.upload-image>image{
		background-color: #F2F2F2;
		width: 140rpx;
		height: 140rpx;
		
	}
	.upload-image .wx>image{
		background-color: #F2F2F2;
		width: 90rpx;
		height: 90rpx;
		padding: 50rpx;
	}
	.upload-image .mingping>image{
		background-color: #F2F2F2;
		width: 90rpx;
		height: 90rpx;
		padding: 50rpx;
	}
		.upload-image .wx>view{
			padding-top: 20rpx;
			width: 100%;
			
		}
		.upload-image .mingping>view{
			padding-top: 20rpx;
			width: 100%;
			
			
		}
		button{
			margin-top: 50rpx;
			background-color: #389BFE;
			color: #FFFFFF;
		}
		.upload-title{
			border: 0rpx solid #000000 !important;
			margin-top: 30rpx;
		}
		
		.fixed-box{
			position: fixed;
			width: 24%;
			bottom: 90rpx;
			right: 0rpx;
		}
		.fixed-box>image{
			width: 100%;
			height: 65rpx;
		}
		
		.active {
			color: #389BFE !important;
		
		}
	/* 	.unipopup{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			top: 0;
		  z-index: 9;
		} */
/* 		.mask{
		 width: 100%;
		 position: absolute;
		 bottom: 0;
		 left: 0;
		 right: 0;
		 top: 0;
		 background-color: #000000;
		 opacity: 0.5;
		 z-index: 11;	
			
		} */
		 .popupconten{
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
		 
		
		 .popupconten .housename {
			border-bottom: 1rpx solid #BCC2E6;
			width: 90%;
			color: #3D3D3D;
			font-size: 32rpx;
			line-height: 120rpx;
			margin-left: 5%;
		}
		
		.checkxy{
			margin-top: 30rpx;
			font-size: 24rpx;
			width: 100%;
			text-align: center;
		}
		.checkxy .xieyi{
			color:#389BFE ;
			margin-left: 20rpx;
			
		}

</style>
