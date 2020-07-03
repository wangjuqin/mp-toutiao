<template>
	<view class="content">
		<!-- v-bind:style="{min-height:style.contentViewHeight + 'px'}" -->
		<view class="mesage-list" v-bind:style="{'min-height':style.contentViewHeight + 'px'}">


			<block v-for="(a,index) in messagelist" :key="index">
				<view v-if="a.id == userid" class="m-item  message-items">
					<view class="message-contents">
						{{a.message}}
					</view>
					<view class="users-img">
						<image :src="a.avatar" mode=""></image>
					</view>
				</view>
				<view v-else class="m-item message-item">
					<view class="users-img">
						<image :src="a.avatar" mode=""></image>
					</view>
					<view class="message-content">
						{{a.message}}
					</view>
				</view>
			</block>
			<!-- <view  class="m-item message-item">
				<view class="users-img">
					<image  src="../../static/male.png" mode=""></image>
				</view>
				<view class="message-content">
					第三方广播电视
				</view>
			</view> -->

		</view>

		<view class="message-action">
			<view class="">
				<input type="text" :value="sendmessages" @input="sendmessage" />
			</view>
			
			<view class="sumbit-btn" @click="sumbitTop">
				发送
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
				code: '',
				port: '',
				name: '',
				avatar: '',
				windowHeight: '',
				message_id: '',
				shoopid: '',
				messagelist: [],
				sendmessages: '',
				user_id: '',
				userid: '',
				scrollTop: '',
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				is_open_socket: false

			}
		},
		onLoad(e) {
			let _seft = this
			if (e.messageid) _seft.message_id = e.messageid
			if (e.id) _seft.shoopid = e.id
			const res = uni.getSystemInfoSync() //获取手机可使用窗口高度     api为获取系统信息同步接口
			_seft.style.pageHeight = res.windowHeight
			_seft.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) - 70 //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 


			_seft.mRequest.sendRequest({
				url: '/index/index/message',
				method: 'get',
				data: {
					id: _seft.message_id,
					shop_id: _seft.shoopid,
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.message_id = restun.message_id
						_seft.messagelist = restun.message_list.reverse()
						console.log('消息', _seft.messagelist)
						_seft.user_id = restun.user_id
						_seft.userid = restun.userId
						_seft.shoopid = restun.info.id
						_seft.connectSocketInit()
						_seft.$nextTick(function() {
							_seft.scrollToBottom() //创建后调用回到底部方法		
						})
					} else {
						uni.showToast({
							title: '咨询失败',
							icon: 'none',
							mask: true,
						})
						uni.navigateBack({
							animationDuration: 10000
						})
						return false
					}
				}
			})

		},

		methods: {

			/**
			 * @author gongliying
			 * @date 2019-07-26
			 * @information 跳转页面底部
			 */
			scrollToBottom: function() {
				let that = this;
				let query = uni.createSelectorQuery()
				query.selectAll('.m-item').boundingClientRect()
				query.select('.mesage-list').boundingClientRect()
				query.exec((res) => {
					console.log('res', res)
					that.style.mitemHeight = 0;
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40) //获取所有内部子元素的高度
					// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
					setTimeout(() => {
						if (that.style.mitemHeight > (that.style.contentViewHeight - 90)) { //判断子元素高度是否大于显示高度
							that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight //用子元素的高度减去显示的高度就获益获得序言滚动的高度
						}
						console.log('scrollTop', that.scrollTop + 90)
						uni.pageScrollTo({
							scrollTop: that.scrollTop + 90,
							duration: 0
						});
					}, 100)
				})
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
					msg.cmd = 'message_connection'
					msg.data.user_id = _seft.user_id
					msg.data.uid = _seft.message_id;
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
						console.log("收到服务器内容：", res.data)
						var ref = JSON.parse(res.data)
						console.log("ref.cmd：", ref.cmd)
						if (ref.cmd == 'message' && ref.code == 200) {
							var ss = {}
							ss['avatar'] = ref.data.avatar
							ss['id'] = ref.data.id
							ss['form_id'] = ref.data.id
							ss['to_id'] = _seft.shoopid
							ss['message'] = _seft.sendmessages
							ss['user_nickname'] = ref.data.user_nickname
							_seft.messagelist.push(ss)
							_seft.sendmessages = ''
							console.log('_seft.messagelist', _seft.messagelist)
						}
						if (ref.cmd == 'chatMessage' && ref.code == 200) {
							var ss = {}
							ss['avatar'] = ref.data.avatar
							ss['form_id'] = ref.data.id
							ss['to_id'] = _seft.user_id
							ss['message'] = ref.data.message
							ss['user_nickname'] = ref.data.user_nickname
							_seft.messagelist.push(ss)
							_seft.sendmessages = ''
							console.log('_seft.messagelist', _seft.messagelist)
						}


					});
				})

				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					this.is_open_socket = false;
					console.log("已经被关闭了")
				})

				this.socketTask.onError((res) => {
					console.log('WebSocket连接打开失败，请检查！', res);
				})
			},

			sendmessage(res) {
				let _seft = this
				console.log('消息内容', res)
				_seft.sendmessages = res.detail.value

			},
			sumbitTop() {
				let _seft = this
				console.log("发送消息", _seft.sendmessages);

				if (!_seft.sendmessages) {
					uni.showToast({
						title: '消息不能为空',
						icon: "none",

					})
					return
				}
				if (!_seft.is_open_socket) _seft.connectSocketInit()
				var msg = {}
				msg.data = {}
				msg.cmd = 'send_message'
				msg.data.message = _seft.sendmessages
				msg.data.user_id = _seft.user_id
				msg.data.id = _seft.message_id;
				console.log(msg)

				// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
				_seft.socketTask.send({
					data: JSON.stringify(msg),
					async success(res) {
						setTimeout(() => {
							_seft.scrollToBottom() //创建后调用回到底部方法	
						})
						console.log("消息发送成功", res);
					},
					fail(res) {
						console.log("消息发送失败", res);
					},
				});

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
		/* /background-color: #E6E6E6; */
	}

	.mesage-list {
		margin: 0rpx 20rpx;
		width: 95%;
		padding-bottom: 150rpx;
	}

	.message-item {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin: 20rpx 0rpx;
		align-items: center;

		/* border-bottom: 1rpx solid #E6E6E6; */
		padding-bottom: 15rpx;
	}

	.message-item .users-img>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;

	}

	.message-item .message-content {
		margin-left: 30rpx;
		font-size: 29rpx;
		max-width: 55%;
		background-color: #E6E6E6;
		padding: 15rpx 25rpx;
		border-radius: 20rpx;
	}

	.message-items {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
		margin: 20rpx 0rpx;
		align-items: center;

		/* border-bottom: 1rpx solid #E6E6E6; */
		padding-bottom: 15rpx;
	}

	.message-items .users-img>image {
		width: 100rpx;
		height: 100rpx;
		margin-left: 30rpx;
		border-radius: 50%;

	}

	.message-items .message-contents {

		font-size: 29rpx;
		max-width: 55%;
		color: #FFFFFF;
		background-color: #389BFE;
		padding: 15rpx 25rpx;
		border-radius: 20rpx;
	}

	.message-action {
		position: fixed;
		bottom: 0rpx;
		height: 90rpx;
		padding: 20rpx 0rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: #EEEEEE;
	}
	.message-action>view:nth-of-type(1){
		width: 75%;
		height: 100%;
		background-color: #FFFFFF;
		border: 1rpx solid rgba(188, 194, 230, 0.2);
		border-radius: 15rpx;
	}
	.message-action  input {
		width: 95%;
		height: 95%;
		margin-left: 5%;
	}


	.message-action .sumbit-btn {
		width: 15%;
		text-align: center;
		line-height: 100rpx;
		/* background-color: #FFF0F0; */
	}
</style>
