<template>
	<div class="add-contact-page">
		<form @submit.prevent="submitForm">
			<!-- 表单内容 -->
			<div class="form-group">
				<label>课程名</label>
				<input type="text" v-model="classes.name" placeholder="请输入课程名" required />
			</div>

			<div class="form-group">
				<label>上课地点</label>
				<input type="text" v-model="classes.address" placeholder="请输入上课地点" />
			</div>

			<div class="form-group">
				<label>授课教师</label>
				<input type="tel" v-model="classes.teacher" placeholder="请输入教师姓名" required />
			</div>

			<div class="form-group">
				<label>教师联系方式</label>
				<input type="text" v-model="classes.contact" placeholder="请输入教师联系方式" />
			</div>

			<div class="form-group">
				<label>行课周数</label>
				<input type="text" v-model="classes.week" placeholder="请输入行课周数" />
			</div>

			<div class="form-group">
				<label>备注</label>
				<textarea v-model="classes.notes" placeholder="请输入备注"></textarea>
			</div>
		</form>

		<!-- 底部按钮组 -->
		<div class="button-group">
			<button @click="submitForm" class="submit-button">添加课程</button>
		</div>

		<!-- 添加成功的弹窗 -->
		<div v-if="showSuccessPopup" class="popup-overlay">
			<div class="popup-content">
				<p>添加成功！</p>
			</div>
		</div>
		<!-- 错误提示弹窗 -->
		<div v-if="showErrorPopup" class="popup-overlay">
			<div class="popup-content error-popup">
				<p>{{ errorMessage }}</p>
				<button @click="closeErrorPopup" class="close-button">关闭</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				classes: {
					name: '',
					address: '',
					teacher: '',
					contact: '',
					week: '',
					notes: '',
					id: -1,
					weekDay: -1,
					period: -1
				},
				userID: '', // 假设从本地存储或其他方式获取当前用户的ID
				showSuccessPopup: false, // 控制弹窗显示
				showErrorPopup: false, // 控制错误弹窗显示
				errorMessage: '', // 错误信息
			};
		},
		onLoad(query) {
			// 获取 URL 中的参数
			this.classes.name = query.name || "";
			this.classes.address = query.address || "";
			this.classes.teacher = query.teacher || "";
			this.classes.contact = query.contact || "";
			this.classes.week = query.week || "";
			this.classes.id = query.id || ""; // 获取 id
			this.classes.notes = query.notes || "";
			//从0开始，记录课程所处的日期
			this.classes.weekDay = query.weekDay || "";
			//记录课程的节数
			this.classes.period = query.period || "";
			// 使用 id 做其他操作，例如查询该课程的详细信息
			console.log(this.classes.weekDay);
		},
		onBackPress() {
			// 在这里实现返回按钮点击后的逻辑
			uni.redirectTo({
				url: '/pages/study/timetable' // 替换为你指定的目标页面路径
			});
			return true; // 阻止默认的返回操作
		},

		methods: {
			// 提交表单并通过API将数据发送到后端
			submitForm() {
				// 此处填写添加课程逻辑
				// 判断课程名是否为空
				if (!this.classes.name.trim()) {
					// 如果课程名为空，显示错误弹窗
					this.errorMessage = '课程名不能为空！';
					this.showErrorPopup = true;
					return; // 阻止提交
				}
				const entryData = {
					name: this.classes.name,
					address: this.classes.address,
					teacher: this.classes.teacher,
					contact: this.classes.contact,
					week: this.classes.week,
					id: this.classes.id, // 获取 id
					notes: this.classes.notes,
					//从0开始，记录课程所处的日期
					weekDay: this.classes.weekDay,
					//记录课程的节数
					period: this.classes.period,
				};

				// 与后端通信的代码，传入id(若id!=-1则需要删除对应日期的对应记录)、userId、日期等数据
				// 注意：如果需要替换URL和字段名称，请根据后端接口文档进行修改
				/*
				uni.request({
					url: 'http://localhost:3000/deleteRecord',
					method: 'POST',
					data: {
						userId: this.userId,
						//若为修改逻辑，则此处的id不为-1，为相应记录的id
						//若为修改逻辑，则此处传递需要删除的原来的那条记录的id
						id:this.id,
						...
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.showSuccessPopup = true; // 显示“添加成功”弹窗							          
							          setTimeout(() => {
							          	this.showSuccessPopup = false;
							          	uni.navigateTo({
							          		url: '/pages/study/timetable'
							          	});
							          }, 1000);
						} else {
							console.error('失败:', res.data.message || '未知错误');
						}
					},
					fail: (err) => {
						console.error('请求失败:', err);
					}
				});
				*/

				console.log("提交的数据：", entryData);
				this.showSuccessPopup = true; // 显示“添加成功”弹窗

				// 1秒后自动隐藏弹窗
				setTimeout(() => {
					this.showSuccessPopup = false;
					uni.navigateTo({
						url: '/pages/study/timetable'
					});
				}, 1000);
			},
			// 关闭错误弹窗
			closeErrorPopup() {
				this.showErrorPopup = false;
			}
		}
	};
</script>

<style scoped>
	.add-contact-page {
		max-width: 500px;
		margin: 0 auto;
		padding: 20px;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		color: #333;
	}

	.form-group {
		margin-bottom: 15px;
	}

	.form-group label {
		display: block;
		font-size: 16px;
		color: #666;
		margin-bottom: 5px;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 10px;
		font-size: 14px;
		border: 1px solid #ddd;
		border-radius: 8px;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: border-color 0.3s;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		border-color: #4a90e2;
		outline: none;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	/* 底部按钮组样式 */
	.button-group {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.delete-button,
	.submit-button {
		flex: 1;
		padding: 12px;
		font-size: 16px;
		color: #ffffff;
		border: none;
		border-radius: 25px;
		cursor: pointer;
		transition: background-color 0.3s, transform 0.2s;
		margin: 0 5px;
	}

	.delete-button {
		background-color: #ff4d4f;
	}

	.delete-button:hover {
		background-color: #d9363e;
	}

	.submit-button {
		background-color: #4a90e2;
	}

	.submit-button:hover {
		background-color: #357abd;
	}

	.submit-button:active,
	.delete-button:active {
		transform: scale(0.98);
	}

	/* 弹窗样式 */
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup-content {
		background-color: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		text-align: center;
		font-size: 16px;
		color: #4a90e2;
	}

	.error-popup p {
		color: #d9363e;
		font-size: 16px;
		margin-bottom: 10px;
	}

	.close-button {
		background-color: #4a90e2;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 25px;
		cursor: pointer;
	}

	.close-button:hover {
		background-color: #357abd;
	}
</style>