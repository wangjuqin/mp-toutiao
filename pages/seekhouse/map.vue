<template>
	<view class="content">
		<my-house-cate style="width: 100%;" :laberlist="laberlist" @send="getSonValue"></my-house-cate>


		<map style="width: 100%;" v-bind:style="{height:windowHeight}"  :latitude="latitude"  scale="9"  :longitude="longitude"   :markers="covers"
	@callouttap="selecthouseTop"	 altitude="true">
		</map>
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
				isshow: 4,
				Sale: [],
				salest: 0,
				activest: 0,
				Region: [],
				Metro: [],
				AllPrice: [],
				Price: [],
				regionst: 0,
				metrost: 0,
				pricest: 0,
				allpricest: 0,
				decoratest: 0,
				doorst: 0,
				areast: 0,
				Renovation: [], //装修
				Apartment: [], //户型
				Area: [], //面积
				catelist: [],
				laberlist: [{
						title: '区域',
						id: 0
					},
					{
						title: '价格',
						id: 1
					},
					{
						title: '户型',
						id: 2
					},
					{
						title: '面积',
						id: 3
					},
					{
						title: '装修',
						id: 4
					},

				],
				windowHeight: '603rpx',
				latitude: 30.64242,
				longitude: 104.04311,
				covers: [],
				citys: [],
				housecount: [],
			}
		},
		onLoad() {
			let _seft = this
			//楼盘数量
			/* _seft.housecountTop() */
		/* 	_seft.citystop() */
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


			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log('res=====', res)
					_seft.longitude = res.longitude
					_seft.latitude = res.latitude
					/* _seft.covers = [{
						latitude: _seft.latitude,
						longitude: _seft.longitude,
						width: 25,
						height: 25,
						iconPath: "../../static/map.png",
					}, ] */
				}
			})

console.log('res==', _seft.longitude,_seft.latitude)
			//楼盘数量
			_seft.housecountTop()
		/* 	_seft.citystop()
 */

		},

		methods: {
			
			selecthouseTop(e){
				console.log('e', e.markerId)
				uni.navigateTo({
					url: "./houselist?regionst="+ e.markerId
				})
			},
			getSonValue: function(res) {
				let _seft = this
				var data = ''
				if (res.proper_id) data += '&regionst=' + res.proper_id
				if (res.metro_id) data += '&metro_id=' + res.metro_id
				if (res.price)data += '&price=' + res.price
				if (res.amount) data += '&amount=' + res.amount
				if (res.apartment_id) data += '&apartment_id=' +  res.apartment_id
				if (res.area_id) data += '&area_id=' +  res.area_id
				if (res.renovation_id ) data += '&renovation_id=' +  res.renovation_id //装修
				if (res.sale_id) data += '&sale_id=' +  res.sale_id //销售情况
				if (res.type_id) data += '&type_id=' +  res.type_id //类型
				uni.navigateTo({
					url: "./houselist?"+data
				})
				//console.log('res', res)
			},
			citystop() {
				let _seft = this
				_seft.qqmapsdk.getDistrictByCityId({
					id: '510100',
					success: function(res) { //成功后的回调"510100"  成都id
						//console.log(res);
						_seft.citys = res.result[0]
						_seft.maphouse(_seft.housecount, _seft.citys)
						console.log('楼盘数量', _seft.housecount, '城市', _seft.citys)
						
					},
					
				})
			},

			maphouse(restun, citys) {

				let _seft = this
				let fly = []
				for (let item in restun) {
					let res = {}
					for (let i in citys) {
						if (restun[item].name == citys[i].fullname) {
							res['id'] = restun[item]['id']
							res['latitude'] = citys[i]['location']['lat']
							res['longitude'] = citys[i]['location']['lng']
							res['width'] = 20
							res['height'] = 20
							res['iconPath'] = "../../static/map.png"
							res['callout'] = {
								content:restun[item]['name']+'('+restun[item]['count'] +')',
								color:"#000",
								fontSize:13,
								padding:8,
								borderRadius:15,
								bgColor:"#FFF",
								display:'ALWAYS',
								textAlign:'center'
								
							}
							fly.push(res)
						}

					}

				}

				_seft.covers = fly
				console.log('fly======', fly)
			},

			housecountTop() {
				let _seft = this
				//楼盘数量
				con.sendRequest({
					url: '/home/region/getAddress',
					method: 'get',
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
						    _seft.citystop()
							_seft.housecount = restun

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
	}
</style>
