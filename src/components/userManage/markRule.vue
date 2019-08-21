<template> 
<div>
    <div class="jhx markDetail">
		<h3>积分规则</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">积分规则ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.pointsRuleId">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">规则名称</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.pointsName">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">规则状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.ruleStatus">
						<option value="">全部</option>
						<option value="1">启用</option>
						<option value="0">停用</option>
					</select>
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
						<th>积分规则ID</th>
						<th>规则名称</th>
						<th>积分变化</th>
						<th>规则状态</th>
						<th>创建时间</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.pointsRuleId}}</td>
						<td>{{i.pointsName}}</td>
						<td>{{i.pointsValue}}</td>
						<td>{{i.ruleStatus|ruleStatus}}</td>
						<td>{{i.updateTime}}</td>
						<td class="opration"><span @click="changeRuleStatus(i)">{{i.ruleStatus=="0"?"启用":"禁用"}}</span><span v-show="false" @click="deleteRule(i)">&nbsp;删除&nbsp;</span></td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<modal :modalOptions="deleteTip" ref="modal"></modal>
    </div>
	<load :loadTxt="loadTxt" v-show="!deleteFlag" class="deleteFlag"></load>
	<addPointRule ref="addPointRule"></addPointRule>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import modal from '../component/plugin/modal.vue'
import addPointRule from '../component/userManage/addPointRule.vue'
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			deleteFlag:true,
			searchData:{
				pointsRuleId:"",
				ruleStatus:"",
				pointsName:"",
				page:"1"
			},
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:"",
			deleteTip:{}
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		modal:modal,
		addPointRule:addPointRule
	},
    created() {
       
    },
    mounted(){
		this.getData();
    },
    methods: {
		build(data){
			this.$refs.addPointRule.showModel();
		},
		reset(){
			this.searchData.pointsRuleId = "";
			this.searchData.ruleStatus = "";
			this.searchData.pointsName = "";
		},
        serach() {
			this.searchData.page = "1";
			this.pageArr.currentPage = "1";
			this.dataFlag = false;
			this.loadTxt = "加载中";
			this.getData();
        },
		childProp(thePage){
			if(this.searchData.page==thePage) return;
			this.searchData.page = thePage;
			this.getData();
		},
		getData(){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/pointsrule/query",
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
		deleteRule(data){
			var that = this;
			if(!that.deleteFlag)return;
			that.$refs.modal.showModel();
			that.deleteTip = {
				title: "提示",
				width: "200",
				txt:"确定删除吗？",
				btnSubmitText: "删除",
				btnCancelText:"取消",
				btnSubmitFunction:function(){
					util.ajax({
						url:API_HOST+"/manager/pointsrule/delete",
						data:{
							pointsRuleId:data.pointsRuleId,
						},
						success:function(data){
							if(data.code!=200){
								that.deleteFlag = false;
								that.loadTxt = "删除失败";
							}else{
								that.deleteFlag = false;
								that.loadTxt = "删除成功";
								that.getData();
							}
							setTimeout(function(){
								that.deleteFlag = true;
							},1000);
						},
						error:function(){
							
						}
					})
				}
			}
		},
		changeRuleStatus(data){
			var that = this;
			util.ajax({
				url:API_HOST+"/manager/pointsrule/save",
				data:{
					pointsRuleId:data.pointsRuleId,
					ruleStatus:data.ruleStatus=="1"?"0":"1"
				},
				success:function(data){
					if(data.code!=200){
						that.deleteFlag = false;
						that.loadTxt = "操作失败";
					}else{
						that.deleteFlag = false;
						that.loadTxt = "操作成功";
						that.getData();
					}
					setTimeout(function(){
						that.deleteFlag = true;
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
.markDetail{
	
}
.deleteFlag{
		position: fixed;
		top: 0;
		bottom:0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>


