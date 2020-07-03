<template>
	<view class="content">
		<view class="answer-title" v-if="housedata.title">
			{{housedata.title}}
		</view>
		<view class="textarea">
			<textarea @input="contenTop" value="" placeholder="请填写10—240的文字点评,如楼盘位置如何,环境怎么样,配套规划满意吗？" maxlength="240" />

			</view>
		
		<!-- 
		<view class="upload-image">
			<view class="image-item"  @click="uploads">
				<image src="../../static/upload.png" mode=""></image>
			</view>
			
		</view>
		
		<view class="answers-bottom">
			图片不多于4张，每张不超过100M
		</view> -->
		<!-- 
		<view class="answer-title">
	         <view class="">
	         	推荐户型
	         </view>
			 <view class="sel-door">
			 	<view class="">
			 		选择推荐户型
			 	</view>
				<image src="../../static/jkh-r.png" mode=""></image>
			 </view>
		</view> -->
		<view class="answers-button" @click="submitTop" >
			提交
		</view>
	</view>
</template>

<script>
	
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		data() {
			return {
				utils:utils,
				
				imgaes:'../../static/upload.png',
				housedata:'',
				contents:'',
				
				
			}
		},
		onLoad(e) {
			let _seft  = this
			_seft.houseid= e.id
			
			
		},
		onShow() {
			let _seft  = this
		con.sendRequest({
			url: '/home/Properties/getShow',
			method: 'GET',
			data: {
				'id': _seft.houseid
			},
			success: function(res) {
				var datas = res.data
				if (datas.code == 1) {
					var resturn = datas.data
					console.log('楼盘dd', resturn)
					/* resturn['images'] = JSON.parse(resturn.images) */
				/*  */	/* _seft.houseis_favorite = resturn['is_favorite'] */
					_seft.housedata = resturn
				}
		
			}
		})	
		},
		methods: {
			
			contenTop(e){
				let _seft = this
				_seft.contents = e.detail.value
				console.log(e)
			},
		   submitTop(){ //评论
		   
		   	let _seft = this
				if(!_seft.contents){
					uni.showToast({
						title:'请输入内容',
						icon:"none",
						duration:1500,	
					})
					
					return false	
				}
				uni.showLoading({
					title:"点评中",
					mask:true
				})
				
			
				con.sendRequest({
					url: '/home/shooting/addComment',
					method: 'POST',
					data: {
						id: _seft.houseid,
						content:_seft.contents,
						type: 1,
						parent_id:0,
					},
					success: function(res) {
						uni.hideLoading()
						 //_seft.$refs.popup.close()
						var datas = res.data
						console.log('评论', datas)
						if (datas.code == 1) {
							uni.navigateTo({
								url:"../user_comment/index?id="+_seft.houseid
							})
							//_seft.commenttop()
						}
					}
							
				})
					
			},
			
				
			uploads(){
			uni.chooseImage({
			    count: 4, //默认9
			    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album','camera' ], //从相册选择
			    success: function (res) {
			        console.log(JSON.stringify(res.tempFilePaths));
					console.log(JSON.stringify(res.tempFilePaths.length));
			    }
			});
			}
			
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
	.answer-title{
		font-size: 34rpx;
		color: #000000;
		border-bottom: 1rpx solid #BCC2E6;
		line-height: 100rpx;
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
	}
	.answer-title .sel-door{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 35%;
		color: #AFAFAF;
		font-size: 30rpx;
	}
	.answer-title .sel-door>image{
		width: 50rpx;
		height: 50rpx;
	}
	.textarea{
		color: #AFAFAF;
		margin-top: 30rpx;
		width: 95%;	
		font-size: 30rpx;
	}
	.textarea>textarea{
		width: 100%;	
	}
	
		
	.upload-image{
		width: 95%;	
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
		width: 95%;
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
