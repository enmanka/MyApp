<template>
  <view class="container">
    <button @click="showTxtFile">显示 TXT 文件内容</button>
  </view>
</template>

<script>
export default {
  methods: {
    showTxtFile() {
      const filePath = '/static/login/userAgreement.txt'; // 确保文件路径正确
      
      uni.request({
        url: filePath,
        method: 'GET',
        responseType: 'text',
        success: (res) => {
          // 检查响应状态码
          if (res.statusCode === 200) {
            uni.showModal({
              title: '文件内容',
              content: res.data,
              showCancel: false
            });
          } else {
            uni.showToast({
              title: '文件读取失败: ' + res.statusCode,
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          console.error('文件读取失败:', err);
          uni.showToast({
            title: '读取文件失败',
            icon: 'none'
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
