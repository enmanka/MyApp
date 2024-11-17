<template>
  <div class="editContactPage">
    <form @submit.prevent="saveContact">
      <div class="form-group">
        <label>姓名</label>
        <input type="text" v-model="contact.name" placeholder="请输入姓名" required />
      </div>
      
      <div class="form-group">
        <label>性别</label>
        <select v-model="contact.gender" required>
          <option value="" disabled>请选择性别</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>职业</label>
        <input type="text" v-model="contact.job" placeholder="请输入职业" />
      </div>
      
      <div class="form-group">
        <label>年龄</label>
        <input type="number" v-model="contact.age" placeholder="请输入年龄" min="0" />
      </div>
      
      <div class="form-group">
        <label>电话</label>
        <input type="tel" v-model="contact.phone" placeholder="请输入电话" required />
      </div>
      
      <div class="form-group">
        <label>QQ</label>
        <input type="text" v-model="contact.qq" placeholder="请输入QQ" />
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="contact.email" placeholder="请输入邮箱" />
      </div>
      
      <div class="form-group">
        <label>居住地址</label>
        <input type="text" v-model="contact.address" placeholder="请输入居住地址" />
      </div>
      
      <div class="form-group">
        <label>备注</label>
        <textarea v-model="contact.notes" placeholder="请输入备注"></textarea>
      </div>
      
      <div class="button-group">
        <button type="button" class="delete-button" @click="deleteContact">删除</button>
        <button type="submit" class="submit-button">保存</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
		
		//连接后端后使用
      contact: {
        id: null,
        name: '',
        gender: '',
        job: '',
        age: null,
        phone: '',
        qq: '',
        email: '',
        address: '',
        notes: '',
      },
    };
  },

 //初始化
 onLoad(options) {
   this.contact.id = options.id || null;
   this.contact.name = options.name || '';
   this.contact.gender = options.gender || '';
   this.contact.job = options.job || '';
   this.contact.age = options.age || null;
   this.contact.phone = options.phone || '';
   this.contact.qq = options.qq || '';
   this.contact.email = options.email || '';
   this.contact.address = options.address || '';
   this.contact.notes = options.notes || '';
 },
  methods: {
	 // 与后端链接的部分
    // 获取联系人信息
    async fetchContact(id) {
      try {
				  
        const response = await uni.request({
          url: `https://your-api.com/api/contacts/${id}`, // 替换为实际API接口
          method: 'GET',
        });
        if (response.statusCode === 200) {
          this.contact = response.data;
        } else {
          console.error('获取联系人信息失败:', response);
        }
      } catch (error) {
        console.error('请求失败:', error);
      }
    },
    // 保存联系人信息
    async saveContact() {
      try {
        const response = await uni.request({
          url: `https://your-api.com/api/contacts/${this.contact.id}`, // 替换为实际API接口
          method: 'PUT',
          data: this.contact,
        });
        if (response.statusCode === 200) {
          uni.showToast({ title: '联系人已更新', icon: 'success' });
          uni.navigateBack(); // 返回联系人列表页面
        } else {
          uni.showToast({ title: '保存失败', icon: 'none' });
        }
      } catch (error) {
        console.error('请求失败:', error);
        uni.showToast({ title: '请求失败，请稍后重试', icon: 'none' });
      }
    },
    // 删除联系人信息
    async deleteContact() {
      if (confirm("确定要删除该联系人吗？")) {
        try {
          const response = await uni.request({
            url: `https://your-api.com/api/contacts/${this.contact.id}`, // 替换为实际API接口
            method: 'DELETE',
          });
          if (response.statusCode === 200) {
            uni.showToast({ title: '联系人已删除', icon: 'success' });
            uni.navigateBack(); // 返回联系人列表页面
          } else {
            uni.showToast({ title: '删除失败', icon: 'none' });
          }
        } catch (error) {
          console.error('请求失败:', error);
          uni.showToast({ title: '请求失败，请稍后重试', icon: 'none' });
        }
      }
    },
	
	


  },
};
</script>

<style scoped>
.editContactPage {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #4a90e2;
  outline: none;
}

.form-group select {
  appearance: none;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.delete-button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  color: #ffffff;
  background-color: #ff5252;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.delete-button:hover {
  background-color: #e53935;
}

.submit-button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  color: #ffffff;
  background-color: #4a90e2;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #357abd;
}

.delete-button:active,
.submit-button:active {
  transform: scale(0.98);
}
</style>
