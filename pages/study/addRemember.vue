<template>
	<div class="add-memo-container">
		<div class="form-group">
			<label for="memoText">备忘录内容：</label>
			<input v-model="memoText" type="text" id="memoText" placeholder="请输入备忘录内容" />
		</div>
		<div class="form-group">
			<label for="dueTime">截至时间：</label>
			<input v-model="dueTime" type="datetime-local" id="dueTime" min="2024-11-17T00:00" />
		</div>

		<div class="button-group">
			<button @click="saveMemo" class="save-btn">保存</button>
			<button @click="cancel" class="cancel-btn">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				memoText: '', //备忘信息
				dueTime: '', //截至时间
				minDueTime: new Date().toISOString().slice(0, 16), // 设置最小可选时间为当前时间
			};
		},
		methods: {
			formatDateTime(date) {
				const d = new Date(date);
				const year = d.getFullYear();
				const month = String(d.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
				const day = String(d.getDate()).padStart(2, '0');
				const hours = String(d.getHours()).padStart(2, '0');
				const minutes = String(d.getMinutes()).padStart(2, '0');
				const seconds = String(d.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			saveMemo() {
				if (this.memoText && this.dueTime) {
					const newMemo = {
						userId: this.currentUserId, // 当前用户ID
						text: this.memoText,
						dueTime: new Date(this.dueTime).toISOString(),
						completed: false,
					};

					// 调用后端保存备忘信息接口
					uni.request({
						url: 'http://47.108.162.90:3000/remember/saveMemo', // 假设后端保存备忘录的接口
						method: 'POST',
						data: {
							user_id: getApp().globalData.userId,
							reminder_content: this.memoText,
							reminder_time: this.formatDateTime(new Date(this.dueTime)),
							is_completed: false,
							editime: this.formatDateTime(new Date()),
						},
						success: (res) => {
							if (res.statusCode === 200) {
								uni.showToast({
									title: '保存成功',
									icon: 'success'
								});
								uni.navigateBack(); // 保存成功后返回上一页
							} else {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								});
							}
						},
						fail: () => {
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							});
						},
					});

				} else {
					uni.showToast({
						title: '请填写备忘录内容和时间',
						icon: 'none'
					});
				}
			},
			cancel() {
				uni.navigateBack(); // 取消时返回上一页
			},
			//与后端连接后开启下面代码
			// fetchCurrentUserId() {
			//       // 从本地存储中获取当前用户ID
			//       this.currentUserId = uni.getStorageSync('userId');
			//       if (!this.currentUserId) {
			//         uni.showToast({ title: '用户未登录', icon: 'none' });
			//         uni.navigateBack(); // 返回上一页
			//       }
			// },
		},
		//与后端连接后打开下面代码
		// mounted() {
		//     this.fetchCurrentUserId(); // 页面加载时获取当前用户ID
		//   },
	};
</script>

<style scoped>
	.add-memo-container {
		padding: 16px;
		background-color: #f7f8fa;
	}

	.form-group {
		margin-bottom: 20px;
	}

	input {
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #fff;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
	}

	.save-btn,
	.cancel-btn {
		padding: 8px 50px;
		border-radius: 10px;
		font-size: 16px;
	}

	.save-btn {
		background-color: #4CAF50;
		color: white;
		border: none;
	}

	.cancel-btn {
		background-color: #f44336;
		color: white;
		border: none;
	}
</style>