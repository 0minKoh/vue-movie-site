import axios from "axios"

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
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      console.log(res.data)
      const {Search, totalResults} = res.data
      commit('updateState', {
        movies: Search
      })
      console.log(totalResults) //268
      console.log(typeof totalResults) // string

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10) //ceil = 올림 //페이지 개수

      //추가 요청
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > (number / 10)) {
            break
          }
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ...Search] //기존 데이터 유지, 새로운 데이터 추가
          })
        }
      }
    }
  }
}