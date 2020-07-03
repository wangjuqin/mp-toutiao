<template>
	<view class="contens">
		<view class="advise">
			<view class="comment-list">
				<view class="comment-item" v-for="(a,index) in commentlist" :key="index">
					<view class="com-user">
						<image :src="a.avatar" mode=""></image>
						<view class="">

							{{a.user_nickname}}

						</view>

					</view>
					<view class="com-content" @click="commtop(index,a.id,a.user_id)">
						<text v-if="a.comment_user_nickname">回复: {{a.comment_user_nickname}}</text>
						<rich-text :nodes="a.content"></rich-text>
					</view>
					<!-- @click="commentTop(index,a.id)" -->
					<view class="answers">
						<text>{{utils.timeTodate('m-d',a.create_time*1000)}}</text>
						<!-- <text class="comm-count" @click="commentTop(index,a.id)" v-if="a.count">{{a.count}}条回复</text> -->
					</view>
					<!-- 	<my-menutree v-if="a.node.length > 0" :pindex="pindex" :commentlist='a.node'></my-menutree> -->
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import con from '@/common/config.js'
	import utils from '@/common/utils.filter.js'
	export default {
		props: {
			commentlist: {

			},
			pindex: {
				type: Number,
				default: 0
			},
			pid: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				utils: utils,
			}
		},

		onReady() {

		},


		methods: {
			commtop(index, id, uid) {
				let _seft = this
				console.log(index, id, uid, _seft.pid)

				let res = []
				res['index'] = index
				res['pindex'] = _seft.pindex
				res['id'] = id
				res['pid'] = _seft.pid
				res['uid'] = uid
				_seft.$emit("send", res)
			},


		}


	}
</script>

<style>
	.contens {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;

	}

	.advise {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 15rpx;
		margin: 10rpx 0rpx;
	}

	.comment-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.comment-item {
		margin: 15rpx 0;
		width: 100%;
	}

	.comment-item .com-user {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		width: 100%;
		font-size: 24rpx;
		color: #6E707A;

	}

	.comment-item .com-user>image {
		width: 45rpx;
		height: 45rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.comment-item .com-content {
		display: flex;
		flex-direction: row;
		justify-content: start;
		/* align-items: center; */
		margin-top: 15rpx;
		margin-left: 50rpx;
		font-size: 26rpx;
		word-wrap: break-word;
		word-break: normal;
		/* white-space: pre-wrap; */

	}

	.comment-item .com-content>text {
		margin-right: 15rpx;
		font-size: 24rpx;
		color: #5E5E5E;

	}

	.comment-item .answers {
		margin-left: 50rpx;
		margin-top: 15rpx;
		font-size: 24rpx;
		color: #6E707A;
	}

	.comment-item .answers .comm-count {
		margin-left: 20rpx;

	}
</style>
