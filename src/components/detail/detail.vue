<template>
  <div class="con">
    <div class="loading" v-if="!data.body">
      <span class="left"></span>
      <span class="middle"></span>
      <span class="right"></span>
    </div>
    <div v-if="data.image" class="con-img">
      <img :src="data.image"/>
      <div class="con-img-mask"></div>
      <h2>{{data.title}}</h2>
    </div>
    <div class="con-answer" @click.prevent="pop($event)" v-html="data.body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from 'api/index'
  
  export default {
    data() {
      return {
        data: ''
      }
    },
    activated() {
      let id = this.$route.query.id
      api.getDetail(id).then((res) => {
        this.data = res.data
      })
    },
    deactivated: function() {
      this.data = '';
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @red: #fc4482;
  @yellow: #ffd300;
  @blue: #5b7492;
  @gray: #acb9c8;
  img {
    width: 100%;
  }
  
  .page-content {
    text-align: center;
  }
  
  .con {
    color: #666;
    height: 100vh;
    .con-img {
      height: 6rem;
      overflow: hidden;
      position: relative;
      img {
        top: 50%;
        width: 100%;
        position: relative;
        transform: translate(0, -50%);
      }
      h2 {
        width: 60%;
        margin: 0;
        padding: 0;
        right: 5%;
        bottom: 1rem;
        text-align: right;
        font-size: 0.45rem;
        color: rgba(255, 255, 255, 0.9);
        position: absolute;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      }
      &-mask {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(91, 116, 146, 0.5);
        position: absolute;
      }
    }
    .con-answer {
      padding: 5%;
      position: relative;
      h2,
      li,
      p {
        text-align: justify !important;
      }
      h2 {
        color: @blue;
        position: relative;
        z-index: 1;
      }
      a {
        color: @yellow;
        word-break: break-word;
      }
      .headline-title {
        color: @blue;
      }
      .meta {
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .avatar {
          vertical-align: middle;
          display: inline-block;
          width: 0.6rem;
          margin-right: 0.1rem;
        }
        span {
          color: #666;
        }
        .author {
          color: @red;
          display: inline-table;
        }
      }
      .content {
        font-size: 0.35rem;
      }
      .question {
        blockquote {
          text-align: justify;
          position: relative;
          &::before {
            content: "";
            left: -0.5rem;
            display: block;
            height: 100%;
            border-left: 0.1rem solid @yellow;
            position: absolute;
          }
        }
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          padding-bottom: 0;
          &::before {
            display: none;
          }
        }
        ul {
          padding-left: 0.3rem;
          li {
            text-align: left;
          }
        }
      }
      .content-image {
        width: inherit;
        max-width: 100%;
        margin: 0 auto;
        display: block;
      }
      .view-more {
        text-align: center;
        margin-bottom: 0.5rem;
        a {
          z-index: 1;
          position: relative;
        }
      }
    }
  }
</style>
