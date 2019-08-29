<template> 
<div>
    <div class="jhx classManage">
		<h3>类别管理</h3>
		<div class="search_area clear">
			<div class="form_item">
				<label class="item_label">类别ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.typeId">
				</div>
			</div>
		    <div class="form_item">
				<label class="item_label">类别名称</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.typeName">
				</div>
		    </div>
			<div class="form_item">
				<label class="item_label">类别等级</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.level">
						<option value="">全部</option>
						<option value="1">一级</option>
						<option value="2">二级</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">父类别ID</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.parentTypeId">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">父类别</label>
				<div class="item_cont">
					<input class="input_write ipt1" type="text" v-model="searchData.parentTypeName">
				</div>
			</div>
			<div class="form_item">
				<label class="item_label">前端显示</label>
				<div class="item_cont select1">
					<select name="" id="" class="" v-model="searchData.displayStatus">
						<option value="">全部</option>
						<option value="1">是</option>
						<option value="2">否</option>
					</select>
				</div>
			</div>
			<div class="form_item">
				<div class="btn_area">
					<button @click="build" class="btn_s">新建</button>
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
						<th>类别ID</th>
						<th>类别名称</th>
						<th>类别等级</th>
						<th>父类ID</th>
						<th>父类别</th>
						<th>前端显示</th>
						<th>前端序号</th>
						<th>操作</th>
					</tr>
				<!-- </thead> -->
				<!-- <tbody> -->
					<tr v-for="i in data">
						<td>&nbsp;{{i.typeId}}</td>
						<td>{{i.typeName}}</td>
						<td>{{i.level}}</td>
						<td>{{i.parentTypeId}}</td>
						<td>{{i.parentTypeName}}</td>
						<td>{{i.displayStatus==1?'是':'否'}}</td>
						<td>{{i.sortNum}}</td>
						<td class="opration"><span :class="i.level==1?'grey':''" @click="i.level!=1 && editClass(i)">编辑</span>&nbsp;<span @click="deleteClass(i)">删除</span>&nbsp;</td>
					</tr>
			</table>
		</div>
		<div class="page_con"><lepage :pageArr="pageArr" @childProp="childProp" class="clear"></lepage></div>
		<editClass :modal-options="editClassData" ref="editClass"></editClass>
		<modal :modalOptions="deleteTip" ref="modal"></modal>
		<load :loadTxt="loadTxt" v-show="!deleteFlag" class="deleteFlag"></load>
    </div>
</div>
</template> 

<script>
	
import util from '../../js/common/util';
import Page from '../component/plugin/page.vue';
import load from '../component/plugin/load.vue';
import modal from '../component/plugin/modal.vue';
import editClass from '../component/frontManage/editClass.vue';
export default {
    data () {
        return {
			data:{},
			dataFlag:false,
			searchData:{
				typeId:"",
				typeName:"",
				level:"",
				parentTypeId:"",
				parentTypeName:"",
				displayStatus:"",
				page:"1"
			},
			editClassData:{},
			deleteTip:{},
			deleteFlag:true,
			pageArr:{totalPage:"",currentPage:"1"},
			loadTxt:""
        }
    },
	components: {
		lepage:Page,
		load:load,
		modal:modal,
		editClass:editClass
	},
    created() {
       
    },
    mounted(){
		this.getData();
		console.log(this.$route.query.id)
    },
    methods: {
		build(){
			this.editClassData = {};
			this.$refs.editClass.showModel();
		},
		reset(){
			this.searchData.typeId = "";
			this.searchData.typeName = "";
			this.searchData.parentTypeId = "";
			this.searchData.parentTypeName = "";
			this.searchData.level = "";
			this.searchData.displayStatus = "";
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
				url:API_HOST+"/manager/category/list",
				data:that.searchData,
				success:function(data){
					if(data.code!=200){
						that.dataFlag = false;
						that.loadTxt = "加载失败";
						return;
					}
					that.data = data.data;
					if(that.data.length>0){
						that.pageArr.totalPage = 7 || Math.ceil(data.total/10);
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
		editClass(data){
			this.editClassData = data;
			this.$refs.editClass.showModel();
		},
		deleteClass(data){
			var that = this;
			if(!that.deleteFlag)return;
			that.$refs.modal.showModel();
			console.log(data)
			that.deleteTip = {
				title: "提示",
				width: "200",
				txt:"确定删除吗？",
				btnSubmitText: "保存",
				btnCancelText:"取消",
				btnSubmitFunction:function(){
					util.ajax({
						url:API_HOST+"/manager/category/delete",
						data:{
							typeId:data.typeId,
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
							that.deleteFlag = false;
							that.loadTxt = "删除失败";
							setTimeout(function(){
								that.deleteFlag = true;
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
.classManage{
	
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



