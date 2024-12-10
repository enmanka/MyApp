<template>
  <div class="class-note-container">
    <!-- 标题栏 -->
    <div class="header">
      <input 
        v-model="note_title" 
        class="note-title" 
        type="text" 
        placeholder="请输入笔记标题..." 
        @input="updateEditTime"
      />
      <p class="edit-time">最近编辑时间：{{ formattedEditTime }}</p>
    </div>

    <!-- 笔记内容 -->
    <textarea 
      v-model="note_content" 
      class="note-textarea" 
      placeholder="在这里记录笔记..."
      @input="updateEditTime"
    ></textarea>

    <!-- 保存与取消按钮 -->
    <div class="buttons-container">
      <button class="cancel-btn" @click="cancelEdit">取消</button>
      <button class="save-btn" @click="saveNote">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalNoteTitle: '', // 原始标题，用于取消时恢复
      originalNoteContent: '', // 原始内容，用于取消时恢复
      note_title: '', // 当前笔记标题
      note_content: '', // 当前笔记内容
      edit_time: new Date(), // 最近编辑时间
	  user_id: null, // 当前用户的ID
	  note_id: null, // 当前笔记ID
	  userId:getApp().globalData.userId,
    };
  },
  onBackPress() {
  	// 在这里实现返回按钮点击后的逻辑
  	uni.redirectTo({
  		url: '/pages/study/notes' // 替换为你指定的目标页面路径
  	});
  	return true; // 阻止默认的返回操作
  }, 
  computed: {
    // 格式化编辑时间，按 "yyyy/mm/dd hh:mm" 格式显示
    formattedEditTime() {
      const year = this.edit_time.getFullYear();
      const month = String(this.edit_time.getMonth() + 1).padStart(2, '0');
      const day = String(this.edit_time.getDate()).padStart(2, '0');
      const hours = String(this.edit_time.getHours()).padStart(2, '0');
      const minutes = String(this.edit_time.getMinutes()).padStart(2, '0');
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },
  },
  methods: {
    // 更新编辑时间
    updateEditTime() {
      this.edit_time = new Date(); // 每次输入时更新编辑时间
    },
    // 保存笔记
    saveNote() {
      if (this.note_title.trim() && this.note_content.trim()) {
        // 保存笔记逻辑，模拟后端API交互
        uni.request({
          url: 'http://localhost:3000/notetake/saveTextNote',  // 假设后端保存笔记的接口
          method: 'POST',
          data: {
            user_id: this.userId,  // 当前用户ID  
            note_title: this.note_title,  // 编辑后的标题
            note_content: this.note_content,  // 编辑后的内容
			edit_time:this.edit_time,
          },
          success: (res) => {
            if (res.statusCode === 200) {
              uni.showToast({ title: '笔记已保存', icon: 'success' });;
              // 更新原始数据
              this.originalNoteTitle = this.note_title;
              this.originalNoteContent = this.note_content;
			  setTimeout(() => {
			  	uni.navigateTo({
			  		url: '/pages/study/notes'
			  	});
				}, 1000);
            } else {
              uni.showToast({ title: '保存失败', icon: 'none' });
            }
          },
          fail: (err) => {
            uni.showToast({ title: '请求失败', icon: 'none' });
          }
        });
      } else {
        
		uni.showToast({ title: '标题和内容不能为空！', icon: 'none' });
      }
    },
    // 取消编辑，恢复到原始数据
    cancelEdit() {
      this.noteTitle = this.originalNoteTitle; // 恢复原始标题
      this.noteContent = this.originalNoteContent; // 恢复原始内容
    },
  },
  
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

.save-btn, .cancel-btn {
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
