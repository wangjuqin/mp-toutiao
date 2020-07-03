<template>
	<view class="content">
		<view class="uni-card" v-if="amount">
			<view class="headerimg">
				<image src="../../static/money.png" mode=""></image>
				<view class="">
					{{amount.balance}} 元
				</view>
			</view>

			<form @submit="formSubmit" @reset="formReset" class="form-card">
				<view class="labertitle">提现金额</view>
				<view class="laber-input">
					<view class="">
						￥
					</view>
					<input type="number" :value="balance" name="amount" :placeholder="amount.balance" />
					<view class="" @click="totalTop">
						全部
					</view>

				</view>
				<view class="labertitle">银行卡号</view>
				<view class="laber-input">
					<view class="">

					</view>
					<input type="number" :value="banks.card" name="card" placeholder="银行卡号" />
					<view class="">

					</view>

				</view>
				<view class="labertitle">开户名</view>
				<view class="laber-input">
					<view class="">

					</view>
					<input type="text" :value="banks.name" name="name" placeholder="开户名" />
					<view class="">

					</view>

				</view>

				<view class="labertitle">开户行</view>
				<view class="laber-input">
					<view class="">

					</view>
					<input type="text" :value="banks.bank" name="bank" placeholder="开户行" />
					<view class="">

					</view>

				</view>
				<button class="card-bottom" form-type="submit">提现</button>
			</form>


		</view>

	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '提现',
				utils: utils,
				amount: '',
				balance: '',
				banks: '',

			}
		},
		onLoad() {

		},
		onShow() {
			con.usertype() //用户身份	
			let _seft = this

			//我的名片
			con.sendRequest({
				url: '/home/index/amount',
				method: 'get',
				success: function(res) {
					console.log('我的名片', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.amount = restun
					}

				}

			}) //我的银行卡信息
			con.sendRequest({
				url: '/home/index/get_bank',
				method: 'get',
				success: function(res) {
					console.log('我的名片', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.banks = restun
					}

				}

			})
		},
		methods: {
			formSubmit: function(e) {
				let _seft = this
				var formdata = e.detail.value
				console.log('formdata', formdata)
				if (!formdata.amount) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none',
						duration: 1500,
					})
					return
				}
				if (formdata.amount > _seft.amount.balance) {
					uni.showToast({
						title: '提现金额不能多于余额',
						icon: 'none',
						duration: 1500,
					})
					return
				}
				if (!formdata.card) {
					uni.showToast({
						title: '请输入银行卡号',
						icon: 'none',
						duration: 1500,
					})
					return
				}
				if (!formdata.name) {
					uni.showToast({
						title: '请输入开户名',
						icon: 'none',
						duration: 1500,
					})
					return
				}
				if (!formdata.bank) {
					uni.showToast({
						title: '请输入开户行',
						icon: 'none',
						duration: 1500,
					})
					return
				}
				console.log('formdata', formdata)

				con.sendRequest({
					url: '/home/index/apply_balance',
					method: 'post',
					data: formdata,
					success: function(res) {
						var datas = res.data
						console.log(datas)
						if (datas.code == 1) {
							uni.navigateTo({
								url: '../index'
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: 'none',
								duration: 1500,
							})
							return
						}
					},
					fail: function(res) {
						console.log('fail', res)
					}
				})

			},
			totalTop() {
				let _seft = this
				_seft.balance = _seft.amount.balance
			},
			cashTop() {
				uni.navigateTo({
					url: "./cash"
				})
			},
			amountTop(e) {
				let _seft = this
				console.log(e)
				_seft.balance = e.detail.value
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
		background-color: #389AFD;
		padding-bottom: 200rpx;
	}

	.uni-card {
		width: 95%;
		background-color: #FFFFFF;
		margin-top: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;



	}

	.form-card {
		margin: 0rpx 30rpx 30rpx 30rpx;

	}

	.uni-card>view {
		margin: 0rpx 30rpx 30rpx 30rpx;


	}

	.uni-card .headerimg {
		/* margin-top: -90rpx; */
		margin-top: 50rpx;
		font-weight: bold;
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: center;
		font-size: 36rpx;

	}

	.uni-card .headerimg>image {
		width: 65rpx;
		height: 65rpx;
		margin-right: 10rpx;

	}

	.labertitle {
		color: #606060;
		font-size: 32rpx;
		margin: 20rpx 0rpx;
	}

	.laber-input {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1rpx solid #9C9C9C;
		margin: 15rpx 0rpx;
	}

	.laber-input>view {
		color: #389BFE;
		font-size: 26rpx;
	}

	.laber-input>input {
		width: 80%;
		font-size: 26rpx;
	}





	.card-bottom {
		background-color: #389BFE;
		font-size: 34rpx;
		width: 90%;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50rpx;
		/* 	margin-top: -45rpx; */
		border: 1rpx solid #FFFFFF;
		line-height: 90rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.card-bottom>view {
		width: 75%;
		margin-left: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: center;
	}
</style>
