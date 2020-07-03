<template>
	<view class="content">

		<view class="sceneshot_conten" v-if="shooting">
			<view class="">
				{{shooting.content}}
			</view>
			<image v-for="(a,index) in images" :src="utils.siteBaseUrl(a)" mode=""></image>
			<!-- <image src="../../static/banner.png" mode=""></image> -->

		</view>

		<view class="house-navbar">
			<view class="left"> 楼盘概况</view>

		</view>

		<view class="house-content" v-if="housedata">
			<view class="house-detail">
				<view class="house-title">
					<view class="name">
						{{housedata.title}}
					</view>
					<view class="price">
						{{housedata.price}}元/㎡
					</view>
				</view>
				<view class="detail-item">
					开盘时间：<text>{{housedata.time}}</text>
				</view>
				<view class="detail-item">
					预计交房：<text>{{housedata.hand}}</text>
				</view>
				<view class="detail-item">
					产权年限：<text>{{housedata.year}}</text>
				</view>
				<view class="detail-item">
					物业类型：<text>{{housedata.type}}</text>
				</view>

				<view class="detail-item">
					装修情况：<text v-if="housedata.renovation==44">未装修</text>
					<text v-else>已装修</text>
				</view>
				<view class="detail-item">
					物业费：<text>{{housedata.property_fee}}</text>/㎡
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
			<!-- <view class="details">
				<navigator class="" url="../adviser/index">查看楼盘详情</navigator>
			</view> -->

		</view>

		<view class="comment">
			<!-- 	<view class="laud">
				<image src="../../static/praise_empty.png" mode=""></image>
				<view class="">
					大哥哥，用户5855
				</view>

			</view> -->
			<view class="comments">
				<input type="text" value="快来输入你的回复" disabled="disabled"  @click="commentsTop" />
				<view class="comment-list" v-if="commentlist">
					<view class="comment-item" v-for="(a,index) in commentlist" :key="index">
						<image :src="a.avatar" mode=""></image>
						<view class="right">
							<view class="uname">
								{{a.user_nickname}}
							</view>
							<view class="comcontent">
								{{a.content}}
							</view>
							<view class="">
								{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
							</view>
						</view>
					</view>


				</view>

			</view>

		</view>
		<uni-popup class="" custom-class="demo-popup" ref="popup" type="bottom">
			<view class="ucomment">
				<textarea value="" @input="contenTop"  maxlength="50" placeholder="请输入你的评论" />
				<view class=""  @click="submitTop">
				发送
			</view>
		</view>
		</uni-popup>

		<view class="house-navbar">
			<view class="left"> 相关推荐</view>

		</view>
		
		<view class="advise">
			<view class="item" v-for="(a,index) in recommendList" :key="index">
				<view class="left">
					<image  :src="a.avatar"></image>
				</view>
		
				<view class="right">
				<!-- 	<view class="right-top">
						<view class="users">
							<view class="uname">Jackson Zhang</view>
							<view class="address">优质房地产</view>
						</view>
						<view class="img">
							<image src="../../static/contact_normal.png"></image>
						</view>
					</view> -->
		
					<view class="leav">
						{{a.content}}
					</view>
					<view class="house-img" >
						<image  v-for="(item,indexs) in a.images" :key="indexs" :src="utils.siteBaseUrl(item)" mode=""></image>
					</view>
					<view class="bottom">
						<view class="data">
							{{a.properties_title}}
						</view>
						<view class="zan">
						
							<image v-if="a.is_fabulous == 0" src="../../static/praise_empty.png" mode="" @click="praisetop(a.id,index)"></image>
							<image v-else src="../../static/praise.png" mode="" @click="nopraisetop(a.id,index)"></image>
							
							
							<view class="shulaing" v-if="a.count">
								{{a.count}}
							</view>
						</view>
					</view>
				</view>
			</view>
		
		</view>
		
		<!-- 底部 -->
		<view class="flex-box">
			<view class="box-content">
				<view class="scan" v-if="shooting">
					<image  :src="shooting.avatar"></image>
					<view class="users">
						<view class="uname">
							{{shooting.user_nickname}}
						</view>
						<view class="">
							{{shooting.mobile}}
						</view>
						
					</view>
					
				</view>
				<view class="zixun">
					在线咨询
		
				</view>
				<view class="tel" @click="callTop(shooting.mobile)" >
					电话咨询
		
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
				comments: false,
				scenid:'',
				houseid:'',
				housedata:'',
				shooting:'',
				images:[],
				recommendList:[],	
				commentlist:[],	
				limit:5,
				pages :1,
				contents:'',
				
			}
		},
		onLoad(e) {
            let _seft = this
           if(e.id) _seft.scenid  = e.id
            if(e.houseid) _seft.houseid = e.houseid
			console.log('dibgtaiid', _seft.scenid)
			
		},
		onShow() {
			  let _seft = this
			_seft.housedatatop(_seft.houseid)
			_seft.recommentop(_seft.houseid)
			_seft.shootingtop()
			_seft.commenttop()
		},
		onShareAppMessage(res) {
			let  _seft= this
		con.sendRequest({
			url: '/home/index/share',
			method: 'GET',
			data: {
				id: _seft.shooting.id,
				type: 8 //1楼盘  2 文章  3 房价楼市  4土拍 5问答  6 咨询师   7抖房  8实拍
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
				title: _seft.shooting.content,//标题
				path: 'pages/sceneshot_detail/index?id='+ _seft.shooting.id+'&houseid'+ _seft.houseid,     ///链接
				imageUrl: _seft.shooting.avatar,  //图片
				
			}
		},
		
		methods: {
			housedatatop(){
				 let _seft = this
				con.sendRequest({
					url: '/home/Properties/getShow',
					method: 'GET',
					data: {
						id: _seft.houseid
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var resturn = datas.data
							console.log('楼盘dd', resturn)
							/* resturn['images'] = JSON.parse(resturn.images) */
							_seft.houseis_favorite = resturn['is_favorite']
							_seft.housedata = resturn
						}
				
					}
				})
			},
			commenttop(){ //实拍评论
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'GET',
					data: {
						id: _seft.scenid,
						type:4,
						limit:_seft.limit,
						p:_seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var resturn = datas.data
							console.log('实拍评论', resturn)
							
							_seft.commentlist = resturn
						}
				
					}
				})
			},

			shootingtop() {
				//现场实拍
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/getShow',
					method: 'get',
					data: {id: _seft.scenid },
					success: function(res) {
						var datas = res.data
						console.log('现场实拍', datas)
						if (datas.code == 1) {
                              var restun = datas.data
							_seft.shooting = restun
							_seft.images = JSON.parse(restun.images)
						}
					}
				})
			},
			recommentop(index){
				let _seft = this
				con.sendRequest({
					url: '/home/shooting/recommendList',
					method: 'get',
					data: {id: index },
					success: function(res) {
						var datas = res.data
						
						if (datas.code == 1) {
				              var restun = datas.data
							  console.log('相关推荐', restun)
							  for (let i in restun) {
							  	restun[i].images = JSON.parse(restun[i].images)
							  }
							_seft.recommendList = restun
							
						}
					}
				})
				
			},
			praisetop(id, index) {
				let _seft = this
				//点赞类型 1.经纪人/置业顾问 2. 专享视频 3. 专享文章 4.海报 5. 楼盘动态 6.现场实拍
				// 向父组件传值
				con.sendRequest({
					url: '/home/Fabulous/dotFabulous',
					method: 'get',
					data: {
						"id": id,
						type: 6,
						
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
									_seft.recommendList[index].is_fabulous = 1
									_seft.recommendList[index].count = _seft.recommendList[index].count + 1
			
								}
							})
			
						}
					}
			
				})
			},
			nopraisetop(id,index) {
				let _seft = this
				con.sendRequest({
					url: '/home/Fabulous/removeFabulous',
					method: 'get',
					data: {
						id: id,
						type: 6
					},
					success: function(res) {
						var datas = res.data
						console.log('quxiaodianzan', datas)
						if (datas.code == 1) {
							uni.showToast({
								title: datas.msg,
								icon:"none",
								duration: 2000,
								success() {
									_seft.recommendList[index].is_fabulous = 0
									_seft.recommendList[index].count = _seft.recommendList[index].count - 1
									
								}
							})
						}
					}
			
				})
			},
			commentsTop(){
					let _seft = this
				    _seft.$refs.popup.open()
			},
			callTop(index){
				uni.makePhoneCall({
					phoneNumber:index,
					success(res) {
						console.log(res)
						
					}
				})
			},
			contenTop(e){
				let _seft = this
				_seft.contents = e.detail.value
				console.log(e)
			},
			submitTop(){ //评论
			uni.showLoading({
				title:"评论中",
				mask:true
			})
			
			let _seft = this
			con.sendRequest({
				url: '/home/shooting/addComment',
				method: 'POST',
				data: {
					id: _seft.scenid,
					content:_seft.contents,
					type: 4,
					parent_id:0,
				},
				success: function(res) {
					uni.hideLoading()
					 _seft.$refs.popup.close()
					var datas = res.data
					console.log('评论', datas)
					if (datas.code == 1) {
						_seft.commenttop()
					}
				}
						
			})
				
			},
			maphouse() {
				let index = this.housedata.coordinate ? this.housedata.coordinate : ''
				uni.navigateTo({
					url: '../map/index?renovation=' + index
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

	/* 评论 */
	
	.ucomment{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	color: #9A9A9A;
		width: 100%;
		background-color: #FFFFFF;
	}
	.ucomment>textarea{
		margin-top: 20rpx;
		margin-left: 5%;
		width: 70%;
		height: 250rpx;
		font-size: 29rpx;
		background-color: #EEF6FE;
	}
.ucomment>view{
	color: #0066CC;
	width: 20%;
	text-align: center;
}
	.comment {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 95%;
		color: #9A9A9A;
	}

	.comment .laud {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		font-size: 26rpx;
		width: 100%;
		border-bottom: 1rpx solid #EEEEEE;
		padding: 25rpx 0rpx;

	}

	.comment .laud>image {
		width: 50rpx;
		height: 50rpx;
	}

	.comment .comments {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.comment .comments>input {
		width: 100%;
		background-color: #EEF6FE;
		border-radius: 15rpx;
		text-align: center;
		margin: 30rpx 0rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 26rpx;
	}

	.comment .comments .comment-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: #000000;
	}

	.comment .comments .comment-list .comment-item {

		display: flex;
		flex-direction: row;
	/* 	align-items: center; */
		justify-content: start;
		width: 100%;
		font-size: 26rpx;
		margin-top: 20rpx;
	}

	.comment .comments .comment-list .comment-item>image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}
	

	.comment .comments .comment-list .right {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: start;
		width: 80%;
		margin-left: 30rpx;

	}
      .comment .comments .comment-list .comcontent{
		width: 100%;
		word-wrap:break-word;
		 word-break:normal;
		
	 }
	.comment .comments .comment-list .right>view {
		margin-top: 15rpx;
		
	}

	/* end */
	.sceneshot_conten {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90%;
		margin: 30rpx 0rpx;
	}

	.sceneshot_conten>image {
		width: 100%;

		height: 350rpx;
		margin-top: 15rpx;
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

	.house-content .details>navigator {
		padding: 0rpx 60rpx;
		background-color: #EEF6FE;
		border: 1rpx solid #A9BCFD;
		border-radius: 15rpx;
		line-height: 70rpx;
	}


	/* end */

	/* 楼盘概况 */
	.house-detail {
		display: flex;
		flex-direction: row;
		width: 95%;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		/* 	text-align: center; */
		font-size: 29rpx;
		color: #9A9A9A;
		margin-top: 20rpx;
	}

	.house-detail .detail-item {
		width: 50%;
		margin-top: 30rpx;
	}

	.house-detail .detail-item>text {
		color: #000000;
	}

	.house-detail .house-title .name {
		color: #000000 !important;
	}

	.house-detail .house-title .price {
		color: #E70000;
		margin-left: 20rpx;
	}

	.house-detail .house-title {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: start;
		align-items: center;
		font-size: 30rpx;
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

	/*  */
	.house-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;

	}


	.house-content .address {
		font-size: 29rpx;
		font-family: FZLanTingHei-L-GBK;
		margin-top: 15rpx;
		color: #9A9A9A;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30rpx 0rpx;

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
		width: 18%;
	}

	.house-content .address .map>image {
		width: 40rpx;
		height: 40rpx;

	}


	.house-content .details>navigator {
		padding: 0rpx 60rpx;
		background-color: #EEF6FE;
		border: 1rpx solid #A9BCFD;
		border-radius: 15rpx;
		line-height: 70rpx;
	}


	/* end */
	/* 相关推荐 */
		
		.advise {
			display: flex;
			flex-direction: column;
			width: 95%;
			border-radius: 15rpx;
		/* 	margin: 20rpx 0rpx; */
	
		}
		
		.advise .item {
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: start;
			padding: 30rpx 0rpx;
			width: 100%;
		 border-bottom: 4rpx  solid #EEEEEE;
		
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
			align-items: center;
			justify-content: start;
			align-items: center;
			height: 100%;
			width: 90%;
		
		}
		
		.item .right .right-top {
			display: flex;
			flex-direction: row;
			justify-content: start;
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
			width: 100%;
		
		}
	.item .right .house-img{
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin-top: 20rpx;
	}
	.item .right .house-img>image{
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
			/* color: #BFC4D9; */
		}
		
		.item .right .bottom .zan {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 13%;
			
		}
		
		.item .right .bottom .zan .shulaing {
			font-size: 24rpx;
			/* color: #BFC4D9; */
		
		}
		
		.item .right .bottom .zan>image {
			width: 40rpx;
			height: 40rpx;
		}
		
		/* end */
		
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
		/* 	text-align: center; */
			width: 100%;
			margin: 15rpx 0rpx;
		
		}
		.flex-box .scan{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	/* 	align-items: center;
		text-align: center;	 */
		width: 25%;
		}
		.flex-box .scan>image {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			
		}
		
		.flex-box  .scan .users{
			display: flex;
			flex-direction: column;
			justify-content: start;
			font-size: 26rpx;
			width: 70%;
		/* 	align-items: center;
			text-align: center;	 */
		}
		.flex-box  .scan .users>view:nth-of-type(1){
			color: #000000;
			width: 100%;
			
		}
		.flex-box  .scan .users>view:nth-of-type(2){
			color: #BFC4D9;
			font-size: 24rpx;
			width: 100%;
			margin-top: 10rpx;
			
		}
		
		.flex-box .zixun {
			background-color: #7CE311;
			color: #FFFFFF;
			font-size: 32rpx;
			border-radius: 20rpx;
			width: 30%;
			line-height: 70rpx;
			text-align: center;
		}
		
		.flex-box .tel {
			background-color: #38AEFE;
			color: #FFFFFF;
			font-size: 32rpx;
			border-radius: 20rpx;
			width: 30%;
			line-height: 70rpx;
			text-align: center;
		}
		
		/* end */
	
</style>
