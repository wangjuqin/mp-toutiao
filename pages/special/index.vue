<template>
	<view class="content">

		<view class="" style="background-color: #EEF6FE;width: 100%;">
			<my-search style="width: 100%;" @send="getCenter" :keyword="keyword"></my-search>
		</view>



		<my-column-list style="width: 100%;margin-top: 30rpx;" :listHouse='listHouse'> </my-column-list>
		<view class="list-bottom">
			<image src="../../static/warning.png" mode=""></image>

		</view>

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
				limits: 15,
				pages: 1,	
				keyword: '',
				datas: [],
			}
		},
		onLoad(e) {
			let _seft = this
			let data = []
		 	if (e.is_recommend) data['is_recommend'] = e.is_recommend
			_seft.datas = data
			console.log('=======', data)
			_seft.houselists()
		},
		onReachBottom() {
			let _seft = this
			_seft.pages++
			if(_seft.keyword){
				_seft.searchHose()
			}else{
				_seft.houselists()
			}
			
		},
		onShow() {
			let _seft = this
			console.log(_seft.datas)
			//_seft.houselists()
		},
		methods: {
			houselists() {
				let _seft = this
				_seft.datas['limit'] = _seft.limits
				_seft.datas['p'] = _seft.pages
				console.log(_seft.datas)
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				//列表
				con.sendRequest({
					url: '/home/properties/getList',
					method: 'get',
					data: _seft.datas,
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
			
			getCenter(keyword) {
				let _seft = this
				_seft.pages = 1
				_seft.keyword = keyword
				_seft.listHouse = []
				_seft.datas['keyword'] = keyword
				_seft.datas['type'] = 1
				_seft.searchHose()
			},
			searchHose(){
				let _seft = this
				_seft.datas['limit'] = _seft.limits
				_seft.datas['p'] = _seft.pages
				console.log(_seft.datas)
				//列表
				con.sendRequest({
					url: '/home/properties/getList',
					method: 'get',
					data:_seft.datas,
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
