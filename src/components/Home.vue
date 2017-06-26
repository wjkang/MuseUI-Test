<template>
  <div class="header">
    <mu-appbar v-if="theme" :title="theme" id="topic">
      <mu-icon-button icon='menu' slot="left" @click="toggle(true)"/>
      <mu-icon-button icon='add' slot="right">
      </mu-icon-button>
    </mu-appbar>
    <mu-appbar v-if="!theme" :title="title" id="topic">
      <mu-icon-button icon='menu' slot="left" @click="toggle(true)"/>
      <mu-icon-button icon='add' slot="right">
      </mu-icon-button>
    </mu-appbar>
    <router-link :to="{'name':'add'}" style="width:50px;height:50px;position:absolute;right:0;top:0;z-index:555">
    </router-link>

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <router-link :to="{'name':'login'}" @click.native="open = false" v-if="!userInfo.loginname">
          <mu-list-item title="登陆">
            <mu-icon slot="left" value="person_outline"/>
          </mu-list-item>
        </router-link>
        <template  v-if="userInfo.loginname">
          <router-link :to="{'name':'user',params: { loginname: userInfo.loginname }}" @click.native="open = false">
            <mu-list-item :title="userInfo.loginname">
              <mu-icon slot="left" value="person"/>
            </mu-list-item>
          </router-link>

          <router-link :to="{'name':'info'}" @click.native="open = false">
            <mu-list-item title="消息" >
              <mu-icon slot="left" value="warning"/>
              <mu-badge :content="this.$store.state.info.notiNum" :primary="this.$store.state.info.notiNum>0" slot="after" circle/>
            </mu-list-item>
          </router-link>

          <router-link :to="{'name':'collection'}" @click.native="open = false">
            <mu-list-item title="收藏" >
              <mu-icon slot="left" value="grade"/>
            </mu-list-item>
          </router-link>

          <mu-list-item title="退出" @click="loginOut">
            <mu-icon slot="left" value="undo"/>
          </mu-list-item>
        </template>
        <mu-divider />

        <router-link :to="{'name':'list',query:{tab:'all'}}" @click.native="open = false">
          <mu-list-item title="全部" @click="channel('全部')">
            <mu-icon slot="left" value="list"/>
          </mu-list-item>
        </router-link>

        <router-link :to="{'name':'list',query:{tab:'good'}}" @click.native="open = false">
          <mu-list-item title="精华" @click="channel('精华')">
            <mu-icon slot="left" value="thumb_up"/>
          </mu-list-item>
        </router-link>

        <router-link :to="{'name':'list',query:{tab:'share'}}" @click.native="open = false">
          <mu-list-item title="分享" @click="channel('分享')">
            <mu-icon slot="left" value="share"/>
          </mu-list-item>
        </router-link>

        <router-link :to="{'name':'list',query:{tab:'ask'}}" @click.native="open = false">
          <mu-list-item title="问答" @click="channel('问答')">
            <mu-icon slot="left" value="live_help"/>
          </mu-list-item>
        </router-link>

        <router-link :to="{'name':'list',query:{tab:'job'}}" @click.native="open = false">
          <mu-list-item title="招聘" @click="channel('招聘')">
            <mu-icon slot="left" value="local_mall"/>
          </mu-list-item>
        </router-link>

        <mu-divider />

        <router-link :to="{'name':'about'}" @click.native="open = false">
          <mu-list-item title="关于" @click="channel('关于')">
            <mu-icon slot="left" value="info"/>
          </mu-list-item>
        </router-link>

      </mu-list>
    </mu-drawer>



  </div>
</template>

<script>
  export default {
    replace:true,
    name: 'hello',
    props: ['theme'],
    data () {
      return {
        open: false,
        docked: true,
        title:"全部",
        userInfo:{}
      }
    },
    mounted () {
      if(this.$store.state.user.userInfo)this.userInfo=this.$store.state.user.userInfo;
    },
    methods: {
      toggle (flag) {
        this.open = !this.open;
        this.docked = !flag;
      },
      channel(title){
        this.title=title;
      },
      loginOut(){
        /*this.docked = false;
        window.window.sessionStorage.removeItem("user");
        window.window.sessionStorage.removeItem("info");
        setTimeout(() => {
          history.go(0);
        },200)*/
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' rel="stylesheet/less">
  .header{
  .mu-appbar{
    text-align: center;
    position: fixed;
  }
  .mu-badge-circle{
    border-radius: 12px;
    padding: 0 9px;
    width: 100%;
  }
  }
</style>