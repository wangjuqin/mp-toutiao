<template>
	<view class="content">

		
		<view class="houser-comment" >
			<view class="comment-item" v-if="evaluate.length > 0" v-for="(a,index) in evaluate" :key="index">
				<view class="comment">
					<view class="title">
						{{a.content}}
					</view>
					<view class="data">
						<!-- <view class="">
							看房客户：U**2
						</view> -->
						<view class="">
							{{utils.timeTodate('Y-m-d',a.create_time*1000)}}
						</view>
		
					</view>
				</view>
		
		
			</view>
			<view class="comment-item" v-else >
				暂无评论
			</view>
		
		
		</view>
		
		<view class="question">
			<navigator hover-class="none" class="question-btn"  :url="'../comment_house/index?id='+houseid">
				我要点评
			</navigator>
		</view>
	</view>




</template>

<script>
	
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js';
	export default {

		data() {
			return {
				title: 'Hello',
				utils:utils,
				
				limit:15,
				pages:1,
				houseid :'',
				evaluate:[],
				
				

			}
		},
		onLoad(e) {
			let _seft  = this
			_seft.houseid= e.id
			_seft.commenttop()
			
	

		},

		onUnload(){
			let _seft  = this
			uni.navigateTo({
				url:'../newshouse_details/index?id='+_seft.houseid
			})
			
		},
	
		onReachBottom() {
			let _seft  = this
			_seft.pages++
			_seft.commenttop()
			
		},
		methods: {
			
			commenttop(){
				let _seft  = this
				con.sendRequest({
					url: '/home/shooting/commentList',
					method: 'get',
					data: {
						id: _seft.houseid,
						type:1,
						limit: _seft.limit,
						p:_seft.pages,
						
					},
					success: function(res) {
						var datas = res.data
						console.log('评论', datas)
						
						if (datas.code == 1) {
							var restun = datas.data
							if(_seft.evaluate.length == 0){
								_seft.evaluate = restun
							}else{
								_seft.evaluate = _seft.evaluate.concat(restun)
							}
							
				
						}
					}
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

	/* 用户评论 */
	.houser-comment {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		width: 95%;
		/* border-bottom: 1rpx solid #C3C4CF; */
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

	.question {
		display: flex;
		position: fixed;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		bottom: 50rpx;
		align-items: center;
		text-align: center;

	}

	.question .question-btn {
		width: 45%;
		background-color: #FF7546;
		font-size: 36rpx;
		line-height: 90rpx;
		color: #FFFFFF;
		border-radius: 50rpx;

	}

	/* end */
</style>
