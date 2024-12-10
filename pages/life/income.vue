<template>
	<div class="container">
		<!-- 上半部分：12个圆圈 -->
		<div class="circle-container">
			<div v-for="(circle, index) in circles" :key="index" class="circle" :class="{'selected': circle.selected}"
				@click="selectCategory(index)">
				<!-- <img :src="circle.imgSrc" alt="默认图片" class="circle-img" /> -->
				<uni-icons :type="circle.selected ? 'star-filled' : 'star'" size=40 class="circle-icon" />
				<p class="category-name">{{ circle.category }}</p>
			</div>
		</div> 
		

		<!-- 下半部分：计算器 -->
		<div class="calculator">
			<!-- 显示框 -->
			<div class="display-box">
				<p>{{ display }}</p>
			</div>

			<!-- 备注和输入框在同一行 -->
			<div class="remark-container">
				<label for="remark">备注：</label>
				<input v-model="remark" id="remark" placeholder="输入备注..." />
			</div>

			<!-- 日期选择部分-->
			<div class="date-selector">
				<label for="date-picker">日期：</label>
				<input type="date" id="date-picker" v-model="currentDate" />
			</div>

			<!-- 计算器按钮 -->
			<div class="calculator-buttons">
				<button v-for="(button, index) in buttons1" :key="index" @click="onButtonClick(button)">
					{{ button }}
				</button>
			</div>

			<div class="button-separator"></div>

			<div class="calculator-buttons">
				<button v-for="(button, index) in buttons2" :key="index" @click="onButtonClick(button)">
					{{ button }}
				</button>
			</div>

			<div class="button-separator"></div>

			<div class="calculator-buttons">
				<button v-for="(button, index) in buttons3" :key="index" @click="onButtonClick(button)">
					{{ button }}
				</button>
			</div>

			<div class="button-separator"></div>

			<div class="calculator-buttons">
				<button v-for="(button, index) in buttons4" :key="index" @click="onButtonClick(button)">
					{{ button }}
				</button>
			</div>
		</div>
		<!-- 添加成功弹窗 -->
		<div v-if="showSuccessPopup" class="popup">
			添加成功！
		</div>

		<!-- 提示弹窗 -->
		<div v-if="showAlert" class="alert-overlay" @click="closeAlert">
			<div class="alert-modal" @click.stop>
				<p>{{ alertMessage }}</p>
				<button @click="closeAlert">关闭</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showSuccessPopup: false, // 控制弹窗显示
				
				circles: [
				            {category: "工资", selected: false },
				            {category: "利润", selected: false },
				            {category: "退款", selected: false },
				            {category: "奖金", selected: false },
				            {category: "赠与", selected: false },
				            {category: "兼职", selected: false },
				            {category: "网络收入", selected: false },
				            {category: "利息", selected: false },
				            {category: "股息", selected: false },
				            {category: "资本利得", selected: false },
				            {category: "版税", selected: false },
				            {category: "其它", selected: false }
				            ],
				
				
				
				userId: getApp().globalData.userId,
				remark: "",
				myData: "",
				currentDate: new Date().toISOString().split('T')[0], // 当前日期，格式为YYYY-MM-DD
				display: "",
				buttons1: ["7", "8", "9", "确定"], // "确定"按钮在这里
				buttons2: ["4", "5", "6", "+"],
				buttons3: ["1", "2", "3", "-"],
				buttons4: ["0", ".", "C", "="],
				showDatePicker: false, // 控制日期选择弹窗的显示
				newDate: "", // 新选择的日期
				selectedCategory: null, // 记录选择的类别
				showAlert: false, // 控制提示弹窗的显示
				alertMessage: "", // 提示弹窗的消息
				type: '',
				description: '',
				amount: '',
				date: '',
				//当某条记录修改时跳转至该页面，id变为具体的值
				id: "none"
			};
		},
		onBackPress() {
			// 在这里实现返回按钮点击后的逻辑
			uni.redirectTo({
				url: '/pages/life/accounting' // 替换为你指定的目标页面路径
			});
			return true; // 阻止默认的返回操作
		},
		onLoad(options) {
			// 设置初始值
			this.selectedCategory = options.category || null;
			this.display = options.amount || "";
			this.remark = options.remark || "";
			this.currentDate = options.date || this.currentDate;
			this.myDate = options.date || "";
			this.id = options.recordId || "none";
			// 如果有类别，自动选中
			const categoryIndex = this.circles.findIndex(circle => circle.category === this.selectedCategory);
			if (categoryIndex !== -1) {
				this.selectCategory(categoryIndex);
			}
		},
		computed: {
			// 格式化日期显示在按钮上
			formattedDate() {
				const date = new Date(this.currentDate);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, "0");
				const day = date.getDate().toString().padStart(2, "0");
				return `${year}-${month}-${day}`;
			}
		},
		methods: {
			onButtonClick(button) {
				if (button === "=") {
					this.calculate();
				} else if (button === "C") {
					this.display = ""; // 归零
				} else if (button === "确定") {
					this.confirmEntry(); // 绑定"确定"按钮的逻辑
				} else {
					this.display += button;
				}
			},

			calculate() {
				try {
					// 替换除法符号和加法符号，确保能正常计算
					this.display = this.display.replace(/\*/g, '+'); // 将乘法替换为加法
					this.display = eval(this.display); // 执行计算
				} catch {
					this.display = "错误";
				}
			},

			selectCategory(index) {
				this.circles.forEach((circle, i) => {
					circle.selected = i === index;
				});
				this.selectedCategory = this.circles[index].category;
			},
			

			openDatePicker() {
				this.showDatePicker = true;
				this.newDate = this.currentDate;
			},
			closeDatePicker() {
				this.showDatePicker = false;
			},
			setDate() {
				this.currentDate = this.newDate;
				this.closeDatePicker();
			},

			confirmEntry() {
				// 检查条件
				if (this.selectedCategory === null || parseFloat(this.display) === 0 || !this.display) {
					this.showAlertMessage("请选择类别并输入有效的金额！");
					return;
				}
				// 检查金额是否为负数
				if (parseFloat(this.display) < 0) {
					this.showAlertMessage("金额不能为负数！");
					return;
				}

				// 用户选择了类别，输入了金额，并且金额大于0，可以提交
				const entryData = {
					category: this.selectedCategory,
					amount: this.display,
					remark: this.remark,
					date: this.currentDate,
				};
				
				this.amount = this.display;

				// 与后端通信的代码，传入id、userId、日期等数据
				
				uni.request({
				    url: 'http://localhost:3000/account/addRecord',
				    method: 'POST',
				    data: {
				        userId: this.userId,
				        id: this.id,
				        mydate: this.myDate,
				        date: this.currentDate,
				        remark: this.remark,
				        amount: this.amount,
				        type: 'income', 
				        category: this.selectedCategory,
				    },
				    success: (res) => {
				        if (res.data.code === 200) {
				            this.showSuccessPopup = true;
				            setTimeout(() => {
				                this.showSuccessPopup = false;
				                uni.navigateTo({
				                    url: '/pages/life/accounting'
				                });
				            }, 1000);
				        } else {
				            console.error('添加账单失败:', res.data.message || '未知错误');
				        }
				    },
				    fail: (err) => {
				        console.error('请求失败:', err);
				    }
				});
				
				console.log("提交的数据：", entryData);
				this.showSuccessPopup = true; // 显示“添加成功”弹窗

				// 1秒后自动隐藏弹窗
				setTimeout(() => {
					this.showSuccessPopup = false;
					uni.navigateTo({
						url: '/pages/life/accounting'
					});
				}, 1000);
			},

			// 弹出提示框
			showAlertMessage(message) {
				this.alertMessage = message;
				this.showAlert = true;
			},

			closeAlert() {
				this.showAlert = false;
			}
		}
	};
