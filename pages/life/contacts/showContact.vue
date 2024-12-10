<template>
	<div class="contactDetailPage">
		<!-- 顶部的图标和编辑按钮 -->
		<div class="header">
			<uni-icons type="person" size="100" class="person-icon"></uni-icons>
			<uni-icons type="compose" size="30" class="edit-icon" @click="editContact(contact)"></uni-icons>
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

			<div class="info-item" v-if="contact.phone">
				<label>电话：</label>
				<span>{{ contact.phone }}</span>
			</div>
			<div class="info-item" v-if="contact.QQnum">
				<label>QQ：</label>
				<span>{{ contact.QQnum }}</span>
			</div>
			<div class="info-item" v-if="contact.email">
				<label>Email：</label>
				<span>{{ contact.email }}</span>
			</div>
			<div class="info-item" v-if="contact.grp">
				<label>群组：</label>
				<span>{{ contact.grp }}</span>
			</div>
			<div class="info-item" v-if="contact.remark">
				<label>备注：</label>
				<span>{{ contact.remark }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userID: getApp().globalData.userId,
				//之后从后端获取数据
				contact: {
					contact_id: "",
					name: "",
					gender: "",
					job: "",
					//age: null,
					phone: "",
					grp: "",
					remark: "",
					email: "",
					QQnum: "",
				},
			};
		},
		onBackPress() {
			// 在这里实现返回按钮点击后的逻辑
			uni.redirectTo({
				url: '/pages/life/contacts/contacts' // 替换为你指定的目标页面路径
			});
			return true; // 阻止默认的返回操作
		},
		//初始化
		onLoad(options) {
			this.contact.contact_id = options.id || null;
			this.contact.name = options.name || '';
			
			// 确保 name 存在后调用后端接口
			if (this.contact.name) {
				this.fetchContactDetails(this.contact.name);
				
			} else {
				console.warn('Contact name is empty, skipping fetchContactDetails.');
			}
		},
		methods: {
			// 从后端获取联系人详细信息
			// 获取联系人信息
			fetchContactDetails(name1) {
				uni.showToast({
					title: name1,
					icon: 'none'
				});
				uni.request({
					url: `http://47.108.162.90:3000/contact/getContacts`, // 替换为实际API接口
					method: 'POST',
					data: {
						name: name1,
					},
					success: (res) => {
						if (res.data.code === 200 && res.data.result.length > 0) {
							this.contact = res.data.result[0];
						} else {
							console.error('获取联系人信息失败:', res);
							uni.showToast({ title: '获取联系人信息失败', icon: 'none' });
						}
					},
					fail: (err) => {
						console.error('请求失败:', err);
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
					},
				});
			},
			// 跳转到编辑联系人页面
			editContact(contact) {
				uni.navigateTo({
					url: `/pages/life/contacts/editContact?id=${contact.contact_id}&name=${contact.name}&gender=${contact.gender}&job=${contact.job}&phone=${contact.phone}&QQnum=${contact.QQnum}&email=${contact.email}&grp=${contact.grp}&remark=${contact.remark}`,
				});
			}

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