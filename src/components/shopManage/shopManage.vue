<template> 
<div>
    <div class="jhx shopManage">
		<h3>机构管理</h3>
		<div class="search_area clear">
		    <div class="form_item">
				<label class="item_label">机构ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.shopId">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">机构名称</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.shopName">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">机构类型</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.parentTypeId">
						<option  value="">全部</option>
					    <option  v-for="i in shopTypeFData" :value="i.typeId">{{i.typeName}}</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">区域</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.districtId">
					    <option value="">全部</option>
						<option  v-for="i in quyuData" :value="i.id">{{i.districtName}}</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">联系人</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.contacts">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">联系电话</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.contactPhone">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">招生热线</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.admissionTel">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">审核状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.auditStatus">
					    <option value="">全部</option>
						<option value="0">未认领</option>
						<option value="1">审核通过</option>
						<option value="2">审核中</option>
						<option value="3">审核未通过</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">机构状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.shopStatus">
					    <option value="">全部</option>
						<option value="-1">下线</option>
						<option value="1">上线</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">注册时间</label>
				<div class="item_cont regester_time">
					<datepicker width="290"
						v-model="range"
						type="date"
						format="YYYY-MM-DD" 
						value-format="YYYY-MM-DD"
						 :disabled-date="disabledDate"
						placeholder="选择时间"
					/>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">认证状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.confirmStatus">
					    <option value="">全部</option>
						<option value="0">未确认</option>
						<option value="1">已确认</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">客服</label>
				<div class="item_cont">
					<input type="text" v-model="searchData.customerService" class="input_write ipt1">
				</div>
			</div>
			<div class="form_item">
				<div class="btn_area">
					<button @click="build" class="btn_s">新建机构</button>
					<button @click="reset" class="btn_s">重置</button>
					<button @click="serach" class="btn_s">搜索</button>
				</div>
			</div>
	    </div>
		<div class="info_area">
			<load :loadTxt="loadTxt" v-show="!dataFlag"></load>
			<table v-show="dataFlag">
				<!-- <thead> -->
					<tr class="thead">
						<th>机构ID</th>
						<th>机构名称</th>
						<th>机构类型</th>
						<th>省/市/区</th>
						<th>招生热线</th>
						<th>联系人</th>
						<th>联系电话</th>
						<th>认证状态</th>
						<th>审核状态</th>
						<th>更新时间</th>
						<th>机构状态</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.shopId}}</td>
						<td>{{i.shopName}}</td>
						<td>{{i.shopTypeName}}</td>
						<td>{{i.provinceName}}/{{i.cityName}}/{{i.districtName}}</td>
						<td>{{i.admissionTel}}</td>
						<td>{{i.contacts}}</td>
						<td>{{i.contactPhone}}</td>
						<td>{{i.confirmStatus|confirmStatus}}</td>
						<td>{{i.auditStatus|auditStatus}}</td>
						<td>{{i.updateTime}}</td>
						<td>{{i.shopStatus|shopStatus}}</td>
						<td class="opration"><span @click="viewModel(i)">查看</span>&nbsp;<span @click="editModel(i)">编辑</span>&nbsp;<br/><span @click="renovation(i)">装修</span>&nbsp;<span @click="i.userId!='' && udno(i)" :class="i.userId==''?'grey':''">解绑</span>&nbsp;</td>
					</tr>
					<!-- <tr>
						<td colspan="15" class="clear">
							<lepage :totalPage="totalPage" @childProp="childProp" class="clear"></lepage>
						</td>
					</tr> -->
				<!-- </tbody> -->
				<!-- <tfoot>
					<tr>
						<td colspan="15" class="clear">
							<lepage :totalPage="totalPage" @childProp="childProp" class="clear"></lepage>
						</td>
					</tr>
				</tfoot> -->
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<load :loadTxt="loadTxt" v-show="!undoFlag" class="undo"></load>
    </div>
	<busDetail :modal-options="busDetailOptions" ref="busDetail" @openEdit="openEdit"></busDetail>
	<busEdit :modal-options="busEditOptions" ref="busEdit"></busEdit>
	<renovationShop :modal-options="renovationShopOptions" ref="renovationShop"></renovationShop>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import busDetail from '../component/shopManage/busDetail.vue';