</script>

<style scoped>
	
	.container {
		padding: 16px;
		font-family: Arial, sans-serif;
	}

	.circle-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 8px;
		margin-bottom: 16px;
		text-align: center;
	}

	.circle {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		/* background-color: #f0f0f0; */
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		padding: 16px;
		/* border: 1px solid #ccc; *//* 方形框的边框 */
		/* border-radius: 8px; */ /* 方框的圆角 */
		/* transition: background-color 0.3s ease; */ /* 添加过渡效果 */
	}

	.circle.selected {
		background-color: #ffe3a1;
	}

	/* .circle-img {
		width: 50px;
		height: 50px;
		
		border-radius: 50%;
		background-color: #f0f0f0;
		margin-bottom: 8px;
	} */
	.circle-icon {
			font-size: 30px;
			color: #999;
	}
	
	.circle.selected .circle-icon {
			color: #ff9900; /* 选中后的图标颜色 */
	}
	

	.category-name {
		font-size: 14px;
		color:#333;
		white-space: nowrap; /* 确保文本不换行 */
		margin-top: 8px;
	}

	.calculator {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}

	.display-box {
		width: 100%;
		height: 30px;
		background-color: #f9f9f9;
		border: 1px solid #ccc;
		padding: 10px;
		text-align: right;
		font-size: 24px;
		margin-bottom: 16px;
	}

	.remark-container {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 16px;
	}

	.remark-container label {
		margin-right: 8px;
	}

	.remark-container input {
		flex: 1;
		padding: 8px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.date-selector {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	.date-selector label {
		margin-right: 8px;
		font-size: 16px;
	}

	.date-selector input[type="date"] {
		padding: 6px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.calculator-buttons {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 4px;
		width: 100%;
		justify-items: stretch; /* 拉伸按钮使其填满每列 */
	}

	.calculator-buttons button {
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #fff;
		cursor: pointer;
		height: 50px;
		width:100%
	}

	.calculator-buttons button:disabled {
		background-color: #ddd;
		cursor: not-allowed;
	}

	.button-separator {
		margin: 16px 0;
	}

	/* 日期选择弹窗遮罩和动画效果 */
	.date-picker-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn 0.3s ease-in-out;
	}

	.date-picker-modal {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		text-align: center;
	}

	.date-picker-modal button {
		margin-top: 10px;
	}

	/* 变暗的动画效果 */
	.container .darken {
		animation: fadeOut 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0.5;
		}
	}

	.alert-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn 0.3s ease-in-out;
	}

	.alert-modal {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		text-align: center;
	}

	.alert-modal button {
		margin-top: 10px;
	}

	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #4CAF50;
		color: white;
		padding: 20px;
		border-radius: 5px;
		font-size: 16px;
		text-align: center;
	}
</style>