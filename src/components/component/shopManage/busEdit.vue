<template>
  <transition name="mask-bg-fade">
  <div class="mask" v-show="show">
    <div class="mask_bg">
    <transition name="slide-fade">
      <div class="modelBox" v-show="show" :style="{height:modalConfig.height+'px',width:modalConfig.width+'px'}">
        <div class="title">{{ modalConfig.title || "标准编辑功能" }}<span class="close_btn r" @click="confirmCancel">×</span></div>
		<div class="bus_edit_con">
			<div class="bus_edit clear">
				<ul class="l">
					<li v-show="dataEdit.shopId!=''">
						<div>机构id:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.shopId" :readonly="dataEdit.shopId!=''">
						</div>
					</li>
					<li>
						<div>用户id:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.userId" :readonly="userReadonlyFlag">
						</div>
					</li>
					<li>
						<div>机构名称:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.shopName">
						</div>
					</li>
					<li>
						<div>机构类型:</div>
						<div class="shopType">
							<dl v-for="i in shopTypeData" class="clear">
								<dt :id="i.typeId" >{{i.typeName}}</dt>
								<dd>
									<span v-for="j in i.subTypeList">
										<input type="checkbox" :checked="shopTypeIdArr.indexOf(j.typeId)!='-1'?true:false" :id="j.typeId" @click="getChooseShopData(j.typeId,j.typeName)">{{j.typeName}}
									</span>
								</dd>
							</dl>
						</div>
					</li>
					
					<li>
						<div>机构logo:</div>
						<div class="img_con">
							<img :src="dataEdit.logoUrl" alt="">
							<input type="file" class="unload_img" ref="file" @change="showPic($event,'logoUrl')" @mouseenter="bgChange(0)" @mouseout="bgChange">
							<div class="load_tip" :class="{'cur':picFlag==0,'cur1':dataEdit.logoUrl!=''}">+</div>
						</div>
					</li>
					<li>
						<div>营业执照:</div>
						<div class="img_con">
							<img :src="dataEdit.businessLicenseUrl" alt="">
							<input type="file" class="unload_img" ref="file" @change="showPic($event,'businessLicenseUrl')" @mouseenter="bgChange(1)" @mouseout="bgChange">
							<div class="load_tip" :class="{'cur':picFlag==1,'cur1':dataEdit.businessLicenseUrl!=''}">+</div>
						</div>
					</li>
					<li>
						<div>机构标签:</div>
						<div class="labelType shopType">
							<dl v-for="i in labelData" class="clear">
								<dt :id="i.optionId" >{{i.optionName}}</dt>
								<dd>
									<span v-for="j in i.subLabelList">
										<input type="checkbox" :checked="labelIdArr.indexOf(j.optionId)!='-1'?true:false" :id="j.optionId" @click="getChooseLableData(j.optionId)">{{j.optionName}}
									</span>
								</dd>
							</dl>
						</div>
					</li>
				</ul>
				<ul class="l">
					<li>
						<div>联系人:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.contacts">
						</div>
					</li>
					<li>
						<div>联系电话:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.contactPhone">
						</div>
					</li>
					<li>
						<div>机构地址:</div>
						<div class="select1">
							<select name="" id="" class="selectShot" @change="getCity(dataEdit.provinceId)" v-model="dataEdit.provinceId">
							    <option v-for="i in pData" :value="i.id">{{i.name}}</option>
							</select>
						</div>
						<div class="select1">
							<select name="" id="" class="selectShot" @change="getQ(dataEdit.cityId)" v-model="dataEdit.cityId">
								<!-- <option v-show="dataEdit.cityId >0 ? true:false">市</option> -->
							    <option v-for="i in cData" :value="i.id">{{i.name}}</option>
							</select>
						</div>
						<div class="select1">
							<select name="" id="" class="selectShot" v-model="dataEdit.districtId" @change="getQplace(dataEdit.districtId)">
								<option v-show="JSON.stringify(qData) == '{}'?true:false" value="">区</option>
							    <option v-for="i in qData" :value="i.id">{{i.districtName}}</option>
							</select>
						</div>
					</li>
					<li>
						<div>详细地址:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.address">
						</div>
					</li>
					<li>
						<div>招生热线:</div>
						<div>
							<input type="text" class="ipt2"  v-model="dataEdit.admissionTel">
						</div>
					</li>
					<li>
						<div>认证状态:</div>
						<div class="select1">
							<select name="" id="" class="selectLong" v-model="dataEdit.confirmStatus">
								<option value="0">未确认</option>
								<option value="1">已确认</option>
							</select>
						</div>
					</li>
					<li>
						<div>机构状态:</div>
						<div class="select1">
							<select name="" id="" class="selectLong" v-model="dataEdit.shopStatus">
								<option value="-1">下线</option>
								<option value="1">上线</option>
							</select>
						</div>
					</li>
					<li>
						<div>客服:</div>
						<div class="select1">
							<select name="" id="" class="selectLong" v-model="dataEdit.customerService">
								<option value="">请选择</option>
								<option value="白茂生">白茂生</option>
								<option value="李凌云">李凌云</option>
								<option value="李俊">李俊</option>
								<option value="王志华">王志华</option>
								<option value="韩爱">韩爱</option>
							</select>
						</div>
					</li>
					<li>
						<div>备注:</div>
						<div>
							<textarea type="text" class="ipt2" v-model="dataEdit.remark"></textarea>
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
			picFlag:null,
			userReadonlyFlag:false,
			dataEdit:{
				shopId:"",
				userId:"",
				shopName:"",
				parentTypeId:"",
				shopTypeId:"",//机构类型
				labelId:"",//机构标签
				logoUploadId:"",
				licenseUploadId:"",
				logoUrl:"",
				businessLicenseUrl:"",
				address:"",
				remark:"",
				contacts:"",
				contactPhone:"",
				customerService:"",
				shopStatus:null,
				confirmStatus:null,
				provinceId:null,
				provinceName:"",
				cityId:null,
				cityName:"",
				districtId:null,
				districtName:"",
				admissionTel:"",
				shopTypeName:""
			},
			modalConfig:{
				title: "编辑机构",
				width: 900,
				height: "680",
				btnSubmitText: "保存",
				btnCancelText:"取消"
			},
			shopTypeData:{},
			shopTypeIdArr:[],
			shopTypeNameArr:[],
			labelData:{},
			labelIdArr:[],
			pData:{},//省
			cData:{},//市
			qData:{},//区
			submitStatus:false,
			loadTxt:""
		}
    },
	watch:{
		modalOptions(){
			var that = this;
			// that.dataEdit = Object.assign({},that.modalOptions);
			for(var key in that.dataEdit){
				that.dataEdit[key] = that.modalOptions.hasOwnProperty(key) ? that.modalOptions[key] : "";
			}
			that.dataEdit.shopId == ""?that.modalConfig.title = "新建机构":that.modalConfig.title = "编辑机构";
			that.dataEdit.userId == ""?that.userReadonlyFlag=false : that.userReadonlyFlag=true;
			that.getShopData();
			that.getlabelData();
			that.shopTypeIdArr = Array.from(new Set(that.dataEdit.shopTypeId.split(",").map(Number)));
			that.shopTypeNameArr = that.dataEdit.shopTypeName.split(",");
			
			that.labelIdArr = Array.from(new Set(that.dataEdit.labelId.split(",").map(Number)));
	
			if(that.dataEdit.provinceId>0){
				that.initCity(that.dataEdit.provinceId);
				if(that.dataEdit.cityId>0){
					that.initQu(that.dataEdit.cityId);
				}
			}else{
				that.dataEdit.provinceId = 1;
				that.dataEdit.cityId = 5;
				that.dataEdit.districtId = 3;
				that.initCity(1);
				that.initQu(5);
			}
			that.modalConfig.height = document.body.clientHeight>680?680:document.body.clientHeight;
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
			that.dataEdit.shopTypeId = that.shopTypeIdArr.toString();
			that.dataEdit.shopTypeName = that.shopTypeNameArr.toString();
			that.dataEdit.labelId = that.labelIdArr.toString();
			that.dataEdit.logoUrl = '';
			that.dataEdit.businessLicenseUrl = '';
			that.getParentTypeId();
			// return;
			util.ajax({
				url:API_HOST+"/manager/shop/save",
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
						that.loadTxt = data.message;
						that.setTimeout();
					}
				},
				error:function(res){
					that.submitStatus = true;
					that.loadTxt = data.responseJSON.message;
					that.setTimeout();
				},
				complete:function(){
					// that.loadTxt = "超时";
				}
			});
			
		},
		getShopData(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/category/query",
				data:{
					type:1
				},
				success:function(data){
					that.shopTypeData = data.data;
				}
			})
		},
		getParentTypeId(){
			var that = this,parArr = [],sArr = that.shopTypeIdArr;
			for(var i=0;i<sArr.length;i++){
				
				for(var j=0;j<that.shopTypeData.length;j++){
					
					for(var k=0;k<that.shopTypeData[j].subTypeList.length;k++){
						
						if(sArr[i] == that.shopTypeData[j].subTypeList[k].typeId){
							if(parArr.indexOf(that.shopTypeData[j].typeId)==-1){
								parArr.push(that.shopTypeData[j].typeId);
							}
						}
					}
				}
			}
			that.dataEdit.parentTypeId = parArr.toString();
		},
		getlabelData(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/label/query",
				data:{
					userId:12324
				},
				success:function(data){
					that.labelData = data.data;
				}
			})
		},
		getChooseShopData(id,name){
			console.log(id)
			// for(var i=0;i<this.shopTypeIdArr.length;i++){
			// 	this.shopTypeIdArr[i] = parseInt(this.shopTypeIdArr[i]);
			// }
			var num1 = this.shopTypeIdArr.indexOf(id),
			    num2 = this.shopTypeNameArr.indexOf(name);
			if(num1!=-1){
				this.shopTypeIdArr.splice(num1, 1);
				this.shopTypeNameArr.splice(num2, 1)
			}else{
				this.shopTypeIdArr.push(id);
				this.shopTypeNameArr.push(name);
			}
		},
		getChooseLableData(id){
			console.log(id)
			var num = this.labelIdArr.indexOf(id)
			if(num!=-1){
				this.labelIdArr.splice(num, 1);
			}else{
				this.labelIdArr.push(id);
			}
		},
		//监听省变化请求对应的市
		getCity(id){
			var that = this;
			util.ajax({
				url:API_HOST+"/api/city/byProvinceId",
				data:{
					provinceId:id
				},
				success:function(data){
					that.cData = data.data;
					that.dataEdit.cityId = that.cData[0].id;
					that.getQ(that.dataEdit.cityId);
				}
			});
			for(var i=0; i<that.pData.length; i++){
				if(id==that.pData[i].id){
					that.dataEdit.provinceName = that.pData[i].name;
				}
			}
		},
		initCity(id){
			var that = this;
			util.ajax({
				url:API_HOST+"/api/city/byProvinceId",
				data:{
					provinceId:id
				},
				success:function(data){
					that.cData = data.data;
				}
			});
		},
		initQu(id){
			var that = this;
			util.ajax({
				url:API_HOST+"/api/district/byCityId",
				data:{
					cityId:id
				},
				success:function(data){
					that.qData = data.data;
				}
			});
		},
		getQ(id){
			var that = this;
			util.ajax({
				url:API_HOST+"/api/district/byCityId",
				data:{
					cityId:id
				},
				success:function(data){
					console.log(data)
					if(data.code != 500){
						that.qData = data.data;
						that.dataEdit.districtId = that.qData[0].id;
						that.getQplace(that.dataEdit.districtId);
					}else{
						that.qData = [];
						that.dataEdit.districtId = null;
						that.dataEdit.districtName = "";
					}
				}
			});
			for(var i=0; i<that.cData.length; i++){
				if(id==that.cData[i].id){
					that.dataEdit.cityName = that.cData[i].name;
				}
			}
		},
		getQplace(id){
			var that = this;
			for(var i=0; i<that.qData.length; i++){
				if(id==that.qData[i].id){
					that.dataEdit.districtName = that.qData[i].districtName;
				}
			}
		},
		bgChange(index){
			this.picFlag == null ? this.picFlag = index : this.picFlag = null;
		},
		showPic(e,str){
			var that = this,type = str=='logoUrl'?14:13;
			var file = e.target.files[0];
			var reader = new FileReader();
			util.ajax({
				url:API_HOST+"/manager/upload/init",
				data:{
					type:type,
					fileSuffix:"jpg",
					uploadType:"PUT"
				},
				success:function(data){
					str=='logoUrl' ? that.dataEdit.logoUploadId = data.data.uploadId : that.dataEdit.licenseUploadId = data.data.uploadId;
					console.log(data.data.uploadId)
					var xhr = new XMLHttpRequest();
					xhr.open("PUT", data.data.uploadUrl, true);
					xhr.setRequestHeader("x-amz-acl","public-read");
					xhr.send(file);
					xhr.onreadystatechange = function(){
						if(xhr.status == 200 && xhr.readyState == 4){
							reader.readAsDataURL(file);                    
							reader.onload = function(e) {
								that.dataEdit[str] = this.result;
							};
						}
					}
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
			url:API_HOST+"/api/province/byCountryId",
			data:{
				countryId:"cn"
			},
			success:function(data){
				that.pData = data.data;
			}
			
		})
	}
  }
