<template>
	<div class="memo-container">
		<!-- 备忘录列表 -->
		<div class="memo-list">
			<div v-for="(memo, index) in sortedMemos" :key="index"
				:class="['memo-item', memo.completed ? 'completed' : '']">
				<div class="checkbox" @click="toggleComplete(index)">
					<uni-icons v-if="memo.completed" type="checkmarkempty" size="20" color="#4CAF50" />
				</div>
				<div class="memo-content">
					<span class="memo-info">{{ memo.text }}</span>
					<span class="memo-time">{{ formatTime(memo.dueTime) }}</span>
				</div>
				<uni-icons type="closeempty" size="20" class="delete-icon" @click="deleteMemo(index)" />
			</div>
		</div>

		<!-- 添加备忘录按钮 -->
		<uni-icons type="plus-filled" size="50" class="add-icon" @click="addMemo()" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//与后端连接后开启下面注释部分；注释掉示例部分memos:[...]
				//memos: [], // 储存备忘录数据
				//currentUserId: null, // 当前用户ID
				memos: [
					// { text: '完成项目报告', dueTime: new Date('2024-11-15T18:00:00'), completed: false },
					// { text: '开会讨论需求', dueTime: new Date('2024-11-13T09:00:00'), completed: true },
					// { text: '检查代码质量', dueTime: new Date('2024-11-14T14:30:00'), completed: false },
					// { text: '写周报', dueTime: new Date('2024-11-16T10:00:00'), completed: true },
				],
				userId: '',
			};
		},
		onShow() {
			// 页面展示时获取课程数据
			this.userId = getApp().globalData.userId;
			this.loadData();
		},
		computed: {
			sortedMemos() {
				// 按照未完成和时间排序，未完成的排在前面，时间距离当前最近的排在前面
				return this.memos.sort((a, b) => {
					// 先比较完成状态，未完成排前面
					if (a.completed !== b.completed) {
						return a.completed ? 1 : -1;
					}
					// 如果完成状态相同，按截至时间升序排序（距离当前时间近的排前面）
					return a.dueTime - b.dueTime;
				});
			}
		},
		methods: {
			loadData() {
				uni.request({
					url: 'http://47.108.162.90:3000/remember/getMemos', // 假设后端获取备忘录列表的接口
					method: 'POST',
					data: {
						user_id: this.userId
					},
					success: (res) => {
						if (res.statusCode === 200) {
							//console.log(res.data.memos);
							const records = Array.isArray(res.data.memos) ? res.data.memos : [];
							// 更新数据
							this.memos = records.map((item) => ({
								text: item.reminder_content, // 内容
								dueTime: item.reminder_time, //提示时间
								completed: item.is_completed,
								id: item.reminder_id,
							}));
						} else {
							uni.showToast({
								title: '加载备忘录失败',
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
			},
			formatTime(dueTime) {
				// 格式化时间为 2024-11-17 12:00 样式
				const date = new Date(dueTime);
				const year = date.getFullYear();
				const month = date.getMonth() + 1; // 月份从0开始
				const day = date.getDate();
				const hours = date.getHours();
				const minutes = date.getMinutes();
				return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
			},
			toggleComplete(index) {
				// 切换备忘录的完成状态
				this.memos[index].completed = !this.memos[index].completed;
				// 发送更新状态到后端
				uni.request({
				  url: 'http://47.108.162.90:3000/remember/updateMemo', // 假设后端更新完成状态的接口
				  method: 'PUT',
				  data: {
				    reminder_id: this.memos[index].id,
				    is_completed: this.memos[index].completed,
				  },
				  success: (res) => {
				    if (res.statusCode !== 200) {
				      uni.showToast({ title: '更新失败', icon: 'none' });
				    }
				  },
				  fail: () => {
				    uni.showToast({ title: '请求失败', icon: 'none' });
				  },
				});
			},
			deleteMemo(index) {
				//调用后端接口删除备忘录
				uni.request({
				  url: 'http://47.108.162.90:3000/remember/deleteMemo', // 假设后端删除备忘录的接口
				  method: 'DELETE',
				  data: {
				    reminder_id:this.memos[index].id,
				  },
				  success: (res) => {
				    if (res.statusCode === 200) {
				      this.memos.splice(index, 1);
				      uni.showToast({ title: '删除成功', icon: 'success' });
				    } else {
				      uni.showToast({ title: '删除失败', icon: 'none' });
				    }
				  },
				  fail: () => {
				    uni.showToast({ title: '请求失败', icon: 'none' });
				  },
				});
			},
			addMemo() {
				// 跳转到添加备忘录界面
				uni.navigateTo({
					url: '/pages/study/addRemember' // 跳转到添加备忘录页面
				});
			},
		},
	};
</script>

<style scoped>
	.memo-container {
		padding: 16px;
		background-color: #f7f8fa;
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.memo-list {
		flex: 1;
		padding: 10px 0;
		overflow-y: auto;
	}

	.memo-item {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 10px;
		margin: 5px 0;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.memo-item.completed {
		background-color: #d3d3d3;
		/* 灰色背景 */
	}

	.memo-item:not(.completed) {
		background-color: #fff3b0;
		/* 浅黄色背景 */
	}

	.checkbox {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ccc;
		border-radius: 50%;
		margin-right: 12px;
		cursor: pointer;
	}

	.memo-content {
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.memo-info {
		font-size: 16px;
		color: #333;
	}

	.memo-time {
		font-size: 12px;
		color: #999;
	}

	.delete-icon {
		color: red;
		cursor: pointer;
	}

	.add-icon {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #f8c547;
		padding: 15px;
		border-radius: 50%;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		cursor: pointer;
	}
</style>