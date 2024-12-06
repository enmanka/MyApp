<template>
	<div class="class-note-container">
		<!-- 加载指示器 -->
		<div v-if="isLoading" class="loading-indicator">
			加载中...
		</div>
		<!-- 标题栏 -->
		<div class="header">

			<input v-model="note_title" class="note-title" type="text" placeholder="请输入笔记标题..."
				@input="updateEditTime" />

			<p class="edit-time">最近编辑时间：{{ formattedEditTime }}</p>
		</div>

		<!-- 笔记内容 -->

		<textarea v-model="note_content" class="note-textarea" placeholder="在这里记录笔记..."
			@input="updateEditTime"></textarea>


		<!-- 保存与取消按钮 -->
		<div class="buttons-container">
			<button class="cancel-btn" @click="cancelEdit()">取消</button>
			<button class="save-btn" @click="saveNote()">保存</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				originalNoteTitle: '', // 用于取消操作时恢复原始标题
				originalNoteContent: '', // 用于取消操作时恢复原始内容
				originalEditTime: null,
				note_title: '', // 当前编辑中的标题
				note_content: '', // 当前编辑中的内容
				edit_time: null, // 最近编辑时间
				userId: getApp().globalData.userId, // 当前用户的ID
				note_id: '', // 当前笔记ID
				isLoading: false, // 控制加载指示器的显示
			};
		},
		onLoad(options) {
			this.note_title = options.title || '';
			this.note_id = options.id || '';
			//加载页面
			this.fetchNoteDetail();
		},

		computed: {
			// 格式化最近编辑时间
			formattedEditTime() {
				const year = this.edit_time.getFullYear();
				const month = String(this.edit_time.getMonth() + 1).padStart(2, '0');
				const day = String(this.edit_time.getDate()).padStart(2, '0');
				const hours = String(this.edit_time.getHours()).padStart(2, '0');
				const minutes = String(this.edit_time.getMinutes()).padStart(2, '0');
				return `${year}/${month}/${day} ${hours}:${minutes}`;
			},
		},

		onBackPress() {
			// 在这里实现返回按钮点击后的逻辑
			uni.redirectTo({
				url: '/pages/study/notes' // 替换为你指定的目标页面路径
			});
			return true; // 阻止默认的返回操作
		},

		methods: {
			// 更新编辑时间
			updateEditTime() {
				this.edit_time = new Date();
			},
			// 获取笔记的详细信息
			fetchNoteDetail() {
				this.isLoading = true; // 显示加载指示器
				if (!this.note_id) {
					uni.showToast({
						title: '没有笔记号',
						icon: 'none'
					});
					return;
				}
				uni.request({
					url: `http://localhost:3000/notetake/searchNoteByName`, // 后端接口
					method: 'POST',
					data: {
						note_id: this.note_id,
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.note_id = res.data.notes[0].note_id || null;
							this.note_title = res.data.notes[0].note_title || '';
							this.edit_time = new Date(res.data.notes[0].edit_time) || null;
							this.note_content = res.data.notes[0].note_content || '';

							this.originalNoteTitle = this.note_title;
							this.originalNoteContent = this.note_content;
							this.originalEditTime = this.edit_time;
							this.isLoading = false; // 隐藏加载指示器
						} else {
							uni.showToast({
								title: '加载失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						this.isLoading = false; // 隐藏加载指示器
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
					}
				});
			},

			// 保存笔记
			saveNote() {
				if (this.note_id.trim() === '' || this.userId === '') {
					return; // 阻止请求发送
				}
				uni.showToast({
					title: this.userId,
					icon: 'none'
				});
				if (this.note_title.trim() && this.note_content.trim()) {
					// 保存笔记逻辑，模拟后端API交互
					uni.request({
						url: 'http://localhost:3000/notetake/editNoteContent', // 假设后端保存笔记的接口
						method: 'PUT',
						data: {
							note_title: this.note_title, // 编辑后的标题
							note_content: this.note_content, // 编辑后的内容		
							user_id: this.userId, // 当前用户ID
							note_id: this.note_id,
							//edit_time:this.edit_time,
						},
						success: (res) => {
							if (res.data.code === 200) {
								uni.showToast({
									title: '笔记已保存',
									icon: 'success'
								});;
								// 更新原始数据
								this.originalNoteTitle = this.note_title;
								this.originalNoteContent = this.note_content;
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/study/notes'
									});
								}, 1000);
							} else {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								});
							}
						},
						fail: (err) => {
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							});
						}
					});
				} else {
					uni.showToast({
						title: '标题和内容不能为空！',
						icon: 'none'
					});
				}
			},

			// 取消编辑并恢复到初始状态
			cancelEdit() {
				this.note_title = this.originalNoteTitle; // 恢复标题
				this.note_content = this.originalNoteContent; // 恢复内容
				this.edit_time = this.originalEditTime;
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/study/notes'
					});
				}, 1000);
			},
		}

	};
</script>

<style scoped>
	.class-note-container {
		padding: 16px;
		background-color: #f7f8fa;
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.loading-indicator {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #333;
		font-size: 16px;
		font-weight: bold;
	}

	.header {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.note-title {
		font-size: 24px;
		font-weight: bold;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 8px;
		margin-bottom: 8px;
		background-color: #fff;
		width: 100%;
	}

	.edit-time {
		font-size: 12px;
		color: #999;
	}

	.buttons-container {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.save-btn,
	.cancel-btn {
		padding: 5px 50px;
		font-size: 16px;
		border-radius: 10px;
		cursor: pointer;
	}

	.save-btn {
		background-color: #4CAF50;
		color: white;
		border: none;
	}

	.save-btn:hover {
		background-color: #45a049;
	}

	.cancel-btn {
		background-color: #f44336;
		color: white;
		border: none;
	}

	.cancel-btn:hover {
		background-color: #d32f2f;
	}

	.note-textarea {
		flex-grow: 1;
		padding: 12px;
		font-size: 16px;
		border-radius: 8px;
		border: 1px solid #ccc;
		background-color: #fff;
		resize: none;
		height: 60vh;
	}

	.note-textarea::placeholder {
		color: #ccc;
	}
</style>