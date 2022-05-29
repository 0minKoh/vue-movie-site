<template>
  <div class="container">
    <input
    class="form-control"
    v-model="title"  
    type="text"
    placeholder="Search for Movies, Series & more"
    @keyup.enter="apply"/>
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option 
          v-if="filter.name === 'year'"
          value="">
          All years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{item}}
        </option>
      </select>  
    </div>
    <button 
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        title: '',
        type: 'movie',
        number: 10,
        year: '',
        filters: [
          {
            name: 'type',
            items: ['movie', 'series', 'episode']
          },
          {
            name: 'number',
            items: [10, 20, 30]
          },
          {
            name: 'year',
            items: (() => {
              const years = []
              const thisYear = new Date().getFullYear() //현재 연도 계산 함수
              for (let i = thisYear; i>=1985; i -= 1) {
                years.push(i)
              }
              return years
            })() //즉시실행함수
          }
        ]
      }
    },
    methods: {
      async apply() {
        this.$store.dispatch('movie/searchMovies', {
          title: this.title,
          type: this.type,
          number: this.number,
          year: this.year
        }) // dispatch는 actions를 실행할 때 사용합니다
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    > * {
      margin-right: 10px;
      font-size: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    .selects {
      display: flex;
      select {
        margin-right: 10px;
        width: 120px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .btn {
      width: 120px;
      height: 50px;
      font-weight: 700;
      flex-shrink: 0; //감소너비 0
    }
  }
</style>