import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// const Home = (resolve) => {
//   import('components/home/home').then((module) =>{
//     resolve(module)
//   })
// }
// const Other = (resolve) => {
//   import('components/other/other').then((module) => {
//     resolve(module)
//   })
// }
// const Detail = (resolve) => {
//   import('components/detail/detail').then((module) => {
//     resolve(module)
//   })
// }
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['components/home/home'], resolve)
    },
    {
      path: '/other',
      name: 'Other',
      component: resolve => require(['components/other/other'], resolve)
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: resolve => require(['components/detail/detail'], resolve)
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
