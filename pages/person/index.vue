<template>
	<view class="my">
		<view class="personal">
			<!-- 显示头像和用户信息的圆形区域 -->
			<view class="avatar-container">
				<image class="avatar" :src="userImg" mode="aspectFill"></image>
				<view class="name">{{ nickName || '默认昵称' }}</view>
				<view class="profile">{{ desc || '默认简介' }}</view>
			</view>

			<!-- 个人资料选项 -->
			<view class="from">
				<uni-list :border="false">
					<uni-list-item showArrow title="个人资料" to="./persondata"></uni-list-item>
					<uni-list-item showArrow title="我的订单" to="../../pages/order/order"></uni-list-item>
					<uni-list-item showArrow title="我的收藏" to="../../pages/myCollection/myCollection"></uni-list-item>
					<uni-list-item showArrow title="地址管理" to="../../pages/addresslist/addresslist"></uni-list-item>
					<uni-list-item showArrow title="安全中心"
						to="../../pages/securitycenter/securitycenter"></uni-list-item>
				</uni-list>
			</view>
		</view>
		<bottom :selectedIcon="selectedIcon" @update:selectedIcon="updateIcon" />
	</view>
</template>

<script>
	import bottom from '@/pages/bottom.vue';
	export default {
		components: {
			bottom
		},
		data() {
			return {
				selectedIcon: uni.getStorageSync('selectedIcon') || 'person',
				nickName: '',
				desc: '',
				userImg: '../../static/person/bk.png'
			};
		},
		created() {
			// // 获取用户初始数据代码（注释）
			// //初始数据逻辑： 向后端传入userId， 后端据此返回对应的用户头像、 用户昵称、 用户简介
			// // 向后端发送 POST 请求，获取用户数据
			// uni.request({
			// 	url: 'http://localhost:3000/login', // 后端接口地址
			// 	method: 'POST',
			// 	data: {
			// 		userId: getApp().globalData.userId;
			// 	},
			// 	success: (res) => {
			// 		// 假设后端返回的数据包含 code 和 data 字段
			// 		if (res.data.code === 200) {
			// 			// 更新用户信息	
			// 			userImg: res.data.data.userImg,
			// 			nickName: res.data.data.nickName,
			// 			desc: res.data.data.desc,
			// 		}
			// 		else {
			// 			// 处理失败情况
			// 			console.error('获取用户信息失败:', res.data.message || '未知错误');
			// 		}
			// 	},
			// 	fail: (err) => {
			// 		// 处理请求失败情况
			// 		console.error('请求失败:', err);
			// 	}
			// });
		},
		methods: {
			updateIcon(icon) {
				this.selectedIcon = icon;
				uni.setStorageSync('selectedIcon', icon);
			}
		},
		mounted() {
			this.selectedIcon = uni.getStorageSync('selectedIcon') || 'person';
		}
	}
</script>

<style scoped>
	.my {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		height: 100vh;
	}

	.personal {
		flex-grow: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.avatar-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		border: 2px solid #ccc;
	}

	.name {
		margin-top: 10px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.profile {
		font-size: 14px;
		color: #666;
		margin-top: 5px;
		text-align: center;
	}

	.from {
		width: 100%;
		margin-top: 20px;
	}
</style>