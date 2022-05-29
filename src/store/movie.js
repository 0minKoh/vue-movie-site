export default {
  //module
  namespaced: true,
  //data
  state: () => ({
    movies: []
  }),
  //computed
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },
  //methods
  mutations: { //데이터 변경
    resetMovies(state) {
      state.movies = []
    }
  },
  actions: { //비동기 함수
    searchMovies({}) {
    }
  }
}