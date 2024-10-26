<template>
	<div class="lifeHomepage">
		<div class="lifeContent">
			<h1>智慧生活</h1>
		</div>
		<bottom :selectedIcon="selectedIcon" @update:selectedIcon="updateIcon" />
	</div>
</template>

<script>
	import bottom from '@/pages/bottom.vue';

	export default {
		components: {
			bottom
		},
		data() {
			return {
				selectedIcon: uni.getStorageSync('selectedIcon') || 'life' // 使用 uni-app 的读取接口
			};
		},
		methods: {
			updateIcon(icon) {
				this.selectedIcon = icon; // 更新本地状态
				uni.setStorageSync('selectedIcon', icon);
			}
		},
		mounted() {
			// 页面加载时设置 selectedIcon
			this.selectedIcon = uni.getStorageSync('selectedIcon') || 'life';
		}
	}
</script>

<style scoped>
	.lifeHomepage {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
	}

	.lifeContent {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>