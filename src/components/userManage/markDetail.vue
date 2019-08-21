<template> 
<div>
    <div class="jhx markDetail">
		<h3>积分明细</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">积分ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.pointsId">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">用户ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userId">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">积分规则</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.pointsType">
						<option value="">全部</option>
						<option v-for="i in pointsruleArr" :value="i.pointsType">{{i.pointsName}}</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">关联用户</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.relationUserId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">创建时间</label>
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
					<button @click="build(data)" class="btn_s">新增</button>
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
						<th>积分ID</th>
						<th>用户ID</th>
						<th>积分规则</th>
						<th>关联用户</th>
						<th>积分变化</th>
						<th>总积分</th>
						<th>创建时间</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.id}}</td>
						<td>{{i.userId}}</td>
						<td>{{i.pointsType|pointsType}}</td>
						<td>{{i.relationUserId}}</td>
						<td>{{i.pointsValue}}</td>
						<td>{{i.currentTotalPoints}}</td>
						<td>{{i.createTime}}&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
    </div>
	<addPoint :modal-options="addPointOptions" ref="addPoint"></addPoint>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import addPoint from '../component/userManage/addPoints.vue';
import load from '../component/plugin/load.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				userId:this.$route.query.id || "",
				pointsId:"",
				relationUserId:"",
				queryStartTime:"",
				queryEndTime:"",
				pointsType:"",
				page:"1"
			},
			range: [],
			pointsruleArr:[],
			addPointOptions:{},
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:""
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		addPoint:addPoint
	},
    created() {
       
    },
    mounted(){
		this.getData();
		this.getPiontSrule();
    },
    methods: {
		build(data){
			console.log(data)
			// this.addPointOptions = data;
			this.$refs.addPoint.showModel();
		},
		getPiontSrule(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/pointsrule/query",
				data:{},
				success:function(data){
					that.pointsruleArr = data.data;
				}
			})
		},
		reset(){
			this.searchData.userId = "";
			this.searchData.pointsId = "";
			this.searchData.queryStartTime = "";
			this.searchData.queryEndTime = "";
			this.searchData.pointsType = "";
			this.searchData.relationUserId = "";
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
				url:API_HOST+"/manager/points/query",
				data:that.searchData,
				success:function(data){
					if(data.code!=200){
						that.dataFlag = false;
						that.loadTxt = "加载失败";
						return;
					}
					that.data = data.data;
					console.log(that.data.data)
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
		toBookManage(data){
			this.$router.push({path: "/bookManage", query: {id: data.shopId}});
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.markDetail{
	
}
</style>


