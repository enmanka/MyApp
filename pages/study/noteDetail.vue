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
      currentUserId: null, // 当前用户的ID
      noteId: null, // 当前笔记ID
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
	// 获取笔记的详细信息
	// fetchNoteDetail(noteId, userId) {
	//   uni.request({
	//     url: `/api/note/${noteId}`, // 假设后端接口
	//     method: 'GET',
	//     data: {
	//       userId: userId,  // 传递当前用户ID
	//       noteId: noteId,   // 传递笔记ID
	//     },
	//     success: (res) => {
	//       if (res.statusCode === 200) {
	//         const data = res.data;
	//         // 如果后端返回的数据格式是 { title: '笔记标题', content: '笔记内容' }
	//         this.originalNoteTitle = data.title || '默认标题';
	//         this.originalNoteContent = data.content || '笔记内容';
	//         this.noteTitle = this.originalNoteTitle;
	//         this.noteContent = this.originalNoteContent;
	//       } else {
	//         uni.showToast({ title: '加载失败', icon: 'none' });
	//       }
	//     },
	//     fail: (err) => {
	//       uni.showToast({ title: '请求失败', icon: 'none' });
	//     }
	//   });
	// },

    // 保存笔记
    // saveNote() {
    //   if (this.noteTitle.trim() && this.noteContent.trim()) {
    //     // 保存笔记逻辑，模拟后端API交互
    //     uni.request({
    //       url: '/api/note/save',  // 假设后端保存笔记的接口
    //       method: 'POST',
    //       data: {
    //         userId: this.currentUserId,  // 当前用户ID
    //         noteId: this.noteId,  // 当前笔记ID
    //         title: this.noteTitle,  // 编辑后的标题
    //         content: this.noteContent,  // 编辑后的内容
    //       },
    //       success: (res) => {
    //         if (res.statusCode === 200) {
    //           alert('笔记已保存！');
    //           // 更新原始数据
    //           this.originalNoteTitle = this.noteTitle;
    //           this.originalNoteContent = this.noteContent;
    //         } else {
    //           uni.showToast({ title: '保存失败', icon: 'none' });
    //         }
    //       },
    //       fail: (err) => {
    //         uni.showToast({ title: '请求失败', icon: 'none' });
    //       }
    //     });
    //   } else {
    //     alert('标题和内容不能为空！');
    //   }
    // },

    // 取消编辑并恢复到初始状态
    cancelEdit() {
      this.noteTitle = this.originalNoteTitle; // 恢复标题
      this.noteContent = this.originalNoteContent; // 恢复内容
    },
  },
  //与后端连接后开启下面内容
  // mounted() {
  //     const userId = uni.getStorageSync('userId');
      
  //     this.currentUserId = userId;
  //     const params = this.$route.query;
  //     this.noteId = params.id;
  //     this.fetchNoteDetail(this.noteId, this.currentUserId);
  //   },
  
  onLoad(options) {
      this.noteTitle = options.name; // 使用传递的参数
	  // 从 URL 中获取传递的参数
	      const noteId = options.id; // 获取笔记的 id
	      const noteName = options.name; // 获取笔记的 name
	   this.noteId = noteId; // 保存笔记ID   
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
