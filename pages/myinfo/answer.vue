<template>
	<view class="content">
		<view class="top">
			<view class="scroll-view">
				<view hover-class="none" class="scroll-view-item " @click="showtop(index)" :class="[isshow==index?'active':'' ]"
				 v-for="(a,index) in  nav" :key="index">{{a}} </view>
				<!-- <view   hover-class="none"  class="scroll-view-item active" url="../info_answerlist/index"> 我的回答 </view>
				<view   hover-class="none"  class="scroll-view-item " url="">  </view> -->
			</view>

		</view>

		<block v-if="isshow==0">

			<view class="list" v-if="answer.length > 0">
				<!-- @click="answerstop(a.id)" -->
				<view class="list-item" v-for="(a,index) in answer" :key="index" @click="detatiletap(a.id)">
					<view class="uni-tag" v-if="a.type==1">
						未回答
					</view>
					<view class="uni-tag" v-if="a.type==2">
						已回答
					</view>
					<view class="uni-tag" v-if="a.type==3">
						已解决
					</view>
					<view class="title">
						{{a.describe}}
					</view>
					<view class="label">

						<!-- <view class="address">
							{{a.c_title}}
						</view> -->
						<view class="house" v-for="(at,indexs) in a.c_title" :key="indexs">
							{{at}}
						</view>

					</view>
					<view class="nums">
						<view class="">
							{{utils.friendlyDate(a.create_time*1000)}}
						</view>
						<view class="">
							{{a.click}}人浏览
						</view>
					</view>

				</view>

			</view>
			<view v-else style="width: 100%;">
				<view class="img">
					<image src="../../static/no_answer.png" mode=""></image>
				</view>

				<button type="primary" @click="answertop(0)">我也要提问</button>
				<!-- 	<button type="primary" class="answers-button">查看精选问题</button> -->


				<view class="bottom">
					行业专家将为您答疑解惑
				</view>

			</view>
		</block>

		<block v-if="isshow==1">
			<view class="list" v-if="question.length > 0">
				<view class="list-item" v-for="(a,index) in question" :key="index" @click="detatiletap(a.id)">

					<view class="title">
						{{a.title}}
					</view>
					<view class="label">
						{{a.describe}}
					</view>
					<view class="nums">

						{{utils.friendlyDate(a.create_time*1000)}}

					</view>

				</view>

			</view>
			<view v-else style="width: 100%;">
				<view class="img">
					<image src="../../static/no_answer.png" mode=""></image>
				</view>

				<button type="primary" @click="answertop(1)">我也要回答</button>
				<!-- <button type="primary" class="answers-button">查看精选问题</button> -->


				<view class="bottom">
					行业专家将为您答疑解惑
				</view>
			</view>

		</block>

		<block v-if="isshow==2">
			<view class="list" v-if="subscribe.length > 0">
				<view class="list-item" v-for="(a,index) in subscribe" :key="index" @click="detatiletap(a.id)">

					<view class="title">
						{{a.title}}
					</view>
					<!-- 	<view class="label">
						一个40年产权，一个70的年产权
					</view> -->
					<view class="nums">
						<view class="">
							{{utils.timeTodate("Y-m-d",a.create_time*1000)}}
						</view>
						<view class="">
							{{a.count}}个回答
						</view>
					</view>

				</view>

			</view>

			<view v-else style="width: 100%;">
				<view class="img">
					<image src="../../static/no_answer.png" mode=""></image>
				</view>

				<button type="primary" @click="answertop(1)">马上添加</button>
				<!-- 	<button type="primary" class="answers-button">查看精选问题</button> -->


				<view class="bottom">
					行业专家将为您答疑解惑
				</view>
			</view>

		</block>

	</view>

