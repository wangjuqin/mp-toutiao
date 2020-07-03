<template>
	<view class="content">
		<view class="top">
			<my-search style="width: 100%;" @send="getCenter" :keyword="keyword"></my-search>


			<!-- 搜索框 -->
			<view class="scroll-view" scroll-x="true" @scroll="scroll" scroll-left="0">

				<view class="scroll-view-item " :class="[isshow == index?'active':'']" v-for="(item,index) in scrolllist" :key="index"
				 @click="labers(index)"> {{item.title}}
				</view>
			</view>
		</view>

		<block v-if="isshow==0">
			<block v-if="ArticleList.length > 0">
				<my-laber-title style="width: 100%;" lefttitle="热门推荐" morelist="" isshows="false"></my-laber-title>
				<!-- 热门推荐 -->

				<view class="audio-content">
					<view class="audio_list">
						<view v-for="(a,index) in ArticleList" :key="index" @click="articledateil(a.id)">
							<view class="audio-item">
								<image class="img" :src="utils.siteBaseUrl(a.image)"></image>
							</view>
							<view class="name"> {{a.title}}</view>
						</view>
					</view>

				</view>

				<!-- end -->
			</block>

			<!-- 热门文章 -->
			<block v-if="ArticleNewList.length > 0">
				<my-laber-title style="width: 100%;" righttitle="查看更多" morelist="" lefttitle="最新文章" isshows="false"></my-laber-title>
				<my-news-list style="width: 100%;" :ArticleList='ArticleNewList' @send="getArticlevalue"></my-news-list>
			</block>
			<!-- end -->

		</block>

		<block v-if="isshow==1">
			<my-news-list style="width: 100%;padding-top: 30rpx;" :ArticleList="baikelist" operate="2"></my-news-list>
		</block>
		<block v-if="isshow==2">
			<view class="ishousedata" v-if="housedata">
				<view class="house-data">
					<view class="up-date">
						更新时间：{{utils.timeTodate('Y-m-d H:i:s',housedata.create_time*1000)}}
					</view>
					<view class="share">
						<view class=" ">
							商品房今日实时成交
						</view>
						<button class="sharebtn" type="default" hover-class="none" open-type="share">
							<image src="../../static/share_btn_normal.png" mode=""></image>
						</button>
					</view>

					<view class="genaral-area">
						<view class="flex-boxs tc thead">
							<view class="item-2">区域</view>
							<view class="item-2">全市</view>
							<view class="item-2">中心城区 </view>
							<view class="item-2">郊区新城 </view>
						</view>
						<view class="flex-boxs table tc">
							<view class="item-2">
								套数（套）
							</view>
							<view class="item-2 colors-1">
								{{housedata.number}}
							</view>
							<view class="item-2 colors-1">
								{{housedata.number1}}
							</view>
							<view class="item-2 colors-1">
								{{housedata.number2}}
							</view>
						</view>


						<view class="flex-boxs table tc">
							<view class="item-2">
								面积（平方数）
							</view>
							<view class="item-2 colors">
								{{housedata.area}}
							</view>
							<view class="item-2 colors">
								{{housedata.area1}}
							</view>
							<view class="item-2 colors">
								{{housedata.area2}}
							</view>
						</view>
					</view>
					<view class="house-info">
						<image :src="utils.siteBaseUrl(housedata.wechat_img)" mode=""></image>
						<view class="">
							<view class="infos">
								多元化房产线索就上派好房，5000名置业管家贴心为您服务！

							</view>
							<view class="follow">
								关注派好房 买房更省心
							</view>
						</view>

					</view>

					<view class="house-show">

						<view class="show-item">
							<view class="">
								中心城区：
							</view>
							<view class="">
								包含五城区及高新区、天府新区、双流区、
								龙泉驿区、温江区、郫都区、新都区、青白
								江区；
							</view>
						</view>

						<view class="show-item">
							<view class="">
								郊区新城：
							</view>
							<view class="">
								包含简阳市、都江堰市、崇州市、彭州市、

								邛崃市、新津县、金堂县、大邑县、蒲江县。
							</view>

						</view>
						<view class="show-items">
							<view class="">
								注：
							</view>
							<view class="">
								数据来源于成都市住房和城乡建设局。
							</view>

						</view>
					</view>

				</view>
				<view class="home_btn">
					<image src="../../static/home_btn.png" mode="" @click="HomeTop"></image>
				</view>

			</view>

		</block>
		<block v-if="isshow==3">
			<view class="isdirtpat">
				<!-- <my-house-cate style="width: 100%;" :laberlist="laberlist"  housesale="false"  @send="kkk"></my-house-cate> -->

				<view class="collapses">
					<view class="collapse-list">
						<view class="collapse-list-items " @click="stop(0)">
							<text v-if="regionst" class="tabactive">{{region_title}}</text>
							<text v-else>区域</text>

							<uni-icons type="arrowdown"></uni-icons>
						</view>
						<view class="collapse-list-items" @click="stop(1)">
							<text v-if="housetypest" class="tabactive">{{housetype_title}}</text>
							<text v-else>分类</text>


							<uni-icons type="arrowdown"></uni-icons>
						</view>

						<view class="collapse-list-items" @click="stop(2)">
							<text v-if="areast" class="tabactive">{{area_title}}</text>
							<text v-else>楼面价</text>


							<uni-icons type="arrowdown"></uni-icons>
						</view>
					</view>
				</view>
				<!--  -->
				<uni-popup ref="stop" type="top" maskClick="false">

					<view class="collapse" style="background-color: #FFFFFF;">
						<view class="collapse-list">
							<view class="collapse-list-items" @click="collapse(0)" :class="current==0?'tabactive':''">
								区域
								<uni-icons type="arrowdown"></uni-icons>

							</view>
							<view class="collapse-list-items" @click="collapse(1)" :class="current==1?'tabactive':''">
								分类
								<uni-icons type="arrowdown"></uni-icons>
							</view>
							<view class="collapse-list-items" @click="collapse(2)" :class="current==2?'tabactive':''">
								楼面价
								<uni-icons type="arrowdown"></uni-icons>
							</view>
						</view>

					</view>

					<swiper style="width: 100%;height: 800rpx;" :duration="0" :current='current'>
						<swiper-item>
							<view class="qu">
								<scroll-view scroll-y="true" class="shangquan">
									<view class="" v-for="(a,index) in Region" :key="index">
										<view class="shangquan-title">
											{{a.title}}
										</view>
										<view class="shangquan-list">
											<view class="shangquan-item" :id="item.id" v-for="(item,indexs) in  a.progeny" :key="indexs" :class="[regionst == item.id?'active':'']"
											 @click="top(1,item.id,item.title)">
												{{item.title}}
											</view>
										</view>
									</view>


								</scroll-view>

								<view class="bottom">
									<view class="quxiao" @click="close">
										重置
									</view>
									<view class="queding" @click="confirm">
										确认
									</view>


								</view>
							</view>

						</swiper-item>
						<swiper-item>
							<view class="fl">
								<scroll-view scroll-y="true" class="fenlei">
									<view class="fenlei-list">
										<view class="fenlei-item" v-for="(a,index) in housetype" :id="a.title" @click="top(3,a.id,a.title)" :key="index"
										 :class="[housetypest==a.id?'active':'']">
											{{a.title}}
										</view>
									</view>
								</scroll-view>

								<view class="fenlei-bottom">
									<view class="quxiao" @click="close">
										重置
									</view>
									<view class="queding" @click="confirm">
										确认
									</view>
								</view>


							</view>


						</swiper-item>
						<swiper-item>
							<view class="lmj">

								<scroll-view scroll-y="true" class="loumianjia">
									<view class="loumianjia-list">
										<view class="loumianjia-item" @click="top(2,a.id,a.title)" v-for="(a,index) in Area" :key="index" :class="[areast==a.id?'active':'']">
											{{a.title}}
										</view>
									</view>
								</scroll-view>

								<view class="loumianjia-bottom">
									<view class="quxiao" @click="close">
										重置
									</view>
									<view class="queding" @click="confirm">
										确认
									</view>
								</view>
							</view>

						</swiper-item>
					</swiper>


				</uni-popup>

				<view class="house-list">
					<view class="list-item" v-for="(a,index) in dirtpatlist" :key="index" @click="dirtpattop(a.id)">
						<view class="item-top">
							<view class="item-top-left">
								{{utils.timeTodate('Y-m-d H:i:s',a.create_time*1000)}}
							</view>
							<view class="item-top-right">

								<view :class="[item=='住宅'?'zz':'sp']" v-for="(item,indexs) in  a.category_name" :key="indexs">
									{{item}}
								</view>


							</view>
						</view>
						<view class="house-address">
							<uni-icons type="location-filled" size="20" color="#339EFC"></uni-icons>
							<view class="">
								{{a.address}}
							</view>
						</view>
						<view class="info">
							<view class="">
								出让面积：
								<text>{{a.granting_area}} </text>
								m²
							</view>
							<view class="">
								成交意中人：
								<text>{{a.amount}} </text>
								万元
							</view>
						</view>
						<view class="info">
							<view class="">
								楼面积：
								<text class="area" v-if="a.area">{{a.area}}</text>
								<text class="area" v-else>0</text>
								m²
							</view>
							<view class="">
								最大容积率：<text>{{a.volume}}</text>
							</view>
						</view>
						<view class="info">
							<view class="">
								竞得方：<text>{{a.obtain}}</text>
							</view>
						</view>
					</view>

				</view>

			</view>
		</block>
		<block v-if="isshow==4">
			<view class="isanswers">
				<scroll-view class="scroll-view" scroll-x="true" scroll-left="0">
					<view class="scroll-view-item-ht " @click="houstTop(a.id)" :url="'../news/answers_details?id='+a.id" v-for="(a,index) in AnHotList"
					 :key='index'>
						<view class="label">
							<!-- <image src="../../static/xx1.png" mode=""></image> -->
							<view class="">
								热议话题 | 精选
							</view>
						</view>
						<view class="title">
							{{a.describe}}
						</view>
						<view class="prive">
							{{a.click}}人已围观
						</view>

					</view>
					<!-- 
					<navigator class="scroll-view-item-ht there " url="">
						<view class="label">
							<image src="../../static/xx1.png" mode=""></image>
							<view class="">
								热议话题 | 精选
							</view>
						</view>
						<view class="title">
							成都口罩购买指南
						</view>
						<view class="prive">
							172838 人已围观
						</view>

					</navigator> -->
				</scroll-view>

				<view class="collapses">
					<view class="collapse-list">
						<view class="collapse-list-items " @click="stop(0)">
							<text v-if="laberst == 0">问答类型</text>
							<text v-for="(item,indexs) in ascate" :key="indexs" v-if="laberst == item.id">
								{{item.title}}
							</text>

							<uni-icons type="arrowdown"></uni-icons>
						</view>
						<view class="collapse-list-items" @click="stop(1)">
							<text v-if="staus == 0">解决状态</text>
							<text v-if="staus == 1">未回答</text>
							<text v-if="staus == 2">已回答</text>
							<text v-if="staus == 3">已解决</text>
							<uni-icons type="arrowdown"></uni-icons>
						</view>

						<view class="collapse-list-items" @click="stop(2)">
							<text v-if="orderby == 0">默认排序</text>
							<text v-if="orderby == 1">预览量由高到低</text>
							<text v-if="orderby == 2">发布时间由近到远</text>
							<uni-icons type="arrowdown"></uni-icons>
						</view>
					</view>
				</view>
				<!--  -->
				<uni-popup ref="stop" type="top">

					<view class="collapse" style="background-color: #FFFFFF;">
						<view class="collapse-list">
							<view class="collapse-list-items" @click="collapse(0)" :class="current==0?'tabactive':''">
								<!-- 问答类型 -->
								<text v-for="(item,indexs) in ascate" :key="indexs" v-if="laberst == item.id">
									{{item.title}}
								</text>
								<uni-icons type="arrowdown"></uni-icons>

							</view>
							<view class="collapse-list-items" @click="collapse(1)" :class="current==1?'tabactive':''">
								<text v-if="staus == 0">解决状态</text>
								<text v-if="staus == 1">未回答</text>
								<text v-if="staus == 2">已回答</text>
								<text v-if="staus == 3">已解决</text>
								<uni-icons type="arrowdown"></uni-icons>
							</view>
							<view class="collapse-list-items" @click="collapse(2)" :class="current==2?'tabactive':''">

								<text v-if="orderby == 0">默认排序</text>
								<text v-if="orderby == 1">预览量由高到低</text>
								<text v-if="orderby == 2">发布时间由近到远</text>

								<uni-icons type="arrowdown"></uni-icons>
							</view>
						</view>

					</view>

					<swiper style="width: 100%;height: 800rpx;" :duration="0" :current='current'>
						<swiper-item>
							<view class="qu">
								<scroll-view scroll-y="true" class="shangquan">
									<!-- <view class="" v-for="(a,index) in ascate" :key="index"> -->
									<!-- 		<view class="shangquan-title">
											{{a.title}}
										</view> -->
									<view class="shangquan-list">
										<view class="shangquan-item" :id="item.id" v-for="(item,indexs) in ascate" :key="indexs" :class="[laberst == item.id?'active':'']"
										 @click="ansstaus(0,item.id)">
											{{item.title}}
										</view>
									</view>
									<!--  </view>-->


								</scroll-view>

								<view class="bottom">
									<view class="quxiao" @click="close">
										重置
									</view>
									<view class="queding" @click="confirm">
										确认
									</view>


								</view>
							</view>

						</swiper-item>
						<swiper-item>
							<view class="lmj">

								<scroll-view scroll-y="true" class="loumianjia">
									<view class="loumianjia-list">
										<view class="loumianjia-item" @click="ansstaus(1,0)" :class="[staus==0?'active':'']">
											全部
										</view>
										<view class="loumianjia-item" @click="ansstaus(1,1)" :class="[staus==1?'active':'']">
											未回答

										</view>
										<view class="loumianjia-item" @click="ansstaus(1,2)" :class="[staus==2?'active':'']">
											已回答
										</view>
										<view class="loumianjia-item" @click="ansstaus(1,3)" :class="[staus==3?'active':'']">
											已解决
										</view>
									</view>
								</scroll-view>

								<view class="loumianjia-bottom">
									<view class="quxiao" @click="close">
										重置
									</view>
									<view class="queding" @click="confirm">
										确认
									</view>
								</view>
							</view>

						</swiper-item>
						<swiper-item>
							<view class="lmj">

								<scroll-view scroll-y="true" class="loumianjia">
									<view class="loumianjia-list">
										<view class="loumianjia-item" @click="ansstaus(2,0)" :class="[orderby==0?'active':'']">
											默认排序
										</view>
										<view class="loumianjia-item" @click="ansstaus(2,1)" :class="[orderby==1?'active':'']">
											预览量由高到低

										</view>
										<view class="loumianjia-item" @click="ansstaus(2,2)" :class="[orderby==2?'active':'']">
											发布时间由近到远
										</view>

									</view>
								</scroll-view>

								<view class="loumianjia-bottom">
									<view class="quxiao" @click="close">
										重置
									</view>
									<view class="queding" @click="confirm">
										确认
									</view>
								</view>
							</view>

						</swiper-item>
					</swiper>


				</uni-popup>


				<view class="answers">
					<view class="answers-item" v-for="(a,index) in answerslist" :key="index" @click="answerstop(a.id)">
						<view class="answers-top">
							<view class="top-left">
								<view class="jianju" v-if="a.type==1">
									未回答
								</view>
								<view class="jianju" v-if="a.type==2">
									已回答
								</view>
								<view class="jianju" v-if="a.type==3">
									已解决
								</view>
								<view class="dk">
									{{a.c_title}}
								</view>
							</view>
							<view class="top-right">
								<view class="top-prive">
									{{a.click}} 浏览
								</view>
								<view class="top-ans">
									{{a.count}} 回答
								</view>
								<view class="top-laber" v-if="a.is_recommend==1">
									精华
								</view>

							</view>
						</view>
						<view class="answers-content" @click="answerstop(a.id)">
							{{a.describe}}
						</view>
						<view class="answers-bottom">
							<view class=".bottom-left">
								<image :src="a.avatar" mode=""></image>
								<view class="name">
									{{a.user_nickname}}
								</view>
								<view class="data">
									{{utils.timeTodate('m-d',a.create_time*1000)}}
								</view>
							</view>
							<view class="bottom-right" @click="answerstop(a.id)">
								查看回答
							</view>
						</view>
					</view>
				</view>

				<!-- 底部 -->
				<view class="flex-box">
					<view class="box-content" @click="asktop">
						我要提问
					</view>
				</view>
				<!-- end -->

			</view>
		</block>

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
				limits: 10,
				pages: 1,
				isshow: 0,
				current: 0,
				ArticleList: [], //热门推荐
				ArticleNewList: [], //最新文章
				baikelist: [], //百科知识
				housedata: [], //楼盘数据
				dirtpatlist: [], //土拍
				answerslist: [], //问答
				AnHotList: [], //问答热门话题
				//tupai
				Region: [], //区域
				Area: [], //面积
				housetype: [], //类型
				regionst: 0, //所选区域
				areast: 0, //所选面积
				housetypest: '', //所选类型
				region_title: '',
				housetype_title: '',
				area_title: '',
				ascate: [],
				searchType: '',
				keyword: '',
				laberst: '',
				staus: '', //问题
				orderby: '', //排序

				scrolllist: [{
						title: '热门文章',
						url: '../news/index'
					},
					{
						title: '百科知识',
						url: '../news/baike'
					},
					{
						title: '房价楼市',
						url: '../news/housedata'
					},
					{
						title: '土拍',
						url: '../news/dirtpat'
					},
					{
						title: '问答',
						url: '../news/answers'
					},

				]
			}
		},
		onLoad(e) {
			let _seft = this
			_seft.isshow = e.type ? e.type : 0
			console.log(e.type, _seft.isshow)

		},
		onShow() {

			let _seft = this
			//区域
			con.sendRequest({
				url: '/home/Region/getProper',
				method: 'GET',
				data: {
					pid: 0
				},
				success: function(res) {
					var datas = res.data
					console.log(datas)
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Region = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})
			//面积
			con.sendRequest({
				url: '/home/Region/getDirtPrice',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Area = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})
			//类型
			con.sendRequest({
				url: '/home/Region/getType',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.housetype = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})
			//获取热门推荐
			con.sendRequest({
				url: '/home/article/getHotList',
				method: 'get',

				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						console.log('获取热门推荐', restun)
						_seft.ArticleList = restun

					}
				}

			})
			//最新文章
			_seft.propertyTop()
			_seft.articleListtop()
			_seft.CategoryListTop()
			_seft.AnswerListTop()
			_seft.baikelisttop()
			_seft.dirttop()
		},

		onReachBottom() { //uniapp 监听下拉加载生命周期

			let _seft = this
			console.log('refresh', _seft.keyword);
			_seft.pages++
			if (_seft.keyword) {
				switch (_seft.isshow) {
					case 0:
						_seft.searchAritive(_seft.keyword, 1)
						break;
					case 1:
						_seft.searchAritive(_seft.keyword, 2)
						break;
					case 3:
						_seft.searchDirt(_seft.keyword)
						break;
				}
			} else {
				switch (_seft.isshow) {
					case 0:
						_seft.articleListtop()
						break;
					case 1:
						_seft.baikelisttop()
						break;
					case 3:
						_seft.dirttop()
						break;
				}
			}


		},
		onShareAppMessage(res) {
			let _seft = this

			return {
				title: '多元化房产线索就上派好房，5000名置业管家贴心为您服务！', //标题
				/* desc: '商品房今日实时成交', */
				path: 'pages/news/index?type=2', ///链接
				imageUrl: utils.siteBaseUrl(_seft.housedata.wechat_img), //图片
			}
		},

		methods: {
			getCenter(keyword) {
				let _seft = this
				_seft.pages = 1
				_seft.keyword = keyword
				_seft.ArticleNewList = []
				_seft.baikelist = []
				_seft.dirtpatlist = []
				if (_seft.isshow == 0) {
					_seft.searchAritive(keyword, 1)
				}
				if (_seft.isshow == 1) {
					_seft.searchAritive(keyword, 2)
				}

				if (_seft.isshow == 3) {
					_seft.searchDirt(keyword)
				}
				if (_seft.isshow == 4) {
					_seft.searchAnswer(keyword)
				}


			},

			searchAritive(keyword, type) {
				let _seft = this
				con.sendRequest({
					url: '/home/search/articleList?',
					method: 'get',
					data: {
						type: type, // 1.热门文章 2.百科知识
						keyword: keyword,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							if (type == 1) {
								_seft.ArticleNewList = _seft.ArticleNewList.concat(restun)
							}
							if (type == 2) {
								_seft.baikelist = _seft.baikelist.concat(restun)
							}
							console.log('文章', restun, _seft.ArticleNewList)


						}
					}

				})
			},
			searchDirt(keyword) {
				let _seft = this
				con.sendRequest({
					url: '/home/search/dirtList',
					method: 'get',
					data: {
						keyword: keyword,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							for (var i = 0; i < restun.length; i++) {
								restun[i]['category_name'] = restun[i]['category_name'].split(',')
							}
							console.log('土拍', restun)
							_seft.dirtpatlist = _seft.dirtpatlist.concat(restun)
						}
					}

				})
			},
			searchAnswer() {
				let _seft = this
				con.sendRequest({
					url: '/home/search/answerList',
					method: 'get',
					data: {
						keyword: _seft.keyword,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('回答', restun)
							_seft.answerslist = _seft.answerslist.concat(restun)

						}
					}

				})
			},





			getArticlevalue(index, type) {
				let _seft = this
				console.log(index, type)
				if (type == 1) {
					if (_seft.ArticleNewList[index].is_fabulous == 0 || _seft.ArticleNewList[index].is_fabulous == null) {
						_seft.ArticleNewList[index].is_fabulous = 1
					} else {
						_seft.ArticleNewList[index].is_fabulous = 0
					}
				}
				if (type == 2) {
					if (_seft.ArticleNewList[index].is_favorite == 0 || _seft.ArticleNewList[index].is_favorite == null) {
						_seft.ArticleNewList[index].is_favorite = 1
					} else {
						_seft.ArticleNewList[index].is_favorite = 0
					}
				}


			},

			confirm() {
				let _seft = this
				_seft.$refs.stop.close();
				_seft.pages = 1

				if (_seft.isshow == 3) {
					_seft.dirtpatlist = []

					_seft.dirttop()
				}
				if (_seft.isshow == 4) {
					_seft.answerslist = []
					_seft.AnswerListTop()
				}



				//console.log(restun)
			},
			close() {
				let _seft = this
				_seft.$refs.stop.close();
				_seft.regionst = 0
				_seft.housetypest = ''
				_seft.housetype_title = ''
				_seft.laberst = ''
				_seft.areast = 0
				_seft.staus = ''
				_seft.orderby = ''
				if (_seft.isshow == 3) {
					_seft.dirtpatlist = []

					_seft.dirttop()
				}
				if (_seft.isshow == 4) {
					_seft.answerslist = []
					_seft.AnswerListTop()
				}

			},
			top(item, index, res) {
				let _seft = this
				///console.log('ffffffffffffff------------',this.$attrs)
				switch (item) {
					case 1:
						_seft.regionst = index
						_seft.region_title = res
						break;
					case 2:
						_seft.areast = index
						_seft.area_title = res
						break;
					case 3:
						_seft.housetypest = index
						_seft.housetype_title = res
						break;
				}
			},
			stop(index) {
				console.log(index)
				this.current = index
				this.$refs.stop.open();
			},
			collapse(index) {
				console.log(index)
				this.current = index
			},


			labers(index) {
				let _seft = this
				_seft.isshow = index
				_seft.pages = 1
				_seft.ArticleNewList = []
				_seft.baikelist = []
				_seft.dirtpatlist = []
				_seft.keyword = ''
				switch (index) {
					case 0:
						_seft.articleListtop()
						_seft.getHotListTop()
						break;
					case 1:
						_seft.baikelisttop()
						break;
					case 2:
						_seft.propertyTop()

						break;
					case 3:
						_seft.dirttop()
						break;
					case 4:
						_seft.AnswerListTop()
						_seft.getHotListTop()
						break;

				}



			},
			articledateil(index) {
				uni.navigateTo({
					url: './details?id=' + index
				})

			},
			dirtpattop(index) {
				uni.navigateTo({
					url: '../news/dirtpatdetails?id=' + index
				})

			},
			answerstop(index) {
				uni.navigateTo({
					url: '../news/answers_details?id=' + index
				})

			},
			asktop(index) {
				uni.navigateTo({
					url: '../ask/index'
				})

			},
			HomeTop() {
				uni.switchTab({
					url: "../index/index"
				})

			},
			houstTop(index) {
				uni.navigateTo({
					url: "answers_discuss?id=" + index
				})

			},
			articleListtop() { //最新文章
				let _seft = this
			/* 	uni.showLoading({
					title: '加载中'
				}) */
				con.sendRequest({
					url: '/home/article/getNewList',
					method: 'get',
					data: {
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						/* uni.hideLoading() */
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.ArticleNewList = _seft.ArticleNewList.concat(restun)
							console.log('zuixin', _seft.limits, _seft.pages, _seft.ArticleNewList)

						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								mask: true,
								duration: 3000
							})
						}
					}

				})
			},
			baikelisttop() { //百科知识
				let _seft = this
			/* 	uni.showLoading({
					title: '加载中'
				}) */
				con.sendRequest({
					url: '/home/article/getEncyclopediasList',
					method: 'get',
					data: {
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						/* uni.hideLoading() */
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							_seft.baikelist = _seft.baikelist.concat(restun)
							console.log('百科知识', _seft.pages, _seft.baikelist)
						}
					}

				})
			},
			dirttop() { //土拍
				let _seft = this
				/* uni.showLoading({
					title: '加载中'
				}) */
				con.sendRequest({
					url: '/home/dirt/getList',
					method: 'get',
					data: {
						region_id: _seft.regionst,
						category_name: _seft.housetype_title,
						price_id: _seft.areast,
						limit: _seft.limits,
						p: _seft.pages
					},
					success: function(res) {
						/* uni.hideLoading() */
						var datas = res.data
						console.log('土拍', datas)
						if (datas.code == 1) {
							var restun = datas.data
							for (var i = 0; i < restun.length; i++) {
								restun[i]['category_name'] = restun[i]['category_name'].split(',')
							}
							_seft.dirtpatlist = _seft.dirtpatlist.concat(restun)
							console.log('土拍', _seft.pages, _seft.dirtpatlist, restun)
							//_seft.dirtpatlist = restun

						}
					}

				})

			},

			CategoryListTop() { //问答分类
				let _seft = this
				con.sendRequest({
					url: '/home/Answer/getCategoryList',
					method: 'get',
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('问答分类', restun)
							_seft.ascate = restun
						}
					}

				})
			},
			getHotListTop() { //热门话题
				let _seft = this
				con.sendRequest({
					url: '/home/answer/getHotList',
					method: 'get',
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('问答分类', restun)
							_seft.AnHotList = restun
						}
					}

				})
			},
			AnswerListTop() { //问答列表
				let _seft = this
				con.sendRequest({
					url: '/home/Answer/getList',
					method: 'get',
					data: {
						type: _seft.laberst,
						cid: _seft.staus,
						order: _seft.orderby,

					},
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('问答', restun)
							_seft.answerslist = restun
						}
					}

				})
			},
			propertyTop() { //楼盘数据
				let _seft = this
				con.sendRequest({
					url: '/home/article/property',
					method: 'get',
					success: function(res) {
						var datas = res.data
						if (datas.code == 1) {
							var restun = datas.data
							console.log('楼盘数据', restun)
							_seft.housedata = restun
						}
					}
				})
			},


			ansstaus(item, index) {
				console.log(item, index)
				let _seft = this
				switch (item) {
					case 0:
						_seft.laberst = index
						break;
					case 1:
						_seft.staus = index
						break;
					case 2:
						_seft.orderby = index
						break;
				}
			}





		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 200rpx;
	}

	.sharebtn {
		position: initial;
		background-color: #FFFFFF;
		line-height: 0rpx;
		padding: 0rpx;
		margin: 0rpx;

	}

	button::after {

		position: initial;
		border: none;
	}

	.searchbar {
		background-color: #FFFFFF;
	}


	//普通表格


	.flex-boxs {
		display: flex;
		flex-wrap: wrap;
		color: #9A9A9A;
		font-size: 24rpx;

	}

	.tabactive {
		color: #38AEFE !important;
	}

	.flex-boxs>.item-2 {
		flex: 0 0 25%;
	}

	.genaral-area {
		width: 100%;
		margin-top: 30rpx;

		.item-2 {
			/* font-size: 26upx; */
			border: 1upx solid #EEEEEE;
			border-width: 1upx 1upx 0 0;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;

			&:first-child {
				border-left-width: 1upx;
			}

			&:last-child {
				border-right-width: 1upx;
			}
		}

		.thead {
			background-color: #F3F3F5;

			.item-2 {


				box-sizing: border-box;
			}
		}

		.table {
			&:last-child {
				border-bottom: 1upx solid #EEEEEE;
			}

			.colors-1 {
				color: #389BFE;
				font-weight: bold;
				font-size: 30rpx;
			}

			.colors {
				color: #313131;
				font-weight: bold;
				font-size: 26rpx;
			}

			.item-2 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}





	.house-data {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		margin-top: 50rpx;
		width: 95%;
	}

	.house-data .share,
	.up-date,
	.house-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 20rpx;
	}

	.house-data .addr-data {
		font-size: 24rpx;
		color: #9A9A9A;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.house-data .addr-data .addr-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 30%;
	}

	.house-data .addr-data .addr-item>view {
		margin-top: 20rpx;
	}

	.house-data .up-date {
		font-size: 24rpx;
		color: #9A9A9A;
	}

	.house-data .share>view {
		font-size: 32rpx;
		font-weight: bold;
	}

	.house-data .share image {
		width: 190rpx;
		height: 70rpx;
	}

	.house-data .addr {
		font-size: 24rpx;
		color: #9A9A9A;
	}


	.house-data .house-info>image {
		width: 165rpx;
		height: 165rpx;
	}

	.house-data .house-info>view {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 72%;
	}

	.house-data .house-info>view .infos {
		font-size: 28rpx;
		color: #393939;
		width: 100%;
		font-weight: bold;

	}

	.house-data .house-info>view .follow {
		font-size: 24rpx;
		margin-top: 20rpx;
		color: #9A9A9A;
		width: 100%;
	}

	.house-data .house-show {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 100%;
		color: #606060;
		font-size: 30rpx;
	}

	.house-data .house-show .show-item {

		display: flex;
		flex-direction: row;
		justify-content: start;
		/* 	flex-wrap: wrap; */
		margin-top: 30rpx;
		width: 100%;
	}

	.house-data .house-show .show-item>view:nth-of-type(1) {
		width: 48%;
	}

	.house-data .house-show .show-items {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		margin-top: 30rpx;
	}

	.home_btn {
		position: fixed;
		right: 0;
		bottom: 100rpx;
		width: 26%;
	}

	.home_btn>image {
		width: 100%;
		height: 75rpx;
	}









	.isdirtpat,
	.isanswers,
	.ishousedata {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
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

	}

	.scroll-view {
		white-space: nowrap;
		width: 95%;
	}


	.scroll-view-item {
		display: inline-block;
		color: #606060;
		line-height: 90rpx;
		text-align: center;
		font-size: 26rpx;
		margin-left: 50rpx;

	}

	/* end */
	/* 精选换题 */
	.scroll-view-item-ht {
		background-color: #EAF9E5;
		display: inline-block;
		width: 73%;
		margin: 40rpx 20rpx;
		border-radius: 25rpx;

	}

	.scroll-view-item-ht .label {
		display: flex;
		flex-direction: row;
		justify-content: start;
		line-height: 40rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;

	}

	.scroll-view-item-ht .label>image {
		width: 40rpx;
		height: 40rpx;

	}

	.scroll-view-item-ht .label>view {
		font-size: 26rpx;
		color: #56555A;
		margin-left: 20rpx;
	}

	.scroll-view-item-ht .title {
		font-size: 34rpx;
		font-weight: 550;
		color: #383339;
		font-family: FZLanTingHei-B-GBK;
		line-height: 80rpx;
		margin-left: 30rpx;

		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.scroll-view-item-ht .prive {
		font-size: 24rpx;
		line-height: 100rpx;
		color: #757575;
		margin-left: 30rpx;
	}

	.there {
		background-color: #DEEAF6 !important;
	}

	.scroll-view-item-ht .label>image {
		color: #DEEAF6;
	}

	/* 选择框 */
	.collapses {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 2rpx solid #EEEEEE;
		/* position: fixed; */
		/* 	top: 0rpx; */
		z-index: 2;
		background-color: #FFFFFF;
		/* padding-bottom: 30rpx; */
	}

	.active {
		color: #389BFE !important;
	}

	.collapse-list {
		width: 90%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		height: 70rpx;
	}

	.collapse-list-items {
		font-size: 24rpx;
		color: #606060;
	}

	.collapse-content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	/* end */


	/* end*/

	.collapse {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-bottom: 0.5px solid #D6D6D6;
		width: 100%;
		font-size: 24rpx;
		color: #606060;
	}


	.collapse uni-collapse {
		width: 95%;
	}

	.uni-collapse.data-v-3f9b8ff2 {
		display: flex;
		flex-direction: row !important;
		justify-content: space-between !important;
	}

	.uni-collapse-cell.data-v-f446acc0 {
		border-bottom-width: 0px !important;
	}

	.uni-lists {
		text-align: center;
	}

	.uni-lists .uni-list-items {
		line-height: 70rpx;
		color: #333333;
	}

	/* end */

	/* 热门文章 */

	.audio-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
	}

	.audio_list {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		flex-wrap: wrap;
		width: 90%;
	}

	.audio-content .audio_list>view {
		width: 46%;
		margin-bottom: 50rpx
	}

	.audio-content>view .audio-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;
	}


	.audio-content>view .audio-item .img {
		width: 100%;
		height: 220rpx;
		border-radius: 10rpx;
	}

	.audio-content>view .audio-item .bofan {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		z-index: 1;
	}

	.audio-content>view .audio-item .mask {
		position: absolute;
		background-color: #000000;
		opacity: .45;
		width: 100%;
		height: 200rpx;
		border-radius: 15rpx;
	}

	.audio-content>view .name {
		width: 100%;
		font-size: 29rpx;
		color: #000000;
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	/* end */


	/* 土拍 */


	/* 楼盘列表 */

	.house-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.house-list .list-item {
		margin-top: 70rpx;
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;
	}

	.house-list .list-item .item-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.house-list .list-item .item-top .item-top-left {
		font-size: 24rpx;
		color: #9A9A9A;
	}

	.house-list .list-item .item-top .item-top-right {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		/* 	width: 30%; */
	}

	.house-list .list-item .item-top .item-top-right .zz {
		font-size: 24rpx;
		color: #389BFE;
		background-color: #F1F7FC;
		border: 1rpx solid #389BFE;
		padding: 0rpx 15rpx;
		opacity: .8;
		margin: 0rpx 10rpx;

	}

	.house-list .list-item .item-top .item-top-right .sp {
		font-size: 24rpx;
		color: #FFAB18;
		background-color: #FFF7E9;
		border: 1rpx solid #FFAB18;
		padding: 0rpx 15rpx;
		opacity: .8;
		margin: 0rpx 10rpx;
	}

	.house-list .list-item .house-address {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		font-size: 29rpx;
		margin-top: 20rpx;
		color: #000000;

	}

	.house-list .list-item .info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		margin-top: 20rpx;
	}

	.house-list .list-item .info>view {
		font-size: 24rpx;
		color: #9A9A9A;
	}

	.house-list .list-item .info>view>text {
		font-size: 27rpx;
		color: #000000;
	}

	.house-list .list-item .info>view .area {
		color: #E70000;
	}


	/* 问答区 */
	.answers {
		width: 95%;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.answers-item {
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid #D6D6D6;
		padding-bottom: 50rpx;
		margin-top: 50rpx;
	}

	.answers-item .answers-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.answers-item .answers-top .top-left {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 25%;
	}

	.answers-item .answers-top .top-left .jianju {
		background-color: #63DB4F;
		font-size: 20rpx;
		color: #FFFFFF;
		padding: 0rpx 10rpx;
	}

	.answers-item .answers-top .top-left .dk {
		background-color: #FFF0F0;
		font-size: 20rpx;
		color: #F35271;
		padding: 0rpx 10rpx;
		border: 1px solid rgba(254, 121, 149, 1);
	}

	.answers-item .answers-top .top-right {
		width: 50%;
		font-size: 24rpx;
		color: #6F6F6F;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.answers-item .answers-top .top-right .top-laber {
		background-color: #FC705F;
		font-size: 23rpx;
		font-weight: 550;
		color: #FFFFFF;
		padding: 5rpx 20rpx;

	}

	.answers-item .answers-content {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 30rpx;

	}

	.answers-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

	}

	.answers-bottom .bottom-left {
		margin-top: 30rpx;
		width: 45%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.answers-bottom .bottom-left>image {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
	}

	.answers-bottom .bottom-left .name {
		font-size: 26rpx;
		color: #2A4D9C;
	}

	.answers-bottom .bottom-left .data {
		font-size: 22rpx;
		color: #9A9A9A;
	}

	.answers-bottom .bottom-right {
		background-color: #EEF6FD;
		color: #389BFE;
		font-size: 26rpx;
		width: 25%;
		line-height: 56rpx;
		border: 1rpx solid #A9BCFD;
		text-align: center;

	}

	/* end */
	/* 底部 */
	.flex-box {
		border-top: 2rpx solid #EEEEEE;
		width: 25%;
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #389BFE;
		bottom: 150rpx;
		right: 0rpx;
		z-index: 2;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;

	}

	.flex-box .box-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-size: 30rpx;
		line-height: 65rpx;
		color: #FFFFFF;

	}

	.flex-box .box-content>image {
		width: 70rpx;
		height: 70rpx;
		color: #BFC4D9;

	}

	/* end */


	/* 区域 */
	.qu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.shangquan {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		height: 88%;
	}

	.shangquan .shangquan-title {
		font-size: 32rpx;
		color: #606060;
		width: 100%;
		margin-top: 50rpx;

	}

	.shangquan .shangquan-list {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
	}

	.shangquan .shangquan-list .shangquan-item {
		width: calc(100% / 3 - 33rpx);
		height: 80rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
		line-height: 80rpx;
		border-radius: 20rpx;
		margin: 20rpx 11rpx;
		font-size: 26rpx;

	}

	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 34rpx;
	}

	.bottom .quxiao {
		width: 40%;
		color: #717171;
		border-top: 1rpx solid #D3D3D3;

		line-height: 100rpx;
	}

	.bottom .queding {
		background-color: #38AEFE;
		color: #FFFFFF;
		line-height: 100rpx;
		width: 60%;
	}

	/* end */

	/* 分类 */

	.fl {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.fenlei {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		height: 88%;

	}

	.fenlei .fenlei-list {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;

	}

	.fenlei .fenlei-list .fenlei-item {
		width: calc(100% / 3 - 30rpx);
		height: 60rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
		line-height: 60rpx;
		border-radius: 30rpx;
		//margin-top: 30rpx;
		font-size: 26rpx;
		margin: 30rpx 10rpx;

	}

	.fenlei-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 95%;
		font-size: 34rpx;
	}

	.fenlei-bottom .quxiao {
		width: 35%;
		color: #717171;
		border: 1rpx solid #D3D3D3;

		line-height: 100rpx;
	}

	.fenlei-bottom .queding {
		background-color: #38AEFE;
		color: #FFFFFF;
		line-height: 100rpx;
		width: 55%;
	}

	/* end */

	/* 楼面价 */

	.lmj {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.loumianjia {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		height: 88%;

	}

	.loumianjia .loumianjia-list {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;

	}

	.loumianjia .loumianjia-list .loumianjia-item {
		width: 100%;
		height: 80rpx;
		border-bottom: 1rpx solid #CAD6E2;
		line-height: 80rpx;

		font-size: 24rpx;

	}

	.loumianjia-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 34rpx;
	}

	.loumianjia-bottom .quxiao {
		width: 35%;
		color: #717171;
		border: 1rpx solid #D3D3D3;

		line-height: 100rpx;
	}

	.loumianjia-bottom .queding {
		background-color: #38AEFE;
		color: #FFFFFF;
		line-height: 100rpx;
		width: 55%;
	}

	/* end */
</style>
