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
          {{ note.name }}
        </span>
      
        <!-- 删除按钮 -->
        <uni-icons 
          type="closeempty" 
          size="20" 
          color="#FF4F4F" 
          class="delete-icon" 
          @click.stop="confirmDelete(note, index)" 
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
	  //notes: [], // 笔记列表（从后端获取）
	  //连接后端后注释掉下面内容note:[...]
      notes: [
        { id:1,name: '数学笔记' },
        { id:2,name: '物理笔记' },
        { id:3,name: '编程笔记' },
        { id:4,name: '英语笔记' },
      ],
	  
      showDeletePopup: false, // 控制删除确认弹框的显示
      noteToDelete: null, // 要删除的笔记
      deleteIndex: null, // 要删除笔记的索引
	  //userID:null  // 当前用户的 ID（假设已通过登录获取）
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
        url: `/pages/study/noteDetail?name=${note.name}&id=${note.id}`, // 跳转到笔记详情页
      });
    },
    // 显示删除确认弹框
   
    confirmDelete(note, index, event) {
          // 显式阻止冒泡
          event.stopPropagation();
          this.noteToDelete = note;
          this.deleteIndex = index;
          this.$refs.deletePopup.open();
        },
	// 初始化时从后端获取所有笔记
	    // fetchNotes() {
	    //   // 发送请求到后端获取当前用户的笔记列表
	    //   uni.request({
	    //     url: `/api/notes`, // 假设后端获取笔记的接口为 /api/notes
	    //     method: 'GET',
	    //     data: { userId: this.userId }, // 传入用户 ID
	    //     success: (res) => {
	    //       if (res.statusCode === 200 && res.data.notes) {
	    //         this.notes = res.data.notes; // 更新本地笔记列表
	    //       } else {
	    //         uni.showToast({
	    //           title: '获取笔记失败',
	    //           icon: 'none',
	    //         });
	    //       }
	    //     },
	    //     fail: (err) => {
	    //       console.error('获取笔记失败', err);
	    //       uni.showToast({
	    //         title: '网络异常',
	    //         icon: 'none',
	    //       });
	    //     },
	    //   });
	    // },
	// 实时搜索笔记（后端联动）
	    searchNotes() {
	      // 搜索时调用后端接口
	      uni.request({
	        url: `/api/notes/search`, // 假设搜索接口路径为 /api/notes/search
	        method: 'POST',
	        data: {
	          userId: this.userId, // 当前用户 ID
	          keyword: this.searchQuery, // 搜索关键字
	        },
	        success: (res) => {
	          if (res.statusCode === 200 && res.data.notes) {
	            this.notes = res.data.notes; // 更新笔记列表为搜索结果
	          } else {
	            uni.showToast({
	              title: '未找到相关笔记',
	              icon: 'none',
	            });
	          }
	        },
	        fail: (err) => {
	          console.error('搜索笔记失败', err);
	          uni.showToast({
	            title: '搜索失败',
	            icon: 'none',
	          });
	        },
	      });
	    },
    // 删除笔记
    deleteNote() {
      if (this.noteToDelete) {
        // 调用后端接口删除笔记
        // uni.request({
        //   url: `/api/notes/${this.noteToDelete.id}`, // 假设后端删除笔记的接口为 `/api/notes/:id`
        //   method: 'DELETE',
        //   success: (res) => {
        //     if (res.statusCode === 200) {
        //       // 从本地 notes 数组中移除笔记
        //       this.notes.splice(this.deleteIndex, 1);
        //       this.$refs.deletePopup.close(); // 关闭弹框
        //       uni.showToast({
        //         title: '笔记删除成功',
        //         icon: 'success',
        //       });
        //     } else {
        //       uni.showToast({
        //         title: '删除失败，请重试',
        //         icon: 'none',
        //       });
        //     }
        //   },
        //   fail: (err) => {
        //     console.error('删除笔记失败', err);
        //     uni.showToast({
        //       title: '删除失败，请检查网络',
        //       icon: 'none',
        //     });
        //   },
        // });
      }
    },

    // 取消删除
    cancelDelete() {
      this.$refs.deletePopup.close(); // 关闭弹框
    },
  },
  //连接后端后开启下面注释内容·
  // 从本地存储获取 userId
    // const userId = uni.getStorageSync('userId');
    // if (userId) {
    //   this.userId = userId; // 将 userId 绑定到组件数据中
    //   this.fetchNotes();    // 调用获取笔记的方法
    // } 
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
  transform: scale(1.2); /* 悬停时稍微放大按钮 */
}
</style>
