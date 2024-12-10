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
      >
        <!-- 图标 -->
        <uni-icons type="wallet-filled" size="30" color="#007AFF" class="note-icon" />
      
        <!-- 标题，点击跳转详情页 -->
        <span 
          class="note-name" 
          @click="viewNoteDetail(note)"
        >
          {{ note.note_title }}
        </span>
      
        <!-- 删除按钮 -->
        <uni-icons 
          type="closeempty" 
          size="20" 
          color="#FF4F4F" 
          class="delete-icon" 
          @click="showDeletePopup(note)" 
        />
      </div>

    </div>

    <!-- 添加笔记按钮 -->
    <div class="add-button-container">
      <uni-icons type="folder-add" size="50" color="#fff" class="add-icon" @click="addNote" />
    </div>
    
    
    <!-- 遮罩层 -->
        <div v-if="showPopup" class="popup-overlay" @click="cancelDelete()"></div>
    <!-- 删除确认弹窗 -->
        <div v-if="showPopup" class="popup delete-popup">
          <p>确认删除此项吗？</p>
          <div class="popup-actions">
            <button @click="confirmDelete()" class="confirm-btn">确认</button>
            <button @click="cancelDelete()" class="cancel-btn">取消</button>
          </div>
        </div>
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
      notes: [],	  
      showPopup: false, // 控制删除确认弹框的显示
      noteToDelete: null, // 要删除的笔记
      deleteIndex: null, // 要删除笔记的索引
	  userID:getApp().globalData.userId,  // 当前用户的 ID
    };
  },
	  
  onBackPress() {
  	// 在这里实现返回按钮点击后的逻辑
  	uni.redirectTo({
  		url: '/pages/study/index' // 替换为你指定的目标页面路径
  	});
  	return true; // 阻止默认的返回操作
  },
  computed: {
    // 根据搜索框的输入内容过滤笔记
    filteredNotes() {
      return this.notes.filter(note =>
        note.note_title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  created(){
  	  this.userId = getApp().globalData.userId;
  	  //页面加载时获取笔记列表
  	  this.fetchNotes();
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
        url: `/pages/study/noteDetail?title=${note.note_title}&id=${note.note_id}`, // 跳转到笔记详情页
      });
    },
    // 显示删除弹窗
    showDeletePopup(note) { 
	  this.noteToDelete = note;
      this.showPopup = true;         // 显示弹窗
	  uni.showToast({title: this.showDeletePopup,icon: 'none',});
    },
   // 取消删除操作
   cancelDelete() {
     this.showPopup = false;   // 隐藏弹窗
   },
   // 确认删除操作
   confirmDelete() {
   	this.cancelDelete();  // 关闭弹窗 	
    this.deleteNote(this.noteToDelete.note_id);
   }, 
    
	// 初始化时从后端获取所有笔记
	fetchNotes() {
	    // 发送请求到后端获取当前用户的笔记列表
	    uni.request({
	        url: `http://localhost:3000/notetake/getAllNotes`, // 后端获取笔记的接口
	        method: 'POST',
	        data: { user_id: this.userId,}, // 传入用户 ID
	        success: (res) => {
	          if (res.data.code === 200 && res.data.result) {
	            this.notes = res.data.result; // 更新本地笔记列表
	          } else {
	            uni.showToast({title: '获取笔记失败',icon: 'none',});
	          }
	        },
	        fail: (err) => {
	          console.error('获取笔记失败', err);
	          uni.showToast({title: '网络异常',icon: 'none',});
	        },
	    });
	},
	
    // 删除笔记
    deleteNote(id) {
        //调用后端接口删除笔记
        uni.request({
          url: `http://localhost:3000/notetake/deleteRecord`, // 后端删除笔记的接口
          method: 'DELETE',
		  data: {note_id:id,},
          success: (res) => {
            if (res.statusCode === 200) {
              // 移除笔记              
              uni.showToast({title: '笔记删除成功',icon: 'success',});
			  this.fetchNotes();
            } else {
              uni.showToast({title: '删除失败，请重试',icon: 'none',});
            }
          },
          fail: (err) => {
            console.error('删除笔记失败', err);
            uni.showToast({
              title: '删除失败，请检查网络',
              icon: 'none',
            });
          },
        });
      
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

/* 笔记标题默认样式 */
.note-name {
  font-size: 16px;
  color: #333; /* 默认颜色 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: color 0.3s ease; /* 添加平滑过渡效果 */
}

/* 鼠标悬停时的样式 */
.note-name:hover {
  color: #007AFF; /* 悬停时变为蓝色 */
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

.delete-icon {
  margin-left: auto; /* 推动到最右侧 */
  cursor: pointer;
  transition: transform 0.2s ease; /* 悬停时动画效果 */
}

.delete-icon:hover {
  transform: scale(1.2); /* 悬停时稍微放大 */
}


/* 删除弹框样式 
.delete-popup .popup-content {
  padding: 20px;
  text-align: center;
} */ 

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
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
/* 删除确认弹窗样式*/
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
</style>
