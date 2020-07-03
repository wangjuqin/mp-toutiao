<template>
	<view class="content">

		<!-- 	<view class="upload-image" >
			<image  v-if="imageurl" :src="imageurl" mode=""></image>
			<uni-icons type="camera" size="60"  @click="uploads"></uni-icons>
		</view> -->

		<form @submit="formSubmit" @reset="formReset" class="box-form" style="width: 95%;margin-top: 30rpx;">
			<view class="house-dt" v-bind:style="{'background-image':posterdata.image}">
				<input type="text" :value="posterdata.id" name="id" hidden />
				<view class="titles">
					随时看房
				</view>
				<view class="house">
					<view class="housename">
						<input type="text" :value="posterdata.name" name="name" placeholder="请输入楼盘或房源名称" />
					</view>
					<view class="house-ppt">
						<view class="">
							<view class="">

							</view>
							售价
						</view>
						<view class="">
							<view class="">

							</view>
							面积
						</view>
						<view class="">
							<view class="">

							</view>户型
						</view>
					</view>
					<view class="ppt-input">
						<input type="text" :value="posterdata.price" name="price" placeholder="售价" />
						<input type="text" :value="posterdata.area" name="area" placeholder="面积" />
						<input type="text" :value="posterdata.house" name="house" placeholder="户型" />
					</view>

				</view>




			</view>
			<view class="users">
				<view class="user-lf">
					<view class="uname">
						联系人:<input type="text" :value="posterdata.username" name="username" placeholder="联系人" />
					</view>
					<view class="uname utel">
						联系电话:<input type="text" :value="posterdata.phone" name="phone" placeholder="联系电话" />
					</view>
				</view>


				<image v-if="posterdata.wecaht_img" :src="utils.siteBaseUrl(posterdata.wecaht_img)" mode=""></image>


			</view>

			<view class="fielx-box">
				<button class="rt-list">返回编辑</button>
				<!-- 	<view class="rt-list">
					返回列表页
				</view> -->
				<button class="view" form-type="submit">生成</button>
				<!-- 	<view class="view">
					<image src="../../static/view.png" mode=""></image>
					预览
				</view> -->
			</view>

		</form>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '海报',
				utils: utils,
				postid: '',
				posterdata: '',

				//imageurl:'',
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.postid = e.id

			_seft.posterdata = JSON.parse(uni.getStorageSync('poster'))

			console.log('海报', _seft.posterdata)
			//海报
			/* 	con.sendRequest({
					url: '/home/poster/info',
					method: 'get',
					data:{id:_seft.postid},
					success: function(res) {
						console.log('海报', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.posterdata = restun
							//_seft.active = restun-1
						}

					}

				}) */

		},
		onShow() {
			con.usertype() //用户身份	
		},
		methods: {
			formSubmit: function(e) {
				let _seft = this
				var formdata = e.detail.value
				//uni.setStorageSync('poster',JSON.stringify(formdata))

				console.log('formdata', formdata)
				if (!formdata.name) {
					uni.showToast({
						title: '请添加楼盘名称',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (!formdata.price) {
					uni.showToast({
						title: '请输入售价',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (!formdata.area) {
					uni.showToast({
						title: '请输入面积',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (!formdata.house) {
					uni.showToast({
						title: '请输入户型',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (!formdata.username) {
					uni.showToast({
						title: '请输入用户姓名',
						icon: "none",
						duration: 1500,
					})
					return
				}
				if (!formdata.phone) {
					uni.showToast({
						title: '请输入用户电话',
						icon: "none",
						duration: 1500,
					})
					return
				}

				uni.showLoading({
					title: "请求中",
					mask:true
				})
				con.sendRequest({
					url: '/home/poster/addPoster',
					method: 'post',
					data: formdata,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log(datas)
						//"/public/upload/default/image/1589968739.png"
						if (datas.code == 1) {
							_seft.codetop(datas.data)
							/* uni.navigateTo({
								url:"./poster_image?id="+formdata.id
							}) */
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
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
			codetop(image) {
				let _seft = this;
				let imgs = []
				/* utils.siteBaseUrl(image) */
				imgs.push(image)
				//imgs.push(utils.siteBaseUrl('default/image/1589968739.png'))
				// 预览图片
				console.log('posterdata', imgs);

				uni.previewImage({
					current: 1,
					urls: imgs,
					indicator: 'number',
					loop: true,
					success: function(res) {
						console.log('调用成功', res)
					},
					fail: function(res) {
						console.log('调用', res)
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

		padding-bottom: 200rpx;
	}

	.upload-image {
		width: 100%;
		height: 400rpx;
		line-height: 400rpx;
		background-color: #F5F2F5;
		text-align: center;
	}

	.upload-image>image {
		width: 100%;
		height: 400rpx
	}

	.house-dt {
		background-color: #728EC2;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 50rpx;
	}

	.house-dt .titles {
		font-size: 50px;
		color: #FFFFFF;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

	}

	.house {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #F8F4E3;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding-bottom: 50rpx;
		width: 90%;
	}

	.house .housename {

		width: 90%;
		margin-top: 50rpx;
		border-bottom: 2rpx solid #A0A9AB;
		padding-bottom: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.house .housename>input {
		width: 85%;
		/* border: 3rpx dashed #A31827; */
		text-align: center;
		height: 50rpx;
		font-size: 30rpx;
		color: #000000;
	}

	.house .house-ppt {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		color: #385D9E;
		font-weight: bold;
		margin-top: 20rpx;
	}

	.house .house-ppt>view {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 20%;
	}

	.house .house-ppt>view>view {
		background-color: #385D9E;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;

	}

	.house .ppt-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 90%;
		margin-top: 20rpx;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #A0A9AB;

	}

	.house .ppt-input>input {
		/* border: 3rpx dashed #A31827; */
		width: 28%;
		text-align: center;
		height: 50rpx;
		font-size: 30rpx;
		color: #000000;
	}

	.users {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 50rpx;
	}

	.users .user-lf {

		display: flex;
		flex-direction: column;
		justify-content: start;

	}

	.users .user-lf .uname {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
		color: #2E2B2C;
		font-size: 29rpx;
		margin-top: 15rpx;
	}

	.users .user-lf .uname>input {
		/* border: 3rpx dashed #A31827; */
		height: 40rpx;
		color: #000000;
		width: 40%;
		margin-left: 10rpx;
	}

	.users .user-lf .utel>input {
		width: 55% !important;
	}


	.users>image {
		width: 180rpx;
		height: 180rpx;
	}

	.fielx-box {
		position: fixed;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		border-top: 1rpx solid #EEEEEE;
		bottom: 0rpx;
		text-align: center;
		/* 	height: 70rpx; */
		line-height: 90rpx;
		z-index: 3;
	}

	.fielx-box .rt-list {
		width: 50%;
		background-color: #EEEEEE;


	}

	.fielx-box .view {
		width: 50%;
		background-color: #2A9BF7;
		color: #FFFFFF;
	}
</style>
