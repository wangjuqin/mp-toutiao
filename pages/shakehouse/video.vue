<template>
	<view class="page" :style="{ height: height }">
		<swiper class="swiper" :vertical="true" circular="true" duration="100" @change="changeCurrent" @animationfinish="animationFinish"
		 :current="index">
			<swiper-item v-for="(item, idx) in videoList" :key="idx" class="swiper-item">

				<view v-if="Math.abs(index-idx)<=1" class="video-box">
					<block v-if="item.src">
						<!-- :gDuration="item.duration"  :danmuList="danmuList"  :initialTime="item.initialTime"  @click="clickVideo"-->
						<chunlei-video class="video" :src="utils.siteBaseUrl(item.src)" :height="height" :width="width" :play="item.flag"
						 v-if="Math.abs(index-idx)<=1" @pause="pauseVideo" :objectFit="item.objectFit" @playEnd="playEnd" controls="true"
						 backDistance="0">
						</chunlei-video>
						<view class="cover-view-top">
							<view class="controls-title">
								<image class="controls-play img" @click="userTop(item.user_id)" :src="item.avater"></image>
								<view class="controls-user" @click="userTop(item.user_id)">
									<view class="uname">
										{{item.at}}
									</view>
								</view>
								<!-- v-if="item.properties_id" -->
							</view>
							<view class="controls-house" @click="housedateil(item.properties_id)">
								<view class="house-title">
									推荐楼盘：
								</view>

								<view class="house-name">{{item.properties_title}}</view>
								<view class="arrowright">
									<uni-icons type="arrowright" color="#FFFFFF"></uni-icons>
								</view>
							</view>
						</view>
						<view class="cover-view-left">

							<view class="house-laber">
								<view class="house-title">
									{{item.content}}
								</view>
								<view class="house-data">
									{{utils.timeTodate('Y-m-d',item.create_time*1000)}}
								</view>
								<view class="house-title ask-input" @click="commtop(item.id,idx)">
									写评论
								</view>
							</view>
						</view>
						<view class="cover-view-right">

							<image class="img" v-if="item.is_fabulous == 0" @click="praisetop(idx,item.id)" src="../../static/big_praise.png"></image>
							<image class="img" v-else @click="nopraisetop(idx,item.id)" src="../../static/big_praises.png"></image>
							<text class="right-text">{{item.count}}</text>
							<image class="img" v-if="item.is_favorite == 0" @click="colletcTop(idx,item.id)" src="../../static/collect_empty.png"></image>
							<image class="img" v-else @click="nocolletcTop(idx,item.id)" src="../../static/collected.png"></image>
							<text class="right-text">{{item.favorite_count}}</text>
							<image src="../../static/big_MSG.png" class="img" @click.stop="commentTop(item.id)"></image>
							<text class="right-text">{{item.evaluate_count}}</text>
							<button class="labar-item" hover-class="none" open-type="share">
								<image src="../../static/share.png" class="img"></image>
							</button>
						</view>

					</block>
					<!-- 	<image src="../../static/logo.png" ></image> -->
					<view class="" :style="{ height: height }" v-else class="video-box">

					</view>
				</view>

			</swiper-item>
		</swiper>
		<uni-popup ref="popups" type="bottom" style="width: 100%;">
			<view class="pinglun">
				<view class="pinglun-top">
					<view class="totalnum">
						{{commentlist.length}} 条评论

					</view>
					<!--  -->
					<view class="cols" @click="commentClose" >
						<image src="../../static/close.png" mode=""></image>
					</view>
				</view>

				<scroll-view scroll-y="true" class="advise" @scrolltolower='refresheComm()'>

					<view class="item" v-for="(a,index) in commentlist" :key="index">
						<view class="left">
							<image class="img" :src="a.avatar"></image>
						</view>

						<view class="right">
							<view class="right-top">
								<view class="users">
									<view class="uname">{{a.user_nickname}}</view>
									<!-- <view class="address"></view> -->
								</view>
								<view class="dzshu">
									{{a.fabulous_number}}
									<image v-if="a.is_fabulous == 0 ||a.is_fabulous == null" src="../../static/praise_empty.png" @click="compraisetop(index,a.id)"></image>
									<image v-else src="../../static/praise.png" @click="comnopraisetop(index,a.id)"></image>

								</view>

							</view>

							<view class="leav" >
								<!-- @click="commtop(a.id,index)"-->
								<rich-text :nodes="a.content"></rich-text>
							</view>
							<view class="bottom">

							<!-- 	<view class="data" @click="zhankaiTap(index,a.id)">
									展开 31 条回复 <image class="img" :src="[zkimg?'../../static/sq.png':'../../static/sq.png']"></image>
								</view> -->
								<!-- 	<view class="chlist" @click="zhankaiTap">
									
									<text>萨纳</text> 回复<text>就看看</text>会计核算可更换卡萨丁金凤凰
								</view>
								<view class="chlist" @click="zhankaiTap">
									<text>萨纳</text> 回复<text>就看看</text>  会计核算可更换卡萨丁金凤凰
								</view>
								<view class="chlist" @click="zhankaiTap">
									<text>萨纳</text> 回复<text>就看看</text> 会计核算可更换卡萨丁金凤凰
								</view> -->

							</view>
							<block v-if="a.node">
								<my-menutree :commentlist='a.node' style="width: 100%;" @send="menutree" @netcommentTop='netcommentTop' :pindex="index"></my-menutree>
							</block>

						</view>
					</view>

				</scroll-view>

			</view>
		</uni-popup>
		<uni-popup ref="popup" type="bottom" style="width: 100%;">
			<view class="input-comm">
				<editor id="editor" class="ttarea" :value="content" @ready="onEditorReady" @input="contenttop"></editor>
				<!-- 	 <editor class="ttarea"   @input="ttareatop" :value="ttarea"></editor> -->
				<!-- <textarea class="ttarea"  cursor-spacing="50" fixed="true" /> -->

				<view class="sub-bt" @click="addCommenttop">
					发布
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import chunleiVideo from '@/components/chunlei-video/chunlei-video'
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {
		components: {
			chunleiVideo
		},
		data() {
			return {
				utils: utils,
				sysheight: 0,
				playCount: 1, //剩余多少视频加载视频列表
				videoList: [],
				commentlist: [],
				height: '667px',
				index: 0,
				width: '',
				oldIndex: 0,
				vidid: 30,
				vidtype: 1,
				content: '', //评论内容
				commid: '', //评论id
				pages: 1,
				videopages: 0,
				limits: 3,
				/* danmuList:[
					{text: '发条弹幕0',color: '#fff',time: 2,avatar:'../../static/avatar.png'},
					{text: '发条弹幕1',color: '#fff',time: 3,avatar:'../../static/avatar.png'},
					{text: '发条弹幕2',color: '#fff',time: 4,avatar:'../../static/avatar.png'},
					{text: '发条弹幕3',color: '#fff',time: 5,avatar:'../../static/avatar.png'},
				], */
			}
		},

		onShareAppMessage(res) {
			let _seft = this
			con.sendRequest({
				url: '/home/index/share',
				method: 'GET',
				data: {
					id: _seft.videoList[_seft.index].id,
					type: 7 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师   7抖房  8实拍
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
				title: _seft.videoList[_seft.index].content, //标题
				path: 'pages/shakehouse/video?id=' + _seft.videoList[_seft.index].id, ///链接
				//imageUrl: _seft.videoList[_seft.current].avatar,  //图片

			}
		},
		onLoad(e) {
			let _seft = this
			if (e.id) _seft.vidid = e.id
			if (e.type) _seft.vidtype = e.type


		},
		created() {
			//#ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			//隐藏subnvue
			uni.getSubNVueById('comment').hide()
			uni.getSubNVueById('input-box').hide()
			//#endif
			this.sysheight = uni.getSystemInfoSync().windowHeight
			this.height = `${this.sysheight}px`
			let width = uni.getSystemInfoSync().windowWidth
			this.width = `${width}px`
			this.videoList.length = 5
			this.videoList.fill({
				src: ''
			})
			//	console.log('height',this.height)


		},
		async mounted() {
			//设置id 通过id轮到相应位置
			/* http://img.kaiyanapp.com/255365dbfc2622930eb0cdb33e43abf0.jpeg?imageMogr2/quality/60/format/jpg */
			let _seft = this
			let id = _seft.vidid
			console.log('mounted')

			await this.VideoDetail()
			this.index = this.videoList.reduce((total, item) => {
				if (id == '' || id == item.id) {
					id = ''
				} else {
					total++
				}
				return total
			}, 0)
			console.log('mounted .index', this.index, this.videoList.length)
			if (!this.index) {
				console.log('mounted this.index', this.index)
				this.$nextTick(() => {
					this.videoPlay(this.index)
				})
			}



		},
		onHide() {
			for (let item of this.videoList) {
				item.flag = false
			}
		},
		methods: {


			nextComment(index, id) {
				let promise = new Promise((resolve, reject) => {
					let _seft = this
					//评论
					con.sendRequest({
						url: '/home/shooting/commentList',
						method: 'get',
						data: {
							id: _seft.commid,
							type: 3,
							limit: _seft.limits,
							p: _seft.pages,
							parent_id: id,
						},
						success: function(res) {
							var datas = res.data
							if (datas.code == 1) {
								var restun = datas.data
								let com = []
								for (let item of restun) {
									com.push({
										user_nickname: item.user_nickname,
										comment_user_nickname: item.comment_user_nickname,
										avatar: item.avatar,
										content: item.content,
										count: item.count,
										create_time: item.create_time,
										id: item.id,
										is_fabulous: item.is_fabulous,
										mobile: item.mobile,
										user_id: item.user_id,
										node: [],
									})

								}
								console.log(datas, com)
								/* 	_seft.$set(_seft.commentlist['node'],_seft.index,com) */
								_seft.commentlist[index]['node'] = com

								console.log('_seft.commentlist', _seft.commentlist)
								/* _seft.parent_id = ''
								_seft.index = '' */
							}
						}
					})
				})
				return promise
			},
			zhankaiTap(index, id) {
				let _seft = this
				_seft.nextComment(index, id)
			},

			/* 业务逻辑js */

			/* 下拉刷新评论 */
			refresheComm(index) {
				let _seft = this
				console.log('refresheComm', _seft.commid)
				this.pages++
				this.commentListTop(_seft.commid)
			},

			/* 点赞 */
			praisetop(index, id) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 2
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_fabulous = 1
									_seft.videoList[index].count++

								}
							})

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
							})
						}
					}

				})
			},
			nopraisetop(index, id) {
				let _seft = this
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 2
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						//console.log('楼盘动态', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_fabulous = 0
									_seft.videoList[index].count--

								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
							})
						}
					}

				})
			},
			/* 收藏 */
			colletcTop(index, id) {
				let _seft = this
				//收藏类型 1. 文章 2.楼盘 3.视频 4. 经纪人/置业顾问 5. 订阅问题
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: id,
						type: 3
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_favorite = 1
									_seft.videoList[index].favorite_count = _seft.videoList[index].favorite_count + 1

								}
							})

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
							})
						}
					}

				})
			},
			nocolletcTop(index, id) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				let _seft = this
				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: id,
						type: 3
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log('收藏视频', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_favorite = 0
									_seft.videoList[index].favorite_count = _seft.videoList[index].favorite_count - 1

								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
							})
						}
					}

				})
			},
			/* 点赞评论 */
			compraisetop(index, id) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				console.log(index)
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.commentlist[index].is_fabulous = 1
									_seft.commentlist[index].fabulous_number++
								}
							})

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
							})
						}
					}

				})
			},
			comnopraisetop(index, id) {
				let _seft = this
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.commentlist[index].is_fabulous = 0
									_seft.commentlist[index].fabulous_number--
								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								mask: true,
								duration: 2000,
							})
						}
					}

				})
			},

			commentClose() {
				this.$refs.popups.close()
			},
			/* 	ttareatop(e){
					//console.log('============e',e)
					// this.ttarea = e.detail.value
					 
				}, */

			contenttop(e) {
				let _seft = this
				let str = e.detail.html
				_seft.content = str
				console.log('===========eeeeeeee', e)

			},

			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},

			commentTop(index) {
				this.$refs.popups.open()
				this.pages = 1
				this.commid = index
				this.commentlist = []
				this.commentListTop(index)
			},
			commentListTop(index) {
				let _seft = this
				//评论
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						id: index,
						type: 3,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
								var com = []
							var restun = datas.data
							for (let item of restun) {
							com.push({
								user_nickname: item.user_nickname,
								/* comment_user_nickname: item.comment_user_nickname, */
								avatar: item.avatar,
								content: item.content,
								count: item.count,
								create_time: item.create_time,
								fabulous_number: item.fabulous_number,
								id: item.id,
								is_fabulous: item.is_fabulous,
								mobile: item.mobile,
								user_id: item.user_id,
								node: [],
							})

							}
							_seft.commentlist = _seft.commentlist.concat(com)
							console.log('评论ss', restun)
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								mask: true
							})
						}
					}

				})
			},
			//发布评论
			addCommenttop() {
				let _seft = this
				uni.showLoading({
					title: '评论中',
					mask:true
				})
				con.sendRequest({
					url: '/home/shooting/addComment',
					method: 'post',
					data: {
						id: _seft.commid,
						content: _seft.content,
						type: 3,
						parent_id: 0
					},
					success: function(res) {
						uni.hideLoading()
						_seft.content = ''
						var datas = res.data
						_seft.$refs.popup.close()
						if (datas.code == 1) {
							_seft.videoList[_seft.index].evaluate_count++
							uni.showToast({
								title: datas.msg,
								icon: "none",
								/* success() {
									uni.redirectTo({
										url:'shakehouse?id='+_seft.vidid
									})
								} */
							})

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
							})

						}
					}
				})
			},
			//获取评论内容
			ttareatop(e) {
				this.ttarea = e.detail.value
			},

			commtop(index) {
				this.commid = index
				this.$refs.popup.open()
			},
			housedateil(index) {
				uni.navigateTo({
					url: '../newshouse_details/index?id=' + index
				})
			},
			userTop(userid) {
				uni.navigateTo({
					url: "../consultants/details?id=" + userid
				})
			},
			/* ens */
			/* 视频播放js */
			animationFinish(e) {
				//#ifdef APP-PLUS
				this.changeCurrent(e)
				//#endif
			},
			changeCurrent(e) {
				this.index = e.detail.current;

				this.$nextTick(() => {

					for (let item of this.videoList) {
						item.flag = false
					}

					this.$nextTick(() => {
						this.videoPlay(this.index)
					})
					//this.videoList[this.index].flag = true
					//console.log(this.videoList,'this.videoList[this.index].flag',this.videoList[this.index].flag,'this.index',this.index)

				})

			},
			VideoDetail() {
				let promise = new Promise((resolve, reject) => {
					let _seft = this

					con.sendRequest({
						url: '/home/video/show',
						data: {
							id: _seft.vidid,
						},
						success: (res) => {
							let videoGroup = []

							var item = res.data.data.show

							videoGroup.push({
								src: item.video,
								content: item.title,
								properties_title: item.properties_title,
								properties_id: item.properties_id,
								create_time: item.create_time,
								evaluate_count: item.evaluate_count,
								click: item.click,
								favorite_count: item.favorite_count,
								count: item.count,
								is_fabulous: item.is_fabulous,
								is_favorite: item.is_favorite,
								user_id: item.user_id,
								flag: false,
								check: false,
								like: '7w',
								comment: '1045',
								at: item.user_nickname,
								id: item.id,
								avater: item.avatar,
								initialTime: 0,
								duration: '77'
							})
							let len = this.videoList.filter(item => item.src).length

							for (let i = len; i < len + videoGroup.length; i++) {
								this.$set(this.videoList, i, videoGroup[i - len])

							}

							console.log('len VideoDetail', len, videoGroup, _seft.index, this.videoList)
							resolve()
						}
					})
				})
				return promise
			},

			pushVideoList() {
				let promise = new Promise((resolve, reject) => {
					let _seft = this
					con.sendRequest({
						url: '/home/video/getShake',
						data: {
							type: _seft.vidtype,
							p: _seft.videopages,
							limit: _seft.limits
						},
						success: (res) => {
							let videoGroup = []
							console.log('_seft pushVideoList', res)
							console.log('_seft pushVideoList', res.data.data)
							var restun = res.data.data
							/* if(restun.length <= 0){
									this.videoList.length = this.videoList.filter(item=>item.src).length
								false
							} */
							for (let item of restun) {
								if (_seft.vidid != item.id) {
									videoGroup.push({
										src: item.video,
										content: item.title,
										properties_title: item.properties_title,
										properties_id: item.properties_id,
										create_time: item.create_time,
										evaluate_count: item.evaluate_count,
										click: item.click,
										favorite_count: item.favorite_count,
										count: item.count,
										is_fabulous: item.is_fabulous,
										is_favorite: item.is_favorite,
										user_id: item.shop_id,
										flag: false,
										check: false,
										like: '7w',
										comment: '1045',
										at: item.user_nickname,
										id: item.id,
										avater: item.avatar,
										initialTime: 0,
										duration: '77'
									})
								}
							}
							let len = this.videoList.filter(item => item.src).length

							for (let i = len; i < len + videoGroup.length; i++) {
								this.$set(this.videoList, i, videoGroup[i - len])

							}
							/* for(let i = 0;i<len+videoGroup.length;i++){
								this.$set(this.videoList,i,videoGroup[i-len])
								
							} */



							console.log('len', len, videoGroup, this.videoList)
							resolve()
						}
					})
				})
				return promise
			},


			tapLove() {
				this.videoList[this.index].check = !this.videoList[this.index].check
				this.videoList = [...this.videoList]

			},
			tapAvater() {
				uni.showToast({
					icon: 'none',
					title: `点击索引为${this.index}的头像`
				})
			},
			tapMsg(item) {
				//#ifndef APP-NVUE
				uni.showToast({
					icon: 'none',
					title: `查看索引为${this.index}的评论`
				})
				//#endif
				//#ifdef APP-NVUE
				uni.getSubNVueById('comment').show('none', 0, () => {
					uni.$emit('showComment', item.content)
				});
				//#endif
			},
			tapShare() {
				uni.showToast({
					icon: 'none',
					title: `分享索引为${this.index}的视频`
				})
			},
			videoPlay(index) {
				let promise = new Promise((resolve, reject) => {
					resolve()
				})
				promise.then(res => {
					this.$set(this.videoList[index], 'flag', !this.videoList[index].flag)

				})
			},
			pauseVideo(val) {
				if (typeof this.videoList[this.oldIndex].initialTime != 'undefined') this.videoList[this.oldIndex].initialTime =
					val
			},
			clickVideo() {
				this.videoList[this.index].flag = !this.videoList[this.index].flag
			}
		},
		watch: {

			index(newVal, oldVal) {
				console.log('watchssss', oldVal, newVal)
				let len = this.videoList.filter(item => item.src).length

				//加载视频
				console.log('watchlen', len, 'watchthis.index', this.index, 'watchthis.playCount', this.playCount,
					'watchthis.videoList', this.videoList, this.videoList.length)
				if (len - this.index - 1 <= this.playCount) {
					console.log('watch')

					this.videopages++
					this.pushVideoList()
				}

				this.oldIndex = oldVal
			}
		}
	}
