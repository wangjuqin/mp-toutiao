<template>

	<!-- 	<view class="centermaks">
 -->
	<view :class="[collapse?'collapse':'']">
		<view :class="[collapse?'maks':'']" @click="closemaks"></view>
		<view :class="[collapse?'maskcoll':'']">
			<view class="collapse-top">
				<view class="collapse-list">
					<!-- :class="[proper_id && a.id == 0?'active':'']" -->
					<block v-for="(a,index) in laberlist" :key="index">
						<view class="collapse-list-items" @click="opens(a.id)">

							<text v-if="proper_id && a.id == 0" class="active">{{proper_title}}</text>
							<text v-else-if="metro_id && a.id == 0" class="active">{{metro_title}}</text>
							<text v-else-if="price && a.id == 1" class="active">{{price_title}}</text>
							<text v-else-if="amount && a.id == 1" class="active">{{amount_title}}</text>
							<text v-else-if="apartment_id && a.id == 2" class="active">{{apartment_title}}</text>
							<text v-else-if="area_id && a.id == 3" class="active">{{area_title}}</text>
							<text v-else-if="renovation_id && a.id == 4" class="active">{{renovation_title}}</text>
							<!-- <text v-else-if="type_id || area_id || renovation_id  &&  a.id == 5" class="active">{{a.title}}</text> -->
							<text v-else>{{a.title}}</text>
						
							<!-- :color="[isshow == a.id?'#389BFE':'']"   :color="[proper_id && a.id == 0?'#389BFE':'']"-->
							<uni-icons type="arrowdown"></uni-icons>
						</view>
					</block>
				</view>
			</view>
			<block v-if="housesale == 1">
				<scroll-view scroll-x="true" class="table-navbar">
					<view class="table-item " @click="labersale(0,'')" :class="[salest == 0?'laberactive':'']">
						全部
					</view>
					<view class="table-item " v-for="(a,index) in Sale" :key="index" @click="labersale(a.id,a.title)" :class="[salest == a.id?'laberactive':'']">
						{{a.title}}
					</view>
				</scroll-view>


			</block>
			<!-- 区域 -->
			<block v-if="isshow==0">
				<view class="collapse-content">
					<view class="popup-top">
						<view class="top-left">
							<view @click="change(1)" :class="[activest==1?'active':'']">
								地区
							</view>
							<view @click="change(2)" :class="[activest==2?'active':'']">
								地铁
							</view>
						</view>
						<!-- 地区  v-if="activest==1"-->
						<scroll-view scroll-y="true" class="top-right">
							<view class="top-right-item" @click="catetop(0,'不限')" :class="[cates ==0?'active':'']">
								不限
							</view>
							<view class="top-right-item" @click="catetop(a.id,a.title)" v-for="(a,index) in catelist " :key="index" :class="[proper_id==a.id || metro_id == a.id ?'active':'']">
								{{a.title}}
							</view>
						</scroll-view>
					</view>
					<view class="fenlei-bottom">

						<view class="quxiao" @click="close">
							取消
						</view>
						<view class="queding" @click="confirm">
							确认
						</view>
					</view>
				</view>
			</block>
			<!-- 价格 -->
			<block v-if="isshow==1">
				<view class="collapse-content">
					<view class="popup-top">
						<view class="top-left">
							<view @click="change(3)" :class="[activest==3?'active':'']">
								单价
							</view>
							<view @click="change(4)" :class="[activest==4?'active':'']">
								总价
							</view>
						</view>
						<!-- 单价 -->
						<!-- v-if="activest==3" -->
						<scroll-view scroll-y="true" class="top-right">
							<view class="top-right-item" @click="catetop(0,'不限')" :class="[cates==0 ?'active':'']">
								不限
							</view>
							<view class="top-right-item" @click="catetop(a.id,a.title)" v-for="(a,index) in catelist" :key="index" :class="[price == a.id || amount == a.id?'active':'']">
								{{a.title}}
							</view>
						</scroll-view>

					</view>
					<view class="fenlei-bottom">

						<view class="quxiao" @click="close">
							取消
						</view>
						<view class="queding" @click="confirm">
							确认
						</view>
					</view>
				</view>
			</block>
			<!-- 户型 -->
			<block v-if="isshow==2">
				<view class="collapse-content">
					<view class="popup-top">
						<scroll-view scroll-y="true" class="door-top">
							<view class="door-list">
								<view class="door-item" @click="catetop(a.id,a.title)" v-for="(a,index) in catelist " :key="index" :class="[apartment_id==a.id?'active':'']">
									{{a.title}}
								</view>
							</view>

						</scroll-view>
					</view>
					<view class="fenlei-bottom">

						<view class="quxiao" @click="close">
							不限条件
						</view>
						<view class="queding" @click="confirm">
							确认
						</view>
					</view>
				</view>
			</block>
			<!-- 面积 -->
			<block v-if="isshow==3">
				<view class="collapse-content">
					<view class="popup-top">
						<scroll-view scroll-y="true" class="door-top">
							<view class="door-list">
								<view class="door-item" @click="catetop(a.id,a.title)" v-for="(a,index) in catelist" :key="index" :class="[area_id == a.id?'active':'']">
									{{a.title}}㎡
								</view>
							</view>

						</scroll-view>
					</view>
					<view class="fenlei-bottom">

						<view class="quxiao" @click="close">
							不限条件
						</view>
						<view class="queding" @click="close">
							确认
						</view>
					</view>
				</view>
			</block>
			<!-- 装修 -->
			<block v-if="isshow==4">
				<view class="collapse-content">
					<view class="popup-top">
						<scroll-view scroll-y="true" class="door-top">
							<view class="door-list">
								<view class="door-item" @click="catetop(a.id,a.title)" v-for="(a,index) in catelist " :key="index" :class="[renovation_id==a.id?'active':'']">
									{{a.title}}
								</view>
							</view>

						</scroll-view>
					</view>
					<view class="fenlei-bottom">

						<view class="quxiao" @click="close">
							不限条件
						</view>
						<view class="queding" @click="confirm">
							确认
						</view>
					</view>
				</view>
			</block>
			<block v-if="isshow==5">
				<!-- 筛选-->
				<view class="collapse-content">
					<view class="popup-top">
						<scroll-view scroll-y="true" class="door-top">
							<view class="screen">
								面积
							</view>

							<view class="door-list">

								<view class="door-item" @click="catestop('area_id',a.id)" v-for="(a,index) in Area " :key="index" :class="[area_id == a.id?'active':'']">
									{{a.title}}㎡
								</view>

							</view>
							<view class="screen">
								类型
							</view>

							<view class="door-list">

								<view class="door-item" @click="catestop('type_id',a.id)" v-for="(a,index) in housetype" :key="index" :class="[type_id == a.id?'active':'']">
									{{a.title}}
								</view>

							</view>
							<view class="screen">
								装修
							</view>

							<view class="door-list">

								<view class="door-item" @click="catestop('renovation_id',a.id)" v-for="(a,index) in Renovation " :key="index"
								 :class="[renovation_id==a.id?'active':'']">
									{{a.title}}
								</view>

							</view>

						</scroll-view>

					</view>
					<view class="fenlei-bottom">
						<view class="quxiao" @click="close">
							不限条件
						</view>
						<view class="queding" @click="confirm">
							确认
						</view>
					</view>
				</view>


			</block>
		</view>
	</view>
	<!-- </view> -->
