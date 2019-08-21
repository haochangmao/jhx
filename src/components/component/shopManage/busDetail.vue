<template>
	  <transition name="mask-bg-fade">
	  <div class="mask" v-show="show">
	    <div class="mask_bg">
	    <transition name="slide-fade">
	      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
	        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
	        <!-- <slot /> -->
			<div class="bus_detail clear">
				<ul class="l">
					<li>
						<div>机构id:</div><div>{{dataDetail.shopId}}</div>
					</li>
					<li>
						<div>机构用户id:</div><div>{{dataDetail.shopId}}</div>
					</li>
					<li>
						<div>机构名称:</div><div>{{dataDetail.shopName}}</div>
					</li>
					<li>
						<div>机构类型:</div><div>{{dataDetail.shopTypeName}}</div>
					</li>
					<li>
						<div>机构地址:</div><div>{{dataDetail.provinceName}}/{{dataDetail.cityName}}/{{dataDetail.districtName}}</div>
					</li>
					<li>
						<div>详细地址:</div><div>{{dataDetail.address}}</div>
					</li>
					<li>
						<div>招生热线:</div><div v-for="i in dataDetail.phoneList">{{i}}</div>
					</li>
					<li>
						<div>机构logo:</div><div><img :src="dataDetail.logoUrl" alt=""></div>
					</li>
					<li>
						<div>营业执照:</div><div><img :src="dataDetail.businessLicenseUrl" alt=""></div>
					</li>
					<li>
						<div>机构标签:</div><div>{{dataDetail.labelName}}</div>
					</li>
				</ul>
				<ul class="l">
					<li>
						<div>联系人:</div><div>{{dataDetail.contacts}}</div>
					</li>
					<li>
						<div>联系电话:</div><div>{{dataDetail.contactPhone}}</div>
					</li>
					<li>
						<div>审核状态:</div><div>{{dataDetail.auditStatus|auditStatus}}</div>
					</li>
					<li>
						<div>认证状态:</div><div>{{dataDetail.confirmStatus|confirmStatus}}</div>
					</li>
					<li>
						<div>机构状态:</div><div>{{dataDetail.shopStatus|shopStatus}}</div>
					</li>
					<li>
						<div>客服:</div><div>{{dataDetail.customerService}}</div>
					</li>
					<li>
						<div>备注:</div><div>{{dataDetail.remark}}</div>
					</li>
					<li>
						<div>创建时间:</div><div>{{dataDetail.registerTime}}</div>
					</li>
					<li>
						<div>更新时间:</div><div>{{dataDetail.updateTime}}</div>
					</li>
				</ul>
			</div>	
	        <div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
	          <div>
	            <button @click="openEdit" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
	              {{modalConfig.btnSubmitText || "确定"}}
	            </button>
				<button @click="confirmCancel" v-show="modalConfig.btnCancelText!=''" class="btn_s">
	              {{ modalConfig.btnCancelText || "取消" }}
	            </button>
	          </div>
	        </div>
	      </div>
	    </transition>
		</div>
	  </div>
	</transition>
</template>

<script>
  export default {
    props: {
		modalOptions: {
			type: Object,
			required: true,
		}
	},
    data() {
		return {
			show: false,
			dataDetail:{},
			modalConfig:{
				title: "机构信息",
				width: 800,
				height: 600,
				btnSubmitText: "编辑",
				btnCancelText:"关闭"
			}
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			that.dataDetail = that.modalOptions;
			console.log(that.dataDetail)
		}
	},
    methods: {
		closeModel: function () {
		  this.show = false;
		},
		showModel: function () {
		  this.show = true;
		},
		confirmCancel: function () {
			this.show = false;
		},
		openEdit: function () {
			this.show = false;
			this.$emit("openEdit",this.dataDetail)
		}
    }
  }
</script>

<style lang="scss" scoped>
	
	.bus_detail{
		ul{
			width: 400px;
			font-size: 16px;
			font-weight: 300;
			margin-top:5px;
			li{
				margin-top:15px;
				&:after{
					content: '';
					display: table;
					clear: both;
				}
				div{
					float: left;
				}
				div:first-of-type{
					width: 100px;
					text-align: right;
					margin-right: 10px;
				}
				div:last-of-type{
					width: 270px;
				}
			}
			img{
				width: 50px;
				height: 50px;
			}
		}
	}
</style>