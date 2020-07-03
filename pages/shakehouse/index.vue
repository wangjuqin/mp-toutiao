<template>
	<view class="page">
		<!-- @change="onSwiperChange" -->

		<swiper class="swiper" :circular="circular" vertical="true"  @change="onSwiper" :current="current"  @scroll='scrolltop_y'>
			<swiper-item v-for="(a,index) in  videoList" :key="index">
				<video class="video"   :id="current" :ref="a.id" :src="utils.siteBaseUrl(a.video)" controls="false" 
				   object-fit="contain"   show-mute-btn="true" muted="true">
				</video>
				<!--  @play="playtop(a.id)"  -->
	              <!-- @click="play" -->
				<view class="controls-title">
					<image class="controls-play img" @click="userTop(a.user_id)" :src="a.avatar"></image>
					<view class="controls-user" @click="userTop(a.user_id)">
						<view class="uname">
							{{a.user_nickname}}
						</view>
						<!-- <view class="company">
								{{a.company}}
							</view> -->
					</view>
					<!-- 		<view class="controls-gz">
							关注
						</view> -->
				</view>
				<view class="controls-house" v-if="a.properties_id" @click="housedateil(a.properties_id)">
					<view class="house-title">
						推荐楼盘：
					</view>

					<view class="house-name">{{a.properties_title}}</view>
					<view class="arrowright">
						<uni-icons type="arrowright" color="#FFFFFF"></uni-icons>
					</view>
				</view>
				<!-- 	<image class="controls-active" v-if="a.image" :src="utils.siteBaseUrl(a.image)"></image>
 -->
				<view class="house-laber">
					<view class="house-title">
						{{a.title}}
					</view>
					<view class="house-data">
						{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
					</view>
					<view class="house-title ask-input" @click="commtop(a.id)">
						写评论
					</view>
				</view>

				<view class="labar-img">
					<view class="labar-item">
						<image class="controls-img" v-if="a.is_fabulous == 0" @click="praisetop(index,a.id)" src="../../static/big_praise.png"></image>
						<image class="controls-img" v-else @click="nopraisetop(index,a.id)" src="../../static/big_praises.png"></image>
						<view class="labar-num" v-if="a.count">
							{{a.count}}
						</view>
					</view>
					<view class="labar-item">
						<!--  v-if="a.is_favorite == 0" @click="praisetop(index,a.id)" -->
						<image class="controls-img" v-if="a.is_favorite == 0" @click="colletcTop(index,a.id)" src="../../static/collect_empty.png"></image>
						<image class="controls-img" v-else @click="nocolletcTop(index,a.id)" src="../../static/collected.png"></image>
						<view class="labar-num" v-if="a.favorite_count">
							{{a.favorite_count}}
						</view>
					</view>

					<view class="labar-item">
						<image class="controls-img" src="../../static/big_video.png"></image>
						<view class="labar-num" v-if="a.click">
							{{a.click}}
						</view>
					</view>
					<view class="labar-item" ref="comment" @click="comment(a.id)">
						<image class="controls-img" src="../../static/big_MSG.png"></image>
						<view class="labar-num" v-if="a.evaluate_count">
							{{a.evaluate_count}}
						</view>
					</view>
					<button class="labar-item" hover-class="none" open-type="share">
						<image class="controls-img" src="../../static/share.png"></image><!--  @click="play" -->
						<!-- 	<view class="labar-num">
							3333
						</view> -->

					</button>
					<!-- <view class="labar-item">
					
						</view> -->
				</view>

			</swiper-item>
		</swiper>
		<uni-popup ref="popups" type="bottom" style="width: 100%;">

			<view class="pinglun">
				<view class="pinglun-top">
					<view class="totalnum">
						{{commentlist.length}} 条评论

					</view>
					<view class="cols" @click="close">
						<image src="../../static/close.png" mode=""></image>
					</view>
				</view>

				<scroll-view scroll-y="true" class="advise" refresher-enabled="ture" refresher-threshold="15" @refresherrefresh="refresheComm">

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

							<view class="leav">
								{{a.content}}
							</view>
							<!-- 	<view class="bottom">
								<view class="data" @click="zhankai">
									展开 31 条回复 <image class="img" :src="[zkimg?'../../static/zk1.png':'../../static/zk.png']"></image>
								</view>

							</view> -->
						</view>
					</view>

				</scroll-view>

			</view>
		</uni-popup>

		<uni-popup ref="popup" type="bottom" style="width: 100%;">
			<view class="input-comm">
				<textarea class="ttarea" @input="ttareatop" :value="ttarea" cursor-spacing="50" fixed="true" />

				<view class="sub-bt"  @click="subtop">
						发布
					</view>
				</view>
		</uni-popup>

	</view>
</template>
<script>
	import con from '@/common/config.js'

	import utils from '@/common/utils.filter.js';

	export default {
		data() {
			return {
				utils:utils,
				videoList:[],
				circular: true,
				zkimg: false,
				pinglun: false,
                iscomm:0,
				limits:5,
				pages:1,
				vidtype:1,
				ttarea:'',
				commid:'',
				commentlist:[],
				current:0,

				videoDataList: [],
				ispinglun: 'none'
			}
		},
		onLoad(e) {
			let _seft = this
			if(e.id) _seft.vidid = e.id
			if(e.type) _seft.vidtype = e.type
			con.sendRequest({
				url: '/home/video/show',
				method: 'get',
				data: {
					id: _seft.vidid
				},
				success: function(res) {
					var datas = res.data
					console.log('楼盘', datas)
					if (datas.code == 1) {
						var restun = datas.data.show
					   _seft.videoList.push(restun)
						
					}
					
				}
			})	
			
		},
		
		onShow() {
			let _seft = this
			
			
		
			
			
		},

		onReady() {
			let _seft = this
			/* _seft.init();
			_seft.getData(); */
				_seft.videolists()

		},
		onShareAppMessage(res) {
			let  _seft= this
		con.sendRequest({
			url: '/home/index/share',
			method: 'GET',
			data: {
				id: _seft.videoList[_seft.current].id,
				type: 7 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师   7抖房  8实拍
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
				title: _seft.videoList[_seft.current].title,//标题
				path: 'pages/newshouse_details/index?id='+_seft.videoList[_seft.current].id,     ///链接
				//imageUrl: _seft.videoList[_seft.current].avatar,  //图片
				
			}
		},
		
		
		
		methods: {
			
			onSwiper(e){
				let _seft = this
				console.log('========',e.detail.current)
				let myvideo = e.detail.current
				let  videoContext = uni.createVideoContext(''+myvideo+'')
				  videoContext.pause()
				 videoContext[myvideo].pause();
				 // this._videoContextList[this._videoIndex].seek(0);
				  console.log('myvideo',myvideo)
				// if(e.detail.current == 0){
				// 	_seft.videolists()
				// }
				
			},
			videolists() {
				let _seft = this
				//楼盘直达
				con.sendRequest({
					url: '/home/video/getShake',
					method: 'get',
					data: {
						type: _seft.vidtype
					},
					success: function(res) {
						var datas = res.data
						
						if (datas.code == 1) {
							var restun = datas.data
							console.log('楼盘直达', _seft.videoList,'restun',restun)
							_seft.videoList = _seft.videoList.concat(restun)
						}
						console.log('========',_seft.videoList)
					}
				})
			},
			
			commtop(index){
				//console.log(e,e.target.dataset.ref)
				this.commid = index
				this.$refs.popup.open()
			},
			
			close() {
				//this.iscomm=0
				this.$refs.popups.close()
			},
			comment(index) {
			this.$refs.popups.open()
			this.pages = 1
			this.commentListtop(index)
			},
			commentListtop(index){
				let _seft = this
			//评论
			  con.sendRequest({
				url: '/home/shooting/commentList',
				method: 'get',
				data: {
					id: index,
					type:3,
					limit:_seft.limits,
					p:_seft.pages	
				},
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.commentlist = restun
						console.log('评论ss', restun)
					}
				}
			
			})	
			},
			
			subtop(){
				let _seft = this
				uni.showLoading({
					title:'评论中',
					mask:true
				})
				con.sendRequest({
					url: '/home/shooting/addComment',
					method: 'post',
					data: {
						id: _seft.commid,
						content:_seft.ttarea,
						type:3,
						parent_id:0
					},
					success: function(res) {
						uni.hideLoading()
						_seft.ttarea = ''
						var datas = res.data
						_seft.$refs.popup.close()
						if (datas.code == 1) {	
							uni.showToast({
								title:datas.msg,
								icon:"none",
								/* success() {
									uni.redirectTo({
										url:'shakehouse?id='+_seft.vidid
									})
								} */
							})
			
						}else{
							uni.showToast({
								title:datas.msg,
								icon:"none",
							})
							
						}
					}
				})	
			},
					
			ttareatop(e){
				
				 this.ttarea = e.detail.value
				 
			},
			
			praisetop(index,id) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
			
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 2
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_fabulous = 1
									_seft.videoList[index].count++
			
								}
							})
			
						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}
			
				})
			},
			nopraisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 2
					},
					success: function(res) {
						var datas = res.data
						//console.log('楼盘动态', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_fabulous = 0
									_seft.videoList[index].count--
			
								}
							})
						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}
			
				})
			},
			
			colletcTop(index,id) {
				let _seft = this
				//收藏类型 1. 文章 2.楼盘 3.视频 4. 经纪人/置业顾问 5. 订阅问题
			
				con.sendRequest({
					url: '/home/Favorites/setFavorites',
					method: 'get',
					data: {
						object_id: id,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_favorite = 1
									_seft.videoList[index].favorite_count = _seft.videoList[index].favorite_count + 1
			
								}
							})
			
						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}
			
				})
			},
			nocolletcTop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Favorites/removeFavorites',
					method: 'get',
					data: {
						id: id,
						type: 3
					},
					success: function(res) {
						var datas = res.data
						console.log('收藏视频', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.videoList[index].is_favorite = 0
									_seft.videoList[index].favorite_count = _seft.videoList[index].favorite_count - 1
			
								}
							})
						}else{
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}
			
				})
			},
			
			compraisetop(index, id) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				console.log(index)
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						var datas = res.data
						var restun = datas.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.commentlist[index].is_fabulous = 1
									_seft.commentlist[index].fabulous_number++
								}
							})
			
						} else {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}
			
				})
			},
			comnopraisetop(index, id) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: id,
						type: 7
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.commentlist[index].is_fabulous = 0
									_seft.commentlist[index].fabulous_number--
								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
							})
						}
					}
			
				})
			},

			zhankai(res) {
				console.log(this)
				this.zkimg = !this.zkimg
			},
		housedateil(index){
			uni.navigateTo({
				url:'../newshouse_details/index?id='+index
			})
			
		},
		userTop(userid){
			uni.navigateTo({
				url:"../consultants/details?id="+userid
			})
		},
	/* 	playtop(index){
		 let  videoContext = uni.createVideoContext(index)
		       videoContext. pause()
			
			
		} */
		
		scrolltop_y(index){
			 let  videoContext = uni.createVideoContext(index)
			  // videoContext.stop()
			  videoContext.pause();
			  videoContext.seek(0);
			   console.log('top')
		},

			init() {

				this._videoIndex = 0;
				this._videoContextList = [];
				for (var i = 0; i < this.videoList.length; i++) {
					this._videoContextList.push(uni.createVideoContext('video' + i, this));
				}
				this._videoDataIndex = 0;
			},
			getData(e) {

				this.videoDataList = videoData;
				setTimeout(() => {
					this.updateVideo(true);
				}, 200)
			},
			onSwiperChange(e) {
				
				let currentIndex = e.detail.current;
				if (currentIndex === this._videoIndex) {
					return;
				}

				let isNext = false;
				if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
					isNext = true;
				} else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
					isNext = false;
				} else if (currentIndex > this._videoIndex) {
					isNext = true;
				}

				if (isNext) {
					this._videoDataIndex++;
				} else {
					this._videoDataIndex--;
				}

				if (this._videoDataIndex < 0) {
					this._videoDataIndex = this.videoDataList.length - 1;
				} else if (this._videoDataIndex >= this.videoDataList.length) {
					this._videoDataIndex = 0;
				}

				this.circular = (this._videoDataIndex != 0);

				if (this._videoIndex >= 0) {
					this._videoContextList[this._videoIndex].pause();
					this._videoContextList[this._videoIndex].seek(0);
				}

				this._videoIndex = currentIndex;

				setTimeout(() => {
					this.updateVideo(isNext);
				}, 200);
			},
			getNextIndex(isNext) {
				
				let index = this._videoIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoList.length - 1;
				} else if (index >= this.videoList.length) {
					return 0;
				}
				return index;
			},
			getNextDataIndex(isNext) {
				console.log('222===========')
				let index = this._videoDataIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoDataList.length - 1;
				} else if (index >= this.videoDataList.length) {
					return 0;
				}
				return index;
			},
			updateVideo(isNext) {
				console.log('111===========')
				this.pinglun = false
				this.$set(this.videoList[this._videoIndex], 'src', this.videoDataList[this._videoDataIndex].src);
				this.$set(this.videoList[this.getNextIndex(isNext)], 'src', this.videoDataList[this.getNextDataIndex(isNext)].src);
				setTimeout(() => {
					this._videoContextList[this._videoIndex].play();
				}, 200);

				console.log("v:" + this._videoIndex + " d:" + this._videoDataIndex + "; next v:" + this.getNextIndex(
					isNext) + " next d:" + this.getNextDataIndex(isNext));
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.page {
		flex: 1;
		width: 750rpx;
	}

	.swiper {
		flex: 1;
		background-color: #007AFF;
		height: 100%;
	}

	.swiper-item {
		flex: 1;
	}

	.video {
		flex: 1;
		/* #ifndef APP-PLUS */
		width: 100%;
		/* #endif */
		height: 100%;
	}


	.controls-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		
		height: 90rpx;
		color: #FFFFFF;
		left: 30rpx;
		position: fixed;
		top: 20rpx;

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
		margin-left: 10rpx;
	}

	.controls-user .uname {
		width: 100%;
		font-size: 29rpx;
	}

	.controls-user .company {
		width: 100%;
		font-size: 24rpx;
		color: #E7D49C;
		margin-top: 10rpx;
	}

	.controls-gz {
		background-color: #FFB931;
		padding: 5rpx 20rpx;
		border-radius: 50rpx;
		font-size: 26rpx;
	}

	.controls-house {
		
		border-radius: 50rpx;
		width: 65%;
		background-color: #389BFE;
		background: rgba(56, 155, 254, 0.15);
		display: flex;
		flex-direction: row;
		justify-content: center;
		height: 75rpx;
		text-align: center;
		font-size: 29rpx;
		position: fixed;
		top: 120rpx;
		left: 30rpx;
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
		width:60%
	}

	.controls-house .arrowright {
		margin-left: 15rpx;
		line-height: 75rpx;
	}

	.controls-active {
		position: fixed;
		width: 48%;
		height: 155rpx;
		left: 30rpx;
		bottom: 250rpx;
	}

	.house-laber {
		color: #FFFFFF;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 65%;
		/* height: 155rpx; */
		left: 30rpx;
		bottom: 130rpx;

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
		width: 65%;
		height: 70rpx;
		font-size: 28rpx;
		line-height: 70rpx;
		text-align: center;
	}

	.labar-img {
		color: #FFFFFF;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		right: 30rpx;
		bottom: 130rpx;
	}

	.labar-img .labar-item {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 75rpx;
		
	}
	button{
		background-color: inherit !important; 
	}

	.labar-img .labar-item .controls-img {
		width: 70rpx;
		height: 70rpx;
		margin-top: 25rpx;


	}

	.labar-img .labar-item .controls-num {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10rpx;

	}

	.pinglun {
		olor: #FFFFFF;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
		bottom: 0rpx;
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

	/*评论 */

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
		margin: 30rpx 0rpx;
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
		font-size: 32rpx;
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

	.item .right .right-top .dzshu>image{

		width: 45rpx;
		height: 45rpx;
	/* 	background-color: #EEF6FE;
		border-radius: 50%; */
		/* padding: 15rpx; */

	}



	.item .right .leav {
		font-size: 30rpx;
		width: 100%;
		/* white-space: normal; */
	}

	.item .right .leav>text {
		color: #9A9A9A;
		text-align: right;
	}

	/* .item .right .leav .leav-content{
	white-space: normal;
} */
	.item .right .bottom {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;

	}

	.item .right .bottom .data {
		font-size: 26rpx;
		color: #BFC4D9;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.item .right .bottom .data .img {
		width: 30rpx;
		height: 30rpx;
	}

	/* end */
	
	.input-comm{
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
	.input-comm .ttarea{
		background-color: #EFF0F5;	
		color: #2D2A2B;
		height: 90%;
		margin-left: 20rpx;
	}
	.input-comm .sub-bt{
		margin-left: 15rpx;
			color: #2D2A2B;
	}

</style>
