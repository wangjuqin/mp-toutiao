<template>

<!-- 	<view class="house-navbar">
		<view class="left"> </view>
		<view class="right" v-if="isshow">{{righttitle}}></view>
	</view> -->
	<view class="contens">
		<view class="navbar-top">
			<view class="">{{lefttitle}}</view>
			<view class=""    v-if="isshows == 1"   @click="more(morelist)"> {{righttitle}}
				<image src="../static/jkh-r.png" mode=""></image>
			</view>
		</view>
	</view>
	

</template>

<script>
	export default {
		name: 'mylabertitle',
		props: {
			righttitle: {
				type: String,
				default: "更多"
			},

			lefttitle: {
				type: String,
				default: "特色推荐"
			},
			isshows: {
				type: String,
				default:'1'
				
			},
			morelist:{
				type: String,
				default:''
			}
		
			

		},
		data() {
			return {
				title: 'Hello',
              
			}
		},
		methods:{
			more(index) {
				console.log(index)
				uni.navigateTo({
					url: index,
				});
			}
		}
		
	}
</script>

<style>
	
	.contens{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.navbar-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 52px;
		width: 95%;
	}
	
	.navbar-top view:nth-of-type(1) {
		font-size: 40rpx;
		font-family: FZLanTingHei-L-GBK;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		/* line-height:99px; */
		/* width: 80%; */
	}
	
	.navbar-top view:nth-of-type(2) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #6F6F6F;
	}
	
	.navbar-top view>image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
