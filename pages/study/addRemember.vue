<template>
  <div class="add-memo-container">
    <div class="form-group">
      <label for="memoText">备忘录内容：</label>
      <input v-model="memoText" type="text" id="memoText" placeholder="请输入备忘录内容" />
    </div>
    <div class="form-group">
      <label for="dueTime">截至时间：</label>
      <input v-model="dueTime" type="datetime-local" id="dueTime" min="2024-11-17T00:00" />
    </div>

    <div class="button-group">
      <button @click="saveMemo" class="save-btn">保存</button>
      <button @click="cancel" class="cancel-btn">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memoText: '',
      dueTime: '',
    };
  },
  methods: {
    saveMemo() {
      if (this.memoText && this.dueTime) {
        const newMemo = {
          text: this.memoText,
          dueTime: new Date(this.dueTime),
          completed: false
        };
        // 将新的备忘录保存到全局或父组件
        // 这里可以使用 uni.setStorage 或其他方式保存
        uni.setStorageSync('newMemo', newMemo);
        uni.navigateBack(); // 返回上一页
      } else {
        uni.showToast({ title: '请填写备忘录内容和时间', icon: 'none' });
      }
    },
    cancel() {
      uni.navigateBack(); // 取消时返回上一页
    }
  }
};
</script>

<style scoped>
.add-memo-container {
  padding: 16px;
  background-color: #f7f8fa;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.save-btn, .cancel-btn {
  padding: 8px 50px;
  border-radius: 10px;
  font-size: 16px;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
}
</style>
