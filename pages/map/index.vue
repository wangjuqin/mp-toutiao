<template>
	<view class="content">
		<!-- 	<my-house-cate style="width: 100%;" :laberlist="laberlist" @send="getSonValue"></my-house-cate>
 -->

		<map style="width: 100%;" v-bind:style="{height:windowHeight}" :latitude="latitude" :longitude="longitude" scale="12" :markers="covers"
		 altitude="true">
		</map>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		data() {
			return {
				title: '地图',
				utils: utils,
				windowHeight: '603rpx',
				latitude: 39.909,
				longitude: 116.39742,
				covers: []
			}
		},
		onLoad(e) {
			let _seft = this

				
				let renovation = e.renovation.split(',')
				
				console.log('e.renovation=====',e.renovation,renovation)
				if(e.renovation && e.renovation != null){
					console.log('renovation[0]=====',renovation)
					_seft.latitude = renovation[0]
					_seft.longitude = renovation[1]
					_seft.covers = [{
						latitude: _seft.latitude,
						longitude: _seft.longitude,
						width: 25,
						height: 25,
						iconPath: "../../static/map.png",
					}, ]
				}else{
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							console.log('res=====',res)
							_seft.longitude = res.longitude
							_seft.latitude = res.latitude
							_seft.covers = [{
								latitude: _seft.latitude,
								longitude: _seft.longitude,	
								width: 25,
								height: 25,
								iconPath: "../../static/map.png",
							}, ]
						}
					})
				}
			

			
		},

		onShow() {
			let _seft = this
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					_seft.windowHeight = res.windowHeight + 'px'

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
	}
</style>
