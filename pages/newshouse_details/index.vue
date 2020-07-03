<template>
	<view class="content">
		<uni-swiper-dot class="uni-swiper-dot" :info="housedata.images" :current="current" field="content" mode="nav">
			<swiper class="swiper-box" @change="change" autoplay="true">
				<swiper-item v-if="housedata.images" v-for="(item ,index) in  housedata.images" :key="index">
					<image :src="utils.siteBaseUrl(item)" mode=""></image>
					<!-- <image :src="item" mode=""></image> -->
					<!-- 	<view class="swiper-item">
						{{item.content}}
					</view> -->
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="house-content">
			<view class="house-title" v-if="housedata.title">
				{{housedata.title}}
			</view>
			<view class="house-laber">
				<view class="laber-item zaishou" v-if="housedata.sale">
					{{housedata.sale}}
				</view>
				<view class="laber-item" v-if="housedata.type">
					{{housedata.type}}
				</view>

			</view>
			<view class="house-detail">
				<view class="average-price" v-if="housedata.price">
					均价：<text>{{housedata.price}}</text> 元 /m²
				</view>
				<view class="total-price" v-if="housedata.amount">
					总价：<text>{{housedata.amount}}</text> 万起
				</view>
				<view class="door" v-if="housedata.apartment">
					户型：<text>{{housedata.apartment}}</text>
				</view>
				<view class="area" v-if="housedata.area">
					面积：<text>{{housedata.area}}</text> m²
				</view>
				<view class="opened" v-if="housedata.time">
					开盘：<text>{{housedata.time}}</text>
				</view>
			</view>

			<view class="address">
				<view class="addr">
					地址：<text>{{housedata.address}}</text>
				</view>
				<view class="map" @click="maphouse">
					<image src="../../static/map.png" mode=""></image>
					<view class="">
						地图
					</view>
				</view>
			</view>
			<view class="details">
				<view class="" @click="housedetail(housedata.id)">详细信息</view>
			</view>

		</view>

		<view class="house-navbar">
			<view class="left"> 尊享服务</view>
			<!-- <view class="right">更多></view> -->
		</view>
		<view class="serve">
			<image src="../../static/taxi.png" mode=""></image>
			<view class="serve-center">
				<view class="">
					免费专车接送
				</view>
				<view class="" v-if="count">
					已有{{count}}人预约专车看房
				</view>
			</view>
			<view class="reservation" @click="reservation()">
				预约
			</view>

		</view>

		<block v-if="Shop1.length > 0">
			<view class="house-navbar">
				<view class="left"> 优秀咨询师</view>
				<view class="center">
					免费咨询 免费服务
				</view>
				<navigator class="right" hover-class="none" url="../consultants/index?type=1">更多></navigator>
			</view>
			<my-seek-list :seeklist="Shop1" style="width: 100%;"></my-seek-list>
		</block>


		<block v-if="Dynamic.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="楼盘动态" :morelist="'../recent_dynamic/index?id='+houseid"></my-laber-title>
			<view class="houser-trends">
				<view class="trends-item" v-for="(item,index) in Dynamic" :key="index">
					<image src="../../static/notice.png" mode=""></image>
					<view class="trends">
						<view class="title">
							{{item.title}}
						</view>
						<view class="contents">
							<!-- class="rich-text" -->
							<jyf-parser :html="item.content" ref="article" ></jyf-parser>
							<!-- <rich-text :nodes="item.content" type="node" class="rich-text" ></rich-text> -->
						</view>
						<view class="data">
							<view class="">
								{{utils.timeTodate('Y-m-d H:i:s', item.create_time*1000) }}
							</view>
							<view class="img">
								<image v-if="item.is_fabulous == 0 ||  item.is_fabulous == null" src="../../static/praise_empty.png" mode="" @click="praisetop(item.id,5)"></image>
								<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(item.id,5)"></image>

								<view v-if="item.click">{{item.click}}</view>
							</view>
						</view>
					</view>


				</view>
				<!-- 
				<view class="trends-bouttom">
					<view class="subscriber">
						<image src="../../static/plus.png" mode=""></image>
						<navigator hover-class="none" class="" url="../ask/index">订阅动态</navigator>
					</view>

				</view> -->
			</view>

		</block>
		<block v-if="Apartment.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="户型图" :morelist="'../door/index?id='+houseid"></my-laber-title>
			<view class="navbar-content">
				<view class="navbar-item" v-for="(a,index) in Apartment" :key="index" @click="showimage(index)">
					<image :src="utils.siteBaseUrl(a.image)"></image>
					<view class="eye">
						<image src="../../static/view.png"></image>
						<view>{{a.click}} </view>
					</view>
					<view class="name door"> {{a.title}} </view>
				</view>
			</view>
		</block>
