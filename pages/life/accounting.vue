<template>
  <view class="container">
    <!-- 收入/支出按钮 -->
    <view class="button-group">
      <button class="income-button" @click="setType('income')">收入</button>
      <button class="expense-button" @click="setType('expense')">支出</button>
    </view>

    <!-- 日期与总支出/总收入 -->
    <view class="header">
      <view class="date-selector">
        <picker mode="date" @change="changeDate" :value="selectedDate">
          <text>{{ selectedDate }}</text>
        </picker>
      </view>
      <view class="totals">
        <text>收入：{{ totalIncome }}</text>
        <text>支出：{{ totalExpense }}</text>
      </view>
    </view>

    <!-- 记账信息列表 -->
    <scroll-view class="record-list">
      <!-- 如果没有记录，显示提示信息 -->
      <view v-if="records.length === 0">
        <text>没有记录</text>
      </view>
      <!-- 修正了 v-for 循环中的标签结构 -->
      <view v-for="(record, index) in records" :key="index" class="record-item">
        <view @click="openModal(index, $event)">
          <text class="record-description">{{ record.description }}</text>
          <text class="record-amount">
            {{ record.type === 'income' ? '+' : '-' }}{{ record.amount }}
          </text>
        </view>
      </view>
    </scroll-view>

    <!-- 遮罩层，弹窗显示时其他组件变暗 -->
    <view v-if="showModal" class="overlay show" @click="closeModal"></view>

    <!-- 删除弹窗 -->
    <view v-if="showModal" :style="{ top: modalPosition }" class="modal show">
      <view class="modal-item" @click="editRecord">修改</view>
      <view class="modal-item" @click="deleteRecord(selectedRecordIndex)">删除</view>
      <view class="modal-item" @click="closeModal">取消</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      selectedDate: new Date().toISOString().split("T")[0],
      totalIncome: 0,
      totalExpense: 0,
      records: [],
      showModal: false,
      selectedRecordIndex: null,
      modalPosition: '0px',
      longPressTimer: null,
	  id: -1,
    };
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

    // 页面加载时根据日期和用户ID获取当前账单条目
    this.fetchRecords();
  },
  methods: {
    setType(type) {
      const pageMap = {
        income: '/pages/life/income',
        expense: '/pages/life/expense',
      };
      uni.navigateTo({
        url: pageMap[type]
      });
    },
    changeDate(event) {
      this.selectedDate = event.detail.value;
      this.updateTotals();

      // 切换日期时向后端请求对应日期的数据
      this.fetchRecords();
    },
    fetchRecords() {
      uni.request({
        url: 'http://localhost:3000/account/getRecords', // 后端接口地址
        method: 'POST',
        data: {
          userId: this.userId,
          date: this.selectedDate
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.records = res.data.records;
            this.updateTotals();
          } else {
            console.error('获取账单数据失败:', res.data.message || '未知错误');
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });
    },
    updateTotals() {
      if (this.records.length === 0) {
        // 如果没有记录，设置总收入和总支出为 0
        this.totalIncome = 0;
        this.totalExpense = 0;
      } else {
        // 计算总收入和总支出
        this.totalIncome = this.records
          .filter((record) => record.type === "income")
          .reduce((sum, record) => sum + record.amount, 0);
        this.totalExpense = this.records
          .filter((record) => record.type === "expense")
          .reduce((sum, record) => sum + record.amount, 0);
      }
    },
    // 打开弹窗
    openModal(index, event) {
      this.selectedRecordIndex = index;

      // 防错处理，确保 event 对象存在
      if (event && event.changedTouches && event.changedTouches[0]) {
        this.modalPosition = `${event.changedTouches[0].clientY + 10}px`; // 根据点击位置更新弹窗位置
      } else {
        this.modalPosition = '0px'; // 默认位置
      }

      this.showModal = true;
    },
    closeModal() {
      clearTimeout(this.longPressTimer);
      this.showModal = false;
    },
	
    deleteRecord(index) {
      // 删除时根据用户ID和条目ID删除该条目
	  const recordId = this.records[index].recordId;  // 获取记录 ID
      uni.request({
        url: 'http://localhost:3000/account/deleteRecord',
        method: 'POST',
        data: {
          userId: this.userId,
          recordId: recordId
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.records.splice(index, 1);
            this.updateTotals();
          } else {
            console.error('删除账单失败:', res.data.message || '未知错误');
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });

      this.records.splice(index, 1);
      this.updateTotals();
      this.closeModal();
    },
    editRecord() {
      const record = this.records[this.selectedRecordIndex];
      const pageUrl = record.type === 'income' ? '/pages/life/income' : '/pages/life/expense';
	  const category = record.type === 'income' ? record.incomeType : record.expenseType;

	  uni.navigateTo({
        url: `${pageUrl}?type=${record.type}&recordId=${record.recordId}&remark=${record.description}&amount=${record.amount}&date=${this.selectedDate}&category=${category}`
      });
	  
      this.closeModal();
    },
  },
  mounted() {
    this.records = [];
    this.updateTotals();
  },
};
</script>

<style scoped>
  .container {
    padding: 16px;
    font-family: Arial, sans-serif;
  }

  .button-group {
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
  }

  .income-button,
  .expense-button {
    width: 48%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    border-radius: 8px;
    text-align: center;
  }

  .income-button {
    background-color: #4CAF50;
  }

  .expense-button {
    background-color: #F44336;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 8px 0;
  }

  .date-selector text {
    color: #333;
    font-size: 14px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .totals {
    text-align: right;
  }

  .totals text {
    display: block;
    font-size: 14px;
    color: #333;
    margin-bottom: 4px;
  }

  .record-list {
    margin-top: 16px;
  }

  .record-item {
    display: flex;
    justify-content: space-between;  /* 确保左右两端对齐 */
    align-items: center;
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .record-description {
    flex-grow: 1;  /* 使描述占据可用空间 */
    text-align: left;  /* 保证描述文本靠左 */
  }
  
  .record-amount {
    text-align: right;  /* 保证金额文本靠右 */
    font-weight: bold;  /* 让金额看起来更加突出 */
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    /* 初始透明 */
    z-index: 9;
    transition: background-color 0.3s ease;
    /* 变暗动画 */
  }

  .overlay.show {
    background-color: rgba(0, 0, 0, 0.5);
    /* 变暗效果 */
  }

  .modal {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    z-index: 10;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .modal.show {
    opacity: 1;
    transform: translateY(0);
  }

  .modal-item {
    padding: 10px;
    font-size: 16px;
    text-align: center;
    color: #333;
    border-bottom: 1px solid #ddd;
  }

  .modal-item:last-child {
    border-bottom: none;
  }
</style>