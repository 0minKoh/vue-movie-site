//store 들을 관리하는 index.js 입니다
import {createStore} from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
  modules: {
    movie,
    about
  }
})