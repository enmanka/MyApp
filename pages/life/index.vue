<template>
  <div class="lifeHomepage">
    <div class="lifeContent">
      <div class="modules">
        <div class="module weather" v-if="weatherData" @click="navigateTo('weather')">
          <div class="weatherData">
            <img :src="weatherData.iconUrl" alt="天气图标" class="weather-icon" />
            <div class="weather-top">
              <p class="location-date">{{ city }}</p>
              <!-- button @click="getWeather">获取实时天气</button> -->
              <p class="current-temp">{{ weatherData.temperature }}°C</p>
            </div>
            <div class="weather-bottom">
              <p><span class="label">湿度：</span>{{ weatherData.humidity }}%</p>
              <p><span class="label">风速：</span>{{ weatherData.windSpeed }}m/s</p>
            </div>
          </div>
        </div>

        <!-- Other modules -->
        <div class="module contacts" @click="navigateTo('contacts')">
          <h2>通讯录</h2>
          <p>管理你的联系人信息</p>
        </div>
        <div class="module accounting" @click="navigateTo('accounting')">
          <h2>记账</h2>
          <p>记录你的开支和收入</p>
        </div>
        <div class="module eat" @click="navigateTo('eating')">
          <h2>饮食</h2>
          <p>查看你的饮食记录</p>
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
      bottom,
    },
    data() {
      return {
        city: 'Chengdu',
        weatherData: null,
        selectedIcon: null,
        errorMessage: '',
      };
    },
    methods: {
      navigateTo(page) {
        const pageMap = {
          weather: '/pages/life/weather',
          contacts: '/pages/life/contacts/contacts',
          accounting: '/pages/life/accounting',
          eating: '/pages/life/eating',
        };
        uni.navigateTo({
          url: pageMap[page],
        });
      },
      async getWeather() {
        try {
          const response = await fetch('http://localhost:3000/weather/city?city=Chengdu');
          const data = await response.json();

          if (data.success) {
            this.weatherData = data.data;
          } else {
            this.errorMessage = '获取天气失败: ' + data.message;
          }
        } catch (error) {
          console.error('请求错误:', error);
          this.errorMessage = '请求错误: ' + error.message;
        }
      },
      updateIcon(icon) {
        this.selectedIcon = icon;
        uni.setStorageSync('selectedIcon', icon);
      },
    },
    mounted() {
      this.selectedIcon = uni.getStorageSync('selectedIcon') || 'life';
      this.getWeather(); // Optional: load weather on mount
    },
  };
</script>



<style scoped>
	.lifeHomepage {
		display: flex;
		flex-direction: column;
		height: 100vh;
		/* 使整个页面高度为视口高度 */
		background: #e9f2ff;
		/* 使用浅蓝色背景 */
	}

	.lifeContent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		/* 改为从顶部开始 */
		overflow-y: auto;
		/* 允许内容滚动 */
		flex: 1;
		/* 占用剩余空间 */
	}

	.modules {
		display: block;
		/* 使模块自顶向下排列 */
		width: 100%;
		max-width: 800px;
	}

	.bottom {
		position: fixed;
		/* 固定定位 */
		bottom: 0;
		/* 固定在底部 */
		left: 0;
		/* 左边对齐 */
		width: 100%;
		/* 宽度为100% */
		z-index: 1000;
		/* 确保在其他内容之上 */
		background: #fcceb4;
		/* 设置底部背景为淡橙色 */
		padding: 10px 0;
		/* 添加内边距 */
	}

	.module {
		background: #ffffff;
		/* 模块背景色 */
		border: 1px solid #d2e0aa;
		/* 边框颜色 */
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
		background: #abd7fb;
		/* 天气模块使用蓝色背景 */
		color: #ffffff;
		/* 调整文字颜色 */
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
		color: #ffffff;
		/* 调整副文本颜色以适应新的背景 */
	}

	.location-date {
		font-size: 14px;
		color: #ffffff;
		/* 更改为白色以适应蓝色背景 */
	}

	.current-temp {
		font-size: 24px;
		color: #ffffff;
		/* 更改为白色以适应蓝色背景 */
	}

	.label {
		font-weight: bold;
		color: #ffffff;
		/* 更改为白色以适应蓝色背景 */
	}
</style>
