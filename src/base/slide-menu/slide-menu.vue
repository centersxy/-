<template>
  <aside class="aside"
         :class="{'open': open, 'docked': docked}"
         @click="toggle()">
    <ul>
      <li :class="{'chose': num === 1}"
          @click="chooseItem(1)">
        <span>首页</span>
        <i class="iconfont" :class="{'iconcolor icon-ic_star_black': num===1,'icon-ic_star': num !==1}"></i>
      </li>
      <li v-for="(item, index) in slides"
          :class="{'chose': num === item.id}"
          @click="chooseItem(item.id)">
        <span>{{item.name}}</span>
        <i class="iconfont" :class="{'iconcolor icon-ic_star_black': num===item.id,'icon-ic_star': num !==item.id}"></i>
      </li>
    </ul>
    <div class="cover"></div>
  </aside>
</template>

<script type="text/ecmascript-6">
  import api from 'api/index'
  import {mapState} from 'vuex'
  export default {
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
    created() {
      this.getMenu()
    },
    computed: {
      ...mapState(['num'])
    },
    data() {
      return {
        slides: []
      }
    },
    methods: {
      chooseItem(id) {
        let path = id == 1 ? 'home' : 'other';
        this.$router.push({
          path: path,
          query: {
            id: id || ""
          }
        })
        this.$store.commit('updateSlide', id)
      },
      toggle() {
        this.$emit('toggle')
      },
      getMenu() {
        api.getNav().then((res) => {
          this.slides = res.data.others
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
