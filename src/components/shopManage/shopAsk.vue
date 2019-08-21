<template> 
<div>
    <div class="jhx shopAsk">
		<h3>机构问答</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">问题ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.questionId">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">机构名称</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.shopName">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">机构ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.shopId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">提问人</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.questionUser">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">问题状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.answerStatus">
						<option value="">全部</option>
						<option value="1">已回答</option>
						<option value="2">未回答</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">显示状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.displayStatus">
						<option value="">全部</option>
						<option value="1">显示</option>
						<option value="2">不显示</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">提问时间</label>
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
						<th>提问ID</th>
						<th>机构ID</th>
						<th>机构名称</th>
						<th>问题内容</th>
						<th>提问人</th>
						<th>提问时间</th>
						<th>问答状态</th>
						<th>显示状态</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.questionId}}</td>
						<td>{{i.shopId}}</td>
						<td>{{i.shopName}}</td>
						<td>{{i.question}}</td>
						<td>{{i.questionUser}}</td>
						<td>{{i.questionTime}}</td>
						<td>{{i.answerStatus|answerStatus}}</td>
						<td>{{i.displayStatus|displayStatus}}</td>
						<td class="opration"><span @click="viewShopAsk(i)">查看</span>&nbsp;<span @click="deleteAsk(i)">删除</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<askDetail :modal-options="askDetailData" ref="askDetail"></askDetail>
		<modal :modalOptions="deleteTip" ref="modal"></modal>
		<load :loadTxt="loadTxt" v-show="!deleteFlag" class="deleteFlag"></load>
    </div>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import askDetail from '../component/shopManage/askDetail.vue';
import modal from '../component/plugin/modal.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				questionId:null,
				shopId:"",
				shopName:"",
				questionUser:"",
				answerStatus:null,
				displayStatus:null,
				queryStartTime:"",
				queryEndTime:"",
				page:"1"
			},
			range: [],
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:"",
			askDetailData:{},
			deleteTip:{},
			deleteFlag:true
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		askDetail:askDetail,
		modal:modal
	},
    created() {
       
    },
    mounted(){
		this.getData();
		console.log(this.$route.query.id)
    },
    methods: {
		reset(){
			this.searchData.questionId = null;
			this.searchData.shopId = "";
			this.searchData.shopName = "";
			this.searchData.questionUser = "";
			this.searchData.answerStatus = null;
			this.searchData.displayStatus = null;
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
			this.searchData.questionId = parseInt(this.searchData.questionId)
			console.log(this.searchData)
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
				url:API_HOST+"/manager/qa/query",
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
		viewShopAsk(data){
			this.askDetailData = data;
			this.$refs.askDetail.showModel();
		},
		deleteAsk(data){
			var that = this;
			if(!that.deleteFlag)return;
			that.$refs.modal.showModel();
			that.deleteTip = {
				title: "提示",
				width: "200",
				txt:"确定删除吗？",
				btnSubmitText: "保存",
				btnCancelText:"取消",
				btnSubmitFunction:function(){
					console.log(that.deleteFlag)
					util.ajax({
						url:API_HOST+"/manager/qa/delete",
						data:{
							questionId:data.questionId,
						},
						success:function(data){
							console.log(that.deleteFlag)
							if(data.code!=200){
								that.deleteFlag = false;
								that.loadTxt = "删除失败";
							}else{
								that.deleteFlag = false;
								that.loadTxt = "删除成功";
								that.getData();
							}
							console.log(that.deleteFlag)
							setTimeout(function(){
								that.deleteFlag = true;
								console.log(that.deleteFlag)
							},1000);
						},
						error:function(){
							that.deleteFlag = false;
							that.loadTxt = "删除失败";
							setTimeout(function(){
								that.deleteFlag = true;
								console.log(that.deleteFlag)
							},1000);
						}
					});
					
				}
			}
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.shopAsk{
	
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


