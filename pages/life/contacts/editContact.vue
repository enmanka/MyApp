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
        <label>电话</label>
        <input type="tel" v-model="contact.phone" placeholder="请输入电话" required />
      </div>
      
      <div class="form-group">
        <label>QQ</label>
        <input type="text" v-model="contact.QQnum" placeholder="请输入QQ" />
      </div>
      
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="contact.email" placeholder="请输入邮箱" />
      </div>
      
      <div class="form-group">
        <label>群组</label>
        <input type="text" v-model="contact.grp" placeholder="请输入组别" />
      </div>
      
      <div class="form-group">
        <label>备注</label>
        <textarea v-model="contact.remark" placeholder="请输入备注"></textarea>
      </div>
      
      <div class="button-group">
        <button type="button" class="delete-button" @click="showDeletePopup()">删除</button>
        <button type="submit" class="submit-button" @click="saveContact(this.contact.name,this.contact.phone)">保存</button>
      </div>
	  
	  <!-- 遮罩层 -->
	      <div v-if="showPopup" class="popup-overlay" @click="cancelDelete"></div>
	  <!-- 删除确认弹窗 -->
	      <div v-if="showPopup" class="popup delete-popup">
	        <p>确认删除此项吗？</p>
	        <div class="popup-actions">
	          <button @click="confirmDelete" class="confirm-btn">确认</button>
	          <button @click="cancelDelete" class="cancel-btn">取消</button>
	        </div>
	      </div>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
	  userID:getApp().globalData.userId, 
		//连接后端后使用
      contact: {
        contact_id: null,
        name: '',
        gender: '',
        job: '',
        phone: '',
        QQnum: '',
        email: '',
        grp: '',
        remark: '',
      },
	  showPopup: false,      // 控制弹窗显示
	  flag:0,
    };
  },
 //初始化
 onLoad(options) {
   this.contact.contact_id = options.id || null;
   this.contact.name = options.name || '';
   this.contact.gender = options.gender || '';
   this.contact.job = options.job || '';
   this.contact.phone = options.phone || '';
   this.contact.QQnum = options.QQnum || '';
   this.contact.email = options.email || '';
   this.contact.grp = options.grp || '';
   this.contact.remark = options.remark || '';
   //uni.showToast({ title: this.contact.contact_id, icon: 'success' });
   this.flag=1;
 },
 onBackPress() {
 	// 在这里实现返回按钮点击后的逻辑
	if(flag){
		const encodedName = encodeURIComponent(this.contact.name);
		const encodedId = encodeURIComponent(this.contact.contact_id);
		uni.redirectTo({
			url: '/pages/life/contacts/showContact?id=${encodedId}&name=${encodedName}' // 替换为你指定的目标页面路径
		});
		return true; // 阻止默认的返回操作
	}
 },
 created() {
   this.userId = getApp().globalData.userId;
 
 },
  methods: {
	 // 与后端链接的部分
    // 获取联系人信息
  //   fetchContact(id) {
  //     uni.request({
  //         url: `http://47.108.162.90:3000/contact/getContacts`, // 替换为实际API接口
  //         method: 'POST',
		//   data: {
		//     //user_id: this.userId,
		//     //contact_id:this.contact.id,	
		// 	name:this.contact.name,
		//   },
        
  //       success: (res) =>{if (response.statusCode === 200) {			
		// 	this.contact = response.data.result;
  //        } else {
  //         console.error('获取联系人信息失败:', response);
		//   uni.showToast({ title: '获取联系人信息失败', icon: 'none' });
  //        }
		// },
  //     fail: (err) => {
  //       console.error('请求失败:', err);
		// uni.showToast({ title: '请求失败', icon: 'none' });
  //     },
	 //  });
  //   },
    // 保存联系人信息
    saveContact(name,phone) {
		//检查姓名是否为空
		if (!this.flag||!name.trim()||!phone.trim()) { 
		    uni.showToast({ title: '姓名电话不能为空', icon: 'none' });
		    return; // 阻止表单提交
		}
		uni.request({
          url: `http://47.108.162.90:3000/contact/editContact`, // 替换为实际API接口
          method: 'PUT',
          data: {			  
			  name:this.contact.name,
			  gender:this.contact.gender,
			  phone:this.contact.phone,
			  job:this.contact.job,
			  grp:this.contact.grp,
			  remark:this.contact.remark,
			  email:this.contact.email,
			  QQnum:this.contact.QQnum,
			  contact_id:this.contact.contact_id,
			  },
			  
		  success: (res) =>{if (res.data.code === 200) {
		       uni.showToast({ title: '联系人已更新', icon: 'success' });
			   //this.contact=res.data.result;
		       setTimeout(() => {
				const encodedName = encodeURIComponent(this.contact.name);
				const encodedId = encodeURIComponent(this.contact.contact_id);
				uni.navigateTo({
				    url: `/pages/life/contacts/showContact?id=${encodedId}&name=${encodedName}`
				});
		       }, 1000);
		     }
			 else {
			   
		       uni.showToast({ title: '保存失败', icon: 'none' });
		     }
			 },
		  fail: (err) => {
		     console.error('请求失败:', err);
		     uni.showToast({ title: '请求失败，请稍后重试', icon: 'none' });
		   }
        });
        
    },
	// 显示删除弹窗
	showDeletePopup() { 
	  this.showPopup = true;         // 显示弹窗
	},
	// 取消删除操作
	cancelDelete() {
	  this.showPopup = false;   // 隐藏弹窗
	},
	// 确认删除操作
	confirmDelete() {
		this.cancelDelete();  // 关闭弹窗
		
	    this.deleteContact(this.contact.contact_id);
	},    
    // 删除联系人信息
    deleteContact(id) {
		if(!this.flag||!id){
			return;
		}
		uni.showToast({ title: id, icon: 'success' });
        uni.request({
			
            url: `http://47.108.162.90:3000/contact/deleteContact`, // 替换为实际API接口
            method: 'DELETE',
			data:{contact_id:id,},
			success: (res) =>{if (res.data.code === 200) {
				 //uni.showToast({ title: id, icon: 'success' });
			     uni.showToast({ title: '联系人已删除', icon: 'success' });
			     setTimeout(() => {          	
			     	uni.navigateTo({
			     		url: '/pages/life/contacts/contacts'
			     	});
			     }, 1000);
			   } else {
			     uni.showToast({ title: '删除失败', icon: 'none' });
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
/* 删除确认弹窗样式 */
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
