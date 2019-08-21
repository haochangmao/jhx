<template>
	  <transition name="mask-bg-fade">
	  <div class="mask" v-show="show">
	    <div class="mask_bg">
	    <transition name="slide-fade">
	      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
	        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
	        <!-- <slot /> -->
			<div class="label_edit_con">
			<div class="label_edit clear">
				<ul>
					<li>
						<div>标签类别:</div>
						<div class="select1">
							<select name="" id="" class="selectLong" :disabled="labelEdit.parentOptionId==0" v-model="labelEdit.parentOptionId">
								<option :value="i.optionId" v-for="i in parentOptionIdData">{{i.optionName}}</option>
							</select>
						</div>
					</li>
					<li>
						<div>标签名称:</div>
						<div>
							<input type="text" class="ipt2"  v-model="labelEdit.optionName">
						</div>
					</li>
				</ul>
			</div>	
			</div>
	        <div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
			  <div>
					<button @click="dataSave" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
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
			editFlag:false,
			labelEdit:{},
			modalConfig:{
				title: "标签编辑",
				width: 300,
				height: 200,
				btnSubmitText: "保存",
				btnCancelText:"取消"
			},
			parentOptionIdData:{},
			submitData:{
				parentOptionId:"",
				optionName:"",
				optionColor:""
			},
			loadTxt:"",
			submitStatus:false
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			console.log(that.modalOptions)
			that.labelEdit = that.modalOptions;
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
		edit:function(){
			this.editFlag = true;
		},
		dataSave: function () {
			var that = this;
			if(that.submitStatus)return;
			that.submitStatus = true;
			that.loadTxt = "保存中";
			that.submitData.parentOptionId = that.labelEdit.parentOptionId;
			that.submitData.optionName = that.labelEdit.optionName;
			that.submitData.optionColor = that.labelEdit.optionColor;
			console.log(23,that.submitData)
			util.ajax({
				url:API_HOST+"/manager/label/save",
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
		}
    },
	mounted() {
		var that = this;
		util.ajax({
			url:API_HOST+"/manager/label/query",
			data:{},
			success:function(data){
				that.parentOptionIdData = data.data;
			}
		});
	}
  }
</script>

<style lang="scss" scoped>
	.label_edit_con{
		position: absolute;
		top:41px;;
		bottom:56px;
		 left: 0;
		 right: 0;
		overflow: auto;
	}
	.label_edit{
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
					line-height: 30px;
					text-align: right;
					margin-right: 10px;
				}
				textarea{
					text-indent:0px;
					height: 70px;
					padding: 4px;
					width: 232px;
				}
				input,select{
					height: 30px;
					width: 100px;
					text-indent: 9px;
				}
			}
			img{
				width: 50px;
				height: 50px;
			}
		}
	}
</style>

