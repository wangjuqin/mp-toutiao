<template>
	<view class="contens">
		<scroll-view class="scroll-view" scroll-x="true"  @scroll="scroll" scroll-left="0">

			<navigator class="scroll-view-item "  :class="[laber == item.laber?'active':'']"   v-for="(item,index) in  scrolllist"  :key="index"    :url="item.url"  hover-class="none" >
			{{item.title}}
				</navigator>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			
			laber:String,
			
			scrolllist: Array,
			
		},
		data() {
			return {
				

			};
		}
	}
</script>

<style>
	.contens {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.active {
		line-height: 90rpx;
		font-size: 32rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;

	}

	.scroll-view {
		white-space: nowrap;
		width: 95%;
	}

	.scroll-view-item {
		display: inline-block;
		color: #606060;
		font-size: 26rpx;
		padding: 0rpx 30rpx;
	}
</style>
