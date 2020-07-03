<template>
	<view class="content">
		<view class="role">
			<view class="">
				你的角色是？
			</view>
			<view class="info">
				我们根据选择为您提供精准服务
			</view>

		</view>

		<view class="labar-item" v-for="(item,index) in list" :key="index"  @click="nducted(item.url)">
			<view class="left">
				<view class="title">
					{{item.title}}
				</view>
				<view class="info">
					{{item.info}}
				</view>
			</view>
			<image :src="item.src" mode=""></image>
		</view>
		<view class="fixed-box"   @click="hometop">
			<image src="../../static/home_btn.png" mode=""></image>

		</view>
	</view>

</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: 'Hello',
				isShop:0,
				list: [{
						src: '../../static/female.png',
						title: '置业顾问',
						info: '为购房人提供更专业服务',
						url: '../nducted/index?type=2'

					},
					{
						src: '../../static/male.png',
						title: '经纪人',
						info: '祝您开单开单开单',
						url: '../nducted/index?type=1'
					}
				]
			}
		},
		onLoad() {
			

		},
		onShow() {
			let _seft = this
			//我的身份
			con.sendRequest({
				url: '/user/Shop/isShop',
				method: 'post',
				success: function(res) {
					console.log('我的身份', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.isShop = restun	
						if(restun == 1){
							uni.showModal({
								title:'审核状态',
								content:'资料正在审核中！请耐心等待',
								showCancel:false,
								cancelText:'确定',
								success:function(){
									uni.switchTab({
										url:'../myinfo/index'
									})
								}
							})	
							return false
						}
						if(restun == 2){
							uni.showModal({
								title:'审核状态',
								content:'你已经是经纪人或置业顾问，不能重复申请',
								showCancel:false,
								cancelText:'确定',
								success:function(){
									uni.switchTab({
										url:'../myinfo/index'
									})
								}
							})	
							return false
						}
						if(restun == 3){
							uni.showModal({
								title:'审核状态',
								content:'你的资料审核未通过，你可以重新提交申请',
								showCancel:false,
								cancelText:'确定',
								success:function(){
									
								}
							})	
							
						}
					}else{
						uni.showToast({
							title:datas.msg,
							icon:"none",
							duration:1500
						})
					}
			
				}
			
			})
		},
		methods: {
			nducted(url) {
				let _seft = this
				if(_seft.isShop == 1){
					uni.showModal({
						title:'审核状态',
						content:'资料正在审核中！请耐心等待',
						showCancel:false,
						cancelText:'确定',
						success:function(){
							uni.switchTab({
								url:'../myinfo/index'
							})
						}
					})	
					return false
				}
				if(_seft.isShop == 2){
					uni.showModal({
						title:'审核状态',
						content:'你已经是经纪人或置业顾问，不能重复申请',
						showCancel:false,
						cancelText:'确定',
						success:function(){
							uni.switchTab({
								url:'../myinfo/index'
							})
						}
					})	
					return false
				}
				if(_seft.isShop == 3){
					uni.showModal({
						title:'审核状态',
						content:'你的资料审核未通过，你可以重新提交申请',
						showCancel:false,
						cancelText:'确定',
						success:function(){
							
						}
					})	
					
				}
				uni.navigateTo({
					url: url
				})

			},
			hometop(){
				uni.switchTab({
					url:'../index/index'
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
		padding-bottom: 200rpx;
	}

	.labar-item {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid rgba(188, 194, 230, 0.63);
		box-shadow: 0px 1px 0px 0px rgba(188, 194, 230, 0.63);
		margin-top: 30rpx;
	}

	.labar-item>image {
		height: 250rpx;
		width: 340rpx;
		/* border-radius: 50%; */
		/* border: 1rpx solid #BCC2E6; */

	}

	.labar-item .left {
		width: 60%;
		font-size: 36rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.labar-item .left .title {
		/* width: 31%; */
		font-size: 36rpx;
	}

	.labar-item .left .info {
		font-size: 26rpx;
		color: #BCC2E6;
		margin-top: 20rpx;
	}

	.role {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		width: 95%;
		margin: 50rpx 0rpx;
	}

	.role>view:nth-of-type(1) {
		width: 100%;
		font-size: 44rpx;
		font-weight: 550;
	}

	.role>view:nth-of-type(2) {
		margin-top: 30rpx;
		color: #9A9A9A;
		font-size: 31rpx;
		width: 100%;
	}

	.fixed-box {
		position: fixed;
		width: 24%;
		bottom: 50rpx;
		right: 0rpx;
	}

	.fixed-box>image {
		width: 100%;
		height: 65rpx;
	}
</style>
