<template>
	<view class="uni">
		<!-- 顾问信息 -->
		<view class="advise"  v-for="(a,index) in Shops"  :key="index">
			<view class="item">
				<view class="left" @click="detailstop(a.id)">
					<image  :src="a.avatar"></image>
					<view class="uname">{{a.user_nickname}}</view>
				</view>
			<!-- 	<view class="conter"  @click="detailstop(a.id)">
						<view class="uname">{{a.user_nickname}}</view>
						
				</view> -->
				<view class="right">
						<image src="../../static/MSG.png"  @click="seekTop(a.id)"></image>
						
						<image src="../../static/tel.png" @click="makePhone(a.phone)"></image>
				</view>
			</view>
			<view class="bottom" @click="detailstop(a.id)">
				<view class="preview"><text>{{a.click}}</text> 浏览量 </view>
				<view class="activity"> <text> {{a.activity}}</text> 活跃度</view>
				<view class="likes"> <text>{{a.likes}}</text> 点赞数</view>
		                  
			</view>
		</view>
		
		<!-- end -->
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		data() {
			return {
				title: 'Hello',
				utils: utils,
				Shops: [],
				Shop2: [],
			}
		},
		onLoad(e) {
			let _seft = this 
			let  type= e.type?e.type:1
			if(e.type == 2){
				uni.setNavigationBarTitle({
				    title: '金牌置业顾问'
				});
				
			}else{
				uni.setNavigationBarTitle({
				    title: '金牌咨询师'
				});
			}
			
			console.log(type)
			//咨询师
			con.sendRequest({
				url: '/home/Shop/getIndexShop', ///home/Shop/getIndexShop
				method: 'get',
				data: {
					type:type,
					is_all:0
				},
				success: function(res) {
					console.log('咨询师ddd', res)
					var datas = res.data
					if (datas.code == 1) {
						var restun = datas.data
						_seft.Shops = restun
						
					}
				}
			
			})

		},
		methods: {
			makePhone(phone){
				uni.makePhoneCall({
				    phoneNumber: phone ,
					success(res) {
						console.log('拨打成功')
						
					}
				});
			},
			detailstop(index){
				uni.navigateTo({
					url:'../consultants/details?id='+index
				})
				
			},
			seekTop(index){
				uni.navigateTo({
					url:"../message/details?id="+index
				})
			
				
			}

		}
	}
</script>

<style>
	/* 顾问信息 */
	.uni {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding-bottom: 200rpx;
	}

	.advise {
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 95%;
		border-radius: 15rpx;
		margin: 20rpx 0rpx;
		border: 1rpx  solid #EEEEEE;
		border-top: 0rpx;
		box-shadow: 4rpx 4rpx 0px rgba(0, 0, 0, 0.1)


	}

	.advise .item {
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* align-items: center; */
		/* text-align: center; */
		/* height: 200rpx; */
		margin-item: 30rpx;
		width: 100%;

	}

	.item .left {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 70%;
		height: 100%;
	}

	.item .left image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	
.item .conter{
	
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	height: 100%;
	
}
.item  .left .uname{
	font-size: 35rpx;
	
	margin-left: 10rpx;
	
}
.item  .conter .address{
	margin-top: 10rpx;
	font-size: 28rpx;
	color: #7784B3;
		width: 100%;
}


.item .right{
	
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
/* 	width: 25%; */
	/* width: 30%;
	line-height: 70rpx; */
}
.item .right image {
	width: 80rpx;
	height: 80rpx;
	/* background-color: #EEF6FE; */
	border-radius: 50%;
	padding: 15rpx;

	}

	.item .right  .icon image {
	
	}

	.advise .bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		color: #7784B3;
		opacity: .7;
		font-size: 24rpx;
		width: 100%;
		margin-bottom: 30rpx;
		margin-top: 20rpx;
	}

	.advise .bottom text {
		color: #7784B3;
	}

	
	/* end */
	
</style>
