<template>
  <div class="note-container">
    <!-- 搜索框 -->
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="搜索笔记..." 
        class="search-input"
      />
    </div>

    <!-- 笔记列表 -->
    <div class="note-list">
      <div 
        v-for="(note, index) in filteredNotes" 
        :key="index" 
        class="note-item"
        @click="viewNoteDetail(note)"
      >
        <uni-icons type="wallet-filled" size="30" color="#007AFF" class="note-icon" />
        <span class="note-name">{{ note.name }}</span>
        <uni-icons 
          type="closeempty" 
          size="20" 
          color="#FF4F4F" 
          class="delete-icon" 
          @click="confirmDelete(note, index)" 
        />
      </div>
    </div>

    <!-- 添加笔记按钮 -->
    <div class="add-button-container">
      <uni-icons type="folder-add" size="50" color="#fff" class="add-icon" @click="addNote" />
    </div>
    
    <!-- 删除确认弹框 -->
    <uni-popup ref="deletePopup" type="dialog" class="delete-popup">
      <div class="popup-content">
        <h3>确认删除</h3>
        <p>您确定要删除这个笔记吗？</p>
        <div class="popup-buttons">
          <button @click="deleteNote" class="confirm-btn">确认</button>
          <button @click="cancelDelete" class="cancel-btn">取消</button>
        </div>
      </div>
    </uni-popup>
  </div>
</template>

<script>
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue';

export default {
  components: {
    uniPopup,
    uniIcons,
  },
  data() {
    return {
      searchQuery: '', // 搜索框的内容
      notes: [
        { name: '数学笔记' },
        { name: '物理笔记' },
        { name: '编程笔记' },
        { name: '英语笔记' },
      ],
      showDeletePopup: false, // 控制删除确认弹框的显示
      noteToDelete: null, // 要删除的笔记
      deleteIndex: null, // 要删除笔记的索引
    };
  },
  computed: {
    // 根据搜索框的输入内容过滤笔记
    filteredNotes() {
      return this.notes.filter(note =>
        note.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    // 跳转到添加笔记页面
    addNote() {
      uni.navigateTo({
        url: '/pages/study/addNote', // 跳转到添加笔记页面
      });
    },
    // 查看笔记详情
    viewNoteDetail(note) {
      uni.navigateTo({
        url: `/pages/study/noteDetail?name=${note.name}`, // 跳转到笔记详情页
      });
    },
    // 显示删除确认弹框
   
    confirmDelete(note, index) {
       
        this.noteToDelete = note;
        this.deleteIndex = index;
        this.$refs.deletePopup.open(); // 手动调用打开弹框
      
    },

    // 删除笔记
    deleteNote() {
      if (this.deleteIndex !== null) {
        this.notes.splice(this.deleteIndex, 1); // 删除笔记
        this.$refs.deletePopup.close(); // 关闭弹框
      }
    },
    // 取消删除
    cancelDelete() {
      this.$refs.deletePopup.close(); // 关闭弹框
    },
  },
};
</script>


<style scoped>
.note-container {
  padding: 16px;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.search-container {
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.note-list {
  flex: 1;
  padding: 10px 0;
  overflow-y: auto;
}

.note-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 5px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.note-icon {
  margin-right: 15px;
}

.note-name {
  font-size: 16px;
  color: #333;
  flex-grow: 1;
}

.delete-icon {
  margin-left: 15px;
  cursor: pointer;
}

/* 按钮容器样式 */
.add-button-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #add8e6; /* 浅蓝色背景 */
  border-radius: 50%;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 添加按钮悬停效果 */
.add-button-container:hover {
  background-color: #87cefa; /* 悬停时改变背景颜色 */
}

.add-icon {
  color: white;
}

/* 删除弹框样式 */
.delete-popup .popup-content {
  padding: 20px;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.confirm-btn, .cancel-btn {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-btn {
  background-color: #FF4F4F;
  color: white;
  border: none;
}

.confirm-btn:hover {
  background-color: #e03e3e; /* 确认按钮悬停 */
}

.cancel-btn {
  background-color: #ccc;
  color: white;
  border: none;
}

.cancel-btn:hover {
  background-color: #b0b0b0; /* 取消按钮悬停 */
}
</style>
