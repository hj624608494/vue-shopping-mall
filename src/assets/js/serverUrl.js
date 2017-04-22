export default{
	url(u){
		let t=this;
		return t.baseURL.trim()+t[u.trim()].trim();
	},
	baseURL:"http://127.0.0.1/wochuang/public",
	// 登录注册
	loginOrNot:"/index/Index/loginOrNot",
	doLogin:"/index/user/doLogin",
	doRegister :"/index/user/doRegister",
	doExit :" /index/user/doExit",
	doModifyPwd :"/index/user/doModifyPwd",
	emailVerify :"/index/user/email",

	//查询订单
	weitPay :" /index/Ordercontroller/weitPay",
	weitSend :"/index/Ordercontroller/weitSend",
	Receive :"/index/Ordercontroller/Receive",
	cancelOrder :"/index/Ordercontroller/cancelOrder",
	// 商品相关
	//首页顶部幻灯片
	getSlider :"/index/Slide/getSlider",
	getClassify :"/index/Classifycontroller/getClassify",
	getClassifyById :"/index/Classifycontroller/getClassifyById",
	getSale :"/index/Salecontroller/getSale",
	getSaleById :"/index/Salecontroller/getSaleById",
	getGoodsByClass :"/index/Goodscontroller/getGoodsByClass",
	getGoodsById :"/index/Goodscontroller/getGoodsById",
	getGoods:"/index/Goodscontroller/getGoods",
	//首页中部幻灯片
	getSliderCenter:"/index/Slide/getSliderCenter",
	//首页底部幻灯片
	getSliderBottom:"/index/Slide/getSliderBottom",
	// 订单相关
	getAddress :"/index/Addresscontroller/getAddress",
	addAddress :"/index/Addresscontroller/addAddress",
	modifyAddress :"/index/Addresscontroller/modifyAddress",
	delAddress :"/index/Addresscontroller/delAddress",
	addOrder :"/index/Ordercontroller/addOrder",
	QR : "/index/index/pingpp",
	queryPayStatus : "/index/index/chargeCondition",
	paySuccessNotice : "/index/Ordercontroller/paySuccess",
	// 本地存储相关
	setItem(key,item){
		let _item=typeof item == 'string'?item:JSON.stringify(item);
		return localStorage.setItem(key,_item);
	},
	getItem(key,type){
		let local=localStorage.getItem(key);
		return local;
	},
	userId:'wochuang_logining_uid',
	usermsg:'wochuang_user_msg'

}