</script>

<style lang="scss" scoped>
	.bus_edit_con{
		position: absolute;
		top:41px;;
		bottom:56px;
		 left: 0;
		 right: 0;
		overflow: auto;
	}
	.bus_edit{
		display: flex;
		ul{
			// width: 450px;
			font-size: 16px;
			font-weight: 300;
			margin-top:5px;
			flex-grow: 1;
			li{
				margin-top:15px;
				font-weight: 400;
				color: #a9adb8;
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
					height: 28px;
					line-height: 28px;
					text-align: right;
					margin-right: 10px;
				}
				input,select{
					text-indent: 10px;
				}
				textarea{
					text-indent:0px;
					height: 70px;
					padding: 4px;
					width: 232px;
				}
				.shopType{
					width: 240px;
					height: 230px;
					overflow: auto;
					border: 1px solid #ecedf1;
					border-radius: 3px;
					padding-left: 5px;
					dl{
						width: 100%;
						line-height: 28px;
						dt,dd{
							float: left;
						}
						dt{
							width: 64px;
						}
						dd{
							width: 170px;
							font-size: 12px;
							line-height: 20px;
							padding-top: 4px;
							span{
								// display: inline-block;
							}
							input{
								margin-left:5px;
							}
							
							
						}
					}
				}
				.labelType{
					height: 90px;
				}
				.img_con{
					width: 50px;
					height: 50px;
					position: relative;
					.unload_img{
						width: 100%;
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						opacity: 0;
						z-index: 500;
						cursor: pointer;
					}
					img{
						width: 100%;
						height: 100%;
						z-index: 498;
					}
					div.load_tip{
						position: absolute;
						width: 50px;
						height: 50px;
						line-height: 45px;
						text-align: center;
						font-size: 50px;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						color: #96a0bd;
						z-index: 499;
						background: rgba(0,0,0,.1);
						&.cur1{
							display: none;
						}
						&.cur{
							display: block;
							background: rgba(0,0,0,.3);
							color: #fff;
						}
					}
				}
				
			}
		}
	}
</style>