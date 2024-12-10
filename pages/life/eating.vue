<template>
  <div class="diet-container">
    <!-- 饮食计划部分 -->
    <div class="section">
      <div class="section-header">
        <h2>饮食计划</h2>
        <!-- 月份选择器 -->
            <div class="date-selector">
            	<input type="month" v-model="this.selectedMonth" />
            </div>
            <uni-icons type="plusempty" size="30" class="add-icon" @click="addPlan" />
          </div>
          <ul class="plan-list">
        	  <!-- 如果没有记录，显示提示信息 -->
        	  		<view v-if="plans.length === 0">
        	  			<text>没有计划</text>
        	  		</view>
            <li v-for="(plan, index) in this.plans" :key="index" class="plan-item">
             
              <div class="plan-content">
                <span class="plan-food">{{ plan.type }} - </span>
        		<uni-icons
        		              v-if="plan.currentQuantity >=0" 
        		              type="minus" 
        		              size="20" 
        		              @click="minusCurrentQuantity(index)" 
        		              class="minus-icon"
        		            />
        		<span class="plan-number">{{ plan.currentQuantity }}份</span>
        		<uni-icons 
        		              v-if="plan.currentQuantity <= 100" 
        		              type="plus" 
        		              size="20" 
        		              @click="increaseCurrentQuantity(index)" 
        		              class="increase-icon"
        		            />
        		<span class="plan-food"> -- 剩余额度：{{ plan.quantityRemaining }}份</span>
        		<!-- <div class="plan-end-date">{{ plan.endDate }}</div> -->
              </div>
              <uni-icons type="closeempty" size="20" class="delete-icon" @click="showDeletePopup('plan', index)" />
            </li>
          </ul>
        </div>

    <!-- 饮食记录部分 -->
    <div class="section">
      <div class="section-header">
        <h2>饮食记录</h2>
		<!-- 日期选择器 -->
		<div class="date-selector">
		  <picker mode="date" @change="changeDate" :value="selectedDate">
		    <text>{{ selectedDate }}</text>
		  </picker>
		</div>
        <uni-icons type="plusempty" size="30" class="add-icon" @click="addRecord" />
      </div>
      <ul class="record-list">
		<!-- 如果没有记录，显示提示信息 -->
		<view v-if="records.length === 0">
			<text>没有记录</text>
		</view>
        <li v-for="(record, index) in this.records" :key="index" class="record-item">
          <div class="record-content">
            <span class="record-info">{{ record.foodCategory }}类：{{ record.foodItem }} - {{ record.quantity }}份</span>
            <!-- <span class="record-date">{{ record.date }}</span> -->
          </div>
          <uni-icons type="closeempty" size="20" class="delete-icon" @click="showDeletePopup('record', index)" />
        </li>
      </ul>
    </div>
	
	<!-- 遮罩层 -->
	    <div v-if="showPopup" class="popup-overlay" @click="cancelDelete"></div>
	<!-- 删除确认弹窗 -->
	    <div v-if="showPopup" class="popup delete-popup">
	      <p>确认删除此项吗？</p>
	      <div class="popup-actions">
	        <button @click="confirmDelete" class="confirm-btn">确认</button>
	        <button @click="cancelDelete" class="cancel-btn">取消</button>
	      </div>
	    </div>
		
  </div>
</template>

