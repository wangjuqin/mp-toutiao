<template>
	<view class="content">


		<view class="house-detail">
<!-- 			<view class="detail-items consult">
				<image src="../../static/logo.png" mode=""></image>
				<view>
					<view class="consult-title">
						咨询我，了解更多楼盘信息
					</view>
					<button type="default" class="consult-btn">立即咨询</button>
				</view>
			</view> -->
			<view class="detail-items boeders">
				<view>
					开盘时间：
				</view>
				<view> {{housedata.time}}</view>
			</view>
			<view class="detail-item">
				产权年限：<text>{{housedata.year}}</text>
			</view>
			<view class="detail-item">
				物业类型：<text >{{housedata.type}}</text>
			</view>
			<view class="detail-item">
				预计交房：<text>{{housedata.hand}}</text>
			</view>

			<view class="detail-item">
				装修情况：<text v-if="housedata.renovation==44" >未装修</text>
				<text v-else >已装修</text>
			</view>
			<view class="detail-item">
				占地面积：<text>{{housedata.area_covered}}</text>
			</view>

			<view class="detail-item">
				建筑面积：<text>{{housedata.built_area}}</text>
			</view>
			<view class="detail-item">
				建筑类型： <text>{{housedata.built_type}}</text>
			</view>

			<view class="detail-item">
				绿化 率：<text>{{housedata.afforestation_rate}}</text>
			</view>
			<view class="detail-item">
				容 积 率：<text>{{housedata.plot_ratio}}</text>
			</view>

			<view class="detail-item">
				车位数：<text>{{housedata.car_number}}</text>
			</view>
			<view class="detail-item">
				规划户数：<text>{{housedata.planning_number}}</text>
			</view>
			<view class="detail-item">
				物业费：<text>{{housedata.property_fee}}</text>/㎡
			</view>

			<view class="detail-items">
				<view class="">
					物业公司：
				</view>
				<view> {{housedata.company}}</view>
			</view>
			<view class="detail-items">
				<view class="">
					开发商：
				</view>
				<view> {{housedata.developers}}</view>
			</view>
			<view class="detail-items">
				<view class="">
					售楼处：
				</view>
				<view> {{housedata.sales_office}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import con from '../../common/config.js'
	export default {
		data() {
			return {
				title: 'Hello',
				housedata:''
			}
		},
		onLoad(e) {
			let _seft = this
			let houseid = e.id
			console.log(houseid)
			con.sendRequest({
				url: '/home/Properties/getPropertiesShow',
				method: 'GET',
				data: {
					'id': houseid
				},
				success: function(res) {
					var datas = res.data
					console.log(datas)
					if (datas.code == 1) {
						var resturn = datas.data
						_seft.housedata = resturn
						//console.log('楼盘', resturn, d)
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
		width: 100%;
	}

	.house-detail {
		display: flex;
		flex-direction: row;
		width: 95%;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		/* 	text-align: center; */
		font-size: 29rpx;
		color: #9A9A9A;
	}

	.house-detail .detail-item {
		width: 50%;
		margin-top: 40rpx;
	}

	.house-detail .detail-item>text {
		color: #000000;
	}

	.house-detail .detail-items {
		width: 100%;
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
	}

	.house-detail .detail-items>view:nth-of-type(1) {
		width: 22%;
	}

	.house-detail .detail-items>view:nth-of-type(2) {
		color: #000000;
		width: 78%;
	}

	.house-detail .detail-items>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;

	}

	.house-detail .boeders {
		border-bottom: 1rpx solid #CAD6E2;
		padding-bottom: 30rpx;

	}

	.house-detail .consult {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.house-detail .consult>view {
		width: 80% !important;
		background-color: #389BFE !important;
		color: #FFFFFF !important;
		border-radius: 15rpx;
		line-height: 100rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.house-detail .consult .consult-btn {
		background-color: #FFFFFF;
		color: #389BFE;
		font-size: 29rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-weight: bold;

	}
</style>
