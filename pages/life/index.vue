<template>
  <div class="lifeHomepage">
    <div class="lifeContent">
      <div class="modules">
        <div class="module weather" v-if="weather" @click="navigateTo('weather')">
          <div class="weather-content">
            <img :src="weather.icon" alt="天气图标" class="weather-icon" />
            <div class="weather-top">
              <p class="location-date">{{ weather.location }}</p>
              <p class="current-temp">{{ weather.temperature }}°C</p>
            </div>
            <div class="weather-bottom">
              <p><span class="label">温度范围：</span>{{ weather.tempRange }}</p>
              <p><span class="label">湿度：</span>{{ weather.humidity }}%</p>
              <p><span class="label">风向：</span>{{ weather.windDirection }}</p>
            </div>
          </div>
        </div>
        <div class="module contacts" @click="navigateTo('contacts')">
          <h2>通讯录</h2>
          <p>管理你的联系人信息</p>
        </div>
        <div class="module accounting" @click="navigateTo('accounting')">
          <h2>记账</h2>
          <p>记录你的开支和收入</p>
        </div>
        <div class="module sports" @click="navigateTo('sports')">
          <h2>运动</h2>
          <p>查看你的运动记录</p>
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
      selectedIcon: uni.getStorageSync('selectedIcon') || 'life',
      weather: {
        location: '成都',
        date: new Date().toLocaleDateString(),
        description: '晴',
        temperature: 25,
        tempRange: '20°C - 30°C',
        humidity: 60,
        windDirection: '东北',
        icon: 'path/to/weather-icon.png'
      }
    };
  },
  methods: {
    updateIcon(icon) {
      this.selectedIcon = icon;
      uni.setStorageSync('selectedIcon', icon);
    },
    navigateTo(page) {
      uni.navigateTo({ url: `/${page}` });
    }
  },
  mounted() {
    this.selectedIcon = uni.getStorageSync('selectedIcon') || 'life';
    console.log(this.weather);
  }
}
</script>

<style scoped>
.lifeHomepage {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 使整个页面高度为视口高度 */
  background: #e9f2ff; /* 使用浅蓝色背景 */
}

.lifeContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 改为从顶部开始 */
  overflow-y: auto; /* 允许内容滚动 */
  flex: 1; /* 占用剩余空间 */
}

.modules {
  display: block; /* 使模块自顶向下排列 */
  width: 100%;
  max-width: 800px;
}

.bottom {
  position: fixed; /* 固定定位 */
  bottom: 0; /* 固定在底部 */
  left: 0; /* 左边对齐 */
  width: 100%; /* 宽度为100% */
  z-index: 1000; /* 确保在其他内容之上 */
  background: #fcceb4; /* 设置底部背景为淡橙色 */
  padding: 10px 0; /* 添加内边距 */
}

.module {
  background: #ffffff; /* 模块背景色 */
  border: 1px solid #d2e0aa; /* 边框颜色 */
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  flex: 1 1 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.module:hover {
  transform: translateY(-2px);
}

.module.weather {
  background: #abd7fb; /* 天气模块使用蓝色背景 */
  color: #ffffff; /* 调整文字颜色 */
}

.weather-content {
  display: flex;
  flex-direction: column;
  position: relative;
}

.weather-icon {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.weather-top {
  margin-left: 80px;
}

.weather-bottom {
  margin-left: 80px;
  font-size: 12px;
  color: #ffffff; /* 调整副文本颜色以适应新的背景 */
}

.location-date {
  font-size: 14px;
  color: #ffffff; /* 更改为白色以适应蓝色背景 */
}

.current-temp {
  font-size: 24px;
  color: #ffffff; /* 更改为白色以适应蓝色背景 */
}

.label {
  font-weight: bold;
  color: #ffffff; /* 更改为白色以适应蓝色背景 */
}
</style>

