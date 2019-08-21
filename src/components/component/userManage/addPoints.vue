<template>
  <transition name="mask-bg-fade">
  <div class="mask" v-show="show">
    <div class="mask_bg">
    <transition name="slide-fade">
      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
		<div class="add_point_con">
			<div class="add_point clear">
				<ul class="l">
					<li>
						<div>用户ID：</div>
						<div>
							<input type="text" class="ipt1" v-model="addPointData.userId">
						</div>
					</li>
					<!-- <li>
						<div>当前积分：</div><div>{{addPointData.userId}}</div>
					</li> -->
					<li>
						<div>积分规则：</div>
						<div class="select1">
							<select name="" id="" v-model="addPointData.pointsType">
								<option value="">请选择</option>
								<option v-for="i in pointArr" :value="i.pointsType">{{i.pointsName}}</option>
								
							</select>
						</div>
					</li>
					<!-- <li>
						<div>积分变化：</div><div>{{addPointData.userId}}</div>
					</li> -->
					<li>
						<div>关联用户：</div>
						<div>
							<input type="text" class="ipt1" v-model="addPointData.relationUserId">
						</div>
					</li>
					<!-- <li>
						<div>增后积分：</div><div>{{addPointData.userId}}</div>
					</li> -->
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
			addPointData:{
				userId:"",
				pointsType:"",
				relationUserId:""
			},
			modalConfig:{
				title: "新增积分",
				width: 300,
				height: "240",
				btnSubmitText: "保存",
				btnCancelText:"取消"
			},
			submitStatus:false,
			pointArr:{},
			loadTxt:""
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			console.log(that.modalOptions);
			// for(var key in that.addPointData){
			// 	that.addPointData[key] = that.modalOptions.hasOwnProperty(key) ? that.modalOptions[key] : "";
			// }
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
		confirmSubmit: function () {
			var that = this;
			if(that.submitStatus)return;
			that.submitStatus = true;
			that.loadTxt = "保存中";
			
			util.ajax({
				url:API_HOST+"/manager/points/save",
				data:that.addPointData,
				success:function(data){
					if(data.code == 200){
						that.submitStatus = true;
						that.loadTxt = "保存成功";
						that.addPointData.userId = "",
						that.addPointData.pointsType = "",
						that.addPointData.relationUserId = "",
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
		var that = this;
		util.ajax({
			url:API_HOST+"/manager/pointsrule/query",
			data:{},
			success:function(data){
				that.pointArr = data.data;
				console.log(123,data.data)
			}
		})
	}
  }
</script>

<style lang="scss" scoped>
	.add_point_con{
		position: absolute;
	}
	.add_point{
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

