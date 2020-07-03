<template>
	<view class="content">
		<view class="artive" v-if="Articledeta">
			<view class="title" v-if="Articledeta.title">
				{{Articledeta.title}}
			</view>
			<view class="users">
				<view class="users-left" @click="userTop(Articledeta.user_id)">
					<image v-if="Articledeta.avatar" :src="Articledeta.avatar" mode=""></image>
				</view>
				<view class="users-center" @click="userTop(Articledeta.user_id)">
					<view class="uname" v-if="Articledeta.user_name">
						{{Articledeta.user_name}}
					</view>
					<!-- 	<view class="company">
						{{Articledeta.company}}
					</view> -->

				</view>
				<view class="users-right">
					<text v-if="Articledeta.update_time">{{utils.timeTodate('Y-m-d H:i',Articledeta.update_time*1000)}}</text>

				</view>

			</view>
			<view class="recommend-house" v-if="Articledeta.properties_name">
				<view class="label">
					<view class="house-label">
						推荐楼盘:
					</view>
					<view class="house-name" @click="housedate(Articledeta.properties_id)">
						{{Articledeta.properties_name}}
					</view>
					<image class="house-img" src="../../static/jkh-r.png" mode=""></image>
				</view>
			</view>

			<view class="artive-content">
				<jyf-parser :html="Articledeta.content" ref="article"></jyf-parser>
				<!-- <rich-text :nodes="Articledeta.content"></rich-text> -->
			</view>
			<!-- 	<view class="advert">
				<image src="../../static/banner.png" mode=""></image>
			</view> -->
			<view class="preview" v-if="Articledeta.click">
				阅读量：{{Articledeta.click}}
			</view>

			<block v-if="commentlist.length > 0">
				<view class="commentlist">
					<view class="item" v-for="(a,index) in commentlist" :key='index'>
						<view class="left">
							<image :src="a.avatar"></image>
						</view>

						<view class="right">
							<view class="right-top">
								<view class="users">
									<view class="uname">{{a.user_nickname}}</view>

								</view>
								<view class="img">
									<view class="shulaing" v-if="a.fabulous_number">
										{{a.fabulous_number}}
									</view>
									<image v-if="a.is_fabulous == 0 ||a.is_fabulous == null" src="../../static/praise_empty.png" @click="compraisetop(index,a.id)"></image>
									<image v-else src="../../static/praise.png" @click="comnopraisetop(index,a.id)"></image>
								</view>
							</view>
							<!-- @click="commtop(index,a.id)" -->
							<view class="leav">
								<rich-text :nodes="a.content"> {{utils.timeTodate('Y-m-d',a.create_time*1000)}}</rich-text>

							</view>
							<view class="bottom">
								<view class="data">
									{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
								</view>
								<!-- @click="commentTop(index,a.id)" -->
								<!-- 	<view class="answers" v-if="a.count">
									{{a.count}}条回复
								</view> -->
							</view>

							<!-- 	<block v-if="a.node.length>0">
								<my-menutree :commentlist='a.node' style="width: 100%;" @send="menutree" :pid="a.id" :pindex="index"></my-menutree>
							</block>
							<view class="answers" v-if="a.count" @click="commentTop(index,a.id)">
								—— 展开回复
							</view> -->

						</view>
					</view>
					<view class="details" v-if="ismor==1">
						<view class="" @click="morelist">加载更多</view>
					</view>
				</view>


				<!-- <my-commen-list style="width: 100%;" :commentlist="commentlist" comtype='2' :arid="arid" @send="getSonArValue"></my-commen-list> -->

			</block>

			<block v-if="listHouse.length > 0">
				<my-laber-title style="width: 100%;" lefttitle="热门推荐" morelist='../special/index?is_recommend=2'></my-laber-title>
				<!-- 楼盘 -->
				<my-column-list style="width: 100%;" :listHouse='listHouse'> </my-column-list>
			</block>
		</view>

		<!-- 底部 -->
		<!-- v-if="iscomm == 0" -->
		<view class="flex-box">
			<view class="box-content">

				<input type="text" value="" placeholder="写评论" disabled="false" @click="commtop(0)" />
				<image v-if="is_fabulous == 0 ||is_fabulous == null" src="../../static/praise_empty.png" @click="praisetop(arid)"></image>
				<image v-else src="../../static/praise.png" @click="nopraisetop(arid)"></image>

				<image v-if="is_favorite == 0  || is_favorite == null " src="../../static/collect_empty.png" mode="" @click="collecttop(arid)"></image>
				<image v-else src="../../static/collect.png" mode="" @click="nocollecttop(arid)"></image>

				<!-- 	<view class="" @click="shareFc">
					生成海报
					
				</view> -->
				<!-- <image src="../../static/praise_empty.png" mode=""></image> -->
				<!-- 	<image src="../../static/big_collect.png"  mode=""></image> -->
				<!-- <image src="../../static/share2.png" mode=""></image> -->
			</view>


		</view>
		<!-- end -->
		<uni-popup ref="popup" type="bottom">
			<!-- v-if="iscomm == 1" -->
			<view class="input-comm">
				<!-- <textarea class="ttarea" @input="ttareatop" cursor-spacing="50" fixed="true" />  :value="content"-->
				<editor id="editor" class="ttarea" @ready="onEditorReady" @input="contenttop"></editor>

				<view class="sub-bt" @click="subtop">
					发布
				</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="popups">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
				</view>
			</view>

		</uni-popup>

		<view class="hideCanvasView" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>

	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	import _app from '@/common/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '@/common/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				title: 'Hello',
				utils: utils,
				canvasId: 'default_PosterCanvasId',
				poster: {},
				wechat_img: '',
				qrShow: false,
				limits: 5,
				pages: 1,
				cmlimits: 5,
				cmpages: 1,
				ismor: 1,
				arid: '',
				iscomm: 0,
				is_fabulous: 0,
				is_favorite: 0,
				ttarea: '',
				Articledeta: '',
				listHouse: [],
				commentlist: [],
				content: '',
				parent_id: 0,
				comment_id: '',
				comment: [],
				index: '',
			}
		},


		onLoad(e) {
			let _seft = this
			//let arid = 
			_seft.arid = e.id
			//文章详情
			console.log('_seft.arid', _seft.arid)
			con.sendRequest({
				url: '/home/article/show',
				method: 'get',
				data: {
					'id': _seft.arid
				},
				success: function(res) {
					var datas = res.data
					console.log('文章详情', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Articledeta = restun.show
						_seft.is_fabulous = restun.is_fabulous
						_seft.is_favorite = restun.is_favorite
						console.log('文章详情', restun)

					}
				}

			})
			con.sendRequest({
				url: '/home/article/property',
				method: 'get',
				success: function(res) {
					var datas = res.data
					console.log('文章详情', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.wechat_img = restun.wechat_img
					}
				}

			})

			_seft.commentlists()
			//热门推荐
			con.sendRequest({
				url: '/home/properties/getList',
				method: 'get',
				data: {
					is_recommend: 2,
					limit: _seft.limits,
					p: _seft.pages
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						console.log('loupan', restun)
						_seft.Propertieslimit = restun
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
					id: _seft.Articledeta.id,
					type: 2 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师 
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
				title: _seft.Articledeta.title, //标题
				path: 'pages/news/details?id=' + _seft.Articledeta.id, ///链接
				imageUrl: utils.siteBaseUrl(_seft.Articledeta.image), //图片

			}
		},
		methods: {



			/* 下级评论 */
			menutree: function(res) {
				console.log('menutree', res)
				this.editorCtx.clear()
				this.parent_id = res.pid
				this.index = res.pindex
				this.comment_id = res.uid
				this.$refs.popup.open()
			},

			getSonArValue: function(res) {
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: 2,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.commentlist = restun
							console.log('评论ss', _seft.commentlist)

						}
					}

				})
			},

			nextComment(parent_id, pages, limits) {
				let promise = new Promise((resolve, reject) => {
					let _seft = this
					//评论
					con.sendRequest({
						url: '/home/shooting/commentList',
						method: 'get',
						data: {
							'id': _seft.arid,
							type: 2,
							limit: limits,
							p: pages,
							parent_id: parent_id,
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
								_seft.commentlist[_seft.index]['pages']++
								_seft.commentlist[_seft.index]['node'] = _seft.commentlist[_seft.index]['node'].concat(com)
								console.log('_seft.commentlist', _seft.commentlist)
							}
						}
					})
				})
				return promise
			},

			commentTop(index, id) {
				let _seft = this
				_seft.parent_id = id
				_seft.index = index
				let pages = _seft.commentlist[index]['pages']
				let limits = _seft.limits
				_seft.nextComment(id, pages, limits)

			},

			commentlists() {
				let _seft = this
				//评论
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: 2,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data

							for (let item of restun) {

								_seft.commentlist.push({
									user_nickname: item.user_nickname,
									avatar: item.avatar,
									content: item.content,
									count: item.count,
									create_time: item.create_time,
									id: item.id,
									is_fabulous: item.is_fabulous,
									mobile: item.mobile,
									pages: 1,
									node: [],
								})

							}

							/* 	let len = _seft.commentlist.length
								
								for (let i = 0; i < len; i++) {
									this.$set(this.videoList, i, videoGroup[i - len])
								
								} */
							console.log('评论ss', restun)
						}
					}

				})
			},
			housedate(index) {
				uni.navigateTo({
					url: '../newshouse_details/index?id=' + index
				})

			},
			commtop(index, id, uid) {
				let _seft = this
				this.editorCtx.clear()

				_seft.content = ''
				console.log(index, id, uid, _seft.content)
				_seft.index = index
				this.parent_id = id
				this.comment_id = uid
				this.$refs.popup.open()
			},

			subtop() {
				let _seft = this
				_seft.addComment(_seft.index, _seft.content, _seft.parent_id, _seft.comment_id)

			},
			addComment(index, content, parent_id, comment_id) {
				let _seft = this
				uni.showLoading({
					title: '评论中',
					mask:true
				})
				con.sendRequest({
					url: '/home/shooting/addComment',
					method: 'post',
					data: {
						id: _seft.arid,
						content: content,
						type: 2,
						parent_id: parent_id, //父级ID
						comment_id: comment_id, //回复用户ID信息
					},
					success: function(res) {
						uni.hideLoading()
						_seft.$refs.popup.close()
						var datas = res.data
						uni.showToast({
							title: datas.msg,
							icon: "none",
							duration: 1500
						})
						if (datas.code == 1) {
							let restun = datas.data
							if (parent_id) {
								console.log('===========eeeeeeee', _seft.commentlist[index])
								_seft.commentlist[index]['node'].push({
									user_nickname: restun.user_nickname,
									avatar: restun.avatar,
									content: content,
									count: 0,
									create_time: restun.time,
									id: restun.id,
									is_fabulous: 0,
									mobile: '',
									node: [],
								})
							} else {
								_seft.commentlist.push({
									user_nickname: restun.user_nickname,
									avatar: restun.avatar,
									content: content,
									count: 0,
									create_time: restun.time,
									id: restun.id,
									is_fabulous: 0,
									mobile: '',
									node: [],
								})
							}
						}

					}
				})


			},


			contenttop(e) {
				let _seft = this
				let str = e.detail.html
				_seft.content = str
			},

			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			praisetop(index) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: index,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.is_fabulous = 1
								}
							})

						}
					}

				})
			},
			nopraisetop(index) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: index,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						//console.log('楼盘动态', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.is_fabulous = 0
								}
							})
						}
					}

				})
			},
			collecttop(index) {
				console.log('收藏', index)
				let _seft = this
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: index,
						type: 1
					},
					success: function(res) {
						var datas = res.data
						console.log('shou', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.is_favorite = 1
								}
							})

						}
					}

				})
			},
			nocollecttop(index) {
				let _seft = this
				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: index,
						type: 1
					},
					success: function(res) {
						var datas = res.data
						console.log('quxioa', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.is_favorite = 0
								}
							})

						}
					}

				})
			},
			userTop(userid) {
				let _seft = this
				if (this.Articledeta.user_type != 1) {
					uni.navigateTo({
						url: "../consultants/details?id=" + userid
					})
				} else {
					if (_seft.wechat_img) {
						uni.previewImage({
							current: 1,
							urls: [utils.siteBaseUrl(_seft.wechat_img)],
							longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏']
							}
						})
					} else {
						uni.showToast({
							title: '没有图片',
							icon: "none",
							duration: 1500,
						})
					}

				}


			},
			compraisetop(index, id) {

				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				console.log(index)
				uni.showLoading({
					title: "点赞中",
					mask:true
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
					title: "取消点赞中",
					mask:true
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
								duration: 2000,
							})
						}
					}

				})
			},
			morelist() {
				let _seft = this
				_seft.cmpages++
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				//评论
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						'id': _seft.arid,
						type: 2,
						limit: _seft.cmlimits,
						p: _seft.cmpages
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data

						if (datas.code == 1) {
							var restun = datas.data
							console.log(datas)
							if (restun.length < _seft.cmlimits) _seft.ismor = 0
							_seft.commentlist = _seft.commentlist.concat(restun)

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
							})
						}
					}

				})

			},

			async shareFc() {
				let _seft = this



				try {
					console.log('准备生成:' + new Date())
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 1080,
							height: 1920,
							backgroundColor: '#FFF'
						},

						textArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							return [{
								type: 'text',
								text: _seft.Articledeta.title, //
								size: 55,
								color: '#000',
								textAlign: 'left',
								textBaseline: 'top',
								lineFeed: {
									maxWidth: bgObj.width * 0.9,
									lineHeight: 100,
									lineNum: 3,
								},
								dx: bgObj.width * 0.05,
								dy: 100,
							}, ]

						},
						imagesArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							return [{
								type: 'image',
								url: utils.siteBaseUrl(_seft.Articledeta.image), //utils.siteBaseUrl('')
								dx: bgObj.width * 0.05,
								dy: 350,
								dWidth: bgObj.width * 0.9,
								dHeight: 350,
							}, ]

						},

						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'custom',
										setDraw(Context) {
											Context.setFillStyle('#666');
											Context.setGlobalAlpha(0.25);
											Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
											/* Context.fillRect(0, bgObj.height - 400, bgObj.width, 400); */
											Context.setGlobalAlpha(1);
										}
									},
									{
										type: 'text',
										text: '关注派好房 ',
										size: 50,
										color: '#000',
										textAlign: 'right',
										textBaseline: 'middle',
										dx: bgObj.width - 100,
										dy: bgObj.height - 250,
									}, {
										type: 'text',
										text: '买房更省心 ',
										size: 50,
										color: '#000',
										textAlign: 'right',
										textBaseline: 'middle',
										dx: bgObj.width - 100,
										dy: bgObj.height - 150,
									},
									{
										type: 'image',
										url: '../../static/praise.png', //utils.siteBaseUrl('')
										dx: 10,
										dy: bgObj.height - 350,
										dWidth: 300,
										dHeight: 300,
									},
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
					this.$refs.popups.open()
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log('海报生成成功=========', JSON.stringify(e));
				}
			},

			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},




		},
		watch: {
			index(newVal, oldVal) {
				console.log('watchssss', oldVal, newVal)

			},
			/* parent_id(newVal, oldVal) {
				this.nextComment()
				
				console.log('parent_id', oldVal, newVal)

			}, */
			commentlist(newVal, oldVal) {
				console.log('commentlist', oldVal, newVal)
			}

		},


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

	.artive {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;
	}

	.title {
		font-size: 36rpx;
		/* 	font-weight: 550; */
	}


	.artive>view {
		margin-top: 40rpx;
		/* background-color: #007AFF; */
		/* height: 100rpx; */
		width: 100%;
	}

	.users {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.users .users-left>image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;

	}

	.users .users-center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		width: 55%;
	}

	.users .users-center .uname {
		font-size: 26rpx;
		color: #2A4D9C;
		width: 100%;
		line-height: 70rpx;
	}

	.users .users-center .company {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #9A9A9A;
		width: 100%;
	}

	.users .users-right {
		text-align: right;
		font-size: 24rpx;
		color: #9A9A9A;

	}

	.recommend-house {

		width: 100%;
	}

	.recommend-house .label {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 25rpx;
		width: 55%;
		background-color: #D9EAFF;
		line-height: 60rpx;

	}

	.recommend-house .label .house-label {
		font-size: 24rpx;
		color: #5E5E5E;

	}

	.recommend-house .label .house-name {
		font-size: 28rpx;
		color: #0879E9;
		opacity: 1;
	}

	.recommend-house .label .house-img {
		width: 35rpx;
		height: 35rpx;
	}

	.artive-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: start;
		font-size: 30rpx;
	}

	.advert {
		width: 100%;
	}

	.advert>image {
		width: 100%;
		height: 150rpx;
	}

	.preview {
		display: flex;
		justify-content: start;
		font-size: 24rpx;
		color: #9A9A9A;
	}


	/* 底部 */
	.flex-box {
		border-top: 2rpx solid #EEEEEE;
		width: 100%;
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #FFFFFF;
		bottom: 0rpx;
		z-index: 2;

	}

	.flex-box .box-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 90%;
		margin: 15rpx 0rpx;
		font-size: 30rpx;

	}

	.flex-box .box-content>input {
		background-color: #EFF0F5;
		font-size: 30rpx;
		width: 42%;
		height: 60rpx;
		border-radius: 25rpx;
		text-align: center;
	}

	.flex-box .box-content>image {
		width: 60rpx;
		height: 60rpx;
		color: #BFC4D9;

	}

	.flex-box .box-content>view {
		color: #389BFE;
		padding: 0rpx 20rpx;
		background-color: #EEF6FE;
		border: 1rpx solid #A9BCFD;
		border-radius: 15rpx;
		line-height: 50rpx;

	}

	/* end */

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
		z-index: 2;
		font-size: 29rpx;

		height: 200rpx;
	}

	.input-comm .ttarea {
		background-color: #EFF0F5;
		color: #2D2A2B;
		height: 100%;
		min-height: 100%;
		width: 80%;
	}

	.input-comm .sub-bt {
		margin-left: 15rpx;
		color: #2D2A2B;
	}

	/* 评论 */
	.commentlist {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.item {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		margin-item: 30rpx;
		width: 100%;

	}

	.item .left {
		width: 20%;
		height: 100%;
	}

	.item .left image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.item .right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		align-items: center;
		height: 100%;
		width: 90%;

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
		font-size: 26rpx;
		color: #9A9A9A;
		width: 100%;

	}


	.item .right .right-top .img {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	}

	.item .right .right-top .img .shulaing {
		font-size: 24rpx;
		color: #BFC4D9;
	}

	.item .right .right-top .img>image {
		width: 40rpx;
		height: 40rpx;

	}

	.item .right .right-top .gd {
		color: #BFC4D9;
	}

	.item .right .leav {
		font-size: 26rpx;
		width: 100%;
		margin-top: 20rpx;
		word-wrap: break-word;
		word-break: normal;

	}

	.item .right .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		font-size: 24rpx;
		color: #BFC4D9;

	}

	.item .right .bottom .data {
		margin-right: 20rpx;
	}

	.details {
		margin-top: 50rpx;
		font-size: 30rpx;
		color: #389BFE;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		text-align: center;
	}

	.details>view {
		padding: 0rpx 60rpx;
		background-color: #EEF6FE;
		border: 1rpx solid #A9BCFD;
		border-radius: 15rpx;
		line-height: 65rpx;
	}

	.answers {
		width: 40%;
		font-size: 24rpx;
		color: #BFC4D9;
	}

	/* end */

	.hideCanvasView {
		position: relative;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
</style>
