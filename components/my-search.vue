<template>

	<view class="search">
		<view class="searchbar">
			<icon class="searchicon" type="search" size="16"></icon>
			<input class="searchtext" type="text" :value="keyword"  @input="searchtop" placeholder="请输入搜索关键字" />
		</view>
	</view>

</template>

<script>
	import con from '@/common/config.js'
	export default {
		name: 'Mysearch',
		props: {
			keyword: {
				type: String,
				default: ''
			},
		
		},
		data(){
			return {
				
				
			}
			
		},

		methods: {
			searchtop(e){
				let _seft = this
				var centers = e.detail.value
				_seft.$emit("send", centers)
				
				
			/* 	uni.$emit('send',centers) */
			
			},
		}
	}
</script>

<style>
	/* 搜索 */

	.search {
		display: flex;
		justify-content: center;

		width: 100%;

	}

	.searchbar {
		margin: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 95%;
		height: 60rpx;
		border-radius: 50rpx;
		border: 1px solid #EEEEEE;
		background-color: #FFFFFF;
	}

	.search .searchbar .searchicon {
		text-align: center;
		width: 10%;
	}

	.search .searchbar .searchtext {
		font-size: 14px;
		width: 95%;

	}

	/* end */
</style>
