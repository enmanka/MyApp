<template>
	<div class="schedule">
		<!-- 显示周一到周天 -->
		<div class="header">
			<div class="header-spacer"></div>
			<div class="header-item" v-for="day in days" :key="day">{{ day }}</div>
		</div>
		<!-- 显示课表项 -->
		<div class="content">
			<div v-for="(period, rowIndex) in periods" :key="rowIndex" class="row">
				<!-- 第一列显示“第”字、数字和“节”字 -->
				<div class="period">
					<span class="period-text">第</span>
					<span class="period-number">{{ rowIndex + 1 }}</span>
					<span class="period-text">节</span>
				</div>
				<!-- 每天的课表格子 -->
				<div v-for="day in days" :key="day" class="cell" :class="{ 
				        active: activeCell === `${rowIndex}-${day}`, 
				        hasClass: getClassData(rowIndex, day) }" @click="handleCellClick(rowIndex, day)"
					@longpress="showClassDetails(rowIndex, day)">
					<span v-if="getClassData(rowIndex, day)" class="class-name">
						{{ getClassData(rowIndex, day).name }}
					</span>
					<span v-else class="add-icon">+</span>
				</div>
			</div>
		</div>

		<!-- 弹窗部分 -->
		<div v-if="showPopup" class="popup">
			<div class="popup-content">
				<!-- 右上角关闭按钮 -->
				<div class="close-btn" @click="closePopup">×</div>
				<h3>{{ popupData.name }}</h3>
				<p>上课地点：{{ popupData.address }}</p>
				<p>教师：{{ popupData.teacher }}</p>
				<p>教师联系方式：{{ popupData.contact }}</p>
				<p>起始周数：{{ popupData.startWeek || "未填写" }}</p>
				<p>结束周数：{{ popupData.endWeek || "未填写" }}</p>
				<p>备注：{{ popupData.notes }}</p>
				<!-- 修改与删除按钮 -->
				<div class="buttons">
					<button @click="modify" class="modify-btn">修改</button>
					<button @click="deleteClass" class="delete-btn">删除</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onShow } from "@dcloudio/uni-app";

