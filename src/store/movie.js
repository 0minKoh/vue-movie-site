import axios from "axios"
import _uniqBy from "lodash/uniqBy"

export default {
  //module
  namespaced: true,
  //data
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  //computed
  getters: {},
  //methods
  mutations: { //데이터 변경
    updateState(state, payload) {
      //새로운 배열 데이터 생성 .keys
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  actions: { //비동기 함수
    async searchMovies({state, commit}, payload) {
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        console.log(res)
        const {Search, totalResults} = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID') //겹치는 ID가 제거됨
        })
        console.log(totalResults) //268
        console.log(typeof totalResults) // string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10) //ceil = 올림 //페이지 개수
  
        //추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) {
              break
            }
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ] //기존 데이터 유지, 새로운 데이터 추가
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message: '',
          loading: false
        })
        }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error) { //try catch로 에러를 못잡을 경우
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}