<script>
export default {
  data() {
    return {
	  userId: '',
      selectedDate: new Date().toISOString().split("T")[0],
	  selectedMonth: new Date().toISOString().slice(0, 7),
      plans: [],
      records: [],
	  userId: getApp().globalData.userId,
	  // 弹窗相关
	   showPopup: false,      // 控制弹窗显示
	   itemToDelete: null,    // 当前要删除的项目（plan 或 record）
	   itemIndex: null,       // 当前要删除的项目索引
    };
  },
  watch: {
      // 监听 selectedMonth 的变化
      selectedMonth(newMonth) {
        if (newMonth) {
          this.fetchPlans(newMonth); // 调用后端接口获取饮食计划
        }
      },
    },
  computed: {
  },
  onBackPress() {
  	// 在这里实现返回按钮点击后的逻辑
  	uni.redirectTo({
  		url: '/pages/life/index' // 替换为你指定的目标页面路径
  	});
  	return true; // 阻止默认的返回操作
  },
  created() {
    this.userId = getApp().globalData.userId;
  
    // 页面加载时根据日期和用户ID获取当前饮食记录条目和饮食计划
	
    this.fetchRecords();
	this.fetchPlans();
  },
  methods: {
	// 显示删除弹窗
	showDeletePopup(itemType, index) {
	  this.itemToDelete = itemType;  // 记录要删除的是计划还是记录
	  this.itemIndex = index;        // 记录要删除的项的索引
	  this.showPopup = true;         // 显示弹窗
	},
	// 取消删除操作
	cancelDelete() {
	  this.showPopup = false;   // 隐藏弹窗
	  this.itemToDelete = null;  // 清空当前项
	  this.itemIndex = null;     // 清空当前项索引
	},
	// 确认删除操作
	confirmDelete() {
	  const record = this.records[this.itemIndex];
	  const plan = this.plans[this.itemIndex];
	  if (this.itemToDelete === 'plan') {
	    this.plans.splice(this.itemIndex, 1);  // 删除计划项
		this.deletePlanFromServer(plan);
		uni.navigateTo({
			url: '/pages/life/eating'
		});
	  } else if (this.itemToDelete === 'record') {
	    this.records.splice(this.itemIndex, 1);  // 删除记录项
		this.deleteRecordFromServer(record);	
		uni.navigateTo({
			url: '/pages/life/eating'
		});
	  }
	  this.cancelDelete();  // 关闭弹窗
	},
	changeMonth(event){
		this.selectedMonth = event.target.value;
		console.log(this.selectedMonth);
		// 切换月份时向后端请求对应月份的数据
		this.fetchPlans();
	},
	//与后端连接部分--获取饮食计划
	fetchPlans() {
		uni.request({
		    url: 'http://47.108.162.90:3000/diet/getPlans', // 后端接口地址
		    method: 'POST',
		    data: {
		      userId: this.userId,
		      month: this.selectedMonth
		    },
		    success: (res) => {
		        if (res.data.code === 200) {
		        this.plans = res.data.plans;
		        } else {
		            console.error('获取饮食计划数据失败:', res.data.message || '未知错误');
		        }
		    },
		    fail: (err) => {
		        console.error('请求失败:', err);
		    }
		  });
		},
    changeDate(event) {
        this.selectedDate = event.detail.value;
	    // 切换日期时向后端请求对应日期的数据
	    this.fetchRecords();
    },
	fetchRecords() {
	    uni.request({
	        url: 'http://47.108.162.90:3000/diet/getRecords', // 后端接口地址
	        method: 'POST',
	        data: {
	            userId: this.userId,
	            date: this.selectedDate
	        },
	        success: (res) => {
	            if (res.data.code === 200) {
	                this.records = res.data.records;
	            } else {
	                console.error('获取饮食记录数据失败:', res.data.message || '未知错误');
	            }
	        },
	        fail: (err) => {
	             console.error('请求失败:', err);
	        }
	    });
	},
    addPlan() {
      // 跳转到添加饮食计划页面
            uni.navigateTo({
              url: '/pages/life/eatingout' // 跳转到 eatingout 页面
            });
    },
    toggleComplete(index) {
      this.plans[index].completed = !this.plans[index].completed;
    },
    deletePlan(index) {
      this.plans.splice(index, 1);
    },
    addRecord() {
      // 跳转到添加饮食记录页面
            uni.navigateTo({
              url: '/pages/life/eatingin' // 跳转到 eatingin 页面
            });
    },
	// 从服务器删除计划
	deletePlanFromServer(plan) {
	    uni.request({
	        url: 'http://47.108.162.90:3000/diet/deletePlan', // 后端接口地址
	        method: 'POST',
	        data: {
	          userId: this.userId,
	          planId: plan.id  // 假设每个计划有一个唯一的 id
	        },
	        success: (res) => {
	          if (res.data.code === 200) {
	            this.plans.splice(index, 1);  // 删除计划项
	          } else {
	            console.error('删除饮食计划失败:', res.data.message || '未知错误');
	          }
	        },
	        fail: (err) => {
	          console.error('请求失败:', err);
	        }
	    });
	},
	// 从服务器删除记录
	deleteRecordFromServer(record) {
		uni.request({
		    url: 'http://47.108.162.90:3000/diet/deleteRecord', // 后端接口地址
		    method: 'POST',
		    data: {
		      userId: this.userId,
		      recordId: record.recordId  // 假设每个记录有一个唯一的 id
		    },
		    success: (res) => {
		      if (res.data.code === 200) {
		        this.records.splice(index, 1);  // 删除记录项
		      } else {
		        console.error('删除饮食记录失败:', res.data.message || '未知错误');
		      }
		    },
		    fail: (err) => {
		      console.error('请求失败:', err);
		    }
		});
	},
	
	addPlan() {
	  // 跳转到添加饮食计划页面
	    uni.navigateTo({
	        url: '/pages/life/eatingout' // 跳转到 eatingout 页面
	    });
	},
	increaseCurrentQuantity(index) {
	    const plan = this.plans[index];
	    if (plan.currentQuantity < 100) {
	        plan.currentQuantity += 1;  // 增加当前份数
			this.editPlan(plan);
	    }
	},
	 minusCurrentQuantity(index) {
	    const plan = this.plans[index];
	    if (plan.currentQuantity >0) {
	        plan.currentQuantity -= 1;  // 减少当前份数
			this.editPlan(plan);
	    }
	},
	editPlan(plan){
			uni.request({
				url: 'http://47.108.162.90:3000/diet/editPlan',
				method: 'POST',
				data: {
					userId: this.userId,
					//若为修改逻辑，则此处的id不为none，为相应记录的id
					id: plan.id,
					//若为修改逻辑，则此处传递需要删除的原来的那条的日期
					
					quantity: plan.currentQuantity
				},
				success: (res) => {
					if (res.data.code === 200) {
						console.log("修改成功");
					} else {
						console.error('添加失败:', res.data.message || '未知错误');
					}
				},
				fail: (err) => {
					console.error('请求失败:', err);
				}
			});
			this.fetchPlans();
		},
	toggleComplete(index) {
	  this.plans[index].completed = !this.plans[index].completed;
	},
	deletePlan(index) {
	  this.plans.splice(index, 1);
	},
	addRecord() {
	  // 跳转到添加饮食记录页面
	    uni.navigateTo({
	        url: '/pages/life/eatingin' // 跳转到 eatingin 页面
	    });
	},
	deleteRecord(index) {
	    this.records.splice(index, 1);
	}
  },
};
</script>

