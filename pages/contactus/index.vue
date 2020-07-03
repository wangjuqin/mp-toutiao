<template>
	<view class="content">
		<view  hover-class="none"  @click="onepage(item.type)" :url="item.url"  class="labar-item" v-for="(item,index) in list" :key="index" >
			<image :src="item.src" mode=""></image>
			<view class="title">
				{{item.title}}
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list:[
					{
						src:'../../static/pic8.png',
						title:'	商务合作',
						type:3
					},
					{
						src:'../../static/pic9.png',
						title:'	联系客服',
						type:4
					},
					{
						src:'../../static/pic10.png',
						title:'	加入我们',
						type:2
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			onepage(index){
				console.log(index)
				uni.navigateTo({
					url:"./onepage?type="+index
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
	}
.labar-item{
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: center;
  text-align: center;
	border-bottom: 1rpx solid rgba(188,194,230,0.63);
	box-shadow:0px 0px 3px 0px rgba(188,194,230,0.63);
	padding: 50rpx 0rpx;
}
	.labar-item>image {
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		border: 1rpx solid #BCC2E6;
		
	}

	.labar-item .title {
		width: 31%;
		font-size: 36rpx;
		line-height: 100rpx;
		

	}
</style>
