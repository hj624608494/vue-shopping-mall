<template>
  <div id="app">
  	<header class="header">
  		<div class="w-960 ">
  			<router-link to="/">
				<span>窝创社区欢迎您!</span>
			</router-link>
  			<span v-show="userTitle">
  				<span class="login" @click="$lgrg(1)">登录</span>
	  			<span>|</span>
	  			<span @click="$lgrg(0)">注册</span>
  			</span>
  			<span v-show="!userTitle">
  				<span @click="gouser(user)" class="login" :data-id="user.id?user.id:''">{{loginmsg &&loginmsg.email || '无昵称'}}</span>
	  			<span>|</span>
	  			<span @click="doQuit()">退出</span>
  			</span>
  		</div>
		</header>
		<lg v-show="lgdis">
			<lgcon 
				slot="content" 
				:lgrg="lgrg" 
				v-on:message="recieveMessage"
				v-on:close="$close(0)"
				v-on:jump="$jump()"
				v-on:lgYes="$lgYes()"
			></lgcon>
		</lg>
		<section class="com-logo">
			<div class="w-960 ui-pos-r">
				<router-link to="/">
					<div class="logo-woniu"></div>
				</router-link>
				<div class="logo-wochuang"></div>
			</div>
		</section>
		<router-view></router-view>
		<vue-progress-bar></vue-progress-bar>
		<section class="com-pinzhi">
			<ul class="w-960 pinzhi-list ui-just">
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</section>
		<footer class="footer">
			<p>北公网安备 33010000322000066号    蜗创公司版权所有©1997-2017</p>
		</footer>
  </div>
 
</template>
<script>
import lg from './components/Loginbox'
import lgcon from './components/Lgcontent'
import ajax from "./assets/js/ajax";
import ser from "./assets/js/serverUrl";
import msg from "iview/src/components/message"
import QArt from 'qartjs'
export default {
	data(){
		return {
			lgdis:false,
			lgrg:false,
			userTitle:true,
			user:{},
			loginmsg: localStorage.getItem('wochuang_user_msg') && JSON.parse(localStorage.getItem('wochuang_user_msg'))
		}
	},
	components:{
		lg:lg,
		lgcon:lgcon
	},
	methods:{
		recieveMessage: function (userdata) {
	        this.loginmsg = userdata
	    },
		gouser(user){
			this.$router.push({ path: 'buy', query: { id: JSON.parse(user).id }})
		},
		$close(b){
			return b?this.lgdis=true:this.lgdis=false;
		},
		$jump(){
			this.lgrg=!this.lgrg;
		},
		$lgrg(b){
			this.$close(1);
			return b?this.lgrg=true:this.lgrg=false;
		},
		$msg(message){
			msg.info(message)
		},
		testLogin(){
			let user=ser.getItem(ser.userId);

			if(!user){
				msg.info("请登录账号");
				ser.setItem(ser.usermsg,'');
				this.userTitle=true;
			}else{
				this.$lgYes()
				// ajax.$get(this,{
				// 	url:ser.url("loginOrNot"),
				// 	params:{
				// 		id:user
				// 	}
				// },function(resp){
				// 	let userMsg={};
				// 	console.log(resp)
				// 	debugger;
				// 	if(resp.code==200){
				// 		userMsg=resp.data;
				// 		user=resp.data;
				// 		this.userTitle=false;
				// 		this.lgdis=true
				// 		// debugger;
				// 		// ser.setItem(ser.usermsg, JSON.stringify(userMsg));
				// 	}else{
				// 		msg.info("登录已过期");
				// 		ser.setItem(ser.usermsg,'');
				// 		ser.setItem(ser.userId,'');
				// 		this.userTitle=true;
				// 	}
				// })
			}
		},
		$lgYes(){
			this.$close(0);
			let user=ser.getItem(ser.usermsg);
			this.user=user;
			this.userTitle=false;
		},
		doQuit(){
			var t=this;
			ajax.$http(t,{
				url:ser.url("doExit")
			},function(resp){
				t.userTitle=true;
				ser.setItem(ser.userId,'');
				ser.setItem(ser.usermsg,'');
				msg.info("当前用户已退出")
			})
		}
	},
	mounted(){
		let t=this;
		t.testLogin();
	}
}
</script>

<style lang="scss">
.header{
 	width:100%;
 	padding:12px 0;
 	background-color:#444444;
 	color:#fff;
 	font-size:14px;
	
 	.login{
 		margin-left:20px;
 	}
 	span:not(:first-child):hover{
 		cursor:pointer;
 	}
 	span{
 		color:#fff;
 	}
}

/* 登录弹窗 */

.com-logo{
 		width:100%;
 		height:120px;
 		.w-960{height:100%;}
 		.logo-woniu{
 			position:absolute;
 			width:40px;
 			height:34px;
 			background: url("./assets/images/Worm.png") no-repeat center;
 			left:0;
 			top:50%;
 			transform:translatey(-50%);
		}
		.logo-wochuang{
			position:absolute;
			width:85px;
			height:28px;
			background: url("./assets/images/LOGO Text.png") no-repeat center;
			left:50%;
			top:50%;
			transform:translate(-50%,-50%);
		}
 		.logo-woniu,.logo-wochuang{
 			background-size:cover;
 			z-index:1;
 		}
}
.com-pinzhi{
	width:100%;
	padding:50px 0;
	.pinzhi-list{
		padding:0 40px;
		text-align: justify;
		font-size:0;
		>li{
			display:inline-block;
			text-align:justify;
			width:225px;
			height:64px;
			background-position: center;
			background-repeat: no-repeat;
			background-size:contain;
		}
		li:nth-child(1){
			background-image: url("./assets/images/left.png");
		}
		li:nth-child(2){
			background-image: url("./assets/images/middle.png");
		}
		li:nth-child(3){
			background-image: url("./assets/images/right.png");
		}
	}
}
.footer{
	width:100%;
	padding:60px 0 58px;
	font-size:16px;
	background-color:#444444;
	>p{
		width:100%;
		text-align: center;
		color:#fff;
	}
}
</style>
