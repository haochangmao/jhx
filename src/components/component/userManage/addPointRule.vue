<template>
  <transition name="mask-bg-fade">
  <div class="mask" v-show="show">
    <div class="mask_bg">
    <transition name="slide-fade">
      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
		<div class="add_point_rule_con">
			<div class="add_point_rule clear">
				<ul class="l">
					<li>
						<div>规则名称:</div>
						<div>
							<input type="text" class="ipt1" v-model="pointData.pointsName">
						</div>
					</li>
					<li>
						<div>数值:</div>
						<div>
							<input type="text" class="ipt1" v-model="pointData.pointsValue">
						</div>
					</li>
					<li>
						<div>日最高积分:</div>
						<div>
							<input type="text" class="ipt1" v-model="pointData.maxPointsPerDay">
						</div>
					</li>
				</ul>
			</div>	
		</div>
		<div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
		        <div>
		            <button @click="confirmSubmit" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
		              {{modalConfig.btnSubmitText || "确定"}}
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
 //    props: {
	// 	modalOptions: {
	// 		type: Object,
	// 		required: true,
	// 	}
	// },
	components: {
		load:load
	},
    data() {
		return {
			show: false,
			pointData:{
				pointsName:"",
				pointsValue:"",
				maxPointsPerDay:"",
			},
			modalConfig:{
				title: "积分规则新增",
				width: 300,
				height: "240",
				btnSubmitText: "保存",
				btnCancelText:"取消"
			},
			submitStatus:false,
			loadTxt:""
		}
    },
	watch:{
		// modalOptions(){
		// 	console.log(this.modalOptions)
		// 	// var that = this;
		// 	// for(var key in that.pointData){
		// 	// 	that.pointData[key] = that.modalOptions.hasOwnProperty(key) ? that.modalOptions[key] : "";
		// 	// }
		// }
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
		confirmSubmit: function () {
			var that = this;
			if(that.submitStatus)return;
			that.submitStatus = true;
			that.loadTxt = "保存中";
			util.ajax({
				url:API_HOST+"/manager/pointsrule/save",
				data:that.pointData,
				success:function(data){
					if(data.code == 200){
						that.submitStatus = true;
						that.loadTxt = "保存成功";
						that.pointData.pointsName = "";
						that.pointData.pointsValue = "";
						that.pointData.maxPointsPerDay = "";
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
					// that.loadTxt = "超时";
				}
			});
			
		},
		setTimeout(){
			var that = this;
			setTimeout(function(){
				that.submitStatus = false;
			},1000)
		}
    },
	mounted(){
	
	}
  }
</script>

<style lang="scss" scoped>
	.add_point_rule_con{
		position: absolute;
	}
	.add_point_rule{
		ul{
			font-size: 16px;
			li{
				margin-top:15px;
				font-weight: 400;
				color: #a9adb8;
				div{
					float: left;
				}
				&:after{
					content: '';
					display: table;
					clear: both;
				}
				div:first-of-type{
					width: 100px;
					height: 28px;
					line-height: 28px;
					text-align: right;
					margin-right: 10px;
				}
				input,select{
					text-indent: 10px;
				}
				select{
					margin-left: 0;
					width: 140px;
					background-position: 124px 12px;
				}
				
			}
		}
		.cur{
			
		}
	}
</style>
