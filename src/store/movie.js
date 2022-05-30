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
    async searchMovies({commit}, payload) {
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      console.log(res.data)
      const {Search, totalResults} = res.data
      commit('updateState', {
        movies: Search
      })
      console.log(totalResults)
      console.log(typeof totalResults)
    }
  }
}