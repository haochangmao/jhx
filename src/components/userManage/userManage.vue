<template> 
<div>
    <div class="jhx userManage">
		<h3>用户管理</h3>
		<div class="search_area clear">
		    <div class="form_item">
				<label class="item_label">用户ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userId">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">微信ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.wchatId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">用户昵称</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.userName">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">用户来源</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.userSrcType">
						<option value="">全部</option>
						<option value="1">自主注册</option>
						<option value="2">微信分享</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">用户状态</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.userStatus">
						<option value="">全部</option>
						<option value="0">启用</option>
						<option value="1">停用</option>
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
						<th>用户ID</th>
						<th>微信ID</th>
						<th>用户昵称</th>
						<th>用户积分</th>
						<th>用户状态</th>
						<th>注册时间</th>
						<th>更新时间</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.userId}}</td>
						<td>{{i.wchatId}}</td>
						<td>{{i.userName}}</td>
						<td>{{i.pointsValue}}</td>
						<td>{{i.userStatus|userStatus}}</td>
						<td>{{i.registerTime}}</td>
						<td>{{i.updateTime}}</td>
						<td class="opration"><span @click="stopOrContiune(i)">{{i.userStatus==1?"停用":"启用"}}</span>&nbsp;<span @click="toMarkDetail(i)">积分</span>&nbsp;<span @click="toBookManage(i)">预约</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<modal :modalOptions="stopTip" ref="modal"></modal>
    </div>
	<!-- <div class="stopOrContiuneFlag" v-show="!stopOrContiuneFlag"> -->
		<load :loadTxt="loadTxt" v-show="!stopOrContiuneFlag" class="stopOrContiuneFlag"></load>
	<!-- </div> -->
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Datepicker from 'vue-datepicker-local';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import modal from '../component/plugin/modal.vue'
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				userId:"",
				wchatId:"",
				userName:"",
				userSrcType:"",
				userStatus:"",
				queryStartTime:"",
				queryEndTime:"",
				page:"1"
			},
			range: [],
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:"",
			stopTip:{},
			stopOrContiuneFlag:true
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		modal:modal
	},
    created() {
       
    },
    mounted(){
		this.getData();
    },
    methods: {
		reset(){
			this.searchData.userId = "";
			this.searchData.wchatId = "";
			this.searchData.userName = "";
			this.searchData.userSrcType = "";
			this.searchData.userStatus = "";
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
				url:API_HOST+"/manager/clientuser/query",
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
						console.log(123,that.pageArr)
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
		stopOrContiune(data){
			var that = this;
			if(!that.stopOrContiuneFlag)return;
			that.$refs.modal.showModel();
			that.stopTip = {
				title: "提示",
				width: "200",
				txt:data.userStatus==1?"确定停用吗？":"确定启用吗？",
				btnSubmitText: "保存",
				btnCancelText:"取消",
				btnSubmitFunction:function(){
					util.ajax({
						url:API_HOST+"/manager/clientuser/save",
						data:{
							userId:data.userId,
							userStatus:data.userStatus==1?0:1
						},
						success:function(data){
							if(data.code!=200){
								that.stopOrContiuneFlag = false;
								that.loadTxt = "修改失败";
							}else{
								that.stopOrContiuneFlag = false;
								that.loadTxt = "修改成功";
								that.getData();
							}
							setTimeout(function(){
								that.stopOrContiuneFlag = true;
							},1000);
						},
						error:function(){
							
						}
					})
				}
			}
		},
		toMarkDetail(data){
			this.$router.push({path: "/markDetail", query: {id: data.userId}});
		},
		toBookManage(data){
			this.$router.push({path: "/bookManage", query: {id: data.userId}});
		}
    },
    computed:{

    },
    watch:{
        
    }
}
 

</script>
<style lang="scss" scoped>
.userManage{
}
	.stopOrContiuneFlag{
		position: fixed;
		top: 0;
		bottom:0;
		left: 0;
		right: 0;
		z-index: 9999;
	}
</style>


