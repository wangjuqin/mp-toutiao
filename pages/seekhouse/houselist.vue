<template>
	<view class="content">

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
			let data = []
			if (e.is_recommend) data['is_recommend'] = e.is_recommend //推荐楼盘 1 首页限时特价推荐 2 首页热门推荐 3. 新房品质刚需
			
			if (e.regionst) data['proper_id'] = e.regionst //区域ID

			if (e.metro_id) data['metro_id'] = e.metro_id //地铁ID

			if (e.price) data['price'] = e.price //单价

			if (e.amount) data['amount'] = e.amount //总价

			if (e.apartment_id) data['apartment_id'] = e.apartment_id//几室

			if (e.area_id) data['area_id'] = e.area_id//面积

			if (e.renovation_id) data['renovation_id'] = e.renovation_id //装修
			
			if (e.sale_id) data['sale_id'] = e.sale_id //销售情况
			
			if (e.type_id) data['type_id'] = e.type_id //类型

			_seft.datas = data
		},
		onReachBottom() {
			let _seft = this
			_seft.pages++
			_seft.houselists()
		},
		onShow() {
			let _seft = this
			_seft.houselists()
		},
		methods: {
			houselists() {
				let _seft = this
				_seft.datas['limit'] = _seft.limits
				_seft.datas['p'] = _seft.pages
				console.log('datas', _seft.datas)
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
