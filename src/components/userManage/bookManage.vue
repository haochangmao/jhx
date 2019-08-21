<template> 
<div>
    <div class="jhx bookManage">
		<h3>预约管理</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">预约ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.appointId">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">用户ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userId">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">预约状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.appointStatus">
						<option value="">全部</option>
						<option value="0">待付约（未到店）</option>
						<option value="1">已赴约（已到店）</option>
						<option value="2">已取消</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">机构ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.shopId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">联系电话</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.contactPhone">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">预约时间</label>
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
						<th>预约ID</th>
						<th>机构ID</th>
						<th>联系电话</th>
						<th>预约时间</th>
						<th>宝宝昵称</th>
						<th>宝宝年龄</th>
						<th>宝宝性别</th>
						<th>预约状态</th>
						<th>创建时间</th>
						<th>更新时间</th>
						<th>预约状态修改</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.appointId}}</td>
						<td>{{i.shopId}}</td>
						<td>{{i.contactPhone}}</td>
						<td>{{i.appointTime}}</td>
						<td>{{i.babyName}}</td>
						<td>{{i.babyAge}}</td>
						<td>{{i.babyGender}}</td>
						<td>{{i.appointStatus|appointStatus}}</td>
						<td>{{i.createTime}}</td>
						<td>{{i.updateTime}}</td>
						<td class="opration"><span @click="editModel(i)">状态编辑</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
    </div>
	<bookEdit :modal-options="bookEditData" ref="bookEdit"></bookEdit>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import bookEdit from '../component/userManage/bookEdit.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				shopId:"",
				appointStatus:"",
				appointId:"",
				userId:this.$route.query.id || "",
				contactPhone:"",
				queryStartTime:"",
				queryEndTime:"",
				appointStartTime:"",
				appointEndTime:"",
				page:"1"
			},
			range: [],
			rangeCreate:[],
			pageArr:{totalPage:"",currentPage:"1"},
			bookEditData:{},
			loadTxt:""
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		bookEdit:bookEdit
	},
    created() {
       
    },
    mounted(){
		this.getData();
    },
    methods: {
		reset(){
			this.searchData.shopId = "";
			this.searchData.userId = "";
			this.searchData.appointId = "";
			this.searchData.appointStatus = "";
			this.searchData.contactPhone = "";
			this.searchData.queryStartTime = "";
			this.searchData.queryEndTime = "";
			this.searchData.appointStartTime = "";
			this.searchData.appointEndTime = "";
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
				this.searchData.appointStartTime = util.timeTrans(this.rangeCreate[0]);
				this.searchData.appointEndTime = util.timeTrans(this.rangeCreate[1]);
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
				url:API_HOST+"/manager/appoint/query",
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
		editModel(data){
			this.bookEditData = data;
			this.$refs.bookEdit.showModel();
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.bookManage{
	
}
</style>


