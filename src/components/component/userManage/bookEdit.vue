<template>
  <transition name="mask-bg-fade">
  <div class="mask" v-show="show">
    <div class="mask_bg">
    <transition name="slide-fade">
      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
		<div class="book_manage_con">
			<div class="book_manage clear">
				<ul class="l">
					<li>
						<div>预约id:</div><div>{{dataEdit.appointId}}</div>
					</li>
					<li>
						<div>用户id:</div><div>{{dataEdit.userId}}</div>
					</li>
					<li>
						<div>机构id:</div><div>{{dataEdit.shopId}}</div>
					</li>
					<li>
						<div>状态:</div>
						<div class="select1">
							<select name="" id="" class="selectShot" v-model="dataEdit.appointStatus">
								<option value="0">未到店</option>
								<option value="1">已到店</option>
								<option value="2">已取消</option>
							</select>
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
				appointId:null,
				userId:null,
				shopId:null,
				appointStatus:null,
				arriveTime:""
			},
			modalConfig:{
				title: "状态修改",
				width: 300,
				height: "290",
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
			console.log(that.dataEdit)
			console.log(that.modalOptions)
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
				url:API_HOST+"/manager/appoint/save",
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
	
	}
  }
</script>

<style lang="scss" scoped>
	.book_manage_con{
		position: absolute;
	}
	.book_manage{
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
		.cur{
			
		}
	}
</style>