<template>
	  <transition name="mask-bg-fade">
	  <div class="mask" v-show="show">
	    <div class="mask_bg">
	    <transition name="slide-fade">
	      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
	        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
	        <!-- <slot /> -->
			<div class="data_adjust clear">
				<ul class="l">
					<li>
						<div>机构id:</div><div>{{adjustData.shopId}}</div>
					</li>
					<li>
						<div>机构名称:</div><div>{{adjustData.shopName}}</div>
					</li>
					<li>
						<div>浏览数:</div><div>{{adjustData.contactPhone}}</div><div class="data_change">显示数据 +<input type="text" v-model="submitData.liulan"></div>
					</li>
					<li>
						<div>关注数:</div><div>{{adjustData.contactPhone}}</div><div class="data_change">显示数据 +<input type="text" v-model="submitData.liulan"></div>
					</li>
					<li>
						<div>预约数:</div><div>{{adjustData.contactPhone}}</div><div class="data_change">显示数据 +<input type="text" v-model="submitData.liulan"></div>
					</li>
					<li>
						<div>分享数:</div><div>{{adjustData.address}}</div>
					</li>
				</ul>
			</div>	
	        <div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
	          <div>
	            <button @click="reset" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
	              {{modalConfig.btnSubmitText1 || "确定"}}
	            </button>
				<button @click="dataSave" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
				  {{modalConfig.btnSubmitText2 || "确定"}}
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
import util from '../../../js/common/util';
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
			adjustData:{},
			modalConfig:{
				title: "数据调整",
				width: 500,
				height: 400,
				btnSubmitText1: "重置",
				btnSubmitText2: "保存",
				btnCancelText:"取消"
			},
			submitData:{
				shopId:"",
				liulan:""
			}
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			that.adjustData = that.modalOptions;
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
		dataSave: function () {
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/shop/verify",
				data:that.submitData,
				success:function(data){
				
				},
				error:function(res){
				
				},
				complete:function(){
				}
			});
		},
		reset:function(){
			var that = this;
			that.submitData.liulan = "";
		}
    }
  }
</script>

<style lang="scss" scoped>
	
	.data_adjust{
		ul{
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
				textarea{
					text-indent:0px;
					height: 70px;
					padding: 4px;
					width: 232px;
				}
				.data_change{
					margin-left: 100px;
					input{
						height: 30px;
						width: 60px;
						text-indent: 9px;
					}
				}
			}
			img{
				width: 50px;
				height: 50px;
			}
		}
	}
</style>
