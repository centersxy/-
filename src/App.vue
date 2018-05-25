<template>
  <div id="app">
    <m-header @toggle="toggle" :open="open" :docked="docked"></m-header>
    <slide-menu @toggle="toggle" :open="open" :docked="docked"></slide-menu>
    <div class="circle" v-if="circleFlag" @click="top()">
      <i class="iconfont icon-ic_top"></i>
    </div>
    <keep-alive>
      <router-view class="app-view"/>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/base/m-header/m-header'
  import slideMenu from '@/base/slide-menu/slide-menu'
  import {mapState} from 'vuex'
  
  export default {
    data() {
      return {
        open: false,
        docked: false
      }
    },
    computed: {
      ...mapState({
        circleFlag: state => state.circleFlag
      })
    },
    methods: {
      toggle() {
        if (!this.open) {
          this.open = true
          this.docked = true
        } else {
          this.open = false
          setTimeout(() => {
            this.docked = false
          }, 300)
        }
      },
      top() {
        let vue = this;
        let dom = document.querySelector('.app-view');
        let height = dom.scrollTop;
        let scrollTop = parseInt(height / 50);
        let time = setInterval(function () {
          height -= scrollTop;
          if (height <= 0) {
            dom.scrollTop = 0;
            vue.$store.commit('toggle');
            clearInterval(time);
          } else {
            dom.scrollTop = height;
          }
        }, 1);
      }
    },
    components: {
      MHeader,
      slideMenu
    }
  }
</script>

<style lang="less" type="text/less">
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(50vw, 0);
  }
  
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0.1;
    transform: translate(-50vw, 0);
  }
  
  .app-view {
    z-index: 1;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    position: absolute;
    transition: transform 0.3s ease;
    -webkit-overflow-scrolling: touch;
  }
  
  .app-view-hidden {
    overflow: hidden;
  }
  
  .header {
    width: 100%;
    height: 1.5rem;
    z-index: 9;
    padding-left: 5%;
    position: fixed;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.51) 95%);
    .iconfont {
      color: #fff;
      font-size: 0.8rem;
      top: 20%;
      position: relative;
    }
  }
  
  .aside {
    z-index: 11;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed;
    visibility: hidden;
    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      opacity: 0 !important;
    }
    ul {
      margin: 0;
      float: left;
      width: 60%;
      height: 100%;
      padding: 1.3rem 0.5rem 0.5rem;
      overflow: auto;
      background: rgba(91, 116, 146, 0.75);
      transform: translate(-100%, 0);
      transition: transform 0.3s ease;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        opacity: 0 !important;
      }
    }
    li {
      cursor: pointer;
      font-size: 0.43rem;
      list-style: none;
      color: #fff;
      margin-top: 20px;
      .iconfont {
        float: right;
        font-size: 0.6rem;
      }
      &.chose {
        color: #FFD300;
      }
    }
    .cover {
      width: 100%;
      height: 100%;
      opacity: 0;
      display: none;
      background: rgba(172, 185, 201, 0.40);
      transition: opacity 0.3s ease;
    }
    &.open {
      ul {
        transform: translate(0);
      }
      .cover {
        opacity: 1;
      }
    }
    &.docked {
      visibility: visible;
      .cover {
        display: block;
      }
    }
  }
  
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
  
  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.50);
    right: 5%;
    bottom: 5vw;
    position: fixed;
    z-index: 10;
    i {
      top: 50%;
      left: 50%;
      font-size: 0.6rem;
      color: #ACB9C9;
      transform: translate(-50%, -50%);
      position: absolute;
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
  
  @media screen and (min-width: 640px) {
    .app-view {
      width: 640px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    
    .aside ul {
      width: 350px;
    }
  }
</style>


