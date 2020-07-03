<template>
	<view class="content">
		<view class="artive">
			<my-menutree :commentlist='commentlist'></my-menutree>
		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		data() {
			return {
				title: 'Hello',
				utils: utils,
				commentlist: [{
						"id": 1,
						"parent_id": 0,
						"menu_name": "第一级菜单 1",
						"sorting": 0,
						"node": [{
							"id": 2,
							"parent_id": 1,
							"menu_name": "第二级菜单 1-1",
							"sorting": 0,
							"node": [{
								"id": 3,
								"parent_id": 2,
								"menu_name": "第三级菜单 1-1-1",
								"sorting": 1,
								"node": [{
									"id": 3,
									"parent_id": 2,
									"menu_name": "第四级菜单 1-1-1",
									"sorting": 1
								}]
							}]
						}]
					},
					{
						"id": 4,
						"parent_id": 0,
						"menu_name": "第一级菜单 2",
						"sorting": 0,
						"node": [{
							"id": 5,
							"parent_id": 4,
							"menu_name": "第二级菜单 2-1",
							"sorting": 0
						}]
					}
				],

			}
		},


		onLoad(e) {
			let _seft = this
			//_seft.commentlists()
		},

		methods: {

			getSonArValue: function(res) {
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: 2,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.commentlist = restun
							console.log('评论ss', _seft.commentlist)

						}
					}

				})
			},
			commentlists() {
				let _seft = this
				//评论
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: 2,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.commentlist = restun
							console.log('评论ss', restun)
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
		padding-bottom: 200rpx;
	}

	.artive {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;
	}

	.comment-list {

		font-size: 24rpx;

		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 100%;
	}

	.comment-list .comment-item {

		margin-top: 20rpx;
	}

	.comment-list .comment-item>text {
		color: #9A9A9A;
		margin-right: 10rpx;
	}
</style>
