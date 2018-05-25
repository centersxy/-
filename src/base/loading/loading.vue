<template>
  <div class="loading">
    <span class="left"></span>
    <span class="middle"></span>
    <span class="right"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
  @yellow: #FFD300;
  @blue: #5B7492;
  @gray: #acb9c8;
  .loading {
    width: 25%;
    height: 0.4rem;
    margin: 25% auto 0;
    position: relative;
    span {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      position: absolute;
      background: @blue;
      transform: translate(-50%, 0);
    }
    .left {
      background: @yellow;
      animation: lMove 2.5s ease infinite;
    }
    .middle {
      left: 50%;
      animation: mMove 2.5s ease infinite;
    }
    .right {
      left: 100%;
      background: @gray;
      animation: rMove 2.5s ease infinite;
    }
  }
</style>
