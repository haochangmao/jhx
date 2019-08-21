let util = {
	getDate:function(formatStr){
		console.log(formatStr)
		var str = formatStr;
		str=str.replace(/yyyy|YYYY/,formatStr.getTime().getFullYear());   
	    str=str.replace(/yy|YY/,(formatStr.getTime().getYear() % 100)>9?(formatStr.getTime().getYear() % 100).toString():'0' + (formatStr.getTime().getYear() % 100));   
	  
	    str=str.replace(/MM/,formatStr.getTime().getMonth()>9?formatStr.getTime().getMonth().toString():'0' + formatStr.getTime().getMonth());   
	    str=str.replace(/M/g,formatStr.getTime().getMonth());   
	 
	 
	    str=str.replace(/w|W/g,Week[formatStr.getTime().getDay()]);  
		return str;
	},
	timeTrans(time){
		return  time.getFullYear() + 
				"-" + 
				( time.getMonth()<=8 ? "0"+(time.getMonth()+1) : (time.getMonth()+1) )+ 
				"-" + 
				( time.getDate()<=9 ? "0"+time.getDate() : time.getDate() );
	},
	isEmptyObject(obj) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
	ajax : function (opt){
		$.ajax({
			url: opt.url,
			type: "GET",
			timeout : "50000",
			async: true,
			cache: true,//要求为Boolean类型的参数，默认为true（当dataType为Script时，默认为false），设置false将不会从浏览器缓存中加载请求信息。
			data: opt.data,
			dataType: "json",
			beforeSend(res){//要求为Function类型的参数，发送请求前可以修改XMLHttpRequest对象的函数，例如添加自定义HTTP头。在beforeSend中如果返回false可以取消本次ajax请求。XMLHttpRequest对象是唯一的参数。
		　　　//调用本次ajax请求时传递的options参数
		　　},
			complete(res){//请求完成后调用的回调函数（请求成功或失败均调用）。参数：XMLHttpRequest对象和一个描述成功请求类型的字符串。
		　　　　//调用本次ajax请求时传递的options参数
				opt.complete && opt.complete(res);
		　　},
			success(res){
				codeMap(res)
			},
			error(res){
				console.log('error',res)
				opt.error && opt.error(res);
			}
		});
		function codeMap (res){
			switch (res.code) {
			    //成功
			    case "100011":
					opt.success && opt.success(res.message);
			        break;
			    case "200":
					opt.success && opt.success(res);
			        break;                
			    default:
			        break;
			}
		}
	},
	tips(text,flag){
		
	}
}
export default util;