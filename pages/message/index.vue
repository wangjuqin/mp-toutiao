<template>
	<view class="content">
		<view class="message-list">
			<!-- 	<view class="message-item" v-if="noread_count">
				<view class="message-item-user">
					<view class="users-img">
						<image src="../../static/pic22.png" mode=""></image>
					</view>
					<view class="user-name">
						<view class="name">
							系统消息
						</view>
						<view class="message-content">
							你有一条新的消息
						</view>
					</view>
				</view>
			<view class="mesage-data">
				<view class="noread" v-if="noread_count < 100">
					{{noread_count}}
				</view>
				<view class="noread" v-if="noread_count >=100">
					99+
				</view>
			
			</view>
				

			</view> -->


			<view class="message-item" v-for="(a,index) in lists" :key="index" @click="messageTop(a.id)">
				<view class="message-item-user">
					<view class="users-img">
						<image :src="a.avatar" mode=""></image>

					</view>
					<view class="user-name">
						<view class="name">
							{{a.user_nickname}}
						</view>
						<view class="message-content" v-if="a.message">
							{{a.message}}
						</view>
					</view>
				</view>
				<view class="mesage-data">
					<view class="noread" v-if="a.count < 100 && a.count > 0">
						{{a.count}}
					</view>
					<view class="noread" v-else-if="a.count >= 100">
						99+
					</view>
					<view class="">
						{{utils.timeTodate('m-d H:i',a.create_time*1000)}}
					</view>

				</view>


			</view>

		</view>



	</view>
</template>

<script>
	import utils from '@/common/utils.filter.js'
	import con from '@/common/config.js'
	export default {
		data() {
			return {
				title: '聊天',
				utils: utils,
				code: '',
				port: '',
				name: '',
				avatar: '',
				noread_count: '',
				lists: [],
				user_id: '',
				totals: 0,
				is_open_socket: false

			}
		},
		onLoad() {


		},
		onShow() {
			let _seft = this
			_seft.mRequest.sendRequest({
				url: '/index/index/messagenoread',
				method: 'get',
				success: function(res) {
					var datas = res.data
					console.log('未读消息', datas, _seft.noread_count)
					if (datas.code == 1) {
						var restun = datas.data
						/* 	if(restun){
								_seft.totals = _seft.totals + restun
								
							} */

						_seft.noread_count = restun
					} else {
						uni.showToast({
							title: datas.msg,
							icon: "none",
						})
					}
				}
			})
			_seft.mRequest.sendRequest({
				url: '/index/index/lists',
				method: 'get',
				success: function(res) {
					var datas = res.data
					console.log('消息', datas)
					if (datas.code == 1) {
						var restun = datas.data.lists
						_seft.lists = restun
						_seft.user_id = datas.data.user_id
						let res = restun.filter(item => item.count)
						console.log('=============res', res)
						let total = 0
						if (res.length > 0) {
							for (var i = 0; i < res.length; i++) {
								total = total + res[i]['count']
							}
						}

						_seft.totals = total
						console.log('=============res', _seft.totals)
						_seft.setTabBartotal()
						_seft.connectSocketInit()
					} else {
						uni.showToast({
							title: datas.msg,
							icon: "none",
						})
					}
				}
			})

		},
		methods: {
			setTabBartotal() {
				let _seft = this
				if (_seft.totals) {
					uni.setTabBarBadge({
						index: 2,
						text: '' + _seft.totals + ''
					})
				} else {
					uni.removeTabBarBadge({
						index: 2,
					})
				}
			},

			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			connectSocketInit() {
				let _seft = this
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "wss://" + _seft.messageUrl + '/', 
					success(data) {
						console.log("websocket连接成功");
					},
				});


				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					var msg = {}
					msg.data = {}
					msg.cmd = 'message_list_connection'
					msg.data.user_id = _seft.user_id
					/* msg.data.uid = _seft.message_id; */
					//console.log(JSON.stringify(msg),'_seft.message_id',_seft.message_id);

					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					this.socketTask.send({
						data: JSON.stringify(msg),
						async success(res) {
							console.log("消息发送成功", res)
						},
						async fail(res) {
							console.log("消息发送失败", res);

						}
					});
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {

						var ref = JSON.parse(res.data)
						console.log("收到服务器内容：", ref)
						if (ref.cmd == 'chatMessage' && ref.code == 200 && ref.data) {
							var datas = ref.data
							_seft.totals++
							var res = _seft.lists
							for (var i = 0; i < res.length; i++) {
								if (datas.message_group_id == res[i].id) {
									res[i]['count'] = res[i]['count'] + 1
									res[i]['message'] = datas.message
								}

							}
							console.log('=======res', res)
							_seft.$nextTick(function() {
								_seft.lists = res
							})

							_seft.setTabBartotal()
							console.log('_seft.messagelist', _seft.lists)
						}


					});
				})

				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose((res) => {
					console.log('onClose', res)
					this.is_open_socket = false;
					console.log("已经被关闭了")
				})

				this.socketTask.onError((res) => {
					console.log('WebSocket连接打开失败，请检查！', res);
				})
			},


			messageTop(index) {
				uni.navigateTo({
					url: "./details?messageid=" + index
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
		width: 100%;
	}

	.message-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 95%;
	}

	.message-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 30rpx 0rpx;
		border-bottom: 1rpx solid #E6E6E6;
		padding-bottom: 15rpx;
	}

	.message-item .message-item-user {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 80%;
		/* 	align-items: center; */
	}

	.message-item .users-img {
		/* width: 17%; */
	}

	.message-item .users-img>image {
		width: 100rpx;
		height: 100rpx;

		/* border-radius: 50%; */
	}

	.message-item .message-item-user .user-name {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		width: 70%;

	}

	.message-item .message-item-user .user-name .name {
		font-size: 32rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		width: 100%;

	}

	.message-item .message-item-user .user-name .message-content {
		font-size: 26rpx;
		color: #5E5E5E;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		width: 100%;
		margin-top: 15rpx;

	}

	.message-item .mesage-data {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		font-size: 24rpx;
		color: #5E5E5E;
		width: 20%;

	}

	.noread-item {

		align-items: center;

	}

	.noread {
		color: #FFFFFF !important;
		background-color: #FF0000;
		border-radius: 50%;
		height: 45rpx;
		width: 45rpx;
		line-height: 45rpx;
		margin-left: 10rpx;
		text-align: center;
		font-size: 24rpx;
		margin: 0 0 15rpx 60%;
		/*
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap; */
		/* 
		position: relative;
		float: right; */


	}
</style>
