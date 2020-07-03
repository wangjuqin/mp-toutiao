<template>
	<view class="content">



		<view class="advise">
			<view class="item" v-for="(a,index) in shooting" :key="index">
				<view class="left">
						<image v-if="a.avatar" :src="a.avatar"></image>
				</view>

				<view class="right"  >
					<view class="right-top" @click="sceneshot(a.id)">
						<view class="users">
							<view class="uname">{{a.user_nickname}}</view>
							<view class="address">{{a.company}}</view>
						</view>
						<view class="img">
							<image src="../../static/contact_normal.png"></image>
						</view>
						<!-- <view class="gd">
							...
						</view> -->
					</view>

					<view class="leav">
						{{a.content}}

					</view>
					<view class="house-img">
						<image  :src="utils.siteBaseUrl(img)" mode="" v-for="(img,indexs) in a.images" :key="indexs"></image>

					</view>
					<view class="bottom">
						<view class="data">

						</view>
						<view class="zan">
							<view class="shulaing">
								{{a.give}}
							</view>
							
							<image v-if="a.is_fabulous == 0" src="../../static/praise_empty.png" mode="" @click="praisetop(a.id,index)"></image>
							<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(a.id,index)"></image>
							
							<image src="../../static/MSG_empty.png" mode=""></image>

						</view>
					</view>
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		data() {
			return {
				title: 'Hello',
				 utils: utils,
				houseid:'',
				shooting:[],
				
			}
		},
		onLoad(e) {
			let _seft = this
			let houseid = e.id
			_seft.houseid = houseid
			console.log('楼盘id', houseid)
			_seft.shootingtop(houseid)

		},
		methods: {
			
			sceneshot(index) {
				let _seft = this
				uni.navigateTo({
					url: '../sceneshot_detail/index?id='+index+'&houseid='+_seft.houseid
				})
			},
			
			praisetop(id, index) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 6,
						
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								duration: 2000,
								success() {
									_seft.shooting[index].is_fabulous = 1
									_seft.shooting[index].give = _seft.shooting[index].give + 1
			
								}
							})
			
						}
					}
			
				})
			},
			nopraisetop(id,index) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: id,
						type: 6
					},
					success: function(res) {
						var datas = res.data
						console.log('quxiaodianzan', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								duration: 2000,
								success() {
									_seft.shooting[index].is_fabulous = 0
									_seft.shooting[index].give = _seft.shooting[index].give - 1
									
								}
							})
						}
					}
			
				})
			},
			shootingtop(houseid) {
				//现场实拍
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/getShowList',
					method: 'get',
					data: {
						"id": houseid,
						"is_all": 1
					},
					success: function(res) {
						var datas = res.data
						console.log('现场实拍', datas)
						if (datas.code == 1) {
							var restun = datas.data
							var image = []
							for (let i in restun) {
								restun[i]['images'] = JSON.parse(restun[i]['images'])

							}

							//	console.log('restunssss', restun)
							_seft.shooting = restun
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
		padding-bottom: 200rpx;

	}

	/* 现实实拍 */

	.advise {
		display: flex;
		flex-direction: column;
		width: 95%;
		border-radius: 15rpx;
		margin: 20rpx 0rpx;

	}

	.advise .item {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		padding: 30rpx 0rpx;
		width: 100%;
		border-bottom: 4rpx solid #EEEEEE;

	}

	.item .left {
		width: 20%;
		height: 100%;
	}

	.item .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item .right {
		display: flex;
		flex-direction: column;
		
		justify-content: start;
		
		height: 100%;
		width: 90%;

	}

	.item .right .right-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		width: 100%;

	}

	.item .right .right-top .users {

		display: flex;
		flex-direction: column;
		justify-content: start;
		/* align-items: center; */
	}

	.item .right .right-top .users .uname {
		font-size: 32rpx;
		width: 100%;
		color: #2A4D9C;

	}

	.item .right .right-top .users .address {
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #9A9A9A;
		width: 100%;

	}


	/* 	.item .right .right-top .img {
		width: 48%;
	
	} */

	.item .right .right-top .img>image {

		width: 160rpx;
		height: 46rpx;
		background-color: #EEF6FE;
		/* border-radius: 50%; */
		/* padding: 15rpx; */

	}

	.item .right .right-top .gd {
		color: #BFC4D9;
		/* text-align: right; */
	}

	.item .right .leav {
		font-size: 29rpx;
		margin-top: 10rpx;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

	}

	.item .right .house-img {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin-top: 20rpx;
	}

	.item .right .house-img>image {
		width: calc(100% / 3 - 15rpx);
		margin: 0rpx 7rpx;
		height: 130rpx;
	}

	.item .right .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;

	}

	.item .right .bottom .data {
		font-size: 24rpx;
		color: #BFC4D9;
	}

	.item .right .bottom .zan {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 25%;

	}

	.item .right .bottom .zan .shulaing {
		font-size: 24rpx;
		color: #BFC4D9;

	}

	.item .right .bottom .zan>image {
		width: 40rpx;
		height: 40rpx;
	}

	/* end */
</style>
