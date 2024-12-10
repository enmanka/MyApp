<template>
	<div class="container">
		<!-- 上半部分：12个圆圈 -->
		<div class="circle-container">
			<div v-for="(circle, index) in circles" :key="index" class="circle" :class="{'selected': circle.selected}"
				@click="selectCategory(index)">
				<uni-icons :type="circle.selected ? 'star-filled' : 'star'" size=40 class="circle-icon" />
				<p class="category-name">{{ circle.category }}</p>
			</div>
		</div> 

		<!-- 下半部分：备注与日期选择 -->
		<div class="remark-container">
			<label for="remark">备注：</label>
			<input v-model="remark" id="remark" placeholder="输入备注..." />
		</div>

		<!-- 日期选择部分-->
		<div class="date-selector">
			<label for="date-picker">日期：</label>
			<input type="date" id="date-picker" v-model="currentDate" />
		</div>

		<!-- 份数选择部分 -->
		<div class="quantity-selector">
			<label for="diet-record">选择份数：</label>
			<uni-icons v-if="currentQuantity >= 0" type="minus" size="20" @click="decreaseQuantity" class="minus-icon" />
			<span class="quantity-number">{{ currentQuantity }}份</span>
			<uni-icons v-if="currentQuantity < maxQuantity" type="plus" size="20" @click="increaseQuantity" class="plus-icon" />
		</div>

		<!-- 保存与取消按钮 -->
		<div class="action-buttons">
			<button @click="saveEntry">保存</button>
			<button @click="cancelEntry">取消</button>
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
				{category: "饮品", selected: false },
				{category: "早餐", selected: false },
				{category: "午餐", selected: false },
				{category: "晚餐", selected: false },
				{category: "零食", selected: false },
				{category: "外卖", selected: false },
				{category: "食堂", selected: false },
				{category: "水果", selected: false },
				{category: "甜品", selected: false },
				{category: "烧烤", selected: false },
				{category: "快餐", selected: false },
				{category: "其它", selected: false }
			],
			remark: "",
			currentDate: new Date().toISOString().split('T')[0], // 当前日期
			currentQuantity: 1, // 默认数量为1
			maxQuantity: 50, // 最大数量
			alertMessage: "",
			userId: getApp().globalData.userId,
			newDate: "", // 新选择的日期
			selectedCategory: null, // 记录选择的类别
			id:"none",//该条记录的id
			showAlert: false
		};
	},
	onBackPress() {
				// 在这里实现返回按钮点击后的逻辑
				uni.redirectTo({
					url: '/pages/life/eating' // 替换为你指定的目标页面路径
				});
				return true; // 阻止默认的返回操作
	},
	onLoad(options) {
				// 设置初始值
				this.selectedCategory = options.description || null;
				this.display = options.amount || "";
				this.remark = options.remark || "";
				this.currentDate = options.date || this.currentDate;
				this.myDate = options.date || "";
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
		selectCategory(index) {
			this.circles.forEach((circle, i) => {
				circle.selected = i === index;
			});
			this.selectedCategory = this.circles[index].category;
		},
		decreaseQuantity() {
			if (this.currentQuantity > 0) {
				this.currentQuantity--;
			}
		},
		increaseQuantity() {
			if (this.currentQuantity < this.maxQuantity) {
				this.currentQuantity++;
			}
		},
		saveEntry() {
			// 保存逻辑
			console.log("保存的数据:", {
				remark: this.remark,
				currentDate: this.currentDate,
				currentQuantity: this.currentQuantity
			});
			// 显示保存成功提示
			this.showAlertMessage("保存成功！");
			// 调用后端接口
			this.confirmEntry();
		},
		cancelEntry() {
			// 取消逻辑
			console.log("取消");
			this.remark = "";
			this.currentQuantity = 1;
			this.currentDate = new Date().toISOString().split('T')[0];
		},
		showAlertMessage(message) {
			this.alertMessage = message;
			this.showAlert = true;
		},
		closeAlert() {
			this.showAlert = false;
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
						if (this.selectedCategory === null || parseFloat(this.currentQuantity) === 0 || !this.currentQuantity) {
							this.showAlertMessage("请选择类别并输入有效的数目！");
							return;
						}
						// 检查数目是否为正数
						if (parseFloat(this.currentQuantity) <= 0) {
							this.showAlertMessage("数目不能为负数或0！");
							return;
						}
		
						// 用户选择了类别，输入了数目，并且数目大于0，可以提交
						const entryData = {
							category: this.selectedCategory,
							quantity: this.currentQuantity,
							remark: this.remark,
							date: this.currentDate,
						};
		
						// 与后端通信的代码，传入id(若id!=none则需要先删除对应日期的对应记录)、userId、日期等数据
						
						this.quantity = this.currentQuantity;
						
						uni.request({
							url: 'http://localhost:3000/diet/addRecord',
							method: 'POST',
							data: {
								userId: this.userId,
								//若为修改逻辑，则此处的id不为none，为相应记录的id
								id: this.id,
								//若为修改逻辑，则此处传递需要删除的原来的那条记录的日期
								
								date: this.currentDate,
								remark: this.remark,
								quantity: this.currentQuantity,
								category: this.selectedCategory,
							},
							success: (res) => {
								if (res.data.code === 200) {
									this.showSuccessPopup = true; // 显示“添加成功”弹窗
									          
									          setTimeout(() => {
									          	this.showSuccessPopup = false;
									          	uni.navigateTo({
									          		url: '/pages/life/eating'
									          	});
									          }, 1000);
								} else {
									console.error('添加失败:', res.data.message || '未知错误');
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
								url: '/pages/life/eating'
							});
						}, 1000);
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
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		padding: 16px;
	}

	.circle.selected {
		background-color: #ffe3a1;
	}

	.circle-icon {
		font-size: 30px;
		color: #999;
	}

	.circle.selected .circle-icon {
		color: #ff9900; /* 选中后的图标颜色 */
	}

	.category-name {
		font-size: 14px;
		color: #333;
		white-space: nowrap; /* 确保文本不换行 */
		margin-top: 8px;
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
		
	.diet-record label{
		margin-right: 8px;
		font-size: 16px;
	}
	.quantity-selector {
		display: flex;
		align-items: center;
		margin-bottom: 16px;
	}

	.quantity-number {
		margin: 0 10px;
		font-size: 16px;
		color: #333;
		
	}

	.plus-icon, .minus-icon {
		cursor: pointer;
		color: #007aff;
	}

	.action-buttons {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.action-buttons button {
		padding: 5px 16px;
		font-size: 16px;
		border: none;
		border-radius: 4px;
		background-color: #007aff;
		color: white;
		cursor: pointer;
		width: 48%;
	}

	.action-buttons button:hover {
		background-color: #005bb5;
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
	}

	.alert-modal {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		text-align: center;
	}

	.alert-modal button {
		padding: 2px 6px;
		margin-top: 5px;
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