</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {

		data() {
			return {
				title: 'Hello',
				isshow: 0,
				utils: utils,

				nav: ['我的提问', '我的回答', '订阅问题'],
				answer: '',
				question: '',
				subscribe: ''
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.isshow = e.type ? e.type : 0
			_seft.answersTap()

			_seft.questionTap()

			_seft.subscribeTap()


		},
		methods: {
			showtop(index) {
				let _seft = this
				this.isshow = index
				switch (index) {
					case 0:
						_seft.answersTap()
						break;
					case 1:
						_seft.questionTap()
						break;
					case 2:
						_seft.subscribeTap()
						break;
				}

			},
			subscribeTap() {
				let _seft = this
				//订阅问题
				con.sendRequest({
					url: '/home/answer/getSubscribeList',
					method: 'get',
					success: function(res) {
						console.log('订阅问题', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.subscribe = restun
						}

					}

				})
			},
			questionTap() {
				let _seft = this
				//我的回答
				con.sendRequest({
					url: '/home/Answer/getListQuestionIndex',
					method: 'get',
					success: function(res) {
						console.log('我的回答', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.question = restun
						}

					}

				})

			},

			answersTap() {
				let _seft = this
				//我的提问
				con.sendRequest({
					url: '/home/Answer/getListAnswer',
					method: 'get',
					success: function(res) {
						console.log('我的提问', res)
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('restun.c_title')
							for (let i in restun) {
								restun[i]['c_title'] = restun[i].c_title.split(',')
							}

							_seft.answer = restun
						}

					}

				})
			},
			answertop(index) {
				console.log(index)
				if (index == 0) {
					uni.navigateTo({
						url: '../ask/index'
					})
				}
				if (index == 1) {
					uni.navigateTo({
						url: '../news/index?type=4'
					})
				}

			},
			detatiletap(index) {
				uni.navigateTo({
					url: '../news/answers_details?id=' + index
				})
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
		padding-bottom: 200rpx;
	}

	.top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #EEF6FE;
		width: 100%;
		/* padding-bottom: 20rpx; */
	}

	/* 咨询分类 */


	.active {
		line-height: 90rpx;
		font-size: 32rpx !important;
		color: #000000 !important;
		border-bottom: 7rpx solid #38AEFE;
		/* width: 57%; */
	}

	.scroll-view {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		/* white-space: nowrap;
		width: 95%; */
		width: 95%;
	}


	.scroll-view-item {
		display: inline-block;
		color: #606060;
		line-height: 90rpx;
		text-align: center;
		font-size: 26rpx;
		/* margin-left: 50rpx; */
		width: 20%;
	}

	/* end */


	.list {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;
	}

	.list .list-item {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 100%;
		border-bottom: 1rpx solid #BCC2E6;
		padding-bottom: 50rpx;

	}



	.list .list-item .title {
		margin-top: 20rpx;
		font-size: 34rpx;

	}

	/* 	.list .list-item .label {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		font-size: 27rpx;

	} */

	.list .list-item .label {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		/* width: 35%; */
		font-size: 24rpx;

	}

	.list .list-item .label>view {
		background-color: #D5D7E6;
		padding: 5rpx 30rpx;
		border-radius: 50rpx;
		margin: 5px;
	}



	.list .list-item .nums {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		/* width: 30%; */
		font-size: 24rpx;
		color: #6F6F6F;
	}

	.list .list-item .nums>view {
		margin: 10rpx;
	}

	.list .list-item .uni-tag {
		width: 12%;
		font-size: 23rpx;
		background-color: #FF2C29;
		color: #FFFFFF;
		text-align: center;
		line-height: 34rpx;
	}

	.img {
		width: 95%;
		text-align: center;
		margin: 80rpx 0rpx;
	}

	.img>image {
		width: 340rpx;
		height: 200rpx;
	}

	button {
		margin-top: 50rpx;
		width: 90%;
		/* height: 100rpx; */
		background-color: #389BFE !important;
		color: #FFFFFF !important;
		font-size: 32rpx;
		text-align: center;
		border: 1rpx solid #A9BCFD;
	}

	.answers-button {
		background-color: #FFFFFF !important;
		color: #389BFE !important;

	}

	.bottom {
		margin-top: 40rpx;
		font-size: 28rpx;
		color: #606060;
		text-align: center;
		width: 95%;
	}
</style>
