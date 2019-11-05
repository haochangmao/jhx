//注册全局组件
import Vue from 'vue';

const changeStr = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireComponent = require.context('.',false,/\.vue$/);
requireComponent.keys().forEach(
	fileName => {
console.log(requireComponent(fileName))
		const config = requireComponent(fileName);
		const componentName = changeStr(fileName.replace(/^\.\//,'').replace(/\.vue$/,''));
		Vue.component(componentName,config.default || config);
	}
)