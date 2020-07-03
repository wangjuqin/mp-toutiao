const apiUrl = 'https://paihaofang.maijindou.cn/api.php'; //请求的地址
const uploadUrl = 'https://files-fangbashi.oss-cn-zhangjiakou.aliyuncs.com/'; //图片请求的地址
const deviceType = 'wxapp';
const sessionKey = uni.getStorageSync('sessionKey');
const con = {
	sendRequest(obj) {
		try {

			if (uni.getStorageSync('sessionKey')) {
				if (obj.header) {
					obj.header["XX-Token"] = uni.getStorageSync('sessionKey');
					obj.header["XX-Device-Type"] = deviceType;
				} else {
					obj.header = {
						"XX-Token": uni.getStorageSync('sessionKey'),
						"XX-Device-Type": deviceType
					};
				}
				obj.url = apiUrl + obj.url;
				uni.request(obj)
			} else {
				/* console.log(uni.getStorageSync('sessionKey')) */
				if (obj.header) {
					obj.header["XX-Token"] = '8e9c1a2ac4c67595';
					obj.header["XX-Device-Type"] = deviceType;
					obj.url = apiUrl + obj.url;
					uni.request(obj)
				} else {
					uni.switchTab({
						url: "/pages/myinfo/index"
					})
					/* uni.showToast({
						title:'请先登录!',
						duration:2000,
						mask:true,
						success() {
						}
					}) */
					return false
				}
			}
		} catch (e) {
			console.log(e)
			return
		}
	},
	uploadFile(obj) {
		try {
			if (uni.getStorageSync('sessionKey')) {
				if (obj.header) {
					obj.header["XX-Token"] = uni.getStorageSync('sessionKey');
					obj.header["XX-Device-Type"] = deviceType;
				} else {
					obj.header = {
						"XX-Token": uni.getStorageSync('sessionKey'),
						"XX-Device-Type": deviceType
					};
				}
				obj.url = apiUrl + obj.url;
				uni.uploadFile(obj);
			} else {
				console.log("获取不到sessionKey")
				uni.navigateTo({
					url: '../login/login'
				})
				return

			}
		} catch (e) {
			console.log(e)
			return
		}

	},

	usertype(obj) {
		this.sendRequest({
			url: '/user/Shop/isShop',
			method: 'post',
			success: function(res) {
				//1普通用户  2经纪人或置业顾问
				console.log('我的身份', res)
				var datas = res.data
				if (datas.code == 1) {
					var restun = datas.data
					if (restun == 2) {
						return restun
						console.log('我的身份2', restun)
					} else {
						uni.showToast({
							title: '没有权限',
							duration: 1500,
							success() {
								uni.switchTab({
									url: "/pages/index/index"
								})
							}
						})
						console.log('我的身份1', restun)
					}

				}

			}
		})

	},
	showModal(obj) {
		let showModal = uni.getStorageSync('showModal')
		console.log('showModal:', uni.getStorageSync('showModal'))
		if (!showModal) {
			uni.showModal({
				title: '微信授权登录小程序',
				content: '请登录再进行操作',
				confirmText: '立即登录',
				success: function(res) {
					uni.setStorageSync('showModal', '2'); //储存showModal
					if (res.confirm) {
						uni.removeStorageSync('showModal');
						uni.navigateTo({
							url: '../login/login'
						})
					} else {
						uni.removeStorageSync('showModal');
						uni.switchTab({
							url: '../index/index'
						})
					}
				}
			})
		}
	}

}
export default con;
