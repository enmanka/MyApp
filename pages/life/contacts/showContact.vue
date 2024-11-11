<template>
  <div class="contactDetailPage">
    <!-- 顶部的图标和编辑按钮 -->
    <div class="header">
      <uni-icons type="person" size="100" class="person-icon"></uni-icons>
      <uni-icons type="compose" size="30" class="edit-icon" @click="editContact"></uni-icons>
    </div>

    <!-- 联系人详细信息展示 -->
    <div class="contact-info">
      <div class="info-item" v-if="contact.name">
        <label>姓名：</label>
        <span>{{ contact.name }}</span>
      </div>
      <div class="info-item" v-if="contact.gender">
        <label>性别：</label>
        <span>{{ contact.gender }}</span>
      </div>
      <div class="info-item" v-if="contact.job">
        <label>职业：</label>
        <span>{{ contact.job }}</span>
      </div>
      <div class="info-item" v-if="contact.age">
        <label>年龄：</label>
        <span>{{ contact.age }}</span>
      </div>
      <div class="info-item" v-if="contact.phone">
        <label>电话：</label>
        <span>{{ contact.phone }}</span>
      </div>
      <div class="info-item" v-if="contact.qq">
        <label>QQ：</label>
        <span>{{ contact.qq }}</span>
      </div>
      <div class="info-item" v-if="contact.email">
        <label>Email：</label>
        <span>{{ contact.email }}</span>
      </div>
      <div class="info-item" v-if="contact.address">
        <label>居住地址：</label>
        <span>{{ contact.address }}</span>
      </div>
      <div class="info-item" v-if="contact.notes">
        <label>备注：</label>
        <span>{{ contact.notes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
	  //用于查看样式的代码
	  // contact: {
	  //         id: this.$route.query.id,
	  //         name: "Alice",
	  //         gender: "女",
	  //         job: "软件工程师",
	  //         age: 28,
	  //         phone: "123-456-7890",
	  //         qq: "12345678",
	  //         email: "alice@example.com",
	  //         address: "北京市朝阳区",
	  //         notes: "这是备注信息",
	  //       },
      contact: {
        id: this.$route.query.id,
        name: "",
        gender: "",
        job: "",
        age: null,
        phone: "",
        qq: "",
        email: "",
        address: "",
        notes: "",
      },
    };
  },
  created() {
    this.fetchContactDetails();
  },
  methods: {
    // 从后端获取联系人详细信息
    async fetchContactDetails() {
      try {
        const response = await uni.request({
          url: `https://your-api.com/api/contacts/${this.contact.id}`, // 替换为实际API地址
          method: 'GET',
        });

        // 检查响应状态
        if (response.statusCode === 200) {
          this.contact = response.data; // 设置contact数据
        } else {
          console.error("获取联系人信息失败:", response);
          uni.showToast({ title: "获取联系人失败", icon: "none" });
        }
      } catch (error) {
        console.error("请求失败:", error);
        uni.showToast({ title: "请求失败，请稍后重试", icon: "none" });
      }
    },
    // 跳转到编辑联系人页面
    editContact() {
      uni.navigateTo({
        url: `/pages/life/contacts/editContact?id=${this.contact.id}`,
      });
    },
  },
};
</script>

<style scoped>
.contactDetailPage {
  padding: 20px;
  background-color: #f9fafc;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.person-icon {
  color: #4a90e2;
}

.edit-icon {
  position: absolute;
  bottom: 10px;
  right: 40px;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 5px;
  color: #ff9800;
  cursor: pointer;
}

.contact-info {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

label {
  font-weight: bold;
  color: #333;
  width: 80px;
}

span {
  color: #666;
}
</style>
