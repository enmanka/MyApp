<template>
	<div class="contactsPage">
		<!-- 右上角的添加联系人按钮 -->
		<button class="add-button" @click="navigateTo('addContact')">
			<uni-icons type="plusempty" size="50"
				:style="{ color: selectedIcon === 'add' ? 'blue' : '#C7D4DD' }"></uni-icons>
		</button>

		<!-- 搜索框 -->
		<div class="search-bar">
			<input v-model="searchQuery" type="text" placeholder="搜索联系人" @input="filterContacts" class="search-input" />
		</div>

		<!-- 联系人列表 -->
		<div v-for="(contactsGroup, letter) in groupedContacts" :key="letter" class="contacts-group">
			<div class="group-header">{{ letter }}</div>
			<div v-for="contact in contactsGroup" :key="contact.contact_id" class="contact-item"
				@click="navigateToContactDetails(contact.contact_id,contact.name)">
				<p>{{ contact.name }}</p>
				<p>{{ contact.phone }}</p>

			</div>
		</div>
	</div>
</template>

<script>
	// 引入pinyin库
    import pinyin from 'pinyin';
	export default {
		data() {
			return {
				searchQuery: '', // 搜索框的内容
				selectedIcon: '', // 当前选中的图标
				
				contacts: [], // 初始化为空数组，后续从后端获取				
					  
				filteredContacts: [], // 存储过滤后的联系人
				userID:getApp().globalData.userId, 
			};
		},
		onBackPress() {
			// 在这里实现返回按钮点击后的逻辑
			uni.redirectTo({
				url: '/pages/life/index' // 替换为你指定的目标页面路径
			});
			return true; // 阻止默认的返回操作
		},
		computed: {
			// 根据搜索过滤联系人列表
			groupedContacts() {
				let filtered = this.filteredContacts.length ? this.filteredContacts : this.contacts;
				const groups = filtered.reduce((groups, contact) => {
					//const letter = contact.name.charAt(0).toUpperCase();
					const letter = this.getInitialLetter(contact.name);
					if (!groups[letter]) {
						groups[letter] = [];
					}
					groups[letter].push(contact);
					return groups;
				}, {});

				return Object.keys(groups).sort().reduce((sorted, letter) => {
					sorted[letter] = groups[letter];
					return sorted;
				}, {});
			},
		},
		
		created() {
		  this.userId = getApp().globalData.userId;
		
		  // 页面加载时根据日期和用户ID获取当前账单条目
		  this.fetchContacts();
		},
		methods: {
			// 辅助函数，用于获取中文字符串的拼音首字母
			getInitialLetter(name) {		  
			
			  // 如果是英文字符，直接返回大写形式
			  if (/^[A-Za-z]+$/.test(name)) {
			    return name.charAt(0).toUpperCase();
			  }
			  
			  const pinyinResult = pinyin(name, {
			      style: pinyin.STYLE_FIRST_LETTER  // 获取拼音首字母
			    });
			  return pinyinResult[0][0].toUpperCase();  // 返回大写首字母
			  
			},
			
			// 搜索过滤联系人
			filterContacts() {
				if (this.searchQuery.trim() === '') {
					this.filteredContacts = [];
				} else {
					this.filteredContacts = this.contacts.filter(contact =>
						contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
					);
				}
			},
			// 跳转到添加联系人页面
			navigateTo(page) {
				if (page === 'addContact') {
					uni.navigateTo({
						url: '/pages/life/contacts/addContact'
					});
				}
			},
			// 跳转到联系人详情页
			navigateToContactDetails(contactId,name) {	
				uni.navigateTo({
					url: `/pages/life/contacts/showContact?id=${contactId}&name=${name}`
				});
			},
			
			// 获取联系人信息
			fetchContacts() {
			  uni.request({
			      url: `http://47.108.162.90:3000/contact/getAllContacts`, // 替换为实际API接口
			      method: 'POST',
				  data: {
				    user_id: this.userId,
				  },
			     // header: {
			     //     'content-type': 'application/json' // 确保设置了正确的Content-Type
			     //   },
			    success: (res) =>{if (res.data.code === 200) {   
					this.contacts=res.data.result;
			     } else {
			      console.error('获取联系人信息失败:', res);
				  uni.showToast({ title: '获取联系人信息失败', icon: 'none' });
			     }
				},
			  fail: (err) => {
			    console.error('请求失败:', err);
				uni.showToast({ title: '请求失败', icon: 'none' });
			  },
			  });
			},
		},
		
		
	};
</script>


<style scoped>
	.contactsPage {
		padding: 20px;
		background-color: #f0f4f8;
		height: 100vh;
		position: relative;
	}

	.add-button {
		position: absolute;
		top: 20px;
		right: 20px;
		background-color: transparent;
		border: none;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.add-button:hover {
		transform: scale(1.1);
		/* 鼠标悬停时放大 */
	}

	.search-bar {
		margin-top: 80px;
		/* 给添加按钮留出空间 */
		margin-bottom: 15px;
	}

	.search-input {
		width: 100%;
		padding: 12px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 25px;
		background-color: #fff;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.contacts-group {
		margin-top: 20px;
	}

	.group-header {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
		color: #4a90e2;
		text-transform: uppercase;
	}

	.contact-item {
		background-color: #fff;
		padding: 12px;
		margin-bottom: 10px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease-in-out;
		cursor: pointer;
	}

	.contact-item:hover {
		transform: translateY(-5px);
	}

	.contact-item p {
		margin: 5px 0;
	}

	.contact-item p:first-child {
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.contact-item p:last-child {
		color: #999;
	}
</style>