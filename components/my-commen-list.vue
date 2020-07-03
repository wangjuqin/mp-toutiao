<template>
	<view class="contens">
		<view class="advise">
			<view class="item" v-for="(a,index) in commentlist" :key='index'>
				<view class="left">
					<image :src="a.avatar"></image>
				</view>

				<view class="right">
					<view class="right-top">
						<view class="users">
							<view class="uname">{{a.user_nickname}}</view>
							<!-- <view class="address">优质房地产</view> -->
						</view>
						<view class="img">
							<view class="shulaing" v-if="a.fabulous_number">
								{{a.fabulous_number}}
							</view>
							<!-- <image v-if="a.is_fabulous == 0 " src="../static/praise_empty.png" mode=""></image>
						     <image v-else src="../static/praise.png" mode=""></image>						
						 -->
							<image v-if="a.is_fabulous == 0 ||a.is_fabulous == null" src="../static/praise_empty.png" @click="compraisetop(index,a.id)"></image>
							<image v-else src="../static/praise.png" @click="comnopraisetop(index,a.id)"></image>
						
						</view>
					
					</view>

					<view class="leav">
						{{a.content}}
					</view>
					<view class="bottom">
						<view class="data">
							{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
						</view>
						<view class="answers">
							33条回复
						</view>
					
						
						<!-- <image src="../../static/sq.png" mode=""></image> -->
						<!-- <view class="zan">
								<view class="shulaing">
									20
								</view>
								<!-- <image src="../../static/praise_empty.png" mode=""></image> -->
								<!-- <image src="../../static/.png" mode=""></image> -->
			
							<!--</view> -->
					</view>
					<!-- <view class="commentlist">
						<view class="commentitem" >
							<text>萨纳</text> 回复<text>就看看</text>会计核算可更换卡萨丁金凤凰
						</view>
						
						<view class="commentitem" >
							
							<text>就看看</text> 回复<text>萨纳</text>会计核算可更换卡萨丁金凤凰
						</view>
						
					</view>
					<view class="commentlist">
						<view class="commentitem" >
							<text>萨纳ww   </text> 回复<text>就看看</text>会计核算可更换卡萨丁金凤凰
						</view>
						
						<view class="commentitem" >
							
							<text>就看看</text> 回复<text>萨纳</text>会计核算可更换卡萨丁金凤凰
						</view>
						
					</view> -->
				</view>
			</view>
			<view class="details" v-if="ismor==1">
				<view class="" @click="morelist">加载更多</view>
			</view>
		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		props: {
			comtype: {
				type: Number,
				default: ''
			},
			arid: {
				type: Number,
				default: ''
			}
		},
		data() {
			return {
				utils: utils,
				commentlist: [],
				limits: 5,
				pages: 1,
				ismor: 1,
			};
		},
		onReady() {
			this.commentlists()
		},


		methods: {

			morelist() {
				let _seft = this
				_seft.pages++
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				//评论
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: _seft.comtype,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {

							var restun = datas.data
							if (restun.length < 0) {
								_seft.ismor = 0
							}
							_seft.commentlist = _seft.commentlist.concat(restun)

							//console.log('评论ss',_seft.pages,_seft.limits)


						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
						}
					}

				})

			},

			commentlists() {
				let _seft = this
				//评论
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: _seft.comtype,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.commentlist = restun
							console.log('评论ss', _seft.commentlist)

						}
					}

				})
			},

			compraisetop(index, id) {

				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				console.log(index)
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.commentlist[index].is_fabulous = 1
									_seft.commentlist[index].fabulous_number++
								}
							})

						} else {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}

				})
			},
			comnopraisetop(index, id) {
				let _seft = this
				uni.showLoading({
					title:"取消点赞中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.commentlist[index].is_fabulous = 0
									_seft.commentlist[index].fabulous_number--
								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}

				})
			},


		}

	}
</script>

<style>
	.contens {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding-bottom: 200rpx;
	}

	.advise {
		display: flex;
		flex-direction: column;
		width: 95%;
		border-radius: 15rpx;
		margin: 20rpx 0rpx;
	}

.advise .item .right .commentlist{
		
		font-size: 24rpx;
		
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 100%;
	}
	.advise .item .right .commentlist .commentitem{
		
		margin-top: 20rpx;
	}
	.advise .item .right .commentlist .commentitem>text{
		color: #9A9A9A;
		margin-right: 10rpx;
	}
</style>
