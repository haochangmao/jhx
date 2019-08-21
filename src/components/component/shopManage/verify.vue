<template>
	  <transition name="mask-bg-fade">
	  <div class="mask" v-show="show">
	    <div class="mask_bg">
	    <transition name="slide-fade">
	      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
	        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
	        <div class="verifty_con">
			<div class="verifty clear">
				<ul class="l">
					<li>
						<div>机构id:</div><div>{{dataVerify.shopId}}</div>
					</li>
					<li>
						<div>机构用户id:</div><div>{{dataVerify.shopId}}</div>
					</li>
					<li>
						<div>机构名称:</div><div>{{dataVerify.shopName}}</div>
					</li>
					<li>
						<div>机构类型:</div><div>{{dataVerify.shopTypeName}}</div>
					</li>
					<li>
						<div>机构地址:</div><div>{{dataVerify.provinceName}}/{{dataVerify.cityName}}/{{dataVerify.districtName}}</div>
					</li>
					<li>
						<div>机构商圈:</div><div>{{dataVerify.provinceName}}/{{dataVerify.cityName}}/{{dataVerify.districtName}}</div>
					</li>
					<li>
						<div>详细地址:</div><div>{{dataVerify.address}}</div>
					</li>
					<li>
						<div>机构logo:</div><div><img :src="dataVerify.logoUrl" alt=""></div>
					</li>
					<li>
						<div>营业执照:</div><div><img :src="dataVerify.businessLicenseUrl" alt=""></div>
					</li>
				</ul>
				<ul class="l">
					<li>
						<div>联系人:</div><div>{{dataVerify.contacts}}</div>
					</li>
					<li>
						<div>联系电话:</div><div>{{dataVerify.contactPhone}}</div>
					</li>
					<li>
						<div>创建时间:</div><div>{{dataVerify.registerTime}}</div>
					</li>
					<li>
						<div>更新时间:</div><div>{{dataVerify.updateTime}}</div>
					</li>
					<li>
						<div>审核不通过文案:</div>
						<div>
							<textarea type="text" class="ipt2" v-model="submitData.auditMessage"></textarea>
						</div>
					</li>
				</ul>
			</div>	
			</div>
	        <div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
	          <div>
	            <button @click="pass(true)" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
	              {{modalConfig.btnSubmitText1 || "确定"}}
	            </button>
				<button @click="pass(false)" v-show="modalConfig.btnSubmitText!=''" class="btn_l">
				  {{modalConfig.btnSubmitText2 || "确定"}}
				</button>
				<button @click="confirmCancel" v-show="modalConfig.btnCancelText!=''" class="btn_s">
	              {{ modalConfig.btnCancelText || "取消" }}
	            </button>
	          </div>
	        </div>
			<load :loadTxt="loadTxt" v-show="submitStatus" class="cur"></load>
	      </div>
	    </transition>
		</div>
	  </div>
	</transition>
</template>

<script>
import util from '../../../js/common/util';
import load from '../plugin/load.vue';
  export default {
    props: {
		modalOptions: {
			type: Object,
			required: true,
		}
	},
	components: {
		load:load
	},
    data() {
		return {
			show: false,
			dataVerify:{},
			modalConfig:{
				title: "机构信息",
				width: 800,
				height: 600,
				btnSubmitText1: "审核通过",
				btnSubmitText2: "审核不通过",
				btnCancelText:"取消"
			},
			submitData:{
				shopId:"",
				auditStatus:"",
				auditMessage:""
			},
			submitStatus:false,
			loadTxt:""
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			that.dataVerify = that.modalOptions;
			that.submitData.shopId = that.modalOptions.shopId;
			that.submitData.auditMessage = that.modalOptions.auditMessage;
			console.log(that.dataVerify)
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
		pass: function (flag) {
			var that = this;
			if(!flag && that.submitData.auditMessage==""){
				that.loadTxt = "请填写审核结果描述";
				that.submitStatus = true;
				that.setTimeout();
				return;
			}
			if(that.submitStatus)return;
			that.submitStatus = true;
			that.loadTxt = "提交中";
			flag? that.submitData.auditStatus = 1 : that.submitData.auditStatus = 3;
			console.log(that.submitData)
			util.ajax({
				url:API_HOST+"/manager/shop/verify",
				data:that.submitData,
				success:function(data){
					if(data.code == 200){
						that.submitStatus = true;
						that.loadTxt = "保存成功";
						setTimeout(function(){
							that.$parent.getData();
							that.submitStatus = false;
							that.show = false;
						},1000)
					}else{
						that.submitStatus = true;
						that.loadTxt = "保存失败";
						that.setTimeout();
					}
				},
				error:function(res){
					that.submitStatus = true;
					that.loadTxt = "保存失败";
					that.setTimeout();
				},
				complete:function(){
				}
			});
		},
		setTimeout(){
			var that = this;
			setTimeout(function(){
				that.submitStatus = false;
			},1000)
		}
    }
  }
</script>

<style lang="scss" scoped>
	.verifty_con{
		position: absolute;
		top:41px;;
		bottom:56px;
		 left: 0;
		 right: 0;
		overflow: auto;
	}
	
	.verifty{
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
				textarea{
					text-indent:0px;
					height: 70px;
					padding: 4px;
					width: 232px;
				}
			}
			img{
				width: 50px;
				height: 50px;
			}
		}
	}
</style>