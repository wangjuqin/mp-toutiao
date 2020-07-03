<template>
	<view class="content">

		<my-search style="width: 100%;background-color: #EEF6FE;" @send="getCenters" ></my-search>
		<block v-if="Propertieslimit.length > 0">
		<view class="housename" v-for="(a,index) in Propertieslimit" :key="index" :class="[selecthouse == a.id?'active':'']"  @click="selHouseTop(a.id)" >
			{{a.title}}
		</view>
		</block>
		<block v-else>
			<view class="housename"  >
				未找到楼盘，输入楼盘名称
			</view>
		</block>

		<!-- <view class="queren">
		确定
		</view> -->
		
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: 'Hello',
				is_recommend:1,
				Propertieslimit:[],
				limits:5,
				pages:1,
				selecthouse :'',
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.is_recommend = e.is_recommend ? e.is_recommend : 1  //loupan

		},
		onShow() {
			let _seft = this
			//限时特惠
	/* 		con.sendRequest({
				url: '/home/search/propertiesList',
				method: 'get',
				data: {
				
					keyword:
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						console.log('loupan', restun)
						_seft.Propertieslimit = restun
					}
		
				}
		
			}) */
		},
		methods: {
			getCenters(e){
				let _seft = this
				console.log(e)
				
				con.sendRequest({
					url: '/home/search/propertiesList',
					method: 'get',
					data: {
						p:_seft.pages,
						limit: _seft.limits,
						keyword:e
					},
					success: function(res) {
						var datas = res.data
						//console.log(datas)
						/* return */
						if (datas.code == 1) {
							var restun = datas.data
							console.log('loupan', restun)
							_seft.Propertieslimit = restun
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none"
							})
						}
						
					}
						
				})
				
				
			},
			selHouseTop(e){
				let _seft = this
				console.log(e)
			//	this.selecthouse = e
			uni.showLoading({
				title:'添加中',
				mask:true
			})
				con.sendRequest({
					url: '/home/shop/addProperties',
					method: 'get',
					data: {
						id:e
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						//console.log(datas)
						/* return */
						if (datas.code == 1) {
							uni.showToast({
								title:datas.msg,
								icon:"none"
							})
							uni.navigateTo({
								url:'../myinfo/myhouse',
								animationDuration:1500
							})
							/* var restun = datas.data
							console.log('loupan', restun)
							_seft.Propertieslimit = restun */
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none"
							})
							
						}
						
					}
						
				})
				
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
		width: 100%;
	}
	
	.active{
		color:#389BFE !important;
		
	}
	.housename{
		border-bottom: 1rpx solid #BCC2E6;
		width: 95%;
		color: #3D3D3D;
		font-size: 32rpx;
	line-height: 120rpx;
		
		
	}
/* 	.queren{
		
	} */
	

	
</style>
