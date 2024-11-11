<template>
  <div class="diet-container">
    <!-- 饮食计划部分 -->
    <div class="section">
      <div class="section-header">
        <h2>饮食计划</h2>
        <!-- 日期选择器 -->
        <div class="date-selector">
          <picker mode="date" @change="changeDate" :value="selectedDate">
            <text>{{ selectedDate }}</text>
          </picker>
        </div>
        <uni-icons type="plusempty" size="30" class="add-icon" @click="addPlan" />
      </div>
      <ul class="plan-list">
        <li v-for="(plan, index) in filteredPlans" :key="index" class="plan-item">
          <div class="checkbox" @click="toggleComplete(index)">
            <uni-icons v-if="plan.completed" type="checkmarkempty" size="18" />
          </div>
          <div class="plan-content">
            <span class="plan-food">{{ plan.food }} - {{ plan.quantity }}份</span>
          </div>
          <uni-icons type="closeempty" size="20" class="delete-icon" @click="deletePlan(index)" />
        </li>
      </ul>
    </div>

    <!-- 饮食记录部分 -->
    <div class="section">
      <div class="section-header">
        <h2>饮食记录</h2>
        <uni-icons type="plusempty" size="30" class="add-icon" @click="addRecord" />
      </div>
      <ul class="record-list">
        <li v-for="(record, index) in filteredRecords" :key="index" class="record-item">
          <div class="record-content">
            <span class="record-info">{{ record.foodCategory }} - {{ record.quantity }}份</span>
            <span class="record-date">{{ record.date }}</span>
          </div>
          <uni-icons type="closeempty" size="20" class="delete-icon" @click="deleteRecord(index)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date().toISOString().split("T")[0],
      plans: [
        { food: '苹果', quantity: 2, date: '2024-11-11', completed: false },
        { food: '香蕉', quantity: 1, date: '2024-11-12', completed: true },
      ],
      records: [
        { foodCategory: '水果', quantity: 2, date: '2024-11-11' },
        { foodCategory: '蔬菜', quantity: 1, date: '2024-11-12' },
      ],
    };
  },
  computed: {
    filteredPlans() {
      return this.plans.filter(plan => plan.date === this.selectedDate);
    },
    filteredRecords() {
      return this.records.filter(record => record.date === this.selectedDate);
    }
  },
  onBackPress() {
  	// 在这里实现返回按钮点击后的逻辑
  	uni.redirectTo({
  		url: '/pages/life/index' // 替换为你指定的目标页面路径
  	});
  	return true; // 阻止默认的返回操作
  },
  methods: {
    changeDate(event) {
      this.selectedDate = event.detail.value;
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

.date-selector {
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

.checkbox {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 12px;
  cursor: pointer;
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

.plan-date, .record-date {
  font-size: 12px; /* 日期字体小一点 */
  color: #999;
  margin-top: 4px;
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
