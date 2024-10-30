<template>
	<view class="container">
		<view class="top">
			<image src="../static/login/login.png" mode="widthFix" style="width: 100%;"></image>
			<text class="title">助学系统</text>
		</view>
		<view class="box">
			<view class="main">
				<view class="box2">
					<view :class="navId=='login'?'active':'unactive'" @click="itemclick('login')">登录
						<view class="line" v-show="navId=='login'">
							<view class="y"></view>
						</view>
					</view>
					<view :class="navId=='register'?'active':'unactive'" @click="itemclick('register')">注册
						<view class="line" v-show="navId=='register'">
							<view class="y"></view>
						</view>
					</view>
				</view>

				<!-- 登录 -->
				<view class="box3" v-show="navId=='login'">
					<view class="items">
						<uni-icons type="person" size="20" style="margin-right:16rpx ;color: #C7D4DD;"></uni-icons>
						<input class="uni-input" focus placeholder="请输入电话号码" v-model="submitParams.username" />
					</view>
					<view class="items" style="margin-top: 30rpx;justify-content: space-between;">
						<view class="" style="display: flex;justify-content: center;">
							<image src="../static/login/lock.png" mode="widthFix"
								style="width: 40rpx;margin-right:16rpx ;"></image>
							<input class="uni-input" type="password" placeholder="请输入密码"
								v-model="submitParams.password">
						</view>
					</view>
					<view class="" style="position: relative;left: 0;top: 0;" @click="login()">
						<image src="../static/login/submit1.png" mode="widthFix"
							style="width: 350rpx;margin-top: 40rpx;"></image>
						<text class="submitValue">确认</text>
					</view>
					<view class=""
						style="width: 100%;text-align: center;font-size: 24rpx;line-height: 33rpx;margin-top: 300rpx;">
						登录即同意 <text style="color: #1C85C8;"> <text @click="showUserAgreement">用户协议</text>、<text
								@click="showPrivacyPolicy">隐私协议</text></text>
					</view>
				</view>

				<!-- 注册 -->
				<view class="box3" v-show="navId=='register'">
					<view class="items">
						<uni-icons type="person" size="20" style="margin-right:16rpx ;color: #C7D4DD;"></uni-icons>
						<input class="uni-input" placeholder="请输入电话号码" v-model="registerParams.username"
							@input="checkPhone" />
					</view>
					<view class="items" style="margin-top: 30rpx;justify-content: space-between;">
						<view class="" style="display: flex;justify-content: center;">
							<image src="../static/login/lock.png" mode="widthFix"
								style="width: 40rpx;margin-right:16rpx ;"></image>
							<input class="uni-input" type="password" placeholder="请输入密码"
								v-model="registerParams.password">
						</view>
					</view>
					<view class="items" style="margin-top: 30rpx;justify-content: space-between;">
						<view class="" style="display: flex;justify-content: center;">
							<image src="../static/login/lock.png" mode="widthFix"
								style="width: 40rpx;margin-right:16rpx ;"></image>
							<input class="uni-input" type="password" placeholder="请再次输入密码"
								v-model="registerParams.confirmPassword">
						</view>
					</view>
					<view class="items" style="margin-top: 30rpx;justify-content: space-between;">
						<view class="" style="display: flex;justify-content: center;">
							<image src="../static/login/lock.png" mode="widthFix"
								style="width: 40rpx;margin-right:16rpx ;"></image>
							<input class="uni-input input2" placeholder="请输入短信验证码" v-model="registerParams.smsCode"
								:disabled="!canInputYZM" />
						</view>
						<view class="yzm" @click="getYZM(yanzhengma)" :class="{ disabled: !canGetYZM }">{{yanzhengma}}
						</view>
					</view>
					<view class="" style="position: relative;left: 0;top: 0;" @click="register()">
						<image src="../static/login/submit1.png" mode="widthFix"
							style="width: 350rpx; margin-top: 40rpx;"></image>
						<text class="submitValue">注册</text>
					</view>
					<view class=""
						style="width: 100%; text-align: center; font-size: 24rpx; line-height: 33rpx; margin-top: 100rpx;">
						注册即同意 <text style="color: #1C85C8;"> <text @click="showUserAgreement">用户协议</text>、<text
								@click="showPrivacyPolicy">隐私协议</text></text>
					</view>
				</view>
			</view>
		</view>

		<!-- 弹出协议窗口 -->
		<view v-if="showModal" class="modal">
			<view class="modal-content">
				<view class="modal-header">
					<text>{{ modalTitle }}</text>
					<button @click="closeModal">关闭</button>
				</view>
				<scroll-view class="modal-body" scroll-y="true">
					<text>{{ modalContent }}</text>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userAgreement,
		privacyPolicy
	} from '@/static/login/agreements.js';
	export default {
		onLoad() {
			// 初始化 userId
			getApp().globalData.userId = '1'; // 初始 userId
			console.log('User ID initialized:', getApp().globalData.userId);
		},
		data() {
			return {
				userAgreement: '',
				privacyPolicy: '',
				canGetYZM: false,
				canInputYZM: false,
				showModal: false,
				modalTitle: '',
				modalContent: '',
				navId: 'login',
				yanzhengma: '获取验证码',
				submitParams: {
					username: "", // 登录电话号码
					password: "" // 登录密码
				},
				registerParams: {
					username: "", // 注册电话号码
					password: "", // 注册密码
					confirmPassword: "", // 确认密码
					smsCode: "" // 短信验证码
				}
			};
		},
		methods: {
			// 切换登录或注册
			itemclick(value) {
				this.navId = value;
			},
			checkPhone() {
				this.canGetYZM = this.registerParams.username !== "";
			},
			// 获取验证码
			// getYZM() {
			// 	if (this.canGetYZM) {
			// 		this.canInputYZM = true;
			// 		// 调用获取验证码的接口
			// 		if (this.yanzhengma === '获取验证码') {
			// 			let time = 60;
			// 			let timer = setInterval(() => {
			// 				this.yanzhengma = `( ${time--} )`
			// 				if (time === -1) {
			// 					clearInterval(timer);
			// 					this.yanzhengma = '获取验证码';
			// 				}
			// 			}, 1000);
			// 		}
			// 		console.log(this.registerParams.username);
			// 	}
			// },

			// 登录逻辑
			login() {
				const {
					username,
					password
				} = this.submitParams;
				if (username === '' || password === '') {
					uni.showToast({
						title: '请输入完整信息',
						icon: 'none',
						duration: 2000
					});
				}

				// 调用后端接口
				uni.request({
					url: 'http://localhost:3000/userLogin/login', // 后端登录接口地址
					method: 'POST',
					data: {
						username: username, // 传递电话号码
						password: password // 传递密码
					},

					success: (res) => {
						if (res.data.code === 200) { // 假设后端返回的状态码是200表示成功
							// 假设后端返回的用户 id 在 res.data.data.userId 中
							const userId = res.data.data.userId;

							// 将 userId 保存到全局变量中
							getApp().globalData.userId = userId;
							uni.showToast({
								title: '登录成功',
								icon: 'success',
								duration: 2000
							});
							// 登录成功后跳转到主页
							uni.navigateTo({
								url: '/pages/home'
							});
						} else {
							uni.showToast({
								title: res.data.message || '登录失败',
								icon: 'none',
								duration: 2000
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			// 注册逻辑
			register() {
				const {
					username,
					password,
					confirmPassword,
					smsCode
				} = this.registerParams;

				if (username === '' || password === '') {
					uni.showToast({
						title: '请输入完整信息',
						icon: 'none',
						duration: 2000
					});
					return;
				} else if (password !== confirmPassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				// 调用后端接口
				uni.request({
					url: 'http://localhost:3000/userLogin/register', // 后端注册接口地址
					method: 'POST',
					data: {
						username: username, // 传递电话号码
						password: password, // 传递密码
						//smsCode: smsCode // 传递短信验证码
					},
					success: (res) => {
						if (res.data.code === 200) { // 假设后端返回的状态码是200表示成功
							// 假设后端返回的用户 id 在 res.data.data.userId 中
							const userId = res.data.data.userId;

							// 将 userId 保存到全局变量中
							getApp().globalData.userId = userId;
							uni.showToast({
								title: '注册成功',
								icon: 'success',
								duration: 2000
							});
							// 注册成功后跳转到主页
							uni.navigateTo({
								url: '/pages/home'
							});
						} else {
							uni.showToast({
								title: res.data.message || '注册失败',
								icon: 'none',
								duration: 2000
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			// 展示用户协议
			showUserAgreement() {
				this.modalTitle = '用户协议';
				this.modalContent = userAgreement; // 使用从 agreements.js 文件中导入的协议内容
				this.showModal = true;
			},
			// 展示隐私政策
			showPrivacyPolicy() {
				this.modalTitle = '隐私协议';
				this.modalContent = privacyPolicy; // 使用从 agreements.js 文件中导入的隐私政策内容
				this.showModal = true;
			},

			// 关闭弹窗
			closeModal() {
				this.showModal = false;
			}
		}
	}
</script>
<style lang="scss">
	.container {
		font-family: PingFangSC, PingFang SC;
	}

	.top {
		position: relative;
		left: 0;
		top: 0;

		.title {
			display: inline-block;
			width: 440rpx;
			padding: 3rpx;
			color: #ffffff;
			font-size: 44rpx;
			line-height: 62rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.box {
		width: 100%;
		display: flex;
		justify-content: center;

		.main {
			position: relative;
			width: 670rpx;
			height: 660rpx;
			//height: auto; 
			background-color: #ffffff;
			box-shadow: 0px 0px 9px 0px rgba(10, 53, 74, 0.19);
			border-radius: 40rpx;
			margin-top: -150rpx;
		}
	}

	.box2 {
		width: 100%;
		padding: 39rpx;
		display: flex;
		align-items: center;

		view {
			margin-right: 50rpx;
			font-size: 28rpx;
			color: #999999;
			line-height: 40rpx;
			font-weight: 600;
		}

		.active {
			font-size: 46rpx;
			font-weight: 600;
			color: #333333;
			line-height: 65rpx;
		}

		.line {
			width: 100%;
			height: 6rpx;
			background: linear-gradient(122deg, #2AB1E7 0%, #51B1FF 100%);
			border-radius: 3rpx;
			position: relative;
			left: 0;
			top: 0;

			.y {
				width: 30rpx;
				height: 30rpx;
				background: rgba(0, 145, 255, 0.2);
				border-radius: 15rpx;
				position: absolute;
				right: -15rpx;
				top: -15rpx;
				margin-right: 0;
			}
		}
	}

	.box3 {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.items {
			width: 550rpx;
			height: 92rpx;
			background: #F8F8F8;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
		}

		.uni-input-placeholder {
			color: #C7D4DD;
		}

		.uni-input {
			flex: 1;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			line-height: 37rpx;
		}

		.input2 {
			width: 200rpx;
			flex: none;
		}

		.yzm {
			font-size: 22rpx;
			font-weight: 400;
			color: #0087C9;
			line-height: 30rpx;
			padding: 6rpx 25rpx;
			border-left: 1rpx solid #C7D4DD;
		}
	}

	.submitValue {
		width: 56rpx;
		height: 32rpx;
		font-size: 28rpx;
		font-family: PingFangSC, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -0);
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		width: 80%;
		max-height: 60%;
		background-color: #fff;
		border-radius: 10rpx;
		//overflow: hidden;
		overflow-y: auto;
		/* 确保内容可以滚动 */
	}

	.modal-header {
		padding: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
	}

	.modal-body {
		padding: 20rpx;
		font-size: 28rpx;
		color: #333;
		height: 400rpx;
		overflow-y: scroll;
	}

	button {
		position: absolute;
		top: 50rpx;
		right: 10rpx;
		background-color: transparent;
		border: none;
		color: #ff0000;
		font-size: 30rpx;
		cursor: pointer;
	}
</style>