<template>
	<view class="personaldata">
		<view class="box" :style="{ backgroundImage: 'url(' + (alldata[0]?.backgroundImage || '#0c34ba') + ')' }"
			@click="changeBackgroundImage"></view>
		<view class="list-personal">
			<view class="chat-item" @click="changeAvatar">
				<view class="chat-content">
					<text class="title">头像</text>
				</view>
				<image class="chat-avatar" :src="alldata[0]?.userImg" mode="aspectFit"></image>
			</view>
			<view class="separator"></view>
			<view class="chat-item">
				<view class="chat-content">
					<text class="title">id</text>
				</view>
				<text class="information">{{ alldata[0]?.userId }}</text>
			</view>
			<view class="separator"></view>
			<view class="chat-item" @click="showEditNickName">
				<view class="chat-content">
					<text class="title">昵称</text>
				</view>
				<text class="information">{{ alldata[0]?.nickName || 'Allen' }}</text>
			</view>
			<view class="separator"></view>
			<view class="separator"></view>
			<view class="chat-item" @click="showEditGender">
				<view class="chat-content">
					<text class="title">性别</text>
				</view>
				<text class="information">{{ alldata[0]?.gender || '男' }}</text>
			</view>
			<view class="separator"></view>
			<view class="chat-item" @click="showEditAge">
				<view class="chat-content">
					<text class="title">年龄</text>
				</view>
				<text class="information">{{ alldata[0]?.age || '18' }}</text>
			</view>
			<view class="separator"></view>
			<view class="chat-item" @click="showEditSchool">
				<view class="chat-content">
					<text class="title">学校</text>
				</view>
				<text class="information">{{ alldata[0]?.school || '四川大学' }}</text>
			</view>
			<view class="separator"></view>
			<view class="chat-item" @click="showEditDesc">
				<view class="chat-content">
					<text class="title">简介</text>
				</view>
				<text class="information">{{ alldata[0]?.desc || '这家伙很懒，什么都没有留下！' }}</text>
			</view>
			<view class="separator"></view>
			<view class="chat-item" @click="showEditPassword">
				<view class="chat-content">
					<text class="title">修改密码</text>
				</view>
			</view>
			<view class="separator"></view>
			<view class="chat-item" @click="logout">
				<view class="chat-content">
					<text class="title">退出登录</text>
				</view>
			</view>
		</view>

		<view v-if="showNicknameDialog" class="dialog">
			<view class="dialog-content">
				<text class="dialog-title">修改昵称</text>
				<input type="text" v-model="newNickName" placeholder="请输入新昵称" />
				<view class="dialog-buttons">
					<button @click="closeDialog">取消</button>
					<button @click="editNickName">确定</button>
				</view>
			</view>
		</view>
		
		<view v-if="showGenderDialog" class="dialog">
			<view class="dialog-content">
				<text class="dialog-title">修改性别</text>
				<input type="text" v-model="newGender" placeholder="请输入性别" />
				<view class="dialog-buttons">
					<button @click="closeDialog">取消</button>
					<button @click="editGender">确定</button>
				</view>
			</view>
		</view>
		
		<view v-if="showAgeDialog" class="dialog">
			<view class="dialog-content">
				<text class="dialog-title">修改年龄</text>
				<input type="text" v-model="newAge" placeholder="请输入年龄" />
				<view class="dialog-buttons">
					<button @click="closeDialog">取消</button>
					<button @click="editAge">确定</button>
				</view>
			</view>
		</view>
		
		<view v-if="showSchoolDialog" class="dialog">
			<view class="dialog-content">
				<text class="dialog-title">修改学校</text>
				<input type="text" v-model="newSchool" placeholder="请输入学校" />
				<view class="dialog-buttons">
					<button @click="closeDialog">取消</button>
					<button @click="editSchool">确定</button>
				</view>
			</view>
		</view>

		<view v-if="showDescDialog" class="dialog">
			<view class="dialog-content">
				<text class="dialog-title">修改简介</text>
				<input type="text" v-model="newDesc" placeholder="请输入新简介" />
				<view class="dialog-buttons">
					<button @click="closeDialog">取消</button>
					<button @click="editDesc">确定</button>
				</view>
			</view>
		</view>

		<!-- 修改密码的对话框 -->
		<view v-if="showPasswordDialog" class="dialog">
			<view class="dialog-content">
				<text class="dialog-title">修改密码</text>
				<input type="password" v-model="newPassword" placeholder="请输入新密码" />
				<input type="password" v-model="confirmPassword" placeholder="请确认新密码" />
				<view class="dialog-buttons">
					<button @click="closeDialog">取消</button>
					<button @click="editPassword">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alldata: [{
					//默认背景
					backgroundImage: '../../static/person/bk.png',
					userImg: '../../static/person/bk.png',
					userId: '',
					nickName: '默认昵称',
					gender:'未知',
					age:'未知',
					school:'未知',
					desc: '默认简介'
				}],
				showNicknameDialog: false,
				showGenderDialog: false,
				showAgeDialog: false,
				showSchoolDialog: false,
				showDescDialog: false,
				showPasswordDialog: false,
				newNickName: '',
				newGender:'',
				newAge:'',
				newSchool:'',
				newDesc: '',
				newPassword: '',
				confirmPassword: ''
			}
		},
		created() {
			this.alldata[0].userId = getApp().globalData.userId;
			// 获取用户初始数据代码（注释）
			//初始数据逻辑： 向后端传入userId， 后端据此返回对应的用户头像、 用户昵称、 用户简介
			// 向后端发送 POST 请求，获取用户数据
			uni.request({
				url: 'http://localhost:3000/userCenter/persondata', // 后端接口地址
				method: 'POST',
				data: {
					userId: this.alldata[0].userId
				},
				success: (res) => {
					// 假设后端返回的数据包含 code 和 data 字段
					if (res.data.code === 200) {
						// 更新用户信息	
						// this.alldata[0].userImg: res.data.data.userImg,
						this.alldata[0].nickName = res.data.data.nickName,
						this.alldata[0].desc = res.data.data.desc,
						this.alldata[0].gender = res.data.data.gender,
						this.alldata[0].age = res.data.data.age,
						this.alldata[0].school =res.data.data.school
			         // this.alldata[0].backgroundImage: res.data.data.backgroundImage
					}
					else {
						// 处理失败情况
						console.error('获取用户信息失败:', res.data.message || '未知错误');
					}
				},
				fail: (err) => {
					// 处理请求失败情况
					console.error('请求失败:', err);
				}
			});
		},
		watch: {  
		    // 监听全局userId的变化  
		    'getApp().globalData.userId'(newVal) {  
		      this.alldata[0].userId = newVal;  
		    },  
		  },  
		methods: {
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.alldata[0].userImg = res.tempFilePaths[0];
						// 更新头像代码（注释）
						// uni.uploadFile({
						// 	url: 'http://localhost:3000/login',
						// 	filePath: res.tempFilePaths[0],
						// 	name: 'avatar',
						// 	formData: { userId: this.alldata[0].userId},
						// });
					}
				});
			},
			showEditNickName() {
				this.showNicknameDialog = true;
				this.newNickName = this.alldata[0].nickName;
			},
			editNickName() {
			    // 检查昵称长度
			    const nicknameLength = this.getCharLength(this.newNickName);
			    if (nicknameLength > 14) {
			        uni.showToast({
			            title: '昵称过长！',
			            icon: 'none'
			        });
			        return;
			    }
			
			    this.alldata[0].nickName = this.newNickName;
			    this.showNicknameDialog = false;
			    // 更新昵称到后端代码（注释）
			    uni.request({
			        url: 'http://localhost:3000/userCenter/updateNickName',
			        method: 'POST',
			        data: { userId: this.alldata[0].userId, nickName: this.newNickName },
			    });
			},
			showEditGender() {
				this.showGenderDialog = true;
				this.newGender = this.alldata[0].gender;
			},
			editGender() {
			    // 检查性别输入
			    if ((this.newGender !== "男") && (this.newGender !== "女") ) {
			        uni.showToast({
			            title: '输入不合理！',
			            icon: 'none'
			        });
			        return;
			    }
			
			    this.alldata[0].gender = this.newGender;
			    this.showGenderDialog = false;
			    // 更新性别到后端代码（注释）
			    uni.request({
			        url: 'http://localhost:3000/updateGender',
			        method: 'POST',
			        data: { userId: this.alldata[0].userId, gender: this.newGender },
			    });
			},
			showEditAge() {
				this.showAgeDialog = true;
				this.newAge = this.alldata[0].age;
			},
			editAge() {
			    // 检查年龄输入
			    if (!Number.isInteger(Number(this.newAge))) {
			        uni.showToast({
			            title: '输入不合理！',
			            icon: 'none'
			        });
			        return;
			    }
			
			    this.alldata[0].age = this.newAge;
			    this.showAgeDialog = false;
			    // 更新年龄到后端代码（注释）
			    uni.request({
			        url: 'http://localhost:3000/userCenter/updateAge',
			        method: 'POST',
			        data: { userId: this.alldata[0].userId, age: this.newAge },
			    });
			},
			showEditSchool() {
				this.showSchoolDialog = true;
				this.newSchool = this.alldata[0].school;
			},
			editSchool() {
			    // 检查学校输入长度
			    const schoolLength = this.getCharLength(this.newSchool);
			    if (schoolLength > 20) {
			        uni.showToast({
			            title: '学校名称过长！',
			            icon: 'none'
			        });
			        return;
			    }
			
			    this.alldata[0].school = this.newSchool;
			    this.showSchoolDialog = false;
			    // 更新学校到后端代码（注释）
			    uni.request({
			        url: 'http://localhost:3000/userCenter/updateSchool',
			        method: 'POST',
			        data: { userId: this.alldata[0].userId, school: this.newSchool },
			    });
			},
			showEditDesc() {
				this.showDescDialog = true;
				this.newDesc = this.alldata[0].desc;
			},
			editDesc() {
			    // 检查简介长度
			    const descLength = this.getCharLength(this.newDesc);
			    if (descLength > 30) {
			        uni.showToast({
			            title: '简介过长！',
			            icon: 'none'
			        });
			        return;
			    }
			
			    this.alldata[0].desc = this.newDesc;
			    this.showDescDialog = false;
			    // 更新简介到后端代码（注释）
			    uni.request({
			        url: 'http://localhost:3000/userCenter/updateDesc',
			        method: 'POST',
			        data: { userId:this.alldata[0].userId, desc: this.newDesc },
			    });
			},
			// 计算字符长度，中文算两个字符
			getCharLength(str) {
			    return str.replace(/[\u4e00-\u9fa5]/g, 'aa').length; // 将中文字符替换为两个字符
			},
			changeBackgroundImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.alldata[0].backgroundImage = res.tempFilePaths[0];
						uni.setStorageSync('backgroundImage', res.tempFilePaths[0]); // 将背景图路径保存到本地存储
					}
				});
			},
			showEditPassword() {
				this.showPasswordDialog = true;
				this.newPassword = '';
				this.confirmPassword = '';
			},
			editPassword() {
				if (this.newPassword === this.confirmPassword) {
					// 更新密码到后端代码（注释）
					uni.request({
						url: 'http://localhost:3000/userCenter/updatePassword',
						method: 'POST',
						data: { userId:this.alldata[0].userId, password: this.newPassword },
					});
					this.showPasswordDialog = false;
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					});
				} else {
					uni.showToast({
						title: '两次密码输入不一致',
						icon: 'none'
					});
				}
			},
			closeDialog() {
				this.showNicknameDialog = false;
				this.showDescDialog = false;
				this.showPasswordDialog = false;
				this.showGenderDialog = false;
				this.showAgeDialog = false;
				this.showSchoolDialog = false;
			},
			logout() {
				// 退出登录逻辑，清除用户信息等
				uni.clearStorage();
				uni.reLaunch({
					url: '/pages/login' // 跳转到登录页面
				});
			}
		}
	}
