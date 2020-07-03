<template>
	<view class="content">
		<view class="top">
			<view class="scroll-view">
				<view class="scroll-view-item " :class="[isshow==1?'active':'']" @click="navtop(1)">评论</view>
				<view class="scroll-view-item " :class="[isshow==2?'active':'']" @click="navtop(2)"> 喜欢 </view>
			</view>
		</view>
		<block v-if="isshow == 1">
			<view class="advise" v-if="comments.length > 0">
				<view class="item" v-for="(a,item) in comments" :key="item"  @click="detailesTap(a.project_id,a.type)">
					<view class="left">
						<image :src="a.avatar"></image>
					</view>
					<view class="center">
						<view class="uname">{{a.user_nickname}}</view>
						<view class="address">
							<rich-text :nodes="a.content"></rich-text>
						</view>
						<view class="data">{{utils.timeTodate('Y-m-d',a.create_time*1000)}}</view>
					</view>

					<!-- 
					<view class="right">
						<image src="../../static/banner.png" mode=""></image>

					</view> -->
				</view>
			</view>
			<view class="advise" v-else>

				暂无评论
			</view>

		</block>
		<block v-if="isshow == 2">
			<view class="advise" v-if="likes.length > 0">
				<view class="item" v-for="(a,item) in likes" :key="item"  @click="detailesLikeTap(a.project_id,a.type)">
					<view class="left">
						<image :src="a.avatar"></image>
					</view>
					<view class="center">
						<view class="uname">{{a.user_nickname}}</view>
						<view class="address">赞了你</view>
						<view class="data">{{utils.timeTodate('Y-m-d',a.create_time*1000)}}</view>
					</view>

					<!-- 
					<view class="right">
						<image src="../../static/banner.png" mode=""></image>

					</view> -->
				</view>
			</view>
			<view class="advise" v-else>

				暂无点赞
			</view>
		</block>
		<view class="flex-box">
			<image src="../../static/home_btn.png" mode="" @click="Hometop"></image>

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
				utils: utils,

				isshow: 1,
				likes: [],
				comments: [],

			}
		},
		onLoad(e) {
			let _seft = this
			

		},
		onShow() {
			let _seft = this
			_seft.likesTap()
			_seft.commentsTap()
		
		
		},
		methods: {
			navtop(index) {
				let _seft = this
				this.isshow = index
				if(index == 2){
					_seft.likesTap()
				}else{
				_seft.commentsTap()	
				}
			},
			likesTap(){
				let _seft = this
			//我的消息喜欢
			con.sendRequest({
				url: '/home/Fabulous/getUserFabulous',
				method: 'get',
				success: function(res) {
					console.log('我的消息喜欢', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.likes = restun
					}
			
				}
			
			})	
			},
			commentsTap(){
				let _seft = this
				//我的消息评论
				con.sendRequest({
					url: '/home/Evaluate/getList',
					method: 'get',
					success: function(res) {
						console.log('我的消息评论', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.comments = restun
						}
				
					}
				
				})
			},
			
			
			Hometop() {
				uni.switchTab({
					url: '../index/index'
				})
			},
		detailesTap(index,type){
			
			switch(type){
				case 2:
				uni.navigateTo({
					url:'../news/details?id='+index
				})
				break;
				case 3:
				uni.navigateTo({
					url:'../shakehouse/video?id='+index
				})
				break;
				case 4:
				uni.navigateTo({
					url:'../sceneshot_detail/index?id='+index
				})
				break;	
			}
			
		},
		detailesLikeTap(index,type){
			switch(type){
				case 1:
				uni.navigateTo({
					url:'../consultants/details?id='+index
				})
				break;
				case 2:
				uni.navigateTo({
					url:'../shakehouse/video?id='+index
				})
				break;
				case 3:
				uni.navigateTo({
					url:'../news/details?id='+index
				})
				break;
				case 6:
				uni.navigateTo({
					url:'../sceneshot_detail/index?id='+index
				})
				break;	
			}
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
		margin-item: 30rpx;
		width: 100%;


	}

	.item .left {
		height: 100%;
	}

	.item .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item .center {
		display: flex;
		flex-direction: column;
		justify-content: start;
		height: 100%;
		width: 80%;
		margin-left: 20rpx;

	}


	.item .center .uname {
		font-size: 32rpx;
		width: 100%;
		color: #2A4D9C;

	}

	.item .center .address {
		margin-top: 15rpx;
		font-size: 29rpx;
		color: #000000;
		width: 100%;
		word-wrap: break-word;
		word-break: normal;

	}

	.item .center .data {
		font-size: 24rpx;
		color: #BFC4D9;
		width: 100%;
		margin-top: 15rpx;
	}

	.item .right {
		height: 100%;
		width: 31%;
	}

	.item .right>image {
		width: 100%;
		height: 100%;

	}

	.flex-box {
		position: fixed;
		right: 0rpx;
		z-index: 2;
		bottom: 150rpx;
	}

	.flex-box>image {
		width: 180rpx;
		height: 70rpx;
	}
</style>
