<template> 
<div>
    <div class="jhx shopUser">
		<h3>机构用户管理</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">机构用户ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">微信ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">机构ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.shopId">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">手机号</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.phoneNum">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">机构用户状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.userStatus">
						<option value="">全部</option>
						<option value="1">启用</option>
						<option value="0">停用</option>
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
						<th>机构用户ID</th>
						<th>手机号</th>
						<th>机构ID</th>
						<th>微信ID</th>
						<th>机构用户状态</th>
						<th>注册时间</th>
						<th>更新时间</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.userId}}</td>
						<td>{{i.phoneNum}}</td>
						<td>{{i.shopId}}</td>
						<td>{{i.shopId}}</td>
						<td>{{i.userStatus?"启用":"停用"}}</td>
						<td>{{i.registerTime}}</td>
						<td>{{i.updateTime}}</td>
						<td class="opration"><span @click="changeStatus(i)">{{i.userStatus?"停用":"启用"}}</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
    </div>
	<load :loadTxt="loadTxt" v-show="!statusFlag" class="statusFlag"></load>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				userId:"",
				shopId:"",
				userStatus:"",
				phoneNum:"",
				queryStartTime:"",
				queryEndTime:"",
				page:"1"
			},
			range: [],
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:"",
			statusFlag:true
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load
	},
    created() {
       
    },
    mounted(){
		this.getData();
    },
    methods: {
		reset(){
			this.searchData.userId = "";
			this.searchData.shopId = "";
			this.searchData.userStatus = "";
			this.searchData.phoneNum = "";
			this.searchData.queryStartTime = "";
			this.searchData.queryEndTime = "";
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
		childProp(thePage){
			if(this.searchData.page==thePage) return;
			this.searchData.page = thePage;
			this.getData();
		},
		getData(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/eduuser/query",
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
		changeStatus(data){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/eduuser/save",
				data:{
					userId:data.userId,
					userStatus:data.userStatus?0:1
				},
				success:function(data){
					if(data.code!=200){
						that.statusFlag = false;
						that.loadTxt = "操作失败";
					}else{
						that.statusFlag = false;
						that.loadTxt = "操作成功";
						that.getData();
					}
					setTimeout(function(){
						that.statusFlag = true;
					},1000);
				},
				error:function(){
					
				}
			})
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.shopUser{
	
}
.statusFlag{
		position: fixed;
		top: 0;
		bottom:0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>


