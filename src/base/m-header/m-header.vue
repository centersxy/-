<template>
    <header class="header">
      <i v-if="!btnSelect" class="iconfont icon-ic_menu" @click="toggle()"></i>
      <i v-if="btnSelect" class="iconfont icon-ic_back" @click="back()"></i>
    </header>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      open: {
        type: Boolean,
        default: false
      },
      docked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        btnSelect: false
      }
    },
    watch: {
      '$route': 'routeChang'
    },
    methods: {
      routeChang() {
        let defaultUrl = '/detail'
        let changUrl = this.$route.path
        if(changUrl === defaultUrl) {
          this.btnSelect = true
        } else {
          this.btnSelect = false
        }
      },
      back() {
        window.history.back()
      },
      toggle() {
        this.$emit('toggle')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
