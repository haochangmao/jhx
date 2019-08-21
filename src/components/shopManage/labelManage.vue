<template> 
<div>
    <div class="jhx labelManage">
		<h3>标签管理</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">标签类别</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.parentOptionName">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">标签名称</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.optionName">
				</div>
		    </div>
			
			<div class="form_item">
				<div class="btn_area">
					<button @click="edit" class="btn_s">新建</button>
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
						<th>标签ID</th>
						<th>标签类别</th>
						<th>标签名称</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.optionId}}</td>
						<td>{{i.parentOptionName}}</td>
						<td>{{i.optionName}}</td>
						<td class="opration"><span @click="edit(i)">编辑</span>&nbsp;<span @click="i.parentOptionId!=0 && deleteLabel(i)" :class="i.parentOptionId==0?'grey':''">删除</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<labelEdit :modal-options="labelEditData" ref="labelEdit"></labelEdit>
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
import labelEdit from '../component/shopManage/labelEdit.vue';
import modal from '../component/plugin/modal.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				optionName:"",
				parentOptionName:"",
				page:"1"
			},
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:"",
			labelEditData:{},
			deleteTip:{},
			deleteFlag:true
        }
    },
	components: {
		datepicker: Datepicker,
		lepage:Page,
		load:load,
		labelEdit:labelEdit,
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
			this.searchData.optionName = "";
			this.searchData.parentOptionName = "";
		},
        serach() {
			this.searchData.page = "1";
			this.pageArr.currentPage = "1";
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
				url:API_HOST+"/manager/label/list",
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
		edit(data){
			this.labelEditData = data;
			this.$refs.labelEdit.showModel();
		},
		deleteLabel(data){
			var that = this;
			that.$refs.modal.showModel();
			that.deleteTip = {
				title: "提示",
				width: "200",
				txt:"确定删除吗？",
				btnSubmitText: "保存",
				btnCancelText:"取消",
				btnSubmitFunction:function(){
					util.ajax({
						url:API_HOST+"/manager/label/delete",
						data:{
							optionId:data.optionId,
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
.labelManage{
	
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


