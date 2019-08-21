<template> 
<div>
    <div class="jhx shopVerify">
		<h3>机构审核</h3>
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
				<label class="item_label">机构用户ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userId">
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
				<label class="item_label">创建时间</label>
				<div class="item_cont regester_time">
					<datepicker width="290"
						v-model="rangeCreate"
						type="date"
						format="YYYY-MM-DD" 
						value-format="YYYY-MM-DD"
						 :disabled-date="disabledDate"
						placeholder="选择时间"
					/>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">更新时间</label>
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
				<div class="btn_area">
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
						<th>机构用户ID</th>
						<th>联系人</th>
						<th>联系电话</th>
						<th>审核状态</th>
						<th>创建时间</th>
						<th>更新时间</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.shopId}}</td>
						<td>{{i.shopName}}</td>
						<td>{{i.userId}}</td>
						<td>{{i.contacts}}</td>
						<td>{{i.contactPhone}}</td>
						<td>{{i.auditStatus|auditStatus}}</td>
						<td>{{i.registerTime}}</td>
						<td>{{i.updateTime}}</td>
						<td class="opration"><span @click="verify(i)">审核</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
    </div>
	<verify :modal-options="verifyData" ref="verify"></verify>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import verify from '../component/shopManage/verify.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				shopId:"",
				shopName:"",
				userId:"",
				auditStatus:"",
				contacts:"",
				contactPhone:"",
				queryStartTime:"",
				queryEndTime:"",
				createStartTime:"",
				createEndTime:"",
				page:"1"
			},
			range: [],
			rangeCreate:[],
			pageArr:{totalPage:"",currentPage:"1"},
			verifyData:{},
			loadTxt:""
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		verify:verify
	},
    created() {
       
    },
    mounted(){
		this.getData();
		console.log(this.$route.query.id)
    },
    methods: {
		reset(){
			this.searchData.userId = "";
			this.searchData.shopId = "";
			this.searchData.shopName = "";
			this.searchData.auditStatus = "";
			this.searchData.contacts = "";
			this.searchData.contactPhone = "";
			this.searchData.queryStartTime = "";
			this.searchData.queryEndTime = "";
			this.searchData.createStartTime = "";
			this.searchData.createEndTime = "";
			this.range = [];
			this.rangeCreate = [];
		},
        serach() {
			this.searchData.page = "1";
			this.pageArr.currentPage = "1";
			if(this.range.length>0){
				this.searchData.queryStartTime = util.timeTrans(this.range[0]);
				this.searchData.queryEndTime = util.timeTrans(this.range[1]);
			}
			if(this.rangeCreate.length>0){
				this.searchData.createStartTime = util.timeTrans(this.rangeCreate[0]);
				this.searchData.createEndTime = util.timeTrans(this.rangeCreate[1]);
			}
			this.dataFlag = false;
			this.loadTxt = "加载中";
			this.getData();
        },
		disabledDate(time){
			var day = time.getTime(),nowDay = new Date().getTime();
            return day >= nowDay;
		},
		childProp(thePage){
			if(this.searchData.page==thePage) return;
			this.searchData.page = thePage;
			this.getData();
		},
		getData(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/shop/query",
				data:that.searchData,
				success:function(data){
					if(data.code!=200){
						that.dataFlag = false;
						that.loadTxt = "加载失败";
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
					that.loadTxt = "加载失败";
				}
			})
		},
		verify(data){
			this.verifyData = data;
			this.$refs.verify.showModel();
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.shopVerify{
	
}
</style>


