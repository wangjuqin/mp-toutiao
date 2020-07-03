<template>
	<view class="conten" v-bind:style="{height:windowHeight}">
		<button class="loginbut" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">微信授权登录小程序</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight: '',
				windowWidth: '',

			};
		},
		onLoad() {
			let _self = this
			let requestUrl = this.siteBaseUrl + '/wxapp/public/login'
			uni.getUserInfo({
				withCredentials: true,
				success: function(res) {
					console.log(res);
					if (!res.iv) {
						uni.showToast({
							title: "您取消了授权,登录失败",
							icon: "none"
						});
						return false;
					}
					uni.login({
						success: function(res2) {
							console.log(res2);
							uni.request({
								url: requestUrl,
								data: {
									code: res2.code,
									raw_data: res.rawData,
									signature: res.signature,
									encrypted_data: res.encryptedData,
									iv: res.iv
								},
								method: 'post',
								success: function(res3) {
									console.log(res3);
									var datas = res3.data
									console.log(res3);
									if (datas.code == 1) {
										uni.clearStorage()
										uni.setStorageSync('sessionKey', datas.data.token); //储存ttoken 

										uni.switchTab({
											url: '../index/index'
										})
									} else {

										console.log('登录失败')
									}

								},
								fail: function(res3) {
									console.log('链接失败')
									console.log(res3);

								}
							})


						}
					})



				}
			})


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
		onReady() {
			uni.getSetting({
				success: function(res) {
					console.log(res);

				},
				fail: function() {

				}
			})

		},
		methods: {
			wxGetUserInfo: function(res) {
				console.log('wxGetUserInfo', res);
				return
				let requestUrl = this.siteBaseUrl + '/wxapp/public/login'
				let _self = this
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				console.log(res.detail)
				uni.login({
					success: function(res2) {
						console.log(res2);
						uni.request({
							url: requestUrl,
							data: {
								code: res2.code,
								raw_data: res.detail.rawData,
								signature: res.detail.signature,
								encrypted_data: res.detail.encryptedData,
								iv: res.detail.iv
							},
							method: 'post',
							success: function(res3) {
								console.log(res3);
								var datas = res3.data

								console.log(res3);
								if (datas.code == 1) {
									uni.clearStorage()
									uni.setStorageSync('sessionKey', datas.data.token); //储存ttoken 

									uni.switchTab({
										url: '../index/index'
									})
								} else {
									/* 	uni.switchTab({
											url: '../index/index'
										}) */
									console.log('登录失败')
								}

							},
							fail: function(res3) {
								console.log('链接失败')
								console.log(res3);

							}
						})


					}
				})

			},

		}

	}
</script>

<style>
	.conten {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		width: 100%;


	}

	.loginbut {
		color: #FFFFFF;
		width: 80%;
		background-color: #38aefe;

	}
</style>
