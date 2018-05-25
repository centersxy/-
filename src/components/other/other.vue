<template>
  <div>
    <div class="theme">
      <img :src="list.image">
      <div></div>
      <h3>
        <p>{{list.description}}</p>
        <p>{{list.name}}</p>
      </h3>
    </div>
    <div class="list">
      <div class="list-con" v-for="y in list.stories" @click="go(y.id)">
        <img v-if="y.images" v-lazy="y.images[0]"/>
        <p>{{y.title}}</p>
      </div>
    </div>
    <loading v-if="!list"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api/index'
  import loading from 'base/loading/loading'
  import {mapState} from 'vuex'
  export default {
    created() {
      this.getTopiclist()
    },
    computed: {
      ...mapState({
        slideIndex: state => state.num,
        theme: state => state.theme
      })
    },
    data() {
      return {
        list: ''
      }
    },
    watch: {
      slideIndex:function () {
        this.getTopiclist()
      }
    },
    methods: {
      go(id) {
        this.$router.push({
          path: 'detail',
          query: {
            id: id
          }
        })
      },
      getTopiclist() {
        let id = this.$route.query.id;
          if(id == 1) {
            this.$router.push('/home')
            return
          }
//        api.getTopic(id).then((res) => {
//          this.list = res.data
//        })
        // 解决数据只刷新一次
        this.list = ''
        let vue = this
        if(this.theme.hasOwnProperty(id)){
          this.list = this.theme[id];
        }else{
          api.getTopic(id).then((data) => {
            vue.theme[id] = data.data
            vue.list = data.data
          })
        }
      }
    },
    components: {
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @yellow: #FFD300;
  @blue: #5B7492;
  @gray: #acb9c8;
  .theme {
    height: 8rem;
    position: relative;
    overflow: hidden;
    div {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      position: absolute;
      background-color: @blue;
    }
    img {
      width: auto;
      height: 8rem;
      left: 50%;
      transform: translate(-50%, 0);
      position: relative;
    }
    h3, p {
      margin: 0;
    }
    h3 {
      width: 70%;
      color: #fff;
      font-size: 0.5rem;
      line-height: 1rem;
      right: 5%;
      bottom: 1.5rem;
      text-align: right;
      position: absolute;
      text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
      p:first-child {
        position: relative;
        margin-bottom: 0.5rem;
        &:before {
          content: "";
          width: 3rem;
          bottom: -.3rem;
          right: 0;
          display: block;
          position: absolute;
          border: 2px solid @yellow;
        }
      }
      
    }
  }
  
  .list {
    margin-top: -.5rem;
  }
</style>

