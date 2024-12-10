<template>
	<div class="add-contact-page">
		<form @submit.prevent="submitForm">
			<!-- 表单内容 -->
			<div class="form-group">
				<label>课程名</label>
				<input type="text" v-model="this.classes.name" placeholder="请输入课程名" @blur="validateName" required />
				<div v-if="nameError" class="error-message">{{ nameError }}</div>
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
				<div class="week-range">
					<div class="week-input">
						<label>(起始)</label>
						<input type="text" v-model="classes.startWeek" placeholder="起始周数" />
					</div>
					<div class="week-input">
						<label>(结束)</label>
						<!-- <input type="number" v-model.number="classes.endWeek" @blur="validateWeek" placeholder="结束周数"
							min="1" /> -->
						<input type="text" v-model="classes.endWeek" placeholder="结束周数" />
					</div>
				</div>
				<div v-if="weekError" class="error-message">{{ weekError }}</div>
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
					startWeek: null, // 起始周数
					endWeek: null, // 结束周数
					notes: '',
					id: null,
					weekDay: '',
					period: '',
				},
				userID: '', // 假设从本地存储或其他方式获取当前用户的ID
				showSuccessPopup: false, // 控制弹窗显示
				showErrorPopup: false, // 控制错误弹窗显示
				errorMessage: '', // 错误信息
				weekError: '', // 行课周数错误提示
				nameError: '',
			};
		},
		onLoad(query) {
			// 获取 URL 中的参数
			this.classes.name = query.name || "";
			this.classes.address = query.address || "";
			this.classes.teacher = query.teacher || "";
			this.classes.contact = query.contact || "";
			this.classes.startWeek = query.startWeek || "";
			this.classes.endWeek = query.endWeek || "";
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
			// 验证行课周数
			// validateWeek() {
			// 	this.weekError = '';
			// 	if (this.classes.startWeek && parseInt(this.classes.startWeek) < 1) {
			// 		this.weekError = '起始周数必须是大于等于1的整数！';
			// 	}
			// 	if (this.classes.endWeek && parseInt(this.classes.endWeek) < 1) {
			// 		this.weekError = '结束周数必须是大于等于1的整数！';
			// 	}
			// 	if (
			// 		this.classes.startWeek &&
			// 		this.classes.endWeek &&
			// 		parseInt(this.classes.endWeek) < parseInt(this.classes.startWeek)
			// 	) {
			// 		console.log(this.classes.startWeek);
			// 		console.log(this.classes.endWeek);
			// 		this.weekError = '结束周数不能小于起始周数！';
			// 	}
			// },
			validateName() {
				this.nameError = '';
				if (!this.classes.name.trim()) {
					this.nameError = '课程名不能为空！';
				}
			},
			// 提交表单
			submitForm() {
				// this.validateWeek();
				// if (this.weekError) {
				// 	return; // 若有错误，则阻止提交
				// }
				if (this.nameError) {
					return; // 若有错误，则阻止提交
				}
				// 提交数据逻辑
				const entryData = {
					userId: getApp().globalData.userId, // 当前用户ID
					originalId: this.classes.id, // 原ID
					newRecord: {
						classname: this.classes.name,
						teacher_name: this.classes.teacher,
						classtime: this.classes.period,
						start_week: this.classes.startWeek,
						end_week: this.classes.endWeek,
						weekday: this.classes.weekDay,
						timetable_note: this.classes.notes,
						timetable_contact: this.classes.contact,
						location: this.classes.address,
					}
				};
				console.log(entryData);

				//与后端通信的代码（注释掉的部分）
				uni.request({
					url: 'http://47.108.162.90:3000/timetable/modifyClass',
					method: 'POST',
					data: entryData,
					success: (res) => {
						if (res.data.code === 200) {
							this.showSuccessPopup = true; // 显示“添加成功”弹窗
							setTimeout(() => {
								this.showSuccessPopup = false;
								uni.navigateTo({
									url: '/pages/study/timetable',
								});
							}, 1000);
						} else {
							console.error('失败:', res.data.message || '未知错误');
						}
					},
					fail: (err) => {
						console.error('请求失败:', err);
					},
				});


				console.log('提交的数据：', entryData);
				this.showSuccessPopup = true; // 显示“添加成功”弹窗

				setTimeout(() => {
					this.showSuccessPopup = false;
					uni.navigateTo({
						url: '/pages/study/timetable',
					});
				}, 1000);
			},
			closeErrorPopup() {
				this.showErrorPopup = false;
			},
		},
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

	.week-range {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}

	.week-input {
		flex: 1;
	}

	.week-input label {
		display: block;
		margin-bottom: 5px;
		color: #666;
	}

	.week-input input {
		width: 90%;
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 14px;
	}

	.error-message {
		color: #d9363e;
		margin-top: 5px;
		font-size: 14px;
	}
</style>