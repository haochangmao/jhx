<template> 
<div>
    <div class="jhx shopData">
		<h3>机构数据</h3>
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
				<label class="item_label">浏览数</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.playSortOrder">
						<option value="">请选择</option>
						<option value="1">升序</option>
						<option value="0">降序</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">关注数</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.concernSortOrder">
						<option value="">请选择</option>
						<option value="1">升序</option>
						<option value="0">降序</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">预约数</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.appointSortOrder">
						<option value="">请选择</option>
						<option value="0">已到店</option>
						<option value="1">升序</option>
						<option value="0">降序</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">分享数</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.shareSortOrder">
						<option value="">请选择</option>
						<option value="1">升序</option>
						<option value="0">降序</option>
					</select>
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
						<th>浏览数</th>
						<th>关注数</th>
						<th>预约数</th>
						<th>分享数</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.shopId}}</td>
						<td>{{i.shopName}}</td>
						<td>{{i.playNumber}}</td>
						<td>{{i.concernNumber}}</td>
						<td>{{i.appointNumber}}</td>
						<td>{{i.shareNumber}}</td>
						<td class="opration"><span @click="adjust(i)">调整</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<dataAdjust :modal-options="dataAdjustData" ref="dataAdjust"></dataAdjust>
    </div>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import dataAdjust from '../component/shopManage/dataAdjust.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				shopId:"",
				shopName:"",
				playSortOrder:null,
				concernSortOrder:null,
				appointSortOrder:null,
				shareSortOrder:null,
				page:"1"
			},
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:"",
			dataAdjustData:{}
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		dataAdjust:dataAdjust
	},
    created() {
       
    },
    mounted(){
		this.getData();
		console.log(this.$route.query.id)
    },
    methods: {
		reset(){
			this.searchData.shopId = "";
			this.searchData.shopName = "";
			this.searchData.playSortOrder = null;
			this.searchData.concernSortOrder = null;
			this.searchData.appointSortOrder = null;
			this.searchData.shareSortOrder = null;
		},
        serach() {
			this.searchData.page = "1";
			this.pageArr.currentPage = "1";
			this.loadTxt = "加载中";
			this.dataFlag = false;
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
				url:API_HOST+"/manager/edudata/query",
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
		adjust(data){
			this.dataAdjustData = data;
			this.$refs.dataAdjust.showModel();
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.shopData{
	
}
</style>


