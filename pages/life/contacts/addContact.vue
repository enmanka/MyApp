<template>
  <div class="add-contact-page">
    <form @submit.prevent="submitForm">
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
        <input type="text" v-model="contact.occupation" placeholder="请输入职业" />
      </div>

      <!-- <div class="form-group">
        <label>年龄</label>
        <input type="number" v-model="contact.age" placeholder="请输入年龄" min="0" />
      </div> -->

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
        <label>群组</label>
        <input type="text" v-model="contact.group" placeholder="请输入组别" />
      </div>

      <div class="form-group">
        <label>备注</label>
        <textarea v-model="contact.notes" placeholder="请输入备注"></textarea>
      </div>

      <button type="submit" class="submit-button" @click="this.submitForm()">保存联系人</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        name: '',
        gender: '',
        occupation: '',
        //age: null,
        phone: '',
        qq: '',
        email: '',
        group: '',
        notes: '',
      },
      userID:getApp().globalData.userId, // 假设从本地存储或其他方式获取当前用户的ID
    };
  },
  onBackPress() {
  	// 在这里实现返回按钮点击后的逻辑
  	uni.redirectTo({
  		url: '/pages/life/contacts/contacts' // 替换为你指定的目标页面路径
  	});
  	return true; // 阻止默认的返回操作
  },
  methods: {
    // 提交表单并通过API将联系人数据发送到后端
	submitForm() {
		//检查姓名是否为空
		if (!this.contact.name.trim()||!this.contact.phone.trim()) { 
		    uni.showToast({ title: '姓名电话不能为空', icon: 'none' });
		    return; // 阻止表单提交
		}
		uni.request({
			
			url: 'http://47.108.162.90:3000/contact/addContact',
			method: 'POST',
			data: {
				user_id: this.userID, // 用户ID，
				//contact: this.contact, // 提交的联系人数据
				name:this.contact.name,
				gender:this.contact.gender,
				job:this.contact.occupation,
				//age: null,
				phone:this.contact.phone,
				QQnum:this.contact.qq,
				email:this.contact.email,
				grp:this.contact.group,
				//address: '',
				remark:this.contact.notes,
			},
		success: (res) => {
			if (res.data.code === 200) {
				uni.showToast({ title: '联系人保存成功', icon: 'success' });
				         setTimeout(() => {				          	
				          	uni.navigateTo({
				          		url: '/pages/life/contacts/contacts'
				          	});
				          }, 1000);
			} else {
				console.error('添加联系人失败:', res.data.message || '未知错误');
				uni.showToast({ title: '保存失败', icon: 'none' });
			}
		},
		fail: (err) => {
			console.error('请求失败:', err);
			uni.showToast({ title: '请求失败，请稍后重试', icon: 'none' });
		}
	});
	}, 
  },
};
</script>

<style scoped>
.add-contact-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

h2 {
  text-align: center;
  color: #4a90e2;
  font-size: 24px;
  margin-bottom: 20px;
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

.submit-button {
  width: 100%;
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

.submit-button:active {
  transform: scale(0.98);
}
</style>
