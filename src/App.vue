<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss"> //scoped 는 유효범위가 지금 이 파일 안이 된다
@import "~/scss/main.scss"; // ~는 src 폴더를 의미한다 (webpack.config.js 참고)
</style>
