<template>
	<view class="content">
		<view class="top-title">
			<view class="">
				定制需求
			</view>
			<view class="">
				我们将为您找到满意的房子
			</view>
		</view>

		<view class="laber-title">您的预算是多少？</view>
		<view class="select-item" @click="pricetop">
			<view class="select-left">
				<image src="../../static/RMB.png" mode=""></image>
				<view class="">
					{{pricetitle?pricetitle:'不限'}}
				</view>
			</view>
			<input class="select-center" disabled="disabled" type="text" value="" />
			<image class="select-right" src="../../static/jkh-r.png" mode=""></image>
		</view>

		<view class="laber-title">您的想买的区域是？</view>
		<view class="select-item" @click="regiontop">
			<view class="select-left">
				<image src="../../static/RMB.png" mode=""></image>
				<view class="">
					{{regiontitle?regiontitle:'不限'}}
				</view>
			</view>
			<input class="select-center" disabled="disabled" type="text" value="" />
			<image class="select-right" src="../../static/jkh-r.png" mode=""></image>

		</view>
		<view class="laber-title">您的想买什么户型？</view>
		<view class="select-laber">
			<view class="laber-item" @click="doors(a.id,a.title)" v-for="(a,indexs) in Apartment " :key="indexs" :class="[doorst == a.id?'active':'']">
				{{a.title}}
			</view>
		</view>
		<view class="laber-title">您想买哪些面积段？</view>
		<view class="select-laber">
			<view class="laber-item" @click="proportions(a.id,a.title)" v-for="(a,indexs) in Area " :key="indexs" :class="[areast == a.id?'active':'']">
				{{a.title}}
			</view>
		</view>
		<view class="laber-title">您的联系方式？</view>
		<view class="select-item">
			<input class="select-center select-user" type="number" maxlength="11" value="" @input="selectPhoneTap" />
		</view>
		<view class="laber-title">您的联系姓名？</view>
		<view class="select-item">
			<input class="select-center select-user" type="text" maxlength="20" value="" @input="selectUserTap" />
		</view>
		<button class="hose-sumbilt" form-type="submit" @click="submitTop()">提交</button>



		<uni-popup class="region" custom-class="demo-popup" ref="popups" type="top" maskClick="false">
			<view class="popup-top">
				<view class="top-left">
					<view @click="change(1)" :class="[current ==1?'active':'']">
						地区
					</view>
					<view @click="change(2)" :class="[current==2?'active':'']">
						地铁
					</view>
				</view>
				<scroll-view scroll-y="true" class="shangquan" v-if="current ==1">


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

				<scroll-view scroll-y="true" class="shangquan" v-if="current==2">

					<view class="shangquan-list">
						<view class="shangquan-item" @click="top(2,'','不限')" :class="[metrost==''?'active':'']">
							不限
						</view>
						<view class="shangquan-item" @click="top(2,a.id,a.title)" v-for="(a,index) in Metro " :key="index" :class="[metrost==a.id?'active':'']">
							{{a.title}}
						</view>
					</view>

				</scroll-view>

			</view>
			<view class="fenlei-bottom">
				<view class="quxiao" @click="close">
					重置
				</view>
				<view class="queding" @click="confirm">
					确认
				</view>
			</view>
		</uni-popup>

		<uni-popup class="price" custom-class="demo-popup" ref="popup" type="top" maskClick="false">
			<view class="popup-top">
				<view class="top-left">
					<view @click="change(3)" :class="[current ==3?'active':'']">
						单价
					</view>
					<view @click="change(4)" :class="[current==4?'active':'']">
						总价
					</view>
				</view>
				<!-- 单价 -->
				<scroll-view scroll-y="true" class="top-right" v-if="current ==3">
					<view class="top-right-item" @click="top(3,'','不限')" :class="[pricest==''?'active':'']">
						不限
					</view>
					<view class="top-right-item" @click="top(3,a.id,a.title)" v-for="(a,index) in Price " :key="index" :class="[pricest==a.id?'active':'']">
						{{a.title}}
					</view>
				</scroll-view>
				<!-- 总价 -->
				<scroll-view scroll-y="true" class="top-right" v-if="current==4">
					<view class="top-right-item" @click="top(4,'','不限')" :class="[allpricest==''?'active':'']">
						不限
					</view>
					<view class="top-right-item" @click="top(4,a.id,a.title)" v-for="(a,index) in AllPrice " :key="index" :class="[allpricest==a.id?'active':'']">
						{{a.title}}
					</view>
				</scroll-view>
			</view>
			<view class="fenlei-bottom">
				<view class="quxiao" @click="close">
					重置
				</view>
				<view class="queding" @click="confirm">
					确认
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import con from '@/common/config.js'
	export default {
		data() {
			return {
				title: 'Hello',
				price: false,
				current: 0,
				currentst: 0,
				Region: [],
				Metro: [],
				AllPrice: [],
				Price: [],
				Apartment: [], //户型
				Area: [], //面积
				regionst: '',
				metrost: '',
				pricest: '',
				allpricest: '',
				doorst: '',
				areast: '',
				limits: 5,
				pages: 1,
				pricetitle: '',
				regiontitle: '',
				doortitle: '',
				areatitle: '',
				name: '',
				phone: '',

			}
		},
		onLoad() {


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
			//地铁
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
						_seft.Price = restun
					}
				},
				fail: function(res) {
					console.log('fail', res)
				}
			}) //总价
			con.sendRequest({
				url: '/home/Region/getAllPrice',
				method: 'GET',
				success: function(res) {
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
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

		},
		methods: {

			submitTop() {
				let _seft = this
				//'&proper_id=' + _seft.regionst + '&metro_id=' + _seft.metrost + '&price=' + _seft.pricest + '&amount=' +
				//	_seft.allpricest + '&apartment_id=' + _seft.doorst + '&area_id=' + _seft.areast
				/* var data = ''
				if (_seft.regionst) {
					data += '&regionst=' + _seft.regionst
				}
				if (_seft.metrost) {
					
					data += '&metro_id=' + _seft.metrost
				}
				if (_seft.pricest) {
					
					data += '&price=' + _seft.pricest
				}
				if (_seft.allpricest) {
					
					data += '&amount=' + _seft.allpricest
				}
				if (_seft.doorst) {
					
					data += '&apartment_id=' + _seft.doorst
				}
				if (_seft.doorst) {
					
					data += '&area_id=' + _seft.areast
				} */
				if (!_seft.pricetitle) {
					uni.showToast({
						title: '请选择您的预算',
						icon: "none",
						duration: 1500,
					})
					return false
				}
				if (!_seft.regiontitle) {
					uni.showToast({
						title: '请选择您的区域',
						icon: "none",
						duration: 1500,
					})
					return false
				}
				if (!_seft.doortitle) {
					uni.showToast({
						title: '请选择您的户型',
						icon: "none",
						duration: 1500,
					})
					return false
				}
				if (!_seft.areatitle) {
					uni.showToast({
						title: '请选择您的面积',
						icon: "none",
						duration: 1500,
					})
					return false
				}
				if (!_seft.phone) {
					uni.showToast({
						title: '请输入您的联系方式',
						icon: "none",
						duration: 1500,
					})
					return false
				}
				if (!_seft.name) {
					uni.showToast({
						title: '请输入您的姓名',
						icon: "none",
						duration: 1500,
					})
					return false
				}
				let data = {
					phone: _seft.phone,
					username: _seft.name,
					address: _seft.regiontitle,
					amount: _seft.pricetitle,
					apartment: _seft.doortitle,
					area: _seft.areatitle
				}
				uni.showLoading({
					title: '正在提交',
					mask:true
				})
				con.sendRequest({
					url: '/home/index/post_help',
					method: 'POST',
					data: data,
					success: function(res) {
						uni.hideLoading()
						var datas = res.data
						if (datas.code == 1) {
							uni.showModal({
								title: '定制需求',
								content: '您已成功提交需求',
								success: function() {
									uni.switchTab({
										url: "../index/index"
									})
								}
							})
						} else {
							uni.showToast({
								title: datas.msg,
								icon: "none",
								duration: 2000
							})
						}


					},
					fail: function(res) {
						console.log('fail', res)
					}
				})

				/* 	uni.navigateTo({
						url: "./houselist?"+data
					}) */
				//console.log(restun)
			},
			confirm() {
				let _seft = this

				_seft.$refs.popup.close()
				_seft.$refs.popups.close()

			},
			close() {
				let _seft = this
				_seft.metrost = 0
				_seft.regionst = 0
				_seft.pricest = 0
				_seft.allpricest = 0
				_seft.regiontitle = ""
				_seft.pricetitle = ""

				_seft.$refs.popup.close()
				_seft.$refs.popups.close()
			},
			change(index) {
				this.current = index;
			},

			top(item, index, title) {
				let _seft = this
				switch (item) {
					case 1:
						this.regionst = index
						_seft.regiontitle = title
						break;
					case 2:
						this.metrost = index
						_seft.regiontitle = title
						break;
					case 3:
						this.pricest = index
						_seft.pricetitle = title
						break;
					case 4:
						this.allpricest = index
						_seft.pricetitle = title
						break;
				}


			},
			doors(index, title) {
				this.doorst = index;
				this.doortitle = title
			},
			proportions(index, title) {
				this.areast = index
				this.areatitle = title
			},
			pricetop() {
				this.$refs.popup.open()
				this.current = 3

			},
			regiontop() {
				this.$refs.popups.open()
				this.current = 1
			},
			selectPhoneTap(e) {
				this.phone = e.detail.value
			},
			selectUserTap(e) {
				this.name = e.detail.value

			},
			/* 	houselists(datas) {
						let _seft = this
						let houselist = _seft.listHouse
						datas['limit'] = _seft.limits
						datas['p'] = _seft.pages
						uni.showLoading({
							title: '加载中'
							mask:true
						})
						//列表
						con.sendRequest({
							url: '/home/properties/getList',
							method: 'get',
							data: datas,
							success: function(res) {
								uni.hideLoading()
								var datas = res.data
								console.log('xiayiye', datas)
								if (datas.code == 1) {
									var restuns = datas.data
									if (houselist) {
										var dd = houselist.concat(restuns)
									} else {
										var dd = restuns
									}
			
									console.log(_seft.pages, dd, restuns)
									// return
			
									_seft.listHouse = dd
								}
							}
						})
					},
				
			*/

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

	/* 弹框内容 */
	.s-popup-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.popup-top {
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		height: 700rpx;
		font-size: 29rpx;
		color: #3B383B;
		background-color: #FFFF;

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

	.active {
		color: #389BFE !important;
		background-color: #EEF6FE !important;
	}

	/* end */


	.top-title {
		color: #FFFFFF;
		background-color: #389BFE;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding-bottom: 50rpx;

	}

	.top-title>view:nth-of-type(1) {
		font-size: 44rpx;
		margin-top: 20rpx;
		font-weight: 550;
	}

	.top-title>view:nth-of-type(2) {
		font-size: 30rpx;
		margin-top: 20rpx;
	}

	.laber-title {
		color: #606060;
		font-size: 32rpx;
		width: 95%;
		margin-top: 50rpx;
	}

	.select-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		width: 95%;
		font-size: 30rpx;
		background-color: #F2F2F2;
		height: 90rpx;
		border-radius: 15rpx;
		margin-top: 30rpx;
	}

	.select-item .select-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		text-align: center;
	}

	.select-item .select-center {
		width: 50%;
	}

	.select-item .select-user {
		width: 85% !important;
	}

	.select-item .select-left>image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.select-item .select-right {
		width: 30rpx;
		height: 30rpx;
	}

	.select-laber {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		flex-wrap: wrap;
		text-align: center;
		width: 95%;
	}

	.select-laber .laber-item {

		font-size: 29rpx;
		width: calc(100% / 3 - 30rpx);
		margin: 20rpx 15rpx;
		line-height: 90rpx;
		background-color: #F2F2F2;
		border-radius: 15rpx;
	}

	.hose-sumbilt {
		margin-top: 80rpx;
		background: #389BFE;
		border: 1px solid rgba(56, 155, 254, 1);
		color: #FFFFFF;
		font-size: 40rpx;
		color: #FFFFFF;
		background-color: #389BFE;

		width: 95%;
	}

	/* 分类 */



	.fenlei {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		height: 800rpx;
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
		width: 23%;
		height: 60rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
		line-height: 60rpx;
		border-radius: 20rpx;
		margin-top: 30rpx;
		font-size: 26rpx;
		margin: 30rpx 10rpx 0rpx 10rpx;

	}

	.fenlei-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 34rpx;
		background-color: #FFFF;
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

	/* 商圈 */
	.shangquan {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		margin-left: 20rpx;
		height: 100%;


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
		width: calc(100% / 3 - 30rpx);
		margin: 20rpx 14rpx;
		background-color: #F2F2F2;
		border: 1rpx solid #CAD6E2;
		text-align: center;
		line-height: 70rpx;
		border-radius: 15rpx;
		font-size: 26rpx;

	}

	/* end */
</style>
