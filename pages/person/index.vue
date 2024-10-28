<template>
	<view class="my">
		<view class="personal">
			<!-- 显示头像和用户信息的圆形区域 -->
			<view class="avatar-container">
				<image class="avatar" src="@/static/person/bk.png" mode="aspectFill"></image>
				<view class="name">{{ myInfo.nickName || '默认昵称' }}</view>
				<view class="profile">{{ myInfo.desc || '默认简介' }}</view>
			</view>
			
			<!-- 个人资料选项 -->
			<view class="from">
				<uni-list :border="false">
					<uni-list-item showArrow title="个人资料" to="./persondata"></uni-list-item>
					<uni-list-item showArrow title="我的订单" to="../../pages/order/order"></uni-list-item>
					<uni-list-item showArrow title="我的收藏" to="../../pages/myCollection/myCollection"></uni-list-item>
					<uni-list-item showArrow title="地址管理" to="../../pages/addresslist/addresslist"></uni-list-item>
					<uni-list-item showArrow title="安全中心" to="../../pages/securitycenter/securitycenter"></uni-list-item>
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
				myInfo: {}
			};
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