</template>

<script>
	import utils from '@/common/utils.filter.js'
	import con from '@/common/config.js'

	export default {
		props: {
			/* 	isshow: {
					type: Number,
					default: 4
				}, */
			housesale: {
				type: Number,
				default: 1
			},

			laberlist: {

			},

			seektype: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				utils: utils,
				cates: '',
				Region: [], //区域
				AllPrice: [], //总价
				Price: [], //单价
				Apartment: [], //户型
				Area: [], //面积
				Renovation: [], //装修
				housetype: [], //类型
				Sale: [], //销售情况
				activest: 3,
				isshow: 6,
				salest: '',
				catelist: [],
				proper_title: '',
				metro_title:'',
				area_title:'',
				renovation_title:'',
				price_title:'',
				amount_title:'',
				apartment_title:'',
				proper_id: '',	
				metro_id: '',
				area_id: '',
				type_id: '',
				renovation_id: '',
				sale_id: '',
				price: '',
				amount: '',
				apartment_id: '',
				collapse: '',

			};
		},

		onReady() {
			let _seft = this
			console.log('isshow', _seft.isshow)

			//销售情况
			con.sendRequest({
				url: '/home/Region/getSale',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Sale = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})
			//区域
			con.sendRequest({
				url: '/home/region/getNewProper',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Region = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			}) //地铁
			con.sendRequest({
				url: '/home/Region/getMetro',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Metro = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			}) //单价
			con.sendRequest({
				url: '/home/Region/getPrice',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {

						var restun = datas.data
						console.log('单价', restun)
						_seft.Price = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})
			//总价
			con.sendRequest({
				url: '/home/Region/getAllPrice',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						console.log('总价', restun)
						_seft.AllPrice = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})
			//户型
			con.sendRequest({
				url: '/home/Region/getApartment',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Apartment = restun
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
			})
			//面积
			con.sendRequest({
				url: '/home/region/getArea',
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

			//装修
			con.sendRequest({
				url: '/home/Region/getRenovation',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Renovation = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			})


		},


		methods: {
			opens(res) {
				let _seft = this
				_seft.isshow = res
				_seft.collapse = 'collapse'
				switch (res) {
					case 0:
						_seft.catelist = _seft.Region
						this.activest = 1;
						break;
					case 1:
						_seft.catelist = _seft.Price
						this.activest = 3;
						break;
					case 2:
						_seft.catelist = _seft.Apartment
						break;
					case 3:
						_seft.catelist = _seft.Area
						break;
					case 4:
						_seft.catelist = _seft.Renovation
						break;

				}
				//console.log('ishow',res ,_seft.catelist)
			},
			catetop(index,title) {
				let _seft = this
				_seft.cates = index
				let res = _seft.isshow
				let act = _seft.activest
				let catedata = {}
				console.log('_seft.isshow',res)
				switch (res) {
					case 0:
						if (act == 1){
							_seft.proper_id = index
							_seft.proper_title = title
						} 
						if (act == 2){
						 _seft.metro_id = index	
						 _seft.metro_title = title
						}
						break;
					case 1:
						if (act == 3){
							_seft.price_title = title 
							_seft.price = index
						}
						if (act == 4){
						_seft.amount_title = title
						 _seft.amount = index	
						}
						break;
					case 2:
						_seft.apartment_id = index
						_seft.apartment_title = title
						break;
					case 3:
						_seft.area_id = index
						_seft.area_title = title
						break;
					case 4:
						_seft.renovation_id = index
						_seft.renovation_title = title
						break;
				}
				console.log('apartment_id',_seft.apartment_id,'amount',_seft.amount,'price',_seft.price)

			},
			confirm() {
				let _seft = this
				_seft.collapse = ''
				_seft.isshow = 'false'
				let restun = []
				restun['proper_id'] = _seft.proper_id
				restun['metro_id'] = _seft.metro_id
				restun['price'] = _seft.price
				restun['amount'] = _seft.amount
				restun['apartment_id'] = _seft.apartment_id
				restun['area_id'] = _seft.area_id
				restun['renovation_id'] = _seft.renovation_id
				restun['sale_id'] = _seft.sale_id
				restun['type_id'] = _seft.type_id
				_seft.$emit("send", restun)
			},
			close() {
				let _seft = this
				//_seft.collapse = ''
				//_seft.isshow = 'false'
				if (_seft.isshow == 0) {
					_seft.metro_id = 0
					_seft.proper_id = 0
				}
				if (_seft.isshow == 1) {
					_seft.price = 0
					_seft.amount = 0
				}
				if (_seft.isshow == 2) _seft.apartment_id = 0
				if (_seft.isshow == 3) _seft.area_id = 0
				if (_seft.isshow == 4) _seft.renovation_id = 0
				if (_seft.isshow == 5) {
					//_seft.sale_id = 0
					_seft.renovation_id = 0
					_seft.type_id = 0
					_seft.area_id = 0
				}
			},
			catestop(res, index) {
				let _seft = this
				switch (res) {
					case 'area_id':
						_seft.area_id = index
						break;
					case 'type_id':
						_seft.type_id = index
						break;
					case 'renovation_id':
						_seft.renovation_id = index
						break;
				}

			},
			labersale(res,title) {
				let _seft = this
				_seft.collapse = ''
				_seft.isshow = 'false'
				_seft.salest = res
				_seft.sale_id = title
				let restun = []
				restun['proper_id'] = _seft.proper_id
				restun['metro_id'] = _seft.metro_id
				restun['price'] = _seft.price
				restun['amount'] = _seft.amount
				restun['apartment_id'] = _seft.apartment_id
				restun['area_id'] = _seft.area_id
				restun['renovation_id'] = _seft.renovation_id
				restun['sale_id'] = _seft.sale_id
				restun['type_id'] = _seft.type_id
				_seft.$emit("send", restun)
				
				
				
			},
			change(index) {
				let _seft = this
				this.activest = index;
				switch (index) {
					case 1:
						_seft.catelist = _seft.Region
						break;
					case 2:
						_seft.catelist = _seft.Metro
						break;
					case 3:
						_seft.catelist = _seft.Price
						break;
					case 4:
						_seft.catelist = _seft.AllPrice
						break;
				}
			},
			closemaks() {
				let _seft = this
				_seft.collapse = ''
				this.isshow = 'false'
			},

		}
	}
</script>

<style>
	.active {
		color: #389BFE !important;
		background-color: #EEF6FE !important;
		
		
	}

	.centermaks {
		position: relative;
		/* 	top: 0;
		right: 0;
		left: 0;
		bottom: 0; */
		/* display: flex; */
		/* display: flex; */
		/* flex-direction: column;
		justify-content: center;
		align-items: center; */
		width: 100%;
	}

	.maskcoll {
		position: fixed;
		width: 100%;
		z-index: 9999;
		top: 0;
	}

	.laber-list {
		width: 95%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		/* 	position: fixed; */
		z-index: 2;
		background-color: #FFFFFF;
		/* 	top: 70rpx; */
		font-size: 29rpx;

	}

	.laber-list .labar-item {
		background: #F2F2F2;
		border: 1px solid #CAD6E2;
		width: 25%;
		line-height: 55rpx;
		border-radius: 50rpx;
		margin-top: 30rpx;
	}

	.laberactive {
		background-color: #EEF6FE !important;
		color: #389BFE;
	}

	/* 选择框 */
	.collapse {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1rpx solid #EEEEEE;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 99999;
		background-color: #FFFFFF;
		/* padding-bottom: 30rpx; */
		position: relative;
	}



	.collapse-top {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #EEF6FE;
		z-index: 9999;
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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: break-all;
	}

	.collapse-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		z-index: 9999;
		padding-top: 30rpx;
	}

	/* end */
	/* 弹框内容 */
	.popup-top {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		height: 700rpx;
		font-size: 29rpx;
		color: #3B383B;

	}

	.popup-top .door-top .screen {
		width: 100%;
		margin-top: 30rpx;
		font-size: 34rpx;
		font-weight: bold;
		margin-left: 5%;


	}

	.popup-top .top-left {
		background-color: #F7F4F8;
		width: 25%;
		height: 100%;
		text-align: center;

	}

	.popup-top .top-left>view {
		line-height: 100rpx;
	}

	.popup-top .top-right {
		display: flex;
		flex-direction: column;
		margin-left: 40rpx;
		width: 70%;
		height: 100%;


	}

	.popup-top .top-right .top-right-item {
		line-height: 100rpx;
	}

	.popup-top .door-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		align-items: center;
		justify-content: start;
		text-align: center;
	}

	.popup-top .door-list .door-item {
		background: #F2F2F2;
		border: 1px solid #CAD6E2;
		width: calc(100% / 3 - 33rpx);
		line-height: 70rpx;
		border-radius: 15rpx;
		margin-top: 30rpx;
		margin: 20rpx 11rpx;


	}


	.fenlei-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
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
		width: 70%;
	}

	.fenlei-bottom .input-price {
		font-size: 30rpx;
		color: #312F32;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;

	}

	/* end */


	/* tabel标签 */


	.table-navbar {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		padding: 40rpx 0rpx;
		white-space: nowrap;
		z-index: 999999;
		background-color: #F2F2F2;

	}

	.table-navbar .table-item {
		display: inline-block;
		font-size: 26rpx;
		width: 160rpx;
		height: 60rpx;
		border-radius: 10rpx;
		line-height: 60rpx;
		margin: 0rpx 15rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
	}



	.maks {
		position: fixed;
		/* filter: alpha(opacity=40); */
		background-color: #000000;
		opacity: .45;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		border-radius: 15rpx;
		z-index: 1;
	}
</style>
