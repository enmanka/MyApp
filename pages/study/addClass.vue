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
				<div class="week-inputs">
				  <input
					type="number" v-model="classes.weekStart" placeholder="开始周" />
				  <input
					type="number" v-model="classes.weekEnd" placeholder="结束周" />
				</div>
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
	        weekStart: 1, // 起始周
	        weekEnd: 16,  // 结束周
	        notes: '',
	        id: -1, // 默认值为 -1，表示新记录
	        weekDay: -1, // 传入判断
	        period: -1, // 传入判断
	      },
	      userId: '', // 当前用户 ID
	      originalId: null, // 原记录 ID（用于修改时）
	      showSuccessPopup: false,
	      showErrorPopup: false,
	      errorMessage: '', // 错误信息
	    };
	  },
	  onLoad(query) {
	    // 从 URL 参数获取数据，用于回显和判断是否是修改
		this.classes.name = query.name || "";
		this.classes.address = query.address || "";
		this.classes.teacher = query.teacher || "";
		this.classes.contact = query.contact || "";
		this.classes.week = query.week || "";
		this.classes.id = query.id || ""; // 获取 id
		this.classes.notes = query.notes || "";
		//从0开始，记录课程所处的日期
		// this.classes.weekDay = query.weekDay || "";
		//记录课程的节数
		// this.classes.period = query.period || "";
		
		this.classes.weekDay = query.dayIndex || -1;
		this.classes.period = query.periodIndex || -1;
		// 使用 id 做其他操作，例如查询该课程的详细信息
		console.log(this.classes.weekDay);
		if (query.userId) {
	      this.userId = query.userId;
		  Object.assign(this.classes, query);
	    } 
		else {
	      // 或从全局变量获取 userId
	      this.userId = getApp().globalData.userId || '';
		  }
		  if (query.id) {
		    this.originalId = query.id; // 如果存在原 ID，则设置为修改逻辑
		  }
	    },
	  
	  methods: {
	   // 提交表单到后端
	    submitForm() {
	      if (!this.classes.name.trim()) {
	        this.errorMessage = '课程名不能为空！';
	        this.showErrorPopup = true;
	        return;
	      }
	
	      // 准备请求数据
	      const requestData = {
	        userId: this.userId, // 当前用户 ID
	        originalId: this.originalId, // 修改时传递原记录 ID
	        newRecord: {
	          classname: this.classes.name,
	          teacher_name: this.classes.teacher,
	          classtime: this.classes.period,
	          start_week: this.classes.weekStart,
	          end_week: this.classes.weekEnd,
	          weekday: this.classes.weekDay,
	          timetable_note: this.classes.notes,
	          timetable_contact: this.classes.contact,
	          location: this.classes.address,
	        },
	      };
	
	      // 发起请求
	      uni.request({
	        url: 'http://localhost:3000/timetable/modifyClass',
	        method: 'POST',
	        data: requestData,
	        success: (res) => {
	          if (res.data.code === 200) {
	            this.showSuccessPopup = true;
	            setTimeout(() => {
	              this.showSuccessPopup = false;
	              uni.navigateTo({
	                url: '/pages/study/timetable',
	              });
	            }, 1000);
	          } else {
	            this.errorMessage = res.data.message || '操作失败！';
	            this.showErrorPopup = true;
	          }
	        },
	        fail: (err) => {
	          console.error('请求失败:', err);
	          this.errorMessage = '网络错误，请稍后再试！';
	          this.showErrorPopup = true;
	        },
	      });
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