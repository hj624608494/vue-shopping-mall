<template>
	<div class="lg-content" slot="content">
		<div class="lg-title ui-clear">
			<span v-on:click="close()">
				<Icon class="lg-close" type="close-round" ></Icon>
			</span>
			<div class="lg-logo ui-fl"></div>
			<span class="ui-fr color" v-on:click="jump()">{{_jump}}</span>
		</div>
		<form v-show="lgrg">
			<ul class="lgoin-content">
				<li class="lg-li">
					<input class="text"  type="text" name="usernum" placeholder="手机号 或 email" maxlength="50" v-model="userLogin.email">
				</li>
				<li class="lg-li">
					<input class="text" type="password" name="password" placeholder="密码" maxlength="20" v-model="userLogin.password">
				</li>
				<li class="lg-li forget">
					<a href="javascript:;" class="color" >
						忘记密码?
					</a>
				</li>
				<li class="lg-li">
					<input v-disabled="ldisabled"  class="btn" type="button" name="lgbtn" value="登录" @click="doLogin()">
				</li>
			</ul>
		</form>
		<form v-show="!lgrg">
			<ul class="lgoin-content">
				<li class="lg-li">
					<input class="text" type="email" name="remail" placeholder="邮箱 (需要接收验证码)" maxlength="45" v-model="userRegister.email">
				</li>
				<li class="lg-li">
					<input class="test ui-fl" type="text" name="test" placeholder="输入验证码" maxlength="6" v-model="userRegister.code">
					<input class="test-btn ui-fr" type="button" name="yanzheng" v-model="btnMsg" :value="btnMsg" :disabled="!mailVerifyStatus" @click="mailVerify()">
				</li>
				<li class="lg-li">
					<input class="text" type="password" name="password" placeholder="输入密码" maxlength="20" v-model="userRegister.passworda">
				</li>
				<li class="lg-li">
					<input class="text" type="password" name="password" placeholder="确认密码" maxlength="20" v-model="userRegister.passwordb">
				</li>
				<li class="lg-li ui-ver-m">
					<check v-model="ck" class="ui-ver-md"></check>
					<span class="ui-dis-ib ui-ver-md">我已阅读并已同意</span>
					<a href="javascript:;" class="ui-dis-ib color ui-ver-md">
						《蜗创社区用户协议》
					</a>
				</li>
				<li class="lg-li">
					<input class="btn" type="button" name="lgbtn" value="同意并注册" v-disabled="!ck" @click='userSgin()'>
				</li>
			</ul>
		</form>
	</div>
