<template>
  <div class="class-note-container">
    <!-- 标题栏 -->
    <div class="header">
      <input 
        v-model="noteTitle" 
        class="note-title" 
        type="text" 
        placeholder="请输入笔记标题..." 
        @input="updateEditTime"
      />
      <p class="edit-time">最近编辑时间：{{ formattedEditTime }}</p>
    </div>

    <!-- 笔记内容 -->
    <textarea 
      v-model="noteContent" 
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
      originalNoteTitle: '', // 用于取消操作时恢复原始标题
      originalNoteContent: '', // 用于取消操作时恢复原始内容
      noteTitle: '', // 当前编辑中的标题
      noteContent: '', // 当前编辑中的内容
      editTime: new Date(), // 最近编辑时间
    };
  },
  computed: {
    // 格式化最近编辑时间
    formattedEditTime() {
      const year = this.editTime.getFullYear();
      const month = String(this.editTime.getMonth() + 1).padStart(2, '0');
      const day = String(this.editTime.getDate()).padStart(2, '0');
      const hours = String(this.editTime.getHours()).padStart(2, '0');
      const minutes = String(this.editTime.getMinutes()).padStart(2, '0');
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    },
  },
  methods: {
    // 更新编辑时间
    updateEditTime() {
      this.editTime = new Date();
    },
    // 保存笔记
    saveNote() {
      if (this.noteTitle.trim() && this.noteContent.trim()) {
        // 保存逻辑，模拟后端API交互
        console.log('保存笔记：', {
          title: this.noteTitle,
          content: this.noteContent,
          editTime: this.editTime,
        });
        this.originalNoteTitle = this.noteTitle; // 更新原始数据
        this.originalNoteContent = this.noteContent;
        alert('笔记已保存！');
      } else {
        alert('标题和内容不能为空！');
      }
    },
    // 取消编辑并恢复到初始状态
    cancelEdit() {
      this.noteTitle = this.originalNoteTitle; // 恢复标题
      this.noteContent = this.originalNoteContent; // 恢复内容
    },
  },
  mounted() {
    // 初始化数据，模拟从路由参数中获取笔记详情
    const params = this.$route.query;
    this.originalNoteTitle = params.title || '默认标题';
    this.originalNoteContent = params.content || '笔记内容';
    //this.noteTitle = this.originalNoteTitle;
    this.noteContent = this.originalNoteContent;
  },
  onLoad(options) {
      this.noteTitle = options.name; // 使用传递的参数
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
