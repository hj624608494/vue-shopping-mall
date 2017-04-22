<template>
    <div class="classify">
        <div class="cf-title w-960">
            <router-link to="/">
                首页
            </router-link>  
            <span>
                >
            </span>
            <span>
                {{currentClass.text}}
            </span>
        </div>
        <div class="w-960 " :class="{'ld-300':ldpic}">
            <ul class="Class-sp-list ui-clear">
                <li class="Class-sp-li ui-fl" v-for="item in getClassify">
                    <router-link :to="{path:'/goods',query:{id:item.id,cid:item.cid}}">
                        <div class="Class-sp-pic" :style="{'background-image':'url('+item.images[0]+')'}">
                        </div>
                        <p class="sp-name">{{item.name}}</p>
                        <p class="sp-jiage">
                            {{item.price+"元"}}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>
<script type="text/javascript">
    import ajax from "../assets/js/ajax"
    import ser from "../assets/js/serverUrl"
    import Qs from 'qs'

    export default{
        data(){
            return {
                getClassify:[],
                ldpic:true,
                currentClass:[]
            }
        },
        computed:{
            current(){
                return this.$router.currentRoute.query
            }
        },
        mounted(){
            let t=this;
            
            t.$Progress.start()


            // t.axios.post(ser.url("getGoodsByClass"), Qs.stringify({cid: t.current.cid}), {
            //   headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //   },
            // }).then(response => response.data)
            //   .then(data => {
            //     console.log(data);
            // });

            ajax.$http(t,{
              url:ser.url("getGoodsByClass"),
              type:"post",
              data:{
                cid: t.current.cid
              }
            },function(resp){
                t.ldpic=false;
                t.getClassify=resp.data;
                t.$Progress.finish()
            })
            
            // 获取商品分类名称
            ajax.$http(t,{
              url:ser.url("getClassifyById"),
              type:"post",
              data:{
                id:t.current.cid
              }
            },function(resp){
                if (resp.code == 200) {
                    t.currentClass = resp.data[0];
                }
            })
        }

    }
</script>
<style lang="scss">
    .cf-title{
        
        padding:40px 0 20px 20px;
        background-color:#f8f8f8;
    }
    .Class-sp-list{
        width:100%;
        margin-top:10px;
        .Class-sp-li{
                text-align:center;
                width:25%;
                
                padding-bottom: 10px;
                .Class-sp-pic{
                    width:232px;
                    height:232px;
                    margin:0 auto;
                    background:#F4F4F4 url("../assets/images/index-sp_03.png") no-repeat center;
                    background-size:cover;
                    background-clip:content-box;
                }
                p{
                    overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                }
                .sp-name{
                    padding:14px 0 12px;
                }
                .sp-jiage{
                    color:#F6732D ;
                }
        }
    }
</style>