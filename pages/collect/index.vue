<template>
	<view class="content">
		<view class="top">
			<view class="scroll-view">
				<view class="scroll-view-item " @click="showtop(2)" :class="[isshow == 2?'active':'']">楼盘 </view>
				<view class="scroll-view-item " @click="showtop(3)" :class="[isshow == 3?'active':'']">视频 </view>
				<view class="scroll-view-item " @click="showtop(1)" :class="[isshow == 1?'active':'']"> 文章 </view>
			</view>
		</view>
		<!-- 楼盘 -->
		<block v-if="isshow==2">
			<my-column-list style="width: 100%;margin-top: 40rpx;" :listHouse='datalist'> </my-column-list>
		</block>
		<!-- 视频 -->
		<block v-if="isshow==3"> <!--  @click="housedetail(a.id)" -->
			<view class="audio-list" v-if="datalist.length > 0">
				<view class="audio-item" v-for="(a,index) in datalist" :key="index"  >
					<view class="item-top"  @click="housedetail(a.id)">
						<!-- <video class="img" :src="utils.siteBaseUrl(a.video)" object-fit="fill" play-btn-position="center" controls='false'
						 show-center-play-btn="false" muted="true"></video> -->
						<image class="img"  :src="[a.image?utils.siteBaseUrl(a.image):'../../static/img.png']"></image>
						<image class="bofan" src="../../static/play_btn.png"></image>
						<view class="mask"></view>
						<!-- <view class="name">
						景茂誉景国际
					</view> -->
					</view>
					<view class="item-title">
						{{a.title}}
					</view>
					<view class="item-price">
						{{a.price}} 
						<text>元 / m²    </text>
						<text> {{a.region_title}} / {{a.apartment}}居室 </text>
					</view>
				<!-- 	<view class="item-address">
						{{a.region_title}} / {{a.apartment}}居室
					</view> -->
					<!--  @click="detailstop(a.id)" -->
				<view class="item-user">
					<image :src="a.avatar" mode="" @click="detailstop(a.user_id)"></image>
					<view class="user-name">
						<view class="">
							{{a.user_nickname}}
						</view>
					<!-- 	<view class="company">
							{{a.company}}
						</view> -->
					</view>
				
				</view>
					<view class="item-bottom">
						<view class="bf">
							<image src="../../static/video.png"></image>
							<view>{{a.click}}</view>
						</view>
						<view class="z">
						<!-- 	<image v-if="a.is_fabulous == 0|| a.is_fabulous ==null" src="../../static/praise_empty.png" mode="" @click="praisetop(index,a.id)"></image> -->
							<image  src="../../static/praise.png" mode="" ></image>
							<view>{{a.fabulous_count}}</view>
						</view>


					</view>
				</view>

			</view>

			<!-- end -->

		</block>
		<!-- 文章 -->
		<block v-if="isshow==1">
			<view class="hot-content" v-if="datalist.length > 0">
				<view class="hot-item " v-for="(a,index) in datalist" :key="index"  @click="artivedateil(a.id)">
					<view class="img">
						<image  v-if="a.image" :src="utils.siteBaseUrl(a.image)"></image>
						<image  v-else src="../../static/img.png"></image>
					</view>
					<view class="item-right">
						<view class="hot-title"> {{a.title}}</view>
						<view class="artice">
							<view class="art-data">{{utils.timeTodate('Y-m-d H:i:s',a.create_time*1000)}}</view>
								<view class="operate">
								<image v-if="a.avatar" :src="a.avatar"></image>
									<view class=""  v-if="a.properties_title">
										{{a.properties_title}}
									</view>

								</view>
							</view>

						</view>

					</view>
			</view>
		</block>
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
				datalist: [],
				listHouse: [],
				isshow: 2
			}
		},
		onLoad() {
			

		},
		onShow() {
			let _seft = this
			
			//视频讲房
			con.sendRequest({
				url: '/home/Favorites/getFavorites',
				method: 'get',
				data: {
					type: 2
				}, //收藏类型 1.文章  2.楼盘 3.视频
				success: function(res) {
					var datas = res.data
					console.log(datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.datalist = restun
					}
				}
			
			})
		},
		methods: {
			showtop(index) {
				
				var _seft = this
				_seft.datalist = []
				_seft.isshow = index
				con.sendRequest({
					url: '/home/Favorites/getFavorites',
					method: 'get',
					data: {
						type: index
					},
					success: function(res) {
						var datas = res.data
						console.log(datas)
						if (datas.code == 1) {
							var restun = datas.data
							_seft.datalist = restun
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
						}
					}

				})

			},
			
			praisetop(index,id){
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'GET',
					data: {
						id: id,
						type:8
					},
					success: function(res) {
						var datas = res.data
						
						if (datas.code == 1) {
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
							
						_seft.anslist[index].is_fabulous = 1
						_seft.anslist[index].count = _seft.anslist[index].count + 1
						
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
						}
						//console.log('问答详情',datas)
					}
				})
			},
			nopraisetop(index,id){
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'GET',
					data: {
						id: id,
						type:8
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
							_seft.anslist[index].is_fabulous = 0
							_seft.anslist[index].count = _seft.anslist[index].count - 1
						
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
						}
					}
				})
			},
	
			housedetail(index) {
				let _seft = this
				uni.navigateTo({
					url: '../shakehouse/video?id='+index
				})
			},
			detailstop(index) {
				console.log(index);
				uni.navigateTo({
						url:"../consultants/details?id="+index
				})
			},
			artivedateil(index) {
				uni.navigateTo({
					url: '../news/details?id=' + index
				})
			},
			
		},
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

	.active {
		line-height: 90rpx;
		font-size: 32rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;
		/* width: 57%; */
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #EEF6FE;
		width: 100%;
		/* padding-bottom: 20rpx; */
	}

	/* 咨询分类 */

	.active {
		line-height: 90rpx;
		font-size: 32rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;
		/* width: 57%; */
	}

	.scroll-view {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		/* white-space: nowrap;
		width: 95%; */
		width: 95%;
	}


	.scroll-view-item {
		display: inline-block;
		color: #606060;
		line-height: 90rpx;
		text-align: center;
		font-size: 26rpx;
		/* margin-left: 50rpx; */
		width: 20%;
	}

	/* end */

	
	/* 热门文章 */
	.hot-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.hot-content .hot-item {
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 160rpx;
		width: 100%
	}
	
	.hot-content .hot-item .img {
		width: 27%;
	
	}
	
	.hot-content .hot-item .img image {
		width: 100%;
		height: 150rpx;
	
	}
	
	.hot-content .hot-item .item-right {
		width: 69%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}
	
	.hot-content .hot-item .item-right .hot-title {
		font-size: 30rpx;
		overflow: hidden;
		width: 100%;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		/* height: 100rpx; */
	}
	
	.hot-content .hot-item .item-right .artice {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin-top: 20rpx;
		
	
	}
	
	.hot-content .hot-item .item-right .artice .art-data {
		font-size: 24rpx;
		opacity: .6;
		
	}
	
	.hot-content .hot-item .item-right .artice .operate {
		display: flex;
		flex-direction: row;
		justify-content: start;
		margin-left: 10%;
		width: 40%;
		
	}
	
	
	.hot-content .hot-item .item-right .artice .operate image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 15rpx;
		border-radius: 50%;
	}
	
	.hot-content .hot-item .item-right .artice .operate>view {
		font-size: 27rpx;
		opacity: .6;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		width: 70%;
		margin-left: 5%;
		
	}
	
	/* end */

	.audio-list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		flex-wrap: wrap;
		width: 95%;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.audio-list .audio-item {
		display: flex;
		flex-direction: column;
		justify-content: start;
		/* align-items: center; */
		width: 46%;
		margin-bottom: 50rpx;

	}

	.audio-list .audio-item .item-top {
		/* height: 180rpx; */
		/* display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
		width: 100%;
		position: relative;

	}

	.audio-list .audio-item .item-top .img {
		width: 100%;
		height: 215rpx;
		border-radius: 15rpx;

	}

	.audio-list .audio-item .item-top .bofan {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		z-index: 1;
		top: 55rpx;
		left: 35%;
		
	}


	.audio-list .audio-item .item-top .mask {
		position: absolute;
		background-color: #000000;
		opacity: .45;
		width: 100%;
		height: 215rpx;
		border-radius: 15rpx;
		top: 0;
		left: 0;
	}


	.audio-list .audio-item .item-title {
		font-size: 31rpx;
		width: 100%;
		margin-top: 20rpx;
	}

	.audio-list .audio-item .item-price {
		font-size: 28rpx;
		color: #FFAB18;
		margin-top: 10rpx;
	}

	.audio-list .audio-item .item-price>text {
		color: #383838;
		margin-left: 10rpx;
		font-size: 23rpx;
	}

	.audio-list .audio-item .item-user {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 100%;
		font-size: 29rpx;
		margin-top: 10rpx;
	}


	.audio-list .audio-item .item-user>image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.audio-list .audio-item .item-user>view {
		margin-left: 15rpx;
		color: #2A4D9C;
	}

	.audio-list .audio-item .item-user .company {
		color: #7784B3;
		font-size: 24rpx;
		margin-top: 7rpx;
	}

	.audio-list .audio-item .item-address {
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	.audio-list .audio-item .item-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 10rpx;
	}

	/* 	.audio-list .audio-item .item-bottom .data {
		font-size: 24rpx;
		color: #7784B3;
	} */

	.audio-list .audio-item .item-bottom {
		display: flex;
		flex-direction: row;
		justify-content: end;
		align-items: center;
		width: 100%;
		font-size: 24rpx;
		color: #7784B3;
	}

	.audio-list .audio-item .item-bottom .bf {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 30%;
	}

	.audio-list .audio-item .item-bottom .z {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 30%;
		margin-left: 15rpx;
	}

	.audio-list .audio-item .item-bottom .bf>image {
		width: 45rpx;
		height: 45rpx;

	}

	.audio-list .audio-item .item-bottom .z>image {
		width: 40rpx;
		height: 40rpx;

	}


	/* end */
</style>
