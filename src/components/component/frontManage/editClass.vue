<template>
  <transition name="mask-bg-fade">
  <div class="mask" v-show="show">
    <div class="mask_bg">
    <transition name="slide-fade">
      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
		<div class="class_edit_con">
			<div class="class_edit clear">
				<ul class="l">
					<li>
						<div>类别名称:</div>
						<div>
							<input type="text" class="ipt1"  v-model="dataEdit.typeName">
						</div>
					</li>
					<li>
						<div>类别登记:</div>
						<div class="select1">
							<select name="" id="" class="selectMid" v-model="dataEdit.level">
								<option value="">全部</option>
								<option value="1">一级</option>
								<option value="2">二级</option>
							</select>
						</div>
					</li>
					<li>
						<div>父类ID:</div>
						<div>
							<input type="text" class="ipt1"  v-model="dataEdit.parentTypeId">
						</div>
					</li>
					<li>
						<div>父类别:</div>
						<div>
							<input type="text" class="ipt1"  v-model="dataEdit.parentTypeName">
						</div>
					</li>
					<li>
						<div>前端显示:</div>
						<div class="select1">
							<select name="" id="" class="selectMid" v-model="dataEdit.displayStatus">
								<option value="">全部</option>
								<option value="1">是</option>
								<option value="2">否</option>
							</select>
						</div>
					</li>
					<li>
						<div>前端序号:</div>
						<div>
							<input type="text" class="ipt1"  v-model="dataEdit.sortNum">
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
			dataEdit:{
				typeId:"",
				typeName:"",
				level:"",
				parentTypeId:"",
				categoryId:"",
				uploadId:"",
				iconUrl:"",
				sortNum:"",
				displayStatus:""
			},
			modalConfig:{
				title: "类别编辑",
				width: 300,
				height: "360",
				btnSubmitText: "保存",
				btnCancelText:"取消"
			},
			submitStatus:false,
			loadTxt:""
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			for(var key in that.dataEdit){
				that.dataEdit[key] = that.modalOptions.hasOwnProperty(key) ? that.modalOptions[key] : "";
			}
			console.log(111)
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
				url:API_HOST+"/manager/category/save",
				data:that.dataEdit,
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
	}
  }
</script>

<style lang="scss" scoped>
	.class_edit_con{
		position: absolute;
	}
	.class_edit{
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
				div{
					line-height: 24px;
				}
				div:first-of-type{
					width: 100px;
					height: 28px;
					text-align: right;
					margin-right: 10px;
				}
				input,select{
					text-indent: 10px;
				}
				
			}
		}
	}
</style>
