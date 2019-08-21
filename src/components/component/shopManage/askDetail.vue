<template>
	  <transition name="mask-bg-fade">
	  <div class="mask" v-show="show">
	    <div class="mask_bg">
	    <transition name="slide-fade">
	      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
	        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
	        <!-- <slot /> -->
		<div class="ask_detail_con">
			<div class="ask_detail clear">
				<ul class="l">
					<li>
						<div>问题id:</div><div>{{askDetail.questionId}}</div>
					</li>
					<li>
						<div>机构id:</div><div>{{askDetail.shopId}}</div>
					</li>
					<li>
						<div>机构名称:</div><div>{{askDetail.shopName}}</div>
					</li>
					<li>
						<div>提问人:</div><div>{{askDetail.questionUser}}</div>
					</li>
					<li>
						<div>提问时间:</div><div>{{askDetail.questionTime}}</div>
					</li>
					<li>
						<div>问答状态:</div><div>{{askDetail.answerStatus|answerStatus}}</div>
					</li>
					<li v-show="editFlag">
						<div>显示状态:</div>
						<div class="select1">
							<select name="" id="" class="selectLong" v-model="askDetail.displayStatus">
								<option value="">请选择</option>
								<option value="1">显示</option>
								<option value="2">不显示</option>
							</select>
						</div>
					</li>
					<li v-show="!editFlag">
						<div>显示状态:</div><div>{{askDetail.displayStatus}}</div>
					</li>
					<li>
						<div>问题:</div><div>{{askDetail.question}}</div>
					</li>
					<li v-show="!editFlag">
						<div>答案:</div><div>{{askDetail.answer}}</div>
					</li>
					<li  v-show="editFlag">
						<div>答案:</div>
						<div>
							<input type="text" class="ipt2"  v-model="askDetail.answer">
						</div>
					</li>
					<li>
						<div>回答时间:</div><div>{{askDetail.answerTime}}</div>
					</li>
					
				</ul>
			</div>	
		</div>
	        <div class="model_btnBox" v-show="modalConfig.btnSubmitText!='' && modalConfig.btnCancelText!=''">
	          <div v-show="!editFlag">
	            <button @click="edit" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
	              {{modalConfig.btnSubmitText1 || "确定"}}
	            </button>
	          </div>
			  <div v-show="editFlag">
					<button @click="dataSave" v-show="modalConfig.btnSubmitText!=''" class="btn_s">
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
			editFlag:false,
			askDetail:{},
			modalConfig:{
				title: "问答详情",
				width: 500,
				height: 500,
				btnSubmitText1: "编辑",
				btnSubmitText2: "保存",
				btnCancelText:"取消"
			},
			submitData:{
				questionId:"",
				displayStatus:"",
				answer:""
			},
			loadTxt:"",
			submitStatus:false
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			that.askDetail = that.modalOptions;
			this.editFlag = false;
			console.log(that.askDetail)
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
			that.submitData.questionId = that.askDetail.questionId;
			that.submitData.displayStatus = that.askDetail.displayStatus;
			that.submitData.answer = that.askDetail.answer;
			util.ajax({
				url:API_HOST+"/manager/qa/save",
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
	.ask_detail_con{
		position: absolute;
		top:41px;;
		bottom:56px;
		 left: 0;
		 right: 0;
		overflow: auto;
	}
	
	.ask_detail{
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
				input,select{
					height: 30px;
					width: 200px;
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