import busEdit from '../component/shopManage/busEdit.vue';
import renovationShop from '../component/shopManage/renovationShop.vue';
import load from '../component/plugin/load.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			undoFlag:true,
			searchData:{
				shopId:"",
				parentTypeId:"",
				shopStatus:"",
				shopName:"",
				queryStartTime:"",
				queryEndTime:"",
				districtId:"",
				customerService:"",
				contacts:"",
				contactPhone:"",
				confirmStatus:"",
				auditStatus:"",
				admissionTel:"",
				page:"1"
			},
			range: [],
			pageArr:{totalPage:"",currentPage:"1"},
			busDetailOptions: {},
			busEditOptions:{},
			renovationShopOptions:"",
			shopTypeFData:{},
			quyuData:{},
			loadTxt:""
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		busDetail:busDetail,
		busEdit:busEdit,
		renovationShop:renovationShop,
		load:load
	},
    created() {
       
    },
    mounted(){
		this.getData();
		this.getShopFData();
		this.getQuyu();
    },
    methods: {
		viewModel(data) {
			var that = this;
			that.busDetailOptions = data;
			that.$refs.busDetail.showModel();
		},
		editModel(data) {
			var that = this;
			that.busEditOptions = data;
			that.$refs.busEdit.showModel();
		},
		renovation(data){
			this.renovationShopOptions = data.shopId;
			this.$refs.renovationShop.showModel();
		},
		build(){
			var that = this;
			that.busEditOptions = {};
			that.$refs.busEdit.showModel();
		},
		reset(){
			this.searchData.shopId = "";
			this.searchData.parentTypeId = "";
			this.searchData.shopStatus = "";
			this.searchData.shopName = "";
			this.searchData.queryStartTime = "";
			this.searchData.districtId = "";
			this.searchData.customerService = "";
			this.searchData.contacts = "";
			this.searchData.queryEndTime = "";
			this.searchData.contactPhone = "";
			this.searchData.confirmStatus = "";
			this.searchData.auditStatus = "";
			this.searchData.admissionTel = "";
			this.range = [];
		},
        serach() {
			this.searchData.page = "1";
			this.pageArr.currentPage = "1";
			if(this.range.length>0){
				this.searchData.queryStartTime = util.timeTrans(this.range[0]);
				this.searchData.queryEndTime = util.timeTrans(this.range[1]);
			}
			this.dataFlag = false;
			this.loadTxt = "加载中";
			this.getData();
        },
		disabledDate(time){
			var day = time.getTime(),nowDay = new Date().getTime();
            return day >= nowDay;
		},
		openEdit(data){
			this.busEditOptions = data;
			this.$refs.busEdit.showModel();
		},
		childProp(thePage){
			if(this.searchData.page==thePage) return;
			this.searchData.page = thePage;
			this.getData();
		},
		getData(){
			var that = this;
			console.log(that.searchData)
			util.ajax({
				url:API_HOST+"/manager/shop/query",
				data:that.searchData,
				success:function(data){
					if(data.code!=200){
						that.dataFlag = false;
						that.loadTxt = data.message;
						return;
					}
					that.data = data.data;
					if(that.data.length>0){
						that.pageArr.totalPage = Math.ceil(data.total/10);
						that.dataFlag = true;
					}else{
						that.dataFlag = false;
						that.loadTxt = "暂无数据";
					}
				},
				error:function(){
					that.dataFlag = false;
					that.loadTxt = data.responseJSON.message;
				}
			})
		},
		udno(data){
			var that = this;
			if(data.shopId==''||data.userId=='')return;
			util.ajax({
				url:API_HOST+"/manager/shop/undo",
				data:{
					shopId:data.shopId,
					userId:data.userId
				},
				success:function(data){
					if(data.code!=200){
						that.undoFlag = false;
						that.loadTxt = data.message;
					}else{
						that.undoFlag = false;
						that.loadTxt = "解绑成功";
						that.getData();
					}
					console.log(that.deleteFlag)
					setTimeout(function(){
						that.undoFlag = true;
					},1000);
				},
				error:function(data){
					that.undoFlag = false;
					that.loadTxt = data.responseJSON.message;
					setTimeout(function(){
						that.undoFlag = true;
					},1000);
				}
			})
		},
		//获取机构类型
		getShopFData(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/category/query",
				data:{
					type:1
				},
				success:function(data){
					that.shopTypeFData = data.data;
				}
			})
		},
		getQuyu(){
			var that = this;
			util.ajax({
				url:API_HOST+"/api/district/byCityId",
				data:{
					cityId:5
				},
				success:function(data){
					that.quyuData = data.data;
				}
			});
		},
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.shopManage{
	.opration{
		line-height: 17px;
	}
}
.undo{
		position: fixed;
		top: 0;
		bottom:0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>


