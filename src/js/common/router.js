import App from '../../App.vue';
//机构管理
import shopUser from '../../components/shopManage/shopUser.vue';
import shopData from '../../components/shopManage/shopData.vue';
import shopVerify from '../../components/shopManage/shopVerify.vue';
import shopAsk from '../../components/shopManage/shopAsk.vue';
import labelManage from '../../components/shopManage/labelManage.vue';
import shopManage from '../../components/shopManage/shopManage.vue';
//用户管理
import userManage from '../../components/userManage/userManage.vue';
import bookManage from '../../components/userManage/bookManage.vue';
import markDetail from '../../components/userManage/markDetail.vue';
import markRule from '../../components/userManage/markRule.vue';
//商圈
import shopLocation from '../../components/shopArea/shopLocation.vue';
//前端管理
import bannerManage from '../../components/frontManage/bannerManage.vue';
import classManage from '../../components/frontManage/classManage.vue';
export default {
    routes: [{
      path: '/',
      component: App,
      children: [
				//机构管理模块
			{
        path: '/',
        component: shopManage
      },{
        path: '/shopManage',
        component: shopManage
      },
      {
        path: '/shopUser',
        component: shopUser
      },
			{
			  path: '/shopData',
			  component: shopData
			},
			{
			  path: '/shopVerify',
			  component: shopVerify
			},
			{
			  path: '/shopAsk',
			  component: shopAsk
			},
			{
			  path: '/labelManage',
			  component: labelManage
			},
			//用户管理模块
			{
			  path: '/userManage',
			  component: userManage
			},
			{
			  path: '/bookManage',
			  component: bookManage
			},
			{
			  path: '/markDetail',
			  component: markDetail
			},
			{
			  path: '/markRule',
			  component: markRule
			},
			//商圈
			{
			  path: '/shopLocation',
			  component: shopLocation
			},
			//前端管理
			{
			  path: '/bannerManage',
			  component: bannerManage
			},
			{
			  path: '/classManage',
			  component: classManage
			},
      ]
    }]
  };