<!-- pages/consultants/index   ../message/details -->

		<my-laber-title style="width: 100%;" lefttitle="周边配套" morelist='../consultants/index'></my-laber-title>
		<view class="map">
			<map style="width: 100%; height: 300rpx;" scale="12" :latitude="latitude" :longitude="longitude" :markers="covers"
			 altitude="true"></map>
			<view class="trends-bouttom">
				<view class="subscriber">
					<navigator class="" url="../consultants/index">咨询购物医疗等更多周边信息</navigator>
				</view>

			</view>
		</view>

		<block v-if="Shop2.length > 0">
			<view class="house-navbar">
				<view class="left"> 优秀置业顾问</view>
				<view class="center">
					免费咨询 免费服务
				</view>
				<navigator class="right" hover-class="none" url="../consultants/index?type=2">更多></navigator>
			</view>
			<my-seek-list :seeklist="Shop2" style="width: 100%;" seektype='2'></my-seek-list>
		</block>


		<block v-if="shooting.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="现实实拍" :morelist='"../sceneshot_list/index?id="+houseid'></my-laber-title>
			<view class="advise">
				<view class="item" v-for="(a,index) in shooting" :key="index">
					<view class="left">
						<image :src="a.avatar"></image>
					</view>

					<view class="right">
						<view class="right-top"  @click="sceneshot(a.id)">
							<view class="users">
								<view class="uname">{{a.user_nickname}}</view>
								<view class="address">{{utils.timeTodate('Y-m-d H:i',a.create_time*1000)}}</view>
							</view>
							<view class="img">
								<image src="../../static/contact_normal.png"></image>
							</view>
							<!-- <view class="gd">
							...
						</view> -->
						</view>

						<view class="leav">
							{{a.content}}

						</view>
						<view class="house-img">
							<image :src="utils.siteBaseUrl(img)" mode="" v-for="(img,indexs) in a.images" :key="indexs"></image>
						</view>

						<view class="bottom">
							<view class="data">

							</view>
							<view class="zan">
								<view class="shulaing">
									{{a.favorite_number}}
								</view>
								<!-- <image src="../../static/praise_empty.png" mode=""></image> -->
								<image v-if="a.is_fabulous == 0 || a.is_fabulous == null" src="../../static/praise_empty.png" mode="" @click="praisetop(a.id,6)"></image>
								<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(a.id,6)"></image>

								<image src="../../static/MSG_empty.png" mode=""></image>

							</view>
						</view>
					</view>
				</view>

			</view>

		</block>
		<block v-if="Problem.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="买房问专家" :morelist="'../ask/asklist?id='+houseid"></my-laber-title>

			<view class="houser-trends">
				<view class="trends-item" v-for="(a,index) in Problem" :key="index">
					<image src="../../static/question.png" mode=""></image>
					<view class="trends">
						<view class="title">
							{{a.title}}
						</view>
						<view class="contents">
							{{a.describe}}

						</view>
						<view class="data">
							<view class="">
								{{utils.timeTodate('Y-m-d H:i:s',a.create_time*1000)}}

							</view>
							<!-- <view class="img">
								<image class="MSG_empty" src="../../static/MSG_empty.png" mode=""></image>
								<view>{{a.count}}</view>
							</view> -->
						</view>
					</view>


				</view>

			</view>
		</block>
		<block v-if="Essay.length > 0">
			<my-laber-title style="width: 100%;" lefttitle="专享文章" :morelist="'../newshouse/Essay?id='+houseid"></my-laber-title>

			<my-news-list style="width: 100%;" :ArticleList="Essay" operate="2"></my-news-list>

		</block>

		<block v-if="video.length  > 0">
			<my-laber-title style="width: 100%;" lefttitle="专享视频" :morelist="'../housevideo/index?id='+houseid"></my-laber-title>

			<!-- 视频 -->
			<my-video-list ref='videotop' style="width: 100%;" :houseid='houseid' @send="getSonValue" :videolist="video"></my-video-list>
			<!-- end -->
		</block>



		<block>
			<!-- v-if="evaluate.length > 0" -->
			<my-laber-title style="width: 100%;" lefttitle="用户点评" :morelist="'../user_comment/index?id='+houseid"></my-laber-title>

			<view class="houser-comment">
				<view class="comment-item" v-for="(a,index) in evaluate" :key="index">
					<view class="comment">
						<view class="title">
							{{a.content}}
						</view>
						<view class="data">
							<view class="">
								{{a.user_nickname}}
							</view>
							<view class="">
								{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
							</view>

						</view>
					</view>


				</view>


			</view>

		</block>

		<block v-if="like.length > 0 ">
			<my-laber-title style="width: 100%;" lefttitle="猜你喜欢" morelist='../newshouse/index'></my-laber-title>

			<my-row-list style="width: 100%;" :listHouse="like"></my-row-list>

		</block>


		<!-- 底部 -->
		<view class="flex-box">
			<view class="box-content">
				<view class="scan">
					<image v-if="houseis_favorite == 0 || houseis_favorite == null" @click="collecttop(houseid)" src="../../static/big_collect.png"></image>
					<image v-else @click="nocollecttop(houseid)" src="../../static/big_collected.png"></image>
				</view>
				<view class="zixun"  @click="seekTop" ><!-- @click="seekTop" -->
					咨询

				</view>
				<view class="tel" @click="TelTop">
					免费电话

				</view>

			</view>

		</view>
		<!-- end -->



	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {

		data() {
			return {
				title: 'Hello',
				utils: utils,
				count: '',
				housedata: '', //楼盘基础信息
				Shop1: [],
				Shop2: [],
				Dynamic: [], //楼盘动态
				Apartment: [], //户型图
				video: [], //专享视频
				Essay: [], //专享文章
				Problem: [], //问专家
				evaluate: [], //评论
				shooting: [], //现场实拍
				like: [], //猜你喜欢
				images: [],
				shootingimg: [],
				info: [{
					content: ''
				}, {
					content: ''
				}, {
					content: ''
				}],
				current: 0,
				mode: 'nav',
				houseid: '',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				houseis_favorite: 0


			}
		},
		onShow(e) {
			let _seft = this
			console.log('楼盘ids', e)
		},

		onLoad(e) {
			//uni.startPullDownRefresh();
			let _seft = this
			let houseid = e.id
			_seft.houseid = houseid
			console.log('楼盘id', houseid)

			con.sendRequest({
				url: '/home/Properties/getShow',
				method: 'GET',
				data: {
					'id': houseid
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var resturn = datas.data
						console.log('楼盘dd', resturn)
						if (resturn.images) {
							resturn['images'] = JSON.parse(resturn.images)
						}
						if (resturn.coordinate) {
							let coordinate = resturn.coordinate.split(',')
							console.log('coordinate', coordinate)
							_seft.longitude = coordinate[1]
							_seft.latitude = coordinate[0]
							_seft.covers = [{
								latitude: _seft.latitude,
								longitude: _seft.longitude,
								width: 25,
								height: 25,
								iconPath: "../../static/map.png",
							}, ]
						} else {
							uni.getLocation({
								type: 'gcj02',
								success: function(res) {
									console.log('res=====', res)
									_seft.longitude = res.longitude
									_seft.latitude = res.latitude
									_seft.covers = [{
										latitude: _seft.latitude,
										longitude: _seft.longitude,
										width: 25,
										height: 25,
										iconPath: "../../static/map.png",
									}, ]
								}
							})
						}

						_seft.houseis_favorite = resturn['is_favorite']
						_seft.housedata = resturn
					}

				}
			})
			//预约人数
			con.sendRequest({
				url: '/home/Properties/messageCount',
				method: 'get',
				data: {
					properties_id: houseid
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						console.log('预约人数', restun)
						_seft.count = restun

					}
				}

			})

			//咨询师
			con.sendRequest({
				url: '/home/Shop/getShowShop',
				method: 'get',
				data: {
					"type": 1,
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						console.log('咨询师', restun)
						_seft.Shop1 = restun
					}
				}

			})


			//置业顾问
			con.sendRequest({
				url: '/home/Shop/getShowShop',
				method: 'get',
				data: {
					"type": 2,
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Shop2 = restun
					}
				}

			})
			//楼盘动态
			_seft.Dynamiclist(houseid)

			//户型图
			con.sendRequest({
				url: '/home/Apartment/getShowList',
				method: 'get',
				data: {
					"id": houseid
				},
				success: function(res) {
					var datas = res.data
					console.log('image', datas)
					if (datas.code == 1) {
						var restun = datas.data
						var image = []
						for (let i in restun) {
							if (restun[i]['image']) {
								image[i] = utils.siteBaseUrl(restun[i]['image'])
							}
						}
						console.log('image', image)
						_seft.Apartment = restun
						_seft.images = image

					}
				}

			})
			//现场实拍
			_seft.shootingtop(houseid)

			//专享视频
			con.sendRequest({
				url: '/home/video/getShowList',
				method: 'get',
				data: {
					"id": houseid,		
				},
				success: function(res) {
					var datas = res.data
					console.log('专享视频', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.video = restun
					}
				}
			})
		
		
			//专享文章
			con.sendRequest({
				url: '/home/Essay/getShowList',
				method: 'get',
				data: {
					"id": houseid,
				},
				success: function(res) {
					var datas = res.data
					console.log('专享文章', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Essay = restun

					}
				}
			})
			//问专家
			con.sendRequest({
				url: '/home/Answer/getShowList',
				method: 'get',
				data: {
					"id": houseid,
				},
				success: function(res) {
					var datas = res.data
					console.log('问专家', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Problem = restun
					}
				}
			})
			//评论
			con.sendRequest({
				url: '/home/shooting/commentList',
				method: 'get',
				data: {
					id: houseid,
					type: 1,
					limit: 5,
					p: 1,

				},
				success: function(res) {
					var datas = res.data
					console.log('评论', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.evaluate = restun

					}
				}
			})
			//猜你喜欢
			con.sendRequest({
				url: '/home/Properties/like',
				method: 'get',
				data: {
					"properties_id": houseid,
				},
				success: function(res) {
					var datas = res.data
					console.log('猜你喜欢', datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.like = restun

					}
				}
			})
		},
		
		onShareAppMessage(res) {
			let  _seft= this
		con.sendRequest({
			url: '/home/index/share',
			method: 'GET',
			data: {
				id: _seft.housedata.id,
				type: 2 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师   7抖房  8实拍
			},
			success: function(res) {
			
				var datas = res.data
					console.log('分享成功', datas) 
				if (datas.code == 1) {
					uni.showToast({
						title: '分享成功',
						icon:"none",
					})
				}
				
			}
		})
			return {
				title: _seft.housedata.title,//标题
				path: 'pages/newshouse_details/index?id='+_seft.housedata.id,     ///链接
				imageUrl: utils.siteBaseUrl(_seft.housedata.image),  //图片
				
			}
		},
		
		
		methods: {
			getSonValue: function(index, type) {
				let _seft = this
				if (type == 'is_favorite') { //收藏
					if (_seft.video[index].is_favorite == 0 || _seft.video[index].is_favorite == null) {
						_seft.video[index].is_favorite = 1
					} else {
						_seft.video[index].is_favorite = 0
					}
				}
				if (type == 'is_fabulous') { //点赞
					if (_seft.video[index].is_fabulous == 0 || _seft.video[index].is_fabulous == null) {
						_seft.video[index].is_fabulous = 1
						_seft.video[index].give++
					} else {
						_seft.video[index].is_fabulous = 0
						_seft.video[index].give ? _seft.video[index].give-- : 0
					}
				}

				/* 	let _seft = this
					_seft.video = res */
			},
			praisetop(index, type) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				uni.showLoading({
					title:"点赞中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						"id": index,
						type: type
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
									if (type == 5) _seft.Dynamiclist(_seft.houseid)
									if (type == 6) _seft.shootingtop(_seft.houseid)

								}
							})

						}
					}

				})
			},
			nopraisetop(index, type) {
				let _seft = this
				
				uni.showLoading({
					title:"取消点赞中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: index,
						type: type
					},
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						console.log('quxiaodianzan', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									if (type == 5) _seft.Dynamiclist(_seft.houseid)
									if (type == 6) _seft.shootingtop(_seft.houseid)
									//_seft.Dynamiclist(_seft.houseid)
								}
							})
						}
					}

				})
			},
			change(e) {
				this.current = e.detail.current;
			},

			scroll() {
				console.log(this)


			},
		/* 	consultants() {
				uni.navigateTo({
					url: '../adviser_details/index'
				})

			}, */
			sceneshot(index) {

				let _seft = this
				uni.navigateTo({
					url: '../sceneshot_detail/index?id=' + index + '&houseid=' + _seft.houseid
				})

			},
			maphouse() {
				let index = this.housedata.coordinate ? this.housedata.coordinate : ''
				uni.navigateTo({
					url: '../map/index?renovation=' + index
				})
			},
			housedetail(index) {
				uni.navigateTo({
					url: '../house_detail/index?id=' + index
				})
			},
			reservation() {
				let _seft = this
				uni.navigateTo({
					url: '../appointments/index?id=' + _seft.houseid
				})
			},
			showimage(index) {
				let _seft = this
				console.log(_seft.images)
				uni.previewImage({
					current: index,
					urls: _seft.images,
					indicator: 'number',
					loop: true,
					success: function(res) {
						console.log('调用成功', res)

					}
				})

			},
			/* 收藏 */
			collecttop(index) {
				let _seft = this
				//1. 文章 2.楼盘 3.视频
				uni.showLoading({
					title:"收藏中",
					mask:true
				})
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: index,
						type: 2
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
									_seft.houseis_favorite = 1
								}
							})

						}
					}

				})
			},
			/* 取消收藏 */
			nocollecttop(index) {
				let _seft = this
				uni.showLoading({
					title:"取消收藏中",
					mask:true
				})
				console.log('quxioa', index)
				//1文章 2.楼盘 3.视频 4. 现场实拍
				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: index,
						type: 2
					},
					success: function(res) {
						var datas = res.data
						uni.hideLoading()
						console.log('quxioa', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000,
								success() {
									_seft.houseis_favorite = 0
								}
							})
						}
					}

				})
			},

			Dynamiclist(houseid) {
				//楼盘动态

				let _seft = this
				con.sendRequest({
					url: '/home/Dynamic/getShowList',
					method: 'get',
					data: {
						id: houseid
					},
					success: function(res) {
						var datas = res.data
						console.log('楼盘动态', datas)
						if (datas.code == 1) {
							var restun = datas.data
							_seft.Dynamic = restun
						}
					}
				})
			},


			videolists(houseid) {
				let _seft = this
				//专享视频
				con.sendRequest({
					url: '/home/video/getShowList',
					method: 'get',
					data: {
						"id": houseid,
						"is_all": 1
					},
					success: function(res) {
						var datas = res.data
						console.log('专享视频', datas)
						if (datas.code == 1) {
							var restun = datas.data
							_seft.video = restun
						}
					}
				})
			},
			shootingtop(houseid) {
				//现场实拍
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/getShowList',
					method: 'get',
					data: {
						"id": houseid,
						//"is_all": 1
					},
					success: function(res) {
						var datas = res.data
						console.log('现场实拍', datas)
						if (datas.code == 1) {
							var restun = datas.data
							var image = []
							for (let i in restun) {
								restun[i]['images'] = JSON.parse(restun[i]['images'])

							}

							//	console.log('restunssss', restun)
							_seft.shooting = restun
						}
					}
				})
			},
			TelTop() {
				let _seft = this;

				if (_seft.housedata.user_phone) {
					uni.makePhoneCall({
						phoneNumber: _seft.housedata.user_phone,
						success(data) {
							console.log('成功')
						}
					})
				} else {
					uni.showToast({
						title: '目前楼盘暂无经纪人，',
						icon: "none",
						duration: 2000,
						
					})
				}



			},
			seekTop(index){
				uni.navigateTo({
					url:"../message/details"  //   consultants/index      ../message/details
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

	


	/* 现实实拍 */

	.advise {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		/* align-items: center; */
		/* text-align: center; */
		/* background-color: #007AFF; */
		width: 95%;
		border-radius: 15rpx;
		margin: 20rpx 0rpx;
		/* border: 1rpx  solid #EEEEEE;
			border-top: 0rpx; */
		/* 	box-shadow: 4rpx 4rpx 0px rgba(0, 0, 0, 0.1) */


	}

	.advise .item {
		margin-top: 20rpx;
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
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item .right {
		display: flex;
		flex-direction: column;

		justify-content: start;
		/* 	align-items: center; */
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
		font-size: 32rpx;
		width: 100%;
		color: #2A4D9C;

	}

	.item .right .right-top .users .address {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #9A9A9A;
		width: 100%;

	}


	/* 	.item .right .right-top .img {
		width: 48%;
	
	} */

	.item .right .right-top .img>image {

		width: 160rpx;
		height: 46rpx;
		background-color: #EEF6FE;
		/* border-radius: 50%; */
		/* padding: 15rpx; */

	}

	.item .right .right-top .gd {
		color: #BFC4D9;
		/* text-align: right; */
	}

	.item .right .leav {
		font-size: 29rpx;
		margin-top: 10rpx;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;

	}

	.item .right .house-img {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
	}

	.item .right .house-img>image {
		width: calc(100% / 3 - 15rpx);
		margin: 0rpx 7rpx;
		height: 130rpx;
	}

	.item .right .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;

	}

	.item .right .bottom .data {
		font-size: 24rpx;
		color: #BFC4D9;
	}

	.item .right .bottom .zan {
		display: flex;
		flex-direction: row;
		justify-content: start;
		/* width: 25%; */
	}

	.item .right .bottom .zan .shulaing {
		font-size: 24rpx;
		color: #BFC4D9;

	}

	.item .right .bottom .zan>image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 15rpx;
	}

	/* end */
	/* 周边配套 */
	.map {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 95%;
	}

	/* end */

	/* 用户评论 */
	.houser-comment {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		padding-bottom: 30rpx;
	}

	.houser-comment .comment-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1rpx solid #C3C4CF;
		padding-bottom: 30rpx;
		width: 100%;
		margin-top: 30rpx;
	}

	.houser-comment .comment-item .comment {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 100%;

	}

	.houser-comment .comment-item .comment .title {
		font-size: 32rpx;
		/* display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis; */
		width: 100%;
	}

	.houser-comment .comment-item .data {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 26rpx;
		color: #9A9A9A;
		margin-top: 20rpx;
	}

	/* end */

	/* 楼盘动态 */
	.houser-trends {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
	}

	.houser-trends .trends-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* 	align-items: center; */
		width: 100%;
		margin: 20rpx 0rpx;
	}

	.houser-trends .trends-item>image {
		width: 55rpx;
		height: 55rpx;
	}

	.houser-trends .trends-item .MSG_empty {
		width: 35rpx !important;
		height: 35rpx !important;
		margin-right: 20rpx;
	}

	.houser-trends .trends-item .trends {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 86%;

	}

	.houser-trends .trends-item .trends .title {
		font-size: 32rpx;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
	}

	.houser-trends .trends-item .trends .contents {
		font-size: 26rpx;
		color: #9A9A9A;
	  word-break: break-all;
	  display: -webkit-box;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
	  overflow: hidden;
	  /*  height: 100rpx; */
		width: 100%;
		margin-top: 15rpx;
	
	}
	.houser-trends .trends-item .trends .contents .rich-text{
		width: 100%;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.houser-trends .trends-item .data {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 26rpx;
		color: #9A9A9A;
		margin-top: 15rpx;
	}

	.houser-trends .trends-item .data .img {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.houser-trends .trends-item .data .img>image {
		width: 40rpx;
		height: 40rpx;
	}

	.houser-trends .trends-item .data .img>view {
		line-height: 40rpx;
	}

	.trends-bouttom {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 50rpx;
	}

	.trends-bouttom .subscriber {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		background-color: #EEF6FE;
		color: #389BFE;
		border: 1rpx solid #A9BCFD;
		border-radius: 15rpx;
		/* width: 45%; */
		line-height: 70rpx;
		padding: 0rpx 60rpx;

	}

	.trends-bouttom .subscriber>image {
		width: 35rpx;
		height: 35rpx;
		margin-right: 20rpx;

	}

	/* end */

	/* 预约 */
	.serve {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 95%;
	}

	.serve>image {
		width: 150rpx;
		height: 150rpx;
		background-color: #EEF6FE;
		border-radius: 50%;
		padding: 15rpx;
	}

	.serve .serve-center {
		display: flex;
		flex-direction: column;
		justify-content: start;
		font-size: 32rpx;

	}

	.serve .serve-center>view:nth-of-type(2) {
		font-size: 26rpx;
		color: #9A9A9A;
		margin-top: 10rpx;
	}

	.serve .reservation {
		background-color: #389BFE;
		border-radius: 50rpx;
		padding: 10rpx 50rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	/* end */

	/*  */
	.house-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;

	}

	.house-content .house-laber {
		display: flex;
		flex-direction: row;
		justify-content: start;
		color: #8A8D8F;
		width: 40%;
		font-size: 24rpx;
		margin-top: 15rpx;

	}

	.house-content .house-laber .laber-item {
		background-color: #E7ECEE;
		padding: 0rpx 15rpx;
		margin: 0rpx 10rpx;


	}

	.house-content .house-laber .zaishou {

		background-color: #7DCC77;
		color: #FFFFFF !important;
	}

	.house-content .house-title {
		font-size: 36rpx;
		margin-top: 30rpx;
	}

	.house-content .house-detail {
		display: flex;
		flex-direction: row;
		justify-content: start;
		flex-wrap: wrap;
		width: 100%;
		font-size: 24rpx;

	}

	.house-content .house-detail>view {
		font-family: FZLanTingHei-L-GBK;
		width: 50%;
		margin-top: 15rpx;
		color: #9A9A9A;
	}

	.house-content .house-detail text {
		color: #383838;
		font-size: 26rpx;
	}

	.house-content .house-detail .average-price text {
		color: #E70000;
	}

	.house-content .address {
		font-size: 24rpx;
		font-family: FZLanTingHei-L-GBK;
		margin-top: 15rpx;
		color: #9A9A9A;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.house-content .address .addr {
		width: 65%;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}

	.house-content .address .addr>text {
		color: #383838;
	}

	.house-content .address .map {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		width: 18%;
	}

	.house-content .address .map>image {
		width: 50rpx;
		height: 50rpx;

	}

	.house-content .details {
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

	.house-content .details>view {
		padding: 0rpx 60rpx;
		background-color: #EEF6FE;
		border: 1rpx solid #A9BCFD;
		border-radius: 15rpx;
		line-height: 70rpx;
	}


	/* end */

	/* 轮播图 */
	.uni-swiper-dot {
		width: 95%;
		height: 400rpx;
	}

	.uni-swiper__warp.data-v-95f6335c {
		height: 100%;
	}

	.uni-swiper-dot .swiper-box {
		height: 100%;
		height: 400rpx
	}

	.uni-swiper-dot .swiper-box image {
		width: 100%;
		height: 400rpx;
	}

	.uni-swiper__dots-nav.data-v-95f6335c {
		background-color: rgba(0, 0, 0, 0) !important;

	}

	.uni-swiper__dots-nav-item.data-v-95f6335c {
		text-align: right;
		width: 100%;

	}

	/* end */

	/* 猜你喜欢 */

	.navbar-content {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		width: 95%;
	}

	.navbar-content .navbar-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;

		width: calc(100% / 3 - 20rpx);
		margin: 20rpx 10rpx;


	}

	.navbar-content .item_zxs {
		text-align: center;
		border: 1rpx solid #EEEEEE;
		box-shadow: 0rpx 2rpx 0px rgba(0, 0, 0, 0.1);
		padding-bottom: 50rpx;
	}

	.navbar-content .navbar-item image {
		width: 100%;
		height: 175rpx;
	}

	.navbar-content .navbar-item .img {
		margin-top: 50rpx;
		width: 100%;
	}

	.navbar-content .navbar-item .img image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;

	}

	.navbar-content .navbar-item .num {
		width: 100%;
		font-size: 24rpx;
		/* line-height: 60rpx; */
		margin-top: 20rpx;
		color: #7784B3;

	}

	.navbar-content .navbar-item .zx {
		padding: 0rpx 40rpx;
		color: #FFFFFF;
		background-color: #389BFE;
		border-radius: 25rpx;
		line-height: 45rpx;
		font-size: 26rpx;
		margin-top: 25rpx;

	}

	.navbar-content .navbar-item .uname {

		font-size: 35rpx;
		color: rgba(0, 0, 0, 1);
		font-weight: 500;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		margin-top: 20rpx;
	}

	.navbar-content .navbar-item .name {
		height: 60rpx;
		font-size: 29rpx;
		color: rgba(0, 0, 0, 1);
		/* font-weight: 550; */
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		line-height: 60rpx;
	}

	.navbar-content .navbar-item .price {
		display: flex;
		justify-content: start;
		height: 50rpx;
		width: 100%;
		line-height: 50rpx;
	}

	.navbar-content .navbar-item .price view {
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		font-size: 35rpx;
		color: #FFAB18;
		font-weight: 550;
	}

	.navbar-content .navbar-item .price text {
		margin-left: 10rpx;
		font-size: 24rpx;
		color: rgba(0, 0, 0, 1);
	}

	.navbar-content .navbar-item .eye {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		background-color: rgb(0, 0, 0, 0.3);
		/* opacity: 0.48; */
		margin-top: -35rpx;
		height: 35rpx;

	}

	.navbar-content .navbar-item .eye image {
		width: 32rpx;
		height: 20rpx;
	}

	.navbar-content .navbar-item .eye view {
		font-size: 20rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
		color: #FFFFFF;
		margin-left: 5rpx;
	}

	.navbar-content .navbar-item .door {
		color: #383838 !important;
		font-size: 24rpx;
		opacity: .8;
	}

	/* end */


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

	/* 底部 */
	.flex-box {
		border-top: 2rpx solid #EEEEEE;
		width: 100%;
		position: fixed;
		background-color: #FFFFFF;
		bottom: 0rpx;
		z-index: 2;

	}

	.flex-box .box-content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		width: 95%;
		margin: 15rpx 0rpx;

	}

	.flex-box .scan>image {
		width: 70rpx;
		height: 65rpx;

	}

	.flex-box .zixun {
		background-color: #7CE311;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 20rpx;
		width: 30%;
		line-height: 70rpx;
	}

	.flex-box .tel {
		background-color: #38AEFE;
		color: #FFFFFF;
		font-size: 36rpx;
		border-radius: 20rpx;
		width: 30%;
		line-height: 70rpx;
	}

	/* end */
</style>
