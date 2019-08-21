export function confirmStatus(value) {
		switch(value){
			case 0:return "未确认";
			case 1:return "已确认";
		}
	}
export function auditStatus(value) {
		switch(value){
			case 0:return "未认领";
			case 1:return "审核通过";
			case 2:return "审核中";
			case 3:return "审核未通过";
		}
	}
export function shopStatus(value) {
		switch(value){
			case 0:return "未认领";
			case -1:return "下线";
			case 1:return "上线";
			case 2:return "认领中";
		}
	}
export function userStatus(value) {
		switch(value){
			case 1:return "自主注册";
			case 2:return "微信分享";
		}
	}
export function pointsType(value) {
		switch(value){
			case 1:return "登录小程序";
			case 2:return "分享小程序";
			case 3:return "预约";
			case 4:return "查看知识讲堂";
		}
	}
export function ruleStatus(value) {
		switch(value){
			case 1:return "可用";
			case 0:return "不可用";
		}
	}
export function appointStatus(value) {
		switch(value){
			case 1:return "已赴约（已到店）";
			case 0:return "待付约（未到店）";
			case 2:return "已取消";
		}
	}	
export function answerStatus(value) {
		switch(value){
			case 1:return "已回答";
			case 2:return "未回答";
		}
	}
export function displayStatus(value) {
		switch(value){
			case 1:return "显示";
			case 2:return "不显示";
		}
	}