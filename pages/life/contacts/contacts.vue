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
			<div v-for="contact in contactsGroup" :key="contact.id" class="contact-item"
				@click="navigateToContactDetails(contact.id)">
				<p>{{ contact.name }}</p>
				<p>{{ contact.phone }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchQuery: '', // 搜索框的内容
				selectedIcon: '', // 当前选中的图标
				
				//contacts: [], // 初始化为空数组，后续从后端获取
				//用于查看样式的代码，链接后端接口后需注释掉
				contacts: [
				        { id: 1, name: 'Alice', phone: '123-456-7890' },
				        { id: 2, name: 'Bob', phone: '234-567-8901' },
				        { id: 3, name: 'Charlie', phone: '345-678-9012' },
				        { id: 4, name: 'David', phone: '456-789-0123' },
				        { id: 5, name: 'Eva', phone: '567-890-1234' },
				        { id: 6, name: 'Frank', phone: '678-901-2345' },
				        { id: 7, name: 'George', phone: '789-012-3456' },
				      ],
					  
				filteredContacts: [], // 存储过滤后的联系人
				userID: '', // 假设 userID 可以通过某种方式获取，初始化为空
			};
		},
		computed: {
			// 根据搜索过滤联系人列表
			groupedContacts() {
				let filtered = this.filteredContacts.length ? this.filteredContacts : this.contacts;
				const groups = filtered.reduce((groups, contact) => {
					const letter = contact.name.charAt(0).toUpperCase();
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
		methods: {
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
			navigateToContactDetails(contactId) {
				uni.navigateTo({
					url: `/pages/life/contacts/showContact?id=${contactId}`
				});
			},
			//与后端连接的部分
			// 获取联系人数据
			// async fetchContacts() {
			// 	try {
			// 		// 发送请求传递 userID，并从后端获取联系人数据
			// 		const response = await uni.request({
			// 			url: `https://your-api.com/api/contacts`, // 替换为实际后端接口
			// 			method: 'GET',
			// 			data: {
			// 				userID: this.userID
			// 			}, // 传递 userID
			// 		});

			// 		if (response.statusCode === 200) {
			// 			this.contacts = response.data.contacts; // 假设后端返回的数据格式包含 contacts 数组
			// 			this.filteredContacts = this.contacts; // 初始化时填充联系人列表
			// 		} else {
			// 			console.error('Failed to fetch contacts:', response);
			// 		}
			// 	} catch (error) {
			// 		console.error('Error fetching contacts:', error);
			// 	}
			// },
		},
		mounted() {
			// 调用 fetchContacts 从后端获取联系人数据
			//this.fetchContacts();
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