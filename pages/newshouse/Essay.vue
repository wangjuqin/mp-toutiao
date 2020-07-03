<template>
	<view class="content">
		<my-news-list style="width: 100%;" :ArticleList="Essay" operate="2"></my-news-list>
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
				limits: 5,
				Essay: [],

			}
		},
		onLoad(e) {
			let _seft = this
		
			//专享文章
			con.sendRequest({
				url: '/home/Essay/getShowList',
				method: 'get',
				data: {
					"id":  e.id,
					is_all:1
				},
				success: function(res) {
					var datas = res.data
					console.log('专享文章', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Essay = restun

					}
				}
			})
		},



		methods: {


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

	scroll-view {
		width: 100%;
		height: 100%;
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #EEF6FE;
		width: 100%;
	}




	/* 特色推荐 */


	.active-swiper {
		width: 95%;
		height: 200rpx;
	}

	.active-swiper swiper {
		height: 100%;
	}


	.active-swiper image {
		width: 100%;
		height: 200rpx;
		/* padding: 0rpx; */

	}

	/* end */

	/* navigator */
	.navigator {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 95%;
	}

	.navigator .navigator-left {
		width: 35%;
	}

	.navigator .navigator-left>image {
		margin-top: 20rpx;
		width: 100%;
		height: 320rpx;
		border-radius: 10rpx;
	}

	.navigator .navigator-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 60%;
	}

	.navigator .navigator-right>image {
		width: 100%;
		height: 150rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}

	/* end */




	/* tabel标签 */

	.tabstatus {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
	}

	.table-navbar {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 95%;
		margin: 40rpx 0rpx;
		white-space: nowrap;
	}

	.table-navbar .table-item {
		display: inline-block;
		font-size: 26rpx;
		width: 160rpx;
		height: 60rpx;
		border-radius: 10rpx;
		line-height: 60rpx;
		margin-right: 30rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
	}

	.table-active {
		background-color: #38AEFE !important;
		color: #FFFFFF;
	}

	/* end*/

	/* 选择框 */


	.active {
		color: #389BFE !important;
	}

	.helpshouse {
		color: #ACB2B7;
		font-size: 24rpx;
		margin-top: 80rpx;

	}

	.helpshouse>text {
		color: #0086E4;
		font-size: 29rpx;
		font-weight: bold;
	}
</style>
