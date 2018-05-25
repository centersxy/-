import axios from 'axios'

var apiZhihu = {
  slideList: '/api/4/themes',
  nowNews: '/api/4/news/latest',
  topic: '/api/4/theme/',
  detail: '/api/4/news/',
  beforeNews: '/api/4/news/before/'
}
export default {
  getNav() {
    return axios.get(apiZhihu.slideList)
  },
  getNowNews() {
    return axios.get(apiZhihu.nowNews)
  },
  getBeforeNew(id) {
    return axios.get(apiZhihu.beforeNews + id)
  } ,
  getTopic(id) {
    return axios.get(apiZhihu.topic + id)
  },
  getDetail(id) {
    return axios.get(apiZhihu.detail + id)
  }
}