</script>
<style scoped>
	.swiper {
		flex: 1;
		background-color: #000;
		height: 100%;
	}

	.swiper-item {
		flex: 1;
		height: 100%;
	}

	.video {
		flex: 1;
		height: 100%;
	}

	.video-box {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	.cover-view-center {
		position: absolute;
		justify-content: center;
		align-items: center;
		opacity: 0.1;
		z-index: 999;
	}

	.cover-view-top {
		position: fixed;
		left: 20rpx;
		width: 60%;
		top: 30rpx;
		z-index: 9999;
		font-size: 16px;
		color: #FFFFFF;
		/* #ifndef APP-PLUS */
		white-space: pre-wrap;
		text-overflow: ellipsis;
		overflow: hidden;
		/* #endif */
	}

	.controls-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		height: 90rpx;
		/* color: #FFFFFF; */
	}

	.controls-play {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;

	}

	.controls-user {
		display: flex;
		flex-direction: column;
		justify-content: start;
		margin-left: 20rpx;
	}

	.controls-user .uname {
		width: 100%;
		font-size: 29rpx;
	}

	.controls-house {
		border-radius: 50rpx;
		/* background-color: #389BFE; */
		background: rgba(56, 155, 254, 0.15);
		display: flex;
		flex-direction: row;
		justify-content: start;
		height: 75rpx;
		text-align: center;
		font-size: 29rpx;
	}

	.controls-house .house-title {
		color: #FFFFFF;
		font-size: 29rpx;
		line-height: 80rpx;
	}

	.controls-house .house-name {
		color: #FFE71C;
		opacity: 1;
		line-height: 75rpx;
		font-size: 32rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		margin-left: 10rpx;
	}

	.controls-house .arrowright {
		margin-left: 15rpx;
		line-height: 75rpx;
	}




	.cover-view-left {
		position: fixed;
		width: 75%;
		bottom: 120rpx;
		left: 20rpx;
		z-index: 9999;
		font-size: 16px;
		color: #FFFFFF;
		/* white-space: inherit !important; */
		/* #ifndef APP-PLUS */
		white-space: pre-wrap;
		text-overflow: ellipsis;
		overflow: hidden;
		/* #endif */

	}

	.house-laber {
		color: #FFFFFF;
		/* position: fixed; */
		display: flex;
		flex-direction: column;
		justify-content: start;

		/* height: 155rpx; */
		/* 	left: 30rpx;
		bottom: 130rpx; */

	}

	.house-laber .house-title {
		font-size: 31rpx;
		margin-top: 15rpx;

	}

	.house-laber .house-data {
		font-size: 26rpx;
		margin-top: 20rpx;
	}

	.house-laber .ask-input {
		background: rgba(213, 215, 230, 0.3);
		border-radius: 50rpx;
		width: 60%;
		height: 70rpx;
		font-size: 28rpx;
		line-height: 70rpx;
		text-align: center;
	}


	/* 	.left-view{
		margin-bottom: 20upx;
	}
	.left-text{
		font-size: 16px;
		color: #FFFFFF;
	}
	.avater{
		border-radius: 50upx;
		border-color: #fff;
		border-style: solid;
		border-width: 2px;
	} */

	.cover-view-right {
		position: fixed;
		bottom: 160rpx;
		right: 20rpx;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		z-index: 9999;
	}

	.right-text-avater {
		position: absolute;
		font-size: 14px;
		top: 80upx;
		left: 30upx;
		height: 40upx;
		width: 40upx;
		background-color: #DD524D;
		color: #FFFFFF;
		border-radius: 50%;
		text-align: center;
		line-height: 40upx;
		z-index: 999;
	}

	.avater-icon {
		height: 40upx;
		width: 40upx;

		color: #fff;
		background-color: #DD524D;
		border-radius: 50%;
		position: absolute;
		left: 30upx;
		top: -20upx;
	}

	.right-text {
		text-align: center;
		font-size: 14px;
		color: #FFFFFF;
		margin-bottom: 20upx;
		height: 20px;
	}

	.img {
		height: 70upx;
		width: 70upx;
		opacity: 0.9;
	}

	.page {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1;
		width: 100%;
		min-height: 100%;
	}


	/*评论 */
	.pinglun {
		/* olor: #FFFFFF; */
		/* 	position: fixed; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
		/* bottom: 0rpx; */
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
	}

	.pinglun .pinglun-top {
		display: flex;
		flex-direction: row;
		justify-content: space-arround;
		align-items: center;
		text-align: center;
		width: 90%;
		margin-top: 30rpx;

	}

	.pinglun .pinglun-top .totalnum {
		width: 90%;
		font-size: 32rpx;
		font-weight: 550;
	}

	.pinglun .pinglun-top .cols {
		color: #BCC3D3;
		text-align: right;
		width: 10%;
	}

	.pinglun .pinglun-top .cols>image {
		width: 40rpx;
		height: 40rpx;
	}



	.advise {

		display: flex;
		flex-direction: column;
		bottom: 0rpx;
		height: 600rpx;
		background-color: #FFFFFF;
		justify-content: center;
		align-items: center;
		width: 95%;
		padding-bottom: 30rpx;

	}

	.advise .item {
		margin: 40rpx 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;

		width: 95%;

	}

	.item .left {
		width: 20%;
		height: 100%;
	}

	.item .left .img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.item .right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		align-items: center;
		height: 100%;
		width: 80%;

	}

	.item .right .right-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;

	}

	.item .right .right-top .users {

		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}

	.item .right .right-top .users .uname {
		font-size: 29rpx;
		width: 100%;
		color: #2A4D9C;

	}

	.item .right .right-top .users .address {
		margin-top: 10rpx;
		font-size: 28rpx;
		color: #9A9A9A;
		width: 100%;

	}


	.item .right .right-top .dzshu {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #A6ADCD;
		width: 14%;
		font-size: 29rpx;
		text-align: center;
		height: 50rpx;

	}

	.item .right .right-top .dzshu>image {

		width: 45rpx;
		height: 45rpx;


	}



	.item .right .leav {
		font-size: 24rpx;
		width: 100%;
		margin-top: 20rpx;

	}

	.item .right .leav>text {
		color: #9A9A9A;
		text-align: right;
	}


	.item .right .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 100%;

	}

	.item .right .bottom .chlist {
		font-size: 24rpx;
		margin: 10rpx 0rpx;
	}

	.item .right .bottom .chlist>text {
		color: #BFC4D9;
		margin-right: 10rpx;
	}

	.item .right .bottom .data {
		font-size: 24rpx;
		color: #BFC4D9;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}

	.item .right .bottom .data .img {
		width: 30rpx;
		height: 30rpx;
	}

	/* end */

	/* 发布评论 */
	.input-comm {
		border-top: 2rpx solid #EEEEEE;
		width: 100%;
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		bottom: 0rpx;
		z-index: 3;
		font-size: 29rpx;
		height: 200rpx;
	}

	.input-comm .ttarea {
		background-color: #EFF0F5;
		color: #2D2A2B;

		margin-left: 20rpx;
		height: 100%;
		min-height: 100%;
	}

	.input-comm .sub-bt {
		margin-left: 15rpx;
		color: #2D2A2B;
	}

	/* end */

	button {
		background-color: inherit !important;
		padding: inherit !important;
	}
</style>