</template>
<script type="text/javascript">
	import ajax from "../assets/js/ajax"
	import ser from "../assets/js/serverUrl"
	import msg from "iview/src/components/message"
	import check from 'iview/src/components/checkbox'
	import icon from 'iview/src/components/icon'
	export default{
		props:["lgrg"],
		components:{
			check:check,
			Icon:icon,
		},
		directives:{
			//禁用表单元素
			disabled:{
				bind:function(el){
					if(el.getAttribute("disabled")){
						el.removeAttribute("disabled");
					}
				},
				update (el,binding){
					let bool=binding.value;
					if(bool){
						el.setAttribute("disabled","");
					}else{
						el.removeAttribute("disabled");
					}
				}
			}
		},
		data(){
			return {
				// 登录
				ldisabled:false,
				userLogin:{},
				//注册
				ck:false,
				rdisabled:true,
				mailVerifyStatus:true,
				userRegister:{},
				btnMsg:'发送验证码',
				num:30
			}
		},
		computed:{
			_jump:function(){
				return this.lgrg?"注册":"登录";
			}
		},
		methods:{
			doLogin(){
				let t=this;
				let user=t.userLogin;
				if(!user.email||!user.password){
					msg.info("帐号或密码未输入");
					return;
					// console.log(1)
				};
				// console.log(0)
				t.ldisabled=true;
				ajax.$http(t,{
					url:ser.url("doLogin"),
					type:"post",
					data:{
						email:user.email.trim(),
						password:user.password.trim()
					}
				},function(resp){
					if(resp.code==200){
						let usermsg=resp.data;
						t.$emit('message', usermsg);
						msg.success(resp.msg);
						t.ldisabled=false;
						ser.setItem(ser.userId,usermsg.id);
						ser.setItem(ser.usermsg,usermsg);
						// 文本框制空
						t.userLogin={};
						//事件抛出
						t.loginSuccess();
					}else{
						//密码错误
						msg.error(resp.msg);
						t.ldisabled=false;
					}
				})
			},
			// 注册邮箱验证码接口
			mailVerify(){
				var timer = null;
				clearInterval(timer);
				var _this = this;
				ajax.$http(_this,{
					type:'POST',
					url:ser.url("emailVerify"),
					data:{
						email:_this.userRegister.email.trim()
					}
				},function(res){
					// var num = 10;
					if (res.code == 200) {
						msg.success(res.msg);
						_this.mailVerifyStatus =false;
						timer = setInterval(function(){
							if (_this.num>0) {
								_this.num--
								_this.mailVerifyStatus =false;
								_this.btnMsg='已发送'+'('+_this.num+')';
							} else if(_this.num == 0){
								_this.num = 10;
								_this.btnMsg='重新发送';
								_this.mailVerifyStatus =true;
								clearInterval(timer);
							}
						},1000)
					} else {
						msg.error(res.msg);
					}
				})
			},
			//注册接口
			userSgin(){
				var _this = this;
				var data = {
					email:_this.userRegister.email.trim(),
					password:_this.userRegister.passwordb.trim(),
					code:_this.userRegister.code.trim()
				}
				if (_this.userRegister.passworda.trim()==_this.userRegister.passwordb.trim()) {
					ajax.$http(_this,{
						type:'POST',
						url:ser.url("doRegister"),
						data:data
						},function(resp){
							if (resp.code == 200) {
								msg.success(resp.msg);
								_this.lgrg=true;

								} else {
								msg.error(resp.msg);
							}
						})
					}

			},
			doRegister(){
				let t=this;
				let user=t.userRegister;
				t.rdisabled=true;
			},
			// 自定义事件
			close(){
				this.userLogin={};
				this.userRegister={};
				this.$emit('close');
			},
			jump(){
				this.$emit('jump');
			},
			lgCb(){
				this.$emit('lgcb');
			},
			loginSuccess(){
				this.$emit('lgYes');

			},
			clear(){

			}
		}
		
	}
</script>
<style lang="scss">
.lg-content{
	width:300px;
	.lg-close{
		font-size:20px;
		position:absolute;
		top:10px;
		right:10px;
		color:#989898;
		z-index:202;
	}
	.color{
		color:#3497FF;
	}
	.lg-title{
		width:100%;
		>span{
			
			font-size:12px;
		}
		>span:hover{
			cursor:pointer;
		}
		.lg-logo{
			width:65px;
			height:20px;
			background:url("../assets/images/LOGO Text.png") no-repeat center;
			background-size:contain;
		}
	}
	/*input 通用*/
	.forget{
		text-align:right;
		
	}
	.lg-li{
		margin-top:16px;
		height:40px;
		font-size:14px;
		line-height:40px;

		input{
			outline:none;
			letter-spacing:1px;
		}
		.text,.btn{
			display:block;
			width:100%;
			height:100%;
		}
		.text,.test{
			text-indent:10px;
			border:1px solid #e5e5e5;
		}
		.btn{
			color:#fff;
			background-color: #E5AD68;
			border: 1px solid rgba(0,0,0,0.14);
			border-radius: 2px;
			
		}
		.test{
			width:60%;
		}
		.test-btn{
			width:35%;
			color:#fff;
			background-color: #676564;
			border: 1px solid rgba(0,0,0,0.14);
			border-radius: 2px;
			transition:all .3s ease;
		}

		.btn:active,.test-btn:active{
			opacity:0.6;
		}
	} 
	.lgoin-content{
		margin-top:10px;
		width:100%;
	}
}
</style>