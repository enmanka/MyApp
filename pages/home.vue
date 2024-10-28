
<template>
  <div class="homepage">
    <div class="content">
      <h1>首页</h1>
    </div>
    <!-- 传递 selectedIcon，并监听 update:selectedIcon 事件 -->
    <bottom :selectedIcon="selectedIcon" @update:selectedIcon="updateIcon" />
  </div>
</template>

<script>
import bottom from '@/pages/bottom.vue'; // 确保路径正确
export default {
  components: {
    bottom
  },
  data() {
    return {
      selectedIcon: '' // 从 localStorage 获取选中的图标
    };
  },
  mounted() {
    // 确保在组件加载时从 localStorage 中读取选中图标
    this.selectedIcon = '';
  },
  methods: {
    //保留
    updateIcon(icon) {
      this.selectedIcon = icon; // 更新本地状态
      uni.setStorageSync('selectedIcon', icon);
    }
  }
}
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