export default {
  data() {
    return {
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      periods: Array.from({ length: 12 }, (_, i) => `第${i + 1}节`),
      activeCell: null, // 用于跟踪被点击的格子
      classData: [], // 存储课程数据
      timetableMatrix: [], // 存储按时间表分配的课程数据
      showPopup: false, // 控制弹窗显示
      popupData: {}, // 存储弹窗的课程详情数据
      userId: "", // 用户ID
      loading: false, // 控制加载状态
    };
  },
  mounted() {
    // 从全局变量获取 userId
    this.userId = getApp().globalData.userId || "";
    // 加载课程数据
    this.fetchTimetable();
  },
  methods: {
    /**
     * 获取课程表数据
     */
    fetchTimetable() {
      if (!this.userId) {
        uni.showToast({ title: "用户未登录", icon: "error" });
        return;
      }
      this.loading = true;
      uni.request({
        url: "http://localhost:3000/timetable/getTimetable", // 后端接口地址
        method: "POST",
        data: { userId: this.userId },
        success: (res) => {
          this.loading = false;
          if (res.data.code === 200) {
            this.classData = res.data.classData || [];
            this.mapTimetableToMatrix();
          } else {
            uni.showToast({
              title: res.data.message || "获取课程表失败",
              icon: "none",
            });
          }
        },
        fail: (err) => {
          this.loading = false;
          console.error("请求失败:", err);
          uni.showToast({ title: "网络错误，请稍后再试", icon: "none" });
        },
      });
    },

    /**
     * 将课程数据映射到课表矩阵
     */
    mapTimetableToMatrix() {
	////// 此处添加通过userid获取数据并显示的逻辑，接口见apifox
      this.timetableMatrix = Array.from({ length: 12 }, () => Array(7).fill(null));
      this.classData.forEach((item) => {
        const { weekday, classtime } = item;
        const dayIndex = weekday - 1;
        const periodIndex = classtime - 1;
        if (dayIndex >= 0 && dayIndex < 7 && periodIndex >= 0 && periodIndex < 12) {
          this.timetableMatrix[periodIndex][dayIndex] = item;
        }
      });

    },

    /**
     * 获取指定单元格的课程数据
     */
    getClassData(rowIndex, day) {
      const dayIndex = this.days.indexOf(day);
      return this.timetableMatrix[rowIndex][dayIndex];
    },

    /**
     * 点击单元格事件
     */
    handleCellClick(rowIndex, day) {
      const classData = this.getClassData(rowIndex, day);
      if (classData) {
        return; // 如果当前格子已经有课程，直接返回
      }
      this.activeCell = `${rowIndex}-${day}`;
      setTimeout(() => {
        this.activeCell = null;
        uni.navigateTo({
          url: `/pages/study/addClass?weekday=${this.days.indexOf(day) + 1}&classtime=${rowIndex + 1}`,
        });
      }, 200); // 点击效果持续200毫秒
    },

    /**
     * 长按显示课程详情
     */
    showClassDetails(rowIndex, day) {
      const data = this.getClassData(rowIndex, day);
      if (data) {
        this.popupData = { ...data };
        this.showPopup = true;
      }
    },

    closePopup() {
      this.showPopup = false;
    },

    /**
     * 修改课程详情
     */
    modify() {
      //const { name, address, teacher, contact, week, id, notes, weekDay, period } = this.popupData;
      const pageUrl = `/pages/study/addClass?weekday=${weekday}&classtime=${classtime}&classname=${classname}&location=${location}&teacher=${teacher_name}&id=${timetable_id}`;
      uni.navigateTo({ url: pageUrl });
      this.closePopup();
      this.mapTimetableToMatrix(); // 重新映射课表矩阵
    },

    /**
     * 删除课程
     */
    deleteClass() {
      // 后端请求部分注释
      uni.request({
        url: 'http://localhost:3000/timetable/deleteClass', // 后端接口地址
        method: 'POST',
        data: {
          userId: this.userId,
		  
          id: this.popupData.id, // 课程数据以id为主码
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.classData = this.classData.filter(
              (item) => item.id !== this.popupData.id
            ); // 更新本地数据
            this.showPopup = false; // 关闭弹窗
          } else {
            console.error('删除失败:', res.data.message || '未知错误');
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });

      // 模拟删除后更新页面
      this.classData = this.classData.filter(
        (item) => item.id !== this.popupData.id
      );
      this.showPopup = false; // 关闭弹窗
    },
  },
};
</script>

	 
	  //deleteClass() {
	  		// 后端请求部分注释
	  		// uni.request({
	  		// 	url: 'http://localhost:3000/deleteClass', // 后端接口地址
	  		// 	method: 'POST',
	  		// 	data: {
	  		// 		userId: this.userId,
	  		// 		id: this.popupData.id, // 课程数据以id为主码
	  		// 	},
	  		// 	success: (res) => {
	  		// 		if (res.data.code === 200) {
	  		// 			this.classData = this.classData.filter(
	  		// 				(item) => item.id !== this.popupData.id
	  		// 			); // 更新本地数据
	  		// 			this.showPopup = false; // 关闭弹窗
	  		// 		} else {
	  		// 			console.error('删除失败:', res.data.message || '未知错误');
	  		// 		}
	  		// 	},
	  		// 	fail: (err) => {
	  		// 		console.error('请求失败:', err);
	  		// 	}
	  		// });
	  		// 模拟删除后更新页面
	  	// 	this.classData = this.classData.filter(
	  	// 		(item) => item.id !== this.popupData.id
	  	// 	);
	  	// 	this.showPopup = false; // 关闭弹窗
	  	// },
	  //};

	// import {
	// 	onShow
	// } from "@dcloudio/uni-app";

	// export default {
	// 	data() {
	// 		return {
	// 			days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
	// 			periods: Array.from({
	// 				length: 12
	// 			}, (_, i) => `第${i + 1}节`),
	// 			activeCell: null, // 用于跟踪被点击的格子
	// 			classData: [], // 存储课程数据
	// 			showPopup: false, // 控制弹窗显示
	// 			popupData: {}, // 存储弹窗的课程详情数据
	// 			userId: "", // 用户ID
	// 		};
	// 	},
	// 	mounted() {
	// 		// 示例课程数据
	// 		this.classData = [{
	// 				id: 1, // 确保每个课程项有 id
	// 				name: "数学分析",
	// 				teacher: "张老师",
	// 				weekDay: 0,
	// 				period: 1,
	// 				address: "教室1",
	// 				contact: "123456789",
	// 				week: "第1、2、3周",
	// 				notes: "无"
	// 			},
	// 			{
	// 				id: 2,
	// 				name: "线性代数",
	// 				teacher: "李老师",
	// 				weekDay: 2,
	// 				period: 2
	// 			},
	// 			{
	// 				id: 3,
	// 				name: "大学物理",
	// 				teacher: "王老师",
	// 				weekDay: 4,
	// 				period: 4
	// 			},
	// 			{
	// 				id: 4,
	// 				name: "英语口语",
	// 				teacher: "赵老师",
	// 				weekDay: 1,
	// 				period: 3
	// 			},
	// 		];
	// 		// 页面展示时获取课程数据
	// 		this.userId = getApp().globalData.userId;

	// 		// 页面加载时根据用户ID获取课程信息（注意：星期从0（代表星期一）开始，课堂节次从1开始！）
	// 		/*
	// 		uni.request({
	// 			url: 'http://localhost:3000/getRecords', // 后端接口地址
	// 			method: 'POST',
	// 			data: {
	// 				userId: this.userId,
	// 			},
	// 			success: (res) => {
	// 				if (res.data.code === 200) {
	// 					this.classData = res.data.classData;
	// 					this.updateTotals();
	// 				} else {
	// 					console.error('获取账单数据失败:', res.data.message || '未知错误');
	// 				}
	// 			},
	// 			fail: (err) => {
	// 				console.error('请求失败:', err);
	// 			}
	// 		});
	// 		*/
	// 	},
	// 	onBackPress() {
	// 		// 在这里实现返回按钮点击后的逻辑
	// 		uni.redirectTo({
	// 			url: '/pages/study/index' // 替换为你指定的目标页面路径
	// 		});
	// 		return true; // 阻止默认的返回操作
	// 	},
	// 	methods: {
	// 		// 获取指定单元格的课程数据
	// 		getClassData(rowIndex, day) {
	// 			const weekDayIndex = this.days.indexOf(day); // 获取 day 的索引
	// 			const classInfo = this.classData.find(
	// 				(item) => item.weekDay === weekDayIndex && item.period === rowIndex + 1
	// 			);
	// 			return classInfo;
	// 		},

	// 		// 点击单元格事件
	// 		handleCellClick(rowIndex, day) {
	// 			// 获取当前格子对应的课程数据
	// 			const classData = this.getClassData(rowIndex, day);

	// 			// 如果当前格子已经有课程，直接返回，不执行添加课程操作
	// 			if (classData) {
	// 				return; // 课程已存在，不进行操作
	// 			}

	// 			// 如果没有课程，执行添加课程的逻辑
	// 			this.activeCell = `${rowIndex}-${day}`; // 设置点击状态
	// 			console.log(rowIndex+1);
	// 			console.log(this.days.indexOf(day));
	// 			const ret=this.days.indexOf(day);
	// 			const ret1=rowIndex+1;
	// 			setTimeout(() => {
	// 				this.activeCell = null;
	// 				uni.navigateTo({
	// 					url: `/pages/study/addClass?weekDay=${ret}&period=${ret1}`
	// 				});
	// 			}, 200); // 点击效果持续200毫秒
	// 		},

	// 		// 长按显示课程详情
	// 		showClassDetails(rowIndex, day) {
	// 			const data = this.getClassData(rowIndex, day);
	// 			if (data) {
	// 				// 在 popupData 中包含 id
	// 				this.popupData = {
	// 					...data
	// 				}; // 使用展开操作符复制课程数据
	// 				this.showPopup = true;
	// 			}
	// 		},
	// 		closePopup() {
	// 			this.showPopup = false;
	// 		},
	// 		modify() {
	// 			// 获取当前课程的原始数据
	// 			const classData = this.popupData;

	// 			// 构建传递的数据（有误，已注释）
	// 			// const queryParams = new URLSearchParams({
	// 			// 	name: classData.name,
	// 			// 	address: classData.address,
	// 			// 	teacher: classData.teacher,
	// 			// 	contact: classData.contact,
	// 			// 	week: classData.week,
	// 			// 	id: classData.id,
	// 			// 	notes: classData.notes
	// 			// }).toString();

	// 			// 页面跳转，并将数据作为查询参数传递
	// 			// 手动拼接查询参数
	// 			const pageUrl =
	// 				`/pages/study/addClass?name=${classData.name}&address=${classData.address}&teacher=${classData.teacher}&contact=${classData.contact}&week=${classData.week}&id=${classData.id}&notes=${classData.notes}&weekDay=${classData.weekDay}&period=${classData.period}`;
	// 			uni.navigateTo({
	// 				url: pageUrl
	// 			});
	// 			this.closePopup();
	// 		},
			
			// 删除课程
	// 		deleteClass() {
	// 			// 后端请求部分注释
	// 			/*
	// 			uni.request({
	// 				url: 'http://localhost:3000/deleteClass', // 后端接口地址
	// 				method: 'POST',
	// 				data: {
	// 					userId: this.userId,
	// 					id: this.popupData.id, // 课程数据以id为主码
	// 				},
	// 				success: (res) => {
	// 					if (res.data.code === 200) {
	// 						this.classData = this.classData.filter(
	// 							(item) => item.id !== this.popupData.id
	// 						); // 更新本地数据
	// 						this.showPopup = false; // 关闭弹窗
	// 					} else {
	// 						console.error('删除失败:', res.data.message || '未知错误');
	// 					}
	// 				},
	// 				fail: (err) => {
	// 					console.error('请求失败:', err);
	// 				}
	// 			});
	// 			*/
	// 			// 模拟删除后更新页面
	// 			this.classData = this.classData.filter(
	// 				(item) => item.id !== this.popupData.id
	// 			);
	// 			this.showPopup = false; // 关闭弹窗
	// 		}
	// 	},
	// };

<style scoped>
	.schedule {
		display: flex;
		flex-direction: column;
		width: 100vw;
		overflow-x: hidden;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		border-bottom: 1px solid #ccc;
	}

	.header-spacer {
		width: 14vw;
		border-right: 1px solid #ccc;
	}

	.header-item {
		flex: 1;
		text-align: center;
		border-right: 1px solid #ccc;
		padding: 10px 0;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		align-items: center;
	}

	.period {
		width: 14vw;
		text-align: center;
		padding: 10px 0;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		background-color: #f9f9f9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.cell.hasClass {
		background-color: #9ECCB5;
		/* 或其他颜色，表示课程已添加 */
	}

	.period-text {
		writing-mode: vertical-rl;
		text-orientation: upright;
	}

	.period-number {
		font-size: 1.0em;
		line-height: 1em;
	}

	.cell {
		flex: 1;
		border: 1px dashed #bbb;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		cursor: pointer;
		transition: background-color 0.2s;
		position: relative;
		overflow: hidden;
	}

	.cell.active {
		background-color: #e0ee09;
	}

	.class-name {
		font-size: 14px;
		color: #333;
		text-align: center;
		line-height: 1.2em;
		overflow: hidden;
		white-space: normal;
		text-overflow: ellipsis;
	}

	.add-icon {
		font-size: 20px;
		color: #888;
	}

	/* 弹窗样式 */
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup-content {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		width: 80%;
		max-width: 500px;
		box-sizing: border-box;
		position: relative;
	}

	.close-btn {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 20px;
		cursor: pointer;
		color: #999;
	}

	.popup-content h3 {
		font-size: 1.5em;
		margin-bottom: 10px;
	}

	.popup-content p {
		font-size: 1em;
		margin: 5px 0;
	}

	.buttons {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
	}

	.modify-btn,
	.delete-btn {
		padding: 10px 20px;
		font-size: 1em;
		cursor: pointer;
		border: none;
		border-radius: 5px;
	}

	.modify-btn {
		background-color: #f1b405;
		color: white;
	}

	.delete-btn {
		background-color: #ff4757;
		color: white;
	}

	/* 按钮按动效果 */
	.modify-btn:active,
	.delete-btn:active {
		transform: scale(0.95);
	}
</style>