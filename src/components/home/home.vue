<template>
  <div>
    <m-swipe swipeid="swipe" ref="swiper" :autoplay="300000" effect="slide">
      <div @click="go(top.id)" v-for="top in tops" class="swiper-slide" slot="swiper-con">
        <img :src="top.image">
        <div></div>
        <h3>{{top.title}}</h3>
      </div>
    </m-swipe>
    <!--列表-->
    <div class="list" v-for="x in list">
      <p class="list-time">{{x.date}}</p>
      <div class="list-con" v-for="y in x.stories" @click="go(y.id)">
        <img v-lazy="y.images[0]"/>
        <p>{{y.title}}</p>
      </div>
    </div>
    <loading v-if="!tops.length"></loading>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40">
      <div class="loadMore-btn" v-if="loadingBtn"><img width="32" height="32" src="./../../assets/loading-spin.svg">加载中...
      </div>
    </div>
    <!-- 回到顶部组件 -->
    <back-scroll :scroller="scroller" :flag="circleFlag"></back-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api/index'
  import loading from 'base/loading/loading'
  import { getDate } from 'common/js/date'
  import { mapState } from 'vuex'
  
  export default {
    data () {
      return {
        swiper: '',
        tops: [],
        list: [],
        scroller: null,
        busy: true,
        loadingBtn: false,
        day: 0
      }
    },
    computed: {
      ...mapState({
        circleFlag: state => state.circleFlag
      })
    },
    mounted () {
      this.scroller = this.$el
      this.banner(1)
      let swiper = this.$refs.swiper
      if (swiper.dom) {
        this.swiper = swiper.dom
      }
    },
    activated () {
      if (this.swiper) {
        this.swiper.startAutoplay()
      }
    },
    deactivated () {
      this.loop = false
      if (this.swiper) {
        this.swiper.stopAutoplay()
      }
    },
    methods: {
      go (id) {
        this.$router.push({
          path: 'detail',
          query: {
            id: id
          }
        })
      },
      banner (flag) {
        let that = this
        if (flag) {
          api.getNowNews().then((res) => {
            that.tops = res.data.top_stories
            that.list.push(res.data)
            that.loadingBtn = false
            that.busy = false
          })
        } else {
          this.loadingBtn = true
          api.getBeforeNew(getDate(that.day)).then((res) => {
            that.list = this.list.concat(res.data)
            that.busy = false
            that.loadingBtn = false
          })
        }
      },
      loadMore () {
        let that = this
        that.busy = true
        setTimeout(() => {
          that.day --
          that.banner()
        }, 300)
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
  
  .app-view {
    .swiper-container {
      width: 100%;
    }
    .swiper-slide {
      height: 8rem;
      overflow: hidden;
      position: relative;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 1rem;
      width: 95%;
      text-align: right;
    }
    .list:nth-child(2) {
      margin-bottom: 0;
      padding-top: 0;
      .list-time {
        top: -.8rem;
      }
    }
  }
  
  .swiper-slide {
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
      width: 100%;
      top: 50%;
      position: relative;
      transform: translate(0, -50%);
    }
    h3 {
      width: 70%;
      color: #fff;
      margin: 0;
      font-size: 0.5rem;
      line-height: 1rem;
      right: 5%;
      bottom: 2.6rem;
      text-align: right;
      position: absolute;
      text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
      &:before {
        content: "";
        width: 3rem;
        bottom: -.6rem;
        right: 0;
        display: block;
        position: absolute;
        border: 2px solid @yellow;
      }
    }
  }
  
  .list {
    width: 90%;
    z-index: 1;
    position: relative;
    padding-top: 0.8rem;
    margin: .8rem auto 0;
    &-time {
      top: 0;
      margin: 0;
      color: #fff;
      padding: 0 1rem;
      font-size: 0.4rem;
      line-height: 0.8rem;
      letter-spacing: 0.1rem;
      border-radius: 0.4rem;
      text-align: center;
      background-color: @yellow;
      transform: translate(0, -50%);
      position: absolute;
      box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
    }
    &-con {
      cursor: pointer;
      display: flex;
      padding: 0.3rem;
      margin-bottom: 0.4rem;
      border-radius: 0.15rem;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 3px 10px 0 rgba(91, 115, 146, 0.15);
      img {
        width: 2rem;
        margin-right: 0.4rem;
      }
      p {
        color: @blue;
        font-size: 0.4rem;
        text-align: justify;
        margin: 0;
      }
    }
  }
  
  .loadMore-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 15px;
    }
  }
  
  @keyframes lMove {
    0% {
      left: 0;
    }
    25% {
      left: 50%;
      background: @yellow;
    }
    50% {
      left: 100%;
      background: @blue;
    }
    75% {
      left: 50%;
      background: @gray;
    }
    100% {
      left: 0;
    }
  }
  
  @keyframes mMove {
    0% {
    }
    25% {
      background: @blue;
    }
    50% {
      background: @yellow;
    }
    75% {
      background: @blue;
    }
    100% {
    }
  }
  
  @keyframes rMove {
    0% {
      left: 100%;
    }
    25% {
      left: 50%;
    }
    50% {
      left: 0;
      background: @gray;
    }
    75% {
      left: 50%;
      background: @yellow;
    }
    100% {
      left: 100%;
    }
  }
</style>


