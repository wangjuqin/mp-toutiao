<template>
	<view class="content">
		
			
			<my-video-list ref='videotop' style="width: 100%;" :houseid='houseid'  @send="getSonValue"  :videolist="video"></my-video-list>
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
				video: [], //专享视频



			}
		},
		onShow(e) {
			let _seft = this
			_seft.videolists(_seft.houseid)	
		},

		onLoad(e) {
			let _seft = this
			let houseid = e.id
			_seft.houseid = houseid
			console.log('楼盘id', houseid)
		},
		
		methods: {
			getSonValue: function(index, type) {
				let _seft = this
				if (type == 'is_favorite') { //收藏
					if (_seft.video[index].is_favorite == 0 || _seft.video[index].is_favorite == null) {
						_seft.video[index].is_favorite = 1
					} else {
						_seft.video[index].is_favorite = 0
					}
				}
				if (type == 'is_fabulous') { //点赞
					if (_seft.video[index].is_fabulous == 0 || _seft.video[index].is_fabulous == null) {
						_seft.video[index].is_fabulous = 1
						_seft.video[index].give++
					} else {
						_seft.video[index].is_fabulous = 0
						_seft.video[index].give ? _seft.video[index].give-- : 0
					}
				}
			},
		

			videolists(houseid) {
				let _seft = this
				//专享视频
				con.sendRequest({
					url: '/home/video/getShowList',
					method: 'get',
					data: {
						"id": houseid,
						"is_all": 1
					},
					success: function(res) {
						var datas = res.data
						console.log('专享视频', datas)
						if (datas.code == 1) {
							var restun = datas.data
							_seft.video = restun
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

	
</style>
