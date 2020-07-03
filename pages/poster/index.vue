<template>
	<view class="content">
		<view class="poster-list" v-if="posterlist.length > 0">
			<!--  @click="postertop(a.id)" -->
			<view class="poster-item" v-for="(a,index) in posterlist" :key="index" >
				<image  :src="utils.siteBaseUrl(a.image)" mode="" @click="postertop(a.id)"></image>
				<view class="title">
					{{a.title}}
				</view>
				<view class="collect">
					<image  v-if="a.is_fabulous == 0 ||a.is_fabulous == null"  src="../../static/collect_empty.png" mode="" @click="praise(a.id,index)"></image>
					<image  v-else src="../../static/collect.png" mode="" @click="nopraise(a.id,index)"></image>
					<view  v-if="a.count" class="">
						{{a.count}}
					</view>
				</view>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '海报',
					utils: utils,
					posterlist:[],
			}
		},
		onLoad() {
			let _seft = this
			//海报
			con.sendRequest({
				url: '/home/poster/getList',
				method: 'get',
				success: function(res) {
					console.log('海报', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.posterlist = restun
						//_seft.active = restun-1
					}
			
				}
			
			})

		},
		onShow() {
				con.usertype() //用户身份	
		},
		methods: {
			postertop(index){
				let _seft = this
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				con.sendRequest({
					url: '/home/poster/info',
					method: 'get',
					data: {
						id: index
					},
					success: function(res) {
						uni.hideLoading()
						console.log('海报', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							if(restun.poster_shop_id == 2){
								_seft.codetop(restun.path)
								/* uni.navigateTo({
									url:"./poster_image?id="+index
								}) */
							}else{
								uni.navigateTo({
									url:"./poster_edit?id="+index
								})
							}
							
						}else{
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 1500,
							})
							return
						}
					}
				})
				
				
			},
			praise(id,index){
				let _seft = this
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				con.sendRequest({
					url: '/home/poster/addFabulous',
					method: 'get',
					data:{id:id},		
					success: function(res) {
						uni.hideLoading()
						console.log('海报', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.posterlist[index].is_fabulous = 1
							_seft.posterlist[index].count = _seft.posterlist[index].count + 1
							//_seft.active = restun-1
						}else{
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 1500,
							})
							return
						}
				
					}
				
				})
			},
			nopraise(id,index){
				let _seft = this
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				con.sendRequest({
					url: '/home/poster/deleteFabulous',
					method: 'get',
					data:{id:id},
						
					success: function(res) {
						uni.hideLoading()
						console.log('海报', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.posterlist[index].is_fabulous = 0
							_seft.posterlist[index].count = _seft.posterlist[index].count - 1
						}else{
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 1500,
							})
							return
						}
				
					}
				
				})
			},
			codetop(image) {
				let _seft = this;
				let imgs = []
				/* utils.siteBaseUrl(image) */
				imgs.push(utils.siteBaseUrl(image))
				//imgs.push(utils.siteBaseUrl('default/image/1589968739.png'))
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
		background-color:#F5F2F5;
		padding-bottom: 200rpx;
	}
	.poster-list{
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
		align-items: center;
		width: 95%;
	}
		.poster-list .poster-item{
			display: flex;
			flex-direction: column;
			justify-content: start;
			width: calc(100% / 3 - 20rpx);
			font-size: 30rpx;
			background-color: #FFFFFF;
			margin: 20rpx 10rpx;
			padding-bottom: 20rpx;
		}
		.poster-list .poster-item>image{
			width: 100%;
			height: 400rpx;
		}
		.poster-list .poster-item .title{
			margin-top: 10rpx;
			margin-left: 10rpx;
		}
		.poster-list .poster-item	.collect{
			display: flex;
			flex-direction: row;
			justify-content: start;
			width: 100%;
			margin-top: 10rpx;
			margin-left: 10rpx;
		}
	.poster-list .poster-item	.collect>image{
			width: 50rpx;
			height: 50rpx;
		}
		.poster-list .poster-item	.collect>view{
			margin-left: 15rpx;
		}

	
</style>
