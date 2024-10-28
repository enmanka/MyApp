// 在 App.vue 文件中
<script>
	globalData: {
		userId: '' // 在全局作用域下定义 userId
	}
	export default {
		onLaunch() {
			console.log('App Launch') // 确认 App 启动时触发
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 每个页面的公共 css */
</style>