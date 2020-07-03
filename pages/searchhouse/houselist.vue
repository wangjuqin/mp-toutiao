<template>
	<view class="content">
		<my-search style="width: 100%;" @send="getCenter" :keyword="keyword"></my-search>
		<block v-if="listHouse.length > 0">
			<my-column-list style="width: 100%;margin-top: 30rpx;" :listHouse='listHouse'> </my-column-list>
		</block>
		<block v-else>
			<view class="list-bottom">
				暂无数据

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
				title: '楼盘',
				utils: utils,
				listHouse: [],
				limits: 10,
				pages: 1,
				keyword: '',
				datas: [],
			}
		},
		onLoad(e) {
			let _seft = this
			console.log('onShow')
			_seft.searchHose()

		},
		onReachBottom() {
			let _seft = this
			_seft.pages++
				console.log('onReachBottom')
			_seft.searchHose()
		},
		onShow() {
			
		},
		methods: {

			getCenter(keyword) {
				let _seft = this
				_seft.pages = 1
				_seft.keyword = keyword
				_seft.listHouse = []
				console.log('getCenter')
				_seft.searchHose()
			},

			searchHose() {
				let _seft = this
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				//列表
				con.sendRequest({
					url: '/home/search/propertiesList',
					method: 'get',
					data: {
						limit: _seft.limits,
						p: _seft.pages,
						keyword: _seft.keyword,
					},
					success: function(res) {
						uni.hideLoading()

						var datas = res.data
						console.log('xiayiye', datas)
						if (datas.code == 1) {
							var restuns = datas.data
							_seft.listHouse = _seft.listHouse.concat(restuns)
						}
					}
				})
			},


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


	/* 搜索 */

	.search {
		/* background-color: #389BFE; */
		/* height: 250rpx; */
		display: flex;
		justify-content: center;
		/* padding-bottom: 187rpx; */
		width: 95%;
	}

	/* end */

	.list-bottom {
		margin-top: 300rpx;
		width: 95%;
		align-items: center;
		text-align: center;
	}

	.list-bottom>image {
		width: 39%;
		height: 100rpx;
	}
</style>
