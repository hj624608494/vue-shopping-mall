import Qs from 'qs';
import cf from "./serverUrl"
export default{
	/*格式化
		encodeURIComponent()编码
		decodeURIComponent()解码
	*/
	parse(obj){
		if(!obj)return;
		let arr=[];
		for(let key in obj){
			arr.push(key+"="+obj[key]);
		}
		return arr.join("&");
	},
	decode(str){
		let obj={};
		let a=str.split("&");
		a.forEach(function(val,index){
			obj[val.split("=")[0]]=val.split("=")[1];
		});
		return obj;
	},
	//配置axios
	http(t,obj){
		if(!obj)return;
		let config={
			url:obj.url.trim()||'',
			method:obj.type||'get',
			// 基本路径
			baseURL:cf.baseURL,
			transformRequest:[function(data){
				return Qs.stringify(data);
			}],
			transformResponse:[function(data){
				return Qs.parse(data);
			}],
			headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			},
			params:obj.params||null,
			paramsSerializer: function(params) {
		    return Qs.stringify(params, {arrayFormat: 'brackets'})
		  },
		  data:obj.data||{},
		  timeout:5000,
		  withCredentials :false,
		  responseType:obj.dataType || "json",
		  maxContentLength:2000,
		  validateStatus:function(status){
		  	return status>=200 && status<300;
		  }
		}
		return t.axios(config);
	},
	get(t,obj){
		let tt=this;
		let par=obj.params||null;
		let _url=obj.url+(par?'?'+tt.parse(par):'');
		return t.axios.get(_url);
	},
	//并行请求
	all(t,arr){
		if(arr&&(arr.length<1||!arr[0].url))return;
		let a=[];
		let _this=this;
		arr.forEach(function(val,key){
			a.push(val.url+(val.params?"?"+_this.parse(val.params):''))
		})
		a=a.map(function(val){
			return t.axios.get(val);
		})
		
		return t.axios.all(a);
	},
	$http(t,obj,cb,error){
		let tt=this;
		tt.http(t,obj).then(function(resp){
			let _resp=resp.data;
			// console.log(resp)
			cb&&cb(_resp);
		}).catch(function(err){
			console.log(err)
			error&&error(err);
		})
	},
	$get(t,obj,cb,error){
		let tt=this;
		tt.get(t,obj).then(function(resp){
			let _resp=resp.data;
			cb&&cb(_resp)
		}).catch(function(err){
			console.log(err)
			error&&error(err);
		})

	}
}