</script>

<style lang="scss">
	.personaldata {
		display: flex;
		flex-direction: column;

		.box {
			height: 400rpx;
			background: url('{{ alldata[0]?.backgroundImage || "#0c34ba" }}') no-repeat center/cover;
		}

		.list-personal {
			flex-direction: column;
			margin: 20rpx;
			background: white;
			box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;

			.chat-item {
				display: flex;
				align-items: center;
				padding: 20rpx;
			}

			.separator {
				height: 1rpx;
				width: 90%;
				background-color: #f5f6f7;
				margin: 10rpx auto;
			}

			.chat-content {
				flex: 1;
				margin-right: 20rpx;
			}

			.title {
				font-size: 28rpx;
				color: #333;
			}

			.chat-avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-left: auto;
			}

			.information {
				color: #969799;
				font-size: 26rpx;
				text-align: right;
			}
		}

		.dialog {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;

			.dialog-content {
				width: 80%;
				padding: 20rpx;
				background: #fff;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.dialog-title {
					font-size: 32rpx;
					margin-bottom: 20rpx;
				}

				input {
					width: 100%; /* 修改为100%以适应更宽的输入框 */
					max-width: 600rpx; /* 可以根据需要调整最大宽度 */
					padding: 10rpx;
					font-size: 30rpx;
					border: 1rpx solid #ddd;
					border-radius: 5rpx;
					margin-bottom: 20rpx;
				}

				.dialog-buttons {
					display: flex;
					width: 100%;
					justify-content: space-between;

					button {
						flex: 1;
						margin: 0 10rpx;
						padding: 10rpx;
						background-color: #799FB3; 
						color: #fff;
						border-radius: 5rpx;
						text-align: center;
						font-size: 26rpx;

						&:hover {
							background-color: #90EE90; /* 按钮悬停效果 */
						}
					}
				}
			}
		}
	}
</style>