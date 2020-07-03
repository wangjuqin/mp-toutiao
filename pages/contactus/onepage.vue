<template>
	<view class="content">
		<view class="pagetitle" v-if="pages.title">
			{{pages.title}}
		</view>
		<view class="pageconten" v-if="pages.content">
			
			<jyf-parser :html="pages.content" ref="article"></jyf-parser>
		<!-- 	<rich-text :nodes="pages.content"></rich-text> -->

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
				pages: '',
				types: '',

			}
		},
		onLoad(e) {
			let _seft = this
			_seft.types = e.type
			//1派好房协议 2加入我们 3商务合作 4联系客服 5.积分规则说明
			var title = ''
			switch (e.type) {
				case 1:
					title = '派好房协议'
					break;
				case 2:
					title = '加入我们'
					break;
				case 3:
					title = '商务合作'
					break;
				case 4:
					title = '联系客服'
					break;
				case 5:
					title = '积分规则说明'
					break;

			}

			uni.setNavigationBarTitle({
				title: title
			});

			_seft.onepage()

		},
		methods: {


			onepage() {
				let _seft = this
				con.sendRequest({
					url: '/home/index/page',
					method: 'get',
					data: {
						type: _seft.types
					},
					success: function(res) {
						console.log('', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.pages = restun
						}

					}

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

	.pagetitle {
		text-align: center;
		width: 90%;
		margin-top: 30rpx;
		font-weight: bold;
		font-size: 36rpx;
	}

	.pageconten {
		width: 90%;
		margin-top: 20rpx;
		font-size: 32rpx;
	}
</style>
