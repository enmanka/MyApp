<template>
  <div class="studyHomepage">
    <div class="studyContent">
      <div class="modules">
        <div class="module timetable">
          <h2>课表查询</h2>
          <div class="timetable-content">
            <p>上午：数学 10:00 - 12:00</p>
            <p>下午：英语 14:00 - 16:00</p>
            <p>晚上：物理 09:00 - 11:00</p>
          </div>
        </div>
        <div class="module memo">
          <h2>备忘录</h2>
          <input type="text" v-model="memo" placeholder="添加备忘录" @keyup.enter="addMemo" />
          <ul>
            <li v-for="(item, index) in memos" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="module notes">
          <h2>课堂笔记</h2>
          <textarea v-model="note" placeholder="输入课堂笔记..."></textarea>
          <button @click="saveNote">保存笔记</button>
          <ul>
            <li v-for="(item, index) in notes" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
    <bottom :selectedIcon="selectedIcon" @update:selectedIcon="updateIcon" />
  </div>
</template>

<script>
import bottom from '@/pages/bottom.vue';

export default {
  components: {
    bottom
  },
  data() {
    return {
      selectedIcon: uni.getStorageSync('selectedIcon') || 'study',
      memo: '',
      memos: [],
      note: '',
      notes: []
    };
  },
  methods: {
    updateIcon(icon) {
      this.selectedIcon = icon;
      uni.setStorageSync('selectedIcon', icon);
    },
    addMemo() {
      if (this.memo) {
        this.memos.push(this.memo);
        this.memo = '';
      }
    },
    saveNote() {
      if (this.note) {
        this.notes.push(this.note);
        this.note = '';
      }
    }
  },
  mounted() {
    this.selectedIcon = uni.getStorageSync('selectedIcon') || 'study';
  }
}
</script>

<style scoped>
.studyHomepage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f4f8; /* 背景色 */
}

.bottom {
  position: fixed; /* 固定定位 */
  bottom: 0; /* 固定在底部 */
  left: 0; /* 左边对齐 */
  width: 100%; /* 宽度为100% */
  z-index: 1000; /* 确保在其他内容之上 */
}

.studyContent {
  flex: 1; /* 允许内容区占用剩余空间 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 改为从顶部开始 */
  padding: 20px;
  overflow-y: auto; /* 允许内容区滚动 */
}

.modules {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
}

.module {
  background: #ffffff; /* 模块背景色 */
  border: 1px solid #d0d7de; /* 边框颜色 */
  border-radius: 10px; /* 边角圆润 */
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s; /* 过渡效果 */
}

.module:hover {
  transform: translateY(-2px); /* 悬浮效果 */
}

.module h2 {
  margin-bottom: 15px;
  color: #333; /* 标题颜色 */
}

.timetable-content {
  background: #e1f5fe; /* 课表背景颜色 */
  padding: 10px;
  border-radius: 5px;
  border-left: 4px solid #0288d1; /* 侧边栏 */
}

input[type="text"], textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  width: calc(100% - 40px); /* 减去左右边距的总宽度 */
  padding: 5px 10px;
  margin: 5px 10px; /* 左右边距设置为20px */
  border: 1px solid #ccc;
  border-radius: 5px;
}


button {
  padding: 5px 10px; /* 调整上下和左右的内边距 */
  font-size: 14px; /* 调整字体大小 */
  background: #03a9f4; /* 按钮颜色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0288d1; /* 悬停颜色 */
}
</style>
