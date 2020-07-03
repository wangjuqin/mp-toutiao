<template>
	<view class="content">
		<view class="top">
			<view class="top-title">
				<view class="title-up">
					<text>{{count}}</text>人享受过专车看房服务
				</view>
				<!-- 	<view class="title-bt">
					人均节省了387元看房路费

				</view> -->

			</view>
		</view>


		<view class="laber">
			预约看房时间
		</view>
		<view class="laber-sl">
			<view class="laber-items">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>

			</view>

		</view>
		<view class="laber">
			想要去看的楼盘
		</view>
		<view class="laber-sl">
			<view class="laber-items">
				<input type="text" value="" @input="housenametop" maxlength="20" placeholder="请输入您想看的楼盘" />
			</view>

		</view>
		<view class="laber">
			您的联系方式
		</view>
		<view class="laber-sl">
			<view class="laber-items">
				<input type="number" value="" name='phone' @input="phonetop"  maxlength="11" placeholder="请输入您的联系方式" />
			</view>
		
		</view>
		<view class="laber">
			您的称呼
		</view>
		<view class="laber-sl">
			<view class="laber-item" :class="[gender=='1'?'active':'']" @click="gendertop(1)">
				先生
			</view>
			<view class="laber-item" :class="[gender=='2'?'active':'']" @click="gendertop(2)">
				女士
			</view>
		</view>
	

		<button type="default" class="debnt" @click="sumbittop">确认</button>

	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'Hello',
				utils: utils,
				time: '12:01',
				gender: 1,
				date: currentDate,
				housename: '',
				housid: '',
				count: '',
				phone:'',
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.housid = e.id
			con.sendRequest({
				url: '/home/Dynamic/getMessageCount',
				method: 'get',
				success: function(res) {
				//	console.log('yuyu', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.count = restun
					}
				}
			})


		},
		methods: {
			sumbittop() {
				let _seft = this
				if (!_seft.date) {
					uni.showToast({
						title: '请选择预约时间',
						icon:"none",
						duration: 1500,
					})
					return
				}
				if (!_seft.housename) {
					uni.showToast({
						title: '请输入您想看楼盘',
						icon:"none",
						duration: 1500,
					})
					return
				}
				if (!_seft.phone) {
					uni.showToast({
						title: '请输入您的联系方式',
						icon:"none",
						duration: 1500,
					})
					return
				}
				
				//提交预约
				uni.showLoading({
					title: '正在提交',
					mask:true
				})
				con.sendRequest({
					url: '/home/Properties/addMessage',
					method: 'post',
					data: {
						gender: _seft.gender == 1 ? '先生' : '女士',
						time: _seft.date,
						title: _seft.housename,
						phone: _seft.phone,
						properties_id: _seft.housid,
					},
					success: function(res) {
						uni.hideLoading()
						uni.showModal({
							title:'预约看房',
							content:'您已预约成功',
							success:function(){
								uni.navigateTo({
									url:'../newshouse_details/index?id='+_seft.housid
								})
							
							}
						})

					}
				})

			},

			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			gendertop(index) {
				this.gender = index

			},
			housenametop(e) {
				//console.log(e.detail.value)
				this.housename = e.detail.value


			},
			phonetop(e) {
				//console.log(e.detail.value)
				this.phone = e.detail.value


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
		width: 100%;
	}

	.active {
		background-color: #389BFE !important;
		color: #E9F2FF !important;
	}

	.top {
		background-color: #E9F2FF;
		width: 100%;
	}

	.top-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 90%;
		background-color: #FFFFFF;
		border: 1rpx solid #EEEEEE;
		box-shadow: 2rpx 2rpx 2rpx 2rpx #EEEEEE;
		margin: 30rpx;
		padding: 40rpx 0rpx;
	}

	.top-title .title-up {
		font-size: 30rpx;
		font-weight: bold;

	}

	.top-title .title-up>text {
		color: #E56447;
		font-size: 36rpx;

	}

	.top-title .title-bt {
		color: #97999B;
		font-size: 26rpx;

	}

	.laber {
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 50rpx;
		width: 95%;
	}

	.laber-sl {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		/* text-align: center; */
		color: #6E7074;
		font-size: 29rpx;
		width: 95%;
		margin-top: 30rpx;

	}

	.laber-sl .laber-item {
		background-color: #E9F2FF;
		padding: 5rpx 30rpx;
		margin: 0rpx 10rpx;
		border-radius: 15rpx;

	}

	.laber-sl .laber-items {
		background-color: #E9F2FF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.laber-sl .laber-items>input {
		/* background-color: #E9F2FF; */
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 15rpx;
	}

	.laber-sl .laber-items>picker {
		/* background-color: #E9F2FF; */
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 15rpx;
	}

	.debnt {
		margin-top: 80rpx;
		width: 80%;
		background-color: #389BFE !important;
		color: #FFFFFF !important;
		border-radius: 20rpx !important;
	}
</style>