<style scoped>
.diet-container {
  padding: 16px;
  background-color: #f7f8fa;
}

.section {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: #e0f2e0; /* 浅绿色背景 */
  padding: 8px;
  border-radius: 8px;
}

.section-header h2 {
  font-size: 20px;
  color: #333;
  flex-grow: 1;
  margin-left: 10px;
}
.picker-container {
  display: block; /* 确保 picker 显示 */
}
.date-selector {
  margin-left: 10px;
}
/* 为月份选择器添加样式 */
input[type="month"] {
  border: 1px solid #ccc; /* 边框 */
  border-radius: 4px; /* 圆角 */
  padding: 8px; /* 内边距 */
  font-size: 16px; /* 字体大小 */
}

/* 为显示选中月份的span添加样式 */
span {
  margin-left: 10px; /* 与输入框的间距 */
  font-size: 16px; /* 字体大小 */
}
.month-selector {
  margin-left: 10px;
}

.date-selector text {
  color: #333;
  font-size: 14px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.month-selector text {
  color: #333;
  font-size: 14px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.plan-list, .record-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-item, .record-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  
}

.plan-content, .record-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.plan-food, .record-info {
  font-size: 16px;
  color: #333;
}

 .record-date {
  font-size: 12px; /* 日期字体小一点 */
  color: #999;
  margin-top: 4px;
}

.plan-end-date {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
.minus-icon {
  margin-left: 10px;
  cursor: pointer;
  color: #007aff;
}

/* 遮罩层 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);  /* 半透明黑色遮罩 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.increase-icon {
  margin-left: 10px;
  cursor: pointer;
  color: #007aff;
}
/* 删除确认弹窗样式 */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #ccc; /* 灰色背景 */
  color: white;
  font-size: 18px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}

.popup-actions {
   margin-top: 20px;
   display: flex;
   justify-content: center;
}

.popup-actions button {
  padding: 5px 10px;
  margin: 0 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  background-color: #4caf50; /* 确认按钮绿色 */
  color: white;
}

.confirm-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f1f1f1; /* 取消按钮灰色 */
  color: #333;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}


.delete-icon {
  color: red;
  cursor: pointer;
}

.add-icon {
  color: #007aff;
  cursor: pointer;
}
</style>
