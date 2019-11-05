const App = () => import('../../App.vue')

const routerPathList = [];
const routerObjList = [];

const routerImport = (r) => {
	r.keys().forEach(
		(key) => {
			routerPathList.push(key.replace(/\./,""));
		}
	)
	routerDistribution(routerPathList)
}

const routerDistribution = (list) =>{
	routerObjList.push({
				path: '/',
				component: ()=>import('../../components/shopManage/shopManage.vue')
			});
	list.forEach(
		(key) => {
			routerObjList.push({
				path:'/' + key.replace(/\/frontManage\/|\/shopArea\/|\/userManage\/|\/shopManage\//,"").replace(/\.vue/,""),
				component: ()=>import("../../components" + key)
			})
		}
	)
}
// 引入如需要配置路由的组件
routerImport(require.context("../../components",true,/^\.\/frontManage\/.*\.vue$|^\.\/shopArea\/.*\.vue$|^\.\/userManage\/.*\.vue$|^\.\/shopManage\/.*\.vue$/))


export default {
    routes: [{
      path: '/',
      component: App,
      children: [
			...routerObjList
      ]
    }]
  };