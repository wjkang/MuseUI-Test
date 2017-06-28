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
    <mu-circular-progress v-show="loading!=0" :size="90" color="red"/>
    <router-link :to="{'name':'add'}" style="width:50px;height:50px;position:absolute;right:0;top:0;z-index:555">
    </router-link>

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <router-link :to="{'name':'login'}" @click.native="open = false" v-if="!userInfo.loginname">
          <mu-list-item title="登陆">
            <mu-icon slot="left" value="person_outline"/>
          </mu-list-item>
        </router-link>
        <mu-divider />

        <router-link :to="{'name':'list',query:{tab:'all'}}" @click.native="open = false">
          <mu-list-item title="全部" @click="channel('全部')">
            <mu-icon slot="left" value="list"/>
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

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    replace:true,
    name: 'hello',
    props: ['theme'],
    data () {
      return {
        open: false,
        docked: true,
        title:"首页",
        userInfo:{}
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm)=>{
        if(vm.loginStatus){
          vm.$store.dispatch('getUserData');
        }
      });
    },
    computed: mapGetters([
       'loading','userData','loginStatus'
    ]),
    methods: {
      toggle (flag) {
        this.open = !this.open;
        this.docked = !flag;
      },
      channel(title){
        this.title=title;
      },
      loginOut(){
        this.$store.dispatch('getUserData');
      },
      login(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' rel="stylesheet/less">
  .header{
  .mu-appbar{
    text-align: center;

  }
  .mu-badge-circle{
    border-radius: 12px;
    padding: 0 9px;
    width: 100%;
  }
    .mu-circular-progress{
      position:absolute;
      top: 50%;
      left: 50%;
      transform:translate(-50%, -50%);
    }
  }
</style>