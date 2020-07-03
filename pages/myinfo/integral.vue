<template>
	<view class="content">
		<view class="sign-in">

			<view class="sign">
				<!-- v-if="issign" -->

				<view class="signin" v-if="issign" @click="signin">
					签到
					<text>+1</text>
				</view>
				<view v-else>

				</view>


				<view class="int">
					可用积分
					<text>{{integral}}</text>

				</view>
				<view class="infos" @click="infos">
					规则说明
				</view>
			</view>
			<view class="steps">
				<view class="tip">
					已连续签到
					<text>+{{sindata}}</text>

				</view>
				<view class="unisteps">
					<uni-steps style="width: 100%;" :options="options" :active="active" active-color='#FFFFFF'></uni-steps>
				</view>

			</view>
			<view class="">

			</view>


		</view>

		<view class="house-navbar">
			<view class="left"> 做任务赚积分</view>
			<!-- <view class="right">更多></view> -->
		</view>

		<view class="task" v-if="taskStatus">
			<view class="task-item">
				<image src="../../static/pic17.png" mode=""></image>
				<view class="task-cen">
					<view class="reward">
						<view class="">
							写文章
						</view>
						<view class="">
							{{takeint[1]}}
						</view>
						<view class="">
							积分
						</view>
					</view>
					<view class="reward-info">
						文章审核通过奖励{{takeint[1]}}积分
					</view>

				</view>

				<view class="task-rt draw" v-if="taskStatus['article'] == 0" @click="statustop(2)">
					领取任务
				</view>
				<view class="task-rt" v-else-if="taskStatus['article'] == 1" @click="navtop(2)">
					立即前往
				</view>
				<view class="task-rt" v-else-if="taskStatus['article'] == 2">
					已完成
				</view>


			</view>
			<view class="task-item">
				<image src="../../static/pic18.png" mode=""></image>
				<view class="task-cen">
					<view class="reward">
						<view class="">
							发布视频
						</view>
						<view class="">
							{{takeint[2]}}
						</view>
						<view class="">
							积分
						</view>
					</view>
					<view class="reward-info">
						发布视频通过奖励{{takeint[2]}}积分
					</view>

				</view>
				<view class="task-rt draw" v-if="taskStatus['video'] == 0" @click="statustop(3)">
					领取任务
				</view>
				<view class="task-rt" v-else-if="taskStatus['video'] == 1" @click="navtop(3)">
					立即前往
				</view>
				<view class="task-rt" v-else-if="taskStatus['video'] == 2">
					已完成
				</view>

			</view>


			<view class="task-item">
				<image src="../../static/pic20.png" mode=""></image>
				<view class="task-cen">
					<view class="reward">
						<view class="">
							问答
						</view>
						<view class="">
							{{takeint[4]}}
						</view>
						<view class="">
							积分
						</view>
					</view>
					<view class="reward-info">
						奖励{{takeint[4]}}积分
					</view>

				</view>
				<view class="task-rt draw" v-if="taskStatus['answer'] == 0" @click="statustop(5)">
					领取任务
				</view>
				<view class="task-rt" v-else-if="taskStatus['answer'] == 1" @click="navtop(5)">
					立即前往
				</view>
				<view class="task-rt" v-else-if="taskStatus['answer'] == 2">
					已完成
				</view>

			</view>

		</view>


	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {

		data() {
			return {
				title: '我的积分',
				utils: utils,
				isshow: 0,
				active: 0,
				sindata: 0,
				issign: false,
				options: [],
				intlog: '',
				integral: '',
				takeint: '',
				taskStatus: '',
				integralConfig: '',


			}
		},
		onLoad() {


		},

		onShow() {
			con.usertype() //用户身份
			let _seft = this
			_seft.sindatatop()
			//今日是否签到
			con.sendRequest({
				url: '/home/integral/is_sign',
				method: 'get',
				success: function(res) {
					console.log('今日是否签到', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.issign = restun == true ? false : true
					}

				}

			})



			//用户积分
			con.sendRequest({
				url: '/home/integral/getNumber',
				method: 'get',
				success: function(res) {
					console.log('用户积分', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.integral = restun

					}

				}

			})
			//任务积分
			con.sendRequest({
				url: '/home/integral/getTask',
				method: 'get',
				success: function(res) {
					console.log('任务积分', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.takeint = restun

					}

				}

			})

			//任务状态
			con.sendRequest({
				url: '/home/integral/taskStatus',
				method: 'get',
				success: function(res) {
					console.log('任务状态', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.taskStatus = restun

					}

				}

			})
			_seft.integralConfigtop()
		},

		methods: {

			integralConfigtop() {
				let _seft = this
				//积分规则
				con.sendRequest({
					url: '/home/integral/integralConfig',
					method: 'get',
					success: function(res) {
						var datas = res.data
						var dd = [];
						var options = []
						if (datas.code == 1) {
							var restun = datas.data
							_seft.integralConfig = restun
							_seft.senddata(restun)
							//console.log('积分规则', restun)
						}

					}

				})
			},

			sindatatop() { //连续签到
				let _seft = this
				con.sendRequest({
					url: '/home/integral/day',
					method: 'get',
					success: function(res) {

						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.sindata = restun ///0-6
							if (_seft.issign == false) {
								_seft.active = restun <= 0?0:restun - 1
							}
							
						}
						console.log('连续签到', _seft.sindata)

					}

				})
			},
			senddata(restun) {

				let _seft = this

				var options = []
				var myDate = new Date();
				var sindata = _seft.sindata <= 0 ? 0 : _seft.sindata //连续签到天数  2(包括今天)   item 1---7   0
				console.log('sindata',sindata)
				if (_seft.issign == false) {
					sindata = sindata <= 0?0:sindata - 1
				}
				//console.log('integralConfig', restun, 'sindata',sindata)
				for (let item in restun) {
					var i = item - 1
					var dd = {};
					//console.log('item', item, sindata, i)
					if (sindata >= i) {
						
						dd['title'] = utils.timeTodate('m.d', myDate.getTime() - 3600 * 1000 * 24 * (sindata - i))

					} else {
						dd['title'] = utils.timeTodate('m.d', myDate.getTime() + 3600 * 1000 * 24 * (i - sindata))
					}

					dd['desc'] = restun[item]
					options.push(dd)
				}
				console.log('options', options)
				_seft.options = options
			},

			signin() {
				let _seft = this
				con.sendRequest({
					url: '/home/integral/addSign',
					method: 'get',
					success: function(res) {
						console.log('签到', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.issign = true
							uni.redirectTo({
								url: 'integral'
							})

						}

					}

				})



			},
			statustop(index) {
				let _seft = this

				con.sendRequest({
					url: '/home/integral/addTask',
					method: 'get',
					data: {
						id: index
					},
					success: function(res) {
						console.log('lingqu', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							switch (index) {
								case 2:
									_seft.taskStatus['article'] = 1
									break;
								case 3:
									_seft.taskStatus['video'] = 1
									break;
								case 4:
									_seft.taskStatus['shoot'] = 1
									break;
								case 5:
									_seft.taskStatus['answer'] = 1
									break;
							}
							uni.showToast({
								title: '领取成功',
								icon: "none",
								duration: 1500
							})
						}

					}

				})
			},
			navtop(index) {
				var url = ''
				switch (index) {
					case 2:
						url = '../opus/article'
						break;
					case 3:
						url = '../opus/video'
						break;
					case 4:
						url = '../opus/article'
						break;
					case 5:
						url = '../news/index?type=4'
						break;
				}
				uni.navigateTo({
					url: url
				})
			},
			infos() {
				uni.navigateTo({
					url: '../contactus/onepage?type=5'
				})
			}





		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding-bottom: 200rpx;
	}

	.sign-in {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #389BFE;
		padding: 50rpx 0rpx;

	}


	.sign-in .sign {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* 	align-items: center; */
		width: 95%;
		color: #FFFFFF;
		font-size: 24rpx;

	}

	.sign-in .sign .signin {
		width: 130rpx;
		height: 130rpx;
		background-color: #FFFFFF;
		border-radius: 50%;
		font-size: 26rpx;
		color: #1296DB;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;


	}

	.sign-in .sign .signin>text {
		font-size: 34rpx;
		margin-top: 10rpx;
	}

	.sign-in .sign .int {
		font-size: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;


	}

	.sign-in .sign .int>text {
		font-size: 46rpx;
		color: #FFF723;
		margin-top: 10rpx;

	}

	.sign-in .sign.infos {
		font-size: 24rpx;
	}

	.sign-in .steps {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		color: #FFFFFF;
		margin-top: 50rpx;
	}

	.sign-in .steps .tip {
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.sign-in .steps .tip>text {
		font-size: 32rpx;
		margin-top: 10rpx;
	}

	.sign-in .steps .unisteps {
		width: 75%;

	}

	.uni-steps__row-title {
		font-size: 24rpx !important;
	}

	.uni-steps__row-container {
		margin-top: 30rpx;
	}

	.house-navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 95%;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		height: 52rpx;
	}

	.house-navbar .left {
		font-size: 40rpx;
		font-family: FZLanTingHei-L-GBK;
		font-weight: 549;
		color: rgba(0, 0, 0, 1);
	}

	.house-navbar .right {
		font-size: 26rpx;
		color: #6F6F6F;
	}

	.house-navbar .center {
		font-size: 29rpx;
		color: #606060;
	}

	.task {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 95%;

	}

	.task .task-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* 	text-align: center; */
		width: 100%;
		margin: 20rpx 0rpx;
	}

	.task .task-item>image {
		width: 100rpx;
		height: 100rpx;
	}

	.task .task-item .task-cen {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 49%;
	}

	.task .task-item .task-cen .reward {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.task .task-item .task-cen .reward>view:nth-of-type(1) {
		font-size: 36rpx;

	}

	.task .task-item .task-cen .reward>view:nth-of-type(2) {
		font-size: 32rpx;
		color: #FFB932;
		font-weight: bold;
		margin-left: 20rpx;

	}

	.task .task-item .task-cen .reward>view:nth-of-type(3) {
		font-size: 26rpx;
		color: #7B7B7B;
		margin-left: 20rpx;

	}

	.task .task-item .task-cen .reward-info {
		color: #7784B3;
		font-size: 26rpx;
		margin-top: 15rpx;
	}

	.task .task-item .task-rt {
		color: #389BFE;
		background-color: #EEF6FE;
		border-radius: 50rpx;
		padding: 10rpx 40rpx;
		font-size: 26rpx;
		border: 1rpx solid #389BFE;
	}

	.draw {
		background-color: #389BFE !important;
		color: #FFFFFF !important;
	}
</style>
