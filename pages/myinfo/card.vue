<template>
	<view class="content">
		<view class="uni-card" v-if="cards">
			<view class="headerimg">
				<image :src="cards.avatar" mode=""></image>
			</view>
			<view class="username">
				{{cards.name}}
			</view>
			<view class="user-message">
				<view class="wx">
					微 信：<text>{{cards.wechat_name}}</text>
				</view>
				<view class="tel">
					电 话：<text>{{cards.phone}}</text>
				</view>

			</view>
			<view class="company">
				所属公司：{{cards.company}}
			</view>
			<view class="qianming">
				<view class="qianming-title">
					个性签名：
				</view>
				<text class="qianming-content" v-if="editstaue == true">{{cards.describe}}</text>
				<view v-else class="editdesribe">
					<input type="text" :value="cards.describe" maxlength="30" @blur="editstaueTop" />
				</view>
				<!-- 	<view class="qianming-content">
					
				</view> -->
				<!-- @click="editTop" -->
				<view class="label" v-if="editstaue == true" @click="editTop">
					编辑
				</view>
			</view>


			<view class="prive">
				<view class="prive-item border-right">
					<view class="num">
						{{cards.click}}
					</view>
					<view class="">
						预览量
					</view>
				</view>
				<view class="prive-item border-right">
					<view class="num">
						{{cards.activity}}
					</view>
					<view class="">
						活跃度
					</view>
				</view>
				<view class="prive-item">
					<view class="num">
						{{cards.likes}}
					</view>
					<view class="">
						点赞数
					</view>
				</view>
			</view>

		</view>
		<view class="card-bottom">
			<button class="sharebtn" type="default" open-type="share">分享</button>
			<button class="sharebtn" type="default" @click="shoopTap">编辑</button>
			<!-- <view class="">
				<view class="">
					更正
				</view>
				<view class="">
					|
				</view>
				<view class="">
					注销
				</view>
			</view> -->

		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: '我的名片',
				utils: utils,
				cards: '',
				editstaue: true,
				auth:1,
			}
		},
		onLoad() {
			
		},
		onShow() {
			con.usertype()
			let _seft = this
			//我的身份
			con.sendRequest({
				url: '/user/Shop/isShop',
				method: 'post',
				success: function(res) {
					console.log('我的身份', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.auth = restun
						/* if (restun == 2) {
							_seft.isshow = 2
						} else {
							_seft.isshow = 1
						} */
			
					}
			
				}
			
			})
			//我的名片
			con.sendRequest({
				url: '/home/Shop/info',
				method: 'get',
				success: function(res) {
					console.log('我的名片', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.cards = restun
					}
			
				}
			
			})
		},

		onShareAppMessage(res) {
			let _seft = this
			con.sendRequest({
				url: '/home/index/share',
				method: 'GET',
				data: {
					id: _seft.cards.id,
					type: 6 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师 
				},
				success: function(res) {
					var datas = res.data
					console.log('分享成功', datas)
					if (datas.code == 1) {
						uni.showToast({
							title: '分享成功',
							icon: "none",
						})
					}

				}
			})
			return {
				title: _seft.cards.describe, //标题
				//desc: _seft.cards.describe,
				//content: _seft.cards.describe,
				path: 'pages/consultants/details?id=' + _seft.cards.id, ///链接
				//imageUrl: _seft.cards.avatar, //图片	
			}

		},
		methods: {
			editTop() {
				this.editstaue = !this.editstaue

			},
			editstaueTop(e) {
				let _seft = this

				console.log('编辑签名', e)
				//return
				uni.showLoading({
					title: "请求中",
					mask:true
				})
				con.sendRequest({
					url: '/home/index/saveSignature',
					method: 'POST',
					data: {
						describe: e.detail.value
					},
					success: function(res) {
						uni.hideLoading()
						console.log('我的名片', res)
						_seft.cards.describe = e.detail.value
						_seft.editstaue = !_seft.editstaue

					}

				})

			},
			shoopTap() {
				console.log(this.auth)
				
				uni.showModal({
					title: '修改资料',
					content: '修改内容后需要平台审核，审核期间没有经纪人或置业顾问权限。请谨慎修改！',
					success: res => {
						if(res.confirm){
							uni.navigateTo({
								url: "../nducted/index?type="+this.auth+"&id="+this.cards.id
							})
						}
					},
					
				});
				
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
		background-color: #389AFD;
	}

	.uni-card {
		width: 88%;
		background-color: #FFFFFF;
		margin-top: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;


	}


	.uni-card .headerimg {
		margin-top: -90rpx;
		text-align: center;

	}

	.uni-card .headerimg>image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}

	.username {
		font-size: 40rpx;
		color: #1A1A1A;
		line-height: 70rpx;
		text-align: center;
	}

	.uni-card>view {
		margin: 0rpx 30rpx 30rpx 30rpx;
		font-family: FZLanTingHei-L-GBK;

	}

	.uni-card .user-message {
		font-size: 29rpx;
		color: #383838;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;

	}

	.uni-card .company {
		font-size: 29rpx;
		color: #383838;

	}

	.uni-card .qianming {
		height: 70rpx;
		line-height: 70rpx;
		font-size: 29rpx;
		color: #383838;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;

	}

	.uni-card .qianming .qianming-title {
		width: 25%;

	}

	.uni-card .qianming .qianming-content {

		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}

	.uni-card .qianming .editdesribe {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
	}

	.uni-card .qianming .editdesribe>input {
		background-color: #389BFE;

		color: #FFFFFF;
	}

	.uni-card .qianming .label {
		color: #389BFE;
		width: 20%;
		margin-left: 15rpx;
	}

	.prive {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30rpx;
		padding-bottom: 90rpx;
	}

	.prive .border-right {
		border-right: 2rpx solid #95CAFF;
	}

	.prive .prive-item {
		font-size: 29rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #606060;
		align-items: center;

		width: 30%;
	}

	.prive .prive-item .num {
		color: #FFB608;
		font-size: 32rpx;
		line-height: 90rpx;
	}

	.card-bottom {
		background-color: #389BFE;
		font-size: 34rpx;
		width: 35%;
		text-align: center;
		color: #FFFFFF;
		border-radius: 50rpx;
		margin-top: -45rpx;
		border: 1rpx solid #FFFFFF;
		line-height: 90rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

	}

	.card-bottom .sharebtn {
		position: initial;
		padding: 0rpx;
		margin: 0rpx;
		line-height: 90rpx;
		color: #FFFFFF;
		background-color: #389BFE;
		font-size: 34rpx;
		border-radius: initial;

	}

	.card-bottom button::after {
		border: none;
		position: initial;

	}

	.card-bottom>view {
		width: 75%;
		margin-left: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
