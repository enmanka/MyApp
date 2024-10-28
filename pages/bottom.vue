
<template>
	<div class="footer">
		<button class="circle-button" @click="selectIcon('life')" :class="{ selected: selectedIcon === 'life' }">
			<uni-icons type="calendar" size="50"
				:style="{ color: selectedIcon === 'life' ? 'blue' : '#C7D4DD' }"></uni-icons>
		</button>
		<button class="circle-button" @click="selectIcon('study')" :class="{ selected: selectedIcon === 'study' }">
			<uni-icons type="wallet" size="50"
				:style="{ color: selectedIcon === 'study' ? 'blue' : '#C7D4DD' }"></uni-icons>
		</button>
		<button class="circle-button" @click="selectIcon('person')" :class="{ selected: selectedIcon === 'person' }">
			<uni-icons type="home" size="50"
				:style="{ color: selectedIcon === 'person' ? 'blue' : '#C7D4DD' }"></uni-icons>
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			selectedIcon: {
				type: String,
				required: true // 父组件传递选中的图标
			}
		},
		methods: {
			selectIcon(icon) {
				uni.setStorageSync('selectedIcon', icon); // 使用 uni-app 的存储接口
				this.$emit('update:selectedIcon', icon);
				uni.navigateTo({
					url: `/pages/${icon}/index`,
					animationType: 'none', // 禁用动画
					animationDuration: 0 // 动画持续时间设置为 0
				});
			}
		}

	}
</script>

<style scoped>
	.footer {
		display: flex;
		justify-content: space-around;
		padding: 10px 0;
	}

	.circle-button {
		background-color: transparent;
		border: none;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.circle-button.selected {
		transform: scale(1.1);
		/* 选中时放大 */
	}

	.circle-button:hover {
		transform: scale(1.1);
	}
</style>
